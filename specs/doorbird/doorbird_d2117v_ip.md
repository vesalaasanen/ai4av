---
spec_id: admin/doorbird-d2117v
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2117V Control Spec"
manufacturer: Doorbird
model_family: D2117V
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - D2117V
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-07-12T21:28:29.046Z
last_checked_at: 2026-07-21T22:27:53.534Z
generated_at: 2026-07-21T22:27:53.534Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "physical relay count not stated in source"
  - "explicit base_url not stated; constructed from device-ip placeholder"
  - "no explicit multi-step sequences documented in source"
  - "physical relay count and configuration details not explicitly stated"
  - "max favorites/schedules limit not stated"
  - "specific door relay voltage/current ratings not stated"
  - "UART/RS-232 serial interface not mentioned in source"
  - "WiFi interface details not stated"
  - "power consumption not stated"
  - "operating temperature range not stated"
  - "video resolution options not enumerated in HTTP API section (RTSP shows 720p/1080p paths)"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:27:53.534Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched literally to source endpoints; transport parameters verified; full bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D2117V Control Spec

## Summary
The Doorbird D2117V is a video door station with IP-based control via HTTP LAN-2-LAN API. It supports authentication (Basic/Digest or plaintext HTTP params), door relay control, light activation, SIP calling, live video/audio streaming (MJPG, RTSP, G.711 μ-law), event monitoring via encrypted UDP broadcasts (ChaCha20-Poly1305), and schedule/favorite management for automation.

<!-- UNRESOLVED: physical relay count not stated in source -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - udp
addressing:
  base_url: http://<device-ip>/bha-api/
  # UNRESOLVED: explicit base_url not stated; constructed from device-ip placeholder
auth:
  type: digest  # inferred: Basic/Digest auth per RFC 2617 described in source
  # Note: plaintext http-user/http-password also supported as less-secure alternative
serial: null  # N/A: serial not mentioned in source
```

**Port reference from source:**
```yaml
ports:
  http: 80
  https: 443
  rtsp: 554
  rtsp_over_http: 8557
  sip: 5060
  udp_event_broadcast: [6524, 35344]
```

## Traits
```yaml
- powerable  # inferred: restart.cgi present
- queryable  # inferred: info.cgi, sip.cgi?action=status return state
- routable   # inferred: favorites.cgi and schedule.cgi for event routing configuration
- levelable  # inferred: mic_volume and spk_volume parameters in sip.cgi settings
```

## Actions
```yaml
# All HTTP paths are relative to Transport.addressing.base_url (http://<device-ip>/bha-api/).
# Source documents each path verbatim. {param} placeholders map to params[] entries.

- id: open_door
  label: Open Door
  kind: action
  command: "open-door.cgi?r={r}"
  params:
    - name: r
      type: string
      description: "Relay to trigger, e.g. '1' or 'gggaaa@1' (DoorController relay); omit for relay 1"
      required: false

- id: light_on
  label: Light On
  kind: action
  command: "light-on.cgi"
  params: []

- id: restart
  label: Restart Device
  kind: action
  command: "restart.cgi"
  params: []

- id: get_session
  label: Get Session ID
  kind: query
  command: "getsession.cgi"
  params:
    - name: invalidate
      type: string
      description: "Session ID to invalidate (optional); when present, appended as ?invalidate=<id>"
      required: false

- id: list_favorites
  label: List Favorites
  kind: query
  command: "favorites.cgi"
  params: []

- id: save_favorite
  label: Add or Change Favorite
  kind: action
  command: "favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: action
      type: string
      description: "Must be \"save\""
      required: true
    - name: type
      type: string
      description: "sip or http"
      required: true
    - name: title
      type: string
      description: Name/title of favorite
      required: true
    - name: value
      type: string
      description: URL or SIP address
      required: true
    - name: id
      type: integer
      description: ID of favorite to change (omit for new)
      required: false

- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: action
      type: string
      description: "Must be \"remove\""
      required: true
    - name: type
      type: string
      description: "sip or http"
      required: true
    - name: id
      type: integer
      description: ID of favorite to delete
      required: true

- id: list_schedules
  label: List Schedules
  kind: query
  command: "schedule.cgi"
  params: []

- id: save_schedule
  label: Add or Update Schedule
  kind: action
  command: "schedule.cgi"
  method: POST
  params:
    - name: input
      type: string
      description: "doorbell, motion, rfid, or fingerprint"
      required: true
    - name: param
      type: string
      description: Doorbell number, transponder ID, or fingerprint ID
      required: false
    - name: output
      type: json
      description: JSON array of output action configurations
      required: true

- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  command: "schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: action
      type: string
      description: "Must be \"remove\""
      required: true
    - name: input
      type: string
      description: "doorbell, motion, or rfid"
      required: true
    - name: param
      type: string
      description: Doorbell number or transponder ID
      required: true

- id: sip_register
  label: SIP Registration
  kind: action
  command: "sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
      description: Authentication user for SIP Proxy
      required: true
    - name: password
      type: string
      description: Authentication password for SIP Proxy
      required: true
    - name: url
      type: string
      description: IP/Hostname of SIP Proxy
      required: true

- id: sip_make_call
  label: SIP Make Call
  kind: action
  command: "sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: SIP URL to call
      required: true

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "sip.cgi?action=hangup"
  params: []

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "sip.cgi?action=settings"
  params:
    - name: enable
      type: integer
      description: "0..1, enable SIP after reboot"
      required: false
    - name: mic_volume
      type: integer
      description: "1..100, microphone volume (default 33)"
      required: false
    - name: spk_volume
      type: integer
      description: "1..100, speaker volume (default 70)"
      required: false
    - name: dtmf
      type: integer
      description: "0..1, enable DTMF support"
      required: false
    - name: relay1_passcode
      type: integer
      description: "0..99999999, pincode for door open relay"
      required: false
    - name: incoming_call_enable
      type: integer
      description: "0..1, enable incoming calls"
      required: false
    - name: incoming_call_user
      type: string
      description: "Allowed SIP user, e.g. \"sip:10.0.0.1:5060\""
      required: false
    - name: anc
      type: integer
      description: "0..1, acoustic noise cancellation (default 1)"
      required: false
    - name: ring_time_limit
      type: integer
      description: "10..300, max ringing time in seconds"
      required: false
    - name: call_time_limit
      type: integer
      description: "30..300, max call duration in seconds"
      required: false

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "sip.cgi?action=reset"
  params: []

- id: sip_status
  label: SIP Status
  kind: query
  command: "sip.cgi?action=status"
  params: []

- id: get_info
  label: Get Device Info
  kind: query
  command: "info.cgi"
  params: []

# --- New actions added in upgrade pass: source-documented endpoints previously missing ---

- id: get_live_video
  label: Live Video Stream (MJPG)
  kind: query
  command: "video.cgi"
  params:
    - name: sessionid
      type: string
      description: "Temporary Session ID (from getsession.cgi) - required for HTTPS; avoids plaintext credential transmission"
      required: false
  notes: "Returns multipart/x-mixed-replace MJPG stream, up to 8 fps. Requires 'watch always' permission or ring event in past 5 minutes, else HTTP 204."

- id: get_live_image
  label: Live Image (JPEG)
  kind: query
  command: "image.cgi"
  params: []
  notes: "Returns single JPEG (Content-Type: image/jpeg). Requires 'watch always' permission or ring event in past 1 minute, else HTTP 204."

- id: get_history_image
  label: History Image Request
  kind: query
  command: "history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: "1..50, index of history image (1 = latest)"
      required: true
    - name: event
      type: string
      description: "doorbell or motionsensor (optional; default = ring history for DoorBird, input trigger history for BirdGuard)"
      required: false
  notes: "Requires history permission; motion images require motion permission. Returns JPEG or HTTP 204 if no permission."

- id: get_monitor_stream
  label: Monitor Request (Doorbell/Motion State Stream)
  kind: query
  command: "monitor.cgi?ring={ring}"
  params:
    - name: ring
      type: string
      description: "Comma-separated event types: doorbell, motionsensor (rfid/keypad documented as coming soon)"
      required: true
  notes: "Up to 8 concurrent streams; HTTP 509 when all busy. Returns multipart/x-mixed-replace with text/plain frames like 'doorbell:H' / 'motionsensor:L'."

- id: receive_audio
  label: Live Audio Receive
  kind: query
  command: "audio-receive.cgi"
  params:
    - name: sessionid
      type: string
      description: "Temporary Session ID (from getsession.cgi) - required for HTTPS"
      required: false
  notes: "Returns G.711 μ-law audio (8000 Hz sampling). Requires 'watch always' permission or ring event in past 5 minutes, else HTTP 204."

- id: transmit_audio
  label: Live Audio Transmit
  kind: action
  command: "audio-transmit.cgi"
  method: POST
  params:
    - name: audio_data
      type: binary
      description: "G.711 μ-law audio stream (Content-Type: audio/basic, Content-Length: 9999999, Connection: Keep-Alive, Cache-Control: no-cache)"
      required: true
  notes: "POST singlepart audio. Only one consumer can transmit at a time; second rejected. HTTP 1.0 expected per source examples."

