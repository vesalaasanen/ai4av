---
spec_id: admin/kramer-vp-437xl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kramer Electronics VP-437xl Control Spec"
manufacturer: Kramer
model_family: VP-437xl
aliases: []
compatible_with:
  manufacturers:
    - Kramer
    - "Kramer Electronics"
  models:
    - VP-437xl
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/manuals/protocol_2000_rev0_51.pdf
  - https://cdn.kramerav.com/web/downloads/manuals/site-ctrl_user_guide.pdf
  - https://cdn.kramerav.com/web/downloads/manuals/rs232nul.pdf
retrieved_at: 2026-05-21T03:34:15.568Z
last_checked_at: 2026-05-26T20:04:54.588Z
generated_at: 2026-05-26T20:04:54.588Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-26T20:04:54.588Z
  matched_actions: 42
  action_count: 42
  confidence: high
  summary: "All 42 spec actions matched instruction numbers 0-63 in source table; transport parameters verbatim; 100% coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Kramer Electronics VP-437xl Control Spec

## Summary
Kramer Protocol 2000 matrix switcher. RS-232C 4-byte binary command set with machine-number addressing. Default serial config: 9600 baud, 8 data bits, no parity, 1 stop bit. Supports video/audio switching, breakaway routing, parameter adjustment, setup store/recall, and machine identification.

<!-- UNRESOLVED: number of inputs/outputs for VP-437xl specific model not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # stated in source
  data_bits: 8    # stated in source
  parity: none    # stated in source
  stop_bits: 1    # stated in source
  flow_control: null  # UNRESOLVED: flow control not discussed in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Evidence from source:
