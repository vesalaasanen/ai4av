---
spec_id: admin/escea-lfs800
schema_version: ai4av-public-spec-v1
revision: 1
title: "Escea LFS800 Freestanding Holographic Electric Fireplace Control Spec"
manufacturer: Escea
model_family: "LFS800 Freestanding Holographic Electric Fireplace"
aliases: []
compatible_with:
  manufacturers:
    - Escea
  models:
    - "LFS800 Freestanding Holographic Electric Fireplace"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - github.com
source_urls:
  - https://github.com/snikch/escea/files/644165/630260_3.Escea.Fireplace.LAN.Comms.Spec.pdf
retrieved_at: 2026-07-04T18:30:39.610Z
last_checked_at: 2026-07-07T11:36:51.644Z
generated_at: 2026-07-07T11:36:51.644Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input context declared \"Known protocol: RS-232C\" but the supplied source document (\"Fireplace LAN Communications Protocol Specification\") describes UDP/IP on port 3300 only — no RS-232C content present in source. Spec populated from source (UDP). Confirm which interface applies to LFS800."
  - "protocol spec version 0.3 dated 2014; LFS800 (Holographic, a newer product line) not named in source — exact model coverage unverified."
  - "source describes an optional PIN check - remote \"may wish to compare\""
  - "source documents no unsolicited notifications. All fireplace responses"
  - "no multi-step sequences described in source."
  - "this refined excerpt contains no safety warnings, interlock procedures,"
  - "LFS800 model-specific behaviour, flame holographic controls, dimmer/colour commands not present in source."
  - "firmware/hardware revision compatibility not stated."
  - "whether electric LFS800 supports gas-only commands (FAN_BOOST, FLAME_EFFECT) unchanged."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:36:51.644Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All nine spec action opcodes (0x31-0x57) match verbatim to Table 1 source commands; transport (UDP port 3300) verified; no missing or extra source commands. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-04
---

# Escea LFS800 Freestanding Holographic Electric Fireplace Control Spec

## Summary
Escea LFS80 family network-enabled fireplace controlled over UDP on the local LAN. Remote sends 15-byte command packets to UDP port 3300; fireplace replies with 15-byte response packets. Covers power, fan boost, flame effect, temperature set, and status query. Protocol spec authored by Kamahi Electronics Ltd (v0.3, 11 March 2014).

<!-- UNRESOLVED: input context declared "Known protocol: RS-232C" but the supplied source document ("Fireplace LAN Communications Protocol Specification") describes UDP/IP on port 3300 only — no RS-232C content present in source. Spec populated from source (UDP). Confirm which interface applies to LFS800. -->
<!-- UNRESOLVED: protocol spec version 0.3 dated 2014; LFS800 (Holographic, a newer product line) not named in source — exact model coverage unverified. -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 3300
  broadcast_address: "192.168.0.255"  # example subnet broadcast used for SEARCH_FOR_FIRES discovery
auth:
  # UNRESOLVED: source describes an optional PIN check - remote "may wish to compare"
  # the fireplace PIN (returned in I_AM_A_FIRE) against a user-provided PIN and deny
  # further comms if mismatch. Procedure is optional, not a hard login. No credentials
  # or token format mandated.
  type: none  # inferred: no mandatory auth/login procedure in source (PIN check optional)
```

## Packet Structure
```yaml
# All commands and responses are 15 bytes:
#   byte 1:    StartByte 0x47 ('G')
#   byte 2:    Command/Response ID
#   byte 3:    DataSize
#   bytes 4-13: Data (10 bytes; unused bytes ignored)
#   byte 14:   CRC = sum of bytes 2..13 modulo 256 (overflow at 256)
#   byte 15:   EndByte 0x46 ('F')
frame_length: 15
start_byte: "0x47"
end_byte: "0x46"
crc:
  algorithm: sum_mod_256
  covers_bytes: "2..13"
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER_ON / POWER_OFF commands present
  - queryable    # inferred: STATUS_PLEASE returns device status
  - levelable    # inferred: NEW_SET_TEMP sets target temperature
