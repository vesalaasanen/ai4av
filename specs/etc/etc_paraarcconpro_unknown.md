---
spec_id: admin/etc-paraarcconpro
schema_version: ai4av-public-spec-v1
revision: 1
title: "ETC ParaArcConPro Control Spec"
manufacturer: ETC
model_family: ParaArcConPro
aliases: []
compatible_with:
  manufacturers:
    - ETC
  models:
    - ParaArcConPro
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - etcconnect.com
source_urls:
  - "https://www.etcconnect.com/WorkArea/DownloadAsset.aspx?id=10737521406"
  - "https://www.etcconnect.com/WorkArea/DownloadAsset.aspx?id=10737519244"
  - https://www.etcconnect.com/Products/Architectural-Systems/Paradigm/Control-and-Dimming/Architectural-Controls/Documentation.aspx
  - https://www.etcconnect.com/Docs/Paradigm-Processor-Mk2/
  - "https://www.etcconnect.com/WorkArea/DownloadAsset.aspx?id=10737521387"
retrieved_at: 2026-07-06T06:08:44.460Z
last_checked_at: 2026-07-07T11:36:52.399Z
generated_at: 2026-07-07T11:36:52.399Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Exact ParaArcConPro model name not found in ETC public catalog; source describes \"Paradigm Processor (P ACP)\". ACN Serial Config transport is described but not represented in the protocols enum (no ACN/E1.17 token)."
  - "flow control not stated in source"
  - "full trigger function naming taxonomy not enumerated in source"
  - "source contains no safety warnings, interlock procedures, or"
  - "Exact \"ParaArcConPro\" model designation not confirmed against ETC product catalog."
  - "Serial flow_control not stated in source."
  - "PSAP protocol version compatibility range across firmware not stated (source references v6.0.0 only)."
  - "ACN Serial transport has no equivalent token in the protocols enum; represented as serial+udp only."
  - "Complete trigger-function naming taxonomy not enumerated in source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:36:52.399Z
  matched_actions: 48
  action_count: 48
  confidence: medium
  summary: "All 48 spec actions matched literals in source; transport values verified; full bidirectional coverage achieved. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-06
---

# ETC ParaArcConPro Control Spec

## Summary
ETC ParaArcConPro (Paradigm Processor, "P ACP") is an architectural lighting control processor controlled via its local RS-232 serial port and Ethernet interface using the Unison Paradigm Serial Access Protocol (PSAP v6.0.0). This spec covers PSAP serial/UDP commands for channels, groups, presets, sequences, spaces, walls, macros, and overrides, plus status queries and trigger-based updates. Configuration (baud rate, UDP port, handlers) is performed in ETC LightDesigner.

<!-- UNRESOLVED: Exact ParaArcConPro model name not found in ETC public catalog; source describes "Paradigm Processor (P ACP)". ACN Serial Config transport is described but not represented in the protocols enum (no ACN/E1.17 token). -->

## Transport
```yaml
protocols:
  - serial
  - udp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: 0  # default per source ("Input UDP Port defaults to 0"); ETC recommends configuring in range 4703-4727
auth:
  type: none  # inferred: no auth procedure in source
```

Notes on transport:
- Default end-of-message terminator: ASCII carriage return (CR = 13 decimal = 0D hex). CR+LF or LF also supported.
- Ethernet packets recommended ≤ 512 bytes.
- ACN Serial Config also supported (default ACN Name "ETC P ACP"); not represented in protocols enum above.

## Traits
```yaml
- levelable  # inferred from int/ras/low/master level-setting command examples
- queryable  # inferred from get-status command examples
```

