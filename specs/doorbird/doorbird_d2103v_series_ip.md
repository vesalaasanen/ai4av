---
spec_id: admin/doorbird-d2103v-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2103V Series Control Spec"
manufacturer: Doorbird
model_family: "D2103V Series"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "D2103V Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-05-14T10:39:02.971Z
last_checked_at: 2026-10-07T18:12:55.018Z
generated_at: 2026-10-07T18:12:55.018Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device firmware compatibility range not stated in source"
  - "RTSP port 554 and SIP port 5060 mentioned in source but not explicitly numbered in this device's context - omitting per Tier 3 rule"
  - "no discrete settable parameters found outside of SIP settings action"
  - "not implemented yet\""
  - "no explicit multi-step macros defined in source"
  - "no explicit safety warnings or interlock procedures stated in source"
  - "RTSP port explicitly stated as 554 but source gives this as default without confirming D2103V-specific port"
  - "HTTPS port 443 mentioned as default but not explicitly confirmed for D2103V Series"
  - "full GPIO/relay pinout not detailed beyond relay numbers 1, 2, and DoorController format"
verification:
  verdict: verified
  checked_at: 2026-10-07T18:12:55.018Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 action units match source endpoints and parameters, transport values are supported, and the source's roughly 25 commands are fully covered. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D2103V Series Control Spec

## Summary
Doorbird D2103V Series is a video door station supporting LAN-2-LAN API control over HTTP/HTTPS (TCP) and UDP event broadcasts. Supports door relay control, light activation, live video/audio streaming (MJPG and RTSP), SIP calling, and schedule-based automation. Authentication via Basic/Digest HTTP auth or plaintext HTTP parameters; encryption on port 443 with self-signed certificate.

<!-- UNRESOLVED: device firmware compatibility range not stated in source -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - udp
addressing:
  port: 80      # HTTP (unencrypted)
  # port 443 also available for HTTPS (encrypted) - port number not explicitly stated in source
auth:
  type: basic   # Basic or Digest auth per RFC 2617; plaintext http-user/http-password also supported
# UNRESOLVED: RTSP port 554 and SIP port 5060 mentioned in source but not explicitly numbered in this device's context - omitting per Tier 3 rule
```

## Traits
```yaml
# inferred from door open, light-on commands:
- actionable
# inferred from info.cgi returning JSON state:
- queryable
# inferred from monitor.cgi doorbell/motion event monitoring:
- observable
```

## Actions
```yaml
- id: open_door
  label: Open Door
  kind: action
  params:
    - name: r
      type: string
      description: "Relay to trigger, e.g. 1 or <doorcontrollerID>@<relay>. Omit for relay 1."

- id: light_on
  label: Light On
  kind: action
  params: []

- id: get_session
  label: Get Temporary Session ID
  kind: action
  params: []
  # returns SESSIONID and NOTIFICATION_ENCRYPTION_KEY valid for 10 minutes

- id: invalidate_session
  label: Invalidate Session ID
  kind: action
  params:
    - name: invalidate
      type: string
      description: Session ID to invalidate

- id: get_info
  label: Get Device Info
  kind: action
  params: []
  # returns firmware version, build number, MAC address, relay config

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
      description: Fixed value "save"
    - name: type
      type: string
      description: "sip or http"
    - name: title
      type: string
      description: Name/title of the favorite
    - name: value
      type: string
      description: URL or SIP address
    - name: id
      type: integer
      description: "Optional: ID of existing favorite to change"

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
      description: ID of the favorite to delete

- id: list_schedules
  label: List Schedules
  kind: action
  params: []

- id: save_schedule
  label: Add or Update Schedule Entry
  kind: action
  params:
    - name: input
      type: string
      description: "doorbell, motion, rfid, fingerprint"
    - name: param
      type: string
      description: "Doorbell number, transponder ID, or fingerprint ID"
    - name: output
      type: string
      description: JSON array of output configurations

- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "remove"
    - name: input
      type: string
      description: "doorbell, motion, rfid"
    - name: param
      type: string
      description: Doorbell number or transponder ID

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
    - name: incoming_call_user
      type: string
      description: Allowed SIP user
    - name: anc
      type: integer
      description: "0..1, acoustic noise cancellation"
    - name: ring_time_limit
      type: integer
      description: "10..300, max ringing time in seconds"
    - name: call_time_limit
      type: integer
      description: "30..300, max call duration in seconds"

- id: sip_status
  label: SIP Status Query
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "status"

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "reset"

- id: live_video
  label: Live Video
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
      description: "1..50"
    - name: event
      type: string
      description: "doorbell|motionsensor"

- id: monitor
  label: Monitor Events
  kind: action
  params:
    - name: ring
      type: string
      description: "doorbell|motionsensor"

- id: live_audio_receive
  label: Live Audio Receive
  kind: action
  params: []

- id: live_audio_transmit
  label: Live Audio Transmit
  kind: action
  params: []

- id: rtsp_live_video
  label: RTSP Live Video
  kind: action
  params:
    - name: path
      type: string
      description: "/mpeg/media.amp, /mpeg/720p/media.amp, /mpeg/1080p/media.amp"
