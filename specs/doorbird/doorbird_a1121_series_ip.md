---
spec_id: admin/doorbird-a1121-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird A1121 Series Control Spec"
manufacturer: Doorbird
model_family: "A1121 Series"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "A1121 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-07-12T20:13:13.612Z
last_checked_at: 2026-07-21T22:02:20.002Z
generated_at: 2026-07-21T22:02:20.002Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "A1121 Series not named in source compatible-devices table; firmware/hardware compatibility inferred from shared API"
  - "SIP proxy port not stated beyond default 5060 mention for P2P incoming"
  - "schema allows one port; HTTPS/RTSP/SIP/UDP ports documented but not representable here"
  - "no explicit multi-step macros in source; schedule system provides equivalent functionality"
  - "no explicit safety warnings or interlock procedures in source"
  - "A1121 Series firmware/hardware version not stated in source compat table"
  - "schema single-port field cannot represent HTTP 80 + HTTPS 443 + RTSP 554/8557 + SIP 5060 + UDP 6524/35344"
  - "max favorites/schedules size limits not stated"
  - "RTSP/SIP ports not stated as user-configurable"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:02:20.002Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions have literal matches in source; transport parameters verified; full command-by-command coverage with no mismatches or extra commands. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-12
---

# Doorbird A1121 Series Control Spec

## Summary
IP video door station with HTTP-based LAN API (LAN-2-LAN API rev 0.36) for third-party integration. Supports unencrypted HTTP on TCP 80 and encrypted HTTPS on TCP 443 in the LAN, UDP event broadcasts on 6524/35344, RTSP video streaming on 554 / RTSP-over-HTTP on 8557, and a built-in SIP service on 5060. Authentication via RFC 2617 Basic/Digest or plaintext `http-user`/`http-password` params. API revision 0.36 (November 13 2023).

<!-- UNRESOLVED: A1121 Series not named in source compatible-devices table; firmware/hardware compatibility inferred from shared API -->
<!-- UNRESOLVED: SIP proxy port not stated beyond default 5060 mention for P2P incoming -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 80  # HTTP unencrypted (TCP)
  base_url: "http://<device-ip>/bha-api/"
  # Source states additional ports (single port field cannot hold all):
  #   HTTPS (encrypted LAN, self-signed cert): TCP 443
  #   RTSP video: 554
  #   RTSP-over-HTTP: 8557
  #   SIP (P2P incoming, enabled via sip enable=1): 5060
  #   UDP event broadcasts: 6524 and 35344 (keep-alive every 7s)
  # UNRESOLVED: schema allows one port; HTTPS/RTSP/SIP/UDP ports documented but not representable here
auth:
  type: basic_digest  # RFC 2617 Basic or Digest per request
  # Plaintext fallback: http-user / http-password query params (insecure, for HA platforms)
  # Rate limit: 1 concurrent API connection/sec; wrong-credential lockout 1 min -> HTTP 423
```

## Traits
```yaml
- powerable       # restart command present
- queryable       # info.cgi, sip.cgi?action=status, monitor.cgi, getsession.cgi
- routable        # schedule/favorite system for event-driven output routing
- levelable       # mic_volume, spk_volume SIP settings
```

## Actions
```yaml
# --- Session ---
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
      description: Existing session ID to destroy (valid 10 min otherwise)

# --- Door / Light / Relays ---
- id: open_door
  label: Open Door
  kind: action
  command: "GET /bha-api/open-door.cgi?r={r}"
  params:
    - name: r
      type: string
      description: "doorcontrollerID@relay (optional); defaults to physical relay 1"

- id: light_on
  label: Light On
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []

# --- Video / Image / Audio ---
- id: live_video
  label: Live Video (MJPEG)
  kind: action
  command: "GET /bha-api/video.cgi"
  params: []
  notes: "multipart/x-mixed-replace MJPEG; up to 8 fps; requires watch-always or ring in past 5 min else 204"

