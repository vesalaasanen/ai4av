---
spec_id: admin/audac-mtx48-88
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audac MTX48 / MTX88 Control Spec"
manufacturer: Audac
model_family: MTX48
aliases: []
compatible_with:
  manufacturers:
    - Audac
  models:
    - MTX48
    - MTX88
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - downloads.pvs.global
source_urls:
  - https://downloads.pvs.global/downloads/audac/products/manuals/MTX_Commands_Manual.pdf
retrieved_at: 2026-05-17T10:48:34.167Z
last_checked_at: 2026-08-19T08:27:37.161Z
generated_at: 2026-08-19T08:27:37.161Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full enumeration of zones per model (MTX48 vs MTX88 zone counts)"
  - "flow control not stated in source"
  - "remove this section if not applicable"
  - "no multi-step sequences described in source"
  - "no explicit safety warnings or interlock procedures documented in source"
  - "exact zone count differences between MTX48 and MTX88 not clarified in source"
verification:
  verdict: verified
  checked_at: 2026-08-19T08:27:37.161Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions (SVx, SVU0x, SVD0x, SRx, SRU0x, SRD0x, SB0x, ST0x, SM0x, GVALL, GRALL, GMALL, GV0x, GR0x, GM0x, GB0x, GT0x, GZI0x, SAVE, DEF, GSV) appear verbatim in the source with correct shapes; transport values port 5001, 19200 baud, 8 data bits, no parity, 1 stop bit also match source verbatim. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-12
---

# Audac MTX48 / MTX88 Control Spec

## Summary
The Audac MTX48 and MTX88 are audio matrix processors (4-in/8-out and 8-in/8-out respectively) controllable over RS-232, RS-485, or TCP/IP. The spec covers the full ASCII command set for routing, per-zone volume, bass, treble, mute, querying state, saving settings, and resetting to factory defaults.

<!-- UNRESOLVED: full enumeration of zones per model (MTX48 vs MTX88 zone counts) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 5001  # TCP/IP port stated in source
serial:
  baud_rate: 19200  # stated: 19200 baud
  data_bits: 8      # stated: 8 data bits
  parity: none      # stated: no parity
  stop_bits: 1      # stated: 1 stop bit
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable     # inferred from SR/SRU/SRD routing commands
- levelable    # inferred from volume, bass, treble commands
- queryable    # inferred from GV/GR/GM/GB/GT/GZI query commands
```

## Actions
```yaml
- id: set_volume_zone
  label: Set Output Volume (per zone)
  kind: action
  command: "#|X001|web|SV{x}|{level}|U|{return}"
  params:
    - name: x
      type: integer
      description: Zone number (1-8)
    - name: level
      type: integer
      description: Volume in negative dB (0 = max, 70 = min)

- id: volume_up_zone
  label: Volume Up 3dB (per zone)
  kind: action
  command: "#|X001|web|SVU0{x}|0|U|{return}"
  params:
    - name: x
      type: integer
      description: Zone number (1-8)

- id: volume_down_zone
  label: Volume Down 3dB (per zone)
  kind: action
  command: "#|X001|web|SVD0{x}|0|U|{return}"
  params:
    - name: x
      type: integer
      description: Zone number (1-8)

- id: set_routing_zone
  label: Set Routing / Select Input (per zone)
  kind: action
  command: "#|X001|web|SR{x}|{input}|U|{return}"
  params:
    - name: x
      type: integer
      description: Zone number (1-8)
    - name: input
      type: integer
      description: Input number (0-8)

- id: routing_up_zone
  label: Routing Up (per zone)
  kind: action
  command: "#|X001|web|SRU0{x}|0|U|{return}"
  params:
    - name: x
      type: integer
      description: Zone number (1-8)

- id: routing_down_zone
  label: Routing Down (per zone)
  kind: action
  command: "#|X001|web|SRD0{x}|0|U|{return}"
  params:
    - name: x
      type: integer
      description: Zone number (1-8)

- id: set_bass_zone
  label: Set Bass (per zone)
  kind: action
  command: "#|X001|web|SB0{x}|{value}|U|{return}"
  params:
    - name: x
      type: integer
      description: Zone number (1-8)
    - name: value
      type: integer
      description: Bass level 0-14 (0=-14dB, 7=0dB, 14=+14dB, 2dB steps)