## Actions
```yaml
# All commands terminated by default CR (0D hex). Names are case-sensitive and must
# match LightDesigner object names. Level values: 0-255 or 0-100%. Priority values: 1-200.
# fadetime format: x.y seconds (tenths supported). spacename required when fadetime used.

# --- Help / discovery ---
- id: help
  label: List Available Commands
  kind: query
  command: "?"
  params: []
- id: help_alias
  label: List Available Commands (help alias)
  kind: query
  command: "help"
  params: []

# --- Channel commands ---
- id: chan_int
  label: Set Channel Intensity
  kind: action
  command: "chan int:{level} {channame}[, {spacename}][, {fadetime}]"
  params:
    - name: level
      type: string
      description: Target level, 0-255 or 0-100% (use trailing %)
    - name: channame
      type: string
      description: Channel name (case-sensitive, must match LightDesigner)
    - name: spacename
      type: string
      description: Optional space name
    - name: fadetime
      type: string
      description: Optional fade time in x.y seconds
- id: chan_ras
  label: Raise Channel Intensity
  kind: action
  command: "chan ras:{amount} {channame}[, {spacename}][, {fadetime}]"
  params:
    - name: amount
      type: string
      description: Raise amount, 0-255 or 0-100%
    - name: channame
      type: string
    - name: spacename
      type: string
    - name: fadetime
      type: string
- id: chan_low
  label: Lower Channel Intensity
  kind: action
  command: "chan low:{amount} {channame}[, {spacename}][, {fadetime}]"
  params:
    - name: amount
      type: string
    - name: channame
      type: string
    - name: spacename
      type: string
    - name: fadetime
      type: string
- id: chan_tog
  label: Toggle Channel Intensity
  kind: action
  command: "chan tog {channame}[, {spacename}][, {fadetime}]"
  params:
    - name: channame
      type: string
    - name: spacename
      type: string
    - name: fadetime
      type: string
- id: chan_min
  label: Set Channel Minimum Level
  kind: action
  command: "chan min:{level} {channame}[, {spacename}]"
  params:
    - name: level
      type: string
    - name: channame
      type: string
    - name: spacename
      type: string
- id: chan_max
  label: Set Channel Maximum Level
  kind: action
  command: "chan max:{level} {channame}[, {spacename}]"
  params:
    - name: level
      type: string
    - name: channame
      type: string
    - name: spacename
      type: string

# --- Group commands ---
- id: grp_int
  label: Set Group Intensity
  kind: action
  command: "grp int:{level} {grpname}[, {spacename}][, {fadetime}]"
  params:
    - name: level
      type: string
    - name: grpname
      type: string
    - name: spacename
      type: string
    - name: fadetime
      type: string
- id: grp_ras
  label: Raise Group Intensity
  kind: action
  command: "grp ras:{amount} {grpname}[, {spacename}][, {fadetime}]"
  params:
    - name: amount
      type: string
    - name: grpname
      type: string
    - name: spacename
      type: string
    - name: fadetime
      type: string
- id: grp_low
  label: Lower Group Intensity
  kind: action
  command: "grp low:{amount} {grpname}[, {spacename}][, {fadetime}]"
  params:
    - name: amount
      type: string
    - name: grpname
      type: string
    - name: spacename
      type: string
    - name: fadetime
      type: string
- id: grp_tog
  label: Toggle Group Intensity
  kind: action
  command: "grp tog {grpname}[, {spacename}][, {fadetime}]"
  params:
    - name: grpname
      type: string
    - name: spacename
      type: string
    - name: fadetime
      type: string

# --- Preset commands (LTP playback) ---
- id: pst_act
  label: Activate Preset (LTP)
  kind: action
  command: "pst act[:{priority}] {presetname}[, {spacename}][, {fadetime}]"
  params:
    - name: priority
      type: integer
      description: Optional priority 1-200
    - name: presetname
      type: string
    - name: spacename
      type: string
    - name: fadetime
      type: string
- id: pst_dact
  label: Deactivate Preset (LTP)
  kind: action
  command: "pst dact {presetname}[, {spacename}][, {fadetime}]"
  params:
    - name: presetname
      type: string
    - name: spacename
      type: string
    - name: fadetime
      type: string
- id: pst_tog
  label: Toggle Preset State (LTP)
  kind: action
  command: "pst tog[:{priority}] {presetname}[, {spacename}][, {fadetime}]"
  params:
    - name: priority
      type: integer
    - name: presetname
      type: string
    - name: spacename
      type: string
    - name: fadetime
      type: string

# --- Preset commands (HTP playback) ---
- id: pst_acth
  label: Activate Preset (HTP)
  kind: action
  command: "pst acth[:{priority}] {presetname}[, {spacename}][, {fadetime}]"
  params:
    - name: priority
      type: integer
    - name: presetname
      type: string
    - name: spacename
      type: string
    - name: fadetime
      type: string
- id: pst_dacth
  label: Deactivate Preset (HTP)
  kind: action
  command: "pst dacth {presetname}[, {spacename}][, {fadetime}]"
  params:
    - name: presetname
      type: string
    - name: spacename
      type: string
    - name: fadetime
      type: string
- id: pst_togh
  label: Toggle Preset State (HTP)
  kind: action
  command: "pst togh[:{priority}] {presetname}[, {spacename}][, {fadetime}]"
  params:
    - name: priority
      type: integer
    - name: presetname
      type: string
    - name: spacename
      type: string
    - name: fadetime
      type: string

# --- Preset recording ---
- id: pst_rec
  label: Record Preset
  kind: action
  command: "pst rec {presetname}[, {spacename}]"
  params:
    - name: presetname
      type: string
    - name: spacename
      type: string

# --- Sequence commands ---
- id: seq_start
  label: Start Sequence
  kind: action
  command: "seq start[:{priority}] {sequencename}[, {spacename}]"
  params:
    - name: priority
      type: integer
    - name: sequencename
      type: string
    - name: spacename
      type: string
- id: seq_stop
  label: Stop Sequence
  kind: action
  command: "seq stop {sequencename}[, {spacename}]"
  params:
    - name: sequencename
      type: string
    - name: spacename
      type: string
- id: seq_pause
  label: Pause Sequence
  kind: action
  command: "seq pause {sequencename}"
  params:
    - name: sequencename
      type: string
- id: seq_resume
  label: Resume Sequence
  kind: action
  command: "seq resume {sequencename}"
  params:
    - name: sequencename
      type: string
- id: seq_ras
  label: Raise Sequence
  kind: action
  command: "seq ras:{amount} {sequencename}"
  params:
    - name: amount
      type: string
      description: Raise amount (requires active Sequence)
    - name: sequencename
      type: string
- id: seq_low
  label: Lower Sequence
  kind: action
  command: "seq low:{amount} {sequencename}"
  params:
    - name: amount
      type: string
    - name: sequencename
      type: string
- id: seq_rate
  label: Set Sequence Rate
  kind: action
  command: "seq rate:{faderate} {sequencename}"
  params:
    - name: faderate
      type: string
      description: Playback speed multiplier (1 = default timing)
    - name: sequencename
      type: string

# --- Space commands ---
- id: spc_off
  label: Space Off
  kind: action
  command: "spc off {spacename}[, {fadetime}]"
  params:
    - name: spacename
      type: string
    - name: fadetime
      type: string
- id: spc_ras
  label: Raise Space
  kind: action
  command: "spc ras:{amount} {spacename}[, {fadetime}]"
  params:
    - name: amount
      type: string
    - name: spacename
      type: string
    - name: fadetime
      type: string
- id: spc_low
  label: Lower Space
  kind: action
  command: "spc low:{amount} {spacename}[, {fadetime}]"
  params:
    - name: amount
      type: string
    - name: spacename
      type: string
    - name: fadetime
      type: string
- id: spc_master
  label: Set Space Master Level
  kind: action
  command: "spc master:{level} {spacename}[, {fadetime}]"
  params:
    - name: level
      type: string
    - name: spacename
      type: string
    - name: fadetime
      type: string

# --- Wall commands ---
- id: wall_open
  label: Open Wall
  kind: action
  command: "wall open {wallname}[, {spacename}]"
  params:
    - name: wallname
      type: string
      description: Wall name; spacename must be parent space containing the wall
    - name: spacename
      type: string
- id: wall_close
  label: Close Wall
  kind: action
  command: "wall close {wallname}[, {spacename}]"
  params:
    - name: wallname
      type: string
    - name: spacename
      type: string
- id: wall_tog
  label: Toggle Wall State
  kind: action
  command: "wall tog {wallname}[, {spacename}]"
  params:
    - name: wallname
      type: string
    - name: spacename
      type: string

# --- Macro commands ---
- id: macro_on
  label: Macro On
  kind: action
  command: "macro on {macroname}"
  params:
    - name: macroname
      type: string
- id: macro_off
  label: Macro Off
  kind: action
  command: "macro off {macroname}"
  params:
    - name: macroname
      type: string
- id: macro_tog
  label: Toggle Macro State
  kind: action
  command: "macro tog {macroname}"
  params:
    - name: macroname
      type: string
- id: macro_cancel
  label: Cancel Macro
  kind: action
  command: "macro cancel {macroname}"
  params:
    - name: macroname
      type: string

# --- Override commands ---
- id: ovr_enab
  label: Enable Override
  kind: action
  command: "ovr enab {overridename}"
  params:
    - name: overridename
      type: string
- id: ovr_disab
  label: Disable Override
  kind: action
  command: "ovr disab {overridename}"
  params:
    - name: overridename
      type: string
- id: ovr_tog
  label: Toggle Override State
  kind: action
  command: "ovr tog {overridename}"
  params:
    - name: overridename
      type: string

# --- Status query commands ---
- id: chan_get
  label: Query Channel Status
  kind: query
  command: "chan get {channame}[, {spacename}]"
  params:
    - name: channame
      type: string
    - name: spacename
      type: string
- id: grp_get
  label: Query Group Status
  kind: query
  command: "grp get {groupname}[, {spacename}]"
  params:
    - name: groupname
      type: string
    - name: spacename
      type: string
- id: pst_get
  label: Query Preset Status (LTP)
  kind: query
  command: "pst get {presetname}[, {spacename}]"
  params:
    - name: presetname
      type: string
    - name: spacename
      type: string
- id: pst_geth
  label: Query Preset Status (HTP)
  kind: query
  command: "pst geth {presetname}[, {spacename}]"
  params:
    - name: presetname
      type: string
    - name: spacename
      type: string
- id: macro_get
  label: Query Macro Status
  kind: query
  command: "macro get {macroname}"
  params:
    - name: macroname
      type: string
- id: wall_get
  label: Query Wall Status
  kind: query
  command: "wall get {wallname}[, {spacename}]"
  params:
    - name: wallname
      type: string
    - name: spacename
      type: string
- id: seq_get
  label: Query Sequence Status
  kind: query
  command: "seq get {sequencename}[, {spacename}]"
  params:
    - name: sequencename
      type: string
    - name: spacename
      type: string
- id: ovr_get
  label: Query Override Status
  kind: query
  command: "ovr get {overridename}"
  params:
    - name: overridename
      type: string
```

