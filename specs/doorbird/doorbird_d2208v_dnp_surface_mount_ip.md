---
spec_id: admin/doorbird-d2208v-dnp-surface-mount
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird D2208V DNP Surface-mount Control Spec"
manufacturer: DoorBird
model_family: "D2208V DNP Surface-mount"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "D2208V DNP Surface-mount"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/en/api
retrieved_at: 2026-08-15T06:16:48.332Z
last_checked_at: 2026-08-19T09:21:38.711Z
generated_at: 2026-08-19T09:21:38.711Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "D2208V-specific firmware feature matrix not stated; some CGI endpoints are firmware-gated (e.g. favorites.cgi/schedule.cgi require firmware 000110+, info relays require 000108+)."
  - "standard HTTPS port mentioned; not an AI4AV field but noted"
  - "settable non-discrete parameters all live inside sip.cgi?action=settings; already enumerated as a single multi-param action above. No separate Variables section applies."
  - "no multi-step sequences described in source"
  - "SIP auto-hangup at 180s; ring_time_limit 10..300s; call_time_limit 30..300s; rate-limit 1 connection/sec; HTTP 423 lockout after extensive wrong auth (1 min block)."
  - "firmware version not stated in source; spec assumes firmware 000110+ for favorites.cgi and schedule.cgi access, and 000108+ for info.cgi relays field."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:21:38.711Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions map to documented CGI/RTSP/SIP endpoints with matching parameter shapes; transport ports verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-15
---

# DoorBird D2208V DNP Surface-mount Control Spec

## Summary
LAN-2-LAN HTTP and RTSP API for the DoorBird D2208V DNP Surface-mount video door station. Spec covers HTTP CGI endpoints (live video/image, door open, light, history, monitor, session, info, favorites, schedules, restart), RTSP live video, and encrypted UDP broadcast event monitoring. Authentication is HTTP Basic/Digest or session-id via `/bha-api/getsession.cgi`.

<!-- UNRESOLVED: D2208V-specific firmware feature matrix not stated; some CGI endpoints are firmware-gated (e.g. favorites.cgi/schedule.cgi require firmware 000110+, info relays require 000108+). -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - udp
addressing:
  port: 80
  port_https: 443  # UNRESOLVED: standard HTTPS port mentioned; not an AI4AV field but noted
  port_rtsp: 554
  port_rtsp_http: 8557
  port_event_udp: 6524
  port_event_udp_alt: 35344
  port_sip: 5060
auth:
  type: basic  # inferred: Basic or Digest per RFC 2617 required for every HTTP request
  scheme: basic_or_digest
  alternatives:
    - session  # via getsession.cgi SESSIONID (10 min TTL) for video/audio streaming
```

## Traits
```yaml
# - queryable       (info.cgi, sip.cgi?action=status, monitor.cgi return state)
# - routable        (no input routing; this is a door station not a switcher)
```

## Actions
```yaml
- id: get_session
  label: Get Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi"
  params: []
- id: invalidate_session
  label: Invalidate Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate={session_id}"
  params:
    - name: session_id
      type: string
      description: Session ID to invalidate
- id: live_video_request
  label: Live Video Request (multipart MJPEG)
  kind: action
  command: "GET /bha-api/video.cgi"
  params: []
- id: live_image_request
  label: Live Image Request
  kind: action
  command: "GET /bha-api/image.cgi"
  params: []
- id: open_door
  label: Open Door (energize relay)
  kind: action
  command: "GET /bha-api/open-door.cgi?r={relay}"
  params:
    - name: relay
      type: string
      description: Relay identifier; e.g. "1", "2", or "<paired-door-controller>@<relay>". Omit for default physical relay 1.
- id: light_on
  label: Light On (energize light relay)
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []
- id: history_image_request
  label: History Image Request
  kind: action
  command: "GET /bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: History image index, 1..50 (1 = latest)
    - name: event
      type: string
      description: "Event type filter: 'doorbell' or 'motionsensor'. Optional."
