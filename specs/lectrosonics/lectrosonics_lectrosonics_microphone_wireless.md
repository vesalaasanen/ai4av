---
spec_id: admin/lectrosonics-am1612
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lectrosonics AM16/12 Control Spec"
manufacturer: Lectrosonics
model_family: AM16/12
aliases: []
compatible_with:
  manufacturers:
    - Lectrosonics
  models:
    - AM16/12
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - lectrosonics.com
source_urls:
  - https://lectrosonics.com/wp-content/uploads/filr/7409/am1612man.pdf
retrieved_at: 2026-04-30T04:33:13.083Z
last_checked_at: 2026-06-02T22:08:43.899Z
generated_at: 2026-06-02T22:08:43.899Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document title references \"Microphone / Wireless\" but content describes AM16/12 matrix mixer — entity may be mismatched"
  - "flow control not explicitly stated; wiring diagram shows RTS/CTS pins but usage not described"
  - "no unsolicited event/notification mechanism described in source"
  - "no multi-step macro sequences explicitly described in source"
  - "source does not describe power sequencing, interlock, or safety procedures"
  - "firmware version compatibility range not stated"
  - "maximum number of daisy-chained LecNet devices not stated"
  - "command response timing constraints beyond the 25ms minimum"
  - "programmable input/output configuration commands (only query and simulate are documented)"
  - "expansion port control details beyond crosspoint routing"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:08:43.899Z
  matched_actions: 8
  action_count: 8
  confidence: medium
  summary: "All 8 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Lectrosonics AM16/12 Control Spec

## Summary

The Lectrosonics AM16/12 is a 16-channel automatic matrix mixer with 12 outputs, controlled via RS-232 serial using the proprietary LecNet binary protocol. The mixer supports input/output gain control, matrix crosspoint routing, memory presets, NOM bus assignment, programmable I/O, and automix activity monitoring. Multiple LecNet devices can share a single RS-232 port using a byte-addressing scheme.

<!-- UNRESOLVED: source document title references "Microphone / Wireless" but content describes AM16/12 matrix mixer — entity may be mismatched -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; wiring diagram shows RTS/CTS pins but usage not described
auth:
  type: none  # inferred: no auth procedure in source
```

### LecNet Addressing

All commands are binary (hex, not ASCII). Each command transaction follows this sequence:

1. Host sends 1-byte device address (valid range 128–254; factory default is 139 / 0x8B)
2. Device responds with acknowledgment byte 0x00
3. Host sends 1-byte command code
4. Host and device exchange data bytes per command

Address 255 (0xFF) is reserved. Single data bytes from host must be 0–127 (values >127 are interpreted as addresses). Values >127 are sent as two bytes: lower 7 bits first, then 0 or 1 for the MSB.

Some commands return an additional acknowledgment byte after processing to indicate the device is ready for the next command.

## Traits
```yaml
- queryable  # inferred: multiple Get commands return device state
- levelable  # inferred: input gain, output gain, crosspoint gain controls
- routable    # inferred: matrix crosspoint routing commands
```

## Actions
```yaml
- id: set_device_address
  label: Set Device Address
  kind: action
  description: Sets the device address and stores it in nonvolatile memory
  params:
    - name: address
      type: integer
      min: 128
      max: 254
      description: New device address (decimal)

- id: set_memory_preset
  label: Set Current Memory Preset
  kind: action
  description: Recalls a memory preset (1-15), optionally preserving current rear panel gain
  params:
    - name: preset
      type: integer
      min: 0
      max: 14
      description: "Memory preset index (0-14 = presets 1-15)"
    - name: mode
      type: integer
      enum: [0, 1]
      description: "0 = reset rear panel gain to preset value, 1 = keep current rear panel gain"

- id: set_input_gain
  label: Set Input Gain
  kind: action
  description: Sets input gain for one or more of the 16 inputs using a 16-bit channel mask
  params:
    - name: channel_mask
      type: integer
      description: "16-bit mask where bit 0 = input 1 through bit 15 = input 16 (encoded as 4 LecNet bytes)"
    - name: gain
      type: integer
      min: 0
      max: 83
      description: "0-78 = +15dB to -63dB, 79 = off, 80 = increment 1dB, 81 = decrement 1dB, 82 = mute, 83 = unmute to pre-mute gain"

- id: set_nom_bus_association
  label: Set NOM Bus Association
  kind: action
  description: Assigns one or all inputs to an NOM bus (1-8) or unassigns (8)
  params:
    - name: input
      type: integer
      min: 0
      max: 16
      description: "Input number (0-15 = inputs 1-16, 16 = all inputs)"
    - name: nom_values
      type: string
      description: "Single NOM value (0-7 for buses 1-8, 8 = none) if one input; or 16 comma-separated values if input=16"