```

## Feedbacks
```yaml
- id: open_door_response
  type: json
  description: JSON with RETURNCODE indicating success/failure

- id: light_on_response
  type: json
  description: JSON with RETURNCODE indicating success/failure

- id: session_response
  type: json
  description: JSON containing SESSIONID and NOTIFICATION_ENCRYPTION_KEY
  query_command: /bha-api/getsession.cgi

- id: device_info
  type: json
  description: JSON with FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS, DEVICE-TYPE
  query_command: /bha-api/info.cgi

- id: favorites_list
  type: json
  description: JSON object with sip and http favorites
  query_command: /bha-api/favorites.cgi

- id: schedule_list
  type: json
  description: JSON array of schedule entries with input, param, output
  query_command: /bha-api/schedule.cgi

- id: restart_response
  type: http_status
  description: 200 OK, 401 auth required, or 503 device busy

- id: sip_status_response
  type: json
  description: JSON with LASTERRORCODE and LASTERRORTEXT
  query_command: /bha-api/sip.cgi?action=status

- id: sip_settings_response
  type: http_status
  description: 200 OK or 401 auth required
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters found outside of SIP settings action
# SIP settings (mic_volume, spk_volume, dtmf, etc.) are covered by sip_settings action
```

## Events
```yaml
- id: doorbell_event
  type: string
  description: Doorbell press event, sent via UDP broadcast on ports 6524 and 35344 (v2, ChaCha20-Poly1305 encrypted). Event field is "doorbell" padded to 8 chars.

- id: motionsensor_event
  type: string
  description: Motion sensor triggered event, sent via UDP broadcast on ports 6524 and 35344 (v2, ChaCha20-Poly1305 encrypted). Event field is "motion" padded to 8 chars.

- id: rfid_event
  description: "Coming soon per source - UNRESOLVED: not implemented yet"

- id: keypad_event
  description: "Coming soon per source - UNRESOLVED: not implemented yet"

# UDP event structure (v2):
# - IDENT: 0xDE 0xAD 0xBE (3 bytes)
# - VERSION: 0x02 (1 byte)
# - NONCE: 8 bytes
# - CIPHERTEXT: 34 bytes (ChaCha20-Poly1305)
# After decryption:
# - INTERCOM_ID: 6 chars (first 6 of username)
# - EVENT: 8 chars (doorbell number or "motion  ")
# - TIMESTAMP: 4 bytes Unix timestamp
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros defined in source
# Schedule entries (schedule.cgi) provide event-driven automation combining inputs/outputs
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures stated in source
# Note: audio transmission requires client-side AEC/ANR - not a device safety field but a implementation requirement
# Note: SIP calls auto-terminate at 180 seconds for security
```

## Notes
- HTTP API rate limit: 1 concurrent connection per second for API access
- Wrong authentication blocks IP/user for 1 minute (HTTP 423)
- Live video/audio streams may be interrupted when official DoorBird App takes precedence
- Permission "watch always" or recent ring event required for live stream access
- Monitor stream: up to 8 concurrent streams allowed; HTTP 509 when all busy
- Video streams (MJPG): up to 8 fps depending on network/load
- RTSP streams: up to 12 fps; uses standard RTSP auth (no parameter auth)
- RTSP port 554 and RTSP-over-HTTP port 8557 mentioned in source
- Audio codec: G.711 μ-law, 8000 Hz sampling rate
- SIP runs on port 5060 (mentioned for P2P mode)
- Schedule time units are seconds since 1.1.1970 UTC; weekdays slots in 30-minute increments (1800 seconds)
- Favorites and schedules require firmware 000110 or higher
- UDP keep-alive broadcasts sent every 7 seconds on ports 6524 and 35344
- Session ID valid for 10 minutes; NOTIFICATION_ENCRYPTION_KEY valid until password change
- Autocall_doorbell_url is deprecated in favor of schedule.cgi
<!-- UNRESOLVED: RTSP port explicitly stated as 554 but source gives this as default without confirming D2103V-specific port -->
<!-- UNRESOLVED: HTTPS port 443 mentioned as default but not explicitly confirmed for D2103V Series -->
<!-- UNRESOLVED: full GPIO/relay pinout not detailed beyond relay numbers 1, 2, and DoorController format -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-05-14T10:39:02.971Z
last_checked_at: 2026-10-07T18:12:55.018Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T18:12:55.018Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 action units match source endpoints and parameters, transport values are supported, and the source's roughly 25 commands are fully covered. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device firmware compatibility range not stated in source"
- "RTSP port 554 and SIP port 5060 mentioned in source but not explicitly numbered in this device's context - omitting per Tier 3 rule"
- "no discrete settable parameters found outside of SIP settings action"
- "not implemented yet\""
- "no explicit multi-step macros defined in source"
- "no explicit safety warnings or interlock procedures stated in source"
- "RTSP port explicitly stated as 554 but source gives this as default without confirming D2103V-specific port"
- "HTTPS port 443 mentioned as default but not explicitly confirmed for D2103V Series"
- "full GPIO/relay pinout not detailed beyond relay numbers 1, 2, and DoorController format"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
