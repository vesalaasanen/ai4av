---
spec_id: admin/doorbird-d2113v
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2113V Control Spec"
manufacturer: Doorbird
model_family: D2113V
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - D2113V
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-05-13T01:11:49.289Z
last_checked_at: 2026-09-04T22:17:07.461Z
generated_at: 2026-09-04T22:17:07.461Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no relay count, voltage, current, or physical wiring details in source. RTSP H.264 endpoints listed but port/auth only partially specified. SIP signaling port inferred as 5060 from source, see Notes."
  - "source describes schedule.cgi as a multi-step event → action system but does not enumerate"
  - "source mentions rate limit (1 connection/sec, 1 min IP/user block after extensive wrong creds → HTTP 423) and \"auto-hangup\" 180s after SIP call initiation. These are operational constraints, not safety interlocks per se."
  - "no relay count, electrical ratings, mechanical specs, or firmware-specific feature matrix stated for D2113V. RTSP port 554 / RTSP-over-HTTP 8557 are model-general, not D2113V-specific. SIP default signaling port 5060 inferred from source prose; verify against device admin UI."
verification:
  verdict: verified
  checked_at: 2026-09-04T22:17:07.461Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions match the source CGI endpoints verbatim and transport values are supported by the source prose. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Doorbird D2113V Control Spec

## Summary
LAN-2-LAN API for the Doorbird D2113V video door station. Spec covers HTTP CGI endpoints for live video, live image, door/light relays, history, monitor stream, favorites/schedules, info, restart, encrypted UDP event broadcasts, RTSP, and SIP control. Authentication via HTTP Basic/Digest or per-request `http-user`/`http-password` params.

<!-- UNRESOLVED: no relay count, voltage, current, or physical wiring details in source. RTSP H.264 endpoints listed but port/auth only partially specified. SIP signaling port inferred as 5060 from source, see Notes. -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - udp
addressing:
  port: 80
  base_url: "http://<device-ip>/bha-api/"  # HTTP CGI base path; HTTPS also available on TCP 443
auth:
  type: basic  # source: RFC 2617 Basic/Digest, or plaintext http-user/http-password params
```

HTTP interface: TCP 80 (plain) and TCP 443 (HTTPS with self-signed cert).
SIP signaling: UDP 5060 (peer-2-peer incoming), stated in source.
UDP event broadcasts: ports 6524 and 35344, stated in source.
RTSP: TCP 554, RTSP-over-HTTP on TCP 8557, stated in source.

## Traits
```yaml
- powerable  # inferred from restart.cgi
- queryable  # inferred from info.cgi, sip.cgi?action=status
- routable  # inferred from open-door.cgi, light-on.cgi
```

## Actions
```yaml
- id: get_session
  label: Get Session
  kind: query
  command: "GET http://<device-ip>/bha-api/getsession.cgi"
  params: []
  notes: Returns SESSIONID (valid 10 min) and NOTIFICATION_ENCRYPTION_KEY.

- id: invalidate_session
  label: Invalidate Session
  kind: action
  command: "GET http://<device-ip>/bha-api/getsession.cgi?invalidate=<old_session_id>"
  params:
    - name: old_session_id
      type: string
      description: Session ID to invalidate

- id: live_video
  label: Live Video (MJPEG)
  kind: query
  command: "GET http://<device-ip>/bha-api/video.cgi"
  params: []
  notes: multipart/x-mixed-replace MJPEG stream, up to 8 fps.

- id: live_image
  label: Live Image
  kind: query
  command: "GET http://<device-ip>/bha-api/image.cgi"
  params: []
  notes: Single JPEG with default resolution/compression.

- id: open_door
  label: Open Door / Trigger Relay
  kind: action
  command: "GET http://<device-ip>/bha-api/open-door.cgi?r=<doorcontrollerID>@<relay>"
  params:
    - name: relay
      type: string
      description: "Relay spec, e.g. '1' (physical) or 'gggaaa@1' (paired IP I/O DoorController). Omit to trigger physical relay 1."
  notes: Omitting `r` triggers physical relay 1. Returns JSON. May return 204 if no live-view permission.

