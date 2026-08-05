---
spec_id: admin/doorbird-d1101kh-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D1101KH Series Control Spec"
manufacturer: Doorbird
model_family: "DoorBird D1101KH"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "DoorBird D1101KH"
  firmware: "\"000130\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-07-12T20:26:16.672Z
last_checked_at: 2026-07-21T22:22:17.178Z
generated_at: 2026-07-21T22:22:17.178Z
firmware_coverage: "\"000130\""
protocol_coverage: []
known_gaps:
  - "RS-232 serial not mentioned in source — not applicable to D1101KH"
  - "passcode stored in device, not returned in plain text"
  - "no explicit multi-step sequences documented as macros"
  - "hardware version 1.00+ stated for D11x but specific D1101KH hardware rev not enumerated separately"
  - "relay1_passcode write-only, never returned in plain text — privacy-sensitive"
  - "exact RTSP auth scheme (Basic vs Digest) for RTSP not specified beyond \"standard RTSP authentication\""
  - "Cloud API (partner-only) and HTML5 Widget not documented in this source"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:22:17.178Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec actions found verbatim in source with exact endpoint matches and parameters. Transport parameters verified. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Doorbird D1101KH Series Control Spec

## Summary
Doorbird D1101KH IP video door station (D11x family). Control via LAN HTTP REST API (`/bha-api/`), RTSP video stream, SIP VoIP, and UDP event broadcasts. Supports door relay, light relay, live video/audio, history images, SIP calling, favorites, and schedules.

<!-- UNRESOLVED: RS-232 serial not mentioned in source — not applicable to D1101KH -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - udp
addressing:
  port: 80    # HTTP (unencrypted) - source: "unencrypted on TCP port 80 (HTTP protocol)"
  base_url: http://<device-ip>/bha-api/
  # Source also states encrypted HTTPS on TCP port 443 with self-signed cert.
  https_port: 443    # source: "encrypted on TCP port 443 (HTTPS protocol)"
  rtsp_port: 554     # source: "Uses RTSP on 554"
  rtsp_over_http_port: 8557   # source: "RTSP-over-HTTP protocol on port 8557"
  sip_port: 5060     # source: "the device is ready to receive SIP calls on port 5060"
  rtsp_paths:
    - rtsp://<device-ip>:554/mpeg/media.amp
    - rtsp://<device-ip>:554/mpeg/720p/media.amp   # D11x: 720p path supported from fw 129
    - rtsp://<device-ip>:554/mpeg/1080p/media.amp  # D11x only
    - rtsp://<device-ip>:8557/mpeg/media.amp       # RTSP-over-HTTP
udp_broadcast_ports:
  - 6524
  - 35344
auth:
  type: digest  # Basic or Digest auth per RFC 2617; same credentials as DoorBird App
  alt: plaintext_http_params  # source: http-user / http-password query params (insecure)
```

## Traits
```yaml
- routable    # door open, light on, relay triggers; SIP call initiation
- queryable   # info.cgi, sip.cgi?action=status
- levelable   # mic_volume, spk_volume (1..100)
```

## Actions
```yaml
# === Device control ===
- id: open_door
  label: Open Door
  kind: action
  command: "http://<device-ip>/bha-api/open-door.cgi?r={r}"
  params:
    - name: r
      type: string
      description: Relay ID (optional, defaults to physical relay 1). Format "1" or "2" or "<doorcontrollerID>@<relay>"
      default: "1"

- id: light_on
  label: Light On
  kind: action
  command: "http://<device-ip>/bha-api/light-on.cgi"
  params: []

- id: restart
  label: Restart Device
  kind: action
  command: "http://<device-ip>/bha-api/restart.cgi"
  params: []

# === Session ===
- id: get_session
  label: Get Temporary Session ID
  kind: action
  command: "http://<device-ip>/bha-api/getsession.cgi"
  params: []

- id: invalidate_session
  label: Invalidate Session ID
  kind: action
  command: "http://<device-ip>/bha-api/getsession.cgi?invalidate={invalidate}"
  params:
    - name: invalidate
      type: string
      description: Session ID to invalidate

# === Media: live video / image / audio ===
- id: live_video
  label: Live Video Stream
  kind: action
  command: "http://<device-ip>/bha-api/video.cgi"
  params: []
  notes: Multipart JPEG (multipart/x-mixed-replace), ~8 fps. 204 if no watch-always perm and no ring event in 5 min.

- id: live_video_rtsp
  label: Live Video Stream (RTSP)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params:
    - name: resolution
      type: string
      enum: [default, 720p, 1080p]
      description: "Select path: default=/mpeg/media.amp, 720p=/mpeg/720p/media.amp (D11x fw129+), 1080p=/mpeg/1080p/media.amp (D11x only)"
  notes: H.264, ~12 fps. Standard RTSP auth (no parameter auth). 1080p supported by D11x only.

