---
spec_id: admin/doorbird-d3100e-rear-mount
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird D3100E Rear Mount Control Spec"
manufacturer: DoorBird
model_family: D3100E
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - D3100E
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-14T07:03:54.607Z
last_checked_at: 2026-07-21T22:27:55.494Z
generated_at: 2026-07-21T22:27:55.494Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document covers the full DoorBird/BirdGuard product line rather than the D3100E specifically. Firmware version requirements vary per endpoint (e.g. favorites/schedules require firmware 000110+, relay info in info.cgi requires 000108+)."
  - "voltage, current, power, and electrical specifications not stated in source."
  - "credential format follows DoorBird App user accounts; not separately specified"
  - "powerable trait not applicable — door station is mains-powered, no power on/off command documented."
  - "specific D3100E firmware version not stated — all firmware-dependent features use generic DoorBird firmware thresholds."
  - "RTSP stream parameter (<device-rtsp-port>) port value not explicitly bound; uses 554 by default."
  - "physical relay count and electrical ratings for D3100E not in source."
  - "paired IP I/O DoorController model identifiers (gggaaa placeholder) not enumerated in source."
verification:
  verdict: verified
  checked_at: 2026-07-21T22:27:55.494Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions match verbatim endpoints in source; HTTP transport on port 80 with RFC 2617 auth verified; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# DoorBird D3100E Rear Mount Control Spec

## Summary
The DoorBird D3100E is a video door station exposing a LAN-2-LAN HTTP API for third-party integration. This spec covers the HTTP-based control endpoints, UDP event broadcasts, and SIP interface documented in DoorBird's "LAN-2-LAN API" reference. The source document is generic to DoorBird/BirdGuard product lines; per-model coverage for D3100E specifically is not isolated.

<!-- UNRESOLVED: source document covers the full DoorBird/BirdGuard product line rather than the D3100E specifically. Firmware version requirements vary per endpoint (e.g. favorites/schedules require firmware 000110+, relay info in info.cgi requires 000108+). -->
<!-- UNRESOLVED: voltage, current, power, and electrical specifications not stated in source. -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 80      # HTTP, plain LAN access
  base_url: "http://<device-ip>/bha-api"
auth:
  type: basic_or_digest  # RFC 2617 Basic or Digest, per source
  # UNRESOLVED: credential format follows DoorBird App user accounts; not separately specified
```

**Notes:**
- HTTPS available on TCP port 443 with self-signed certificate (LAN access).
- RTSP on port 554, RTSP-over-HTTP on port 8557 (video stream, not covered as actions below).
- SIP signaling on port 5060.
- UDP event broadcasts on ports 6524 and 35344.
- Alternative plaintext HTTP auth via `http-user`/`http-password` query parameters supported but discouraged.

## Traits
```yaml
- queryable        # inferred from info.cgi, sip status queries
- routable         # inferred from open-door.cgi and light-on.cgi relay triggers
```

<!-- UNRESOLVED: powerable trait not applicable — door station is mains-powered, no power on/off command documented. -->

## Actions
```yaml
# CRITICAL: command field holds the literal HTTP path/payload from source verbatim.
# Each CGI endpoint listed in the source is enumerated as a separate action.

- id: get_session
  label: Get Session ID
  kind: query
  command: "GET /bha-api/getsession.cgi"
  params: []

- id: invalidate_session
  label: Invalidate Session
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate=<session-id>"
  params:
    - name: session_id
      type: string
      description: Session ID to invalidate

- id: live_video_request
  label: Live Video Stream (MJPEG)
  kind: action
  command: "GET /bha-api/video.cgi"
  params: []

- id: live_image_request
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
      description: "Relay to trigger: numeric (e.g. 1, 2) or paired I/O controller ID (e.g. gggaaa@1). Omit for physical relay 1."

- id: light_on
  label: Energize Light Relay
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []

- id: history_image_request
  label: History Image Request
  kind: query
  command: "GET /bha-api/history.cgi?index=<index>&event=<event>"
  params:
    - name: index
      type: integer
      description: History image index, 1..50 (1 = latest)
    - name: event
      type: string
      description: "Optional event filter: doorbell or motionsensor"

- id: monitor_request
  label: Monitor Doorbell / Motion Events
  kind: action
  command: "GET /bha-api/monitor.cgi?ring=doorbell[,motionsensor]"
  params:
    - name: ring
      type: string
      description: "Comma-separated event types to monitor: doorbell, motionsensor"

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
      description: "G.711 µ-law audio data, Content-Type: audio/basic, 8000 Hz mono"

- id: info_request
  label: Device Info / Version Query
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []

- id: list_favorites
  label: List Favorites
  kind: query
  command: "GET /bha-api/favorites.cgi"
  params: []

- id: add_or_change_favorite
  label: Add or Change Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=save&type=<type>&title=<title>&value=<value>&id=<id>"
  params:
    - name: type
      type: string
      description: "sip or http"
    - name: title
      type: string
      description: Name / short description
    - name: value
      type: string
      description: "URL (for http) or SIP address (for sip)"
    - name: id
      type: integer
      description: "Optional: ID of favorite to change; omit for new"

- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=remove&type=<type>&id=<id>"
  params:
    - name: type
      type: string
      description: "sip or http"
    - name: id
      type: integer
      description: ID of favorite to delete

- id: list_schedules
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []

- id: add_or_update_schedule
  label: Add or Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params:
    - name: body
      type: json
      description: "JSON object with input, param, output[], schedule fields (see source)"

- id: delete_schedule_entry
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input=<input>&param=<param>"
  params:
    - name: input
      type: string
      description: "Event type: doorbell, motion, rfid"
    - name: param
      type: string
      description: "Doorbell number, transponder id, etc."

- id: restart_device
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []

- id: sip_register
  label: SIP Register
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user=<user>&password=<password>&url=<url>"
  params:
    - name: user
      type: string
      description: SIP Proxy auth user
    - name: password
      type: string
      description: SIP Proxy auth password
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
      description: SIP URL to call

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
      description: "0..1, enable SIP registration after reboot"
    - name: mic_volume
      type: integer
      description: "1..100"
    - name: spk_volume
      type: integer
      description: "1..100"
    - name: dtmf
      type: integer
      description: "0..1, enable DTMF support"
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED: SIP URL to auto-call on doorbell; use schedule.cgi"
    - name: relay1_passcode
      type: integer
      description: "0..99999999, pincode to trigger relay via DTMF"
    - name: incoming_call_enable
      type: integer
      description: "0..1, enable incoming calls"
    - name: incoming_call_user
      type: string
      description: "Allowed SIP user (e.g. sip:10.0.0.1:5060)"
    - name: anc
      type: integer
      description: "0..1, acoustic noise cancellation"
    - name: ring_time_limit
      type: integer
      description: "10..300, max ring seconds"
    - name: call_time_limit
      type: integer
      description: "30..300, max call duration seconds"

- id: sip_status
  label: SIP Status Query
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  params: []

- id: sip_reset
  label: SIP Reset
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  params: []

- id: rtsp_live_video
  label: RTSP Live Video (H.264)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params: []
```

## Feedbacks
```yaml
- id: device_info
  type: object
  description: |
    JSON object from info.cgi containing RETURNCODE, VERSION[{FIRMWARE, BUILD_NUMBER}],
    PRIMARY_MAC_ADDR, RELAYS (firmware 000108+), DEVICE-TYPE.
- id: session_info
  type: object
  description: |
    JSON object containing SESSIONID and NOTIFICATION_ENCRYPTION_KEY (for UDP event decryption).
- id: doorbell_state
  type: enum
  values: [H, L]
  description: "H = high/active (ringing), L = low/inactive, from monitor.cgi multipart stream."
- id: motion_state
  type: enum
  values: [H, L]
  description: "H = motion detected, L = no motion, from monitor.cgi multipart stream."
- id: sip_status
  type: object
  description: "JSON with LASTERRORCODE and LASTERRORTEXT fields."
- id: udp_event_broadcast
  type: object
  description: |
    UDP broadcasts on ports 6524 and 35344. v2 format: IDENT(3) + VERSION(1) + NONCE(8)
    + CIPHERTEXT(34). Decrypted CIPHERTEXT contains INTERCOM_ID(6), EVENT(8 padded),
    TIMESTAMP(4 bytes Unix long).
- id: favorites_list
  type: object
  description: "JSON with sip{} and http{} keyed by favorite id, each with title and value."
- id: schedules_list
  type: array
  description: "JSON array of schedule entries with input, param, output[]."
- id: open_door_response
  type: json
  description: "JSON response from open-door.cgi (RETURNCODE)."
- id: light_on_response
  type: json
  description: "JSON response from light-on.cgi (RETURNCODE)."
- id: history_image
  type: binary
  description: "JPEG image data, Content-Type: image/jpeg."
- id: live_image
  type: binary
  description: "JPEG image data, Content-Type: image/jpeg."
- id: http_status_codes
  type: enum
  values: [200, 204, 400, 401, 423, 500, 503, 507, 509]
  description: |
    Standard response codes: 200 OK, 204 No permission, 400 Bad params,
    401 Auth required, 423 Locked (after wrong credentials), 500 Internal,
    503 Busy / device busy, 507 Size limit exceeded, 509 Max monitor streams.
```

## Variables
```yaml
# Settings exposed via sip.cgi?action=settings. Stored as device configuration.
- id: sip_enabled
  type: integer
  description: "0 or 1, SIP registration after reboot"
- id: sip_mic_volume
  type: integer
  description: "1..100, microphone volume (default 33)"
- id: sip_spk_volume
  type: integer
  description: "1..100, speaker volume (default 70)"
- id: sip_dtmf
  type: integer
  description: "0 or 1, DTMF support"
- id: sip_relay1_passcode
  type: integer
  description: "0..99999999, DTMF pincode for relay 1"
- id: sip_incoming_call_enable
  type: integer
  description: "0 or 1"
