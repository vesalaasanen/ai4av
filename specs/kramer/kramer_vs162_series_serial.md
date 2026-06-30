---
spec_id: admin/kramer-vs162-series-serial
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kramer VS-162 Series Control Spec"
manufacturer: Kramer
model_family: VS-162V
aliases: []
compatible_with:
  manufacturers:
    - Kramer
    - "Kramer Electronics Ltd."
  models:
    - VS-162V
    - VS-162AV
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - k.kramerav.com
  - cdn.kramerav.com
source_urls:
  - https://k.kramerav.com/downloads/protocols/protocol_2000_rev0_51.pdf
  - https://cdn.kramerav.com/web/downloads/manuals/VS-162V.pdf
  - https://cdn.kramerav.com/web/downloads/manuals/VS-162AVRCA.pdf
  - https://k.kramerav.com/downloads/protocols/VS-162V.pdf
  - https://k.kramerav.com/downloads/protocols/VS-162AV.pdf
retrieved_at: 2026-06-14T17:55:50.673Z
last_checked_at: 2026-06-14T19:39:42.746Z
generated_at: 2026-06-14T19:39:42.746Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact matrix dimensions (inputs x outputs) for VS-162V / VS-162AV not stated in this protocol reference — the included hex table is a generic 16x16 example, not a VS-162 datasheet."
  - "which subset of Protocol 2000 instructions the VS-162 family actually implements is not enumerated; verify against a real device."
  - "RS-485 electrical details (termination, bias) not specified beyond mention of RS-232/RS-485 support."
  - "flow control not stated in source"
  - "full enumerated value ranges for status replies depend on machine I/O count (see Actions notes)."
  - "numeric ranges/scales not stated in source; verify on device."
  - "no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "exact VS-162 matrix size (inputs x outputs) — the source is the generic protocol reference, not a VS-162 datasheet; the 16x16 hex table is an illustrative example."
  - "which subset of Protocol 2000 instructions the VS-162 family implements (the source explicitly states each machine uses a subset)."
  - "flow_control, RS-485 termination/biasing, and cable pinout details beyond \"null-modem\"."
  - "numeric ranges/scales for video and audio parameters."
  - "firmware version compatibility and Protocol 2000 revision implemented on VS-162 units (instruction 61 / NOTE 9 can query this at runtime)."
verification:
  verdict: verified
  checked_at: 2026-06-14T19:39:42.746Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions match source instruction table; transport parameters (9600 8N1) confirmed verbatim; full bidirectional Protocol 2000 coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-14
---

# Kramer VS-162 Series Control Spec

## Summary
Kramer VS-162 Series AV matrix switchers controlled via Kramer Protocol "2000" over RS-232C / RS-485. Protocol 2000 is a binary, four-byte-per-command scheme (INSTRUCTION / INPUT / OUTPUT / MACHINE NUMBER). This spec covers the full Protocol 2000 instruction set as documented in the vendor protocol reference (VER-0.51), including a worked 16x16 video-matrix hex table. Note: "Protocol 2000 compatible" does not imply every command below is implemented on a given machine; each machine uses a subset.

