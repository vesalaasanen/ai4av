---
spec_id: admin/panasonic-wx-sr200-series-wireless-microphone
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic WX-SR200 Series Wireless Microphone I/F Specification"
manufacturer: Panasonic
model_family: WX-SR204
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
    - "Panasonic Connect Co., Ltd."
  models:
    - WX-SR204
    - WX-SR202
    - WX-SR204DN
    - WX-SR202DN
    - WZ-SZ600
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - na.panasonic.com
  - applicationmarket.crestron.com
  - connect.na.panasonic.com
source_urls:
  - "https://na.panasonic.com/ns/303988_API_Panasonic_WX-SR200_Series_IF_Specification_VA.05-20221110.pdf?hsLang=en"
  - "https://applicationmarket.crestron.com/content/Help/Panasonic/Panasonic%20WX-SR202P%20v2.0%20Help.pdf"
  - https://connect.na.panasonic.com/av/audio/2-channel-wireless-mic-receiver
retrieved_at: 2026-04-29T10:28:13.871Z
last_checked_at: 2026-06-02T22:13:00.308Z
generated_at: 2026-06-02T22:13:00.308Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "WX-SR202P specifically is not named in the source. The WX-SR200 series"
  - "no safety warnings, interlocks, or power-on sequencing"
  - "- WX-SR202P specifically is not named in this document; the WX-SR200"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:13:00.308Z
  matched_actions: 14
  action_count: 14
  confidence: medium
  summary: "All 14 spec actions traced to source (dip-safe re-verify). (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Panasonic WX-SR200 Series Wireless Microphone I/F Specification

## Summary
The WX-SR200 series is a 1.9 GHz digital wireless microphone system. Receivers
(WX-SR204 / WX-SR202 / WX-SR204DN / WX-SR202DN) and the WZ-SZ600 charger are
controlled over 100Base-TX Ethernet using a custom binary TCP/UDP protocol.
TCP port 50003 carries control commands; UDP port 50004 carries unsolicited
radio-wave and audio-level data. Authentication uses MD5 (or SHA-256 on
SR204/SR202DN/SR204DN and the charger) of the device password concatenated
with a per-session nonce.

<!-- UNRESOLVED: WX-SR202P specifically is not named in the source. The WX-SR200 series
     family is covered; the "P" suffix is not documented here. -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 50003  # TCP control command waiting port (receiver and charger)
  udp_port: 50004  # UDP destination for level data distribution (receiver -> control terminal)
serial: null  # N/A: LAN protocol, not serial
auth:
  type: digest  # MD5 (or SHA-256 on SR204/SR202DN/SR204DN/charger) of "password:nonce"
  hash_algorithms:
    - md5
    - sha-256  # SR204, SR202DN, SR204DN, and WZ-SZ600 only
  nonce_source: 8-byte ASCII lowercase alphabetic, delivered in connection response
  max_password_length: 32  # bytes (ASCII)
```

All frames use big-endian byte order. The header is fixed at 20 bytes:
`Common identifier (4) | Header size (2, 0x0014) | Transaction number (2)
| Command identifier (2) | Reserve (6) | Command data length (4)`.
The common identifier is `0x53523200` ("SR2\0") for receivers and
`0x535A3600` ("SZ6\0") for the charger. The transaction number wraps
1-65535 for requests/updates; the responder echoes the same value. UDP
delivery commands use a fixed transaction number of 0.

## Traits
```yaml
# - queryable: current-data, volume, operation-mode, mic-charge-status,
#   charger-data requests all return state
# - levelable: per-mic absolute / relative volume change + mute bit
```

## Actions
```yaml
# Each action is keyed by the 2-byte command identifier. The data section
# format per command is documented in the source. The header section
# (20 bytes) is prepended automatically per the frame layout.

# === Receiver (WX-SR200 series) ===

- id: connection_request
  label: Connection Request
  kind: action
  command: "0xE001"
  params:
    - name: current_time
      type: string
      description: ASCII 14-byte timestamp "YYYYMMDDhhmmss" of the control terminal

