---
spec_id: admin/doorbird-a1103t-polar-white-edition
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird A1103T Polar White Edition Control Spec"
manufacturer: DoorBird
model_family: "DoorBird A1103T Polar White Edition"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "DoorBird A1103T Polar White Edition"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-14T07:24:04.913Z
last_checked_at: 2026-07-21T21:59:57.187Z
generated_at: 2026-07-21T21:59:57.187Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "User-declared known protocol \"RS-232C\" does not match the source document, which describes only HTTP/HTTPS, RTSP, SIP, and UDP interfaces. No RS-232C / serial content found anywhere in the source. This spec reflects the actual source content."
  - "Source is a generic DoorBird LAN-2-LAN API document, not A1103T-specific. Applicability of every endpoint to the A1103T model is assumed but not confirmed."
  - "no other settable variables identified in source."
  - "no multi-step sequences explicitly described as macros in source."
  - "no explicit safety interlock procedures or power-on sequencing documented in source."
  - "User-declared protocol \"RS-232C\" has no corresponding content in the source document. Source describes HTTP, HTTPS, RTSP, SIP, and UDP only."
  - "A1103T-specific features, limitations, or differences from generic API not documented in source."
  - "Default video resolution and compression values defined in \"system configuration\" — not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-21T21:59:57.187Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 HTTP/REST control actions matched verbatim in source; transport (port 80, basic auth, base URL pattern) confirmed; no undocumented commands. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# DoorBird A1103T Polar White Edition Control Spec

## Summary
The DoorBird A1103T Polar White Edition is a video door station controllable via an HTTP-based LAN-2-LAN API (TCP port 80 / HTTPS port 443). The API exposes door relay control, live video/image/audio streams, event monitoring (UDP broadcast), SIP telephony, favorites/schedule management, and device info queries. The source document is the generic DoorBird/BirdGuard LAN-2-LAN API reference, not model-specific to the A1103T.

<!-- UNRESOLVED: User-declared known protocol "RS-232C" does not match the source document, which describes only HTTP/HTTPS, RTSP, SIP, and UDP interfaces. No RS-232C / serial content found anywhere in the source. This spec reflects the actual source content. -->
<!-- UNRESOLVED: Source is a generic DoorBird LAN-2-LAN API document, not A1103T-specific. Applicability of every endpoint to the A1103T model is assumed but not confirmed. -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 80  # HTTP; HTTPS also available on TCP port 443 per source
  base_url: "http://<device-ip>/bha-api/"
auth:
  type: basic  # RFC 2617 Basic or Digest authentication; plaintext http-user/http-password params also supported
# UDP event broadcasts sent on ports 6524 and 35344 (ChaCha20-Poly1305 encrypted, v2 format)
# RTSP live video available on port 554 (RTSP) and port 8557 (RTSP-over-HTTP)
# SIP service listens on port 5060 (from device version 000099)
```

## Traits
```yaml
# Inferred from source evidence:
traits:
  - queryable  # inferred: info.cgi, sip status, favorites list, schedule list, monitor stream return state
  - levelable  # inferred: mic_volume / spk_volume (1..100) in SIP settings
