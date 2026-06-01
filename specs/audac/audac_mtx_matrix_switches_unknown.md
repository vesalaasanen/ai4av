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
  - audac.eu
source_urls:
  - https://downloads.pvs.global/downloads/audac/products/manuals/MTX_Commands_Manual.pdf
  - https://audac.eu/eu/products/d/m2---multimedia-digital-audio-mixer
retrieved_at: 2026-05-27T13:53:21.367Z
last_checked_at: 2026-05-27T15:34:22.160Z
generated_at: 2026-05-27T15:34:22.160Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-27T15:34:22.160Z
  matched_actions: 126
  action_count: 126
  confidence: high
  summary: "All 126 spec actions matched literally in source; transport parameters verified; complete bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Audac MTX Matrix Switches Control Spec

## Summary
AUDAC MTX48 (4-zone) and MTX88 (8-zone) matrix audio switchers. Control via RS-232, RS-485, or TCP/IP on port 5001. Protocol: ASCII commands delimited by `#|`, with CRC-16 checksum or universal checksum `U`. All zone settings (volume, routing, bass, treble) lost on power-off unless saved with SAVE command. Supports per-zone volume, routing, bass, treble, mute control. 8 inputs (Mic 1, Mic 2, Line 3-6, WLI/MWX65, WMI).

<!-- UNRESOLVED: RS-485 specific wiring/pinout not documented in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 5001serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: power state controls documented
- routable   # inferred: per-zone input routing commands present
- queryable  # inferred: get commands for all parameters present
- levelable  # inferred: volume/bass/treble level commands present
```

## Actions
```yaml
- id: sv1  label: Set Volume Zone 1
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level 0-70 (0=maximum, 70=minimum, value = -dB)
- id: sv2
  label: Set Volume Zone 2
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level 0-70 (0=maximum, 70=minimum, value = -dB)
- id: sv3
  label: Set Volume Zone 3
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level 0-70 (0=maximum, 70=minimum, value = -dB)
- id: sv4
  label: Set Volume Zone 4
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level 0-70 (0=maximum, 70=minimum, value = -dB)
- id: sv5
  label: Set Volume Zone 5
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level 0-70 (0=maximum, 70=minimum, value = -dB)
- id: sv6
  label: Set Volume Zone 6
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level 0-70 (0=maximum, 70=minimum, value = -dB)
- id: sv7
  label: Set Volume Zone 7
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level 0-70 (0=maximum, 70=minimum, value = -dB)
- id: sv8
  label: Set Volume Zone 8
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level 0-70 (0=maximum, 70=minimum, value = -dB)
- id: svu01
  label: Volume Up Zone 1
  kind: action
  params: []
- id: svu02
  label: Volume Up Zone 2
  kind: action
  params: []
- id: svu03
  label: Volume Up Zone 3
  kind: action
  params: []
- id: svu04
  label: Volume Up Zone 4
  kind: action
  params: []
- id: svu05
  label: Volume Up Zone 5
  kind: action
  params: []
- id: svu06
  label: Volume Up Zone 6
  kind: action
  params: []
- id: svu07
  label: Volume Up Zone 7
  kind: action
  params: []
- id: svu08
  label: Volume Up Zone 8
  kind: action
  params: []
- id: svd01
  label: Volume Down Zone 1
  kind: action
  params: []
- id: svd02
  label: Volume Down Zone 2
  kind: action
  params: []
- id: svd03
  label: Volume Down Zone 3
  kind: action
  params: []
- id: svd04
  label: Volume Down Zone 4
  kind: action
  params: []
- id: svd05
  label: Volume Down Zone 5
  kind: action
  params: []
- id: svd06
  label: Volume Down Zone 6
  kind: action
  params: []
- id: svd07
  label: Volume Down Zone 7
  kind: action
  params: []
- id: svd08
  label: Volume Down Zone 8
  kind: action
  params: []
- id: sr1
  label: Set Routing Zone 1
  kind: action
  params:
    - name: input
      type: integer
      description: Input number 0-8 (0=none/disable)
- id: sr2
  label: Set Routing Zone 2
  kind: action
  params:
    - name: input
      type: integer
      description: Input number 0-8 (0=none/disable)
- id: sr3
  label: Set Routing Zone 3
  kind: action
  params:
    - name: input
      type: integer
      description: Input number 0-8 (0=none/disable)
- id: sr4
  label: Set Routing Zone 4
  kind: action
  params:
    - name: input
      type: integer
      description: Input number 0-8 (0=none/disable)
