---
spec_id: admin/shinybow-sb-8180
schema_version: ai4av-public-spec-v1
revision: 1
title: "Shinybow SB-8180 Control Spec"
manufacturer: Shinybow
model_family: SB-8180
aliases: []
compatible_with:
  manufacturers:
    - Shinybow
  models:
    - SB-8180
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - shinybowusa.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V2.0.pdf
  - https://www.shinybowusa.com/PDF/RS232_V1.0.pdf
retrieved_at: 2026-06-02T05:25:57.445Z
last_checked_at: 2026-06-02T05:46:13.951Z
generated_at: 2026-06-02T05:46:13.951Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "physical RS-232 connector pinout details not extracted from source"
  - "matrix size (number of inputs/outputs) not explicitly stated; examples imply 8 outputs and up to 8 inputs"
  - "firmware version compatibility not stated in source"
  - "source documents no unsolicited notifications. All responses are"
  - "source documents no explicit multi-step macro sequences."
  - "no other safety warnings, voltage/current ratings, or interlock"
  - "matrix size (input × output count) of the SB-8180 specifically — protocol document is a generic series table"
  - "physical RS-232 connector type and pinout (section header \"RS-232 CABLE PIN LINES\" present in source but no pinout content was extracted)"
  - "command-to-response timing tolerances beyond the EDID 5-second delay"
  - "behavior when issuing commands while LOCK is engaged"
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:13.951Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions matched exactly to source commands with identical opcodes and parameters. Transport parameters (9600bps, 8N1) verified. No commands fabricated or drifted. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Shinybow SB-8180 Control Spec

## Summary
Shinybow SB-8180 matrix / routing switcher controlled via RS-232C using an ASCII command set. Commands follow the `[Command] [Data];` format terminated by a semicolon, case-insensitive. Responses use either `SB5688 00;`/`SB5688 01;` style acknowledgements or echoed-command responses with `#OK`/`#ER` for volume/balance/mute.

<!-- UNRESOLVED: physical RS-232 connector pinout details not extracted from source -->
<!-- UNRESOLVED: matrix size (number of inputs/outputs) not explicitly stated; examples imply 8 outputs and up to 8 inputs -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
- powerable    # inferred from POWER command examples
- routable     # inferred from OUTPUT / OUTPUTALL routing commands
- queryable    # inferred from query commands (POWER ?;, LOCK ?;, OUTPUT ?;, etc.)
- levelable    # inferred from VOLUME / BALANCE level commands
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  command: "POWER 00;"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "POWER 01;"
  params: []

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "POWER ?;"
  params: []

- id: lock_unlock
  label: Unlock System
  kind: action
  command: "LOCK 00;"
  params: []

- id: lock_engage
  label: Lock System
  kind: action
  command: "LOCK 01;"
  params: []

- id: lock_status_query
  label: Lock Status Query
  kind: query
  command: "LOCK ?;"
  params: []

- id: output_route
  label: Route Output to Input
  kind: action
  command: "OUTPUT{output} {input};"
  params:
    - name: output
      type: string
      description: Two-digit output channel (e.g. 01, 02, ... 08)
    - name: input
      type: string
      description: Two-digit input channel (01-NN); use 00 for off destination

- id: output_off
  label: Output Off (Disconnect Destination)
  kind: action
  command: "OUTPUT{output} 00;"
  params:
    - name: output
      type: string
      description: Two-digit output channel

- id: output_status_query
  label: Output Routing Query
  kind: query
  command: "OUTPUT{output} ?;"
  params:
    - name: output
      type: string
      description: Two-digit output channel

- id: active_source_query
  label: Active Source Presence Query
  kind: query
  command: "ACTIVESOURCE ?;"
  params: []
  # Note: source warns this query is "Not available on all models"

- id: output_all_off
  label: Turn All Outputs Off
  kind: action
  command: "OUTPUTALL 00;"
  params: []

- id: output_all_set
  label: Set All Outputs to One Source
  kind: action
  command: "OUTPUTALL {source};"
  params:
    - name: source
      type: string
      description: Two-digit source/input number (01-NN)

- id: output_all_query
  label: Query All Output Routing
  kind: query
  command: "OUTPUTALL ?;"
  params: []