- id: live_video_rtsp_over_http
  label: Live Video Stream (RTSP-over-HTTP)
  kind: action
  command: "rtsp://<device-ip>:8557/mpeg/media.amp"
  params: []
  notes: H.264 over HTTP tunnel on port 8557.

- id: live_image
  label: Live Image
  kind: action
  command: "http://<device-ip>/bha-api/image.cgi"
  params: []
  notes: Single JPEG. 204 if no watch-always perm and no ring event in 1 min.

- id: history_image
  label: History Image
  kind: action
  command: "http://<device-ip>/bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      range: [1, 50]
      description: Index of history image, 1 = latest
      required: true
    - name: event
      type: string
      enum: [doorbell, motionsensor]
      description: Event type (optional). Default = ring history for DoorBird, input trigger history for BirdGuard.
      default: doorbell
  notes: JPEG from cloud storage. 204 if no history/motion permission.

- id: audio_receive
  label: Live Audio Receive
  kind: action
  command: "http://<device-ip>/bha-api/audio-receive.cgi"
  params: []
  notes: G.711 μ-law, 8000 Hz. Append ?sessionid=<id> to avoid plaintext credentials.

- id: audio_transmit
  label: Live Audio Transmit
  kind: action
  method: POST
  command: "http://<device-ip>/bha-api/audio-transmit.cgi"
  params:
    - name: audio_data
      type: binary
      description: G.711 μ-law audio stream, Content-Type: audio/basic
  notes: POST. Only one consumer may transmit (talk) at a time; second rejected.

- id: monitor
  label: Monitor Request
  kind: action
  command: "http://<device-ip>/bha-api/monitor.cgi?ring={ring}"
  params:
    - name: ring
      type: string
      enum: [doorbell, motionsensor]
      description: Event type to monitor. Comma-separated for multiple, e.g. "doorbell,motionsensor".
      required: true
  notes: Continuous multipart text stream (doorbell:H/L, motionsensor:H/L). Up to 8 concurrent streams; 509 when all busy. rfid/keypad coming soon.

# === Device info ===
- id: info
  label: Device Info
  kind: query
  command: "http://<device-ip>/bha-api/info.cgi"
  params: []
  notes: JSON with FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS (fw 000108+), DEVICE-TYPE.

# === Favorites ===
- id: list_favorites
  label: List Favorites
  kind: action
  command: "http://<device-ip>/bha-api/favorites.cgi"
  params: []

- id: save_favorite
  label: Add or Change Favorite
  kind: action
  command: "http://<device-ip>/bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: action
      type: string
      description: Fixed "save"
    - name: type
      type: string
      enum: [sip, http]
      description: Favorite type (cannot switch type on existing favorite)
    - name: title
      type: string
      description: Name/title
    - name: value
      type: string
      description: URL or SIP address
    - name: id
      type: integer
      description: Optional - ID of existing favorite to change

- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "http://<device-ip>/bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: action
      type: string
      description: Fixed "remove"
    - name: type
      type: string
      enum: [sip, http]
    - name: id
      type: integer

# === Schedules ===
- id: list_schedules
  label: List Schedules
  kind: action
  command: "http://<device-ip>/bha-api/schedule.cgi"
  params: []

- id: save_schedule
  label: Add or Update Schedule Entry
  kind: action
  method: POST
  command: "http://<device-ip>/bha-api/schedule.cgi"
  params:
    - name: input
      type: string
      enum: [doorbell, motion, rfid, fingerprint]
    - name: param
      type: string
      description: Doorbell number, transponder ID, or fingerprint ID
    - name: output
      type: json
      description: JSON array of output action configurations (event: notify|sip|relay|http)
    - name: enabled
      type: integer
      enum: [0, 1]

- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  command: "http://<device-ip>/bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: action
      type: string
      description: Fixed "remove"
    - name: input
      type: string
      enum: [doorbell, motion, rfid]
    - name: param
      type: string

# === SIP ===
- id: sip_registration
  label: SIP Registration
  kind: action
  command: "http://<device-ip>/bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
    - name: password
      type: string
    - name: url
      type: string
      description: SIP Proxy IP or hostname

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "http://<device-ip>/bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: SIP URL to call

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "http://<device-ip>/bha-api/sip.cgi?action=hangup"
  params: []

