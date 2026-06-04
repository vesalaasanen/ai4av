---
spec_id: admin/extron-axp64-cat
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron AXP 64 C AT Control Spec"
manufacturer: Extron
model_family: "AXP 64 C AT"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "AXP 64 C AT"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - manualslib.com
  - extron.com
  - placeos.github.io
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2721-01_D.pdf
  - https://www.manualslib.com/manual/2924114/Extron-Electronics-AXP-64-C-AT.html
  - https://www.extron.com/article/tech92
  - https://placeos.github.io/drivers/Extron/SIS.html
  - https://www.extron.com/download/
retrieved_at: 2026-05-13T00:31:32.824Z
last_checked_at: 2026-06-03T07:03:09.155Z
generated_at: 2026-06-03T07:03:09.155Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no serial (RS-232) configuration found in source — only Ethernet described"
  - "Dante controller configuration details not included (named by convention only)"
  - "no power on/off commands found in source"
  - "no standalone settable variables beyond action params identified in source"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures found in source"
  - "no firmware version compatibility range stated"
  - "DSP software-only controls (Configure Digital I/O dialog) not documented as SIS commands"
verification:
  verdict: verified
  checked_at: 2026-06-03T07:03:09.155Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "Complete spec verification (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Extron AXP 64 C AT Control Spec

## Summary
Extron AXP 64 C AT is an audio expansion processor with DSP functions, controlled via SIS (Simple Instruction Set) commands over TCP/IP on port 4333. This spec covers basic system commands, DSP audio level/mute/polarity/phantom control, and digital I/O status queries.

<!-- UNRESOLVED: no serial (RS-232) configuration found in source — only Ethernet described -->
<!-- UNRESOLVED: Dante controller configuration details not included (named by convention only) -->
<!-- UNRESOLVED: no power on/off commands found in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 4333
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: read gain, read mute, view digital I/O status commands present
- levelable  # inferred: gain/trim/attenuation controls in 0.1 dB increments
```

## Actions
```yaml
# === Basic SIS Commands ===

- id: show_firmware_version
  label: Show Firmware Version
  kind: action
  params: []
  command: "Esc X!"
  response: "CQ } X! ]"
  description: Show current firmware version (X! = version to two decimal places)

- id: view_part_number
  label: View Part Number
  kind: action
  params: []
  command: "Esc CPN"
  response: "60-1499-01 ]"
  description: View the unit part number

- id: show_device_name
  label: Show Device Name
  kind: action
  params: []
  command: "Esc CN"
  response: "X# ]"
  description: Show AXP 64 device name (up to 24 characters including spaces)

- id: show_mac_address
  label: Show MAC Address
  kind: action
  params: []
  command: "Esc CH"
  response: "X$ ]"
  description: Show MAC address of the connected AXP 64

- id: reset_factory_defaults
  label: Reset to Factory Defaults
  kind: action
  params: []
  command: "Esc ZXXX"
  response: "Zpx ]"
  description: Reset basic system and DSP settings to factory defaults

- id: reset_full_factory_defaults
  label: Full Factory Reset (Including Dante)
  kind: action
  params: []
  command: "Esc ZQQQ"
  response: "Zpq ]"
  description: Reset basic system, DSP, and Dante settings to factory defaults

# === DSP SIS Commands ===

- id: set_gain_analog
  label: Set Gain (Analog)
  kind: action
  params:
    - name: block
      type: integer
      description: "Gain/trim/attenuation block ID (e.g. 40000=input1, 40001=input2, 40100=output1, 40101=output2, 60000=atten1, 60001=atten2, etc.)"
    - name: level_tenths_db
      type: integer
      description: "dB value in 0.1 dB increments (e.g. -8 = -0.8 dB, 165 = +16.5 dB). Input gain analog: -180 to 800. Output gain: -1000 to 120. Trim: -120 to 120. Attenuation: -1000 to 0."
  command: "Esc g {block} * {level_tenths_db} AU }"
  response: "DsG {block}*{level_tenths_db}]"
  description: Set analog gain/trim/attenuation for the specified block

- id: read_gain_analog
  label: Read Gain (Analog)
  kind: query
  params:
    - name: block
      type: integer
      description: "Gain/trim/attenuation block ID"
  command: "Esc g {block} AU }"
  response: "DsG {block}*{level_tenths_db}]"
  description: Read current analog gain value for the specified block

- id: set_gain_digital
  label: Set Gain (Digital)
  kind: action
  params:
    - name: block
      type: integer
      description: "Gain block ID (e.g. 40000=input1 through 40005=input6)"
    - name: level_tenths_db
      type: integer
      description: "dB value in 0.1 dB increments. Input gain digital: -180 to 240."
  command: "Esc h {block} * {level_tenths_db} AU }"
  response: "DsH {block}*{level_tenths_db}]"
  description: Set digital gain for the specified block

- id: read_gain_digital
  label: Read Gain (Digital)
  kind: query
  params:
    - name: block
      type: integer
      description: "Gain block ID"
  command: "Esc h {block} AU }"
  response: "DsH {block}*{level_tenths_db}]"
  description: Read current digital gain value for the specified block

- id: audio_mute
  label: Audio Mute
  kind: action
  params:
    - name: block
      type: integer
      description: "Audio block ID (input/output gain, attenuation, or trim block)"
  command: "Esc m {block} * 1 AU }"
  response: "Ds M {block}* 1 ]"
  description: Mute audio at the specified block

- id: audio_unmute
  label: Audio Unmute
  kind: action
  params:
    - name: block
      type: integer
      description: "Audio block ID"
  command: "Esc m {block} * 0 AU }"
  response: "Ds M {block}* 0 ]"
  description: Unmute audio at the specified block

