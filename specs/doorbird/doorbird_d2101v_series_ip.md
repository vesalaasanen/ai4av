---
spec_id: admin/doorbird-d2101v-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird D2101V Series Control Spec"
manufacturer: DoorBird
model_family: "DoorBird D2101V Series"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "DoorBird D2101V Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-04-30T04:32:20.460Z
last_checked_at: 2026-06-02T21:41:34.687Z
generated_at: 2026-06-02T21:41:34.687Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility ranges (per-command minimums noted in source but no overall range for the D2101V Series specifically)"
  - "no multi-step macro sequences documented in source."
  - "no voltage / current / power sequencing requirements stated in source."
  - "Source does not explicitly call out \"D2101V\" by model name — refined doc covers the general LAN-2-LAN API for \"DoorBird and BirdGuard\" with examples referencing D101/D21x/D10x/D11x. D2101V firmware version range, supported video resolutions specific to D2101V, and any D2101V-specific endpoints (vs. D11x or D10x) are UNRESOLVED."
  - "Voltage, current, power consumption, fault-recovery sequences not in source."
  - "No explicit timeouts for HTTP keep-alive, monitor.cgi stream maximum duration, or session retry behavior."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:34.687Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions verified as literal matches in source; all transport parameters (HTTP/HTTPS 80/443, RTSP 554/8557, SIP 5060, UDP 6524/35344) confirmed. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# DoorBird D2101V Series Control Spec

## Summary
DoorBird D2101V Series IP Video Door Station. LAN-2-LAN HTTP/HTTPS API on TCP 80/443 (`/bha-api/`) for door control, live image/video, audio receive/transmit, history, favorites, schedules, SIP control. RTSP video on TCP 554 and 8557. Encrypted event monitoring via UDP broadcasts on ports 6524 and 35344.

<!-- UNRESOLVED: firmware version compatibility ranges (per-command minimums noted in source but no overall range for the D2101V Series specifically) -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - udp
addressing:
  base_url: "http://<device-ip>/bha-api/"
  port: 80
  https_port: 443
  rtsp_port: 554
  rtsp_over_http_port: 8557
  sip_port: 5060
  udp_event_ports: [6524, 35344]
auth:
  type: basic_or_digest  # RFC 2617; alternative plaintext params http-user/http-password supported
  rate_limit: "1 concurrent connection per second; IP/user locked 1 minute on extensive bad credentials (HTTP 423)"
```

## Traits
```yaml
- powerable     # inferred from restart.cgi command
- queryable     # inferred from info.cgi, sip.cgi?action=status, schedule.cgi GET, favorites.cgi GET
- routable      # inferred from open-door.cgi r=<relay> parameter
- streamable    # inferred from video.cgi, audio-receive.cgi, audio-transmit.cgi, RTSP endpoints
```

## Actions
```yaml
- id: get_session
  label: Create Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi"
  params: []
  notes: "Returns SESSIONID (10-minute validity) and NOTIFICATION_ENCRYPTION_KEY (32-64 bytes, ChaCha20 uses first 32). Requires valid user."

- id: invalidate_session
  label: Invalidate Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate={session_id}"
  params:
    - name: session_id
      type: string
      description: Existing session-id to invalidate

- id: live_video_stream
  label: Live Video MJPEG Stream
  kind: action
  command: "GET /bha-api/video.cgi"
  params: []
  notes: "Multipart MJPEG, up to 8 fps. 204 if no permission. Optional sessionid=<id> param for unencrypted credential-free streaming."

- id: live_image
  label: Live Image JPEG
  kind: query
  command: "GET /bha-api/image.cgi"
  params: []
  notes: "Single JPEG snapshot. 204 if no permission."

- id: open_door
  label: Open Door / Trigger Relay
  kind: action
  command: "GET /bha-api/open-door.cgi?r={relay}"
  params:
    - name: relay
      type: string
      description: Optional. "1" | "2" | "<doorcontrollerID>@<relay>" (e.g. "gggaaa@1"). Omit to trigger physical relay 1.
  notes: "Energize door opener/alarm output relay. 204 if no permission."

- id: light_on
  label: Light On
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []
  notes: "Energize light relay. 204 if no permission."

- id: history_image
  label: History Image Request
  kind: query
  command: "GET /bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: 1..50, where 1 is latest
    - name: event
      type: string
      description: "Optional. 'doorbell' | 'motionsensor'. Defaults to doorbell history."
  notes: "Returns cloud-stored JPEG. 204 if no permission."

