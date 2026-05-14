---
spec_id: admin/doorbird-d1101kv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D1101KV Control Spec"
manufacturer: Doorbird
model_family: "DoorBird D1101KV"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "DoorBird D1101KV"
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
last_checked_at: 2026-04-23T05:36:49.936Z
generated_at: 2026-04-23T05:36:49.936Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T05:36:49.936Z
  matched_actions: 24
  action_count: 24
  confidence: high
  summary: "All 24 spec actions matched verbatim in source HTTP CGI endpoints with correct transport parameters and authentication methods."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D1101KV Control Spec

## Summary
The DoorBird D1101KV is a LAN-2-LAN IP video door station supporting HTTP/HTTPS control on ports 80/443, RTSP video streaming on port 554, SIP VoIP on port 5060, and UDP event broadcasts on ports 6524/35344. Authentication uses Basic/Digest HTTP auth or plaintext http-user/http-password parameters.

<!-- UNRESOLVED: serial/RS-232 interface not supported per source — device is IP-only -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  port: 80
  secondary_ports:
    - 443  # HTTPS (self-signed certificate)
    - 554  # RTSP
    - 8557  # RTSP-over-HTTP
    - 5060  # SIP
    - 6524  # UDP event broadcasts (v2)
    - 35344  # UDP event broadcasts (v2, keep-alive every 7s)
auth:
  type: basic_digest  # Basic or Digest auth per RFC 2617
  alternative: http_user_parameter  # plaintext http-user/http-password (insecure)
```

## Traits
```yaml
- powerable       # restart.cgi present
- queryable       # info.cgi, sip.cgi?action=status present
```

## Actions
```yaml
- id: get_live_video
  label: Get Live Video
  kind: action
  params: []

- id: get_live_image
  label: Get Live Image
  kind: action
  params: []

- id: open_door
  label: Open Door
  kind: action
  params:
    - name: relay
      type: string
      description: Relay identifier (optional; omit for relay 1; format doorcontrollerID@relay)

- id: light_on
  label: Light On
  kind: action
  params: []

- id: get_history_image
  label: Get History Image
  kind: action
  params:
    - name: index
      type: integer
      description: History image index (1 = latest, range 1-50)
    - name: event
      type: string
      description: Event type (doorbell or motionsensor)

- id: monitor_events
  label: Monitor Events
  kind: action
  params:
    - name: ring
      type: string
      description: Event types to monitor (doorbell,motionsensor)

- id: receive_audio
  label: Receive Live Audio
  kind: action
  params: []

- id: transmit_audio
  label: Transmit Live Audio
  kind: action
  params: []

- id: get_device_info
  label: Get Device Info
  kind: action
  params: []

- id: list_favorites
  label: List Favorites
  kind: action
  params: []

- id: save_favorite
  label: Add or Change Favorite
  kind: action
  params:
    - name: action
      type: string
      description: Must be "save"
    - name: type
      type: string
      description: sip or http
    - name: title
      type: string
      description: Name/title of the favorite
    - name: value
      type: string
      description: URL or SIP address
    - name: id
      type: integer
      description: Optional; ID of existing favorite to change

- id: delete_favorite
  label: Delete Favorite
  kind: action
  params:
    - name: action
      type: string
      description: Must be "remove"
    - name: type
      type: string
      description: sip or http
    - name: id
      type: integer
      description: ID of the favorite to delete

- id: list_schedules
  label: List Schedules
  kind: action
  params: []

- id: save_schedule
  label: Add or Update Schedule
  kind: action
  params:
    - name: input
      type: string
      description: Input event type (doorbell, motion, rfid, fingerprint)
    - name: param
      type: string
      description: Parameter for input (doorbell number, transponder id, etc.)
    - name: output
      type: string
      description: JSON output configuration array

- id: delete_schedule
  label: Delete Schedule
  kind: action
  params:
    - name: action
      type: string
      description: Must be "remove"
    - name: input
      type: string
      description: Input event type
    - name: param
      type: string
      description: Event parameter

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
      description: Must be "registration"
    - name: user
      type: string
      description: SIP proxy authentication user
    - name: password
      type: string
      description: SIP proxy authentication password
    - name: url
      type: string
      description: SIP proxy IP or hostname

- id: sip_makecall
  label: SIP Make Call
  kind: action
  params:
    - name: action
      type: string
      description: Must be "makecall"
    - name: url
      type: string
      description: SIP URL to call

- id: sip_hangup
  label: SIP Hangup
  kind: action
  params:
    - name: action
      type: string
      description: Must be "hangup"

