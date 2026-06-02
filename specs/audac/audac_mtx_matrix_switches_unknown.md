---
spec_id: admin/audac-mtx-matrix-switches
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audac MTX Matrix Switches Control Spec"
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
  - https://downloads.pvs.global/downloads/audac/products/manuals/MTX48_88_UserManual.pdf
retrieved_at: 2026-05-27T13:53:21.367Z
last_checked_at: 2026-06-02T00:05:00.608Z
generated_at: 2026-06-02T00:05:00.608Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "MTX48 exact input/output channel counts not stated in source; source input/output lists enumerate 8 inputs and 8 outputs."
  - "power on/off commands not present in this protocol manual."
  - "flow control not stated in source"
  - "no explicit safety warnings, interlocks, or power-on sequencing requirements found in source."
  - "RS-485 termination / address scheme not stated in source."
  - "TCP/IP authentication (if any) not stated in source."
  - "Maximum command rate, latency, and timeout behavior not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T00:05:00.608Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 spec actions matched literally in source with exact parameter shapes and transport values verified. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Audac MTX Matrix Switches Control Spec

## Summary
ASCII pipe-delimited command protocol for Audac MTX48 and MTX88 audio matrix switches. Same command set accepted over RS-232, RS-485, and TCP/IP. Covers per-zone volume, routing, bass, treble, mute, plus all-zone queries, settings save, factory reset, and firmware version query.

<!-- UNRESOLVED: MTX48 exact input/output channel counts not stated in source; source input/output lists enumerate 8 inputs and 8 outputs. -->
<!-- UNRESOLVED: power on/off commands not present in this protocol manual. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
addressing:
  port: 5001
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable        # inferred from SRx routing command examples
- levelable       # inferred from SVx volume, SB0x bass, ST0x treble examples
- queryable       # inferred from GVALL/GRALL/GMALL/GV0x/GR0x/GM0x/GB0x/GT0x/GZI0x query examples
```

## Actions
```yaml
# Frame format (verbatim from source):
#   #|X001|<source>|<command>|<args>|<checksum>|<CR><LF>
# - startsymbol '#'
# - destination 'X001' (fixed)
# - source: any string up to 4 chars, no '|' or '#'
# - checksum: CRC-16 of bytes excluding '#', or 'U' (always accepted)
# - return: 0x0d 0x0a

- id: set_volume_zone
  label: Set Output Volume of a Zone
  kind: action
  command: "#|X001|{source}|SV{zone}|{level}|{checksum}|<CR><LF>"
  params:
    - name: zone
      type: integer
      description: Zone number (1-8)
    - name: level
      type: integer
      description: Volume in negative dB (0 = maximum, 70 = minimum)

- id: set_volume_up_zone
  label: Set Volume Up 3dB in a Zone
  kind: action
  command: "#|X001|{source}|SVU0{zone}|0|{checksum}|<CR><LF>"
  params:
    - name: zone
      type: integer
      description: Zone number (1-8)

- id: set_volume_down_zone
  label: Set Volume Down 3dB in a Zone
  kind: action
  command: "#|X001|{source}|SVD0{zone}|0|{checksum}|<CR><LF>"
  params:
    - name: zone
      type: integer
      description: Zone number (1-8)

- id: set_routing_zone
  label: Set Routing (Input Select) in a Zone
  kind: action
  command: "#|X001|{source}|SR{zone}|{input}|{checksum}|<CR><LF>"
  params:
    - name: zone
      type: integer
      description: Zone number (1-8)
    - name: input
      type: integer
      description: Input number (0-8)

- id: set_routing_up_zone
  label: Set Routing Up in a Zone
  kind: action
  command: "#|X001|{source}|SRU0{zone}|0|{checksum}|<CR><LF>"
  params:
    - name: zone
      type: integer
      description: Zone number (1-8)

- id: set_routing_down_zone
  label: Set Routing Down in a Zone
  kind: action
  command: "#|X001|{source}|SRD0{zone}|0|{checksum}|<CR><LF>"
  params:
    - name: zone
      type: integer
      description: Zone number (1-8)

