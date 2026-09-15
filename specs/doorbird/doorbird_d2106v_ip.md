---
spec_id: admin/doorbird-d2106v
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird D2106V Control Spec"
manufacturer: DoorBird
model_family: D2106V
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - D2106V
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-05-12T20:20:34.467Z
last_checked_at: 2026-09-04T22:16:39.429Z
generated_at: 2026-09-04T22:16:39.429Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "document is the generic DoorBird/BirdGuard LAN API, not D2106V-specific; D2106V-specific capabilities (relay count, camera resolutions) not enumerated in source"
  - "default not stated in source"
  - "no explicit multi-step sequences described in source"
  - "source contains no explicit safety warnings or interlock procedures."
  - "firmware version compatibility for the D2106V not stated (only per-feature floors above)"
  - "HTTP method (GET vs POST) not explicitly stated for favorites save/remove, open-door, light-on, history, monitor, restart, and SIP actions other than audio-transmit (POST) and schedule add/update (POST)"
  - "relay ratings (voltage/current), relay count on D2106V, and D2106V camera resolutions not stated in source"
  - "default value of sip_relay1_passcode not stated in source"
verification:
  verdict: verified
  checked_at: 2026-09-04T22:16:39.429Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions map one-to-one to source CGI endpoints / RTSP URIs; transport values (HTTP 80, basic auth) verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# DoorBird D2106V Control Spec

## Summary
DoorBird D2106V is a video door station controlled over the LAN via DoorBird's third-party "LAN-2-LAN API": an HTTP/HTTPS CGI interface under `/bha-api/`, an RTSP video interface, a SIP telephony interface, and encrypted UDP broadcast event notifications. This spec covers all documented CGI endpoints, RTSP stream URIs, SIP actions, and the UDP event monitoring protocol (v2).

<!-- UNRESOLVED: document is the generic DoorBird/BirdGuard LAN API, not D2106V-specific; D2106V-specific capabilities (relay count, camera resolutions) not enumerated in source -->

## Transport
```yaml
protocols:
  - http
  - tcp  # RTSP video (port 554) and RTSP-over-HTTP (port 8557)
  - udp  # encrypted event broadcasts (ports 6524 and 35344)
addressing:
  base_url: "http://<device-ip>/bha-api/"
  port: 80  # HTTP (unencrypted); HTTPS on TCP port 443 with pre-installed self-signed certificate
  # Additional stated ports: RTSP 554 (TCP), RTSP-over-HTTP 8557 (TCP),
  # SIP 5060 (TCP/UDP, for P2P SIP receive), UDP event broadcast 6524 and 35344
auth:
  type: basic  # Basic or Digest per RFC 2617, stated in source; plaintext "http-user"/"http-password" URL parameters also supported (insecure)
```

## Traits
```yaml
# Traits supported by source evidence:
- queryable  # inferred from query endpoints (info.cgi, sip.cgi?action=status, monitor.cgi, favorites.cgi, schedule.cgi)
- levelable  # inferred from SIP mic_volume / spk_volume settings (sip.cgi?action=settings, 1..100)
# Not claimed: powerable (restart.cgi restarts the device but no power on/off commands exist in source);
# routable (no input/output routing commands in source)
```

