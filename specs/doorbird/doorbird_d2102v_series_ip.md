---
spec_id: admin/doorbird-d2102v-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2102V Series Control Spec"
manufacturer: Doorbird
model_family: "DoorBird Video Door Station D21x"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "DoorBird Video Door Station D21x"
  firmware: "\"000108\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-05-12T19:06:45.697Z
last_checked_at: 2026-09-04T22:16:32.775Z
generated_at: 2026-09-04T22:16:32.775Z
firmware_coverage: "\"000108\""
protocol_coverage: []
known_gaps:
  - "D2102V not named explicitly in source — spec targets D21x family per compatibility table"
  - "source documents individual CGIs; no composite multi-step sequences defined."
  - "no electrical/lockout safety warnings in source (this is a network API doc)."
  - "D2102V not named verbatim in source; spec covers D21x family. RTSP FHD path is D11x-only — may not apply to D2102V."
verification:
  verdict: verified
  checked_at: 2026-09-04T22:16:32.775Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions match source endpoints verbatim; transport parameters (ports 80/443/554/8557/5060/6524/35344) are documented in source. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Doorbird D2102V Series Control Spec

## Summary
IP-based LAN API for Doorbird D21x-series video door stations. Covers HTTP CGI endpoints (HTTP/HTTPS), RTSP video, SIP calls, and encrypted UDP event broadcasts (ChaCha20-Poly1305). Authentication via HTTP Basic/Digest with per-user credentials.

<!-- UNRESOLVED: D2102V not named explicitly in source — spec targets D21x family per compatibility table -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  base_url: "http://<device-ip>/bha-api/"
  http_port: 80
  https_port: 443
  rtsp_port: 554
  rtsp_http_port: 8557
  udp_event_ports:
    - 6524
    - 35344
  sip_port: 5060
auth:
  type: basic_or_digest
  mechanism: "RFC 2617 Basic or Digest; same credentials as DoorBird App"
  parameters: ["http-user", "http-password"]  # plaintext alternative
```

## Traits
```yaml
- powerable       # inferred: restart.cgi reboots device
- routable        # inferred: relay trigger via open-door.cgi
- queryable       # inferred: info.cgi returns JSON state
```

## Actions
```yaml
- id: get_session
  label: Get Session ID
  kind: action
  command: "GET http://<device-ip>/bha-api/getsession.cgi"
  description: Returns temporary session ID (10 min valid) and NOTIFICATION_ENCRYPTION_KEY
  params: []

- id: invalidate_session
  label: Invalidate Session
  kind: action
  command: "GET http://<device-ip>/bha-api/getsession.cgi?invalidate=<old_session_id>"
  params:
    - name: old_session_id
      type: string

- id: live_video
  label: Live Video Stream
  kind: action
  command: "GET http://<device-ip>/bha-api/video.cgi"
  description: Multipart MJPEG stream, up to 8 fps
  params: []

- id: live_image
  label: Live Image
  kind: action
  command: "GET http://<device-ip>/bha-api/image.cgi"
  description: Single JPEG snapshot
  params: []

- id: history_image
  label: History Image
  kind: action
  command: "GET http://<device-ip>/bha-api/history.cgi?index=<index>&event=<event>"
  params:
    - name: index
      type: integer
      description: 1..50, 1 is latest
    - name: event
      type: string
      enum: [doorbell, motionsensor]
      optional: true

- id: open_door
  label: Open Door / Trigger Relay
  kind: action
  command: "GET http://<device-ip>/bha-api/open-door.cgi?r=<relay>"
  params:
    - name: r
      type: string
      description: "Physical relay number (e.g. '1') or paired IP I/O DoorController (e.g. 'gggaaa@1')"
      optional: true

- id: light_on
  label: Light On
  kind: action
  command: "GET http://<device-ip>/bha-api/light-on.cgi"
  description: Energize light relay
  params: []

- id: monitor
  label: Event Monitor Stream
  kind: action
  command: "GET http://<device-ip>/bha-api/monitor.cgi?ring=<events>"
  description: Continuous multipart stream of doorbell/motion state
  params:
    - name: ring
      type: string
      enum: [doorbell, motionsensor]

- id: audio_receive
  label: Live Audio Receive (G.711 µ-law)
  kind: action
  command: "GET http://<device-ip>/bha-api/audio-receive.cgi"
  description: G.711 µ-law, 8000 Hz
  params: []

- id: audio_transmit
  label: Live Audio Transmit (G.711 µ-law)
  kind: action
  command: "POST http://<device-ip>/bha-api/audio-transmit.cgi"
  description: G.711 µ-law, 8000 Hz body; only one consumer at a time
  params: []