- id: select_input_type
  label: Select Input Type
  kind: action
  params:
    - name: block
      type: integer
      description: "Input block ID"
    - name: input_type
      type: integer
      description: "0 = analog, 1 = digital"
  command: "Esc d {block} * {input_type} AU }"
  response: "Ds D {block}*{input_type}]"
  description: Select analog or digital input type for the specified block

- id: set_signal_polarity
  label: Set Signal Polarity
  kind: action
  params:
    - name: block
      type: integer
      description: "Audio block ID"
    - name: polarity
      type: integer
      description: "0 = positive (standard), 1 = negative (inverted)"
  command: "Esc p {block} * {polarity} AU }"
  response: "Ds P {block}*{polarity}]"
  description: Set signal polarity for the specified block

- id: set_phantom_power
  label: Set Phantom Power
  kind: action
  params:
    - name: block
      type: integer
      description: "Input block ID"
    - name: enabled
      type: integer
      description: "0 = phantom power off (default), 1 = phantom power on"
  command: "Esc z {block} * {enabled} AU }"
  response: "Ds Z {block}*{enabled}]"
  description: Enable or disable phantom power for the specified block

# === Digital I/O SIS Commands ===

- id: view_digital_input_mode
  label: View Digital Input Mode
  kind: query
  params:
    - name: input_number
      type: integer
      description: "Digital input 1 through 4"
  command: "Esc {input_number} GPI }"
  response: "Gpi {input_number}*{status}]"
  description: View digital input status (0 = logic low, 1 = logic high)

- id: view_digital_input_logic_state
  label: View Digital Input Logic State
  kind: query
  params:
    - name: input_number
      type: integer
      description: "Digital input 1 through 4"
  command: "Esc {input_number} GPIT }"
  response: "Gpit {input_number}*{mode}]"
  description: View digital input mode

- id: view_digital_output_mode
  label: View Digital Output Mode
  kind: query
  params:
    - name: output_channel
      type: integer
      description: "Digital I/O output channel 1 through 4"
    - name: output_number
      type: integer
      description: "Output number for the selected digital output channel (1 or 2)"
  command: "Esc {output_channel} * {output_number} GPOT }"
  response: "Gpot {channel}*{output_number}*{mode}]"
  description: "View digital output mode (0=output high, 1=output low, 2=follow mute, 3=follow mute inverted)"
- id: read_audio_mute
  label: Read Audio Mute or Level
  kind: query
  params:
    - name: block
      type: integer
      description: Audio block ID
  command: "Esc m {block} AU }"
```

## Feedbacks
```yaml
- id: firmware_version
  type: string
  description: "Firmware version returned on power-on and query (format: Vn.nn)"
  example: "Vn.nn"

- id: gain_analog
  type: integer
  description: "Current analog gain/trim/attenuation value in 0.1 dB increments, prefixed by DsG"

- id: gain_digital
  type: integer
  description: "Current digital gain value in 0.1 dB increments, prefixed by DsH"

- id: mute_status
  type: enum
  values: ["0", "1"]
  description: "0 = unmute (pass signal), 1 = mute (block signal)"

- id: digital_input_status
  type: enum
  values: ["0", "1"]
  description: "0 = logic low, 1 = logic high"

- id: digital_output_mode
  type: enum
  values: ["0", "1", "2", "3"]
  description: "0 = output high (default), 1 = output low, 2 = follow mute (muted=high), 3 = follow mute inverted (muted=low)"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable variables beyond action params identified in source
```

## Events
```yaml
- id: power_on_message
  description: "On power-up, the AXP 64 C AT sends a copyright/firmware identification string to the connected host"
  format: "©Copyright20nn,Extron,AXP64CAT,Vn.nn,60-1499-01"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - reset_factory_defaults
  - reset_full_factory_defaults
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- All commands use Escape character (hex `1B`) as prefix. In command notation shown as `E` or `W`.
- All responses end with CR/LF (hex `0D 0A`), shown as `]`.
- dB values are in 0.1 dB increments using integers (no decimal places). Multiply desired dB by 10 (e.g. +16.5 dB = `165`, -0.8 dB = `-8`).
- DSP command structure: `Esc <command_letter> <block_id> * <value> AU }`.
- Input gain blocks: `40000`–`40005` (inputs 1–6). Output gain blocks: `40100`–`40105` (outputs 1–6). Attenuation blocks: `60000`–`60003`. Trim blocks: `40100`–`40105`.
- Error responses: `E10` (invalid command), `E13` (invalid parameter / out of range).
- Rejected characters in names: `+ } ~ , @ = ' ' [ ] { } < > " " | \ ? ; :` (spaces are permitted).
<!-- UNRESOLVED: no firmware version compatibility range stated -->
<!-- UNRESOLVED: no power on/off commands found in source -->
<!-- UNRESOLVED: DSP software-only controls (Configure Digital I/O dialog) not documented as SIS commands -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - manualslib.com
  - extron.com
  - placeos.github.io
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2721-01_D.pdf
  - https://www.manualslib.com/manual/2924114/Extron-Electronics-AXP-64-C-AT.html
  - https://www.extron.com/article/tech92
  - https://placeos.github.io/drivers/Extron/SIS.html
  - https://www.extron.com/download/
retrieved_at: 2026-05-13T00:31:32.824Z
last_checked_at: 2026-06-03T07:03:09.155Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:03:09.155Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "Complete spec verification (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no serial (RS-232) configuration found in source — only Ethernet described"
- "Dante controller configuration details not included (named by convention only)"
- "no power on/off commands found in source"
- "no standalone settable variables beyond action params identified in source"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures found in source"
- "no firmware version compatibility range stated"
- "DSP software-only controls (Configure Digital I/O dialog) not documented as SIS commands"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
