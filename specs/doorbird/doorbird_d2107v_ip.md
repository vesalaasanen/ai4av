---
spec_id: admin/doorbird-d2107v
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2107V Control Spec"
manufacturer: Doorbird
model_family: "Doorbird D2107V"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "Doorbird D2107V"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-04-30T04:32:23.927Z
last_checked_at: 2026-06-03T06:39:16.537Z
generated_at: 2026-06-03T06:39:16.537Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 serial control not documented in source"
  - "no input/output routing commands in source"
  - "no volume/gain/brightness commands in source"
  - "device does not expose settable parameters via API in a discrete variable pattern."
  - "no safety warnings or interlock procedures stated in source."
  - "RS-232 serial control interface not documented in source"
  - "firmware version compatibility range not stated in source"
  - "voltage/power specifications not stated in source"
  - "fault behavior and error recovery sequences not documented in source"
  - "relay contact ratings not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-03T06:39:16.537Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions verified (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D2107V Control Spec

## Summary
The Doorbird D2107V is a video door station with a LAN-based HTTP API for third-party integration. The device supports Basic/Digest authentication per RFC 2617, HTTP plaintext parameter auth, live video/audio streaming, door relay control, light control, schedule/favorite management, SIP calling, and UDP event broadcasts. RTSP and SIP are also available on dedicated ports.

<!-- UNRESOLVED: RS-232 serial control not documented in source -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - udp
addressing:
  base_url: http://<device-ip>/bha-api/
auth:
  type: basic_digest  # stated: Basic or Digest auth per RFC 2617 required
serial:
  # N/A: serial control not documented in source
```

## Traits
```yaml
powerable: true  # inferred: restart.cgi present
queryable: true  # inferred: info.cgi, sip.cgi?action=status present
routable: false  # UNRESOLVED: no input/output routing commands in source
levelable: false  # UNRESOLVED: no volume/gain/brightness commands in source
```

## Actions
```yaml
- id: get_session
  label: Get Session
  kind: action
  params:
    - name: invalidate
      type: string
      required: false
      description: Session ID to invalidate (destroys existing session)
    - name: credentials
      type: string
      required: false
      description: Basic auth credentials (alternative to header auth)
  description: Creates a temporary session ID valid for 10 minutes, or invalidates an existing session. Also returns NOTIFICATION_ENCRYPTION_KEY for UDP event decryption.

- id: get_live_video
  label: Get Live Video
  kind: action
  params: []
  description: Returns multipart JPEG live video stream (MJPG, up to 8 fps). Permission required: watch-always or ring event in past 5 minutes.

- id: get_live_image
  label: Get Live Image
  kind: action
  params: []
  description: Returns a single JPEG image. Permission required: watch-always or ring event in past 1 minute.

- id: open_door
  label: Open Door
  kind: action
  params:
    - name: r
      type: string
      required: false
      description: Relay to trigger in format "<doorcontrollerID>@<relay>" or just relay number. Default triggers physical relay 1.

- id: light_on
  label: Light On
  kind: action
  params: []
  description: Energizes the light relay.

- id: get_history_image
  label: Get History Image
  kind: action
  params:
    - name: index
      type: integer
      required: false
      default: 1
      description: Index of history image (1=latest, 1..50)
    - name: event
      type: string
      required: false
      default: doorbell
      description: Event type - doorbell or motionsensor

- id: monitor_events
  label: Monitor Events
  kind: action
  params:
    - name: ring
      type: string
      required: true
      description: Event types to monitor - doorbell,motionsensor

- id: get_live_audio
  label: Get Live Audio
  kind: action
  params: []
  description: Receives real-time audio (G.711 μ-law, 8000 Hz). Permission required: watch-always or ring event in past 5 minutes.

- id: transmit_audio
  label: Transmit Audio
  kind: action
  params: []
  description: Transmits audio (G.711 μ-law, 8000 Hz). Only one consumer can transmit at a time. AEC/ANR required on client side.

- id: get_info
  label: Get Device Info
  kind: action
  params: []
  description: Returns JSON with firmware version, build number, MAC address, relay configuration, and device type.

- id: restart
  label: Restart Device
  kind: action
  params: []
  description: Restarts the device. No diagnostic sound plays after restart. Returns 503 if device is busy (e.g., firmware update in progress).

- id: list_favorites
  label: List Favorites
  kind: action
  params: []
  description: Lists all configured favorites (SIP and HTTP) as JSON.

