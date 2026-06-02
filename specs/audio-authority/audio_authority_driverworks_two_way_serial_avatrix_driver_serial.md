---
spec_id: admin/audio-authority-avatrix
schema_version: ai4av-public-spec-v1
revision: 1
title: "Audio Authority AVAtrix (AVM-562 / 1176) RS-232 Control Spec"
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
  - https://www.audioauthority.com/techdocs/1173bkmanual752-587.pdf
retrieved_at: 2026-05-19T21:14:33.940Z
last_checked_at: 2026-06-02T21:40:09.137Z
generated_at: 2026-06-02T21:40:09.137Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "voltage, current, and any power-related electrical ratings (other than the ±15 VDC pin rating stated in the spec table) are not covered. Firmware version compatibility is not stated in the source."
  - "no Variable-class parameters to enumerate."
  - "no multi-step sequences described in the source."
  - "source contains no explicit safety warnings, interlocks, or"
  - "firmware version compatibility, port number on a network variant (none in source — RS-232 only), and any fault-recovery sequences are not stated in the source."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:40:09.137Z
  matched_actions: 39
  action_count: 39
  confidence: medium
  summary: "All 39 spec actions matched verbatim in source with correct transport parameters (9600 baud, 8-N-1, no flow control); bidirectional coverage confirmed. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Audio Authority AVAtrix (AVM-562 / 1176) RS-232 Control Spec

## Summary
This spec covers RS-232 control of the Audio Authority AVAtrix AVM-562 and its 1176 expander modules. The source describes two command sets — a simple one-way Abbreviated Command Set and a richer two-way Extended Command Set that reports all system changes through the serial port. Commands are ASCII, not case-sensitive, and the link is 9600 baud, 8-N-1 with no flow control.

<!-- UNRESOLVED: voltage, current, and any power-related electrical ratings (other than the ±15 VDC pin rating stated in the spec table) are not covered. Firmware version compatibility is not stated in the source. -->

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

**Connector and pin-out (from source):**
- Connector: DB-9
- Pin 2: Tx
- Pin 3: Rx
- Pin 5: Ground
- Shell: Ground
- Electrical rating on pins 2/3: ±15 VDC
- Null modem cable: required (call Audio Authority for part)
- On power up, the AVAtrix sends the string `(RESET)` and echoes any received character; the echo function is turned off after the first valid bracketed command is received.

## Traits
```yaml
- routable  # inferred from Z, G, X, M source-selection commands and [C,...] extended connect commands
- queryable  # inferred from ?P/?R/?V/?W/?M/?Z and [?,...] extended query commands
- lockable  # inferred from front-panel and IR lock/lockout commands
```

