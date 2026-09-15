---
spec_id: admin/doorbird-d2108v
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2108V Control Spec"
manufacturer: Doorbird
model_family: "Doorbird D2108V"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "Doorbird D2108V"
    - "DoorBird Video Door Station D21x"
  firmware: "\"000108 and above\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-05-12T20:44:51.798Z
last_checked_at: 2026-09-04T22:16:55.466Z
generated_at: 2026-09-04T22:16:55.466Z
firmware_coverage: "\"000108 and above\""
protocol_coverage: []
known_gaps:
  - "D2108V-specific quirks not called out; the source covers the D21x family generally. Cloud API and remote relay scheduling behaviour for D2108V specifically are not stated."
  - "the source documents all device-level state via JSON-returning"
  - "no multi-step sequences are documented in the source beyond"
  - "the source does not document safety interlocks, power-on"
  - "Cloud API access and remote relay scheduling behaviour for the D2108V specifically are outside the scope of the LAN-2-LAN API document. D2108V-specific hardware features (display, keypad, RFID reader, fingerprint reader) and any D2108V-specific commands are not enumerated in the source beyond the D21x family compatibility note."
verification:
  verdict: verified
  checked_at: 2026-09-04T22:16:55.466Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions map verbatim to CGI endpoints in the source; all transport values (80/443/554/8557/5060, /bha-api/, RFC 2617 Basic/Digest) are sourced. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Doorbird D2108V Control Spec

## Summary
This spec covers the Doorbird D2108V Video Door Station's third-party LAN control API (revision 0.36, dated 2023-11-13). The D2108V is part of the D21x family; the LAN API document explicitly lists D21x hardware with firmware 000108+ as supported. Control is exposed over HTTP/HTTPS CGI endpoints under `/bha-api/`, an RTSP server on port 554/8557, encrypted UDP event broadcasts on ports 6524 and 35344, and an embedded SIP client. Authentication uses HTTP Basic/Digest or session-id query parameters with DoorBird App credentials.

<!-- UNRESOLVED: D2108V-specific quirks not called out; the source covers the D21x family generally. Cloud API and remote relay scheduling behaviour for D2108V specifically are not stated. -->

## Transport
```yaml
# Multiple transports are documented; treat as parallel interfaces. The HTTP CGI
# endpoints are the primary control surface. UDP broadcasts are unsolicited
# events. RTSP carries media. SIP carries call audio. TLS uses a self-signed
# certificate pre-installed on the device.
protocols:
  - http
  - tcp
  - udp
addressing:
  port: 80            # HTTP, plain LAN API
  base_url: "http://<device-ip>/bha-api/"
  alternate_ports:
    - 443             # HTTPS, self-signed cert
    - 554             # RTSP
    - 8557            # RTSP-over-HTTP
    - 5060            # SIP (when enable=1)
auth:
  type: basic
  scheme: "HTTP Basic or Digest (RFC 2617); alternatively plaintext query params http-user / http-password"
  notes: "Same credentials used to add the device to the DoorBird App. Excessive failed auth blocks the IP for 1 minute (HTTP 423)."
```

## Traits
```yaml
powerable: true       # inferred: restart.cgi and relay trigger commands imply the device has power management
routable: false
queryable: true       # inferred: info.cgi, sip.cgi?action=status return device state
levelable: true       # inferred: sip.cgi settings expose mic_volume and spk_volume (0-100)
```

