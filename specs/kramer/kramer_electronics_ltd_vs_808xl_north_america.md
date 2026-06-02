---
spec_id: admin/kramer-vs-808xl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kramer VS-808XL Control Spec"
manufacturer: Kramer
model_family: VS-808xl
aliases: []
compatible_with:
  manufacturers:
    - Kramer
    - "Kramer Electronics, Ltd."
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
last_checked_at: 2026-06-02T01:48:18.398Z
generated_at: 2026-06-02T01:48:18.398Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "flow control not stated in source"
  - "per-parameter value ranges (e.g. min/max gain, contrast, brightness) not stated in source."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements specific to control protocol use."
  - "device firmware version compatibility (only Protocol 2000 v0.48 stated)."
  - "per-parameter value ranges (gain min/max, contrast range, etc.)."
  - "ASCII protocol command set (SVS/Generic) referenced by instruction 56 but not defined in this excerpt."
  - "detailed memory map referenced by instruction 40 (Direct Memory Save)."
  - "RS-485 wiring/termination electrical specifics (section 6.1.2 referenced but not in this excerpt)."
  - "RS-232 connector port number / serial port speed alternatives (only default 9600 baud documented)."
verification:
  verdict: verified
  checked_at: 2026-06-02T01:48:18.398Z
  matched_actions: 41
  action_count: 41
  confidence: medium
  summary: "All 41 spec actions match instruction codes 0–63 in Table 10; transport parameters (9600 baud, 8 bits, no parity, 1 stop) confirmed. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Kramer VS-808XL Control Spec

## Summary
The Kramer VS-808xl is an 8x8 video/audio matrix switcher controlled via RS-232 (with a null-modem adapter) and optionally cascaded via RS-485. It uses Kramer's Protocol 2000 (version 0.48) — a 4-byte binary protocol with a destination/instruction byte, an input byte, an output byte, and a machine-number byte. Default serial settings: 9600 baud, 8 data bits, no parity, 1 stop bit.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # inferred: RESET VIDEO (instr 0) and RESET AUDIO (instr 18) act as power/reset operations
- routable       # inferred from SWITCH VIDEO / SWITCH AUDIO instructions
- queryable      # inferred from REQUEST STATUS / REQUEST PARAMETER instructions
- levelable      # inferred from SET VIDEO/AUDIO PARAMETER and INCREASE/DECREASE instructions
```

## Actions
```yaml
# Protocol 2000 frame layout (4 bytes), all multi-byte commands follow this template:
#   byte 1 = INSTRUCTION (bit 7 = 0 for PC -> switcher, 0..63 instruction code)
#   byte 2 = INPUT       (bit 7 = 1, low 7 bits = input number or instruction-specific data)
#   byte 3 = OUTPUT      (bit 7 = 1, low 7 bits = output number or instruction-specific data)
#   byte 4 = MACHINE#    (bit 7 = 1, OVR in bit 6, machine address in low 5 bits; default 0x81 for single-machine M=1)
# Example: switch input 5 -> output 8 on machine 1 = "01 85 88 81" (verbatim from Table 11)

- id: reset_video
  label: Reset Video (Instruction 0)
  kind: action
  command: "00 80 80 81"
  params: []
  notes: When the master switcher is reset (e.g. on power-up) the reset code is sent to the PC; sending this code to the switcher resets it to power-down settings.

- id: switch_video
  label: Switch Video (Instruction 1)
  kind: action
  command: "01 {input_byte} {output_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: Video input number (1..8); 0 = disconnect. input_byte = 0x80 + input.
    - name: output
      type: integer
      description: Video output number (1..8); 0 = switch to all outputs. output_byte = 0x80 + output.
    - name: machine
      type: integer
      description: Machine number (default 1). machine_byte = 0x80 + machine.

- id: switch_audio
  label: Switch Audio (Instruction 2)
  kind: action
  command: "02 {input_byte} {output_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: Audio input number (1..8); 0 = disconnect. input_byte = 0x80 + input.
    - name: output
      type: integer
      description: Audio output number (1..8); 0 = switch to all outputs. output_byte = 0x80 + output.
    - name: machine
      type: integer
      description: Machine number (default 1). machine_byte = 0x80 + machine.