- id: set_bass_zone
  label: Set Bass in a Zone
  kind: action
  command: "#|X001|{source}|SB0{zone}|{value}|{checksum}|<CR><LF>"
  params:
    - name: zone
      type: integer
      description: Zone number (1-8)
    - name: value
      type: integer
      description: Bass value 0-14 (-14dB to +14dB in 2dB steps, 7 = 0dB)

- id: set_treble_zone
  label: Set Treble in a Zone
  kind: action
  command: "#|X001|{source}|ST0{zone}|{value}|{checksum}|<CR><LF>"
  params:
    - name: zone
      type: integer
      description: Zone number (1-8)
    - name: value
      type: integer
      description: Treble value 0-14 (-14dB to +14dB in 2dB steps, 7 = 0dB)

- id: set_mute_zone
  label: Set Mute State in a Zone
  kind: action
  command: "#|X001|{source}|SM0{zone}|{state}|{checksum}|<CR><LF>"
  params:
    - name: zone
      type: integer
      description: Zone number (1-8)
    - name: state
      type: enum
      values: ["0", "1"]
      description: "0 = mute disabled, 1 = output muted"

- id: get_volume_all
  label: Get Volume for All Zones
  kind: query
  command: "#|X001|{source}|GVALL|0|{checksum}|<CR><LF>"
  params: []

- id: get_routing_all
  label: Get Routing for All Zones
  kind: query
  command: "#|X001|{source}|GRALL|0|{checksum}|<CR><LF>"
  params: []

- id: get_mute_all
  label: Get Mute for All Zones
  kind: query
  command: "#|X001|{source}|GMALL|0|{checksum}|<CR><LF>"
  params: []

- id: get_volume_zone
  label: Get Volume for a Zone
  kind: query
  command: "#|X001|{source}|GV0{zone}|0|{checksum}|<CR><LF>"
  params:
    - name: zone
      type: integer
      description: Zone number (1-8)

- id: get_routing_zone
  label: Get Routing for a Zone
  kind: query
  command: "#|X001|{source}|GR0{zone}|0|{checksum}|<CR><LF>"
  params:
    - name: zone
      type: integer
      description: Zone number (1-8)

- id: get_mute_zone
  label: Get Mute for a Zone
  kind: query
  command: "#|X001|{source}|GM0{zone}|0|{checksum}|<CR><LF>"
  params:
    - name: zone
      type: integer
      description: Zone number (1-8)

- id: get_bass_zone
  label: Get Bass for a Zone
  kind: query
  command: "#|X001|{source}|GB0{zone}|0|{checksum}|<CR><LF>"
  params:
    - name: zone
      type: integer
      description: Zone number (1-8)

- id: get_treble_zone
  label: Get Treble for a Zone
  kind: query
  command: "#|X001|{source}|GT0{zone}|0|{checksum}|<CR><LF>"
  params:
    - name: zone
      type: integer
      description: Zone number (1-8)

- id: get_zone_info
  label: Get Volume, Routing, Mute, Bass, Treble for One Zone
  kind: query
  command: "#|X001|{source}|GZI0{zone}|0|{checksum}|<CR><LF>"
  params:
    - name: zone
      type: integer
      description: Zone number (1-8)

- id: save_settings
  label: Save Current Zone Settings
  kind: action
  command: "#|X001|{source}|SAVE|0|{checksum}|<CR><LF>"
  params: []

- id: factory_default_reset
  label: Reset All Zone and Device Settings to Factory Default
  kind: action
  command: "#|X001|{source}|DEF|0|{checksum}|<CR><LF>"
  params: []

- id: get_firmware_version
  label: Get Firmware Version
  kind: query
  command: "#|X001|{source}|GSV|0|{checksum}|<CR><LF>"
  params: []
```

## Feedbacks
```yaml
- id: volume_all_zones
  type: string
  description: Per-zone volume levels, caret-delimited (e.g. "40^40^20^20^20^20^20^20"). Reply to GVALL: tag `VALL`.
- id: routing_all_zones
  type: string
  description: Per-zone input routing, caret-delimited. Reply to GRALL: tag `RALL`.
- id: mute_all_zones
  type: string
  description: Per-zone mute state, caret-delimited (0/1). Reply to GMALL: tag `MALL`.