<!-- UNRESOLVED: exact matrix dimensions (inputs x outputs) for VS-162V / VS-162AV not stated in this protocol reference — the included hex table is a generic 16x16 example, not a VS-162 datasheet. -->
<!-- UNRESOLVED: which subset of Protocol 2000 instructions the VS-162 family actually implements is not enumerated; verify against a real device. -->
<!-- UNRESOLVED: RS-485 electrical details (termination, bias) not specified beyond mention of RS-232/RS-485 support. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600          # default data rate stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
# Null-modem RS-232 cable between controller and machine (per source).
# RS-485 also supported by the protocol but wiring/termination UNRESOLVED.
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
# Evidence from source:
- routable   # inferred: SWITCH VIDEO (1), SWITCH AUDIO (2), SWITCH CONTROL DATA (44)
- queryable  # inferred: REQUEST STATUS (5,6), REQUEST VIS (10), REQUEST BREAKAWAY (11), REQUEST TYPE (12), REQUEST HIGHEST ADDR (14), REQUEST SETUP/INPUT VALID (15), REQUEST AUDIO PARAM (25), REQUEST VIDEO PARAM (26), REQUEST PANEL LOCK (31), REQUEST CONTROL DATA (45), IDENTIFY MACHINE (61), DEFINE MACHINE (62)
- levelable  # inferred: SET/INCREASE/DECREASE VIDEO PARAMETER (21,23) and AUDIO PARAMETER (22,24)
```

## Actions
```yaml
# Protocol 2000 frame: 4 bytes.
#   byte1 = 0bbbbbbb : bit7=0, bit6=DESTINATION (0=PC->machine), bits5-0=INSTRUCTION
#   byte2 = 1IIIIIII : bit7=1, bits6-0=INPUT
#   byte3 = 1OOOOOOO : bit7=1, bits6-0=OUTPUT
#   byte4 = 1XMMMMMM : bit7=1, bit6=OVR (override), bits5-0=MACHINE NUMBER
# For a single machine on the serial port, MACHINE NUMBER = 1 (byte4 = 0x81) per source.
# Templates below use {80+input:02X} meaning 0x80 OR'd with the param value, emitted as 2 hex digits.

- id: reset_video
  label: Reset Video
  kind: action
  command: "00 80 80 {80+machine:02X}"
  params:
    - name: machine
      type: integer
      description: Machine number (default 1 for single-machine control)
  notes: "Instruction 0. On reset (e.g. power-on) the reset code is sent to the PC."

- id: switch_video
  label: Switch Video
  kind: action
  command: "01 {80+input:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: Video input to switch (0 = disconnect)
    - name: output
      type: integer
      description: Video output to switch (0 = to all outputs)
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 1. Bi-directional (NOTE 2): switcher echoes command back with DESTINATION bit set. Worked example input5->output8 machine3 = 01 85 88 83."

- id: switch_audio
  label: Switch Audio
  kind: action
  command: "02 {80+input:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: Audio input to switch (0 = disconnect)
    - name: output
      type: integer
      description: Audio output to switch (0 = to all outputs)
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 2."

- id: store_video_status
  label: Store Video Status
  kind: action
  command: "03 {80+setup:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: setup
      type: integer
      description: SETUP number to store (1 and higher; 0 = present setting)
    - name: output
      type: integer
      description: "0 = store, 1 = delete"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 3. SETUP #0 is present setting; #1+ are saved in memory."

- id: recall_video_status
  label: Recall Video Status
  kind: action
  command: "04 {80+setup:02X} 80 {80+machine:02X}"
  params:
    - name: setup
      type: integer
      description: SETUP number to recall
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 4."

- id: request_status_video_output
  label: Request Status of a Video Output
  kind: query
  command: "05 {80+setup:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: setup
      type: integer
      description: SETUP # (0 = present setting)
    - name: output
      type: integer
      description: Output number whose status is requested
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 5. Reply echoes instruction+input; OUTPUT byte = currently routed input."

- id: request_status_audio_output
  label: Request Status of an Audio Output
  kind: query
  command: "06 {80+setup:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: setup
      type: integer
      description: SETUP # (0 = present setting)
    - name: output
      type: integer
      description: Output number whose status is requested
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 6."

- id: vis_source
  label: VIS (Vertical Interval Switching) Source
  kind: action
  command: "07 {80+input:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: "Meaning depends on OUTPUT byte: input# when OUTPUT=6; output# when OUTPUT=7; blank period in 25ms steps when OUTPUT=32; 0 = none."
    - name: output
      type: integer
      description: "VIS mode: 0=immediate, 1=input#1, 2=ext digital sync, 3=ext analog sync, 4=dynamic sync, 5=inter-machine sync, 6=input#(INPUT byte), 7=output#(INPUT byte), 8=user-defined, 32=RGBHV seamless, 64=set delayed switch, 65=execute delayed switch, 66=cancel delayed switch"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 7. NOTE 5/17/18. Seamless RGBHV blanking example (350ms=14 steps): 07 8E A0 81. Delayed switch example: 07 80 C0 81 then switch 01 84 83 81 then 07 80 C1 81."

