---
spec_id: admin/doorbird-d31tdv
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird D31TDV Control Spec"
manufacturer: DoorBird
model_family: "DoorBird D31TDV"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "DoorBird D31TDV"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
  - https://www.doorbird.com/sip
retrieved_at: 2026-07-14T07:13:01.378Z
last_checked_at: 2026-07-21T22:31:24.349Z
generated_at: 2026-07-21T22:31:24.349Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated; D31TDV-specific RTSP resolution support not confirmed (720p documented for D10x/D21x, 1080p for D11x only); device hardware specs (camera resolution, sensor) not in this control-protocol source"
  - "default device credentials / admin user not stated in source (provisioned via DoorBird App / QR code)"
  - "default not stated"
  - "no explicit multi-step sequences documented in source"
  - "no explicit electrical interlock sequencing or power-on procedures in source"
  - "firmware version compatibility not stated (features gated on 000099/000108/000110/129 but no stated range for D31TDV); device hardware specs (camera sensor, relay current/voltage ratings) not in this control-protocol source; default SIP relay1_passcode + incoming_call_user not stated"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:31:24.349Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched verbatim in source; complete coverage of HTTP, RTSP, and SIP command families. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# DoorBird D31TDV Control Spec

## Summary
DoorBird D31TDV video door station. LAN-2-LAN API over HTTP (TCP 80 / HTTPS 443) drive door relay, light relay, live MJPEG/JPEG video, snapshots, history images, audio receive/transmit, favorites, schedules, device restart. Also RTSP live video (554 / 8557), SIP calls (5060), encrypted UDP event broadcasts (6524, 35344) for doorbell + motion. Auth required per request (Basic or Digest, RFC 2617).

<!-- UNRESOLVED: firmware version compatibility not stated; D31TDV-specific RTSP resolution support not confirmed (720p documented for D10x/D21x, 1080p for D11x only); device hardware specs (camera resolution, sensor) not in this control-protocol source -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  base_url: "http://<device-ip>/bha-api/"
  port: 80
  # Additional ports (stated in source):
  #   HTTPS control: 443 (self-signed cert, encrypted)
  #   RTSP: 554 (rtsp); RTSP-over-HTTP: 8557
  #   SIP: 5060
  #   UDP event broadcast: 6524 and 35344
auth:
  type: basic  # source states Basic or Digest authentication (RFC 2617) required per request; plaintext http-user/http-password params also supported
# UNRESOLVED: default device credentials / admin user not stated in source (provisioned via DoorBird App / QR code)
```

## Traits
```yaml
traits:
  - queryable  # inferred: info.cgi, sip status, monitor.cgi, getsession.cgi return state
  - levelable  # inferred: SIP mic_volume / spk_volume settable 1..100