## Actions
```yaml
- id: get_session
  label: Create temporary session ID (valid 10 minutes)
  kind: query
  command: "GET /bha-api/getsession.cgi"
  params: []

- id: invalidate_session
  label: Invalidate an existing session ID
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate=<session_id>"
  params:
    - name: session_id
      type: string
      description: The session ID to invalidate

- id: live_video
  label: Live multipart JPEG stream
  kind: action
  command: "GET /bha-api/video.cgi"
  params: []
  notes: "Returns multipart/x-mixed-replace JPEG stream, up to ~8 fps."

- id: live_image
  label: Single JPEG snapshot
  kind: query
  command: "GET /bha-api/image.cgi"
  params: []

- id: open_door
  label: Energize door opener / alarm output relay
  kind: action
  command: "GET /bha-api/open-door.cgi?r=<relay_id>"
  params:
    - name: r
      type: string
      description: "Optional. Relay to trigger: physical relay number (e.g. 1, 2) or paired IP I/O DoorController relay in form <doorcontrollerID>@<relay>. Default = physical relay 1."

- id: light_on
  label: Energize light relay
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []

- id: history_image
  label: History image (cloud-stored)
  kind: query
  command: "GET /bha-api/history.cgi?index=<n>&event=<event>"
  params:
    - name: index
      type: integer
      description: "1..50, where 1 is the latest history image"
    - name: event
      type: string
      description: "doorbell | motionsensor (optional). Default = ring history for DoorBird, input trigger history for BirdGuard."

- id: monitor
  label: Subscribe to doorbell/motion event stream (multipart)
  kind: action
  command: "GET /bha-api/monitor.cgi?ring=doorbell[,motionsensor]"
  params:
    - name: ring
      type: string
      description: "Comma-separated event types: doorbell, motionsensor (rfid and keypad coming soon). Max 8 concurrent streams; HTTP 509 when busy."

- id: live_audio_receive
  label: Receive G.711 µ-law audio stream from device
  kind: action
  command: "GET /bha-api/audio-receive.cgi"
  params: []
  notes: "Codec G.711 µ-law, 8000 Hz sampling rate."

- id: live_audio_transmit
  label: Transmit G.711 µ-law audio to device
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params: []
  notes: "Content-Type: audio/basic; single transmit consumer at a time."

- id: info
  label: Get device info / firmware version / relay list
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []

- id: list_favorites
  label: List configured favorites (SIP and HTTP targets)
  kind: query
  command: "GET /bha-api/favorites.cgi"
  params: []

- id: add_or_change_favorite
  label: Add or update a favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=save&type=<type>&title=<title>&value=<value>&id=<id>"
  params:
    - name: action
      type: string
      description: "Fixed value 'save'"
    - name: type
      type: string
      description: "sip | http"
    - name: title
      type: string
      description: "Name or short description"
    - name: value
      type: string
      description: "URL (incl. protocol + user credentials if needed) or SIP target"
    - name: id
      type: integer
      description: "Optional. ID of favorite to change; omit to add new."

- id: delete_favorite
  label: Delete a favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=remove&type=<type>&id=<id>"
  params:
    - name: action
      type: string
      description: "Fixed value 'remove'"
    - name: type
      type: string
      description: "sip | http"
    - name: id
      type: integer
      description: "ID of the favorite to delete"

- id: list_schedules
  label: List configured schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []

- id: add_or_update_schedule
  label: Add or update a schedule entry (JSON body)
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params:
    - name: input
      type: string
      description: "doorbell | motion | rfid | fingerprint"
    - name: param
      type: string
      description: "Doorbell number, transponder id, fingerprint id (empty for motion)"
    - name: output
      type: string
      description: "JSON array of output actions (event=notify|sip|relay|http, param=favorite-id or relay-number, schedule=once|from-to|weekdays)"

- id: delete_schedule
  label: Delete a schedule entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input=<input>&param=<param>"
  params:
    - name: action
      type: string
      description: "Fixed value 'remove'"
    - name: input
      type: string
      description: "doorbell | motion | rfid"
    - name: param
      type: string
      description: "Doorbell number, RFID transponder id, etc."

- id: restart
  label: Restart the device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []

- id: rtsp_live_video
  label: RTSP live video (H.264)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params: []
  notes: "Path variants: /mpeg/720p/media.amp (firmware 129+), /mpeg/1080p/media.amp (D11x only). RTSP-over-HTTP available on TCP 8557. Requires standard RTSP authentication."

- id: sip_register
  label: Register with SIP proxy
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user=<user>&password=<password>&url=<url>"
  params:
    - name: user
      type: string
      description: "Authentication user for the SIP proxy"
    - name: password
      type: string
      description: "Authentication password for the SIP proxy"
    - name: url
      type: string
      description: "IP or hostname of the SIP proxy"

- id: sip_makecall
  label: Manually initiate a SIP call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url=<url>"
  params:
    - name: url
      type: string
      description: "SIP URL to call"

- id: sip_hangup
  label: Hang up current SIP call
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params: []

- id: sip_settings
  label: Configure SIP parameters
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&<parameter>=<value>"
  params:
    - name: enable
      type: integer
      description: "0..1. Enable/disable SIP registration after reboot (default 0)"
    - name: mic_volume
      type: integer
      description: "1..100. Microphone volume (default 33)"
    - name: spk_volume
      type: integer
      description: "1..100. Speaker volume (default 70)"
    - name: dtmf
      type: integer
      description: "0..1. Enable/disable DTMF support (default 0)"
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED. Use schedule.cgi. SIP URL to call on doorbell event."
    - name: relay1_passcode
      type: integer
      description: "0..99999999. DTMF pincode to trigger the door open relay"
    - name: incoming_call_enable
      type: integer
      description: "0..1. Enable/disable incoming calls (default 0)"
    - name: incoming_call_user
      type: string
      description: "Allowed SIP user, e.g. 'sip:10.0.0.1:5060' or 'sip:user@10.0.0.2:5060'"
    - name: anc
      type: integer
      description: "0..1. Enable/disable acoustic noise cancellation (default 1)"
    - name: ring_time_limit
      type: integer
      description: "10..300. Max ringing time in seconds (default 300)"
    - name: call_time_limit
      type: integer
      description: "30..300. Max call duration in seconds (default 300)"

- id: sip_status
  label: Query current SIP status
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  params: []
  notes: "Returns JSON with LASTERRORCODE and LASTERRORTEXT."

- id: sip_reset
  label: Reset SIP settings (keeps license)
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  params: []
```

