---
spec_id: admin/doorbird-d2101kh_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2101KH Series Control Spec"
manufacturer: Doorbird
model_family: "D2101KH Series"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "D2101KH Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-10-07T18:44:57.038Z
last_checked_at: 2026-10-07T18:44:57.038Z
generated_at: 2026-10-07T18:44:57.038Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Serial (RS-232) control not mentioned in source"
  - "HTTPS port 443 mentioned but not explicitly stated as configurable"
  - "RTSP-over-HTTP port 8557 not confirmed as configurable"
  - "SIP settings are settable via sip.cgi?action=settings but documented"
  - "RFID and keypad events mentioned as \"coming soon\""
  - "No explicit multi-step macros documented in source"
  - "No explicit safety warnings or interlock procedures in source."
  - "Serial/RS-232 control interface not documented"
  - "Firmware version compatibility range not stated"
  - "RFID and keypad events documented as \"coming soon\""
  - "Voltage/power specifications not in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T18:44:57.038Z
  matched_actions: 35
  action_count: 35
  confidence: medium
  summary: "All 35 action units (25 actions, 10 query feedbacks) match source endpoints with correct shapes, transport values are supported, and the source catalogue is fully covered. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D2101KH Series Control Spec

## Summary
The Doorbird D2101KH Series is a Video Door Station controllable via a LAN-2-LAN HTTP API. The device supports TCP/HTTP for command and control, RTSP for live video streaming, SIP for voice calls, and UDP event broadcasts for doorbell, motion, and sensor notifications. Authentication uses RFC 2617 Basic/Digest or plaintext HTTP parameters.

<!-- UNRESOLVED: Serial (RS-232) control not mentioned in source -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 80  # HTTP
  # UNRESOLVED: HTTPS port 443 mentioned but not explicitly stated as configurable
base_url: http://<device-ip>/bha-api
auth:
  type: UNRESOLVED  # source does not state this (was inferred basic: source describes RFC 2617 Basic/Digest auth)
```

**RTSP transport:**
```yaml
protocols:
  - UNRESOLVED
addressing:
  port: 554  # RTSP
  # UNRESOLVED: RTSP-over-HTTP port 8557 not confirmed as configurable
```

**UDP event broadcasts:**
```yaml
protocols:
  - udp
addressing:
  port: 6524  # event broadcast
  port: 35344  # event broadcast
```

**SIP:**
```yaml
protocols:
  - UNRESOLVED
addressing:
  port: 5060  # SIP
```

## Traits
```yaml
- queryable       # inferred: info.cgi, sip.cgi?action=status, monitor.cgi present
- levelable       # inferred: mic_volume, spk_volume settings present
```

## Actions
```yaml
- id: open_door
  label: Open Door
  kind: action
  params:
    - name: r
      type: string
      description: "DoorcontrollerID@relay, e.g. 1 or gggaaa@1. Default: relay1"

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
  label: Invalidate Session ID
  kind: action
  params:
    - name: invalidate
      type: string
      description: Session ID to invalidate

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
      enum: [sip, http]
      description: Favorite type
    - name: title
      type: string
      description: Name/title
    - name: value
      type: string
      description: URL or SIP address
    - name: id
      type: integer
      description: Optional ID to change existing favorite

- id: delete_favorite
  label: Delete Favorite
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "remove"
    - name: type
      type: string
      enum: [sip, http]
      description: Favorite type
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
  params:
    - name: input
      type: string
      enum: [doorbell, motion, rfid, fingerprint]
      description: Input event type
    - name: param
      type: string
      description: Doorbell number, transponder ID, or fingerprint ID
    - name: output
      type: array
      description: JSON array of output configurations

- id: delete_schedule
  label: Delete Schedule
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "remove"
    - name: input
      type: string
      enum: [doorbell, motion, rfid]
      description: Input event type
    - name: param
      type: string
      description: Doorbell number or transponder ID

- id: sip_registration
  label: SIP Registration
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

- id: sip_make_call
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
      description: "0..1, enable incoming calls"
    - name: anc
      type: integer
      description: "0..1, acoustic noise cancellation"
    - name: ring_time_limit
      type: integer
      description: "10..300, ringing time limit in seconds"
    - name: call_time_limit
      type: integer
      description: "30..300, call duration limit in seconds"

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "reset"

- id: request_live_video
  label: Request Live Video (MJPEG)
  kind: action
  params: []

- id: request_live_image
  label: Request Live Image
  kind: action
  params: []

- id: request_history_image
  label: Request History Image
  kind: action
  params:
    - name: index
      type: integer
      description: "1..50, history image index (1=latest)"
    - name: event
      type: string
      enum: [doorbell, motionsensor]
      description: Event type, default doorbell

- id: monitor_events
  label: Monitor Events
  kind: action
  params:
    - name: ring
      type: string
      enum: [doorbell, motionsensor]
      description: Event types to monitor

- id: request_audio_receive
  label: Receive Live Audio
  kind: action
  params: []

- id: transmit_audio
  label: Transmit Live Audio
  kind: action
  params: []

- id: rtsp_live_video
  label: RTSP Live Video
  kind: action
  params:
    - name: resolution
      type: string
      enum: [mpeg/media.amp, mpeg/720p/media.amp, mpeg/1080p/media.amp]
      description: Video resolution path

- id: sip_set_incoming_call_user
  label: SIP Set Incoming Call User
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "settings"
    - name: incoming_call_user
      type: string
      description: "SIP user; Allowed SIP user which will be authenticated for DoorBird. E.g. \"sip:10.0.0.1:5060\" or \"sip:user@10.0.0.2:5060\"."

