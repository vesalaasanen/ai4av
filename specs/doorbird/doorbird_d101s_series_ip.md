---
spec_id: admin/doorbird-d101s-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D101S Series Control Spec"
manufacturer: Doorbird
model_family: "D101S Series"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "D101S Series"
  firmware: "\"000099 and above\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-07-12T20:21:19.929Z
last_checked_at: 2026-07-21T22:22:15.744Z
generated_at: 2026-07-21T22:22:15.744Z
firmware_coverage: "\"000099 and above\""
protocol_coverage: []
known_gaps:
  - "physical relay pinout specifications, electrical ratings, operating temperature ranges"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "physical relay electrical ratings, operating voltage/current"
  - "exact firmware version for D101S-specific features (source lists D10x family, not D101S explicitly)"
  - "RFID/keypad event packet format (documented as \"coming soon\")"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:22:15.744Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched literally in source with correct shapes and transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D101S Series Control Spec

## Summary

The Doorbird D101S Series is a IP video door station supporting HTTP/HTTPS control, UDP event broadcasts, RTSP video streaming, and SIP-based audio calls. This spec covers the LAN-2-LAN HTTP API (port 80/443), UDP event monitoring (ports 6524 and 35344), RTSP video endpoints (ports 554 and 8557), and the SIP interface.

<!-- UNRESOLVED: physical relay pinout specifications, electrical ratings, operating temperature ranges -->

## Transport
```yaml
protocols:
  - http
  - udp
  - rtsp
addressing:
  base_url: http://<device-ip>/bha-api/
auth:
  type: basic_digest
  note: Basic or Digest auth per RFC 2617, or http-user/http-password query params
```

**HTTP (primary):**
```yaml
protocols:
  - http
addressing:
  port: 80
  base_url: http://<device-ip>/bha-api/
auth:
  type: basic_digest
  note: Basic or Digest auth per RFC 2617, or http-user/http-password query params
```

**HTTPS (encrypted):**
```yaml
protocols:
  - http
addressing:
  port: 443
  base_url: https://<device-ip>/bha-api/
auth:
  type: basic_digest
  note: Self-signed cert pre-installed; video/audio streams not available over HTTPS (use sessionid param instead)
```

**UDP (event monitoring):**
```yaml
protocols:
  - udp
addressing:
  port: 6524
  note: Also broadcasts on port 35344; keep-alive every 7 seconds
```

**RTSP (video streaming):**
```yaml
protocols:
  - rtsp
addressing:
  port: 554
  note: RTSP-over-HTTP available on port 8557; standard RTSP auth only (no HTTP param auth for RTSP)
```

## Traits
```yaml
- powerable  # inferred: open-door and light-on relay control present
- routable   # inferred: input (doorbell, motion, rfid) event routing present
- queryable  # inferred: info.cgi, schedule.cgi, favorites.cgi, sip.cgi?action=status return device state
- levelable  # inferred: mic/speaker volume settings in SIP
```

