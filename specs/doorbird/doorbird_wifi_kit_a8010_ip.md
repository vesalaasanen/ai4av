---
spec_id: admin/doorbird-wifi-kit-a8010
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird WiFi Kit A8010 Control Spec"
manufacturer: DoorBird
model_family: "DoorBird WiFi Kit A8010"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "DoorBird WiFi Kit A8010"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
  - https://www.doorbird.com/en/api
retrieved_at: 2026-09-02T18:32:41.585Z
last_checked_at: 2026-10-07T13:18:37.567Z
generated_at: 2026-10-07T13:18:37.567Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "spec is built from platform-wide LAN API PDF; A8010-specific firmware/model support for individual endpoints (e.g. 1080p RTSP path) not stated in source"
  - "source describes event-driven schedule entries (doorbell + motion triggers"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:18:37.567Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 action units match source endpoints with correct shapes and transport; source is the platform-wide DoorBird LAN API that does not name the A8010. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# DoorBird WiFi Kit A8010 Control Spec

## Summary
The DoorBird WiFi Kit A8010 is a WiFi-only variant of the DoorBird IP Video Door Station platform. This spec covers the platform-wide LAN-2-LAN HTTP/RTSP/SIP API documented in the DoorBird/BirdGuard LAN API reference, including device discovery, HTTP control endpoints, RTSP video streaming, UDP-broadcast event monitoring, and the built-in SIP service.

<!-- UNRESOLVED: spec is built from platform-wide LAN API PDF; A8010-specific firmware/model support for individual endpoints (e.g. 1080p RTSP path) not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 80
  # HTTPS also available on TCP port 443 per source; SIP on TCP 5060
auth:
  type: basic_or_digest  # source: RFC 2617 Basic or Digest auth required for every HTTP request
  notes: "Alternative plaintext query params http-user / http-password supported per source"
```

**Transport notes from source:**
- HTTP unencrypted on TCP port 80; HTTPS (self-signed cert) on TCP port 443 for third-party LAN integration.
- SIP service listens on UDP/TCP port 5060 (peer-2-peer) after `enable=1`.
- RTSP on TCP port 554; RTSP-over-HTTP on TCP port 8557.
- Event-monitoring UDP broadcasts on ports 6524 and 35344 (keep-alive every 7 s).
- Rate limit: maximum 1 concurrent API connection per second; IP blocked for 60 s after excessive wrong-credentials attempts (HTTP 423).
- Only one simultaneous audio/video SIP or LAN API call at a time (HTTP 503 if busy).

## Traits
```yaml
- powerable       # inferred from restart.cgi (reboot) endpoint
- routable        # inferred from open-door.cgi / light-on.cgi (relay triggering) and SIP makecall
- queryable       # inferred from info.cgi, sip.cgi?action=status, favorites.cgi list, schedule.cgi list
```

## Actions
```yaml
- id: get_session
  label: Get Session (and Notification Encryption Key)
  kind: query
  command: "GET /bha-api/getsession.cgi"
  params: []
- id: invalidate_session
  label: Invalidate Session
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate={session_id}"
  params:
    - name: session_id
      type: string
      description: Existing session id to invalidate
- id: live_video
  label: Live Video (multipart MJPEG)
  kind: query
  command: "GET /bha-api/video.cgi"
  params: []
- id: live_image
  label: Live Image (single JPEG)
  kind: query
  command: "GET /bha-api/image.cgi"
  params: []
- id: open_door
  label: Open Door / Energize Relay
  kind: action
  command: "GET /bha-api/open-door.cgi?r={relay}"
  params:
    - name: relay
      type: string
      description: Relay target (e.g. "1", "2", or paired controller id "<doorcontrollerID>@<relay>"). Omit to trigger physical relay 1.
- id: light_on
  label: Light On
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []
- id: history_image
  label: History Image
  kind: query
  command: "GET /bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: History image index, 1..50 (1 = latest)
    - name: event
      type: string
      description: "Event type: doorbell or motionsensor (optional; default = ring history for DoorBird, input-trigger history for BirdGuard)"
- id: monitor
  label: Monitor (multipart event stream)
  kind: query
  command: "GET /bha-api/monitor.cgi?ring=doorbell,motionsensor"
  params: []
- id: audio_receive
  label: Live Audio Receive (G.711 mu-law)
  kind: query
  command: "GET /bha-api/audio-receive.cgi?sessionid={session_id}"
  params:
    - name: session_id
      type: string
      description: "Temporary session id (10 min TTL)"