- id: save_favorite
  label: Save Favorite
  kind: action
  params:
    - name: action
      type: string
      required: true
      default: save
      description: Fixed value "save"
    - name: type
      type: string
      required: true
      description: Favorite type - sip or http
    - name: title
      type: string
      required: true
      description: Name/title of the favorite
    - name: value
      type: string
      required: true
      description: URL or SIP target
    - name: id
      type: integer
      required: false
      description: ID of existing favorite to update (omit for new)

- id: delete_favorite
  label: Delete Favorite
  kind: action
  params:
    - name: action
      type: string
      required: true
      default: remove
      description: Fixed value "remove"
    - name: type
      type: string
      required: true
      description: Favorite type - sip or http
    - name: id
      type: integer
      required: true
      description: ID of favorite to delete

- id: list_schedules
  label: List Schedules
  kind: action
  params:
    - name: input
      type: string
      required: false
      description: Filter by input event type - doorbell, motion, rfid, fingerprint
    - name: param
      type: string
      required: false
      description: Filter by input parameter (doorbell number, transponder ID, fingerprint ID)
  description: Lists all schedule entries as JSON. Returns 204 if no data for requested input.

- id: save_schedule
  label: Save Schedule
  kind: action
  params: []
  description: Adds or updates a schedule entry via POST with JSON body. Requires "API operator" permission.

- id: delete_schedule
  label: Delete Schedule
  kind: action
  params:
    - name: action
      type: string
      required: true
      default: remove
      description: Fixed value "remove"
    - name: input
      type: string
      required: true
      description: Input event type - doorbell, motion, rfid
    - name: param
      type: string
      required: false
      description: Doorbell number or transponder ID

- id: sip_register
  label: SIP Register
  kind: action
  params:
    - name: user
      type: string
      required: true
      description: SIP proxy authentication username
    - name: password
      type: string
      required: true
      description: SIP proxy authentication password
    - name: url
      type: string
      required: true
      description: SIP proxy IP/hostname

- id: sip_makecall
  label: SIP Make Call
  kind: action
  params:
    - name: url
      type: string
      required: true
      description: SIP URL to call (e.g. sip:108@192.168.123.22)

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
      required: false
      description: Enable/disable SIP registration after reboot (0..1)
    - name: mic_volume
      type: integer
      required: false
      description: Microphone volume (1..100, default 33)
    - name: spk_volume
      type: integer
      required: false
      description: Speaker volume (1..100, default 70)
    - name: dtmf
      type: integer
      required: false
      description: Enable/disable DTMF support (0..1, default 0)
    - name: relay1_passcode
      type: integer
      required: false
      description: Pincode for triggering door open relay via DTMF (0..99999999)
    - name: incoming_call_enable
      type: integer
      required: false
      description: Enable/disable incoming calls (0..1, default 0)
    - name: incoming_call_user
      type: string
      required: false
      description: Allowed SIP user for incoming calls (e.g. sip:10.0.0.1:5060)
    - name: anc
      type: integer
      required: false
      description: Enable/disable acoustic noise cancellation (0..1, default 1)
    - name: ring_time_limit
      type: integer
      required: false
      description: Maximum ringing time in seconds (10..300, default 300)
    - name: call_time_limit
      type: integer
      required: false
      description: Maximum call duration in seconds (30..300, default 300)

- id: sip_status
  label: SIP Status
  kind: action
  params: []

- id: sip_reset
  label: SIP Reset
  kind: action
  params: []
  description: Resets all SIP settings (proxy, registration, settings) except license. Hangs up any ongoing call.
```

## Feedbacks
```yaml
- id: get_session_response
  type: object
  fields:
    RETURNCODE:
      type: string
      description: "1" indicates success
    SESSIONID:
      type: string
      description: Temporary session ID valid for 10 minutes
    NOTIFICATION_ENCRYPTION_KEY:
      type: string
      description: Key for decrypting UDP event broadcasts (32-64 bytes, first 32 used for ChaCha20)

- id: get_info_response
  type: object
  fields:
    RETURNCODE:
      type: string
    FIRMWARE:
      type: string
      description: Firmware version number
    BUILD_NUMBER:
      type: string
      description: Build identifier
    PRIMARY_MAC_ADDR:
      type: string
      description: MAC address of primary interface (present if firmware >= 000109)
    RELAYS:
      type: array
      description: Array of relay identifiers including paired DoorController relays (present if firmware >= 000109)
    DEVICE-TYPE:
      type: string
      description: Device model name

- id: sip_status_response
  type: object
  fields:
    LASTERRORCODE:
      type: string
      description: Most recent SIP status code; "200" means successfully registered
    LASTERRORTEXT:
      type: string
      description: Most recent SIP error text