- id: sr5
  label: Set Routing Zone 5
  kind: action
  params:
    - name: input
      type: integer
      description: Input number 0-8 (0=none/disable)
- id: sr6
  label: Set Routing Zone 6
  kind: action
  params:
    - name: input
      type: integer
      description: Input number 0-8 (0=none/disable)
- id: sr7
  label: Set Routing Zone 7
  kind: action
  params:
    - name: input
      type: integer
      description: Input number 0-8 (0=none/disable)
- id: sr8
  label: Set Routing Zone 8
  kind: action
  params:
    - name: input
      type: integer
      description: Input number 0-8 (0=none/disable)
- id: sru01
  label: Routing Up Zone 1
  kind: action
  params: []
- id: sru02
  label: Routing Up Zone 2
  kind: action
  params: []
- id: sru03
  label: Routing Up Zone 3
  kind: action
  params: []
- id: sru04
  label: Routing Up Zone 4
  kind: action
  params: []
- id: sru05
  label: Routing Up Zone 5
  kind: action
  params: []
- id: sru06
  label: Routing Up Zone 6
  kind: action
  params: []
- id: sru07
  label: Routing Up Zone 7
  kind: action
  params: []
- id: sru08
  label: Routing Up Zone 8
  kind: action
  params: []
- id: srd01
  label: Routing Down Zone 1
  kind: action
  params: []
- id: srd02
  label: Routing Down Zone 2
  kind: action
  params: []
- id: srd03
  label: Routing Down Zone 3
  kind: action
  params: []
- id: srd04
  label: Routing Down Zone 4
  kind: action
  params: []
- id: srd05
  label: Routing Down Zone 5
  kind: action
  params: []
- id: srd06
  label: Routing Down Zone 6
  kind: action
  params: []
- id: srd07
  label: Routing Down Zone 7
  kind: action
  params: []
- id: srd08
  label: Routing Down Zone 8
  kind: action
  params: []
- id: sb01
  label: Set Bass Zone 1
  kind: action
  params:
    - name: bass
      type: integer
      description: Bass level 0-14 (0=-14dB, 7=0dB, 14=+14dB,2dB steps)
- id: sb02
  label: Set Bass Zone 2
  kind: action
  params:
    - name: bass
      type: integer
      description: Bass level 0-14 (0=-14dB, 7=0dB, 14=+14dB, 2dB steps)
- id: sb03
  label: Set Bass Zone 3
  kind: action
  params:
    - name: bass
      type: integer
      description: Bass level 0-14 (0=-14dB, 7=0dB, 14=+14dB, 2dB steps)
- id: sb04
  label: Set Bass Zone 4
  kind: action
  params:
    - name: bass
      type: integer
      description: Bass level 0-14 (0=-14dB, 7=0dB, 14=+14dB, 2dB steps)
- id: sb05
  label: Set Bass Zone 5
  kind: action
  params:
    - name: bass
      type: integer
      description: Bass level 0-14 (0=-14dB, 7=0dB, 14=+14dB, 2dB steps)
- id: sb06
  label: Set Bass Zone 6
  kind: action
  params:
    - name: bass
      type: integer
      description: Bass level 0-14 (0=-14dB, 7=0dB, 14=+14dB, 2dB steps)
- id: sb07
  label: Set Bass Zone 7
  kind: action
  params:
    - name: bass
      type: integer
      description: Bass level 0-14 (0=-14dB, 7=0dB, 14=+14dB, 2dB steps)
- id: sb08
  label: Set Bass Zone 8
  kind: action
  params:
    - name: bass
      type: integer
      description: Bass level 0-14 (0=-14dB, 7=0dB, 14=+14dB, 2dB steps)
- id: st01
  label: Set Treble Zone 1
  kind: action
  params:
    - name: treble
      type: integer
      description: Treble level 0-14 (0=-14dB, 7=0dB, 14=+14dB, 2dB steps)
- id: st02
  label: Set Treble Zone 2
  kind: action
  params:
    - name: treble
      type: integer
      description: Treble level 0-14 (0=-14dB, 7=0dB, 14=+14dB, 2dB steps)
- id: st03
  label: Set Treble Zone 3
  kind: action
  params:
    - name: treble
      type: integer
      description: Treble level 0-14 (0=-14dB, 7=0dB, 14=+14dB, 2dB steps)
- id: st04
  label: Set Treble Zone 4
  kind: action
  params:
    - name: treble
      type: integer
      description: Treble level 0-14 (0=-14dB, 7=0dB, 14=+14dB, 2dB steps)