- id: live_image
  label: Live Image (JPEG)
  kind: action
  command: "GET /bha-api/image.cgi"
  params: []
  notes: "Single JPEG; requires watch-always or ring in past 1 min else 204"

- id: history_image
  label: History Image
  kind: action
  command: "GET /bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: "1..50, index of history image (1 = latest)"
    - name: event
      type: string
      description: "doorbell|motionsensor (optional); default ring history"

- id: monitor
  label: Monitor (Doorbell/Motion Stream)
  kind: action
  command: "GET /bha-api/monitor.cgi?ring={ring}"
  params:
    - name: ring
      type: string
      description: "doorbell,motionsensor (comma-separated); rfid/keypad coming soon"
  notes: "multipart stream; up to 8 concurrent; 509 if all busy"

- id: audio_receive
  label: Live Audio Receive
  kind: action
  command: "GET /bha-api/audio-receive.cgi"
  params: []
  notes: "G.711 mu-law, 8000 Hz; requires watch-always or ring in past 5 min else 204"

- id: audio_transmit
  label: Live Audio Transmit
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params: []
  notes: "POST G.711 mu-law audio/basic; only one consumer may transmit at once"

# --- RTSP ---
- id: rtsp_video
  label: RTSP Live Video
  kind: action
  command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/media.amp"
  params: []
  notes: "H.264; up to 12 fps; RTSP auth (no param auth); port 554 default"

- id: rtsp_video_720p
  label: RTSP Live Video 720p
  kind: action
  command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/720p/media.amp"
  params: []
  notes: "D10x/D21x from firmware 000129"

- id: rtsp_video_1080p
  label: RTSP Live Video 1080p
  kind: action
  command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/1080p/media.amp"
  params: []
  notes: "D11x only"

- id: rtsp_video_http
  label: RTSP-over-HTTP Video
  kind: action
  command: "rtsp://<device-ip>:8557/mpeg/media.amp"
  params: []
  notes: "RTSP tunneled over HTTP on port 8557"

# --- Device Info ---
- id: device_info
  label: Device Info
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []
  notes: "JSON: FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS (fw 000108+), DEVICE-TYPE"

# --- Favorites ---
- id: list_favorites
  label: List Favorites
  kind: action
  command: "GET /bha-api/favorites.cgi"
  params: []

- id: save_favorite
  label: Add or Change Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: action
      type: string
      description: Fixed "save"
    - name: type
      type: string
      description: "sip or http (cannot switch type on existing favorite)"
    - name: title
      type: string
      description: Name/title of favorite
    - name: value
      type: string
      description: URL or SIP target
    - name: id
      type: integer
      description: Optional; ID of existing favorite to change

- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: action
      type: string
      description: Fixed "remove"
    - name: type
      type: string
      description: "sip or http"
    - name: id
      type: integer
      description: ID of favorite to delete

# --- Schedules ---
- id: list_schedules
  label: List Schedules
  kind: action
  command: "GET /bha-api/schedule.cgi"
  params: []

- id: save_schedule
  label: Add or Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params:
    - name: input
      type: string
      description: "doorbell, motion, rfid, or fingerprint"
    - name: param
      type: string
      description: Doorbell number, transponder ID, or fingerprint ID
    - name: output
      type: array
      description: JSON array of output action configurations

- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: action
      type: string
      description: Fixed "remove"
    - name: input
      type: string
      description: "doorbell, motion, or rfid"
    - name: param
      type: string
      description: Doorbell number or transponder ID

# --- System ---
- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []
  notes: "503 if busy (e.g. firmware update in progress)"

