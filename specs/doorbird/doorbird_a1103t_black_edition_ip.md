---
spec_id: admin/doorbird-a1103t-black-edition
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird A1103T Black Edition Control Spec"
manufacturer: DoorBird
model_family: "DoorBird A1103T Black Edition"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "DoorBird A1103T Black Edition"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-14T07:19:20.073Z
last_checked_at: 2026-07-21T21:59:56.226Z
generated_at: 2026-07-21T21:59:56.226Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility for this specific model not stated; source gives feature gates by firmware (000099, 000108, 000110, 129). Voltage/power specs not in source."
  - "exact device-rtsp-port mapping per model not fully specified; base_url host is a placeholder."
  - "non-SIP settable variables (relay timing, video resolution/compression) not exposed via this API in source."
  - "rfid/keypad event broadcast mentioned as 'coming soon' in source."
  - "no explicit multi-step sequences documented as named macros in source."
  - "source contains no explicit safety warnings or interlock procedures. Door-relay triggering is safety-relevant (physical access) but no documented confirmation/interlock sequence."
  - "voltage/power specs, exact device-rtsp-port, A1103T-specific firmware floor, rfid/keypad event support."
verification:
  verdict: verified
  checked_at: 2026-07-21T21:59:56.226Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions match literal CGI endpoints in source; parameters align perfectly; transport (HTTP/HTTPS/UDP/RTSP, ports, Basic/Digest auth) all verified; source coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# DoorBird A1103T Black Edition Control Spec

## Summary
DoorBird A1103T Black Edition is a video door station with an IP-based (HTTP) LAN control API ("LAN-2-LAN API"). This spec covers the HTTP CGI interface for door/light relay control, live video/image/audio, history, favorites/schedule management, SIP call control, device info/restart, and UDP event-monitoring broadcasts. RTSP video streaming (ports 554/8557) is also documented.

<!-- UNRESOLVED: firmware version compatibility for this specific model not stated; source gives feature gates by firmware (000099, 000108, 000110, 129). Voltage/power specs not in source. -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  base_url: "http://<device-ip>/bha-api/"
  port: 80
auth:
  type: basic_digest  # source: "use Basic or Digest authentication as defined in RFC 2617 for each HTTP request"
```

Notes on transport:
- HTTP available unencrypted on TCP port 80, encrypted HTTPS on TCP port 443 (self-signed cert in LAN).
- Alternative plaintext params `http-user` / `http-password` supported (insecure).
- RTSP video on port 554 and RTSP-over-HTTP on port 8557 (`rtsp://<device-ip>:<port>/mpeg/media.amp`).
- UDP event broadcasts on ports 6524 and 35344 (ChaCha20-Poly1305 encrypted, v2 since Nov 2023).
- SIP service listens on port 5060 when enabled.
- Max 1 concurrent HTTP API connection per second; wrong-cred brute force blocked 1 min (HTTP 423); live AV busy returns 503.
<!-- UNRESOLVED: exact device-rtsp-port mapping per model not fully specified; base_url host is a placeholder. -->

## Traits
```yaml
traits:
  - queryable  # inferred: info.cgi, sip status, favorites/schedule list, monitor.cgi return state
  - levelable  # inferred: SIP mic_volume / spk_volume settable levels
```

