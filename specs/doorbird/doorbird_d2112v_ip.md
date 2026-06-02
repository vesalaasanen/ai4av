---
spec_id: admin/doorbird-d2112v
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2112V Control Spec"
manufacturer: Doorbird
model_family: "DoorBird D2112V"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "DoorBird D2112V"
    - "DoorBird D21x"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-04-30T04:32:25.612Z
last_checked_at: 2026-06-02T22:06:25.007Z
generated_at: 2026-06-02T22:06:25.007Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "SIP and RTSP port numbers are defaults and may differ per configuration"
  - "auth credentials format not stated (user/password from DoorBird App)"
  - "power on/off commands not found in source"
  - "input/output routing not applicable to door station"
  - "no discrete settable parameters found separate from action params"
  - "rfid and keypad events mentioned as \"coming soon\""
  - "no explicit multi-step sequences documented"
  - "safety-critical fields not explicitly stated in source"
  - "RTSP-over-HTTP port 8557 is default, may be configurable"
  - "SIP port 5060 is default, may differ per proxy configuration"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:06:25.007Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D2112V Control Spec

## Summary
DoorBird D2112V is a LAN-based video door station supporting HTTP control API on ports 80/443, RTSP video streaming on port 554, SIP VoIP on port 5060, and UDP event broadcasts on ports 6524/35344. All API endpoints use HTTP Basic or Digest authentication (RFC 2617) with credentials configured in the DoorBird App. The device supports door opening, relay triggering, live audio/video streaming, and event monitoring via encrypted UDP notifications.

<!-- UNRESOLVED: SIP and RTSP port numbers are defaults and may differ per configuration -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 80
  secure_port: 443
auth:
  type: basic_digest  # stated: Basic or Digest authentication per RFC 2617
  # UNRESOLVED: auth credentials format not stated (user/password from DoorBird App)
```

## Traits
```yaml
# UNRESOLVED: power on/off commands not found in source
# UNRESOLVED: input/output routing not applicable to door station
# levelable inferred from SIP mic/spk volume parameters
```

## Actions
```yaml
- id: live_video
  label: Live Video Request
  kind: action
  params: []

- id: live_image
  label: Live Image Request
  kind: action
  params: []

- id: open_door
  label: Open Door
  kind: action
  params:
    - name: relay
      type: string
      description: "DoorcontrollerID@relay (optional); defaults to physical relay 1"

- id: light_on
  label: Light On
  kind: action
  params: []

- id: history_image
  label: History Image Request
  kind: action
  params:
    - name: index
      type: integer
      description: Index of history image (1..50), 1 is latest
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

- id: audio_receive
  label: Audio Receive
  kind: action
  params: []

- id: audio_transmit
  label: Audio Transmit
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
  label: Add or Change Favorite
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
      description: optional, for updating existing

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
  kind: query
  params: []

- id: save_schedule
  label: Add or Update Schedule
  kind: action
  params:
    - name: input
      type: string
      enum: [doorbell, motion, rfid, fingerprint]
    - name: param
      type: string
    - name: output
      type: object

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

- id: get_session
  label: Get Session ID
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
    - name: incoming_call_user
      type: string
    - name: anc
      type: integer
    - name: ring_time_limit
      type: integer
    - name: call_time_limit
      type: integer

- id: sip_status
  label: SIP Status
  kind: query
  params:
    - name: action
      type: string
      const: status

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  params:
    - name: action
      type: string
      const: reset
```

## Feedbacks
```yaml
- id: device_info
  type: object
  properties:
    - firmware
    - build_number
    - primary_mac_addr
    - relays
    - device_type

- id: sip_status
  type: object
  properties:
    - lasterrorcode
    - lasterrortext

- id: event_monitor
  type: string
  values: [doorbell, motionsensor]
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters found separate from action params
```

## Events
```yaml
# UDP event broadcasts on ports 6524 and 35344
# ChaCha20-Poly1305 encrypted (v2), version 0x02
- id: doorbell_event
  type: string
  description: "Doorbell ring event; payload contains INTERCOM_ID, EVENT, TIMESTAMP"

- id: motion_event
  type: string
  description: "Motion sensor trigger event"

# UNRESOLVED: rfid and keypad events mentioned as "coming soon"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Audio AEC/ANR required on client side (not provided by device)
# UNRESOLVED: safety-critical fields not explicitly stated in source
```

## Notes
- HTTP API base path: `http://<device-ip>/bha-api/` or `https://<device-ip>/bha-api/`
- HTTPS uses self-signed certificate (CA not issued for IP addresses)
- Video/audio streaming over HTTPS requires Session ID (valid 10 min) to avoid plaintext credentials
- RTSP authentication uses standard RTSP auth (no parameter authentication)
- Audio codec for live audio: G.711 μ-law (8000 Hz sampling)
- API rate limit: 1 concurrent connection per second; blocked IP for 1 minute after excessive auth failures (HTTP 423)
- Device busy status returns HTTP 503 (e.g., another active call)
- SIP call auto-terminates after 180 seconds
- SIP registration persists but requires restart on hardware reboot
- UDP keep-alive broadcasts sent every 7 seconds on event ports
<!-- UNRESOLVED: RTSP-over-HTTP port 8557 is default, may be configurable -->
<!-- UNRESOLVED: SIP port 5060 is default, may differ per proxy configuration -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-04-30T04:32:25.612Z
last_checked_at: 2026-06-02T22:06:25.007Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:06:25.007Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "SIP and RTSP port numbers are defaults and may differ per configuration"
- "auth credentials format not stated (user/password from DoorBird App)"
- "power on/off commands not found in source"
- "input/output routing not applicable to door station"
- "no discrete settable parameters found separate from action params"
- "rfid and keypad events mentioned as \"coming soon\""
- "no explicit multi-step sequences documented"
- "safety-critical fields not explicitly stated in source"
- "RTSP-over-HTTP port 8557 is default, may be configurable"
- "SIP port 5060 is default, may differ per proxy configuration"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
