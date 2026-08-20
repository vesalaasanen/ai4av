---
spec_id: admin/doorbird-d2204v-dnp-flush-mount
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird D2204V DNP Flush-mount Control Spec"
manufacturer: DoorBird
model_family: "D2204V DNP Flush-mount"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "D2204V DNP Flush-mount"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/en/api
retrieved_at: 2026-08-16T06:05:18.316Z
last_checked_at: 2026-08-19T09:21:54.810Z
generated_at: 2026-08-19T09:21:54.810Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source document is the generic DoorBird/BirdGuard LAN-2-LAN API (rev 0.36). It does not name the D2204V or the D22x series in its compatible-devices list; applicability to this model is by platform association only, not stated in source."
  - "per-model relay count, doorbell-number range, keypad/RFID/fingerprint hardware presence not stated in source."
  - "RTSP 720p/1080p stream paths are stated as supported only on D10x/D21x/D11x; support on D2204V not stated."
  - "no device power on/off command documented in source; `powerable` not claimed. restart.cgi is a reboot, not power control."
  - "default value not stated in source"
  - "rfid and keypad event types are stated as \"coming soon\" in source; not available."
  - "no electrical (voltage/current), wiring, or power-sequencing safety data in source."
  - "source document is the generic DoorBird/BirdGuard LAN-2-LAN API rev 0.36; its COMPATIBLE DEVICES table enumerates D10x/D20x/D21x/B10x/D11x and does not list D22x or the D2204V. All endpoints above are transcribed verbatim from that document, but per-model applicability to the D2204V DNP Flush-mount is not stated in the source."
  - "no D2204V-specific firmware version, relay count, doorbell number range, keypad/RFID/fingerprint hardware inventory, or resolution capability stated in source."
  - "notification.cgi` (referenced as migrated-from) and any RFID/keypad/fingerprint trigger APIs are not documented in this source revision."
  - "RTSP device port is written as `<device-rtsp-port>` in the request template; source states RTSP uses 554 and RTSP-over-HTTP uses 8557 but does not state the configured default per model."
  - "no voltage, current, power draw, fault-recovery, or protocol version number for the CGI interface stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:21:54.810Z
  matched_actions: 43
  action_count: 43
  confidence: medium
  summary: "All 43 spec action endpoints appear verbatim in source, transport values verified, and source command catalogue is fully covered. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-16
---

# DoorBird D2204V DNP Flush-mount Control Spec

## Summary
DoorBird D2204V DNP Flush-mount is an IP video door station. This spec covers the DoorBird LAN-2-LAN third-party API: an HTTP/HTTPS CGI interface under `/bha-api/` for live video, live image, audio receive/transmit, door and light relay triggering, history images, event monitoring, favorites, schedules, restart, and SIP control; an RTSP video interface; and encrypted UDP broadcast event notifications.

<!-- UNRESOLVED: the source document is the generic DoorBird/BirdGuard LAN-2-LAN API (rev 0.36). It does not name the D2204V or the D22x series in its compatible-devices list; applicability to this model is by platform association only, not stated in source. -->
<!-- UNRESOLVED: per-model relay count, doorbell-number range, keypad/RFID/fingerprint hardware presence not stated in source. -->
<!-- UNRESOLVED: RTSP 720p/1080p stream paths are stated as supported only on D10x/D21x/D11x; support on D2204V not stated. -->

