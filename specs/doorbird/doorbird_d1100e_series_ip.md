---
spec_id: admin/doorbird-d1100e_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D1100E Series Control Spec"
manufacturer: Doorbird
model_family: D1100E
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - D1100E
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-04-30T04:32:18.464Z
last_checked_at: 2026-04-23T05:36:45.652Z
generated_at: 2026-04-23T05:36:45.652Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T05:36:45.652Z
  matched_actions: 24
  action_count: 24
  confidence: high
  summary: "Every spec action matched a literal CGI endpoint in the source, transport verified, full API coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D1100E Series Control Spec

## Summary
The Doorbird D1100E Series is an IP video door station with HTTP-based LAN API control. The device supports HTTP/HTTPS on ports 80/443, UDP event broadcasts on ports 6524/35344, RTSP streaming on port 554 (with RTSP-over-HTTP on 8557), and SIP telephony on port 5060. Authentication uses Basic/Digest auth or plaintext HTTP credentials.

<!-- UNRESOLVED: RTSP-over-HTTP port 8557 stated for RTSP-over-HTTP; main RTSP port 554 explicitly stated -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - udp
addressing:
  port: 80
  alt_port: 443
  # UNRESOLVED: RTSP primary port not stated; RTSP-over-HTTP port 8557 stated
  # UNRESOLVED: SIP port 5060 stated for device-side SIP; verify if this is device listening port
auth:
  type: basic_digest  # stated: Basic or Digest authentication per RFC 2617
  # UNRESOLVED: plaintext auth is insecure alternative; credentials not stated
```

## Traits
```yaml
# UNRESOLVED: powerable - no power on/off commands found in source
- queryable  # inferred from info.cgi, sip.cgi?action=status, monitor.cgi
- levelable  # inferred from mic_volume, spk_volume in SIP settings
```

## Actions
```yaml
- id: open_door
  label: Open Door
  kind: action
  params:
    - name: relay
      type: string
      description: "Relay to trigger (optional). Format: <doorcontrollerID>@<relay>, e.g. '1' or 'gggaaa@1'. Defaults to physical relay 1."

- id: light_on
  label: Light On
  kind: action
  params: []

- id: get_live_image
  label: Get Live Image
  kind: query
  params: []

- id: get_live_video
  label: Get Live Video (MJPG)
  kind: query
  params: []

- id: get_history_image
  label: Get History Image
  kind: query
  params:
    - name: index
      type: integer
      description: "Index of history image (1..50), where 1 is latest"
    - name: event
      type: string
      description: "Event type: 'doorbell' or 'motionsensor' (optional)"

- id: monitor_events
  label: Monitor Events
  kind: query
  params:
    - name: ring
      type: string
      description: "Event types to monitor: 'doorbell', 'motionsensor', or both"

- id: get_live_audio
  label: Get Live Audio (G.711 μ-law)
  kind: query
  params: []

- id: transmit_audio
  label: Transmit Audio (G.711 μ-law)
  kind: action
  params: []

- id: get_info
  label: Get Device Info
  kind: query
  params: []

- id: list_favorites
  label: List Favorites
  kind: query
  params: []

- id: save_favorite
  label: Add/Change Favorite
  kind: action
  params:
    - name: action
      type: string
      description: "Fixed value: 'save'"
    - name: type
      type: string
      description: "'sip' or 'http'"
    - name: title
      type: string
      description: "Name/title of favorite"
    - name: value
      type: string
      description: "URL or SIP address"
    - name: id
      type: integer
      description: "Optional: ID of existing favorite to change"

- id: delete_favorite
  label: Delete Favorite
  kind: action
  params:
    - name: action
      type: string
      description: "Fixed value: 'remove'"
    - name: type
      type: string
      description: "'sip' or 'http'"
    - name: id
      type: integer
      description: "ID of favorite to delete"

- id: list_schedules
  label: List Schedules
  kind: query
  params: []

- id: save_schedule
  label: Add/Update Schedule
  kind: action
  params:
    - name: input
      type: string
      description: "Input event type: 'doorbell', 'motion', 'rfid', 'fingerprint'"
    - name: param
      type: string
      description: "Parameter for input (doorbell number, transponder ID, fingerprint ID)"
    - name: output
      type: array
      description: "JSON array of output action configurations"

- id: delete_schedule
  label: Delete Schedule
  kind: action
  params:
    - name: action
      type: string
      description: "Fixed value: 'remove'"
    - name: input
      type: string
      description: "Input event type"
    - name: param
      type: string
      description: "Schedule ID to delete"

- id: restart_device
  label: Restart Device
  kind: action
  params: []

- id: sip_registration
  label: SIP Registration
  kind: action
  params:
    - name: user
      type: string
      description: "SIP proxy authentication user"
    - name: password
      type: string
      description: "SIP proxy authentication password"
    - name: url
      type: string
      description: "SIP proxy IP/hostname"