- id: volume_zone
  type: integer
  description: Per-zone volume (negative dB, 0 = max, 70 = min). Reply to GV0x: tag `V0x`.
- id: routing_zone
  type: integer
  description: Per-zone input (0-8). Reply to GR0x: tag `R0x`.
- id: mute_zone
  type: integer
  description: Per-zone mute (0 or 1). Reply to GM0x: tag `M0x`.
- id: bass_zone
  type: integer
  description: Per-zone bass (0-14, 7 = 0dB). Reply to GB0x: tag `B0x`.
- id: treble_zone
  type: integer
  description: Per-zone treble (0-14, 7 = 0dB). Reply to GT0x: tag `T0x`.
- id: zone_info
  type: string
  description: Zone info pack (volume^routing^mute^bass^treble), caret-delimited. Reply to GZI0x: tag `ZI0x`.
- id: firmware_version
  type: string
  description: Firmware version string (e.g. "V1.1"). Reply to GSV: tag `SV`.
- id: command_ack
  type: string
  description: Acknowledgement echoing the command with "+" as the argument. Source address is the original client source.
- id: state_update
  type: string
  description: Unsolicited state update broadcast to all clients. Destination "ALL"; tag and value describe the change (e.g. V01, R01, B01, T01, M01).
```

## Events
```yaml
- id: zone_volume_update
  description: Broadcast when a zone volume changes. Format `#|ALL|X001|V{zone}|{level}|{checksum}|<CR><LF>`.
- id: zone_routing_update
  description: Broadcast when a zone routing changes. Format `#|ALL|X001|R{zone}|{input}|{checksum}|<CR><LF>`.
- id: zone_bass_update
  description: Broadcast when a zone bass changes. Format `#|ALL|X001|B{zone}|{value}|{checksum}|<CR><LF>`.
- id: zone_treble_update
  description: Broadcast when a zone treble changes. Format `#|ALL|X001|T{zone}|{value}|{checksum}|<CR><LF>`.
- id: zone_mute_update
  description: Broadcast when a zone mute state changes. Format `#|ALL|X001|M{zone}|{state}|{checksum}|<CR><LF>`.
```

## Safety
```yaml
confirmation_required_for:
  - factory_default_reset  # DEF resets all zone and device settings to factory default
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing requirements found in source.
```

## Notes
Address fixed at `X001` for all destinations. Checksum is CRC-16 computed over the frame bytes excluding the leading `#`; sending `U` is always accepted as a checksum bypass. Source address is any string up to 4 characters and cannot contain `|` or `#`. Frame terminator is `<CR><LF>` (0x0d 0x0a). TCP/IP accepts maximum 1 simultaneous connection on port 5001. All volume, routing, and tone settings are lost on power off unless persisted with the `SAVE` command; settings changed via the device's web configuration page are saved automatically. Routing up/down commands skip inputs disabled in the web input selection menu. Source documents 8 inputs and 8 outputs; MTX48 (4-zone) channel range not explicitly stated in this protocol document.

<!-- UNRESOLVED: RS-485 termination / address scheme not stated in source. -->
<!-- UNRESOLVED: TCP/IP authentication (if any) not stated in source. -->
<!-- UNRESOLVED: Maximum command rate, latency, and timeout behavior not stated in source. -->

## Provenance

```yaml
source_domains:
  - downloads.pvs.global
source_urls:
  - https://downloads.pvs.global/downloads/audac/products/manuals/MTX_Commands_Manual.pdf
  - https://downloads.pvs.global/downloads/audac/products/manuals/MTX48_88_UserManual.pdf
retrieved_at: 2026-05-27T13:53:21.367Z
last_checked_at: 2026-06-02T00:05:00.608Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T00:05:00.608Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 spec actions matched literally in source with exact parameter shapes and transport values verified. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "MTX48 exact input/output channel counts not stated in source; source input/output lists enumerate 8 inputs and 8 outputs."
- "power on/off commands not present in this protocol manual."
- "flow control not stated in source"
- "no explicit safety warnings, interlocks, or power-on sequencing requirements found in source."
- "RS-485 termination / address scheme not stated in source."
- "TCP/IP authentication (if any) not stated in source."
- "Maximum command rate, latency, and timeout behavior not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