- id: door_opened_response
  type: object
  fields:
    RETURNCODE:
      type: string
      description: "1" indicates success

- id: light_on_response
  type: object
  fields:
    RETURNCODE:
      type: string
      description: "1" indicates success

- id: monitor_state
  type: enum
  values:
    - "H"  # High/triggered
    - "L"  # Low/idle
  description: Doorbell and motion sensor state stream via monitor.cgi

- id: http_status_codes
  type: enum
  values:
    - "200"
    - "204"
    - "400"
    - "401"
    - "423"
    - "500"
    - "503"
    - "507"
    - "509"
  description: HTTP status codes returned by API endpoints
```

## Variables
```yaml
# UNRESOLVED: device does not expose settable parameters via API in a discrete variable pattern.
# Configuration is done through favorites and schedules endpoints.
- id: favorites
  type: object
  description: SIP and HTTP favorites stored on device. Managed via favorites.cgi.

- id: schedules
  type: object
  description: Schedule entries for event-driven actions. Managed via schedule.cgi.

- id: sip_config
  type: object
  description: SIP settings (enable, volumes, DTMF, etc.). Managed via sip.cgi?action=settings.
```

## Events
```yaml
# Device sends UDP broadcasts on event occurrence.
# Since November 2023, v2 encryption uses ChaCha20-Poly1305 (v1 deprecated).
# v2 format: IDENT(3) + VERSION(1) + NONCE(8) + CIPHERTEXT(34)
# Decrypted CIPHERTEXT contains: INTERCOM_ID(6) + EVENT(8) + TIMESTAMP(4)
# Keep-alive broadcasts sent every 7 seconds on ports 6524 and 35344 - can be skipped.

- id: doorbell_event
  description: Doorbell button pressed. Event string padded with spaces, e.g. "1 " for doorbell number 1.
  fields:
    INTERCOM_ID:
      type: string
      description: First 6 characters of username - verify matches your user
    EVENT:
      type: string
      description: Event identifier padded to 8 chars (e.g. "1 " for doorbell, "motion  " for motion)
    TIMESTAMP:
      type: integer
      description: Unix timestamp of event

- id: motion_event
  description: Motion sensor triggered.
  fields:
    INTERCOM_ID:
      type: string
    EVENT:
      type: string
      description: "motion" padded to 8 chars
    TIMESTAMP:
      type: integer

- id: rfid_event
  description: RFID transponder detected (documented as coming soon in source)
  fields: []

- id: keypad_event
  description: Keypad code entered (documented as coming soon in source)
  fields: []
```

## Macros
```yaml
# Multi-step sequences are handled through schedule entries, not a discrete macro system.
# Schedules can combine input events (doorbell, motion, rfid, fingerprint) with output actions
# (notify, sip, relay, http) within time windows (once, from-to, weekdays).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source.
# Note: Audio streaming requires client-side AEC/ANR (echo cancellation not provided by device).
```

## Notes
The device enforces rate limits: maximum 1 concurrent connection per second for API access. Excessive failed authentication attempts result in IP/user blocking for 1 minute (HTTP 423 response). Only one simultaneous audio/video call is supported; concurrent requests receive HTTP 503 with a "Line busy" message.

Video and audio streaming requests via HTTPS require a session ID to avoid transmitting credentials in plaintext. Session IDs are valid for 10 minutes and must be obtained via getsession.cgi.

The device has a self-signed certificate pre-installed for HTTPS in the LAN since certificate authorities do not issue certificates for IP addresses.

RTSP streaming uses standard RTSP authentication on port 554, with RTSP-over-HTTP on port 8557. SIP operates on port 5060.

UDP event monitoring v2 uses ChaCha20-Poly1305 encryption with a key obtained from getsession.cgi (NOTIFICATION_ENCRYPTION_KEY). The key is valid until the user password changes.

<!-- UNRESOLVED: RS-232 serial control interface not documented in source -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: voltage/power specifications not stated in source -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not documented in source -->
<!-- UNRESOLVED: relay contact ratings not stated in source -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-04-30T04:32:23.927Z
last_checked_at: 2026-06-03T06:39:16.537Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T06:39:16.537Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions verified (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 serial control not documented in source"
- "no input/output routing commands in source"
- "no volume/gain/brightness commands in source"
- "device does not expose settable parameters via API in a discrete variable pattern."
- "no safety warnings or interlock procedures stated in source."
- "RS-232 serial control interface not documented in source"
- "firmware version compatibility range not stated in source"
- "voltage/power specifications not stated in source"
- "fault behavior and error recovery sequences not documented in source"
- "relay contact ratings not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
