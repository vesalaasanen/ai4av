---
spec_id: admin/doorbird-d31tdh
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird D31TDH Control Spec"
manufacturer: DoorBird
model_family: "DoorBird D31TDH"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "DoorBird D31TDH"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-14T07:25:36.225Z
last_checked_at: 2026-07-21T22:27:56.209Z
generated_at: 2026-07-21T22:27:56.209Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device-specific voltage/power/current specs not in source; firmware version for D31TDH not stated"
  - "D31TDH support not explicitly stated.\""
  - "no explicit multi-step sequences documented in source"
  - "no explicit interlock procedures or power-on sequencing requirements stated in source"
  - "firmware version compatibility for D31TDH not stated (source mentions feature-gating versions 000099, 000108, 000110, 000129 for various models/features). RTSP 720p/1080p variants tied to D10x/D21x/D11x; D31TDH resolution support not confirmed. Device voltage/power/current specs absent. Default video resolution/compression config-dependent (not enumerated)."
verification:
  verdict: verified
  checked_at: 2026-07-21T22:27:56.209Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched verbatim in source document; comprehensive API coverage with all transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# DoorBird D31TDH Control Spec

## Summary
The DoorBird D31TDH is a Video Door Station supporting LAN-based HTTP, RTSP, SIP, and UDP broadcast control. This spec covers the LAN-2-LAN API: HTTP CGI endpoints for door/light relay control, live image/video, audio, history, favorites/schedule management, SIP call control, RTSP streaming, and encrypted UDP event broadcasts.

<!-- UNRESOLVED: device-specific voltage/power/current specs not in source; firmware version for D31TDH not stated -->

## Transport
```yaml
protocols:
  - http
  - udp
  - rtsp
  - sip
addressing:
  base_url: "http://<device-ip>/bha-api/"  # also https://<device-ip>/bha-api/ on port 443 (self-signed cert)
  port: 80  # HTTP unencrypted; 443 for HTTPS
http_ports:
  - 80   # HTTP (unencrypted, LAN)
  - 443  # HTTPS (self-signed cert, LAN)
udp:
  broadcast_ports:
    - 6524
    - 35344
  note: "Event monitoring UDP broadcasts sent on ports 6524 and 35344; keep-alive packets every 7 seconds"
rtsp:
  ports:
    - 554    # RTSP
    - 8557   # RTSP-over-HTTP
sip:
  port: 5060  # P2P SIP (device version 000099+)
auth:
  type: basic_or_digest  # RFC 2617 Basic or Digest auth required per request; same credentials as DoorBird App
  alternative: "Plaintext HTTP params http-user and http-password supported (insecure)"
  rate_limit: "Max 1 concurrent connection per second; 1 minute IP/user block on excessive wrong credentials (HTTP 423)"
```

## Traits
```yaml
# - queryable  # inferred from info.cgi, sip status, monitor.cgi, favorites/schedule list queries
traits:
  - queryable
```