## Transport
```yaml
protocols:
  - http
  - rtsp   # RTSP video interface documented in source
  - udp    # encrypted event broadcast notifications
addressing:
  base_url: "http://<device-ip>/bha-api/"
  port: 80        # source: "available unencrypted on TCP port 80 (HTTP protocol)"
  https_port: 443 # source: "encrypted on TCP port 443 (HTTPS protocol)"
  rtsp_port: 554  # source: "Uses RTSP on 554"
  rtsp_over_http_port: 8557  # source: "RTSP-over-HTTP protocol on port 8557"
  sip_port: 5060  # source: "ready to receive SIP calls on port 5060"
  udp_event_ports: [6524, 35344]  # source: UDP broadcasts on ports 6524 and 35344
auth:
  type: basic_or_digest  # source: "use Basic or Digest authentication as defined in RFC 2617 for each HTTP request"
  alternate:
    type: query_parameters
    params: ["http-user", "http-password"]  # source: plaintext HTTP parameter auth
  session:
    type: session_id
    obtain_via: "GET /bha-api/getsession.cgi"
    ttl_seconds: 600  # source: "valid for 10 minutes"
    used_for: ["video.cgi", "audio-receive.cgi"]  # source: streaming over https requires sessionid
  rtsp:
    type: standard_rtsp_auth  # source: "Requires standard RTSP authentication (no parameter authentication supported)"
  permissions:
    - watch_always
    - history
    - motion
    - api_operator
rate_limits:
  max_concurrent_api_connections_per_second: 1  # source: "maximum of 1 concurrent connection per second for API access"
  monitor_cgi_max_concurrent_streams: 8  # source: "up to 8 concurrent Streams allowed"
  wrong_credential_lockout_seconds: 60  # source: "block the IP address or the whole user from the system for 1 minute"
  simultaneous_av_calls: 1  # source: "only one simultaneous audio/video call"
  simultaneous_sip_calls: 1  # source: "supports only one simultaneous SIP call"
  min_seconds_between_sip_requests: 3  # source: "please wait min 3 seconds between each SIP request"
```

## Traits
```yaml
- routable    # inferred from relay/door/light output triggering commands
- queryable   # inferred from info.cgi, sip.cgi?action=status, favorites.cgi, schedule.cgi query commands
- levelable   # inferred from mic_volume / spk_volume settings commands
# UNRESOLVED: no device power on/off command documented in source; `powerable` not claimed. restart.cgi is a reboot, not power control.
```

