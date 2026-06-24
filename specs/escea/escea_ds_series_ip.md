---
spec_id: admin/escea-ds-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Escea DS Series Control Spec"
manufacturer: Escea
model_family: "Escea DS Series"
aliases: []
compatible_with:
  manufacturers:
    - Escea
  models:
    - "Escea DS Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - github.com
  - home-assistant.io
source_urls:
  - https://github.com/snikch/escea/files/644165/630260_3.Escea.Fireplace.LAN.Comms.Spec.pdf
  - https://github.com/snikch/escea/blob/master/CODES.md
  - https://github.com/snikch/escea/blob/master/escea/message.py
  - https://github.com/snikch/escea/blob/master/escea/fire.py
  - https://www.home-assistant.io/integrations/escea/
retrieved_at: 2026-06-19T18:11:54.916Z
last_checked_at: 2026-06-22T11:50:24.170Z
generated_at: 2026-06-22T11:50:24.170Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source identifies product family as \"Escea gas fireplace\" / \"Escea DS Series\" generically; no specific model number(s) listed. Pinning to DS Series per input."
  - "protocol version is 0.3 of the spec doc dated 11 March 2014; device firmware compatibility not stated."
  - "no power/voltage/current specs in source (fireplace appliance ratings out of scope of LAN protocol doc)."
  - "no multi-step sequences described explicitly in source."
  - "source describes only the LAN protocol. No safety warnings,"
  - "specific DS-series model numbers (e.g. DS1400, DS1450) not enumerated in source."
  - "no firmware version compatibility stated."
  - "appliance electrical/gas ratings out of scope for this protocol doc."
  - "user-supplied \"Known protocol: TCP/IP\" conflicts with source; source states UDP port 3300 and the protocol is fundamentally datagram-based (broadcast discovery). Used UDP per source."
verification:
  verdict: verified
  checked_at: 2026-06-22T11:50:24.170Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec commands matched verbatim in source Table 1; transport (UDP, port 3300) verified; complete coverage of documented protocol. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-19
---

# Escea DS Series Control Spec

## Summary
Escea DS Series network-enabled gas fireplace controlled over UDP on LAN. 15-byte binary packet protocol with start byte 0x47 ('G'), command ID, data, CRC, and end byte 0x46 ('F'). Supports power on/off, fan boost, flame effect, and temperature setpoint. Discovery via broadcast SEARCH_FOR_FIRES.

<!-- UNRESOLVED: source identifies product family as "Escea gas fireplace" / "Escea DS Series" generically; no specific model number(s) listed. Pinning to DS Series per input. -->
<!-- UNRESOLVED: protocol version is 0.3 of the spec doc dated 11 March 2014; device firmware compatibility not stated. -->
<!-- UNRESOLVED: no power/voltage/current specs in source (fireplace appliance ratings out of scope of LAN protocol doc). -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 3300
  # broadcast discovery: destination subnet broadcast (e.g. 192.168.0.255), port 3300
auth:
  type: none  # inferred: no per-command auth procedure in source.
  # Pairing PIN is exchanged during SEARCH_FOR_FIRES/I_AM_A_FIRE discovery and
  # verified by the remote out-of-band; the fireplace itself does not gate
  # command/response on the PIN per the documented protocol.
```

## Packet Structure
```yaml
# 15-byte fixed-length packets for both commands and responses.
# | byte 1 | byte 2      | byte 3   | bytes 4-13 | byte 14 | byte 15 |
# | 0x47   | ID          | DataSize | Data       | CRC      | 0x46    |
# CRC = sum(bytes 2..13 inclusive) mod 256
start_byte: 0x47  # ASCII 'G'
end_byte: 0x46    # ASCII 'F'
crc:
  algorithm: sum_mod_256
  range: bytes_2_to_13_inclusive
data_field_bytes: 10  # always present; bytes beyond DataSize are don't-care
```

## Traits
```yaml
traits:
  - powerable   # POWER_ON / POWER_OFF commands
  - queryable   # STATUS_PLEASE query returns STATUS response
  - levelable   # NEW_SET_TEMP sets desired room temperature
