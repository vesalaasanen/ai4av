---
schema_version: ai4av-public-spec-v1
device_id: doorbird/d2116v
entity_id: doorbird_d2116v
spec_id: admin/doorbird-d2116v
revision: 1
author: admin
title: "Doorbird D2116V Control Spec"
status: published
manufacturer: Doorbird
manufacturer_key: doorbird
model_family: D2116V
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - D2116V
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://doorbird.com/downloads/api_lan.pdf
  - https://doorbird.com/api
  - https://doorbird.com/sip
  - https://doorbird.com/widget
  - https://doorbird.com/en/integrations
source_documents:
  - title: "Doorbird public source"
    url: https://doorbird.com/downloads/api_lan.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:20:34.453Z
  - title: "Doorbird public source"
    url: https://doorbird.com/api
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:20:34.937Z
  - title: "Doorbird public source"
    url: https://doorbird.com/sip
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:20:35.339Z
  - title: "Doorbird public source"
    url: https://doorbird.com/widget
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:20:35.696Z
  - title: "Doorbird public source"
    url: https://doorbird.com/en/integrations
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:20:36.152Z
retrieved_at: 2026-04-26T16:20:36.152Z
last_checked_at: 2026-04-23T06:41:18.279Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps:
  - rtsp-over-http:8557
  - 720p-variant
  - 1080p-variant
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T06:41:18.279Z
  matched_actions: 24
  action_count: 24
  confidence: high
  summary: "All 24 spec actions match source endpoints verbatim; transport parameters verified in source; spec fully represents command catalogue."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D2116V Control Spec

## Summary
The Doorbird D2116V is a video door station supporting HTTP control (ports 80/443), RTSP video streaming (port 554), SIP telephony (port 5060), and UDP event broadcasts (ports 6524/35344). Control is via REST-style CGI endpoints with Basic/Digest authentication or plaintext HTTP parameters.

<!-- UNRESOLVED: serial/RS-232 not mentioned in source; device may support RS-232 but it is not documented -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 80  # unencrypted HTTP
  # UNRESOLVED: port 443 stated for HTTPS but not listed separately; TLS cert is self-signed
base_url: http://<device-ip>/
auth:
  type: basic_digest  # Basic or Digest per RFC 2617, or plaintext http-user/http-password params
```

**Secondary transports (inferred from documented services):**
```yaml
# RTSP for video streaming (port stated in doc)
protocols:
  - tcp
addressing:
  port: 554
```

```yaml
# SIP for telephony
protocols:
  - tcp
addressing:
  port: 5060
```

```yaml
# UDP event broadcasts
protocols:
  - udp
addressing:
  port: 6524  # primary event broadcast
  # port 35344 also used for event broadcasts per source
```

## Traits
```yaml
# Inferred from command examples:
powerable: true      # restart.cgi present
routable: true       # SIP makecall, door open, light control
queryable: true      # info.cgi, sip.cgi?action=status, monitor.cgi
```

## Actions
```yaml
- id: open_door
  label: Open Door
  kind: action
  params:
    - name: r
      type: string
      description: "Door controller ID and relay, e.g. '1' or 'gggaaa@1'; defaults to physical relay 1"

- id: light_on
  label: Light On
  kind: action
  params: []

- id: restart
  label: Restart Device
  kind: action
  params: []

- id: get_session
  label: Get Session ID
  kind: action
  params: []

- id: invalidate_session
  label: Invalidate Session
  kind: action
  params:
    - name: invalidate
      type: string
      description: Session ID to invalidate

- id: get_live_video
  label: Get Live Video Stream
  kind: action
  params: []

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
      description: History image index (1 = latest, 1..50)
    - name: event
      type: string
      description: "Event type: doorbell or motionsensor"

- id: monitor
  label: Monitor Events
  kind: action
  params:
    - name: ring
      type: string
      description: "Event types to monitor: doorbell,motionsensor"

- id: audio_receive
  label: Receive Live Audio
  kind: action
  params: []

- id: audio_transmit
  label: Transmit Live Audio
  kind: action
  params: []

- id: get_info
  label: Get Device Info
  kind: action
  params: []

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
      description: Fixed value "save"
    - name: type
      type: string
      description: "sip or http"
    - name: title
      type: string
      description: Name/title of favorite
    - name: value
      type: string
      description: URL or SIP address
    - name: id
      type: integer
      description: Optional ID to update existing favorite

- id: delete_favorite
  label: Delete Favorite
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "remove"
    - name: type
      type: string
      description: "sip or http"
    - name: id
      type: integer
      description: ID of favorite to delete

- id: list_schedules
  label: List Schedules
  kind: action
  params: []

- id: save_schedule
  label: Save Schedule
  kind: action
  params: []

