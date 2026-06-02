---
spec_id: admin/doorbird-d2111v
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2111V Control Spec"
manufacturer: Doorbird
model_family: "Doorbird D2111V"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "Doorbird D2111V"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-05-13T00:49:07.900Z
last_checked_at: 2026-05-14T05:46:50.519Z
generated_at: 2026-05-14T05:46:50.519Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 serial control not documented in source"
  - "HTTPS certificate validation details not stated"
  - "populate from source if present"
  - "populate from source if explicit safety warnings exist"
  - "RS-232 serial protocol not documented in source"
  - "factory reset procedure not documented in source"
  - "firmware version compatibility not stated (only specific examples: 000096, 000099, 000108, 000109, 000110, 000129)"
verification:
  verdict: verified
  checked_at: 2026-05-14T05:46:50.519Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions found in source with matching endpoints; transport parameters and auth fully verified in source; no fabrications detected. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D2111V Control Spec

## Summary
Video door station with HTTP REST API for local LAN integration. Supports live video/audio streaming, door relay control, light control, motion/doorbell event monitoring, SIP VoIP, and schedule-based automation. Control via HTTP CGI endpoints on TCP 80 (HTTP) or TCP 443 (HTTPS). Event notifications via UDP broadcasts on ports 6524/35344.

<!-- UNRESOLVED: RS-232 serial control not documented in source -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - udp
addressing:
  port: 80
  https_port: 443
  rtsp_port: 554
  rtsp_http_port: 8557
  sip_port: 5060
  udp_ports:
    - 6524
    - 35344
base_url: http://<device-ip>/bha-api/
auth:
  type: basic  # Basic or Digest auth per RFC 2617
  # Alternative: http-user/http-password query params (insecure)
  # UNRESOLVED: HTTPS certificate validation details not stated
```

## Traits
```yaml
- queryable       # info.cgi, sip.cgi?action=status
- levelable       # mic_volume, spk_volume, relay1_passcode
- routable        # input/output routing via schedules (doorbell, motion, rfid, fingerprint events)
```

## Actions
```yaml
- id: open_door
  label: Open Door
  kind: action
  params:
    - name: r
      type: string
      description: "Relay to trigger. Format '1' or '2' for physical relays, 'doorcontrollerID@relay' for paired IP I/O DoorController. Default: relay1"

- id: light_on
  label: Light On
  kind: action
  params: []

- id: video_stream
  label: Live Video Stream (MJPG)
  kind: action
  params: []
  description: "Returns multipart JPEG live video stream (up to 8 fps). Content-Type: multipart/x-mixed-replace. Permission: watch always or ring event within 5 minutes."

- id: audio_receive
  label: Live Audio Receive
  kind: action
  params: []
  description: "GET real-time audio G.711 μ-law (8000 Hz) from device. Permission: watch always or ring event within 5 minutes."

- id: audio_transmit
  label: Live Audio Transmit
  kind: action
  params: []
  description: "POST G.711 μ-law audio (8000 Hz) to device. Only one consumer can transmit at a time. Permission: watch always or ring event within 5 minutes. Client must perform AEC/ANR."

- id: get_live_image
  label: Get Live Image
  kind: action
  params: []

- id: get_history_image
  label: Get History Image
  kind: action
  params:
    - name: index
      type: integer
      description: "History index 1..50, where 1 is latest"
    - name: event
      type: string
      description: "doorbell or motionsensor"

- id: monitor_events
  label: Monitor Events
  kind: action
  params:
    - name: ring
      type: string
      description: "doorbell,motionsensor"
  description: "Returns continuous multipart stream of doorbell and motionsensor states. States: H (high/active), L (low/inactive). Up to 8 concurrent streams allowed."

- id: get_info
  label: Get Device Info
  kind: action
  params: []

- id: get_session
  label: Get Session ID
  kind: action
  params:
    - name: invalidate
      type: string
      description: "Session ID to invalidate (optional)"

- id: list_favorites
  label: List Favorites
  kind: action
  params: []

- id: save_favorite
  label: Save Favorite
  kind: action
  params:
    - name: action
      type: string
      const: save
    - name: type
      type: string
      description: "sip or http"
    - name: title
      type: string
    - name: value
      type: string
      description: "URL or SIP target"
    - name: id
      type: integer
      description: "Optional: ID of existing favorite to change"

- id: delete_favorite
  label: Delete Favorite
  kind: action
  params:
    - name: action
      type: string
      const: remove
    - name: type
      type: string
    - name: id
      type: integer

- id: list_schedules
  label: List Schedules
  kind: action
  params: []

- id: save_schedule
  label: Save Schedule
  kind: action
  params:
    - name: input
      type: string
      description: "doorbell, motion, rfid, or fingerprint"
    - name: param
      type: string
      description: "Doorbell number, transponder ID, or fingerprint ID"
    - name: output
      type: array
      description: "JSON array of output action configurations"

- id: delete_schedule
  label: Delete Schedule
  kind: action
  params:
    - name: action
      type: string
      const: remove
    - name: input
      type: string
    - name: param
      type: string

- id: restart_device
  label: Restart Device
  kind: action
  params: []

- id: sip_registration
  label: SIP Registration
  kind: action
  params:
    - name: action
      type: string
      const: registration
    - name: user
      type: string
    - name: password
      type: string
    - name: url
      type: string
      description: "SIP Proxy IP/hostname"