- id: sip_status
  label: SIP Status Query
  kind: query
  command: "http://<device-ip>/bha-api/sip.cgi?action=status"
  params: []
  notes: JSON with LASTERRORCODE (200 = registered) and LASTERRORTEXT.

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "http://<device-ip>/bha-api/sip.cgi?action=settings&{param}={value}"
  params:
    - name: enable
      type: integer
      enum: [0, 1]
    - name: mic_volume
      type: integer
      range: [1, 100]
    - name: spk_volume
      type: integer
      range: [1, 100]
    - name: dtmf
      type: integer
      enum: [0, 1]
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED - use schedule.cgi. SIP URL or 'none'."
    - name: relay1_passcode
      type: integer
      range: [0, 99999999]
    - name: incoming_call_enable
      type: integer
      enum: [0, 1]
    - name: incoming_call_user
      type: string
      description: Allowed SIP user, e.g. "sip:10.0.0.1:5060"
    - name: anc
      type: integer
      enum: [0, 1]
    - name: ring_time_limit
      type: integer
      range: [10, 300]
    - name: call_time_limit
      type: integer
      range: [30, 300]

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "http://<device-ip>/bha-api/sip.cgi?action=reset"
  params: []
  notes: Resets SIP settings except license; hangs up ongoing call.
```

## Feedbacks
```yaml
- id: video_stream
  type: binary
  description: Multipart JPEG live video stream (multipart/x-mixed-replace), ~8 fps

- id: live_image
  type: binary
  description: Single JPEG image from default resolution/compression

- id: history_image
  type: binary
  description: JPEG history image from cloud storage

- id: audio_receive
  type: binary
  description: G.711 μ-law audio stream (8000 Hz)

- id: audio_transmit_response
  type: status
  description: HTTP status. 204 = no permission / no recent ring event. Only one talk consumer allowed; second rejected.

- id: monitor_stream
  type: text
  description: Continuous multipart text stream - doorbell:H/L, motionsensor:H/L. Max 8 concurrent streams; 509 when full.

- id: open_door_response
  type: json
  description: JSON with RETURNCODE

- id: light_on_response
  type: json
  description: JSON with RETURNCODE

- id: session_response
  type: json
  description: JSON with RETURNCODE, SESSIONID, NOTIFICATION_ENCRYPTION_KEY (32-64 bytes; first 32 used by ChaCha20)

- id: favorites_list
  type: json
  description: JSON object with sip and http favorite entries

- id: schedule_list
  type: json
  description: JSON array of schedule entries with input, param, output

- id: device_info
  type: json
  description: JSON with FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS (fw 000108+), DEVICE-TYPE

- id: sip_status
  type: json
  description: JSON with LASTERRORCODE (200 = registered) and LASTERRORTEXT

- id: sip_settings_response
  type: json
  description: JSON with RETURNCODE

- id: restart_response
  type: json
  description: JSON with RETURNCODE

- id: udp_event
  type: binary
  description: UDP broadcast on ports 6524/35344. IDENT=DE:AD:BE, VERSION, NONCE, CIPHERTEXT. ChaCha20-Poly1305 decrypted payload contains INTERCOM_ID (6 chars), EVENT (8 chars padded), TIMESTAMP (Unix). Keep-alive broadcasts every 7s - skip them.

- id: rtsp_video
  type: binary
  description: MPEG4 H.264 live video stream via RTSP (port 554) or RTSP-over-HTTP (port 8557), ~12 fps
```

## Variables
```yaml
- id: mic_volume
  label: Microphone Volume
  kind: variable
  type: integer
  range: [1, 100]
  default: 33
  write: sip_settings

- id: spk_volume
  label: Speaker Volume
  kind: variable
  type: integer
  range: [1, 100]
  default: 70
  write: sip_settings

- id: sip_dtmf
  label: DTMF Support
  kind: variable
  type: integer
  enum: [0, 1]
  default: 0
  write: sip_settings

- id: sip_anc
  label: Acoustic Noise Cancellation
  kind: variable
  type: integer
  enum: [0, 1]
  default: 1
  write: sip_settings

- id: ring_time_limit
  label: Ring Time Limit
  kind: variable
  type: integer
  range: [10, 300]
  default: 300
  write: sip_settings

- id: call_time_limit
  label: Call Time Limit
  kind: variable
  type: integer
  range: [30, 300]
  default: 300
  write: sip_settings

- id: sip_incoming_call_enable
  label: Incoming SIP Calls
  kind: variable
  type: integer
  enum: [0, 1]
  default: 0
  write: sip_settings

- id: sip_enable
  label: SIP Enable
  kind: variable
  type: integer
  enum: [0, 1]
  default: 0
  write: sip_settings

- id: sip_incoming_call_user
  label: Incoming SIP User
  kind: variable
  type: string
  write: sip_settings

- id: relay1_passcode
  label: Relay 1 Passcode
  kind: variable
  type: integer
  range: [0, 99999999]
  write: sip_settings
  # UNRESOLVED: passcode stored in device, not returned in plain text
```

## Events
```yaml
# Device sends unsolicited UDP broadcasts on port 6524 and 35344.
# Events: doorbell (with doorbell number), motion, rfid, fingerprint
- id: doorbell_event
  type: event
  params:
    - name: doorbell_number
      type: string
      description: Doorbell number (padded with spaces)
    - name: timestamp
      type: integer
      description: Unix timestamp

