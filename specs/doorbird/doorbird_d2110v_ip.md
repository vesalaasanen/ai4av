---
spec_id: admin/doorbird-d2110v
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird D2110V Control Spec"
manufacturer: DoorBird
model_family: D2110V
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - D2110V
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-09-02T17:08:41.412Z
last_checked_at: 2026-09-04T22:17:01.245Z
generated_at: 2026-09-04T22:17:01.245Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility only partially stated (favorites/schedules need 000110+; RTSP 720p needs 129+ for D10x/D21x); D2110V-specific relay count not stated in source (info.cgi returns RELAYS list at runtime)"
  - "RTSP and SIP are not first-class protocols in this transport schema; see Notes"
  - "HTTP method not stated in source"
  - "no multi-step sequences described explicitly in source"
  - "no safety warnings or interlock procedures in source. Note: open-door action energizes"
  - "relay count for D2110V specifically not stated (query info.cgi at runtime); D2110V never named in source — D21x family referenced (info.cgi example, RTSP 720p support) → treat as covered family member"
verification:
  verdict: verified
  checked_at: 2026-09-04T22:17:01.245Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions match source HTTP endpoints verbatim; transport (HTTP 80/443, UDP 6524/35344, RTSP 554/8557, SIP 5060, Basic/Digest auth) all source-supported. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# DoorBird D2110V Control Spec

## Summary
DoorBird D2110V video door station with a third-party LAN-2-LAN HTTP API (`/bha-api/`) for live video/image retrieval, door relay and light control, history images, audio intercom, favorites/schedules, SIP calls, and encrypted UDP event broadcasts. HTTP on TCP port 80 and HTTPS on TCP port 443; auxiliary RTSP (554/8557) and SIP (5060) interfaces.

<!-- UNRESOLVED: firmware version compatibility only partially stated (favorites/schedules need 000110+; RTSP 720p needs 129+ for D10x/D21x); D2110V-specific relay count not stated in source (info.cgi returns RELAYS list at runtime) -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  base_url: "http://<device-ip>/"  # or https://<device-ip>/ (self-signed cert, TCP 443)
  port: 80  # HTTP; HTTPS on 443. UDP event broadcasts on 6524 and 35344. RTSP on 554, RTSP-over-HTTP on 8557, SIP on 5060.
auth:
  type: basic  # Basic or Digest per RFC 2617 using DoorBird App user credentials; plaintext params httpuser/http-password also supported
# UNRESOLVED: RTSP and SIP are not first-class protocols in this transport schema; see Notes
```

## Traits
```yaml
# - queryable       (info.cgi, sip.cgi?action=status, favorites/schedule list endpoints return state)
# - levelable       (sip.cgi?action=settings exposes mic_volume/spk_volume 1..100)
traits:
  - queryable  # inferred from query endpoints returning state
  - levelable  # inferred from SIP mic/spk volume settings
```

## Actions
```yaml
# HTTP API commands under /bha-api/. All require a valid user; permission notes inline.
# Methods stated in source are shown; favorites save/remove and restart methods not stated in source.
- id: get_session
  label: Get Session ID
  kind: query
  command: "GET /bha-api/getsession.cgi"
  params: []
  notes: "Returns JSON with SESSIONID (valid 10 min) and NOTIFICATION_ENCRYPTION_KEY (32-64 bytes; first 32 used for ChaCha20 UDP event decryption; valid until user password changes)"

- id: invalidate_session
  label: Invalidate Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate={session_id}"
  params:
    - name: session_id
      type: string
      description: Session ID to destroy

- id: live_video_stream
  label: Live Video Stream (MJPEG)
  kind: action
  command: "GET /bha-api/video.cgi"
  params: []
  notes: "Multipart/x-mixed-replace MJPEG, up to 8 fps. Permission: watch-always or ring event in past 5 min, else 204. App stream preempts."

- id: live_image
  label: Live Image (JPEG)
  kind: action
  command: "GET /bha-api/image.cgi"
  params: []
  notes: "Single JPEG. Permission: watch-always or ring event in past 1 min, else 204."

- id: open_door
  label: Open Door / Trigger Relay
  kind: action
  command: "GET /bha-api/open-door.cgi?r={relay}"
  params:
    - name: relay
      type: string
      description: "Relay to trigger: 1, 2, or <doorcontrollerID>@<relay> for paired IP I/O DoorController. Omit to trigger physical relay 1."
  notes: "Energizes door opener/alarm output relay. Returns JSON. Permission: watch-always or ring event in past 5 min, else 204."

- id: light_on
  label: Light On
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []
  notes: "Energizes light relay. Returns JSON. Permission: watch-always or ring event in past 5 min, else 204."

- id: history_image
  label: History Image Request
  kind: query
  command: "GET /bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: "1..50; 1 is the latest history image"
    - name: event
      type: string
      description: "doorbell | motionsensor (optional; default ring history for DoorBird, input trigger history for BirdGuard)"
  notes: "JPEG from cloud history. Permission: history (or motion for motion events), else 204."