## Actions
```yaml
# --- Session management ---
- id: get_session
  label: Get Session ID
  kind: query
  command: "GET /bha-api/getsession.cgi"
  params: []
  notes: "Returns JSON with SESSIONID (valid 10 min) and NOTIFICATION_ENCRYPTION_KEY. Session used for HTTPS-less video/audio streaming."

- id: invalidate_session
  label: Invalidate Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate={old_session_id}"
  params:
    - name: old_session_id
      type: string
      description: The session-id to invalidate/destroy
  notes: "Returns JSON with empty SESSIONID on success."

# --- Live video / image (HTTP) ---
- id: live_video_http
  label: Live Video Request (HTTP MJPG)
  kind: query
  command: "GET /bha-api/video.cgi"
  params: []
  notes: "Returns multipart/x-mixed-replace MJPG stream (up to 8 fps). Permission: valid user, watch-always or ring event in past 5 min. 204 if no permission. For HTTPS-less streaming append ?sessionid=<id>."

- id: live_image
  label: Live Image Request
  kind: query
  command: "GET /bha-api/image.cgi"
  params: []
  notes: "Returns JPEG image. Permission: valid user, watch-always or ring event in past 1 min. 204 if no permission."

# --- Relay control ---
- id: open_door
  label: Open Door (Relay)
  kind: action
  command: "GET /bha-api/open-door.cgi?r={relay}"
  params:
    - name: relay
      type: string
      description: "Relay to trigger, e.g. physical relay number '1'/'2' or '<doorcontrollerID>@<relay>' for paired IP I/O DoorController. Omit to trigger physical relay 1."
      required: false
  notes: "Energizes door opener/alarm output relay. Returns JSON. Permission: valid user, watch-always or ring event in past 5 min. 204 if no permission."

- id: light_on
  label: Light On (Relay)
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []
  notes: "Energizes light relay. Returns JSON. Permission: valid user, watch-always or ring event in past 5 min. 204 if no permission."

# --- History ---
- id: history_image
  label: History Image Request
  kind: query
  command: "GET /bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: "Index of history image, 1..50, where 1 is latest"
    - name: event
      type: string
      description: "Event type: doorbell or motionsensor (optional; default ring history for DoorBird)"
      required: false
  notes: "Returns JPEG from cloud history. Permission: valid user + history permission (+motion permission for motion events). 204 if no permission."

# --- Monitor (state stream) ---
- id: monitor
  label: Monitor Request (State Stream)
  kind: query
  command: "GET /bha-api/monitor.cgi?ring={ring}"
  params:
    - name: ring
      type: string
      description: "Event type(s) to monitor, comma-separated: doorbell, motionsensor. rfid/keypad coming soon."
  notes: "Returns continuous multipart stream of motionsensor/doorbell state (H=high/L=low). Max 8 concurrent streams; 509 if all busy. Permission: valid user."

# --- Audio ---
- id: audio_receive
  label: Live Audio Receive
  kind: query
  command: "GET /bha-api/audio-receive.cgi"
  params: []
  notes: "Returns real-time G.711 μ-law audio (8000 Hz). Permission: valid user, watch-always or ring event in past 5 min. For HTTPS-less streaming append ?sessionid=<id>."

- id: audio_transmit
  label: Live Audio Transmit
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params:
    - name: audio_data
      type: binary
      description: "G.711 μ-law audio data, Content-Type: audio/basic, Content-Length: 9999999, Connection: Keep-Alive, Cache-Control: no-cache"
  notes: "POST singlepart G.711 μ-law audio. Only one consumer can transmit at a time. Permission: valid user, watch-always or ring event in past 5 min."

# --- Device info ---
- id: info
  label: Info Request
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []
  notes: "Returns JSON: RETURNCODE, VERSION array (FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS, DEVICE-TYPE). Relays config included from firmware 000108. Permission: valid user."

# --- Favorites management ---
- id: list_favorites
  label: List Favorites
  kind: query
  command: "GET /bha-api/favorites.cgi"
  params: []
  notes: "Returns JSON of sip/http favorites. Requires API-Operator permission. Firmware 000110+."

- id: save_favorite
  label: Add or Change Favorite
  kind: action
  command: "POST /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: type
      type: string
      description: "Type of favorite: sip or http (cannot switch type on existing favorite)"
    - name: title
      type: string
      description: Name/short description of favorite
    - name: value
      type: string
      description: "URL/address of favorite (HTTP(S) URL or SIP target, including credentials if needed)"
    - name: id
      type: integer
      description: "ID of favorite to change; omit when saving new favorite"
      required: false
  notes: "New favorite id returned in response header 'favoriteid'. Status: 200 OK, 400 param missing, 401 auth, 500 internal, 507 size limit. Requires API-Operator permission. Firmware 000110+."

- id: remove_favorite
  label: Delete Favorite
  kind: action
  command: "POST /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: type
      type: string
      description: "Type of favorite: sip or http"
    - name: id
      type: integer
      description: ID of the favorite to delete
  notes: "If favorite is used in a schedule, that schedule entry is also removed. Status: 200 OK, 400 param missing, 401 auth, 500 internal. Requires API-Operator permission."

# --- Schedule management ---
- id: list_schedules
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []
  notes: "Returns JSON array of schedule entries (input/param/output). 204 if no data for requested input. Requires API-Operator permission. Firmware 000110+."

- id: add_update_schedule
  label: Add or Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params:
    - name: schedule_json
      type: object
      description: "JSON object with input (doorbell|motion|rfid|fingerprint), param (doorbell-number/transponder-id), output array (event: notify|sip|relay|http, param, schedule: once|from-to|weekdays). One request per input type."
  notes: "POST JSON. Status: 200 OK, 400 invalid JSON/Content-Length mismatch/too large, 401 auth, 500 internal, 507 size limit. Requires API-Operator permission. Firmware 000110+."

- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: input
      type: string
      description: "Input event type: doorbell|motion|rfid"
    - name: param
      type: string
      description: "ID of schedule entry to delete, e.g. doorbell number, RFID transponder id"
  notes: "Status: 200 OK, 401 auth, 500 internal. Requires API-Operator permission."

# --- Restart ---
- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []
  notes: "Restarts device; no diagnostic sound after restart. Status: 200 OK, 401 auth, 503 device busy (e.g. firmware update in progress)."

# --- RTSP video ---
- id: live_video_rtsp
  label: Live Video Request (RTSP H.264)
  kind: query
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params: []
  notes: "H.264 RTSP stream (up to 12 fps). RTSP port 554, RTSP-over-HTTP port 8557. Standard RTSP auth (no param auth). Permission: valid user, watch-always or ring event in past 5 min. 204 if no permission."

- id: live_video_rtsp_720p
  label: Live Video Request (RTSP 720p H.264)
  kind: query
  command: "rtsp://<device-ip>:554/mpeg/720p/media.amp"
  params: []
  notes: "720p variant. Supported by D10x/D21x from firmware 000129. UNRESOLVED: D31TDH support not explicitly stated."

- id: live_video_rtsp_1080p
  label: Live Video Request (RTSP 1080p H.264)
  kind: query
  command: "rtsp://<device-ip>:554/mpeg/1080p/media.amp"
  params: []
  notes: "1080p variant. Supported by D11x only. UNRESOLVED: D31TDH support not explicitly stated."

# --- SIP ---
- id: sip_registration
  label: SIP Registration
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
      description: Authentication user for the SIP Proxy
    - name: password
      type: string
      description: Authentication password for the SIP Proxy
    - name: url
      type: string
      description: IP/Hostname of the SIP Proxy
  notes: "Register to SIP Proxy (not needed for P2P calls). Status: 200 OK, 401 auth failure or no API-Operator permission. Requires API-Operator permission."

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: SIP URL to call (e.g. sip:108@192.168.123.22)
  notes: "Initiate SIP call (P2P or via PBX). Only one simultaneous SIP call. Min 3s between SIP requests. Auto-hangup after 180s. Status: 200 OK, 400 param missing, 401 auth, 503 line busy. Requires API-Operator permission."

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params: []
  notes: "Hangup current SIP call. Returns 200 OK even if no ongoing call. Requires API-Operator permission."

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&{params}"
  params:
    - name: enable
      type: integer
      description: "0..1; enable/disable SIP registration after reboot (default 0)"
      required: false
    - name: mic_volume
      type: integer
      description: "1..100; microphone volume (default 33)"
      required: false
    - name: spk_volume
      type: integer
      description: "1..100; speaker volume (default 70)"
      required: false
    - name: dtmf
      type: integer
      description: "0..1; enable/disable DTMF support (default 0)"
      required: false
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED (use schedule.cgi). SIP URL to auto-call on doorbell, or 'none' (default none)."
      required: false
    - name: relay1_passcode
      type: integer
      description: "0..99999999; pincode for triggering door open relay"
      required: false
    - name: incoming_call_enable
      type: integer
      description: "0..1; enable/disable incoming calls (default 0)"
      required: false
    - name: incoming_call_user
      type: string
      description: "Allowed SIP user authenticated for DoorBird (e.g. sip:10.0.0.1:5060)"
      required: false
    - name: anc
      type: integer
      description: "0..1; enable/disable acoustic noise cancellation (default 1)"
      required: false
    - name: ring_time_limit
      type: integer
      description: "10..300; max ringing time in seconds (default 300)"
      required: false
    - name: call_time_limit
      type: integer
      description: "30..300; max call duration in seconds (default 300)"
      required: false
  notes: "Configure SIP settings. Status: 200 OK, 401 auth failure or no API-Operator permission. Requires API-Operator permission."

- id: sip_status
  label: SIP Status Query
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  params: []
  notes: "Returns JSON; LASTERRORCODE '200' = successfully registered, LASTERRORTEXT = most recent SIP error text. Requires API-Operator permission."

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  params: []
  notes: "Resets all SIP settings except license; hangs up any ongoing call. Returns JSON with LASTERRORCODE. Requires API-Operator permission."
```