- id: store_video_status
  label: Store Video Status (Instruction 3)
  kind: action
  command: "03 {setup_byte} {mode_byte} {machine_byte}"
  params:
    - name: setup
      type: integer
      description: SETUP # to store/delete (1..N). setup_byte = 0x80 + setup.
    - name: mode
      type: integer
      description: 0 = store, 1 = delete. mode_byte = 0x80 + mode.

- id: recall_video_status
  label: Recall Video Status (Instruction 4)
  kind: action
  command: "04 {setup_byte} 80 {machine_byte}"
  params:
    - name: setup
      type: integer
      description: SETUP # to recall (1..N). setup_byte = 0x80 + setup.

- id: request_video_output_status
  label: Request Status of a Video Output (Instruction 5)
  kind: query
  command: "05 {setup_byte} {output_byte} {machine_byte}"
  params:
    - name: setup
      type: integer
      description: SETUP # (0 = present setting). setup_byte = 0x80 + setup.
    - name: output
      type: integer
      description: Output number whose status is requested. output_byte = 0x80 + output.

- id: request_audio_output_status
  label: Request Status of an Audio Output (Instruction 6)
  kind: query
  command: "06 {setup_byte} {output_byte} {machine_byte}"
  params:
    - name: setup
      type: integer
      description: SETUP # (0 = present setting). setup_byte = 0x80 + setup.
    - name: output
      type: integer
      description: Output number whose status is requested. output_byte = 0x80 + output.

- id: vis_source
  label: VIS Source / Seamless / Delayed Switch (Instruction 7)
  kind: action
  command: "07 {input_byte} {output_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: Input # (when OUTPUT byte = 6); OR output # (when OUTPUT byte = 7); OR blank period in 25ms steps (when OUTPUT byte = 32); OR 0. input_byte = 0x80 + value.
    - name: output
      type: integer
      description: 0=No VIS, 1=Input #1, 2=External digital sync, 3=External analog sync, 4=Dynamic sync, 5=Inter-machine sync, 6=Input # in INPUT byte, 7=Output # in INPUT byte, 8=User-defined sync, 32=RGBHV seamless switching, 64=Set for delayed switch, 65=Execute delayed switch, 66=Cancel delayed switch. output_byte = 0x80 + value.
  notes: For 350ms seamless blanking send "07 8E A0 81". For delayed switch see Note 18.

- id: breakaway_setting
  label: Breakaway Setting (Instruction 8)
  kind: action
  command: "08 {input_byte} {output_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: 0 = audio breakaway/follow; 1 = follow/normal mode. input_byte = 0x80 + value.
    - name: output
      type: integer
      description: When INPUT=0 - 0=audio-follow-video, 1=audio breakaway. When INPUT=1 - 0=FOLLOW mode, 1=Normal mode. output_byte = 0x80 + value.

- id: video_audio_type_setting
  label: Video / Audio Type Setting (Instruction 9)
  kind: action
  command: "09 {input_byte} {output_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: 0=video, 1=audio, 2=VGA/DVI resolution. input_byte = 0x80 + value.
    - name: output
      type: integer
      description: For video INPUT=0 - 0=CV,1=YC,2=YUV,3=RGBS,4=SDI,5=CV+YC,6=VGA scaler,7=DVI. For audio INPUT=1 - bitfield O0 unbalanced/balanced, O1 digital/analog, O4..O2 channel mode. For VGA/DVI INPUT=2 - 1=640x480, 2=800x600, 3=1024x768. output_byte = 0x80 + value.

- id: request_vis_setting
  label: Request VIS Setting (Instruction 10)
  kind: query
  command: "0A {input_byte} {output_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: SETUP # (or 126/127 to probe if function is supported). input_byte = 0x80 + value.
    - name: output
      type: integer
      description: 0=VIS source, 1=input#/output# of source, 2=vertical sync freq in Hz. output_byte = 0x80 + value.