- id: authentication_request
  label: Authentication Request
  kind: action
  command: "0xF001"
  params:
    - name: auth_data
      type: string
      description: MD5 or SHA-256 hash of "password:nonce" (lowercase hex, 32 or 64 bytes)

- id: current_data_acquisition_request
  label: Current Data Acquisition Request
  kind: query
  command: "0x0021"
  params: []

- id: level_data_distribution_request
  label: Level Data Distribution Request (start/stop)
  kind: action
  command: "0x0031"
  params:
    - name: identifier
      type: enum
      values: [start, stop]
      description: 0x0000 = start, 0x0001 = stop
    - name: distribution_type
      type: enum
      values: [level_only, level_and_mic_status]
      description: 0x0000 = level only (5.7.2), 0x0001 = level + mic status (5.7.3, SR204/SR202DN/SR204DN v6.00R00+)

- id: operation_mode_change
  label: Operation Mode Change
  kind: action
  command: "0x0140"
  params:
    - name: mode
      type: enum
      values: [local, remote]
      description: 0x0000 = local (front-panel volume), 0x0001 = remote (terminal-controlled)

- id: operation_mode_request
  label: Operation Mode Request
  kind: query
  command: "0x0141"
  params: []

- id: volume_change
  label: Volume Change
  kind: action
  command: "0x0150"
  params:
    - name: setting_method
      type: enum
      values: [absolute, relative]
      description: 0x0000 = absolute, 0x0001 = relative
    - name: mic_select_bitmap
      type: integer
      description: 16-bit bitmap, bit 0 = Mic1 ... bit 15 = Mic16. 1 = apply this command
    - name: volume_per_mic
      type: bytes
      description: 16 bytes, one per mic. Bit 6:0 = 0x00-0x3F volume (abs) or +/- delta (rel). Bit 7 = mute (abs) or direction (rel: 0=up, 1=down)
  notes: |
    Requires operation mode = remote (0x0140 with 0x0001). If relative deltas
    exceed 0x00-0x3F, clamp to min/max.

- id: volume_request
  label: Volume Request
  kind: query
  command: "0x0151"
  params: []

- id: mic_pairing_request
  label: Mic Pairing Request
  kind: action
  command: "0x0071"
  params:
    - name: pairing_mode
      type: enum
      values: [start, stop]
      description: 0x0000 = start pairing, 0x0001 = stop pairing
    - name: pairing_channel
      type: integer
      description: Channel 1-16, encoded 0x0000-0x000F

- id: mic_talking_status_change
  label: Mic Talking Status Change
  kind: action
  command: "0x0081"
  params:
    - name: talking
      type: enum
      values: [stop, start]
      description: 0x0000 = stop, 0x0001 = start
    - name: mic_id
      type: integer
      description: Microphone registration number 1-100 (encoded 0x0000-0x0063), or 0xFFFF for all mics (only with stop)
  notes: |
    Available on SR204 / SR202DN / SR204DN v6.00R00 or later.

# === Charger (WZ-SZ600) ===

- id: charger_connection_request
  label: Charger Connection Request
  kind: action
  command: "0x4011"
  params: []

- id: charger_authentication_request
  label: Charger Authentication Request
  kind: action
  command: "0x4031"
  params:
    - name: auth_data
      type: string
      description: SHA-256 hash of "password:nonce" (lowercase hex, 64 bytes)

- id: mic_charge_status_request
  label: Mic Charge Status Request
  kind: query
  command: "0x2071"
  params: []

- id: charger_data_request
  label: Charger Data Request
  kind: query
  command: "0x2041"
  params: []
```

## Feedbacks
```yaml
- id: connection_response
  command: "0xE002"
  description: Receiver returns connection result + 8-byte ASCII nonce
  fields:
    notification_code: 0x00000000 = OK, other = NG
    nonce: 8-byte ASCII lowercase alphabet

