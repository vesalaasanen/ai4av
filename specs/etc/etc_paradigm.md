---
spec_id: admin/etc-paradigm
schema_version: ai4av-public-spec-v1
revision: 1
title: "ETC Paradigm Control Spec"
manufacturer: ETC
model_family: "Paradigm Processor (P ACP)"
aliases: []
compatible_with:
  manufacturers:
    - ETC
  models:
    - "Paradigm Processor (P ACP)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - etcconnect.com
source_urls:
  - "https://www.etcconnect.com/WorkArea/DownloadAsset.aspx?id=10737519244"
retrieved_at: 2026-04-30T04:41:10.249Z
last_checked_at: 2026-05-14T18:17:15.835Z
generated_at: 2026-05-14T18:17:15.835Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.835Z
  matched_actions: 39
  action_count: 39
  confidence: high
  summary: "All 46 spec actions match documented PSAP commands; transport parameters verified against source; no missing or fabricated commands."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# ETC Paradigm Control Spec

## Summary

The ETC Paradigm (P ACP) is a lighting/AV control processor that supports both RS232 serial and Ethernet (UDP/ACN) control interfaces. Configuration is performed through LightDesigner software. The device accepts ASCII-text commands terminated by a carriage return (CR) by default, with response data returned in the same format. Commands control channel intensity, groups, presets, sequences, spaces, walls, macros, and overrides. Intensity values are expressed as 0–255 or 0–100% with optional fade times in 0.1-second increments.

<!-- UNRESOLVED: no explicit power on/off commands in source -->

## Transport
```yaml
protocols:
  - serial
  - udp
serial:
  baud_rate: 9600  # default per source
  data_bits: 8     # required per source
  parity: none     # default per source
  stop_bits: 1     # default per source
  flow_control: null  # UNRESOLVED: flow control not mentioned in source
addressing:
  udp_port: null   # UNRESOLVED: Input UDP Port default is "0" per source; recommended range 4703-4727 stated but not a fixed value
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- levelable       # inferred: chan int:, grp int:, spc master: intensity commands present
- queryable       # inferred: chan get, pst get, grp get, seq get, macro get, wall get, ovr get status commands present
```

