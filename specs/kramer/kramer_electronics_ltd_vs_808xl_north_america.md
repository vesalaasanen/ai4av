---
spec_id: admin/kramer-vs-808xl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kramer VS-808xl Control Spec"
manufacturer: Kramer
model_family: VS-808xl
aliases: []
compatible_with:
  manufacturers:
    - Kramer
  models:
    - VS-808xl
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - k.kramerav.com
source_urls:
  - https://k.kramerav.com/downloads/manuals/VS-808xl.pdf
retrieved_at: 2026-04-30T04:24:16.769Z
last_checked_at: 2026-04-23T08:05:22.574Z
generated_at: 2026-04-23T08:05:22.574Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T08:05:22.574Z
  matched_actions: 40
  action_count: 40
  confidence: high
  summary: "All 40 spec actions matched instruction codes in source; transport parameters verified; complete functional command coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Kramer VS-808xl Control Spec

## Summary
8x8 video/audio matrix switcher controllable via RS-232 or RS-485 using Kramer Protocol 2000 (version 0.48). Default serial settings: 9600 baud, 8 data bits, no parity, 1 stop bit. Supports switching, routing, status queries, panel lock, and cascading up to 8 units.

<!-- UNRESOLVED: no firmware version stated -->

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
- powerable  # inferred: power cycle triggers reset code (NOTE 1)
- routable   # inferred: switching instructions 1 and 2 present
- queryable  # inferred: status request instructions 5, 6, 10, 11, 12, 14 present
- levelable  # inferred: video/audio parameter adjustment instructions 21-26 present
```

## Actions
```yaml
- id: switch_video
  label: Switch Video
  kind: action
  params:
    - name: input
      type: integer
      description: Video input number (1-based, 0 = disconnect)
    - name: output
      type: integer
      description: Video output number (0 = all outputs)
    - name: machine
      type: integer
      description: Machine number (1-8, 0 = all via OVR bit)

- id: switch_audio
  label: Switch Audio
  kind: action
  params:
    - name: input
      type: integer
      description: Audio input number (1-based, 0 = disconnect)
    - name: output
      type: integer
      description: Audio output number (0 = all outputs)
    - name: machine
      type: integer
      description: Machine number (1-8, 0 = all via OVR bit)

- id: reset_video
  label: Reset Video
  kind: action
  params:
    - name: machine
      type: integer
      description: Machine number (set to 1 for single unit)

- id: reset_audio
  label: Reset Audio
  kind: action
  params:
    - name: machine
      type: integer
      description: Machine number (set to 1 for single unit)

- id: store_video_status
  label: Store Video Status
  kind: action
  params:
    - name: setup_number
      type: integer
      description: Setup number to store to
    - name: operation
      type: integer
      description: 0 = store, 1 = delete
    - name: machine
      type: integer
      description: Machine number

- id: recall_video_status
  label: Recall Video Status
  kind: action
  params:
    - name: setup_number
      type: integer
      description: Setup number to recall
    - name: machine
      type: integer
      description: Machine number

- id: store_audio_status
  label: Store Audio Status
  kind: action
  params:
    - name: setup_number
      type: integer
      description: Setup number to store to
    - name: operation
      type: integer
      description: 0 = store, 1 = delete
    - name: machine
      type: integer
      description: Machine number

- id: recall_audio_status
  label: Recall Audio Status
  kind: action
  params:
    - name: setup_number
      type: integer
      description: Setup number to recall
    - name: machine
      type: integer
      description: Machine number

- id: set_video_parameter
  label: Set Video Parameter
  kind: action
  params:
    - name: input_output
      type: integer
      description: Input or output number (0 = all)
    - name: parameter_value
      type: integer
      description: Parameter value to set
    - name: machine
      type: integer
      description: Machine number

- id: set_audio_parameter
  label: Set Audio Parameter
  kind: action
  params:
    - name: input_output
      type: integer
      description: Input or output number (0 = all)
    - name: parameter_value
      type: integer
      description: Parameter value to set
    - name: machine
      type: integer
      description: Machine number