- id: sip_set_autocall_doorbell_url
  label: SIP Set Autocall Doorbell URL
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "settings"
    - name: autocall_doorbell_url
      type: string
      description: "URL or \"none\"; DEPRECATED: use schedule.cgi. SIP URL to automatically call upon doorbell event. By the second doorbell event hangs theprevious call. Set to \"none\" to disable this automatic call. Default: \"none\""
```

## Feedbacks
```yaml
- id: info_response
  type: object
  description: Device information from info.cgi
  query_command: "http://<device-ip>/bha-api/info.cgi"
  fields:
    - RETURNCODE
    - VERSION[]: firmware, build_number, primary_mac_addr, relays, device_type

- id: session_response
  type: object
  description: Session information from getsession.cgi
  query_command: "http://<device-ip>/bha-api/getsession.cgi"
  fields:
    - RETURNCODE
    - SESSIONID
    - NOTIFICATION_ENCRYPTION_KEY

- id: sip_status
  type: object
  description: SIP status from sip.cgi?action=status
  query_command: "http://<device-ip>/bha-api/sip.cgi?action=status"
  fields:
    - LASTERRORCODE
    - LASTERRORTEXT

- id: monitor_event
  type: string
  description: "Continuous multipart stream events: doorbell:H/L, motionsensor:H/L"
  query_command: "http://<device-ip>/bha-api/monitor.cgi?ring=doorbell[,motionsensor]"

- id: live_video_stream
  type: binary
  description: Multipart JPEG video stream (multipart/x-mixed-replace)
  query_command: "http://<device-ip>/bha-api/video.cgi"

- id: live_image
  type: binary
  description: JPEG image (image/jpeg)
  query_command: "http://<device-ip>/bha-api/image.cgi"

- id: history_image
  type: binary
  description: JPEG history image (image/jpeg)
  query_command: "http://<device-ip>/bha-api/history.cgi?<parameter>=<value>"

- id: audio_stream
  type: binary
  description: G.711 μ-law audio stream (audio/basic)
  query_command: "http://<device-ip>/bha-api/audio-receive.cgi"

- id: favorites_list
  type: object
  description: JSON object with sip and http favorites
  query_command: "http://<device-ip>/bha-api/favorites.cgi"

- id: schedules_list
  type: array
  description: JSON array of schedule entries
  query_command: "http://<device-ip>/bha-api/schedule.cgi"

- id: udp_broadcast
  type: object
  description: Encrypted UDP event broadcast (ChaCha20-Poly1305)
  fields:
    - INTERCOM_ID
    - EVENT
    - TIMESTAMP
```

## Variables
```yaml
# UNRESOLVED: SIP settings are settable via sip.cgi?action=settings but documented
# as action parameters rather than discrete Variables. Consider recording as
# writable Variables: mic_volume, spk_volume, dtmf, relay1_passcode,
# incoming_call_enable, anc, ring_time_limit, call_time_limit
```

## Events
```yaml
# Events delivered via monitor.cgi (HTTP multipart) and UDP broadcasts:
- id: doorbell_event
  description: Doorbell ring event
  fields:
    - doorbell number
    - timestamp

- id: motion_event
  description: Motion sensor triggered
  fields:
    - timestamp

# UNRESOLVED: RFID and keypad events mentioned as "coming soon"
```

## Macros
```yaml
# UNRESOLVED: No explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: No explicit safety warnings or interlock procedures in source.
# Source notes: video/audio calls return 503 (Busy) when line is in use.
# Auth failures result in 423 (Blocked) after extensive wrong credentials.
```

## Notes
The device supports Basic/Digest HTTP authentication (RFC 2617) or plaintext `http-user`/`http-password` parameters. Session IDs are valid for 10 minutes and obtained via `getsession.cgi`. Event monitoring uses ChaCha20-Poly1305 encrypted UDP broadcasts on ports 6524 and 35344 (v2, since November 2023). RTSP video is available on port 554 with RTSP-over-HTTP on port 8557. SIP operates on port 5060. The API handles maximum 1 concurrent connection per second; video/audio calls are limited to 1 simultaneous session. Video streaming can be interrupted when the official DoorBird App connects.

<!-- UNRESOLVED: Serial/RS-232 control interface not documented -->
<!-- UNRESOLVED: Firmware version compatibility range not stated -->
<!-- UNRESOLVED: RFID and keypad events documented as "coming soon" -->
<!-- UNRESOLVED: Voltage/power specifications not in source -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-10-07T18:44:57.038Z
last_checked_at: 2026-10-07T18:44:57.038Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T18:44:57.038Z
matched_actions: 35
action_count: 35
confidence: medium
summary: "All 35 action units (25 actions, 10 query feedbacks) match source endpoints with correct shapes, transport values are supported, and the source catalogue is fully covered. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Serial (RS-232) control not mentioned in source"
- "HTTPS port 443 mentioned but not explicitly stated as configurable"
- "RTSP-over-HTTP port 8557 not confirmed as configurable"
- "SIP settings are settable via sip.cgi?action=settings but documented"
- "RFID and keypad events mentioned as \"coming soon\""
- "No explicit multi-step macros documented in source"
- "No explicit safety warnings or interlock procedures in source."
- "Serial/RS-232 control interface not documented"
- "Firmware version compatibility range not stated"
- "RFID and keypad events documented as \"coming soon\""
- "Voltage/power specifications not in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
