---
spec_id: admin/allen-heath-cq-12t
schema_version: ai4av-public-spec-v1
revision: 1
title: "Allen & Heath CQ-12T Control Spec"
manufacturer: "Allen & Heath"
model_family: CQ-12T
aliases: []
compatible_with:
  manufacturers:
    - "Allen & Heath"
  models:
    - CQ-12T
  firmware: V1.2
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2024/06/CQ_MIDI_Protocol_V1_2_0_iss5.pdf
retrieved_at: 2026-07-21T23:37:09.884Z
last_checked_at: 2026-07-22T00:02:35.800Z
generated_at: 2026-07-22T00:02:35.800Z
firmware_coverage: V1.2
protocol_coverage: []
known_gaps:
  - "no power on/off, routing, or preset-store commands documented; no unsolicited feedback messages documented."
  - "source does not state IP address or base URL; client connects to the unit's IP on port 51325"
  - "response wire format for query commands not documented"
  - "no separate settable-parameter list beyond the action targets above;"
  - "source states \"The CQ does not send note on/off messages when a Soft Key"
  - "no multi-step macro sequences documented."
  - "source contains no safety warnings, interlock procedures, or power-on"
  - "response wire format for query 'get' commands not stated; firmware build number beyond \"V1.2 issue 5\" not stated."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:02:35.800Z
  matched_actions: 13
  action_count: 13
  confidence: medium
  summary: "All 13 spec actions matched verbatim in source with exact hex sequences and complete parameter encoding; bidirectional command coverage verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Allen & Heath CQ-12T Control Spec

## Summary
MIDI remote control protocol for the Allen & Heath CQ-12T digital mixer. Covers scene recall, SoftKey triggering via MIDI Note On/Off, and absolute/relative control of mute, level, and pan/balance via NRPN (CC-based) messages. Transport is MIDI over USB (USB-B port) or MIDI-over-TCP (Ethernet, port 51325). All control messaging uses MIDI Channel 1.

<!-- UNRESOLVED: no power on/off, routing, or preset-store commands documented; no unsolicited feedback messages documented. -->

## Transport
```yaml
protocols:
  - tcp        # MIDI over TCP/IP via network port
  - serial     # interpreted as MIDI-over-USB via USB-B (treated as a serial-class MIDI port)
addressing:
  port: 51325
  # UNRESOLVED: source does not state IP address or base URL; client connects to the unit's IP on port 51325
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable       # inferred from "Getting values" / get-command section
- levelable       # inferred from Levels (absolute and relative) section
- routable        # inferred from mute and pan/balance cross-point parameter numbering
```