## Actions
```yaml
actions:
  - id: get_session
    label: Create Session ID
    kind: action
    command: "GET /bha-api/getsession.cgi"
    params: []
    notes: "Returns JSON with SESSIONID (valid 10 min) and NOTIFICATION_ENCRYPTION_KEY."

  - id: invalidate_session
    label: Invalidate Session ID
    kind: action
    command: "GET /bha-api/getsession.cgi?invalidate={session_id}"
    params:
      - name: session_id
        type: string
        description: "The session-id to invalidate."

  - id: live_video_mjpg
    label: Live Video (MJPEG)
    kind: action
    command: "GET /bha-api/video.cgi"
    params: []
    notes: "Multipart x-mixed-replace MJPEG, up to ~8 fps. HTTPS not supported; use sessionid param for cred-safe streaming."

  - id: live_image
    label: Live Image (JPEG)
    kind: action
    command: "GET /bha-api/image.cgi"
    params: []

  - id: open_door
    label: Open Door / Trigger Relay
    kind: action
    command: "GET /bha-api/open-door.cgi?r={relay}"
    params:
      - name: relay
        type: string
        description: "Relay to trigger, e.g. '1', '2', or '<doorcontrollerID>@<relay>'. Omit to trigger physical relay 1."
    notes: "Requires 'watch always' permission or ring event in past 5 min, else 204."

  - id: light_on
    label: Light On
    kind: action
    command: "GET /bha-api/light-on.cgi"
    params: []

  - id: history_image
    label: History Image Request
    kind: query
    command: "GET /bha-api/history.cgi?index={index}&event={event}"
    params:
      - name: index
        type: integer
        description: "1..50, where 1 is the latest history image."
      - name: event
        type: string
        description: "Optional: 'doorbell' or 'motionsensor'. Default is ring history (DoorBird) / input trigger history (BirdGuard)."

  - id: monitor
    label: Monitor (doorbell/motion state stream)
    kind: query
    command: "GET /bha-api/monitor.cgi?ring={ring}"
    params:
      - name: ring
        type: string
        description: "Event type(s) to monitor, e.g. 'doorbell', 'motionsensor', or 'doorbell,motionsensor'."
    notes: "Continuous multipart stream; up to 8 concurrent streams (else HTTP 509)."

  - id: audio_receive
    label: Live Audio Receive
    kind: action
    command: "GET /bha-api/audio-receive.cgi"
    params: []
    notes: "G.711 mu-law, 8000 Hz."

  - id: audio_transmit
    label: Live Audio Transmit
    kind: action
    command: "POST /bha-api/audio-transmit.cgi"
    params: []
    notes: "G.711 mu-law, 8000 Hz. Only one consumer may transmit at a time. Content-Type: audio/basic."

  - id: info
    label: Device Info
    kind: query
    command: "GET /bha-api/info.cgi"
    params: []
    notes: "Returns JSON: FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS[], DEVICE-TYPE (firmware 000108+)."

  - id: list_favorites
    label: List Favorites
    kind: query
    command: "GET /bha-api/favorites.cgi"
    params: []
    notes: "Requires 'API operator' permission. Firmware 000110+."

  - id: save_favorite
    label: Add or Change Favorite
    kind: action
    command: "POST /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
    params:
      - name: type
        type: string
        description: "'sip' or 'http'. Cannot switch type of existing favorite."
      - name: title
        type: string
        description: "Name/title of the favorite."
      - name: value
        type: string
        description: "URL/SIP target including protocol and credentials if needed."
      - name: id
        type: integer
        description: "Optional: favorite ID to change. Omit to add new."

  - id: remove_favorite
    label: Delete Favorite
    kind: action
    command: "POST /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
    params:
      - name: type
        type: string
        description: "'sip' or 'http'."
      - name: id
        type: integer
        description: "ID of the favorite to delete."

  - id: list_schedules
    label: List Schedules
    kind: query
    command: "GET /bha-api/schedule.cgi"
    params: []
    notes: "Requires 'API operator' permission. Firmware 000110+."

  - id: save_schedule
    label: Add or Update Schedule Entry
    kind: action
    command: "POST /bha-api/schedule.cgi"
    params:
      - name: body
        type: object
        description: "JSON: {input: doorbell|motion|rfid|fingerprint, param: <id>, output: [{event, param, schedule}]}."
    notes: "One request per input type. Schedule types: once, from-to, weekdays (seconds since Sun 00:00, multiples of 1800)."

  - id: remove_schedule
    label: Delete Schedule Entry
    kind: action
    command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
    params:
      - name: input
        type: string
        description: "'doorbell', 'motion', or 'rfid'."
      - name: param
        type: string
        description: "ID, e.g. doorbell number or RFID transponder id."

  - id: restart
    label: Restart Device
    kind: action
    command: "GET /bha-api/restart.cgi"
    params: []
    notes: "Returns 503 if device busy (e.g. firmware update). No diagnostic sound after restart."

  - id: rtsp_video_default
    label: RTSP Live Video (default)
    kind: action
    command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/media.amp"
    params: []
    notes: "H.264, up to ~12 fps. RTSP port 554; RTSP-over-HTTP port 8557. Standard RTSP auth."

  - id: rtsp_video_720p
    label: RTSP Live Video (720p)
    kind: action
    command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/720p/media.amp"
    params: []
    notes: "Supported by D10x/D21x from firmware 129."

  - id: rtsp_video_1080p
    label: RTSP Live Video (1080p)
    kind: action
    command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/1080p/media.amp"
    params: []
    notes: "Supported by D11x only."

  - id: sip_registration
    label: SIP Registration
    kind: action
    command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
    params:
      - name: user
        type: string
        description: "Authentication user for SIP Proxy."
      - name: password
        type: string
        description: "Authentication password for SIP Proxy."
      - name: url
        type: string
        description: "IP/Hostname of the SIP Proxy."
    notes: "Requires 'API operator' permission. Not needed for P2P calls."

  - id: sip_makecall
    label: SIP Make Call
    kind: action
    command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
    params:
      - name: url
        type: string
        description: "SIP URL to call, e.g. sip:108@192.168.123.22."
    notes: "Auto-hangup 180s after initiation. Min 3s between SIP requests."

  - id: sip_hangup
    label: SIP Hangup
    kind: action
    command: "GET /bha-api/sip.cgi?action=hangup"
    params: []

  - id: sip_settings
    label: SIP Settings
    kind: action
    command: "GET /bha-api/sip.cgi?action=settings"
    params:
      - name: enable
        type: integer
        description: "0..1. Enable/disable SIP registration after reboot. Default 0."
      - name: mic_volume
        type: integer
        description: "1..100. Microphone volume. Default 33."
      - name: spk_volume
        type: integer
        description: "1..100. Speaker volume. Default 70."
      - name: dtmf
        type: integer
        description: "0..1. DTMF support. Default 0."
      - name: autocall_doorbell_url
        type: string
        description: "DEPRECATED (use schedule.cgi). SIP URL to auto-call on doorbell, or 'none'."
      - name: relay1_passcode
        type: integer
        description: "0..99999999. Pincode for triggering door open relay via DTMF."
      - name: incoming_call_enable
        type: integer
        description: "0..1. Enable/disable incoming calls. Default 0."
      - name: incoming_call_user
        type: string
        description: "Allowed authenticated SIP user, e.g. sip:10.0.0.1:5060."
      - name: anc
        type: integer
        description: "0..1. Acoustic noise cancellation. Default 1."
      - name: ring_time_limit
        type: integer
        description: "10..300 seconds. Default 300."
      - name: call_time_limit
        type: integer
        description: "30..300 seconds. Default 300."
    notes: "Requires 'API operator' permission."

  - id: sip_status
    label: SIP Status
    kind: query
    command: "GET /bha-api/sip.cgi?action=status"
    params: []
    notes: "Returns JSON LASTERRORCODE / LASTERRORTEXT."

  - id: sip_reset
    label: SIP Settings Reset
    kind: action
    command: "GET /bha-api/sip.cgi?action=reset"
    params: []
    notes: "Resets all SIP settings except license; hangs up any ongoing call."
```