- id: audio_transmit
  label: Live Audio Transmit (G.711 mu-law)
  kind: action
  command: "POST /bha-api/audio-transmit.cgi?sessionid={session_id}"
  params:
    - name: session_id
      type: string
      description: "Temporary session id (10 min TTL)"
- id: info
  label: Device Info (JSON)
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []
- id: list_favorites
  label: List Favorites
  kind: query
  command: "GET /bha-api/favorites.cgi"
  params: []
- id: save_favorite
  label: Add or Change Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: type
      type: string
      description: "sip or http"
    - name: title
      type: string
      description: Name / short description
    - name: value
      type: string
      description: HTTP(S) URL or SIP target
    - name: id
      type: integer
      description: Existing favorite id (omit when creating new)
- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: type
      type: string
      description: "sip or http"
    - name: id
      type: integer
      description: Favorite id to delete
- id: list_schedules
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []
- id: save_schedule
  label: Add or Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params: []
- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: input
      type: string
      description: "doorbell | motion | rfid"
    - name: param
      type: string
      description: "Doorbell number, transponder id, etc. (see source)"
- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []
- id: rtsp_live_video_default
  label: RTSP Live Video (default resolution)
  kind: query
  command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/media.amp"
  params:
    - name: device-rtsp-port
      type: string
      description: RTSP port (default 554) or RTSP-over-HTTP port 8557
- id: rtsp_live_video_720p
  label: RTSP Live Video (720p)
  kind: query
  command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/720p/media.amp"
  params:
    - name: device-rtsp-port
      type: string
      description: RTSP port (554) or 8557. Source: 720p supported by D10x/D21x from firmware 129.
- id: rtsp_live_video_1080p
  label: RTSP Live Video (1080p)
  kind: query
  command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/1080p/media.amp"
  params:
    - name: device-rtsp-port
      type: string
      description: RTSP port (554) or 8557. Source: 1080p supported by DoorBird D11x only.
- id: sip_registration
  label: SIP Registration
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
      description: SIP proxy auth user
    - name: password
      type: string
      description: SIP proxy auth password
    - name: url
      type: string
      description: IP/hostname of SIP proxy
- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: SIP URL to call
- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params: []
- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings"
  params: []
- id: sip_status
  label: SIP Status
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  params: []
- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  params: []
- id: sip_settings_parameters
  label: SIP Settings Parameters
  kind: action
  command: "http://<device-ip>/bha-api/sip.cgi?action=settings&<parameter>=<value>"
  params:
    - name: enable
      type: string
      description: "0..1; Enable or disable SIP registration after reboot of the device, default: 0"
    - name: mic_volume
      type: string
      description: "1..100; Set the microphone volume, default: 33"
    - name: spk_volume
      type: string
      description: "1..100; Set the speaker volume, default: 70"
    - name: dtmf
      type: string
      description: "0..1; Enable or disable DTMF support, default: 0"
    - name: autocall_doorbell_url
      type: string
      description: "URL or \"none\"; SIP URL to automatically call upon doorbell event. Set to \"none\" to disable this automatic call. Default: \"none\"; deprecated, use schedule.cgi"
    - name: relay1_passcode
      type: string
      description: "0..99999999; Pincode for triggering the door open relay"
    - name: incoming_call_enable
      type: string
      description: "0..1; Enable or disable incoming calls, default: 0"
    - name: incoming_call_user
      type: string
      description: "SIP user; Allowed SIP user which will be authenticated for DoorBird"
    - name: anc
      type: string
      description: "0..1; Enable or disable acoustic noise cancellation, default: 1"
    - name: ring_time_limit
      type: string
      description: "10..300; Set the maximum ringing time in seconds, default: 300"
    - name: call_time_limit
      type: string
      description: "30..300; Set maximum call duration in seconds, default: 300"
- id: audio_transmit_basic_auth
  label: Live Audio Transmit
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params: []
```

## Feedbacks
```yaml
- id: info_json
  type: object
  query_command: "GET /bha-api/info.cgi"
  description: Result of /bha-api/info.cgi. Contains BHA.RETURNCODE, VERSION[].FIRMWARE, VERSION[].BUILD_NUMBER, RELAYS[] (firmware 000108+), DEVICE-TYPE, PRIMARY_MAC_ADDR.
- id: favorites_json
  type: object
  query_command: "GET /bha-api/favorites.cgi"
  description: Result of /bha-api/favorites.cgi. Object with "sip" and "http" sub-objects keyed by favorite id; each entry has "title" and "value".
- id: monitor_event
  type: string
  query_command: "GET /bha-api/monitor.cgi?ring=doorbell,motionsensor"
  description: "Multipart stream parts from /bha-api/monitor.cgi, format `<event>:<H|L>` (e.g. doorbell:H, motionsensor:L)."
