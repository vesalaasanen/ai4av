---
spec_id: admin/doorbird-d2101kv-v4a-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird D2101KV-V4A Series Control Spec"
manufacturer: DoorBird
model_family: "DoorBird D2101KV-V4A Series"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "DoorBird D2101KV-V4A Series"
  firmware: "000108 and above"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-07-21T23:59:31.672Z
last_checked_at: 2026-07-22T00:56:41.515Z
generated_at: 2026-07-22T00:56:41.515Z
firmware_coverage: "000108 and above"
protocol_coverage: []
known_gaps:
  - "rtsp://<device-ip>/mpeg/1080p/media.amp"
  - "exact hardware-version compatibility for the D2101KV-V4A Series is not stated separately from the broader D21x family."
  - "device-specific behavior outside documented D21x family behavior was not stated."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:56:41.515Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec actions matched; transport verified; the 1080p RTSP endpoint is D11x-only and correctly omitted for this D21x model. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# DoorBird D2101KV-V4A Series Control Spec

## Summary

DoorBird D2101KV-V4A Series is part of the D21x video door station family. This spec covers its HTTP/HTTPS LAN API, UDP event broadcasts, RTSP streams, and SIP controls.

<!-- UNRESOLVED: exact hardware-version compatibility for the D2101KV-V4A Series is not stated separately from the broader D21x family. -->

## Transport

```yaml
protocols:
  - tcp
  - http
  - udp
addressing:
  base_url: "http://<device-ip>/bha-api/"
  ports:
    http: 80
    https: 443
    udp_events:
      - 6524
      - 35344
    rtsp: 554
    rtsp_over_http: 8557
    sip: 5060
auth:
  type:
    - basic
    - digest
  standard: RFC 2617
  credentials: "Same credentials used to add device to DoorBird App"
  alternate_http_parameters:
    user: "http-user"
    password: "http-password"
tls:
  supported: true
  certificate: self-signed
  limitations:
    - "Video and audio streaming requests are not available over HTTPS."
```

## Traits

```yaml
- queryable
- levelable
```

## Actions