- id: request_breakaway_setting
  label: Request Breakaway Setting (Instruction 11)
  kind: query
  command: "0B {input_byte} {output_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: SETUP # (or 126/127 to probe). input_byte = 0x80 + value.
    - name: output
      type: integer
      description: 0=request audio breakaway setting, 1=request FOLLOW setting. output_byte = 0x80 + value.

- id: request_video_audio_type_setting
  label: Request Video / Audio Type Setting (Instruction 12)
  kind: query
  command: "0C {input_byte} {output_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: SETUP # (or 126/127 to probe). input_byte = 0x80 + value.
    - name: output
      type: integer
      description: 0=video, 1=audio, 2=VGA. output_byte = 0x80 + value.

- id: set_highest_machine_address
  label: Set Highest Machine Address (Instruction 13)
  kind: action
  command: "0D {input_byte} {output_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: 0=video, 1=audio. input_byte = 0x80 + value.
    - name: output
      type: integer
      description: Highest machine address. output_byte = 0x80 + address.

- id: request_highest_machine_address
  label: Request Highest Machine Address (Instruction 14)
  kind: query
  command: "0E {input_byte} 80 {machine_byte}"
  params:
    - name: input
      type: integer
      description: 0=video, 1=audio. input_byte = 0x80 + value.

- id: request_setup_or_input_valid
  label: Request Whether Setup Is Defined / Valid Input Is Detected (Instruction 15)
  kind: query
  command: "0F {input_byte} {output_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: SETUP # or Input #. input_byte = 0x80 + value.
    - name: output
      type: integer
      description: 0=check if setup is defined, 1=check if input is valid. output_byte = 0x80 + value.

- id: error_busy
  label: Error / Busy (Instruction 16)
  kind: event
  command: "10 {input_byte} {output_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: For invalid/valid input (OUTPUT=4 or 5), this byte = input #. input_byte = 0x80 + value.
    - name: output
      type: integer
      description: 0=error, 1=invalid instruction, 2=out of range, 3=machine busy, 4=invalid input, 5=valid input. output_byte = 0x80 + value.
  notes: Sent unsolicited from device when input validity changes (Note 25); e.g. input 3 invalid -> "10 83 84 81", input 7 valid -> "10 87 85 81".

- id: reset_audio
  label: Reset Audio (Instruction 18)
  kind: action
  command: "12 80 80 81"
  params: []

- id: store_audio_status
  label: Store Audio Status (Instruction 19)
  kind: action
  command: "13 {setup_byte} {mode_byte} {machine_byte}"
  params:
    - name: setup
      type: integer
      description: SETUP # to store/delete. setup_byte = 0x80 + setup.
    - name: mode
      type: integer
      description: 0=store, 1=delete. mode_byte = 0x80 + mode.

- id: recall_audio_status
  label: Recall Audio Status (Instruction 20)
  kind: action
  command: "14 {setup_byte} 80 {machine_byte}"
  params:
    - name: setup
      type: integer
      description: SETUP # to recall. setup_byte = 0x80 + setup.

- id: set_video_parameter
  label: Set Video Parameter (Instruction 21)
  kind: action
  command: "15 {input_byte} {value_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: Input or output number whose video parameter is to be set (0 = all). input_byte = 0x80 + value.
    - name: value
      type: integer
      description: Parameter value (preceded by instruction 43 to specify which parameter). value_byte = 0x80 + value.
  notes: Use instruction 43 (Video Parameter Settings) first to specify which video parameter is being set. Use instruction 63 (Extended Data) for values >127.

- id: set_audio_parameter
  label: Set Audio Parameter (Instruction 22)
  kind: action
  command: "16 {input_byte} {value_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: Input or output number whose audio parameter is to be set (0 = all). input_byte = 0x80 + value.
    - name: value
      type: integer
      description: Parameter value. value_byte = 0x80 + value.
  notes: Use instruction 42 (Audio Parameter Settings) first to specify which audio parameter. Use instruction 63 (Extended Data) for values >127. Example - audio gain output 3 to 681dec - "3F 80 85 81" then "16 83 A9 81".