## Actions
```yaml
# === Relay / door control ===
- id: open_door
  label: Open Door
  kind: action
  command: "GET http://<device-ip>/bha-api/open-door.cgi?r={r}"
  params:
    - name: r
      type: string
      description: |
        Door controller ID and relay, e.g. "1" for physical relay 1,
        "gggaaa@1" for paired IP I/O DoorController relay 1.
        Omit to trigger physical relay 1.

- id: light_on
  label: Light On
  kind: action
  command: "GET http://<device-ip>/bha-api/light-on.cgi"
  params: []

# === Session management ===
- id: get_session
  label: Get Session ID
  kind: action
  command: "GET http://<device-ip>/bha-api/getsession.cgi"
  params: []
  note: Returns SESSIONID (valid 10 min) and NOTIFICATION_ENCRYPTION_KEY for UDP event decryption

- id: invalidate_session
  label: Invalidate Session
  kind: action
  command: "GET http://<device-ip>/bha-api/getsession.cgi?invalidate={invalidate}"
  params:
    - name: invalidate
      type: string
      description: Session ID to invalidate

# === System ===
- id: restart
  label: Restart Device
  kind: action
  command: "GET http://<device-ip>/bha-api/restart.cgi"
  params: []
  note: Returns 503 if device busy (e.g. firmware update in progress)

# === Video / image ===
- id: live_video
  label: Live Video Stream (MJPEG)
  kind: action
  command: "GET http://<device-ip>/bha-api/video.cgi"
  params: []
  note: Returns multipart/x-mixed-replace JPEG stream, up to 8 fps. 204 if no watch-always permission and no ring in past 5 min.

- id: live_image
  label: Live Image (JPEG)
  kind: action
  command: "GET http://<device-ip>/bha-api/image.cgi"
  params: []
  note: Single JPEG. 204 if no watch-always permission and no ring in past 1 min.

- id: history_image
  label: History Image Request
  kind: action
  command: "GET http://<device-ip>/bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: "1..50, index of history image (1 = latest)"
    - name: event
      type: string
      enum: [doorbell, motionsensor]
      description: "Event type (optional). Default = ring history for DoorBird, input trigger history for BirdGuard."
  note: Stored in cloud; 204 if user lacks history/motion permission.

- id: monitor
  label: Monitor (doorbell/motion state stream)
  kind: action
  command: "GET http://<device-ip>/bha-api/monitor.cgi?ring={ring}"
  params:
    - name: ring
      type: string
      description: "Comma-separated event types: doorbell, motionsensor"
  note: Continuous multipart stream of motion/doorbell state (H/L). Up to 8 concurrent streams; HTTP 509 when all busy.

- id: rtsp_video
  label: RTSP Live Video Stream
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params:
    - name: resolution
      type: string
      enum: [default, 720p, 1080p]
      description: Selects RTSP path variant
  note: |
    Endpoints (up to 12 fps):
      rtsp://<device-ip>:554/mpeg/media.amp
      rtsp://<device-ip>:554/mpeg/720p/media.amp
      rtsp://<device-ip>:554/mpeg/1080p/media.amp  (D11x only)
      rtsp://<device-ip>:8557/mpeg/media.amp        (RTSP-over-HTTP)
    Standard RTSP auth only. 204 if no permission.

# === Audio ===
- id: audio_receive
  label: Live Audio Receive
  kind: action
  command: "GET http://<device-ip>/bha-api/audio-receive.cgi"
  params: []
  note: G.711 μ-law, 8000 Hz. Client must do own AEC/ANR. 204 if no permission.

- id: audio_transmit
  label: Live Audio Transmit
  kind: action
  command: "POST http://<device-ip>/bha-api/audio-transmit.cgi"
  params:
    - name: audio_data
      type: binary
      description: G.711 μ-law audio stream, Content-Type audio/basic
  note: POST, G.711 μ-law 8000 Hz. Only one consumer may transmit at a time; second rejected.

# === Device info / queries ===
- id: get_info
  label: Device Info Query
  kind: query
  command: "GET http://<device-ip>/bha-api/info.cgi"
  params: []
  note: Returns JSON with FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS (fw 000108+), DEVICE-TYPE

- id: sip_status_query
  label: SIP Status Query
  kind: query
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=status"
  params: []
  note: JSON with LASTERRORCODE (200 = registered) and LASTERRORTEXT

- id: list_favorites
  label: List Favorites
  kind: query
  command: "GET http://<device-ip>/bha-api/favorites.cgi"
  params: []
  note: Requires API-Operator permission. Firmware 000110+. Returns JSON with sip and http favorites.

- id: list_schedules
  label: List Schedules
  kind: query
  command: "GET http://<device-ip>/bha-api/schedule.cgi"
  params: []
  note: Requires API-Operator permission. Firmware 000110+. Returns JSON array of schedule entries.

# === SIP ===
- id: sip_register
  label: SIP Register
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
      description: Authentication user for SIP Proxy
    - name: password
      type: string
      description: Authentication password for SIP Proxy
    - name: url
      type: string
      description: IP/Hostname of SIP Proxy

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: SIP URL to call, e.g. sip:108@192.168.123.22
  note: Requires API-Operator permission. Auto-hangup 180s. 503 if line busy.

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=hangup"
  params: []

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=settings&<params>"
  params:
    - name: enable
      type: integer
      description: "0..1, enable SIP after reboot"
    - name: mic_volume
      type: integer
      description: "1..100, microphone volume"
    - name: spk_volume
      type: integer
      description: "1..100, speaker volume"
    - name: dtmf
      type: integer
      description: "0..1, enable DTMF support"
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED - use schedule.cgi. SIP URL to auto-call on doorbell event, or 'none'"
    - name: relay1_passcode
      type: integer
      description: "0..99999999, pincode for door relay"
    - name: incoming_call_enable
      type: integer
      description: "0..1, enable incoming calls"
    - name: incoming_call_user
      type: string
      description: Allowed SIP user, e.g. "sip:10.0.0.1:5060"
    - name: anc
      type: integer
      description: "0..1, acoustic noise cancellation"
    - name: ring_time_limit
      type: integer
      description: "10..300, max ringing time in seconds"
    - name: call_time_limit
      type: integer
      description: "30..300, max call duration in seconds"

- id: sip_reset
  label: SIP Reset
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=reset"
  params: []
  note: Resets all SIP settings except license; hangs up any ongoing call.

# === Favorites management ===
- id: save_favorite
  label: Save Favorite
  kind: action
  command: "GET http://<device-ip>/bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: action
      type: string
      const: save
    - name: type
      type: string
      enum: [sip, http]
    - name: title
      type: string
      description: Name or short description
    - name: value
      type: string
      description: URL/address including protocol and credentials if needed
    - name: id
      type: integer
      description: Optional, ID of existing favorite to update
  note: Requires API-Operator permission. Firmware 000110+. New favorite ID returned in 'favoriteid' response header.

- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "GET http://<device-ip>/bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: action
      type: string
      const: remove
    - name: type
      type: string
      enum: [sip, http]
    - name: id
      type: integer
      description: ID of favorite to delete
  note: Requires API-Operator permission. Firmware 000110+.

# === Schedule management ===
- id: save_schedule
  label: Save Schedule
  kind: action
  command: "POST http://<device-ip>/bha-api/schedule.cgi"
  params:
    - name: input
      type: string
      enum: [doorbell, motion, rfid, fingerprint]
      description: The input event type
    - name: param
      type: string
      description: Doorbell number, transponder ID, or fingerprint ID
    - name: output
      type: array
      description: JSON array of output action configs (event: notify|sip|relay|http, param, schedule)
  note: Requires API-Operator permission. Firmware 000110+. POST with JSON body.

- id: delete_schedule
  label: Delete Schedule
  kind: action
  command: "GET http://<device-ip>/bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: action
      type: string
      const: remove
    - name: input
      type: string
      enum: [doorbell, motion, rfid]
    - name: param
      type: string
      description: Doorbell number or transponder ID
  note: Requires API-Operator permission. Firmware 000110+.
```

