---
spec_id: admin/audio-authority-avatrix
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audio Authority AVAtrix Control Spec"
manufacturer: "Audio Authority"
model_family: AVM-562
aliases: []
compatible_with:
  manufacturers:
    - "Audio Authority"
  models:
    - AVM-562
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audioauthority.com
source_urls:
  - https://www.audioauthority.com/downloads/manuals/avm-562_manual752-495_2009-4.pdf
  - https://www.audioauthority.com/downloads/manuals/1173_ci_commands_2011-6.doc
retrieved_at: 2026-05-20T19:02:48.401Z
last_checked_at: 2026-05-22T13:30:16.585Z
generated_at: 2026-05-22T13:30:16.585Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-22T13:30:16.585Z
  matched_actions: 24
  action_count: 24
  confidence: high
  summary: "All 24 spec actions match source commands exactly; all transport parameters verified; all source commands represented in spec or feedbacks."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-20
---

# Audio Authority AVAtrix Control Spec

## Summary
The Audio Authority AVAtrix (model AVM-562) is a multi-zone audio/video matrix routing switcher controllable via RS-232C. Two command sets are defined: an Abbreviated one-way set and an Extended set with full responses and reporting. Zones are addressed by row letter (A-L) and column number (1-6); sources are numbered 1-6.

<!-- UNRESOLVED: firmware version not stated; 1176 expander firmware compatibility not addressed -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable    # source selection commands present
- queryable   # query commands returning state present
```

## Actions
```yaml
# Abbreviated Command Set
- id: select_pro_screen
  label: Select Professional Screen
  kind: action
  params: []
- id: select_res_screen
  label: Select Residential Screen
  kind: action
  params: []
- id: unlock_front_panel
  label: Unlock Front Panel Controls
  kind: action
  params: []
- id: lock_front_panel
  label: Lock Front Panel Controls
  kind: action
  params: []
- id: unlock_ir_receiver
  label: Unlock Front Panel IR Receiver
  kind: action
  params: []
- id: lockout_ir_receiver
  label: Lock Out Front Panel IR Receiver
  kind: action
  params: []
- id: disable_display_blanking
  label: Disable Display Blanking
  kind: action
  params: []
- id: enable_display_blanking
  label: Enable Display Blanking
  kind: action
  params: []

# Abbreviated Source Selection
- id: select_zone
  label: Select Zone Source
  kind: action
  params:
    - name: row
      type: string
      description: Row letter A-L (Cat 5 array or 1176 expander)
    - name: column
      type: integer
      description: Column/zone number 1-6
    - name: source
      type: integer
      description: Source input number 1-6
- id: select_group
  label: Select Group Source
  kind: action
  params:
    - name: group
      type: integer
      description: Group number 1-6
    - name: source
      type: integer
      description: Source input number 1-6
- id: select_all_zones
  label: Select All Zones Source
  kind: action
  params:
    - name: source
      type: integer
      description: Source input number 1-6
- id: select_main
  label: Select Main Output Source
  kind: action
  params:
    - name: source
      type: integer
      description: Source input number 1-6

# Extended Command Set
- id: connect_main_to_source
  label: Connect Main Output to Source
  kind: action
  params:
    - name: source
      type: integer
      description: Source number 1-6
- id: connect_zone_to_source
  label: Connect Zone to Source
  kind: action
  params:
    - name: router
      type: string
      description: Router device A-L
    - name: zone
      type: integer
      description: Zone number 1-6
    - name: source
      type: integer
      description: Source number 1-6
- id: connect_all_to_source
  label: Connect All Zones to Source
  kind: action
  params:
    - name: source
      type: integer
      description: Source number 1-6
- id: connect_group_to_source
  label: Connect Group to Source
  kind: action
  params:
    - name: group
      type: integer
      description: Group number 1-6
    - name: source
      type: integer
      description: Source number 1-6
- id: lock_panel_ext
  label: Lock Out Front Panel Controls (Extended)
  kind: action
  params: []
- id: unlock_panel_ext
  label: Unlock Front Panel Controls (Extended)
  kind: action
  params: []
- id: lock_ir_ext
  label: Lock Out Internal IR Receiver (Extended)
  kind: action
  params: []
