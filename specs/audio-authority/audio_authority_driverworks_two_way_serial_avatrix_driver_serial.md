---
spec_id: admin/audio_authority-avatrix
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
    - "1176 expander"
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
last_checked_at: 2026-05-20T04:51:40.391Z
generated_at: 2026-05-20T04:51:40.391Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T04:51:40.391Z
  matched_actions: 24
  action_count: 24
  confidence: high
  summary: "All 24 spec actions match literal source commands; transport parameters verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-20
---

# Audio Authority AVAtrix Control Spec

## Summary
RS-232 matrix switcher supporting 6-source to multiple-zone routing. Supports two serial protocols: Abbreviated (one-way, simple) and Extended (two-way, all system changes reported). Fixed 9600 baud, 8N1, no flow control.

<!-- UNRESOLVED: 1176 expander count/limit not stated -->

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
- powerable  # UNRESOLVED: explicit power on/off commands not found in source
- routable
- queryable
- levelable  # UNRESOLVED: display blanking implies levelable, but no discrete level cmd
```

## Actions
```yaml
# Abbreviated Command Set
- id: select_professional_screen
  label: Select Professional Screen
  kind: action
  params: []
- id: select_residential_screen
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
  label: Lockout Front Panel IR Receiver
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
- id: select_zone
  label: Select Zone
  kind: action
  params:
    - name: row
      type: string
      description: Row letter A-L (A = AVM-562 internal, B-L = 1176 expanders in order)
    - name: column
      type: integer
      description: Column 1-6 (zone number)
    - name: source
      type: integer
      description: Source 1-6
- id: select_group
  label: Select Group
  kind: action
  params:
    - name: group
      type: integer
      description: Group number 1-6
    - name: source
      type: integer
      description: Source 1-6
- id: select_all
  label: Select All Zones
  kind: action
  params:
    - name: source
      type: integer
      description: Source 1-6
- id: select_main
  label: Select Main Output
  kind: action
  params:
    - name: source
      type: integer
      description: Source 1-6

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
      description: Router address A-L
    - name: zone
      type: integer
      description: Zone number 1-6
    - name: source
      type: integer
      description: Source number 1-6
- id: connect_all_zones_to_source
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
  label: Lock Panel (Extended)
  kind: action
  params: []
- id: unlock_panel_ext
  label: Unlock Panel (Extended)
  kind: action
  params: []
- id: lock_ir_ext
  label: Lock IR Receiver (Extended)
  kind: action
  params: []
- id: unlock_ir_ext
  label: Unlock IR Receiver (Extended)
  kind: action
  params: []
- id: enable_display_blanking_ext
  label: Enable Display Blanking (Extended)
  kind: action
  params: []
- id: disable_display_blanking_ext
  label: Disable Display Blanking (Extended)
  kind: action
  params: []
- id: select_professional_screen_ext
  label: Select Professional Screen (Extended)
  kind: action
  params: []
- id: select_residential_screen_ext
  label: Select Residential Screen (Extended)
  kind: action
  params: []
```

## Feedbacks
```yaml
# Extended command responses (all include C/R L/F 0x0d 0x0a)
- id: connect_response
  type: string
  values: []
  description: "(Rx,On,Im) format for zone connect, (M,Im) for main"
- id: panel_lock_response
  type: enum
  values: ["(P,L)", "(P,U)"]
  description: Panel lockout status response
- id: ir_lock_response
  type: enum
  values: ["(I,L)", "(I,U)"]
  description: IR receiver lockout status response
- id: blanking_response
  type: enum
  values: ["(B,+)", "(B,-)"]
  description: Display blanking status response
- id: screen_response
  type: enum
  values: ["(P,+)", "(P,-)"]
  description: Screen mode response
- id: autoselect_response
  type: enum
  values: ["(A,+)", "(A,-)"]
  description: AutoSelect function status response
- id: all_connections_response
  type: string
  description: "(RA,O1,Im)(RA,O2,Im)...(M,Im)" format for all zones query
- id: error_response
  type: string
  values: ["(ERROR)"]
  description: Invalid extended command response
- id: reset_message
  type: string
  values: ["(RESET)"]
  description: Sent on power up

# Abbreviated query responses
- id: screen_mode_query_response
  type: enum
  values: ["P", "R", "S"]
  description: "?P/?R response: P=professional, R=residential, S=other screen"
- id: panel_controls_query_response
  type: enum
  values: ["+", "-"]
  description: "?V response: -=unlocked, +=locked"
- id: panel_ir_query_response
  type: enum
  values: ["+", "-"]
  description: "?W response: -=unlocked, +=locked out"
- id: main_output_query_response
  type: integer
  description: "?M returns source number 1-6"
- id: cat5_output_query_response
  type: integer
  description: "?Zwx returns source number for zone"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond routing; no volume/gain commands
```

## Events
```yaml
# Extended protocol: all system changes reported unsolicited
# (e.g., if wallplate changes source, AVAtrix reports via serial)
# UNRESOLVED: explicit event message formats not enumerated in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Echo function: on power up, AVAtrix echoes all received characters. Sending any valid extended command ([...]) disables echo to prevent corruption of responses. Echo remains off until reset.
- Extended commands must be enclosed in brackets `[` and `]`. Invalid extended commands return `(ERROR)`.
- Row addressing: A = AVM-562 internal Cat 5 outputs; B-L = 1176 expanders addressed in order.
- Zone groups must be pre-assigned via front panel; G commands have no effect if groups not configured.
- Null modem cable required; contact Audio Authority.
- Pin-out: Pin 2=TX, Pin 3=RX, Pin 5=Ground, Shell=Ground.
- Electrical rating: Pins 2 and 3, ±15 VDC.
- Character type: ASCII. Recognized characters: a-z, A-Z, 0-9, [, ], +, -, ?. All others ignored.
- Extended responses always terminate with C/R L/F (0x0d, 0x0a).
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: power on/off commands not found in source -->
<!-- UNRESOLVED: maximum zone/group count per device not explicitly stated -->
<!-- UNRESOLVED: AutoSelect lockout command details not fully specified -->

## Provenance

```yaml
source_domains:
  - audioauthority.com
source_urls:
  - https://www.audioauthority.com/downloads/manuals/avm-562_manual752-495_2009-4.pdf
  - https://www.audioauthority.com/downloads/manuals/1173_ci_commands_2011-6.doc
retrieved_at: 2026-05-20T19:02:48.401Z
last_checked_at: 2026-05-20T04:51:40.391Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T04:51:40.391Z
matched_actions: 24
action_count: 24
confidence: high
summary: "All 24 spec actions match literal source commands; transport parameters verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