# --- SIP ---
- id: sip_registration
  label: SIP Registration
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: action
      type: string
      description: Fixed "registration"
    - name: user
      type: string
      description: SIP Proxy username
    - name: password
      type: string
      description: SIP Proxy password
    - name: url
      type: string
      description: SIP Proxy IP/hostname

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: action
      type: string
      description: Fixed "makecall"
    - name: url
      type: string
      description: SIP URL to call

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params:
    - name: action
      type: string
      description: Fixed "hangup"

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&enable={enable}&mic_volume={mic_volume}&spk_volume={spk_volume}&dtmf={dtmf}&relay1_passcode={relay1_passcode}&incoming_call_enable={incoming_call_enable}&incoming_call_user={incoming_call_user}&anc={anc}&ring_time_limit={ring_time_limit}&call_time_limit={call_time_limit}"
  params:
    - name: action
      type: string
      description: Fixed "settings"
    - name: enable
      type: integer
      description: "0..1, enable SIP after reboot"
    - name: mic_volume
      type: integer
      description: "1..100, microphone volume (default 33)"
    - name: spk_volume
      type: integer
      description: "1..100, speaker volume (default 70)"
    - name: dtmf
      type: integer
      description: "0..1, DTMF support (default 0)"
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED - use schedule.cgi. SIP URL or 'none' (default none)"
    - name: relay1_passcode
      type: integer
      description: "0..99999999, door open PIN via DTMF"
    - name: incoming_call_enable
      type: integer
      description: "0..1, incoming calls (default 0)"
    - name: incoming_call_user
      type: string
      description: "Allowed SIP user, e.g. sip:10.0.0.1:5060"
    - name: anc
      type: integer
      description: "0..1, acoustic noise cancellation (default 1)"
    - name: ring_time_limit
      type: integer
      description: "10..300 seconds (default 300)"
    - name: call_time_limit
      type: integer
      description: "30..300 seconds (default 300)"

- id: sip_status
  label: SIP Status
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  params:
    - name: action
      type: string
      description: Fixed "status"

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  params:
    - name: action
      type: string
      description: Fixed "reset"
  notes: "Resets all SIP settings except license; hangs up ongoing call"
```

## Feedbacks
```yaml
- id: session_response
  type: object
  description: Returns SESSIONID and NOTIFICATION_ENCRYPTION_KEY (key valid until password change)

- id: door_open_response
  type: json
  description: JSON with RETURNCODE

- id: light_on_response
  type: json
  description: JSON with RETURNCODE

- id: favorites_list
  type: json
  description: JSON object with sip/http favorites

- id: schedule_list
  type: json
  description: JSON array of schedule entries

- id: device_info
  type: json
  description: "JSON: FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS (fw 000108+), DEVICE-TYPE"

- id: monitor_state
  type: enum
  values: [H, L]
  description: "H=triggered/high, L=low/idle for doorbell:motionsensor"

- id: sip_status
  type: json
  description: "JSON: LASTERRORCODE (200 = registered ok), LASTERRORTEXT"

- id: http_status_codes
  type: enum
  values: [200, 204, 400, 401, 423, 500, 503, 507, 509]
  description: "Standard HTTP response codes; 423=lockout, 503=busy, 507=size limit, 509=monitor streams full"
```

## Variables
```yaml
- id: mic_volume
  type: integer
  range: [1, 100]
  description: "Microphone volume (SIP settings, default 33)"

- id: spk_volume
  type: integer
  range: [1, 100]
  description: "Speaker volume (SIP settings, default 70)"

- id: relay1_passcode
  type: integer
  range: [0, 99999999]
  description: Door open PIN code for DTMF relay trigger

- id: ring_time_limit
  type: integer
  range: [10, 300]
  description: "Max ringing time in seconds (SIP, default 300)"

- id: call_time_limit
  type: integer
  range: [30, 300]
  description: "Max call duration in seconds (SIP, default 300)"

- id: dtmf
  type: boolean
  description: DTMF support enable/disable

- id: anc
  type: boolean
  description: "Acoustic noise cancellation enable/disable (default on)"

- id: sip_enable
  type: boolean
  description: SIP registration enable after reboot