- id: get_info
  label: Get Device Info
  kind: action
  command: "GET http://<device-ip>/bha-api/info.cgi"
  description: JSON with firmware version, build number, MAC, relays, device type (relays requires fw 000108+)
  params: []

- id: list_favorites
  label: List Favorites
  kind: action
  command: "GET http://<device-ip>/bha-api/favorites.cgi"
  description: Requires API-Operator permission and fw 000110+
  params: []

- id: save_favorite
  label: Save Favorite
  kind: action
  command: "GET http://<device-ip>/bha-api/favorites.cgi?action=save&type=<type>&title=<title>&value=<value>&id=<id>"
  params:
    - name: type
      type: string
      enum: [sip, http]
    - name: title
      type: string
    - name: value
      type: string
      description: HTTP(S) URL or SIP target
    - name: id
      type: integer
      optional: true

- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "GET http://<device-ip>/bha-api/favorites.cgi?action=remove&type=<type>&id=<id>"
  params:
    - name: type
      type: string
      enum: [sip, http]
    - name: id
      type: integer

- id: list_schedules
  label: List Schedules
  kind: action
  command: "GET http://<device-ip>/bha-api/schedule.cgi"
  description: Requires API-Operator permission and fw 000110+
  params: []

- id: add_update_schedule
  label: Add/Update Schedule Entry
  kind: action
  command: "POST http://<device-ip>/bha-api/schedule.cgi"
  description: JSON body with input, param, output array
  params:
    - name: body
      type: json
      description: "Object with input (doorbell|motion|rfid|fingerprint), param, output[]"

- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  command: "GET http://<device-ip>/bha-api/schedule.cgi?action=remove&input=<input>&param=<param>"
  params:
    - name: input
      type: string
      enum: [doorbell, motion, rfid]
    - name: param
      type: string

- id: restart
  label: Restart Device
  kind: action
  command: "GET http://<device-ip>/bha-api/restart.cgi"
  description: Reboots device; no diagnostic sound after
  params: []

- id: sip_register
  label: SIP Register
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=registration&user=<user>&password=<password>&url=<url>"
  params:
    - name: user
      type: string
    - name: password
      type: string
    - name: url
      type: string

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=makecall&url=<url>"
  params:
    - name: url
      type: string
      description: SIP URL e.g. sip:108@192.168.123.22

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=hangup"
  params: []

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=settings&<param>=<value>"
  params:
    - name: enable
      type: integer
      enum: [0, 1]
      optional: true
    - name: mic_volume
      type: integer
      range: [1, 100]
      optional: true
    - name: spk_volume
      type: integer
      range: [1, 100]
      optional: true
    - name: dtmf
      type: integer
      enum: [0, 1]
      optional: true
    - name: autocall_doorbell_url
      type: string
      optional: true
      description: "DEPRECATED, use schedule.cgi"
    - name: relay1_passcode
      type: integer
      range: [0, 99999999]
      optional: true
    - name: incoming_call_enable
      type: integer
      enum: [0, 1]
      optional: true
    - name: incoming_call_user
      type: string
      optional: true
    - name: anc
      type: integer
      enum: [0, 1]
      optional: true
    - name: ring_time_limit
      type: integer
      range: [10, 300]
      optional: true
    - name: call_time_limit
      type: integer
      range: [30, 300]
      optional: true

- id: sip_status
  label: SIP Status Query
  kind: query
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=status"
  description: Returns LASTERRORCODE, LASTERRORTEXT
  params: []

- id: sip_reset
  label: SIP Reset
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=reset"
  description: Resets SIP proxy + settings, hangs up ongoing call
  params: []

- id: rtsp_live_video
  label: RTSP Live Video
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  description: H.264 stream, up to 12 fps; requires RTSP auth
  params: []

- id: rtsp_live_video_hd
  label: RTSP Live Video 720p
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/720p/media.amp"
  description: 720p H.264; D10x/D21x fw 129+
  params: []

- id: rtsp_live_video_fhd
  label: RTSP Live Video 1080p
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/1080p/media.amp"
  description: 1080p H.264; D11x only
  params: []

- id: rtsp_live_video_http_tunnel
  label: RTSP-over-HTTP Live Video
  kind: action
  command: "rtsp://<device-ip>:8557/mpeg/media.amp"
  params: []
```

## Feedbacks
```yaml
# Each observable state from info.cgi and SIP status
- id: firmware_version
  type: string
  description: e.g. "000108"
- id: build_number
  type: string
- id: primary_mac_address
  type: string
- id: relays
  type: array
  description: List of relay identifiers (physical + paired IP I/O DoorControllers)
