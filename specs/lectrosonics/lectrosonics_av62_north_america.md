---
spec_id: admin/lectrosonics-av62-north_america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lectrosonics AV62 Control Spec"
manufacturer: Lectrosonics
model_family: AV62
aliases: []
compatible_with:
  manufacturers:
    - Lectrosonics
  models:
    - AV62
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - lectrosonics.com
retrieved_at: 2026-04-29T16:53:22.425Z
last_checked_at: 2026-04-30T09:45:11.427Z
generated_at: 2026-04-30T09:45:11.427Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:45:11.427Z
  matched_actions: 23
  action_count: 23
  confidence: high
  summary: "All 23 spec actions matched to source commands with correct parameter shapes; transport parameters fully supported."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Lectrosonics AV62 Control Spec

## Summary
RS-232 audio visual mixer supporting multi-drop addressing (128-254). Protocol: address byte → acknowledgement → command byte → data exchange. All numerical values decimal. No auth procedure in source.

<!-- UNRESOLVED: power on/off commands not present in source -->

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
- queryable  # inferred: many get commands returning state
- routable   # inferred: output mix status/control commands
- levelable  # inferred: gain, balance, bass, treble control commands
```

## Actions
```yaml
- id: acknowledge
  label: Acknowledge
  kind: action
  params: []
  description: Returns device name string "AV62"

- id: change_device_address
  label: Change Device Address
  kind: action
  params:
    - name: address
      type: integer
      description: New address 128-254
  description: Changes device address, stored in EEPROM

- id: output_firmware_version
  label: Output Firmware Version
  kind: query
  params: []
  description: Returns firmware version as decimal (e.g. 10 = v1.0)

- id: get_current_audio_levels
  label: Get Current Audio Levels
  kind: query
  params:
    - name: mode
      type: integer
      description: "0 = current levels, 1 = peak levels since last check"
  description: Returns left, right, mono audio levels 0-255 (0=-65dBu, 255=+20dBu, 0.333dB/bit)

- id: get_current_memory
  label: Get Current Memory
  kind: query
  params: []
  description: Returns 0=Local mode, 1-6=stored memory

- id: set_current_memory
  label: Set Current Memory
  kind: action
  params:
    - name: memory
      type: integer
      description: "0-6, 0=Local, 1-6=stored memory"
    - name: save
      type: integer
      description: "0 = don't save to EEPROM, 1 = save to EEPROM"
  description: Sets active memory. Must be 1-6 for remote control.

- id: get_stored_memory_contents
  label: Get Stored Memory Contents
  kind: query
  params:
    - name: memory
      type: integer
      description: "1-6, desired stored memory"
  description: Returns 19 bytes: input gain, mic gain, bass, treble, output gain, balance, mix status

- id: get_local_mode_line_input_mixer_status
  label: Get Local Mode Line Input Mixer Status
  kind: query
  params: []
  description: Returns 0=Single mode (one program input active), 1=Multiple mode (any number active)

- id: set_local_mode_line_input_mixer_status
  label: Set Local Mode Line Input Mixer Status
  kind: action
  params:
    - name: mode
      type: integer
      description: "0 = Single, 1 = Multiple"
  description: Sets mixer mode, stored in EEPROM

- id: get_current_line_input_levels
  label: Get Current Line Input Levels
  kind: query
  params:
    - name: input
      type: integer
      description: "0-5 corresponds to inputs 1-6"
  description: Returns gain 0-31 (0=max gain, 30=min gain, 31=off)

- id: set_current_line_input_levels
  label: Set Current Line Input Levels
  kind: action
  params:
    - name: input
      type: integer
      description: "0-5 corresponds to inputs 1-6"
    - name: level
      type: integer
      description: "0-31, 0=max gain, 30=min gain, 31=off"
  description: Sets line input gain

- id: get_current_mic_input_levels
  label: Get Current Mic Input Levels
  kind: query
  params:
    - name: input
      type: integer
      description: "0=mic1, 1=mic2"
  description: Returns gain 0-63 (0=max gain, 62=min gain, 63=off)

- id: set_current_mic_input_levels
  label: Set Current Mic Input Levels
  kind: action
  params:
    - name: input
      type: integer
      description: "0=mic1, 1=mic2"
    - name: level
      type: integer
      description: "0-63, 0=max gain, 62=min gain, 63=off"
  description: Sets mic input gain

- id: get_current_tone_control_levels
  label: Get Current Tone Control Levels
  kind: query
  params:
    - name: control
      type: integer
      description: "0=mic bass, 1=line bass, 2=mic treble, 3=line treble"
  description: Returns level 0-8 (0=+10dB boost, 4=flat, 8=-10dB cut, 2.5dB/step)