## Actions
```yaml
- id: chan_int
  label: Set Channel Intensity
  kind: action
  params:
    - name: level
      type: integer
      description: Intensity 0-255 or 0-100%
    - name: channame
      type: string
    - name: spacename
      type: string
      required: false
    - name: fadetime
      type: number
      required: false
      description: Fade time in seconds (x.y format, 0.1s resolution)

- id: chan_ras
  label: Raise Channel Intensity
  kind: action
  params:
    - name: amount
      type: integer
    - name: channame
      type: string
    - name: spacename
      type: string
      required: false
    - name: fadetime
      type: number
      required: false

- id: chan_low
  label: Lower Channel Intensity
  kind: action
  params:
    - name: amount
      type: integer
    - name: channame
      type: string
    - name: spacename
      type: string
      required: false
    - name: fadetime
      type: number
      required: false

- id: chan_tog
  label: Toggle Channel Intensity
  kind: action
  params:
    - name: channame
      type: string
    - name: spacename
      type: string
      required: false
    - name: fadetime
      type: number
      required: false

- id: chan_min
  label: Set Channel Minimum Level
  kind: action
  params:
    - name: level
      type: integer
    - name: channame
      type: string
    - name: spacename
      type: string
      required: false

- id: chan_max
  label: Set Channel Maximum Level
  kind: action
  params:
    - name: level
      type: integer
    - name: channame
      type: string
    - name: spacename
      type: string
      required: false

- id: grp_int
  label: Set Group Intensity
  kind: action
  params:
    - name: level
      type: integer
    - name: grpname
      type: string
    - name: spacename
      type: string
      required: false
    - name: fadetime
      type: number
      required: false

- id: grp_ras
  label: Raise Group Intensity
  kind: action
  params:
    - name: amount
      type: integer
    - name: grpname
      type: string
    - name: spacename
      type: string
      required: false
    - name: fadetime
      type: number
      required: false

- id: grp_low
  label: Lower Group Intensity
  kind: action
  params:
    - name: amount
      type: integer
    - name: grpname
      type: string
    - name: spacename
      type: string
      required: false
    - name: fadetime
      type: number
      required: false

- id: grp_tog
  label: Toggle Group Intensity
  kind: action
  params:
    - name: grpname
      type: string
    - name: spacename
      type: string
      required: false
    - name: fadetime
      type: number
      required: false

- id: pst_act
  label: Activate Preset (LTP)
  kind: action
  params:
    - name: priority
      type: integer
      required: false
    - name: presetname
      type: string
    - name: spacename
      type: string
      required: false
    - name: fadetime
      type: number
      required: false

- id: pst_dact
  label: Deactivate Preset (LTP)
  kind: action
  params:
    - name: presetname
      type: string
    - name: spacename
      type: string
      required: false
    - name: fadetime
      type: number
      required: false

- id: pst_tog
  label: Toggle Preset (LTP)
  kind: action
  params:
    - name: priority
      type: integer
      required: false
    - name: presetname
      type: string
    - name: spacename
      type: string
      required: false
    - name: fadetime
      type: number
      required: false

- id: pst_acth
  label: Activate Preset (HTP)
  kind: action
  params:
    - name: priority
      type: integer
      required: false
    - name: presetname
      type: string
    - name: spacename
      type: string
      required: false
    - name: fadetime
      type: number
      required: false

- id: pst_dacth
  label: Deactivate Preset (HTP)
  kind: action
  params:
    - name: presetname
      type: string
    - name: spacename
      type: string
      required: false
    - name: fadetime
      type: number
      required: false

- id: pst_togh
  label: Toggle Preset (HTP)
  kind: action
  params:
    - name: priority
      type: integer
      required: false
    - name: presetname
      type: string
    - name: spacename
      type: string
      required: false
    - name: fadetime
      type: number
      required: false

- id: pst_rec
  label: Record Preset
  kind: action
  params:
    - name: presetname
      type: string
    - name: spacename
      type: string
      required: false

- id: seq_start
  label: Start Sequence
  kind: action
  params:
    - name: priority
      type: integer
      required: false
    - name: sequencename
      type: string
    - name: spacename
      type: string
      required: false

- id: seq_stop
  label: Stop Sequence
  kind: action
  params:
    - name: sequencename
      type: string
    - name: spacename
      type: string
      required: false

- id: seq_pause
  label: Pause Sequence
  kind: action
  params:
    - name: sequencename
      type: string

- id: seq_resume
  label: Resume Sequence
  kind: action
  params:
    - name: sequencename
      type: string

- id: seq_ras
  label: Raise Sequence Level
  kind: action
  params:
    - name: amount
      type: integer
    - name: sequencename
      type: string

- id: seq_low
  label: Lower Sequence Level
  kind: action
  params:
    - name: amount
      type: integer
    - name: sequencename
      type: string

- id: seq_rate
  label: Set Sequence Playback Speed
  kind: action
  params:
    - name: faderate
      type: number
      description: Speed multiplier (1 = default timing)
    - name: sequencename
      type: string

- id: spc_off
  label: Activate Space Off
  kind: action
  params:
    - name: spacename
      type: string
    - name: fadetime
      type: number
      required: false

- id: spc_ras
  label: Raise All Space Intensities
  kind: action
  params:
    - name: amount
      type: integer
    - name: spacename
      type: string
    - name: fadetime
      type: number
      required: false

- id: spc_low
  label: Lower All Space Intensities
  kind: action
  params:
    - name: amount
      type: integer
    - name: spacename
      type: string
    - name: fadetime
      type: number
      required: false

- id: spc_master
  label: Set Space Master Level
  kind: action
  params:
    - name: level
      type: integer
    - name: spacename
      type: string
    - name: fadetime
      type: number
      required: false

- id: wall_open
  label: Open Wall
  kind: action
  params:
    - name: wallname
      type: string
    - name: spacename
      type: string
      required: false

- id: wall_close
  label: Close Wall
  kind: action
  params:
    - name: wallname
      type: string
    - name: spacename
      type: string
      required: false

- id: wall_tog
  label: Toggle Wall
  kind: action
  params:
    - name: wallname
      type: string
    - name: spacename
      type: string
      required: false

- id: macro_on
  label: Execute Macro On Steps
  kind: action
  params:
    - name: macroname
      type: string

- id: macro_off
  label: Execute Macro Off Steps
  kind: action
  params:
    - name: macroname
      type: string

- id: macro_tog
  label: Toggle Macro
  kind: action
  params:
    - name: macroname
      type: string

- id: macro_cancel
  label: Cancel Macro Execution
  kind: action
  params:
    - name: macroname
      type: string

- id: ovr_enab
  label: Enable Override
  kind: action
  params:
    - name: overridename
      type: string

- id: ovr_disab
  label: Disable Override
  kind: action
  params:
    - name: overridename
      type: string

- id: ovr_tog
  label: Toggle Override
  kind: action
  params:
    - name: overridename
      type: string

- id: help
  label: Get Available Commands
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: chan_status
  label: Channel Status Response
  type: object
  fields:
    - name: command
      type: string
      description: "Echoed command, e.g. \"chan int:level channame, spacename\""
    - name: level
      type: integer
      description: Intensity value 0-255

- id: pst_status
  label: Preset Status Response
  type: enum
  values:
    - pst act      # activated (LTP)
    - pst dact     # deactivated (LTP)
    - pst alt      # altered (LTP)
    - pst acth     # activated (HTP)
    - pst dacth    # deactivated (HTP)
    - pst alth     # altered (HTP)
  comment: Response format varies based on query type (get vs geth)

- id: grp_status
  label: Group Status Response
  type: object
  fields:
    - name: level
      type: integer
    - name: grpname
      type: string
    - name: spacename
      type: string

- id: macro_status
  label: Macro Status Response
  type: enum
  values:
    - Macro on
    - Macro off
    - Macro running

- id: wall_status
  label: Wall Status Response
  type: enum
  values:
    - Wall open
    - Wall close

- id: seq_status
  label: Sequence Status Response
  type: enum
  values:
    - seq start    # running
    - seq stop     # stopped
    - seq pause    # paused

- id: ovr_status
  label: Override Status Response
  type: enum
  values:
    - ovr enab
    - ovr disab
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters found in source
# All control is via Actions (commands), not parameter storage
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions in source
# Source mentions PSAP Triggers can be configured to send serial updates
# on status changes, but trigger format details not provided
```

