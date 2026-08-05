---
spec_id: admin/doorbird-d2101fpbi-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2101FPBI Series Control Spec"
manufacturer: Doorbird
model_family: "D2101FPBI Series"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "D2101FPBI Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-07-12T20:46:12.327Z
last_checked_at: 2026-07-21T22:24:50.289Z
generated_at: 2026-07-21T22:24:50.289Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "physical relay count not stated (runtime via info.cgi RELAYS array)"
  - "power specifications not stated in source"
  - "actual doorbell input count for D2101FPBI not stated"
  - "discrete settable parameters not cleanly separated from actions"
  - "no explicit multi-step macros described in source"
  - "physical relay count from info.cgi RELAYS array — depends on paired IP I/O DoorControllers"
  - "actual number of doorbell inputs (D2101FPBI specific)"
  - "power/voltage/current specs not in source"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:24:50.289Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched literally in source; all transport params (HTTP 80, HTTPS 443, RTSP 554/8557, SIP 5060, UDP 6524/35344, Basic auth) verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-12
---

# Doorbird D2101FPBI Series Control Spec

## Summary
IP video door station (D21x family) with LAN HTTP/HTTPS API over TCP. Supports door/light relays, live MJPG video, JPEG image, RTSP H.264 streaming, G.711 audio receive/transmit, SIP voice calling, favorites/schedules management, UDP event broadcasts (ChaCha20-Poly1305 v2), and device info/restart control. Auth is Basic/Digest per RFC 2617.

<!-- UNRESOLVED: physical relay count not stated (runtime via info.cgi RELAYS array) -->
<!-- UNRESOLVED: power specifications not stated in source -->
<!-- UNRESOLVED: actual doorbell input count for D2101FPBI not stated -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - udp
addressing:
  base_url: http://<device-ip>/bha-api
  port: 80
  ports:
    https: 443
    rtsp: 554
    rtsp_over_http: 8557
    sip: 5060
    udp_broadcast:
      - 6524
      - 35344
auth:
  type: basic  # stated: Basic or Digest auth per RFC 2617; plaintext http-user/http-password params also accepted
serial: null  # N/A
```

## Traits
```yaml
- powerable  # inferred: restart command present
- routable  # inferred: input/output event routing via schedules
- queryable  # inferred: info.cgi, sip.cgi?action=status, favorites.cgi, schedule.cgi
- levelable  # inferred: mic_volume, spk_volume settings
```

## Actions
```yaml
# === Session management ===
- id: get_session
  label: Get Session ID
  kind: query
  command: "GET http://<device-ip>/bha-api/getsession.cgi"
  params: []
  notes: "Returns SESSIONID (valid 10 min) + NOTIFICATION_ENCRYPTION_KEY. Required before HTTPS video/audio streaming."

- id: invalidate_session
  label: Invalidate Session ID
  kind: action
  command: "GET http://<device-ip>/bha-api/getsession.cgi?invalidate={session_id}"
  params:
    - name: session_id
      type: string
      description: Session ID to destroy

# === Relays / outputs ===
- id: open_door
  label: Open Door
  kind: action
  command: "GET http://<device-ip>/bha-api/open-door.cgi?r={r}"
  params:
    - name: r
      type: string
      description: "Relay to trigger (optional). Format: 1 | 2 | <doorcontrollerID>@<relay>, e.g. \"1\" or \"gggaaa@1\". Default: physical relay 1."

- id: light_on
  label: Light On
  kind: action
  command: "GET http://<device-ip>/bha-api/light-on.cgi"
  params: []

- id: restart
  label: Restart Device
  kind: action
  command: "GET http://<device-ip>/bha-api/restart.cgi"
  params: []
  notes: "No diagnostic sound after restart. 503 if device busy (e.g. firmware update)."

