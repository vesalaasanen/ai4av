---
spec_id: admin/doorbird-a1131-ip-video-mini-dome-camera
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird A1131 IP Video Mini Dome Camera Control Spec"
manufacturer: DoorBird
model_family: "DoorBird A1131 IP Video Mini Dome Camera"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "DoorBird A1131 IP Video Mini Dome Camera"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-15T06:15:17.280Z
last_checked_at: 2026-07-21T21:59:59.055Z
generated_at: 2026-07-21T21:59:59.055Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The provided source contains NO RS-232 / serial control content whatsoever, despite \"RS-232C\" being recorded as the expected protocol for this device. The A1131 is an IP Video Mini Dome Camera that would typically expose PTZ control over RS-232/RS-485 (e.g. Pelco-D/P, Visca); none of that is present in this source. This spec therefore documents only the HTTP API that IS in the source. Serial/PTZ control is entirely UNRESOLVED and likely requires a different source document."
  - "Source is the generic DoorBird LAN API, not an A1131-specific manual. Applicability of all endpoints to the A1131 mini dome camera specifically is unverified."
  - "no explicit multi-step sequences documented in source."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "RS-232 serial control entirely absent from source — primary gap."
  - "A1131-specific PTZ commands (pan/tilt/zoom/focus/preset) not present in source."
  - "firmware version compatibility for the A1131 not stated."
  - "exact relay count / I/O of the A1131 not stated (source examples reference D101/D21x)."
verification:
  verdict: verified
  checked_at: 2026-07-21T21:59:59.055Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions have literal matches in the source with verified transport parameters (HTTP 80/443, Basic/Digest auth, RTSP 554/8557, UDP 6524/35344). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-15
---

# DoorBird A1131 IP Video Mini Dome Camera Control Spec

## Summary
DoorBird A1131 IP Video Mini Dome Camera. The supplied source document is the DoorBird "LAN-2-LAN API" reference, which describes an HTTP/HTTPS CGI interface (TCP port 80 / 443) for live video/image retrieval, door & light relay control, history, monitoring, favorites/schedules, SIP telephony, RTSP streaming, and UDP event broadcasts. The interface uses HTTP Basic or Digest authentication (RFC 2617).

<!-- UNRESOLVED: The provided source contains NO RS-232 / serial control content whatsoever, despite "RS-232C" being recorded as the expected protocol for this device. The A1131 is an IP Video Mini Dome Camera that would typically expose PTZ control over RS-232/RS-485 (e.g. Pelco-D/P, Visca); none of that is present in this source. This spec therefore documents only the HTTP API that IS in the source. Serial/PTZ control is entirely UNRESOLVED and likely requires a different source document. -->
<!-- UNRESOLVED: Source is the generic DoorBird LAN API, not an A1131-specific manual. Applicability of all endpoints to the A1131 mini dome camera specifically is unverified. -->

## Transport
```yaml
protocols:
  - http
  - udp
# http = primary control interface (CGI endpoints).
# udp = unsolicited event-monitoring broadcasts (see Events).
# NOTE: source also documents RTSP (tcp 554 / 8557) and SIP (udp/tcp 5060) for
# media streaming and telephony; these carry command-bearing endpoints too and
# are represented as actions below, but the core control transport is HTTP.
addressing:
  base_url: "http://<device-ip>/bha-api/"
  port: 80  # HTTP; HTTPS on 443 also supported (self-signed cert in LAN)
auth:
  type: http_basic  # source states Basic or Digest authentication per RFC 2617; plaintext http-user/http-password params also accepted
```

## Traits
```yaml
# inferred from source evidence:
traits:
  - queryable   # inferred: info.cgi, sip status, favorites/schedule list, monitor state queries present
  - levelable   # inferred: SIP settings expose mic_volume (1..100) and spk_volume (1..100)
```