```

## Actions
```yaml
# All payloads are 15-byte hex packets, verbatim per source packet structure.
# Zero-data commands: DataSize=0x00, CRC = ID byte (single-byte sum).

- id: status_please
  label: Status Request
  kind: query
  command: "47 31 00 00 00 00 00 00 00 00 00 00 00 31 46"  # STATUS_PLEASE 0x31
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "47 39 00 00 00 00 00 00 00 00 00 00 00 39 46"  # POWER_ON 0x39
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "47 3A 00 00 00 00 00 00 00 00 00 00 00 3A 46"  # POWER_OFF 0x3A
  params: []

- id: search_for_fires
  label: Search For Fires (Discovery Broadcast)
  kind: action
  command: "47 50 00 00 00 00 00 00 00 00 00 00 00 50 46"  # SEARCH_FOR_FIRES 0x50
  params: []

- id: fan_boost_on
  label: Fan Boost On
  kind: action
  command: "47 37 00 00 00 00 00 00 00 00 00 00 00 37 46"  # FAN_BOOST_ON 0x37
  params: []

- id: fan_boost_off
  label: Fan Boost Off
  kind: action
  command: "47 38 00 00 00 00 00 00 00 00 00 00 00 38 46"  # FAN_BOOST_OFF 0x38
  params: []

- id: flame_effect_on
  label: Flame Effect Only On
  kind: action
  command: "47 56 00 00 00 00 00 00 00 00 00 00 00 56 46"  # FLAME_EFFECT_ON 0x56
  params: []

- id: flame_effect_off
  label: Flame Effect Only Off
  kind: action
  command: "47 55 00 00 00 00 00 00 00 00 00 00 00 55 46"  # FLAME_EFFECT_OFF 0x55
  params: []

- id: new_set_temp
  label: Set Target Temperature
  kind: action
  command: "47 57 01 {temp_c} 00 00 00 00 00 00 00 00 00 {crc} 46"  # NEW_SET_TEMP 0x57, DataSize=1
  params:
    - name: temp_c
      type: integer
      description: "Desired room temperature in °C. Source constraint: 3 < °C < 31 (i.e. 4..30)."
    - name: crc
      type: integer
      description: "CRC byte = (0x57 + temp_c) mod 256, over bytes 2..13."
```

## Feedbacks
```yaml
# Response packets from fireplace. Status byte 2 = response ID.
# CRC in each response = sum of bytes 2..13 mod 256 (compute on receive to verify).

- id: status_response
  label: STATUS Response
  response_id: "0x80"
  data_size: 6
  fields:
    - index: 0
      name: has_new_timers
      type: boolean
    - index: 1
      name: fire_on
      type: boolean
    - index: 2
      name: fan_boost_on
      type: boolean
    - index: 3
      name: flame_effect_on
      type: boolean
    - index: 4
      name: desired_temperature_c
      type: integer
      unit: °C
    - index: 5
      name: room_temperature_c
      type: integer
      unit: °C
  example: "47 80 06 00 01 00 00 1B 18 00 00 00 00 BA 46"  # from source: fire on, desired 27°C, room 24°C

- id: power_on_ack
  label: Power On Acknowledgement
  response_id: "0x8D"
  data_size: 0

- id: power_off_ack
  label: Power Off Acknowledgement
  response_id: "0x8F"
  data_size: 0

- id: fan_boost_on_ack
  label: Fan Boost On Acknowledgement
  response_id: "0x89"
  data_size: 0

- id: fan_boost_off_ack
  label: Fan Boost Off Acknowledgement
  response_id: "0x8B"
  data_size: 0

- id: flame_effect_on_ack
  label: Flame Effect On Acknowledgement
  response_id: "0x61"
  data_size: 0

- id: flame_effect_off_ack
  label: Flame Effect Off Acknowledgement
  response_id: "0x60"
  data_size: 0

- id: new_set_temp_ack
  label: New Set Temp Acknowledgement
  response_id: "0x66"
  data_size: 0

