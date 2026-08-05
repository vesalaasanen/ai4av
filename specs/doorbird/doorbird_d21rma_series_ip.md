---
spec_id: admin/doorbird-d21rma-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird D21RMA Series Control Spec"
manufacturer: DoorBird
model_family: "DoorBird Video Door Station D21x"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "DoorBird Video Door Station D21x"
    - "DoorBird Video Door Station D21RMA"
  firmware: "\"000108\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-07-22T00:00:50.582Z
last_checked_at: 2026-07-22T01:01:59.796Z
generated_at: 2026-07-22T01:01:59.796Z
firmware_coverage: "\"000108\""
protocol_coverage: []
known_gaps:
  - "source covers the broader D21x family; D21RMA-specific deltas not separately documented."
  - "no continuous-valued settable parameters are documented beyond SIP settings (which are inlined as action params)."
  - "no multi-step sequences explicitly documented as macros."
  - "no explicit hardware interlock or safety-shutdown procedures documented."
  - "D21RMA-specific features/quirks not separately enumerated in source; spec applies to broader D21x family."
verification:
  verdict: verified
  checked_at: 2026-07-22T01:01:59.796Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched literal endpoints in source; transport parameters verified; no uncovered commands. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# DoorBird D21RMA Series Control Spec

## Summary
This spec covers the LAN-2-LAN API for the DoorBird D21RMA Series video door stations (compatible family: D21x hardware ≥1.00, firmware ≥000108). The device exposes an HTTP/HTTPS API for live video, live audio (G.711 µ-law), door/light relay control, history, monitoring, favorites, schedules, SIP calling and device info. The device also broadcasts encrypted event notifications over UDP and supports peer-2-peer SIP on port 5060.

<!-- UNRESOLVED: source covers the broader D21x family; D21RMA-specific deltas not separately documented. -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  base_url: "http://<device-ip>/bha-api/"
  http_port: 80
  https_port: 443
  rtsp_port: 554
  rtsp_over_http_port: 8557
  sip_port: 5060
  event_udp_ports:
    - 6524
    - 35344
auth:
  type: basic_or_digest  # source: RFC 2617 Basic/Digest auth required; alternative plaintext http-user/http-password params
  scheme: basic_or_digest
# Note: RTSP uses standard RTSP authentication (separate from HTTP), per source.
```

## Traits
```yaml
- powerable       # inferred from restart.cgi and SIP/reboot behavior
- routable        # inferred from open-door.cgi and light-on.cgi relay control
- queryable       # inferred from info.cgi, sip.cgi?action=status, monitor.cgi
- streamable      # inferred from live video/audio endpoints (HTTP MJPEG, RTSP H.264, G.711 audio)
```

## Actions
```yaml
# Each entry below corresponds to one named HTTP endpoint documented in the source.
# HTTP base: http://<device-ip>/bha-api/

- id: get_session
  label: Get Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi"
  params: []

- id: invalidate_session
  label: Invalidate Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate={session_id}"
  params:
    - name: session_id
      type: string

- id: live_video
  label: Live Video Stream (multipart MJPEG)
  kind: action
  command: "GET /bha-api/video.cgi"
  params: []

- id: live_image
  label: Live Image (single JPEG)
  kind: action
  command: "GET /bha-api/image.cgi"
  params: []

- id: open_door
  label: Open Door / Energize Relay
  kind: action
  command: "GET /bha-api/open-door.cgi?r={relay}"
  params:
    - name: relay
      type: string
      description: "1, 2, or <doorcontrollerID>@<relay>; default physical relay 1"

- id: light_on
  label: Energize Light Relay
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []

- id: history_image
  label: History Image (JPEG)
  kind: action
  command: "GET /bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: "1..50; 1 is latest"
    - name: event
      type: string
      description: "doorbell | motionsensor (optional)"

