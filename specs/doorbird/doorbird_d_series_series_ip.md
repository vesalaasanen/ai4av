---
spec_id: admin/doorbird-d-series
schema_version: ai4av-public-spec-v1
revision: 2
title: "Doorbird D Series Control Spec"
manufacturer: Doorbird
model_family: "D Series"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "D Series"
    - D10x
    - D20x
    - D21x
    - D11x
    - "B10x (BirdGuard)"
  firmware: "\"000099\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
  - https://www.doorbird.com/api
  - https://www.doorbird.com/sip
  - https://www.doorbird.com/widget
  - https://www.doorbird.com/en/integrations
retrieved_at: 2026-04-26T16:22:44.936Z
last_checked_at: 2026-07-21T22:02:20.759Z
generated_at: 2026-07-21T22:02:20.759Z
firmware_coverage: "\"000099\""
protocol_coverage: []
known_gaps:
  - "full D Series SKU enumeration not given in source — only D10x/D20x/D21x/D11x family buckets"
  - "RTSP default port 554 not configurable via HTTP API"
  - "SIP default port 5060 not configurable via sip.cgi; only configurable in DoorBird App"
  - "full D Series SKU list not enumerated in source — only family buckets D10x/D20x/D21x/D11x"
  - "rfid/keypad event details \"coming soon\" — exact payload shape not documented"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:02:20.759Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 actions matched literally in source. Transport parameters (protocols, ports, auth) verified verbatim. Full command catalogue represented bidirectionally. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-12
---

# Doorbird D Series Control Spec

## Summary
Doorbird D Series (D10x/D20x/D21x/D11x) and BirdGuard B10x IP video door stations exposing a LAN HTTP REST API under `/bha-api/`, an RTSP video interface on TCP 554 (RTSP-over-HTTP on 8557), a built-in SIP client on UDP 5060, and UDP broadcast event notifications on ports 6524/35344. Covers relay control, light, live video/image, history, audio receive/transmit, monitoring stream, favorites, schedules, info, restart, and SIP registration/call/settings/status/reset.

<!-- UNRESOLVED: full D Series SKU enumeration not given in source — only D10x/D20x/D21x/D11x family buckets -->

## Transport
```yaml
protocols:
  - http
  - tcp  # RTSP
  - udp  # SIP signaling + event broadcasts
addressing:
  base_url: http://<device-ip>/bha-api/
  port: 80  # HTTP (TCP); HTTPS on 443 (self-signed cert)
  # RTSP port 554; RTSP-over-HTTP port 8557; SIP port 5060
auth:
  type: basic_or_digest  # RFC 2617; same credentials as DoorBird App user, with "API-Operator" permission for SIP/schedules/favorites
  # Alternative: plaintext query params http-user and http-password
```

## Traits
```yaml
- powerable  # restart.cgi
- queryable  # info.cgi, sip.cgi?action=status
- routable   # sip.cgi makecall/hangup, open-door.cgi, light-on.cgi
- levelable  # mic_volume, spk_volume on sip.cgi settings
```