- id: breakaway_setting
  label: Breakaway Setting
  kind: action
  command: "08 {80+input:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: "0 or 1 (see OUTPUT)"
    - name: output
      type: integer
      description: "0=audio-follow-video, 1=audio breakaway display/set VIDEO, 2=audio breakaway AUDIO, 3=audio breakaway DATA; FOLLOW/normal mode bit also encoded here"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 8. NOTE 15: when OVR bit set, 'video' commands have universal meaning across audio/data units."

- id: video_audio_type_setting
  label: Video / Audio Type Setting
  kind: action
  command: "09 {80+input:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: "0=video, 1=audio, 2=VGA/DVI"
    - name: output
      type: integer
      description: "Video type 0-7 (CV/YC/YUV/RGBS/SDI/CV+YC/VGA scaler/DVI); audio balance/digital/analog/stereo bits; VGA resolutions 1-3 (640x480/800x600/1024x768)"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 9."

- id: request_vis_setting
  label: Request VIS Setting
  kind: query
  command: "0A {80+setup:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: setup
      type: integer
      description: "SETUP#, or 126/127 to test function presence (NOTE 6)"
    - name: output
      type: integer
      description: "0=VIS source, 1=input#/output# of source, 2=vertical sync freq Hz (0/50/60/127)"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 10. NOTE 7."

- id: request_breakaway_setting
  label: Request Breakaway Setting
  kind: query
  command: "0B {80+setup:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: setup
      type: integer
      description: "SETUP#, or 126/127 to test function presence"
    - name: output
      type: integer
      description: "0=request audio breakaway setting, 1=request FOLLOW setting"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 11. Reply per instruction 8 definitions."

- id: request_video_audio_type_setting
  label: Request Video / Audio Type Setting
  kind: query
  command: "0C {80+setup:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: setup
      type: integer
      description: "SETUP#, or 126/127 to test function presence"
    - name: output
      type: integer
      description: "0=video, 1=audio, 2=VGA"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 12."

- id: set_highest_machine_address
  label: Set Highest Machine Address
  kind: action
  command: "0D {80+input:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: "0=video, 1=audio"
    - name: output
      type: integer
      description: Highest machine address value
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 13."

- id: request_highest_machine_address
  label: Request Highest Machine Address
  kind: query
  command: "0E {80+input:02X} 80 {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: "0=video, 1=audio"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 14."

- id: request_setup_defined_or_input_valid
  label: Request Whether Setup Defined / Valid Input Detected
  kind: query
  command: "0F {80+input:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: SETUP # or input #
    - name: output
      type: integer
      description: "0=check if setup defined, 1=check if input valid"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 15. Reply OUTPUT=0 not defined/invalid, 1 defined/valid (NOTE 8)."

- id: error_busy
  label: Error / Busy
  kind: action
  command: "10 {80+input:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: "For input validity reply (OUTPUT=4/5), input # being reported"
    - name: output
      type: integer
      description: "0=error, 1=invalid instruction, 2=out of range, 3=machine busy, 4=invalid input, 5=valid input, 6=RX buffer overflow"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 16. Primarily machine->PC (error/status). NOTE 9/25: also sent unsolicited on input validity change. Reception by switcher is not valid."

- id: reserved_17
  label: Reserved (Instruction 17)
  kind: action
  command: "11 {80+input:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: "RESERVED - no documented meaning"
    - name: output
      type: integer
      description: "RESERVED - no documented meaning"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 17. NOTE 10: reserved for internal use."

- id: reset_audio
  label: Reset Audio
  kind: action
  command: "12 80 80 {80+machine:02X}"
  params:
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 18."

- id: store_audio_status
  label: Store Audio Status
  kind: action
  command: "13 {80+setup:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: setup
      type: integer
      description: SETUP number to store
    - name: output
      type: integer
      description: "0 = store, 1 = delete"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 19."

- id: recall_audio_status
  label: Recall Audio Status
  kind: action
  command: "14 {80+setup:02X} 80 {80+machine:02X}"
  params:
    - name: setup
      type: integer
      description: SETUP number to recall
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 20."