## Feedbacks
```yaml
feedbacks:
  - id: doorbell_state
    type: enum
    values: ["H", "L"]
    description: "Doorbell high/low state from monitor.cgi stream."

  - id: motionsensor_state
    type: enum
    values: ["H", "L"]
    description: "Motion sensor high/low state from monitor.cgi stream."

  - id: sip_status
    type: object
    description: "SIP LASTERRORCODE (200 = registered) and LASTERRORTEXT from sip.cgi?action=status."

  - id: session_info
    type: object
    description: "JSON from getsession.cgi: RETURNCODE, SESSIONID, NOTIFICATION_ENCRYPTION_KEY."

  - id: device_info
    type: object
    description: "JSON from info.cgi: FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS[], DEVICE-TYPE."
```

## Variables
```yaml
variables:
  - id: sip_mic_volume
    type: integer
    range: [1, 100]
    description: "SIP microphone volume. Default 33. Set via sip.cgi?action=settings&mic_volume."
  - id: sip_spk_volume
    type: integer
    range: [1, 100]
    description: "SIP speaker volume. Default 70. Set via sip.cgi?action=settings&spk_volume."
  - id: sip_enable
    type: integer
    range: [0, 1]
    description: "Enable/disable SIP registration after reboot. Default 0."
  - id: sip_dtmf
    type: integer
    range: [0, 1]
    description: "DTMF support. Default 0."
  - id: sip_relay1_passcode
    type: integer
    range: [0, 99999999]
    description: "Pincode for door open relay via DTMF."
  - id: sip_incoming_call_enable
    type: integer
    range: [0, 1]
    description: "Enable/disable incoming calls. Default 0."
  - id: sip_incoming_call_user
    type: string
    description: "Allowed authenticated SIP user."
  - id: sip_anc
    type: integer
    range: [0, 1]
    description: "Acoustic noise cancellation. Default 1."
  - id: sip_ring_time_limit
    type: integer
    range: [10, 300]
    description: "Max ringing time seconds. Default 300."
  - id: sip_call_time_limit
    type: integer
    range: [30, 300]
    description: "Max call duration seconds. Default 300."
# UNRESOLVED: non-SIP settable variables (relay timing, video resolution/compression) not exposed via this API in source.
```