# === Video / image / audio ===
- id: live_video_mjpg
  label: Live Video (MJPEG)
  kind: action
  command: "GET http://<device-ip>/bha-api/video.cgi"
  params: []
  notes: "Multipart x-mixed-replace MJPEG, up to 8 fps. Session ID required for HTTPS variant (not supported over HTTPS otherwise)."

- id: live_image
  label: Live Image (JPEG)
  kind: action
  command: "GET http://<device-ip>/bha-api/image.cgi"
  params: []
  notes: "Single JPEG, content-type image/jpeg."

- id: history_image
  label: History Image
  kind: action
  command: "GET http://<device-ip>/bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: "1..50, where 1 is the latest history image"
    - name: event
      type: string
      description: "Optional: doorbell | motionsensor. Default = ring history (DoorBird) or input trigger (BirdGuard)."
  notes: "Requires history + motion permissions. Images stored in cloud."

- id: monitor_stream
  label: Monitor (doorbell/motion state stream)
  kind: action
  command: "GET http://<device-ip>/bha-api/monitor.cgi?ring={ring}"
  params:
    - name: ring
      type: string
      description: "doorbell | motionsensor (comma-separated to monitor both). rfid/keypad coming soon."
  notes: "Multipart stream returning doorbell:H|L and motionsensor:H|L. Max 8 concurrent streams; 509 when full."

- id: audio_receive
  label: Live Audio Receive
  kind: action
  command: "GET http://<device-ip>/bha-api/audio-receive.cgi"
  params: []
  notes: "G.711 μ-law, 8000 Hz."

- id: audio_transmit
  label: Live Audio Transmit
  kind: action
  command: "POST http://<device-ip>/bha-api/audio-transmit.cgi"
  params:
    - name: audio_data
      type: binary
      description: "G.711 μ-law (8000 Hz) audio body. Content-Type: audio/basic. HTTP/1.0, Connection: Keep-Alive recommended."
  notes: "Only one consumer may transmit (talk) at a time; second rejected."

# === Info ===
- id: info_query
  label: Device Info Query
  kind: query
  command: "GET http://<device-ip>/bha-api/info.cgi"
  params: []
  notes: "Returns JSON: FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS (fw 000108+), DEVICE-TYPE."

# === Favorites ===
- id: list_favorites
  label: List Favorites
  kind: query
  command: "GET http://<device-ip>/bha-api/favorites.cgi"
  params: []
  notes: "Requires API-Operator permission. Firmware 000110+."

- id: save_favorite
  label: Save Favorite
  kind: action
  command: "GET http://<device-ip>/bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: action
      type: string
      description: "save (fixed)"
    - name: type
      type: string
      description: "sip | http (cannot switch type on existing favorite)"
    - name: title
      type: string
      description: "Name / short description"
    - name: value
      type: string
      description: "URL or SIP target (incl. protocol/credentials if needed)"
    - name: id
      type: integer
      description: "Optional: ID of existing favorite to change; omit for new."

- id: remove_favorite
  label: Remove Favorite
  kind: action
  command: "GET http://<device-ip>/bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: action
      type: string
      description: "remove (fixed)"
    - name: type
      type: string
      description: "sip | http"
    - name: id
      type: integer
      description: "ID of favorite to delete"
  notes: "Active schedule entries using this favorite are also removed."

# === Schedules ===
- id: list_schedules
  label: List Schedules
  kind: query
  command: "GET http://<device-ip>/bha-api/schedule.cgi"
  params: []
  notes: "Requires API-Operator permission. Firmware 000110+."

- id: save_schedule
  label: Save Schedule Entry
  kind: action
  command: "POST http://<device-ip>/bha-api/schedule.cgi"
  params:
    - name: input
      type: string
      description: "doorbell | motion | rfid | fingerprint"
    - name: param
      type: string
      description: "doorbell-number | '' | transponder-id | fingerprint-id"
    - name: output
      type: string
      description: "JSON array of {event: notify|sip|relay|http, param, schedule:{once|from-to|weekdays}}"