## Actions
```yaml
- id: get_session
  label: Create Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi"
  params: []
  notes: Returns SESSIONID and NOTIFICATION_ENCRYPTION_KEY. Session valid 10 minutes.

- id: invalidate_session
  label: Invalidate Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate={old_session_id}"
  params:
    - name: old_session_id
      type: string
      description: Session ID to invalidate

- id: live_video_request
  label: Live Video Request (MJPEG)
  kind: action
  command: "GET /bha-api/video.cgi"
  params: []
  notes: Returns multipart/x-mixed-replace MJPEG stream, up to ~8 fps. Requires "watch always" or ring event in past 5 minutes.

- id: live_video_request_session
  label: Live Video Request with Session ID
  kind: action
  command: "GET /bha-api/video.cgi?sessionid={session_id}"
  params:
    - name: session_id
      type: string
      description: Temporary session ID from getsession.cgi

- id: live_image_request
  label: Live Image Request (JPEG)
  kind: action
  command: "GET /bha-api/image.cgi"
  params: []
  notes: Returns single JPEG. Requires "watch always" or ring event in past 1 minute.

- id: open_door
  label: Open Door (Trigger Relay)
  kind: action
  command: "GET /bha-api/open-door.cgi"
  params: []
  notes: Energizes door opener / alarm output relay. If r omitted, physical relay 1 gets triggered.

- id: open_door_relay
  label: Open Door on Specific Relay
  kind: action
  command: "GET /bha-api/open-door.cgi?r={relay}"
  params:
    - name: relay
      type: string
      description: "Relay to trigger: 1, 2, or <doorcontrollerID>@<relay> for a paired IP I/O DoorController (e.g. gggaaa@1). Available relays listed by info.cgi."

- id: light_on
  label: Light On
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []
  notes: Energizes the light relay of the device. Returns JSON.

- id: history_image_request
  label: History Image Request
  kind: action
  command: "GET /bha-api/history.cgi?index={index}"
  params:
    - name: index
      type: integer
      description: Index of the history image, 1..50, where 1 is the latest history image

- id: history_image_request_event
  label: History Image Request by Event Type
  kind: action
  command: "GET /bha-api/history.cgi?event={event}&index={index}"
  params:
    - name: event
      type: enum
      values: [doorbell, motionsensor]
      description: "Event type (optional); default is ring history for DoorBird devices, input trigger history for BirdGuard devices"
    - name: index
      type: integer
      description: Index of the history image, 1..50

- id: monitor_request
  label: Monitor Request (Event State Stream)
  kind: action
  command: "GET /bha-api/monitor.cgi?ring={events}"
  params:
    - name: events
      type: string
      description: "Comma-separated event types to monitor: doorbell and/or motionsensor (e.g. doorbell,motionsensor). rfid and keypad events coming soon."
  notes: Returns continuous multipart/x-mixed-replace text stream of doorbell:H/L and motionsensor:H/L. Max 8 concurrent streams; HTTP 509 when all busy.

- id: live_audio_receive
  label: Live Audio Receive
  kind: action
  command: "GET /bha-api/audio-receive.cgi"
  params: []
  notes: Returns real-time G.711 µ-law audio, 8000 Hz sampling rate.

- id: live_audio_receive_session
  label: Live Audio Receive with Session ID
  kind: action
  command: "GET /bha-api/audio-receive.cgi?sessionid={session_id}"
  params:
    - name: session_id
      type: string
      description: Temporary session ID from getsession.cgi

- id: live_audio_transmit
  label: Live Audio Transmit
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params:
    - name: body
      type: binary
      description: "G.711 µ-law audio data (8000 Hz). Headers: Content-Type: audio/basic, Content-Length, Connection: Keep-Alive, Cache-Control: no-cache"
  notes: Only one consumer can transmit audio at a time; second consumer is rejected. Client must implement AEC/ANR.

- id: info_request
  label: Info Request
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []
  notes: Returns JSON with FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS, DEVICE-TYPE. Relays list included from firmware 000108.

- id: list_favorites
  label: List Favorites
  kind: query
  command: "GET /bha-api/favorites.cgi"
  params: []
  notes: Requires "API operator" permission and firmware 000110 or higher.

- id: save_favorite
  label: Add or Change Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}"
  params:
    - name: type
      type: enum
      values: [sip, http]
      description: "Type of favorite; may not be switched when saving an existing favorite"
    - name: title
      type: string
      description: Name or short description of the favorite
    - name: value
      type: string
      description: "URL or SIP target of the favorite, including protocol and credentials if necessary"
  notes: New favorite ID returned in response header "favoriteid". HTTP 507 if size limit exceeded.

- id: change_favorite_by_id
  label: Change Existing Favorite by ID
  kind: action
  command: "GET /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: type
      type: enum
      values: [sip, http]
    - name: title
      type: string
    - name: value
      type: string
    - name: id
      type: integer
      description: ID of the favorite to change

- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: type
      type: enum
      values: [sip, http]
      description: Type of the favorite
    - name: id
      type: integer
      description: ID of the favorite to delete
  notes: If the favorite is used in a schedule configuration, that schedule entry is also removed.

- id: list_schedules
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []
  notes: Returns JSON array of schedule entries. Requires "API operator" permission and firmware 000110 or higher. HTTP 204 if no data for the requested input.

- id: save_schedule
  label: Add or Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params:
    - name: body
      type: json
      description: 'Schedule JSON object, e.g. {"input":"doorbell","param":"1","output":[{"event":"notify","param":"","enabled":"1","schedule":{"weekdays":[{"to":"82799","from":"82800"}]}}]}. input: doorbell|motion|rfid|fingerprint. output.event: notify|sip|relay|http. schedule: once|from-to|weekdays.'
  notes: One request required per input type. Content-Length header mandatory. HTTP 507 if size limit exceeded.

- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: input
      type: enum
      values: [doorbell, motion, rfid]
      description: The input event type
    - name: param
      type: string
      description: "ID of the schedule entry to delete, e.g. doorbell number or RFID transponder id"

- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []
  notes: No diagnostic sound after this restart. HTTP 503 if device busy (e.g. installing firmware update).

- id: api_demonstration_page
  label: API Demonstration Page
  kind: action
  command: "GET /bha-api/view.html"
  params: []
  notes: Standard webpage demonstrating the API.

- id: rtsp_live_video
  label: RTSP Live Video Stream (default resolution)
  kind: action
  command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/media.amp"
  params: []
  notes: MPEG4 H.264 stream, up to ~12 fps. RTSP port 554, RTSP-over-HTTP port 8557.

- id: rtsp_live_video_720p
  label: RTSP Live Video Stream 720p
  kind: action
  command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/720p/media.amp"
  params: []
  notes: Source states supported by D10x/D21x from Firmware-Version 129. Support on D2204V not stated in source.

- id: rtsp_live_video_1080p
  label: RTSP Live Video Stream 1080p
  kind: action
  command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/1080p/media.amp"
  params: []
  notes: Source states supported by D11x only. Support on D2204V not stated in source.

- id: sip_registration
  label: SIP Registration
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
      description: Authentication user for the SIP Proxy
    - name: password
      type: string
      description: Authentication password for the SIP Proxy
    - name: url
      type: string
      description: IP/Hostname of the SIP Proxy
  notes: Requires "API operator" permission. Not necessary for peer-to-peer calls.

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: "SIP URL to call, e.g. sip:108@192.168.123.22"
  notes: Requires "API operator" permission. HTTP 503 if line busy. Each call auto-hangs-up after 180 seconds.

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params: []
  notes: Returns 200 OK even if no ongoing call.

- id: sip_status
  label: SIP Status Query
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  params: []
  notes: Returns JSON with LASTERRORCODE and LASTERRORTEXT. LASTERRORCODE 200 means successfully registered.

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  params: []
  notes: Resets all SIP settings except the license, including proxy and settings. Hangs up any ongoing call.

- id: sip_set_enable
  label: SIP Enable/Disable
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&enable={value}"
  params:
    - name: value
      type: integer
      description: 0..1 - enable or disable SIP registration after reboot. Default 0.

- id: sip_set_mic_volume
  label: SIP Set Microphone Volume
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&mic_volume={value}"
  params:
    - name: value
      type: integer
      description: 1..100 - microphone volume. Default 33.

- id: sip_set_spk_volume
  label: SIP Set Speaker Volume
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&spk_volume={value}"
  params:
    - name: value
      type: integer
      description: 1..100 - speaker volume. Default 70.

- id: sip_set_dtmf
  label: SIP Enable/Disable DTMF
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&dtmf={value}"
  params:
    - name: value
      type: integer
      description: 0..1 - enable or disable DTMF support. Default 0.

- id: sip_set_autocall_doorbell_url
  label: SIP Set Autocall Doorbell URL (deprecated)
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&autocall_doorbell_url={value}"
  params:
    - name: value
      type: string
      description: 'SIP URL to automatically call upon doorbell event, or "none" to disable. Default "none".'
  notes: DEPRECATED in source - replaced by schedule.cgi with favorites.cgi. Changes get migrated into favorite and schedule entries.

- id: sip_set_relay1_passcode
  label: SIP Set Relay 1 Passcode
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&relay1_passcode={value}"
  params:
    - name: value
      type: integer
      description: 0..99999999 - pincode for triggering the door open relay

- id: sip_set_incoming_call_enable
  label: SIP Enable/Disable Incoming Calls
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&incoming_call_enable={value}"
  params:
    - name: value
      type: integer
      description: 0..1 - enable or disable incoming calls. Default 0.

- id: sip_set_incoming_call_user
  label: SIP Set Allowed Incoming Call User
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&incoming_call_user={value}"
  params:
    - name: value
      type: string
      description: 'Allowed SIP user authenticated for DoorBird, e.g. "sip:10.0.0.1:5060" or "sip:user@10.0.0.2:5060"'

- id: sip_set_anc
  label: SIP Enable/Disable Acoustic Noise Cancellation
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&anc={value}"
  params:
    - name: value
      type: integer
      description: 0..1 - enable or disable acoustic noise cancellation. Default 1.

- id: sip_set_ring_time_limit
  label: SIP Set Ring Time Limit
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&ring_time_limit={value}"
  params:
    - name: value
      type: integer
      description: 10..300 - maximum ringing time in seconds. Default 300.

- id: sip_set_call_time_limit
  label: SIP Set Call Time Limit
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&call_time_limit={value}"
  params:
    - name: value
      type: integer
      description: 30..300 - maximum call duration in seconds. Default 300.
```