- id: i_am_a_fire
  label: I Am A Fire (Discovery Response)
  response_id: "0x90"
  data_size: 6
  fields:
    - index: "0..3"
      name: serial_number
      type: unsigned_long
      endian: big
    - index: "4..5"
      name: pin
      type: unsigned_short
      endian: big
```

## Variables
```yaml
- id: target_temperature
  label: Target Room Temperature
  type: integer
  unit: °C
  range: "4..30"  # source: 3 < °C < 31
  set_via: new_set_temp
  read_via: status_response.desired_temperature_c

- id: room_temperature
  label: Current Room Temperature
  type: integer
  unit: °C
  read_only: true
  read_via: status_response.room_temperature_c
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All fireplace responses
# are replies to remote commands.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: this refined excerpt contains no safety warnings, interlock procedures,
# or power-on sequencing requirements. Device is a heat-producing appliance; confirm
# full manual for thermal/runtime limits before implementing autonomous control.
```

## Notes
- Source document is the generic "Fireplace LAN Communications Protocol Specification" (Kamahi Electronics Ltd, v0.3, 11 March 2014) for "network enabled Escea gas fireplace". It predates and does not name the LFS800 Holographic Electric Fireplace model; command set assumed shared but unverified against the actual LFS800.
- Input context listed "Known protocol: RS-232C" but the supplied source text describes UDP/IP on port 3300 only. This spec reflects the source (UDP). If the LFS800 also exposes RS-232C, a separate source document is required.
- Discovery: broadcast SEARCH_FOR_FIRES to subnet broadcast (e.g. 192.168.0.255:3300); fireplaces reply with I_AM_A_FIRE containing Serial Number (big-endian u32) and PIN (big-endian u16). Typical response time < 3 seconds.
- Optional soft auth: remote may compare returned PIN against a user-supplied PIN and ignore non-matching fireplaces. Not enforced by the fireplace.
- CRC: single-byte additive checksum over bytes 2..13, mod 256. For zero-data commands this equals the command ID byte.
- Example exchange from source: STATUS_PLEASE → `47 31 00 00 00 00 00 00 00 00 00 00 00 31 46`; reply `47 80 06 00 01 00 00 1B 18 00 00 00 00 BA 46` (fire on, no fan boost, no flame effect, desired 27°C, room 24°C).

<!-- UNRESOLVED: LFS800 model-specific behaviour, flame holographic controls, dimmer/colour commands not present in source. -->
<!-- UNRESOLVED: firmware/hardware revision compatibility not stated. -->
<!-- UNRESOLVED: whether electric LFS800 supports gas-only commands (FAN_BOOST, FLAME_EFFECT) unchanged. -->

## Provenance

```yaml
source_domains:
  - github.com
source_urls:
  - https://github.com/snikch/escea/files/644165/630260_3.Escea.Fireplace.LAN.Comms.Spec.pdf
retrieved_at: 2026-07-04T18:30:39.610Z
last_checked_at: 2026-07-07T11:36:51.644Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:36:51.644Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All nine spec action opcodes (0x31-0x57) match verbatim to Table 1 source commands; transport (UDP port 3300) verified; no missing or extra source commands. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input context declared \"Known protocol: RS-232C\" but the supplied source document (\"Fireplace LAN Communications Protocol Specification\") describes UDP/IP on port 3300 only — no RS-232C content present in source. Spec populated from source (UDP). Confirm which interface applies to LFS800."
- "protocol spec version 0.3 dated 2014; LFS800 (Holographic, a newer product line) not named in source — exact model coverage unverified."
- "source describes an optional PIN check - remote \"may wish to compare\""
- "source documents no unsolicited notifications. All fireplace responses"
- "no multi-step sequences described in source."
- "this refined excerpt contains no safety warnings, interlock procedures,"
- "LFS800 model-specific behaviour, flame holographic controls, dimmer/colour commands not present in source."
- "firmware/hardware revision compatibility not stated."
- "whether electric LFS800 supports gas-only commands (FAN_BOOST, FLAME_EFFECT) unchanged."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
