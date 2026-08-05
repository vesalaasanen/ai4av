---
spec_id: admin/doorbird-a1103-black-edition
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird A1103 Black Edition Control Spec"
manufacturer: DoorBird
model_family: "DoorBird A1103 Black Edition"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "DoorBird A1103 Black Edition"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-14T07:20:59.117Z
last_checked_at: 2026-07-21T21:56:53.026Z
generated_at: 2026-07-21T21:56:53.026Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware version for A1103 Black Edition not stated; doc is generic across DoorBird/BirdGuard product line. Default resolution/compression for video/image streams not stated (defined in system configuration)."
  - "video/image default resolution and compression not stated (defined in device system configuration, not exposed by this API doc)."
  - "rfid and keypad event broadcasts documented as 'coming soon' in source."
  - "no explicit multi-step command sequences documented as macros in source."
  - "exact firmware version and default video/image resolution for the A1103 Black Edition not stated in source. Voltage/current/power specs not in this API document. Relay count and pairing details are runtime-discoverable via info.cgi only."
verification:
  verdict: verified
  checked_at: 2026-07-21T21:56:53.026Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched literally in source; transport parameters verified; full command coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# DoorBird A1103 Black Edition Control Spec

## Summary
DoorBird A1103 Black Edition is a Video Door Station controlled via the DoorBird LAN-2-LAN BHA-API, an HTTP/HTTPS interface on TCP ports 80/443. The device exposes door/light relay control, live video (MJPEG over HTTP and H.264 over RTSP), live audio (G.711 μ-law), image/history retrieval, SIP telephony, schedule/favorite management, and device restart. Event notifications are delivered as encrypted UDP broadcasts (ChaCha20-Poly1305) on ports 6524 and 35344. Authentication uses HTTP Basic or Digest (RFC 2617).

<!-- UNRESOLVED: exact firmware version for A1103 Black Edition not stated; doc is generic across DoorBird/BirdGuard product line. Default resolution/compression for video/image streams not stated (defined in system configuration). -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  base_url: "http://<device-ip>/bha-api/"
  port: 80  # HTTP; HTTPS on 443 stated in source
serial:  # N/A - device is not RS-232 controlled
rtsp:
  # RTSP video streaming (not the primary control plane); ports stated in source
  port: 554  # standard RTSP; RTSP-over-HTTP on 8557 also stated
udp:
  # Event-monitoring UDP broadcasts
  ports:
    - 6524
    - 35344
auth:
  type: basic_digest  # source: "Basic or Digest authentication as defined in RFC 2617"
  notes: >-
    Each HTTP request requires Basic or Digest auth (RFC 2617) using DoorBird App
    credentials. Plaintext "http-user"/"http-password" query params also supported
    (insecure). SIP port 5060 stated for P2P SIP calls.
```

## Traits
```yaml
traits:
  - queryable  # inferred: info.cgi, sip status, favorites list, schedule list queries present
  - levelable  # inferred: SIP settings expose mic_volume (1..100) and spk_volume (1..100)
