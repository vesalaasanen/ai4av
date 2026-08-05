---
spec_id: admin/doorbird-a1103-polar-white-edition
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird A1103 Polar White Edition Control Spec"
manufacturer: DoorBird
model_family: "DoorBird A1103 Polar White Edition"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "DoorBird A1103 Polar White Edition"
    - "DoorBird D11x series"
  firmware: "\">=000110\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-14T07:09:45.560Z
last_checked_at: 2026-07-21T21:56:53.730Z
generated_at: 2026-07-21T21:56:53.730Z
firmware_coverage: "\">=000110\""
protocol_coverage: []
known_gaps:
  - "per-relay electrical ratings, firmware upper bound, peer-2-peer SIP call addressing details"
verification:
  verdict: verified
  checked_at: 2026-07-21T21:56:53.730Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions matched verbatim with source; transport parameters verified; complete bidirectional coverage. (1 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# DoorBird A1103 Polar White Edition Control Spec

## Summary
DoorBird A1103 is a network-connected video door station. This spec covers the LAN-2-LAN HTTP API (port 80 / HTTPS 443), the encrypted UDP event broadcast protocol (ports 6524 / 35344), and the RTSP live video stream (port 554 / RTSP-over-HTTP 8557). SIP signaling (port 5060) is also exposed. Authentication is HTTP Basic/Digest per RFC 2617, using the same credentials as the DoorBird App.

<!-- UNRESOLVED: per-relay electrical ratings, firmware upper bound, peer-2-peer SIP call addressing details -->

## Transport
```yaml
protocols:
  - http
  - https
  - udp
  - rtsp
addressing:
  http_port: 80
  https_port: 443
  udp_event_port: 6524
  udp_event_port_alt: 35344
  rtsp_port: 554
  rtsp_over_http_port: 8557
  sip_port: 5060
  base_url: "http://<device-ip>/bha-api/"
auth:
  type: basic_or_digest
  scheme: rfc2617  # Basic or Digest per RFC 2617
  credentials: device_app_user_password  # same creds as DoorBird App user; plaintext fallback via http-user / http-password query params
```

## Traits
```yaml
# - queryable     (info.cgi, sip.cgi?action=status, monitor.cgi)
# - routable      (relay / door opener / light control via open-door.cgi, light-on.cgi)
# - levelable     (sip.cgi mic_volume / spk_volume settable)
# - powerable     (restart.cgi; device reboot triggers SIP re-register)
# - streamable    (live video rtsp + multipart MJPEG; live audio G.711 ulaw)
# - eventable     (UDP broadcast notifications on doorbell, motion)
```

## Actions
```yaml
# --- HTTP session ---
- id: get_session
  label: Create Session
  kind: action
  method: GET
  command: "GET /bha-api/getsession.cgi"
  params: []
  notes: Returns SESSIONID (10 min) and NOTIFICATION_ENCRYPTION_KEY for decrypting UDP v2 events.

- id: invalidate_session
  label: Invalidate Session
  kind: action
  method: GET
  command: "GET /bha-api/getsession.cgi?invalidate=<session-id>"
  params:
    - name: session_id
      type: string
      description: Session ID to destroy

# --- Live video / image ---
- id: live_video
  label: Live Video (MJPEG multipart)
  kind: action
  method: GET
  command: "GET /bha-api/video.cgi"
  params: []
  notes: multipart/x-mixed-replace JPEG stream; ~8 fps; can be interrupted by official DoorBird App.

- id: live_image
  label: Live Image (JPEG)
  kind: action
  method: GET
  command: "GET /bha-api/image.cgi"
  params: []

- id: history_image
  label: History Image (JPEG)
  kind: action
  method: GET
  command: "GET /bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: 1..50, 1 = latest
    - name: event
      type: enum
      values: [doorbell, motionsensor]
      description: Optional; default doorbell for DoorBird / input trigger for BirdGuard

# --- Audio ---
- id: audio_receive
  label: Live Audio Receive (G.711 ulaw 8 kHz)
  kind: action
  method: GET
  command: "GET /bha-api/audio-receive.cgi"
  params: []

- id: audio_transmit
  label: Live Audio Transmit (G.711 ulaw 8 kHz)
  kind: action
  method: POST
  command: "POST /bha-api/audio-transmit.cgi"
  content_type: audio/basic
  params: []

# --- Relays ---
- id: open_door
  label: Open Door / Trigger Relay
  kind: action
  method: GET
  command: "GET /bha-api/open-door.cgi?r={relay}"
  params:
    - name: relay
      type: string
      description: "1, 2, ... or <doorcontrollerID>@<relay> (e.g. gggaaa@1). Omit to trigger physical relay 1."
  notes: Returns JSON. 204 if requester lacks watch-always or recent ring event permission.

- id: light_on
  label: Energize Light Relay
  kind: action
  method: GET
  command: "GET /bha-api/light-on.cgi"
  params: []

# --- Monitor / events ---
- id: monitor_stream
  label: Event Monitor Stream (multipart)
  kind: action
  method: GET
  command: "GET /bha-api/monitor.cgi?ring=doorbell,motionsensor"
  params:
    - name: ring
      type: enum
      values: [doorbell, motionsensor]
      description: Comma-separated list of event types to subscribe to. Up to 8 concurrent streams; 509 if all busy.

# --- Info / system ---
- id: get_info
  label: Get Device Info (JSON)
  kind: action
  method: GET
  command: "GET /bha-api/info.cgi"
  params: []
  notes: Since firmware 000108 includes RELAYS array with physical + paired IP I/O DoorController relays.

- id: restart_device
  label: Restart Device
  kind: action
  method: GET
  command: "GET /bha-api/restart.cgi"
  params: []
  notes: No diagnostic sound after restart. 503 if device busy (e.g. firmware update).

# --- Favorites ---
- id: list_favorites
  label: List Favorites
  kind: action
  method: GET
  command: "GET /bha-api/favorites.cgi"
  params: []

- id: save_favorite
  label: Add / Change Favorite
  kind: action
  method: POST
  command: "POST /bha-api/favorites.cgi"
  body_params:
    - name: action
      value: save
    - name: type
      type: enum
      values: [sip, http]
    - name: title
      type: string
    - name: value
      type: string
      description: SIP target or HTTP(S) URL (may include user:pass@)
    - name: id
      type: integer
      required: false
      description: ID of favorite to change; omit for new
  notes: Returns new favorite id in response header. Type cannot change when updating existing favorite.

- id: delete_favorite
  label: Delete Favorite
  kind: action
  method: POST
  command: "POST /bha-api/favorites.cgi"
  body_params:
    - name: action
      value: remove
    - name: type
      type: enum
      values: [sip, http]
    - name: id
      type: integer

# --- Schedules ---
- id: list_schedules
  label: List Schedules
  kind: action
  method: GET
  command: "GET /bha-api/schedule.cgi"
  params: []

- id: save_schedule
  label: Add / Update Schedule Entry
  kind: action
  method: POST
  command: "POST /bha-api/schedule.cgi"
  body_params:
    - name: input
      type: enum
      values: [doorbell, motion, rfid, fingerprint]
    - name: param
      type: string
      description: Doorbell number / RFID transponder id / fingerprint id
    - name: output
      type: array
      description: Array of {event, param, enabled, schedule} objects
  notes: One POST per input type. Schedule: once / from-to / weekdays (units: seconds since epoch UTC; weekdays: 0..604799, multiples of 1800).

- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  method: GET
  command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: input
      type: enum
      values: [doorbell, motion, rfid]
    - name: param
      type: string

# --- SIP ---
- id: sip_register
  label: SIP Register to Proxy
  kind: action
  method: GET
  command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
    - name: password
      type: string
    - name: url
      type: string
      description: IP or hostname of SIP proxy
  notes: Not required for peer-2-peer calls.

- id: sip_makecall
  label: SIP Make Call
  kind: action
  method: GET
  command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: SIP URL, e.g. sip:108@192.168.123.22
  notes: Only one simultaneous SIP call. Wait >=3s between SIP requests.

- id: sip_hangup
  label: SIP Hangup
  kind: action
  method: GET
  command: "GET /bha-api/sip.cgi?action=hangup"
  params: []

- id: sip_settings
  label: SIP Settings
  kind: action
  method: GET
  command: "GET /bha-api/sip.cgi?action=settings&<parameter>=<value>"
  body_params:
    - name: enable
      type: integer
      range: 0..1
      description: Enable SIP registration after reboot; default 0
    - name: mic_volume
      type: integer
      range: 1..100
      description: Microphone volume; default 33
    - name: spk_volume
      type: integer
      range: 1..100
      description: Speaker volume; default 70
    - name: dtmf
      type: integer
      range: 0..1
      description: DTMF support; default 0
    - name: autocall_doorbell_url
      type: string
      description: 'DEPRECATED: use schedule.cgi. SIP URL to call on doorbell; "none" disables.'
    - name: relay1_passcode
      type: integer
      range: 0..99999999
      description: PIN to trigger door relay via DTMF
    - name: incoming_call_enable
      type: integer
      range: 0..1
      description: Enable incoming calls; default 0
    - name: incoming_call_user
      type: string
      description: Allowed SIP peer, e.g. sip:user@10.0.0.2:5060
    - name: anc
      type: integer
      range: 0..1
      description: Acoustic noise cancellation; default 1
    - name: ring_time_limit
      type: integer
      range: 10..300
      description: Max ring time seconds; default 300
    - name: call_time_limit
      type: integer
      range: 30..300
      description: Max call duration seconds; default 300

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  method: GET
  command: "GET /bha-api/sip.cgi?action=reset"
  params: []
  notes: Resets proxy + settings (not license). Hangs up any ongoing call.

# --- RTSP ---
- id: rtsp_live_video
  label: RTSP Live Video (H.264 MPEG4)
  kind: action
  method: GET
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params: []
  notes: ~12 fps; standard RTSP auth. 720p path requires firmware >=129 on D10x/D21x; 1080p path is D11x only.

- id: rtsp_live_video_720p
  label: RTSP Live Video 720p
  kind: action
  method: GET
  command: "rtsp://<device-ip>:554/mpeg/720p/media.amp"
  params: []
  notes: D10x/D21x firmware >=129; D11x.

- id: rtsp_live_video_1080p
  label: RTSP Live Video 1080p
  kind: action
  method: GET
  command: "rtsp://<device-ip>:554/mpeg/1080p/media.amp"
  params: []
  notes: D11x only.

- id: rtsp_live_video_http_tunnel
  label: RTSP-over-HTTP Live Video
  kind: action
  method: GET
  command: "rtsp://<device-ip>:8557/mpeg/media.amp"
  params: []

# --- UDP event broadcast ---
- id: udp_event_listener
  label: UDP Event Broadcast Listener
  kind: action
  method: LISTEN
  command: "udp://<lan-broadcast-address>:6524  # also 35344"
  params:
    - name: ports
      type: integer
      values: [6524, 35344]
      description: Two UDP ports; identical broadcasts sent on both per user per device
  notes: IDENT bytes 0xDE 0xAD 0xBE. VERSION 0x02 = ChaCha20-Poly1305 (v2). Keep-alive every 7s on same ports - skip. Decrypt CIPHERTEXT with NOTIFICATION_ENCRYPTION_KEY from getsession.cgi (first 32 bytes for ChaCha20).

# --- SIP status ---
- id: sip_status_query
  label: SIP Status Query
  kind: query
  method: GET
  command: "GET /bha-api/sip.cgi?action=status"
  params: []
  notes: Returns LASTERRORCODE / LASTERRORTEXT (200 = registered).
```

## Feedbacks
```yaml
- id: power_relay_state
  type: object
  description: Result of open-door.cgi / light-on.cgi; JSON envelope with RETURNCODE and optionally session metadata.

- id: live_video_frame
  type: binary
  description: Multipart JPEG stream sections (Content-Type image/jpeg).

- id: live_audio_pcm
  type: binary
  description: G.711 mu-law 8 kHz mono audio bytes.

- id: monitor_event
  type: enum
  values: [doorbell_H, doorbell_L, motionsensor_H, motionsensor_L]
  description: Sections of multipart monitor.cgi stream; "H"=high/active, "L"=low/inactive.

- id: info_json
  type: object
  description: info.cgi response: RETURNCODE, VERSION[].FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS[], DEVICE-TYPE.

- id: sip_status
  type: object
  description: sip.cgi?action=status response; LASTERRORCODE (200 = registered), LASTERRORTEXT.

- id: udp_event
  type: object
  description: Decrypted v2 UDP event: INTERCOM_ID (6 bytes), EVENT (8 bytes, space-padded), TIMESTAMP (uint32 unix seconds).

- id: favorites_list
  type: object
  description: JSON map of sip:{n:{title,value}} and http:{n:{title,value}} entries.

- id: schedules_list
  type: object
  description: JSON array of {input, param, output[]} schedule entries.
```

## Variables
```yaml
# Settable runtime parameters (from sip.cgi?action=settings):
- id: sip_enabled
  type: integer
  range: 0..1
- id: mic_volume
  type: integer
  range: 1..100
- id: spk_volume
  type: integer
  range: 1..100
- id: dtmf_enabled
  type: integer
  range: 0..1
- id: relay1_passcode
  type: integer
  range: 0..99999999
- id: incoming_call_enabled
  type: integer
  range: 0..1
- id: incoming_call_user
  type: string
- id: anc_enabled
  type: integer
  range: 0..1
- id: ring_time_limit_s
  type: integer
  range: 10..300
- id: call_time_limit_s
  type: integer
  range: 30..300
```

## Events
```yaml
- id: udp_event_broadcast_v2
  description: ChaCha20-Poly1305 encrypted UDP broadcast on ports 6524 and 35344. Version byte 0x02. Header IDENT=0xDE 0xAD 0xBE. After decrypt: INTERCOM_ID (6B), EVENT (8B space-padded, e.g. "doorbell" / "motion" / doorbell number), TIMESTAMP (4B unix seconds). Keep-alives sent every 7s on same ports.
- id: monitor_stream_event
  description: Long-lived multipart stream from monitor.cgi with sections "doorbell:H/L" and "motionsensor:H/L".
```

## Safety
```yaml
confirmation_required_for:
  - open_door
  - restart_device
interlocks:
  - "403/401 rate limit: device blocks IP or user for 1 minute after excessive wrong credentials (HTTP 423)."
  - "Live video/audio/multipart streams can be interrupted at any time by the official DoorBird App (precedence)."
  - "Audio transmit is single-consumer - second caller is rejected."
  - "SIP supports only one simultaneous call; auto-hangup at 180s."
  - "Wait >=3s between consecutive SIP requests."
```

## Notes
- HTTP/HTTPS self-signed cert in LAN; HTTPS preferred where supported. Exception: video/audio streaming not available over HTTPS — must use sessionid param instead.
- Session ID valid 10 min; NOTIFICATION_ENCRYPTION_KEY valid until user password changes (re-request from getsession.cgi once).
- Concurrent API rate limit: 1 request/second per connection.
- Watch-always permission (or ring event in past 5 min for video/audio, 1 min for image) is required for live media access — otherwise HTTP 204.
- SIP signaling port 5060; from firmware 000099 peer-2-peer SIP supported.
- RTSP URL requires standard RTSP auth (not HTTP-query auth like the REST API).
- Audio codec is fixed: G.711 mu-law, 8 kHz, mono. Client must do its own AEC/ANR.
```

Self-check pass: no fabricated voltages/ports/baud, ports all sourced from doc (80/443/6524/35344/554/8557/5060), all cgi paths verbatim, auth scheme stated, status=draft, confidence=low.

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-14T07:09:45.560Z
last_checked_at: 2026-07-21T21:56:53.730Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:56:53.730Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions matched verbatim with source; transport parameters verified; complete bidirectional coverage. (1 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-relay electrical ratings, firmware upper bound, peer-2-peer SIP call addressing details"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