- id: motion_event
  type: event
  params:
    - name: timestamp
      type: integer

- id: rfid_event
  type: event
  description: "Coming soon per source"

- id: fingerprint_event
  type: event
  description: "Coming soon per source"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented as macros
# Schedule entries (schedule.cgi) provide equivalent automation across time windows
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Door open relay triggered by user watching live image - source assumes visual verification before triggering relay"
  - "Audio AEC/ANR must be implemented client-side; device does not provide echo cancellation for third-party integrations"
  - "SIP call auto-terminates after 180 seconds for security"
  - "Video/audio streams can be interrupted when official DoorBird App takes precedence over LAN API"
  - "Device is a single concurrent A/V call device - returns HTTP 503 when busy"
  - "Audio transmit (talk): only one consumer at a time; second rejected"
  - "Monitor stream: max 8 concurrent streams; returns HTTP 509 when all busy"
  - "Wrong authentication blocks IP or user for 1 minute (HTTP 423)"
  - "Firmware update in progress blocks restart (HTTP 503)"
  - "Minimum 3 seconds between SIP requests to avoid penetration"
  - "RFID and keypad events documented as future additions"
```

## Notes
D1101KH is an IP video door station (D11x family, requires firmware 000130+ per source COMPATIBLE DEVICES table). LAN API accessed at `/bha-api/` on HTTP port 80 and HTTPS port 443 (self-signed cert). Session ID valid 10 minutes for secure video/audio streaming (avoids plaintext credential transmission); append `?sessionid=<id>` to video.cgi / audio-receive.cgi. Event monitoring via UDP broadcasts (ports 6524 and 35344) encrypted with ChaCha20-Poly1305 v2 (since November 2023); key from `NOTIFICATION_ENCRYPTION_KEY` in getsession.cgi response — first 32 bytes used by ChaCha20. Legacy v1 (Argon2i) deprecated. RTSP video on port 554, RTSP-over-HTTP on port 8557, ~12 fps. SIP on port 5060. Audio codec is G.711 μ-law at 8000 Hz. Client-side AEC/ANR required for audio transmission. API rate limit: 1 concurrent connection per second; HTTP 423 response for auth failures. Firmware 000110+ required for favorites/schedules; firmware 000108+ includes relay config in `info.cgi`. 1080p RTSP path supported by D11x only. Favorites and schedules replace deprecated `notification.cgi` and `autocall_doorbell_url`. Device discovery via Apple Bonjour (`_http._tcp`).

<!-- UNRESOLVED: hardware version 1.00+ stated for D11x but specific D1101KH hardware rev not enumerated separately -->
<!-- UNRESOLVED: relay1_passcode write-only, never returned in plain text — privacy-sensitive -->
<!-- UNRESOLVED: exact RTSP auth scheme (Basic vs Digest) for RTSP not specified beyond "standard RTSP authentication" -->
<!-- UNRESOLVED: Cloud API (partner-only) and HTML5 Widget not documented in this source -->

---

Spec above. Changes summary:
- Transport: added ports 443/554/8557/5060, RTSP paths, udp ports, alt auth (all source-stated)
- Firmware: `000130` (D11x row in COMPATIBLE DEVICES)
- Actions added: `live_video`, `live_video_rtsp`, `live_video_rtsp_over_http`, `live_image`, `history_image`, `audio_receive`, `audio_transmit`, `monitor`, `info`, `sip_status` — all with verbatim `command:` payloads
- Existing actions: added `command:` field to each (payload rule), added `autocall_doorbell_url` + `incoming_call_user` params to `sip_settings`
- Feedbacks: added `audio_transmit_response`, enriched `session_response`/`monitor_stream`/`sip_status` descriptions
- Variables: added `sip_enable`, `sip_incoming_call_user`
- Safety: added audio-transmit + monitor-stream interlocks
- Notes: corrected firmware claim, added Bonjour discovery, RTSP 1080p D11x note

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-07-12T20:26:16.672Z
last_checked_at: 2026-07-21T22:22:17.178Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:22:17.178Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec actions found verbatim in source with exact endpoint matches and parameters. Transport parameters verified. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 serial not mentioned in source — not applicable to D1101KH"
- "passcode stored in device, not returned in plain text"
- "no explicit multi-step sequences documented as macros"
- "hardware version 1.00+ stated for D11x but specific D1101KH hardware rev not enumerated separately"
- "relay1_passcode write-only, never returned in plain text — privacy-sensitive"
- "exact RTSP auth scheme (Basic vs Digest) for RTSP not specified beyond \"standard RTSP authentication\""
- "Cloud API (partner-only) and HTML5 Widget not documented in this source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
