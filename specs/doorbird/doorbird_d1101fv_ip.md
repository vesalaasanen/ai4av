---
spec_id: admin/doorbird-d1101fv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D1101FV Control Spec"
manufacturer: Doorbird
model_family: D1101FV
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - D1101FV
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-07-12T20:23:48.365Z
last_checked_at: 2026-07-21T22:22:16.469Z
generated_at: 2026-07-21T22:22:16.469Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "physical relay count not confirmed from source — info.cgi needed to enumerate (source states relays config included in info.cgi JSON from firmware 000108)"
  - "no discrete settable parameters outside of SIP settings and schedule/favorites management"
  - "specific notification payload format not stated in source - configured by user via HTTP favorites"
  - "no multi-step command sequences defined in source"
  - "physical safety limits (voltage, current, power) not stated in source"
  - "physical relay count not confirmed from source — info.cgi needed to enumerate"
  - "RTSP device-rtsp-port placeholder used because source writes <device-rtsp-port> rather than a literal — 554 implied for native RTSP, 8557 for RTSP-over-HTTP"
  - "SIP port 5060 default stated in source but user may configure different port"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:22:16.469Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched literally in source; transport parameters verified; full bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Doorbird D1101FV Control Spec

## Summary

Doorbird D1101FV is an IP video door station with HTTP LAN API, RTSP video stream, SIP VoIP interface, and UDP event broadcasts. Control is available via plaintext HTTP parameters (insecure) or RFC 2617 Basic/Digest auth. Video streaming supports MJPG over HTTP and H.264 over RTSP. Audio uses G.711 μ-law (8000 Hz). The device belongs to the DoorBird D11x family (firmware 000130 and above per the LAN API compatibility table).

<!-- UNRESOLVED: physical relay count not confirmed from source — info.cgi needed to enumerate (source states relays config included in info.cgi JSON from firmware 000108) -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - udp
addressing:
  base_url: http://<device-ip>/bha-api/
  ports:
    http: 80           # stated: "unencrypted on TCP port 80 (HTTP protocol)"
    https: 443         # stated: "encrypted on TCP port 443 (HTTPS protocol)"
    rtsp: 554          # stated: "Uses RTSP on 554"
    rtsp_over_http: 8557  # stated: "the RTSP-over-HTTP protocol on port 8557"
    sip: 5060          # stated: "the device is ready to receive SIP calls on port 5060"
    udp_event: [6524, 35344]  # stated: "UDP-Broadcasts on the ports 6524 and 35344"
auth:
  type: basic_digest  # stated: Basic or Digest auth per RFC 2617; also accepts plaintext http-user/http-password query params (insecure). Self-signed cert for HTTPS (no CA cert for IPs).
```

## Traits
```yaml
# inferred from command examples in source:
powerable: false  # no power on/off command in source
routable: false  # no input/output routing in source
queryable: true   # info.cgi, sip.cgi?action=status, schedule.cgi, favorites.cgi
levelable: true   # sip.cgi mic/spk volume (1..100)
```

## Actions
```yaml
- id: open_door
  label: Open Door
  kind: action
  command: "http://<device-ip>/bha-api/open-door.cgi?r={r}"
  params:
    - name: r
      type: string
      required: false
      description: "Relay to trigger, e.g. \"1\" or \"gggaaa@1\" for DoorController. Defaults to relay 1."

- id: light_on
  label: Light On
  kind: action
  command: "http://<device-ip>/bha-api/light-on.cgi"
  params: []

- id: restart
  label: Restart Device
  kind: action
  command: "http://<device-ip>/bha-api/restart.cgi"
  params: []
  description: "Restarts device. No diagnostic sound after restart. 503 if device busy (e.g. firmware update)."

- id: get_session
  label: Get Session ID
  kind: action
  command: "http://<device-ip>/bha-api/getsession.cgi"
  params: []
  description: "Obtains temporary session ID (valid 10 min) and NOTIFICATION_ENCRYPTION_KEY for UDP event decryption."

- id: invalidate_session
  label: Invalidate Session
  kind: action
  command: "http://<device-ip>/bha-api/getsession.cgi?invalidate={invalidate}"
  params:
    - name: invalidate
      type: string
      required: true
      description: "Session ID to invalidate."

- id: get_info
  label: Get Device Info
  kind: query
  command: "http://<device-ip>/bha-api/info.cgi"
  params: []
  description: "Returns firmware version, build number, MAC address, relay config (from fw 000108), device type."