- id: monitor_state
  label: Monitor Request (doorbell/motion state stream)
  kind: query
  command: "GET /bha-api/monitor.cgi?ring={event_types}"
  params:
    - name: event_types
      type: string
      description: "Comma-separated: doorbell, motionsensor (rfid and keypad coming soon)"
  notes: "Continuous multipart stream of doorbell:H/L and motionsensor:H/L. Max 8 concurrent streams; 509 when all busy."

- id: audio_receive
  label: Live Audio Receive
  kind: action
  command: "GET /bha-api/audio-receive.cgi"
  params: []
  notes: "Real-time G.711 µ-law 8000 Hz audio stream. Optional sessionid param to avoid plaintext credentials. Permission: watch-always or ring event in past 5 min, else 204."

- id: audio_transmit
  label: Live Audio Transmit
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params:
    - name: audio_data
      type: binary
      description: "G.711 µ-law 8000 Hz audio body, Content-Type audio/basic; only one talk consumer at a time"
  notes: "Client must implement its own AEC/ANR. Permission: watch-always or ring event in past 5 min, else 204."

- id: info_request
  label: Info Request
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []
  notes: "JSON: FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS (physical + paired controllers, fw 000108+), DEVICE-TYPE."

- id: restart_device
  label: Restart Device
  kind: action
  command: "/bha-api/restart.cgi"  # UNRESOLVED: HTTP method not stated in source
  params: []
  notes: "Restarts device; no diagnostic sound afterwards. 503 if busy (e.g. firmware update installing)."

- id: list_favorites
  label: List Favorites
  kind: query
  command: "GET /bha-api/favorites.cgi"
  params: []
  notes: "JSON of sip/http favorites. Requires API-Operator permission; firmware 000110+."

- id: save_favorite
  label: Add or Change Favorite
  kind: action
  command: "/bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"  # UNRESOLVED: HTTP method not stated in source
  params:
    - name: type
      type: string
      description: "sip | http (cannot switch type of existing favorite)"
    - name: title
      type: string
      description: Name or short description
    - name: value
      type: string
      description: "HTTP(S) URL or SIP target, including protocol and credentials if needed"
    - name: id
      type: integer
      description: "Optional: ID of favorite to change; omit for new (new ID returned in favoriteid response header)"
  notes: "Requires API-Operator permission; firmware 000110+. 507 on size limit exceeded."

- id: remove_favorite
  label: Delete Favorite
  kind: action
  command: "/bha-api/favorites.cgi?action=remove&type={type}&id={id}"  # UNRESOLVED: HTTP method not stated in source
  params:
    - name: type
      type: string
      description: "sip | http"
    - name: id
      type: integer
      description: ID of the favorite to delete
  notes: "Removing a favorite used in a schedule removes that schedule entry too."

- id: list_schedules
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []
  notes: "JSON array of input/param/output event rules. Requires API-Operator permission; firmware 000110+."

- id: save_schedule
  label: Add or Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params:
    - name: schedule_json
      type: object
      description: "JSON: input (doorbell|motion|rfid|fingerprint), param, output[] of {event: notify|sip|relay|http, param, schedule: once|from-to|weekdays}"
  notes: "One request per input type. Weekday seconds from Sunday 0:00, 30-min slices (multiples of 1800), max 604799. Requires API-Operator permission; firmware 000110+."

- id: remove_schedule
  label: Delete Schedule Entry
  kind: action
  command: "/bha-api/schedule.cgi?action=remove&input={input}&param={param}"  # UNRESOLVED: HTTP method not stated in source
  params:
    - name: input
      type: string
      description: "doorbell | motion | rfid"
    - name: param
      type: string
      description: "e.g. doorbell number or RFID transponder id"

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
      description: IP/hostname of the SIP Proxy
  notes: "Not needed for peer-2-peer calls. Stored permanently; re-registers on reboot. 401 on auth failure or missing API-Operator permission."

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: SIP URL to call (e.g. sip:108@192.168.123.22)
  notes: "Peer-2-peer or via configured proxy. 400 parameter missing, 503 line busy. Auto-hangup 180 s after initiation."

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params: []
  notes: "Returns 200 even with no ongoing call."

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&{parameter}={value}"
  params:
    - name: enable
      type: integer
      description: "0..1 - enable SIP registration after reboot (default 0)"
    - name: mic_volume
      type: integer
      description: "1..100 (default 33)"
    - name: spk_volume
      type: integer
      description: "1..100 (default 70)"
    - name: dtmf
      type: integer
      description: "0..1 - DTMF support; lets call recipient trigger door relay via pincode (default 0)"
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED - use schedule.cgi. SIP URL to auto-call on doorbell, or 'none' (default none)"
    - name: relay1_passcode
      type: integer
      description: "0..99999999 - pincode for triggering door open relay"
    - name: incoming_call_enable
      type: integer
      description: "0..1 (default 0)"
    - name: incoming_call_user
      type: string
      description: "Allowed SIP user, e.g. sip:10.0.0.1:5060 or sip:user@10.0.0.2:5060"
    - name: anc
      type: integer
      description: "0..1 - acoustic noise cancellation (default 1)"
    - name: ring_time_limit
      type: integer
      description: "10..300 s (default 300)"
    - name: call_time_limit
      type: integer
      description: "30..300 s (default 300)"

