---
schema_version: ai4av-public-spec-v1
device_id: panasonic/wx-sr204
entity_id: panasonic_wx_sr202p_wireless_microphone_system_v2_0
spec_id: admin/panasonic-wx-sr202p-wireless-microphone-system-v2-0
revision: 1
author: admin
title: "Panasonic WX-SR200 Series Control Spec"
status: published
manufacturer: Panasonic
manufacturer_key: panasonic
model_family: WX-SR204
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - WX-SR204
    - WX-SR202
    - WX-SR204DN
    - WX-SR202DN
    - WX-SZ600
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - "https://na.panasonic.com/ns/303988_API_Panasonic_WX-SR200_Series_IF_Specification_VA.05-20221110.pdf?hsLang=en"
  - "https://applicationmarket.crestron.com/content/Help/Panasonic/Panasonic%20WX-SR202P%20v2.0%20Help.pdf"
  - https://connect.na.panasonic.com/av/audio/2-channel-wireless-mic-receiver
source_documents:
  - title: "Panasonic public source"
    url: "https://na.panasonic.com/ns/303988_API_Panasonic_WX-SR200_Series_IF_Specification_VA.05-20221110.pdf?hsLang=en"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T10:21:08.189Z
  - title: "Panasonic public source"
    url: "https://applicationmarket.crestron.com/content/Help/Panasonic/Panasonic%20WX-SR202P%20v2.0%20Help.pdf"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T10:21:08.671Z
  - title: "Panasonic public source"
    url: https://connect.na.panasonic.com/av/audio/2-channel-wireless-mic-receiver
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-29T10:21:09.054Z
  - title: "Panasonic public source"
    url: "https://na.panasonic.com/ns/303988_API_Panasonic_WX-SR200_Series_IF_Specification_VA.05-20221110.pdf?hsLang=en"
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T10:21:34.531Z
  - title: "Panasonic public source"
    url: "https://na.panasonic.com/ns/303988_API_Panasonic_WX-SR200_Series_IF_Specification_VA.05-20221110.pdf?hsLang=en"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:28:13.871Z
retrieved_at: 2026-04-29T10:28:13.871Z
last_checked_at: 2026-04-29T11:21:29.322Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-29T11:21:29.322Z
  matched_actions: 14
  action_count: 14
  confidence: high
  summary: "All 14 spec actions match source opcodes; transport (TCP/UDP, port 50003, MD5/SHA-256 auth) confirmed verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Panasonic WX-SR200 Series Control Spec

## Summary
Panasonic 1.9 GHz band digital wireless microphone system. Controlled via IPv4 TCP/IP and UDP/IP on 100Base-TX. Receivers use MD5 authentication (SHA-256 for DN models); charger uses SHA-256 only. Control port 50003, UDP telemetry port 50004. Supports up to 2 simultaneous control terminals.

<!-- UNRESOLVED: device power on/off commands not present in source -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 50003  # TCP control command port (receiver and charger)
auth:
  type: password  # MD5 for SR200/SR202/SR204; SHA-256 for DN models and charger
  hash_algorithm:
    - md5  # WX-SR204, WX-SR202, WX-SR202DN, WX-SR204DN
    - sha256  # WX-SR204DN, WX-SR202DN, WX-SZ600
```

## Traits
```yaml
- queryable  # current data acquisition, volume request, operation mode request, mic charge status request
- levelable  # volume change with absolute/relative modes
```

## Actions
```yaml
- id: connection_request
  label: Connection Request
  kind: action
  params:
    - name: current_time
      type: string
      description: Control terminal current time in ASCII YYYYMMDDHHMMSS format
  source: 5.1

- id: authentication_request
  label: Authentication Request
  kind: action
  params:
    - name: auth_data
      type: string
      description: MD5 or SHA-256 hash of "password:randomNumberData"
  source: 5.3

- id: current_data_acquisition_request
  label: Current Data Acquisition Request (Keep-Alive)
  kind: action
  params: []
  source: 5.5

- id: operation_mode_change
  label: Operation Mode Change
  kind: action
  params:
    - name: mode
      type: integer
      description: 0x0000=Local (front panel), 0x0001=Remote (control terminal)
  source: 5.8

- id: operation_mode_request
  label: Operation Mode Request
  kind: action
  params: []
  source: 5.9