- id: monitor_stream
  label: Monitor Stream (multipart event stream)
  kind: action
  command: "GET /bha-api/monitor.cgi?ring=doorbell,motionsensor"
  params:
    - name: ring
      type: string
      description: "doorbell | motionsensor (comma-separated)"

- id: audio_receive
  label: Live Audio Receive (G.711 µ-law)
  kind: action
  command: "GET /bha-api/audio-receive.cgi"
  params: []

- id: audio_transmit
  label: Live Audio Transmit (G.711 µ-law)
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params: []

- id: info
  label: Device Info (version, relays, MAC, type)
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
  command: "GET /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: type
      type: string
      description: "sip | http"
    - name: title
      type: string
    - name: value
      type: string
      description: "URL / SIP target"
    - name: id
      type: integer
      description: "Optional; omit for new favorite"

- id: favorites_remove
  label: Delete Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: type
      type: string
      description: "sip | http"
    - name: id
      type: integer

- id: schedule_list
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []

- id: schedule_add_or_update
  label: Add or Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params: []

- id: schedule_remove
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: input
      type: string
      description: "doorbell | motion | rfid"
    - name: param
      type: string
      description: "doorbell number, transponder id, etc."

- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []

- id: sip_registration
  label: SIP Register to Proxy
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
    - name: password
      type: string
    - name: url
      type: string
      description: "SIP proxy IP/hostname"

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: "SIP URL e.g. sip:108@192.168.123.22"

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params: []

- id: sip_settings
  label: SIP Configure Settings
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&enable={enable}&mic_volume={mic_volume}&spk_volume={spk_volume}&dtmf={dtmf}&relay1_passcode={relay1_passcode}&incoming_call_enable={incoming_call_enable}&incoming_call_user={incoming_call_user}&anc={anc}&ring_time_limit={ring_time_limit}&call_time_limit={call_time_limit}"
  params:
    - name: enable
      type: integer
      description: "0..1; enable SIP registration after reboot"
    - name: mic_volume
      type: integer
      description: "1..100"
    - name: spk_volume
      type: integer
      description: "1..100"
    - name: dtmf
      type: integer
      description: "0..1"
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED; use schedule.cgi"
    - name: relay1_passcode
      type: integer
      description: "0..99999999; DTMF pin for relay 1"
    - name: incoming_call_enable
      type: integer
      description: "0..1"
    - name: incoming_call_user
      type: string
      description: "Allowed SIP user"
    - name: anc
      type: integer
      description: "0..1; acoustic noise cancellation"
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
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params: []

- id: rtsp_live_video_720p
  label: RTSP Live Video 720p
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/720p/media.amp"
  params: []
  notes: "Supported on D10x/D21x from firmware 000129"

- id: rtsp_live_video_1080p
  label: RTSP Live Video 1080p
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/1080p/media.amp"
  params: []
  notes: "Supported on D11x only"

- id: rtsp_live_video_over_http
  label: RTSP-over-HTTP Live Video
  kind: action
  command: "rtsp://<device-ip>:8557/mpeg/media.amp"
  params: []
```

## Feedbacks
```yaml
- id: info_version_firmware
  type: string
  source: info.cgi -> BHA.VERSION[].FIRMWARE
- id: info_version_build
  type: string
  source: info.cgi -> BHA.VERSION[].BUILD_NUMBER
- id: info_primary_mac
  type: string
  source: info.cgi -> BHA.VERSION[].PRIMARY_MAC_ADDR
- id: info_relays
  type: string_array
  source: info.cgi -> BHA.VERSION[].RELAYS
  description: "List of physical relays and paired IP I/O DoorController relay IDs"
- id: info_device_type
  type: string
  source: info.cgi -> BHA.VERSION[].DEVICE-TYPE
- id: session_id
  type: string
  source: getsession.cgi -> BHA.SESSIONID
- id: notification_encryption_key
  type: string
  source: getsession.cgi -> BHA.NOTIFICATION_ENCRYPTION_KEY (32-64 bytes)