## Feedbacks
```yaml
- id: door_open_response
  type: json
  description: JSON with RETURNCODE from open-door.cgi

- id: light_on_response
  type: json
  description: JSON with RETURNCODE from light-on.cgi

- id: session_response
  type: json
  description: JSON with SESSIONID (10-min validity) and NOTIFICATION_ENCRYPTION_KEY from getsession.cgi

- id: device_info
  type: json
  description: JSON with FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS, DEVICE-TYPE from info.cgi

- id: sip_status
  type: json
  description: JSON with LASTERRORCODE (200 = registered) and LASTERRORTEXT from sip.cgi?action=status

- id: favorites_list
  type: json
  description: JSON object containing sip and http favorites from favorites.cgi

- id: schedules_list
  type: json
  description: JSON array of schedule entries from schedule.cgi

- id: monitor_stream
  type: multipart
  description: Continuous multipart text stream from monitor.cgi reporting doorbell/motionsensor state as H (high) / L (low)

- id: http_status
  type: integer
  description: |
    HTTP status codes:
      200 OK, 204 No Permission / No data, 400 Bad Request,
      401 Unauthorized, 423 Blocked (wrong auth, IP blocked 1 min),
      500 Internal error, 503 Busy (call/stream in use or firmware update),
      507 Size Limit Exceeded, 509 Too many monitor streams
```

## Variables
```yaml
- id: mic_volume
  type: integer
  range: [1, 100]
  default: 33

- id: spk_volume
  type: integer
  range: [1, 100]
  default: 70

- id: sip_dtmf
  type: boolean
  default: false

- id: sip_enable
  type: boolean
  default: false

- id: sip_anc
  type: boolean
  default: true

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
- id: doorbell_event
  description: |
    UDP broadcast (v2, ChaCha20-Poly1305) on ports 6524 and 35344 on ring event.
    Packet = IDENT (0xDE 0xAD 0xBE) + VERSION (0x02) + NONCE (8 bytes) + CIPHERTEXT (34 bytes).
    Decrypted plaintext fields:
  fields:
    - INTERCOM_ID   # 6-byte string, first 6 chars of username
    - EVENT         # 8-byte string, doorbell number padded with spaces
    - TIMESTAMP     # 4-byte long, Unix timestamp

- id: motion_event
  description: UDP broadcast (v2) on motion detection; EVENT field = "motion". Same packet format as doorbell_event.

- id: rfid_event
  description: RFID transponder event (documented as "coming soon")

- id: keypad_event
  description: Keypad event (documented as "coming soon")

- id: udp_keepalive
  description: Keep-alive broadcast every 7 seconds on ports 6524 and 35344
```