## Actions
```yaml
- id: get_session
  label: Create Session ID
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
      description: Session ID to invalidate

- id: live_video_mjpeg
  label: Live Video Request (MJPEG)
  kind: action
  command: "/bha-api/video.cgi"
  params: []

- id: live_image
  label: Live Image Request
  kind: action
  command: "/bha-api/image.cgi"
  params: []

- id: open_door
  label: Open Door (Energize Door Opener Relay)
  kind: action
  command: "/bha-api/open-door.cgi?r={relay}"
  params:
    - name: relay
      type: string
      description: "Optional. Relay to trigger: physical relay number ('1', '2') or '<doorcontrollerID>@<relay>' for a paired IP I/O DoorController relay. If omitted, physical relay 1 is triggered. Paired devices are listed by info.cgi."
      required: false

- id: light_on
  label: Light On (Energize Light Relay)
  kind: action
  command: "/bha-api/light-on.cgi"
  params: []

- id: history_image
  label: History Image Request
  kind: action
  command: "/bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: "Index of the history image, 1..50, where 1 is the latest"
    - name: event
      type: enum
      description: "Optional event type: doorbell | motionsensor. Default is ring history for DoorBird devices"
      required: false

- id: monitor
  label: Monitor Request (Doorbell/Motion State Stream)
  kind: action
  command: "/bha-api/monitor.cgi?ring={ring}"
  params:
    - name: ring
      type: enum
      description: "Event type(s) to monitor: doorbell | motionsensor (comma-separated for multiple, e.g. 'doorbell,motionsensor'). rfid and keypad coming soon per source. Max 8 concurrent streams; HTTP 509 when all busy."

- id: audio_receive
  label: Live Audio Receive
  kind: action
  command: "/bha-api/audio-receive.cgi"
  params: []

- id: audio_transmit
  label: Live Audio Transmit
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params:
    - name: audio_data
      type: binary
      description: "G.711 µ-law audio (8000 Hz), Content-Type audio/basic, HTTP/1.0. Only one consumer may transmit at a time."

- id: info_query
  label: Info Request (Version/Relay Info)
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []

- id: list_favorites
  label: List Favorites
  kind: query
  command: "/bha-api/favorites.cgi"
  params: []

- id: save_favorite
  label: Add or Change Favorite
  kind: action
  command: "/bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: type
      type: enum
      description: "sip | http (cannot be switched when saving an existing favorite)"
    - name: title
      type: string
      description: Name or short description of the favorite
    - name: value
      type: string
      description: "URL of the favorite including protocol and credentials if necessary (HTTP(S) URL or SIP target)"
    - name: id
      type: integer
      description: "Optional ID of the favorite to change; omit when saving a new favorite. New favorite's ID returned in response header 'favoriteid'."
      required: false

- id: remove_favorite
  label: Delete Favorite
  kind: action
  command: "/bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: type
      type: enum
      description: "sip | http"
    - name: id
      type: integer
      description: ID of the favorite to delete

- id: list_schedules
  label: List Schedules
  kind: query
  command: "/bha-api/schedule.cgi"
  params: []

- id: save_schedule
  label: Add or Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params:
    - name: config
      type: json
      description: 'Schedule JSON object: { "input": "doorbell|motion|rfid|fingerprint", "param": "<doorbell-number>|<transponder-id>|<fingerprint-id>", "output": [ { "event": "notify|sip|relay|http", "param": "<favorite-id>|<relay-number>", "enabled": "1", "schedule": { "once"|"from-to"|"weekdays": [...] } } ] }. Weekday times are seconds since Sunday 00:00, multiples of 1800, max 604799. One request per input type.'

- id: remove_schedule
  label: Delete Schedule Entry
  kind: action
  command: "/bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: input
      type: enum
      description: "doorbell | motion | rfid"
    - name: param
      type: string
      description: "ID of the schedule entry to delete, e.g. doorbell number or RFID transponder id"

- id: restart
  label: Restart Device
  kind: action
  command: "/bha-api/restart.cgi"
  params: []

- id: sip_registration
  label: SIP Registration
  kind: action
  command: "/bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
      description: Authentication user for the SIP proxy
    - name: password
      type: string
      description: Authentication password for the SIP proxy
    - name: url
      type: string
      description: IP/hostname of the SIP proxy

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "/bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: SIP URL to call (e.g. sip:108@192.168.123.22)

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "/bha-api/sip.cgi?action=hangup"
  params: []

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "/bha-api/sip.cgi?action=settings&{setting}={value}"
  params:
    - name: setting
      type: enum
      description: 'One setting per request: enable (0..1, default 0, SIP registration after reboot) | mic_volume (1..100, default 33) | spk_volume (1..100, default 70) | dtmf (0..1, default 0) | autocall_doorbell_url (DEPRECATED, use schedule.cgi; URL or "none", default "none") | relay1_passcode (0..99999999, pincode to trigger door open relay) | incoming_call_enable (0..1, default 0) | incoming_call_user (SIP user string) | anc (0..1, default 1) | ring_time_limit (10..300 s, default 300) | call_time_limit (30..300 s, default 300)'
    - name: value
      type: string
      description: Value for the named setting (see ranges above)

- id: sip_status
  label: SIP Status Query
  kind: query
  command: "/bha-api/sip.cgi?action=status"
  params: []

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "/bha-api/sip.cgi?action=reset"
  params: []

- id: rtsp_video_live
  label: RTSP Live Video (Default Resolution)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params: []

- id: rtsp_video_720p
  label: RTSP Live Video (720p)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/720p/media.amp"
  params: []

- id: rtsp_video_1080p
  label: RTSP Live Video (1080p)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/1080p/media.amp"
  params: []
  # Source notes: 720p supported by D10x/D21x from firmware version 129; 1080p supported by D11x only.
  # RTSP-over-HTTP variant on port 8557: rtsp://<device-ip>:8557/mpeg/media.amp
```