- id: st05
  label: Set Treble Zone 5
  kind: action
  params:
    - name: treble
      type: integer
      description: Treble level 0-14 (0=-14dB, 7=0dB, 14=+14dB, 2dB steps)
- id: st06
  label: Set Treble Zone 6
  kind: action
  params:
    - name: treble
      type: integer
      description: Treble level 0-14 (0=-14dB, 7=0dB, 14=+14dB, 2dB steps)
- id: st07
  label: Set Treble Zone 7
  kind: action
  params:
    - name: treble
      type: integer
      description: Treble level 0-14 (0=-14dB, 7=0dB, 14=+14dB, 2dB steps)
- id: st08
  label: Set Treble Zone 8
  kind: action
  params:
    - name: treble
      type: integer
      description: Treble level 0-14 (0=-14dB, 7=0dB, 14=+14dB, 2dB steps)
- id: sm01
  label: Set Mute Zone 1
  kind: action
  params:
    - name: mute
      type: integer
      description: Mute state 0=off, 1=muted
- id: sm02
  label: Set Mute Zone 2
  kind: action
  params:
    - name: mute
      type: integer
      description: Mute state 0=off, 1=muted
- id: sm03
  label: Set Mute Zone 3
  kind: action
  params:
    - name: mute
      type: integer
      description: Mute state 0=off, 1=muted
- id: sm04
  label: Set Mute Zone 4
  kind: action
  params:
    - name: mute
      type: integer
      description: Mute state 0=off, 1=muted
- id: sm05
  label: Set Mute Zone 5
  kind: action
  params:
    - name: mute
      type: integer
      description: Mute state 0=off, 1=muted
- id: sm06
  label: Set Mute Zone 6
  kind: action
  params:
    - name: mute
      type: integer
      description: Mute state 0=off, 1=muted
- id: sm07
  label: Set Mute Zone 7
  kind: action
  params:
    - name: mute
      type: integer
      description: Mute state 0=off, 1=muted
- id: sm08
  label: Set Mute Zone 8
  kind: action
  params:
    - name: mute
      type: integer
      description: Mute state 0=off, 1=muted
- id: gvall  label: Get Volume All Zones
  kind: query
  params: []
- id: grall
  label: Get Routing All Zones
  kind: query
  params: []
- id: gmall
  label: Get Mute All Zones
  kind: query
  params: []
- id: gv01
  label: Get Volume Zone 1
  kind: query
  params: []
- id: gv02
  label: Get Volume Zone 2
  kind: query
  params: []
- id: gv03
  label: Get Volume Zone 3
  kind: query
  params: []
- id: gv04
  label: Get Volume Zone 4
  kind: query
  params: []
- id: gv05
  label: Get Volume Zone 5
  kind: query
  params: []
- id: gv06
  label: Get Volume Zone 6
  kind: query
  params: []
- id: gv07
  label: Get Volume Zone 7
  kind: query
  params: []
- id: gv08
  label: Get Volume Zone 8
  kind: query
  params: []
- id: gr01
  label: Get Routing Zone 1
  kind: query
  params: []
- id: gr02
  label: Get Routing Zone 2
  kind: query
  params: []
- id: gr03
  label: Get Routing Zone 3
  kind: query
  params: []
- id: gr04
  label: Get Routing Zone 4
  kind: query
  params: []
- id: gr05
  label: Get Routing Zone 5
  kind: query
  params: []
- id: gr06
  label: Get Routing Zone 6
  kind: query
  params: []
- id: gr07
  label: Get Routing Zone 7
  kind: query
  params: []
- id: gr08
  label: Get Routing Zone 8
  kind: query
  params: []
- id: gm01
  label: Get Mute Zone 1
  kind: query
  params: []
- id: gm02
  label: Get Mute Zone 2
  kind: query
  params: []
- id: gm03
  label: Get Mute Zone 3
  kind: query
  params: []
- id: gm04
  label: Get Mute Zone 4
  kind: query
  params: []
- id: gm05
  label: Get Mute Zone 5
  kind: query
  params: []
- id: gm06
  label: Get Mute Zone 6
  kind: query
  params: []
- id: gm07
  label: Get Mute Zone 7
  kind: query
  params: []
- id: gm08
  label: Get Mute Zone 8
  kind: query
  params: []
- id: gb01
  label: Get Bass Zone 1
  kind: query
  params: []
- id: gb02
  label: Get Bass Zone 2
  kind: query
  params: []