- id: set_video_parameter
  label: Set Video Parameter
  kind: action
  command: "15 {80+io:02X} {80+value:02X} {80+machine:02X}"
  params:
    - name: io
      type: integer
      description: Input/output number whose parameter is set (0 = all)
    - name: value
      type: integer
      description: Parameter value (7-bit; use instruction 63 for >7 bits)
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 21. Precede with instruction 43 to specify which parameter. NOTE 11/20/24."

- id: set_audio_parameter
  label: Set Audio Parameter
  kind: action
  command: "16 {80+io:02X} {80+value:02X} {80+machine:02X}"
  params:
    - name: io
      type: integer
      description: Input/output number whose parameter is set (0 = all)
    - name: value
      type: integer
      description: Parameter value (7-bit; use instruction 63 for >7 bits)
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 22. Precede with instruction 42. NOTE 20: example set audio gain of output 3 to 681dec -> 3F 80 85 81 then 16 83 A9 81."

- id: increase_decrease_video_parameter
  label: Increase / Decrease Video Parameter
  kind: action
  command: "17 {80+io:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: io
      type: integer
      description: Input/output number (0 = all)
    - name: output
      type: integer
      description: "0=+gain,1=-gain,2=+contrast,3=-contrast,4=+brightness,5=-brightness,6=+colour,7=-colour,8=+hue,9=-hue,16=+H-phase,17=-H-phase,18=+V-position,19=-V-position"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 23. Precede with instruction 43."

- id: increase_decrease_audio_parameter
  label: Increase / Decrease Audio Parameter
  kind: action
  command: "18 {80+io:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: io
      type: integer
      description: Input/output number (0 = all)
    - name: output
      type: integer
      description: "0=+output,1=-output,2=+left out,3=-left out,4=+right out,5=-right out,6=+input,7=-input,8=+left in,9=-left in,10=+right in,11=-right in"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 24. Precede with instruction 42. NOTE 24 example: request audio gain right input#9 -> 2A 84 80 81 then 19 89 81 81."

- id: request_audio_parameter
  label: Request Audio Parameter
  kind: query
  command: "19 {80+io:02X} 80 {80+machine:02X}"
  params:
    - name: io
      type: integer
      description: Input/output number whose parameter is requested
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 25. Precede with instruction 42."

- id: request_video_parameter
  label: Request Video Parameter
  kind: query
  command: "1A {80+io:02X} 80 {80+machine:02X}"
  params:
    - name: io
      type: integer
      description: Input/output number whose video parameter is requested
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 26. Precede with instruction 43."

- id: lock_front_panel
  label: Lock Front Panel
  kind: action
  command: "1E {80+input:02X} 80 {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: "0 = panel unlocked, 1 = panel locked"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 30."

- id: request_panel_locked
  label: Request Whether Panel Is Locked
  kind: query
  command: "1F 80 80 {80+machine:02X}"
  params:
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 31. NOTE 16: reply OUTPUT=0 unlocked, 1 locked."

- id: reserved_32_to_35
  label: Reserved (Instructions 32-35)
  kind: action
  command: "RESERVED 32-35"
  params: []
  notes: "Instructions 32-35. NOTE 10: reserved for internal use; no input/output definitions documented."

- id: direct_memory_save
  label: Direct Memory Save
  kind: action
  command: "28 {80+addr:02X} {80+data:02X} {80+machine:02X}"
  params:
    - name: addr
      type: integer
      description: EEPROM memory address (7-bit)
    - name: data
      type: integer
      description: Data byte to store (7-bit)
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 40. NOTE 21: stores to non-volatile memory (e.g. EEPROM for SETUPS). Requires knowledge of machine memory map."

- id: audio_parameter_settings_prefix
  label: Audio Parameter Settings Prefix (for instructions 22, 24, 25)
  kind: action
  command: "2A {80+input:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: "I0: 0=input,1=output; I1: Left; I2: Right"
    - name: output
      type: integer
      description: "0=Gain,1=Bass,2=Treble,3=Midrange,4=Mix On"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 42. Sent BEFORE instructions 22/24/25 to select which audio parameter (NOTE 24)."