- id: light_on
  label: Light On
  kind: action
  command: "GET http://<device-ip>/bha-api/light-on.cgi"
  params: []
  notes: Energizes the light relay. Returns JSON. May return 204 if no live-view permission.

- id: history_image
  label: History Image
  kind: query
  command: "GET http://<device-ip>/bha-api/history.cgi?index=<int>&event=<string>"
  params:
    - name: index
      type: integer
      description: 1..50, 1 = latest
    - name: event
      type: string
      description: "doorbell | motionsensor (optional; default = doorbell)"
  notes: Cloud-stored history JPEG. Returns 204 if no history/motion permission.

- id: monitor
  label: Monitor (doorbell/motion stream)
  kind: query
  command: "GET http://<device-ip>/bha-api/monitor.cgi?ring=doorbell[,motionsensor]"
  params:
    - name: ring
      type: string
      description: "Comma-separated event types: doorbell, motionsensor"
  notes: Up to 8 concurrent streams. Returns HTTP 509 if all busy.

- id: live_audio_receive
  label: Live Audio Receive (G.711 μ-law)
  kind: query
  command: "GET http://<device-ip>/bha-api/audio-receive.cgi"
  params: []
  notes: G.711 μ-law, 8000 Hz. Streaming audio. May return 204 if no live-view permission.

- id: live_audio_transmit
  label: Live Audio Transmit (G.711 μ-law)
  kind: action
  command: "POST http://<device-ip>/bha-api/audio-transmit.cgi"
  params: []
  notes: "Content-Type: audio/basic, G.711 μ-law, 8000 Hz, 1 channel. Only one transmit consumer at a time."

- id: info
  label: Device Info
  kind: query
  command: "GET http://<device-ip>/bha-api/info.cgi"
  params: []
  notes: JSON; firmware 000108+ includes RELAYS list. Examples: D101, D21x.

- id: list_favorites
  label: List Favorites
  kind: query
  command: "GET http://<device-ip>/bha-api/favorites.cgi"
  params: []
  notes: Requires API-Operator permission. Firmware 000110+.

- id: add_or_change_favorite
  label: Add or Change Favorite
  kind: action
  command: "GET http://<device-ip>/bha-api/favorites.cgi?action=save&type=<sip|http>&title=<name>&value=<url>&id=<int>"
  params:
    - name: type
      type: string
      description: "sip | http"
    - name: title
      type: string
      description: Name or short description
    - name: value
      type: string
      description: URL of favorite (http(s) or sip)
    - name: id
      type: integer
      description: ID of existing favorite to change (omit to add)
  notes: Response header `favoriteid` contains new ID. Cannot change type on existing favorite.

- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "GET http://<device-ip>/bha-api/favorites.cgi?action=remove&type=<sip|http>&id=<int>"
  params:
    - name: type
      type: string
      description: "sip | http"
    - name: id
      type: integer
      description: ID of favorite to delete
  notes: If favorite is in a schedule, schedule entry is also removed.

- id: list_schedules
  label: List Schedules
  kind: query
  command: "GET http://<device-ip>/bha-api/schedule.cgi"
  params: []
  notes: JSON list of schedule entries. Firmware 000110+.

- id: add_or_update_schedule
  label: Add or Update Schedule
  kind: action
  command: "POST http://<device-ip>/bha-api/schedule.cgi"
  params: []
  notes: "Body: JSON object per input type. One request per input (motion, doorbell #N, etc.)."

- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  command: "GET http://<device-ip>/bha-api/schedule.cgi?action=remove&input=<string>&param=<string>"
  params:
    - name: input
      type: string
      description: "doorbell | motion | rfid"
    - name: param
      type: string
      description: Doorbell number, transponder id, etc.

- id: restart
  label: Restart Device
  kind: action
  command: "GET http://<device-ip>/bha-api/restart.cgi"
  params: []
  notes: Returns 503 if busy (e.g. firmware update in progress).

