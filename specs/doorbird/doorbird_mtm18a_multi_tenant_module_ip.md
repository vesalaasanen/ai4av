---
spec_id: admin/doorbird-mtm18a-multi-tenant-module
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird MTM18A Multi-Tenant Module Control Spec"
manufacturer: DoorBird
model_family: "DoorBird MTM18A Multi-Tenant Module"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "DoorBird MTM18A Multi-Tenant Module"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-14T07:09:45.508Z
last_checked_at: 2026-07-21T22:31:26.010Z
generated_at: 2026-07-21T22:31:26.010Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the general DoorBird LAN-2-LAN API document, not MTM18A-specific; device-specific capabilities (e.g. relay count, supported SIP features) may differ from the general API"
  - "firmware version compatibility not stated for MTM18A model specifically"
  - "credential/token format details beyond RFC 2617 not specified"
  - "MTM18A support not confirmed in source.\""
  - "no multi-step sequences described explicitly in source"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "MTM18A-specific features (relay count, keypad/RFID support, multi-tenant routing) not detailed in this general API document"
  - "firmware version compatibility for MTM18A model not stated"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:31:26.010Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions found with matching command shapes and transport parameters in source; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# DoorBird MTM18A Multi-Tenant Module Control Spec

## Summary
The DoorBird MTM18A Multi-Tenant Module is a video door station accessory controlled via DoorBird's LAN-2-LAN HTTP API. The interface provides relay control (door opener, light), live video/image/audio streaming (MJPEG, JPEG, G.711 μ-law, RTSP H.264), history image retrieval, event monitoring (UDP broadcast), favorites/schedule management, SIP telephony, and device info/restart commands. Authentication is HTTP Basic or Digest (RFC 2617).

<!-- UNRESOLVED: source is the general DoorBird LAN-2-LAN API document, not MTM18A-specific; device-specific capabilities (e.g. relay count, supported SIP features) may differ from the general API -->
<!-- UNRESOLVED: firmware version compatibility not stated for MTM18A model specifically -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 80
  base_url: "http://<device-ip>/bha-api/"
  # HTTPS also available on TCP port 443 (self-signed cert)
  # RTSP available on port 554 and RTSP-over-HTTP on port 8557
  # SIP listener on port 5060
  # UDP event broadcasts on ports 6524 and 35344
auth:
  type: basic_digest  # RFC 2617 Basic or Digest auth per request; plaintext http-user/http-password params also supported
  # UNRESOLVED: credential/token format details beyond RFC 2617 not specified
```

## Traits
```yaml
# - queryable  # inferred from query command examples (info.cgi, sip.cgi?action=status, favorites.cgi, schedule.cgi)
# - powerable  # inferred from restart command (restart.cgi); NOTE: this is restart-only, no power-on/off
```

## Actions
```yaml
# --- Session Management ---

- id: create_session
  label: Create Session
  kind: action
  command: "GET /bha-api/getsession.cgi"
  params: []
  notes: "Returns JSON with RETURNCODE, SESSIONID (valid 10 min), and NOTIFICATION_ENCRYPTION_KEY. Session ID required for HTTPS video/audio streaming in LAN."

- id: invalidate_session
  label: Invalidate Session
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate={session_id}"
  params:
    - name: session_id
      type: string
      description: Session ID to invalidate
  notes: "Returns JSON with RETURNCODE 1 and empty SESSIONID."

# --- Live Video ---

- id: get_live_video_mjpg
  label: Get Live Video (MJPEG)
  kind: stream
  command: "GET /bha-api/video.cgi"
  params: []
  notes: "Returns multipart/x-mixed-replace MJPEG stream, boundary 'my-boundary'. Up to 8 fps. Permission: watch-always or ring event within 5 min. Returns 204 if no permission. App has precedence and may interrupt."

- id: get_rtsp_video_default
  label: Get Live Video (RTSP H.264 Default)
  kind: stream
  command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/media.amp"
  params: []
  notes: "RTSP on port 554. Standard RTSP auth (no param auth). Up to 12 fps. Permission: watch-always or ring event within 5 min."

- id: get_rtsp_video_720p
  label: Get Live Video (RTSP H.264 720p)
  kind: stream
  command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/720p/media.amp"
  params: []
  notes: "Supported by DoorBird D10x/D21x from Firmware-Version 129. UNRESOLVED: MTM18A support not confirmed in source."

- id: get_rtsp_video_1080p
  label: Get Live Video (RTSP H.264 1080p)
  kind: stream
  command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/1080p/media.amp"
  params: []
  notes: "Supported by DoorBird D11x only. UNRESOLVED: MTM18A support not confirmed in source."

