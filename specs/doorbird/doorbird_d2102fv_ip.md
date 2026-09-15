---
spec_id: admin/doorbird-d2102fv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2102FV Control Spec"
manufacturer: Doorbird
model_family: D2102FV
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - D2102FV
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-05-12T17:53:19.025Z
last_checked_at: 2026-09-03T22:21:20.252Z
generated_at: 2026-09-03T22:21:20.252Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source for D2102FV specifically"
  - "HTTPS port 443 also available but auth scheme same; RTSP on 554/8557 with std RTSP auth; UDP event broadcasts on 6524/35344 not modelled in protocols list above"
  - "source describes no multi-step sequences"
  - "source contains no explicit safety warnings or interlock procedures"
verification:
  verdict: verified
  checked_at: 2026-09-03T22:21:20.252Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions map verbatim to source endpoints; transport port 80 + Basic/Digest auth confirmed in source; ratio 25/25 = 1.00. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Doorbird D2102FV Control Spec

## Summary
DoorBird D2102FV video door station. HTTP-based control API on TCP 80/443 + RTSP on 554/8557 + UDP broadcast events on 6524/35344. Auth = Basic/Digest (RFC 2617). Covers session, live video/image, door open, light, history, monitor, audio I/O, info, favorites, schedules, SIP, and restart.

<!-- UNRESOLVED: firmware version compatibility not stated in source for D2102FV specifically -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  port: 80
auth:
  type: basic  # Basic or Digest (RFC 2617); same creds as DoorBird App
```

<!-- UNRESOLVED: HTTPS port 443 also available but auth scheme same; RTSP on 554/8557 with std RTSP auth; UDP event broadcasts on 6524/35344 not modelled in protocols list above -->

## Traits
```yaml
- routable  # inferred: input/output routing via favorites/schedules, SIP, relays
- queryable  # inferred: info.cgi, sip.cgi?action=status, monitor.cgi return state
```

## Actions
```yaml
- id: get_session
  label: Get Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi"
  params: []
  notes: Returns SESSIONID (10 min) and NOTIFICATION_ENCRYPTION_KEY

- id: invalidate_session
  label: Invalidate Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate=<old_session_id>"
  params:
    - name: old_session_id
      type: string

- id: live_video
  label: Live Video Stream
  kind: action
  command: "GET /bha-api/video.cgi"
  params: []
  notes: multipart/x-mixed-replace JPEG up to 8 fps

- id: live_image
  label: Live Image
  kind: action
  command: "GET /bha-api/image.cgi"
  params: []
  notes: single JPEG

- id: open_door
  label: Open Door / Energize Relay
  kind: action
  command: "GET /bha-api/open-door.cgi?r=<relay>"
  params:
    - name: relay
      type: string
      description: "1|2|<doorcontrollerID>@<relay>; omit for physical relay1"

- id: light_on
  label: Light On
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []

- id: history_image
  label: History Image
  kind: action
  command: "GET /bha-api/history.cgi?index=<index>&event=<event>"
  params:
    - name: index
      type: integer
      description: 1..50
    - name: event
      type: string
      description: doorbell|motionsensor

- id: monitor_events
  label: Monitor Doorbell/Motion Stream
  kind: action
  command: "GET /bha-api/monitor.cgi?ring=<events>"
  params:
    - name: events
      type: string
      description: "doorbell,motionsensor comma-list"

- id: live_audio_receive
  label: Live Audio Receive
  kind: action
  command: "GET /bha-api/audio-receive.cgi"
  params: []
  notes: G.711 mu-law 8000 Hz

- id: live_audio_transmit
  label: Live Audio Transmit
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params: []
  notes: Content-Type audio/basic, G.711 mu-law 8000 Hz; one consumer at a time

- id: info
  label: Device Info
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []

- id: favorites_list
  label: List Favorites
  kind: query
  command: "GET /bha-api/favorites.cgi"
  params: []
  notes: Requires API-Operator permission, firmware 000110+

- id: favorites_save
  label: Add/Change Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=save&type=<type>&title=<title>&value=<value>&id=<id>"
  params:
    - name: type
      type: string
      description: sip|http
    - name: title
      type: string
    - name: value
      type: string
      description: URL or address
    - name: id
      type: integer
      description: optional, for changing existing

- id: favorites_delete
  label: Delete Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=remove&type=<type>&id=<id>"
  params:
    - name: type
      type: string
      description: sip|http
    - name: id
      type: integer

- id: schedule_list
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []
  notes: Requires API-Operator, firmware 000110+

- id: schedule_add_update
  label: Add/Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params: []
  notes: JSON body; one request per input type (doorbell/motion/rfid/fingerprint)