```

## Actions
```yaml
actions:
  # --- Session Management ---
  - id: get_session
    label: Create Session ID
    kind: action
    command: "GET http://<device-ip>/bha-api/getsession.cgi"
    params: []
    notes: "Returns JSON with SESSIONID (valid 10 min) and NOTIFICATION_ENCRYPTION_KEY. Required for HTTPS video/audio streaming without plaintext credentials."

  - id: invalidate_session
    label: Invalidate Session ID
    kind: action
    command: "GET http://<device-ip>/bha-api/getsession.cgi?invalidate=<old_session_id>"
    params:
      - name: old_session_id
        type: string
        description: Session ID to invalidate
    notes: "Destroys a previously created session."

  # --- Door / Relay Control ---
  - id: open_door
    label: Open Door / Trigger Relay
    kind: action
    command: "GET http://<device-ip>/bha-api/open-door.cgi?r=<relay>"
    params:
      - name: relay
        type: string
        description: "Relay to trigger, e.g. '1', '2', or '<doorcontrollerID>@<relay>' for paired IP I/O DoorController. If omitted, physical relay 1 is triggered."
        required: false
    notes: "Energizes the door opener / alarm output relay. Requires 'watch always' permission or ring event in past 5 minutes."

  - id: light_on
    label: Light On
    kind: action
    command: "GET http://<device-ip>/bha-api/light-on.cgi"
    params: []
    notes: "Energizes the light relay. Requires 'watch always' permission or ring event in past 5 minutes."

  # --- Video / Image ---
  - id: live_video
    label: Live Video Request
    kind: action
    command: "GET http://<device-ip>/bha-api/video.cgi"
    params: []
    notes: "Returns multipart JPEG (multipart/x-mixed-replace) live stream, up to 8 fps. Not available via HTTPS; use session ID for encrypted access."

  - id: live_image
    label: Live Image Request
    kind: action
    command: "GET http://<device-ip>/bha-api/image.cgi"
    params: []
    notes: "Returns single JPEG still image (image/jpeg). Requires 'watch always' or ring event in past 1 minute."

  - id: history_image
    label: History Image Request
    kind: action
    command: "GET http://<device-ip>/bha-api/history.cgi?index=<index>&event=<event>"
    params:
      - name: index
        type: integer
        description: "Index of history image (1..50), where 1 is the latest."
        required: true
      - name: event
        type: string
        description: "Event type: 'doorbell' or 'motionsensor'. Default is ring history for DoorBird / input trigger history for BirdGuard."
        required: false
    notes: "Returns JPEG history image stored in cloud. Requires history permission; motion permission needed for motion event images."

  # --- Audio ---
  - id: audio_receive
    label: Live Audio Receive
    kind: action
    command: "GET http://<device-ip>/bha-api/audio-receive.cgi"
    params: []
    notes: "Returns real-time G.711 µ-law audio (8000 Hz). Not available via HTTPS; use session ID for encrypted access."

  - id: audio_transmit
    label: Live Audio Transmit
    kind: action
    command: "POST http://<device-ip>/bha-api/audio-transmit.cgi"
    params: []
    notes: "Transmit G.711 µ-law audio to device. Content-Type: audio/basic. Only one consumer can transmit at a time."

  # --- Monitoring ---
  - id: monitor
    label: Monitor Request
    kind: action
    command: "GET http://<device-ip>/bha-api/monitor.cgi?ring=<ring>"
    params:
      - name: ring
        type: string
        description: "Comma-separated event types to monitor: 'doorbell', 'motionsensor'."
        required: true
    notes: "Continuous multipart stream of doorbell/motionsensor state (H=active, L=inactive). Up to 8 concurrent streams allowed; HTTP 509 if all busy."

  # --- Device Info ---
  - id: info_request
    label: Info Request
    kind: query
    command: "GET http://<device-ip>/bha-api/info.cgi"
    params: []
    notes: "Returns JSON with firmware version, build number, primary MAC address, relays configuration, and device type."

  # --- Device Restart ---
  - id: restart
    label: Restart Device
    kind: action
    command: "GET http://<device-ip>/bha-api/restart.cgi"
    params: []
    notes: "Restarts the device. HTTP 503 if device busy (e.g. firmware update in progress). No diagnostic sound after restart."

  # --- Favorites Management ---
  - id: list_favorites
    label: List Favorites
    kind: query
    command: "GET http://<device-ip>/bha-api/favorites.cgi"
    params: []
    notes: "Returns all configured favorites (sip, http) as JSON. Requires 'API operator' permission. Firmware 000110+ required."

  - id: save_favorite
    label: Add or Change Favorite
    kind: action
    command: "GET http://<device-ip>/bha-api/favorites.cgi?action=save&type=<type>&title=<title>&value=<value>&id=<id>"
    params:
      - name: type
        type: string
        description: "Favorite type: 'sip' or 'http'. Cannot be changed on existing favorite."
        required: true
      - name: title
        type: string
        description: "Name or short description of the favorite."
        required: true
      - name: value
        type: string
        description: "URL or address (HTTP(S) URL or SIP target), including credentials if needed."
        required: true
      - name: id
        type: integer
        description: "ID of existing favorite to change. Omit when creating new."
        required: false
    notes: "New favorite ID returned in 'favoriteid' response header. Requires 'API operator' permission."

  - id: delete_favorite
    label: Delete Favorite
    kind: action
    command: "GET http://<device-ip>/bha-api/favorites.cgi?action=remove&type=<type>&id=<id>"
    params:
      - name: type
        type: string
        description: "Favorite type: 'sip' or 'http'."
        required: true
      - name: id
        type: integer
        description: "ID of the favorite to delete."
        required: true
    notes: "If favorite is used in a schedule, the schedule entry is also removed. Requires 'API operator' permission."

  # --- Schedule Management ---
  - id: list_schedules
    label: List Schedules
    kind: query
    command: "GET http://<device-ip>/bha-api/schedule.cgi"
    params: []
    notes: "Returns all configured schedules as JSON. Requires 'API operator' permission. Firmware 000110+ required."

  - id: save_schedule
    label: Add or Update Schedule Entry
    kind: action
    command: "POST http://<device-ip>/bha-api/schedule.cgi"
    params:
      - name: body
        type: json
        description: "JSON object with input (doorbell|motion|rfid|fingerprint), param, and output array (event: notify|sip|relay|http, with schedule config)."
        required: true
    notes: "One request per input type. Schedule types: once, from-to (epoch seconds UTC), weekdays (seconds from Sunday 0:00, max 604799). Requires 'API operator' permission."

  - id: delete_schedule
    label: Delete Schedule Entry
    kind: action
    command: "GET http://<device-ip>/bha-api/schedule.cgi?action=remove&input=<input>&param=<param>"
    params:
      - name: input
        type: string
        description: "Input event type: 'doorbell', 'motion', or 'rfid'."
        required: true
      - name: param
        type: string
        description: "ID of the schedule entry (doorbell number, RFID transponder id, etc.)."
        required: true
    notes: "Requires 'API operator' permission."

  # --- SIP ---
  - id: sip_registration
    label: SIP Registration
    kind: action
    command: "GET http://<device-ip>/bha-api/sip.cgi?action=registration&user=<user>&password=<password>&url=<url>"
    params:
      - name: user
        type: string
        description: "Authentication user for the SIP Proxy."
        required: true
      - name: password
        type: string
        description: "Authentication password for the SIP Proxy."
        required: true
      - name: url
        type: string
        description: "IP/Hostname of the SIP Proxy."
        required: true
    notes: "Not necessary for peer-2-peer calls. Requires 'API operator' permission."

  - id: sip_makecall
    label: SIP Make Call
    kind: action
    command: "GET http://<device-ip>/bha-api/sip.cgi?action=makecall&url=<url>"
    params:
      - name: url
        type: string
        description: "SIP URL to call (e.g. sip:108@192.168.123.22)."
        required: true
    notes: "Manually initiates SIP call (P2P or via PBX). Wait min 3 seconds between SIP requests. HTTP 503 if line busy."

  - id: sip_hangup
    label: SIP Hangup
    kind: action
    command: "GET http://<device-ip>/bha-api/sip.cgi?action=hangup"
    params: []
    notes: "Hangs up the current SIP call. Returns 200 even if no call ongoing."

  - id: sip_settings
    label: SIP Settings
    kind: action
    command: "GET http://<device-ip>/bha-api/sip.cgi?action=settings&<parameter>=<value>"
    params:
      - name: enable
        type: integer
        description: "0..1 - Enable/disable SIP registration after reboot. Default: 0."
      - name: mic_volume
        type: integer
        description: "1..100 - Microphone volume. Default: 33."
      - name: spk_volume
        type: integer
        description: "1..100 - Speaker volume. Default: 70."
      - name: dtmf
        type: integer
        description: "0..1 - Enable/disable DTMF support. Default: 0."
      - name: autocall_doorbell_url
        type: string
        description: "DEPRECATED (use schedule.cgi). SIP URL to auto-call on doorbell, or 'none' to disable. Default: 'none'."
      - name: relay1_passcode
        type: integer
        description: "0..99999999 - Pincode for triggering door open relay via DTMF."
      - name: incoming_call_enable
        type: integer
        description: "0..1 - Enable/disable incoming calls. Default: 0."
      - name: incoming_call_user
        type: string
        description: "Allowed SIP user authenticated for DoorBird (e.g. 'sip:10.0.0.1:5060')."
      - name: anc
        type: integer
        description: "0..1 - Enable/disable acoustic noise cancellation. Default: 1."
      - name: ring_time_limit
        type: integer
        description: "10..300 - Maximum ringing time in seconds. Default: 300."
      - name: call_time_limit
        type: integer
        description: "30..300 - Maximum call duration in seconds. Default: 300."
    notes: "Configure SIP-related settings. Requires 'API operator' permission."

  - id: sip_status
    label: SIP Status Query
    kind: query
    command: "GET http://<device-ip>/bha-api/sip.cgi?action=status"
    params: []
    notes: "Returns JSON with LASTERRORCODE (most recent SIP status code; '200' = registered) and LASTERRORTEXT."

  - id: sip_reset
    label: SIP Settings Reset
    kind: action
    command: "GET http://<device-ip>/bha-api/sip.cgi?action=reset"
    params: []
    notes: "Resets all SIP settings except license. Hangs up any ongoing call."