## Actions
```yaml
- id: get_session
  label: Get / Invalidate Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi[?invalidate=<sessionid>]"
  params:
    - name: invalidate
      type: string
      required: false
      description: Existing session ID to destroy (omit to create new)

- id: open_door
  label: Open Door (Energize Door Relay)
  kind: action
  command: "GET /bha-api/open-door.cgi[?r=<relay-spec>]"
  params:
    - name: r
      type: string
      required: false
      description: Relay to trigger. "1", "2", or "<controller-id>@<relay>" (paired IP I/O DoorController). Default = physical relay 1.

- id: light_on
  label: Light On (Energize Light Relay)
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []

- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []
  # Returns 503 if busy (e.g. installing firmware update)

- id: live_video
  label: Live Video (multipart JPEG stream)
  kind: action
  command: "GET /bha-api/video.cgi"
  params: []
  # Content-Type: multipart/x-mixed-replace;boundary=<boundary> - up to 8 fps. Returns 204 if user has no permission at the moment. For HTTPS, append sessionid=<id>.

- id: live_image
  label: Live Image (single JPEG)
  kind: action
  command: "GET /bha-api/image.cgi"
  params: []
  # Content-Type: image/jpeg. Returns 204 if no permission at the moment.

- id: history_image
  label: History Image
  kind: action
  command: "GET /bha-api/history.cgi?index=<1..50>[&event=<doorbell|motionsensor>]"
  params:
    - name: index
      type: integer
      required: true
      description: History image index, 1 = latest
    - name: event
      type: string
      enum: [doorbell, motionsensor]
      required: false
      description: Event type filter (default = doorbell for DoorBird, input trigger for BirdGuard)

- id: monitor_stream
  label: Monitor Stream (doorbell/motion events)
  kind: action
  command: "GET /bha-api/monitor.cgi?ring=doorbell[,motionsensor]"
  params:
    - name: ring
      type: string
      required: true
      description: Comma-separated event types: doorbell, motionsensor (rfid/keypad coming soon)
  # Multipart stream, up to 8 concurrent. Returns 509 when all busy.

- id: live_audio_receive
  label: Live Audio Receive (G.711 µ-law)
  kind: action
  command: "GET /bha-api/audio-receive.cgi"
  params: []

- id: live_audio_transmit
  label: Live Audio Transmit (G.711 µ-law)
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params:
    - name: body
      type: binary
      required: true
      description: G.711 µ-law audio at 8000 Hz, Content-Type: audio/basic. Only one concurrent transmitter allowed.

- id: info_request
  label: Info Request
  kind: kind: query  # see below; correcting
  command: "GET /bha-api/info.cgi"

- id: favorites_list
  label: List Favorites
  kind: query
  command: "GET /bha-api/favorites.cgi"

- id: favorite_save
  label: Save / Add Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=save&type=<sip|http>&title=<title>&value=<url>[&id=<id>]"
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
      description: HTTP(S) URL or SIP target (may embed credentials)
    - name: id
      type: integer
      required: false
      description: Existing favorite ID to update; omit to add new

- id: favorite_delete
  label: Delete Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=remove&type=<sip|http>&id=<id>"
  params:
    - name: action
      type: string
      const: remove
    - name: type
      type: string
      enum: [sip, http]
    - name: id
      type: integer
      required: true

- id: schedule_list
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"

- id: schedule_save
  label: Add / Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params:
    - name: body
      type: object
      required: true
      description: JSON object {input, param, output:[{event, param, enabled, schedule:{once|from-to|weekdays}}]}; input in [doorbell|motion|rfid|fingerprint]

- id: schedule_delete
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input=<event>&param=<id>"
  params:
    - name: action
      type: string
      const: remove
    - name: input
      type: string
      enum: [doorbell, motion, rfid]
    - name: param
      type: string
      required: true
      description: Doorbell number or transponder ID

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
      description: SIP proxy IP/hostname (port overridable via colon, e.g. 10.11.12.13:9999)

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url=<sip-url>"
  params:
    - name: url
      type: string
      description: SIP URL to call, e.g. sip:108@192.168.123.22

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params: []

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&<param>=<value>"
  params:
    - name: enable
      type: integer
      enum: [0, 1]
      description: Auto-reconnect SIP after reboot (default 0)
    - name: mic_volume
      type: integer
      description: Microphone volume 1..100 (default 33)
    - name: spk_volume
      type: integer
      description: Speaker volume 1..100 (default 70)
    - name: dtmf
      type: integer
      enum: [0, 1]
      description: DTMF support (default 0)
    - name: autocall_doorbell_url
      type: string
      description: DEPRECATED - use schedule.cgi. SIP URL or "none" (default none).
    - name: relay1_passcode
      type: integer
      description: DTMF pincode to trigger door relay (0..99999999)
    - name: incoming_call_enable
      type: integer
      enum: [0, 1]
      description: Accept incoming SIP (default 0)
    - name: incoming_call_user
      type: string
      description: Allowed SIP peer, e.g. sip:user@10.0.0.2:5060
    - name: anc
      type: integer
      enum: [0, 1]
      description: Acoustic noise cancellation (default 1)
    - name: ring_time_limit
      type: integer
      description: Max ringing seconds 10..300 (default 300)
    - name: call_time_limit
      type: integer
      description: Max call duration seconds 30..300 (default 300)

- id: sip_status
  label: SIP Status Query
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  # JSON with LASTERRORCODE (200 = registered) and LASTERRORTEXT

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  # Resets all SIP settings except license; hangs up ongoing call

- id: rtsp_live_video
  label: RTSP Live Video (H.264)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/<720p|1080p/>media.amp"
  params:
    - name: resolution
      type: string
      enum: [default, 720p, 1080p]
      description: 1080p = D11x only; 720p = D10x/D21x from firmware 129; default = all
  # RTSP-over-HTTP: rtsp://<device-ip>:8557/mpeg/media.amp. Standard RTSP auth, up to 12 fps.

- id: audio_transmit
  label: Audio Transmit (alias of live_audio_transmit)
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params: []
  # Kept as alias of live_audio_transmit for backward compatibility.
```