## Feedbacks
```yaml
- id: doorbell_state
  type: enum
  values: ["H", "L"]
  # From monitor.cgi multipart stream, e.g. "doorbell:H" / "doorbell:L"

- id: motionsensor_state
  type: enum
  values: ["H", "L"]
  # From monitor.cgi multipart stream, e.g. "motionsensor:H" / "motionsensor:L"

- id: device_info
  type: json
  # info.cgi response: BHA.RETURNCODE, VERSION[].FIRMWARE, BUILD_NUMBER,
  # PRIMARY_MAC_ADDR, RELAYS[] (physical + paired DoorController relays, fw 000108+), DEVICE-TYPE

- id: session_info
  type: json
  # getsession.cgi response: BHA.RETURNCODE, SESSIONID, NOTIFICATION_ENCRYPTION_KEY

- id: sip_status_response
  type: json
  # sip.cgi?action=status response: LASTERRORCODE ("200" = registered), LASTERRORTEXT
```

## Variables
```yaml
# All set via sip.cgi?action=settings - one parameter per request.
- id: sip_enable
  type: integer
  range: "0..1"
  default: 0
- id: sip_mic_volume
  type: integer
  range: "1..100"
  default: 33
- id: sip_spk_volume
  type: integer
  range: "1..100"
  default: 70
- id: sip_dtmf
  type: integer
  range: "0..1"
  default: 0
- id: sip_relay1_passcode
  type: integer
  range: "0..99999999"
  # UNRESOLVED: default not stated in source
- id: sip_incoming_call_enable
  type: integer
  range: "0..1"
  default: 0
- id: sip_incoming_call_user
  type: string
  # e.g. "sip:10.0.0.1:5060" or "sip:user@10.0.0.2:5060"
- id: sip_anc
  type: integer
  range: "0..1"
  default: 1
- id: sip_ring_time_limit
  type: integer
  range: "10..300"
  unit: seconds
  default: 300
- id: sip_call_time_limit
  type: integer
  range: "30..300"
  unit: seconds
  default: 300
- id: sip_autocall_doorbell_url
  type: string
  default: "none"
  # DEPRECATED per source - replaced by schedule.cgi + favorites.cgi
```

## Events
```yaml
- id: udp_event_broadcast_v2
  description: >-
    Encrypted UDP broadcast sent on ports 6524 and 35344 after each doorbell or
    motion event, multiple identical packets per event per user/device. v2
    (since November 2023) uses ChaCha20-Poly1305; v1 (0x01, Argon2i-based) is
    deprecated. Decryption key obtained once via getsession.cgi response field
    NOTIFICATION_ENCRYPTION_KEY (32-64 bytes; first 32 bytes used; valid until
    the user password changes).
  packet_format:
    IDENT: "3 bytes: 0xDE 0xAD 0xBE"
    VERSION: "1 byte: 0x02 (v2 ChaCha20-Poly1305); 0x01 deprecated"
    NONCE: "8 bytes (ChaCha20-Poly1305 nonce)"
    CIPHERTEXT: "34 bytes encrypted; after decryption first 16 bytes are random padding to discard"
  decrypted_format:
    INTERCOM_ID: "6-byte string - first 6 chars of the DoorBird user name; ignore packet if it does not match"
    EVENT: "8-byte string, space-padded - doorbell number or 'motion'"
    TIMESTAMP: "4-byte Unix timestamp (long)"
- id: udp_keep_alive_broadcast
  description: >-
    Keep-alive broadcasts every 7 seconds on ports 6524 and 35344; not event
    data, safe to skip.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures.
# Note: open-door.cgi energizes the door opener relay; DTMF pincode (relay1_passcode)
# can trigger the door relay from the call recipient's telephone keypad - treat as
# access-control-sensitive, but no interlock procedure is stated in source.
```

