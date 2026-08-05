---
spec_id: admin/doorbird-d2100e-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2100E Series Control Spec"
manufacturer: Doorbird
model_family: "D2100E Series"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "D2100E Series"
    - "DoorBird Video Door Station D21x"
  firmware: "\"000108 and above\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-07-12T20:41:44.746Z
last_checked_at: 2026-07-21T22:24:49.139Z
generated_at: 2026-07-21T22:24:49.139Z
firmware_coverage: "\"000108 and above\""
protocol_coverage: []
known_gaps:
  - "serial/RS-232 not supported on this model"
  - "RFID and keypad events mentioned as \"coming soon\" - not implemented"
  - "no explicit macro definitions in source"
  - "no explicit power-on sequencing procedure stated in source"
  - "voltage/current/power specs not in source"
  - "D2100E model name not explicitly in compat table; mapped via D21x family"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:24:49.139Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions matched verbatim; transport (HTTP/HTTPS, port 80/443, digest auth) confirmed; 100% bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Doorbird D2100E Series Control Spec

## Summary
Doorbird D2100E Series (DoorBird Video Door Station D21x) IP video door station with HTTP REST API for local LAN integration. Supports TCP on ports 80 (HTTP) and 443 (HTTPS), RTSP video streaming on ports 554 and 8557, SIP voice interop on port 5060, plus UDP event broadcasts on ports 6524 and 35344. Authentication via Basic/Digest (RFC 2617) or plaintext HTTP params. API status: beta per vendor doc (rev 0.36, Nov 2023).

<!-- UNRESOLVED: serial/RS-232 not supported on this model -->

## Transport
```yaml
# Source states HTTP on TCP port 80, HTTPS on TCP port 443. RTSP on 554 + 8557,
# SIP on 5060, UDP events on 6524 + 35344 are documented and captured under
# Events / Notes; primary control transport is HTTP.
protocols:
  - http
addressing:
  base_url: http://<device-ip>/bha-api/
  port: 80  # HTTP; HTTPS also on 443 (self-signed cert, CA does not issue for IPs)
auth:
  type: digest  # Basic or Digest auth per RFC 2617; plaintext http-user/http-password params also supported
```

## Traits
```yaml
- powerable       # restart.cgi present
- routable        # door open, light, relay control present
- queryable       # info.cgi, sip.cgi?action=status, getsession.cgi, favorites.cgi, schedule.cgi present
- levelable       # sip.cgi mic_volume / spk_volume settings present
```

