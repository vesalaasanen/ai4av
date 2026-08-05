---
spec_id: admin/doorbird-a1103-white-edition
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird A1103 White Edition Control Spec"
manufacturer: DoorBird
model_family: "DoorBird A1103 White Edition"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "DoorBird A1103 White Edition"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/en/api
retrieved_at: 2026-07-14T07:27:17.045Z
last_checked_at: 2026-07-21T21:56:54.477Z
generated_at: 2026-07-21T21:56:54.477Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware version for the A1103 White Edition is not stated in the source (firmware examples reference D101/D21x)."
  - "source states no explicit interlock procedures. Door-relay release is"
  - "firmware version compatibility for A1103 White Edition not stated"
  - "default device-rtsp-port placeholder value not stated (uses <device-rtsp-port>)"
  - "voltage/current/power specs not stated in source"
verification:
  verdict: verified
  checked_at: 2026-07-21T21:56:54.477Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions have literal command matches in source; transport parameters verified; comprehensive coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# DoorBird A1103 White Edition Control Spec

## Summary
The DoorBird A1103 White Edition is a video door station with an IP-based control interface. This spec covers the LAN-2-LAN HTTP API (TCP port 80 / HTTPS 443) for live image/video retrieval, door-relay and light-relay control, history access, monitor streams, device info, favorites/schedule management, SIP telephony, RTSP video, and UDP event-monitoring broadcasts.

<!-- UNRESOLVED: exact firmware version for the A1103 White Edition is not stated in the source (firmware examples reference D101/D21x). -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  base_url: "http://<device-ip>/bha-api"
  port: 80
auth:
  type: basic  # source: Basic or Digest authentication per RFC 2617; plaintext http-user/http-password params also supported
udp:
  ports:
    - 6524
    - 35344
  note: "Event-monitoring UDP broadcasts sent on ports 6524 and 35344; keep-alive packets every 7 s (skip those)"
# Additional transport details stated in source:
# - HTTPS available on port 443 (self-signed cert pre-installed)
# - RTSP video on port 554; RTSP-over-HTTP on port 8557
# - SIP listening on port 5060 (when enabled)
# - Max 1 concurrent API connection per second; wrong-auth blocks IP/user for 1 min (HTTP 423)
# - Audio codec: G.711 µ-law, 8000 Hz
```

## Traits
```yaml
traits:
  - queryable  # inferred: info.cgi, sip status, favorites/schedule list queries present
  - levelable  # inferred: mic_volume / spk_volume settable params in SIP settings