## Notes
- Rate limits: max 1 concurrent API connection per second; wrong-credentials abuse blocks IP/user for 1 minute (HTTP 423); device busy returns HTTP 503 (single simultaneous A/V call); monitor.cgi max 8 concurrent streams, HTTP 509 when all busy.
- HTTP status codes common across CGI endpoints: 200 OK, 400 parameter missing/invalid, 401 authentication required, 204 correct request but no permission right now (e.g. no "watch always" permission and no ring event within past 1/5 minutes), 500 internal error, 507 size limit exceeded (favorites/schedules).
- Permissions model: "Watch always", "History", "Motion", "API-Operator" (required for favorites.cgi, schedule.cgi, and SIP configuration; recommended only for home-automation server accounts).
- HTTPS: self-signed certificate pre-installed (port 443); clients must accept it. Video/audio streaming over HTTPS not supported in LAN — use getsession.cgi session ID parameter instead (`video.cgi?sessionid=...`, `audio-receive.cgi?sessionid=...`). Session IDs valid 10 minutes.
- RTSP uses standard RTSP authentication; parameter authentication not supported. Official DoorBird App preempts third-party HTTP/RTSP/audio streams at any time.
- Audio: G.711 µ-law at 8000 Hz mandatory; client must implement its own AEC/ANR.
- SIP: auto-hangup 180 s after call initiation (security); only one simultaneous SIP call; wait min 3 s between SIP requests; P2P calls supported from device version 000099 (listens on port 5060 when enabled); device closes SIP calls when the official app requests listen/talk.
- Firmware floors stated in source: relays config in info.cgi output from firmware 000108; favorites.cgi/schedule.cgi require firmware 000110+; 720p RTSP requires D10x/D21x firmware 129+.
- Device discovery via Apple Bonjour (`_http._tcp`).

<!-- UNRESOLVED: firmware version compatibility for the D2106V not stated (only per-feature floors above) -->
<!-- UNRESOLVED: HTTP method (GET vs POST) not explicitly stated for favorites save/remove, open-door, light-on, history, monitor, restart, and SIP actions other than audio-transmit (POST) and schedule add/update (POST) -->
<!-- UNRESOLVED: relay ratings (voltage/current), relay count on D2106V, and D2106V camera resolutions not stated in source -->
<!-- UNRESOLVED: default value of sip_relay1_passcode not stated in source -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-05-12T20:20:34.467Z
last_checked_at: 2026-09-04T22:16:39.429Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-04T22:16:39.429Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions map one-to-one to source CGI endpoints / RTSP URIs; transport values (HTTP 80, basic auth) verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "document is the generic DoorBird/BirdGuard LAN API, not D2106V-specific; D2106V-specific capabilities (relay count, camera resolutions) not enumerated in source"
- "default not stated in source"
- "no explicit multi-step sequences described in source"
- "source contains no explicit safety warnings or interlock procedures."
- "firmware version compatibility for the D2106V not stated (only per-feature floors above)"
- "HTTP method (GET vs POST) not explicitly stated for favorites save/remove, open-door, light-on, history, monitor, restart, and SIP actions other than audio-transmit (POST) and schedule add/update (POST)"
- "relay ratings (voltage/current), relay count on D2106V, and D2106V camera resolutions not stated in source"
- "default value of sip_relay1_passcode not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
