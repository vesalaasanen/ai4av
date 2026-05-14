---
spec_id: admin/doorbird-d2105v
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2105V Control Spec"
manufacturer: Doorbird
model_family: D2105V
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - D2105V
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
last_checked_at: 2026-04-23T06:39:48.661Z
generated_at: 2026-04-23T06:39:48.661Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T06:39:48.661Z
  matched_actions: 24
  action_count: 24
  confidence: high
  summary: "All 24 spec actions match literals in source; transport parameters (port 80, HTTP/UDP, Basic auth) verified from documentation."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D2105V Control Spec

## Summary
The Doorbird D2105V is a video door station with IP-based control via HTTP LAN API. Supports door opening, lighting control, live audio/video streaming, motion/doorbell event monitoring, SIP calling, and automation scheduling. Control is HTTP-based on TCP ports 80 (HTTP) and 443 (HTTPS); events are pushed via UDP broadcasts on ports 6524 and 35344. RTSP streaming is available on port 554.

<!-- UNRESOLVED: Serial/RS-232 not mentioned in source — not applicable to this model -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 80   # HTTP
  # UNRESOLVED: HTTPS port 443 stated but not as configurable; omitted per N/A rule
auth:
  type: basic  # Basic or Digest auth per RFC 2617, or http-user/http-password parameters
```

## Traits
```yaml
- powerable       # restart.cgi command present
- queryable       # info.cgi, sip.cgi?action=status, monitor.cgi
- routable        # open-door.cgi, light-on.cgi
- levelable       # sip.cgi mic_volume/spk_volume parameters
```

## Actions
```yaml
- id: open_door
  label: Open Door
  kind: action
  params:
    - name: r
      type: string
      description: "Relay to trigger (optional). Format: relay number or doorcontrollerID@relay (e.g. '1' or 'gggaaa@1'). Defaults to relay 1."

- id: light_on
  label: Light On
  kind: action
  params: []

- id: live_video
  label: Live Video Stream
  kind: action
  params: []

- id: live_image
  label: Live Image
  kind: action
  params: []

- id: history_image
  label: History Image
  kind: action
  params:
    - name: index
      type: integer
      description: "History index 1..50, where 1 is latest"
    - name: event
      type: string
      description: "Event type: doorbell or motionsensor (optional)"

- id: monitor
  label: Monitor Events
  kind: action
  params:
    - name: ring
      type: string
      description: "Event types to monitor: doorbell,motionsensor"

- id: audio_receive
  label: Receive Audio
  kind: action
  params: []

- id: audio_transmit
  label: Transmit Audio
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
      description: sip or http
    - name: title
      type: string
    - name: value
      type: string
    - name: id
      type: integer
      description: optional, for updating existing favorite

- id: remove_favorite
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
  kind: query
  params: []

- id: save_schedule
  label: Add or Update Schedule
  kind: action
  params:
    - name: input
      type: string
      description: "doorbell, motion, rfid, or fingerprint"
    - name: param
      type: string
      description: doorbell number, transponder id, or fingerprint id
    - name: output
      type: array
      description: JSON array of output action configurations

- id: remove_schedule
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

- id: restart
  label: Restart Device
  kind: action
  params: []

- id: sip_registration
  label: SIP Register
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
      description: "0..1, enable SIP after reboot"
    - name: mic_volume
      type: integer
      description: "1..100, microphone volume"
    - name: spk_volume
      type: integer
      description: "1..100, speaker volume"
    - name: dtmf
      type: integer
      description: "0..1, enable DTMF support"
    - name: relay1_passcode
      type: integer
      description: "0..99999999, pincode for door open relay"
    - name: incoming_call_enable
      type: integer
      description: "0..1"
    - name: incoming_call_user
      type: string
      description: "Allowed SIP user, e.g. sip:10.0.0.1:5060"
    - name: anc
      type: integer
      description: "0..1, acoustic noise cancellation"
    - name: ring_time_limit
      type: integer
      description: "10..300 seconds"
    - name: call_time_limit
      type: integer
      description: "30..300 seconds"

- id: sip_status
  label: SIP Status
  kind: query
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
  label: Create Session
  kind: action
  params: []

- id: invalidate_session
  label: Invalidate Session
  kind: action
  params:
    - name: invalidate
      type: string
      description: Session ID to invalidate
```

## Feedbacks
```yaml
- id: doorbell_event
  type: string
  values: [doorbell, motionsensor, rfid, keypad]
- id: relay_state
  type: string
  description: "Relay identifiers returned by info.cgi, e.g. ['1','2','gggaaa@1','gggaaa@2']"
- id: sip_registration_status
  type: enum
  values: [registered, not_registered]
- id: sip_last_error
  type: string
  description: "LASTERRORCODE from sip status response"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters documented as separate variables;
# SIP settings are action-based (sip.cgi?action=settings)
```

## Events
```yaml
# UDP broadcast events on ports 6524 and 35344
# ChaCha20-Poly1305 encrypted (v2, since November 2023)
# v1 (Argon2i) deprecated
- id: doorbell_ring
  type: string
  description: Doorbell event, includes doorbell number padded with spaces
- id: motion_detected
  type: string
  description: Motion sensor event
- id: rfid_event
  type: string
  description: RFID transponder event (future)
- id: keypad_event
  type: string
  description: Keypad event (future)
# Fields per UDP packet:
#   INTERCOM_ID: first 6 chars of username
#   EVENT: 8-byte string
#   TIMESTAMP: Unix timestamp (4 bytes)
```

## Macros
```yaml
# No explicit multi-step macros documented; schedule.cgi implements
# event-action-timewindow bindings that could be considered macro-like.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Door opening should be performed while watching live image to verify identity"
    source: "open-door.cgi documentation"
# UNRESOLVED: no explicit safety interlocks or confirmation requirements found in source
```

## Notes
- HTTP API supports Basic/Digest auth (RFC 2617) or plaintext http-user/http-password parameters
- HTTPS uses self-signed certificate on port 443 (CA not issued for IP addresses)
- Session IDs valid for 10 minutes; obtained via getsession.cgi
- Video/audio streaming not available over HTTPS in LAN — requires session ID workaround
- RTSP available on port 554; RTSP-over-HTTP on port 8557
- SIP uses port 5060; supports peer-to-peer and proxy-based calls
- Maximum 1 concurrent API connection per second; rate limit blocks IPs on 423 after repeated auth failures
- Device busy (only one A/V call at a time) returns 503; up to 8 monitor streams, 509 when full
- Audio codec: G.711 μ-law only; client must handle AEC/ANR
- UDP event monitoring v2 uses ChaCha20-Poly1305 with 32-byte key from NOTIFICATION_ENCRYPTION_KEY

<!-- UNRESOLVED: Serial/RS-232 configuration not applicable to D2105V (IP-only model) -->
<!-- UNRESOLVED: Firmware version compatibility range not explicitly stated -->
<!-- UNRESOLVED: Voltage/power specifications not provided in source -->
<!-- UNRESOLVED: Specific fault behavior and error recovery sequences not documented -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-04-30T04:32:18.464Z
last_checked_at: 2026-04-23T06:39:48.661Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T06:39:48.661Z
matched_actions: 24
action_count: 24
confidence: high
summary: "All 24 spec actions match literals in source; transport parameters (port 80, HTTP/UDP, Basic auth) verified from documentation."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
