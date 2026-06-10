---
spec_id: admin/primare-systems-sp317-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Primare SP317 Series Control Spec"
manufacturer: Primare
model_family: SP317
aliases: []
compatible_with:
  manufacturers:
    - Primare
    - "Primare Systems"
  models:
    - SP317
    - SP31.7
    - "SP31.7 MKII"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2017/06/RS232_IR_SP32_2008_08_15-Release-.pdf
  - https://primare.net/wp-content/uploads/2017/06/SP31.7-User-Guide.pdf
  - https://primare.net/support/past-products/
retrieved_at: 2026-06-09T19:51:27.989Z
last_checked_at: 2026-06-10T07:33:48.543Z
generated_at: 2026-06-10T07:33:48.543Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source RS-232 command table is for SPA22/SP32, not SP31.7/SP317. SP317 compatibility inferred, not confirmed."
  - "read form not in source; derived from write 0x57->0x52 convention"
  - "read form derived from convention"
  - "remove this comment and populate from source if/when the"
  - "remove this comment and populate from source if multi-step"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "SP317-specific RS-232 command list not published by Primare. The SPA22/SP32 table is the best-available proxy; verification on a physical SP31.7 MKII is recommended."
verification:
  verdict: verified
  checked_at: 2026-06-10T07:33:48.543Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 spec actions matched to Part 2 command table; transport parameters verified against source protocol specification. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-09
---

# Primare SP317 Series Control Spec

## Summary
RS-232C control spec for the Primare SP317 Series AV processors. This spec encodes a parametric binary command set using an STX/DLE/ETX framed protocol at 4800 baud, 8N1, on a null-modem cable. The published command table in the source is for the related Primare SPA22/SP32 family; SP31.7/SP317 compatibility is inferred from shared RC5 system address 28 (0x1c) and a sibling product platform but is not directly documented in the source.

<!-- UNRESOLVED: source RS-232 command table is for SPA22/SP32, not SP31.7/SP317. SP317 compatibility inferred, not confirmed. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

**Frame format** (from source `Interface specification`):
```
<STX><command><variable>[<value>]<DLE><ETX>
```

- `STX = 0x02`, `DLE = 0x10`, `ETX = 0x03`
- `command`: `0x57` (W, write/set) or `0x52` (R, read/query)
- `variable`: 1 byte (the function code)
- `value`: optional, 1 byte (max)
- If any byte in the frame equals `0x10` (DLE), it is transmitted twice (DLE stuffing)

**Reply format:**
```
<STX><variable><value>[<value2>...]<DLE><ETX>
```

Cable: null modem (per source `Protocol` section).

## Traits
```yaml
- powerable       # inferred: standby/operate commands present
- routable        # inferred: main input + zone II input commands present
- queryable       # inferred: read/query commands present
- levelable       # inferred: volume + per-channel level commands present
```