- id: set_current_tone_control_levels
  label: Set Current Tone Control Levels
  kind: action
  params:
    - name: control
      type: integer
      description: "0=mic bass, 1=line bass, 2=mic treble, 3=line treble"
    - name: level
      type: integer
      description: "0-8, 0=+10dB boost, 4=flat, 8=-10dB cut"
  description: Sets tone control level

- id: get_current_program_gain_level
  label: Get Current Program Gain Level
  kind: query
  params: []
  description: Returns 0-255 (0=max gain, 255=min gain, 0.333dB/bit)

- id: set_current_program_gain_level
  label: Set Current Program Gain Level
  kind: action
  params:
    - name: gain
      type: integer
      description: "0-255, two data bytes: least significant 7 bits first, MSB second"
  description: Sets program output gain

- id: get_current_program_balance_level
  label: Get Current Program Balance Level
  kind: query
  params: []
  description: Returns 0-31 (0=full right, 14-15=equal, 31=full left)

- id: set_current_program_balance_level
  label: Set Current Program Balance Level
  kind: action
  params:
    - name: balance
      type: integer
      description: "0-31, 0=full right, 14-15=equal, 31=full left"
  description: Sets program balance

- id: get_current_mono_gain_level
  label: Get Current Mono Gain Level
  kind: query
  params: []
  description: Returns 0-255 (0=max gain, 255=min gain, 0.333dB/bit)

- id: set_current_mono_gain_level
  label: Set Current Mono Gain Level
  kind: action
  params:
    - name: gain
      type: integer
      description: "0-255, two data bytes: least significant 7 bits first, MSB second"
  description: Sets mono output gain

- id: get_output_mix_status
  label: Get Output Mix Status
  kind: query
  params:
    - name: output
      type: integer
      description: "0=left, 1=right, 2=mono, 3=expansion out"
  description: Returns mix status byte with bit definitions for signal sources

- id: set_output_mix_status
  label: Set Output Mix Status
  kind: action
  params:
    - name: output
      type: integer
      description: "0=left, 1=right, 2=mono, 3=expansion out"
    - name: mix
      type: integer
      description: Mix status byte, bit fields per output type
  description: Sets output mix configuration
```

## Feedbacks
```yaml
# UNRESOLVED: feedbacks are inherent in query commands returning state.
# No independent feedback strings defined in source.
```

## Variables
```yaml
# Variables exposed via get/set command pairs:
- id: current_memory
  type: integer
  range: 0-6
  description: Active memory, 0=Local, 1-6=stored

- id: line_input_levels
  type: array
  description: Gain for inputs 1-6, range 0-31

- id: mic_input_levels
  type: array
  description: Gain for mic 1-2, range 0-63

- id: tone_control_levels
  type: array
  description: "Mic bass, line bass, mic treble, line treble: 0-8"

- id: program_gain
  type: integer
  range: 0-255
  description: Program output gain, 0=max, 255=min, 0.333dB/bit

- id: program_balance
  type: integer
  range: 0-31
  description: "Balance: 0=full right, 14-15=equal, 31=full left"

- id: mono_gain
  type: integer
  range: 0-255
  description: Mono output gain, 0=max, 255=min, 0.333dB/bit

- id: output_mix
  type: object
  description: "Mix status for left, right, mono, expansion out"
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - To remotely control AV62, set to stored memory (1-6), not Local mode (0)
    # Reason: Local mode reads front/rear panel controls, overrides serial commands
  - Address byte must precede every command; wait for "0" acknowledgement before sending command
    # Prevents device reset from incomplete command sequences
```

## Notes
Multi-drop RS-232 bus: address range 128-254. Data bytes 0-127; values >127 are addresses. Two-byte encoding for data values >127: lower 7 bits first, MSB second. Command codes are decimal (not ASCII). No login or password authentication described.
<!-- UNRESOLVED: power state commands not present; power on/off behavior not documented -->
<!-- UNRESOLVED: firmware version range/compatibility not stated -->
<!-- UNRESOLVED: port number (COM1 etc.) not stated; host serial port config not specified -->
<!-- UNRESOLVED: expansion devices (AM8, TH2, TA1) protocol for downstream control not documented -->

## Provenance

```yaml
source_domains:
  - lectrosonics.com
retrieved_at: 2026-04-29T16:53:22.425Z
last_checked_at: 2026-04-30T09:45:11.427Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:45:11.427Z
matched_actions: 23
action_count: 23
confidence: high
summary: "All 23 spec actions matched to source commands with correct parameter shapes; transport parameters fully supported."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