```

## Actions
```yaml
# Each command is one 15-byte UDP packet. Full payload shown as a hex string
# in source order; CRC computed as documented (sum of bytes 2..13 mod 256).
# For zero-data commands the CRC equals the command ID (e.g. STATUS_PLEASE -> 0x31).

- id: status_please
  label: Status Request
  kind: query
  command: "47 31 00 00 00 00 00 00 00 00 00 00 00 31 46"
  params: []
  notes: "Example packet verbatim from source: 0x473100000000000000000000003146"

- id: power_on
  label: Power On
  kind: action
  command: "47 39 00 00 00 00 00 00 00 00 00 00 00 39 46"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "47 3A 00 00 00 00 00 00 00 00 00 00 00 3A 46"
  params: []

- id: search_for_fires
  label: Search For Fires
  kind: action
  command: "47 50 00 00 00 00 00 00 00 00 00 00 00 50 46"
  params: []
  notes: "Broadcast to subnet (e.g. 192.168.0.255:3300). Fireplaces reply with I_AM_A_FIRE."

- id: fan_boost_on
  label: Fan Boost On
  kind: action
  command: "47 37 00 00 00 00 00 00 00 00 00 00 00 37 46"
  params: []

- id: fan_boost_off
  label: Fan Boost Off
  kind: action
  command: "47 38 00 00 00 00 00 00 00 00 00 00 00 38 46"
  params: []

- id: flame_effect_on
  label: Flame Effect On
  kind: action
  command: "47 56 00 00 00 00 00 00 00 00 00 00 00 56 46"
  params: []

- id: flame_effect_off
  label: Flame Effect Off
  kind: action
  command: "47 55 00 00 00 00 00 00 00 00 00 00 00 55 46"
  params: []

- id: new_set_temp
  label: New Set Temperature
  kind: action
  command: "47 57 01 {temp} 00 00 00 00 00 00 00 00 {crc} 46"
  params:
    - name: temp
      type: integer
      description: "Desired room temperature in °C. Valid range 3 < temp < 31."
      min: 4
      max: 30
  notes: "DataSize=1. CRC = sum(bytes 2..13) mod 256 = (0x57 + 0x01 + temp) mod 256."
```

## Feedbacks
```yaml
# Observable states returned in STATUS response (ID 0x80, 6 data bytes).
# Example response packet from source: 0x478006000100001B1800000000BA46

- id: has_new_timers
  type: boolean
  source: STATUS Data[0]

- id: fire_on
  type: boolean
  source: STATUS Data[1]

- id: fan_boost_on_state
  type: boolean
  source: STATUS Data[2]

- id: flame_effect_on_state
  type: boolean
  source: STATUS Data[3]

- id: desired_temperature
  type: integer
  unit: "°C"
  source: STATUS Data[4]

- id: room_temperature
  type: integer
  unit: "°C"
  source: STATUS Data[5]
```

## Variables
```yaml
# Settable parameters that are not discrete actions are represented via Actions
# above (NEW_SET_TEMP). No additional settable variables documented.
```

## Events
```yaml
# Unsolicited notifications: none documented. Fireplace only replies to commands.
# SEARCH_FOR_FIRES -> I_AM_A_FIRE is a solicited response (to a broadcast).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Discovery
```yaml
# Documented discovery flow (solicited broadcast, not unsolicited event):
# 1. Remote broadcasts SEARCH_FOR_FIRES (0x50) to subnet broadcast IP, port 3300.
# 2. Each fireplace replies with I_AM_A_FIRE (0x90) containing Serial Number + PIN.
# 3. I_AM_A_FIRE packet (15 bytes): 47 90 06 {serial 4 bytes BE} {pin 2 bytes BE} 00 00 00 00 {crc} 46
# 4. Remote presents Serial Number to user, verifies PIN, then sends further
#    commands directly to that fireplace's unicast IP.
response:
  id: i_am_a_fire
  response_id: 0x90
  data_size: 6
  fields:
    serial_number:
      type: uint32
      endian: big
      bytes: "Data[0..3]"
    pin:
      type: uint16
      endian: big
      bytes: "Data[4..5]"
response_time: "<3s typical"
```

