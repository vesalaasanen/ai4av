---
spec_id: admin/doorbird-d2102kv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2102KV Control Spec"
manufacturer: Doorbird
model_family: D2102KV
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - D2102KV
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
last_checked_at: 2026-04-23T05:37:01.178Z
generated_at: 2026-04-23T05:37:01.178Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T05:37:01.178Z
  matched_actions: 24
  action_count: 24
  confidence: high
  summary: "All 24 spec actions matched literally in source; transport parameters verified; HTTP API fully covered."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D2102KV Control Spec

## Summary
The Doorbird D2102KV is a Video Door Station supporting IP-based control via HTTP/HTTPS API (LAN-2-LAN API), RTSP video streaming, SIP calling, and UDP event broadcasts. The device exposes doorbell, motion, RFID, and keypad events; supports door opener and light relay control; and supports audio intercom via G.711 μ-law codec.

<!-- UNRESOLVED: electrical specifications (voltage, current, power consumption) not stated in source -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  port: 80  # HTTP
  # UNRESOLVED: HTTPS port 443 stated but not populated as explicit port number
auth:
  type: basic  # Basic or Digest auth per RFC 2617; also supports http-user/http-password parameters
```

## Traits
```yaml
# Inferred from source command examples:
# - powerable: restart command present
# - queryable: info.cgi returns firmware/version state
# - levelable: mic_volume, spk_volume settings available via SIP
# - routable: SIP call initiation, door open/light relay triggers
```

## Actions
```yaml
- id: open_door
  label: Open Door
  kind: action
  params:
    - name: relay
      type: string
      description: "Relay identifier (optional). Default triggers physical relay 1. Format: relay number or doorcontrollerID@relay (e.g. '1', 'gggaaa@1')"

- id: light_on
  label: Light On
  kind: action
  params: []

- id: live_video_mjpg
  label: Live Video (MJPG)
  kind: action
  params: []

- id: live_image
  label: Live Image Snapshot
  kind: action
  params: []

- id: history_image
  label: History Image
  kind: action
  params:
    - name: index
      type: integer
      description: History index (1 = latest, range 1-50)
    - name: event
      type: string
      description: "Event type: 'doorbell' or 'motionsensor' (optional, default: doorbell for DoorBird, input trigger for BirdGuard)"

- id: monitor_events
  label: Monitor Events
  kind: action
  params:
    - name: ring
      type: string
      description: "Event types to monitor: 'doorbell' and/or 'motionsensor' (comma-separated)"

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
      description: "Favorite type: 'sip' or 'http'"
    - name: title
      type: string
      description: Name/title of the favorite
    - name: value
      type: string
      description: URL or SIP address
    - name: id
      type: integer
      description: "(Optional) ID of existing favorite to update"

- id: delete_favorite
  label: Delete Favorite
  kind: action
  params:
    - name: action
      type: string
      const: remove
    - name: type
      type: string
      description: "Favorite type: 'sip' or 'http'"
    - name: id
      type: integer
      description: ID of the favorite to delete

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
      description: "Input event type: 'doorbell', 'motion', 'rfid', or 'fingerprint'"
    - name: param
      type: string
      description: "Parameter value for the input (e.g. doorbell number, transponder ID, fingerprint ID)"
    - name: output
      type: array
      description: "JSON array of output action configurations"

- id: delete_schedule
  label: Delete Schedule
  kind: action
  params:
    - name: action
      type: string
      const: remove
    - name: input
      type: string
      description: "Input event type: 'doorbell', 'motion', or 'rfid'"
    - name: param
      type: string
      description: "Doorbell number, transponder ID, or fingerprint ID"

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
      description: SIP Proxy authentication user
    - name: password
      type: string
      description: SIP Proxy authentication password
    - name: url
      type: string
      description: IP/Hostname of the SIP Proxy