## Actions
```yaml
# ----- Abbreviated Command Set: General -----
- id: select_professional_screen
  label: Select Professional Screen (Abbreviated)
  kind: action
  command: "P"
  params: []

- id: select_residential_screen
  label: Select Residential Screen (Abbreviated)
  kind: action
  command: "R"
  params: []

- id: unlock_front_panel
  label: Unlock Front Panel Controls (Abbreviated)
  kind: action
  command: "V-"
  params: []

- id: lock_front_panel
  label: Lock Front Panel Controls (Abbreviated)
  kind: action
  command: "V+"
  params: []

- id: unlock_front_panel_ir
  label: Unlock Front Panel Optical IR Receiver (Abbreviated)
  kind: action
  command: "W-"
  params: []

- id: lockout_front_panel_ir
  label: Lockout Front Panel Optical IR Receiver (Abbreviated)
  kind: action
  command: "W+"
  params: []

- id: disable_display_blanking
  label: Disable Display Blanking (Abbreviated)
  kind: action
  command: "Y-"
  params: []

- id: enable_display_blanking
  label: Enable Display Blanking (Abbreviated)
  kind: action
  command: "Y+"
  params: []

# ----- Abbreviated Command Set: Source Selection -----
- id: select_zone_source
  label: Select Source for an Individual Cat 5 Zone (Abbreviated)
  kind: action
  command: "Z{w}{x}{y}"
  params:
    - name: w
      type: string
      description: Row letter A-L (AVM-562 Cat 5 array or 1176 expander)
    - name: x
      type: integer
      description: Column 1-6 (Cat 5 output number)
    - name: y
      type: integer
      description: Source 1-6

- id: select_group_source
  label: Select Source for a Zone Group (Abbreviated)
  kind: action
  command: "G{z}{y}"
  params:
    - name: z
      type: integer
      description: Group 1-6
    - name: y
      type: integer
      description: Source 1-6

- id: select_all_zones_source
  label: Select Source for All Zones (Abbreviated)
  kind: action
  command: "X{y}"
  params:
    - name: y
      type: integer
      description: Source 1-6

- id: select_main_output_source
  label: Select Source for Main (Local) Output (Abbreviated)
  kind: action
  command: "M{y}"
  params:
    - name: y
      type: integer
      description: Source 1-6

# ----- Abbreviated Command Set: Queries -----
- id: query_screen_mode
  label: Query Screen Mode (Abbreviated)
  kind: query
  command: "?P"
  params: []
  notes: "Equivalent to ?R per source. Response: P / R / S (P=professional, R=residential, S=any other screen such as Setup)."

- id: query_screen_mode_alt
  label: Query Screen Mode, Residential Form (Abbreviated)
  kind: query
  command: "?R"
  params: []
  notes: "Same response semantics as ?P."

- id: query_panel_controls
  label: Query Front Panel Control Lockout (Abbreviated)
  kind: query
  command: "?V"
  params: []
  notes: "Response: - if unlocked, + if locked."

- id: query_panel_ir_receiver
  label: Query Front Panel IR Receiver Lockout (Abbreviated)
  kind: query
  command: "?W"
  params: []
  notes: "Response: - if unlocked, + if locked out."

- id: query_main_output_source
  label: Query Main Output Source (Abbreviated)
  kind: query
  command: "?M"
  params: []
  notes: "Response: number of the selected source."

- id: query_cat5_output_source
  label: Query Cat 5 Output Source (Abbreviated)
  kind: query
  command: "?Z{w}{x}"
  params:
    - name: w
      type: string
      description: Row letter A-L
    - name: x
      type: integer
      description: Column 1-6
  notes: "Response: number of the source selected by wallplate/receiver wx."

# ----- Extended Command Set: Connect (Routing) -----
- id: ext_connect_main
  label: Connect Main Output to Source (Extended)
  kind: action
  command: "[C,M,I{m}]"
  params:
    - name: m
      type: integer
      description: Source 1-6
  notes: "Response: (M,I{m})."

- id: ext_connect_zone
  label: Connect Zone n of Router x to Source m (Extended)
  kind: action
  command: "[C,R{x},O{n},I{m}]"
  params:
    - name: x
      type: string
      description: A/V router device A-L
    - name: n
      type: integer
      description: Zone 1-6
    - name: m
      type: integer
      description: Source 1-6
  notes: "Response: (R{x},O{n},I{m})."

- id: ext_connect_all_zones
  label: Connect All Zones on All Routers to Source m (Extended)
  kind: action
  command: "[C,X,I{m}]"
  params:
    - name: m
      type: integer
      description: Source 1-6
  notes: "Response: (X,I{m})."

- id: ext_connect_group
  label: Connect All Outputs in Group j to Source m (Extended)
  kind: action
  command: "[C,G{j},I{m}]"
  params:
    - name: j
      type: integer
      description: Group 1-6
    - name: m
      type: integer
      description: Source 1-6
  notes: "Response: (G{j},I{m})."

# ----- Extended Command Set: General -----
- id: ext_lock_panel
  label: Lock Out Front Panel Controls (Extended)
  kind: action
  command: "[L,P]"
  params: []
  notes: "Response: (P,L)."

- id: ext_unlock_panel
  label: Unlock Front Panel Controls (Extended)
  kind: action
  command: "[U,P]"
  params: []
  notes: "Response: (P,U)."

- id: ext_lock_ir
  label: Lock Out Internal I/R Receiver (Extended)
  kind: action
  command: "[L,I]"
  params: []
  notes: "Response: (I,L)."

- id: ext_unlock_ir
  label: Unlock Internal I/R Receiver (Extended)
  kind: action
  command: "[U,I]"
  params: []
  notes: "Response: (I,U)."

- id: ext_enable_blanking
  label: Turn On Display Blanking After 45 s Inactivity (Extended)
  kind: action
  command: "[+,B]"
  params: []
  notes: "Response: (B,+)."

- id: ext_disable_blanking
  label: Turn Off Display Blanking (Extended)
  kind: action
  command: "[-,B]"
  params: []
  notes: "Response: (B,-)."

- id: ext_select_professional_screen
  label: Select Professional Screen (Extended)
  kind: action
  command: "[+,P]"
  params: []
  notes: "Response: (P,+)."

- id: ext_select_residential_screen
  label: Select Residential Screen (Extended)
  kind: action
  command: "[-,P]"
  params: []
  notes: "Response: (P,-)."

# ----- Extended Command Set: Queries -----
- id: ext_query_unit_connection
  label: Query Unit Connection (Extended)
  kind: query
  command: "[?,C,R{x},O{n}]"
  params:
    - name: x
      type: string
      description: A/V router device A-L
    - name: n
      type: integer
      description: Zone 1-6
  notes: "Response: (R{x},O{n},I{m})."

- id: ext_query_main_connection
  label: Query Main Connection (Extended)
  kind: query
  command: "[?,C,M]"
  params: []
  notes: "Response: (M,I{m})."

- id: ext_query_all_connections
  label: Query All Connections (Extended)
  kind: query
  command: "[?,C,X]"
  params: []
  notes: |
    Response (multi-line, all six outputs per device, all devices, then main):
    (RA,O1,Im)(RA,O2,Im)(RA,O3,Im)(RA,O4,Im)(RA,O5,Im)(RA,O6,Im)
    (RB,O1,Im)(RB,O2,Im)(RB,O3,Im)(RB,O4,Im)(RB,O5,Im)(RB,O6,Im)
    ...through all devices...
    (M,Im)

- id: ext_query_panel_lockout
  label: Query Status of Panel Lockout (Extended)
  kind: query
  command: "[?,{L,U},P]"
  params: []
  notes: "Either [?,L,P] or [?,U,P]. Response: (P,{L,U})."

- id: ext_query_ir_lockout
  label: Query Status of Internal I/R Lockout (Extended)
  kind: query
  command: "[?,{L,U},I]"
  params: []
  notes: "Either [?,L,I] or [?,U,I]. Response: (I,{L,U})."

- id: ext_query_autoselect_lockout
  label: Query Status of AutoSelect Lockout (Extended)
  kind: query
  command: "[?,{L,U},A]"
  params: []
  notes: "Either [?,L,A] or [?,U,A]. Response: (A,{L,U})."

- id: ext_query_blanking
  label: Query Status of Display Blanking (Extended)
  kind: query
  command: "[?,{+,-},B]"
  params: []
  notes: "Either [?,+,B] or [?,-,B]. Response: (B,{+,-})."

- id: ext_query_screen
  label: Query Status of Display Screen (Extended)
  kind: query
  command: "[?,{+,-},P]"
  params: []
  notes: "Either [?,+,P] or [?,-,P]. Response: (P,{+,-})."

- id: ext_query_autoselect
  label: Query Status of AutoSelect Function (Extended)
  kind: query
  command: "[?,{+,-},A]"
  params: []
  notes: "Either [?,+,A] or [?,-,A]. Response: (A,{+,-})."
```