- id: increase_decrease_video_parameter
  label: Increase / Decrease Video Parameter (Instruction 23)
  kind: action
  command: "17 {input_byte} {action_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: Input or output number (0 = all). input_byte = 0x80 + value.
    - name: action
      type: integer
      description: 0=inc gain, 1=dec gain, 2=inc contrast, 3=dec contrast, 4=inc brightness, 5=dec brightness, 6=inc colour, 7=dec colour, 8=inc hue, 9=dec hue, 16=inc H-phase, 17=dec H-phase, 18=inc V-position, 19=dec V-position. action_byte = 0x80 + value.

- id: increase_decrease_audio_parameter
  label: Increase / Decrease Audio Parameter (Instruction 24)
  kind: action
  command: "18 {input_byte} {action_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: Input or output number (0 = all). input_byte = 0x80 + value.
    - name: action
      type: integer
      description: 0=inc output, 1=dec output, 2=inc left output, 3=dec left output, 4=inc right output, 5=dec right output, 6=inc input, 7=dec input, 8=inc left input, 9=dec left input, 10=inc right input, 11=dec right input. action_byte = 0x80 + value.

- id: request_audio_parameter
  label: Request Audio Parameter (Instruction 25)
  kind: query
  command: "19 {input_byte} 80 {machine_byte}"
  params:
    - name: input
      type: integer
      description: Input or output number whose audio parameter is requested. input_byte = 0x80 + value.
  notes: Use instruction 42 first to specify which audio parameter. Example - request audio gain of right input 9 - "2A 84 80 81" then "19 89 81 81".

- id: request_video_parameter
  label: Request Video Parameter (Instruction 26)
  kind: query
  command: "1A {input_byte} 80 {machine_byte}"
  params:
    - name: input
      type: integer
      description: Input or output number whose video parameter is requested. input_byte = 0x80 + value.
  notes: Use instruction 43 first to specify which video parameter.

- id: lock_front_panel
  label: Lock Front Panel (Instruction 30)
  kind: action
  command: "1E {state_byte} 80 {machine_byte}"
  params:
    - name: state
      type: integer
      description: 0=panel unlocked, 1=panel locked. state_byte = 0x80 + state.

- id: request_panel_locked
  label: Request Whether Panel Is Locked (Instruction 31)
  kind: query
  command: "1F 80 80 {machine_byte}"
  params: []
  notes: Reply OUTPUT byte = 0 if panel unlocked, 1 if locked.

- id: direct_memory_save
  label: Direct Memory Save (Instruction 40)
  kind: action
  command: "28 {address_byte} {data_byte} {machine_byte}"
  params:
    - name: address
      type: integer
      description: EEPROM memory address. address_byte = 0x80 + address.
    - name: data
      type: integer
      description: Data to store. data_byte = 0x80 + data.
  notes: Requires understanding of the machine's memory map and structure.

- id: audio_parameter_settings
  label: Audio Parameter Settings for Instructions 22/24/25 (Instruction 42)
  kind: action
  command: "2A {input_byte} {param_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: Bitfield - I0=0 input/I0=1 output, I1=Left, I2=Right. input_byte = 0x80 + bitfield.
    - name: param
      type: integer
      description: 0=Gain, 1=Bass, 2=Treble, 3=Midrange, 4=Mix On. param_byte = 0x80 + value.

- id: video_parameter_settings
  label: Video Parameter Settings for Instructions 21/23/26 (Instruction 43)
  kind: action
  command: "2B {target_byte} {param_byte} {machine_byte}"
  params:
    - name: target
      type: integer
      description: 1=Input, 2=Output. target_byte = 0x80 + value.
    - name: param
      type: integer
      description: 0=video gain, 1=contrast, 2=brightness, 3=colour, 4=hue, 5=H-phase, 6=V-position. param_byte = 0x80 + value.