- id: authentication_response
  command: "0xF002"
  description: Authentication result
  fields:
    notification_code: 0x00000000 = OK, other = NG

- id: current_data
  command: "0x0022"
  description: 160-byte current data block (see source section 6)
  fields:
    data_version: 8 bytes
    ext_receiver_1_state: enum (0x00=off, 0x01=connected, 0x0F=error)
    ext_receiver_2_state: enum
    ext_receiver_3_state: enum
    operation_mode: enum (0x00=local, 0x01=remote)
    antenna_1_to_8_state: 8 bytes (Bit 0-6 state, Bit 7 PHS detected)
    mic_1_to_16_block: 16 x 8-byte block per mic
  notes: |
    Per-mic block = registration_number | state (off/connected/error) |
    battery_level (red/orange/green) | radio_wave_level (0x00-0x3F, MSB=error)
    | audio_level (0x0000-0xFFFF) | antenna_number (0x00-0x07) |
    volume (0x00-0x3F, MSB=mute)

- id: operation_mode
  command: "0x0142"
  description: Current operation mode
  fields:
    mode: enum (0x0000=local, 0x0001=remote)

- id: volume_response
  command: "0x0152"
  description: Current per-mic volume
  fields:
    notification_code: 0x00000000 = OK
    mic_1_to_16_volume: 16 bytes (Bit 0-6 = 0x00-0x3F, Bit 7 = mute). 0xFF = unregistered.

- id: mic_pairing_response
  command: "0x0072"
  description: Pairing mode + channel + result
  fields:
    pairing_mode: enum
    pairing_channel: 0x0000-0x000F
    notification_code: 0x00000000 = OK, other = NG

- id: charger_connection_response
  command: "0x4012"
  description: Charger connection result + nonce; flags initial-password-not-set
  fields:
    mode: 0x0000=normal boot, 0x0001=maintenance
    notification_code: 0x00000000=OK, 0xFFFFFFFF=initial password not set, other=NG
    nonce: 8-byte ASCII

- id: charger_authentication_response
  command: "0x4032"
  description: Charger authentication result
  fields:
    notification_code: 0x00000000 = OK, other = NG

- id: mic_charge_status
  command: "0x2072"
  description: 64-byte charge status for up to 4 ports
  fields:
    charger_version: 8-byte ASCII
    port_1_to_4: 4 x (status, charge_elapsed_minutes, reserve1, reserve2 [, coil_state])
  notes: |
    Port status: 0x0000=no mic, 0x0001=charging, 0x0002=complete,
    0x0003=abnormal. Charge elapsed: 0x0000-0x05A0 minutes. Coil state
    (ports 3-4 only): 0x0000=laying down, 0x0001=standing.

- id: charger_data
  command: "0x2042"
  description: 64-byte charger config block
  fields:
    notification_code: 0x00000000 = OK, other = NG
    data_version: 8 bytes
    unit_name: 32 bytes UTF-8 (<=10 chars)
    version_info: 8-byte ASCII
    ip_address: 4 bytes
    subnet_mask: 4 bytes
    gateway: 4 bytes
    port_number: 2 bytes
```

## Variables
```yaml
# Per-mic mutable parameters exposed as discrete actions/volume-change payloads.
# Variables not directly settable as discrete values are not modeled here.
```

## Events
```yaml
- id: level_data_distribution
  command: "0x0032"
  transport: udp
  port: 50004
  cadence: ~100 ms
  description: |
    Unsolicited radio-wave and audio level for up to 16 microphones.
    52-byte payload: 16 x (radio_wave_level (1), audio_level (2))
    + 2 reserve bytes. Radio wave level 0x00-0x3F (MSB = error).
  notes: |
    Sent only after a level_data_distribution_request (0x0031) with
    distribution_type = level_only (identifier 0x0000).