```

## Events
```yaml
# UDP broadcasts on ports 6524 and 35344; keep-alive every 7s (skip those).
# v2 packet layout (ChaCha20-Poly1305):
#   IDENT: 3 bytes (0xDE 0xAD 0xBE)
#   VERSION: 1 byte (0x02)
#   NONCE: 8 bytes
#   CIPHERTEXT: 34 bytes (first 16 random, discarded after decrypt)
# Decrypted plaintext:
#   INTERCOM_ID: 6-byte string (first 6 chars of username)
#   EVENT: 8-byte string (doorbell number or 'motion', space-padded)
#   TIMESTAMP: 4-byte long (Unix)
# Key obtained once via getsession.cgi NOTIFICATION_ENCRYPTION_KEY (first 32 bytes used).
# v1 (0x01, Argon2i) deprecated.

- id: doorbell_ring
  type: string
  description: "Doorbell triggered; payload: doorbell number padded with spaces (8 bytes)"

- id: motion_detected
  type: string
  description: "Motion sensor triggered; payload: 'motion' padded with spaces (8 bytes)"

- id: rfid_event
  type: string
  description: "RFID event (documented as coming soon)"

- id: keypad_event
  type: string
  description: "Keypad event (documented as coming soon)"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros in source; schedule system provides equivalent functionality
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
# Note: Door opening assumes user watches live image - permission denied (204) without watch-always or recent ring event (5 min)
# Note: SIP call auto-terminates 180s after initiation (security auto-hangup)
# Note: Wrong-credential lockout blocks IP/user 1 min (HTTP 423)
```

## Notes
- API revision 0.36 (November 13 2023). Compatible devices table: D10x (fw 000099+), D20x (000099+), D21x (000108+), BirdGuard B10x (000099+), D11x (000130+). A1121 Series not named in this table — compatibility inferred from shared BHA API.
- Only one simultaneous audio/video call for live communication; HTTP 503 (Busy) if another user took the call.
- Max 1 concurrent API connection/sec; max 8 concurrent monitor.cgi streams (509 when full).
- Video/audio streaming over HTTPS not supported in LAN; obtain session ID via getsession.cgi (valid 10 min) and append `?sessionid=` to streaming requests.
- Audio codec: G.711 µ-law, 8000 Hz. Client MUST implement own AEC/ANR (device-side canceller insufficient alone).
- Firmware 000110+ required for favorites.cgi / schedule.cgi. Firmware 000108+ includes RELAYS in info.cgi. Firmware 000129+ for 720p RTSP (D10x/D21x). P2P SIP from 000099+.
- SIP: min 3s between SIP requests; only one simultaneous SIP call; official DoorBird App preempts LAN API streams/calls.
- UDP event encryption v2 = ChaCha20-Poly1305 (key from getsession.cgi, first 32 bytes of 32–64 byte NOTIFICATION_ENCRYPTION_KEY); v1 (0x01, Argon2i) deprecated, removable via app.
<!-- UNRESOLVED: A1121 Series firmware/hardware version not stated in source compat table -->
<!-- UNRESOLVED: schema single-port field cannot represent HTTP 80 + HTTPS 443 + RTSP 554/8557 + SIP 5060 + UDP 6524/35344 -->
<!-- UNRESOLVED: max favorites/schedules size limits not stated -->
<!-- UNRESOLVED: RTSP/SIP ports not stated as user-configurable -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-07-12T20:13:13.612Z
last_checked_at: 2026-07-21T22:02:20.002Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:02:20.002Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions have literal matches in source; transport parameters verified; full command-by-command coverage with no mismatches or extra commands. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "A1121 Series not named in source compatible-devices table; firmware/hardware compatibility inferred from shared API"
- "SIP proxy port not stated beyond default 5060 mention for P2P incoming"
- "schema allows one port; HTTPS/RTSP/SIP/UDP ports documented but not representable here"
- "no explicit multi-step macros in source; schedule system provides equivalent functionality"
- "no explicit safety warnings or interlock procedures in source"
- "A1121 Series firmware/hardware version not stated in source compat table"
- "schema single-port field cannot represent HTTP 80 + HTTPS 443 + RTSP 554/8557 + SIP 5060 + UDP 6524/35344"
- "max favorites/schedules size limits not stated"
- "RTSP/SIP ports not stated as user-configurable"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