```

## Actions
```yaml
actions:
  - id: get_session
    label: Create Session ID
    kind: query
    command: "GET /bha-api/getsession.cgi"
    notes: "Returns JSON with RETURNCODE, SESSIONID (valid 10 min), NOTIFICATION_ENCRYPTION_KEY. Required permission: valid user."
    params: []

  - id: invalidate_session
    label: Destroy Session ID
    kind: action
    command: "GET /bha-api/getsession.cgi?invalidate={session_id}"
    notes: "Invalidates the handed-over session ID. Returns JSON with empty SESSIONID. Required permission: valid user."
    params:
      - name: session_id
        type: string
        description: The session ID to invalidate.

  - id: live_video
    label: Live Video (MJPEG)
    kind: action
    command: "GET /bha-api/video.cgi"
    notes: "Returns multipart/x-mixed-replace MJPEG stream, up to 8 fps. Permission: valid user, watch-always or ring event in past 5 min. Returns 204 if no permission."
    params: []

  - id: live_image
    label: Live Image (JPEG)
    kind: action
    command: "GET /bha-api/image.cgi"
    notes: "Returns single JPEG (content-type image/jpeg). Permission: valid user, watch-always or ring event in past 1 min. Returns 204 if no permission."
    params: []

  - id: open_door
    label: Open Door / Trigger Relay
    kind: action
    command: "GET /bha-api/open-door.cgi?r={relay}"
    notes: "Energizes door opener / alarm output relay. Returns JSON. Permission: valid user, watch-always or ring event in past 5 min. If r omitted, physical relay 1 triggered."
    params:
      - name: relay
        type: string
        description: "Relay to trigger, e.g. '1', '2', or '<doorcontrollerID>@<relay>' for paired IP I/O DoorController. Optional; defaults to physical relay 1."

  - id: light_on
    label: Light On
    kind: action
    command: "GET /bha-api/light-on.cgi"
    notes: "Energizes light relay. Returns JSON. Permission: valid user, watch-always or ring event in past 5 min."
    params: []

  - id: history_image
    label: History Image Request
    kind: action
    command: "GET /bha-api/history.cgi?index={index}&event={event}"
    notes: "Returns JPEG history image (stored in cloud). Permission: valid user, history permission; motion permission for motion-event images. Returns 204 if no permission."
    params:
      - name: index
        type: integer
        description: "Index of history image, 1..50 (1 = latest)."
      - name: event
        type: string
        description: "Event type: 'doorbell' or 'motionsensor'. Optional; default is ring history (DoorBird) / input trigger history (BirdGuard)."

  - id: monitor
    label: Monitor Request (State Stream)
    kind: action
    command: "GET /bha-api/monitor.cgi?ring={ring}"
    notes: "Returns multipart/x-mixed-replace stream of motionsensor and doorbell state. Up to 8 concurrent streams; 509 when all busy. Permission: valid user."
    params:
      - name: ring
        type: string
        description: "Comma-separated event types to monitor: 'doorbell', 'motionsensor'. rfid/keypad coming soon."

  - id: audio_receive
    label: Live Audio Receive
    kind: action
    command: "GET /bha-api/audio-receive.cgi"
    notes: "Returns real-time G.711 μ-law audio (8000 Hz). Permission: valid user, watch-always or ring event in past 5 min. Returns 204 if no permission."
    params: []

  - id: audio_transmit
    label: Live Audio Transmit
    kind: action
    command: "POST /bha-api/audio-transmit.cgi"
    notes: "Transmit G.711 μ-law audio to device (Content-Type: audio/basic). Only one consumer may transmit at a time. Permission: valid user, watch-always or ring event in past 5 min."
    params: []

  - id: info
    label: Info / Version Request
    kind: query
    command: "GET /bha-api/info.cgi"
    notes: "Returns JSON: FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS array, DEVICE-TYPE. Relays config included from firmware 000108+. Permission: valid user."
    params: []

  - id: list_favorites
    label: List Favorites
    kind: query
    command: "GET /bha-api/favorites.cgi"
    notes: "Returns JSON of all configured favorites (sip + http types). Permission: API operator. Firmware 000110+ required."
    params: []

  - id: save_favorite
    label: Add or Change Favorite
    kind: action
    command: "GET /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
    notes: "Adds new favorite (new ID returned in 'favoriteid' response header) or changes existing. Type cannot be switched on existing favorite. HTTP 507 if size limit exceeded. Permission: API operator. Firmware 000110+."
    params:
      - name: type
        type: string
        description: "Favorite type: 'sip' or 'http'."
      - name: title
        type: string
        description: "Name / short description of the favorite."
      - name: value
        type: string
        description: "URL/address: HTTP(S) URL (incl. credentials if needed) or SIP target."
      - name: id
        type: integer
        description: "ID of existing favorite to change. Omit when creating a new favorite."

  - id: remove_favorite
    label: Delete Favorite
    kind: action
    command: "GET /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
    notes: "Removes a favorite; active schedule entries using it are also removed. Permission: API operator. Firmware 000110+."
    params:
      - name: type
        type: string
        description: "Favorite type: 'sip' or 'http'."
      - name: id
        type: integer
        description: "ID of the favorite to delete."

  - id: list_schedules
    label: List Schedules
    kind: query
    command: "GET /bha-api/schedule.cgi"
    notes: "Returns JSON array of schedule entries (input/param/output with event/param/schedule). HTTP 204 if no data for requested input. Permission: API operator. Firmware 000110+."
    params: []

  - id: update_schedule
    label: Add or Update Schedule Entry
    kind: action
    command: "POST /bha-api/schedule.cgi"
    notes: "POST JSON schedule object per input type. Schedule types: once, from-to (UTC epoch seconds), weekdays (seconds since Sunday 00:00, max 604799, 1800s slices). One entry per output type/time slot/event; relays excepted. HTTP 400 on invalid JSON / Content-Length mismatch. Permission: API operator. Firmware 000110+."
    params:
      - name: body
        type: json
        description: "Schedule JSON object with input (doorbell|motion|rfid|fingerprint), param, and output[] array (event: notify|sip|relay|http)."

  - id: remove_schedule
    label: Delete Schedule Entry
    kind: action
    command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
    notes: "Deletes a schedule entry. Permission: API operator. Firmware 000110+."
    params:
      - name: input
        type: string
        description: "Input event type: 'doorbell', 'motion', or 'rfid'."
      - name: param
        type: string
        description: "ID of the schedule entry, e.g. doorbell number or RFID transponder id."

  - id: restart
    label: Restart Device
    kind: action
    command: "GET /bha-api/restart.cgi"
    notes: "Restarts the device; no diagnostic sound after restart. HTTP 503 if device busy (e.g. firmware update). Permission: valid user."
    params: []

  - id: rtsp_live_video
    label: RTSP Live Video (H.264)
    kind: action
    command: "rtsp://<device-ip>:8557/mpeg/media.amp"
    notes: "H.264 RTSP stream, up to 12 fps. RTSP port 554; RTSP-over-HTTP port 8557. Variants: /mpeg/720p/media.amp (D10x/D21x fw129+), /mpeg/1080p/media.amp (D11x only). Standard RTSP auth. Permission: valid user, watch-always or ring event in past 5 min."
    params: []

  - id: sip_registration
    label: SIP Registration
    kind: action
    command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
    notes: "Register to a SIP proxy. Not needed for P2P calls. HTTP 200 OK / 401 auth failure. Permission: API operator."
    params:
      - name: user
        type: string
        description: "Authentication user for the SIP proxy."
      - name: password
        type: string
        description: "Authentication password for the SIP proxy."
      - name: url
        type: string
        description: "IP/hostname of the SIP proxy."

  - id: sip_makecall
    label: SIP Make Call
    kind: action
    command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
    notes: "Initiate SIP call (P2P or via configured PBX). Only one simultaneous call; auto-hangup after 180s. HTTP 200 OK / 400 param missing / 503 line busy. Permission: API operator."
    params:
      - name: url
        type: string
        description: "SIP URL to call, e.g. sip:108@192.168.123.22."

  - id: sip_hangup
    label: SIP Hangup
    kind: action
    command: "GET /bha-api/sip.cgi?action=hangup"
    notes: "Hangs up the current SIP call. Returns 200 even if no ongoing call. Permission: API operator."
    params: []

  - id: sip_settings
    label: SIP Settings
    kind: action
    command: "GET /bha-api/sip.cgi?action=settings&{parameter}={value}"
    notes: "Configure SIP-related settings. autocall_doorbell_url is deprecated (use schedule.cgi). Permission: API operator. HTTP 200 OK / 401 auth failure."
    params:
      - name: enable
        type: integer
        description: "0..1 - Enable/disable SIP registration after reboot. Default 0."
      - name: mic_volume
        type: integer
        description: "1..100 - Microphone volume. Default 33."
      - name: spk_volume
        type: integer
        description: "1..100 - Speaker volume. Default 70."
      - name: dtmf
        type: integer
        description: "0..1 - Enable/disable DTMF support. Default 0."
      - name: autocall_doorbell_url
        type: string
        description: "DEPRECATED (use schedule.cgi). SIP URL to auto-call on doorbell, or 'none'. Default 'none'."
      - name: relay1_passcode
        type: integer
        description: "0..99999999 - Pincode for triggering door-open relay via DTMF."
      - name: incoming_call_enable
        type: integer
        description: "0..1 - Enable/disable incoming calls. Default 0."
      - name: incoming_call_user
        type: string
        description: "Allowed SIP user authenticated for DoorBird, e.g. 'sip:10.0.0.1:5060'."
      - name: anc
        type: integer
        description: "0..1 - Enable/disable acoustic noise cancellation. Default 1."
      - name: ring_time_limit
        type: integer
        description: "10..300 - Max ringing time in seconds. Default 300."
      - name: call_time_limit
        type: integer
        description: "30..300 - Max call duration in seconds. Default 300."

  - id: sip_status
    label: SIP Status Query
    kind: query
    command: "GET /bha-api/sip.cgi?action=status"
    notes: "Returns JSON: LASTERRORCODE (200 = registered) and LASTERRORTEXT. Permission: API operator."
    params: []

  - id: sip_reset
    label: SIP Settings Reset
    kind: action
    command: "GET /bha-api/sip.cgi?action=reset"
    notes: "Resets all SIP settings except license; hangs up any ongoing call. Permission: API operator."
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: session_response
    type: object
    description: "getsession.cgi JSON: BHA.RETURNCODE, BHA.SESSIONID (valid 10 min), BHA.NOTIFICATION_ENCRYPTION_KEY."

  - id: info_response
    type: object
    description: "info.cgi JSON: BHA.RETURNCODE, BHA.VERSION[] (FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS[], DEVICE-TYPE)."

  - id: monitor_state
    type: stream
    description: "monitor.cgi multipart stream lines: 'doorbell:H|L' and 'motionsensor:H|L' (H=high/active, L=low/inactive)."

  - id: sip_status_response
    type: object
    description: "sip.cgi?action=status JSON: LASTERRORCODE (200 = registered), LASTERRORTEXT."

  - id: http_status_codes
    type: enum
    values: [200, 204, 400, 401, 423, 500, 503, 507, 509]
    description: "200 OK; 204 no permission/no data; 400 param invalid; 401 auth required; 423 IP blocked (wrong creds, 1 min lockout); 500 internal error; 503 device busy; 507 size limit exceeded; 509 monitor streams full."