- id: sip_settings
  label: SIP Settings
  kind: action
  params:
    - name: action
      type: string
      description: Must be "settings"
    - name: enable
      type: integer
      description: Enable/disable SIP (0..1)
    - name: mic_volume
      type: integer
      description: Microphone volume (1..100)
    - name: spk_volume
      type: integer
      description: Speaker volume (1..100)
    - name: dtmf
      type: integer
      description: DTMF support (0..1)
    - name: relay1_passcode
      type: integer
      description: Pincode for door open relay (0..99999999)
    - name: incoming_call_enable
      type: integer
      description: Incoming calls (0..1)
    - name: incoming_call_user
      type: string
      description: Allowed SIP user
    - name: anc
      type: integer
      description: Acoustic noise cancellation (0..1)
    - name: ring_time_limit
      type: integer
      description: Max ringing time in seconds (10..300)
    - name: call_time_limit
      type: integer
      description: Max call duration in seconds (30..300)

- id: sip_status
  label: SIP Status
  kind: action
  params:
    - name: action
      type: string
      description: Must be "status"

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  params:
    - name: action
      type: string
      description: Must be "reset"

- id: get_session
  label: Get Session ID
  kind: action
  params: []

- id: invalidate_session
  label: Invalidate Session ID
  kind: action
  params:
    - name: invalidate
      type: string
      description: Session ID to invalidate
```

## Feedbacks
```yaml
- id: live_video_stream
  type: binary
  description: Multipart JPEG MJPG video stream (8 fps max, content-type multipart/x-mixed-replace)

- id: live_image
  type: binary
  description: JPEG image (content-type image/jpeg)

- id: history_image
  type: binary
  description: JPEG history image (content-type image/jpeg)

- id: audio_stream
  type: binary
  description: G.711 μ-law audio stream (8000 Hz sampling)

- id: monitor_state
  type: string
  description: Doorbell/motionsensor state (H/L values via multipart stream)

- id: device_info
  type: json
  description: Device version info including firmware, build number, MAC address, relays, device type

- id: favorites_list
  type: json
  description: JSON object containing sip and http favorites

- id: schedule_list
  type: json
  description: JSON array of schedule entries

- id: sip_status
  type: json
  description: JSON with LASTERRORCODE and LASTERRORTEXT fields

- id: session_info
  type: json
  description: JSON containing SESSIONID and NOTIFICATION_ENCRYPTION_KEY

- id: open_door_response
  type: json
  description: JSON acknowledgement for door open command

- id: light_on_response
  type: json
  description: JSON acknowledgement for light on command
```

## Variables
```yaml
# UNRESOLVED: device state parameters exposed as settable variables not enumerated in source
# SIP settings (mic_volume, spk_volume, etc.) could be mapped here but source does not list GET-able params
```

## Events
```yaml
- id: doorbell_event
  description: Doorbell press detected via UDP broadcast (v2 ChaCha20-Poly1305 encrypted)
  fields:
    - intercom_id: string  # First 6 chars of user name
    - event: string  # e.g. "1 " (doorbell number, padded)
    - timestamp: unix_timestamp

- id: motion_event
  description: Motion sensor triggered via UDP broadcast (v2 ChaCha20-Poly1305 encrypted)
  fields:
    - intercom_id: string
    - event: string  # "motion"
    - timestamp: unix_timestamp

# UNRESOLVED: rfid and keypad events mentioned as "coming soon" - not active in source
```

## Macros
```yaml
# UNRESOLVED: multi-step sequences not explicitly defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures stated in source
# Note: SIP calls auto-terminate after 180 seconds (security auto-hangup) per source
# Note: Audio AEC/ANC must be implemented client-side per source
```

## Notes
- Device accepts up to 1 concurrent API connection per second; excessive wrong auth blocks IP for 1 minute (HTTP 423)
- Live video/audio may be interrupted when official DoorBird App takes priority
- RTSP stream may be interrupted when official DoorBird App takes priority
- SIP calls limited to 1 simultaneous; auto-hangup at 180 seconds
- UDP broadcasts sent every 7 seconds (keep-alive) on ports 6524 and 35344
- Firmware 000110+ required for favorites and schedules API
- Video/audio streaming not available over HTTPS in LAN — requires session ID workaround
- Certificate authorities do not issue certs for IP addresses; device uses self-signed certificate for HTTPS
- SIP proxy port can be overridden with colon notation (e.g. 10.11.12.13:9999)

<!-- UNRESOLVED: voltage/current/power specifications not provided in source -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not detailed in source -->
<!-- UNRESOLVED: exact firmware version compatibility range not stated -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-04-30T04:32:18.464Z
last_checked_at: 2026-04-23T05:36:49.936Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T05:36:49.936Z
matched_actions: 24
action_count: 24
confidence: high
summary: "All 24 spec actions matched verbatim in source HTTP CGI endpoints with correct transport parameters and authentication methods."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