## Feedbacks
```yaml
- id: info_json
  label: info.cgi JSON response
  type: object
  notes: "Fields: RETURNCODE, VERSION array with FIRMWARE / BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS array (firmware 000108+), DEVICE-TYPE."

- id: session_json
  label: get session JSON response
  type: object
  notes: "Fields: RETURNCODE, SESSIONID, NOTIFICATION_ENCRYPTION_KEY (used to decrypt UDP events)."

- id: monitor_event_doorbell
  label: Doorbell event from monitor.cgi stream
  type: enum
  values: [H, L]
  notes: "H = high/active (doorbell pressed), L = low/inactive. Delivered as multipart sections with Content-Type: text/plain, e.g. 'doorbell:H'."

- id: monitor_event_motionsensor
  label: Motion event from monitor.cgi stream
  type: enum
  values: [H, L]

- id: history_image_jpeg
  label: History image payload
  type: binary
  notes: "Content-Type: image/jpeg"

- id: live_image_jpeg
  label: Live image payload
  type: binary
  notes: "Content-Type: image/jpeg"

- id: live_video_mjpeg
  label: Live video payload
  type: binary
  notes: "Content-Type: multipart/x-mixed-replace; boundary=<boundary>. Each section is a JPEG image."

- id: live_audio_ulaw
  label: Live audio payload (receive)
  type: binary
  notes: "G.711 µ-law, 8000 Hz sampling rate."

- id: favorites_json
  label: favorites.cgi JSON response
  type: object
  notes: "Object with 'sip' and 'http' sub-objects, each keyed by favorite id with 'title' and 'value'."

- id: schedules_json
  label: schedule.cgi JSON response
  type: object
  notes: "Array of schedule entries with input, param, output[] (each event, param, schedule)."

- id: sip_status_json
  label: sip.cgi?action=status JSON response
  type: object
  notes: "LASTERRORCODE (e.g. '200' = registered), LASTERRORTEXT."

- id: sip_reset_json
  label: sip.cgi?action=reset JSON response
  type: object
```

## Variables
```yaml
# UNRESOLVED: the source documents all device-level state via JSON-returning
# query endpoints (info.cgi, favorites.cgi, schedule.cgi, sip.cgi?action=status).
# There are no separate settable scalar parameters outside the sip settings
# query-parameter surface, which is already covered as actions above.
```