```yaml
- id: create_session
  label: Create Temporary Session
  kind: query
  command: "GET http://<device-ip>/bha-api/getsession.cgi"
  params: []

- id: invalidate_session
  label: Invalidate Temporary Session
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
  params:
    - name: sessionid
      type: string
      required: false
      description: Temporary session ID used to avoid plaintext credentials

- id: live_image
  label: Request Live Image
  kind: query
  command: "GET http://<device-ip>/bha-api/image.cgi"
  params: []

- id: open_door
  label: Energize Door Opener or Alarm Relay
  kind: action
  command: "GET http://<device-ip>/bha-api/open-door.cgi?<parameter>=<value>"
  params:
    - name: r
      type: string
      required: false
      values:
        - "1"
        - "2"
        - "<doorcontrollerID>@<relay>"
      description: Relay to trigger; physical relay 1 is used when omitted

- id: light_on
  label: Energize Light Relay
  kind: action
  command: "GET http://<device-ip>/bha-api/light-on.cgi"
  params: []

- id: history_image
  label: Request History Image
  kind: query
  command: "GET http://<device-ip>/bha-api/history.cgi?<parameter>=<value>"
  params:
    - name: index
      type: integer
      range: "1..50"
      description: History image index; 1 is latest
    - name: event
      type: string
      required: false
      values:
        - doorbell
        - motionsensor

- id: monitor_events
  label: Monitor Doorbell and Motion Events
  kind: query
  command: "GET http://<device-ip>/bha-api/monitor.cgi?ring=doorbell[,motionsensor]"
  params:
    - name: ring
      type: string
      values:
        - doorbell
        - motionsensor
        - "doorbell,motionsensor"

- id: receive_audio
  label: Receive Live Audio
  kind: query
  command: "GET http://<device-ip>/bha-api/audio-receive.cgi"
  params:
    - name: sessionid
      type: string
      required: false
      description: Temporary session ID used to avoid plaintext credentials

- id: transmit_audio
  label: Transmit Live Audio
  kind: action
  command: "POST http://<device-ip>/bha-api/audio-transmit.cgi"
  params:
    - name: body
      type: binary
      description: G.711 mu-law audio at 8000 Hz
    - name: content_type
      type: string
      fixed: "audio/basic"

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
      fixed: save
    - name: type
      type: string
      values:
        - sip
        - http
    - name: title
      type: string
    - name: value
      type: string
      description: HTTP(S) URL or SIP target
    - name: id
      type: integer
      required: false
      description: Existing favorite ID; omit when creating a favorite

- id: remove_favorite
  label: Delete Favorite
  kind: action
  command: "action=remove&<parameter>=<value>"
  params:
    - name: action
      type: string
      fixed: remove
    - name: type
      type: string
      values:
        - sip
        - http
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
    - name: body
      type: object
      description: Schedule JSON object for one input type

- id: remove_schedule
  label: Delete Schedule Entry
  kind: action
  command: "GET http://<device-ip>/bha-api/schedule.cgi?action=remove&<parameter>=<value>"
  params:
    - name: action
      type: string
      fixed: remove
    - name: input
      type: string
      values:
        - doorbell
        - motion
        - rfid
    - name: param
      type: string
      description: Doorbell number, empty value, or transponder ID

- id: restart
  label: Restart Device
  kind: action
  command: "GET http://<device-ip>/bha-api/restart.cgi"
  params: []

- id: rtsp_live_video_default
  label: Request Default RTSP Live Video
  kind: query
  command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/media.amp"
  params:
    - name: device_rtsp_port
      type: integer
      values:
        - 554
        - 8557

- id: rtsp_live_video_720p
  label: Request 720p RTSP Live Video
  kind: query
  command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/720p/media.amp"
  params:
    - name: device_rtsp_port
      type: integer
      values:
        - 554
        - 8557

- id: sip_registration
  label: Register with SIP Proxy
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

- id: sip_make_call
  label: Make SIP Call
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=makecall&url=<url>"
  params:
    - name: url
      type: string
      description: SIP URL to call

- id: sip_hangup
  label: Hang Up SIP Call
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=hangup"
  params: []

- id: sip_settings
  label: Configure SIP Settings
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=settings&<parameter>=<value>"
  params:
    - name: enable
      type: integer
      range: "0..1"
    - name: mic_volume
      type: integer
      range: "1..100"
    - name: spk_volume
      type: integer
      range: "1..100"
    - name: dtmf
      type: integer
      range: "0..1"
    - name: autocall_doorbell_url
      type: string
      deprecated: true
    - name: relay1_passcode
      type: integer
      range: "0..99999999"
    - name: incoming_call_enable
      type: integer
      range: "0..1"
    - name: incoming_call_user
      type: string
    - name: anc
      type: integer
      range: "0..1"
    - name: ring_time_limit
      type: integer
      range: "10..300"
    - name: call_time_limit
      type: integer
      range: "30..300"

- id: sip_status
  label: Query SIP Status
  kind: query
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=status"
  params: []

- id: sip_reset
  label: Reset SIP Settings
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=reset"
  params: []
```

## Feedbacks

```yaml
- id: session
  type: object
  fields:
    return_code:
      source_field: RETURNCODE
      type: string
    session_id:
      source_field: SESSIONID
      type: string
      validity: "10 minutes"
    notification_encryption_key:
      source_field: NOTIFICATION_ENCRYPTION_KEY
      type: string

- id: monitor_state
  type: enum
  values:
    - "doorbell:H"
    - "doorbell:L"
    - "motionsensor:H"
    - "motionsensor:L"

- id: device_info
  type: object
  fields:
    firmware:
      source_field: FIRMWARE
      type: string
    build_number:
      source_field: BUILD_NUMBER
      type: string
    primary_mac_address:
      source_field: PRIMARY_MAC_ADDR
      type: string
    relays:
      source_field: RELAYS
      type: array
    device_type:
      source_field: DEVICE-TYPE
      type: string

- id: sip_status
  type: object
  fields:
    last_error_code:
      source_field: LASTERRORCODE
      type: string
    last_error_text:
      source_field: LASTERRORTEXT
      type: string

- id: http_status
  type: enum
  values:
    - 200
    - 204
    - 400
    - 401
    - 423
    - 500
    - 503
    - 507
    - 509
```

## Variables