- id: monitor_events
  label: Monitor Events Stream
  kind: query
  command: "GET /bha-api/monitor.cgi?ring={events}"
  params:
    - name: events
      type: string
      description: "Comma-separated. 'doorbell' and/or 'motionsensor'."
  notes: "Continuous multipart text stream of state changes (H/L). Max 8 concurrent streams; 509 when exhausted."

- id: audio_receive
  label: Live Audio Receive
  kind: action
  command: "GET /bha-api/audio-receive.cgi"
  params: []
  notes: "G.711 µ-law, 8000 Hz. 204 if no permission."

- id: audio_transmit
  label: Live Audio Transmit
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params:
    - name: body
      type: binary
      description: G.711 µ-law audio stream, Content-Type audio/basic
  notes: "Only one talker at a time. Client must implement AEC/ANR."

- id: info_query
  label: Device Info Query
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []
  notes: "JSON. Returns FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS[], DEVICE-TYPE. RELAYS field requires firmware 000108+."

- id: list_favorites
  label: List Favorites
  kind: query
  command: "GET /bha-api/favorites.cgi"
  params: []
  notes: "Requires API-Operator permission. JSON. Firmware 000110+."

- id: save_favorite
  label: Add/Change Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: type
      type: string
      description: "sip" | "http"
    - name: title
      type: string
      description: Name/short description
    - name: value
      type: string
      description: URL (http/https) or SIP target, may include credentials
    - name: id
      type: integer
      description: Optional. Omit to create new; provide to update existing.
  notes: "Response header 'favoriteid' returns new id on add. Type cannot be switched on update."

- id: remove_favorite
  label: Delete Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: type
      type: string
      description: "sip" | "http"
    - name: id
      type: integer
      description: ID of favorite to delete

- id: list_schedules
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []
  notes: "Requires API-Operator permission. JSON. Firmware 000110+."

- id: save_schedule
  label: Add/Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params:
    - name: body
      type: json
      description: 'JSON object {input, param, output:[{event, param, enabled, schedule:{once|from-to|weekdays}}]}. input: doorbell|motion|rfid|fingerprint. event: notify|sip|relay|http.'
  notes: "One request per input type. Time unit seconds; weekday starts Sunday 0:00; max 604799; start times multiples of 1800."

- id: remove_schedule
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: input
      type: string
      description: "doorbell" | "motion" | "rfid"
    - name: param
      type: string
      description: doorbell-number / transponder-id / fingerprint-id

- id: restart_device
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []
  notes: "No diagnostic sound after this restart. 503 if busy (firmware update)."

- id: sip_registration
  label: SIP Proxy Registration
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
  notes: "Requires API-Operator permission. Not required for P2P calls."

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: SIP URL to call (e.g. sip:108@192.168.123.22)
  notes: "Requires API-Operator permission. Auto-hangup after 180 seconds. One simultaneous SIP call only."

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params: []
  notes: "Requires API-Operator permission. 200 even when no call ongoing."

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&{param}={value}"
  params:
    - name: enable
      type: integer
      description: 0..1, default 0. Enable SIP after reboot.
    - name: mic_volume
      type: integer
      description: 1..100, default 33
    - name: spk_volume
      type: integer
      description: 1..100, default 70
    - name: dtmf
      type: integer
      description: 0..1, default 0
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED - use schedule.cgi. SIP URL or 'none'."
    - name: relay1_passcode
      type: integer
      description: 0..99999999, DTMF pincode for relay
    - name: incoming_call_enable
      type: integer
      description: 0..1, default 0
    - name: incoming_call_user
      type: string
      description: Allowed SIP user (e.g. sip:10.0.0.1:5060)
    - name: anc
      type: integer
      description: 0..1, default 1
    - name: ring_time_limit
      type: integer
      description: 10..300, default 300
    - name: call_time_limit
      type: integer
      description: 30..300, default 300
  notes: "Requires API-Operator permission. Parameters may be set individually."

- id: sip_status
  label: SIP Status Query
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  params: []
  notes: "Requires API-Operator permission. JSON with LASTERRORCODE/LASTERRORTEXT."

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  params: []
  notes: "Resets registration and settings (except license). Hangs up any ongoing call. Requires API-Operator permission."

- id: rtsp_stream_default
  label: RTSP Live Video (Default)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params: []
  notes: "MPEG4 H.264, up to 12 fps. Also reachable on TCP 8557 (RTSP-over-HTTP). Standard RTSP auth only."

