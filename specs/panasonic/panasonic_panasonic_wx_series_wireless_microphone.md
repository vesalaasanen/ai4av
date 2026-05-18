---
spec_id: admin/panasonic-wx-sr200-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic WX-SR200 Series Control Spec"
manufacturer: Panasonic
model_family: WX-SR204
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
    - "Panasonic Connect Co, Ltd."
  models:
    - WX-SR204
    - WX-SR202
    - WX-SR204DN
    - WX-SR202DN
    - WX-SZ600
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
retrieved_at: 2026-05-04T06:33:17.959Z
last_checked_at: 2026-05-04T08:04:40.870Z
generated_at: 2026-05-04T08:04:40.870Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-04T08:04:40.870Z
  matched_actions: 14
  action_count: 14
  confidence: high
  summary: "All 14 spec command_ids match verbatim in source with correct parameter shapes and transport (50003 TCP, 50004 UDP, MD5/SHA-256 auth)."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-04
---

# Panasonic WX-SR200 Series Control Spec

## Summary
1.9 GHz digital wireless microphone system with LAN control. Binary protocol over TCP (port 50003) for commands and UDP (port 50004) for level data streaming. Covers WX-SR204/SR202 receivers (with and without Dante) and WX-SZ600 charger. Challenge-response authentication required (MD5 or SHA-256).

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 50003
serial: null
udp:
  port: 50004
  description: Destination port for radio wave level and audio level data from receiver
auth:
  type: challenge_response
  description: >-
    Challenge-response using device password. Receiver returns 8-byte random
    ASCII string in connection response. Client computes MD5(Password:Random)
    or SHA-256(Password:Random) and sends result in authentication request.
    WX-SR204 and WX-SR202DN/SR204DN support SHA-256.
  hash_algorithms:
    - MD5
    - SHA-256
max_simultaneous_connections: 2
keepalive:
  interval_seconds: 5
  method: Current data acquisition request (command 0x0021)
```

## Protocol Details
```yaml
byte_order: big_endian
frame_structure:
  description: Binary frame with header (20 bytes) + data section
  header:
    - name: Common identifier
      bytes: 4
      values:
        receiver: "0x53523200 (SR2+00)"
        charger: "0x535A3600 (SZ6+00)"
    - name: Header size
      bytes: 2
      value: "0x0014 (20, fixed)"
    - name: Transaction number
      bytes: 2
      description: "1-65535, increments per transaction. Delivery commands use 0."
    - name: Command identifier
      bytes: 2
    - name: Reserve
      bytes: 6
      value: "0x000000000000"
    - name: Command data length
      bytes: 4
  data_section:
    data_header:
      - name: Reserve
        bytes: 8
        value: "0x0000000000000000 (fixed)"
    data_body: varies per command
```

## Traits
```yaml
traits:
  - queryable
  - levelable
  - powerable
