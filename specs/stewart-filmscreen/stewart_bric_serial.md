---
spec_id: admin/stewart-bric
schema_version: ai4av-public-spec-v1
revision: 1
title: "Stewart Filmscreen BRIC Masking Controller Control Spec"
manufacturer: "Stewart Filmscreen"
model_family: "BRIC Masking Controller"
aliases: []
compatible_with:
  manufacturers:
    - "Stewart Filmscreen"
  models:
    - "BRIC Masking Controller"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - convergingsystems.com
  - applicationmarket.crestron.com
source_urls:
  - https://www.convergingsystems.com/bin/doc/bric/bric_programmerstoolkit_V0100.pdf
  - https://applicationmarket.crestron.com/content/Help/Stewart_Filmscreen/stewart_filmscreen_bric_v1_0_help.pdf
retrieved_at: 2026-06-01T23:15:20.502Z
last_checked_at: 2026-06-04T06:32:24.202Z
generated_at: 2026-06-04T06:32:24.202Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version not stated in source. Address range beyond 01-04 (max 04) implied by syntax table but not stated."
  - "no explicit power on/off commands in source"
  - "no input routing commands in source"
  - "no query commands in source"
  - "source documents no query commands and no response/acknowledgement strings."
  - "source does not document any settable parameters beyond per-command payload (address byte)."
  - "source documents no unsolicited notifications."
  - "source documents no multi-step sequences."
  - "source does not document explicit safety warnings, interlock procedures,"
  - "feedback/response strings, query commands, event notifications, macros, and safety interlocks are not documented in the source."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:32:24.202Z
  matched_actions: 29
  action_count: 29
  confidence: medium
  summary: "All 29 spec actions matched literally to Table 1 command keys; transport parameters verified against protocol specification. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Stewart Filmscreen BRIC Masking Controller Control Spec

## Summary
The Stewart Filmscreen BRIC is a motorised masking controller for projection screens. This spec covers its RS-232C serial command set, including per-channel motor up/down/stop, nine programmable presets, and preset storage. Communication is via a fixed-format dot-delimited message on an RJ45 jack (connector J6).

<!-- UNRESOLVED: firmware version not stated in source. Address range beyond 01-04 (max 04) implied by syntax table but not stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source column "Hand-Shaking" = None
auth:
  type: none  # inferred: no auth procedure in source
```

**Connector:** RJ45 jack (J6) on BRIC controller. Pinout for DB-9 interface cable construction: Pin 1 RTS, Pin 2 CTS, Pin 3 GND, Pin 4 TX, Pin 5 GND, Pin 6 RX, Pin 7 +485, Pin 8 -485. Source does not state any port number; this is a direct-attached serial link, not a TCP port.

## Traits
```yaml
# Inferred from command set:
- powerable       # UNRESOLVED: no explicit power on/off commands in source
- routable        # UNRESOLVED: no input routing commands in source
- queryable       # UNRESOLVED: no query commands in source
```

## Actions
```yaml
# All command keys from Table 1 enumerated.
# Message format: #<XX>.<YY><CR>
# where XX = unique address (factory default 01, valid 01-04 per syntax table)
#       YY = command key
#       <CR> = carriage return (0x0D). Source explicitly states "definitely not a LINE FEED".

- id: channel_a_up
  label: Channel A Up
  kind: action
  command: "#{address}.UA"   # followed by CR (0x0D)
  params:
    - name: address
      type: string
      description: Unique unit address. Factory default 01. Valid range 01-04 per syntax table.
      default: "01"

- id: channel_b_up
  label: Channel B Up
  kind: action
  command: "#{address}.UB"
  params:
    - name: address
      type: string
      default: "01"

- id: channel_c_up
  label: Channel C Up / Close
  kind: action
  command: "#{address}.UC"
  params:
    - name: address
      type: string
      default: "01"

- id: channel_a_down
  label: Channel A Down
  kind: action
  command: "#{address}.DA"
  params:
    - name: address
      type: string
      default: "01"

- id: channel_b_down
  label: Channel B Down
  kind: action
  command: "#{address}.DB"
  params:
    - name: address
      type: string
      default: "01"

- id: channel_c_down
  label: Channel C Down
  kind: action
  command: "#{address}.DC"
  params:
    - name: address
      type: string
      default: "01"

- id: move_to_preset_0
  label: Move to Preset 0 (Home)
  kind: action
  command: "#{address}.M0"
  params:
    - name: address
      type: string
      default: "01"

- id: move_to_preset_1
  label: Move to Preset 1
  kind: action
  command: "#{address}.M1"
  params:
    - name: address
      type: string
      default: "01"

- id: move_to_preset_2
  label: Move to Preset 2
  kind: action
  command: "#{address}.M2"
  params:
    - name: address
      type: string
      default: "01"

- id: move_to_preset_3
  label: Move to Preset 3
  kind: action
  command: "#{address}.M3"
  params:
    - name: address
      type: string
      default: "01"

- id: move_to_preset_4
  label: Move to Preset 4
  kind: action
  command: "#{address}.M4"
  params:
    - name: address
      type: string
      default: "01"

- id: move_to_preset_5
  label: Move to Preset 5
  kind: action
  command: "#{address}.M5"
  params:
    - name: address
      type: string
      default: "01"

- id: move_to_preset_6
  label: Move to Preset 6
  kind: action
  command: "#{address}.M6"
  params:
    - name: address
      type: string
      default: "01"