## Events
```yaml
# Unsolicited UDP broadcast events from the device. v2 (current) encryption
# scheme documented below; v1 (ChaCha20-Poly1305 with Argon2i) is deprecated
# per the 2023-11 revision.
- id: udp_event_v2
  label: Encrypted UDP event broadcast (v2)
  transport: udp
  address:
    ports: [6524, 35344]
    note: "Identical broadcasts sent on both ports for every user / connected device. Keep-alive broadcasts are sent every 7 seconds on the same ports and must be ignored."
  framing:
    - field: IDENT
      length: 3 bytes
      value: "0xDE 0xAD 0xBE"
    - field: VERSION
      length: 1 byte
      value: "0x02 = ChaCha20-Poly1305 (current); 0x01 deprecated"
    - field: NONCE
      length: 8 bytes
    - field: CIPHERTEXT
      length: 34 bytes (raw) / 18 bytes (after stripping 16 random bytes)
  encryption:
    algorithm: ChaCha20-Poly1305
    key_source: NOTIFICATION_ENCRYPTION_KEY from get_session response (first 32 bytes used by ChaCha20)
    rotation: "Key valid until user password changes; then re-request via getsession.cgi."
  decoded_fields:
    - field: INTERCOM_ID
      length: 6 bytes
      description: "First 6 chars of DoorBird user name. Discard packet if it does not match your user."
    - field: EVENT
      length: 8 bytes
      description: "Doorbell number or 'motion', padded with spaces."
    - field: TIMESTAMP
      length: 4 bytes
      type: uint32 unix seconds
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences are documented in the source beyond
# the implicit subscribe-then-receive pattern (GET monitor.cgi → read multipart
# sections) and the UDP event decryption setup (get_session once → decrypt
# subsequent UDP broadcasts with NOTIFICATION_ENCRYPTION_KEY).
```

## Safety
```yaml
confirmation_required_for:
  - open_door         # controls a physical relay that unlocks a door
  - restart           # disrupts any active calls or streams
  - sip_reset         # disconnects ongoing SIP call and clears configuration
interlocks: []
# UNRESOLVED: the source does not document safety interlocks, power-on
# sequencing, or fault-recovery procedures. The 503 'busy' responses (line
# busy, firmware update in progress) are documented behaviour, not interlocks.
```

## Notes
- Compatibility table in the source covers D10x, D20x, D21x (fw 000108+), D11x (fw 000130+), and BirdGuard B10x. The D2108V belongs to the D21x family and inherits this minimum firmware requirement; specific D2108V firmware revisions beyond 000108 are not enumerated in the source.
- Device HTTP API caps concurrent connections to 1/second per session; repeated failed auth blocks the source IP for 1 minute (HTTP 423).
- The DoorBird App takes precedence over LAN-API users for video/audio streams — a LAN-API stream will be interrupted if the official app opens one.
- HTTPS uses a self-signed certificate; clients must either trust it or use `--no-check-certificate` style flags. Video and audio streaming are HTTP-only in the LAN and require a Session ID appended as `sessionid=...` so credentials are not transmitted in plaintext for those media streams.
- RTSP server uses port 554 by default; RTSP-over-HTTP on port 8557 is available; 1080p path is restricted to D11x.
- SIP service is "early stage" per the source; auto-hangup after 180 seconds, single simultaneous call, ≥3 seconds between SIP requests, AEC/ANC must be done client-side.
- UDP event monitoring v2 (Nov 2023) supersedes v1 (Argon2i). The example decryption in the source uses libsodium's `crypto_aead_chacha20poly1305_decrypt`.

<!-- UNRESOLVED: Cloud API access and remote relay scheduling behaviour for the D2108V specifically are outside the scope of the LAN-2-LAN API document. D2108V-specific hardware features (display, keypad, RFID reader, fingerprint reader) and any D2108V-specific commands are not enumerated in the source beyond the D21x family compatibility note. -->
```

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-05-12T20:44:51.798Z
last_checked_at: 2026-09-04T22:16:55.466Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-04T22:16:55.466Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions map verbatim to CGI endpoints in the source; all transport values (80/443/554/8557/5060, /bha-api/, RFC 2617 Basic/Digest) are sourced. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "D2108V-specific quirks not called out; the source covers the D21x family generally. Cloud API and remote relay scheduling behaviour for D2108V specifically are not stated."
- "the source documents all device-level state via JSON-returning"
- "no multi-step sequences are documented in the source beyond"
- "the source does not document safety interlocks, power-on"
- "Cloud API access and remote relay scheduling behaviour for the D2108V specifically are outside the scope of the LAN-2-LAN API document. D2108V-specific hardware features (display, keypad, RFID reader, fingerprint reader) and any D2108V-specific commands are not enumerated in the source beyond the D21x family compatibility note."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