- id: sip_makecall
  label: SIP Make Call
  kind: action
  params:
    - name: url
      type: string
      description: "SIP URL to call"

- id: sip_hangup
  label: SIP Hangup
  kind: action
  params: []

- id: sip_settings
  label: SIP Settings
  kind: action
  params:
    - name: enable
      type: integer
      description: "0..1 Enable/disable SIP registration after reboot"
    - name: mic_volume
      type: integer
      description: "1..100 Microphone volume"
    - name: spk_volume
      type: integer
      description: "1..100 Speaker volume"
    - name: dtmf
      type: integer
      description: "0..1 Enable/disable DTMF support"
    - name: relay1_passcode
      type: integer
      description: "0..99999999 Pincode for door open relay"
    - name: incoming_call_enable
      type: integer
      description: "0..1 Enable/disable incoming calls"
    - name: incoming_call_user
      type: string
      description: "Allowed SIP user"
    - name: anc
      type: integer
      description: "0..1 Enable/disable acoustic noise cancellation"
    - name: ring_time_limit
      type: integer
      description: "10..300 Maximum ringing time in seconds"
    - name: call_time_limit
      type: integer
      description: "30..300 Maximum call duration in seconds"

- id: sip_status
  label: SIP Status
  kind: query
  params: []

- id: sip_reset
  label: SIP Reset
  kind: action
  params: []

- id: create_session
  label: Create Session (getsession.cgi)
  kind: action
  params: []

- id: invalidate_session
  label: Invalidate Session
  kind: action
  params:
    - name: invalidate
      type: string
      description: "Session ID to invalidate"
```

## Feedbacks
```yaml
- id: http_response_codes
  type: enum
  values: [200, 204, 400, 401, 423, 500, 503, 507]
  description: "HTTP status codes returned by API"

- id: door_open_response
  type: object
  fields:
    - RETURNCODE
    - SESSIONID
    - NOTIFICATION_ENCRYPTION_KEY

- id: device_info
  type: object
  fields:
    - FIRMWARE
    - BUILD_NUMBER
    - PRIMARY_MAC_ADDR
    - RELAYS
    - DEVICE-TYPE

- id: sip_status_response
  type: object
  fields:
    - LASTERRORCODE
    - LASTERRORTEXT

- id: monitor_event
  type: enum
  values: [doorbell, motionsensor]
  description: "Event types from monitor stream"

- id: rtsp_stream
  type: binary
  description: "MPEG4 H.264 RTSP stream"

- id: mjpg_stream
  type: binary
  description: "Multipart JPEG live video stream"
```

## Variables
```yaml
# UNRESOLVED: No discrete settable parameters found outside of SIP settings and schedules
```

## Events
```yaml
- id: doorbell_event
  type: object
  fields:
    - INTERCOM_ID
    - EVENT
    - TIMESTAMP
  description: "UDP broadcast event for doorbell trigger"

- id: motion_event
  type: object
  fields:
    - INTERCOM_ID
    - EVENT
    - TIMESTAMP
  description: "UDP broadcast event for motion sensor trigger"
```

## Macros
```yaml
# UNRESOLVED: No explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: No explicit safety warnings or interlock procedures in source
```

## Notes
- API rate limit: 1 concurrent connection per second for API access
- Auth failure blocking: IP or user blocked for 1 minute after extensive wrong credentials (HTTP 423)
- Video/audio call limit: Only 1 simultaneous A/V call; returns 503 (Busy) when busy
- Session ID validity: 10 minutes
- Firmware requirement for schedules/favorites: 000110 or higher
- RTSP authentication: Standard RTSP auth (no HTTP parameter auth for RTSP)
- SIP call auto-termination: 180 seconds after initiation
- SIP minimum request interval: 3 seconds between requests
- Audio codec for API: G.711 μ-law (8000 Hz sampling)
- UDP event broadcast ports: 6524 and 35344
- Keep-alive UDP broadcasts every 7 seconds (can be ignored for decryption)
- ChaCha20-Poly1305 encryption for UDP events v2
- Video stream precedence: Official DoorBird App takes precedence over LAN API users
- Audio AEC/ANR: Client must implement echo cancellation (device AEC not available to third parties)
<!-- UNRESOLVED: Voltage/current/power specifications not stated in source -->
<!-- UNRESOLVED: Fault behavior and error recovery sequences not documented -->
<!-- UNRESOLVED: Firmware version compatibility ranges not stated beyond specific feature minimums -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-04-30T04:32:18.464Z
last_checked_at: 2026-04-23T05:36:45.652Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T05:36:45.652Z
matched_actions: 24
action_count: 24
confidence: high
summary: "Every spec action matched a literal CGI endpoint in the source, transport verified, full API coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