## Actions
```yaml
# All endpoints use HTTP Basic/Digest auth. <device-ip> is a runtime placeholder
# for the device's LAN IP address. Paths are verbatim from source.

# --- Session management ---
- id: session_get
  label: Get Session ID
  kind: query
  command: "GET /bha-api/getsession.cgi"
  params: []
  notes: "Returns JSON with SESSIONID (valid 10 min) and NOTIFICATION_ENCRYPTION_KEY. Required permission: valid user."

- id: session_invalidate
  label: Invalidate Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate={session_id}"
  params:
    - name: session_id
      type: string
      description: The session-id to destroy.
  notes: "Returns JSON with empty SESSIONID on success."

# --- Live media (HTTP) ---
- id: live_video_stream
  label: Live Video Request (MJPEG)
  kind: query
  command: "GET /bha-api/video.cgi"
  params: []
  notes: "Multipart JPEG stream (multipart/x-mixed-replace). Up to 8 fps. Requires valid user + watch-always or ring event in past 5 min. 204 if no permission."

- id: live_image
  label: Live Image Request (JPEG)
  kind: query
  command: "GET /bha-api/image.cgi"
  params: []
  notes: "Single JPEG (image/jpeg). Requires valid user + watch-always or ring event in past 1 min. 204 if no permission."

- id: history_image
  label: History Image Request
  kind: query
  command: "GET /bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: "Index of history image, 1..50 (1 = latest)."
    - name: event
      type: string
      description: "Event type: doorbell | motionsensor (optional)."
      required: false
  notes: "JPEG history image stored in cloud. Requires history (or motion) permission. 204 if no permission."

# --- Relay control ---
- id: open_door
  label: Open Door (Relay Trigger)
  kind: action
  command: "GET /bha-api/open-door.cgi?r={relay}"
  params:
    - name: relay
      type: string
      description: "Relay to trigger: 1, 2, or <doorcontrollerID>@<relay>. Omit to trigger physical relay 1."
      required: false
  notes: "Energizes door opener / alarm output relay. Returns JSON. Requires watch-always or ring event in past 5 min. 204 if no permission."

- id: light_on
  label: Light On
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []
  notes: "Energizes light relay. Returns JSON. Requires watch-always or ring event in past 5 min. 204 if no permission."

# --- Monitoring ---
- id: monitor_stream
  label: Monitor Request
  kind: query
  command: "GET /bha-api/monitor.cgi?ring={ring}"
  params:
    - name: ring
      type: string
      description: "Comma-separated event types to monitor: doorbell, motionsensor."
  notes: "Continuous multipart stream of motionsensor/doorbell state (H=high, L=low). Up to 8 concurrent streams; 509 if all busy. Valid user. Status: 200/400/401."

# --- Audio ---
- id: audio_receive_stream
  label: Live Audio Receive
  kind: query
  command: "GET /bha-api/audio-receive.cgi"
  params: []
  notes: "Real-time G.711 µ-law audio (8000 Hz). Requires watch-always or ring event in past 5 min. 204 if no permission."

- id: audio_transmit
  label: Live Audio Transmit
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params:
    - name: audio_data
      type: binary
      description: "G.711 µ-law audio stream, Content-Type: audio/basic. Only one consumer may transmit at a time."
  notes: "POST G.711 µ-law (8000 Hz). HTTP/1.0, Content-Type: audio/basic, Content-Length: 9999999, Connection: Keep-Alive. Second consumer rejected. Requires watch-always or ring event in past 5 min."

# --- Device info ---
- id: info_query
  label: Info Request
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []
  notes: "JSON version info (FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS, DEVICE-TYPE). Relays config included from firmware 000108. Valid user."

# --- Favorites management ---
- id: favorites_list
  label: List Favorites
  kind: query
  command: "GET /bha-api/favorites.cgi"
  params: []
  notes: "JSON of all configured favorites (sip/http). Requires API-Operator permission. Firmware 000110+."

- id: favorite_save
  label: Add or Change Favorite
  kind: action
  command: "POST /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: type
      type: string
      description: "sip | http. Cannot switch type of existing favorite."
    - name: title
      type: string
      description: "Name / short description."
    - name: value
      type: string
      description: "URL/address (HTTP(S) URL or SIP target)."
    - name: id
      type: integer
      description: "ID of favorite to change; omit to create new."
      required: false
  notes: "New favorite ID returned in response header 'favoriteid'. Status: 200/400/401/500/507."

- id: favorite_remove
  label: Delete Favorite
  kind: action
  command: "POST /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: type
      type: string
      description: "sip | http."
    - name: id
      type: integer
      description: "ID of the favorite to delete."
  notes: "Active schedule entries using this favorite are also removed. Status: 200/400/401/500."

# --- Schedule management ---
- id: schedule_list
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []
  notes: "JSON of all schedule entries. Requires API-Operator permission. Firmware 000110+. Status: 200/204/401."

- id: schedule_save
  label: Add or Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params:
    - name: body
      type: json
      description: "Schedule JSON object: input (doorbell|motion|rfid|fingerprint), param, output[] (event: notify|sip|relay|http, schedule: once|from-to|weekdays)."
  notes: "One request per input type. Status: 200/400/401/500/507."

- id: schedule_remove
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: input
      type: string
      description: "doorbell | motion | rfid."
    - name: param
      type: string
      description: "ID (e.g. doorbell number, RFID transponder id)."
  notes: "Status: 200/401/500."

# --- System ---
- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []
  notes: "Restarts device; no diagnostic sound afterward. Status: 200/401/503 (busy)."

# --- SIP telephony ---
- id: sip_registration
  label: SIP Register to Proxy
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
      description: "Auth user for SIP proxy."
    - name: password
      type: string
      description: "Auth password for SIP proxy."
    - name: url
      type: string
      description: "IP/hostname of SIP proxy."
  notes: "Not needed for P2P calls. Status: 200/401. Requires API-Operator permission."

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: "SIP URL to call (e.g. sip:108@192.168.123.22)."
  notes: "P2P or proxy call. Status: 200/400/401/503. Min 3s between SIP requests. Requires API-Operator."

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params: []
  notes: "Hangs up current SIP call. 200 even if no call active. Status: 200/401."

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&{param}={value}"
  params:
    - name: param
      type: string
      description: "One of: enable(0..1), mic_volume(1..100), spk_volume(1..100), dtmf(0..1), autocall_doorbell_url(deprecated), relay1_passcode(0..99999999), incoming_call_enable(0..1), incoming_call_user, anc(0..1), ring_time_limit(10..300), call_time_limit(30..300)."
    - name: value
      type: string
      description: "Value for the chosen parameter."
  notes: "autocall_doorbell_url is DEPRECATED (use schedule.cgi). Status: 200/401. Requires API-Operator."

- id: sip_status_query
  label: SIP Status Query
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  params: []
  notes: "JSON: LASTERRORCODE (200 = registered), LASTERRORTEXT. Status: 200/401."

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  params: []
  notes: "Resets all SIP settings except license; hangs up ongoing call. Status: 200/401."

# --- RTSP video streaming ---
- id: rtsp_video_stream
  label: RTSP Live Video Request
  kind: query
  command: "rtsp://<device-ip>:{port}{path}"
  params:
    - name: port
      type: integer
      description: "RTSP port 554, or 8557 for RTSP-over-HTTP."
    - name: path
      type: string
      description: "Stream path: /mpeg/media.amp | /mpeg/720p/media.amp | /mpeg/1080p/media.amp."
  notes: "H.264 MPEG4 stream, up to 12 fps. RTSP auth required (no param auth). 720p path on D10x/D21x fw 129+; 1080p on D11x only. Requires watch-always or ring event past 5 min. 204 if no permission."
```