- id: memory_save
  label: Save Current Matrix Configuration to Memory
  kind: action
  command: "MEMORY {address};"
  params:
    - name: address
      type: string
      description: Two-digit hex memory address (00-0F, mapping to memory slot 1-16)

- id: memory_recall
  label: Recall Saved Matrix Configuration
  kind: action
  command: "RECALL {address};"
  params:
    - name: address
      type: string
      description: Two-digit hex memory address (00-0F, mapping to memory slot 1-16)

- id: memory_recall_query
  label: Query Memory Address Contents
  kind: query
  command: "RECALL{address} ?;"
  params:
    - name: address
      type: string
      description: Two-digit hex memory address (00-0F)

- id: edid_set_fss
  label: Set EDID to FSS
  kind: action
  command: "EDID 00;"
  params: []

- id: edid_set_h24_3d
  label: Set EDID to H24-3D
  kind: action
  command: "EDID 01;"
  params: []

- id: edid_set_h24m_3d
  label: Set EDID to H24M-3D
  kind: action
  command: "EDID 02;"
  params: []

- id: edid_set_h36_3d
  label: Set EDID to H36-3D
  kind: action
  command: "EDID 03;"
  params: []

- id: edid_set_h36_3d_m
  label: Set EDID to H36-3D-M
  kind: action
  command: "EDID 04;"
  params: []

- id: edid_set_dvi_1280x1024
  label: Set EDID to DVI-D 1280x1024
  kind: action
  command: "EDID 05;"
  params: []

- id: edid_set_dvi_1920x1200
  label: Set EDID to DVI-D 1920x1200
  kind: action
  command: "EDID 06;"
  params: []

- id: edid_set_auto
  label: Set EDID to Auto
  kind: action
  command: "EDID 07;"
  params: []

- id: edid_query
  label: EDID Status Query
  kind: query
  command: "EDID ?;"
  params: []

- id: volume_set
  label: Set Volume Level
  kind: action
  command: "VOLUME{output} {value};"
  params:
    - name: output
      type: string
      description: Two-digit output channel
    - name: value
      type: integer
      description: Volume value 0-100 (0 = mute equivalent, 99 = maximum)

- id: volume_query
  label: Volume Status Query
  kind: query
  command: "VOLUME{output} ?;"
  params:
    - name: output
      type: string
      description: Two-digit output channel

- id: volume_increment
  label: Increment Volume Level
  kind: action
  command: "VOLUME{output} +{step};"
  params:
    - name: output
      type: string
      description: Two-digit output channel
    - name: step
      type: string
      description: Two-digit increment value

- id: volume_decrement
  label: Decrement Volume Level
  kind: action
  command: "VOLUME{output} -{step};"
  params:
    - name: output
      type: string
      description: Two-digit output channel
    - name: step
      type: string
      description: Two-digit decrement value

- id: balance_set
  label: Set Volume Balance
  kind: action
  command: "BALANCE{output} {value};"
  params:
    - name: output
      type: string
      description: Two-digit output channel
    - name: value
      type: integer
      description: Balance value 0-99 (50 = centered, 0 = 100% Left, 99 = 100% Right)

- id: balance_query
  label: Balance Status Query
  kind: query
  command: "BALANCE{output} ?;"
  params:
    - name: output
      type: string
      description: Two-digit output channel

- id: mute_on
  label: Mute Output On
  kind: action
  command: "MUTE{output} 01;"
  params:
    - name: output
      type: string
      description: Two-digit output channel

- id: mute_off
  label: Mute Output Off
  kind: action
  command: "MUTE{output} 00;"
  params:
    - name: output
      type: string
      description: Two-digit output channel

- id: mute_query
  label: Mute Status Query
  kind: query
  command: "MUTE{output} ?;"
  params:
    - name: output
      type: string
      description: Two-digit output channel
```

## Feedbacks
```yaml
- id: generic_ack
  label: Generic Command Acknowledgement
  type: enum
  values: ["SB5688 00;", "SB5688 01;"]
  description: "SB5688 00; = success/OK. SB5688 01; = UNKNOWN Command (error). Used by POWER set, LOCK set, OUTPUT set, OUTPUTALL set, MEMORY save, RECALL, EDID set."

- id: power_state
  type: enum
  values: ["POWER 00;", "POWER 01;"]
  description: Response to POWER ?;. 00 = Power OFF, 01 = Power ON.

