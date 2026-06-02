---
spec_id: admin/lectrosonics-av62
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
source_urls:
  - https://www.lectrosonics.com/wp-content/uploads/filr/7421/av62man.pdf
retrieved_at: 2026-04-29T16:53:22.425Z
last_checked_at: 2026-06-02T02:29:35.936Z
generated_at: 2026-06-02T02:29:35.936Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no power on/off, firmware compatibility range, or safety interlock info in source"
  - "source documents no unsolicited notifications from the device."
  - "source documents no multi-step macro sequences."
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility range, voltage/current specs, and any safety interlocks not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T02:29:35.936Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec command bytes verified against source; transport parameters match; complete bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Lectrosonics AV62 Control Spec

## Summary
AV62 audio visual mixer, controlled over RS-232 (9600 8N1) via Lectrosonics LecNet protocol. Each command must be preceded by device address byte (128-254), followed by ack "0" from device, then command byte and data bytes. Spec covers addressing, memory recall, line/mic input gain, tone controls, program/mono output gain, balance, and output mix status.

<!-- UNRESOLVED: no power on/off, firmware compatibility range, or safety interlock info in source -->

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
- levelable    # inferred from gain/volume/balance/tone commands
- queryable    # inferred from "Get ..." query commands
- routable     # inferred from output mix commands (per-output source routing)
```

## Actions
```yaml
# LecNet protocol framing (applies to all commands):
#   1) Host sends 1-byte device address (128-254; 0x80-0xFE)
#   2) Host receives 1-byte "0" acknowledgement
#   3) Host sends 1-byte command code (decimal)
#   4) Host sends/receives data bytes per command
# Below: each action's `command` field is the LecNet command byte (decimal).
# Implementer must prepend address+ack framing per protocol.

- id: acknowledge
  label: Acknowledge
  kind: query
  command: "1"
  params: []
  notes: |
    Response: 1 length byte (=4 for AV62) then 4 ASCII bytes "AV62" (65,86,54,50).

- id: change_device_address
  label: Change Device Address
  kind: action
  command: "2"
  params:
    - name: new_address
      type: integer
      range: 128-254
      description: New device address; stored in EEPROM.

- id: get_current_audio_levels
  label: Get Current Audio Levels
  kind: query
  command: "4"
  params:
    - name: mode
      type: integer
      range: 0-1
      description: 0 = current levels, 1 = peak levels since last check.
  notes: |
    Response: 3 bytes. Byte 1 = Left (0-255), Byte 2 = Right (0-255), Byte 3 = Mono (0-255).
    0 = -65dBu, 255 = +20dBu, 0.333 dB/bit.

- id: get_current_memory
  label: Get Current Memory
  kind: query
  command: "10"
  params: []
  notes: |
    Response: 1 byte, current memory 0-6 (0 = Local mode, 1-6 = stored memory).

- id: set_current_memory
  label: Set Current Memory
  kind: action
  command: "11"
  params:
    - name: memory
      type: integer
      range: 0-6
      description: New memory selection. 0 = Local, 1-6 = stored memory.
    - name: save_to_nvram
      type: integer
      range: 0-1
      description: 0 = do not save to non-volatile memory, 1 = save to non-volatile memory.
  notes: |
    Response: 1 byte = 100 to signify NV storage completion (sent regardless of save_to_nvram value).
    Remote control requires memory 1-6; Local mode (0) follows front/rear panel.

- id: get_stored_memory_contents
  label: Get Stored Memory Contents
  kind: query
  command: "12"
  params:
    - name: memory
      type: integer
      range: 1-6
      description: Stored memory to read.
  notes: |
    Response: 19 bytes. See Feedbacks section for byte layout.

- id: get_local_mixer_status
  label: Get Local Mode Line Input Mixer Status
  kind: query
  command: "20"
  params: []
  notes: |
    Response: 1 byte. 0 = Single mode (one active program input), 1 = Multiple mode (true mixer).