- id: sip_incoming_call_user
  type: string
  description: "Allowed SIP user identifier"
- id: sip_anc
  type: integer
  description: "0 or 1, acoustic noise cancellation"
- id: sip_ring_time_limit
  type: integer
  description: "10..300, max ring seconds (default 300)"
- id: sip_call_time_limit
  type: integer
  description: "30..300, max call duration seconds (default 300)"
```

## Events
```yaml
# Source documents UDP event broadcasts (v2) as the primary unsolicited notification channel.
- id: udp_doorbell_event
  source: "UDP broadcast ports 6524, 35344"
  description: |
    v2 packet: IDENT 0xDEADBEEF, VERSION 0x02, NONCE 8B, CIPHERTEXT 34B ChaCha20-Poly1305.
    Decrypted EVENT field (8B padded) identifies doorbell number (e.g. "1").
    Keep-alive broadcasts every 7 seconds on same ports - skip these for event decoding.
- id: udp_motion_event
  source: "UDP broadcast ports 6524, 35344"
  description: |
    Decrypted EVENT field "motion". Same packet format as doorbell events.
- id: monitor_stream_event
  source: "GET /bha-api/monitor.cgi?ring=doorbell,motionsensor"
  description: |
    Continuous multipart/x-mixed-replace stream with doorbell:H/L and motionsensor:H/L
    text sections. Max 8 concurrent streams; 509 if all busy.
```

## Macros
```yaml
# Multi-step sequences described explicitly in source.
- id: establish_udp_decryption_key
  description: |
    One-time setup: call GET /bha-api/getsession.cgi, extract NOTIFICATION_ENCRYPTION_KEY
    from response, store it. Key is valid until user password changes; use first 32 bytes
    for ChaCha20 decryption.
  steps:
    - action: get_session
      note: "Capture SESSIONID + NOTIFICATION_ENCRYPTION_KEY from JSON response"
- id: open_door_paired_controller
  description: |
    Trigger relay on a paired IP I/O DoorController via open-door.cgi.
  steps:
    - action: info_request
      note: "Find paired controller id from RELAYS array in JSON response"
    - action: open_door
      params: { relay: "<controller-id>@<relay-number>" }
```

## Safety
```yaml
confirmation_required_for:
  - restart_device
interlocks: []
# Source notes SIP calls auto-hangup at 180 seconds for security.
# Source notes 1-minute IP lockout after extensive wrong credentials (HTTP 423).
# No other safety interlocks documented.
```

## Notes
- Rate limit: max 1 concurrent API connection per second; block after wrong credentials for 1 minute.
- Live audio/video streams can be preempted by official DoorBird App requests.
- Audio codec: G.711 µ-law, 8000 Hz, mono required for HTTP audio endpoints.
- AES echo/noise cancellation (AEC/ANR) MUST be implemented client-side; device's algorithms are not exposed to third parties.
- Session ID validity: 10 minutes.
- RTSP live video: 720p stream requires firmware 129+ on D10x/D21x; 1080p requires D11x series.
- Favorites/schedules require firmware 000110+.
- info.cgi includes RELAYS only from firmware 000108+.
- HTTPS uses self-signed certificate (CA-issued certs not possible for IP addresses).
- Video/audio streaming over HTTPS not supported; use Session ID parameter instead.
- SIP service is single-call only; auto-hangup at 180 seconds; min 3s between SIP requests.

<!-- UNRESOLVED: specific D3100E firmware version not stated — all firmware-dependent features use generic DoorBird firmware thresholds. -->
<!-- UNRESOLVED: RTSP stream parameter (<device-rtsp-port>) port value not explicitly bound; uses 554 by default. -->
<!-- UNRESOLVED: physical relay count and electrical ratings for D3100E not in source. -->
<!-- UNRESOLVED: paired IP I/O DoorController model identifiers (gggaaa placeholder) not enumerated in source. -->
```

Spec formatted. 24 actions covering every CGI endpoint + RTSP, 12 feedbacks, 10 variables, 3 events, 2 macros. Generic DoorBird/BirdGuard scope flagged as UNRESOLVED — source not D3100E-specific.

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-14T07:03:54.607Z
last_checked_at: 2026-07-21T22:27:55.494Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:27:55.494Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions match verbatim endpoints in source; HTTP transport on port 80 with RFC 2617 auth verified; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document covers the full DoorBird/BirdGuard product line rather than the D3100E specifically. Firmware version requirements vary per endpoint (e.g. favorites/schedules require firmware 000110+, relay info in info.cgi requires 000108+)."
- "voltage, current, power, and electrical specifications not stated in source."
- "credential format follows DoorBird App user accounts; not separately specified"
- "powerable trait not applicable — door station is mains-powered, no power on/off command documented."
- "specific D3100E firmware version not stated — all firmware-dependent features use generic DoorBird firmware thresholds."
- "RTSP stream parameter (<device-rtsp-port>) port value not explicitly bound; uses 554 by default."
- "physical relay count and electrical ratings for D3100E not in source."
- "paired IP I/O DoorController model identifiers (gggaaa placeholder) not enumerated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