- id: lock_state
  type: enum
  values: ["Lock 00;", "Lock 01;"]
  description: Response to LOCK ?;. 00 = System Unlock, 01 = System Lock.

- id: output_route_state
  type: string
  format: "Output{NN} {II};"
  description: Response to OUTPUT{NN} ?;. NN = output channel, II = currently routed input channel.

- id: output_all_state
  type: string
  format: "OUTPUTALL <8 two-digit input numbers>;"
  description: Response to OUTPUTALL ?;. Each two-digit pair indicates the input routed to outputs 1..8 in order. Example "OUTPUTALL 0307050502010804;".

- id: active_source_state
  type: string
  format: "ACTIVESOURCE<8 two-digit flags>;"
  description: Response to ACTIVESOURCE ?;. Each two-digit field is 01 (active) or 00 (inactive) for each input. Does not validate signal format. Not available on all models.

- id: memory_recall_data
  type: string
  format: "RECALL{NN} <8 two-digit input numbers>;"
  description: Response to RECALL{NN} ?;. NN = memory address (00-0F). The 16-digit data field lists the input routed to outputs 1..8 for that saved configuration.

- id: edid_state
  type: enum
  values: ["EDID 00;", "EDID 01;", "EDID 02;", "EDID 03;", "EDID 04;", "EDID 05;", "EDID 06;", "EDID 07;"]
  description: Response to EDID ?;. 00=FSS, 01=H24-3D, 02=H24M-3D, 03=H36-3D, 04=H36-3D-M, 05=DVI-D 1280x1024, 06=DVI-D 1920x1200, 07=Auto.

- id: volume_set_ack
  type: enum
  values: ["VOLUME{NN} {VV}#OK;", "VOLUME{NN} {VV}#ER;"]
  description: Response to VOLUME{NN} {VV};. #OK = accepted, #ER = UNKNOWN Command.

- id: volume_state
  type: string
  format: "VOLUME{NN} ?#{VV};"
  description: Response to VOLUME{NN} ?;. VV = current volume value (0-100).

- id: volume_step_ack
  type: enum
  values: ["VOLUME{NN} +{SS}#OK;", "VOLUME{NN} +{SS}#ER;", "VOLUME{NN} -{SS}#OK;", "VOLUME{NN} -{SS}#ER;"]
  description: Response to VOLUME increment/decrement commands. #OK = accepted, #ER = UNKNOWN Command.

- id: balance_set_ack
  type: enum
  values: ["BALANCE{NN} {VV}#OK;", "BALANCE{NN} {VV}#ER;"]
  description: Response to BALANCE{NN} {VV};. #OK = accepted, #ER = UNKNOWN Command.

- id: balance_state
  type: string
  format: "BALANCE{NN} ?#{VV};"
  description: Response to BALANCE{NN} ?;. VV = current balance value (0-99).

- id: mute_set_ack
  type: enum
  values: ["MUTE{NN} 01#OK;", "MUTE{NN} 01#ER;", "MUTE{NN} 00#OK;", "MUTE{NN} 00#ER;"]
  description: Response to MUTE set commands. #OK = accepted, #ER = UNKNOWN Command.

- id: mute_state
  type: enum
  values: ["MUTE{NN} ?#01;", "MUTE{NN} ?#00;"]
  description: Response to MUTE{NN} ?;. 01 = Mute ON, 00 = Mute OFF.
```

## Variables
```yaml
- id: volume_level
  label: Per-Output Volume Level
  type: integer
  range: [0, 100]
  description: "Per-output volume. 0 = same as mute, 99 = maximum range (per source note)."
  set_action: volume_set
  query_action: volume_query

- id: balance_level
  label: Per-Output Volume Balance
  type: integer
  range: [0, 99]
  description: "Per-output L/R balance. Default 50 = centered, 0 = 100% Left, 99 = 100% Right."
  set_action: balance_set
  query_action: balance_query

- id: mute_state_var
  label: Per-Output Mute State
  type: enum
  values: [on, off]
  set_action_on: mute_on
  set_action_off: mute_off
  query_action: mute_query