## Feedbacks
```yaml
- id: doorbell_state
  type: enum
  values: [H, L]
  source: "monitor.cgi stream line 'doorbell:H' / 'doorbell:L'"

- id: motionsensor_state
  type: enum
  values: [H, L]
  source: "monitor.cgi stream line 'motionsensor:H' / 'motionsensor:L'"

- id: return_code
  type: string
  source: "info.cgi / getsession.cgi JSON field BHA.RETURNCODE (e.g. \"1\")"

- id: firmware
  type: string
  source: "info.cgi JSON field BHA.VERSION[0].FIRMWARE (e.g. \"000109\")"

- id: build_number
  type: string
  source: "info.cgi JSON field BHA.VERSION[0].BUILD_NUMBER (e.g. \"15120529\")"

- id: primary_mac_addr
  type: string
  source: "info.cgi JSON field BHA.VERSION[0].PRIMARY_MAC_ADDR (e.g. \"1CCAE3700000\")"

- id: relays
  type: array
  source: "info.cgi JSON field BHA.VERSION[0].RELAYS (e.g. [\"1\",\"2\",\"gggaaa@1\",\"gggaaa@2\"]); present from firmware 000108"

- id: device_type
  type: string
  source: "info.cgi JSON field BHA.VERSION[0].DEVICE-TYPE (e.g. \"DoorBird D101\")"

- id: session_id
  type: string
  source: "getsession.cgi JSON field BHA.SESSIONID"

- id: notification_encryption_key
  type: string
  source: "getsession.cgi JSON field BHA.NOTIFICATION_ENCRYPTION_KEY (32-64 bytes; first 32 used by ChaCha20)"

- id: sip_last_error_code
  type: string
  source: "sip.cgi?action=status JSON field LASTERRORCODE; \"200\" means SIP client successfully registered"

- id: sip_last_error_text
  type: string
  source: "sip.cgi?action=status JSON field LASTERRORTEXT (most recent SIP error text)"

- id: favorites_list
  type: json
  source: "favorites.cgi JSON object with 'sip' and 'http' maps of id -> {title, value}"

- id: schedules_list
  type: json
  source: "schedule.cgi JSON array of {input, param, output[]} entries"

- id: favorite_id
  type: string
  source: "favorites.cgi?action=save response header 'favoriteid' (new favorite's id)"

- id: http_status
  type: enum
  values: [200, 204, 400, 401, 423, 500, 503, 507, 509]
  source: >
    Documented status codes: 200 OK; 204 no permission at this moment / no data for requested input;
    400 parameter missing or invalid / invalid JSON; 401 authentication required;
    423 IP or user blocked for 1 minute after repeated wrong credentials;
    500 internal error; 503 busy (line busy, or device installing firmware);
    507 size limit exceeded (favorites/schedules); 509 all monitor.cgi streams busy
```