```

## Variables
```yaml
variables:
  - id: sip_mic_volume
    type: integer
    range: "1..100"
    default: 33
    description: "SIP microphone volume (set via sip.cgi?action=settings&mic_volume=)."

  - id: sip_spk_volume
    type: integer
    range: "1..100"
    default: 70
    description: "SIP speaker volume (set via sip.cgi?action=settings&spk_volume=)."

  - id: sip_ring_time_limit
    type: integer
    range: "10..300"
    default: 300
    description: "Max SIP ringing time in seconds."

  - id: sip_call_time_limit
    type: integer
    range: "30..300"
    default: 300
    description: "Max SIP call duration in seconds."
# UNRESOLVED: video/image default resolution and compression not stated (defined in device system configuration, not exposed by this API doc).
```

## Events
```yaml
events:
  - id: udp_doorbell_event
    transport: udp
    ports: [6524, 35344]
    description: >-
      Encrypted UDP broadcast on doorbell ring. Packet: IDENT (0xDE 0xAD 0xBE),
      VERSION (0x02), NONCE (8 bytes), CIPHERTEXT (ChaCha20-Poly1305). After
      decrypt: INTERCOM_ID (6 chars of username), EVENT (doorbell number padded
      with spaces), TIMESTAMP (unix long). Encryption key obtained once via
      getsession.cgi NOTIFICATION_ENCRYPTION_KEY (first 32 bytes used). Keep-alive
      broadcasts every 7s (skip those).

  - id: udp_motion_event
    transport: udp
    ports: [6524, 35344]
    description: "Same UDP broadcast format as doorbell; EVENT field contains 'motion'."