- id: sip_status_json
  type: object
  query_command: "GET /bha-api/sip.cgi?action=status"
  description: Result of /bha-api/sip.cgi?action=status. Contains LASTERRORCODE (200 = registered) and LASTERRORTEXT.
```

## Events
```yaml
- id: udp_event_broadcast
  description: |
    UDP broadcast on ports 6524 and 35344 for every user/device after an event
    (doorbell, motion, etc.) plus a 7-second keep-alive. Header IDENT 0xDE 0xAD 0xBE,
    followed by VERSION byte (0x02 = ChaCha20-Poly1305). CIPHERTEXT decrypts to
    INTERCOM_ID (6 bytes), EVENT (8 bytes, ASCII padded with spaces, e.g. "1       "),
    TIMESTAMP (4-byte Unix long). Decryption key obtained once via getsession.cgi
    as NOTIFICATION_ENCRYPTION_KEY (32-64 bytes; first 32 used by ChaCha20).
- id: rtsp_session_interrupted
  description: RTSP / MJPEG / audio stream may be interrupted at any time when the official DoorBird App takes precedence (per source).
- id: sip_session_terminated_by_app
  description: Device closes any ongoing SIP connection if a listen/talk request arrives from the official DoorBird App (per source).
```

## Macros
```yaml
# UNRESOLVED: source describes event-driven schedule entries (doorbell + motion triggers
# configured via schedule.cgi) but does not document any vendor-defined multi-step macro
# sequence beyond the schedule entry configuration itself.
```

## Safety
```yaml
confirmation_required_for:
  - restart
interlocks: []
# Per source: IP is blocked for 60 s after excessive wrong-credentials attempts (HTTP 423);
# SIP auto-hangup after 180 s; min 3 s between SIP requests; live streams and SIP calls
# may be preempted by the official DoorBird App.
```

## Notes
- The LAN-2-LAN API is platform-wide across all current DoorBird/BirdGuard devices; specific A8010 model support for each endpoint is not separately documented in source.
- Firmware version compatibility: `getsession.cgi` adds NOTIFICATION_ENCRYPTION_KEY with v0.36-era behavior; `favorites.cgi` and `schedule.cgi` require firmware 000110 or higher; `info.cgi` RELAYS[] field requires firmware 000108 or higher; RTSP 720p requires firmware 129 on D10x/D21x; RTSP 1080p is D11x-only. (Source dates 000096 / 000108 / 000109 / 000110 / 129 / v0.36.)
- HTTP authentication: source mandates RFC 2617 Basic or Digest on every request; plaintext `http-user`/`http-password` query params also accepted (less secure). Credentials are the same as those used in the DoorBird App.
- HTTPS uses a pre-installed self-signed certificate on the device (CA do not issue certs for IP addresses).
- Audio codec: G.711 mu-law, 8000 Hz sampling. Echo/noise cancellation must be implemented client-side (DoorBird provides AEC/ANR on the device side only).
- UDP broadcast encryption: ChaCha20-Poly1305 with the NOTIFICATION_ENCRYPTION_KEY; legacy Argon2i v1 broadcasts deprecated as of November 2023.
- Demo page available at `http://<device-ip>/bha-api/view.html`.
- Source does not document audio transmit URL with `sessionid=` query parameter in the same form as audio-receive; the audio-transmit example uses HTTP Basic auth header directly. Behavior when both sessionid and Basic auth are sent is not stated in source.

<!-- UNRESOLVED: -->
<!-- - A8010-specific firmware model string (DEVICE-TYPE in info.cgi) not stated in source -->
<!-- - Whether A8010 supports RTSP 1080p (source lists D11x only) -->
<!-- - Whether A8010 supports RTSP 720p (source lists D10x/D21x from firmware 129) -->
<!-- - Voltage, current, power specifications (Tier 3) -->
<!-- - Exact SIP response JSON schema for status / reset -->
<!-- - Schedule entry DELETE parameters beyond input+param (e.g. output, event) not enumerated in source -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
  - https://www.doorbird.com/en/api
retrieved_at: 2026-09-02T18:32:41.585Z
last_checked_at: 2026-10-07T13:18:37.567Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:18:37.567Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 action units match source endpoints with correct shapes and transport; source is the platform-wide DoorBird LAN API that does not name the A8010. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "spec is built from platform-wide LAN API PDF; A8010-specific firmware/model support for individual endpoints (e.g. 1080p RTSP path) not stated in source"
- "source describes event-driven schedule entries (doorbell + motion triggers"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