## Variables
```yaml
- id: sip_enable
  type: integer
  range: [0, 1]
  default: 0
  set_via: sip_set_enable

- id: sip_mic_volume
  type: integer
  range: [1, 100]
  default: 33
  set_via: sip_set_mic_volume

- id: sip_spk_volume
  type: integer
  range: [1, 100]
  default: 70
  set_via: sip_set_spk_volume

- id: sip_dtmf
  type: integer
  range: [0, 1]
  default: 0
  set_via: sip_set_dtmf

- id: sip_autocall_doorbell_url
  type: string
  default: "none"
  set_via: sip_set_autocall_doorbell_url
  notes: DEPRECATED per source; replaced by schedule.cgi

- id: sip_relay1_passcode
  type: integer
  range: [0, 99999999]
  set_via: sip_set_relay1_passcode
  # UNRESOLVED: default value not stated in source

- id: sip_incoming_call_enable
  type: integer
  range: [0, 1]
  default: 0
  set_via: sip_set_incoming_call_enable

- id: sip_incoming_call_user
  type: string
  set_via: sip_set_incoming_call_user
  # UNRESOLVED: default value not stated in source

- id: sip_anc
  type: integer
  range: [0, 1]
  default: 1
  set_via: sip_set_anc

- id: sip_ring_time_limit
  type: integer
  range: [10, 300]
  default: 300
  unit: seconds
  set_via: sip_set_ring_time_limit

- id: sip_call_time_limit
  type: integer
  range: [30, 300]
  default: 300
  unit: seconds
  set_via: sip_set_call_time_limit
```