- id: live_video_mjpg
  label: Live Video (MJPG Stream)
  kind: query
  command: "http://<device-ip>/bha-api/video.cgi"
  params: []
  description: "Multipart x-mixed-replace JPEG live stream (default resolution/compression). Up to 8 fps. For HTTPS streaming use ?sessionid=<id>. 204 if no watch-always + no recent ring."

- id: live_image
  label: Live Image (JPEG)
  kind: query
  command: "http://<device-ip>/bha-api/image.cgi"
  params: []
  description: "Single JPEG image (default resolution/compression). Content-Type image/jpeg. 204 if no watch-always + no ring in past 1 minute."

- id: live_video_rtsp
  label: Live Video (RTSP H.264)
  kind: query
  command: "rtsp://<device-ip>:<device-rtsp-port>/mpeg/media.amp"
  params:
    - name: resolution
      type: string
      required: false
      description: "Optional resolution variants: /mpeg/720p/media.amp (D10x/D21x fw 129+) or /mpeg/1080p/media.amp (D11x only)."
  description: "H.264 RTSP stream on port 554; RTSP-over-HTTP on port 8557. Up to 12 fps. Requires standard RTSP auth (no param auth)."

- id: live_audio_receive
  label: Live Audio Receive
  kind: query
  command: "http://<device-ip>/bha-api/audio-receive.cgi"
  params: []
  description: "Real-time G.711 μ-law audio from device. 204 if no permission. For HTTPS use ?sessionid=<id>."

- id: live_audio_transmit
  label: Live Audio Transmit
  kind: action
  command: "http://<device-ip>/bha-api/audio-transmit.cgi"
  method: POST
  params:
    - name: audio_data
      type: binary
      required: true
      description: "G.711 μ-law audio data, 8000 Hz. Content-Type: audio/basic. Only one consumer may transmit at a time."
  description: "Transmit G.711 μ-law audio to device speaker. Method POST, HTTP/1.0. Client must do AEC/ANR."

- id: history_image
  label: History Image Request
  kind: query
  command: "http://<device-ip>/bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      required: true
      description: "1..50, index of history image (1 = latest)."
    - name: event
      type: string
      required: false
      description: "\"doorbell\" or \"motionsensor\". Default: ring history (DoorBird) / input trigger history (BirdGuard)."
  description: "Returns JPEG history image (stored in cloud). Requires history or motion permission. 204 if no permission."

- id: monitor
  label: Monitor Request
  kind: query
  command: "http://<device-ip>/bha-api/monitor.cgi?ring={ring}"
  params:
    - name: ring
      type: string
      required: true
      description: "Comma-separated event types: \"doorbell\", \"motionsensor\". (rfid/keypad coming soon.)"
  description: "Continuous multipart stream of motionsensor/doorbell state. Up to 8 concurrent streams (509 when all busy). Returns doorbell:H/L, motionsensor:H/L."

- id: list_favorites
  label: List Favorites
  kind: query
  command: "http://<device-ip>/bha-api/favorites.cgi"
  params: []
  description: "Lists all configured favorites (SIP and HTTP). Requires API-Operator permission."

- id: save_favorite
  label: Save Favorite
  kind: action
  command: "http://<device-ip>/bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: action
      type: string
      required: true
      description: "Fixed value \"save\"."
    - name: type
      type: string
      required: true
      description: "\"sip\" or \"http\". Cannot switch type on existing favorite."
    - name: title
      type: string
      required: true
      description: "Name/title of the favorite."
    - name: value
      type: string
      required: true
      description: "URL or SIP target."
    - name: id
      type: integer
      required: false
      description: "ID of existing favorite to update. Omit for new. New id returned in response header \"favoriteid\"."

- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "http://<device-ip>/bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: action
      type: string
      required: true
      description: "Fixed value \"remove\"."
    - name: type
      type: string
      required: true
      description: "\"sip\" or \"http\"."
    - name: id
      type: integer
      required: true
      description: "ID of favorite to delete. Actively-used schedule entries also removed."

- id: list_schedules
  label: List Schedules
  kind: query
  command: "http://<device-ip>/bha-api/schedule.cgi"
  params: []
  description: "Lists all schedule entries as JSON. Requires API-Operator permission."

- id: save_schedule
  label: Save Schedule Entry
  kind: action
  command: "http://<device-ip>/bha-api/schedule.cgi"
  method: POST
  params:
    - name: input
      type: string
      required: true
      description: "\"doorbell\", \"motion\", \"rfid\", or \"fingerprint\"."
    - name: param
      type: string
      required: false
      description: "Doorbell number, transponder ID, or fingerprint ID."
    - name: output
      type: string
      required: true
      description: "JSON array of output action configurations (event: notify|sip|relay|http; schedule: once|from-to|weekdays)."

- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  command: "http://<device-ip>/bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: action
      type: string
      required: true
      description: "Fixed value \"remove\"."
    - name: input
      type: string
      required: true
      description: "\"doorbell\", \"motion\", or \"rfid\"."
    - name: param
      type: string
      required: false
      description: "Doorbell number or transponder ID."

- id: sip_registration
  label: SIP Register
  kind: action
  command: "http://<device-ip>/bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
      required: true
      description: "SIP proxy auth user."
    - name: password
      type: string
      required: true
      description: "SIP proxy auth password."
    - name: url
      type: string
      required: true
      description: "SIP proxy IP/hostname."

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "http://<device-ip>/bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      required: true
      description: "SIP URL to call, e.g. \"sip:108@192.168.123.22\"."

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "http://<device-ip>/bha-api/sip.cgi?action=hangup"
  params: []
  description: "Hangup SIP call. Returns 200 even if no ongoing call."

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "http://<device-ip>/bha-api/sip.cgi?action=settings"
  params:
    - name: enable
      type: integer
      required: false
      description: "0..1, enable SIP after reboot. Default 0."
    - name: mic_volume
      type: integer
      required: false
      description: "1..100, microphone volume. Default 33."
    - name: spk_volume
      type: integer
      required: false
      description: "1..100, speaker volume. Default 70."
    - name: dtmf
      type: integer
      required: false
      description: "0..1, enable DTMF. Default 0."
    - name: relay1_passcode
      type: integer
      required: false
      description: "0..99999999, pincode to trigger door relay via DTMF."
    - name: autocall_doorbell_url
      type: string
      required: false
      description: "DEPRECATED - use schedule.cgi. URL or \"none\". Auto-migrated to favorites/schedule. Default \"none\"."
    - name: incoming_call_enable
      type: integer
      required: false
      description: "0..1, enable incoming calls. Default 0."
    - name: incoming_call_user
      type: string
      required: false
      description: "Allowed SIP user, e.g. \"sip:10.0.0.1:5060\" or \"sip:user@10.0.0.2:5060\"."
    - name: anc
      type: integer
      required: false
      description: "0..1, acoustic noise cancellation. Default 1."
    - name: ring_time_limit
      type: integer
      required: false
      description: "10..300, max ringing time in seconds. Default 300."
    - name: call_time_limit
      type: integer
      required: false
      description: "30..300, max call duration in seconds. Default 300."

- id: sip_status
  label: SIP Status
  kind: query
  command: "http://<device-ip>/bha-api/sip.cgi?action=status"
  params: []
  description: "Returns current SIP registration status and last error code/text."

- id: sip_reset
  label: SIP Reset
  kind: action
  command: "http://<device-ip>/bha-api/sip.cgi?action=reset"
  params: []
  description: "Resets all SIP settings except license. Hangs up any ongoing call."
```

## Feedbacks
```yaml
- id: doorbell_event
  type: string
  description: "Doorbell press event, sent via UDP broadcast on ports 6524/35344. Encrypted ChaCha20-Poly1305 v2. EVENT field contains doorbell number padded to 8 chars."

- id: motion_event
  type: string
  description: "Motion sensor event, sent via UDP broadcast on ports 6524/35344. Encrypted ChaCha20-Poly1305 v2."

- id: monitor_state
  type: string
  description: "monitor.cgi multipart stream emits doorbell:H/L (high/low) and motionsensor:H/L state lines."

- id: relay_triggered
  type: string
  description: "Door open relay activation acknowledged via JSON response with RETURNCODE."

- id: sip_call_status
  type: enum
  values: ["200", "400", "401", "503"]
  description: "SIP makecall response codes: 200=ok, 400=bad param, 401=auth failure, 503=line busy."

- id: http_returncode
  type: integer
  description: "General HTTP API return code in JSON BHA.RETURNCODE field."
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters outside of SIP settings and schedule/favorites management
# SIP volume and enable state captured as action params above
```

## Events
```yaml
# UDP event broadcasts on ports 6524 and 35344 (ChaCha20-Poly1305 encrypted v2):
- id: doorbell
  type: string
  description: "Doorbell press. Decrypted CIPHERTEXT contains INTERCOM_ID(6), EVENT(8), TIMESTAMP(4)."

- id: motion
  type: string
  description: "Motion sensor trigger. Same structure as doorbell event."

- id: udp_keepalive
  type: string
  description: "Keep-alive broadcast every 7 seconds on ports 6524/35344 - skip these for decryption (not events)."