- id: set_output_gain
  label: Set Output Gain
  kind: action
  description: Sets output gain for one or more of the 12 outputs using a 12-bit channel mask
  params:
    - name: channel_mask
      type: integer
      description: "12-bit mask where bit 0 = output 1 through bit 11 = output 12 (encoded as 4 LecNet bytes)"
    - name: gain
      type: integer
      min: 0
      max: 83
      description: "0-78 = +10dB to -68dB, 79 = off, 80 = increment 1dB, 81 = decrement 1dB, 82 = mute, 83 = unmute to pre-mute gain"

- id: set_crosspoint_gain
  label: Set Crosspoint Gain
  kind: action
  description: Sets the gain at a single matrix crosspoint (input→output)
  params:
    - name: input
      type: integer
      min: 0
      max: 17
      description: "Input (0-15 = inputs 1-16, 16 = expansion in, 17 = internal noise source)"
    - name: output
      type: integer
      min: 0
      max: 11
      description: "Output (0-11 = outputs 1-12)"
    - name: gain
      type: integer
      min: 0
      max: 6
      description: "0=off, 1=-15dB, 2=-10dB, 3=-5dB, 4=0dB, 5=+3dB, 6=+6dB"

- id: set_multiple_crosspoint_gains
  label: Set Multiple Input Crosspoint Gains to One Output
  kind: action
  description: Sets crosspoint gains from any combination of 16 inputs to a single output
  params:
    - name: input_mask
      type: integer
      description: "16-bit mask of inputs (bit 0 = input 1 through bit 15 = input 16)"
    - name: output
      type: integer
      min: 0
      max: 11
      description: "Target output (0-11 = outputs 1-12)"
    - name: gain
      type: integer
      min: 0
      max: 6
      description: "0=off, 1=-15dB, 2=-10dB, 3=-5dB, 4=0dB, 5=+3dB, 6=+6dB"

- id: simulate_programmable_input
  label: Simulate Programmable Input Button Push
  kind: action
  description: Triggers a programmable input function as if a contact closure occurred
  params:
    - name: input
      type: integer
      min: 1
      max: 17
      description: "Programmable input number (1-17)"
```

## Feedbacks
```yaml
- id: device_name
  label: Device Name String
  type: string
  description: "Returns the device name string (e.g. 'AM1612')"
  command_byte: 0x01
  response: "7 bytes - byte 1 = string length, bytes 2-7 = ASCII name characters"

- id: firmware_version
  label: Firmware Version
  type: integer
  description: "Firmware version as integer (e.g. 10 = version 1.0)"
  command_byte: 0x19
  response: "1 byte"

- id: current_memory_preset
  label: Current Memory Preset
  type: integer
  min: 0
  max: 14
  description: "Active memory preset (0-14 = presets 1-15)"
  command_byte: 0x15
  response: "1 byte"

- id: input_gain
  label: Input Gain
  type: integer
  description: "Gain for one or all inputs. 0-78 = +15dB to -63dB, 79 = off. Values >127 indicate mute (subtract 128 for unmuted gain)."
  command_byte: 0x1F
  params:
    - name: input
      type: integer
      min: 0
      max: 16
      description: "0-15 = single input (1-16), 16 = all 16 inputs"
  response: "1 byte (single) or 16 bytes (all)"

- id: nom_bus_association
  label: NOM Bus Association
  type: integer
  description: "NOM bus assignment for one or all inputs (0-7 = buses 1-8, 8 = none)"
  command_byte: 0x2F
  params:
    - name: input
      type: integer
      min: 0
      max: 16
      description: "0-15 = single input, 16 = all inputs"
  response: "1 byte (single) or 16 bytes (all)"

- id: input_activity_status
  label: Input Activity Status
  type: integer
  description: "Activity state of all 16 inputs as a 2-byte bitmask (bit=1 = active, meaning automix attenuation ≤6dB)"
  command_byte: 0x14
  response: "2 bytes - byte 1 = inputs 1-8, byte 2 = inputs 9-16"

- id: output_gain
  label: Output Gain
  type: integer
  description: "Gain for one or all outputs. 0-78 = +10dB to -68dB, 79 = off. Values >127 indicate mute (subtract 128 for unmuted gain)."
  command_byte: 0x3D
  params:
    - name: output
      type: integer
      min: 0
      max: 12
      description: "0-11 = single output (1-12), 12 = all 12 outputs"
  response: "1 byte (single) or 12 bytes (all)"