- id: get_rtsp_over_http
  label: Get Live Video (RTSP-over-HTTP)
  kind: stream
  command: "rtsp://<device-ip>:8557/mpeg/media.amp"
  params: []
  notes: "RTSP-over-HTTP protocol on port 8557."

# --- Live Image ---

- id: get_live_image
  label: Get Live Image (JPEG)
  kind: stream
  command: "GET /bha-api/image.cgi"
  params: []
  notes: "Returns single JPEG image. Permission: watch-always or ring event within 1 min. Returns 204 if no permission."

# --- Door / Relay Control ---

- id: open_door
  label: Open Door
  kind: action
  command: "GET /bha-api/open-door.cgi?r={relay}"
  params:
    - name: relay
      type: string
      description: "Relay to trigger, e.g. '1', '2', or '<doorcontrollerID>@<relay>' for paired IP I/O DoorController. Omit to trigger physical relay 1."
      required: false
  notes: "Energizes door opener/alarm output relay. Returns JSON. Permission: watch-always or ring event within 5 min. Returns 204 if no permission."

- id: light_on
  label: Light On
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []
  notes: "Energizes light relay. Returns JSON. Permission: watch-always or ring event within 5 min. Returns 204 if no permission."

# --- History ---

- id: get_history_image
  label: Get History Image
  kind: stream
  command: "GET /bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: "Index of history image, 1..50, where 1 is the latest"
      required: true
    - name: event
      type: string
      description: "Event type: 'doorbell' or 'motionsensor'. Default is ring history for DoorBird, input trigger for BirdGuard."
      required: false
  notes: "Returns JPEG from cloud storage. Permission: history or motion. Returns 204 if no permission."

# --- Monitor ---

- id: monitor
  label: Monitor (State Stream)
  kind: stream
  command: "GET /bha-api/monitor.cgi?ring={ring}"
  params:
    - name: ring
      type: string
      description: "Event type to monitor, e.g. 'doorbell', 'motionsensor', or 'doorbell,motionsensor'"
      required: true
  notes: "Returns multipart stream of motionsensor/doorbell state (H=high/triggered, L=low/idle). Up to 8 concurrent streams; HTTP 509 if all busy. 200 OK, 400 invalid param, 401 auth required."

# --- Audio ---

- id: audio_receive
  label: Audio Receive (G.711 μ-law)
  kind: stream
  command: "GET /bha-api/audio-receive.cgi"
  params: []
  notes: "Returns real-time G.711 μ-law audio (8000 Hz). Permission: watch-always or ring event within 5 min. Returns 204 if no permission. App has precedence."

- id: audio_transmit
  label: Audio Transmit (G.711 μ-law)
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params:
    - name: audio_data
      type: binary
      description: "G.711 μ-law audio data. Content-Type: audio/basic. Only one consumer can transmit at a time."
  notes: "Transmits G.711 μ-law audio to device. Permission: watch-always or ring event within 5 min. Returns 204 if no permission. Second consumer rejected. App has precedence."

# --- Device Info ---

- id: get_info
  label: Get Device Info
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []
  notes: "Returns JSON: RETURNCODE, VERSION array with FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS, DEVICE-TYPE. Requires firmware 000108+ for relays config."

# --- Favorites Management ---

- id: list_favorites
  label: List Favorites
  kind: query
  command: "GET /bha-api/favorites.cgi"
  params: []
  notes: "Returns JSON of all configured favorites (sip/http types). Requires API-Operator permission. Firmware 000110+."

- id: save_favorite
  label: Add or Change Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: action
      type: string
      description: "Fixed: 'save'"
    - name: type
      type: string
      description: "'sip' or 'http'. Cannot switch type of existing favorite."
    - name: title
      type: string
      description: "Name or short description"
    - name: value
      type: string
      description: "URL/address including protocol and credentials if needed"
    - name: id
      type: integer
      description: "ID of favorite to change; omit for new favorite"
      required: false
  notes: "New favorite ID returned in 'favoriteid' response header. 200 OK, 400 invalid, 401 auth, 500 error, 507 size limit. Requires API-Operator. Firmware 000110+."

- id: remove_favorite
  label: Delete Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: action
      type: string
      description: "Fixed: 'remove'"
    - name: type
      type: string
      description: "'sip' or 'http'"
    - name: id
      type: integer
      description: "ID of the favorite to delete"
  notes: "If favorite is used in a schedule, that schedule entry is also removed. 200 OK, 400 invalid, 401 auth, 500 error."