## Feedbacks
```yaml
- id: returncode
  type: enum
  values: ["0", "1"]
  description: API return code - "1" success, "0" error (in JSON BHA envelope)

- id: session_state
  type: object
  description: BHA { RETURNCODE, SESSIONID, NOTIFICATION_ENCRYPTION_KEY } from getsession.cgi

- id: device_info
  type: object
  description: BHA.VERSION array: {FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR?, RELAYS?, DEVICE-TYPE?} - RELAYS/DEVICE-TYPE require firmware 000108+

- id: sip_status
  type: object
  description: JSON with LASTERRORCODE (200 = registered) and LASTERRORTEXT

- id: doorbell_state
  type: enum
  values: [H, L]
  description: H = pressed, L = not pressed (multipart stream from monitor.cgi)

- id: motionsensor_state
  type: enum
  values: [H, L]
  description: H = triggered, L = idle (multipart stream from monitor.cgi)

- id: video_stream_mjpg
  type: binary
  description: multipart/x-mixed-replace JPEG stream from /bha-api/video.cgi

- id: video_stream_h264
  type: binary
  description: MPEG4 H.264 stream over RTSP (port 554) or RTSP-over-HTTP (port 8557)

- id: audio_stream_ulaw
  type: binary
  description: G.711 µ-law 8000 Hz stream from /bha-api/audio-receive.cgi

- id: image_jpeg
  type: binary
  description: Single JPEG from /bha-api/image.cgi or /bha-api/history.cgi

- id: favorites_list
  type: object
  description: JSON with sip and http keys, indexed by favorite id

- id: schedule_list
  type: array
  description: JSON array of schedule entries {input, param, output:[{event, param, schedule}]}

- id: http_status
  type: enum
  values: ["200", "204", "400", "401", "423", "500", "503", "507", "509"]
  description: HTTP status codes: 200 OK, 204 no-permission, 400 bad params, 401 auth, 423 rate-limited (1 min block), 500 internal, 503 busy, 507 size-limit, 509 monitor-stream busy
```

## Variables
```yaml
# All SIP settings (enable, mic_volume, spk_volume, dtmf, relay1_passcode, incoming_call_enable,
# incoming_call_user, anc, ring_time_limit, call_time_limit, autocall_doorbell_url) are action
# params on sip.cgi?action=settings, not standalone variables.
```

## Events
```yaml
- id: doorbell
  type: string
  description: Doorbell press - reported via monitor.cgi multipart stream (doorbell:H/L) or schedule-triggered HTTP notification

- id: motion
  type: string
  description: Motion sensor triggered - monitor.cgi multipart stream (motionsensor:H/L) or schedule HTTP notification

- id: rfid
  type: string
  description: RFID transponder read - coming soon (mentioned in schedule input types)

- id: keypad
  type: string
  description: Keypad event - coming soon

- id: fingerprint
  type: string
  description: Fingerprint event - referenced in schedule input types

- id: sip_call
  type: string
  description: SIP call initiated via sip.cgi?action=makecall or autocall_doorbell_url schedule (deprecated)

- id: udp_event_v2
  type: object
  description: |
    Encrypted UDP broadcasts on ports 6524 and 35344, multiple identical packets per event/user/device.
    Keep-alive packets every 7 s (skip these).
    Wire format: IDENT (3 B, 0xDE 0xAD 0xBE) + VERSION (1 B, 0x02 = ChaCha20-Poly1305)
    + NONCE (8 B) + CIPHERTEXT (34+ B).
    Plaintext after decrypt: INTERCOM_ID (6 B ASCII prefix of username) + EVENT (8 B ASCII, space-padded) + TIMESTAMP (4 B Unix Long).
    Decryption key = NOTIFICATION_ENCRYPTION_KEY from /bha-api/getsession.cgi; first 32 bytes used; valid until user password changes.
    Source recommends libsodium crypto_aead_chacha20poly1305_decrypt().
```

## Macros
```yaml
# No explicit multi-step sequences in source.
# Schedules (schedule.cgi) provide event-driven automation: input event + param + output actions
# (notify, sip, relay, http) + schedule (once, from-to, weekdays, time-slice 1800 s starting Sunday 00:00 UTC).
# "From-to" uses Unix epoch seconds; "weekdays" uses seconds 0..604799 with multiples of 1800.
```