- id: device_type
  type: string
  description: e.g. "DoorBird D101"
- id: sip_last_error_code
  type: string
  description: "200 = registered OK"
- id: sip_last_error_text
  type: string
- id: session_id
  type: string
  description: Temporary, 10-minute validity
- id: notification_encryption_key
  type: string
  description: 32-64 bytes; ChaCha20-Poly1305 uses first 32 bytes; valid until user password changes
```

## Variables
```yaml
# Per-device configuration parameters documented under sip.cgi?action=settings
- id: sip_enabled
  type: integer
  enum: [0, 1]
  default: 0
- id: mic_volume
  type: integer
  range: [1, 100]
  default: 33
- id: speaker_volume
  type: integer
  range: [1, 100]
  default: 70
- id: dtmf_enabled
  type: integer
  enum: [0, 1]
  default: 0
- id: autocall_doorbell_url
  type: string
  description: DEPRECATED - use schedule.cgi
- id: relay1_passcode
  type: integer
  range: [0, 99999999]
- id: incoming_call_enabled
  type: integer
  enum: [0, 1]
  default: 0
- id: incoming_call_user
  type: string
- id: anc_enabled
  type: integer
  enum: [0, 1]
  default: 1
- id: ring_time_limit
  type: integer
  range: [10, 300]
  default: 300
- id: call_time_limit
  type: integer
  range: [30, 300]
  default: 300
```

## Events
```yaml
# UDP broadcast events (ChaCha20-Poly1305 encrypted, VERSION 0x02)
# Sent on UDP ports 6524 and 35344 for every user/device
# Keepalive broadcasts every 7 seconds - skip those
- id: doorbell_event
  description: "Encrypted UDP broadcast when doorbell pressed; decrypted EVENT field = doorbell number"
  transport: udp
  ports: [6524, 35344]
  packet_format:
    ident: "0xDE 0xAD 0xBE"
    version: "0x02"
    nonce_length_bytes: 8
    ciphertext_length_bytes: 34
    algorithm: ChaCha20-Poly1305
  decrypted_fields:
    - INTERCOM_ID (6 bytes, ASCII)
    - EVENT (8 bytes, padded with spaces; doorbell number or "motion")
    - TIMESTAMP (4 bytes, big-endian Unix timestamp)

# HTTP multipart monitor stream events
- id: monitor_doorbell_state
  description: "Multipart stream emits 'doorbell:H' / 'doorbell:L' parts"
  transport: http
- id: monitor_motion_state
  description: "Multipart stream emits 'motionsensor:H' / 'motionsensor:L' parts"
  transport: http
```

## Macros
```yaml
# UNRESOLVED: source documents individual CGIs; no composite multi-step sequences defined.
```

## Safety
```yaml
confirmation_required_for:
  - restart  # reboots device
interlocks:
  - description: "Concurrent audio/video limit: only one simultaneous live call. Additional callers receive HTTP 503."
  - description: "Auth rate-limit: wrong credentials block IP/user for 1 minute (HTTP 423)."
  - description: "RTSP/video stream can be interrupted at any time by official DoorBird App (precedence)."
# UNRESOLVED: no electrical/lockout safety warnings in source (this is a network API doc).
```

## Notes
- Rate limit: max 1 concurrent API connection per second.
- HTTPS uses self-signed cert; clients must accept or pin it.
- Session IDs expire after 10 minutes; NOTIFICATION_ENCRYPTION_KEY lasts until user password changes.
- SIP calls auto-hangup after 180 seconds; minimum 3 seconds between SIP requests.
- AEC/ANR must be implemented client-side for audio.
- Video/audio over HTTPS not supported — use sessionid parameter for those streams.
- UV v1 (Argon2i) deprecated Nov 2023; use v2 (ChaCha20-Poly1305, IDENT 0xDEADBEEF + VERSION 0x02).

<!-- UNRESOLVED: D2102V not named verbatim in source; spec covers D21x family. RTSP FHD path is D11x-only — may not apply to D2102V. -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-05-12T19:06:45.697Z
last_checked_at: 2026-09-04T22:16:32.775Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-04T22:16:32.775Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions match source endpoints verbatim; transport parameters (ports 80/443/554/8557/5060/6524/35344) are documented in source. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "D2102V not named explicitly in source — spec targets D21x family per compatibility table"
- "source documents individual CGIs; no composite multi-step sequences defined."
- "no electrical/lockout safety warnings in source (this is a network API doc)."
- "D2102V not named verbatim in source; spec covers D21x family. RTSP FHD path is D11x-only — may not apply to D2102V."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