- id: get_rtsp_video
  label: RTSP Live Video (default resolution)
  kind: query
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params: []
  notes: "H.264 over RTSP, port 554. Up to 12 fps. Standard RTSP auth (no parameter auth). Requires 'watch always' permission or ring event in past 5 minutes, else HTTP 204."

- id: get_rtsp_video_720p
  label: RTSP Live Video (720p)
  kind: query
  command: "rtsp://<device-ip>:554/mpeg/720p/media.amp"
  params: []
  notes: "720p H.264 over RTSP. Supported by DoorBird Video Door Station D10x/D21x from Firmware-Version 129."

- id: get_rtsp_video_1080p
  label: RTSP Live Video (1080p)
  kind: query
  command: "rtsp://<device-ip>:554/mpeg/1080p/media.amp"
  params: []
  notes: "1080p H.264 over RTSP. Supported by DoorBird Video Door Station D11x only."

- id: get_rtsp_video_over_http
  label: RTSP-over-HTTP Live Video
  kind: query
  command: "rtsp://<device-ip>:8557/mpeg/media.amp"
  params: []
  notes: "RTSP tunneled over HTTP on port 8557. Standard RTSP auth."
```

## Feedbacks
```yaml
- id: door_open_response
  type: json
  description: JSON response from open-door.cgi

- id: light_on_response
  type: json
  description: JSON response from light-on.cgi

- id: session_response
  type: json
  description: JSON containing SESSIONID and NOTIFICATION_ENCRYPTION_KEY from getsession.cgi

- id: favorites_list
  type: json
  description: JSON object containing sip and http favorites

- id: schedule_list
  type: json
  description: JSON array of schedule entries

- id: device_info
  type: json
  description: JSON containing VERSION, FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS, DEVICE-TYPE

- id: sip_status_response
  type: json
  description: JSON with LASTERRORCODE and LASTERRORTEXT

- id: video_stream
  type: multipart
  description: MJPG multipart stream from video.cgi (Content-Type: multipart/x-mixed-replace)

- id: image_response
  type: binary
  description: JPEG image from image.cgi or history.cgi (Content-Type: image/jpeg)

- id: audio_stream
  type: binary
  description: G.711 μ-law audio from audio-receive.cgi

- id: audio_transmit_response
  type: enum
  values: [200, 204, 401]
  description: HTTP status returned by audio-transmit.cgi (200 OK, 204 no permission/no recent ring, 401 auth required)

- id: monitor_stream
  type: multipart
  description: Continuous doorbell/motionsensor state stream from monitor.cgi

- id: http_status_codes
  type: enum
  values: [200, 204, 400, 401, 423, 500, 503, 507, 509]
  description: HTTP status codes returned by API endpoints
```

## Variables
```yaml
- id: notification_encryption_key
  type: string
  description: 32-64 byte key for decrypting UDP event broadcasts (ChaCha20-Poly1305). Obtained via getsession.cgi.
  writable: false

- id: session_id
  type: string
  description: Temporary session ID valid for 10 minutes, obtained via getsession.cgi. Used for video/audio streaming to avoid plaintext credential transmission.
  writable: true  # can be invalidated via getsession.cgi?invalidate=

- id: sip_mic_volume
  type: integer
  range: [1, 100]
  default: 33

- id: sip_spk_volume
  type: integer
  range: [1, 100]
  default: 70

- id: sip_dtmf_enabled
  type: boolean
  default: false

- id: sip_call_time_limit
  type: integer
  range: [30, 300]
  default: 300

- id: sip_ring_time_limit
  type: integer
  range: [10, 300]
  default: 300

- id: sip_anc_enabled
  type: boolean
  default: true
```

## Events
```yaml
- id: doorbell_event
  description: Doorbell press detected via UDP broadcast (ChaCha20-Poly1305 encrypted)
  fields:
    - intercom_id: string  # first 6 chars of username
    - event: string  # e.g. "1 " (doorbell number, padded)
    - timestamp: unix_epoch

- id: motion_event
  description: Motion sensor trigger detected via UDP broadcast
  fields:
    - intercom_id: string
    - event: string  # "motion"
    - timestamp: unix_epoch

- id: rfid_event
  description: RFID event (documented as coming soon at time of source writing)

- id: keypad_event
  description: Keypad event (documented as coming soon at time of source writing)