## Feedbacks
```yaml
- id: doorbell_state
  type: enum
  values: [H, L]
  source: "monitor.cgi multipart stream: doorbell:H / doorbell:L"

- id: motionsensor_state
  type: enum
  values: [H, L]
  source: "monitor.cgi multipart stream: motionsensor:H / motionsensor:L"

- id: device_info
  type: object
  source: "info.cgi JSON: RETURNCODE, FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS[], DEVICE-TYPE"

- id: sip_status
  type: object
  source: "sip.cgi?action=status JSON: LASTERRORCODE (200=registered), LASTERRORTEXT"
```

## Variables
```yaml
# Settable SIP parameters (via sip.cgi?action=settings&<param>=<value>)
- id: sip_enable
  type: integer
  range: "0..1"
  default: 0
  description: "Enable/disable SIP registration after reboot."

- id: mic_volume
  type: integer
  range: "1..100"
  default: 33
  description: "Microphone volume."

- id: spk_volume
  type: integer
  range: "1..100"
  default: 70
  description: "Speaker volume."

- id: dtmf
  type: integer
  range: "0..1"
  default: 0
  description: "Enable/disable DTMF support."

- id: relay1_passcode
  type: integer
  range: "0..99999999"
  description: "Pincode for triggering door open relay via DTMF."

- id: incoming_call_enable
  type: integer
  range: "0..1"
  default: 0
  description: "Enable/disable incoming calls."

- id: incoming_call_user
  type: string
  description: "Allowed authenticated SIP user (e.g. sip:10.0.0.1:5060)."

- id: anc
  type: integer
  range: "0..1"
  default: 1
  description: "Enable/disable acoustic noise cancellation."

- id: ring_time_limit
  type: integer
  range: "10..300"
  default: 300
  description: "Maximum ringing time in seconds."

- id: call_time_limit
  type: integer
  range: "30..300"
  default: 300
  description: "Maximum call duration in seconds."
```