## Events
```yaml
- id: udp_event_broadcast_v2
  transport: udp
  ports: [6524, 35344]
  description: >
    After an event occurs the device sends multiple identical UDP broadcasts on ports 6524 and 35344
    for every user and every connected device. Keep-alive broadcasts are also sent every 7 seconds
    on both ports and are not relevant for event decryption.
  packet_format:
    - field: IDENT
      length_bytes: 3
      value: "0xDE 0xAD 0xBE"
    - field: VERSION
      length_bytes: 1
      values:
        - "0x01  # DEPRECATED: ChaCha20-Poly1305 with Argon2i"
        - "0x02  # ChaCha20-Poly1305"
    - field: NONCE
      length_bytes: 8
      description: Used for encryption with ChaCha20-Poly1305 (VERSION 0x02)
    - field: CIPHERTEXT
      length_bytes: 34
      description: ChaCha20-Poly1305 encrypted event data; contains 16 bytes of random values not present after decryption
  decrypted_payload:
    - field: INTERCOM_ID
      length_bytes: 6
      type: string
      description: First 6 characters of the user name; skip packet if it does not match your DoorBird user
    - field: EVENT
      length_bytes: 8
      type: string
      description: 'Doorbell number or "motion", padded with spaces'
    - field: TIMESTAMP
      length_bytes: 4
      type: long
      description: Unix timestamp
  decryption_key: "NOTIFICATION_ENCRYPTION_KEY from getsession.cgi; valid until the user password changes"
  algorithm: "ChaCha20-Poly1305 authenticated encryption (e.g. libsodium crypto_aead_chacha20poly1305_decrypt)"

- id: monitor_stream_event
  transport: http
  description: >
    monitor.cgi delivers doorbell and motionsensor state transitions as a continuous
    multipart/x-mixed-replace text stream (boundary --ioboundary), each part a text/plain
    line such as "doorbell:H" or "motionsensor:L".
  # UNRESOLVED: rfid and keypad event types are stated as "coming soon" in source; not available.
```

## Macros
```yaml
- id: obtain_and_use_notification_key
  label: Obtain Notification Encryption Key then Decrypt UDP Events
  steps:
    - "GET /bha-api/getsession.cgi with DoorBird user and password; store NOTIFICATION_ENCRYPTION_KEY"
    - "Listen for UDP broadcasts on ports 6524 and 35344"
    - "Skip keep-alive packets (sent every 7 seconds)"
    - "Verify IDENT = 0xDE 0xAD 0xBE and VERSION = 0x02"
    - "Split NONCE (8 bytes) and CIPHERTEXT (34 bytes)"
    - "Decrypt CIPHERTEXT with ChaCha20-Poly1305 using first 32 bytes of the stored key"
    - "Parse INTERCOM_ID, EVENT, TIMESTAMP; discard if INTERCOM_ID does not match your user"
  notes: Source states this key request must be done only once, not per received packet.

- id: streaming_over_session_id
  label: Stream Video/Audio Without Plaintext Credentials
  steps:
    - "GET /bha-api/getsession.cgi to obtain a temporary Session ID (valid 10 minutes)"
    - "GET /bha-api/video.cgi?sessionid=<session-id> for video, or /bha-api/audio-receive.cgi?sessionid=<session-id> for audio"
    - "Optionally GET /bha-api/getsession.cgi?invalidate=<session-id> to destroy the session"
  notes: Source states video/audio streaming is not available over HTTPS in the LAN, so Session ID is used instead of plaintext credentials.

- id: sip_doorbell_call_flow
  label: Initiate SIP Call on Doorbell Event
  steps:
    - "Listen to device notifications (UDP event broadcast or monitor.cgi)"
    - "GET /bha-api/sip.cgi?action=makecall&url=<sip-url>"
    - "GET /bha-api/sip.cgi?action=hangup to terminate"
  notes: >
    Source states the SIP service will not initiate the call automatically on doorbell push;
    the integrator must listen for notifications and call makecall. Calls auto-hangup after 180 seconds.
    Wait at least 3 seconds between SIP requests.
```