- id: rtsp_live_video
  label: RTSP Live Video (H.264)
  kind: query
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params: []
  notes: "Up to 12 fps. Resolution variants: /mpeg/720p/media.amp (D10x/D21x, firmware 129+), /mpeg/1080p/media.amp (D11x only). RTSP-over-HTTP on TCP 8557 also supported. Standard RTSP auth (no parameter auth)."

- id: sip_registration
  label: SIP Registration
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=registration&user=<user>&password=<password>&url=<url>"
  params:
    - name: user
      type: string
      description: SIP proxy auth user
    - name: password
      type: string
      description: SIP proxy auth password
    - name: url
      type: string
      description: SIP proxy IP/hostname

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=makecall&url=<sip_url>"
  params:
    - name: url
      type: string
      description: SIP URL to call, e.g. sip:108@192.168.123.22
  notes: Wait min 3 seconds between SIP requests.

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=hangup"
  params: []
  notes: Returns 200 even if no call in progress.

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=settings&<key>=<value>"
  params:
    - name: enable
      type: integer
      description: "0..1; default 0"
    - name: mic_volume
      type: integer
      description: "1..100; default 33"
    - name: spk_volume
      type: integer
      description: "1..100; default 70"
    - name: dtmf
      type: integer
      description: "0..1; default 0"
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED: use schedule.cgi. SIP URL or 'none'."
    - name: relay1_passcode
      type: integer
      description: "0..99999999; DTMF pincode for door relay"
    - name: incoming_call_enable
      type: integer
      description: "0..1; default 0"
    - name: incoming_call_user
      type: string
      description: "Allowed SIP user, e.g. sip:user@10.0.0.2:5060"
    - name: anc
      type: integer
      description: "0..1; default 1 (acoustic noise cancel)"
    - name: ring_time_limit
      type: integer
      description: "10..300 seconds; default 300"
    - name: call_time_limit
      type: integer
      description: "30..300 seconds; default 300"

- id: sip_status
  label: SIP Status
  kind: query
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=status"
  params: []
  notes: Returns JSON with LASTERRORCODE / LASTERRORTEXT.

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=reset"
  params: []
  notes: Hangs up any ongoing call.
```

## Feedbacks
```yaml
- id: session_id
  type: string
  description: Temporary session ID valid 10 min; used to avoid sending credentials in stream URLs
- id: notification_encryption_key
  type: string
  description: "Per-user ChaCha20 key (first 32 bytes used), from getsession.cgi; valid until user password changes"
- id: device_info
  type: object
  description: "JSON BHA.VERSION: FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS, DEVICE-TYPE"
- id: relays
  type: array
  description: "List of relay IDs (e.g. '1', '2', 'gggaaa@1') from info.cgi; physical + paired I/O DoorController relays"
- id: sip_last_error_code
  type: string
  description: Most recent SIP status code; '200' = successfully registered
- id: sip_last_error_text
  type: string
  description: Most recent SIP error text
- id: favorites_list
  type: object
  description: "JSON with sip and http maps of id -> {title, value}"
- id: schedules_list
  type: array
  description: JSON array of input/output schedule objects
- id: monitor_event
  type: string
  description: "Multipart stream parts, e.g. 'doorbell:H', 'doorbell:L', 'motionsensor:L'"
- id: doorbell_event
  type: string
  description: "Decrypted UDP event field; contains doorbell number or 'motion', padded with spaces"
- id: intercom_id
  type: string
  description: "First 6 chars of DoorBird user name; ignore packets not matching"
- id: event_timestamp
  type: integer
  description: "Unix timestamp (4 bytes) from decrypted UDP event"
```

## Variables
```yaml
# Settable parameters exposed via sip.cgi?action=settings. Discrete listed in Actions[].sip_settings.
# No other documented device-level settable variables.
```

## Events
```yaml
- id: doorbell_press
  source: udp_broadcast
  port: 6524
  description: "Decrypted UDP event with EVENT = doorbell number (padded). Sent on doorbell press."
- id: doorbell_press_alt_port
  source: udp_broadcast
  port: 35344
  description: "Same encrypted UDP event broadcast on alternate port."