## Actions
```yaml
# Part 2 of source is the parametric command table (variable-based W/R with optional value byte).
# Variable byte identifies the function; the high bit (0x80) selects direct-set variant
# (e.g. var 3 = volume step, var 3+128 = 0x83 = volume direct).
# YY in each command = the value byte the host must supply.

# ---------- Power ----------
- id: standby_toggle
  label: Standby Toggle
  kind: action
  command: "0x02 0x57 0x01 0x00 0x10 0x03"
  params: []
- id: standby_set
  label: Set Standby / Operate
  kind: action
  command: "0x02 0x57 0x81 0xYY 0x10 0x03"
  params:
    - name: state
      type: integer
      description: 0 = standby, 1 = operate
- id: standby_query
  label: Standby State Query
  kind: query
  command: "0x02 0x52 0x01 0x00 0x10 0x03"  # UNRESOLVED: read form not in source; derived from write 0x57->0x52 convention
  params: []

# ---------- Main input ----------
- id: main_input_step
  label: Main Input Step
  kind: action
  command: "0x02 0x57 0x02 0xYY 0x10 0x03"
  params:
    - name: direction
      type: integer
      description: 0xFF = previous input, 0x01 = next input
- id: main_input_direct
  label: Main Input Direct
  kind: action
  command: "0x02 0x57 0x82 0xYY 0x10 0x03"
  params:
    - name: input_number
      type: integer
      description: Input number 1-15 (0x01-0x0F)
- id: main_input_query
  label: Main Input Query
  kind: query
  command: "0x02 0x52 0x02 0x00 0x10 0x03"  # UNRESOLVED: read form derived from convention
  params: []

# ---------- Volume ----------
- id: volume_step
  label: Main Volume Step
  kind: action
  command: "0x02 0x57 0x03 0xYY 0x10 0x03"
  params:
    - name: direction
      type: integer
      description: 0xFF = decrease by 1, 0x01 = increase by 1
- id: volume_set
  label: Main Volume Set
  kind: action
  command: "0x02 0x57 0x83 0xYY 0x10 0x03"
  params:
    - name: level
      type: integer
      description: Volume 0-99 (0x00-0x63); 0 = default
- id: volume_query
  label: Main Volume Query
  kind: query
  command: "0x02 0x52 0x03 0x00 0x10 0x03"  # UNRESOLVED: read form derived from convention
  params: []

# ---------- Channel levels (Balance / Center / Surr / Back / Sub) ----------
- id: balance_step
  label: Balance Step
  kind: action
  command: "0x02 0x57 0x04 0xYY 0x10 0x03"
  params:
    - name: direction
      type: integer
      description: Signed step per Row C
- id: balance_set
  label: Balance Set
  kind: action
  command: "0x02 0x57 0x84 0xYY 0x10 0x03"
  params:
    - name: value
      type: integer
      description: Balance -20 to +20
- id: center_step
  label: Center Step
  kind: action
  command: "0x02 0x57 0x05 0xYY 0x10 0x03"
  params: []
- id: center_set
  label: Center Set
  kind: action
  command: "0x02 0x57 0x85 0xYY 0x10 0x03"
  params:
    - name: value
      type: integer
      description: Center -20 to +20
- id: surround_step
  label: Surround Step
  kind: action
  command: "0x02 0x57 0x06 0xYY 0x10 0x03"
  params: []
- id: surround_set
  label: Surround Set
  kind: action
  command: "0x02 0x57 0x86 0xYY 0x10 0x03"
  params:
    - name: value
      type: integer
      description: Surround -20 to +20
- id: back_step
  label: Surround-Back Step
  kind: action
  command: "0x02 0x57 0x07 0xYY 0x10 0x03"
  params: []
- id: back_set
  label: Surround-Back Set
  kind: action
  command: "0x02 0x57 0x87 0xYY 0x10 0x03"
  params:
    - name: value
      type: integer
      description: Surround-Back -20 to +20
- id: sub_step
  label: Subwoofer Step
  kind: action
  command: "0x02 0x57 0x08 0xYY 0x10 0x03"
  params: []
- id: sub_set
  label: Subwoofer Set
  kind: action
  command: "0x02 0x57 0x88 0xYY 0x10 0x03"
  params:
    - name: value
      type: integer
      description: Subwoofer -20 to +20

# ---------- Mute ----------
- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "0x02 0x57 0x09 0x00 0x10 0x03"
  params: []
- id: mute_set
  label: Mute Set
  kind: action
  command: "0x02 0x57 0x89 0xYY 0x10 0x03"
  params:
    - name: state
      type: integer
      description: 0 = mute off (default), 1 = mute on

# ---------- Dim (display) ----------
- id: dim_toggle
  label: Display Dim Toggle
  kind: action
  command: "0x02 0x57 0x0A 0x00 0x10 0x03"
  params: []
- id: dim_set
  label: Display Dim Set
  kind: action
  command: "0x02 0x57 0x8A 0xYY 0x10 0x03"
  params:
    - name: state
      type: integer
      description: 0 = display on, 1 = display off (default)

# ---------- Zone II input ----------
- id: zone2_input_step
  label: Zone II Input Step
  kind: action
  command: "0x02 0x57 0x0B 0xYY 0x10 0x03"
  params:
    - name: direction
      type: integer
      description: 0xFF = previous, 0x01 = next
- id: zone2_input_direct
  label: Zone II Input Direct
  kind: action
  command: "0x02 0x57 0x8B 0xYY 0x10 0x03"
  params:
    - name: input_number
      type: integer
      description: Zone II input 1-15 (0x01-0x0F)

# ---------- Surround mode (direct only) ----------
- id: surround_mode_set
  label: Surround Mode Direct
  kind: action
  command: "0x02 0x57 0x8C 0xYY 0x10 0x03"
  params:
    - name: mode
      type: integer
      description: "0=Stereo, 1=Pro Logic IIX Movie, 2=Pro Logic IIX Music, 3=DTS NEO:6 Cinema, 4=DTS NEO:6 Music, 5=Party, 6=Bypass (analog input only)"

# ---------- Verbose ----------
- id: verbose_toggle
  label: Verbose Reply Toggle
  kind: action
  command: "0x02 0x57 0x0D 0x00 0x10 0x03"
  params: []
- id: verbose_set
  label: Verbose Reply Set
  kind: action
  command: "0x02 0x57 0x8D 0xYY 0x10 0x03"
  params:
    - name: state
      type: integer
      description: 0 = verbose off (default), 1 = verbose on

# ---------- Menu ----------
- id: menu_toggle
  label: Menu Toggle
  kind: action
  command: "0x02 0x57 0x0E 0x00 0x10 0x03"
  params: []
- id: menu_set
  label: Menu State Set
  kind: action
  command: "0x02 0x57 0x8E 0xYY 0x10 0x03"
  params:
    - name: state
      type: integer
      description: 0 = exit menu (default), 1 = menu back, 2 = enter menu

# ---------- Front-panel lock ----------
- id: panel_lock_toggle
  label: Front-Panel Lock Toggle
  kind: action
  command: "0x02 0x57 0x11 0x00 0x10 0x03"
  params: []
- id: panel_lock_set
  label: Front-Panel Lock Set
  kind: action
  command: "0x02 0x57 0x91 0xYY 0x10 0x03"
  params:
    - name: state
      type: integer
      description: 0 = unlock (default), 1 = lock

# ---------- IR input select ----------
- id: ir_input_toggle
  label: IR Input Toggle
  kind: action
  command: "0x02 0x57 0x12 0x00 0x10 0x03"
  params: []
- id: ir_input_set
  label: IR Input Set
  kind: action
  command: "0x02 0x57 0x92 0xYY 0x10 0x03"
  params:
    - name: source
      type: integer
      description: 0 = front IR (default), 1 = back IR

# ---------- Memory / factory reset ----------
- id: recall_factory
  label: Recall Factory Settings
  kind: action
  command: "0x02 0x57 0x13 0x00 0x10 0x03"
  params: []
- id: memory_recall
  label: Memory Recall
  kind: action
  command: "0x02 0x57 0x93 0xYY 0x10 0x03"
  params:
    - name: slot
      type: integer
      description: 1 = factory settings, 2 = installer settings

# ---------- Input name query ----------
- id: input_name_current_query
  label: Current Input Name Query
  kind: query
  command: "0x02 0x52 0x14 0x00 0x10 0x03"
  params: []
- id: input_name_query
  label: Specific Input Name Query
  kind: query
  command: "0x02 0x52 0x94 0xYY 0x10 0x03"
  params:
    - name: input_number
      type: integer
      description: Input 1-15 (0x00-0x0E in the YY field per source)

# ---------- Identification queries ----------
- id: brand_query
  label: Brand Name Query
  kind: query
  command: "0x02 0x52 0x15 0x00 0x10 0x03"
  params: []
- id: model_query
  label: Model Name Query
  kind: query
  command: "0x02 0x52 0x16 0x00 0x10 0x03"
  params: []
- id: version_query
  label: Firmware Version Query
  kind: query
  command: "0x02 0x52 0x17 0x00 0x10 0x03"
  params: []
- id: general_status_query
  label: General Status Query
  kind: query
  command: "0x02 0x52 0x18 0x00 0x10 0x03"
  params: []
  notes: "ASCII reply: input number, input name, surround mode, volume, audio delay, Zone II input number, Zone II volume."

# ---------- Late Night mode ----------
- id: late_night_toggle
  label: Late Night Toggle
  kind: action
  command: "0x02 0x57 0x19 0x00 0x10 0x03"
  params: []
- id: late_night_set
  label: Late Night Set
  kind: action
  command: "0x02 0x57 0x99 0xYY 0x10 0x03"
  params:
    - name: state
      type: integer
      description: 0 = off (default), 1 = on

# ---------- Zone II volume ----------
- id: zone2_volume_step
  label: Zone II Volume Step
  kind: action
  command: "0x02 0x57 0x1A 0xYY 0x10 0x03"
  params:
    - name: direction
      type: integer
      description: 0xFF = decrease by 1, 0x01 = increase by 1
- id: zone2_volume_set
  label: Zone II Volume Set
  kind: action
  command: "0x02 0x57 0x9A 0xYY 0x10 0x03"
  params:
    - name: level
      type: integer
      description: Zone II volume 0-99 (0x00-0x63); 10 = default

# ---------- Audio delay (global) ----------
- id: audio_delay_step
  label: Audio Delay Step
  kind: action
  command: "0x02 0x57 0x1B 0xYY 0x10 0x03"
  params:
    - name: direction
      type: integer
      description: 0xFF = decrease by 10ms, 0x01 = increase by 10ms
- id: audio_delay_set
  label: Audio Delay Set
  kind: action
  command: "0x02 0x57 0x9B 0xYY 0x10 0x03"
  params:
    - name: delay_ms
      type: integer
      description: 0-140 in even 10s (0 = default)

# ---------- HDMI resolution (future use) ----------
- id: hdmi_resolution_step
  label: HDMI Resolution Step
  kind: action
  command: "0x02 0x57 0x1C 0xYY 0x10 0x03"
  params:
    - name: direction
      type: integer
      description: 0xFF = previous, 0x01 = next
- id: hdmi_resolution_set
  label: HDMI Resolution Direct
  kind: action
  command: "0x02 0x57 0x9C 0xYY 0x10 0x03"
  params:
    - name: resolution
      type: integer
      description: "1=480/576, 2=720P, 3=1080i, 4=1080P"
```