- id: volume_change
  label: Volume Change
  kind: action
  params:
    - name: method
      type: integer
      description: 0x0000=Absolute, 0x0001=Relative
    - name: mic_mask
      type: integer
      description: Bitmask of microphones (Bit0=Mic1, ..., Bit15=Mic16)
    - name: mic1_volume
      type: integer
      description: Volume 0x00-0x3F (6 bits); Bit7=Mute
    - name: mic2_volume
      type: integer
    - name: mic3_volume
      type: integer
    - name: mic4_volume
      type: integer
    - name: mic5_volume
      type: integer
    - name: mic6_volume
      type: integer
    - name: mic7_volume
      type: integer
    - name: mic8_volume
      type: integer
    - name: mic9_volume
      type: integer
    - name: mic10_volume
      type: integer
    - name: mic11_volume
      type: integer
    - name: mic12_volume
      type: integer
    - name: mic13_volume
      type: integer
    - name: mic14_volume
      type: integer
    - name: mic15_volume
      type: integer
    - name: mic16_volume
      type: integer
  source: 5.11

- id: volume_request
  label: Volume Request
  kind: action
  params: []
  source: 5.12

- id: mic_pairing_request
  label: Mic Pairing Request
  kind: action
  params:
    - name: mode
      type: integer
      description: 0x0000=Start pairing, 0x0001=Stop pairing
    - name: channel
      type: integer
      description: Channel 0x0000-Ch1 ... 0x000F-Ch16
  source: 5.14

- id: mic_talking_status_change
  label: Mic Talking Status Change
  kind: action
  params:
    - name: status
      type: integer
      description: 0x0000=Stop talk, 0x0001=Start talk
    - name: mic_number
      type: integer
      description: Mic number 0x0000=Mic1 ... 0x0063=Mic100
    - name: all_mics
      type: integer
      description: 0xFFFF=All microphones (only when status=0x0000 Stop talk)
  source: 5.16

- id: level_data_distribution_request
  label: Level Data Distribution Request
  kind: action
  params:
    - name: distribution_type
      type: integer
      description: 0x0000=Start, 0x0001=Stop
    - name: distribution_mode
      type: integer
      description: 0x0000=Level data only, 0x0001=Level data and mic status
  source: 5.7.1

# Charger actions
- id: charger_connection_request
  label: Charger Connection Request
  kind: action
  params: []
  source: 7.1

- id: charger_authentication_request
  label: Charger Authentication Request
  kind: action
  params:
    - name: auth_data
      type: string
      description: SHA-256 hash of "password:randomNumberData" (64 bytes)
  source: 7.3

- id: mic_charge_status_request
  label: Mic Charge Status Request (Keep-Alive)
  kind: action
  params: []
  source: 7.5

- id: charger_data_request
  label: Charger Data Request
  kind: action
  params: []
  source: 7.7
```

## Feedbacks
```yaml
- id: connection_response
  type: object
  fields:
    - name: result
      type: integer
      description: 0x00000000=OK, other=NG
    - name: random_number
      type: string
      description: 8-byte ASCII random number for auth
  source: 5.2

- id: authentication_response
  type: object
  fields:
    - name: result
      type: integer
      description: 0x00000000=OK, other=NG
  source: 5.4

- id: current_data_response
  type: object
  fields:
    - name: result
      type: integer
      description: 0x00000000=OK, other=NG
    - name: current_data
      type: object
      description: 160 bytes - see Variables section
  source: 5.6

- id: operation_mode_response
  type: object
  fields:
    - name: result
      type: integer
      description: 0x00000000=OK, other=NG
    - name: mode
      type: integer
      description: 0x0000=Local, 0x0001=Remote
  source: 5.10

- id: volume_response
  type: object
  fields:
    - name: result
      type: integer
      description: 0x00000000=OK, other=NG
    - name: mic1_volume
      type: integer
      description: Volume 0x00-0x3F; Bit7=Mute; 0xFF=not registered
    - name: mic2_volume
      type: integer
    - name: mic3_volume
      type: integer
    - name: mic4_volume
      type: integer
    - name: mic5_volume
      type: integer
    - name: mic6_volume
      type: integer
    - name: mic7_volume
      type: integer
    - name: mic8_volume
      type: integer
    - name: mic9_volume
      type: integer
    - name: mic10_volume
      type: integer
    - name: mic11_volume
      type: integer
    - name: mic12_volume
      type: integer
    - name: mic13_volume
      type: integer
    - name: mic14_volume
      type: integer
    - name: mic15_volume
      type: integer
    - name: mic16_volume
      type: integer
  source: 5.13

- id: mic_pairing_response
  type: object
  fields:
    - name: mode
      type: integer
      description: 0x0000=Start, 0x0001=Stop
    - name: channel
      type: integer
      description: Channel 0x0000-Ch1 ... 0x000F-Ch16
    - name: result
      type: integer
      description: 0x00000000=OK, other=NG
  source: 5.15