- id: media_control
  label: Media Control (Instruction 44)
  kind: action
  command: "2C {switch_byte} {data_byte} {machine_byte}"
  params:
    - name: switch_number
      type: integer
      description: Switch number. switch_byte = 0x80 + value.
    - name: data
      type: integer
      description: Switch data. data_byte = 0x80 + value.

- id: request_media_control_settings
  label: Request Media Control Settings (Instruction 45)
  kind: query
  command: "2D {switch_byte} 80 {machine_byte}"
  params:
    - name: switch_number
      type: integer
      description: Switch number. switch_byte = 0x80 + value.

- id: change_to_ascii
  label: Change to ASCII (Instruction 56)
  kind: action
  command: "38 80 {protocol_byte} {machine_byte}"
  params:
    - name: protocol
      type: integer
      description: 1=SVS protocol, 2=Generic protocol. protocol_byte = 0x80 + value.
  notes: After this command the unit responds to the ASCII command set. Send the corresponding ASCII command to return to HEX (Protocol 2000).

- id: set_auto_save
  label: Set Auto-Save (Instruction 57)
  kind: action
  command: "39 {mode_byte} 80 {machine_byte}"
  params:
    - name: mode
      type: integer
      description: Bitfield - I3=no save, I4=auto-save. mode_byte = 0x80 + bitfield.
  notes: Auto-save is automatically re-enabled on each power-up.

- id: execute_loaded_data
  label: Execute Loaded Data (Instruction 58)
  kind: action
  command: "3A {setup_byte} {mode_byte} {machine_byte}"
  params:
    - name: setup
      type: integer
      description: 0 or SETUP #. setup_byte = 0x80 + value.
    - name: mode
      type: integer
      description: 1=Take, 2=Cancel. mode_byte = 0x80 + value.
  notes: Used in conjunction with instructions 59/60 to execute data previously loaded for the crosspoint switcher.

- id: load_video_data
  label: Load Video Data (Instruction 59)
  kind: action
  command: "3B {input_byte} {output_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: Video input (0=disconnect, 127=load SETUP#). input_byte = 0x80 + value.
    - name: output
      type: integer
      description: Video output (0=all outputs) or SETUP#. output_byte = 0x80 + value.
  notes: Lines data up for execution; use instruction 58 to execute. If INPUT=127, OUTPUT contains SETUP # to load.

- id: load_audio_data
  label: Load Audio Data (Instruction 60)
  kind: action
  command: "3C {input_byte} {output_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: Audio input (0=disconnect, 127=load SETUP#). input_byte = 0x80 + value.
    - name: output
      type: integer
      description: Audio output (0=all outputs) or SETUP#. output_byte = 0x80 + value.

- id: identify_machine
  label: Identify Machine (Instruction 61)
  kind: query
  command: "3D {input_byte} {output_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: 1=video machine name, 2=audio machine name, 3=video software version, 4=audio software version, 5=RS422 controller name, 6=RS422 controller version, 7=remote control name, 8=remote software version, 9=Protocol 2000 revision. input_byte = 0x80 + value.
    - name: output
      type: integer
      description: 0=request first 4 digits, 1=request first suffix, 2=second suffix, 3=third suffix, 10=first prefix, 11=second prefix, 12=third prefix. output_byte = 0x80 + value.

- id: define_machine
  label: Define Machine (Instruction 62)
  kind: query
  command: "3E {input_byte} {output_byte} {machine_byte}"
  params:
    - name: input
      type: integer
      description: 1=number of inputs, 2=number of outputs, 3=number of setups. input_byte = 0x80 + value.
    - name: output
      type: integer
      description: 1=video, 2=audio, 3=SDI, 4=remote panel, 5=RS-422 controller. output_byte = 0x80 + value.