- id: motion_detected
  source: udp_broadcast
  port: 6524
  description: "Decrypted UDP event with EVENT = 'motion' (padded)."
- id: monitor_stream
  source: http
  description: "Long-poll multipart stream from monitor.cgi: doorbell:H/L, motionsensor:L. RFID and keypad events coming-soon per source."
- id: keepalive_udp
  source: udp_broadcast
  port: 6524
  description: "Keep-alive packets every 7s; IDENT=0xDEADBE; skip for event decryption."
```

## Macros
```yaml
# UNRESOLVED: source describes schedule.cgi as a multi-step event → action system but does not enumerate
# specific named macros. Schedules are user-defined JSON configs, not fixed sequences.
```

## Safety
```yaml
confirmation_required_for:
  - restart  # source: restart.cgi powers down the device
  - sip_reset  # source: hangs up any ongoing SIP call
interlocks: []
# UNRESOLVED: source mentions rate limit (1 connection/sec, 1 min IP/user block after extensive wrong creds → HTTP 423) and "auto-hangup" 180s after SIP call initiation. These are operational constraints, not safety interlocks per se.
```

## Notes
- HTTP CGI paths: `/bha-api/<endpoint>.cgi`. Unencrypted HTTP on TCP 80, HTTPS on TCP 443 (self-signed cert, pre-installed).
- Authentication: HTTP Basic or Digest (RFC 2617), or plaintext `?http-user=&http-password=` params (insecure).
- Wrong-credential rate limit: blocks IP or user for 1 min → HTTP 423.
- One concurrent audio/video call; 503 if busy. Audio/video streams may be interrupted when official DoorBird App requests them.
- Audio codec for live audio / SIP: G.711 μ-law, 8000 Hz. Client must implement AEC + ANR.
- UDP event broadcast v2 (current): IDENT `0xDE 0xAD 0xBE`, VERSION `0x02` (ChaCha20-Poly1305). Nonce 8 bytes, ciphertext 34 bytes. Decrypted: INTERCOM_ID (6 bytes), EVENT (8 bytes, space-padded), TIMESTAMP (4 bytes, Unix). Use key from `getsession.cgi` → `NOTIFICATION_ENCRYPTION_KEY` (first 32 bytes). v1 (Argon2i) deprecated.
- RTSP auth: standard RTSP only (no `http-user`/`http-password` parameter auth).
- SIP: device supports one simultaneous SIP call; auto-hangup after 180s; min 3s between requests. Peer-2-peer incoming on UDP 5060 from firmware 000099+ when `enable=1`.
- "Watch always" permission or recent ring event required for live view/image/audio. Returns HTTP 204 if not permitted. Ring-event grace = 5 min (5 min for live video/audio, 1 min for live image).
<!-- UNRESOLVED: no relay count, electrical ratings, mechanical specs, or firmware-specific feature matrix stated for D2113V. RTSP port 554 / RTSP-over-HTTP 8557 are model-general, not D2113V-specific. SIP default signaling port 5060 inferred from source prose; verify against device admin UI. -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-05-13T01:11:49.289Z
last_checked_at: 2026-09-04T22:17:07.461Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-04T22:17:07.461Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions match the source CGI endpoints verbatim and transport values are supported by the source prose. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no relay count, voltage, current, or physical wiring details in source. RTSP H.264 endpoints listed but port/auth only partially specified. SIP signaling port inferred as 5060 from source, see Notes."
- "source describes schedule.cgi as a multi-step event → action system but does not enumerate"
- "source mentions rate limit (1 connection/sec, 1 min IP/user block after extensive wrong creds → HTTP 423) and \"auto-hangup\" 180s after SIP call initiation. These are operational constraints, not safety interlocks per se."
- "no relay count, electrical ratings, mechanical specs, or firmware-specific feature matrix stated for D2113V. RTSP port 554 / RTSP-over-HTTP 8557 are model-general, not D2113V-specific. SIP default signaling port 5060 inferred from source prose; verify against device admin UI."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