```

## Actions
```yaml
actions:
  - id: create_session
    label: Create Session ID
    kind: action
    command: "GET /bha-api/getsession.cgi"
    params: []
    notes: "Returns temporary Session ID valid 10 minutes; used to avoid plaintext creds on A/V streams"

  - id: invalidate_session
    label: Invalidate Session ID
    kind: action
    command: "GET /bha-api/getsession.cgi?invalidate={session_id}"
    params:
      - name: session_id
        type: string
        description: "Session ID to invalidate"

  - id: live_video_mjpg
    label: Live Video Request (MJPG)
    kind: query
    command: "GET /bha-api/video.cgi"
    params: []
    notes: "Multipart x-mixed-replace MJPG stream; up to 8 fps"

  - id: live_image_jpeg
    label: Live Image Request (JPEG)
    kind: query
    command: "GET /bha-api/image.cgi"
    params: []

  - id: open_door
    label: Open Door (relay)
    kind: action
    command: "GET /bha-api/open-door.cgi?r={relay}"
    params:
      - name: relay
        type: string
        description: "Relay spec e.g. '1', '2', or '<doorcontrollerID>@<relay>'. Omit to trigger physical relay 1"

  - id: light_on
    label: Light On (relay)
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
        description: "1..50; 1 is latest"
      - name: event
        type: string
        description: "doorbell | motionsensor (optional)"

  - id: monitor
    label: Monitor Request (doorbell/motion state stream)
    kind: query
    command: "GET /bha-api/monitor.cgi?ring={events}"
    params:
      - name: events
        type: string
        description: "doorbell,motionsensor"
    notes: "Multipart stream of H/L state lines; up to 8 concurrent streams (HTTP 509 when full)"

  - id: audio_receive
    label: Live Audio Receive
    kind: query
    command: "GET /bha-api/audio-receive.cgi"
    params: []
    notes: "G.711 µ-law, 8000 Hz"

  - id: audio_transmit
    label: Live Audio Transmit
    kind: action
    command: "POST /bha-api/audio-transmit.cgi"
    params: []
    notes: "POST G.711 µ-law body; Content-Type: audio/basic; only one consumer may transmit"

  - id: info
    label: Info Request
    kind: query
    command: "GET /bha-api/info.cgi"
    params: []
    notes: "Returns JSON: firmware, build number, relays, device-type (relays config from fw 000108+)"

  - id: list_favorites
    label: List Favorites
    kind: query
    command: "GET /bha-api/favorites.cgi"
    params: []
    notes: "Requires 'API operator' permission; firmware 000110+"

  - id: save_favorite
    label: Add or Change Favorite
    kind: action
    command: "GET /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
    params:
      - name: type
        type: string
        description: "sip | http"
      - name: title
        type: string
      - name: value
        type: string
        description: "URL or SIP target"
      - name: id
        type: integer
        description: "optional; ID to change existing favorite"

  - id: remove_favorite
    label: Delete Favorite
    kind: action
    command: "GET /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
    params:
      - name: type
        type: string
        description: "sip | http"
      - name: id
        type: integer

  - id: list_schedules
    label: List Schedules
    kind: query
    command: "GET /bha-api/schedule.cgi"
    params: []
    notes: "Requires 'API operator' permission; firmware 000110+"

  - id: add_update_schedule
    label: Add or Update Schedule Entry
    kind: action
    command: "POST /bha-api/schedule.cgi"
    params: []
    notes: "POST JSON object describing input (doorbell|motion|rfid), param, and output[] actions with schedule"

  - id: remove_schedule
    label: Delete Schedule Entry
    kind: action
    command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
    params:
      - name: input
        type: string
        description: "doorbell | motion | rfid"
      - name: param
        type: string
        description: "doorbell number / transponder id"

  - id: restart
    label: Restart Device
    kind: action
    command: "GET /bha-api/restart.cgi"
    params: []
    notes: "No diagnostic sound after this restart"

  - id: rtsp_live_video
    label: RTSP Live Video (default)
    kind: query
    command: "rtsp://<device-ip>:554/mpeg/media.amp"
    params: []
    notes: "RTSP standard auth; up to 12 fps"

  - id: rtsp_live_video_720p
    label: RTSP Live Video 720p
    kind: query
    command: "rtsp://<device-ip>:554/mpeg/720p/media.amp"
    params: []
    notes: "Supported by D10x/D21x from firmware 129"

  - id: rtsp_live_video_1080p
    label: RTSP Live Video 1080p
    kind: query
    command: "rtsp://<device-ip>:554/mpeg/1080p/media.amp"
    params: []
    notes: "Supported by D11x only"

  - id: rtsp_over_http_video
    label: RTSP-over-HTTP Video
    kind: query
    command: "rtsp://<device-ip>:8557/mpeg/media.amp"
    params: []

  - id: sip_registration
    label: SIP Register to Proxy
    kind: action
    command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
    params:
      - name: user
        type: string
        description: "SIP proxy auth user"
      - name: password
        type: string
      - name: url
        type: string
        description: "SIP proxy IP/hostname"
    notes: "Requires 'API operator' permission"

  - id: sip_makecall
    label: SIP Make Call
    kind: action
    command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
    params:
      - name: url
        type: string
        description: "SIP URL to call"
    notes: "Auto-hangup 180 s after initiation; min 3 s between SIP requests"

  - id: sip_hangup
    label: SIP Hangup
    kind: action
    command: "GET /bha-api/sip.cgi?action=hangup"
    params: []

  - id: sip_settings
    label: SIP Settings
    kind: action
    command: "GET /bha-api/sip.cgi?action=settings&{param}={value}"
    params:
      - name: param
        type: string
        description: "enable|mic_volume|spk_volume|dtmf|autocall_doorbell_url|relay1_passcode|incoming_call_enable|incoming_call_user|anc|ring_time_limit|call_time_limit"
    notes: "See Variables for settable parameter ranges. autocall_doorbell_url deprecated - use schedule.cgi"

  - id: sip_status
    label: SIP Status Query
    kind: query
    command: "GET /bha-api/sip.cgi?action=status"
    params: []

  - id: sip_reset
    label: SIP Settings Reset
    kind: action
    command: "GET /bha-api/sip.cgi?action=reset"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: doorbell_state
    type: enum
    values: ["H", "L"]
    source: "monitor.cgi multipart stream"

  - id: motionsensor_state
    type: enum
    values: ["H", "L"]
    source: "monitor.cgi multipart stream"

  - id: sip_registration_status
    type: string
    source: "sip.cgi?action=status JSON: LASTERRORCODE, LASTERRORTEXT"

  - id: device_info
    type: json
    source: "info.cgi JSON: FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS[], DEVICE-TYPE"