## Feedbacks
```yaml
- id: channel_state
  type: string
  description: Returned as "chan int:{level} {channame}, {spacename}" (level always 0-255)
- id: group_state
  type: string
  description: Returned as "grp int:{level}, {grpname}, {spacename}"
- id: preset_state_ltp
  type: enum
  values: [act, dact, alt]
  description: One of "pst act|dact|alt {presetname}, {spacename}" indicating activated/deactivated/altered (LTP)
- id: preset_state_htp
  type: enum
  values: [acth, dacth, alth]
  description: One of "pst acth|dacth|alth {presetname}, {spacename}" indicating activated/deactivated/altered (HTP)
- id: macro_state
  type: enum
  values: [on, off, running]
  description: Returned as "Macro on|off|running {macroname}"
- id: wall_state
  type: enum
  values: [open, close]
  description: Returned as "Wall open|close {wallname}, {spacename}"
- id: sequence_state
  type: enum
  values: [start, stop, pause]
  description: Returned as "seq start|stop|pause {sequencename}, {spacename}"
- id: override_state
  type: enum
  values: [enab, disab]
  description: Returned as "ovr enab|disab {overridename}"
```

## Variables
```yaml
# No standalone settable variables documented; all settable parameters are carried
# as inline params of the action commands above (level, amount, priority, fadetime, faderate).
```