- id: increase_decrease_video_parameter
  label: Increase/Decrease Video Parameter
  kind: action
  params:
    - name: input_output
      type: integer
      description: Input or output number (0 = all)
    - name: parameter
      type: integer
      description: 0=increase gain, 1=decrease gain, 2=increase contrast, 3=decrease contrast, 4=increase brightness, 5=decrease brightness, 6=increase colour, 7=decrease colour, 8=increase hue, 9=decrease hue, 16=increase H-phase, 17=decrease H-phase, 18=increase V-position, 19=decrease V-position
    - name: machine
      type: integer
      description: Machine number

- id: increase_decrease_audio_parameter
  label: Increase/Decrease Audio Parameter
  kind: action
  params:
    - name: input_output
      type: integer
      description: Input or output number (0 = all)
    - name: parameter
      type: integer
      description: 0=increase output, 1=decrease output, 2=increase left output, 3=decrease left output, 4=increase right output, 5=decrease right output, 6=increase input, 7=decrease input, 8=increase left input, 9=decrease left input, 10=increase right input, 11=decrease right input
    - name: machine
      type: integer
      description: Machine number

- id: lock_front_panel
  label: Lock Front Panel
  kind: action
  params:
    - name: lock_state
      type: integer
      description: 0 = panel unlocked, 1 = panel locked
    - name: machine
      type: integer
      description: Machine number

- id: identify_machine
  label: Identify Machine
  kind: action
  params:
    - name: identification_type
      type: integer
      description: 1=video machine name, 2=audio machine name, 3=video software version, 4=audio software version, 5=RS422 controller name, 6=RS422 controller version, 7=remote control name, 8=remote software version, 9=Protocol 2000 revision
    - name: suffix_prefix_request
      type: integer
      description: 0=request first 4 digits, 1=request first suffix, 2=request second suffix, 3=request third suffix, 10=request first prefix, 11=request second prefix, 12=request third prefix
    - name: machine
      type: integer
      description: Machine number

- id: vis_source
  label: VIS Source Selection
  kind: action
  params:
    - name: vis_setting
      type: integer
      description: 0=No VIS (immediate), 1=Input #1, 2=External digital sync, 3=External analog sync, 4=Dynamic sync, 5=Inter-machine sync, 6=Input #(INPUT byte), 7=Output #(INPUT byte), 8=User-defined sync, 32=RGBHV seamless switching, 64=Set for delayed switch, 65=Execute delayed switch, 66=Cancel delayed switch setting
    - name: input_or_blank
      type: integer
      description: Input number or blank period (steps of 25ms) depending on OUTPUT byte value
    - name: machine
      type: integer
      description: Machine number

- id: breakaway_setting
  label: Breakaway Setting
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=audio-follow-video, 1=audio breakaway (when OUTPUT=0); 0=FOLLOW mode, 1=Normal mode (when INPUT=1)
    - name: machine
      type: integer
      description: Machine number

- id: video_audio_type_setting
  label: Video/Audio Type Setting
  kind: action
  params:
    - name: type
      type: integer
      description: 0=video, 1=audio, 2=VGA and DVI
    - name: value
      type: integer
      description: For video: 0=CV, 1=YC, 2=YUV, 3=RGBS, 4=SDI, 5=CV+YC, 6=VGA scaler, 7=DVI. For audio: O0=0 unbalanced, O0=1 balanced; O1=0 digital, O1=1 analog; O4O3O2=000 mono, 001 stereo. For VGA/DVI: 1=640X480, 2=800X600, 3=1024X768
    - name: machine
      type: integer
      description: Machine number

- id: set_highest_machine_address
  label: Set Highest Machine Address
  kind: action
  params:
    - name: address_type
      type: integer
      description: 0=video, 1=audio
    - name: highest_address
      type: integer
      description: Highest machine address value
    - name: machine
      type: integer
      description: Machine number