# --- Schedule Management ---

- id: list_schedules
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []
  notes: "Returns JSON array of schedule entries. Each has input (doorbell/motion/rfid/fingerprint), param, output array. 200 OK, 204 no data, 401 auth. Requires API-Operator. Firmware 000110+."

- id: save_schedule
  label: Add or Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params:
    - name: json_body
      type: object
      description: "JSON object with input, param, output array. Output entries have event (notify/sip/relay/http), param, schedule (once/from-to/weekdays). One request per input type."
  notes: "POST JSON body. 200 OK, 400 invalid JSON/missing Content-Length, 401 auth, 500 error, 507 size limit. Requires API-Operator. Firmware 000110+."

- id: remove_schedule
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: action
      type: string
      description: "Fixed: 'remove'"
    - name: input
      type: string
      description: "'doorbell', 'motion', or 'rfid'"
    - name: param
      type: string
      description: "ID such as doorbell number or RFID transponder id"
  notes: "200 OK, 401 auth, 500 error."

# --- Restart ---

- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []
  notes: "Restarts device. No diagnostic sound after restart. 200 OK, 401 auth, 503 device busy (e.g. firmware update)."

# --- SIP ---

- id: sip_registration
  label: SIP Registration
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
      description: "Authentication user for the SIP Proxy"
    - name: password
      type: string
      description: "Authentication password for the SIP Proxy"
    - name: url
      type: string
      description: "IP/Hostname of the SIP Proxy"
  notes: "Not necessary for P2P calls. 200 OK, 401 auth failure or no API-Operator permission."

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: "SIP URL to call"
  notes: "P2P or normal SIP call. 200 OK, 400 param missing, 401 auth, 503 line busy. Auto-hangup after 180 seconds."

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params: []
  notes: "Hangs up ongoing SIP call. Returns 200 OK even if no call active. 401 auth failure."

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&{parameter}={value}"
  params:
    - name: enable
      type: integer
      description: "0..1. Enable/disable SIP registration after reboot. Default: 0"
      required: false
    - name: mic_volume
      type: integer
      description: "1..100. Microphone volume. Default: 33"
      required: false
    - name: spk_volume
      type: integer
      description: "1..100. Speaker volume. Default: 70"
      required: false
    - name: dtmf
      type: integer
      description: "0..1. Enable/disable DTMF support. Default: 0"
      required: false
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED - use schedule.cgi. SIP URL for auto-call on doorbell, or 'none'. Default: 'none'"
      required: false
    - name: relay1_passcode
      type: integer
      description: "0..99999999. Pincode for triggering door open relay via DTMF"
      required: false
    - name: incoming_call_enable
      type: integer
      description: "0..1. Enable/disable incoming calls. Default: 0"
      required: false
    - name: incoming_call_user
      type: string
      description: "Allowed SIP user for authentication, e.g. 'sip:10.0.0.1:5060'"
      required: false
    - name: anc
      type: integer
      description: "0..1. Enable/disable acoustic noise cancellation. Default: 1"
      required: false
    - name: ring_time_limit
      type: integer
      description: "10..300 seconds. Max ringing time. Default: 300"
      required: false
    - name: call_time_limit
      type: integer
      description: "30..300 seconds. Max call duration. Default: 300"
      required: false
  notes: "200 OK, 401 auth failure. Requires API-Operator permission."

- id: sip_status
  label: SIP Status Query
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  params: []
  notes: "Returns JSON with LASTERRORCODE (200 = registered) and LASTERRORTEXT. 200 OK, 401 auth failure."

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  params: []
  notes: "Resets all SIP settings except license. Hangs up ongoing call. Returns JSON with LASTERRORCODE/LASTERRORTEXT. 200 OK, 401 auth failure."
```

## Feedbacks
```yaml
- id: info_response
  type: object
  description: "Device info JSON from info.cgi"
  fields:
    - RETURNCODE: "1 = success"
    - VERSION: "array with FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS, DEVICE-TYPE"

- id: monitor_state
  type: stream
  description: "Continuous state stream from monitor.cgi"
  fields:
    - doorbell: "H (triggered) / L (idle)"
    - motionsensor: "H (triggered) / L (idle)"

- id: sip_status_response
  type: object
  description: "SIP status JSON from sip.cgi?action=status"
  fields:
    - LASTERRORCODE: "Most recent SIP status code (200 = registered)"
    - LASTERRORTEXT: "Most recent SIP error text"