- id: sip_makecall
  label: SIP Make Call
  kind: action
  params:
    - name: action
      type: string
      const: makecall
    - name: url
      type: string
      description: SIP URL to call (e.g. sip:108@192.168.123.22)

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
      description: "0..1: Enable or disable SIP registration after reboot (default: 0)"
    - name: mic_volume
      type: integer
      description: "1..100: Microphone volume (default: 33)"
    - name: spk_volume
      type: integer
      description: "1..100: Speaker volume (default: 70)"
    - name: dtmf
      type: integer
      description: "0..1: Enable or disable DTMF support (default: 0)"
    - name: relay1_passcode
      type: integer
      description: "0..99999999: Pincode for triggering door open relay"
    - name: incoming_call_enable
      type: integer
      description: "0..1: Enable or disable incoming calls (default: 0)"
    - name: incoming_call_user
      type: string
      description: "Allowed SIP user (e.g. 'sip:10.0.0.1:5060')"
    - name: anc
      type: integer
      description: "0..1: Enable or disable acoustic noise cancellation (default: 1)"
    - name: ring_time_limit
      type: integer
      description: "10..300: Maximum ringing time in seconds (default: 300)"
    - name: call_time_limit
      type: integer
      description: "30..300: Maximum call duration in seconds (default: 300)"

- id: sip_status
  label: SIP Status
  kind: action
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
# HTTP status codes and JSON responses:
# - RETURNCODE in JSON responses indicates success/failure
# - 200: OK, 204: No permission or no data, 400: Invalid parameters
# - 401: Authentication required, 423: Blocked (wrong credentials)
# - 503: Busy (line in use), 507: Size limit exceeded
```

## Variables
```yaml
# Device info from /bha-api/info.cgi:
- id: firmware_version
  label: Firmware Version
  type: string
- id: build_number
  label: Build Number
  type: string
- id: primary_mac_addr
  label: Primary MAC Address
  type: string
- id: device_type
  label: Device Type
  type: string
- id: relays
  label: Available Relays
  type: array
  description: "Array of relay identifiers including paired DoorController relays"

# SIP status from /bha-api/sip.cgi?action=status:
- id: sip_lasterrorcode
  label: SIP Last Error Code
  type: string
- id: sip_lasterrortext
  label: SIP Last Error Text
  type: string

# SIP settings (readable via sip.cgi?action=status):
- id: sip_mic_volume
  label: SIP Microphone Volume
  type: integer
- id: sip_spk_volume
  label: SIP Speaker Volume
  type: integer
- id: sip_enable
  label: SIP Enabled
  type: boolean
```

## Events
```yaml
# UDP event broadcasts on ports 6524 and 35344 (v2, ChaCha20-Poly1305 encrypted):
# Format after decryption:
# - INTERCOM_ID: 6 chars from username
# - EVENT: 8-char string ("doorbell", "motionsensor", etc., padded with spaces)
# - TIMESTAMP: Unix timestamp
#
# Monitor CGI (HTTP) returns:
# - doorbell:H / doorbell:L (HIGH/LOW state transitions)
# - motionsensor:H / motionsensor:L
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
# Note: Door open relay triggers physical door release - user should verify safe operation
```

## Notes
- HTTP API supports Basic or Digest authentication per RFC 2617, or `http-user`/`http-password` query parameters (less secure)
- HTTPS uses self-signed certificate on port 443 (CA not issued for IP addresses)
- Session ID valid for 10 minutes; notification encryption key obtained via `getsession.cgi`
- Video streaming via MJPG (HTTP, up to 8 fps) or H.264 (RTSP on port 554, up to 12 fps)
- Audio: G.711 μ-law codec at 8000 Hz sampling; client must handle AEC/ANR
- SIP calls on port 5060; each call terminates after 180 seconds (auto-hangup)
- UDP event broadcasts on ports 6524 and 35344 (keep-alive packets every 7 seconds)
- Maximum 1 concurrent API connection per second; 1 concurrent video/audio call
- HTTP 423 response indicates IP blocked for 1 minute after excessive auth failures
- RTSP-over-HTTP on port 8557; RTSP standard port 554
- Firmware 000110+ required for favorites and schedules API
- <!-- UNRESOLVED: firmware compatibility range not stated -->
- <!-- UNRESOLVED: electrical specifications (voltage/current/power) not stated -->
- <!-- UNRESOLVED: fault behavior and error recovery procedures not documented -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-04-30T04:32:18.464Z
last_checked_at: 2026-04-23T05:37:01.178Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T05:37:01.178Z
matched_actions: 24
action_count: 24
confidence: high
summary: "All 24 spec actions matched literally in source; transport parameters verified; HTTP API fully covered."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