- id: set_treble_zone
  label: Set Treble (per zone)
  kind: action
  command: "#|X001|web|ST0{x}|{value}|U|{return}"
  params:
    - name: x
      type: integer
      description: Zone number (1-8)
    - name: value
      type: integer
      description: Treble level 0-14 (0=-14dB, 7=0dB, 14=+14dB, 2dB steps)

- id: set_mute_zone
  label: Set Mute (per zone)
  kind: action
  command: "#|X001|web|SM0{x}|{state}|U|{return}"
  params:
    - name: x
      type: integer
      description: Zone number (1-8)
    - name: state
      type: enum
      description: Mute state
      values: [0, 1]
      # 0 = disabled, 1 = output muted

- id: get_volume_all
  label: Get Volume All Zones
  kind: query
  command: "#|X001|web|GVALL|0|U|{return}"
  params: []

- id: get_routing_all
  label: Get Routing All Zones
  kind: query
  command: "#|X001|web|GRALL|0|U|{return}"
  params: []

- id: get_mute_all
  label: Get Mute All Zones
  kind: query
  command: "#|X001|web|GMALL|0|U|{return}"
  params: []

- id: get_volume_zone
  label: Get Volume (per zone)
  kind: query
  command: "#|X001|web|GV0{x}|0|U|{return}"
  params:
    - name: x
      type: integer
      description: Zone number (1-8)

- id: get_routing_zone
  label: Get Routing (per zone)
  kind: query
  command: "#|X001|web|GR0{x}|0|U|{return}"
  params:
    - name: x
      type: integer
      description: Zone number (1-8)

- id: get_mute_zone
  label: Get Mute (per zone)
  kind: query
  command: "#|X001|web|GM0{x}|0|U|{return}"
  params:
    - name: x
      type: integer
      description: Zone number (1-8)

- id: get_bass_zone
  label: Get Bass (per zone)
  kind: query
  command: "#|X001|web|GB0{x}|0|U|{return}"
  params:
    - name: x
      type: integer
      description: Zone number (1-8)

- id: get_treble_zone
  label: Get Treble (per zone)
  kind: query
  command: "#|X001|web|GT0{x}|0|U|{return}"
  params:
    - name: x
      type: integer
      description: Zone number (1-8)

- id: get_zone_info
  label: Get Full Zone Info (per zone)
  kind: query
  command: "#|X001|web|GZI0{x}|0|U|{return}"
  params:
    - name: x
      type: integer
      description: Zone number (1-8)

- id: save_settings
  label: Save Current Zone Settings
  kind: action
  command: "#|X001|web|SAVE|0|U|{return}"
  params: []

- id: factory_default
  label: Reset to Factory Defaults
  kind: action
  command: "#|X001|web|DEF|0|U|{return}"
  params: []

- id: get_firmware_version
  label: Get Firmware Version
  kind: query
  command: "#|X001|web|GSV|0|U|{return}"
  params: []
```

## Feedbacks
```yaml
- id: command_ack
  type: string
  description: MTX echoes command back with '+' as argument to acknowledge
  example: "#|web|X001|SV2|+|U|{return}"

- id: volume_update
  type: string
  description: Unsolicited volume update broadcast to all clients (per zone)
  example: "#|ALL|X001|V01|27|U|{return}"

- id: routing_update
  type: string
  description: Unsolicited routing update broadcast to all clients (per zone)
  example: "#|ALL|X001|R01|3|3dc5|{return}"

- id: bass_update
  type: string
  description: Unsolicited bass update broadcast to all clients (per zone)
  example: "#|ALL|X001|B01|8|9dc0|{return}"

- id: treble_update
  type: string
  description: Unsolicited treble update broadcast to all clients (per zone)
  example: "#|ALL|X001|T01|5|fbc6|{return}"

- id: mute_update
  type: string
  description: Unsolicited mute update broadcast to all clients (per zone)
  example: "#|ALL|X001|M01|1|32c6|{return}"

- id: volume_zone_state
  type: string
  description: Per-zone volume query response (Vxx|value)
  example: "#|web|X001|V01|20|U|{return}"

- id: routing_zone_state
  type: string
  description: Per-zone routing query response (Rxx|input)
  example: "#|web|X001|R01|3|U|{return}"