- id: crosspoint_gain
  label: Crosspoint Gain
  type: integer
  min: 0
  max: 6
  description: "Gain at a specific matrix crosspoint. 0=off, 1=-15dB, 2=-10dB, 3=-5dB, 4=0dB, 5=+3dB, 6=+6dB"
  command_byte: 0x51
  params:
    - name: input
      type: integer
      min: 0
      max: 17
      description: "0-15 = inputs 1-16, 16 = expansion in, 17 = noise source"
    - name: output
      type: integer
      min: 0
      max: 11
      description: "0-11 = outputs 1-12"
  response: "1 byte"

- id: programmable_output_state
  label: Programmable Output State
  type: enum
  values: [inactive, active]
  description: "Current state of a programmable output (1=inactive, 2=active)"
  command_byte: 0x6A
  params:
    - name: output
      type: integer
      min: 1
      max: 19
      description: "Programmable output number (1-19)"
  response: "1 byte (1 or 2)"
```

## Variables
```yaml
- id: device_address
  label: Device Address
  type: integer
  min: 128
  max: 254
  description: "LecNet device address (factory default 139 / 0x8B). Persisted in nonvolatile memory."

- id: input_gain_level
  label: Input Gain Level
  type: integer
  description: "Per-input gain. 0-78 = +15dB to -63dB. 79 = off. Mute state indicated by value +128."

- id: output_gain_level
  label: Output Gain Level
  type: integer
  description: "Per-output gain. 0-78 = +10dB to -68dB. 79 = off. Mute state indicated by value +128."

- id: crosspoint_gain_level
  label: Crosspoint Gain Level
  type: enum
  values: [off, "-15dB", "-10dB", "-5dB", "0dB", "+3dB", "+6dB"]
  description: "Per-crosspoint gain setting (7 discrete steps)"
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly described in source
# Note: programmable input simulation (cmd 0x5C) can trigger complex pre-programmed actions,
# but the macro logic is configured via the AM16/12 control panel, not defined in the serial protocol
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe power sequencing, interlock, or safety procedures
```

## Notes

- **Binary protocol**: All commands and data are exchanged in hex bytes, not ASCII. The only exception is the device name string returned by Get Name String (cmd 0x01).
- **LecNet multi-device bus**: Multiple LecNet devices share one RS-232 serial port. Each device is addressed by a unique byte (128–254). Only the addressed device activates its transmitter.
- **16-bit mask encoding**: Input/output masks are split across 4 bytes using LecNet encoding: bytes 1 and 3 carry 7 bits each (low 7 bits), bytes 2 and 4 carry 1 bit each (LSB). This accommodates the constraint that host-to-device data bytes must not exceed 127.
- **Gain value encoding**: Input gain 0–78 maps linearly to +15dB to −63dB. Output gain 0–78 maps linearly to +10dB to −68dB. Mute is indicated by adding 128 to the gain value.
- **Firmware-dependent behavior**: Crosspoint gain settings for expansion/noise inputs differ between firmware v1.x and v2.0+ (fewer gain steps available).
- **Timing**: A minimum 25ms wait is required after sending the device address if the host does not read the acknowledgment byte.
- **Document discrepancy**: Set NOM Bus Association lists command byte as "46 (1E hex)" — 0x1E equals 30 decimal, not 46. Following the LecNet pattern (Get cmd = Set cmd + 1), the Set NOM Bus command should be 0x2E (46 decimal). The source likely contains a typo.

<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: maximum number of daisy-chained LecNet devices not stated -->
<!-- UNRESOLVED: command response timing constraints beyond the 25ms minimum -->
<!-- UNRESOLVED: programmable input/output configuration commands (only query and simulate are documented) -->
<!-- UNRESOLVED: expansion port control details beyond crosspoint routing -->

## Provenance

```yaml
source_domains:
  - lectrosonics.com
source_urls:
  - https://lectrosonics.com/wp-content/uploads/filr/7409/am1612man.pdf
retrieved_at: 2026-04-30T04:33:13.083Z
last_checked_at: 2026-06-02T22:08:43.899Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:08:43.899Z
matched_actions: 8
action_count: 8
confidence: medium
summary: "All 8 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document title references \"Microphone / Wireless\" but content describes AM16/12 matrix mixer — entity may be mismatched"
- "flow control not explicitly stated; wiring diagram shows RTS/CTS pins but usage not described"
- "no unsolicited event/notification mechanism described in source"
- "no multi-step macro sequences explicitly described in source"
- "source does not describe power sequencing, interlock, or safety procedures"
- "firmware version compatibility range not stated"
- "maximum number of daisy-chained LecNet devices not stated"
- "command response timing constraints beyond the 25ms minimum"
- "programmable input/output configuration commands (only query and simulate are documented)"
- "expansion port control details beyond crosspoint routing"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