- id: set_local_mixer_status
  label: Set Local Mode Line Input Mixer Status
  kind: action
  command: "21"
  params:
    - name: mode
      type: integer
      range: 0-1
      description: 0 = Single, 1 = Multiple. Stored in non-volatile memory.
  notes: |
    Response: 1 byte = 100 to signify NV storage completion.

- id: get_current_line_input_level
  label: Get Current Line Input Levels
  kind: query
  command: "22"
  params:
    - name: input
      type: integer
      range: 0-5
      description: Input 0-5 corresponds to inputs 1-6.
  notes: |
    Response: 1 byte, gain 0-31 (0 = max gain, 30 = min gain, 31 = input off).

- id: set_current_line_input_level
  label: Set Current Line Input Levels
  kind: action
  command: "23"
  params:
    - name: input
      type: integer
      range: 0-5
      description: Input 0-5 corresponds to inputs 1-6.
    - name: gain
      type: integer
      range: 0-31
      description: 0 = max gain, 30 = min gain, 31 = input off.

- id: get_current_mic_input_level
  label: Get Current Mic Input Levels
  kind: query
  command: "24"
  params:
    - name: input
      type: integer
      range: 0-1
      description: 0 = mic 1, 1 = mic 2.
  notes: |
    Response: 1 byte, gain 0-63 (0 = max gain, 62 = min gain, 63 = mic input off).

- id: output_firmware_version
  label: Output Firmware Version
  kind: query
  command: "25"
  params: []
  notes: |
    Response: 1 byte, firmware version (e.g. version 1.0 returned as decimal 10).

- id: set_current_mic_input_level
  label: Set Current Mic Input Levels
  kind: action
  command: "26"
  params:
    - name: input
      type: integer
      range: 0-1
      description: 0 = mic 1, 1 = mic 2.
    - name: gain
      type: integer
      range: 0-63
      description: 0 = max gain, 62 = min gain, 63 = mic input off.

- id: get_current_tone_control_level
  label: Get Current Tone Control Levels
  kind: query
  command: "27"
  params:
    - name: control
      type: integer
      range: 0-3
      description: 0 = Mic bass, 1 = Line bass, 2 = Mic treble, 3 = Line treble.
  notes: |
    Response: 1 byte, tone level 0-8 (0 = +10dB, 4 = flat, 8 = -10dB, 2.5dB/step).

- id: set_current_tone_control_level
  label: Set Current Tone Control Levels
  kind: action
  command: "28"
  params:
    - name: control
      type: integer
      range: 0-3
      description: 0 = Mic bass, 1 = Line bass, 2 = Mic treble, 3 = Line treble.
    - name: level
      type: integer
      range: 0-8
      description: 0 = +10dB, 4 = flat, 8 = -10dB, 2.5dB/step.

- id: get_current_program_gain_level
  label: Get Current Program Gain Level
  kind: query
  command: "32"
  params: []
  notes: |
    Response: 1 byte, program output gain 0-255 (0 = max, 255 = min, 0.333 dB/bit).

- id: set_current_program_gain_level
  label: Set Current Program Gain Level
  kind: action
  command: "33"
  params:
    - name: gain_lsb
      type: integer
      range: 0-127
      description: Program output gain, least significant 7 bits.
    - name: gain_msb
      type: integer
      range: 0-1
      description: Program output gain, most significant bit (MSB of 8-bit gain value).

- id: get_current_program_balance_level
  label: Get Current Program Balance Level
  kind: query
  command: "34"
  params: []
  notes: |
    Response: 1 byte, balance 0-31 (0 = full right, 14/15 = center, 31 = full left).

- id: set_current_program_balance_level
  label: Set Current Program Balance Level
  kind: action
  command: "35"
  params:
    - name: balance
      type: integer
      range: 0-31
      description: 0 = full right, 14/15 = center, 31 = full left.

- id: get_current_mono_gain_level
  label: Get Current Mono Gain Level
  kind: query
  command: "36"
  params: []
  notes: |
    Response: 1 byte, mono output gain 0-255 (0 = max, 255 = min, 0.333 dB/bit).

