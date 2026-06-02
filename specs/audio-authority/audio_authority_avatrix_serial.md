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
  - https://www.audioauthority.com/techdocs/1173bkmanual752-587.pdf
retrieved_at: 2026-05-20T19:02:48.401Z
last_checked_at: 2026-06-02T17:21:27.893Z
generated_at: 2026-06-02T17:21:27.893Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "no settable parameters separate from discrete routing actions are defined in source"
  - "no multi-step macro sequences defined in source"
  - "no safety warnings or interlock procedures stated in source"
  - "firmware version compatibility not stated in source; valid router-letter range upper bound for any given physical configuration (source documents A–L as the protocol range but does not state max expanders)"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:27.893Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec actions matched literal wire-level commands in source; transport parameters (9600 baud, 8 data bits, no parity, no flow control, DB-9 connector) verified; one-to-one coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Audio Authority AVAtrix Control Spec

## Summary
Audio Authority AVAtrix (AVM-562 main unit and 1176 expanders) is an A/V matrix router controllable over RS-232. The source documents two protocols: an Abbreviated Command Set (simple, one-way) and an Extended Command Set (full reporting, bracket-wrapped). Both sets share a single 9600-baud serial port; on power-up the device echoes characters until any valid bracketed extended command turns echo off.

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
  connector: DB-9
  pinout:
    pin_2: Tx
    pin_3: Rx
    pin_5: Ground
    shell: Ground
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable     # inferred from zone/group/all routing commands
- queryable    # inferred from ? query commands
```

## Actions
```yaml
# --- Abbreviated Command Set: General ---
- id: select_professional_screen_abbr
  label: Select Professional Screen (Abbreviated)
  kind: action
  command: "P"
  params: []

- id: select_residential_screen_abbr
  label: Select Residential Screen (Abbreviated)
  kind: action
  command: "R"
  params: []

- id: unlock_panel_abbr
  label: Unlock Front Panel Controls (Abbreviated)
  kind: action
  command: "V-"
  params: []

- id: lock_panel_abbr
  label: Lock Front Panel Controls (Abbreviated)
  kind: action
  command: "V+"
  params: []

- id: unlock_ir_abbr
  label: Unlock Front Panel Optical IR Receiver (Abbreviated)
  kind: action
  command: "W-"
  params: []

- id: lock_ir_abbr
  label: Lockout Front Panel Optical IR Receiver (Abbreviated)
  kind: action
  command: "W+"
  params: []

- id: disable_display_blanking_abbr
  label: Disable Display Blanking (Abbreviated)
  kind: action
  command: "Y-"
  params: []

- id: enable_display_blanking_abbr
  label: Enable Display Blanking (Abbreviated)
  kind: action
  command: "Y+"
  params: []

# --- Abbreviated Command Set: Source Selection ---
- id: select_zone_abbr
  label: Select Source to Individual Zone (Abbreviated)
  kind: action
  command: "Z{row}{column}{source}"
  params:
    - name: row
      type: enum
      values: [A, B, C, D, E, F, G, H, I, J, K, L]
      description: Row letter (AVM-562 Cat 5 array or 1176 expander)
    - name: column
      type: integer
      description: Column 1-6 (output number)
    - name: source
      type: integer
      description: Source 1-6

- id: select_group_abbr
  label: Select Source to Group (Abbreviated)
  kind: action
  command: "G{group}{source}"
  params:
    - name: group
      type: integer
      description: Group 1-6
    - name: source
      type: integer
      description: Source 1-6

- id: select_all_abbr
  label: Select Source to All Zones (Abbreviated)
  kind: action
  command: "X{source}"
  params:
    - name: source
      type: integer
      description: Source 1-6

- id: select_main_abbr
  label: Select Source to Main Output (Abbreviated)
  kind: action
  command: "M{source}"
  params:
    - name: source
      type: integer
      description: Source 1-6

# --- Abbreviated Query Commands ---
- id: query_screen_mode_abbr
  label: Query Screen Mode (Abbreviated)
  kind: query
  command: "?P"
  params: []

- id: query_panel_controls_abbr
  label: Query Front Panel Controls Lockout (Abbreviated)
  kind: query
  command: "?V"
  params: []

- id: query_panel_ir_abbr
  label: Query Front Panel IR Receiver Lockout (Abbreviated)
  kind: query
  command: "?W"
  params: []

- id: query_main_output_abbr
  label: Query Main Output Source (Abbreviated)
  kind: query
  command: "?M"
  params: []