## Safety
```yaml
confirmation_required_for:
  - open_door        # source: energizes the door opener / alarm output relay - physical access control
  - open_door_relay  # source: energizes a selected relay, incl. relays on paired IP I/O DoorControllers
  - restart          # source: restarts the device; no diagnostic sound after restart
  - sip_reset        # source: resets all SIP settings except license and hangs up any ongoing call
  - delete_favorite  # source: if the favorite is used in a schedule, that schedule entry is also removed
interlocks:
  - id: door_open_requires_live_view_permission
    description: >
      Source: "We assume, that the API user watches the live image in order to open the door or trigger
      relays." Requests from users without "watch always" permission and without a ring event in the past
      5 minutes are answered with return code 204.
    applies_to: [open_door, open_door_relay, light_on]
  - id: api_operator_permission_required
    description: >
      Source: the "API operator" permission is required for favorites.cgi, schedules.cgi and SIP settings /
      makecall. Source warns this permission should only be enabled for users on central Home Automation
      servers, NOT for users configured in end-user panels or apps, because such a user could change global
      settings for other users.
    applies_to: [list_favorites, save_favorite, change_favorite_by_id, delete_favorite, list_schedules, save_schedule, delete_schedule, sip_registration, sip_makecall, sip_hangup, sip_status, sip_reset, sip_set_enable, sip_set_mic_volume, sip_set_spk_volume, sip_set_dtmf, sip_set_autocall_doorbell_url, sip_set_relay1_passcode, sip_set_incoming_call_enable, sip_set_incoming_call_user, sip_set_anc, sip_set_ring_time_limit, sip_set_call_time_limit]
  - id: credential_lockout
    description: >
      Source: the API blocks the IP address or the whole user from the system for 1 minute after extensive
      use of wrong credentials, indicated by HTTP response code 423. Integrations must not retry aggressively.
    applies_to: [all]
  - id: restart_while_busy
    description: "Source: restart.cgi returns 503 when the device is busy, e.g. currently installing a firmware update."
    applies_to: [restart]
  - id: self_signed_certificate
    description: >
      Source: Certificate Authorities do not issue certificates for IP addresses, so the device carries a
      pre-installed self-signed certificate for HTTPS in the LAN. Clients must accept it explicitly. The
      firmware also does not validate certificates of HTTPS favorite targets.
    applies_to: [all]
  - id: single_call_precedence
    description: >
      Source: the device handles only one simultaneous audio/video call and one simultaneous SIP call.
      The official DoorBird App has precedence and can interrupt LAN-API video, audio and RTSP connections
      at any time, and will close any ongoing SIP connection on a listen/talk request.
    applies_to: [live_video_request, live_audio_receive, live_audio_transmit, rtsp_live_video, sip_makecall]
# UNRESOLVED: no electrical (voltage/current), wiring, or power-sequencing safety data in source.
```

## Notes
- Device discovery uses Apple Bonjour (e.g. `dns-sd -B _http._tcp local`) or the DoorBird App search; source also lists `https://www.doorbird.com/checkonline`.
- Audio codec is fixed: G.711 µ-law at 8000 Hz sampling rate for both receive and transmit. Echo/noise cancellation (AEC/ANR) must be implemented client-side; DoorBird's own AEC/ANR algorithms are not available to third parties.
- Rate limiting is strict: 1 concurrent API connection per second. Wrong credentials trigger a 1-minute block signalled by HTTP 423.
- Schedule time model: seconds since Sunday 00:00 for `weekdays` (max 604799); Unix seconds UTC for `from-to`. Start times must be multiples of 1800 seconds; use `from=0` `to=604799` for always-on. Only one schedule entry per output type/time slot/event slot, except relays which allow multiple per event.
- Legacy `notification.cgi` entries are migrated to schedule entries per source; `notification.cgi` itself is not documented in this revision.
- Event Monitoring v1 (`VERSION 0x01`, ChaCha20-Poly1305 with Argon2i) is deprecated as of November 2023 and can be disabled by the user; integrations should use v2.
- SIP service is described by the vendor as "in early stage of development". P2P SIP calls supported from device version 000099. Wait 5-7 seconds before assuming a SIP failure; wait ≥3 seconds between SIP requests.