- id: level_data_distribution
  type: object
  description: UDP delivery every ~100ms when streaming active
  fields:
    - name: channel_count
      type: integer
      description: Fixed 0x10 (16 channels)
    - name: mic1_radio_level
      type: integer
      description: 0x00-0x3F; MSB=error flag
    - name: mic1_audio_level
      type: integer
      description: 0x0000-0xFFFF
    - name: mic2_radio_level
      type: integer
    - name: mic2_audio_level
      type: integer
    # ... mic3-16 same pattern
  source: 5.7.2

- id: level_data_and_mic_status_distribution
  type: object
  description: Extended UDP delivery (requires firmware 6.00R00 on SR204/SR202DN/SR204DN)
  fields:
    - name: mic1_radio_level
      type: integer
    - name: mic1_audio_level
      type: integer
    - name: mic1_status
      type: integer
      description: 0x00=Power OFF, 0x01=Connected, 0x0F=Connection error
    - name: mic1_registration
      type: integer
      description: 0x00=Mic1 ... 0x63=Mic100, 0xFF=Unused
    # ... mic2-16 same pattern
  source: 5.7.3

# Charger feedbacks
- id: charger_connection_response
  type: object
  fields:
    - name: boot_mode
      type: integer
      description: 0x0000=Normal, 0x0001=Maintenance
    - name: result
      type: integer
      description: 0x00000000=OK, 0xFFFFFFFF=Initial password not set, other=NG
    - name: random_number
      type: string
      description: 8-byte ASCII random number for auth
  source: 7.2

- id: charger_authentication_response
  type: object
  fields:
    - name: result
      type: integer
      description: 0x00000000=OK, other=NG
  source: 7.4

- id: mic_charge_status_response
  type: object
  fields:
    - name: charger_version
      type: string
      description: ASCII e.g. "1.00R000"
    - name: port1_status
      type: integer
      description: 0x0000=No mic, 0x0001=charging, 0x0002=complete, 0x0003=abnormal
    - name: port1_elapsed
      type: integer
      description: Charge elapsed minutes 0x0000-0x05A0
    - name: port2_status
      type: integer
    - name: port2_elapsed
      type: integer
    - name: port3_status
      type: integer
    - name: port3_elapsed
      type: integer
    - name: port3_coil_state
      type: integer
      description: 0x0000=Laying down, 0x0001=standing
    - name: port4_status
      type: integer
    - name: port4_elapsed
      type: integer
    - name: port4_coil_state
      type: integer
  source: 7.6

- id: charger_data_response
  type: object
  fields:
    - name: result
      type: integer
      description: 0x00000000=OK, other=NG
    - name: charger_data
      type: object
      description: 64 bytes - see Variables section
  source: 7.8
```

## Variables
```yaml
# Current data format (160 bytes) - source Table 6
- id: receiver_data_version
  type: string
  description: 8-byte data version field

- id: wireless_receiver_state
  type: enum
  values:
    - 0x00: Power OFF
    - 0x01: Connected
    - 0x0F: Connection error

- id: operation_mode
  type: enum
  values:
    - 0x00: Local mode
    - 0x01: Remote mode

- id: wireless_antenna_state
  type: object
  description: 8 antennas, each 1 byte
  fields:
    - name: antenna_1_state
      type: integer
      description: Bits0-6=state (0x00=OFF, 0x01=Connected, 0x0F=Error), Bit7=PHS detected
    - name: antenna_2_state
      type: integer
    - name: antenna_3_state
      type: integer
    - name: antenna_4_state
      type: integer
    - name: antenna_5_state
      type: integer
    - name: antenna_6_state
      type: integer
    - name: antenna_7_state
      type: integer
    - name: antenna_8_state
      type: integer

- id: microphone_state
  type: object
  description: Per-microphone data (Mic1-Mic16, 8 bytes each)
  fields:
    - name: registration_number
      type: integer
      description: 0x00=Mic1 ... 0x63=Mic100, 0xFF=Unused
    - name: state
      type: enum
      values:
        - 0x00: Power OFF
        - 0x01: Connected
        - 0x0F: Connection error
    - name: battery_level
      type: enum
      values:
        - 0x00: Red (low)
        - 0x01: Orange (mid)
        - 0x02: Green (high)
    - name: radio_level
      type: integer
      description: 0x00-0x3F; MSB=error flag
    - name: audio_level
      type: integer
      description: 0x0000-0xFFFF
    - name: connection_antenna
      type: integer
      description: 0x00=Antenna1 ... 0x07=Antenna8
    - name: volume
      type: integer
      description: 0x00-0x3F; MSB=Mute flag

- id: data_change_status
  type: enum
  values:
    - 0x00: Normal Operation
    - 0x01: During microphone pairing