- id: query_cat5_output_abbr
  label: Query Cat 5 Zone Output Source (Abbreviated)
  kind: query
  command: "?Z{row}{column}"
  params:
    - name: row
      type: enum
      values: [A, B, C, D, E, F, G, H, I, J, K, L]
      description: Row letter
    - name: column
      type: integer
      description: Column 1-6

# --- Extended Command Set: General ---
- id: connect_main_to_source_ext
  label: Connect Main Output to Source (Extended)
  kind: action
  command: "[C,M,Im]"
  params:
    - name: m
      type: integer
      description: Source m in range 1-6

- id: connect_zone_to_source_ext
  label: Connect Router Zone to Source (Extended)
  kind: action
  command: "[C,Rx,On,Im]"
  params:
    - name: x
      type: enum
      values: [A, B, C, D, E, F, G, H, I, J, K, L]
      description: A/V router device x in range A-L
    - name: n
      type: integer
      description: Zone n in range 1-6
    - name: m
      type: integer
      description: Source m in range 1-6

- id: connect_all_to_source_ext
  label: Connect All Zones on All Routers to Source (Extended)
  kind: action
  command: "[C,X,Im]"
  params:
    - name: m
      type: integer
      description: Source m in range 1-6

- id: connect_group_to_source_ext
  label: Connect Group to Source (Extended)
  kind: action
  command: "[C,Gj,Im]"
  params:
    - name: j
      type: integer
      description: Group j in range 1-6
    - name: m
      type: integer
      description: Source m in range 1-6

- id: lock_panel_ext
  label: Lock Out Front Panel Controls (Extended)
  kind: action
  command: "[L,P]"
  params: []

- id: unlock_panel_ext
  label: Unlock Front Panel Controls (Extended)
  kind: action
  command: "[U,P]"
  params: []

- id: lock_ir_ext
  label: Lock Out Internal I/R Receiver (Extended)
  kind: action
  command: "[L,I]"
  params: []

- id: unlock_ir_ext
  label: Unlock Internal I/R Receiver (Extended)
  kind: action
  command: "[U,I]"
  params: []

- id: enable_display_blanking_ext
  label: Turn On Display Blanking After 45s Inactivity (Extended)
  kind: action
  command: "[+,B]"
  params: []

- id: disable_display_blanking_ext
  label: Turn Off Display Blanking (Extended)
  kind: action
  command: "[-,B]"
  params: []

- id: select_professional_screen_ext
  label: Select Professional Screen (Extended)
  kind: action
  command: "[+,P]"
  params: []

- id: select_residential_screen_ext
  label: Select Residential Screen (Extended)
  kind: action
  command: "[-,P]"
  params: []

# --- Extended Query Commands ---
- id: query_unit_connection_ext
  label: Query Unit Zone Connection (Extended)
  kind: query
  command: "[?,C,Rx,On]"
  params:
    - name: x
      type: enum
      values: [A, B, C, D, E, F, G, H, I, J, K, L]
      description: A/V router device x in range A-L
    - name: n
      type: integer
      description: Zone n in range 1-6

- id: query_main_connection_ext
  label: Query Main Connection (Extended)
  kind: query
  command: "[?,C,M]"
  params: []

- id: query_all_connections_ext
  label: Query All Connections (Extended)
  kind: query
  command: "[?,C,X]"
  params: []

- id: query_panel_lockout_ext
  label: Query Status of Panel Lockout (Extended)
  kind: query
  command: "[?,{L,U},P]"
  params: []

- id: query_ir_lockout_ext
  label: Query Status of Internal I/R Lockout (Extended)
  kind: query
  command: "[?,{L,U},I]"
  params: []

- id: query_autoselect_lockout_ext
  label: Query Status of AutoSelect Lockout (Extended)
  kind: query
  command: "[?,{L,U},A]"
  params: []

- id: query_display_blanking_ext
  label: Query Status of Display Blanking (Extended)
  kind: query
  command: "[?,{+,-},B]"
  params: []

- id: query_display_screen_ext
  label: Query Status of Display Screen (Extended)
  kind: query
  command: "[?,{+,-},P]"
  params: []

- id: query_autoselect_function_ext
  label: Query Status of AutoSelect Function (Extended)
  kind: query
  command: "[?,{+,-},A]"
  params: []
```

## Feedbacks
```yaml
- id: screen_mode
  type: enum
  values: [P, R, S]
  description: Screen mode response - P=Professional, R=Residential, S=any other screen (e.g. Setup)

- id: panel_lockout
  type: enum
  values: ["-", "+"]
  description: Panel controls state - "-" unlocked, "+" locked

- id: ir_lockout
  type: enum
  values: ["-", "+"]
  description: IR receiver state - "-" unlocked, "+" locked out