```

## Actions
```yaml
actions:
  # --- HTTP control & media ---
  - id: create_session
    label: Create Session ID
    kind: query
    command: "GET /bha-api/getsession.cgi"
    params: []
    notes: "Returns JSON with SESSIONID (valid 10 min) + NOTIFICATION_ENCRYPTION_KEY."

  - id: invalidate_session
    label: Invalidate Session ID
    kind: action
    command: "GET /bha-api/getsession.cgi?invalidate={session_id}"
    params:
      - name: session_id
        type: string
        description: Session ID to destroy.

  - id: live_video_mjpeg
    label: Live Video (MJPEG)
    kind: action
    command: "GET /bha-api/video.cgi"
    params: []
    notes: "multipart/x-mixed-replace JPEG stream, up to 8 fps. Perm: valid user + watch-always or ring in past 5 min, else 204."

  - id: live_image_jpeg
    label: Live Image (JPEG Snapshot)
    kind: action
    command: "GET /bha-api/image.cgi"
    params: []
    notes: "Single JPEG image/jpeg. Perm: valid user + watch-always or ring in past 1 min, else 204."

  - id: open_door
    label: Open Door (Energize Relay)
    kind: action
    command: "GET /bha-api/open-door.cgi?r={relay}"
    params:
      - name: relay
        type: string
        description: "Relay target. '1' or '2' for physical relay, or <doorcontrollerID>@<relay> for paired IP I/O DoorController. Omit to trigger physical relay 1."
    notes: "Returns JSON. Perm: watch-always or ring in past 5 min, else 204."

  - id: light_on
    label: Light On (Energize Light Relay)
    kind: action
    command: "GET /bha-api/light-on.cgi"
    params: []
    notes: "Returns JSON. Perm: watch-always or ring in past 5 min, else 204."

  - id: history_image
    label: History Image Request
    kind: query
    command: "GET /bha-api/history.cgi?index={index}&event={event}"
    params:
      - name: index
        type: integer
        description: "1..50, where 1 is newest history image."
      - name: event
        type: string
        description: "Optional: doorbell | motionsensor. Default = ring history (DoorBird) / input trigger history (BirdGuard)."
    notes: "Cloud-stored JPEG. Perm: valid user + history (motion images need motion perm), else 204."

  - id: monitor_state
    label: Monitor State Stream
    kind: query
    command: "GET /bha-api/monitor.cgi?ring={ring}"
    params:
      - name: ring
        type: string
        description: "Comma list: doorbell | motionsensor. rfid + keypad coming soon."
    notes: "Continuous multipart stream of doorbell/motion H/L state. Max 8 concurrent streams; HTTP 509 if busy."

  - id: audio_receive
    label: Live Audio Receive
    kind: action
    command: "GET /bha-api/audio-receive.cgi"
    params: []
    notes: "G.711 µ-law, 8000 Hz. Perm: watch-always or ring in past 5 min, else 204."

  - id: audio_transmit
    label: Live Audio Transmit
    kind: action
    command: "POST /bha-api/audio-transmit.cgi"
    params: []
    notes: "G.711 µ-law, 8000 Hz, Content-Type audio/basic. Only one consumer may transmit at a time. Client must do own AEC/ANR."

  - id: info
    label: Device Info Request
    kind: query
    command: "GET /bha-api/info.cgi"
    params: []
    notes: "JSON: FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS, DEVICE-TYPE. Relays config in output from firmware 000108+."

  - id: list_favorites
    label: List Favorites
    kind: query
    command: "GET /bha-api/favorites.cgi"
    params: []
    notes: "JSON of sip + http favorites. Perm: API-Operator. Firmware 000110+."

  - id: save_favorite
    label: Add or Change Favorite
    kind: action
    command: "GET /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
    params:
      - name: type
        type: string
        description: "sip | http. Cannot switch type on existing favorite."
      - name: title
        type: string
        description: Name / description of favorite.
      - name: value
        type: string
        description: "URL/address incl. protocol + credentials (HTTP(S) URL or SIP target)."
      - name: id
        type: integer
        description: "Optional: existing favorite ID to change. Omit for new."
    notes: "New favorite ID returned in 'favoriteid' response header. Perm: API-Operator."

  - id: delete_favorite
    label: Delete Favorite
    kind: action
    command: "GET /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
    params:
      - name: type
        type: string
        description: "sip | http."
      - name: id
        type: integer
        description: ID of favorite to delete.
    notes: "Removing a favorite used by a schedule also removes the schedule entry."

  - id: list_schedules
    label: List Schedules
    kind: query
    command: "GET /bha-api/schedule.cgi"
    params: []
    notes: "JSON array of input/param/output schedule entries. Perm: API-Operator. Firmware 000110+."

  - id: save_schedule
    label: Add or Update Schedule Entry
    kind: action
    command: "POST /bha-api/schedule.cgi"
    params: []
    notes: "JSON body: {input, param, output:[{event,param,schedule}]}. input=doorbell|motion|rfid|fingerprint. event=notify|sip|relay|http. schedule=once|from-to|weekdays. Perm: API-Operator."

  - id: delete_schedule
    label: Delete Schedule Entry
    kind: action
    command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
    params:
      - name: input
        type: string
        description: "doorbell | motion | rfid."
      - name: param
        type: string
        description: "doorbell-number | transponder-id identifying the entry."
    notes: "Perm: API-Operator."

  - id: restart
    label: Restart Device
    kind: action
    command: "GET /bha-api/restart.cgi"
    params: []
    notes: "Reboots device; no post-restart diagnostic sound. 503 if busy (e.g. firmware update)."

  # --- RTSP video ---
  - id: live_video_rtsp
    label: Live Video (RTSP)
    kind: action
    command: "rtsp://<device-ip>:554/mpeg/media.amp"
    params: []
    notes: "MPEG4 H.264 stream, up to 12 fps. RTSP auth (no param auth). RTSP-over-HTTP variant: rtsp://<device-ip>:8557/mpeg/media.amp."

  - id: live_video_rtsp_720p
    label: Live Video (RTSP 720p)
    kind: action
    command: "rtsp://<device-ip>:554/mpeg/720p/media.amp"
    params: []
    notes: "720p stream. Source: supported by DoorBird D10x/D21x from firmware 129. D31TDV support UNRESOLVED."

  - id: live_video_rtsp_1080p
    label: Live Video (RTSP 1080p)
    kind: action
    command: "rtsp://<device-ip>:554/mpeg/1080p/media.amp"
    params: []
    notes: "1080p stream. Source: supported by DoorBird D11x only. D31TDV support UNRESOLVED."

  # --- SIP ---
  - id: sip_registration
    label: SIP Register to Proxy
    kind: action
    command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
    params:
      - name: user
        type: string
        description: Auth user for SIP proxy.
      - name: password
        type: string
        description: Auth password for SIP proxy.
      - name: url
        type: string
        description: IP/hostname of SIP proxy.
    notes: "Not needed for P2P calls. Perm: API-Operator."

  - id: sip_makecall
    label: SIP Make Call
    kind: action
    command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
    params:
      - name: url
        type: string
        description: SIP URL to call (e.g. sip:108@192.168.123.22).
    notes: "P2P or via PBX. Auto-hangup 180s. Min 3s between SIP requests. Perm: API-Operator."

  - id: sip_hangup
    label: SIP Hangup
    kind: action
    command: "GET /bha-api/sip.cgi?action=hangup"
    params: []
    notes: "200 even if no active call. Perm: API-Operator."

  - id: sip_settings
    label: SIP Settings
    kind: action
    command: "GET /bha-api/sip.cgi?action=settings&{param}={value}"
    params:
      - name: param
        type: string
        description: "enable|mic_volume|spk_volume|dtmf|autocall_doorbell_url|relay1_passcode|incoming_call_enable|incoming_call_user|anc|ring_time_limit|call_time_limit"
      - name: value
        type: string
        description: "See Variables for ranges/defaults. autocall_doorbell_url DEPRECATED - use schedule.cgi."
    notes: "Perm: API-Operator. See Variables section for settable params + defaults."

  - id: sip_status
    label: SIP Status Query
    kind: query
    command: "GET /bha-api/sip.cgi?action=status"
    params: []
    notes: "JSON: LASTERRORCODE (200 = registered), LASTERRORTEXT. Perm: API-Operator."

  - id: sip_reset
    label: SIP Settings Reset
    kind: action
    command: "GET /bha-api/sip.cgi?action=reset"
    params: []
    notes: "Resets all SIP settings except license; hangs up ongoing call. Perm: API-Operator."