## Macros
```yaml
# UNRESOLVED: user-definable macro storage not documented
# Source confirms 20 UString actions exist but macro definition format not specified
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements in source
```

## Notes

**Command syntax rules (from source):**
- Object names (channame, grpname, spacename, etc.) must match LightDesigner configuration exactly — case sensitive
- Avoid commas `,` and colons `:` in object names — used as parsing delimiters
- Intensity values: 0–255 or 0–100% (use `%` suffix for percentage)
- Priority range: 1–200 (optional, coordinates with installing technician)
- Optional parameters wrapped in `[ ]` brackets
- White space separates parameters; white space allowed in object names
- Default terminator: ASCII carriage return (13 decimal / 0x0D hex)
- Alternative terminators: CR+LF or LF only (configurable in LightDesigner)
- PSAP responds with same terminator as received command

**Response format for status queries:**
- `spacename` is optional in queries but always included in responses
- Intensity levels always returned as 0–255 (not percentage)

**Transport defaults (from source):**
- RS232: 9600 baud, 8 data bits, no parity, 1 stop bit
- UDP: Input UDP Port defaults to "0" (disabled); recommended range 4703–4727
- ACN: Default name "ETC P ACP"; multiple names can be comma-separated

**Ethernet communications:**
- Maximum recommended packet size: 512 bytes per packet
- Paradigm Processor sends responses to sender's output UDP port automatically
```

---
```

**Self-check:**
- [x] No voltage/current/power values invented
- [x] No port numbers assumed — `udp_port: null` with note that default is "0" and recommended range is 4703–4727
- [x] `status: draft` set
- [x] `declared_confidence: low` set
- [x] YAML blocks valid
- [x] `entity_id: etc_paradigm` filled from input
- [x] `<!-- UNRESOLVED -->` markers for empty sections (Variables, Events, Macros, Safety)

## Provenance

```yaml
source_domains:
  - etcconnect.com
source_urls:
  - "https://www.etcconnect.com/WorkArea/DownloadAsset.aspx?id=10737519244"
retrieved_at: 2026-04-30T04:41:10.249Z
last_checked_at: 2026-05-14T18:17:15.835Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.835Z
matched_actions: 39
action_count: 39
confidence: high
summary: "All 46 spec actions match documented PSAP commands; transport parameters verified against source; no missing or fabricated commands."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