- id: move_to_preset_7
  label: Move to Preset 7
  kind: action
  command: "#{address}.M7"
  params:
    - name: address
      type: string
      default: "01"

- id: move_to_preset_8
  label: Move to Preset 8
  kind: action
  command: "#{address}.M8"
  params:
    - name: address
      type: string
      default: "01"

- id: move_to_preset_9
  label: Move to Preset 9
  kind: action
  command: "#{address}.M9"
  params:
    - name: address
      type: string
      default: "01"

- id: preset_0_not_implemented
  label: Preset 0 (Not Implemented)
  kind: action
  command: "#{address}.P0"
  params:
    - name: address
      type: string
      default: "01"
  notes: Source lists P0 as "Not Implemented".

- id: store_preset_1
  label: Store Preset 1
  kind: action
  command: "#{address}.P1"
  params:
    - name: address
      type: string
      default: "01"

- id: store_preset_2
  label: Store Preset 2
  kind: action
  command: "#{address}.P2"
  params:
    - name: address
      type: string
      default: "01"

- id: store_preset_3
  label: Store Preset 3
  kind: action
  command: "#{address}.P3"
  params:
    - name: address
      type: string
      default: "01"

- id: store_preset_4
  label: Store Preset 4
  kind: action
  command: "#{address}.P4"
  params:
    - name: address
      type: string
      default: "01"

- id: store_preset_5
  label: Store Preset 5
  kind: action
  command: "#{address}.P5"
  params:
    - name: address
      type: string
      default: "01"

- id: store_preset_6
  label: Store Preset 6
  kind: action
  command: "#{address}.P6"
  params:
    - name: address
      type: string
      default: "01"

- id: store_preset_7
  label: Store Preset 7
  kind: action
  command: "#{address}.P7"
  params:
    - name: address
      type: string
      default: "01"

- id: store_preset_8
  label: Store Preset 8
  kind: action
  command: "#{address}.P8"
  params:
    - name: address
      type: string
      default: "01"

- id: store_preset_9
  label: Store Preset 9
  kind: action
  command: "#{address}.P9"
  params:
    - name: address
      type: string
      default: "01"

- id: stop_motor_a
  label: Stop Motor Channel A
  kind: action
  command: "#{address}.SA"
  params:
    - name: address
      type: string
      default: "01"

- id: stop_motor_b
  label: Stop Motor Channel B
  kind: action
  command: "#{address}.SB"
  params:
    - name: address
      type: string
      default: "01"

- id: stop_motor_c
  label: Stop Motor Channel C
  kind: action
  command: "#{address}.SC"
  params:
    - name: address
      type: string
      default: "01"
```

## Feedbacks
```yaml
# UNRESOLVED: source documents no query commands and no response/acknowledgement strings.
# All Actions in source are one-way fire-and-forget motor commands.
```

## Variables
```yaml
# UNRESOLVED: source does not document any settable parameters beyond per-command payload (address byte).
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
# Implicit behaviour noted: "the Door if provided (usually Channel C), it will close automatically
# when both Screen and Mask are thoroughly retracted." - this is device-internal, not user-invoked.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document explicit safety warnings, interlock procedures,
# or power-on sequencing requirements.
```

## Notes
- Message terminator is CR (0x0D) only. Source explicitly states "definitely not a LINE FEED".
- Address byte XX: factory default 01. Syntax table lists 01/02/03/04 as unique addresses; multi-BRIC systems may have factory-assigned non-default addresses.
- Serial parameters (19200/8/N/1, no handshaking) are fixed at the device and cannot be changed via software.
- Pinout for host-side DB-9 interface cable: BRIC J6 pins — 1 RTS, 2 CTS, 3 GND, 4 TX, 5 GND, 6 RX, 7 +485, 8 -485. Source leaves DB-9 host pinout to the integrator.
- P0 is reserved and listed as "Not Implemented" by the manufacturer.
- The "M" command set moves the mask to a stored preset; the "P" command set stores the current position as a preset. M0 = home position.

<!-- UNRESOLVED: feedback/response strings, query commands, event notifications, macros, and safety interlocks are not documented in the source. -->

## Provenance

```yaml
source_domains:
  - convergingsystems.com
  - applicationmarket.crestron.com
source_urls:
  - https://www.convergingsystems.com/bin/doc/bric/bric_programmerstoolkit_V0100.pdf
  - https://applicationmarket.crestron.com/content/Help/Stewart_Filmscreen/stewart_filmscreen_bric_v1_0_help.pdf
retrieved_at: 2026-06-01T23:15:20.502Z
last_checked_at: 2026-06-04T06:32:24.202Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:32:24.202Z
matched_actions: 29
action_count: 29
confidence: medium
summary: "All 29 spec actions matched literally to Table 1 command keys; transport parameters verified against protocol specification. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version not stated in source. Address range beyond 01-04 (max 04) implied by syntax table but not stated."
- "no explicit power on/off commands in source"
- "no input routing commands in source"
- "no query commands in source"
- "source documents no query commands and no response/acknowledgement strings."
- "source does not document any settable parameters beyond per-command payload (address byte)."
- "source documents no unsolicited notifications."
- "source documents no multi-step sequences."
- "source does not document explicit safety warnings, interlock procedures,"
- "feedback/response strings, query commands, event notifications, macros, and safety interlocks are not documented in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