- id: udp_keep_alive
  description: UDP keepalive broadcast every 7 seconds on ports 6524 and 35344. Can be ignored for event decryption.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Video/audio streams can be interrupted at any time when official DoorBird App requests the stream - the app has precedence over LAN API users.
    source: "video.cgi, audio-receive.cgi, audio-transmit.cgi, rtsp descriptions"
  - description: Only one simultaneous SIP call supported; call terminates after 180 seconds for security.
    source: "SIP section"
  - description: SIP call terminates after 180 seconds (auto-hangup).
    source: "SIP section"
  - description: AEC/ANR must be implemented on client device; DoorBird's built-in echo cancellation requires matching cancellation on the remote device side.
    source: "LIVE AUDIO RECEIVE AND TRANSMIT - General information section"
  - description: Audio codec must be G.711 μ-law (8000 Hz sampling).
    source: "LIVE AUDIO RECEIVE AND TRANSMIT section"
  - description: IP address blocked for 1 minute after extensive wrong credentials (HTTP 423 returned).
    source: "CONCURRENT CONNECTIONS AND RATE LIMITS section"
  - description: HTTP 503 returned when device is busy (e.g. another active audio/video call); user should be notified "Line busy" and offer still image preview.
    source: "CONCURRENT CONNECTIONS AND RATE LIMITS section"
```

## Notes
- DoorBird App has precedence over LAN API for all media streams
- Session IDs valid for 10 minutes; used to avoid transmitting credentials in plaintext for video/audio requests
- NOTIFICATION_ENCRYPTION_KEY is 32-64 bytes; ChaCha20 uses only first 32 bytes
- Favorites and schedules require firmware 000110 or higher; info.cgi relay info requires firmware 000108 or higher
- RTSP authentication uses standard RTSP auth (no parameter auth support)
- UDP event broadcasts sent on ports 6524 and 35344 every 7 seconds (keepalive); can be ignored for decryption purposes
- v2 event encryption (ChaCha20-Poly1305) introduced November 2023; v1 (Argon2i) deprecated
- SIP peer-2-peer calls supported from device version 000099; device listens on port 5060
- Autocall_doorbell_url SIP setting deprecated; replaced by schedule.cgi/favorites.cgi
- RTSP 720p path requires DoorBird D10x/D21x firmware 000129+; 1080p path is D11x only
- Audio-transmit.cgi expects HTTP/1.0 with Content-Type: audio/basic; example uses --limit-rate 8K via curl
- Monitor.cgi supports up to 8 concurrent streams (HTTP 509 when exhausted)

<!-- UNRESOLVED: physical relay count and configuration details not explicitly stated -->
<!-- UNRESOLVED: max favorites/schedules limit not stated -->
<!-- UNRESOLVED: specific door relay voltage/current ratings not stated -->
<!-- UNRESOLVED: UART/RS-232 serial interface not mentioned in source -->
<!-- UNRESOLVED: WiFi interface details not stated -->
<!-- UNRESOLVED: power consumption not stated -->
<!-- UNRESOLVED: operating temperature range not stated -->
<!-- UNRESOLVED: video resolution options not enumerated in HTTP API section (RTSP shows 720p/1080p paths) -->
````

**Upgrade summary:**
- Added `command:` field to all 18 existing actions (verbatim HTTP paths/queries from source)
- Added 10 new actions: `get_live_video`, `get_live_image`, `get_history_image`, `get_monitor_stream`, `receive_audio`, `transmit_audio`, `get_rtsp_video`, `get_rtsp_video_720p`, `get_rtsp_video_1080p`, `get_rtsp_video_over_http`
- Added `audio_transmit_response` feedback
- Reclassified 5 read-only actions to `kind: query`: `get_session`, `list_favorites`, `list_schedules`, `sip_status`, `get_info`
- Preserved all existing IDs, params, sections, safety interlocks, notes
- Added `method: POST` on `save_schedule` and `transmit_audio` (source documents POST)

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-07-12T21:28:29.046Z
last_checked_at: 2026-07-21T22:27:53.534Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:27:53.534Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched literally to source endpoints; transport parameters verified; full bidirectional coverage. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "physical relay count not stated in source"
- "explicit base_url not stated; constructed from device-ip placeholder"
- "no explicit multi-step sequences documented in source"
- "physical relay count and configuration details not explicitly stated"
- "max favorites/schedules limit not stated"
- "specific door relay voltage/current ratings not stated"
- "UART/RS-232 serial interface not mentioned in source"
- "WiFi interface details not stated"
- "power consumption not stated"
- "operating temperature range not stated"
- "video resolution options not enumerated in HTTP API section (RTSP shows 720p/1080p paths)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