## Macros
```yaml
# No explicit multi-step macros documented; use schedule entries to combine
# input event + output action (HTTP notification, SIP call, relay trigger)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond SIP 180s auto-hangup (security).
```

## Notes

UDP event monitoring: Device sends v2 encrypted broadcasts (IDENT 0xDEADBΕ, VERSION 0x02) on ports 6524 and 35344 every 7 seconds (keep-alive). Events decrypted using ChaCha20-Poly1305 with 8-byte NONCE and key from `getsession.cgi` response `NOTIFICATION_ENCRYPTION_KEY` field. v1 (Argon2i variant) deprecated since November 2023. Session key persists until user password changes.

HTTP API rate limits: Max 1 concurrent connection per second. Wrong authentication blocks IP for 1 minute (HTTP 423). Video/audio calls return 503 (busy) when line is in use. Monitor returns 509 when all 8 streams busy.

RTSP video: Port 554 standard, port 8557 for RTSP-over-HTTP. Auth is standard RTSP auth only — no HTTP parameter auth for RTSP. Up to 12 fps. 720p path supported from firmware 000129; 1080p path on D11x only.

HTTPS: Self-signed cert pre-installed for LAN. Video/audio streams NOT available over HTTPS — must obtain sessionid via getsession.cgi and append `?sessionid=<id>` to stream URLs (e.g. video.cgi, audio-receive.cgi).

Audio codec: G.711 μ-law, 8000 Hz. Client device MUST do own echo/noise reduction (AEC/ANR). audio-transmit.cgi is POST, only one talker at a time.

SIP calls: 180-second auto-hangup (security). Requires "API operator" permission. P2P calls supported from firmware 000099 onward, registers on port 5060. Max 1 simultaneous SIP call. DTMF enables door-relay trigger via pincode from recipient.

Permissions: "Watch always" (live view + door control anytime), "History" (cloud recording), "Motion" (motion notifications + history), "API-Operator" (settings via Open API, schedules, notifications, SIP makecall).

Video/audio precedence: Official DoorBird App has priority over LAN API for live streams and audio; API returns 204 when stream is taken.

Firmware gates: info.cgi RELAYS field from fw 000108; favorites/schedules from fw 000110; 720p RTSP from fw 000129; P2P SIP from fw 000099.

<!-- UNRESOLVED: physical relay electrical ratings, operating voltage/current -->
<!-- UNRESOLVED: exact firmware version for D101S-specific features (source lists D10x family, not D101S explicitly) -->
<!-- UNRESOLVED: RFID/keypad event packet format (documented as "coming soon") -->
````

Summary of upgrade:
- +11 new actions (`live_video`, `live_image`, `history_image`, `monitor`, `rtsp_video`, `audio_receive`, `audio_transmit`, `get_info`, `sip_status_query`, `list_favorites`, `list_schedules`)
- Added `command:` payloads to all existing actions (payload rule compliance)
- Added `autocall_doorbell_url` param to `sip_settings` (deprecated but documented)
- Added RTSP protocol block to Transport (ports 554, 8557)
- Added `monitor_stream` + `udp_keepalive` feedbacks/events
- Enriched event packet format (IDENT/VERSION/NONCE bytes, v2 deprecation note)
- Populated firmware from D10x family entry (with inference comment)
- Added firmware-gates + permissions + HTTPS sessionid notes

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-07-12T20:21:19.929Z
last_checked_at: 2026-07-21T22:22:15.744Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:22:15.744Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched literally in source with correct shapes and transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "physical relay pinout specifications, electrical ratings, operating temperature ranges"
- "source contains no explicit safety warnings, interlock procedures,"
- "physical relay electrical ratings, operating voltage/current"
- "exact firmware version for D101S-specific features (source lists D10x family, not D101S explicitly)"
- "RFID/keypad event packet format (documented as \"coming soon\")"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
