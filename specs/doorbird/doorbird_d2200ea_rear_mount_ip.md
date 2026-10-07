---
spec_id: admin/doorbird-d2200ea-rear-mount
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird D2200EA Rear Mount Control Spec"
manufacturer: DoorBird
model_family: D2200EA
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - D2200EA
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/en/api
retrieved_at: 2026-08-15T06:23:39.101Z
last_checked_at: 2026-10-01T12:50:34.807Z
generated_at: 2026-10-01T12:50:34.807Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RTSP video interface is documented but RTSP is not declared as a primary control transport; not enumerated as Actions."
  - "explicit power on/off commands not present in source"
  - "dedicated state-query endpoints not documented (info.cgi returns version info only)"
  - "no volume/brightness commands present"
  - "no discrete settable parameter endpoints documented outside SIP settings (which are captured as Actions)."
  - "no explicit multi-step macros documented in source."
  - "no explicit safety warnings, interlocks, or power-on sequencing requirements stated in source."
  - "SIP listen port (5060) mentioned but device also listens on standard SIP port for incoming P2P calls — incoming-call port not separately enumerated as an Action."
verification:
  verdict: verified
  checked_at: 2026-10-01T12:50:34.807Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec action units map literally to documented DoorBird LAN-2-LAN CGI endpoints; transport port 80 and RFC 2617 auth are sourced verbatim. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-15
---

# DoorBird D2200EA Rear Mount Control Spec

## Summary
This spec describes the LAN-2-LAN HTTP API for the DoorBird D2200EA video door station (rear mount variant). It covers HTTP-based control endpoints for live video, audio, relay triggering, favorites, schedules, SIP configuration, and encrypted UDP event broadcasts. All endpoints require Basic or Digest authentication per RFC 2617.

<!-- UNRESOLVED: RTSP video interface is documented but RTSP is not declared as a primary control transport; not enumerated as Actions. -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 80
auth:
  type: basic_or_digest  # per RFC 2617; alternatively plaintext http-user/http-password query params
```

## Traits
```yaml
# - powerable       # UNRESOLVED: explicit power on/off commands not present in source
- routable  # inferred from relay-triggering commands (open-door, light-on)
# - queryable       # UNRESOLVED: dedicated state-query endpoints not documented (info.cgi returns version info only)
# - levelable       # UNRESOLVED: no volume/brightness commands present
```

## Actions
```yaml
- id: get_session
  label: Get Session
  kind: query
  command: "GET /bha-api/getsession.cgi"
  params: []
- id: invalidate_session
  label: Invalidate Session
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate={session_id}"
  params:
    - name: session_id
      type: string
      description: Session ID to invalidate
- id: live_video_request
  label: Live Video Request
  kind: query
  command: "GET /bha-api/video.cgi"
  params: []
- id: live_image_request
  label: Live Image Request
  kind: query
  command: "GET /bha-api/image.cgi"
  params: []
- id: open_door
  label: Open Door (Trigger Relay)
  kind: action
  command: "GET /bha-api/open-door.cgi?r={relay}"
  params:
    - name: relay
      type: string
      description: "Relay identifier, e.g. 1, 2, or <doorcontrollerID>@<relay> for paired IP I/O DoorController. Defaults to physical relay 1 when omitted."
- id: light_on
  label: Light On (Trigger Light Relay)
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []
- id: history_image_request
  label: History Image Request
  kind: query
  command: "GET /bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: History image index (1..50, 1 = latest)
    - name: event
      type: string
      description: "Event type filter: doorbell or motionsensor (optional, defaults to ring history)"
- id: monitor_request
  label: Monitor Request (Continuous Event Stream)
  kind: query
  command: "GET /bha-api/monitor.cgi?ring={ring}"
  params:
    - name: ring
      type: string
      description: "Comma-separated event types to monitor: doorbell, motionsensor"
- id: live_audio_receive
  label: Live Audio Receive
  kind: query
  command: "GET /bha-api/audio-receive.cgi?sessionid={session_id}"
  params:
    - name: session_id
      type: string
      description: Temporary session ID (valid for 10 minutes)
- id: live_audio_transmit
  label: Live Audio Transmit
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params: []
- id: info_request
  label: Device Info Request
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []
- id: list_favorites
  label: List Favorites
  kind: query
  command: "GET /bha-api/favorites.cgi"
  params: []
- id: add_or_change_favorite
  label: Add or Change Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: type
      type: string
      description: "sip or http"
    - name: title
      type: string
      description: Name or short description
    - name: value
      type: string
      description: "URL including protocol and credentials (HTTP(S) URL or SIP target)"
    - name: id
      type: integer
      description: "Optional: ID of existing favorite to change; omit for new"
- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: type
      type: string
      description: "sip or http"
    - name: id
      type: integer
      description: ID of the favorite to delete
- id: list_schedules
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []
- id: add_or_update_schedule
  label: Add or Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params: []
- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: input
      type: string
      description: "Input event type: doorbell, motion, rfid"
    - name: param
      type: string
      description: "ID of schedule entry to delete (doorbell number, transponder id, etc.)"
- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []
- id: sip_register
  label: SIP Register
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
      description: Authentication user for SIP Proxy
    - name: password
      type: string
      description: Authentication password for SIP Proxy
    - name: url
      type: string
      description: IP/Hostname of the SIP Proxy
- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: SIP URL to call
- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params: []
- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&enable={enable}&mic_volume={mic_volume}&spk_volume={spk_volume}&dtmf={dtmf}&autocall_doorbell_url={autocall_doorbell_url}&relay1_passcode={relay1_passcode}&incoming_call_enable={incoming_call_enable}&incoming_call_user={incoming_call_user}&anc={anc}&ring_time_limit={ring_time_limit}&call_time_limit={call_time_limit}"
  params:
    - name: enable
      type: integer
      description: "0 or 1 - enable SIP registration after reboot (default 0)"
    - name: mic_volume
      type: integer
      description: "1..100 - microphone volume (default 33)"
    - name: spk_volume
      type: integer
      description: "1..100 - speaker volume (default 70)"
    - name: dtmf
      type: integer
      description: "0 or 1 - enable DTMF support (default 0)"
    - name: autocall_doorbell_url
      type: string
      description: 'DEPRECATED: SIP URL to auto-call on doorbell event, or "none" (default "none")'
    - name: relay1_passcode
      type: integer
      description: "0..99999999 - PIN code for triggering door open relay via DTMF"
    - name: incoming_call_enable
      type: integer
      description: "0 or 1 - enable incoming calls (default 0)"
    - name: incoming_call_user
      type: string
      description: 'Allowed SIP user, e.g. "sip:10.0.0.1:5060"'
    - name: anc
      type: integer
      description: "0 or 1 - enable acoustic noise cancellation (default 1)"
    - name: ring_time_limit
      type: integer
      description: "10..300 - maximum ringing time in seconds (default 300)"
    - name: call_time_limit
      type: integer
      description: "30..300 - maximum call duration in seconds (default 300)"
- id: sip_status
  label: SIP Status
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  params: []
- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  params: []
```

## Feedbacks
```yaml
- id: session_id
  type: string
  values: []
  description: Temporary session ID (valid 10 minutes), returned by get_session.
- id: notification_encryption_key
  type: string
  values: []
  description: ChaCha20 key for decrypting UDP event broadcasts; returned by get_session.
- id: device_info
  type: object
  values: []
  description: JSON object with FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS, DEVICE-TYPE - returned by info_request.
- id: doorbell_state
  type: enum
  values: [high, low]
  description: Reported by monitor stream; H = doorbell pressed, L = idle.
- id: motion_state
  type: enum
  values: [high, low]
  description: Reported by monitor stream; H = motion detected, L = idle.
- id: sip_status
  type: object
  values: []
  description: JSON with LASTERRORCODE and LASTERRORTEXT; 200 means successfully registered.
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameter endpoints documented outside SIP settings (which are captured as Actions).
```

## Events
```yaml
- id: doorbell_event
  label: Doorbell Event
  description: ChaCha20-Poly1305 encrypted UDP broadcast on ports 6524 and 35344. Plaintext fields: INTERCOM_ID (6 bytes), EVENT ("doorbell" + doorbell number, 8 bytes space-padded), TIMESTAMP (4-byte Unix timestamp).
- id: motion_event
  label: Motion Event
  description: Same UDP broadcast format as doorbell_event; EVENT field = "motion".
- id: keepalive_broadcast
  label: UDP Keepalive
  description: Sent every 7 seconds on ports 6524 and 35344; not relevant for event decryption.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing requirements stated in source.
# Note: SIP calls auto-terminate after 180 seconds; calls drop when the official DoorBird App takes over audio/video.
```

## Notes
The HTTP interface supports both port 80 (HTTP) and port 443 (HTTPS). HTTPS uses a self-signed certificate; clients must accept it. The device limits API access to 1 concurrent connection per second. Repeated authentication failures result in IP/user block for 1 minute (HTTP 423). Video door station supports only one simultaneous audio/video call — other callers receive HTTP 503.

Audio streaming requires a temporary Session ID (10-minute validity) appended as query parameter rather than credentials in plaintext. Audio codec is G.711 µ-law at 8000 Hz; clients must implement their own AEC/ANR.

Event broadcasts (UDP on ports 6524 and 35344) use IDENT `0xDE 0xAD 0xBE` and VERSION `0x02` for ChaCha20-Poly1305 encryption. Deprecated VERSION `0x01` (Argon2i) remains supported but should be migrated. The NOTIFICATION_ENCRYPTION_KEY from get_session.cgi is used as the decryption key (first 32 bytes for ChaCha20).

Favorites and schedules require firmware 000110 or higher and the "API operator" user permission. The legacy `autocall_doorbell_url` SIP setting is deprecated in favor of schedule.cgi entries.

RTSP video interface exists on port 554 (RTSP) and port 8557 (RTSP-over-HTTP) but is not enumerated as Actions in this spec — see vendor docs for rtsp://<device-ip>/mpeg/media.amp and resolution variants.

<!-- UNRESOLVED: SIP listen port (5060) mentioned but device also listens on standard SIP port for incoming P2P calls — incoming-call port not separately enumerated as an Action. -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/en/api
retrieved_at: 2026-08-15T06:23:39.101Z
last_checked_at: 2026-10-01T12:50:34.807Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T12:50:34.807Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec action units map literally to documented DoorBird LAN-2-LAN CGI endpoints; transport port 80 and RFC 2617 auth are sourced verbatim. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RTSP video interface is documented but RTSP is not declared as a primary control transport; not enumerated as Actions."
- "explicit power on/off commands not present in source"
- "dedicated state-query endpoints not documented (info.cgi returns version info only)"
- "no volume/brightness commands present"
- "no discrete settable parameter endpoints documented outside SIP settings (which are captured as Actions)."
- "no explicit multi-step macros documented in source."
- "no explicit safety warnings, interlocks, or power-on sequencing requirements stated in source."
- "SIP listen port (5060) mentioned but device also listens on standard SIP port for incoming P2P calls — incoming-call port not separately enumerated as an Action."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