- id: set_current_mono_gain_level
  label: Set Current Mono Gain Level
  kind: action
  command: "37"
  params:
    - name: gain_lsb
      type: integer
      range: 0-127
      description: Mono output gain, least significant 7 bits.
    - name: gain_msb
      type: integer
      range: 0-1
      description: Mono output gain, most significant bit.

- id: get_output_mix_status
  label: Get Output Mix Status
  kind: query
  command: "50"
  params:
    - name: output
      type: integer
      range: 0-3
      description: 0 = Left, 1 = Right, 2 = Mono, 3 = Expansion Out.
  notes: |
    Response: 1 byte mix status. See Feedbacks section for bit layout per output.

- id: set_output_mix_status
  label: Set Output Mix Status
  kind: action
  command: "51"
  params:
    - name: output
      type: integer
      range: 0-3
      description: 0 = Left, 1 = Right, 2 = Mono, 3 = Expansion Out.
    - name: mix_status
      type: integer
      description: Bitmask; see Feedbacks section for layout per output.
```

## Feedbacks
```yaml
- id: device_name
  type: string
  values: ["AV62"]
  source: acknowledge command (cmd 1); length byte = 4

- id: audio_levels
  type: object
  description: |
    Returned by get_current_audio_levels (cmd 4). 3 bytes: Left, Right, Mono.
  fields:
    - name: left
      type: integer
      range: 0-255
    - name: right
      type: integer
      range: 0-255
    - name: mono
      type: integer
      range: 0-255
  scaling: 0=-65dBu, 255=+20dBu, 0.333dB/bit

- id: current_memory
  type: integer
  range: 0-6
  description: 0 = Local mode, 1-6 = stored memory

- id: stored_memory_contents
  type: object
  description: |
    Returned by get_stored_memory_contents (cmd 12). 19 bytes.
  fields:
    - name: program_input_gain_1_6
      type: array
      length: 6
      element_type: integer
      element_range: 0-31
      description: 0 = max gain, 30 = min gain, 31 = input off.
    - name: mic_input_gain_1_2
      type: array
      length: 2
      element_type: integer
      element_range: 0-63
      description: 0 = max gain, 62 = min gain, 63 = mic input off.
    - name: program_bass
      type: integer
      range: 0-8
      description: 0 = +10dB, 4 = flat, 8 = -10dB, 2.5dB/step
    - name: program_treble
      type: integer
      range: 0-8
      description: 0 = +10dB, 4 = flat, 8 = -10dB, 2.5dB/step
    - name: mic_bass
      type: integer
      range: 0-8
      description: 0 = +10dB, 4 = flat, 8 = -10dB, 2.5dB/step
    - name: mic_treble
      type: integer
      range: 0-8
      description: 0 = +10dB, 4 = flat, 8 = -10dB, 2.5dB/step
    - name: program_output_gain
      type: integer
      range: 0-255
      description: 0 = max gain, 255 = min gain, 0.333dB/bit
    - name: program_output_balance
      type: integer
      range: 0-31
      description: 0 = full right, 14/15 = center, 31 = full left
    - name: mono_output_gain
      type: integer
      range: 0-255
      description: 0 = max gain, 255 = min gain, 0.333dB/bit
    - name: left_program_mix
      type: bitmask
      bits:
        - bit: 0
          meaning: includes left program inputs
        - bit: 1
          meaning: includes microphone inputs
        - bit: 3
          meaning: includes Expansion input
    - name: right_program_mix
      type: bitmask
      bits:
        - bit: 0
          meaning: includes right program inputs
        - bit: 1
          meaning: includes microphone inputs
        - bit: 3
          meaning: includes Expansion input
    - name: mono_program_mix
      type: bitmask
      bits:
        - bit: 0
          meaning: includes microphone inputs
        - bit: 1
          meaning: includes left program inputs
        - bit: 3
          meaning: includes right program inputs
        - bit: 5
          meaning: includes Expansion input
    - name: expansion_out_mix
      type: bitmask
      bits:
        - bit: 0
          meaning: includes microphone inputs
        - bit: 1
          meaning: includes left and right program inputs

