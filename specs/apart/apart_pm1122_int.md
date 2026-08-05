---
spec_id: admin/apart-pm1122-int
schema_version: ai4av-public-spec-v1
revision: 1
title: "Apart PM1122-INT Control Spec"
manufacturer: Apart
model_family: PM1122-INT
aliases: []
compatible_with:
  manufacturers:
    - Apart
  models:
    - PM1122-INT
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - apart-audio.info
  - manualslib.com
source_urls:
  - https://apart-audio.info/cat/predv_usiliteli/pm1122/pm1122-int/PM1122-INT_Manual_eng.pdf
  - https://www.manualslib.com/manual/1564403/Apart-Pm1122-Int.html
retrieved_at: 2026-04-26T17:12:12.122Z
last_checked_at: 2026-07-12T08:45:02.677Z
generated_at: 2026-07-12T08:45:02.677Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no REST, TCP, or IP control described — serial-only device"
  - "no safety warnings or interlock procedures in source"
  - "voltage/current/power specifications not stated in source"
  - "firmware version compatibility ranges not stated in source"
verification:
  verdict: verified
  checked_at: 2026-07-12T08:45:02.677Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 spec actions found in source with correct parameter enums and transport values verified. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-26
---

# Apart PM1122-INT Control Spec

## Summary
Zone pre-amp / mixer with 2 zones, each supporting music level, microphone level, and source selection. RS-232 serial control at 19200 baud 8-N-1. ASCII command protocol with structured SET/GET/INC/DEC commands plus preset store/recall and Easywave RF integration. Autonomous feedback when VALFB is enabled.

<!-- UNRESOLVED: no REST, TCP, or IP control described — serial-only device -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200  # default; configurable to 2400, 4800, 9600 via BAUDRATE command
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # POWER DOWN! event on power loss
- queryable      # GET commands return attribute values
- levelable      # MSCLVL, MICLVL, MIN/MAX limits support SET/INC/DEC
- routable       # SELECT attribute switches source A/B/C/D per zone
```

## Actions
```yaml
- id: set_attribute
  label: Set Attribute
  kind: action
  params:
    - name: attribute
      type: enum
      values:
        - MSCLVL
        - MICLVL
        - SELECT
        - MINMSC
        - MAXMSC
        - MINMIC
        - MAXMIC
        - ECHO
        - CR
        - BS
        - RESPONSE
        - BAUDRATE
        - DBLCLICK
        - RFKEY
        - VALFB
    - name: zone
      type: enum
      values:
        - ZONE1
        - ZONE2
      description: Zone target (required for MSCLVL, MICLVL, SELECT, MIN/MAX variants)
    - name: value
      type: union
      description: Numeric 0-100 for level attributes; A/B/C/D for SELECT; ON/OFF for settings; SELECT/PRESET for RFKEY

- id: get_attribute
  label: Get Attribute
  kind: action
  params:
    - name: attribute
      type: enum
      values:
        - MSCLVL
        - MICLVL
        - SELECT
        - MINMSC
        - MAXMSC
        - MINMIC
        - MAXMIC
        - RFKEY
        - INFO
        - SERIAL
        - HWVRSN
        - SWVRSN
    - name: zone
      type: enum
      values:
        - ZONE1
        - ZONE2
      description: Required for zone-scoped attributes

- id: increase
  label: Increment Attribute
  kind: action
  params:
    - name: attribute
      type: enum
      values:
        - MSCLVL
        - MICLVL
        - MINMSC
        - MAXMSC
        - MINMIC
        - MAXMIC
    - name: zone
      type: enum
      values:
        - ZONE1
        - ZONE2
    - name: delta
      type: integer
      description: Increment amount (defaults to 1 if omitted)

- id: decrease
  label: Decrement Attribute
  kind: action
  params:
    - name: attribute
      type: enum
      values:
        - MSCLVL
        - MICLVL
        - MINMSC
        - MAXMSC
        - MINMIC
        - MAXMIC
    - name: zone
      type: enum
      values:
        - ZONE1
        - ZONE2
    - name: delta
      type: integer
      description: Decrement amount (defaults to 1 if omitted)

- id: recall_preset
  label: Recall Preset
  kind: action
  params:
    - name: zone
      type: enum
      values:
        - ZONE1
        - ZONE2
        - null
      description: Optional zone; null = both zones
    - name: number
      type: integer
      description: Preset number 0-64