```

## Feedbacks
```yaml
feedbacks:
  - id: doorbell_state
    type: enum
    values: [H, L]  # H = high/active, L = low/inactive, from monitor.cgi multipart stream
  - id: motion_state
    type: enum
    values: [H, L]
  - id: device_info
    type: object
    description: "JSON from info.cgi: FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS[], DEVICE-TYPE."
  - id: sip_status
    type: object
    description: "JSON from sip.cgi?action=status: LASTERRORCODE, LASTERRORTEXT."
```

## Variables
```yaml
variables:
  - id: sip_enable
    type: integer
    range: "0..1"
    default: 0
    description: Enable/disable SIP registration after reboot.
  - id: sip_mic_volume
    type: integer
    range: "1..100"
    default: 33
    description: SIP microphone volume.
  - id: sip_spk_volume
    type: integer
    range: "1..100"
    default: 70
    description: SIP speaker volume.
  - id: sip_dtmf
    type: integer
    range: "0..1"
    default: 0
    description: Enable/disable DTMF (allows relay trigger via pincode during call).
  - id: sip_relay1_passcode
    type: integer
    range: "0..99999999"
    default: null  # UNRESOLVED: default not stated
    description: Pincode for triggering door-open relay via DTMF.
  - id: sip_incoming_call_enable
    type: integer
    range: "0..1"
    default: 0
    description: Enable/disable incoming SIP calls.
  - id: sip_incoming_call_user
    type: string
    default: null  # UNRESOLVED: default not stated
    description: Allowed authenticated SIP user (e.g. sip:10.0.0.1:5060).
  - id: sip_anc
    type: integer
    range: "0..1"
    default: 1
    description: Acoustic noise cancellation on/off.
  - id: sip_ring_time_limit
    type: integer
    range: "10..300"
    default: 300
    description: Max ringing time (seconds).
  - id: sip_call_time_limit
    type: integer
    range: "30..300"
    default: 300
    description: Max call duration (seconds).