- id: session_response
  type: object
  description: "Session JSON from getsession.cgi"
  fields:
    - RETURNCODE: "1 = success"
    - SESSIONID: "Session ID valid for 10 minutes"
    - NOTIFICATION_ENCRYPTION_KEY: "Key for UDP event decryption (valid until password change)"

- id: favorites_response
  type: object
  description: "Favorites JSON from favorites.cgi"
  fields:
    - sip: "Object of SIP favorites (id → title/value)"
    - http: "Object of HTTP favorites (id → title/value)"

- id: schedule_response
  type: array
  description: "Schedule entries JSON array from schedule.cgi"
  fields:
    - input: "doorbell/motion/rfid/fingerprint"
    - param: "doorbell number / transponder id / fingerprint id"
    - output: "Array of event/param/schedule objects"
```

## Variables
```yaml
# SIP settings are settable parameters via sip.cgi?action=settings
# Listed as params of the sip_settings action above.
# See Actions → sip_settings for full parameter list (enable, mic_volume,
# spk_volume, dtmf, autocall_doorbell_url, relay1_passcode,
# incoming_call_enable, incoming_call_user, anc, ring_time_limit, call_time_limit)
```

## Events
```yaml
- id: udp_event_broadcast
  type: udp_broadcast
  description: "Encrypted UDP broadcast on ports 6524 and 35344 when doorbell or motion event occurs. Sent for every user and every connected device. Keep-alive broadcasts every 7 seconds (skip these)."
  encryption:
    version: "0x02"
    algorithm: "ChaCha20-Poly1305"
    key_source: "NOTIFICATION_ENCRYPTION_KEY from getsession.cgi (first 32 bytes used). Valid until password change."
  packet_format:
    ident: "3 bytes: 0xDE 0xAD 0xBE"
    version: "1 byte: 0x02 (current), 0x01 (deprecated, Argon2i key stretching)"
    nonce: "8 bytes"
    ciphertext: "34 bytes encrypted (16 random bytes discarded after decryption)"
  decrypted_fields:
    intercom_id: "6-byte string - first 6 chars of username (skip if mismatch)"
    event: "8-byte string - doorbell number or 'motion' (space-padded)"
    timestamp: "4-byte long - Unix timestamp"
  notes: "v1 (0x01) deprecated, uses Argon2i key stretching. v2 simplifies with independent 32-byte key. Requires libsodium or equivalent ChaCha20-Poly1305 implementation."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements for the MTM18A.
# NOTE: open_door energizes a physical relay - implementor should add
# confirmation logic per deployment policy.
```

## Notes
- HTTP interface available unencrypted (port 80) and encrypted (port 443, self-signed cert).
- Video/audio streaming over HTTPS in LAN is NOT supported; must obtain a session ID via getsession.cgi and append as `sessionid` parameter for video.cgi and audio-receive.cgi.
- Rate limit: max 1 concurrent API connection per second. Wrong credentials → IP/user blocked for 1 minute (HTTP 423).
- Only one simultaneous audio/video call for live communication (HTTP 503 Busy if taken).
- App (DoorBird official) has precedence over LAN API for audio/video streams and SIP calls — connections can be interrupted at any time.
- SIP auto-hangup after 180 seconds. Only one simultaneous SIP call. Min 3 seconds between SIP requests.
- Audio codec: G.711 μ-law, 8000 Hz. Client must implement AEC/ANR.
- Monitor streams: max 8 concurrent (HTTP 509 if all busy).
- Favorites/schedules require API-Operator permission and firmware 000110+.
- Device discovery via Apple Bonjour (`_http._tcp`).
<!-- UNRESOLVED: MTM18A-specific features (relay count, keypad/RFID support, multi-tenant routing) not detailed in this general API document -->
<!-- UNRESOLVED: firmware version compatibility for MTM18A model not stated -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-14T07:09:45.508Z
last_checked_at: 2026-07-21T22:31:26.010Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:31:26.010Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions found with matching command shapes and transport parameters in source; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the general DoorBird LAN-2-LAN API document, not MTM18A-specific; device-specific capabilities (e.g. relay count, supported SIP features) may differ from the general API"
- "firmware version compatibility not stated for MTM18A model specifically"
- "credential/token format details beyond RFC 2617 not specified"
- "MTM18A support not confirmed in source.\""
- "no multi-step sequences described explicitly in source"
- "source contains no explicit safety warnings, interlock procedures,"
- "MTM18A-specific features (relay count, keypad/RFID support, multi-tenant routing) not detailed in this general API document"
- "firmware version compatibility for MTM18A model not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