## Actions
```yaml
# All payloads verbatim from source. Paths under http://<device-ip>/bha-api/.

# --- Session ---
- id: create_session
  label: Create Session ID
  kind: action
  command: "GET http://<device-ip>/bha-api/getsession.cgi"
  params: []
  notes: Returns SESSIONID (valid 10 min) and NOTIFICATION_ENCRYPTION_KEY (valid until password change).

- id: invalidate_session
  label: Invalidate Session ID
  kind: action
  command: "GET http://<device-ip>/bha-api/getsession.cgi?invalidate={session_id}"
  params:
    - name: session_id
      type: string
      description: Previously issued session-id to destroy.

# --- Door / Light / Restart ---
- id: open_door
  label: Open Door
  kind: action
  command: "GET http://<device-ip>/bha-api/open-door.cgi?r={r}"
  params:
    - name: r
      type: string
      description: 'Door controller ID and relay, e.g. "1", "2", or "gggaaa@1". Omit for relay1.'

- id: light_on
  label: Light On
  kind: action
  command: "GET http://<device-ip>/bha-api/light-on.cgi"
  params: []

- id: restart
  label: Restart Device
  kind: action
  command: "GET http://<device-ip>/bha-api/restart.cgi"
  params: []
  notes: No diagnostic sound after this restart. 503 if device busy (e.g. firmware update).

# --- Video / Image / Audio (HTTP) ---
- id: live_video_stream
  label: Live Video Stream (MJPEG)
  kind: action
  command: "GET http://<device-ip>/bha-api/video.cgi"
  params: []
  notes: multipart/x-mixed-replace JPEG stream, up to 8 fps. 204 if no watch-always perm and no ring in 5 min.

- id: live_image
  label: Live Image (JPEG)
  kind: action
  command: "GET http://<device-ip>/bha-api/image.cgi"
  params: []
  notes: Single JPEG. 204 if no watch-always perm and no ring in 1 min.

- id: history_image
  label: History Image Request
  kind: action
  command: "GET http://<device-ip>/bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: "1..50, where 1 is the latest history image."
    - name: event
      type: string
      description: 'doorbell | motionsensor (optional). Default = ring history for DoorBird, input trigger history for BirdGuard.'
  notes: History images stored in cloud. 204 if user lacks history/motion permission.

- id: monitor_state
  label: Monitor State Stream
  kind: action
  command: "GET http://<device-ip>/bha-api/monitor.cgi?ring={ring}"
  params:
    - name: ring
      type: string
      description: 'Comma-separated event types: doorbell, motionsensor. RFID/keypad coming soon.'
  notes: Continuous multipart stream of doorbell/motionsensor H/L state. Max 8 concurrent streams; 509 if all busy.

- id: audio_receive
  label: Live Audio Receive
  kind: action
  command: "GET http://<device-ip>/bha-api/audio-receive.cgi"
  params: []
  notes: G.711 μ-law, 8000 Hz. 204 if no watch-always perm and no ring in 5 min.

- id: audio_transmit
  label: Live Audio Transmit
  kind: action
  command: "POST http://<device-ip>/bha-api/audio-transmit.cgi"
  params: []
  notes: 'POST G.711 μ-law (audio/basic), Content-Length 9999999, HTTP/1.0. Only one consumer may transmit at a time. AEC/ANC must be client-side.'

# --- RTSP Video ---
- id: rtsp_live_video
  label: RTSP Live Video (H.264)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params: []
  notes: Standard RTSP auth. Up to 12 fps.

- id: rtsp_live_video_720p
  label: RTSP Live Video 720p
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/720p/media.amp"
  params: []
  notes: D10x/D21x, firmware 000129+.

- id: rtsp_live_video_http
  label: RTSP-over-HTTP Live Video
  kind: action
  command: "rtsp://<device-ip>:8557/mpeg/media.amp"
  params: []

# --- Info / Query ---
- id: info_query
  label: Device Info Query
  kind: query
  command: "GET http://<device-ip>/bha-api/info.cgi"
  params: []
  notes: Returns FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS, DEVICE-TYPE. RELAYS array from firmware 000108+.

# --- Favorites (API-Operator perm; firmware 000110+) ---
- id: favorites_list
  label: List Favorites
  kind: query
  command: "GET http://<device-ip>/bha-api/favorites.cgi"
  params: []

- id: favorite_save
  label: Add or Change Favorite
  kind: action
  command: "GET http://<device-ip>/bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: type
      type: string
      description: 'sip | http. Cannot switch type on existing favorite.'
    - name: title
      type: string
      description: Name / short description.
    - name: value
      type: string
      description: URL/address including protocol and credentials if needed.
    - name: id
      type: integer
      description: Optional. ID of existing favorite to change; omit for new.

- id: favorite_remove
  label: Delete Favorite
  kind: action
  command: "GET http://<device-ip>/bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: type
      type: string
      description: 'sip | http.'
    - name: id
      type: integer
      description: ID of favorite to delete.
  notes: Active schedule entries referencing this favorite are also removed.

# --- Schedules (API-Operator perm; firmware 000110+) ---
- id: schedule_list
  label: List Schedules
  kind: query
  command: "GET http://<device-ip>/bha-api/schedule.cgi"
  params: []

- id: schedule_save
  label: Add or Update Schedule Entry
  kind: action
  command: "POST http://<device-ip>/bha-api/schedule.cgi"
  params:
    - name: body
      type: json
      description: 'JSON object with input (doorbell|motion|rfid|fingerprint), param, and output[] array (event notify|sip|relay|http with schedule once|from-to|weekdays).'
  notes: One request per input type. Weekday time slices are multiples of 1800 sec; max 604799.

- id: schedule_remove
  label: Delete Schedule Entry
  kind: action
  command: "GET http://<device-ip>/bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: input
      type: string
      description: 'doorbell | motion | rfid.'
    - name: param
      type: string
      description: Doorbell number / transponder id.

# --- SIP ---
- id: sip_registration
  label: SIP Register
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
      description: Auth user for SIP proxy.
    - name: password
      type: string
      description: Auth password for SIP proxy.
    - name: url
      type: string
      description: IP/hostname of SIP proxy (append :port if non-default 5060).

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: SIP URL to call (e.g. sip:108@192.168.123.22).
  notes: Wait min 3 sec between SIP requests. 503 if line busy.

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=hangup"
  params: []
  notes: Returns 200 even if no ongoing call.

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=settings&enable={enable}&mic_volume={mic_volume}&spk_volume={spk_volume}&dtmf={dtmf}&relay1_passcode={relay1_passcode}&incoming_call_enable={incoming_call_enable}&incoming_call_user={incoming_call_user}&anc={anc}&ring_time_limit={ring_time_limit}&call_time_limit={call_time_limit}"
  params:
    - name: enable
      type: integer
      description: '0..1, default 0. Enable SIP registration after reboot.'
    - name: mic_volume
      type: integer
      description: '1..100, default 33.'
    - name: spk_volume
      type: integer
      description: '1..100, default 70.'
    - name: dtmf
      type: integer
      description: '0..1, default 0. DTMF support.'
    - name: relay1_passcode
      type: integer
      description: '0..99999999. Pincode to trigger door open relay during SIP call.'
    - name: incoming_call_enable
      type: integer
      description: '0..1, default 0.'
    - name: incoming_call_user
      type: string
      description: Allowed SIP user authenticated for DoorBird (e.g. sip:10.0.0.1:5060).
    - name: anc
      type: integer
      description: '0..1, default 1. Acoustic noise cancellation.'
    - name: ring_time_limit
      type: integer
      description: '10..300 sec, default 300.'
    - name: call_time_limit
      type: integer
      description: '30..300 sec, default 300.'
  notes: 'autocall_doorbell_url is DEPRECATED - use schedule.cgi. Currently migrated internally.'

- id: sip_status_query
  label: SIP Status Query
  kind: query
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=status"
  params: []
  notes: JSON; LASTERRORCODE 200 = registered.

- id: sip_reset
  label: SIP Reset
  kind: action
  command: "GET http://<device-ip>/bha-api/sip.cgi?action=reset"
  params: []
  notes: Resets all SIP settings except license; hangs up any ongoing call.
```