- id: mute_zone_state
  type: string
  description: Per-zone mute query response (Mxx|state)
  example: "#|web|X001|M01|0|U|{return}"

- id: bass_zone_state
  type: string
  description: Per-zone bass query response (Bxx|value)
  example: "#|web|X001|B01|07|U|{return}"

- id: treble_zone_state
  type: string
  description: Per-zone treble query response (Txx|value)
  example: "#|web|X001|T01|07|U|{return}"

- id: zone_full_info
  type: string
  description: Per-zone combined info response (ZIxx|vol^input^mute^bass^treble)
  example: "#|web|X001|ZI01|20^3^0^07^07|U|{return}"

- id: volume_all_zones
  type: string
  description: All-zones volume response (VALL|zones joined by '^')
  example: "#|web|X001|VALL|40^40^20^20^20^20^20^20|U|{return}"

- id: routing_all_zones
  type: string
  description: All-zones routing response (RALL|inputs joined by '^')
  example: "#|web|X001|RALL|3^1^1^1^1^1^1^1|U|{return}"

- id: mute_all_zones
  type: string
  description: All-zones mute response (MALL|states joined by '^')
  example: "#|web|X001|MALL|0^0^0^0^0^0^0^0|U|{return}"

- id: firmware_version
  type: string
  description: Firmware version response
  example: "#|web|X001|SV|V1.1|U|{return}"
```

## Variables
```yaml
# No discrete variables beyond the parameterized actions above.
# UNRESOLVED: remove this section if not applicable
```

## Events
```yaml
- id: volume_change_broadcast
  description: Broadcast to all clients when volume changes in any zone
  payload: "#|ALL|X001|V{xx}|{value}|{checksum}|{return}"

- id: routing_change_broadcast
  description: Broadcast to all clients when routing changes in any zone
  payload: "#|ALL|X001|R{xx}|{input}|{checksum}|{return}"

- id: bass_change_broadcast
  description: Broadcast to all clients when bass changes in any zone
  payload: "#|ALL|X001|B{xx}|{value}|{checksum}|{return}"

- id: treble_change_broadcast
  description: Broadcast to all clients when treble changes in any zone
  payload: "#|ALL|X001|T{xx}|{value}|{checksum}|{return}"

- id: mute_change_broadcast
  description: Broadcast to all clients when mute changes in any zone
  payload: "#|ALL|X001|M{xx}|{state}|{checksum}|{return}"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_default  # DEF resets ALL zone and device settings
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures documented in source
```

## Notes
- Device address is fixed at X001 and cannot be changed.
- Checksum is CRC-16 calculated over everything except the leading '#'. The literal character 'U' is always accepted as a valid checksum placeholder.
- Return terminator is CR+LF (0x0d 0x0a).
- Source address field max length 4 characters; cannot contain '|' or '#'.
- MTX accepts max 1 simultaneous TCP/IP connection.
- Volume, routing, and tone settings are lost on power-off unless explicitly saved with SAVE command.
- Website-configured settings are saved automatically on every change.
- Per documentation examples, GRALL query uses the command name GVALL in the request but RALL in the response (likely a typo in source).
- Inputs disabled in the website input selection menu are skipped during SRU/SRD routing up/down operations.
<!-- UNRESOLVED: exact zone count differences between MTX48 and MTX88 not clarified in source -->

## Provenance

```yaml
source_domains:
  - downloads.pvs.global
source_urls:
  - https://downloads.pvs.global/downloads/audac/products/manuals/MTX_Commands_Manual.pdf
retrieved_at: 2026-05-17T10:48:34.167Z
last_checked_at: 2026-08-19T08:27:37.161Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T08:27:37.161Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions (SVx, SVU0x, SVD0x, SRx, SRU0x, SRD0x, SB0x, ST0x, SM0x, GVALL, GRALL, GMALL, GV0x, GR0x, GM0x, GB0x, GT0x, GZI0x, SAVE, DEF, GSV) appear verbatim in the source with correct shapes; transport values port 5001, 19200 baud, 8 data bits, no parity, 1 stop bit also match source verbatim. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full enumeration of zones per model (MTX48 vs MTX88 zone counts)"
- "flow control not stated in source"
- "remove this section if not applicable"
- "no multi-step sequences described in source"
- "no explicit safety warnings or interlock procedures documented in source"
- "exact zone count differences between MTX48 and MTX88 not clarified in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