## Feedbacks
```yaml
- id: screen_mode
  type: enum
  values: [professional, residential, other]
  notes: "From ?P/?R query: P = professional, R = residential, S = any other screen (e.g. Setup)."

- id: panel_controls_locked
  type: enum
  values: [unlocked, locked]
  notes: "From ?V query: - unlocked, + locked."

- id: ir_receiver_locked
  type: enum
  values: [unlocked, locked_out]
  notes: "From ?W query: - unlocked, + locked out."

- id: main_output_source
  type: integer
  range: [1, 6]
  notes: "From ?M query: number of selected source."

- id: cat5_output_source
  type: integer
  range: [1, 6]
  notes: "From ?Z{w}{x} query: source number selected by wallplate/receiver wx."
```

## Variables
```yaml
# No continuous / settable numeric parameter ranges documented in the source beyond
# the discrete source/group/zone/router enum variables captured as action params.
# UNRESOLVED: no Variable-class parameters to enumerate.
```

## Events
```yaml
# Unsolicited notifications the device sends.
- id: power_up_reset
  type: notification
  payload: "(RESET)"
  notes: "Sent by the AVAtrix on power up. All Extended-Set state changes are also reported through the serial port, regardless of the origin of the command."

- id: invalid_command
  type: notification
  payload: "(ERROR)"
  notes: "Extended Set only: any bracketed command not in the Extended Command Set yields (ERROR)."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or
# power-on sequencing requirements beyond the (RESET) string on power up.
```

## Notes
- All commands in both sets are not case-sensitive. The only recognized characters are letters a-z/A-Z, digits 0-9, brackets `[ ]`, signs `+ -`, and `?`. Other characters (spaces, commas) are optional and may be included for clarity or omitted.
- Abbreviated commands ignore unspecified ASCII codes (control codes, unused alphanumeric characters, etc.).
- Extended responses are 8-bit with no parity and always end with `C/R L/F` (0x0d, 0x0a) after each line.
- On power up the AVAtrix sends `(RESET)` and echoes any received character. The echo function turns off after the first valid bracketed `[...]` Extended command is received, and remains off until the unit is reset (power cycle or double-press of the front panel knob).
- `G{z}{y}` (Select Group) is a no-op if zone groups have not been assigned.
- The AVM-562 internal Cat 5 row is always addressed `A`; 1176 expanders are addressed in ascending order (B, C, ...) per the manufacturer's site map (not reproduced in the source).

<!-- UNRESOLVED: firmware version compatibility, port number on a network variant (none in source — RS-232 only), and any fault-recovery sequences are not stated in the source. -->

## Provenance

```yaml
source_domains:
  - audioauthority.com
source_urls:
  - https://www.audioauthority.com/downloads/manuals/avm-562_manual752-495_2009-4.pdf
  - https://www.audioauthority.com/downloads/manuals/1173_ci_commands_2011-6.doc
  - https://www.audioauthority.com/techdocs/1173bkmanual752-587.pdf
retrieved_at: 2026-05-19T21:14:33.940Z
last_checked_at: 2026-06-02T21:40:09.137Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:40:09.137Z
matched_actions: 39
action_count: 39
confidence: medium
summary: "All 39 spec actions matched verbatim in source with correct transport parameters (9600 baud, 8-N-1, no flow control); bidirectional coverage confirmed. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "voltage, current, and any power-related electrical ratings (other than the ±15 VDC pin rating stated in the spec table) are not covered. Firmware version compatibility is not stated in the source."
- "no Variable-class parameters to enumerate."
- "no multi-step sequences described in the source."
- "source contains no explicit safety warnings, interlocks, or"
- "firmware version compatibility, port number on a network variant (none in source — RS-232 only), and any fault-recovery sequences are not stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