## Feedbacks
```yaml
- id: open_door_response
  label: Door Open / Light / Generic BHA Response
  type: json
  fields:
    - RETURNCODE
    - SESSIONID

- id: sip_status
  label: SIP Status
  type: json
  fields:
    - LASTERRORCODE
    - LASTERRORTEXT

- id: monitor_state
  label: Monitor State
  type: enum
  values:
    - doorbell:H
    - doorbell:L
    - motionsensor:H
    - motionsensor:L

- id: http_status_code
  label: HTTP Status Code
  type: enum
  values:
    - 200    # OK
    - 204    # No permission / no data
    - 400    # Parameter missing or invalid
    - 401    # Authentication required
    - 423    # Locked (wrong auth, blocked 1 min)
    - 500    # Internal error
    - 503    # Busy
    - 507    # Size limit exceeded
    - 509    # All monitor streams busy
```

## Variables
```yaml
- id: device_info
  label: Device Info
  type: json
  fields:
    - FIRMWARE
    - BUILD_NUMBER
    - PRIMARY_MAC_ADDR
    - RELAYS
    - DEVICE-TYPE

- id: sip_settings
  label: SIP Settings
  type: json
  # Write-only via sip.cgi?action=settings; readable via sip.cgi?action=status

- id: session_info
  label: Session Info
  type: json
  fields:
    - RETURNCODE
    - SESSIONID
    - NOTIFICATION_ENCRYPTION_KEY

- id: favorites
  label: Favorites
  type: json
  # Readable via favorites.cgi; structure: { sip: {id: {title,value}}, http: {id: {title,value}} }

- id: schedules
  label: Schedules
  type: json
  # Readable via schedule.cgi; array of {input, param, output[]} entries
```