## Events
```yaml
# PSAP Triggers: when configured (LightDesigner "Advanced" access), Paradigm pushes
# PSAP-formatted serial updates to specified objects as changes occur. Each object
# requires its own trigger. Returned string format matches the corresponding "get"
# response for that object type (see Feedbacks above).
- id: trigger_channel
  type: string
  description: Unsolicited channel update (same format as channel_state)
- id: trigger_group
  type: string
  description: Unsolicited group update (same format as group_state)
- id: trigger_preset
  type: string
  description: Unsolicited preset update (same format as preset_state_ltp/htp)
- id: trigger_macro
  type: enum
  description: Unsolicited macro update (same format as macro_state)
- id: trigger_wall
  type: enum
  description: Unsolicited wall update (same format as wall_state)
- id: trigger_sequence
  type: enum
  description: Unsolicited sequence update (same format as sequence_state)
- id: trigger_override
  type: enum
  description: Unsolicited override update (same format as override_state)
# UNRESOLVED: full trigger function naming taxonomy not enumerated in source
```

## Macros
```yaml
# No multi-step control sequences documented in source. The PSAP "macro on|off|tog|cancel"
# commands invoke device-defined macros configured in LightDesigner; those macro
# definitions are not part of this protocol spec.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- Device is referred to in source as "Paradigm Processor (P ACP)"; the model token "ParaArcConPro" is taken from the entity/family identifier and may be an abbreviation (Paradigm Architectural Configuration Processor). Confirm exact model name against ETC catalog.
- All command/object names are case-sensitive and must match LightDesigner exactly. Avoid commas `,` and colons `:` in object names — these are delimiter characters in PSAP parsing.
- Level values accept two formats: 0–255 integer or 0–100% (trailing `%` required for percentage).
- Priority values 1–200; supplying priority on preset/sequence activation makes the action persist beneath higher-priority actions.
- fadetime format is `x.y` seconds with tenths support; spacename must be specified when fadetime is used on group/preset commands.
- Commands are not processed until the terminating character (default CR, 0D hex) is received; responses also terminate with the same character.
- `?` or `help` + terminator returns the list of available commands.
- PSAP reflects software/handler version 6.0.0 and later. Input Handler is set to "PSAP 6.0.0" in LightDesigner.
- UDP: response is sent back to the sender's source output UDP port automatically. ETC recommends ≤ 512 bytes per Ethernet packet.
- ACN Serial Config: devices matching ACN Name (default "ETC P ACP") form a broadcast domain and exchange PSAP messages over ACN. Multiple comma-separated ACN Names supported; handler responds to all matching.

<!-- UNRESOLVED: Exact "ParaArcConPro" model designation not confirmed against ETC product catalog. -->
<!-- UNRESOLVED: Serial flow_control not stated in source. -->
<!-- UNRESOLVED: PSAP protocol version compatibility range across firmware not stated (source references v6.0.0 only). -->
<!-- UNRESOLVED: ACN Serial transport has no equivalent token in the protocols enum; represented as serial+udp only. -->
<!-- UNRESOLVED: Complete trigger-function naming taxonomy not enumerated in source. -->
````

Spec built. 47 actions across chan/grp/pst(LTP+HTP)/seq/spc/wall/macro/ovr + 8 get-queries + help. Transport serial+udp (ACN noted, no enum token). Feedbacks, events (triggers) populated. Safety/flow_control/firmware marked UNRESOLVED.

## Provenance

```yaml
source_domains:
  - etcconnect.com