- id: delete_schedule
  label: Delete Schedule
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "remove"
    - name: input
      type: string
      description: "doorbell, motion, or rfid"
    - name: param
      type: string
      description: Doorbell number or transponder ID

- id: sip_register
  label: SIP Register
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "registration"
    - name: user
      type: string
      description: SIP proxy username
    - name: password
      type: string
      description: SIP proxy password
    - name: url
      type: string
      description: SIP proxy IP/hostname

- id: sip_makecall
  label: SIP Make Call
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "makecall"
    - name: url
      type: string
      description: SIP URL to call

- id: sip_hangup
  label: SIP Hangup
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "hangup"

- id: sip_settings
  label: SIP Settings
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "settings"
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
      description: SIP user allowed
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
      description: Fixed value "status"

- id: sip_reset
  label: SIP Reset
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "reset"
```

## Feedbacks
```yaml
- id: doorbell_state
  type: enum
  values: [H, L]
  description: Doorbell event state (high/low)

- id: motionsensor_state
  type: enum
  values: [H, L]
  description: Motion sensor event state (high/low)

- id: sip_registration_status
  type: enum
  values: ["200", other SIP codes]
  description: SIP registration status; "200" means registered

- id: device_info
  type: object
  description: Firmware version, build number, MAC address, relay config, device type

- id: session_id
  type: string
  description: Temporary session ID valid for 10 minutes

- id: notification_encryption_key
  type: string
  description: Key for decrypting UDP event broadcasts
```

## Variables
```yaml
# UNRESOLVED: variables not clearly distinguished from actions in source
# The info.cgi returns device state; sip.cgi?action=status returns SIP state
```

## Events
```yaml
# UDP event broadcasts on ports 6524 and 35344
# Encrypted with ChaCha20-Poly1305
# Fields: INTERCOM_ID (6 chars), EVENT (8 chars padded), TIMESTAMP (Unix)
#
# Event types (from CIPHERTEXT after decryption):
- id: doorbell_event
  type: string
  description: Doorbell trigger (e.g. "1 " for doorbell number 1)
- id: motion_event
  type: string
  description: Motion sensor trigger
# rfid and keypad events mentioned as coming soon
```

## Macros
```yaml
# Schedule entries tie input events (doorbell, motion) to output actions
# (HTTP notification, SIP call, relay trigger) with time window constraints
# UNRESOLVED: macro definitions not explicitly documented as reusable sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Video/audio streams can be interrupted by official DoorBird App requests"
    note: "Official App has precedence over LAN API users"
  - description: "Audio transmission requires AEC/ANR on client side"
    note: "Device echo cancellation does not cover the client-side device"
confirmation_required_for:
  - open_door  # User must watch live image before opening door
```

## Notes
- Rate limit: 1 concurrent API connection per second; excessive wrong auth blocks IP for 1 minute (HTTP 423)
- Device returns HTTP 503 (Busy) when call already in progress
- Session ID valid for 10 minutes; obtained via getsession.cgi
- Video streaming: up to 8 fps via HTTP MJPG, up to 12 fps via RTSP
- Audio codec: G.711 μ-law (8000 Hz sampling) required for API audio
- RTSP uses standard authentication (no parameter auth)
- SIP call terminates after 180 seconds automatically
- UDP keep-alive broadcasts sent every 7 seconds (can be ignored)
- Favorites and schedules require firmware 000110 or higher

<!-- UNRESOLVED: serial/RS-232 configuration not documented -->
<!-- UNRESOLVED: voltage/current/power specifications not in source -->
<!-- UNRESOLVED: firmware compatibility range not stated -->
<!-- UNRESOLVED: relay contact ratings not stated -->

## Provenance

```yaml
source_urls:
  - https://doorbird.com/downloads/api_lan.pdf
  - https://doorbird.com/api
  - https://doorbird.com/sip
  - https://doorbird.com/widget
  - https://doorbird.com/en/integrations
source_documents:
  - title: "Doorbird public source"
    url: https://doorbird.com/downloads/api_lan.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:20:34.453Z
  - title: "Doorbird public source"
    url: https://doorbird.com/api
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:20:34.937Z
  - title: "Doorbird public source"
    url: https://doorbird.com/sip
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:20:35.339Z
  - title: "Doorbird public source"
    url: https://doorbird.com/widget
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:20:35.696Z
  - title: "Doorbird public source"
    url: https://doorbird.com/en/integrations
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:20:36.152Z
retrieved_at: 2026-04-26T16:20:36.152Z
last_checked_at: 2026-04-23T06:41:18.279Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T06:41:18.279Z
matched_actions: 24
action_count: 24
confidence: high
summary: "All 24 spec actions match source endpoints verbatim; transport parameters verified in source; spec fully represents command catalogue."
```

## Known Gaps

```yaml
- rtsp-over-http:8557
- 720p-variant
- 1080p-variant
```
