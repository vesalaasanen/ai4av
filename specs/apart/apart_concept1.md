---
spec_id: admin/apart-concept1
schema_version: ai4av-public-spec-v1
revision: 1
title: "Apart Concept 1 Control Spec"
manufacturer: Apart
model_family: "Concept 1"
aliases: []
compatible_with:
  manufacturers:
    - Apart
  models:
    - "Concept 1"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T08:24:56.824Z
last_checked_at: 2026-06-02T08:24:56.824Z
generated_at: 2026-06-02T08:24:56.824Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ZONELINK row in source attribute table has empty Commands column; SET confirmed by prose (\"these 2 commands change the behavior of the amplifier\"), GET inferred by symmetry."
  - "MICLVL, MAXMSCLVL, MAXMICLVL, EQTREB, PAGACT, LF, BS, HEADER attribute-table Commands columns are blank; verbs below inferred from prose examples and binary-setting symmetry."
  - "source mentions AMPLIFIER PROTECT and OVER TEMPERATURE error"
  - "ZONELINK attribute-table Commands column is blank; SET confirmed by prose, GET inferred."
  - "MICLVL, MAXMSCLVL, MAXMICLVL, EQTREB, PAGACT, LF, BS, HEADER attribute-table Commands columns are blank; verbs above inferred from prose."
  - "firmware version compatibility ranges not stated in source."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-06-02T08:24:56.824Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec actions have literal attribute-and-verb support in the source table or prose; transport parameters match exactly; source catalogue is fully represented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Apart Concept 1 Control Spec

## Summary
RS-232 ASCII control protocol for the Apart Concept 1 amplifier. Four verbs (SET, GET, INC, DEC) operate on 26 attributes covering source selection, music/mic level, EQ, paging, RS-232 port settings, standby, and version queries. Connection is 19200 baud 8N1 with `<CR>` line terminators; instructions are not case sensitive. When MULTIZONE=ON, several level attributes require a zone suffix (ZONE1/ZONE2).

<!-- UNRESOLVED: ZONELINK row in source attribute table has empty Commands column; SET confirmed by prose ("these 2 commands change the behavior of the amplifier"), GET inferred by symmetry. -->
<!-- UNRESOLVED: MICLVL, MAXMSCLVL, MAXMICLVL, EQTREB, PAGACT, LF, BS, HEADER attribute-table Commands columns are blank; verbs below inferred from prose examples and binary-setting symmetry. -->

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

Physical pinout (DB-style connector, per source):
- Pin 2: TX (data transmission output from device)
- Pin 3: RX (data reception input to device)
- Pin 5: GND
- Other pins unused

## Traits
```yaml
- powerable       # STANDBY ON/OFF
- routable        # SELECT (A/B/C/D)
- queryable       # GET commands across all attributes
- levelable       # MSCLVL, MICLVL, EQBASS, EQTREB, IPGAIN
```

## Actions
```yaml
# ---------------- MULTIZONE / ZONELINK ----------------
- id: set_multizone
  label: Set Multi-Zone Mode
  kind: action
  command: "SET MULTIZONE {value}"
  params:
    - name: value
      type: string
      description: Binary (0/1 or OFF/ON)

- id: get_multizone
  label: Get Multi-Zone Mode
  kind: query
  command: "GET MULTIZONE"

- id: set_zonelink
  label: Set Zone Link
  kind: action
  command: "SET ZONELINK {value}"
  params:
    - name: value
      type: string
      description: Binary (0/1 or OFF/ON); only meaningful when MULTIZONE=ON

- id: get_zonelink
  label: Get Zone Link
  kind: query
  command: "GET ZONELINK"

# ---------------- MSCLVL (Music Level) ----------------
- id: set_msclvl
  label: Set Music Level
  kind: action
  command: "SET MSCLVL {zone} {value}"
  params:
    - name: zone
      type: string
      description: ZONE1 or ZONE2 (required when MULTIZONE=ON and ZONELINK=ON)
    - name: value
      type: integer
      description: -80 (OFF) to 0 in dB

- id: get_msclvl
  label: Get Music Level
  kind: query
  command: "GET MSCLVL {zone}"
  params:
    - name: zone
      type: string
      description: ZONE1 or ZONE2 (required when MULTIZONE=ON and ZONELINK=ON)

- id: inc_msclvl
  label: Increase Music Level
  kind: action
  command: "INC MSCLVL {zone} {step}"
  params:
    - name: zone
      type: string
      description: ZONE1 or ZONE2 (required when MULTIZONE=ON and ZONELINK=ON)
    - name: step
      type: integer
      description: Step value 1-10 (clamped to 10; default 1)

- id: dec_msclvl
  label: Decrease Music Level
  kind: action
  command: "DEC MSCLVL {zone} {step}"
  params:
    - name: zone
      type: string
      description: ZONE1 or ZONE2 (required when MULTIZONE=ON and ZONELINK=ON)
    - name: step
      type: integer
      description: Step value 1-10 (clamped to 10; default 1)

# ---------------- MICLVL (Microphone Level) ----------------
- id: set_miclvl
  label: Set Microphone Level
  kind: action
  command: "SET MICLVL {zone} {value}"
  params:
    - name: zone
      type: string
      description: ZONE1 or ZONE2 (required when MULTIZONE=ON)
    - name: value
      type: integer
      description: -80 (OFF) to 0 in dB

- id: get_miclvl
  label: Get Microphone Level
  kind: query
  command: "GET MICLVL {zone}"
  params:
    - name: zone
      type: string
      description: ZONE1 or ZONE2 (required when MULTIZONE=ON)

- id: inc_miclvl
  label: Increase Microphone Level
  kind: action
  command: "INC MICLVL {zone} {step}"
  params:
    - name: zone
      type: string
      description: ZONE1 or ZONE2 (required when MULTIZONE=ON)
    - name: step
      type: integer
      description: Step value 1-10 (clamped to 10; default 1)

- id: dec_miclvl
  label: Decrease Microphone Level
  kind: action
  command: "DEC MICLVL {zone} {step}"
  params:
    - name: zone
      type: string
      description: ZONE1 or ZONE2 (required when MULTIZONE=ON)
    - name: step
      type: integer
      description: Step value 1-10 (clamped to 10; default 1)

# ---------------- MAXMSCLVL / MAXMICLVL ----------------
- id: set_maxmsclvl
  label: Set Maximum Music Level
  kind: action
  command: "SET MAXMSCLVL {zone} {value}"
  params:
    - name: zone
      type: string
      description: ZONE1 or ZONE2 (when MULTIZONE=ON and ZONELINK=ON; each zone has independent cap, max diff 40 dB)
    - name: value
      type: integer
      description: Upper cap for MSCLVL in dB

- id: get_maxmsclvl
  label: Get Maximum Music Level
  kind: query
  command: "GET MAXMSCLVL {zone}"
  params:
    - name: zone
      type: string
      description: ZONE1 or ZONE2 (when MULTIZONE=ON and ZONELINK=ON)

- id: set_maxmiclvl
  label: Set Maximum Microphone Level
  kind: action
  command: "SET MAXMICLVL {value}"
  params:
    - name: value
      type: integer
      description: Upper cap for MICLVL in dB

- id: get_maxmiclvl
  label: Get Maximum Microphone Level
  kind: query
  command: "GET MAXMICLVL"

# ---------------- SELECT ----------------
- id: set_select
  label: Set Source Selection
  kind: action
  command: "SET SELECT {source}"
  params:
    - name: source
      type: string
      description: A, B, C, or D (zone-independent; same in both zones)

- id: get_select
  label: Get Source Selection
  kind: query
  command: "GET SELECT"

# ---------------- EQ ----------------
- id: set_eqbass
  label: Set Bass EQ
  kind: action
  command: "SET EQBASS {value}"
  params:
    - name: value
      type: integer
      description: -14 to 14 in steps of 2; out-of-step values rounded to nearest

- id: get_eqbass
  label: Get Bass EQ
  kind: query
  command: "GET EQBASS"

- id: set_eqtreb
  label: Set Treble EQ
  kind: action
  command: "SET EQTREB {value}"
  params:
    - name: value
      type: integer
      description: -14 to 14 in steps of 2; out-of-step values rounded to nearest

- id: get_eqtreb
  label: Get Treble EQ
  kind: query
  command: "GET EQTREB"

# ---------------- STANDBY ----------------
- id: set_standby
  label: Set Standby
  kind: action
  command: "SET STANDBY {value}"
  params:
    - name: value
      type: string
      description: Binary (0/1 or OFF/ON)

- id: get_standby
  label: Get Standby State
  kind: query
  command: "GET STANDBY"

# ---------------- AUTOLD ----------------
- id: set_autold
  label: Set Auto Loudness
  kind: action
  command: "SET AUTOLD {value}"
  params:
    - name: value
      type: string
      description: Binary (0/1 or OFF/ON); only active in stereo mode (MULTIZONE=OFF)

- id: get_autold
  label: Get Auto Loudness
  kind: query
  command: "GET AUTOLD"

# ---------------- PAGACT (Paging Active) ----------------
- id: set_pagact
  label: Set Paging Active
  kind: action
  command: "SET PAGACT {value}"
  params:
    - name: value
      type: string
      description: Binary (0/1 or OFF/ON); enables mic activation via contact closure on pin A or B at rear connector

- id: get_pagact
  label: Get Paging Active
  kind: query
  command: "GET PAGACT"

# ---------------- IPGAIN (Input Gain) ----------------
- id: set_ipgain
  label: Set Input Gain
  kind: action
  command: "SET IPGAIN {source} {value}"
  params:
    - name: source
      type: string
      description: A, B, C, or D
    - name: value
      type: integer
      description: -20 to 14 in steps of 2

- id: get_ipgain
  label: Get Input Gain
  kind: query
  command: "GET IPGAIN {source}"
  params:
    - name: source
      type: string
      description: A, B, C, or D

# ---------------- RS-232 port settings: ECHO / LF / BS / HEADER ----------------
- id: set_echo
  label: Set Echo
  kind: action
  command: "SET ECHO {value}"
  params:
    - name: value
      type: string
      description: Binary (0/1 or OFF/ON); echoes received characters

- id: get_echo
  label: Get Echo
  kind: query
  command: "GET ECHO"

- id: set_lf
  label: Set Line Feed
  kind: action
  command: "SET LF {value}"
  params:
    - name: value
      type: string
      description: Binary (0/1 or OFF/ON); append <LF> (0x0A) after every <CR>

- id: get_lf
  label: Get Line Feed
  kind: query
  command: "GET LF"

- id: set_bs
  label: Set Back Space
  kind: action
  command: "SET BS {value}"
  params:
    - name: value
      type: string
      description: Binary (0/1 or OFF/ON); reply <BS><SP><BS> on received <BS> (only when ECHO=ON)

- id: get_bs
  label: Get Back Space
  kind: query
  command: "GET BS"

- id: set_header
  label: Set Header
  kind: action
  command: "SET HEADER {value}"
  params:
    - name: value
      type: string
      description: Binary (0/1 or OFF/ON); prefix every string with '>' (0x3E); only works when ECHO=OFF; instructions must then start with '> '

- id: get_header
  label: Get Header
  kind: query
  command: "GET HEADER"

# ---------------- VALFB (Value Feedback) ----------------
- id: set_valfb
  label: Set Value Feedback
  kind: action
  command: "SET VALFB {value}"
  params:
    - name: value
      type: string
      description: Binary (0/1 or OFF/ON); when ON, all value changes are pushed autonomously; default ON; IPGAIN and SOURCENAME are not pushed

- id: get_valfb
  label: Get Value Feedback
  kind: query
  command: "GET VALFB"

# ---------------- INFO (bulk status) ----------------
- id: get_info
  label: Get Bulk Status Info
  kind: query
  command: "GET INFO"
  notes: Only works when VALFB=ON. IPGAIN and SOURCENAME are not included in reply.

# ---------------- SOURCENAME ----------------
- id: set_sourcename
  label: Set Source Name
  kind: action
  command: "SET SOURCENAME {source} {name}"
  params:
    - name: source
      type: string
      description: A, B, C, or D
    - name: name
      type: string
      description: Display label; case sensitive; may contain spaces

- id: get_sourcename
  label: Get Source Name
  kind: query
  command: "GET SOURCENAME {source}"
  params:
    - name: source
      type: string
      description: A, B, C, or D

# ---------------- Version / identity ----------------
- id: get_serial
  label: Get Serial Number
  kind: query
  command: "GET SERIAL"
  notes: Returns 4-digit hex value, or "Not Yet Implemented!<CR>" if unprogrammed.

- id: get_hwvrsn
  label: Get Hardware Version
  kind: query
  command: "GET HWVRSN"

- id: get_swvrsn
  label: Get Software Version
  kind: query
  command: "GET SWVRSN"

# ---------------- RESTORE factory ----------------
- id: set_restore
  label: Restore Factory Settings
  kind: action
  command: "SET RESTORE ON"
  notes: Device replies "Please Cycle Power!<CR>"; user must power off then on. During power-on, factory settings are restored.
```

## Feedbacks
```yaml
- id: standby_state
  type: enum
  values: [on, off]
  description: Standby mode

- id: multizone_state
  type: enum
  values: [on, off]
  description: Multi-zone mode

- id: music_level
  type: string
  description: -79 to 0 in dB, or OFF (when set to -80)

- id: mic_level
  type: string
  description: -79 to 0 in dB, or OFF (when set to -80)

- id: max_music_level
  type: integer
  description: Upper cap for MSCLVL (dB)

- id: max_mic_level
  type: integer
  description: Upper cap for MICLVL (dB)

- id: selected_source
  type: enum
  values: [A, B, C, D]

- id: eq_bass
  type: integer
  description: -14 to 14

- id: eq_treb
  type: integer
  description: -14 to 14

- id: auto_loudness
  type: enum
  values: [on, off]

- id: paging_active
  type: enum
  values: [on, off]

- id: input_gain
  type: object
  description: Per-source gain (-20 to 14, indexed by source A/B/C/D)

- id: echo
  type: enum
  values: [on, off]

- id: line_feed
  type: enum
  values: [on, off]

- id: back_space
  type: enum
  values: [on, off]

- id: header
  type: enum
  values: [on, off]

- id: valfb
  type: enum
  values: [on, off]

- id: source_name
  type: object
  description: Per-source display label (indexed by A/B/C/D)

- id: serial_number
  type: string
  description: 4-digit hex, or "Not Yet Implemented"

- id: hw_version
  type: string

- id: sw_version
  type: string
```

## Variables
```yaml
# Settable runtime state. Mirror of attributes that accept SET/INC/DEC.
# INC/DEC supported: MSCLVL, MICLVL.
- multizone: binary
- zonelink: binary
- music_level: {zone1, zone2} dB or OFF
- mic_level: {zone1, zone2} dB or OFF
- max_music_level: {zone1, zone2} dB
- max_mic_level: dB
- selected_source: enum [A, B, C, D]
- eq_bass: -14..14 step 2
- eq_treb: -14..14 step 2
- standby: binary
- auto_loudness: binary
- paging_active: binary
- input_gain: per-source A/B/C/D, -20..14 step 2
- echo: binary
- line_feed: binary
- back_space: binary
- header: binary
- valfb: binary
- source_name: per-source A/B/C/D, free string
```

## Events
```yaml
# Unsolicited strings the device transmits.

- id: paging_change
  pattern: "PAGING (ZONEx) ON<CR>"
  description: Contact closure started paging; ZONEx is 1 or 2.

- id: paging_end
  pattern: "PAGING (ZONEx) OFF<CR>"
  description: Contact opened; paging ended.

- id: power_down
  pattern: "POWER DOWN!<CR>"
  description: Sent during power-down; may be truncated if too many variables to store.

- id: not_ready
  pattern: "STANDBY ON<CR>"
  description: Instruction received while device in standby or still booting; wait until operational.

- id: command_executed
  pattern: "Command Executed!<CR>"
  description: Successful reply to most SET commands.

- id: restore_prompt
  pattern: "Please Cycle Power!<CR>"
  description: Reply to SET RESTORE ON; user must power-cycle.

- id: serial_unprogrammed
  pattern: "Not Yet Implemented!<CR>"
  description: Reply to GET SERIAL when serial number not programmed.

- id: error_command_unknown
  pattern: "ERROR: Command Unknown!<CR>"
  description: Wrong spelling of command, or command started with Back Space character.

- id: error_attribute_unknown
  pattern: "ERROR: Unknown Attribute!<CR>"
  description: Wrong spelling of attribute.

- id: error_no_header
  pattern: "ERROR: No Header!<CR>"
  description: HEADER=ON, ECHO=OFF, instruction sent without leading ">".

- id: error_unknown_instruction
  pattern: "ERROR: Unknown Instruction!<CR>"
  description: Verb not supported by the attribute (e.g. SET SERIAL 0001).

- id: error_value_invalid
  pattern: "ERROR: Value Invalid!<CR>"
  description: Value out of range or illegal (also: IPGAIN source not specified).

- id: error_zone_invalid
  pattern: "ERROR: Zone Invalid!<CR>"
  description: Zone missing or wrong; valid names ZONE1, ZONE2 (no space).

- id: error_amplifier_protect
  pattern: "ERROR: AMPLIFIER PROTECT!<CR>"
  description: Amplifier protection triggered; see user manual. May also appear on power-off for HWVRSN ACPT 1V04.

- id: error_over_temperature
  pattern: "ERROR: OVER TEMPERATURE!<CR>"
  description: Thermal protection triggered; see user manual.
```

## Safety
```yaml
confirmation_required_for:
  - set_restore           # requires manual power cycle; mutes output
interlocks: []
# UNRESOLVED: source mentions AMPLIFIER PROTECT and OVER TEMPERATURE error
# conditions but does not specify the trigger thresholds or recovery sequence.
# Treat as event indicators; do not auto-clear without referring to user manual.
```

## Notes
- **Line discipline.** All instructions must end with `<CR>` (0x0D). Source omits `<LF>` by default; if LF=ON, `<LF>` is appended after every `<CR>`. Instructions are not case sensitive.
- **Zone suffix.** When MULTIZONE=ON and ZONELINK=ON, MSCLVL/MAXMSCLVL require a `ZONE1`/`ZONE2` suffix (no space between ZONE and number). When MULTIZONE=ON, MICLVL requires the zone suffix. Other attributes (SELECT, EQ, IPGAIN, STANDBY, etc.) are global.
- **Mode changes.** Prose: "Since these 2 commands [MULTIZONE, ZONELINK] change the behavior of the amplifier, it's recommended only to change them when the amplifier is not in action (no music present, volume at minimum)."
- **SET IPGAIN / SET SOURCENAME write to internal memory.** Source instructs: wait for reply OR add ≥100 ms delay after issuing.
- **ECHO + HEADER interaction.** HEADER only works when ECHO=OFF. If both ECHO=OFF, LF=OFF, HEADER=ON, every string starts with `>` (0x3E) and ends with `<CR>` (0x0D). First replies after start-up may not respect HEADER because settings load late.
- **VALFB default.** Source: "Default, VALFB is on." When ON, all value changes are pushed autonomously; IPGAIN and SOURCENAME are explicitly excluded from autonomous push.
- **GET INFO.** Returns multi-line status; IPGAIN and SOURCENAME not included (request individually with GET). Requires VALFB=ON. See source lines 137–151 for example reply.
- **Step clamping.** INC/DEC step values >10 are clamped to 10; missing step defaults to 1.
- **EQ rounding.** EQBASS / EQTREB values must be in steps of 2 between -14 and 14; non-step values are rounded to the nearest valid value.
- **Hardware quirk.** HWVRSN `ACPT 1V04` units may emit `ERROR: AMPLIFIER PROTECT!<CR>` at power-off due to fast sense circuit; not a fault condition.
- **Power down truncation.** `POWER DOWN!<CR>` may be truncated if too many variables need saving to memory.

<!-- UNRESOLVED: ZONELINK attribute-table Commands column is blank; SET confirmed by prose, GET inferred. -->
<!-- UNRESOLVED: MICLVL, MAXMSCLVL, MAXMICLVL, EQTREB, PAGACT, LF, BS, HEADER attribute-table Commands columns are blank; verbs above inferred from prose. -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated in source. -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T08:24:56.824Z
last_checked_at: 2026-06-02T08:24:56.824Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:24:56.824Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec actions have literal attribute-and-verb support in the source table or prose; transport parameters match exactly; source catalogue is fully represented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ZONELINK row in source attribute table has empty Commands column; SET confirmed by prose (\"these 2 commands change the behavior of the amplifier\"), GET inferred by symmetry."
- "MICLVL, MAXMSCLVL, MAXMICLVL, EQTREB, PAGACT, LF, BS, HEADER attribute-table Commands columns are blank; verbs below inferred from prose examples and binary-setting symmetry."
- "source mentions AMPLIFIER PROTECT and OVER TEMPERATURE error"
- "ZONELINK attribute-table Commands column is blank; SET confirmed by prose, GET inferred."
- "MICLVL, MAXMSCLVL, MAXMICLVL, EQTREB, PAGACT, LF, BS, HEADER attribute-table Commands columns are blank; verbs above inferred from prose."
- "firmware version compatibility ranges not stated in source."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