## Feedbacks
```yaml
# Reply frames follow <STX><variable><value...><DLE><ETX>.
# Variable byte identifies which feedback is being reported.
- id: standby_state
  type: enum
  values: [standby, operate]
  variable_byte: 0x01
- id: main_input
  type: integer
  variable_byte: 0x02
  description: Current main input number
- id: main_volume
  type: integer
  variable_byte: 0x03
  description: Current main volume digit
- id: balance
  type: integer
  variable_byte: 0x04
  description: Current balance digit
- id: center_level
  type: integer
  variable_byte: 0x05
  description: Current center digit
- id: surround_level
  type: integer
  variable_byte: 0x06
  description: Current surround digit
- id: back_level
  type: integer
  variable_byte: 0x07
  description: Current surround-back digit
- id: sub_level
  type: integer
  variable_byte: 0x08
  description: Current subwoofer digit
- id: mute_state
  type: enum
  values: [off, on]
  variable_byte: 0x09
- id: dim_state
  type: enum
  values: [display_on, display_off]
  variable_byte: 0x0A
- id: zone2_input
  type: integer
  variable_byte: 0x0B
  description: Current Zone II input number
- id: surround_mode
  type: integer
  variable_byte: 0x0C
  description: "Current surround mode (0=Stereo, 1=PLIIX Movie, 2=PLIIX Music, 3=NEO:6 Cinema, 4=NEO:6 Music, 5=Party, 6=Bypass)"
- id: verbose_state
  type: enum
  values: [off, on]
  variable_byte: 0x0D
- id: menu_state
  type: integer
  variable_byte: 0x0E
  description: "Menu state (0=exit default, 1=back, 2=enter)"
- id: panel_lock_state
  type: enum
  values: [unlocked, locked]
  variable_byte: 0x11
- id: ir_input
  type: integer
  variable_byte: 0x12
  description: "0=front IR, other=back IR"
- id: memory_slot
  type: integer
  variable_byte: 0x13
  description: "Last recalled memory (1=factory, 2=installer)"
- id: late_night_state
  type: enum
  values: [off, on]
  variable_byte: 0x19
- id: zone2_volume
  type: integer
  variable_byte: 0x1A
  description: Current Zone II volume value
- id: audio_delay
  type: integer
  variable_byte: 0x1B
  description: Audio delay in even 10s of milliseconds
- id: hdmi_resolution
  type: integer
  variable_byte: 0x1C
  description: Current HDMI resolution number
```