- id: sip_status
  label: SIP Status
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  params: []
  notes: "JSON; LASTERRORCODE 200 = registered; LASTERRORTEXT = most recent error text."

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  params: []
  notes: "Resets SIP settings except license; hangs up ongoing call."
```

## Feedbacks
```yaml
- id: doorbell_state
  type: enum
  values: [H, L]
  source: monitor.cgi multipart stream (doorbell:H / doorbell:L)

- id: motionsensor_state
  type: enum
  values: [H, L]
  source: monitor.cgi multipart stream (motionsensor:H / motionsensor:L)

- id: device_info
  type: object
  source: info.cgi - FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS[], DEVICE-TYPE

- id: sip_status
  type: object
  source: sip.cgi?action=status - LASTERRORCODE, LASTERRORTEXT

- id: session_info
  type: object
  source: getsession.cgi - RETURNCODE, SESSIONID, NOTIFICATION_ENCRYPTION_KEY
```

## Variables
```yaml
# Settable via sip.cgi?action=settings (see sip_settings action params for full list)
- id: mic_volume
  type: integer
  range: [1, 100]
  default: 33
- id: spk_volume
  type: integer
  range: [1, 100]
  default: 70
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
- id: udp_event_broadcast
  description: "Encrypted UDP broadcasts on ports 6524 and 35344 for doorbell and motion events, sent for every user and connected device; identical packets repeated. Keep-alive broadcasts every 7 s on same ports should be skipped."
  format:
    ident: "0xDE 0xAD 0xBE"
    version: "0x02 (ChaCha20-Poly1305; 0x01 with Argon2i deprecated, being removed)"
    nonce: "8 bytes"
    ciphertext: "34 bytes; after ChaCha20-Poly1305 decryption contains 16 random bytes + INTERCOM_ID (6-byte string, first 6 chars of username) + EVENT (8-byte string, doorbell number or 'motion', space-padded) + TIMESTAMP (4-byte Unix long)"
  key_source: "NOTIFICATION_ENCRYPTION_KEY from getsession.cgi (first 32 bytes used); valid until user password changes"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source. Note: open-door action energizes
# the door opener relay; source documents no confirmation/interlock requirement.
```

## Notes
- Rate limits: max 1 concurrent API connection per second; wrong-credential abuse blocks IP/user for 1 minute (HTTP 423); only one simultaneous live A/V call — second caller gets 503 Busy.
- Auth: Basic/Digest (RFC 2617) per request with DoorBird App user credentials, or plaintext `httpuser`/`http-password` params (insecure). HTTPS uses a pre-installed self-signed certificate; clients must accept it. Video/audio streaming over HTTPS requires a temporary sessionid (from getsession.cgi) instead of plaintext credentials.
- Permissions model: "Watch always", "History", "Motion", "API-Operator" (favorites.cgi/schedule.cgi/SIP settings require API-Operator; reserve it for home-automation servers, not end-user panels).
- RTSP interface: `rtsp://<device-ip>:554/mpeg/media.amp` (also 720p variant, D10x/D21x firmware 129+; 1080p D11x only), RTSP-over-HTTP on port 8557, standard RTSP auth, up to 12 fps. SIP P2P calls supported from device version 000099; SIP listens on 5060 when enabled; min 3 s between SIP requests; official DoorBird App preempts LAN-API streams and SIP calls.
- Event Monitoring v2 (Nov 2023+): v1 (Argon2i) deprecated, removable by user, will be removed.
- Device discovery via Apple Bonjour (`_http._tcp`).
- Demo page: `http://<device-ip>/bha-api/view.html`.
<!-- UNRESOLVED: relay count for D2110V specifically not stated (query info.cgi at runtime); D2110V never named in source — D21x family referenced (info.cgi example, RTSP 720p support) → treat as covered family member -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-09-02T17:08:41.412Z
last_checked_at: 2026-09-04T22:17:01.245Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-04T22:17:01.245Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions match source HTTP endpoints verbatim; transport (HTTP 80/443, UDP 6524/35344, RTSP 554/8557, SIP 5060, Basic/Digest auth) all source-supported. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility only partially stated (favorites/schedules need 000110+; RTSP 720p needs 129+ for D10x/D21x); D2110V-specific relay count not stated in source (info.cgi returns RELAYS list at runtime)"
- "RTSP and SIP are not first-class protocols in this transport schema; see Notes"
- "HTTP method not stated in source"
- "no multi-step sequences described explicitly in source"
- "no safety warnings or interlock procedures in source. Note: open-door action energizes"
- "relay count for D2110V specifically not stated (query info.cgi at runtime); D2110V never named in source — D21x family referenced (info.cgi example, RTSP 720p support) → treat as covered family member"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