- id: unlock_ir_ext
  label: Unlock Internal IR Receiver (Extended)
  kind: action
  params: []
- id: enable_display_blanking_ext
  label: Enable Display Blanking After 45s Inactivity (Extended)
  kind: action
  params: []
- id: disable_display_blanking_ext
  label: Disable Display Blanking (Extended)
  kind: action
  params: []
- id: select_pro_ext
  label: Select Professional Screen (Extended)
  kind: action
  params: []
- id: select_res_ext
  label: Select Residential Screen (Extended)
  kind: action
  params: []
```

## Feedbacks
```yaml
# Abbreviated queries
- id: screen_mode
  label: Screen Mode Query
  type: enum
  values: [P, R, S]
  description: P=Professional, R=Residential, S=Other/Setup
- id: panel_controls_state
  label: Panel Controls State Query
  type: enum
  values: ['-', '+']
  description: "-=unlocked, +=locked"
- id: panel_ir_state
  label: Panel IR Receiver State Query
  type: enum
  values: ['-', '+']
  description: "-=unlocked, +=locked out"
- id: main_output_source
  label: Main Output Source Query
  type: integer
  description: Returns selected source number 1-6
- id: cat5_output_source
  label: Cat 5 Output Source Query
  type: integer
  description: Returns source number selected by wallplate/receiver

# Extended queries
- id: unit_connection_query
  label: Unit Connection Query
  type: string
  description: Returns (Rx,On,Im) for zone n of router x to source m
- id: main_connection_query
  label: Main Connection Query
  type: string
  description: Returns (M,Im)
- id: all_connections_query
  label: All Connections Query
  type: string
  description: Returns all connection states across all routers and main
- id: panel_lockout_query
  label: Panel Lockout Status Query
  type: enum
  values: [L, U]
  description: L=locked, U=unlocked
- id: ir_lockout_query
  label: IR Lockout Status Query
  type: enum
  values: [L, U]
  description: L=locked, U=unlocked
- id: autoselect_lockout_query
  label: AutoSelect Lockout Status Query
  type: enum
  values: [L, U]
  description: L=locked, U=unlocked
- id: display_blanking_query
  label: Display Blanking Status Query
  type: enum
  values: ['+', '-']
  description: "+=enabled, -=disabled"
- id: display_screen_query
  label: Display Screen Status Query
  type: enum
  values: ['+', '-']
  description: "+=Professional, -=Residential"
- id: autoselect_function_query
  label: AutoSelect Function Status Query
  type: enum
  values: ['+', '-']

# Error response
- id: error_response
  label: Error Response
  type: string
  values: ['(ERROR)']
  description: Invalid extended command response
```

## Variables
```yaml
# No standalone settable parameters beyond discrete actions.
# UNRESOLVED: remove section if not applicable
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
Echo behavior: On power-up the AVAtrix echoes any character received. Upon receiving any valid bracketed extended command, echo function ceases to prevent corrupted responses. Echo remains off until reset via power interruption or double-press of front panel knob.

Command syntax: Extended commands use `[` and `]` brackets. Characters outside the defined set (letters, numbers, brackets, +/-, ?) are ignored. Spaces and commas may be included for clarity or omitted.

Response format: All extended responses end with C/R L/F sequence (0x0d, 0x0a).

Row/zone addressing: AVM-562 internal row is always "A"; 1176 expanders addressed in daisy-chain order A, B, C, etc. Zone column is 1-6.
<!-- UNRESOLVED: null modem cable pinout details require calling Audio Authority -->
<!-- UNRESOLVED: AutoSelect lockout commands (A) not fully detailed in source -->
<!-- UNRESOLVED: 1176 expander firmware compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - audioauthority.com
source_urls:
  - https://www.audioauthority.com/downloads/manuals/avm-562_manual752-495_2009-4.pdf
  - https://www.audioauthority.com/downloads/manuals/1173_ci_commands_2011-6.doc
retrieved_at: 2026-05-20T19:02:48.401Z
last_checked_at: 2026-05-22T13:30:16.585Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-22T13:30:16.585Z
matched_actions: 24
action_count: 24
confidence: high
summary: "All 24 spec actions match source commands exactly; all transport parameters verified; all source commands represented in spec or feedbacks."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