## Events
```yaml
# UDP broadcast events. v2 (Nov 2023+): ChaCha20-Poly1305. v1 (Argon2i) deprecated.
- id: doorbell_ring
  label: Doorbell Ring
  type: notification
  protocol: udp
  ports: [6524, 35344]
  fields:
    - INTERCOM_ID    # first 6 chars of username
    - EVENT          # doorbell number, space-padded to 8
    - TIMESTAMP      # Unix long
  encryption: ChaCha20-Poly1305
  packet_ident: "0xDE 0xAD 0xBE"
  packet_version: "0x02"

- id: motion_detected
  label: Motion Detected
  type: notification
  protocol: udp
  ports: [6524, 35344]
  fields:
    - INTERCOM_ID
    - EVENT          # "motion", space-padded to 8
    - TIMESTAMP
  encryption: ChaCha20-Poly1305
  packet_ident: "0xDE 0xAD 0xBE"
  packet_version: "0x02"

# UNRESOLVED: RFID and keypad events mentioned as "coming soon" - not implemented
```

## Macros
```yaml
# favorites.cgi + schedule.cgi together provide event-driven automation (input event
# -> output action under a time window) but the source documents no explicit named
# multi-step macro sequences.
# UNRESOLVED: no explicit macro definitions in source
```

## Safety
```yaml
confirmation_required_for:
  - restart              # restart.cgi
  - open_door            # door relay
  - sip_reset            # resets settings + hangs up call
interlocks:
  - Door open / light relay requires "watch always" permission OR a ring event in the past 5 minutes for the requesting user (else HTTP 204).
  - History image requires history permission (motion images additionally require motion permission).
  - Favorites + schedules require "API-Operator" permission (should NOT be granted to end-user App users).
  - SIP makecall / registration / settings / status / reset require "API-Operator" permission.
  - SIP call auto-terminates 180 seconds after initiation (auto-hangup).
  - Only one simultaneous SIP call supported.
  - Only one audio-transmit consumer at a time; second rejected.
  - Audio AEC/ANC must be implemented client-side (device requires both-side cancellation).
  - Official DoorBird App takes precedence over LAN API for video/audio/SIP - connections can be interrupted at any time.
  - Wrong-auth lockout: IP/user blocked for 1 minute after extensive bad credentials (HTTP 423).
  - Max 1 concurrent API connection per second.
  - Max 8 concurrent monitor.cgi streams.
# UNRESOLVED: no explicit power-on sequencing procedure stated in source
```

## Notes
- API revision 0.36 (Nov 13 2023); beta status, subject to change without notice.
- Rate limit: max 1 concurrent API connection/sec; wrong auth blocks IP/user for 1 min (HTTP 423).
- Video/audio streaming: official DoorBird App takes precedence over LAN API.
- HTTPS uses pre-installed self-signed certificate (CA does not issue for IP addresses).
- Session ID via getsession.cgi valid 10 min; NOTIFICATION_ENCRYPTION_KEY for UDP event decryption obtained once per password change (only first 32 bytes used by ChaCha20).
- RTSP on port 554; RTSP-over-HTTP on port 8557; 720p stream on D10x/D21x from firmware 000129.
- SIP on port 5060; wait min 3 sec between SIP requests.
- UDP event broadcasts on ports 6524 and 35344 (keep-alive every 7 sec — skippable for decryption).
- Event UDP v2 (Nov 2023): ChaCha20-Poly1305, IDENT 0xDE 0xAD 0xBE, VERSION 0x02. v1 (Argon2i) deprecated.
- Audio codec: G.711 μ-law, 8000 Hz, mandatory for HTTP audio API.
- Favorites/schedules require firmware 000110+ and API-Operator permission.
- D21x compatible devices: hardware 1.00+, firmware 000108+.
<!-- UNRESOLVED: voltage/current/power specs not in source -->
<!-- UNRESOLVED: D2100E model name not explicitly in compat table; mapped via D21x family -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-07-12T20:41:44.746Z
last_checked_at: 2026-07-21T22:24:49.139Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:24:49.139Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions matched verbatim; transport (HTTP/HTTPS, port 80/443, digest auth) confirmed; 100% bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial/RS-232 not supported on this model"
- "RFID and keypad events mentioned as \"coming soon\" - not implemented"
- "no explicit macro definitions in source"
- "no explicit power-on sequencing procedure stated in source"
- "voltage/current/power specs not in source"
- "D2100E model name not explicitly in compat table; mapped via D21x family"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