- id: edid_mode
  label: EDID Mode
  type: enum
  values: [FSS, H24-3D, H24M-3D, H36-3D, H36-3D-M, "DVI-D 1280x1024", "DVI-D 1920x1200", Auto]
  query_action: edid_query
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications. All responses are
# polled / synchronous replies to commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: edid_change_delay
    description: |
      When issuing EDID commands, incorporate a minimum 5-second delay before
      issuing additional commands. Changing EDID settings triggers a soft-reboot
      of the switcher to implement the new EDID format.
    applies_to:
      - edid_set_fss
      - edid_set_h24_3d
      - edid_set_h24m_3d
      - edid_set_h36_3d
      - edid_set_h36_3d_m
      - edid_set_dvi_1280x1024
      - edid_set_dvi_1920x1200
      - edid_set_auto
    minimum_delay_seconds: 5
# UNRESOLVED: no other safety warnings, voltage/current ratings, or interlock
# procedures present in the refined source.
```

## Notes
- Command grammar: `[Command][SPACE][Data][;]`. A single space separates command and data; the terminator `;` is required. All ASCII, case-insensitive.
- Generic acknowledgement set (POWER, LOCK, OUTPUT, OUTPUTALL, MEMORY, RECALL, EDID set commands) uses `SB5688 00;` for success and `SB5688 01;` for "UNKNOWN Command". The literal `SB5688` token appears as the response prefix even though the device model is `SB-8180` — this is reproduced verbatim from the source's protocol table (the document is a generic Matrix/Routing Switcher Series RS-232 protocol table).
- VOLUME, BALANCE, and MUTE commands instead return an echoed-command response with `#OK` for success and `#ER` for UNKNOWN Command.
- LOCK query response in the source shows lower-case `Lock 00;` / `Lock 01;`. Commands are case-insensitive per the source; response casing reproduced verbatim.
- Memory addresses are hex `00`-`0F` mapping to slot numbers `1`-`16`. Save (`MEMORY xx;`) and recall (`RECALL xx;`) use the same addressing scheme; per-slot inspection uses the joined form `RECALLxx ?;`.
- `RECALL{NN} ?;` and `OUTPUTALL ?;` responses encode an 8-output routing snapshot as eight concatenated two-digit fields (output 1..8). This implies an 8-output matrix in the example; the source does not explicitly state the SB-8180's matrix size.
- VOLUME source note states `YY=0 to 100, 0 = same as mute, 99 = maximum range`. The 0-100 range and "99 = maximum" are reproduced verbatim despite the apparent inconsistency.
- ACTIVESOURCE query is flagged "Not available on all models" in the source.

<!-- UNRESOLVED: matrix size (input × output count) of the SB-8180 specifically — protocol document is a generic series table -->
<!-- UNRESOLVED: physical RS-232 connector type and pinout (section header "RS-232 CABLE PIN LINES" present in source but no pinout content was extracted) -->
<!-- UNRESOLVED: command-to-response timing tolerances beyond the EDID 5-second delay -->
<!-- UNRESOLVED: behavior when issuing commands while LOCK is engaged -->

## Provenance

```yaml
source_domains:
  - shinybowusa.com
source_urls:
  - https://www.shinybowusa.com/PDF/RS232_V2.0.pdf
  - https://www.shinybowusa.com/PDF/RS232_V1.0.pdf
retrieved_at: 2026-06-02T05:25:57.445Z
last_checked_at: 2026-06-02T05:46:13.951Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:13.951Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions matched exactly to source commands with identical opcodes and parameters. Transport parameters (9600bps, 8N1) verified. No commands fabricated or drifted. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "physical RS-232 connector pinout details not extracted from source"
- "matrix size (number of inputs/outputs) not explicitly stated; examples imply 8 outputs and up to 8 inputs"
- "firmware version compatibility not stated in source"
- "source documents no unsolicited notifications. All responses are"
- "source documents no explicit multi-step macro sequences."
- "no other safety warnings, voltage/current ratings, or interlock"
- "matrix size (input × output count) of the SB-8180 specifically — protocol document is a generic series table"
- "physical RS-232 connector type and pinout (section header \"RS-232 CABLE PIN LINES\" present in source but no pinout content was extracted)"
- "command-to-response timing tolerances beyond the EDID 5-second delay"
- "behavior when issuing commands while LOCK is engaged"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