```

## Feedbacks
```yaml
feedbacks:
  - id: doorbell_state
    type: enum
    values: [H, L]
    description: "Doorbell button state from monitor.cgi stream (H=pressed, L=not pressed)."

  - id: motionsensor_state
    type: enum
    values: [H, L]
    description: "Motion sensor state from monitor.cgi stream (H=active, L=inactive)."

  - id: firmware_version
    type: string
    description: "Firmware version string from info.cgi (e.g. '000109')."

  - id: build_number
    type: string
    description: "Build number from info.cgi (e.g. '15120529')."

  - id: relays_config
    type: array
    description: "Relay identifiers from info.cgi (e.g. ['1', '2', 'gggaaa@1'])."

  - id: sip_last_error_code
    type: string
    description: "Most recent SIP status code from sip.cgi?action=status ('200' = registered)."

  - id: sip_last_error_text
    type: string
    description: "Most recent SIP error text from sip.cgi?action=status."

  - id: session_id
    type: string
    description: "Session ID from getsession.cgi (valid 10 minutes)."

  - id: notification_encryption_key
    type: string
    description: "Key from getsession.cgi used to decrypt UDP event broadcasts (ChaCha20, first 32 bytes). Valid until user password changes."
```

## Variables
```yaml
# No continuously settable non-discrete variables beyond SIP settings params
# (mic_volume, spk_volume) which are covered as action params in sip_settings.
# UNRESOLVED: no other settable variables identified in source.
```

## Events
```yaml
events:
  - id: udp_doorbell_event
    description: "UDP broadcast on ports 6524 and 35344 when doorbell is pressed. ChaCha20-Poly1305 encrypted (v2). Plaintext contains INTERCOM_ID (6 chars), EVENT (doorbell number, 8 chars space-padded), TIMESTAMP (Unix long). IDENT bytes: 0xDE 0xAD 0xBE, VERSION: 0x02."

  - id: udp_motion_event
    description: "UDP broadcast on ports 6524 and 35344 when motion sensor triggers. Same encryption format as doorbell event; EVENT field contains 'motion'."

  - id: udp_keepalive
    description: "Keep-alive UDP broadcast every 7 seconds on ports 6524 and 35344. Not relevant for event decryption - can be skipped."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described as macros in source.
