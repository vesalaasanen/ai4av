---
spec_id: admin/doorbird-d2102v-ral7016-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2102V-RAL7016 Series Control Spec"
manufacturer: Doorbird
model_family: D2102V-RAL7016
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - D2102V-RAL7016
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-05-14T10:39:00.848Z
last_checked_at: 2026-10-07T21:02:22.844Z
generated_at: 2026-10-07T21:02:22.844Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "electrical specifications (voltage, current, power consumption) not stated in source"
  - "no discrete settable parameters found in source; settings exposed via sip.cgi?action=settings and schedule.cgi"
  - "no explicit multi-step macros described in source"
  - "explicit interlock procedures for door relay wiring not in source"
  - "electrical/power specifications, fault behavior, error recovery sequences, firmware compatibility ranges beyond stated minimums"
verification:
  verdict: verified
  checked_at: 2026-10-07T21:02:22.844Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 action units match source endpoints with correct params; transport values (80/443, Basic/Digest, RTSP/SIP/UDP ports) are stated in the source, and the source catalogue is fully covered. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Doorbird D2102V-RAL7016 Series Control Spec

## Summary
Doorbird D2102V-RAL7016 is an IP video door station with relay outputs for door opening and light control. Control is available via HTTP API (unencrypted on port 80, encrypted on port 443), RTSP for live video, SIP for audio calls, and UDP event broadcasts for monitoring. Authentication uses HTTP Basic/Digest or inline query parameters.

<!-- UNRESOLVED: electrical specifications (voltage, current, power consumption) not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 80   # HTTP; HTTPS also available on 443
auth:
  type: basic_digest  # Basic or Digest authentication per RFC 2617; alternative: http-user/http-password query params
```

**HTTP Base URL pattern:** `http://<device-ip>/bha-api/` or `https://<device-ip>/bha-api/`

**RTSP ports (TCP):** 554 (video), 8557 (RTSP-over-HTTP)

**SIP port:** 5060

**UDP event broadcast ports:** 6524, 35344

**Rate limits:**
- 1 concurrent HTTP API connection per second
- 8 concurrent monitor streams; HTTP 509 when exhausted
- Wrong auth → IP or user blocked for 1 minute → HTTP 423

**Video/Audio notes:**
- MJPG stream via HTTP: up to 8 fps; multipart/x-mixed-replace
- RTSP H.264 stream: up to 12 fps; `rtsp://<device-ip>:554/mpeg/media.amp`
- HTTPS video/audio not available for third-party integrations; session ID required for streaming over HTTP to avoid plaintext credentials
- Audio codec: G.711 μ-law (8000 Hz); AEC/ANC required on client side

## Traits
```yaml
# Inferred from command examples in source:
powerable: false  # no power on/off command in source
routable: true    # input (doorbell, motion, rfid, fingerprint) and output (relay, SIP, HTTP notification) routing present
queryable: true   # info.cgi, sip.cgi?action=status, schedule.cgi list, favorites.cgi list
levelable: false  # no volume/gain/brightness commands in source
```

## Actions
```yaml
- id: open_door
  label: Open Door
  kind: action
  params:
    - name: r
      type: string
      description: "Relay to trigger, e.g. '1' or 'gggaaa@1' (DoorController relay). Default: physical relay 1."

- id: light_on
  label: Light On
  kind: action
  params: []

- id: restart
  label: Restart Device
  kind: action
  params: []
  # Note: no diagnostic sound after restart

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
      fixed: save
    - name: type
      type: string
      enum: [sip, http]
    - name: title
      type: string
    - name: value
      type: string
    - name: id
      type: integer
      required: false
      description: Omit to create new favorite; specify to update existing

- id: delete_favorite
  label: Delete Favorite
  kind: action
  params:
    - name: action
      type: string
      fixed: remove
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
      description: Doorbell number, transponder ID, or fingerprint ID
    - name: output
      type: array
      description: JSON array of output action configurations

- id: delete_schedule
  label: Delete Schedule
  kind: action
  params:
    - name: action
      type: string
      fixed: remove
    - name: input
      type: string
      enum: [doorbell, motion, rfid]
    - name: param
      type: string

- id: sip_register
  label: SIP Register
  kind: action
  params:
    - name: action
      type: string
      fixed: registration
    - name: user
      type: string
    - name: password
      type: string
    - name: url
      type: string
      description: SIP Proxy IP/hostname

- id: sip_makecall
  label: SIP Make Call
  kind: action
  params:
    - name: action
      type: string
      fixed: makecall
    - name: url
      type: string
      description: SIP URL to call, e.g. "sip:108@192.168.123.22"

- id: sip_hangup
  label: SIP Hangup
  kind: action
  params:
    - name: action
      type: string
      fixed: hangup

- id: sip_settings
  label: SIP Settings
  kind: action
  params:
    - name: action
      type: string
      fixed: settings
    - name: enable
      type: integer
      required: false
    - name: mic_volume
      type: integer
      required: false
    - name: spk_volume
      type: integer
      required: false
    - name: dtmf
      type: integer
      required: false
    - name: relay1_passcode
      type: integer
      required: false
    - name: incoming_call_enable
      type: integer
      required: false
    - name: incoming_call_user
      type: string
      required: false
    - name: anc
      type: integer
      required: false
    - name: ring_time_limit
      type: integer
      required: false
    - name: call_time_limit
      type: integer
      required: false

- id: sip_reset
  label: SIP Reset
  kind: action
  params:
    - name: action
      type: string
      fixed: reset

- id: get_session
  label: Get Session
  kind: action
  description: Command: getsession.cgi
  params:
    - name: invalidate
      type: string
      required: false
      description: "Set to <old_session_id> to invalidate that session."

- id: live_video
  label: Live Video
  kind: action
  description: Command: video.cgi
  params: []

- id: live_image
  label: Live Image
  kind: action
  description: Command: image.cgi
  params: []

- id: history_image
  label: History Image
  kind: action
  description: Command: history.cgi
  params:
    - name: index
      type: integer
      description: "1..50"
    - name: event
      type: string
      required: false
      enum: [doorbell, motionsensor]
      description: Optional; default is the ring history for DoorBird devices and the input trigger history for BirdGuard devices.

- id: monitor_events
  label: Monitor Events
  kind: action
  description: Command: monitor.cgi
  params:
    - name: ring
      type: string
      enum: [doorbell, motionsensor]

- id: live_audio_receive
  label: Live Audio Receive
  kind: action
  description: Command: audio-receive.cgi
  params: []

- id: live_audio_transmit
  label: Live Audio Transmit
  kind: action
  description: Command: audio-transmit.cgi
  params: []

- id: device_info
  label: Device Info
  kind: action
  description: Command: info.cgi
  params: []

- id: rtsp_live_video
  label: RTSP Live Video
  kind: action
  description: "Command: rtsp://<device-ip>:<device-rtsp-port>/mpeg/media.amp; documented variants are /mpeg/720p/media.amp and /mpeg/1080p/media.amp."
  params: []
```