# - powerable: reset command (instruction 0, 18) present
# - routable: switch video (1), switch audio (2), breakaway (8) present
# - queryable: request status (5,6), request VIS (10), request breakaway (11), request video/audio type (12), request audio param (25), request video param (26) present
# - levelable: increase/decrease video (23) and audio (24) parameters present
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
# Protocol 2000 instruction set. Each action keyed by instruction number.
# Binary format: 4 bytes [DEST+INST | INPUT | OUTPUT | MACHINE#]
# D=0 for PC→device, D=1 for device→PC reply
actions:
  - id: reset_video
    label: Reset Video
    kind: action
    params: []
    instruction: 0

  - id: switch_video
    label: Switch Video
    kind: action
    params:
      - name: input
        type: integer
        description: Video input number (0=disconnect)
      - name: output
        type: integer
        description: Video output number (0=to all outputs)
    instruction: 1

  - id: switch_audio
    label: Switch Audio
    kind: action
    params:
      - name: input
        type: integer
        description: Audio input number (0=disconnect)
      - name: output
        type: integer
        description: Audio output number (0=to all outputs)
    instruction: 2

  - id: store_video_status
    label: Store Video Status
    kind: action
    params:
      - name: setup
        type: integer
        description: SETUP number
      - name: operation
        type: integer
        description: "0=store, 1=delete"
    instruction: 3

  - id: recall_video_status
    label: Recall Video Status
    kind: action
    params:
      - name: setup
        type: integer
        description: SETUP number
    instruction: 4

  - id: request_video_output_status
    label: Request Status of Video Output
    kind: query
    params:
      - name: setup
        type: integer
        description: SETUP number
      - name: output
        type: integer
        description: Output number whose status is requested
    instruction: 5

  - id: request_audio_output_status
    label: Request Status of Audio Output
    kind: query
    params:
      - name: setup
        type: integer
        description: SETUP number
      - name: output
        type: integer
        description: Output number whose status is requested
    instruction: 6

  - id: vis_source
    label: VIS Source
    kind: action
    params:
      - name: input
        type: integer
        description: Input number, blank period (25ms steps), or sync type code
      - name: output
        type: integer
        description: Output byte meaning (6=input#, 7=output#, 32=blank period, 64=delayed switch, etc.)
    instruction: 7

  - id: breakaway_setting
    label: Breakaway Setting
    kind: action
    params:
      - name: mode
        type: integer
        description: "0=audio-follow-video, 1=audio breakaway-Video, 2=audio breakaway-Audio, 3=audio breakaway-Data"
    instruction: 8

  - id: video_audio_type_setting
    label: Video/Audio Type Setting
    kind: action
    params:
      - name: type
        type: integer
        description: "0=video, 1=audio, 2=VGA/DVI"
      - name: format
        type: integer
        description: Video format code or audio format bits
    instruction: 9

  - id: request_vis_setting
    label: Request VIS Setting
    kind: query
    params:
      - name: setup
        type: integer
        description: SETUP number, or 126/127 to probe capability
      - name: request
        type: integer
        description: "0=VIS source, 1=input/output#, 2=vertical sync freq"
    instruction: 10

  - id: request_breakaway_setting
    label: Request Breakaway Setting
    kind: query
    params:
      - name: setup
        type: integer
        description: SETUP number, or 126/127 to probe capability
      - name: request
        type: integer
        description: "0=request audio breakaway, 1=request FOLLOW setting"
    instruction: 11

  - id: request_video_audio_type_setting
    label: Request Video/Audio Type Setting
    kind: query
    params:
      - name: setup
        type: integer
        description: SETUP number, or 126/127 to probe capability
      - name: type
        type: integer
        description: "0=video, 1=audio, 2=VGA"
    instruction: 12

  - id: set_highest_machine_address
    label: Set Highest Machine Address
    kind: action
    params:
      - name: domain
        type: integer
        description: "0=video, 1=audio"
      - name: address
        type: integer
        description: Highest machine address value
    instruction: 13

  - id: request_highest_machine_address
    label: Request Highest Machine Address
    kind: query
    params:
      - name: domain
        type: integer
        description: "0=video, 1=audio"
    instruction: 14

  - id: request_whether_setup_defined
    label: Request Whether Setup Defined / Valid Input Detected
    kind: query
    params:
      - name: setup_or_input
        type: integer
        description: SETUP number or input number
      - name: request
        type: integer
        description: "0=check if setup defined, 1=check if input valid"
    instruction: 15

  - id: error_busy
    label: Error/Busy Response
    kind: feedback
    params:
      - name: error_code
        type: integer
        description: "0=error, 1=invalid instruction, 2=out of range, 3=machine busy, 4=invalid input, 5=valid input, 6=RX overflow"
    instruction: 16

  - id: reset_audio
    label: Reset Audio
    kind: action
    params: []
    instruction: 18

  - id: store_audio_status
    label: Store Audio Status
    kind: action
    params:
      - name: setup
        type: integer
        description: SETUP number
      - name: operation
        type: integer
        description: "0=store, 1=delete"
    instruction: 19

  - id: recall_audio_status
    label: Recall Audio Status
    kind: action
    params:
      - name: setup
        type: integer
        description: SETUP number
    instruction: 20

  - id: set_video_parameter
    label: Set Video Parameter
    kind: action
    params:
      - name: input_output
        type: integer
        description: Input/output number (0=all)
      - name: value
        type: integer
        description: Parameter value
    instruction: 21

  - id: set_audio_parameter
    label: Set Audio Parameter
    kind: action
    params:
      - name: input_output
        type: integer
        description: Input/output number (0=all)
      - name: value
        type: integer
        description: Parameter value
    instruction: 22

  - id: increase_decrease_video_parameter
    label: Increase/Decrease Video Parameter
    kind: action
    params:
      - name: input_output
        type: integer
        description: Input/output number (0=all)
      - name: parameter
        type: integer
        description: "0=increase gain, 1=decrease gain, 2=contrast+, 3=contrast-, 4=brightness+, 5=brightness-, 6=colour+, 7=colour-, 8=hue+, 9=hue-, 16=H-phase+, 17=H-phase-, 18=V-pos+, 19=V-pos-"
    instruction: 23

  - id: increase_decrease_audio_parameter
    label: Increase/Decrease Audio Parameter
    kind: action
    params:
      - name: input_output
        type: integer
        description: Input/output number (0=all)
      - name: parameter
        type: integer
        description: "0=increase out, 1=decrease out, 2=left+, 3=left-, 4=right+, 5=right-, 6=input+, 7=input-, 8=left in+, 9=left in-, 10=right in+, 11=right in-"
    instruction: 24

  - id: request_audio_parameter
    label: Request Audio Parameter
    kind: query
    params:
      - name: input_output
        type: integer
        description: Input/output number
    instruction: 25

  - id: request_video_parameter
    label: Request Video Parameter
    kind: query
    params:
      - name: input_output
        type: integer
        description: Input/output number
    instruction: 26

  - id: lock_front_panel
    label: Lock Front Panel
    kind: action
    params:
      - name: lock
        type: integer
        description: "0=unlocked, 1=locked"
    instruction: 30

  - id: request_whether_panel_locked
    label: Request Whether Panel Locked
    kind: query
    params: []
    instruction: 31

  - id: direct_memory_save
    label: Direct Memory Save
    kind: action
    params:
      - name: address
        type: integer
        description: EEPROM memory address
      - name: data
        type: integer
        description: Data value
    instruction: 40

  - id: audio_parameter_settings
    label: Audio Parameter Settings (for Instructions 22, 24, 25)
    kind: action
    params:
      - name: input_output_flag
        type: integer
        description: "I0: 0=input, 1=output"
      - name: channel
        type: integer
        description: "I1=Left, I2=Right"
      - name: parameter
        type: integer
        description: "0=Gain, 1=Bass, 2=Treble, 3=Midrange, 4=Mix On"
    instruction: 42

  - id: video_parameter_settings
    label: Video Parameter Settings (for Instructions 21, 23, 26)
    kind: action
    params:
      - name: input_output
        type: integer
        description: "1=input, 2=output"
      - name: parameter
        type: integer
        description: "0=video gain, 1=contrast, 2=brightness, 3=colour, 4=hue, 5=H-phase, 6=V-position"
    instruction: 43

  - id: switch_control_data
    label: Switch Control Data
    kind: action
    params:
      - name: input
        type: integer
        description: Control data input (0=disconnect)
      - name: output
        type: integer
        description: Control data output (0=to all outputs)
    instruction: 44

  - id: request_status_of_control_data_output
    label: Request Status of Control Data Output
    kind: query
    params:
      - name: setup
        type: integer
        description: SETUP number
      - name: output
        type: integer
        description: Output number whose status is requested
    instruction: 45

  - id: reply_on
    label: Reply On/Off
    kind: action
    params:
      - name: on_off
        type: integer
        description: "0=Off, 1=On"
    instruction: 55

  - id: change_to_ascii
    label: Change to ASCII Protocol
    kind: action
    params:
      - name: protocol
        type: integer
        description: "1=SVS, 2=Generic, 3=Protocol-3000"
    instruction: 56

  - id: set_auto_save
    label: Set Auto-Save
    kind: action
    params:
      - name: auto_save
        type: integer
        description: "I3: no save, I4: auto-save"
    instruction: 57

  - id: execute_loaded_data
    label: Execute Loaded Data
    kind: action
    params:
      - name: take_cancel
        type: integer
        description: "1=Take, 2=Cancel"
    instruction: 58

  - id: load_video_data
    label: Load Video Data
    kind: action
    params:
      - name: input
        type: integer
        description: Video input (0=disconnect, 127=load SETUP#)
      - name: output
        type: integer
        description: Video output or SETUP#
    instruction: 59

  - id: load_audio_data
    label: Load Audio Data
    kind: action
    params:
      - name: input
        type: integer
        description: Audio input (0=disconnect, 127=load SETUP#)
      - name: output
        type: integer
        description: Audio output or SETUP#
    instruction: 60

  - id: identify_machine
    label: Identify Machine
    kind: query
    params:
      - name: request
        type: integer
        description: "1=video name, 2=audio name, 3=video sw ver, 4=audio sw ver, 5=RS422 name, 6=RS422 ver, 7=remote name, 8=remote sw ver, 9=Protocol 2000 rev, 10=control data name, 11=control data sw ver"
      - name: suffix_prefix
        type: integer
        description: "0=request first 4 digits, 1=first suffix, 2=second suffix, 3=third suffix, 10=first prefix, 11=second prefix, 12=third prefix"
    instruction: 61

  - id: define_machine
    label: Define Machine
    kind: query
    params:
      - name: property
        type: integer
        description: "1=num inputs, 2=num outputs, 3=num setups"
      - name: domain
        type: integer
        description: "1=video, 2=audio, 3=SDI, 4=remote panel, 5=RS-422, 6=control data"
    instruction: 62

  - id: extended_data
    label: Extended Data
    kind: action
    params:
      - name: input_data
        type: integer
        description: 7 MSBs for INPUT data
      - name: output_data
        type: integer
        description: 7 MSBs for OUTPUT data
    instruction: 63
```

## Feedbacks
```yaml
# Bi-directional: device echoes commands with D-bit set, or returns error codes.
# Instruction 16: error/busy
# Instruction 5,6: status responses
# Instruction 10,11,12: query responses
# Instruction 15: setup defined / input valid check
# Instruction 31: panel lock status
# Instruction 25,26: parameter values
# Instruction 45: control data output status
feedbacks:
  - id: error_response
    label: Error/Busy Response
    type: enum
    values:
      - 0  # error
      - 1  # invalid instruction
      - 2  # out of range
      - 3  # machine busy
      - 4  # invalid input
      - 5  # valid input
      - 6  # RX buffer overflow
    instruction: 16

  - id: video_output_status_response
    label: Video Output Status Response
    type: integer
    instruction: 5

  - id: audio_output_status_response
    label: Audio Output Status Response
    type: integer
    instruction: 6

  - id: vis_setting_response
    label: VIS Setting Response
    type: integer
    instruction: 10

  - id: breakaway_setting_response
    label: Breakaway Setting Response
    type: integer
    instruction: 11

  - id: video_audio_type_response
    label: Video/Audio Type Setting Response
    type: integer
    instruction: 12

  - id: setup_defined_response
    label: Setup Defined / Input Valid Response
    type: integer
    instruction: 15

  - id: panel_locked_response
    label: Panel Locked Response
    type: enum
    values:
      - 0  # unlocked
      - 1  # locked
    instruction: 31

  - id: audio_parameter_response
    label: Audio Parameter Response
    type: integer
    instruction: 25

  - id: video_parameter_response
    label: Video Parameter Response
    type: integer
    instruction: 26

  - id: control_data_output_status_response
    label: Control Data Output Status Response
    type: integer
    instruction: 45

  - id: identify_response
    label: Machine Identification Response
    type: string
    instruction: 61

  - id: machine_definition_response
    label: Machine Definition Response
    type: integer
    instruction: 62
```

## Variables
```yaml
# Parameters adjustable via instructions 21/22/23/24.
# Use instruction 42/43 to select parameter class before instruction 22/24/25/26.
# UNRESOLVED: full variable list requires machine-specific memory map
variables:
  - id: video_gain
    label: Video Gain
    type: integer
    instruction: 21
    param_instruction: 43

  - id: audio_gain
    label: Audio Gain
    type: integer
    instruction: 22
    param_instruction: 42

  - id: audio_bass
    label: Audio Bass
    type: integer
    instruction: 22
    param_instruction: 42

  - id: audio_treble
    label: Audio Treble
    type: integer
    instruction: 22
    param_instruction: 42

  - id: audio_midrange
    label: Audio Midrange
    type: integer
    instruction: 22
    param_instruction: 42

  - id: audio_mix
    label: Audio Mix On/Off
    type: boolean
    instruction: 22
    param_instruction: 42
```

## Events
```yaml
# Device sends real-time notifications when state changes.
# Instruction 16 sent on input validity change (Note 25).
# Bi-directional instructions sent on front-panel operations (Note 2).
events:
  - id: input_validity_change
    label: Input Validity Change
    type: object
    fields:
      input: integer
      valid: boolean
    instruction: 16

  - id: front_panel_switch
    label: Front Panel Switch Performed
    type: object
    fields:
      instruction: integer
      input: integer
      output: integer
    note: Device sends command echo when user operates front panel
```

## Macros
```yaml
# Multi-step sequences documented in source.
macros:
  - id: delayed_switch
    label: Delayed Switch Execution
    description: |
      1. Send instruction 7 with OUTPUT=64 (set for delayed switch)
      2. Send instruction 1 with target input/output (switch code)
      3. After required delay, send instruction 7 with OUTPUT=65 (execute delayed switch)
      Example hex: 07 80 C0 81 (set) → 01 84 83 81 (switch) → 07 80 C1 81 (execute)

  - id: set_audio_gain_right_input_9
    label: Set Audio Gain Right Input #9
    description: |
      1. Send instruction 42 with I0=0 (input), I1=1 (Right): 2A 84 80 81
      2. Send instruction 22 with input=9, value=681: 16 89 A9 81
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: machine_number_addressing
    description: |
      Machine numbers are set via front panel or dip switches.
      For single-machine control, set M4..M0=1 and ensure machine is configured as MACHINE NUMBER=1.
      When OVR bit is set (4th byte), all machines accept command but only addressed machine replies.
```

## Notes
- Protocol 2000 is bi-directional. Device echoes commands with DESTINATION bit set high on reply.
- Device supports ASCII protocol switching via instruction 56 (to SVS, Generic, or Protocol-3000).
- VIS (Vertical Interval Switching) allows clean RGBHV transitions with configurable blanking period (steps of 25ms, instruction 7 OUTPUT=32).
- Seamless switching option available for RGBHV sources via VIS blanking period control.
- Audio parameter instructions 22/24/25 use instruction 42 to select input/output and channel before the parameter instruction.
- Video parameter instructions 21/23/26 use instruction 43 to select input/output before the parameter instruction.
- SETUP # 0 = present setting; SETUP # 1+ = stored settings.
- Extended data (instruction 63) provides 7 MSBs for INPUT/OUTPUT when values exceed 7 bits.
- Instruction 55 controls REPLY mode — when OFF, unit sends no response to protocol commands.
- Control data direction (RS-232/RS-485/RS-422) set via bit 6 of OUTPUT byte in instruction 44/45.
<!-- UNRESOLVED: specific input/output counts for VP-437xl model not stated in source — derived from 16x16 example table only -->
<!-- UNRESOLVED: memory map and EEPROM structure not provided — instruction 40/21+ require machine-specific knowledge -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - cdn.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/manuals/protocol_2000_rev0_51.pdf
  - https://cdn.kramerav.com/web/downloads/manuals/site-ctrl_user_guide.pdf
  - https://cdn.kramerav.com/web/downloads/manuals/rs232nul.pdf
retrieved_at: 2026-05-21T03:34:15.568Z
last_checked_at: 2026-05-26T20:04:54.588Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-26T20:04:54.588Z
matched_actions: 42
action_count: 42
confidence: high
summary: "All 42 spec actions matched instruction numbers 0-63 in source table; transport parameters verbatim; 100% coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