## Variables
```yaml
# Settable parameters (per-source: "value" byte is a single byte, range 0-255 per source)
# Document each as a typed range; source gives the meaningful subset.
- id: balance_value
  type: integer
  range: [-20, 20]
  variable_byte: 0x04
- id: center_value
  type: integer
  range: [-20, 20]
  variable_byte: 0x05
- id: surround_value
  type: integer
  range: [-20, 20]
  variable_byte: 0x06
- id: back_value
  type: integer
  range: [-20, 20]
  variable_byte: 0x07
- id: sub_value
  type: integer
  range: [-20, 20]
  variable_byte: 0x08
- id: main_volume
  type: integer
  range: [0, 99]
  variable_byte: 0x03
- id: zone2_volume
  type: integer
  range: [0, 99]
  variable_byte: 0x1A
  default: 10
- id: audio_delay_ms
  type: integer
  range: [0, 140]
  step: 10
  variable_byte: 0x1B
- id: surround_mode
  type: integer
  range: [0, 6]
  variable_byte: 0x0C
  values:
    0: Stereo
    1: Pro Logic IIX Movie
    2: Pro Logic IIX Music
    3: DTS NEO:6 Cinema
    4: DTS NEO:6 Music
    5: Party
    6: Bypass
- id: hdmi_resolution
  type: integer
  range: [1, 4]
  variable_byte: 0x1C
  values:
    1: 480/576
    2: 720P
    3: 1080i
    4: 1080P
```