- id: video_parameter_settings_prefix
  label: Video Parameter Settings Prefix (for instructions 21, 23, 26)
  kind: action
  command: "2B {80+input:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: "1=Input, 2=Output"
    - name: output
      type: integer
      description: "0=gain,1=contrast,2=brightness,3=colour,4=hue,5=H-phase,6=V-position"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 43. Sent BEFORE instructions 21/23/26 to select which video parameter."

- id: switch_control_data
  label: Switch Control Data
  kind: action
  command: "2C {80+input:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: Control data input to switch (0 = disconnect)
    - name: output
      type: integer
      description: Control data output to switch (0 = to all outputs)
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 44. NOTE 27: bit6 of OUTPUT byte defines DATA direction (0 input->output, 1 reply output->input)."

- id: request_status_control_data_output
  label: Request Status of Control Data Output
  kind: query
  command: "2D {80+setup:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: setup
      type: integer
      description: SETUP #
    - name: output
      type: integer
      description: Output number whose status is requested
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 45."

- id: reply_on
  label: Reply On/Off
  kind: action
  command: "37 80 {80+output:02X} {80+machine:02X}"
  params:
    - name: output
      type: integer
      description: "0 = Off (no replies), 1 = On"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 55. NOTE 26: when OFF, unit will not reply to protocol commands until sent with ON (and hardware REPLY enabled)."

- id: change_to_ascii
  label: Change to ASCII Protocol
  kind: action
  command: "38 80 {80+output:02X} {80+machine:02X}"
  params:
    - name: output
      type: integer
      description: "1=SVS protocol, 2=Generic protocol, 3=Protocol-3000"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 56. NOTE 19: after this, unit responds to the ASCII command set defined by OUTPUT byte."

- id: set_autosave
  label: Set Auto-Save
  kind: action
  command: "39 {80+input:02X} 80 {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: "I3 = no save, I4 = auto-save"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 57. NOTE 12: auto-save is re-enabled whenever machine is turned on."

- id: execute_loaded_data
  label: Execute Loaded Data
  kind: action
  command: "3A {80+setup:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: setup
      type: integer
      description: "0, or a SETUP #"
    - name: output
      type: integer
      description: "1 = Take (execute), 2 = Cancel"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 58. NOTE 22: executes data loaded via instructions 59/60."