- id: store_preset
  label: Store Preset
  kind: action
  params:
    - name: zone
      type: enum
      values:
        - ZONE1
        - ZONE2
        - null
      description: Optional zone; null = both zones
    - name: number
      type: integer
      description: Preset number 1-64

- id: clear_preset
  label: Clear Preset(s)
  kind: action
  params:
    - name: number
      type: union
      description: Preset number 1-64 or "ALL" to clear all

- id: learn_rf
  label: Learn Easywave RF Switch
  kind: action
  params:
    - name: zone
      type: enum
      values:
        - ZONE1
        - ZONE2

- id: clear_rf
  label: Clear Easywave RF Switches
  kind: action
  params:
    - name: target
      type: enum
      values:
        - ALL

- id: help
  label: List Commands and Attributes
  kind: action
  params: []
  description: HELP or LST - both produce identical output listing all commands and attributes
```

## Feedbacks
```yaml
- id: level_feedback
  label: Level Change Feedback
  type: string
  pattern: "{ATTR} {ZONE} {VALUE}"
  description: Emitted when VALFB is on and any control changes. E.g. "MSCLVL ZONE1 75"

- id: remote_state
  label: Remote Mode State
  type: string
  pattern: "REMOTE ZONEx {0|1}"
  description: Emitted when REMOTE select on PM1122 is toggled. 0 = local, 1 = remote.

- id: power_down
  label: Power Down
  type: string
  value: "POWER DOWN!"
  description: Emitted when device loses power.

- id: info_response
  label: INFO Response
  type: string
  description: Multi-line response to GET INFO listing all controls and values. Split across multiple receive packets; parse by splitting on \r\n.

- id: preset_recall_response
  label: Preset Recall Acknowledgement
  type: string
  description: Device echoes STR/RCL command string back as confirmation.

- id: attribute_value
  label: Attribute Value Response
  type: string
  pattern: "{ATTR} {ZONE} {VALUE}"
  description: Response to GET commands returning attribute current value.
```

## Variables
```yaml
# Level limits are settable and persist per zone:
- id: min_msc_zone1
  label: Minimum Music Level Z1
  type: integer
  range: [0, 100]
  default: 0

- id: max_msc_zone1
  label: Maximum Music Level Z1
  type: integer
  range: [0, 100]
  default: 100

- id: min_mic_zone1
  label: Minimum Microphone Level Z1
  type: integer
  range: [0, 100]
  default: 0

- id: max_mic_zone1
  label: Maximum Microphone Level Z1
  type: integer
  range: [0, 100]
  default: 100

- id: min_msc_zone2
  label: Minimum Music Level Z2
  type: integer
  range: [0, 100]
  default: 0

- id: max_msc_zone2
  label: Maximum Music Level Z2
  type: integer
  range: [0, 100]
  default: 80  # observed default in INFO response

- id: min_mic_zone2
  label: Minimum Microphone Level Z2
  type: integer
  range: [0, 100]
  default: 0

- id: max_mic_zone2
  label: Maximum Microphone Level Z2
  type: integer
  range: [0, 100]
  default: 100

- id: source_select_zone1
  label: Source Selection Z1
  type: enum
  values: [A, B, C, D]

- id: source_select_zone2
  label: Source Selection Z2
  type: enum
  values: [A, B, C, D]

- id: music_level_zone1
  label: Music Level Z1
  type: integer
  range: [0, 100]

- id: music_level_zone2
  label: Music Level Z2
  type: integer
  range: [0, 100]

- id: mic_level_zone1
  label: Microphone Level Z1
  type: integer
  range: [0, 100]

- id: mic_level_zone2
  label: Microphone Level Z2
  type: integer
  range: [0, 100]

- id: valfb
  label: Autonomous Value Feedback
  type: boolean
  description: When ON, device sends level_feedback on every control change

- id: echo_mode
  label: Echo Received Characters
  type: boolean

- id: cr_mode
  label: CR Termination Mode
  type: boolean
  description: OFF = \n only, ON = \n\r

- id: bs_mode
  label: Backspace Echo Mode
  type: boolean

- id: response_mode
  label: Command Response Mode
  type: boolean
  description: When OFF, device sends no reply to commands