- id: rtsp_stream_720p
  label: RTSP Live Video (720p)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/720p/media.amp"
  params: []
  notes: "Supported by D10x/D21x from firmware 129."

- id: rtsp_stream_1080p
  label: RTSP Live Video (1080p)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/1080p/media.amp"
  params: []
  notes: "Per source: supported by D11x only. Listed here verbatim from source."
```

## Feedbacks
```yaml
- id: session_id
  type: string
  source: "getsession.cgi BHA.SESSIONID"
  description: 10-minute valid session token

- id: notification_encryption_key
  type: string
  source: "getsession.cgi BHA.NOTIFICATION_ENCRYPTION_KEY"
  description: 32-64 byte key for ChaCha20-Poly1305 decryption of UDP events

- id: firmware_version
  type: string
  source: "info.cgi BHA.VERSION[0].FIRMWARE"
  description: e.g. "000109"

- id: build_number
  type: string
  source: "info.cgi BHA.VERSION[0].BUILD_NUMBER"

- id: primary_mac_addr
  type: string
  source: "info.cgi BHA.VERSION[0].PRIMARY_MAC_ADDR"
  description: Available from firmware 000108

- id: relays
  type: array
  source: "info.cgi BHA.VERSION[0].RELAYS"
  description: 'List of physical and paired controller relays, e.g. ["1", "2", "gggaaa@1", "gggaaa@2"]. Available from firmware 000108.'

- id: device_type
  type: string
  source: "info.cgi BHA.VERSION[0].DEVICE-TYPE"
  description: e.g. "DoorBird D101"

- id: monitor_doorbell_state
  type: enum
  values: [H, L]
  source: "monitor.cgi 'doorbell:H' / 'doorbell:L' multipart frame"

- id: monitor_motion_state
  type: enum
  values: [H, L]
  source: "monitor.cgi 'motionsensor:H' / 'motionsensor:L' multipart frame"

- id: sip_last_error_code
  type: string
  source: "sip.cgi?action=status LASTERRORCODE"
  description: '"200" indicates successful registration'

- id: sip_last_error_text
  type: string
  source: "sip.cgi?action=status LASTERRORTEXT"

- id: favorites_list
  type: object
  source: "favorites.cgi JSON response"
  description: "{sip: {id: {title, value}}, http: {id: {title, value}}}"

- id: schedules_list
  type: array
  source: "schedule.cgi JSON response"
  description: Array of schedule objects {input, param, output[]}
```

## Variables
```yaml
- id: sip_enable
  type: integer
  range: [0, 1]
  default: 0
  set_via: "sip.cgi?action=settings&enable=<v>"

- id: sip_mic_volume
  type: integer
  range: [1, 100]
  default: 33
  set_via: "sip.cgi?action=settings&mic_volume=<v>"

- id: sip_spk_volume
  type: integer
  range: [1, 100]
  default: 70
  set_via: "sip.cgi?action=settings&spk_volume=<v>"

- id: sip_dtmf
  type: integer
  range: [0, 1]
  default: 0
  set_via: "sip.cgi?action=settings&dtmf=<v>"

- id: sip_relay1_passcode
  type: integer
  range: [0, 99999999]
  set_via: "sip.cgi?action=settings&relay1_passcode=<v>"

- id: sip_incoming_call_enable
  type: integer
  range: [0, 1]
  default: 0
  set_via: "sip.cgi?action=settings&incoming_call_enable=<v>"

- id: sip_incoming_call_user
  type: string
  set_via: "sip.cgi?action=settings&incoming_call_user=<v>"

- id: sip_anc
  type: integer
  range: [0, 1]
  default: 1
  set_via: "sip.cgi?action=settings&anc=<v>"

- id: sip_ring_time_limit
  type: integer
  range: [10, 300]
  default: 300
  set_via: "sip.cgi?action=settings&ring_time_limit=<v>"

- id: sip_call_time_limit
  type: integer
  range: [30, 300]
  default: 300
  set_via: "sip.cgi?action=settings&call_time_limit=<v>"