## Events
```yaml
# Unsolicited UDP broadcasts. Device sends identical encrypted UDP broadcasts on
# ports 6524 and 35344 for every user/connected device after an event.
- id: event_broadcast_udp
  transport: udp
  ports: [6524, 35344]
  encryption: "ChaCha20-Poly1305 (version 0x02); key from getsession.cgi NOTIFICATION_ENCRYPTION_KEY (first 32 bytes)"
  packet_format: |
    IDENT (3 bytes): 0xDE 0xAD 0xBE
    VERSION (1 byte): 0x02
    NONCE (8 bytes)
    CIPHERTEXT (34 bytes): encrypted payload
    Decrypted payload:
      INTERCOM_ID (6 chars): first 6 digits of username
      EVENT (8 chars): doorbell number or "motion", space-padded
      TIMESTAMP (4-byte long): Unix timestamp
  notes: "Keep-alive broadcasts every 7s on same ports; ignore for decryption. Version 0x01 (Argon2i) deprecated. v1 disabled by user in app."
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Note: open-door.cgi and light-on.cgi
# energize physical relays but no confirmation/interlock procedure is documented.
# Rate-limit behavior is described (1 concurrent conn/sec; IP blocked 1 min after
# repeated bad auth → HTTP 423) but this is operational, not a safety interlock.
```

## Notes
- **Protocol mismatch (critical):** The refined source is the DoorBird "LAN-2-LAN API" (HTTP/HTTPS CGI + RTSP + SIP + UDP). It contains **no RS-232 / serial control content**. RS-232C was recorded as the expected protocol for the A1131 mini dome camera, but no serial command set, baud rate, connector pinout, or PTZ protocol (Visca/Pelco) appears anywhere in this source. A different source document (the A1131 hardware/installation manual) is required to cover serial/PTZ control.
- **Device-family mismatch (unverified):** The source is generic DoorBird LAN API (geared toward DoorBird door stations / BirdGuard). Whether the A1131 "IP Video Mini Dome Camera" exposes the door/light relay, SIP, and doorbell endpoints is unverified — many endpoints assume a door-station form factor. Applicability per-endpoint is UNRESOLVED.
- Rate limit: max 1 concurrent API connection per second. Repeated wrong credentials → IP/user blocked for 1 minute (HTTP 423).
- DoorBird App takes precedence over LAN-API streams (video/audio/RTSP may be interrupted at any time).
- Audio codec is fixed: G.711 µ-law @ 8000 Hz. Client must implement its own AEC/ANR.
- HTTPS uses a self-signed cert in LAN; video/audio streaming not available over HTTPS (use session-id param instead).

<!-- UNRESOLVED: RS-232 serial control entirely absent from source — primary gap. -->
<!-- UNRESOLVED: A1131-specific PTZ commands (pan/tilt/zoom/focus/preset) not present in source. -->
<!-- UNRESOLVED: firmware version compatibility for the A1131 not stated. -->
<!-- UNRESOLVED: exact relay count / I/O of the A1131 not stated (source examples reference D101/D21x). -->
```

---

Spec output. Critical flag: refined doc = DoorBird HTTP LAN API, **zero serial content**. "Known protocol: RS-232C" unsupported by source — marked UNRESOLVED throughout. Need A1131-specific hardware manual for RS-232/PTZ. HTTP API fully enumerated anyway (24 actions + RTSP + UDP events).

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-15T06:15:17.280Z
last_checked_at: 2026-07-21T21:59:59.055Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:59:59.055Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions have literal matches in the source with verified transport parameters (HTTP 80/443, Basic/Digest auth, RTSP 554/8557, UDP 6524/35344). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The provided source contains NO RS-232 / serial control content whatsoever, despite \"RS-232C\" being recorded as the expected protocol for this device. The A1131 is an IP Video Mini Dome Camera that would typically expose PTZ control over RS-232/RS-485 (e.g. Pelco-D/P, Visca); none of that is present in this source. This spec therefore documents only the HTTP API that IS in the source. Serial/PTZ control is entirely UNRESOLVED and likely requires a different source document."
- "Source is the generic DoorBird LAN API, not an A1131-specific manual. Applicability of all endpoints to the A1131 mini dome camera specifically is unverified."
- "no explicit multi-step sequences documented in source."
- "source contains no explicit safety warnings, interlock procedures,"
- "RS-232 serial control entirely absent from source — primary gap."
- "A1131-specific PTZ commands (pan/tilt/zoom/focus/preset) not present in source."
- "firmware version compatibility for the A1131 not stated."
- "exact relay count / I/O of the A1131 not stated (source examples reference D101/D21x)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
