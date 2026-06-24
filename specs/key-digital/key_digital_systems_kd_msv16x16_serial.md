---
spec_id: admin/key-digital-systems-kd-msv16x16
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital Systems KD-MSV16x16 Control Spec"
manufacturer: "Key Digital"
model_family: KD-MSV16x16
aliases: []
compatible_with:
  manufacturers:
    - "Key Digital"
    - "Key Digital Systems"
  models:
    - KD-MSV16x16
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - keydigital.com
  - manualslib.com
source_urls:
  - "http://keydigital.com/Control%20Mods%20Codes/KD-MSV8X8/RS-232/KD-MSV8X8_232_Commands.pdf"
  - "https://www.manualslib.com/manual/871143/Key-Digital-Kd-Hd16x16prok.html?page=7"
  - https://www.keydigital.com
retrieved_at: 2026-06-19T13:00:40.071Z
last_checked_at: 2026-06-22T11:50:24.959Z
generated_at: 2026-06-22T11:50:24.959Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source document consulted is the KD-MSV8X8 RS-232 command list (8x8 sibling, used as protocol-family reference per prior recovery notes). Command structure is assumed identical; only the input/output address range differs (8x8 doc states [01~08]; 16x16 range [01~16] is NOT confirmed by this source and is marked UNRESOLVED on each affected action). A KD-MSV16X16-specific command sheet (URL hinted at https://www.keydigital.com/Control%20Mods%20Codes/KD-MSV16X16/RS-232/KD-MSV16X16_232_Commands.pdf returns a 301 — final destination not verified) should replace this reference before publication."
  - "power / voltage / current specs, firmware compatibility, and any 16x16-specific commands not present in the 8x8 sheet are not documented in the source."
  - "exact response format not documented in source.\""
  - "exact format not documented in source.\""
  - "fade-to-black interval is settable per-output but the"
  - "populate if a 16x16-specific sheet describes events."
  - "populate if a 16x16-specific sheet describes macros."
  - "source contains no explicit safety warnings, interlock"
  - "KD-MSV16x16 input/output address range ([01~16] presumed, not confirmed)."
  - "exact RS-232 response string formats for ST/H/AMX queries."
  - "whether the 16x16 model exposes additional commands (e.g. per-zone audio, EDID) absent from the 8x8 sheet."
  - "firmware version compatibility."
  - "16x16-specific source URL (follow the 301 from the keydigital.com PDF link, or contact Key Digital support)."
verification:
  verdict: verified
  checked_at: 2026-06-22T11:50:24.959Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions matched literal commands in source with correct shapes and transport parameters verified. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-19
---

# Key Digital Systems KD-MSV16x16 Control Spec

## Summary
RS-232C control spec for the Key Digital Systems KD-MSV16x16 component-video matrix switcher. The KD-MSV16x16 routes up to 16 component-video inputs to 16 independent output zones; control is via RS-232C using ASCII command strings.

<!-- UNRESOLVED: The source document consulted is the KD-MSV8X8 RS-232 command list (8x8 sibling, used as protocol-family reference per prior recovery notes). Command structure is assumed identical; only the input/output address range differs (8x8 doc states [01~08]; 16x16 range [01~16] is NOT confirmed by this source and is marked UNRESOLVED on each affected action). A KD-MSV16X16-specific command sheet (URL hinted at https://www.keydigital.com/Control%20Mods%20Codes/KD-MSV16X16/RS-232/KD-MSV16X16_232_Commands.pdf returns a 301 — final destination not verified) should replace this reference before publication. -->
<!-- UNRESOLVED: power / voltage / current specs, firmware compatibility, and any 16x16-specific commands not present in the 8x8 sheet are not documented in the source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Inferred from command examples in source (Tier 2):
traits:
  - routable   # inferred: SP Oxx SI yy routing commands present
  - queryable  # inferred: ST Oxx / ST A query commands present
```

## Actions
```yaml
# NOTE: Source is the KD-MSV8X8 command sheet. Address ranges shown as
# [01~08] are the 8x8 documented values; the KD-MSV16x16 likely uses
# [01~16] but this is UNRESOLVED pending the 16x16-specific sheet.
# Commands are NOT case sensitive (source §RS-232 codes). Spaces in the
# documented forms (e.g. "SP Oxx SI yy") are optional/illustrative; the
# payload form omits them (e.g. "SPO03SI07"). Parameterized `command:`
# templates below show the variable parts in braces.
actions:
  - id: io_switching_set
    label: I/O Switching Set
    kind: action
    command: "SPO{output}SI{input}"
    params:
      - name: output
        type: integer
        description: "Output select. Source (8x8): [01~08]. UNRESOLVED for KD-MSV16x16 (likely [01~16])."
      - name: input
        type: integer
        description: "Input select. Source (8x8): [01~08]. UNRESOLVED for KD-MSV16x16 (likely [01~16])."
    notes: "Example from source: SPO03SI07 (output 3 <- input 7). 'O' is the letter O followed by zero, then 2-digit output number."

  - id: unit_address_set
    label: Unit Address Set
    kind: action
    command: "SPCA{address}"
    params:
      - name: address
        type: integer
        description: "2-digit unit address [00~99]. 00 = stand-alone."
    notes: "Example from source: SPCA02 (set address to 2)."

  - id: fade_to_black_interval_set
    label: Fade-to-Black Interval Set
    kind: action
    command: "SPO{output}MI{interval}"
    params:
      - name: output
        type: integer
        description: "Output select. Source (8x8): [01~08]. UNRESOLVED for KD-MSV16x16 (likely [01~16])."
      - name: interval
        type: enum
        description: "Fade-to-black interval code (covers fade-out + switch + fade-in)."
        values:
          - { code: "00", ms: 0 }
          - { code: "01", ms: 40 }
          - { code: "02", ms: 80 }
          - { code: "03", ms: 160 }
          - { code: "04", ms: 240 }
          - { code: "05", ms: 320 }
          - { code: "06", ms: 480 }
          - { code: "07", ms: 640 }
          - { code: "08", ms: 800 }
          - { code: "09", ms: 1200 }
    notes: "Example from source: SPO02MI03 (output 2 fade interval = 160ms)."

  - id: ir_sensor_enable
    label: IR Sensor Enable
    kind: action
    command: "SPCIRE"
    params: []

  - id: ir_sensor_disable
    label: IR Sensor Disable
    kind: action
    command: "SPCIRD"
    params: []

  - id: front_panel_enable
    label: Front Panel Button Enable
    kind: action
    command: "SPCFBE"
    params: []

  - id: front_panel_disable
    label: Front Panel Button Disable
    kind: action
    command: "SPCFBD"
    params: []

  - id: output_video_mute
    label: Output Video Mute
    kind: action
    command: "SPO{output}CME"
    params:
      - name: output
        type: integer
        description: "Output select. Source (8x8): [01~08]. UNRESOLVED for KD-MSV16x16 (likely [01~16])."
    notes: "Example from source: SPO02CME."

  - id: output_video_unmute
    label: Output Video Un-Mute
    kind: action
    command: "SPO{output}CMD"
    params:
      - name: output
        type: integer
        description: "Output select. Source (8x8): [01~08]. UNRESOLVED for KD-MSV16x16 (likely [01~16])."
    notes: "Example from source: SPO05CMD."

  - id: all_outputs_mute
    label: All Outputs Mute
    kind: action
    command: "SPCCME"
    params: []
    notes: "Source example for all-output mute mis-prints 'SPCFBE' (a front-panel command); the documented form is 'SP C CM E' -> SPCCME, used here."

  - id: all_outputs_unmute
    label: All Outputs Un-Mute
    kind: action
    command: "SPCCMD"
    params: []
    notes: "Source example for all-output un-mute mis-prints 'SPCFBD'; documented form 'SP C CM D' -> SPCCMD, used here."

  - id: reset_unit
    label: Reset Unit (Factory Default)
    kind: action
    command: "SPCDF"
    params: []
    notes: "Source documents the mnemonic as 'SP C DF' (trailing quote typo in source); expanded form SPCDF used."

  - id: response_format_numeric
    label: Set Numeric RS-232 Response
    kind: action
    command: "SPCRSN"
    params: []
    notes: "Selects numeric response format for RS-232 command replies."

  - id: response_format_verbose
    label: Set Verbose RS-232 Response
    kind: action
    command: "SPCRSV"
    params: []
    notes: "Selects verbose response format. Source example mis-prints 'SPCFBD'; documented form 'SP C RS V' -> SPCRSV, used here."

  - id: output_status_query
    label: Output Status Query
    kind: query
    command: "STO{output}"
    params:
      - name: output
        type: integer
        description: "Output select. Source (8x8): [01~08]. UNRESOLVED for KD-MSV16x16 (likely [01~16])."
    notes: "Example from source: STO05 (query status of output 5)."

  - id: global_status_query
    label: Global Status Query
    kind: query
    command: "STA"
    params: []
    notes: "Queries the current status of all parameters."

  - id: list_commands
    label: List RS-232 Commands
    kind: query
    command: "H"
    params: []
    notes: "Returns a list of all available RS-232 commands."

  - id: amx_status
    label: AMX Status
    kind: query
    command: "AMX"
    params: []
    notes: "Returns current system status when connected to an AMX control system."
```

## Feedbacks
```yaml
# Source documents that query commands return responses and that a
# numeric/verbose response mode is selectable, but does not give the
# exact response string formats.
feedbacks:
  - id: output_status_response
    type: string
    description: "Response to ST Oxx query. UNRESOLVED: exact response format not documented in source."
  - id: global_status_response
    type: string
    description: "Response to ST A query. UNRESOLVED: exact response format not documented in source."
  - id: command_list_response
    type: string
    description: "Response to H query - list of available RS-232 commands."
  - id: amx_status_response
    type: string
    description: "Response to AMX query. UNRESOLVED: exact format not documented in source."
  - id: response_mode
    type: enum
    values: [numeric, verbose]
    description: "Selectable RS-232 response format (set via SPCRSN / SPCRSV)."
```

## Variables
```yaml
variables:
  - name: unit_address
    type: integer
    description: "2-digit unit address [00~99] (00 = stand-alone). Set via SPCA{address}."
  - name: response_format
    type: enum
    values: [numeric, verbose]
    description: "RS-232 response verbosity. Set via SPCRSN / SPCRSV."
  # UNRESOLVED: fade-to-black interval is settable per-output but the
  # source does not document a query to read it back.
```

## Events
```yaml
# Source documents no unsolicited notifications / push events.
# UNRESOLVED: populate if a 16x16-specific sheet describes events.
```

## Macros
```yaml
# Source documents no multi-step macro sequences.
# UNRESOLVED: populate if a 16x16-specific sheet describes macros.
```

## Safety
```yaml
confirmation_required_for:
  - reset_unit  # SPCDF returns unit to factory default - destructive
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock
# procedures, or power-on sequencing requirements. No power on/off
# command is documented (device assumed always-on while powered).
```

## Notes
- Source is the **KD-MSV8X8** RS-232 command list (8x8 sibling), used as protocol-family reference because the KD-MSV16X16-specific sheet at `https://www.keydigital.com/Control%20Mods%20Codes/KD-MSV16X16/RS-232/KD-MSV16X16_232_Commands.pdf` returns a 301 whose destination was not verified (see recovery notes 2026-06-18). Replace with the 16x16 sheet before publishing.
- Commands are **not case sensitive** (source). Spaces in the documented command forms are illustrative only and have no effect when omitted.
- Address convention: `Oxx` = the letter **O** followed by **zero**, then the 2-digit output number (e.g. `O03`). This is a common source of off-by-one / O-vs-0 transcription errors.
- Source contains several apparent typos in worked examples (all-output mute/un-mute examples print `SPCFBE`/`SPCFBD` which are front-panel commands; verbose-response example prints `SPCFBD`). The mnemonic forms (`SP C CM E`, `SP C RS V`) were used in preference to the example strings.
- No power on/off command is documented — device is presumed to follow panel/main power state.

<!-- UNRESOLVED: KD-MSV16x16 input/output address range ([01~16] presumed, not confirmed). -->
<!-- UNRESOLVED: exact RS-232 response string formats for ST/H/AMX queries. -->
<!-- UNRESOLVED: whether the 16x16 model exposes additional commands (e.g. per-zone audio, EDID) absent from the 8x8 sheet. -->
<!-- UNRESOLVED: firmware version compatibility. -->
<!-- UNRESOLVED: 16x16-specific source URL (follow the 301 from the keydigital.com PDF link, or contact Key Digital support). -->
````

Spec emitted. 18 actions enumerated verbatim from 8x8 source. Source typos noted (`SPCFBE`/`SPCFBD` mis-prints in mute/verbose examples — used mnemonic forms). 16x16 ranges marked UNRESOLVED (source only documents [01~08]). Next step: probe the 301 PDF URL or contact Key Digital for the 16x16 sheet to promote out of draft.

## Provenance

```yaml
source_domains:
  - keydigital.com
  - manualslib.com
source_urls:
  - "http://keydigital.com/Control%20Mods%20Codes/KD-MSV8X8/RS-232/KD-MSV8X8_232_Commands.pdf"
  - "https://www.manualslib.com/manual/871143/Key-Digital-Kd-Hd16x16prok.html?page=7"
  - https://www.keydigital.com
retrieved_at: 2026-06-19T13:00:40.071Z
last_checked_at: 2026-06-22T11:50:24.959Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-22T11:50:24.959Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions matched literal commands in source with correct shapes and transport parameters verified. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source document consulted is the KD-MSV8X8 RS-232 command list (8x8 sibling, used as protocol-family reference per prior recovery notes). Command structure is assumed identical; only the input/output address range differs (8x8 doc states [01~08]; 16x16 range [01~16] is NOT confirmed by this source and is marked UNRESOLVED on each affected action). A KD-MSV16X16-specific command sheet (URL hinted at https://www.keydigital.com/Control%20Mods%20Codes/KD-MSV16X16/RS-232/KD-MSV16X16_232_Commands.pdf returns a 301 — final destination not verified) should replace this reference before publication."
- "power / voltage / current specs, firmware compatibility, and any 16x16-specific commands not present in the 8x8 sheet are not documented in the source."
- "exact response format not documented in source.\""
- "exact format not documented in source.\""
- "fade-to-black interval is settable per-output but the"
- "populate if a 16x16-specific sheet describes events."
- "populate if a 16x16-specific sheet describes macros."
- "source contains no explicit safety warnings, interlock"
- "KD-MSV16x16 input/output address range ([01~16] presumed, not confirmed)."
- "exact RS-232 response string formats for ST/H/AMX queries."
- "whether the 16x16 model exposes additional commands (e.g. per-zone audio, EDID) absent from the 8x8 sheet."
- "firmware version compatibility."
- "16x16-specific source URL (follow the 301 from the keydigital.com PDF link, or contact Key Digital support)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