- id: monitor_request
  label: Monitor Request (event stream)
  kind: action
  command: "GET /bha-api/monitor.cgi?ring={events}"
  params:
    - name: events
      type: string
      description: "Comma-separated event types: 'doorbell', 'motionsensor'"
- id: live_audio_receive
  label: Live Audio Receive (G.711 μ-law)
  kind: action
  command: "GET /bha-api/audio-receive.cgi"
  params: []
- id: live_audio_transmit
  label: Live Audio Transmit (G.711 μ-law)
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params: []
- id: info_request
  label: Info Request (version, relays, device type)
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
      description: "Favorite type: 'sip' or 'http'"
    - name: title
      type: string
      description: Name or short description
    - name: value
      type: string
      description: URL/address (HTTP(S) URL or SIP target)
    - name: id
      type: integer
      description: Optional favorite ID for updating existing favorite
- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: type
      type: string
      description: "Favorite type: 'sip' or 'http'"
    - name: id
      type: integer
      description: ID of the favorite to delete
- id: list_schedules
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []
- id: add_or_update_schedule_entry
  label: Add or Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params: []
- id: delete_schedule_entry
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: input
      type: string
      description: "Input event type: 'doorbell', 'motion', 'rfid'"
    - name: param
      type: string
      description: ID of schedule entry (e.g. doorbell number, transponder id)
- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []
- id: rtsp_live_video
  label: RTSP Live Video (H.264)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params: []
- id: rtsp_live_video_default
  label: RTSP Live Video (default via 8557/HTTP)
  kind: action
  command: "rtsp://<device-ip>:8557/mpeg/media.amp"
  params: []
- id: rtsp_720p
  label: RTSP Live Video 720p
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/720p/media.amp"
  params: []
- id: rtsp_1080p
  label: RTSP Live Video 1080p (D11x only)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/1080p/media.amp"
  params: []
- id: sip_registration
  label: SIP Registration
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
      description: SIP proxy auth user
    - name: password
      type: string
      description: SIP proxy auth password
    - name: url
      type: string
      description: SIP proxy IP/hostname
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
      description: "0 or 1; enable SIP registration after reboot. Default 0."
    - name: mic_volume
      type: integer
      description: "1..100. Default 33."
    - name: spk_volume
      type: integer
      description: "1..100. Default 70."
    - name: dtmf
      type: integer
      description: "0 or 1; enable DTMF support. Default 0."
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED. SIP URL or 'none'. Default 'none'."
    - name: relay1_passcode
      type: integer
      description: "0..99999999; pincode for triggering door open relay."
    - name: incoming_call_enable
      type: integer
      description: "0 or 1; enable incoming calls. Default 0."
    - name: incoming_call_user
      type: string
      description: "Allowed SIP user, e.g. sip:user@10.0.0.2:5060."
    - name: anc
      type: integer
      description: "0 or 1; acoustic noise cancellation. Default 1."
    - name: ring_time_limit
      type: integer
      description: "10..300 seconds. Default 300."
    - name: call_time_limit
      type: integer
      description: "30..300 seconds. Default 300."
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
- id: info_version
  type: object
  description: "Firmware version, build number, MAC, relays list, device-type from info.cgi"
- id: info_firmware
  type: string
  description: "Firmware version string from BHA.VERSION[].FIRMWARE"
- id: info_relays
  type: array
  description: "Array of relay IDs (physical and paired IP I/O DoorController relays)"
- id: monitor_doorbell
  type: string
  description: "Doorbell event from monitor stream: 'H' (high/pressed) or 'L' (low/released)"
- id: monitor_motionsensor
  type: string
  description: "Motion sensor state from monitor stream: 'H' or 'L'"
- id: sip_last_error_code
  type: string
  description: "Most recent SIP status code from sip.cgi?action=status. '200' = registered."
- id: sip_last_error_text
  type: string
  description: "Most recent SIP error text from sip.cgi?action=status"
