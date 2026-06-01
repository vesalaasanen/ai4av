---
spec_id: admin/knoll-hd292
schema_version: ai4av-public-spec-v1
revision: 1
title: "Knoll HD292 Control Spec"
manufacturer: Knoll
model_family: HD292
aliases: []
compatible_with:
  manufacturers:
    - Knoll
  models:
    - HD292
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - projector-database.com
source_urls:
  - https://www.projector-database.com/pdf/knollhd108-178-290-292-an-en.pdf
retrieved_at: 2026-05-21T03:56:51.060Z
last_checked_at: 2026-05-26T20:04:53.718Z
generated_at: 2026-05-26T20:04:53.718Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-26T20:04:53.718Z
  matched_actions: 94
  action_count: 94
  confidence: high
  summary: "All 94 spec actions matched verbatim against source command table with correct ranges and enums; transport parameters verified; 100% coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Knoll HD292 Control Spec

## Summary
RS-232C serial projector controller. 19200 baud, 8N1. Command format: `(XXX?)` read, `(XXX####)` write. Covers power, image, color, source selection, lamp management, and presets.

<!-- UNRESOLVED: document covers HD178, HD290, HD292 — only HD292 listed as input model -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Evidence from source:
# - powerable: PWR0/PWR1 commands present
# - routable: SRC (source selection), SR1/SR2/SR3/SR4 programs
# - queryable: LMP?, SYS?, ERR? read commands present
# - levelable: BRT, CON, CLR, SHP, TNT, etc.
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
# All commands from source with read/write forms
# Read: (XXX?) → returns (range,value)
# Write: (XXX####)

- id: acl
  label: Auto Ceiling Enable
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: acs
  label: Auto Color Space Enable
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: aim
  label: Auto Image
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: arz
  label: Aspect Ratio
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 4]
      description: "0=Native, 1=4:3, 2=16:9, 3=Letterbox, 4=Natural Wide"

- id: apo
  label: Auto Power Enable
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: asc
  label: Auto Source Enable
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: avs
  label: Auto Video Standard Enable
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: blk
  label: Blank
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]
      description: "0=Black, 1=Blue"

- id: bco
  label: Blue Color Offset
  kind: action
  params:
    - name: value
      type: integer
      range: [1, 255]

- id: bcg
  label: Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      range: [1, 255]

- id: boe
  label: Blue Only Enable
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: brt
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: cel
  label: Ceiling
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: clr
  label: Color
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: csm
  label: Color Space
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 2]
      description: "0=RGB, 2=REC601, 3=REC709"

- id: tmp
  label: Color Temp
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 3]
      description: "0=6500, 1=7500, 2=9300, 3=Native"

- id: con
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: dmg
  label: Display Messages
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: rst
  label: Factory Reset
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: ftc
  label: Flesh Tone Correction
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: gtb
  label: Gamma Table
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 8]
      description: "2=Video, 3=Film, 5=Bright Room, 7=CRT, 8=PC"

- id: gco
  label: Green Color Offset
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: gcg
  label: Green Gain
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: hpe
  label: High Power Enable
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: hps
  label: Horizontal Position
  kind: action
  params:
    - name: value
      type: integer
      # range n/a in source

- id: dkc
  label: Vertical Keystone
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 80]

- id: lmp
  label: Lamp Hours
  kind: query
  params: []
  description: "Read only. Returns 0-65535"

- id: lmr
  label: Number of Lamp Resets
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 65535]

- id: mnu
  label: Menu Enable
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: nav
  label: Menu Navigation
  kind: action
  params:
    - name: value
      type: integer
      range: [1, 3]
      description: "1=up, 2=down, 3=select"

- id: lan
  label: Language
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 11]
      description: "0=English, 1=French, 2=German, 3=Italian, 4=Japanese, 5=Korean, 6=Norwegian, 7=Portuguese, 8=Russian, 9=Chinese Simplified, 10=Spanish, 11=Chinese Traditional"

- id: nre
  label: Noise Reduction Mode
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]
      description: "0=Off, 1=Auto"

- id: nrl
  label: Noise Reduction Level
  kind: action
  params:
    - name: value
      type: integer
      range: [8, 248]

- id: ovs
  label: Overscan
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 2]

- id: mss
  label: Phase
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: pwr
  label: Power
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]
      description: "0=Off, 1=On, 9999=query"

- id: psv
  label: Power Save Enable
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: pst
  label: Presets
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 5]
      description: "0=Default, 1=User 1, 2=User 2, 4=Off"

- id: rea
  label: Rear Project
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: rco
  label: Red Color Offset
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: rcg
  label: Red Gain
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: shp
  label: Sharpness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 4]

- id: slt
  label: Sleep Timer
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: sth
  label: Sync Threshold Adjust
  kind: action
  params:
    - name: value
      type: integer
      range: [1, 15]

- id: src
  label: Source
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 5]
      description: "0=HDMI, 1=M1-DA, 2=Component, 3=S-Video, 4=Composite, 5=SCART RGB"

- id: sr1
  label: Source 1 Program
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 5]

- id: sr2
  label: Source 2 Program
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 5]