```yaml
- id: sip_enable
  type: integer
  range: "0..1"
  default: 0

- id: sip_microphone_volume
  type: integer
  range: "1..100"
  default: 33

- id: sip_speaker_volume
  type: integer
  range: "1..100"
  default: 70

- id: sip_dtmf
  type: integer
  range: "0..1"
  default: 0

- id: sip_autocall_doorbell_url
  type: string
  default: none
  deprecated: true

- id: sip_relay1_passcode
  type: integer
  range: "0..99999999"

- id: sip_incoming_call_enable
  type: integer
  range: "0..1"
  default: 0

- id: sip_incoming_call_user
  type: string

- id: sip_acoustic_noise_cancellation
  type: integer
  range: "0..1"
  default: 1

- id: sip_ring_time_limit
  type: integer
  range: "10..300"
  default: 300
  unit: seconds

- id: sip_call_time_limit
  type: integer
  range: "30..300"
  default: 300
  unit: seconds
```

## Events

```yaml
- id: doorbell
  transport: udp
  ports:
    - 6524
    - 35344
  payload:
    ident: "0xDE 0xAD 0xBE"
    version: "0x02"
    encryption: ChaCha20-Poly1305
    nonce_length_bytes: 8
    ciphertext_length_bytes: 34
    plaintext_fields:
      - name: INTERCOM_ID
        length_bytes: 6
        type: string
      - name: EVENT
        length_bytes: 8
        type: string
      - name: TIMESTAMP
        length_bytes: 4
        type: long

- id: motion
  transport: udp
  ports:
    - 6524
    - 35344
  payload:
    ident: "0xDE 0xAD 0xBE"
    version: "0x02"
    encryption: ChaCha20-Poly1305
    nonce_length_bytes: 8
    ciphertext_length_bytes: 34
    plaintext_fields:
      - name: INTERCOM_ID
        length_bytes: 6
        type: string
      - name: EVENT
        length_bytes: 8
        type: string
      - name: TIMESTAMP
        length_bytes: 4
        type: long

- id: udp_keep_alive
  transport: udp
  ports:
    - 6524
    - 35344
  interval_seconds: 7
  description: Keep-alive broadcast; not an event notification
```

## Macros

```yaml
- id: secure_media_session
  label: Obtain Session Before Unencrypted Media Request
  steps:
    - "Authenticate and GET http://<device-ip>/bha-api/getsession.cgi."
    - "Read SESSIONID from JSON response."
    - "Append sessionid=<session-id> to video.cgi or audio-receive.cgi request."
  session_validity: "10 minutes"

- id: decrypt_udp_event_v2
  label: Decrypt UDP Event Version 2
  steps:
    - "Obtain NOTIFICATION_ENCRYPTION_KEY from getsession.cgi after authenticating."
    - "Verify packet IDENT is 0xDE 0xAD 0xBE and VERSION is 0x02."
    - "Split packet into 8-byte NONCE and 34-byte CIPHERTEXT."
    - "Decrypt CIPHERTEXT using ChaCha20-Poly1305 and first 32 bytes of NOTIFICATION_ENCRYPTION_KEY."
    - "Parse 6-byte INTERCOM_ID, 8-byte EVENT, and 4-byte TIMESTAMP."
```

## Safety

```yaml
confirmation_required_for:
  - open_door
  - restart
  - sip_reset
interlocks:
  - action: open_door
    requirement: "Valid user with watch-always permission or ring event in past 5 minutes"
  - action: light_on
    requirement: "Valid user with watch-always permission or ring event in past 5 minutes"
  - action: sip_settings
    requirement: "API-Operator permission"
  - action: sip_registration
    requirement: "API-Operator permission"
  - action: sip_make_call
    requirement: "Wait at least 3 seconds between SIP requests"
```

## Notes

LAN API allows at most one third-party API connection per second. Extensive invalid authentication attempts block the IP address or user for one minute and return HTTP 423. Live audio/video may be interrupted when official DoorBird App requests stream; App has precedence. Only one simultaneous live audio/video call and one simultaneous SIP call are supported. SIP calls terminate 180 seconds after initiation. UDP event version 1 is deprecated; version 2 uses ChaCha20-Poly1305.

<!-- UNRESOLVED: device-specific behavior outside documented D21x family behavior was not stated. -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-07-21T23:59:31.672Z
last_checked_at: 2026-07-22T00:56:41.515Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:56:41.515Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec actions matched; transport verified; the 1080p RTSP endpoint is D11x-only and correctly omitted for this D21x model. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "rtsp://<device-ip>/mpeg/1080p/media.amp"
- "exact hardware-version compatibility for the D2101KV-V4A Series is not stated separately from the broader D21x family."
- "device-specific behavior outside documented D21x family behavior was not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