- id: sip_make_call
  label: SIP Make Call
  kind: action
  params:
    - name: action
      type: string
      const: makecall
    - name: url
      type: string
      description: "SIP URL to call"

- id: sip_hangup
  label: SIP Hangup
  kind: action
  params:
    - name: action
      type: string
      const: hangup

- id: sip_settings
  label: SIP Settings
  kind: action
  params:
    - name: action
      type: string
      const: settings
    - name: enable
      type: integer
      description: "0 or 1"
    - name: mic_volume
      type: integer
      description: "1..100"
    - name: spk_volume
      type: integer
      description: "1..100"
    - name: dtmf
      type: integer
      description: "0 or 1"
    - name: relay1_passcode
      type: integer
      description: "0..99999999"
    - name: incoming_call_enable
      type: integer
      description: "0 or 1"
    - name: incoming_call_user
      type: string
    - name: anc
      type: integer
      description: "0 or 1"
    - name: ring_time_limit
      type: integer
      description: "10..300 seconds"
    - name: call_time_limit
      type: integer
      description: "30..300 seconds"

- id: sip_status
  label: SIP Status
  kind: action
  params:
    - name: action
      type: string
      const: status

- id: sip_reset
  label: SIP Reset
  kind: action
  params:
    - name: action
      type: string
      const: reset
```

## Feedbacks
```yaml
- id: doorbell_event
  type: string
  description: "doorbell state: H (high/active) or L (low/inactive)"

- id: motion_sensor_event
  type: string
  description: "motionsensor state: H or L"

- id: sip_last_error
  type: object
  properties:
    - LASTERRORCODE
    - LASTERRORTEXT

- id: device_info
  type: object
  properties:
    - FIRMWARE
    - BUILD_NUMBER
    - PRIMARY_MAC_ADDR
    - RELAYS
    - DEVICE-TYPE

- id: session_id
  type: string
  description: "Temporary session ID valid 10 minutes"

- id: notification_encryption_key
  type: string
  description: "32-64 byte key for decrypting UDP event broadcasts"
```

## Variables
```yaml
- id: mic_volume
  type: integer
  range: [1, 100]
  default: 33

- id: spk_volume
  type: integer
  range: [1, 100]
  default: 70

- id: dtmf_enabled
  type: boolean
  default: false

- id: relay1_passcode
  type: integer
  range: [0, 99999999]

- id: anc_enabled
  type: boolean
  default: true

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
# UDP broadcast events (ChaCha20-Poly1305 encrypted v2)
# Ports: 6524, 35344
# Keep-alive packets every 7 seconds - skip these
- id: doorbell_ring
  fields:
    - INTERCOM_ID      # First 6 chars of username
    - EVENT            # "doorbell" or "motion"
    - TIMESTAMP        # Unix timestamp

- id: motion_detected
  fields:
    - INTERCOM_ID
    - EVENT
    - TIMESTAMP
```

## Macros
```yaml
# No explicit multi-step macros in source
# UNRESOLVED: populate from source if present
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: populate from source if explicit safety warnings exist
```

## Notes
- Rate limit: 1 concurrent API connection per second; 423 response after wrong auth; 503 when line busy
- UDP event monitoring requires ChaCha20-Poly1305 decryption (libsodium); session key from getsession.cgi
- Audio codec: G.711 μ-law only (8000 Hz); client must handle AEC/ANR
- Video streaming: MJPG via HTTP (up to 8 fps) or MPEG4 H.264 via RTSP (up to 12 fps)
- SIP call auto-terminates after 180 seconds; P2P mode available from firmware 000099
- Live stream permission: "watch always" or ring event within 5 minutes (doorbell/video) / 1 minute (image)
- Video/audio stream precedence: official DoorBird App takes priority over LAN API
- HTTPS uses self-signed certificate; CA does not issue certs for IP addresses
- Session ID for video/audio streaming: obtain via getsession.cgi, append as parameter to avoid plaintext credentials
- SIP permissions: requires "API-Operator" permission for makecall/settings/registration
- Monitor stream: up to 8 concurrent streams; returns HTTP 509 when all busy
- RTSP paths: /mpeg/media.amp (default), /mpeg/720p/media.amp (firmware 129+, D21x), /mpeg/1080p/media.amp (D11x only)
- SIP: 1 simultaneous call; DTMF can trigger relay1_passcode; 3 second minimum between SIP requests
- Permissions model: watch always, history, motion, API-Operator (managed via DoorBird App Administration)
<!-- UNRESOLVED: RS-232 serial protocol not documented in source -->
<!-- UNRESOLVED: factory reset procedure not documented in source -->
<!-- UNRESOLVED: firmware version compatibility not stated (only specific examples: 000096, 000099, 000108, 000109, 000110, 000129) -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-05-13T00:49:07.900Z
last_checked_at: 2026-05-14T05:46:50.519Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T05:46:50.519Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions found in source with matching endpoints; transport parameters and auth fully verified in source; no fabrications detected. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 serial control not documented in source"
- "HTTPS certificate validation details not stated"
- "populate from source if present"
- "populate from source if explicit safety warnings exist"
- "RS-232 serial protocol not documented in source"
- "factory reset procedure not documented in source"
- "firmware version compatibility not stated (only specific examples: 000096, 000099, 000108, 000109, 000110, 000129)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