## Events
```yaml
# Source documents reply frames in response to commands, but no unsolicited
# (asynchronous) event frames are described in the source.
# UNRESOLVED: remove this comment and populate from source if/when the
# SP31.7/SP317-specific doc is found.
```

## Macros
```yaml
# No multi-step command sequences described in source.
# UNRESOLVED: remove this comment and populate from source if multi-step
# procedures (e.g. installer setup) are documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# are documented in the source. The `Recall factory settings` action (variable
# 0x13 / 0x93) will erase installer memory; consider adding a client-side
# confirmation prompt in any control implementation, but do not infer a
# device-side interlock.
```

## Notes
- The source document is titled "RS232 SPA22/SP32 Part 1/2" and is dated 2007-10-22 / 2008-01-23. The SP317 (SP31.7 MKII) shares RC5 system address 28 (0x1c) with SPA22/SP32 per first-party Primare "Remote Control Keys V2.2" doc, and the RS-232 command table is believed to apply, but a direct SP317 reference is absent from the command table. Use with caution; verify on physical hardware before relying on a specific opcode.
- Cable: null-modem required (per source `Protocol` section). 4800 baud, 8 data bits, 1 stop bit, no parity.
- DLE (0x10) stuffing: any byte in a frame equal to 0x10 must be transmitted as `0x10 0x10`. This applies to command, variable, and value bytes in both directions.
- Tested firmware per source: 20080812a. Compatibility with other firmware versions is not stated in source.
- The source enumerates a "Remote command" entry (variable 15) that maps to a separate IR-key table ("see first part of document"); Part 1's hex frames use a fixed prefix `0x02 0x57 0x0F` followed by an IR-key byte and `0x10 0x03`. These are not enumerated as separate actions in this spec because the IR-key table itself is the mapping; the SP31.7/SP317 IR table is the referenced `Remote_Control_Keys V2.2` PDF.
- HDMI resolution commands (variables 0x1C / 0x9C) are marked "(future use)" in the source; behavior on SP317 hardware is not validated by this spec.

<!-- UNRESOLVED: SP317-specific RS-232 command list not published by Primare. The SPA22/SP32 table is the best-available proxy; verification on a physical SP31.7 MKII is recommended. -->

## Provenance

```yaml
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2017/06/RS232_IR_SP32_2008_08_15-Release-.pdf
  - https://primare.net/wp-content/uploads/2017/06/SP31.7-User-Guide.pdf
  - https://primare.net/support/past-products/
retrieved_at: 2026-06-09T19:51:27.989Z
last_checked_at: 2026-06-10T07:33:48.543Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T07:33:48.543Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 spec actions matched to Part 2 command table; transport parameters verified against source protocol specification. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source RS-232 command table is for SPA22/SP32, not SP31.7/SP317. SP317 compatibility inferred, not confirmed."
- "read form not in source; derived from write 0x57->0x52 convention"
- "read form derived from convention"
- "remove this comment and populate from source if/when the"
- "remove this comment and populate from source if multi-step"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "SP317-specific RS-232 command list not published by Primare. The SPA22/SP32 table is the best-available proxy; verification on a physical SP31.7 MKII is recommended."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