- id: local_mixer_mode
  type: enum
  values: [single, multiple]
  description: |
    0 = Single mode (one program input active at a time),
    1 = Multiple mode (any number of inputs active).

- id: line_input_gain
  type: integer
  range: 0-31
  description: 0 = max gain, 30 = min gain, 31 = input off

- id: mic_input_gain
  type: integer
  range: 0-63
  description: 0 = max gain, 62 = min gain, 63 = mic input off

- id: firmware_version
  type: integer
  description: Decimal, e.g. version 1.0 returned as 10

- id: tone_control_level
  type: integer
  range: 0-8
  description: 0 = +10dB, 4 = flat, 8 = -10dB, 2.5dB/step

- id: program_output_gain
  type: integer
  range: 0-255
  description: 0 = max, 255 = min, 0.333 dB/bit

- id: program_balance
  type: integer
  range: 0-31
  description: 0 = full right, 14/15 = center, 31 = full left

- id: mono_output_gain
  type: integer
  range: 0-255
  description: 0 = max, 255 = min, 0.333 dB/bit

- id: output_mix_status_left
  type: bitmask
  bits:
    - bit: 0
      meaning: includes left program inputs
    - bit: 2
      meaning: includes Mono
    - bit: 3
      meaning: includes Expansion input

- id: output_mix_status_right
  type: bitmask
  bits:
    - bit: 0
      meaning: includes right program inputs
    - bit: 2
      meaning: includes Mono
    - bit: 3
      meaning: includes Expansion input

- id: output_mix_status_mono
  type: bitmask
  bits:
    - bit: 0
      meaning: includes Mono (mic inputs)
    - bit: 1
      meaning: includes left program inputs
    - bit: 3
      meaning: includes right program inputs
    - bit: 5
      meaning: includes Expansion input

- id: output_mix_status_expansion_out
  type: bitmask
  bits:
    - bit: 0
      meaning: includes Mono (mic inputs)
    - bit: 1
      meaning: includes left and right program inputs
```

## Variables
```yaml
# No distinct settable parameters beyond the discrete actions above.
# All settable values are addressed through specific action commands.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications from the device.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- LecNet addressing: 1 byte device address (128-254; 0x80-0xFE). 0xFF is invalid. Any byte >127 sent by host is interpreted as an address, so single-byte data must be 0-127. Values >127 must be sent as 2 bytes (lower 7 bits, then 1 if MSB=1 else 0).
- Each AV62 interchange pattern: address → ack "0" → command → data. Host must wait for "0" ack before sending command. Failing to follow this sequence causes AV62 to reset.
- For remote control, AV62 must be in stored memory 1-6 (not Local mode 0). Set via cmd 11.
- Remote Control Connector (9-pin D-sub, Local/Memory Recall pinout): pin 1-6 = Line inputs 1-6 / Memory 1-6; pin 7 = Program volume; pin 8 = Mono volume; pin 9 = Ground.
- Expansion In/Out supports daisy-chaining of AM8, TH2, TA1 devices.
<!-- UNRESOLVED: firmware version compatibility range, voltage/current specs, and any safety interlocks not stated in source. -->

## Provenance

```yaml
source_domains:
  - lectrosonics.com
source_urls:
  - https://www.lectrosonics.com/wp-content/uploads/filr/7421/av62man.pdf
retrieved_at: 2026-04-29T16:53:22.425Z
last_checked_at: 2026-06-02T02:29:35.936Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T02:29:35.936Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec command bytes verified against source; transport parameters match; complete bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no power on/off, firmware compatibility range, or safety interlock info in source"
- "source documents no unsolicited notifications from the device."
- "source documents no multi-step macro sequences."
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility range, voltage/current specs, and any safety interlocks not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
