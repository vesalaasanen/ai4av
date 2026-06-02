---
spec_id: admin/doorbird-d2109v
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird D2109V Control Spec"
manufacturer: DoorBird
model_family: "DoorBird D2109V"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "DoorBird D2109V"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-04-30T04:32:24.390Z
last_checked_at: 2026-06-02T22:06:21.016Z
generated_at: 2026-06-02T22:06:21.016Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial/RS-232 not mentioned in source — no direct physical control port documented"
  - "explicit safety interlock procedures not stated in source"
  - "voltage/current/power specifications not in source"
  - "RS-232 serial control not documented for D2109V specifically"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:06:21.016Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions traced to source (dip-safe re-verify). (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# DoorBird D2109V Control Spec

## Summary
DoorBird D2109V is a video door station with LAN-2-LAN HTTP API control. Supports HTTP/HTTPS on ports 80/443, RTSP video streaming on 554/8557, SIP on 5060, and UDP event broadcasts on 6524/35344. Authentication via Basic/Digest auth or http-user/http-password parameters.

<!-- UNRESOLVED: serial/RS-232 not mentioned in source — no direct physical control port documented -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  port: 80
  base_url: http://<device-ip>/bha-api/
auth:
  type: basic  # stated: Basic or Digest auth per RFC 2617
```

**HTTPS available on port 443** (self-signed certificate).

**RTSP video:**
```yaml
protocols:
  - tcp
addressing:
  port: 554
  # RTSP-over-HTTP: 8557
```

**SIP:**
```yaml
protocols:
  - tcp
addressing:
  port: 5060
```

**UDP Event broadcasts:**
```yaml
protocols:
  - udp
addressing:
  port: 6524
  # Also: 35344
```

## Traits
```yaml
# Inferred from command examples:
powerable: true     # restart.cgi present
queryable: true     # info.cgi, sip.cgi?action=status, monitor.cgi
routable: true      # favorites.cgi, schedule.cgi for event-based actions
levelable: true     # mic_volume, spk_volume via sip.cgi settings
```

## Actions
```yaml
- id: get_live_video
  label: Get Live Video
  kind: action
  params:
    - name: path
      type: string
      description: "/bha-api/video.cgi or RTSP rtsp://<device-ip>/mpeg/media.amp"

- id: get_live_image
  label: Get Live Image
  kind: action
  params: []

- id: open_door
  label: Open Door
  kind: action
  params:
    - name: r
      type: string
      description: "Relay ID, e.g. '1' or 'gggaaa@1' (optional, defaults to relay1)"

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
      description: "History index 1..50 (1 = latest)"
    - name: event
      type: string
      description: "doorbell or motionsensor (optional)"

- id: monitor_events
  label: Monitor Events
  kind: action
  params:
    - name: ring
      type: string
      description: "doorbell,motionsensor"

- id: get_audio
  label: Get Live Audio
  kind: action
  params: []

- id: transmit_audio
  label: Transmit Audio
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
      const: save
    - name: type
      type: string
      enum: [sip, http]
    - name: title
      type: string
    - name: value
      type: string
    - name: id
      type: integer
      description: "optional, omit for new"

- id: delete_favorite
  label: Delete Favorite
  kind: action
  params:
    - name: action
      type: string
      const: remove
    - name: type
      type: string
      enum: [sip, http]
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
      enum: [doorbell, motion, rfid, fingerprint]
    - name: param
      type: string
    - name: output
      type: array

- id: delete_schedule
  label: Delete Schedule
  kind: action
  params:
    - name: action
      type: string
      const: remove
    - name: input
      type: string
      enum: [doorbell, motion, rfid]
    - name: param
      type: string

- id: restart
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

- id: sip_makecall
  label: SIP Make Call
  kind: action
  params:
    - name: action
      type: string
      const: makecall
    - name: url
      type: string

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
    - name: mic_volume
      type: integer
    - name: spk_volume
      type: integer
    - name: dtmf
      type: integer
    - name: relay1_passcode
      type: integer
    - name: incoming_call_enable
      type: integer
    - name: anc
      type: integer
    - name: ring_time_limit
      type: integer
    - name: call_time_limit
      type: integer

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

- id: get_session
  label: Get Session
  kind: action
  params: []

- id: invalidate_session
  label: Invalidate Session
  kind: action
  params:
    - name: invalidate
      type: string
```

## Feedbacks
```yaml
- id: video_stream
  type: binary
  description: "Multipart JPEG video stream (video.cgi) or MPEG4 H.264 via RTSP"

- id: live_image
  type: binary
  description: "JPEG image from image.cgi"

- id: history_image
  type: binary
  description: "JPEG image from history.cgi"

- id: audio_stream
  type: binary
  description: "G.711 μ-law audio from audio-receive.cgi"

- id: open_door_response
  type: object
  description: "JSON with RETURNCODE"

- id: device_info
  type: object
  description: "JSON with FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS, DEVICE-TYPE"

- id: favorites_list
  type: object
  description: "JSON with sip and http favorites"

- id: schedule_list
  type: object
  description: "JSON array of schedule entries"

- id: monitor_event
  type: string
  description: "doorbell:H/L or motionsensor:H/L events"

- id: sip_status
  type: object
  description: "JSON with LASTERRORCODE and LASTERRORTEXT"

- id: session_response
  type: object
  description: "JSON with SESSIONID and NOTIFICATION_ENCRYPTION_KEY"

- id: udp_event
  type: object
  description: "Decrypted UDP broadcast: INTERCOM_ID, EVENT, TIMESTAMP"
```

## Variables
```yaml
# SIP settings (set via sip.cgi?action=settings):
- id: sip_enabled
  type: boolean
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
- id: relay1_passcode
  type: integer
  range: [0, 99999999]
- id: incoming_call_enable
  type: boolean
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
# UDP event broadcasts (ports 6524, 35344) - ChaCha20-Poly1305 encrypted v2:
- id: doorbell_event
  description: "Doorbell ring event"
- id: motion_event
  description: "Motion sensor event"
- id: rfid_event
  type: string
  description: "RFID event (future)"
- id: keypad_event
  type: string
  description: "Keypad event (future)"
```

## Macros
```yaml
# Session-based video/audio auth:
# 1. GET /bha-api/getsession.cgi → store SESSIONID and NOTIFICATION_ENCRYPTION_KEY
# 2. Use sessionid param for video/audio requests to avoid plaintext credentials
```

## Safety
```yaml
confirmation_required_for:
  - open_door  # door opener relay
interlocks: []
# UNRESOLVED: explicit safety interlock procedures not stated in source
```

## Notes
- Rate limit: 1 concurrent API connection per second; 423 response after wrong auth (1 min block)
- Video/audio stream precedence: official DoorBird App takes priority over LAN API
- Session ID valid 10 minutes; NOTIFICATION_ENCRYPTION_KEY valid until password change
- SIP call auto-terminates after 180 seconds
- Audio requires G.711 μ-law codec (8000 Hz); client must implement AEC/ANR
- RTSP authentication: standard RTSP auth (no parameter auth for RTSP)
<!-- UNRESOLVED: voltage/current/power specifications not in source -->
<!-- UNRESOLVED: RS-232 serial control not documented for D2109V specifically -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-04-30T04:32:24.390Z
last_checked_at: 2026-06-02T22:06:21.016Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:06:21.016Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions traced to source (dip-safe re-verify). (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial/RS-232 not mentioned in source — no direct physical control port documented"
- "explicit safety interlock procedures not stated in source"
- "voltage/current/power specifications not in source"
- "RS-232 serial control not documented for D2109V specifically"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