- id: favorites_list
  type: object
  description: "JSON object with 'sip' and 'http' sub-objects, each keyed by favorite id with 'title' and 'value' fields"
- id: schedules_list
  type: array
  description: "JSON array of schedule entries with input/param/output/event/schedule structure"
```

## Variables
```yaml
# UNRESOLVED: settable non-discrete parameters all live inside sip.cgi?action=settings; already enumerated as a single multi-param action above. No separate Variables section applies.
```

## Events
```yaml
- id: udp_event_v2
  type: binary
  description: |
    UDP broadcast event on ports 6524 and 35344. v2 (current) packet layout:
    IDENT (3 bytes) = 0xDE 0xAD 0xBE; VERSION (1 byte) = 0x02 for ChaCha20-Poly1305;
    NONCE (8 bytes); CIPHERTEXT (34 bytes). Decrypt with NOTIFICATION_ENCRYPTION_KEY
    from getsession.cgi (first 32 bytes used by ChaCha20). After decryption:
    INTERCOM_ID (6 bytes ASCII), EVENT (8 bytes ASCII, e.g. "doorbell" or "motion",
    space-padded), TIMESTAMP (4 bytes Unix timestamp). Keep-alive broadcasts every
    7s on the same ports are not relevant.
- id: udp_keepalive
  type: binary
  description: "UDP keep-alive broadcast every 7s on ports 6524 and 35344; skip for event decoding"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - restart
  - sip_reset
  - sip_settings  # global SIP reconfiguration
interlocks: []
# UNRESOLVED: SIP auto-hangup at 180s; ring_time_limit 10..300s; call_time_limit 30..300s; rate-limit 1 connection/sec; HTTP 423 lockout after extensive wrong auth (1 min block).
```

## Notes
- Rate limit: max 1 concurrent API connection per second; HTTP 423 returned after extensive wrong-auth attempts (1-minute IP/user block).
- HTTP port 80 unencrypted, 443 HTTPS with pre-installed self-signed certificate (CAs do not issue for IP).
- HTTPS not available for video/audio streaming — must obtain SESSIONID via `/bha-api/getsession.cgi` (10-min TTL) and append as `?sessionid=` parameter.
- Video stream: multipart MJPEG ~8 fps; RTSP H.264 ~12 fps; live video/audio can be interrupted at any time when official DoorBird App requests (App has precedence).
- SIP supports only one simultaneous call; auto-hangup at 180s; minimum 3s between SIP requests; device closes SIP if official App starts listen/talk.
- Required permissions vary: "valid user" baseline, "watch always" or recent ring event for live streams, "API-Operator" for favorites/schedules/SIP settings.
- Bonjour used for LAN device discovery (`_http._tcp`).
- RTSP URL 1080p variant is D11x-only; 720p requires D10x/D21x from firmware 129.

<!-- UNRESOLVED: firmware version not stated in source; spec assumes firmware 000110+ for favorites.cgi and schedule.cgi access, and 000108+ for info.cgi relays field. -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/en/api
retrieved_at: 2026-08-15T06:16:48.332Z
last_checked_at: 2026-08-19T09:21:38.711Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:21:38.711Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions map to documented CGI/RTSP/SIP endpoints with matching parameter shapes; transport ports verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "D2208V-specific firmware feature matrix not stated; some CGI endpoints are firmware-gated (e.g. favorites.cgi/schedule.cgi require firmware 000110+, info relays require 000108+)."
- "standard HTTPS port mentioned; not an AI4AV field but noted"
- "settable non-discrete parameters all live inside sip.cgi?action=settings; already enumerated as a single multi-param action above. No separate Variables section applies."
- "no multi-step sequences described in source"
- "SIP auto-hangup at 180s; ring_time_limit 10..300s; call_time_limit 30..300s; rate-limit 1 connection/sec; HTTP 423 lockout after extensive wrong auth (1 min block)."
- "firmware version not stated in source; spec assumes firmware 000110+ for favorites.cgi and schedule.cgi access, and 000108+ for info.cgi relays field."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