```

## Events
```yaml
- id: udp_event_broadcast
  transport: UDP
  ports: [6524, 35344]
  description: "Encrypted event broadcasts sent for every user/connected device when an event occurs. Plus keep-alive broadcasts every 7 seconds (skip these)."
  packet_format:
    ident: "0xDE 0xAD 0xBE (3 bytes)"
    version: "0x02 (1 byte) - current; 0x01 deprecated (ChaCha20-Poly1305 with Argon2i)"
    nonce: "8 bytes (version 0x02)"
    ciphertext: "34 bytes (version 0x02), ChaCha20-Poly1305 encrypted"
  decrypted_payload:
    intercom_id: "6-byte string (first 6 chars of username)"
    event: "8-byte string, 'doorbell' or 'motion ' (space-padded); doorbell number for doorbell events"
    timestamp: "4-byte Unix timestamp (long)"
  algorithm: ChaCha20-Poly1305
  key_source: NOTIFICATION_ENCRYPTION_KEY from getsession.cgi (first 32 bytes used)
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - open_door
  - light_on
  - restart_device
  - sip_reset
interlocks:
  - "Open door / light / live audio-video require 'watch always' permission OR a ring event within the last 5 minutes (1 minute for live image); else HTTP 204."
  - "Favorites / schedules / SIP CGIs require 'API-Operator' permission; misuse can change global settings for other users."
  - "1 concurrent API connection per second; IP/user locked 1 minute on extensive wrong-credential use (HTTP 423)."
  - "Device handles only ONE simultaneous audio/video call; second consumer is rejected (HTTP 503)."
  - "Official DoorBird App has precedence and may interrupt any LANAPI video/audio/RTSP stream at any time."
  - "Each SIP call auto-hangs-up 180 seconds after initiation. Wait min 3 seconds between SIP requests."
# UNRESOLVED: no voltage / current / power sequencing requirements stated in source.
```

## Notes
- All HTTP paths under `/bha-api/`. HTTPS on TCP 443 uses pre-installed self-signed certificate (CAs do not issue for IP addresses); video/audio streaming endpoints are HTTP-only in LAN — use temporary `sessionid` parameter from `getsession.cgi` to avoid sending credentials in plaintext.
- Authentication: RFC 2617 Basic or Digest, OR plaintext `http-user` / `http-password` query parameters (less secure).
- HTTP status code semantics:
  - 200 OK
  - 204 No data / no permission for requested resource
  - 400 Parameter missing or invalid
  - 401 Authentication required
  - 423 Locked (1-minute lockout from credential abuse)
  - 503 Busy (line in use OR firmware update in progress)
  - 507 Size limit exceeded (favorites/schedules)
  - 509 Streams exhausted (monitor.cgi)
- Audio codec for HTTP audio: G.711 µ-law, 8000 Hz mono. Client MUST do AEC/ANR.
- Event monitoring v1 (ChaCha20-Poly1305 with Argon2i) is deprecated; integrators should use v2.
- Device discovery via Apple Bonjour `_http._tcp` mDNS.
- Schedule weekday time unit: seconds since Sunday 0:00 UTC, max 604799, start times multiples of 1800 (30-minute slices).
<!-- UNRESOLVED: Source does not explicitly call out "D2101V" by model name — refined doc covers the general LAN-2-LAN API for "DoorBird and BirdGuard" with examples referencing D101/D21x/D10x/D11x. D2101V firmware version range, supported video resolutions specific to D2101V, and any D2101V-specific endpoints (vs. D11x or D10x) are UNRESOLVED. -->
<!-- UNRESOLVED: Voltage, current, power consumption, fault-recovery sequences not in source. -->
<!-- UNRESOLVED: No explicit timeouts for HTTP keep-alive, monitor.cgi stream maximum duration, or session retry behavior. -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-04-30T04:32:20.460Z
last_checked_at: 2026-06-02T21:41:34.687Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:34.687Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions verified as literal matches in source; all transport parameters (HTTP/HTTPS 80/443, RTSP 554/8557, SIP 5060, UDP 6524/35344) confirmed. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility ranges (per-command minimums noted in source but no overall range for the D2101V Series specifically)"
- "no multi-step macro sequences documented in source."
- "no voltage / current / power sequencing requirements stated in source."
- "Source does not explicitly call out \"D2101V\" by model name — refined doc covers the general LAN-2-LAN API for \"DoorBird and BirdGuard\" with examples referencing D101/D21x/D10x/D11x. D2101V firmware version range, supported video resolutions specific to D2101V, and any D2101V-specific endpoints (vs. D11x or D10x) are UNRESOLVED."
- "Voltage, current, power consumption, fault-recovery sequences not in source."
- "No explicit timeouts for HTTP keep-alive, monitor.cgi stream maximum duration, or session retry behavior."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