## Feedbacks
```yaml
- id: monitor_state
  type: stream
  description: "Continuous multipart stream from monitor.cgi reporting doorbell and motionsensor state as H (high) / L (low)"

- id: info_response
  type: object
  description: "JSON from info.cgi: RETURNCODE, VERSION array (FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS, DEVICE-TYPE)"

- id: sip_status_response
  type: object
  description: "JSON from sip.cgi?action=status: LASTERRORCODE (200 = registered), LASTERRORTEXT"

- id: session_response
  type: object
  description: "JSON from getsession.cgi: RETURNCODE, SESSIONID, NOTIFICATION_ENCRYPTION_KEY"

- id: favorites_response
  type: object
  description: "JSON from favorites.cgi: sip{} and http{} favorite entries"

- id: schedule_response
  type: object
  description: "JSON array from schedule.cgi: input/param/output schedule entries"
```

## Variables
```yaml
- id: sip_mic_volume
  description: "Microphone volume (1..100, default 33) - set via sip.cgi?action=settings&mic_volume="
  type: integer
  range: [1, 100]

- id: sip_spk_volume
  description: "Speaker volume (1..100, default 70) - set via sip.cgi?action=settings&spk_volume="
  type: integer
  range: [1, 100]

- id: sip_ring_time_limit
  description: "Max ringing time in seconds (10..300, default 300) - set via sip.cgi?action=settings&ring_time_limit="
  type: integer
  range: [10, 300]

- id: sip_call_time_limit
  description: "Max call duration in seconds (30..300, default 300) - set via sip.cgi?action=settings&call_time_limit="
  type: integer
  range: [30, 300]
```