# HTTP push notifications via schedule/favorites (configured by user):
# UNRESOLVED: specific notification payload format not stated in source - configured by user via HTTP favorites
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Audio transmit requires client-side AEC/ANR (echo/noise cancellation) - DoorBird does not provide third-party AEC. Use G.711 μ-law codec at 8000 Hz."
  - "SIP calls auto-terminate after 180 seconds for security."
  - "Video/audio stream can be interrupted when official DoorBird App requests the stream - App has precedence."
  - "UDP event broadcasts include keep-alive packets every 7 seconds - skip these for decryption."
  - "Session ID valid 10 minutes; re-request via getsession.cgi after password change."
  - "API rate limit: max 1 concurrent connection per second; excessive wrong auth blocks IP for 1 minute (HTTP 423)."
  - "Device busy (e.g. firmware update in progress) returns HTTP 503."
  - "All 8 concurrent monitor streams busy returns HTTP 509."
  - "SIP: minimum 3 seconds between each SIP request; only one simultaneous SIP call supported."
  - "Video Door Station supports only one simultaneous audio/video call (1:1, not 1:n)."
# UNRESOLVED: physical safety limits (voltage, current, power) not stated in source
```

## Notes

Device is an IP door station — not a general AV receiver. Commands focus on door control (open door, light), A/V streaming (MJPG/H.264 video, G.711 audio in/out), event monitoring, SIP calling, and schedule/favorites management. Video streams: MJPG via HTTP (video.cgi, 8 fps), H.264 via RTSP port 554 / RTSP-over-HTTP port 8557 (12 fps). Audio uses G.711 μ-law 8000 Hz (audio-receive.cgi GET, audio-transmit.cgi POST).

Rate limit: 1 concurrent API connection/second. Wrong auth → 423 → block 1 min. 503 when device busy. 509 when all 8 monitor streams busy. 204 when user lacks watch-always + no recent ring.

Auth supports RFC 2617 Basic/Digest OR plaintext http-user/http-password query params (insecure). No password-free mode. SIP requires username+password with API-Operator permission. HTTPS uses self-signed cert (no CA cert for IP addresses).

UDP event decryption: getsession.cgi returns NOTIFICATION_ENCRYPTION_KEY (32+ bytes for ChaCha20; only first 32 bytes used). Packet structure: IDENT(3)=0xDEADB + VERSION(1)=0x02 + NONCE(8) + CIPHERTEXT(34). After decryption: INTERCOM_ID(6) + EVENT(8) + TIMESTAMP(4). Keep-alive packets every 7 sec must be skipped. v1 (Argon2i) deprecated since Nov 2023.

Video streaming exceptions: video/audio via HTTPS not available — must use HTTP with sessionid, or RTSP with standard auth.

Firmware requirements: D11x family needs 000130+. Relays config in info.cgi from 000108+. Favorites/schedules need 000110+. 720p RTSP needs fw 129 (D10x/D21x); 1080p RTSP D11x only.

<!-- UNRESOLVED: physical relay count not confirmed from source — info.cgi needed to enumerate -->
<!-- UNRESOLVED: RTSP device-rtsp-port placeholder used because source writes <device-rtsp-port> rather than a literal — 554 implied for native RTSP, 8557 for RTSP-over-HTTP -->
<!-- UNRESOLVED: SIP port 5060 default stated in source but user may configure different port -->
````

Upgrade done. Added 6 missing endpoints (video MJPG, image JPEG, RTSP H.264, audio-receive, audio-transmit POST, history image, monitor state stream). Added `command:` payload to all existing actions (were non-implementable before). Added deprecated `autocall_doorbell_url` param to sip_settings, keepalive event, monitor_state feedback. Fixed transport — ports 80/443/554/8557/5060/6524/35344 all stated in source (were falsely marked UNRESOLVED). Preserved all existing IDs + shapes.

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-07-12T20:23:48.365Z
last_checked_at: 2026-07-21T22:22:16.469Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:22:16.469Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched literally in source; transport parameters verified; full bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "physical relay count not confirmed from source — info.cgi needed to enumerate (source states relays config included in info.cgi JSON from firmware 000108)"
- "no discrete settable parameters outside of SIP settings and schedule/favorites management"
- "specific notification payload format not stated in source - configured by user via HTTP favorites"
- "no multi-step command sequences defined in source"
- "physical safety limits (voltage, current, power) not stated in source"
- "physical relay count not confirmed from source — info.cgi needed to enumerate"
- "RTSP device-rtsp-port placeholder used because source writes <device-rtsp-port> rather than a literal — 554 implied for native RTSP, 8557 for RTSP-over-HTTP"
- "SIP port 5060 default stated in source but user may configure different port"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