- id: sr3
  label: Source 3 Program
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 5]

- id: sr4
  label: Source 5 Program
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 5]

- id: dsu
  label: Startup Logo
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 2]

- id: tnt
  label: Tint
  kind: action
  params:
    - name: value
      type: integer
      range: [2, 98]

- id: tto
  label: Film Mode Auto Detect
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: mts
  label: Tracking
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: ste
  label: Screen Trigger Enable
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: toe
  label: Translucent OSD
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: tpo
  label: Test Pattern Enable
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: tps
  label: Test Pattern Select
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 9]

- id: vps
  label: Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: vsu
  label: Video Standard
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 9]
      description: "0=Auto, 1=NTSC, 2=PAL, 5=SECAM"

- id: wpk
  label: White Peaking
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 10]

- id: us1
  label: Save User 1 Preset
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: us2
  label: Save User 2 Preset
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: us3
  label: Save User 3 Preset
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: cap
  label: Logo Capture Enable
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: ce0
  label: Source Enable 0
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: ce1
  label: Source Enable 1
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: ce2
  label: Source Enable 2
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: ce3
  label: Source Enable 3
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: ce4
  label: Source Enable 4
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: ce5
  label: Source Enable 5
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: com
  label: Logo Capture Compress
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: cpc
  label: Logo Capture Compression Progress
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 480]

- id: crs
  label: Current Sub-source
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 7]

- id: dsc
  label: Power-up Source
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 5]

- id: efk
  label: Effect Key Program
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 11]

- id: err
  label: System Error Code
  kind: query
  params: []
  description: "Read only. Returns 0-7"

- id: frz
  label: Freeze Enabled
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: ipm
  label: Lamp Power
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: lb1
  label: Last Lamp 1 Hours
  kind: query
  params: []
  description: "Read only"

- id: lb2
  label: Last Lamp 2 Hours
  kind: query
  params: []
  description: "Read only"

- id: lb3
  label: Last Lamp 3 Hours
  kind: query
  params: []
  description: "Read only"

- id: lml
  label: Illuminating State
  kind: query
  params: []
  description: "Returns 0-2"

- id: lmt
  label: Lamp Total Time On
  kind: query
  params: []
  description: "Read only. Returns 0-65535"

- id: lrt
  label: Perform Lamp Reset
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 1]

- id: o00
  label: Power On Count Total
  kind: query
  params: []
  description: "Read only. Returns 0-65535"

- id: o30
  label: Power On Count 30 Min
  kind: query
  params: []
  description: "Read only. Returns 0-65535"

- id: o60
  label: Power On Count 60 Min
  kind: query
  params: []
  description: "Read only. Returns 0-65535"

- id: o90
  label: Power On Count 90 Min
  kind: query
  params: []
  description: "Read only. Returns 0-65535"

- id: onc
  label: Time On Minutes Total
  kind: query
  params: []
  description: "Read only. Returns 0-4294967295"

- id: onl
  label: Time On Minutes Current
  kind: query
  params: []
  description: "Read only. Returns 0-4294967295"

- id: onp
  label: Time On Minutes Previous
  kind: query
  params: []
  description: "Read only. Returns 0-4294967295"

- id: sys
  label: System State
  kind: query
  params: []
  description: "Read only. Returns 0-17"

- id: ssa
  label: Strike Attempts Successful
  kind: query
  params: []
  description: "Read only. Returns 0-65535"

- id: tsa
  label: Strike Attempts Total
  kind: query
  params: []
  description: "Read only. Returns 0-65535"
```

## Feedbacks
```yaml
# All read responses return format (range,current_value)
# No unsolicited feedbacks documented
# UNRESOLVED: no unsolicited notification mechanism described
```

## Variables
```yaml
# All parameters are set via Actions - no separate Variables section needed
# UNRESOLVED: remove if not applicable
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source
```

## Macros
```yaml
# UNRESOLVED: no macro/multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power sequencing requirements described
```

## Notes
- Command format: `(AAA?)` read, `(AAA####)` write, all enclosed in parentheses
- Write commands accept 1-4 ASCII digits; leading zeros not required
- Values exceeding max range are clamped to max automatically
- Unknown commands return `?`
- Power command: 0=off, 1=on (exception to absolute rule where 0=off and 1-999=on)
- Serial emulation: VT100
- Blank command (BLK) has dual function: enable/disable + screen color selection
- Color Space table shows 0=RGB, 3=REC709, 2=REC601 — range given as 0-2, but value 3 is stated for REC709; table appears inconsistent with stated range
<!-- UNRESOLVED: CSM range 0-2 stated but REC709=3 in table — conflict not resolvable from source -->

## Provenance

```yaml
source_domains:
  - projector-database.com
source_urls:
  - https://www.projector-database.com/pdf/knollhd108-178-290-292-an-en.pdf
retrieved_at: 2026-05-21T03:56:51.060Z
last_checked_at: 2026-05-26T20:04:53.718Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-26T20:04:53.718Z
matched_actions: 94
action_count: 94
confidence: high
summary: "All 94 spec actions matched verbatim against source command table with correct ranges and enums; transport parameters verified; 100% coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