- id: load_video_data
  label: Load Video Data
  kind: action
  command: "3B {80+input:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: "Video input (0 = disconnect; 127 = load SETUP #)"
    - name: output
      type: integer
      description: "Video output (0 = all outputs) or SETUP #"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 59. NOTE 22/23: lines up data for later execution via instruction 58."

- id: load_audio_data
  label: Load Audio Data
  kind: action
  command: "3C {80+input:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: "Audio input (0 = disconnect; 127 = load SETUP #)"
    - name: output
      type: integer
      description: "Audio output (0 = all outputs) or SETUP #"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 60."

- id: identify_machine
  label: Identify Machine
  kind: query
  command: "3D {80+input:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: "1=video name,2=audio name,3=video sw version,4=audio sw version,5=RS422 ctrl name,6=RS422 ctrl version,7=remote ctrl name,8=remote sw version,9=Protocol 2000 revision,10=control data name,11=control data sw version"
    - name: output
      type: integer
      description: "0=request first 4 digits,1/2/3=request suffix 1/2/3,10/11/12=request prefix 1/2/3"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 61. NOTE 13: reply = decimal INPUT/OUTPUT values (e.g. 2216 -> 7D 96 90 81); ASCII suffix letters returned as 128+ASCII."

- id: define_machine
  label: Define Machine
  kind: query
  command: "3E {80+input:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: "1=#inputs, 2=#outputs, 3=#setups"
    - name: output
      type: integer
      description: "1=video, 2=audio, 3=SDI, 4=remote panel, 5=RS-422 controller, 6=control data"
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 62. NOTE 14: counts refer to the addressed machine, not the whole system."

- id: extended_data
  label: Extended Data (MSB prefix)
  kind: action
  command: "3F {80+input:02X} {80+output:02X} {80+machine:02X}"
  params:
    - name: input
      type: integer
      description: 7 MSBs of next instruction's INPUT data
    - name: output
      type: integer
      description: 7 MSBs of next instruction's OUTPUT data
    - name: machine
      type: integer
      description: Machine number (default 1)
  notes: "Instruction 63. NOTE 20: sent BEFORE the instruction needing >7-bit data. Example set audio gain out3=681dec -> 3F 80 85 81 then 16 83 A9 81."
```

## Feedbacks
```yaml
# Protocol 2000 is symmetric: valid commands are echoed back with DESTINATION bit set (byte1 + 0x40).
# REQUEST instructions reply with OUTPUT byte holding the requested value.
- id: command_ack_echo
  type: raw
  description: "On valid command, switcher echoes the same 4 bytes with DESTINATION bit (byte1 bit6) set high (byte1 | 0x40). E.g. sent 01 85 88 83 -> reply 41 85 88 83."
- id: error_busy_reply
  type: enum
  values: [error, invalid_instruction, out_of_range, machine_busy, invalid_input, valid_input, rx_buffer_overflow]
  description: "Instruction 16 reply. output byte: 0=error,1=invalid instruction,2=out of range,3=busy,4=invalid input,5=valid input,6=RX overflow."
- id: setup_defined_reply
  type: enum
  values: [not_defined, defined]
  description: "Reply to instruction 15 (NOTE 8): OUTPUT=0 not defined/invalid input, OUTPUT=1 defined/valid."
- id: panel_lock_reply
  type: enum
  values: [unlocked, locked]
  description: "Reply to instruction 31 (NOTE 16): OUTPUT=0 unlocked, OUTPUT=1 locked."
# UNRESOLVED: full enumerated value ranges for status replies depend on machine I/O count (see Actions notes).
```

## Variables
```yaml
# Settable continuous/level parameters exposed via Protocol 2000 (per machine capability):
- id: video_gain
  description: Set/requested via instructions 21/23/26 + prefix 43 (param 0). 7-bit; >7-bit via instruction 63.
- id: contrast
  description: Video parameter via prefix 43 (param 1).
- id: brightness
  description: Video parameter via prefix 43 (param 2).
- id: colour
  description: Video parameter via prefix 43 (param 3).
- id: hue
  description: Video parameter via prefix 43 (param 4).
- id: h_phase
  description: H-phase via prefix 43 (param 5).
- id: v_position
  description: V-position via prefix 43 (param 6).
- id: audio_gain
  description: Audio gain via instructions 22/24/25 + prefix 42 (param 0).
- id: audio_bass
  description: Bass via prefix 42 (param 1).
- id: audio_treble
  description: Treble via prefix 42 (param 2).
- id: audio_midrange
  description: Midrange via prefix 42 (param 3).
- id: audio_mix
  description: Mix On via prefix 42 (param 4).
# UNRESOLVED: numeric ranges/scales not stated in source; verify on device.
```

## Events
```yaml
# Unsolicited notifications the device sends to the PC:
- id: power_on_reset
  description: "NOTE 1: when master switcher resets (e.g. powered on), the reset code (instruction 0 frame) is sent to the PC."
- id: front_panel_switch
  description: "NOTE 2: instructions 1/2 are bi-directional - a front-panel keystroke causes the switcher to emit the corresponding 4-byte frame (DESTINATION bit set) to the PC."
- id: input_validity_change
  description: "NOTE 25: for units that detect input validity, instruction 16 is sent unsolicited on any input state change (e.g. input3 invalid -> 10 83 84 81; input7 valid -> 10 87 85 81)."
```

## Macros
```yaml
# Multi-step sequences explicitly documented in source (NOTES 18, 20, 24):
- id: delayed_switch
  description: "NOTE 18: delayed execution. (1) set delayed switch 07 80 C0 81, (2) send switch e.g. 01 84 83 81, (3) after delay send execute 07 80 C1 81."
- id: seamless_rgbhv_blanking
  description: "NOTE 17: set RGBHV seamless blanking period (25ms steps). 350ms = 07 8E A0 81."
- id: set_audio_gain_extended
  description: "NOTE 20: >7-bit value requires extended-data prefix. out3 gain=681dec: 3F 80 85 81 then 16 83 A9 81."
- id: store_recall_setup
  description: "Store via instruction 3/19, recall via 4/20; SETUP #1+ persist in memory."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements
# are present in this Protocol 2000 reference document. A null-modem RS-232 connection is
# specified but no hazardous-energy interlocks are described.
```

## Notes
- Source is the Kramer Protocol "2000" communication protocol reference (VER-0.51), a generic binary RS-232/RS-485 protocol shared across many Kramer machines. The VS-162 family (VS-162V, VS-162AV) is one consumer; it implements a subset.
- Every command is a fixed 4-byte frame: `[instr] [0x80|INPUT] [0x80|OUTPUT] [0x80|MACHINE]`. The example 16x16 hex table (instruction 1, machine 1) is included verbatim in the source and corroborates the `01 {80+in} {80+out} 81` pattern (e.g. IN1->OUT1 = `01 81 81 81`, IN16->OUT16 = `01 90 90 81`).
- For single-machine control, always use MACHINE NUMBER = 1 (byte4 = `0x81`). Set the OVR bit (byte4 bit6 = `0xC0|machine`) to broadcast to all machines on the bus (NOTE 15).
- Two-byte prefix sequences are required for several operations: instruction 42 precedes 22/24/25 (audio param select); instruction 43 precedes 21/23/26 (video param select); instruction 63 precedes any instruction needing >7-bit data (NOTE 20/24).
- Front-panel operations emit the same frame format back to the PC (DESTINATION bit set), so the controller can track user-initiated changes.
- Protocol can switch to an ASCII command set via instruction 56 (SVS / Generic / Protocol-3000).

<!-- UNRESOLVED: exact VS-162 matrix size (inputs x outputs) — the source is the generic protocol reference, not a VS-162 datasheet; the 16x16 hex table is an illustrative example. -->
<!-- UNRESOLVED: which subset of Protocol 2000 instructions the VS-162 family implements (the source explicitly states each machine uses a subset). -->
<!-- UNRESOLVED: flow_control, RS-485 termination/biasing, and cable pinout details beyond "null-modem". -->
<!-- UNRESOLVED: numeric ranges/scales for video and audio parameters. -->
<!-- UNRESOLVED: firmware version compatibility and Protocol 2000 revision implemented on VS-162 units (instruction 61 / NOTE 9 can query this at runtime). -->
````

## Provenance

```yaml
source_domains:
  - k.kramerav.com
  - cdn.kramerav.com
source_urls:
  - https://k.kramerav.com/downloads/protocols/protocol_2000_rev0_51.pdf
  - https://cdn.kramerav.com/web/downloads/manuals/VS-162V.pdf
  - https://cdn.kramerav.com/web/downloads/manuals/VS-162AVRCA.pdf
  - https://k.kramerav.com/downloads/protocols/VS-162V.pdf
  - https://k.kramerav.com/downloads/protocols/VS-162AV.pdf
retrieved_at: 2026-06-14T17:55:50.673Z
last_checked_at: 2026-06-14T19:39:42.746Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-14T19:39:42.746Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions match source instruction table; transport parameters (9600 8N1) confirmed verbatim; full bidirectional Protocol 2000 coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact matrix dimensions (inputs x outputs) for VS-162V / VS-162AV not stated in this protocol reference — the included hex table is a generic 16x16 example, not a VS-162 datasheet."
- "which subset of Protocol 2000 instructions the VS-162 family actually implements is not enumerated; verify against a real device."
- "RS-485 electrical details (termination, bias) not specified beyond mention of RS-232/RS-485 support."
- "flow control not stated in source"
- "full enumerated value ranges for status replies depend on machine I/O count (see Actions notes)."
- "numeric ranges/scales not stated in source; verify on device."
- "no safety warnings, interlock procedures, or power-on sequencing requirements"
- "exact VS-162 matrix size (inputs x outputs) — the source is the generic protocol reference, not a VS-162 datasheet; the 16x16 hex table is an illustrative example."
- "which subset of Protocol 2000 instructions the VS-162 family implements (the source explicitly states each machine uses a subset)."
- "flow_control, RS-485 termination/biasing, and cable pinout details beyond \"null-modem\"."
- "numeric ranges/scales for video and audio parameters."
- "firmware version compatibility and Protocol 2000 revision implemented on VS-162 units (instruction 61 / NOTE 9 can query this at runtime)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