```

## Actions
```yaml
actions:
  - id: receiver_connect
    label: Connect to Receiver
    kind: action
    command_id: "0xE001"
    direction: control_terminal_to_receiver
    description: "Initiate TCP connection to receiver. Sends control terminal timestamp (14 bytes ASCII, e.g. 20171006090102)."
    params:
      - name: current_time
        type: string
        description: "Current time in ASCII format YYYYMMDDHHmmSS (14 bytes)"

  - id: receiver_authenticate
    label: Authenticate to Receiver
    kind: action
    command_id: "0xF001"
    direction: control_terminal_to_receiver
    description: "Send authentication data derived from connection response random number and receiver password."
    params:
      - name: authentication_data
        type: bytes
        description: "MD5 (32 bytes) or SHA-256 (64 bytes) of 'Password:RandomNumber'"

  - id: current_data_request
    label: Request Current Data (Keepalive)
    kind: action
    command_id: "0x0021"
    direction: control_terminal_to_receiver
    description: "Request current operational data. Also serves as keepalive; must be sent every 5 seconds."
    params: []

  - id: level_data_distribution_start
    label: Start Level Data Distribution
    kind: action
    command_id: "0x0031"
    direction: control_terminal_to_receiver
    description: "Start/stop UDP delivery of radio wave and audio level data (~100ms interval)."
    params:
      - name: mode
        type: enum
        values:
          - start_delivery
          - stop_delivery
        description: "Identifier field: 0x0000 = start, 0x0001 = stop"
      - name: distribution_type
        type: enum
        values:
          - level_only
          - level_with_mic_status
        description: "Option parameter 1: 0x0000 = level data only (0x0032), 0x0001 = level + mic status (0x0172, requires firmware 6.00R00+)"

  - id: operation_mode_change
    label: Set Operation Mode
    kind: action
    command_id: "0x0140"
    direction: control_terminal_to_receiver
    description: "Switch between local (front panel) and remote (control terminal) volume control. Remote mode disables front panel volume."
    params:
      - name: mode
        type: enum
        values:
          - local
          - remote
        description: "0x0000 = Local mode, 0x0001 = Remote mode"

  - id: operation_mode_request
    label: Request Operation Mode
    kind: action
    command_id: "0x0141"
    direction: control_terminal_to_receiver
    description: "Query current operation mode. Returns operation mode response (0x0142)."
    params: []

  - id: volume_change
    label: Change Volume
    kind: action
    command_id: "0x0150"
    direction: control_terminal_to_receiver
    description: "Change volume for selected microphones. Requires remote mode. Supports absolute and relative values. Bit 7 of volume byte = mute."
    params:
      - name: setting_method
        type: enum
        values:
          - absolute
          - relative
        description: "0x0000 = absolute, 0x0001 = relative"
      - name: mic_selection
        type: integer
        description: "16-bit bitmask. Bit 0 = Mic1 ... Bit 15 = Mic16. 1 = apply change."
      - name: mic_volumes
        type: array
        items:
          type: integer
          min: 0
          max: 127
        description: "Per-mic volume. Bits 0-6: level 0x00-0x3F. Bit 7: mute (absolute) or direction (relative: 0=up, 1=down). 16 bytes (one per mic)."

  - id: volume_request
    label: Request Volume
    kind: action
    command_id: "0x0151"
    direction: control_terminal_to_receiver
    description: "Query current volume for all microphones. Returns volume response (0x0152)."
    params: []

  - id: mic_pairing
    label: Mic Pairing
    kind: action
    command_id: "0x0071"
    direction: bidirectional
    description: "Enter/exit microphone pairing mode for a specific channel."
    params:
      - name: pairing_mode
        type: enum
        values:
          - start
          - stop
        description: "0x0000 = start pairing, 0x0001 = stop pairing"
      - name: channel
        type: integer
        min: 0
        max: 15
        description: "Channel number. 0x0000 = Ch1 ... 0x000F = Ch16"

  - id: mic_talking_status_change
    label: Change Mic Talking Status
    kind: action
    command_id: "0x0081"
    direction: control_terminal_to_receiver
    description: "Start or stop microphone talking. Requires firmware 6.00R00+ on WX-SR204/SR202DN/SR204DN."
    params:
      - name: status
        type: enum
        values:
          - stop_talking
          - start_talking
        description: "0x0000 = stop talking, 0x0001 = start talking"
      - name: microphone
        type: integer
        min: 0
        max: 255
        description: "Registration number 0x00-0x63 (Mic 1-100). When stopping: 0xFFFF = all microphones."

  - id: charger_connect
    label: Connect to Charger
    kind: action
    command_id: "0x4011"
    direction: control_terminal_to_charger
    description: "Initiate TCP connection to WX-SZ600 charger."
    params: []

  - id: charger_authenticate
    label: Authenticate to Charger
    kind: action
    command_id: "0x4031"
    direction: control_terminal_to_charger
    description: "Authenticate to charger using SHA-256 hash of password and random number."
    params:
      - name: authentication_data
        type: bytes
        description: "64-byte SHA-256 hash of 'Password:RandomNumber'"

  - id: mic_charge_status_request
    label: Request Mic Charge Status
    kind: action
    command_id: "0x2071"
    direction: control_terminal_to_charger
    description: "Request charging status for all charge ports. Also serves as charger keepalive."
    params: []

  - id: charger_data_request
    label: Request Charger Data
    kind: action
    command_id: "0x2041"
    direction: control_terminal_to_charger
    description: "Request charger configuration data (unit name, version, IP settings, port)."
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: connection_response
    command_id: "0xE002"
    direction: receiver_to_control_terminal
    description: "Connection result with random number data for authentication."
    fields:
      - name: notification_code
        type: enum
        values: [OK, NG]
        description: "0x00000000 = OK, else NG"
      - name: random_number_data
        type: string
        description: "8-byte ASCII random string for auth challenge generation"

  - id: authentication_response
    command_id: "0xF002"
    direction: receiver_to_control_terminal
    fields:
      - name: notification_code
        type: enum
        values: [OK, NG]

  - id: current_data_response
    command_id: "0x0022"
    direction: receiver_to_control_terminal
    description: "184-byte response containing full operational state for receiver and up to 16 microphones."
    fields:
      - name: notification_code
        type: enum
        values: [OK, NG]
      - name: receiver_state
        type: enum
        values: [power_off, connected, connection_error]
        description: "Per extended receiver slot"
      - name: operation_mode
        type: enum
        values: [local, remote]
      - name: antenna_states
        type: array
        description: "8 antenna states, each: power_off/connected/connection_error + PHS detected bit"
      - name: microphones
        type: array
        max_items: 16
        items:
          fields:
            - name: registration_number
              type: integer
              description: "0x00-0x63 (Mic 1-100), 0xFF = unused"
            - name: state
              type: enum
              values: [power_off, connected, connection_error]
            - name: battery_level
              type: enum
              values: [red_low, orange_mid, green_high]
            - name: radio_wave_level
              type: integer
              description: "0x00-0x3F, MSB = error flag"
            - name: audio_level
              type: integer
              description: "0x0000-0xFFFF"
            - name: connection_antenna
              type: integer
              description: "0x00-0x07 (antenna 1-8)"
            - name: volume
              type: integer
              description: "0x00-0x3F, MSB = mute state"
      - name: pairing_status
        type: enum
        values: [normal, during_pairing]
      - name: pairing_channel
        type: integer
        description: "0x00-0x0F (Ch1-16)"
      - name: sync_state
        type: enum
        values: [standalone, main_mode, sub_synced, sub_error]

  - id: level_data_distribution
    command_id: "0x0032"
    direction: receiver_to_control_terminal
    transport: udp
    transport_port: 50004
    description: "UDP delivery of radio wave and audio level for up to 16 microphones, ~100ms interval."
    fields:
      - name: mic_levels
        type: array
        max_items: 16
        items:
          fields:
            - name: radio_wave_level
              type: integer
              description: "0x00-0x3F, MSB = error flag"
            - name: audio_level
              type: integer
              description: "0x0000-0xFFFF"

  - id: level_data_with_mic_status
    command_id: "0x0172"
    direction: receiver_to_control_terminal
    transport: udp
    transport_port: 50004
    description: "Enhanced UDP level data with mic connection status and registration number. Requires firmware 6.00R00+."
    fields:
      - name: mic_levels
        type: array
        max_items: 16
        items:
          fields:
            - name: radio_wave_level
              type: integer
            - name: audio_level
              type: integer
            - name: status
              type: enum
              values: [power_off, connected, connection_error]
            - name: registration_number
              type: integer
              description: "0x00-0x63, 0xFF = unused"

  - id: operation_mode_response
    command_id: "0x0142"
    direction: receiver_to_control_terminal
    fields:
      - name: notification_code
        type: enum
        values: [OK, NG]
      - name: operation_mode
        type: enum
        values: [local, remote]

  - id: volume_response
    command_id: "0x0152"
    direction: receiver_to_control_terminal
    description: "Volume state for all 16 mic slots. 0xFF = mic not registered. In local mode, returns front panel volume."
    fields:
      - name: notification_code
        type: enum
        values: [OK, NG]
      - name: mic_volumes
        type: array
        max_items: 16
        items:
          fields:
            - name: volume
              type: integer
              description: "Bits 0-6: 0x00-0x3F volume. Bit 7: mute state. 0xFF = not registered."

  - id: mic_pairing_response
    command_id: "0x0072"
    direction: bidirectional
    fields:
      - name: pairing_mode
        type: enum
        values: [start, stop]
      - name: channel
        type: integer
      - name: notification_code
        type: enum
        values: [OK, NG]

  - id: charger_connection_response
    command_id: "0x4012"
    direction: charger_to_control_terminal
    fields:
      - name: boot_mode
        type: enum
        values: [normal, maintenance]
        description: "0x0000 = normal boot, 0x0001 = maintenance mode"
      - name: notification_code
        type: enum
        values: [OK, initial_password_not_set, NG]
        description: "0x00000000 = OK, 0xFFFFFFFF = initial password not set"
      - name: random_number_data
        type: string
        description: "8-byte ASCII random string for auth"

  - id: charger_auth_response
    command_id: "0x4032"
    direction: charger_to_control_terminal
    fields:
      - name: notification_code
        type: enum
        values: [OK, NG]

  - id: mic_charge_status_response
    command_id: "0x2072"
    direction: charger_to_control_terminal
    description: "Charging status for 4 charge ports including charger firmware version."
    fields:
      - name: charger_version
        type: string
        description: "ASCII version string, e.g. 1.00R000"
      - name: charge_ports
        type: array
        max_items: 4
        items:
          fields:
            - name: status
              type: enum
              values: [no_mic, charging, charging_complete, charging_abnormal]
            - name: elapsed_minutes
              type: integer
              min: 0
              max: 1440
              description: "0x0000-0x05A0 in minutes"
            - name: coil_state
              type: enum
              values: [laying_down, standing]
              description: "Only on ports 3 and 4"

  - id: charger_data_response
    command_id: "0x2042"
    direction: charger_to_control_terminal
    description: "Charger configuration data."
    fields:
      - name: notification_code
        type: enum
        values: [OK, NG]
      - name: unit_name
        type: string
        description: "UTF-8, max 10 characters"
      - name: version
        type: string
      - name: ip_address
        type: string
      - name: subnet_mask
        type: string
      - name: gateway
        type: string
      - name: port_number
        type: integer