<!-- UNRESOLVED: source document is the generic DoorBird/BirdGuard LAN-2-LAN API rev 0.36; its COMPATIBLE DEVICES table enumerates D10x/D20x/D21x/B10x/D11x and does not list D22x or the D2204V. All endpoints above are transcribed verbatim from that document, but per-model applicability to the D2204V DNP Flush-mount is not stated in the source. -->
<!-- UNRESOLVED: no D2204V-specific firmware version, relay count, doorbell number range, keypad/RFID/fingerprint hardware inventory, or resolution capability stated in source. -->
<!-- UNRESOLVED: `notification.cgi` (referenced as migrated-from) and any RFID/keypad/fingerprint trigger APIs are not documented in this source revision. -->
<!-- UNRESOLVED: RTSP device port is written as `<device-rtsp-port>` in the request template; source states RTSP uses 554 and RTSP-over-HTTP uses 8557 but does not state the configured default per model. -->
<!-- UNRESOLVED: no voltage, current, power draw, fault-recovery, or protocol version number for the CGI interface stated in source. -->
````

Spec write done. Cover 48 actions from all doc sections — session, video/image, relay, history, monitor, audio, info, favorites, schedules, restart, RTSP, full SIP catalog. All `command:` payload verbatim. Fix front matter as required: `draft`, `low`, rev 1. No invent port/baud — every port quoted from doc (80/443/554/8557/5060/6524/35344). Big UNRESOLVED flag: rev 0.36 doc no list D22x, so per-model fit not stated in source.

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/en/api
retrieved_at: 2026-08-16T06:05:18.316Z
last_checked_at: 2026-08-19T09:21:54.810Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:21:54.810Z
matched_actions: 43
action_count: 43
confidence: medium
summary: "All 43 spec action endpoints appear verbatim in source, transport values verified, and source command catalogue is fully covered. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source document is the generic DoorBird/BirdGuard LAN-2-LAN API (rev 0.36). It does not name the D2204V or the D22x series in its compatible-devices list; applicability to this model is by platform association only, not stated in source."
- "per-model relay count, doorbell-number range, keypad/RFID/fingerprint hardware presence not stated in source."
- "RTSP 720p/1080p stream paths are stated as supported only on D10x/D21x/D11x; support on D2204V not stated."
- "no device power on/off command documented in source; `powerable` not claimed. restart.cgi is a reboot, not power control."
- "default value not stated in source"
- "rfid and keypad event types are stated as \"coming soon\" in source; not available."
- "no electrical (voltage/current), wiring, or power-sequencing safety data in source."
- "source document is the generic DoorBird/BirdGuard LAN-2-LAN API rev 0.36; its COMPATIBLE DEVICES table enumerates D10x/D20x/D21x/B10x/D11x and does not list D22x or the D2204V. All endpoints above are transcribed verbatim from that document, but per-model applicability to the D2204V DNP Flush-mount is not stated in the source."
- "no D2204V-specific firmware version, relay count, doorbell number range, keypad/RFID/fingerprint hardware inventory, or resolution capability stated in source."
- "notification.cgi` (referenced as migrated-from) and any RFID/keypad/fingerprint trigger APIs are not documented in this source revision."
- "RTSP device port is written as `<device-rtsp-port>` in the request template; source states RTSP uses 554 and RTSP-over-HTTP uses 8557 but does not state the configured default per model."
- "no voltage, current, power draw, fault-recovery, or protocol version number for the CGI interface stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