- id: gb03
  label: Get Bass Zone 3
  kind: query
  params: []
- id: gb04
  label: Get Bass Zone 4
  kind: query
  params: []
- id: gb05
  label: Get Bass Zone 5
  kind: query
  params: []
- id: gb06
  label: Get Bass Zone 6
  kind: query
  params: []
- id: gb07
  label: Get Bass Zone 7
  kind: query
  params: []
- id: gb08
  label: Get Bass Zone 8
  kind: query
  params: []
- id: gt01
  label: Get Treble Zone 1
  kind: query
  params: []
- id: gt02
  label: Get Treble Zone 2
  kind: query
  params: []
- id: gt03
  label: Get Treble Zone 3
  kind: query
  params: []
- id: gt04
  label: Get Treble Zone 4
  kind: query
  params: []
- id: gt05
  label: Get Treble Zone 5
  kind: query
  params: []
- id: gt06
  label: Get Treble Zone 6
  kind: query
  params: []
- id: gt07
  label: Get Treble Zone 7
  kind: query
  params: []
- id: gt08
  label: Get Treble Zone 8
  kind: query
  params: []
- id: gzi01
  label: Get Zone Info Zone 1
  kind: query
  params: []
- id: gzi02
  label: Get Zone Info Zone 2
  kind: query
  params: []
- id: gzi03
  label: Get Zone Info Zone 3
  kind: query
  params: []
- id: gzi04
  label: Get Zone Info Zone 4
  kind: query
  params: []
- id: gzi05
  label: Get Zone Info Zone 5
  kind: query
  params: []
- id: gzi06
  label: Get Zone Info Zone 6
  kind: query
  params: []
- id: gzi07
  label: Get Zone Info Zone 7
  kind: query
  params: []
- id: gzi08
  label: Get Zone Info Zone 8
  kind: query
  params: []
- id: save
  label: Save Settings
  kind: action
  params: []
- id: def
  label: Factory Default  kind: action
  params: []
- id: gsv
  label: Get Firmware Version
  kind: query
  params: []
```

## Feedbacks
```yaml
# All commands return acknowledgement in format #|source|X001|command|+|checksum|return
# Zone update broadcasts sent to ALL clients in format #|ALL|X001|<prefix>|<value>|checksum|return
# Volume range: 0-70 (0=max, 70=min)
# Bass/Treble range: 00-0E (hex, 0-14)
# Routing range: 0-8 (0=disabled)
# Mute range: 0-1
```

## Variables
```yaml
# No standalone settable variables outside of zone actions - all params embedded in zone commands
```

## Events
```yaml
# UNRESOLVED: device sends unsolicited broadcast updates to ALL clients on state change
# Format: #|ALL|X001|<prefix>|<value>|checksum|return
# prefixes: V##=volume, R##=routing, M##=mute, B##=bass, T##=treble
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for:
  - def # factory reset clears all zone and device settings
interlocks: []
# UNRESOLVED: no explicit safety interlock procedures in source
```

## Notes
Command format: `#|destination|source|command|arguments|checksum|return`
- Fixed device address: X001
- Checksum: CRC-16 (excluding '#') or use 'U' as universal checksum
- Return bytes: 0x0D 0x0A
- Max 1 simultaneous TCP/IP connection on port 5001
- All volume/routing/tone settings lost on power-off unless saved with SAVE command
- Settings configured via web config page save automatically
- Inputs disabled in website input selection skipped by SRU/SRD commands
- MTX48: 4 zones; MTX88: 8 zones — commands spec'd for 8 zones maximum
<!-- UNRESOLVED: RS-485 pinout/wiring details not in source -->
<!-- UNRESOLVED: RS-232 pinout/wiring details not in source -->
<!-- UNRESOLVED: TCP/IP connection persistence/timeout behavior not documented -->
<!-- UNRESOLVED: firmware version range compatibility not stated -->

## Provenance

```yaml
source_domains:
  - downloads.pvs.global
  - audac.eu
source_urls:
  - https://downloads.pvs.global/downloads/audac/products/manuals/MTX_Commands_Manual.pdf
  - https://audac.eu/eu/products/d/m2---multimedia-digital-audio-mixer
retrieved_at: 2026-05-27T13:53:21.367Z
last_checked_at: 2026-05-27T15:34:22.160Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T15:34:22.160Z
matched_actions: 126
action_count: 126
confidence: high
summary: "All 126 spec actions matched literally in source; transport parameters verified; complete bidirectional coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