```

## Variables
```yaml
variables:
  - id: operation_mode
    label: Operation Mode
    type: enum
    values: [local, remote]
    description: "Local = front panel volume control, Remote = control terminal volume control"
    read_command: "0x0141"
    write_command: "0x0140"

  - id: mic_volume
    label: Microphone Volume
    type: integer
    min: 0
    max: 63
    description: "Per-microphone volume level 0x00-0x3F. Supports absolute and relative adjustment. Bit 7 = mute."
    read_command: "0x0151"
    write_command: "0x0150"

  - id: mic_mute
    label: Microphone Mute
    type: boolean
    description: "Mute state per microphone. Encoded as bit 7 of volume byte."
    write_command: "0x0150"
```

## Events
```yaml
events:
  - id: level_data_udp
    description: "Unsolicited UDP delivery of radio wave and audio level data every ~100ms after start request."
    trigger: After level_data_distribution_start with type level_only
    transport: udp
    port: 50004
    command_id: "0x0032"

  - id: level_data_with_status_udp
    description: "Enhanced UDP level data including mic status and registration number."
    trigger: After level_data_distribution_start with type level_with_mic_status
    transport: udp
    port: 50004
    command_id: "0x0172"
```

## Macros
```yaml
macros:
  - id: connection_sequence
    label: Full Connection Sequence
    steps:
      - description: "TCP connect to receiver port 50003"
      - action: receiver_connect
        description: "Send connection request with timestamp"
      - description: "Receive connection response with random number"
      - action: receiver_authenticate
        description: "Compute MD5/SHA-256 of Password:RandomNumber and send"
      - description: "Receive authentication response"
      - description: "Begin keepalive loop - send current_data_request every 5 seconds"
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Volume control requires remote mode (operation_mode_change 0x0001). In local mode, volume change commands return NG."
  - description: "Keepalive required every 5 seconds. Missing keepalive causes disconnection."