## Response Acknowledgements
```yaml
# Each non-query command has a matching ACK response (0 data bytes).
- command: POWER_ON
  ack_id: 0x8D
- command: POWER_OFF
  ack_id: 0x8F
- command: FAN_BOOST_ON
  ack_id: 0x89
- command: FAN_BOOST_OFF
  ack_id: 0x8B
- command: FLAME_EFFECT_ON
  ack_id: 0x61
- command: FLAME_EFFECT_OFF
  ack_id: 0x60
- command: NEW_SET_TEMP
  ack_id: 0x66
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source describes only the LAN protocol. No safety warnings,
# interlock procedures, or power-on sequencing requirements are documented
# in this protocol spec. Fireplace appliance safety (gas interlocks, overheat,
# flame-failure) is out of scope of the LAN comms doc.
```

## Notes
- Document version 0.3, prepared by Kamahi Electronics Ltd, dated 11 March 2014.
- All packets are exactly 15 bytes regardless of DataSize; bytes 4..13 are always sent, with bytes beyond DataSize treated as don't-care.
- CRC is a single-byte additive checksum (sum of bytes 2..13 mod 256), not a CRC polynomial despite the field name.
- For zero-data commands the CRC byte equals the command ID byte (since DataSize=0 and data bytes are 0).
- Discovery uses subnet broadcast; subsequent commands are unicast to the discovered fireplace IP.
- Temperature valid range per source: 3 < °C < 31 (exclusive bounds), so integer values 4..30.
- Pin pairing is verified by the remote out-of-band; the fireplace does not enforce the PIN on individual commands per the documented protocol.

<!-- UNRESOLVED: specific DS-series model numbers (e.g. DS1400, DS1450) not enumerated in source. -->
<!-- UNRESOLVED: no firmware version compatibility stated. -->
<!-- UNRESOLVED: appliance electrical/gas ratings out of scope for this protocol doc. -->
<!-- UNRESOLVED: user-supplied "Known protocol: TCP/IP" conflicts with source; source states UDP port 3300 and the protocol is fundamentally datagram-based (broadcast discovery). Used UDP per source. -->
```

## Provenance

```yaml
source_domains:
  - github.com
  - home-assistant.io
source_urls:
  - https://github.com/snikch/escea/files/644165/630260_3.Escea.Fireplace.LAN.Comms.Spec.pdf
  - https://github.com/snikch/escea/blob/master/CODES.md
  - https://github.com/snikch/escea/blob/master/escea/message.py
  - https://github.com/snikch/escea/blob/master/escea/fire.py
  - https://www.home-assistant.io/integrations/escea/
retrieved_at: 2026-06-19T18:11:54.916Z
last_checked_at: 2026-06-22T11:50:24.170Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-22T11:50:24.170Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec commands matched verbatim in source Table 1; transport (UDP, port 3300) verified; complete coverage of documented protocol. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source identifies product family as \"Escea gas fireplace\" / \"Escea DS Series\" generically; no specific model number(s) listed. Pinning to DS Series per input."
- "protocol version is 0.3 of the spec doc dated 11 March 2014; device firmware compatibility not stated."
- "no power/voltage/current specs in source (fireplace appliance ratings out of scope of LAN protocol doc)."
- "no multi-step sequences described explicitly in source."
- "source describes only the LAN protocol. No safety warnings,"
- "specific DS-series model numbers (e.g. DS1400, DS1450) not enumerated in source."
- "no firmware version compatibility stated."
- "appliance electrical/gas ratings out of scope for this protocol doc."
- "user-supplied \"Known protocol: TCP/IP\" conflicts with source; source states UDP port 3300 and the protocol is fundamentally datagram-based (broadcast discovery). Used UDP per source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