## Actions
```yaml
# Scene change - bank change + program change on MIDI Channel 1
- id: scene_recall
  label: Scene Recall
  kind: action
  command: "B0 00 00 C0 {PG}"   # Bank 00 then Program PG; PG hex = scene number - 1
  params:
    - name: scene
      type: integer
      description: Scene number 1-128 (MIDI program value = scene - 1, so PG = scene - 1)

# Soft Key press (Note On, velocity 127)
- id: soft_key_press
  label: Soft Key Press
  kind: action
  command: "90 {SK} 7F"         # SK starts at C3 (0x30); each subsequent Soft Key increments SK by 1
  params:
    - name: soft_key
      type: integer
      description: Soft Key number 1-N (1 = C3 = 0x30)

# Soft Key release (Note Off)
- id: soft_key_release
  label: Soft Key Release
  kind: action
  command: "80 {SK} 00"
  params:
    - name: soft_key
      type: integer
      description: Soft Key number 1-N (1 = C3 = 0x30)

# Mute On - absolute
- id: mute_on
  label: Mute On (absolute)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 06 00 B0 26 01"
  params:
    - name: target
      type: string
      description: Mute parameter (MB/LB) for the desired input, output, FX return, DCA, or mute group

# Mute Off - absolute
- id: mute_off
  label: Mute Off (absolute)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 06 00 B0 26 00"
  params:
    - name: target
      type: string
      description: Mute parameter (MB/LB) for the desired input, output, FX return, DCA, or mute group

# Mute Toggle - NRPN increment (toggles mute state)
- id: mute_toggle
  label: Mute Toggle (increment)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 60 00"
  params:
    - name: target
      type: string
      description: Mute parameter (MB/LB); increment/decrement toggles mute state
  # NOTE: source explicitly excludes DCA Mute and Mute Group Mute from toggle operation

# Level - absolute (coarse + fine)
- id: level_set_absolute
  label: Set Level (absolute)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 06 {VC} B0 26 {VF}"
  params:
    - name: target
      type: string
      description: Level parameter (MB/LB) for the desired source-to-destination crosspoint
    - name: value_coarse
      type: string
      description: Coarse value byte (VC) from "Example Level Values" table
    - name: value_fine
      type: string
      description: Fine value byte (VF) from "Example Level Values" table

# Level +1 dB (increment)
- id: level_increment
  label: Level +1 dB
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 60 00"
  params:
    - name: target
      type: string
      description: Level parameter (MB/LB) for the desired crosspoint

# Level -1 dB (decrement)
- id: level_decrement
  label: Level -1 dB
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 61 00"
  params:
    - name: target
      type: string
      description: Level parameter (MB/LB) for the desired crosspoint

# Pan/Balance - absolute (coarse + fine)
- id: pan_set_absolute
  label: Set Pan/Balance (absolute)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 06 {VC} B0 26 {VF}"
  params:
    - name: target
      type: string
      description: Pan/Balance parameter (MB/LB) for the desired source-to-destination crosspoint
    - name: value_coarse
      type: string
      description: Coarse value byte (VC) from "Example Pan/Balance Values" table
    - name: value_fine
      type: string
      description: Fine value byte (VF) from "Example Pan/Balance Values" table

# Pan right one step (increment)
- id: pan_increment
  label: Pan Right (increment)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 60 00"
  params:
    - name: target
      type: string
      description: Pan/Balance parameter (MB/LB)

# Pan left one step (decrement)
- id: pan_decrement
  label: Pan Left (decrement)
  kind: action
  command: "B0 63 {MB} B0 62 {LB} B0 61 00"
  params:
    - name: target
      type: string
      description: Pan/Balance parameter (MB/LB)

# Query ('get') current value of mute / level / pan / balance / assignment
- id: query_value
  label: Query Parameter Value ('Get')
  kind: query
  command: "B0 63 {MB} B0 62 {LB} B0 60 7F"
  params:
    - name: target
      type: string
      description: Parameter (MB/LB) for the desired mute, level, pan/balance, or assignment to query
```

## Feedbacks
```yaml
# 'Get' command responses return the current value of the requested parameter.
# The exact response-byte sequence and which bytes encode value is not stated
# in the source - source says "return the current value" only.
# UNRESOLVED: response wire format for query commands not documented
```

## Variables
```yaml
# UNRESOLVED: no separate settable-parameter list beyond the action targets above;
# MSB/LSB parameter numbers themselves are the only "addresses" exposed by the protocol.
```

## Events
```yaml
# UNRESOLVED: source states "The CQ does not send note on/off messages when a Soft Key
# is pressed"; no other unsolicited event messages are documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on
# sequencing requirements.
```

## Notes
- All control messaging is on MIDI Channel 1 (status bytes use `B0`, `C0`, `90`, `80`).
- Only one TCP/IP MIDI connection is allowed at a time; further connections are refused.
- The CQ accepts both standard Note Off (`80 SK 00`) and zero-velocity Note On (`90 SK 00`) for Soft Key release; either form is valid.
- Octave designation of `C3` may differ between hosts (some use `C2`/`C4`); if Soft Key 1 does not respond to `0x30`, try `0x24` or `0x3C`.
- Parameter tables are model-specific (CQ-12T); the same Allen & Heath MIDI surface family shares this encoding across CQ-series mixers.

<!-- UNRESOLVED: response wire format for query 'get' commands not stated; firmware build number beyond "V1.2 issue 5" not stated. -->

## Provenance

```yaml
source_domains:
  - allen-heath.com
source_urls:
  - https://www.allen-heath.com/content/uploads/2024/06/CQ_MIDI_Protocol_V1_2_0_iss5.pdf
retrieved_at: 2026-07-21T23:37:09.884Z
last_checked_at: 2026-07-22T00:02:35.800Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:02:35.800Z
matched_actions: 13
action_count: 13
confidence: medium
summary: "All 13 spec actions matched verbatim in source with exact hex sequences and complete parameter encoding; bidirectional command coverage verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no power on/off, routing, or preset-store commands documented; no unsolicited feedback messages documented."
- "source does not state IP address or base URL; client connects to the unit's IP on port 51325"
- "response wire format for query commands not documented"
- "no separate settable-parameter list beyond the action targets above;"
- "source states \"The CQ does not send note on/off messages when a Soft Key"
- "no multi-step macro sequences documented."
- "source contains no safety warnings, interlock procedures, or power-on"
- "response wire format for query 'get' commands not stated; firmware build number beyond \"V1.2 issue 5\" not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