```

## Safety
```yaml
confirmation_required_for:
  - open_door  # energizes physical door opener relay - grants building access
  - restart    # restarts device, causing downtime
interlocks:
  - "open-door.cgi and light-on.cgi require 'watch always' permission or a ring event in the past 5 minutes; otherwise returns HTTP 204."
  - "Only one simultaneous SIP call supported; auto-hangup 180 seconds after initiation."
  - "Audio/video streams can be interrupted at any time by official DoorBird App (takes precedence)."
  - "Max 1 concurrent API connection per second; excessive wrong credentials block IP/user for 1 minute (HTTP 423)."
# UNRESOLVED: no explicit safety interlock procedures or power-on sequencing documented in source.
```

## Notes
- Source document is the generic DoorBird/BirdGuard LAN-2-LAN API reference — not specific to the A1103T model. RTSP 720p stream requires D10x/D21x firmware 129+; 1080p requires D11x only. A1103T stream resolution support is UNRESOLVED.
- API rate limit: maximum 1 concurrent connection per second. Wrong credentials trigger 1-minute IP/user block (HTTP 423).
- Video/audio streaming not available via HTTPS in LAN; must obtain temporary session ID via getsession.cgi (valid 10 min) and append as `sessionid` parameter.
- Audio codec: G.711 µ-law, 8000 Hz. Client must implement its own AEC/ANR — DoorBird native AEC/ANR not available to third parties.
- SIP: from device version 000099, P2P SIP supported on port 5060. Wait minimum 3 seconds between SIP requests.
- Favorites/schedules require firmware 000110+ and 'API operator' permission.
- UDP event monitoring v2 (ChaCha20-Poly1305) replaces deprecated v1 (Argon2i-based, version 0x01). v1 will be removed in future.

<!-- UNRESOLVED: User-declared protocol "RS-232C" has no corresponding content in the source document. Source describes HTTP, HTTPS, RTSP, SIP, and UDP only. -->
<!-- UNRESOLVED: A1103T-specific features, limitations, or differences from generic API not documented in source. -->
<!-- UNRESOLVED: Default video resolution and compression values defined in "system configuration" — not stated in source. -->
```

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-14T07:24:04.913Z
last_checked_at: 2026-07-21T21:59:57.187Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:59:57.187Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 HTTP/REST control actions matched verbatim in source; transport (port 80, basic auth, base URL pattern) confirmed; no undocumented commands. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "User-declared known protocol \"RS-232C\" does not match the source document, which describes only HTTP/HTTPS, RTSP, SIP, and UDP interfaces. No RS-232C / serial content found anywhere in the source. This spec reflects the actual source content."
- "Source is a generic DoorBird LAN-2-LAN API document, not A1103T-specific. Applicability of every endpoint to the A1103T model is assumed but not confirmed."
- "no other settable variables identified in source."
- "no multi-step sequences explicitly described as macros in source."
- "no explicit safety interlock procedures or power-on sequencing documented in source."
- "User-declared protocol \"RS-232C\" has no corresponding content in the source document. Source describes HTTP, HTTPS, RTSP, SIP, and UDP only."
- "A1103T-specific features, limitations, or differences from generic API not documented in source."
- "Default video resolution and compression values defined in \"system configuration\" — not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
