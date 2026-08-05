---
spec_id: admin/doorbird-a1103t-white-edition
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird A1103T White Edition Control Spec"
manufacturer: DoorBird
model_family: "DoorBird A1103T White Edition"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "DoorBird A1103T White Edition"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-14T07:12:38.006Z
last_checked_at: 2026-07-21T21:59:58.181Z
generated_at: 2026-07-21T21:59:58.181Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device-specific hardware specs (voltage, relay ratings, current) not in source. Firmware version compatibility not stated (some features require firmware >= 000108 / 000110 / 000099 / version 129)."
  - "no explicit multi-step sequences documented as macros in source."
  - "relay electrical ratings (voltage/current) not stated in source."
  - "firmware version compatibility ranges (features tied to fw 000099/000108/000110/version 129) — not a single stated range for A1103T."
  - "device hardware specs, relay contact ratings, power supply — not in this API doc."
  - "exact A1103T-specific RTSP resolution variants — source lists D10x/D21x/D11x variants generically."
verification:
  verdict: verified
  checked_at: 2026-07-21T21:59:58.181Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched literally in source; complete coverage of documented API endpoints at consistent granularity. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# DoorBird A1103T White Edition Control Spec

## Summary
DoorBird A1103T White Edition is a video door station controllable over HTTP/HTTPS (ports 80/443), RTSP (ports 554/8557), and UDP event broadcasts (ports 6524/35344). This spec covers the LAN-2-LAN API: live video/image, door/light relays, audio, history, schedules, favorites, SIP, session management, and encrypted event monitoring. Auth is HTTP Basic/Digest (RFC 2617) or plaintext http-user/http-password params.

<!-- UNRESOLVED: device-specific hardware specs (voltage, relay ratings, current) not in source. Firmware version compatibility not stated (some features require firmware >= 000108 / 000110 / 000099 / version 129). -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  base_url: "http://<device-ip>/bha-api/"
  port: 80  # HTTP; HTTPS on 443 (self-signed cert)
auth:
  type: basic  # RFC 2617 Basic or Digest; also plaintext http-user/http-password params
  notes: "Credentials same as DoorBird App user. Wrong creds → HTTP 423 + 1 min block."
```

## Traits
```yaml
# - powerable       # restart.cgi present (restart, not power on/off)
- queryable       # info.cgi, sip status, favorites/schedule list return state
- levelable       # mic_volume, spk_volume in SIP settings
```

## Actions
```yaml
# --- Session management ---
- id: get_session
  label: Get Session ID
  kind: query
  command: "GET /bha-api/getsession.cgi"
  params: []
  notes: "Returns JSON SESSIONID (valid 10 min) + NOTIFICATION_ENCRYPTION_KEY."

- id: invalidate_session
  label: Invalidate Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate={old_session_id}"
  params:
    - name: old_session_id
      type: string
      description: Session ID to destroy

# --- Door / light relays ---
- id: open_door
  label: Open Door (trigger relay)
  kind: action
  command: "GET /bha-api/open-door.cgi?r={relay}"
  params:
    - name: relay
      type: string
      description: "Relay specifier - '1', '2', or '<doorcontrollerID>@<relay>'. Omit for physical relay 1."
  notes: "Requires watch-always or ring event in past 5 min, else HTTP 204."

- id: light_on
  label: Light On (energize light relay)
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []
  notes: "Same permission rule as open_door; HTTP 204 if not permitted."

# --- Live media ---
- id: live_video_http
  label: Live Video (MJPEG over HTTP)
  kind: action
  command: "GET /bha-api/video.cgi"
  params: []
  notes: "multipart/x-mixed-replace; up to 8 fps. HTTP 204 if no watch-always + no recent ring."

- id: live_image
  label: Live Image (JPEG)
  kind: query
  command: "GET /bha-api/image.cgi"
  params: []
  notes: "Returns single JPEG. HTTP 204 if not permitted (1 min ring window)."

- id: live_audio_receive
  label: Live Audio Receive (G.711 μ-law)
  kind: action
  command: "GET /bha-api/audio-receive.cgi"
  params: []
  notes: "For HTTPS streaming use ?sessionid=<id>."

- id: live_audio_transmit
  label: Live Audio Transmit (G.711 μ-law)
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params: []
  notes: "Content-Type: audio/basic. Single consumer; second rejected. Client MUST do AEC/ANR."