## Events
```yaml
events:
  - id: udp_event_broadcast
    type: udp_broadcast
    description: "Encrypted event broadcast on UDP ports 6524 and 35344. ChaCha20-Poly1305 (v2). Payload after decrypt: INTERCOM_ID (6 chars), EVENT (doorbell number or 'motion', 8 chars space-padded), TIMESTAMP (unix long)."
    notes: "IDENT bytes 0xDE 0xAD 0xBE, VERSION 0x02. Key from getsession.cgi NOTIFICATION_ENCRYPTION_KEY (first 32 bytes)."
  - id: udp_keepalive
    type: udp_broadcast
    description: "Keep-alive broadcast every 7 seconds on ports 6524/35344. Not relevant for event decryption; can be skipped."
# UNRESOLVED: rfid/keypad event broadcast mentioned as 'coming soon' in source.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented as named macros in source.
```

## Safety
```yaml
confirmation_required_for:
  - open_door  # door relay - physical access control
  - restart    # device availability impact
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures. Door-relay triggering is safety-relevant (physical access) but no documented confirmation/interlock sequence.
```

## Notes
- Rate limits: max 1 concurrent HTTP API connection/second; brute-force lockout 1 min (HTTP 423); live AV busy → 503; monitor streams max 8 (509 if exceeded).
- SIP auto-hangup 180s after call initiation; only one simultaneous SIP call; min 3s between SIP requests.
- Audio codec fixed G.711 mu-law 8000 Hz; client MUST implement own AEC/ANR.
- HTTPS streaming (video/audio) not available in LAN for third parties; use temporary sessionid param instead.
- DoorBird App has stream precedence and can interrupt LAN API connections anytime.
- UDP event v1 (Argon2i, 0x01) deprecated since Nov 2023; v2 (ChaCha20-Poly1305, 0x02) is current.
<!-- UNRESOLVED: voltage/power specs, exact device-rtsp-port, A1103T-specific firmware floor, rfid/keypad event support. -->
````

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-14T07:19:20.073Z
last_checked_at: 2026-07-21T21:59:56.226Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:59:56.226Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions match literal CGI endpoints in source; parameters align perfectly; transport (HTTP/HTTPS/UDP/RTSP, ports, Basic/Digest auth) all verified; source coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility for this specific model not stated; source gives feature gates by firmware (000099, 000108, 000110, 129). Voltage/power specs not in source."
- "exact device-rtsp-port mapping per model not fully specified; base_url host is a placeholder."
- "non-SIP settable variables (relay timing, video resolution/compression) not exposed via this API in source."
- "rfid/keypad event broadcast mentioned as 'coming soon' in source."
- "no explicit multi-step sequences documented as named macros in source."
- "source contains no explicit safety warnings or interlock procedures. Door-relay triggering is safety-relevant (physical access) but no documented confirmation/interlock sequence."
- "voltage/power specs, exact device-rtsp-port, A1103T-specific firmware floor, rfid/keypad event support."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