- id: level_data_and_mic_status_distribution
  command: "0x0172"
  transport: udp
  port: 50004
  cadence: ~100 ms
  description: |
    Unsolicited radio-wave, audio level AND mic connection status for up
    to 16 microphones. 68-byte payload: 16 x (radio_wave_level (1),
    audio_level (2), status (1), registration_number (1)) + 2 reserve.
    Status 0x00=off, 0x01=connected, 0x0F=connection_error.
  notes: |
    Sent only after a level_data_distribution_request (0x0031) with
    distribution_type = level_and_mic_status (identifier 0x0001).
    Requires SR204 / SR202DN / SR204DN v6.00R00 or later.
```

## Macros
```yaml
# Recommended sequence to establish a control session (from source section 5):
# 1. TCP connect to port 50003
# 2. Send connection_request (0xE001) with current_time payload
# 3. Receive connection_response (0xE002), extract nonce
# 4. Send authentication_request (0xF001) with MD5/SHA-256 of "password:nonce"
# 5. Receive authentication_response (0xF002), check notification_code == OK
# 6. Send current_data_acquisition_request (0x0021) every <=5 s as keep-alive
# 7. Optionally send level_data_distribution_request (0x0031) to start UDP event stream
# 8. On exit, stop UDP stream and close TCP socket
session_handshake:
  steps:
    - connection_request
    - connection_response
    - authentication_request
    - authentication_response
    - current_data_acquisition_request  # repeat <=5 s for keep-alive
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing
# requirements are documented in the source.
```

## Notes
- Authentication is challenge-response: the device returns an 8-byte ASCII
  nonce in the connection response; the client hashes `password:nonce` with
  MD5 (or SHA-256 on supported models) and sends it back in the
  authentication request. The receiver returns NG with a specific
  notification code `0xFFFFFFFF` if the charger has no initial password set.
- Volume changes (`0x0150`) are rejected (NG) by the receiver when the
  current operation mode is local. Use `operation_mode_change` to switch to
  remote first.
- The receiver delivers UDP level data at ~100 ms cadence. Stale keep-alive
  (no current_data_acquisition_request within 5 s) causes the device to
  drop the TCP connection.
- Up to 2 control terminals may be connected simultaneously.
- Source revision A.05 (2022-11-10); spec covers the WX-SR200 series plus
  WZ-SZ600 charger. Commands 0x0172 (level+mic status) and 0x0081 (mic
  talking status) require SR204 / SR202DN / SR204DN firmware v6.00R00+.

<!-- UNRESOLVED:
  - WX-SR202P specifically is not named in this document; the WX-SR200
    family (SR202/SR204/SR202DN/SR204DN) is covered. Operator should
    confirm whether the "P" suffix is a regional / distributor variant
    that uses the same protocol.
  - Default IP address, subnet, gateway of the device are not stated in
    the source (they are stored in the charger data response 0x2042 but
    no factory default is documented).
  - Exact maximum number of registered microphones per receiver is not
    stated; the registration_number field allows 1-100, but only 16
    antennas / mic slots are reported in the level distribution events.
-->

## Provenance

```yaml
source_domains:
  - na.panasonic.com
  - applicationmarket.crestron.com
  - connect.na.panasonic.com
source_urls:
  - "https://na.panasonic.com/ns/303988_API_Panasonic_WX-SR200_Series_IF_Specification_VA.05-20221110.pdf?hsLang=en"
  - "https://applicationmarket.crestron.com/content/Help/Panasonic/Panasonic%20WX-SR202P%20v2.0%20Help.pdf"
  - https://connect.na.panasonic.com/av/audio/2-channel-wireless-mic-receiver
retrieved_at: 2026-04-29T10:28:13.871Z
last_checked_at: 2026-06-02T22:13:00.308Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:13:00.308Z
matched_actions: 14
action_count: 14
confidence: medium
summary: "All 14 spec actions traced to source (dip-safe re-verify). (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "WX-SR202P specifically is not named in the source. The WX-SR200 series"
- "no safety warnings, interlocks, or power-on sequencing"
- "- WX-SR202P specifically is not named in this document; the WX-SR200"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