- id: rtsp_live_video
  label: RTSP Live Video (H.264)
  kind: action
  command: "rtsp://{device-ip}:554/mpeg/media.amp"
  params:
    - name: device-ip
      type: string
      description: Device IP address
  notes: "RTSP port 554; RTSP-over-HTTP port 8557. Variants: /mpeg/720p/media.amp (D10x/D21x fw129+), /mpeg/1080p/media.amp (D11x only)."

# --- History / monitor ---
- id: history_image
  label: History Image Request
  kind: query
  command: "GET /bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: "1..50, where 1 is latest"
    - name: event
      type: string
      description: "Optional: doorbell | motionsensor"
  notes: "Requires history (and motion) permission. HTTP 204 if denied."

- id: monitor
  label: Monitor (doorbell/motion state stream)
  kind: query
  command: "GET /bha-api/monitor.cgi?ring={event}"
  params:
    - name: event
      type: string
      description: "doorbell | motionsensor (comma-separated for multiple)"
  notes: "Multipart stream; max 8 concurrent. HTTP 509 if all busy."

# --- Device info / restart ---
- id: info_request
  label: Device Info Request
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []
  notes: "JSON: FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS[], DEVICE-TYPE (fw 000108+)."

- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []
  notes: "No diagnostic sound after. HTTP 503 if busy (e.g. firmware update)."

# --- Favorites ---
- id: list_favorites
  label: List Favorites
  kind: query
  command: "GET /bha-api/favorites.cgi"
  params: []
  notes: "Requires API-Operator permission. Firmware 000110+."

- id: save_favorite
  label: Add or Change Favorite
  kind: action
  command: "POST /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: type
      type: string
      description: "sip | http"
    - name: title
      type: string
      description: Name/title
    - name: value
      type: string
      description: "URL or SIP target"
    - name: id
      type: integer
      description: "Optional: ID to change; omit for new"

- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "POST /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: type
      type: string
      description: "sip | http"
    - name: id
      type: integer
      description: Favorite ID

# --- Schedules ---
- id: list_schedules
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []
  notes: "Requires API-Operator. Firmware 000110+."

- id: save_schedule
  label: Add or Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params: []
  notes: "Body = JSON object {input, param, output[]}. One request per input type."

- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: input
      type: string
      description: "doorbell | motion | rfid"
    - name: param
      type: string
      description: "doorbell-number | transponder-id"

# --- SIP ---
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
  command: "GET /bha-api/sip.cgi?action=settings&{param}={value}"
  params:
    - name: param
      type: string
      description: "enable | mic_volume | spk_volume | dtmf | autocall_doorbell_url (DEPRECATED) | relay1_passcode | incoming_call_enable | incoming_call_user | anc | ring_time_limit | call_time_limit"

- id: sip_status
  label: SIP Status Query
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  params: []
  notes: "JSON LASTERRORCODE/LASTERRORTEXT."

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  params: []
  notes: "Resets SIP settings (not license); hangs up ongoing call."
```

## Feedbacks
```yaml
- id: doorbell_state
  type: enum
  values: [H, L]  # H=high (ringing), L=low (idle)
  source: monitor.cgi multipart stream

- id: motionsensor_state
  type: enum
  values: [H, L]
  source: monitor.cgi multipart stream

- id: sip_status_code
  type: string
  source: sip.cgi?action=status JSON LASTERRORCODE/LASTERRORTEXT

- id: device_info
  type: object
  source: info.cgi JSON (FIRMWARE, BUILD_NUMBER, RELAYS, DEVICE-TYPE)
```

## Variables
```yaml
- id: sip_mic_volume
  type: integer
  range: [1, 100]
  default: 33
  set_via: sip.cgi?action=settings&mic_volume={value}

- id: sip_spk_volume
  type: integer
  range: [1, 100]
  default: 70
  set_via: sip.cgi?action=settings&spk_volume={value}

- id: sip_dtmf
  type: integer
  range: [0, 1]
  default: 0
  set_via: sip.cgi?action=settings&dtmf={value}

- id: sip_enable
  type: integer
  range: [0, 1]
  default: 0
  set_via: sip.cgi?action=settings&enable={value}

- id: sip_relay1_passcode
  type: integer
  range: [0, 99999999]
  set_via: sip.cgi?action=settings&relay1_passcode={value}