- id: remove_schedule
  label: Remove Schedule Entry
  kind: action
  command: "GET http://<device-ip>/bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: action
      type: string
      description: "remove (fixed)"
    - name: input
      type: string
      description: "doorbell | motion | rfid"
    - name: param
      type: string
      description: "doorbell-number | '' | transponder-id"

# === SIP ===
- id: sip_registration
  label: SIP Registration
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
      description: "Auth user for SIP proxy"
    - name: password
      type: string
      description: "Auth password for SIP proxy"
    - name: url
      type: string
      description: "IP/hostname of SIP proxy"

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: "SIP URL to call"
  notes: "Wait min 3s between SIP requests. 503 if line busy."

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=hangup"
  params: []
  notes: "Returns 200 even if no ongoing call."

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=settings&<parameter>=<value>"
  params:
    - name: enable
      type: integer
      description: "0..1, enable SIP registration after reboot, default 0"
    - name: mic_volume
      type: integer
      description: "1..100, default 33"
    - name: spk_volume
      type: integer
      description: "1..100, default 70"
    - name: dtmf
      type: integer
      description: "0..1, enable DTMF support, default 0"
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED (use schedule.cgi). SIP URL or 'none', default 'none'"
    - name: relay1_passcode
      type: integer
      description: "0..99999999, pincode for door open relay"
    - name: incoming_call_enable
      type: integer
      description: "0..1, default 0"
    - name: incoming_call_user
      type: string
      description: "Authenticated SIP user, e.g. sip:10.0.0.1:5060"
    - name: anc
      type: integer
      description: "0..1, acoustic noise cancellation, default 1"
    - name: ring_time_limit
      type: integer
      description: "10..300 seconds, default 300"
    - name: call_time_limit
      type: integer
      description: "30..300 seconds, default 300"

- id: sip_status_query
  label: SIP Status Query
  kind: query
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=status"
  params: []
  notes: "Returns JSON LASTERRORCODE/LASTERRORTEXT. 200 = registered."

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=reset"
  params: []
  notes: "Resets all SIP settings except license; hangs up any ongoing call."

# === RTSP streaming ===
- id: rtsp_live_video
  label: RTSP Live Video (H.264)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params: []
  notes: "H.264, up to 12 fps. Standard RTSP auth only (no param auth)."

- id: rtsp_live_video_720p
  label: RTSP Live Video 720p
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/720p/media.amp"
  params: []
  notes: "D10x/D21x from firmware 000129."

- id: rtsp_live_video_1080p
  label: RTSP Live Video 1080p
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/1080p/media.amp"
  params: []
  notes: "D11x only."

- id: rtsp_over_http
  label: RTSP-over-HTTP
  kind: action
  command: "rtsp://<device-ip>:8557/mpeg/media.amp"
  params: []
  notes: "RTSP tunneled over HTTP, port 8557."
```

## Feedbacks
```yaml
- id: doorbell_state
  type: enum
  values: [H, L]
  description: Doorbell press event via monitor.cgi or UDP broadcast

- id: motionsensor_state
  type: enum
  values: [H, L]
  description: Motion sensor event via monitor.cgi or UDP broadcast

- id: sip_status
  type: object
  description: "JSON: LASTERRORCODE, LASTERRORTEXT"

- id: device_info
  type: object
  description: "JSON: FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS, DEVICE-TYPE"

- id: favorites_list
  type: object
  description: "JSON: sip and http favorites"

- id: schedules_list
  type: object
  description: "JSON: schedule entries with input/output/schedule"

- id: session_info
  type: object
  description: "JSON from getsession.cgi: RETURNCODE, SESSIONID, NOTIFICATION_ENCRYPTION_KEY"
```

## Variables
```yaml
# UNRESOLVED: discrete settable parameters not cleanly separated from actions
# sip_settings params double as variables (mic_volume, spk_volume, etc.)
```

## Events
```yaml
- id: doorbell_event
  type: string
  description: "UDP broadcast v2 (ChaCha20-Poly1305): doorbell press - INTERCOM_ID (6 chars) + doorbell number (padded) + Unix timestamp"