```

## Events
```yaml
events:
  - id: doorbell_ring
    description: "Doorbell press event. Delivered as encrypted UDP broadcast on ports 6524 + 35344 (ChaCha20-Poly1305, v0x02). EVENT field = doorbell number, space-padded. Key from getsession.cgi NOTIFICATION_ENCRYPTION_KEY."
  - id: motion_detected
    description: "Motion sensor event. Same encrypted UDP broadcast format; EVENT field = 'motion'."
  - id: keepalive
    description: "UDP keep-alive broadcast every 7s on ports 6524 + 35344. Not an event; can be skipped."
notes_events: |
  UDP packet layout (v0x02): IDENT(3B: 0xDE 0xAD 0xBE) + VERSION(1B: 0x02) + NONCE(8B) + CIPHERTEXT(34B).
  After ChaCha20-Poly1305 decrypt: INTERCOM_ID(6 str) + EVENT(8 str, space-padded) + TIMESTAMP(4 long unix).
  v0x01 (ChaCha20-Poly1305 + Argon2i) deprecated; will be removed. Skip packets where INTERCOM_ID != first 6 chars of your username.
```

## Macros
```yaml
macros: []
# UNRESOLVED: no explicit multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for:
  - open_door  # releases physical door - safety-critical
  - restart    # reboots device, interrupts live streams/calls
interlocks:
  - description: "Audio/video/SIP connections are preempted by official DoorBird App requests (App has precedence). Live stream may be interrupted at any time."
  - description: "Max 1 concurrent API connection per second; wrong-credential flood blocks IP/user for 1 min (HTTP 423)."
  - description: "SIP calls auto-hangup 180s after initiation (security). Only 1 simultaneous SIP call + 1 simultaneous live A/V call (HTTP 503 busy)."
# UNRESOLVED: no explicit electrical interlock sequencing or power-on procedures in source
```

## Notes
Door release (`open-door.cgi`) + light (`light-on.cgi`) tied to "watch-always" permission window — return 204 if user lacks perm and no recent ring. Video/audio use session ID (from `getsession.cgi`, 10-min validity) appended as `?sessionid=` to avoid plaintext creds over HTTP for streams (HTTPS not supported for video/audio streaming in LAN).

Audio codec fixed G.711 µ-law 8000 Hz both directions. Client MUST provide own AEC/ANR — DoorBird AEC/ANR in native apps not exposed to third parties.

Rate limit: 1 concurrent API connection/sec. 503 = A/V line busy. 423 = auth lockout (1 min). 509 = monitor stream limit (8) reached.

<!-- UNRESOLVED: firmware version compatibility not stated (features gated on 000099/000108/000110/129 but no stated range for D31TDV); device hardware specs (camera sensor, relay current/voltage ratings) not in this control-protocol source; default SIP relay1_passcode + incoming_call_user not stated -->
```

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
  - https://www.doorbird.com/sip
retrieved_at: 2026-07-14T07:13:01.378Z
last_checked_at: 2026-07-21T22:31:24.349Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:31:24.349Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched verbatim in source; complete coverage of HTTP, RTSP, and SIP command families. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated; D31TDV-specific RTSP resolution support not confirmed (720p documented for D10x/D21x, 1080p for D11x only); device hardware specs (camera resolution, sensor) not in this control-protocol source"
- "default device credentials / admin user not stated in source (provisioned via DoorBird App / QR code)"
- "default not stated"
- "no explicit multi-step sequences documented in source"
- "no explicit electrical interlock sequencing or power-on procedures in source"
- "firmware version compatibility not stated (features gated on 000099/000108/000110/129 but no stated range for D31TDV); device hardware specs (camera sensor, relay current/voltage ratings) not in this control-protocol source; default SIP relay1_passcode + incoming_call_user not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