- id: sip_incoming_call_enable
  type: integer
  range: [0, 1]
  default: 0
  set_via: sip.cgi?action=settings&incoming_call_enable={value}

- id: sip_anc
  type: integer
  range: [0, 1]
  default: 1
  set_via: sip.cgi?action=settings&anc={value}

- id: sip_ring_time_limit
  type: integer
  range: [10, 300]
  default: 300
  set_via: sip.cgi?action=settings&ring_time_limit={value}

- id: sip_call_time_limit
  type: integer
  range: [30, 300]
  default: 300
  set_via: sip.cgi?action=settings&call_time_limit={value}
```

## Events
```yaml
# Unsolicited UDP broadcasts on ports 6524 and 35344 (v2: ChaCha20-Poly1305 encrypted).
# Packet layout:
#   IDENT[3]      = 0xDE 0xAD 0xBE
#   VERSION[1]    = 0x02
#   NONCE[8]
#   CIPHERTEXT[34] (16 random + 6 INTERCOM_ID + 8 EVENT + 4 TIMESTAMP)
# Key = NOTIFICATION_ENCRYPTION_KEY from getsession.cgi (first 32 bytes).
# Keep-alive broadcasts every 7 sec - ignore for event decoding.
- id: doorbell_event
  type: udp_broadcast
  port: [6524, 35344]
  encrypted: true
  algorithm: ChaCha20-Poly1305
  payload:
    intercom_id: string  # first 6 chars of username
    event: string        # doorbell number, space-padded
    timestamp: uint32    # unix

- id: motion_event
  type: udp_broadcast
  port: [6524, 35344]
  encrypted: true
  algorithm: ChaCha20-Poly1305
  payload:
    intercom_id: string
    event: string  # "motion"
    timestamp: uint32
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented as macros in source.
```

## Safety
```yaml
confirmation_required_for:
  - open_door     # physical door release
  - restart       # device outage
interlocks:
  - "open_door/light_on require watch-always permission or ring event in past 5 min, else HTTP 204 (no-op)."
  - "SIP call auto-hangs-up 180 sec after initiation."
  - "Only one simultaneous audio/video call; HTTP 503 if busy."
  - "Wrong auth → HTTP 423 + 1 min IP/user block."
# UNRESOLVED: relay electrical ratings (voltage/current) not stated in source.
```

## Notes
- Max 1 concurrent API connection per second; HTTP 509 when monitor streams exhausted (8 max).
- Video/audio streams preempted by official DoorBird App — it has precedence.
- AEC/ANR MUST be done client-side for audio-transmit; DoorBird native algorithms not exposed.
- Audio codec fixed: G.711 μ-law, 8000 Hz.
- HTTPS uses self-signed cert (CAs don't issue for IPs). Client must accept it.
- Video/audio streaming over HTTPS not supported in LAN — use sessionid param instead.
- Event monitoring v1 (Argon2i + ChaCha20-Poly1305) deprecated since Nov 2023; v2 (ChaCha20-Poly1305 only) is current.
- SIP P2P supported from device version 000099; SIP listens on port 5060 when enabled.
- Schedule time unit: seconds since Sunday 00:00 UTC; max 604799; all starts must be multiples of 1800.

<!-- UNRESOLVED: firmware version compatibility ranges (features tied to fw 000099/000108/000110/version 129) — not a single stated range for A1103T. -->
<!-- UNRESOLVED: device hardware specs, relay contact ratings, power supply — not in this API doc. -->
<!-- UNRESOLVED: exact A1103T-specific RTSP resolution variants — source lists D10x/D21x/D11x variants generically. -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-07-14T07:12:38.006Z
last_checked_at: 2026-07-21T21:59:58.181Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:59:58.181Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched literally in source; complete coverage of documented API endpoints at consistent granularity. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device-specific hardware specs (voltage, relay ratings, current) not in source. Firmware version compatibility not stated (some features require firmware >= 000108 / 000110 / 000099 / version 129)."
- "no explicit multi-step sequences documented as macros in source."
- "relay electrical ratings (voltage/current) not stated in source."
- "firmware version compatibility ranges (features tied to fw 000099/000108/000110/version 129) — not a single stated range for A1103T."
- "device hardware specs, relay contact ratings, power supply — not in this API doc."
- "exact A1103T-specific RTSP resolution variants — source lists D10x/D21x/D11x variants generically."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