- id: mic_pairing_channel
  type: integer
  description: 0x00=Ch1 ... 0x0F=Ch16

- id: sync_state
  type: enum
  values:
    - 0x00: Stand-alone mode
    - 0x01: Main mode
    - 0x02: Sub mode (synchronized)
    - 0x03: Sub mode (sync error)

# Charger data format (64 bytes) - source Table 8
- id: charger_data_version
  type: string
  description: ASCII e.g. "1.00R000"

- id: charger_unit_name
  type: string
  description: UTF-8, max 10 characters

- id: charger_version
  type: string
  description: ASCII e.g. "1.00R000"

- id: charger_ip_address
  type: string
  description: IPv4 address

- id: charger_subnet_mask
  type: string

- id: charger_gateway
  type: string

- id: charger_port_number
  type: integer
```

## Events
```yaml
# UNRESOLVED: device does not send unsolicited events; all responses are triggered by commands
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: volume_control_requires_remote_mode
    description: Volume change requires operation mode set to Remote (0x0001) first via operation_mode_change
  - id: keep_alive_interval
    description: Control terminal must send keep-alive (current_data_acquisition_request) every 5 seconds or connection is dropped
# UNRESOLVED: no safety warnings or interlock procedures explicitly stated in source
```

## Notes
Authentication data generation: `"receiver_password:randomNumberData"` converted to MD5 (32 hex chars, lowercase) or SHA-256 (64 hex chars) depending on model. DN models and charger support SHA-256 only; older models use MD5.

Level data and microphone status distribution (0x0172) requires firmware 6.00R00 on WX-SR204/SR202DN/SR204DN. Other models do not support this command.

Radio wave level to LED indication mapping: Green5=0x29-0x3F, Green4=0x26-0x28, Green3=0x23-0x25, Green2=0x20-0x22, Green1=0x1D-0x1F, Off=0x00-0x1C.

Audio level to LED indication mapping: Red=0x3FFF-0x7FFF, Orange=0x1449-0x3FFE, Green=0x00A4-0x1448, Off=0x0000-0x00A3.

Keep-alive is current_data_acquisition_request (0x0021). For charger, keep-alive is mic_charge_status_request (0x2071). Both must be sent every 5 seconds.

Charger (WX-SZ600) uses SHA-256 authentication only and different command IDs (0x4xxx range vs 0xExxx for receivers).

Command byte order is big endian throughout.
<!-- UNRESOLVED: device power on/off commands not found in source -->
<!-- UNRESOLVED: default receiver password not stated in source -->
<!-- UNRESOLVED: firmware version compatibility ranges not fully enumerated beyond 6.00R00 for extended status commands -->

## Provenance

```yaml
source_urls:
  - "https://na.panasonic.com/ns/303988_API_Panasonic_WX-SR200_Series_IF_Specification_VA.05-20221110.pdf?hsLang=en"
  - "https://applicationmarket.crestron.com/content/Help/Panasonic/Panasonic%20WX-SR202P%20v2.0%20Help.pdf"
  - https://connect.na.panasonic.com/av/audio/2-channel-wireless-mic-receiver
source_documents:
  - title: "Panasonic public source"
    url: "https://na.panasonic.com/ns/303988_API_Panasonic_WX-SR200_Series_IF_Specification_VA.05-20221110.pdf?hsLang=en"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T10:21:08.189Z
  - title: "Panasonic public source"
    url: "https://applicationmarket.crestron.com/content/Help/Panasonic/Panasonic%20WX-SR202P%20v2.0%20Help.pdf"
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T10:21:08.671Z
  - title: "Panasonic public source"
    url: https://connect.na.panasonic.com/av/audio/2-channel-wireless-mic-receiver
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-29T10:21:09.054Z
  - title: "Panasonic public source"
    url: "https://na.panasonic.com/ns/303988_API_Panasonic_WX-SR200_Series_IF_Specification_VA.05-20221110.pdf?hsLang=en"
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T10:21:34.531Z
  - title: "Panasonic public source"
    url: "https://na.panasonic.com/ns/303988_API_Panasonic_WX-SR200_Series_IF_Specification_VA.05-20221110.pdf?hsLang=en"
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:28:13.871Z
retrieved_at: 2026-04-29T10:28:13.871Z
last_checked_at: 2026-04-29T11:21:29.322Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-29T11:21:29.322Z
matched_actions: 14
action_count: 14
confidence: high
summary: "All 14 spec actions match source opcodes; transport (TCP/UDP, port 50003, MD5/SHA-256 auth) confirmed verbatim."
```

## Known Gaps

```yaml
[]
```
