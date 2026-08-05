---
spec_id: admin/doorbird-d2101kv_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2101KV Series Control Spec"
manufacturer: Doorbird
model_family: "D2101KV Series"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "D2101KV Series"
  firmware: "000108 and above"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-07-12T20:54:35.730Z
last_checked_at: 2026-07-21T22:24:52.451Z
generated_at: 2026-07-21T22:24:52.451Z
firmware_coverage: "000108 and above"
protocol_coverage: []
known_gaps:
  - "rtsp://<device-ip>/mpeg/1080p/media.amp"
  - "no explicit multi-step control macros stated in source"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:24:52.451Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec actions matched literally against source endpoints; all parameter shapes verified; transport parameters confirmed; 1080p endpoint is D11x-only per source footnote, correctly omitted. (1 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-12
---

# Doorbird D2101KV Series Control Spec

## Summary
IP video door station covered by DoorBird D21x LAN API. API provides HTTP and HTTPS control, UDP event broadcasts, RTSP video, audio streaming, SIP, relay control, monitoring, favorites, and schedules.

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  base_url: "http://<device-ip>/bha-api/"
  port: 80
  secure_port: 443
auth:
  type: basic_digest
  query_parameters:
    username: "http-user"
    password: "http-password"
udp:
  ports:
    - 6524
    - 35344
  encryption: "ChaCha20-Poly1305"
rtsp:
  port: 554
  http_port: 8557
  base_url: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/"
  auth: standard_rtsp
sip:
  port: 5060
```

## Traits
```yaml
- queryable  # inferred from query commands
- levelable  # inferred from SIP microphone and speaker volume settings
```

## Actions
```yaml
- id: get_session
  label: Get Temporary Session ID
  kind: query
  command: "GET http://<device-ip>/bha-api/getsession.cgi"
  params: []

- id: invalidate_session
  label: Invalidate Session ID
  kind: action
  command: "GET http://<device-ip>/bha-api/getsession.cgi?invalidate=<old_session_id>"
  params:
    - name: old_session_id
      type: string
      description: Session ID to invalidate

- id: live_video
  label: Request Live MJPEG Video
  kind: query
  command: "GET http://<device-ip>/bha-api/video.cgi"
  params: []

- id: live_image
  label: Request Live JPEG Image
  kind: query
  command: "GET http://<device-ip>/bha-api/image.cgi"
  params: []

- id: open_door
  label: Open Door
  kind: action
  command: "GET http://<device-ip>/bha-api/open-door.cgi?r=<value>"
  params:
    - name: r
      type: string
      description: "Optional relay: 1, 2, or <doorcontrollerID>@<relay>; omission triggers physical relay 1"

- id: light_on
  label: Light On
  kind: action
  command: "GET http://<device-ip>/bha-api/light-on.cgi"
  params: []

- id: history_image
  label: Request History Image
  kind: query
  command: "GET http://<device-ip>/bha-api/history.cgi?index=<index>&event=<event>"
  params:
    - name: index
      type: integer
      description: History image index from 1 through 50; 1 is latest
    - name: event
      type: string
      description: "Optional event: doorbell or motionsensor"

- id: monitor
  label: Monitor Doorbell and Motion State
  kind: query
  command: "GET http://<device-ip>/bha-api/monitor.cgi?ring=doorbell[,motionsensor]"
  params:
    - name: ring
      type: string
      description: "Event selection: doorbell, motionsensor, or both"

- id: live_audio_receive
  label: Receive Live Audio
  kind: query
  command: "GET http://<device-ip>/bha-api/audio-receive.cgi"
  params: []

- id: live_audio_transmit
  label: Transmit Live Audio
  kind: action
  command: "POST /bha-api/audio-transmit.cgi HTTP/1.0"
  params:
    - name: audio
      type: binary
      description: "G.711 mu-law audio/basic data at 8000 Hz"

- id: device_info
  label: Get Device Information
  kind: query
  command: "GET http://<device-ip>/bha-api/info.cgi"
  params: []

- id: list_favorites
  label: List Favorites
  kind: query
  command: "GET http://<device-ip>/bha-api/favorites.cgi"
  params: []

- id: save_favorite
  label: Add or Change Favorite
  kind: action
  command: "action=save&<parameter>=<value>"
  params:
    - name: action
      type: string
      description: Fixed value "save"
    - name: type
      type: string
      description: "sip or http"
    - name: title
      type: string
      description: Name or short description
    - name: value
      type: string
      description: HTTP(S) URL or SIP target
    - name: id
      type: integer
      description: Optional existing favorite ID

- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "action=remove&<parameter>=<value>"
  params:
    - name: action
      type: string
      description: Fixed value "remove"
    - name: type
      type: string
      description: "sip or http"
    - name: id
      type: integer
      description: Favorite ID

- id: list_schedules
  label: List Schedules
  kind: query
  command: "GET http://<device-ip>/bha-api/schedule.cgi"
  params: []

- id: save_schedule
  label: Add or Update Schedule Entry
  kind: action
  command: "POST http://<device-ip>/bha-api/schedule.cgi"
  params:
    - name: input
      type: string
      description: "doorbell, motion, rfid, or fingerprint"
    - name: param
      type: string
      description: Doorbell number, transponder ID, fingerprint ID, or empty value
    - name: output
      type: array
      description: Output action configurations

- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  command: "GET http://<device-ip>/bha-api/schedule.cgi?action=remove&<parameter>=<value>"
  params:
    - name: action
      type: string
      description: Fixed value "remove"
    - name: input
      type: string
      description: "doorbell, motion, or rfid"
    - name: param
      type: string
      description: Doorbell number, transponder ID, or empty value

- id: restart
  label: Restart Device
  kind: action
  command: "GET http://<device-ip>/bha-api/restart.cgi"
  params: []

- id: sip_registration
  label: SIP Registration
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=registration&user=<user>&password=<password>&url=<url>"
  params:
    - name: user
      type: string
      description: SIP proxy authentication user
    - name: password
      type: string
      description: SIP proxy authentication password
    - name: url
      type: string
      description: SIP proxy IP address or hostname

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=makecall&url=<url>"
  params:
    - name: url
      type: string
      description: SIP URL to call

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=hangup"
  params: []

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=settings&<parameter>=<value>"
  params:
    - name: enable
      type: integer
      description: "0..1; enable or disable SIP after reboot"
    - name: mic_volume
      type: integer
      description: "1..100; microphone volume"
    - name: spk_volume
      type: integer
      description: "1..100; speaker volume"
    - name: dtmf
      type: integer
      description: "0..1; enable or disable DTMF"
    - name: autocall_doorbell_url
      type: string
      description: "Deprecated SIP URL or none; use schedule.cgi instead"
    - name: relay1_passcode
      type: integer
      description: "0..99999999; relay passcode"
    - name: incoming_call_enable
      type: integer
      description: "0..1; enable or disable incoming calls"
    - name: incoming_call_user
      type: string
      description: Allowed SIP user
    - name: anc
      type: integer
      description: "0..1; acoustic noise cancellation"
    - name: ring_time_limit
      type: integer
      description: "10..300 seconds"
    - name: call_time_limit
      type: integer
      description: "30..300 seconds"

- id: sip_status
  label: SIP Status
  kind: query
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=status"
  params: []

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=reset"
  params: []

- id: rtsp_live_video_default
  label: RTSP Live Video
  kind: query
  command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/media.amp"
  params: []

- id: rtsp_live_video_720p
  label: RTSP 720p Live Video
  kind: query
  command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/720p/media.amp"
  params: []
```

## Feedbacks
```yaml
- id: session
  label: Session Information
  type: object
  fields:
    - RETURNCODE
    - SESSIONID
    - NOTIFICATION_ENCRYPTION_KEY

- id: live_video_stream
  label: Live MJPEG Video Stream
  type: binary
  content_type: multipart/x-mixed-replace

- id: live_image
  label: Live JPEG Image
  type: binary
  content_type: image/jpeg

- id: history_image
  label: History JPEG Image
  type: binary
  content_type: image/jpeg

- id: doorbell_state
  label: Doorbell Event
  type: enum
  values: ["H", "L"]

- id: motionsensor_state
  label: Motion Sensor Event
  type: enum
  values: ["H", "L"]

- id: live_audio
  label: Live Audio Stream
  type: binary
  content_type: audio/basic

- id: device_info
  label: Device Info
  type: object
  fields:
    - RETURNCODE
    - FIRMWARE
    - BUILD_NUMBER
    - PRIMARY_MAC_ADDR
    - RELAYS
    - DEVICE-TYPE

- id: favorites_list
  label: Favorites List
  type: object

- id: schedule_list
  label: Schedule List
  type: array

- id: sip_status
  label: SIP Status
  type: object
  fields:
    - LASTERRORCODE
    - LASTERRORTEXT

- id: door_open_response
  label: Open Door Response
  type: object
  fields:
    - RETURNCODE

- id: light_on_response
  label: Light On Response
  type: object
  fields:
    - RETURNCODE
```

## Variables
```yaml
- id: sip_enabled
  type: integer
  range: [0, 1]

- id: sip_microphone_volume
  type: integer
  range: [1, 100]

- id: sip_speaker_volume
  type: integer
  range: [1, 100]

- id: sip_dtmf_enabled
  type: integer
  range: [0, 1]

- id: sip_incoming_calls_enabled
  type: integer
  range: [0, 1]

- id: sip_acoustic_noise_cancellation
  type: integer
  range: [0, 1]

- id: sip_ring_time_limit
  type: integer
  range: [10, 300]
  unit: seconds

- id: sip_call_time_limit
  type: integer
  range: [30, 300]
  unit: seconds
```

## Events
```yaml
- id: doorbell_event
  description: Encrypted UDP broadcast generated by a doorbell event
  ports: [6524, 35344]
  params:
    - name: INTERCOM_ID
      type: string
      description: First six characters of user name
    - name: EVENT
      type: string
      description: Doorbell number padded to eight bytes
    - name: TIMESTAMP
      type: integer
      description: Unix timestamp

- id: motion_event
  description: Encrypted UDP broadcast generated by motion detection
  ports: [6524, 35344]
  params:
    - name: INTERCOM_ID
      type: string
      description: First six characters of user name
    - name: EVENT
      type: string
      description: "motion padded to eight bytes"
    - name: TIMESTAMP
      type: integer
      description: Unix timestamp

- id: udp_keepalive
  description: Keep-alive UDP broadcast sent every seven seconds on both event ports
  ports: [6524, 35344]
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step control macros stated in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Live video, image, audio, and relay access requires watch-always permission or a recent ring event as specified per endpoint."
  - "Only one consumer may transmit audio; a second consumer is rejected."
  - "Only one simultaneous SIP call is supported."
  - "Each SIP call terminates 180 seconds after initiation."
  - "Wait at least 3 seconds between SIP requests."
  - "Wrong credentials used extensively block the IP address or user for 1 minute and return HTTP 423."
  - "Device may return HTTP 503 when another user has taken the live call."
```

## Notes
HTTP is available on TCP port 80 and HTTPS on TCP port 443 using a pre-installed self-signed certificate. Streaming requests require a temporary session ID to avoid plaintext credentials; session IDs remain valid for 10 minutes. API access permits at most one concurrent connection per second, and monitoring permits up to eight concurrent streams. UDP event packets use version `0x02` ChaCha20-Poly1305 framing with identifier `0xDE 0xAD 0xBE`. Favorites and schedules require API-Operator permission and firmware 000110 or newer. RTSP 720p is supported by D21x from firmware 129. RS-232 control is not documented.

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-07-12T20:54:35.730Z
last_checked_at: 2026-07-21T22:24:52.451Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:24:52.451Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec actions matched literally against source endpoints; all parameter shapes verified; transport parameters confirmed; 1080p endpoint is D11x-only per source footnote, correctly omitted. (1 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "rtsp://<device-ip>/mpeg/1080p/media.amp"
- "no explicit multi-step control macros stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