## Events
```yaml
- id: udp_event_broadcast
  description: "Encrypted UDP broadcast on ports 6524 and 35344. v2 packets use ChaCha20-Poly1305 (NONCE 8 bytes + CIPHERTEXT). IDENT bytes 0xDE 0xAD 0xBE, VERSION 0x02. Decrypted payload contains INTERCOM_ID (6 bytes), EVENT (8 bytes, doorbell number or 'motion' padded with spaces), TIMESTAMP (4-byte long Unix). Key obtained once via getsession.cgi (NOTIFICATION_ENCRYPTION_KEY). v1 (0x01, Argon2i) deprecated."
  ports: [6524, 35344]
  encryption: "ChaCha20-Poly1305 (v2)"
  keepalive: "Every 7 seconds (skip these)"

- id: doorbell_ring
  description: "Doorbell ring event delivered via UDP broadcast; EVENT field contains doorbell number padded with spaces"

- id: motion_event
  description: "Motion sensor event delivered via UDP broadcast; EVENT field contains 'motion' padded with spaces"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
safety_notes:
  - "open-door.cgi energizes the door opener relay - physical door access control. Ensure requesting user holds appropriate permission."
  - "SIP calls auto-hangup after 180 seconds for security."
  - "Only one simultaneous SIP call supported; official DoorBird App has precedence and will interrupt LAN API streams/calls."
  - "Rate limit: 1 minute IP/user block (HTTP 423) after excessive wrong credentials."
# UNRESOLVED: no explicit interlock procedures or power-on sequencing requirements stated in source
```

## Notes
- Official DoorBird App always has precedence over LAN API connections — it can interrupt video/audio/SIP streams at any time.
- HTTPS uses a self-signed certificate (pre-installed); clients must accept it. Video/audio streaming over HTTPS requires a temporary session ID (obtained via getsession.cgi, valid 10 min) appended as `?sessionid=<id>`.
- AEC/ANR echo & noise cancellation must be implemented client-side for audio transmit; DoorBird's native algorithms are not exposed to third parties.
- Audio codec: G.711 μ-law, 8000 Hz sampling.
- "API-Operator" permission required for favorites.cgi, schedule.cgi, and sip.cgi. Users on end-user panels/apps should NOT have this permission.
- Firmware 000110+ required for favorites and schedules.
- DTMF support (if enabled) lets the SIP call recipient trigger the door-open relay via pincode.
- Bonjour (`_http._tcp`) can be used to discover devices on the LAN.

<!-- UNRESOLVED: firmware version compatibility for D31TDH not stated (source mentions feature-gating versions 000099, 000108, 000110, 000129 for various models/features). RTSP 720p/1080p variants tied to D10x/D21x/D11x; D31TDH resolution support not confirmed. Device voltage/power/current specs absent. Default video resolution/compression config-dependent (not enumerated). -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-14T07:25:36.225Z
last_checked_at: 2026-07-21T22:27:56.209Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:27:56.209Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched verbatim in source document; comprehensive API coverage with all transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device-specific voltage/power/current specs not in source; firmware version for D31TDH not stated"
- "D31TDH support not explicitly stated.\""
- "no explicit multi-step sequences documented in source"
- "no explicit interlock procedures or power-on sequencing requirements stated in source"
- "firmware version compatibility for D31TDH not stated (source mentions feature-gating versions 000099, 000108, 000110, 000129 for various models/features). RTSP 720p/1080p variants tied to D10x/D21x/D11x; D31TDH resolution support not confirmed. Device voltage/power/current specs absent. Default video resolution/compression config-dependent (not enumerated)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