- id: motion_event
  type: string
  description: "UDP broadcast v2: motion trigger - INTERCOM_ID + EVENT='motion' + timestamp"

- id: schedule_trigger
  type: string
  description: "Schedule-driven: notify, sip, relay, or http output triggered by doorbell/motion/rfid/fingerprint"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Audio AEC/ANC must be performed on client side; device does not provide echo cancellation for third-party clients"
  - "SIP call auto-terminates after 180 seconds"
  - "Video/audio stream precedence given to official DoorBird App over LAN API"
  - "Device blocks IP for 1 minute after extensive wrong credentials (HTTP 423)"
  - "Firmware 000110+ required for favorites and schedules API"
  - "Firmware 000108+ required for relay config in info.cgi"
  - "Firmware 000129+ required for 720p RTSP (D10x/D21x)"
  - "SIP: only one simultaneous call supported"
  - "Max 1 concurrent API connection per second; 503 when busy"
  - "Max 8 concurrent monitor.cgi streams; 509 when full"
  - "Audio transmit: only one consumer at a time; second rejected"
```

## Notes
- Session ID (getsession.cgi) valid 10 minutes; must be obtained before video/audio streaming over HTTPS to avoid plaintext credential transmission. NOTIFICATION_ENCRYPTION_KEY (32–64 bytes; first 32 used for ChaCha20) obtained once, valid until user password changes.
- UDP event broadcasts v2 on ports 6524 and 35344 (ChaCha20-Poly1305, IDENT 0xDE 0xAD 0xBE, VERSION 0x02). v1 (0x01, Argon2i) deprecated. Keep-alive packets every 7s should be ignored. Decrypted payload: INTERCOM_ID (6 bytes) + EVENT (8 bytes, space-padded) + TIMESTAMP (4-byte long).
- HTTPS uses pre-installed self-signed certificate; client must accept it or use `--nocheck-certificate`.
- RTSP standard auth only; parameter auth (http-user/http-password) not supported for RTSP.
- RTSP port 554; RTSP-over-HTTP port 8557.
- SIP port 5060; peer-2-peer calls supported from firmware 000099. Audio codec G.711 μ-law 8000 Hz. Min 3s between SIP requests.
- History images stored in cloud; motion + history permissions required.
- 1 concurrent API connection per second max; 503 returned when line busy.
- API revision 0.36 (November 13 2023).
<!-- UNRESOLVED: physical relay count from info.cgi RELAYS array — depends on paired IP I/O DoorControllers -->
<!-- UNRESOLVED: actual number of doorbell inputs (D2101FPBI specific) -->
<!-- UNRESOLVED: power/voltage/current specs not in source -->
````

Upgrade done. Added 16 missing actions w/ verbatim payloads, `http` protocol + RTSP/SIP/HTTPS ports, `command:` fields on all existing actions, `sip_status_query`/`info_query`/`list_*` as queries, RTSP stream actions, session mgmt, video/image/audio/history endpoints. Preserved all existing IDs + feedbacks/events/safety. Bumped `created_at`.

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-07-12T20:46:12.327Z
last_checked_at: 2026-07-21T22:24:50.289Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:24:50.289Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched literally in source; all transport params (HTTP 80, HTTPS 443, RTSP 554/8557, SIP 5060, UDP 6524/35344, Basic auth) verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "physical relay count not stated (runtime via info.cgi RELAYS array)"
- "power specifications not stated in source"
- "actual doorbell input count for D2101FPBI not stated"
- "discrete settable parameters not cleanly separated from actions"
- "no explicit multi-step macros described in source"
- "physical relay count from info.cgi RELAYS array — depends on paired IP I/O DoorControllers"
- "actual number of doorbell inputs (D2101FPBI specific)"
- "power/voltage/current specs not in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