- id: main_output_source
  type: integer
  description: Selected source number on main output (response to ?M)

- id: cat5_output_source
  type: integer
  description: Selected source number on a wallplate/receiver zone (response to ?Zwx)

- id: connection_response_ext
  type: string
  description: Extended response of form (Rx,On,Im) reporting router x zone n connected to source m

- id: main_connection_response_ext
  type: string
  description: Extended response of form (M,Im) reporting main output connected to source m

- id: group_connection_response_ext
  type: string
  description: Extended response of form (Gj,Im) reporting group j connected to source m

- id: all_zones_connection_response_ext
  type: string
  description: Extended response of form (X,Im) reporting all-zones connected to source m

- id: panel_lockout_response_ext
  type: enum
  values: ["(P,L)", "(P,U)"]
  description: Panel lockout extended response

- id: ir_lockout_response_ext
  type: enum
  values: ["(I,L)", "(I,U)"]
  description: I/R lockout extended response

- id: autoselect_lockout_response_ext
  type: enum
  values: ["(A,L)", "(A,U)"]
  description: AutoSelect lockout extended response

- id: display_blanking_response_ext
  type: enum
  values: ["(B,+)", "(B,-)"]
  description: Display blanking extended response

- id: display_screen_response_ext
  type: enum
  values: ["(P,+)", "(P,-)"]
  description: Display screen extended response

- id: autoselect_function_response_ext
  type: enum
  values: ["(A,+)", "(A,-)"]
  description: AutoSelect function extended response

- id: all_connections_dump_ext
  type: string
  description: Full system state dump in response to [?,C,X] - concatenated (Rx,On,Im) tuples across all routers/zones followed by (M,Im)

- id: error_response_ext
  type: string
  description: "(ERROR) - emitted when a bracketed command is not in the Extended Command Set"

- id: reset_notification_ext
  type: string
  description: "(RESET) - emitted on power up"
```

## Variables
```yaml
# UNRESOLVED: no settable parameters separate from discrete routing actions are defined in source
```

## Events
```yaml
- id: reset_event
  description: AVAtrix emits "(RESET)" on power up
  payload: "(RESET)"

- id: state_change_report_ext
  description: Extended Command Set reports all system changes through the serial port regardless of the origin of the command (front panel, IR, or RS-232). Reports use the same (...) response syntax as the corresponding extended commands.
  payload: "(...)"  # one of the connection_response_ext / *_response_ext forms above
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
- Two protocols share the same 9600 baud serial port; commands from either or both sets may be mixed.
- Alpha characters are case-insensitive in both sets.
- In the Extended set, only the characters `a-z`, `A-Z`, `0-9`, `[`, `]`, `+`, `-`, and `?` are recognized — all other characters (spaces, commas) are optional and ignored.
- Responses in the Extended set always terminate with CR LF (0x0D, 0x0A).
- Any bracketed string not in the Extended Command Set returns `(ERROR)`.
- Echo behavior: on power up the AVAtrix echoes every received character. The first valid bracketed Extended command silently disables echo to prevent it from corrupting subsequent responses. Echo remains off until the AVAtrix is reset (power cycle or double-press of the front panel knob).
- Row addressing: "A" is always the AVM-562 internal Cat 5 array; "B"–"L" address attached 1176 expanders in order.
- Electrical: DB-9 connector, Tx on pin 2, Rx on pin 3, Ground on pin 5 and shell, ±15 VDC on pins 2/3. Null-modem cable available from Audio Authority.
<!-- UNRESOLVED: firmware version compatibility not stated in source; valid router-letter range upper bound for any given physical configuration (source documents A–L as the protocol range but does not state max expanders) -->

## Provenance

```yaml
source_domains:
  - audioauthority.com
source_urls:
  - https://www.audioauthority.com/downloads/manuals/avm-562_manual752-495_2009-4.pdf
  - https://www.audioauthority.com/downloads/manuals/1173_ci_commands_2011-6.doc
  - https://www.audioauthority.com/techdocs/1173bkmanual752-587.pdf
retrieved_at: 2026-05-20T19:02:48.401Z
last_checked_at: 2026-06-02T17:21:27.893Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:27.893Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec actions matched literal wire-level commands in source; transport parameters (9600 baud, 8 data bits, no parity, no flow control, DB-9 connector) verified; one-to-one coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "no settable parameters separate from discrete routing actions are defined in source"
- "no multi-step macro sequences defined in source"
- "no safety warnings or interlock procedures stated in source"
- "firmware version compatibility not stated in source; valid router-letter range upper bound for any given physical configuration (source documents A–L as the protocol range but does not state max expanders)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