- id: extended_data
  label: Extended Data (Instruction 63)
  kind: action
  command: "3F {input_msb_byte} {output_msb_byte} {machine_byte}"
  params:
    - name: input_msb
      type: integer
      description: 7 MSBs of INPUT data for next instruction. input_msb_byte = 0x80 + value.
    - name: output_msb
      type: integer
      description: 7 MSBs of OUTPUT data for next instruction. output_msb_byte = 0x80 + value.
  notes: Sent immediately before the instruction needing >7-bit values. Example - set audio gain output 6 to 10013dec - "3F 80 CE 81" then "16 86 9D 81".
```

## Feedbacks
```yaml
- id: switch_acknowledgement
  type: bytes
  description: When a valid command is received, the switcher echoes the same 4 bytes back with bit 7 of the 1st byte set (DESTINATION = 1, switcher -> PC). E.g. send "01 85 88 83" (switch in 5 -> out 8, machine 3), switcher replies "41 85 88 83".
- id: front_panel_change_notification
  type: bytes
  description: When a switch is performed via the front panel (e.g. input 1 -> output 7 on machine 3), the switcher sends the corresponding bytes with DESTINATION=1, e.g. "41 81 87 83".
- id: video_input_validity
  type: enum
  values: [invalid, valid]
  description: Per Note 25, when input validity changes the unit sends instruction 16 unsolicited (e.g. "10 83 84 81" = input 3 invalid; "10 87 85 81" = input 7 valid).
- id: error_response
  type: enum
  values: [error, invalid_instruction, out_of_range, machine_busy, invalid_input, valid_input]
  description: Reply from instruction 16 (Error/Busy) when invalid instruction sent, parameter out of range, or RS-232 instruction sent while front-panel programming is active.
- id: setup_defined
  type: enum
  values: [defined, undefined]
  description: Reply to instruction 15 - OUTPUT byte = 1 if setup is defined / input is valid, 0 if undefined / no valid input.
- id: panel_lock_state
  type: enum
  values: [unlocked, locked]
  description: Reply to instruction 31 - OUTPUT byte = 0 if unlocked, 1 if locked.
- id: vertical_sync_frequency
  type: integer
  description: Reply to instruction 10 with OUTPUT=2 - 0=no input sync, 50=PAL, 60=NTSC, 127=error.
```

## Variables
```yaml
# All settable parameters are exposed via the parameterized actions above
# (set_video_parameter, set_audio_parameter, etc.) with the parameter selector
# pre-loaded via instructions 42/43. The source does not enumerate the value
# range for each parameter.
# UNRESOLVED: per-parameter value ranges (e.g. min/max gain, contrast, brightness) not stated in source.
```

## Events
```yaml
- id: power_on_reset
  description: When the master switcher is powered on (or reset), it sends the reset code (instruction 0) to the PC. See Note 1.
- id: front_panel_action
  description: Any front-panel keystroke that performs a Protocol-2000 instruction is echoed to the PC with DESTINATION=1 (see Note 2).
- id: input_validity_change
  description: Per Note 25, the unit sends instruction 16 (Error/Busy with OUTPUT=4 or 5) whenever an input's validity changes in real-time.
```

## Macros
```yaml
- id: delayed_switch_sequence
  description: |
    Schedule a delayed crosspoint change (Note 18).
    1. Send instruction 7 with OUTPUT=64 (set for delayed switch), e.g. "07 80 C0 81".
    2. Send the switch command (instruction 1), e.g. "01 84 83 81" (in 4 -> out 3).
    3. After the desired delay, send instruction 7 with OUTPUT=65 (execute delayed switch), e.g. "07 80 C1 81".
    The delayed-switch mode is automatically cancelled after execution.
- id: load_then_execute
  description: |
    Pre-load crosspoint data then commit (Note 22).
    1. Send instruction 59 (Load Video Data) and/or 60 (Load Audio Data) one or more times.
    2. Send instruction 58 (Execute Loaded Data) with OUTPUT=1 (Take) to commit, or OUTPUT=2 (Cancel) to abort.