- id: change_to_ascii
  label: Change to ASCII Protocol
  kind: action
  params:
    - name: protocol_type
      type: integer
      description: 1=SVS protocol, 2=Generic protocol
    - name: machine
      type: integer
      description: Machine number

- id: set_auto_save
  label: Set Auto-Save
  kind: action
  params:
    - name: save_mode
      type: integer
      description: I3=1 no save, I4=1 auto-save
    - name: machine
      type: integer
      description: Machine number

- id: execute_loaded_data
  label: Execute Loaded Data
  kind: action
  params:
    - name: setup_number_or_zero
      type: integer
      description: 0 or SETUP number
    - name: operation
      type: integer
      description: 1=Take, 2=Cancel
    - name: machine
      type: integer
      description: Machine number

- id: load_video_data
  label: Load Video Data
  kind: action
  params:
    - name: input
      type: integer
      description: Video input (0=disconnect, 127=load SETUP#)
    - name: output
      type: integer
      description: Video output (0=to all outputs) or SETUP#
    - name: machine
      type: integer
      description: Machine number

- id: load_audio_data
  label: Load Audio Data
  kind: action
  params:
    - name: input
      type: integer
      description: Audio input (0=disconnect, 127=load SETUP#)
    - name: output
      type: integer
      description: Audio output (0=to all outputs) or SETUP#
    - name: machine
      type: integer
      description: Machine number

- id: request_status_video_output
  label: Request Status of Video Output
  kind: action
  params:
    - name: setup_number
      type: integer
      description: Setup number
    - name: output_number
      type: integer
      description: Output number whose status is requested
    - name: machine
      type: integer
      description: Machine number

- id: request_status_audio_output
  label: Request Status of Audio Output
  kind: action
  params:
    - name: setup_number
      type: integer
      description: Setup number
    - name: output_number
      type: integer
      description: Output number whose status is requested
    - name: machine
      type: integer
      description: Machine number

- id: request_vis_setting
  label: Request VIS Setting
  kind: action
  params:
    - name: setup_number_or_special
      type: integer
      description: SETUP number, or 126 to return current setting even if undefined, or 127 to check if function is defined
    - name: request_type
      type: integer
      description: 0=VIS source, 1=Input/output# of source, 2=Vertical sync freq (Hz)
    - name: machine
      type: integer
      description: Machine number

- id: request_breakaway_setting
  label: Request Breakaway Setting
  kind: action
  params:
    - name: setup_number_or_special
      type: integer
      description: SETUP number, or 126 to return current setting even if undefined, or 127 to check if function is defined
    - name: request_type
      type: integer
      description: 0=Request audio breakaway setting, 1=Request FOLLOW setting
    - name: machine
      type: integer
      description: Machine number

- id: request_video_audio_type_setting
  label: Request Video/Audio Type Setting
  kind: action
  params:
    - name: setup_number_or_special
      type: integer
      description: SETUP number, or 126 to return current setting even if undefined, or 127 to check if function is defined
    - name: type
      type: integer
      description: 0=video, 1=audio, 2=VGA
    - name: machine
      type: integer
      description: Machine number

- id: request_highest_machine_address
  label: Request Highest Machine Address
  kind: action
  params:
    - name: address_type
      type: integer
      description: 0=video, 1=audio
    - name: machine
      type: integer
      description: Machine number

- id: request_whether_setup_defined
  label: Request Whether Setup is Defined / Valid Input Detected
  kind: action
  params:
    - name: setup_or_input
      type: integer
      description: SETUP number or Input number
    - name: check_type
      type: integer
      description: 0=check if setup is defined, 1=check if input is valid
    - name: machine
      type: integer
      description: Machine number

- id: request_whether_panel_locked
  label: Request Whether Panel is Locked
  kind: action
  params:
    - name: machine
      type: integer
      description: Machine number

- id: request_audio_parameter
  label: Request Audio Parameter
  kind: action
  params:
    - name: input_output
      type: integer
      description: Input or output number
    - name: machine
      type: integer
      description: Machine number

- id: request_video_parameter
  label: Request Video Parameter
  kind: action
  params:
    - name: input_output
      type: integer
      description: Input or output number
    - name: machine
      type: integer
      description: Machine number

- id: define_machine
  label: Define Machine
  kind: action
  params:
    - name: definition_type
      type: integer
      description: 1=number of inputs, 2=number of outputs, 3=number of setups
    - name: machine_type
      type: integer
      description: 1=video, 2=audio, 3=SDI, 4=remote panel, 5=RS-422 controller
    - name: machine
      type: integer
      description: Machine number

- id: media_control
  label: Media Control
  kind: action
  params:
    - name: switch_number
      type: integer
      description: Switch number
    - name: switch_data
      type: integer
      description: Switch data
    - name: machine
      type: integer
      description: Machine number

- id: request_media_control_settings
  label: Request Media Control Settings
  kind: action
  params:
    - name: switch_number
      type: integer
      description: Switch number
    - name: machine
      type: integer
      description: Machine number

- id: direct_memorysave
  label: Direct Memory Save
  kind: action
  params:
    - name: memory_address
      type: integer
      description: Memory address
    - name: data
      type: integer
      description: Data to store
    - name: machine
      type: integer
      description: Machine number

- id: audio_parameter_settings
  label: Audio Parameter Settings for Instructions 22, 24, 25
  kind: action
  params:
    - name: input_output_selection
      type: integer
      description: I0=0 input, I0=1 output; I1=Left, I2=Right
    - name: parameter_type
      type: integer
      description: 0=Gain, 1=Bass, 2=Treble, 3=Midrange, 4=Mix On
    - name: machine
      type: integer
      description: Machine number

- id: video_parameter_settings
  label: Video Parameter Settings for Instructions 21, 23, 26
  kind: action
  params:
    - name: input_output_selection
      type: integer
      description: 1=Input, 2=Output
    - name: parameter_type
      type: integer
      description: 0=video gain, 1=contrast, 2=brightness, 3=colour, 4=hue, 5=H-phase, 6=V-position
    - name: machine
      type: integer
      description: Machine number

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
    - name: machine
      type: integer
      description: Machine number
```

## Feedbacks
```yaml
- id: switch_ack
  label: Switch Acknowledgement
  type: binary
  description: Device echoes back the 4-byte command with DESTINATION bit set high if valid

- id: error_response
  label: Error Response
  type: enum
  values:
    - 0: error
    - 1: invalid instruction
    - 2: out of range
    - 3: machine busy
    - 4: invalid input
    - 5: valid input
  description: Returned when instruction is invalid or parameter out of range

- id: request_response
  label: Request Response
  type: object
  description: Request instructions return same instruction and INPUT codes, with OUTPUT assigned the requested parameter value

- id: input_validity_notification
  label: Input Validity Change Notification
  type: binary
  description: Instruction 16 sent when unit detects change in input validity state (real-time)

- id: reset_code
  label: Reset Code
  type: binary
  description: Sent to PC when master switcher is reset (e.g. powered on)

- id: identify_response
  label: Identify Response
  type: object
  description: Machine name (ASCII) or version number returned as decimal values of INPUT/OUTPUT bytes
```

## Variables
```yaml
# Serial communication uses 4-byte binary packets:
# Byte 1: [0][D][N5][N4][N3][N2][N1][N0]  (D=direction, N=instruction)
# Byte 2: [1][I6][I5][I4][I3][I2][I1][I0]  (I=input)
# Byte 3: [1][O6][O5][O4][O3][O2][O1][O0]  (O=output)
# Byte 4: [1][X][OVR][M4][M3][M2][M1][M0]  (M=machine number, OVR=override bit)

# Machine addressing:
# - Single machine: set M4-M0=1, configure machine as MACHINE NUMBER=1
# - Up to 8 cascaded: assign unique machine numbers 1-8 via dipswitches
# - OVR bit: broadcast to all machines, addressed machine replies

# Visible input selection (VIS) sources:
# - 0=No VIS, 1=Input#1, 2=Ext digital sync, 3=Ext analog sync, 4=Dynamic sync
# - 5=Inter-machine sync, 6=Input#(INPUT byte), 7=Output#(INPUT byte)
# - 8=User-defined sync, 32=RGBHV seamless switching, 64=Delayed switch set, 65=Execute, 66=Cancel

# Video types: 0=CV, 1=YC, 2=YUV, 3=RGBS, 4=SDI, 5=CV+YC, 6=VGA scaler, 7=DVI
# Audio: balanced/unbalanced, digital/analog, mono/stereo encoded in OUTPUT bits
# VGA resolutions: 640x480, 800x600, 1024x768
```

## Events
```yaml
# Device sends unsolicited notifications:
# - Reset code on power-on/power-down
# - Instruction 16 on input validity state change
# - VIS source changes via front panel
# - Audio/video type changes via front panel
# UNRESOLVED: complete event taxonomy not documented in source
```

## Macros
```yaml
# Seamless RGBHV switching:
# 1. Send instruction 7 with OUTPUT=32 (set RGBHV seamless switching)
# 2. Send instruction 7 with blank period (e.g. 14 steps = 350ms) via INPUT byte
# Example: HEX 07 8E A0 81 sets 350ms blanking

# Delayed switch execution:
# 1. Send instruction 7 with OUTPUT=64 (set for delayed switch)
# 2. Send switch command (instruction 1) or press via front panel
# 3. Send instruction 7 with OUTPUT=65 (execute) after required delay
# Example: HEX 07 80 C0 81 (set delay) → HEX 01 84 83 81 (switch) → HEX 07 80 C1 81 (execute)

# Extended data (instruction 63):
# Send before instructions needing >7 bits of data
# Example: audio gain 681dec → 3F 80 85 81 then 16 83 A9 81
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes

**Protocol 2000 Binary Packet Format:**
The device uses 4-byte binary packets. Bit 7 of byte 1=0 (command from PC), bit 7 of byte 1=1 (response to PC). Machine number 1-8, set M4-M0=1 for single machine control.

**RS-485 Cascading:**
Up to 8 VS-808xl units can be controlled from a single RS-232 port via RS-485 interconnect. Configure each unit with a unique self address (1-8) via dipswitches. Master unit (address 1) connects to PC.

**Dipswitch Settings:**
- Dips 1-3: Self address (1-8)
- Dip 4: RS-485 termination (ON/OFF)
- Dip 5: Reply enable/disable (ON/OFF)
- Dip 8: RS-232/RS-485 selection (ON=RS-232, OFF=RS-485)

**Bidirectional Commands:**
Instructions 0-15 are bi-directional: the switcher performs the instruction AND sends the code when the front panel is used. The switcher echoes commands with DESTINATION bit set high.

**Special INPUT Values:**
- 127: check if function is defined (returns OUTPUT=1 if defined)
- 126: return current setting even if function not software-selectable

**Machine Override (OVR):**
When bit 4 of byte 4 is set, "video" commands have universal meaning — all units switch, not just addressed one.

<!-- UNRESOLVED: firmware version not stated in source -->
<!-- UNRESOLVED: complete event taxonomy not documented -->
<!-- UNRESOLVED: no safety warnings or interlock procedures stated -->

## Provenance

```yaml
source_domains:
  - k.kramerav.com
source_urls:
  - https://k.kramerav.com/downloads/manuals/VS-808xl.pdf
retrieved_at: 2026-04-30T04:24:16.769Z
last_checked_at: 2026-04-23T08:05:22.574Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:05:22.574Z
matched_actions: 40
action_count: 40
confidence: high
summary: "All 40 spec actions matched instruction codes in source; transport parameters verified; complete functional command coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