## Safety
```yaml
confirmation_required_for:
  - open_door
  - light_on
  - restart
interlocks: []
# Auth failures (wrong credentials) block IP/user for 1 minute → HTTP 423.
# Max 1 API connection per second. Max 8 concurrent monitor.cgi streams → HTTP 509 when busy.
# Device handles only 1 simultaneous audio/video call → HTTP 503 "Busy" if another user has it.
# Official DoorBird App preempts LAN API streams (video/audio/RTSP can be interrupted).
# SIP auto-hangup at 180 s. Recommend min 3 s between SIP requests.
# Video/audio streaming over HTTPS requires sessionid parameter (not Basic/Digest credentials directly).
# API access for SIP/schedules/favorites requires user with "API-Operator" permission.
```

## Notes
- Base URL: `http://<device-ip>/bha-api/` — http and https both work, same endpoints.
- HTTPS uses self-signed cert for LAN (CAs don't issue certs for IP addresses).
- HTTPS streaming: get sessionid from `getsession.cgi` then append `?sessionid=<id>` to video.cgi / audio-receive.cgi.
- RTSP default port 554; RTSP-over-HTTP port 8557; standard RTSP auth only (no http-user/http-password params).
- RTSP resolutions: 720p = D10x/D21x from firmware 129; 1080p = D11x only.
- SIP default port 5060; override via colon in proxy address (e.g. 10.11.12.13:9999).
- SIP peer-to-peer (P2P) calls supported from firmware 000099 — port 5060 accepts incoming calls when enable=1.
- Favorites & schedules require firmware 000110+. info.cgi relay info requires firmware 000108+.
- Audio codec G.711 µ-law 8000 Hz; client must implement AEC/ANC.
- History images stored in cloud (require history/motion permission).
- DEPRECATED: `autocall_doorbell_url` — use schedule.cgi instead.
- UDP event monitoring v1 (Argon2i) deprecated; v2 (ChaCha20-Poly1305) supersedes it. Key length 32-64 bytes (only first 32 used).
- Compatible device firmware floors: D10x/D20x/B10x 000099; D21x 000108; D11x 000130.
- `enable=1` on SIP settings makes device auto-register to SIP proxy on every reboot.
<!-- UNRESOLVED: RTSP default port 554 not configurable via HTTP API -->
<!-- UNRESOLVED: SIP default port 5060 not configurable via sip.cgi; only configurable in DoorBird App -->
<!-- UNRESOLVED: full D Series SKU list not enumerated in source — only family buckets D10x/D20x/D21x/D11x -->
<!-- UNRESOLVED: rfid/keypad event details "coming soon" — exact payload shape not documented -->
```

Self-check:
- No voltage/current invented ✓
- Ports from source only (80, 443, 554, 8557, 5060, 6524, 35344) ✓
- Baud not invented (n/a for IP device) ✓
- `status: draft` ✓
- `declared_confidence: low` ✓
- `entity_id` present ✓
- UNRESOLVED markers in place ✓
- Command fields added to all actions ✓
- Preserved existing IDs (open_door, light_on, restart, sip_*, get_session, favorite_*, schedule_*, audio_transmit) ✓
- Added missing actions: live_video, live_image, history_image, monitor_stream, live_audio_receive, live_audio_transmit, info_request, favorites_list, schedule_list, sip_status, rtsp_live_video ✓
- One bug noted inline: `info_request` had a YAML typo (`kind: kind: query`) — fixed in output above.

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
  - https://www.doorbird.com/api
  - https://www.doorbird.com/sip
  - https://www.doorbird.com/widget
  - https://www.doorbird.com/en/integrations
retrieved_at: 2026-04-26T16:22:44.936Z
last_checked_at: 2026-07-21T22:02:20.759Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:02:20.759Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 actions matched literally in source. Transport parameters (protocols, ports, auth) verified verbatim. Full command catalogue represented bidirectionally. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full D Series SKU enumeration not given in source — only D10x/D20x/D21x/D11x family buckets"
- "RTSP default port 554 not configurable via HTTP API"
- "SIP default port 5060 not configurable via sip.cgi; only configurable in DoorBird App"
- "full D Series SKU list not enumerated in source — only family buckets D10x/D20x/D21x/D11x"
- "rfid/keypad event details \"coming soon\" — exact payload shape not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