## Feedbacks
```yaml
- id: door_open_response
  label: Open Door Response
  type: json
  description: JSON response from open-door.cgi; RETURNCODE "1" indicates success

- id: light_on_response
  label: Light On Response
  type: json
  description: JSON response from light-on.cgi; RETURNCODE "1" indicates success

- id: sip_status
  label: SIP Status
  type: json
  description: "JSON with LASTERRORCODE; '200' means registered. Other fields: LASTERRORTEXT"
  query_command: http://<device-ip>/bha-api/sip.cgi?action=status

- id: http_error
  label: HTTP Error Code
  type: enum
  values:
    - 200   # OK
    - 204   # No permission / no data
    - 400   # Parameter missing or invalid
    - 401   # Authentication required
    - 423   # IP or user blocked for 1 minute (wrong credentials)
    - 500   # Internal error
    - 503   # Device busy (call in progress or firmware update in progress)
    - 507   # Size limit exceeded
    - 509   # Monitor streams exhausted
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters found in source; settings exposed via sip.cgi?action=settings and schedule.cgi
```

## Events
```yaml
# DoorBird sends unsolicited UDP broadcasts on ports 6524 and 35344.
# v2 encryption: ChaCha20-Poly1305; key obtained from getsession.cgi.
# v1 (Argon2i) deprecated; should migrate to v2.
#
# Decrypted payload structure (34 bytes ciphertext → 18 bytes plaintext):
#   INTERCOM_ID: 6 bytes  (first 6 chars of username; skip non-matching packets)
#   EVENT: 8 bytes        (doorbell number or "motion", space-padded)
#   TIMESTAMP: 4 bytes    (Unix timestamp)
#
# Keep-alive packets sent every 7 seconds on both ports; can be skipped.
#
# Permission-gated events:
# - doorbell press → 204 returned to users without "watch always" and no recent ring event
# - motion detected → 204 for users without motion permission
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Do not open door without verifying identity via live image/audio first"
  - "AEC/ANC required on client side for audio transmit/receive calls"
  - "SIP call auto-terminates after 180 seconds"
  - "Do not send concurrent SIP requests; wait minimum 3 seconds between each"
  # UNRESOLVED: explicit interlock procedures for door relay wiring not in source
```

## Notes

**Session ID flow:** `getsession.cgi` returns `SESSIONID` and `NOTIFICATION_ENCRYPTION_KEY`. Session ID valid 10 minutes; key persists until password changes. For video/audio streaming over HTTP, append sessionid to avoid plaintext credentials.

**Video precedence:** DoorBird App takes priority over LAN API for video/audio streams; streams can be interrupted at any time by the app.

**Monitor stream limit:** 8 concurrent monitor streams; HTTP 509 when exhausted.

**RTSP authentication:** Standard RTSP auth (no query-parameter auth for RTSP).

**Firmware requirements:**
- Favorites/schedules: firmware 000110 or higher
- `info.cgi` relay config: firmware 000108 or higher

<!-- UNRESOLVED: electrical/power specifications, fault behavior, error recovery sequences, firmware compatibility ranges beyond stated minimums -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-05-14T10:39:00.848Z
last_checked_at: 2026-10-07T21:02:22.844Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T21:02:22.844Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 action units match source endpoints with correct params; transport values (80/443, Basic/Digest, RTSP/SIP/UDP ports) are stated in the source, and the source catalogue is fully covered. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "electrical specifications (voltage, current, power consumption) not stated in source"
- "no discrete settable parameters found in source; settings exposed via sip.cgi?action=settings and schedule.cgi"
- "no explicit multi-step macros described in source"
- "explicit interlock procedures for door relay wiring not in source"
- "electrical/power specifications, fault behavior, error recovery sequences, firmware compatibility ranges beyond stated minimums"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