# UNRESOLVED: no explicit safety warnings or interlock procedures found in source
```

## Notes
- Binary protocol with big-endian byte order, 20-byte fixed header.
- Receiver common identifier: `0x53523200` ("SR2\0"). Charger common identifier: `0x535A3600` ("SZ6\0").
- Transaction numbers increment per request; delivery commands from receiver use 0.
- Maximum 2 simultaneous TCP connections to a single device.
- Level data with mic status (0x0172) and mic talking status change (0x0081) require firmware 6.00R00+ on WX-SR204/SR202DN/SR204DN.
- Operation mode persists across power cycles.
- Charger (WX-SZ600) authentication uses SHA-256 only; receiver supports MD5 and SHA-256.
- Mic registration numbers are internal to the wireless receiver (0x00-0x63 = Mic 1-100).
- Charger connection response includes boot mode notification (normal vs maintenance).
- Charger connection response may return 0xFFFFFFFF if initial password not yet set.
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: error recovery / fault behavior sequences not documented -->
<!-- UNRESOLVED: charger coil state (ports 3-4) physical meaning not fully documented -->

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
retrieved_at: 2026-05-04T06:33:17.959Z
last_checked_at: 2026-05-04T08:04:40.870Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-04T08:04:40.870Z
matched_actions: 14
action_count: 14
confidence: high
summary: "All 14 spec command_ids match verbatim in source with correct parameter shapes and transport (50003 TCP, 50004 UDP, MD5/SHA-256 auth)."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