- id: return_code
  type: string
  source: BHA.RETURNCODE ("1" = success on most endpoints)
- id: monitor_doorbell_event
  type: enum
  values: [H, L]
  source: monitor.cgi multipart stream (H = high/pressed, L = low/released)
- id: monitor_motion_event
  type: enum
  values: [H, L]
  source: monitor.cgi multipart stream
- id: sip_last_error_code
  type: string
  source: sip.cgi?action=status -> LASTERRORCODE ("200" means registered)
- id: sip_last_error_text
  type: string
  source: sip.cgi?action=status -> LASTERRORTEXT
```

## Variables
```yaml
# UNRESOLVED: no continuous-valued settable parameters are documented beyond SIP settings (which are inlined as action params).
```

## Events
```yaml
- id: udp_doorbell_event
  description: "Encrypted UDP broadcast on ports 6524 and 35344 indicating a doorbell event"
  source: "UDP broadcast (ChaCha20-Poly1305, v2)"
  details:
    ident_bytes: "0xDE 0xAD 0xBE"
    version: 2
    cipher: ChaCha20-Poly1305
    nonce_length_bytes: 8
    ciphertext_length_bytes: 34
    keep_alive_interval_seconds: 7
    decrypt_payload:
      - intercom_id: "first 6 chars of DoorBird username"
      - event: "doorbell number or 'motion' (8 bytes, space-padded)"
      - timestamp: "4-byte Unix timestamp"

- id: udp_motion_event
  description: "Encrypted UDP broadcast for motion sensor trigger"
  source: "Same UDP broadcast mechanism as doorbell event; event field = 'motion'"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented as macros.
```

## Safety
```yaml
confirmation_required_for:
  - restart  # device-level restart; no diagnostic sound after
  - sip_settings  # affects SIP service permanently across reboots
  - favorites_remove  # cascading schedule entry removal if favorite in active schedule
  - schedule_remove
interlocks: []
# UNRESOLVED: no explicit hardware interlock or safety-shutdown procedures documented.
```

## Notes
- Rate limit: max 1 concurrent connection per second for API access. Wrong-auth abuse → IP or user blocked 1 minute (HTTP 423).
- Video/audio streams may be interrupted when the official DoorBird App preempts (precedence over LANAPI users).
- SIP: only 1 simultaneous call supported. Each call auto-hangs up 180 seconds after initiation. Wait ≥3 seconds between SIP requests.
- SIP P2P: peer-2-peer SIP supported from firmware 000099; device listens on port 5060 when enabled.
- Audio codec: G.711 µ-law, 8000 Hz sampling, single channel (mono). Client must perform AEC/ANR.
- RTSP H.264 stream up to ~12 fps. 720p on D10x/D21x requires firmware ≥000129; 1080p on D11x only.
- HTTPS uses a self-signed certificate (LAN only); CA-issued certs for IP addresses are not possible.
- Session IDs and NOTIFICATION_ENCRYPTION_KEY are required for video/audio streams and UDP event decryption respectively.
- Monitor stream: up to 8 concurrent streams allowed; HTTP 509 when busy.
- Source revision: 0.36 dated 2023-11-13.

<!-- UNRESOLVED: D21RMA-specific features/quirks not separately enumerated in source; spec applies to broader D21x family. -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-07-22T00:00:50.582Z
last_checked_at: 2026-07-22T01:01:59.796Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:01:59.796Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched literal endpoints in source; transport parameters verified; no uncovered commands. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source covers the broader D21x family; D21RMA-specific deltas not separately documented."
- "no continuous-valued settable parameters are documented beyond SIP settings (which are inlined as action params)."
- "no multi-step sequences explicitly documented as macros."
- "no explicit hardware interlock or safety-shutdown procedures documented."
- "D21RMA-specific features/quirks not separately enumerated in source; spec applies to broader D21x family."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