- id: baudrate
  label: Serial Baud Rate
  type: enum
  values: [2400, 4800, 9600, 19200]
  default: 19200

- id: dblclick_mute
  label: Easywave Double-Click Mute
  type: boolean

- id: rfkey_mode
  label: RF Key Mode
  type: enum
  values: [SELECT, PRESET]
  description: Whether A-D buttons select source or recall preset

- id: serial_number
  label: Serial Number
  type: string
  read_only: true

- id: hardware_version
  label: Hardware Version
  type: string
  read_only: true

- id: software_version
  label: Software Version
  type: string
  read_only: true
```

## Events
```yaml
- id: power_down_event
  label: Power Down
  type: string
  value: "POWER DOWN!"
  description: Sent when device loses AC power.

- id: remote_state_event
  label: Remote State Change
  type: string
  pattern: "REMOTE {ZONE} {0|1}"
  description: Sent when REMOTE select on PM1122 panel is toggled. 1 = remote mode active.

- id: control_change_event
  label: Control Value Changed
  type: string
  pattern: "{ATTR} {ZONE} {VALUE}"
  description: Sent whenever a control changes (level, source, etc.) when VALFB is ON.
```

## Macros
```yaml
- id: store_preset_both_zones
  label: Store Preset Both Zones
  description: |
    Stores current state of both zones as a preset.
    Example sequence:
      SET SELECT ZONE1 <source><CR>
      SET MSCLVL ZONE1 <level><CR>
      SET MICLVL ZONE1 <level><CR>
      SET SELECT ZONE2 <source><CR>
      SET MSCLVL ZONE2 <level><CR>
      SET MICLVL ZONE2 <level><CR>
      STR PRESET <number><CR>
  params:
    - name: zone1_source
      type: enum
      values: [A, B, C, D]
    - name: zone1_music
      type: integer
    - name: zone1_mic
      type: integer
    - name: zone2_source
      type: enum
      values: [A, B, C, D]
    - name: zone2_music
      type: integer
    - name: zone2_mic
      type: integer
    - name: preset_number
      type: integer

- id: recall_preset_both
  label: Recall Preset Both Zones
  params:
    - name: preset_number
      type: integer

- id: clear_all_presets
  label: Clear All Presets
  description: "CLR PRESET ALL<CR>"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Command terminator is Carriage Return (<CR>, ASCII 13). Line feed (<LF>) ignored.
- All commands are case-insensitive ASCII strings.
- String format: `COMMAND ATTRIBUTE [ZONE] [VALUE]<CR>`
- SET/GET/INC/DEC require space-separated parameters.
- Only baud rate is user-configurable; data bits, parity, stop bits, flow control are fixed at 8-N-1-none.
- BAUDRATE SET command accepts 2400, 4800, 9600, 19200. 19200 is factory default.
- Autonomous feedback (VALFB) must be explicitly enabled via `SET VALFB ON<CR>`.
- INFO response spans multiple receive packets — parse by splitting on `\r\n`.
- Easywave RF features require external hardware (optional receiver module).
- RSRFFU attribute is reserved and has no function.
- RS232 pinout: Pin 2 (TX), Pin 3 (RX), Pin 5 (GND). Straight-through cable.
- Preset 0 is factory reset (all levels minimum, source A) — recall-only, cannot be stored or cleared.
- Presets 1-12 can be recalled via rear-panel contacts; presets 1-4 and 7-10 via Easywave RF (if configured).
- INFO command requires VALFB enabled to produce a response.
<!-- UNRESOLVED: voltage/current/power specifications not stated in source -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->

## Provenance

```yaml
source_domains:
  - apart-audio.info
  - manualslib.com
source_urls:
  - https://apart-audio.info/cat/predv_usiliteli/pm1122/pm1122-int/PM1122-INT_Manual_eng.pdf
  - https://www.manualslib.com/manual/1564403/Apart-Pm1122-Int.html
retrieved_at: 2026-04-26T17:12:12.122Z
last_checked_at: 2026-07-12T08:45:02.677Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T08:45:02.677Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 spec actions found in source with correct parameter enums and transport values verified. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no REST, TCP, or IP control described — serial-only device"
- "no safety warnings or interlock procedures in source"
- "voltage/current/power specifications not stated in source"
- "firmware version compatibility ranges not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