```

## Variables
```yaml
variables:
  - id: sip_enable
    type: integer
    range: "0..1"
    description: "Enable/disable SIP registration after reboot (default 0)"

  - id: sip_mic_volume
    type: integer
    range: "1..100"
    description: "Microphone volume (default 33)"

  - id: sip_spk_volume
    type: integer
    range: "1..100"
    description: "Speaker volume (default 70)"

  - id: sip_dtmf
    type: integer
    range: "0..1"
    description: "Enable/disable DTMF support (default 0)"

  - id: sip_relay1_passcode
    type: integer
    range: "0..99999999"
    description: "Pincode for triggering door-open relay via DTMF"

  - id: sip_incoming_call_enable
    type: integer
    range: "0..1"
    description: "Enable/disable incoming calls (default 0)"

  - id: sip_incoming_call_user
    type: string
    description: "Allowed SIP user authenticated for DoorBird"

  - id: sip_anc
    type: integer
    range: "0..1"
    description: "Acoustic noise cancellation (default 1)"

  - id: sip_ring_time_limit
    type: integer
    range: "10..300"
    description: "Max ringing time seconds (default 300)"

  - id: sip_call_time_limit
    type: integer
    range: "30..300"
    description: "Max call duration seconds (default 300)"
```

## Events
```yaml
events:
  - id: udp_event_broadcast
    description: "ChaCha20-Poly1305 encrypted UDP broadcast on ports 6524 and 35344 after doorbell/motion event"
    payload_fields:
      - INTERCOM_ID: "6-byte string - first 6 chars of username"
      - EVENT: "8-byte string - doorbell number or 'motion', space-padded"
      - TIMESTAMP: "4-byte long - Unix timestamp"
    decryption:
      ident: "0xDE 0xAD 0xBE"
      version: "0x02 (ChaCha20-Poly1305)"
      key_source: "NOTIFICATION_ENCRYPTION_KEY from getsession.cgi (first 32 bytes used)"
    notes: "v1 (Argon2i, 0x01) deprecated; keep-alive packets every 7 s are not events"
```

## Macros
```yaml
# No explicit multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - open_door  # energizes door-opener relay (physical door release)
  - restart    # reboots device
interlocks: []
# UNRESOLVED: source states no explicit interlock procedures. Door-relay release is
# safety-relevant; concrete interlock sequence not documented - do not infer.
```

## Notes
- Door-relay and light-relay requests return HTTP 204 if user lacks "watch always" permission and no ring event in the past 5 minutes.
- Live video/image/audio connections can be interrupted at any time by the official DoorBird App (it has precedence).
- RTSP and HTTPS not simultaneously available for streaming; obtain a session ID via `getsession.cgi` for encrypted streaming auth.
- SIP: device closes any ongoing SIP connection if the official DoorBird App issues a listen/talk request.
- Audio requires client-side AEC/ANR; DoorBird's native AEC/ANR is not exposed to third parties.
- Firmware examples in source reference D101 / D21x; A1103 White Edition-specific firmware range not stated.

<!-- UNRESOLVED: firmware version compatibility for A1103 White Edition not stated -->
<!-- UNRESOLVED: default device-rtsp-port placeholder value not stated (uses <device-rtsp-port>) -->
<!-- UNRESOLVED: voltage/current/power specs not stated in source -->
````

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/en/api
retrieved_at: 2026-07-14T07:27:17.045Z
last_checked_at: 2026-07-21T21:56:54.477Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:56:54.477Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions have literal command matches in source; transport parameters verified; comprehensive coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware version for the A1103 White Edition is not stated in the source (firmware examples reference D101/D21x)."
- "source states no explicit interlock procedures. Door-relay release is"
- "firmware version compatibility for A1103 White Edition not stated"
- "default device-rtsp-port placeholder value not stated (uses <device-rtsp-port>)"
- "voltage/current/power specs not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