- id: extended_value_set
  description: |
    Set a parameter with a value greater than 127 (Note 20).
    1. Send instruction 63 (Extended Data) with the 7 MSBs of INPUT and OUTPUT.
    2. Send the target instruction (e.g. 22 Set Audio Parameter) with the 7 LSBs.
    Example - set audio gain output 6 to 10013dec - "3F 80 CE 81" then "16 86 9D 81".
- id: select_audio_parameter_then_act
  description: |
    Operating on a specific audio parameter (gain/bass/treble/etc.) requires instruction 42 to be sent first as a selector, then the target instruction (22 set, 24 inc/dec, 25 request). See Note 24.
- id: select_video_parameter_then_act
  description: |
    Same pattern as above using instruction 43 to select the video parameter before instructions 21/23/26.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements specific to control protocol use.
```

## Notes
The VS-808xl uses Kramer's binary Protocol 2000 (revision 0.48). Important operational details from the source:

- **Wiring**: A null-modem adapter is shipped with the unit and is the recommended RS-232 connection method. The non-null-modem pinout is documented (PC PIN 2 ↔ unit PIN 3, PC PIN 3 ↔ unit PIN 2, PC PIN 4 ↔ unit PIN 6, PIN 5 ↔ PIN 5 ground, PINS 1/7/8 tied together on the unit side).
- **DIP switches**: DIPs 1-3 set the machine address (1..8). DIP 4 enables RS-485 line termination. DIP 5 enables/disables replies from the switcher to PC. DIPs 6-7 are reserved (OFF). DIP 8 selects RS-232 (ON) vs RS-485 (OFF) for PC communication. Up to 8 units can be cascaded with one Master (Self Address = 1) and the rest as slaves.
- **Machine addressing**: For a single unit, set DIPs for machine number 1 and use 0x81 as the 4th byte. Setting the OVR bit (bit 6 of byte 4) makes all machines accept the command, with only the addressed machine replying.
- **ASCII fallback**: Instruction 56 switches the unit into an ASCII protocol mode (SVS or Generic). To return to binary, send the equivalent ASCII command (not documented in this excerpt).
- **Note coverage**: All Protocol-2000 notes 1-25 from the source are referenced in the relevant action entries above.

<!-- UNRESOLVED: device firmware version compatibility (only Protocol 2000 v0.48 stated). -->
<!-- UNRESOLVED: per-parameter value ranges (gain min/max, contrast range, etc.). -->
<!-- UNRESOLVED: ASCII protocol command set (SVS/Generic) referenced by instruction 56 but not defined in this excerpt. -->
<!-- UNRESOLVED: detailed memory map referenced by instruction 40 (Direct Memory Save). -->
<!-- UNRESOLVED: RS-485 wiring/termination electrical specifics (section 6.1.2 referenced but not in this excerpt). -->
<!-- UNRESOLVED: RS-232 connector port number / serial port speed alternatives (only default 9600 baud documented). -->

## Provenance

```yaml
source_domains:
  - k.kramerav.com
source_urls:
  - https://k.kramerav.com/downloads/manuals/VS-808xl.pdf
retrieved_at: 2026-04-30T04:24:16.769Z
last_checked_at: 2026-06-02T01:48:18.398Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T01:48:18.398Z
matched_actions: 41
action_count: 41
confidence: medium
summary: "All 41 spec actions match instruction codes 0–63 in Table 10; transport parameters (9600 baud, 8 bits, no parity, 1 stop) confirmed. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "flow control not stated in source"
- "per-parameter value ranges (e.g. min/max gain, contrast, brightness) not stated in source."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements specific to control protocol use."
- "device firmware version compatibility (only Protocol 2000 v0.48 stated)."
- "per-parameter value ranges (gain min/max, contrast range, etc.)."
- "ASCII protocol command set (SVS/Generic) referenced by instruction 56 but not defined in this excerpt."
- "detailed memory map referenced by instruction 40 (Direct Memory Save)."
- "RS-485 wiring/termination electrical specifics (section 6.1.2 referenced but not in this excerpt)."
- "RS-232 connector port number / serial port speed alternatives (only default 9600 baud documented)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