source_urls:
  - "https://www.etcconnect.com/WorkArea/DownloadAsset.aspx?id=10737521406"
  - "https://www.etcconnect.com/WorkArea/DownloadAsset.aspx?id=10737519244"
  - https://www.etcconnect.com/Products/Architectural-Systems/Paradigm/Control-and-Dimming/Architectural-Controls/Documentation.aspx
  - https://www.etcconnect.com/Docs/Paradigm-Processor-Mk2/
  - "https://www.etcconnect.com/WorkArea/DownloadAsset.aspx?id=10737521387"
retrieved_at: 2026-07-06T06:08:44.460Z
last_checked_at: 2026-07-07T11:36:52.399Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:36:52.399Z
matched_actions: 48
action_count: 48
confidence: medium
summary: "All 48 spec actions matched literals in source; transport values verified; full bidirectional coverage achieved. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Exact ParaArcConPro model name not found in ETC public catalog; source describes \"Paradigm Processor (P ACP)\". ACN Serial Config transport is described but not represented in the protocols enum (no ACN/E1.17 token)."
- "flow control not stated in source"
- "full trigger function naming taxonomy not enumerated in source"
- "source contains no safety warnings, interlock procedures, or"
- "Exact \"ParaArcConPro\" model designation not confirmed against ETC product catalog."
- "Serial flow_control not stated in source."
- "PSAP protocol version compatibility range across firmware not stated (source references v6.0.0 only)."
- "ACN Serial transport has no equivalent token in the protocols enum; represented as serial+udp only."
- "Complete trigger-function naming taxonomy not enumerated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