# UNRESOLVED: rfid and keypad event broadcasts documented as 'coming soon' in source.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step command sequences documented as macros in source.
```

## Safety
```yaml
confirmation_required_for:
  - open_door  # energizes physical door-opener relay (building access)
  - restart    # disrupts all live streams and SIP calls
interlocks:
  - "open_door / light_on require watch-always permission or a ring event within the past 5 minutes; otherwise HTTP 204 returned and relay not energized."
  - "Audio/video streams may be interrupted at any time when the official DoorBird App requests precedence."
  - "SIP calls auto-terminate 180 seconds after initiation (auto-hangup, security)."
  - "Wrong-credential flood triggers 1-minute IP/user lockout (HTTP 423)."
  - "Max 1 concurrent API connection per second; video door station supports only 1 simultaneous audio/video live call (HTTP 503 busy)."
```

## Notes
- Audio codec for both receive and transmit is G.711 μ-law at 8000 Hz; client MUST perform its own AEC/ANR (DoorBird's native AEC/ANR not exposed to third parties).
- HTTPS uses a self-signed certificate (CA does not issue certs for IPs); client must accept it. Video/audio streaming over HTTPS is not supported in LAN — use session ID param instead to avoid plaintext credentials.
- Session IDs valid 10 minutes. SIP P2P calls supported from device version 000099; SIP receive port 5060.
- Schedule time model: weekdays use seconds since Sunday 00:00 UTC, max 604799, in 1800s (30-min) slices; from-to uses UTC epoch seconds.
- Favorites/schedules require firmware 000110+ and API-operator permission.
- Encryption note: cloud communication fully encrypted; LAN HTTP interface unencrypted on 80, self-signed HTTPS on 443.

<!-- UNRESOLVED: exact firmware version and default video/image resolution for the A1103 Black Edition not stated in source. Voltage/current/power specs not in this API document. Relay count and pairing details are runtime-discoverable via info.cgi only. -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-14T07:20:59.117Z
last_checked_at: 2026-07-21T21:56:53.026Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:56:53.026Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched literally in source; transport parameters verified; full command coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware version for A1103 Black Edition not stated; doc is generic across DoorBird/BirdGuard product line. Default resolution/compression for video/image streams not stated (defined in system configuration)."
- "video/image default resolution and compression not stated (defined in device system configuration, not exposed by this API doc)."
- "rfid and keypad event broadcasts documented as 'coming soon' in source."
- "no explicit multi-step command sequences documented as macros in source."
- "exact firmware version and default video/image resolution for the A1103 Black Edition not stated in source. Voltage/current/power specs not in this API document. Relay count and pairing details are runtime-discoverable via info.cgi only."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