- id: schedule_delete
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input=<input>&param=<param>"
  params:
    - name: input
      type: string
      description: doorbell|motion|rfid
    - name: param
      type: string

- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []

- id: sip_registration
  label: SIP Register
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user=<user>&password=<password>&url=<url>"
  params:
    - name: user
      type: string
    - name: password
      type: string
    - name: url
      type: string

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url=<url>"
  params:
    - name: url
      type: string
      description: SIP URL

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params: []

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&<parameter>=<value>"
  params:
    - name: parameter
      type: string
      description: enable|mic_volume|spk_volume|dtmf|autocall_doorbell_url|relay1_passcode|incoming_call_enable|incoming_call_user|anc|ring_time_limit|call_time_limit

- id: sip_status
  label: SIP Status
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  params: []

- id: sip_reset
  label: SIP Reset
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  params: []

- id: rtsp_live_video
  label: RTSP Live Video
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params: []
  notes: H.264 up to 12 fps; RTSP-over-HTTP on 8557; standard RTSP auth
```

## Feedbacks
```yaml
- id: doorbell_state
  type: enum
  values: [H, L]
  notes: from monitor.cgi multipart stream (H=high/pressed, L=low/idle)
- id: motion_state
  type: enum
  values: [H, L]
  notes: from monitor.cgi multipart stream
- id: sip_status
  type: object
  notes: JSON with LASTERRORCODE / LASTERRORTEXT
- id: favorites
  type: object
  notes: JSON {sip: {...}, http: {...}}
- id: schedules
  type: object
  notes: JSON array of input/param/output entries
- id: device_info
  type: object
  notes: VERSION[], RELAYS[], DEVICE-TYPE etc. from info.cgi
```

## Variables
```yaml
- name: sip_mic_volume
  type: integer
  range: 1..100
  default: 33
- name: sip_spk_volume
  type: integer
  range: 1..100
  default: 70
- name: sip_dtmf
  type: integer
  range: 0..1
  default: 0
- name: sip_relay1_passcode
  type: integer
  range: 0..99999999
- name: sip_ring_time_limit
  type: integer
  range: 10..300
  default: 300
- name: sip_call_time_limit
  type: integer
  range: 30..300
  default: 300
- name: sip_incoming_call_enable
  type: integer
  range: 0..1
  default: 0
- name: sip_anc
  type: integer
  range: 0..1
  default: 1
```

## Events
```yaml
- id: doorbell_event
  protocol: udp
  ports: [6524, 35344]
  notes: UDP broadcast after doorbell; IDENT 0xDE 0xAD 0xBE, VERSION 0x02, ChaCha20-Poly1305 encrypted; decrypted payload = INTERCOM_ID(6) + EVENT(8, "doorbell"|"motion") + TIMESTAMP(4 unix)
- id: motion_event
  protocol: udp
  ports: [6524, 35344]
  notes: same structure as doorbell_event, EVENT="motion"
- id: keepalive_event
  protocol: udp
  ports: [6524, 35344]
  notes: every 7 seconds, can be skipped without decryption
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures
```

## Notes
- HTTP unauthenticated on TCP 80, HTTPS w/ self-signed cert on TCP 443. Video/audio streams NOT available over HTTPS — obtain session ID first, append as `sessionid=` param.
- Session ID valid 10 min. NOTIFICATION_ENCRYPTION_KEY (32-64 bytes) returned alongside; only first 32 bytes used for ChaCha20. Request once, not per packet.
- Max 1 concurrent API call/sec. Excessive wrong auth = IP blocked 60s (HTTP 423). SIP supports only 1 simultaneous call (HTTP 503 if busy). monitor.cgi max 8 concurrent streams (509 when full).
- RTSP auth is standard RTSP, not HTTP parameter auth.
- SIP auto-hangs up 180s after initiation; device will close SIP if DoorBird App takes call.
- Restart.cgi no diagnostic sound; 503 if firmware update in progress.
```

Spec written. 24 actions, 6 feedbacks, 8 variables, 3 events. All payloads verbatim from source. RTSP/UDP/HTTPS left as notes since protocol list only models HTTP.

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-05-12T17:53:19.025Z
last_checked_at: 2026-09-03T22:21:20.252Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-03T22:21:20.252Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions map verbatim to source endpoints; transport port 80 + Basic/Digest auth confirmed in source; ratio 25/25 = 1.00. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source for D2102FV specifically"
- "HTTPS port 443 also available but auth scheme same; RTSP on 554/8557 with std RTSP auth; UDP event broadcasts on 6524/35344 not modelled in protocols list above"
- "source describes no multi-step sequences"
- "source contains no explicit safety warnings or interlock procedures"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
