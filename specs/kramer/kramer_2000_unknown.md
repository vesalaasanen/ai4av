---
spec_id: admin/kramer-2000
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kramer Protocol 2000 Control Spec"
manufacturer: Kramer
model_family: "Protocol 2000 compatible machines"
aliases: []
compatible_with:
  manufacturers:
    - Kramer
    - "Kramer Electronics Ltd."
  models:
    - "Protocol 2000 compatible machines"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.kramerav.com
  - kramerav.com
  - k.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/manuals/protocol_2000_rev0_51.pdf
  - https://www.kramerav.com/page/technical-papers
  - "https://k.kramerav.com/support/download.asp?f=35567"
retrieved_at: 2026-09-02T17:19:27.901Z
last_checked_at: 2026-09-12T22:16:57.733Z
generated_at: 2026-09-12T22:16:57.733Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device-by-device opcode support varies; see Notes."
  - "source contains no explicit safety warnings, interlocks, or"
  - "- No source states whether the protocol also runs over TCP/IP or only over"
verification:
  verdict: verified
  checked_at: 2026-09-12T22:16:57.733Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec actions match source instruction codes verbatim; transport values are stated; spec covers the full documented (non-reserved) opcode catalogue. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Kramer Protocol 2000 Control Spec

## Summary
Kramer Electronics Protocol 2000 (VER-0.51) is a binary 4-byte RS-232 / RS-485 control protocol used across Kramer's matrix switchers, scalers, and related AV products. Each device implements a sub-set of the 60+ instruction opcodes defined in this spec; this spec covers the full documented instruction catalogue so downstream integrators can drive any Protocol 2000 compliant machine.

<!-- UNRESOLVED: device-by-device opcode support varies; see Notes. -->

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
# source documents input/output routing commands, query commands returning state,
# parameter set/increase/decrease commands, and front-panel lock
- routable      # inferred from SWITCH VIDEO / SWITCH AUDIO / SWITCH CONTROL DATA
- queryable     # inferred from REQUEST STATUS, REQUEST VIS, REQUEST BREAKAWAY, etc.
- levelable     # inferred from INCREASE/DECREASE VIDEO/AUDIO PARAMETER
```

## Actions
```yaml
# Protocol 2000 uses a 4-byte binary frame:
#   byte1: 0 | D | N5 N4 N3 N2 N1 N0   (D=destination, N5..N0=instruction)
#   byte2: 1 | I6 I5 I4 I3 I2 I1 I0    (input)
#   byte3: 1 | O6 O5 O4 O3 O2 O1 O0    (output)
#   byte4: 1 | OVR | X | M4 M3 M2 M1 M0 (machine number, OVR=broadcast)
# For PC→device the first byte has bit7=0 and DESTINATION=0;
# the device echoes back the same frame with DESTINATION=1.
# All literal payloads below follow that frame format, verbatim from source.

# --- Instruction 0: RESET VIDEO ---
- id: reset_video
  label: Reset Video
  kind: action
  command: "00 80 80 81"   # INSTR=0, INPUT=0, OUTPUT=0, MACHINE=1
  params: []

# --- Instruction 1: SWITCH VIDEO ---
# Switch video INPUT to OUTPUT. INPUT=0 disconnect, OUTPUT=0 broadcast to all outputs.
- id: switch_video
  label: Switch Video
  kind: action
  command: "01 {input_hex} {output_hex} {machine_hex}"
  params:
    - name: input
      type: integer
      description: Video input number (0=disconnect)
    - name: output
      type: integer
      description: Video output number (0=broadcast to all outputs)
    - name: machine
      type: integer
      description: Machine number 1..N (set 1 for single-machine systems)
  notes: |
    Worked example for machine 1 connect input 5 to output 8: `01 85 88 81` (NOTE 2).

# --- Instruction 2: SWITCH AUDIO ---
- id: switch_audio
  label: Switch Audio
  kind: action
  command: "02 {input_hex} {output_hex} {machine_hex}"
  params:
    - name: input
      type: integer
      description: Audio input number (0=disconnect)
    - name: output
      type: integer
      description: Audio output number (0=broadcast to all outputs)
    - name: machine
      type: integer
      description: Machine number 1..N (set 1 for single-machine systems)

# --- Instruction 3: STORE VIDEO STATUS ---
- id: store_video_status
  label: Store Video Status
  kind: action
  command: "03 {setup_hex} {store_flag_hex} {machine_hex}"
  params:
    - name: setup
      type: integer
      description: SETUP number (1..N; SETUP 0 = current/live setting)
    - name: store_flag
      type: integer
      description: 0=store, 1=delete
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 4: RECALL VIDEO STATUS ---
- id: recall_video_status
  label: Recall Video Status
  kind: action
  command: "04 {setup_hex} 80 {machine_hex}"
  params:
    - name: setup
      type: integer
      description: SETUP number to recall (0=current, 1..N=saved)
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 5: REQUEST STATUS OF A VIDEO OUTPUT ---
- id: request_video_output_status
  label: Request Video Output Status
  kind: query
  command: "05 {setup_hex} {output_hex} {machine_hex}"
  params:
    - name: setup
      type: integer
      description: SETUP # (or 0=current)
    - name: output
      type: integer
      description: Output number whose status is requested
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 6: REQUEST STATUS OF AN AUDIO OUTPUT ---
- id: request_audio_output_status
  label: Request Audio Output Status
  kind: query
  command: "06 {setup_hex} {output_hex} {machine_hex}"
  params:
    - name: setup
      type: integer
      description: SETUP # (or 0=current)
    - name: output
      type: integer
      description: Output number whose status is requested
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 7: VIS SOURCE ---
- id: vis_source
  label: VIS Source
  kind: action
  command: "07 {input_hex} {output_mode_hex} {machine_hex}"
  params:
    - name: input
      type: integer
      description: |
        Input number when OUTPUT=6, OR output number when OUTPUT=7,
        OR blanking period in 25ms steps when OUTPUT=32, else 0.
    - name: output_mode
      type: integer
      description: |
        0=No VIS (immediate); 1=Input #1; 2=External digital sync; 3=External analog sync;
        4=Dynamic sync; 5=Inter-machine sync; 6=Input #(INPUT byte);
        7=Output #(INPUT byte); 8=User-defined sync; 32=RGBHV seamless switching;
        64=Set for delayed switch; 65=Execute delayed switch; 66=Cancel delayed switch.
    - name: machine
      type: integer
      description: Machine number
  notes: |
    Worked example for 350ms blanking time (14 steps, machine 1): `07 8E A0 81` (NOTE 17).
    Delayed-switch example, machine 1: `07 80 C0 81` then `01 84 83 81` then `07 80 C1 81` (NOTE 18).

# --- Instruction 8: BREAKAWAY SETTING ---
- id: breakaway_setting
  label: Breakaway Setting
  kind: action
  command: "08 {input_hex} {output_mode_hex} {machine_hex}"
  params:
    - name: input
      type: integer
      description: 0 = audio-follow-video mode select; 1 = breakaway display/set mode
    - name: output_mode
      type: integer
      description: |
        When INPUT=0: 0=FOLLOW mode, 1=Normal mode.
        When INPUT=1: 0=audio-follow-video; 1=audio breakaway - VIDEO; 2=audio breakaway - AUDIO;
        3=audio breakaway - DATA.
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 9: VIDEO / AUDIO TYPE SETTING ---
- id: video_audio_type_setting
  label: Video / Audio Type Setting
  kind: action
  command: "09 {input_hex} {output_type_hex} {machine_hex}"
  params:
    - name: input
      type: integer
      description: 0=video, 1=audio, 2=VGA/DVI
    - name: output_type
      type: integer
      description: |
        For VIDEO (INPUT=0): 0=CV, 1=YC, 2=YUV, 3=RGBS, 4=SDI, 5=CV+YC,
        6=VGA scaler, 7=DVI.
        For AUDIO (INPUT=1): O0=0 unbalanced/1 balanced; O1=0 digital/1 analog;
        O2..O4 = mono/stereo encoding.
        For VGA/DVI (INPUT=2): 1=640x480, 2=800x600, 3=1024x768.
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 10: REQUEST VIS SETTING ---
- id: request_vis_setting
  label: Request VIS Setting
  kind: query
  command: "0A {input_hex} {output_field_hex} {machine_hex}"
  params:
    - name: input
      type: integer
      description: SETUP #, or 126 (request current setting even if undefined), or 127 (probe support)
    - name: output_field
      type: integer
      description: |
        0=VIS source; 1=Input # or output # of source; 2=Vertical sync freq (Hz,
        0 none, 50 PAL, 60 NTSC, 127 error).
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 11: REQUEST BREAKAWAY SETTING ---
- id: request_breakaway_setting
  label: Request Breakaway Setting
  kind: query
  command: "0B {input_hex} {output_field_hex} {machine_hex}"
  params:
    - name: input
      type: integer
      description: SETUP #, or 126 / 127 to probe
    - name: output_field
      type: integer
      description: 0=request audio breakaway setting; 1=request FOLLOW setting
    - name: machine
      type: integer
      description: Machine number
  notes: |
    Worked example (machine 5 in breakaway): request `0B 80 80 85`, reply `4B 80 81 85` (NOTE 4).

# --- Instruction 12: REQUEST VIDEO / AUDIO TYPE SETTING ---
- id: request_video_audio_type_setting
  label: Request Video / Audio Type Setting
  kind: query
  command: "0C {input_hex} {output_field_hex} {machine_hex}"
  params:
    - name: input
      type: integer
      description: SETUP #, or 126 / 127 to probe
    - name: output_field
      type: integer
      description: 0=video, 1=audio, 2=VGA
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 13: SET HIGHEST MACHINE ADDRESS ---
- id: set_highest_machine_address
  label: Set Highest Machine Address
  kind: action
  command: "0D {input_hex} {addr_hex} {machine_hex}"
  params:
    - name: input
      type: integer
      description: 0=video, 1=audio
    - name: addr
      type: integer
      description: Highest machine address
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 14: REQUEST HIGHEST MACHINE ADDRESS ---
- id: request_highest_machine_address
  label: Request Highest Machine Address
  kind: query
  command: "0E {input_hex} 80 {machine_hex}"
  params:
    - name: input
      type: integer
      description: 0=video, 1=audio
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 15: REQUEST WHETHER SETUP IS DEFINED / VALID INPUT DETECTED ---
- id: request_setup_or_input_validity
  label: Request Setup Defined / Input Valid
  kind: query
  command: "0F {input_hex} {mode_hex} {machine_hex}"
  params:
    - name: input
      type: integer
      description: SETUP # or input #
    - name: mode
      type: integer
      description: 0=check if setup defined; 1=check if input valid
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 16: ERROR / BUSY (unsolicited device→host) ---
- id: error_busy
  label: Error / Busy
  kind: event
  command: "10 {input_hex} {code_hex} {machine_hex}"
  params:
    - name: input
      type: integer
      description: Input # (when OUTPUT=4 or 5)
    - name: code
      type: integer
      description: |
        0=error, 1=invalid instruction, 2=out of range, 3=machine busy,
        4=invalid input, 5=valid input, 6=RX buffer overflow.
    - name: machine
      type: integer
      description: Machine number
  notes: |
    Sent unsolicited by device on input-state changes (NOTE 25), e.g. invalid input 3
    -> `10 83 84 81`; valid input 7 -> `10 87 85 81`.

# --- Instruction 18: RESET AUDIO ---
- id: reset_audio
  label: Reset Audio
  kind: action
  command: "12 80 80 {machine_hex}"
  params:
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 19: STORE AUDIO STATUS ---
- id: store_audio_status
  label: Store Audio Status
  kind: action
  command: "13 {setup_hex} {store_flag_hex} {machine_hex}"
  params:
    - name: setup
      type: integer
      description: SETUP # (0=current/live)
    - name: store_flag
      type: integer
      description: 0=store, 1=delete
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 20: RECALL AUDIO STATUS ---
- id: recall_audio_status
  label: Recall Audio Status
  kind: action
  command: "14 {setup_hex} 80 {machine_hex}"
  params:
    - name: setup
      type: integer
      description: SETUP # to recall
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 21: SET VIDEO PARAMETER ---
- id: set_video_parameter
  label: Set Video Parameter
  kind: action
  command: "15 {io_hex} {value_hex} {machine_hex}"
  params:
    - name: io
      type: integer
      description: Input/output number whose video parameter is to be set (0=all)
    - name: value
      type: integer
      description: Parameter value (parameter ID defined via Instruction 43)
    - name: machine
      type: integer
      description: Machine number
  notes: |
    For values >7 bits, precede with Instruction 63 to set MSBs (NOTE 20).

# --- Instruction 22: SET AUDIO PARAMETER ---
- id: set_audio_parameter
  label: Set Audio Parameter
  kind: action
  command: "16 {io_hex} {value_hex} {machine_hex}"
  params:
    - name: io
      type: integer
      description: Input/output number whose parameter is to be set (0=all)
    - name: value
      type: integer
      description: Parameter value (parameter ID defined via Instruction 42)
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 23: INCREASE / DECREASE VIDEO PARAMETER ---
- id: increase_decrease_video_parameter
  label: Increase / Decrease Video Parameter
  kind: action
  command: "17 {io_hex} {op_hex} {machine_hex}"
  params:
    - name: io
      type: integer
      description: Input/output number whose parameter changes (0=all)
    - name: op
      type: integer
      description: |
        0=increase video gain, 1=decrease video gain, 2=increase contrast,
        3=decrease contrast, 4=increase brightness, 5=decrease brightness,
        6=increase colour, 7=decrease colour, 8=increase hue, 9=decrease hue,
        16=increase H-phase, 17=decrease H-phase, 18=increase V-position,
        19=decrease V-position.
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 24: INCREASE / DECREASE AUDIO PARAMETER ---
- id: increase_decrease_audio_parameter
  label: Increase / Decrease Audio Parameter
  kind: action
  command: "18 {io_hex} {op_hex} {machine_hex}"
  params:
    - name: io
      type: integer
      description: Input/output number whose parameter changes (0=all)
    - name: op
      type: integer
      description: |
        0=increase output, 1=decrease output, 2=increase left output,
        3=decrease left output, 4=increase right output, 5=decrease right output,
        6=increase input, 7=decrease input, 8=increase left input,
        9=decrease left input, 10=increase right input, 11=decrease right input.
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 25: REQUEST AUDIO PARAMETER ---
- id: request_audio_parameter
  label: Request Audio Parameter
  kind: query
  command: "19 {io_hex} 80 {machine_hex}"
  params:
    - name: io
      type: integer
      description: Input/output number whose audio parameter is requested
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 26: REQUEST VIDEO PARAMETER ---
- id: request_video_parameter
  label: Request Video Parameter
  kind: query
  command: "1A {io_hex} 80 {machine_hex}"
  params:
    - name: io
      type: integer
      description: Input/output number whose video parameter is requested
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 30: LOCK FRONT PANEL ---
- id: lock_front_panel
  label: Lock Front Panel
  kind: action
  command: "1E {lock_flag_hex} 80 {machine_hex}"
  params:
    - name: lock_flag
      type: integer
      description: 0=panel unlocked, 1=panel locked
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 31: REQUEST WHETHER PANEL IS LOCKED ---
- id: request_panel_lock_status
  label: Request Panel Lock Status
  kind: query
  command: "1F 80 80 {machine_hex}"
  params:
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 40: DIRECT MEMORY SAVE ---
- id: direct_memory_save
  label: Direct Memory Save
  kind: action
  command: "28 {address_hex} {data_hex} {machine_hex}"
  params:
    - name: address
      type: integer
      description: EEPROM memory address
    - name: data
      type: integer
      description: Data byte to store
    - name: machine
      type: integer
      description: Machine number
  notes: |
    Requires knowledge of the specific machine's memory map (NOTE 21).

# --- Instruction 42: AUDIO PARAMETER SETTINGS FOR INSTRUCTIONS 22, 24, 25 ---
- id: audio_parameter_settings
  label: Audio Parameter Settings (precursor)
  kind: action
  command: "2A {input_bits_hex} {param_id_hex} {machine_hex}"
  params:
    - name: input_bits
      type: integer
      description: |
        I0: 0=input, 1=output; I1=Left; I2=Right. Combine to select channel.
    - name: param_id
      type: integer
      description: 0=Gain, 1=Bass, 2=Treble, 3=Midrange, 4=Mix On.
    - name: machine
      type: integer
      description: Machine number
  notes: |
    Sent PRIOR to Instruction 22/24/25 to define which parameter/channel (NOTE 24).
    Example for MIX mode: `2A 81 84 81` then `16 ...` (NOTE 24).

# --- Instruction 43: VIDEO PARAMETER SETTINGS FOR INSTRUCTIONS 21, 23, 26 ---
- id: video_parameter_settings
  label: Video Parameter Settings (precursor)
  kind: action
  command: "2B {io_select_hex} {param_id_hex} {machine_hex}"
  params:
    - name: io_select
      type: integer
      description: 1=Input, 2=Output
    - name: param_id
      type: integer
      description: |
        0=video gain, 1=contrast, 2=brightness, 3=colour, 4=hue,
        5=H-phase, 6=V-position.
    - name: machine
      type: integer
      description: Machine number
  notes: Sent PRIOR to Instruction 21/23/26 (NOTE 24).

# --- Instruction 44: SWITCH CONTROL DATA ---
- id: switch_control_data
  label: Switch Control Data
  kind: action
  command: "2C {input_hex} {output_hex} {machine_hex}"
  params:
    - name: input
      type: integer
      description: Control data input number (0=disconnect)
    - name: output
      type: integer
      description: Control data output number (0=broadcast to all outputs)
    - name: machine
      type: integer
      description: Machine number
  notes: |
    Output bit 6 selects DATA direction: 0=Input→Output, 1=Output→Input (NOTE 27).

# --- Instruction 45: REQUEST STATUS OF CONTROL DATA OUTPUT ---
- id: request_control_data_output_status
  label: Request Control Data Output Status
  kind: query
  command: "2D {setup_hex} {output_hex} {machine_hex}"
  params:
    - name: setup
      type: integer
      description: SETUP #
    - name: output
      type: integer
      description: Output number whose status is requested
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 55: REPLY ON ---
- id: reply_on
  label: Reply On/Off
  kind: action
  command: "37 80 {reply_hex} {machine_hex}"
  params:
    - name: reply
      type: integer
      description: 0=Off, 1=On
    - name: machine
      type: integer
      description: Machine number
  notes: |
    After sending 0 (Off), unit stops echoing replies (NOTE 26).
    Hardware REPLY DIP-switch must be ON for this to take effect.

# --- Instruction 56: CHANGE TO ASCII ---
- id: change_to_ascii
  label: Change to ASCII Protocol
  kind: action
  command: "38 80 {protocol_hex} {machine_hex}"
  params:
    - name: protocol
      type: integer
      description: 1=SVS, 2=Generic, 3=Protocol-3000
    - name: machine
      type: integer
      description: Machine number
  notes: |
    After this command, the ASCII command set is active until switched back via ASCII (NOTE 19).

# --- Instruction 57: SET AUTO-SAVE ---
- id: set_auto_save
  label: Set Auto-Save
  kind: action
  command: "39 {mode_bits_hex} 80 {machine_hex}"
  params:
    - name: mode_bits
      type: integer
      description: I3=no save, I4=auto-save. Set exactly one of these bits.
    - name: machine
      type: integer
      description: Machine number
  notes: |
    Auto-save re-enabled by default on power-up (NOTE 12).

# --- Instruction 58: EXECUTE LOADED DATA ---
- id: execute_loaded_data
  label: Execute Loaded Data
  kind: action
  command: "3A {setup_or_zero_hex} {action_hex} {machine_hex}"
  params:
    - name: setup_or_zero
      type: integer
      description: 0 or SETUP #
    - name: action
      type: integer
      description: 1=Take, 2=Cancel
    - name: machine
      type: integer
      description: Machine number

# --- Instruction 59: LOAD VIDEO DATA ---
- id: load_video_data
  label: Load Video Data
  kind: action
  command: "3B {input_hex} {output_or_setup_hex} {machine_hex}"
  params:
    - name: input
      type: integer
      description: Video input (0=disconnect, 127=load SETUP # from OUTPUT byte)
    - name: output_or_setup
      type: integer
      description: Video output (0=broadcast to all outputs) OR SETUP # when INPUT=127
    - name: machine
      type: integer
      description: Machine number
  notes: Lined-up data; execute with Instruction 58 (NOTE 22, 23).

# --- Instruction 60: LOAD AUDIO DATA ---
- id: load_audio_data
  label: Load Audio Data
  kind: action
  command: "3C {input_hex} {output_or_setup_hex} {machine_hex}"
  params:
    - name: input
      type: integer
      description: Audio input (0=disconnect, 127=load SETUP # from OUTPUT byte)
    - name: output_or_setup
      type: integer
      description: Audio output (0=broadcast to all outputs) OR SETUP # when INPUT=127
    - name: machine
      type: integer
      description: Machine number
  notes: Lined-up data; execute with Instruction 58 (NOTE 22, 23).

# --- Instruction 61: IDENTIFY MACHINE ---
- id: identify_machine
  label: Identify Machine
  kind: query
  command: "3D {request_item_hex} {output_mode_hex} {machine_hex}"
  params:
    - name: request_item
      type: integer
      description: |
        1=video machine name; 2=audio machine name; 3=video software version;
        4=audio software version; 5=RS-422 controller name;
        6=RS-422 controller version; 7=remote control name;
        8=remote software version; 9=Protocol 2000 revision;
        10=control data machine name; 11=control data software version.
    - name: output_mode
      type: integer
      description: |
        0=request first 4 digits; 1=first suffix; 2=second suffix;
        3=third suffix; 10=first prefix; 11=second prefix; 12=third prefix.
    - name: machine
      type: integer
      description: Machine number
  notes: |
    Worked example audio-machine name for 2216 reply: `7D 96 90 81` (NOTE 13).
    Version 3.5 reply: `7D 83 85 81`. First suffix 'YC' for VS-7588YC: `7D D9 C3 81`.

# --- Instruction 62: DEFINE MACHINE ---
- id: define_machine
  label: Define Machine
  kind: action
  command: "3E {param_hex} {stream_hex} {machine_hex}"
  params:
    - name: param
      type: integer
      description: |
        1=number of inputs; 2=number of outputs; 3=number of setups.
    - name: stream
      type: integer
      description: |
        1=video, 2=audio, 3=SDI, 4=remote panel,
        5=RS-422 controller, 6=control data.
    - name: machine
      type: integer
      description: Machine number
  notes: |
    Requesting outputs on machine 2: `3E 82 81 82` -> reply `7E 82 90 82` (16 outputs, NOTE 14).

# --- Instruction 63: EXTENDED DATA ---
- id: extended_data
  label: Extended Data (MSB precursor)
  kind: action
  command: "3F {msb_input_hex} {msb_output_hex} {machine_hex}"
  params:
    - name: msb_input
      type: integer
      description: 7 MSBs of INPUT data for the following instruction
    - name: msb_output
      type: integer
      description: 7 MSBs of OUTPUT data for the following instruction
    - name: machine
      type: integer
      description: Machine number
  notes: |
    Sent before Instruction 22 (or 21/23/26) to extend data to >7 bits (NOTE 20).
    Example: output 3 gain to 0x2A9 (681) -> `3F 80 85 81` then `16 83 A9 81`.
```

## Feedbacks
```yaml
# Protocol 2000 feedback = the echoed reply frame (NOTE 2) for any bi-directional
# instruction, and dedicated status replies for REQUEST opcodes (NOTE 4).
# A reply has the same instruction & input bytes, with OUTPUT set to the requested
# value and DESTINATION=1 in byte 1.
- id: echoed_reply
  type: object
  description: |
    Frame identical to the command sent by the host, but with DESTINATION bit (D) = 1.
    Returned by the device after executing any bi-directional instruction
    (instructions 0,1,2,3,4,8,9,13,18,19,20,21,22,23,24,30,42,43,44,55,56,57,58,59,60,62).

- id: video_output_status
  type: integer
  description: Reply to Instruction 5 - value indicates which video input is routed to the requested output.

- id: audio_output_status
  type: integer
  description: Reply to Instruction 6 - value indicates which audio input is routed to the requested output.

- id: vis_setting
  type: object
  description: |
    Reply to Instruction 10 - OUTPUT field: 0=VIS source code, 1=associated input/output #,
    2=vertical sync freq (Hz, 50=PAL, 60=NTSC, 127=error).

- id: breakaway_setting
  type: enum
  values: [follow, normal]
  description: Reply to Instruction 11 OUTPUT field 0 (1=FOLLOW mode active).

- id: video_audio_type_setting
  type: integer
  description: Reply to Instruction 12 echoing OUTPUT as configured signal type.

- id: highest_machine_address
  type: integer
  description: Reply to Instruction 14 - highest machine address on the bus.

- id: setup_defined_or_input_valid
  type: enum
  values: [not_defined_or_invalid, defined_or_valid]
  description: Reply to Instruction 15 OUTPUT (0=undefined/invalid, 1=defined/valid).

- id: error_or_busy_code
  type: enum
  values: [error, invalid_instruction, out_of_range, machine_busy, invalid_input, valid_input, rx_buffer_overflow]
  description: Reply to Instruction 16 OUTPUT (NOTE 9). Also sent unsolicited on input-state changes (NOTE 25).

- id: audio_parameter_value
  type: integer
  description: Reply to Instruction 25 - current audio parameter value.

- id: video_parameter_value
  type: integer
  description: Reply to Instruction 26 - current video parameter value.

- id: panel_lock_status
  type: enum
  values: [unlocked, locked]
  description: Reply to Instruction 31 OUTPUT (0=unlocked, 1=locked).

- id: control_data_output_status
  type: integer
  description: Reply to Instruction 45 - current control-data routing for the requested output.

- id: machine_identity
  type: object
  description: |
    Reply to Instruction 61. INPUT byte holds one of: machine-name digits,
    software-version whole/decimal digits, or ASCII suffix/prefix bytes;
    OUTPUT byte holds the next digit/suffix/prefix byte (NOTE 13).
```

## Variables
```yaml
# Settable parameters on machines that support them (NOTE 11).
# These are referenced via Instructions 21/22 and quantified via Instructions 42/43.
- id: video_gain
  type: integer
  description: Video gain (Instruction 43: param_id=0)
- id: contrast
  type: integer
  description: Contrast (Instruction 43: param_id=1)
- id: brightness
  type: integer
  description: Brightness (Instruction 43: param_id=2)
- id: colour
  type: integer
  description: Colour (Instruction 43: param_id=3)
- id: hue
  type: integer
  description: Hue (Instruction 43: param_id=4)
- id: h_phase
  type: integer
  description: Horizontal phase (Instruction 43: param_id=5)
- id: v_position
  type: integer
  description: Vertical position (Instruction 43: param_id=6)
- id: audio_gain
  type: integer
  description: Audio gain (Instruction 42: param_id=0)
- id: bass
  type: integer
  description: Bass (Instruction 42: param_id=1)
- id: treble
  type: integer
  description: Treble (Instruction 42: param_id=2)
- id: midrange
  type: integer
  description: Midrange (Instruction 42: param_id=3)
- id: mix_on
  type: enum
  values: [off, on]
  description: Mix mode (Instruction 42: param_id=4)
- id: setup_number
  type: integer
  description: SETUP # (0=live, 1..N=stored presets; Instructions 3/4/19/20 and NOTE 3)
```

## Events
```yaml
- id: error_or_busy_event
  description: |
    Device-initiated frame for Instruction 16 (NOTE 9, NOTE 25).
    Payload: byte1=0x10 (D=1 for unsolicited), byte2=INPUT # (when relevant),
    byte3=error/sub-status code, byte4=machine #.
- id: front_panel_action_echo
  description: |
    When a switcher action is performed on the front panel, the device emits
    NOTE 2-style frames to the controller (instruction, input, output, machine).
    Example: front-panel input 1 -> output 7 on machine 3 emits `41 81 87 83`.
- id: input_validity_change
  description: |
    For devices with input-validity detection, Instruction 16 frames are sent in
    real-time whenever an input's state changes (NOTE 25).
```

## Macros
```yaml
- id: delayed_video_switch
  description: |
    Three-step sequence to switch video after an arbitrary RS-232-controlled delay (NOTE 18).
    Steps:
      1. Arm delayed switch: instruction 7 with OUTPUT=64 (set for delayed switch).
         For input 4, output 3, machine 1: `07 80 C0 81`
      2. Issue switch code (instruction 1) - queued, not executed.
         For input 4, output 3, machine 1: `01 84 83 81`
      3. After delay, execute: instruction 7 with OUTPUT=65.
         For machine 1: `07 80 C1 81`
    Cancel with OUTPUT=66 on instruction 7 if needed.

- id: audio_gain_set_with_channel_select
  description: |
    Two-step sequence to set audio gain for a specific channel (NOTE 20, NOTE 24).
    Example: set right-input gain on input 9, value 0x2A9, machine 1.
    Step 1 (Instruction 42, channel = right input): `2A 84 80 81`
    Step 2 (Instruction 63, MSB precursor for 0x2A9): `3F 80 85 81`
    Step 3 (Instruction 22, value 0xA9, io=9, machine 1): `16 89 A9 81`

- id: seamless_rgb_switch_setup
  description: |
    Set blanking period for clean RGBHV switching (NOTE 17).
    Example: 350ms blanking (14 steps of 25ms), machine 1: `07 8E A0 81`
    Follow with the desired SWITCH VIDEO command (Instruction 1).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
<!-- UNRESOLVED: source contains no explicit safety warnings, interlocks, or
     power-on sequencing requirements beyond the auto-save behaviour on power-up.
     "lock front panel" (Instruction 30) is an operational lock rather than a
     safety interlock and is captured in Actions. -->
```

## Notes

This spec covers the full Protocol 2000 instruction catalogue as documented in
the vendor's VER-0.51 reference. Important caveats:

- The protocol itself is **shared across many Kramer models** ("Protocol 2000
  compatible" is a marketing phrase). Each device implements only a sub-set of
  the opcodes listed here. To detect support, send the corresponding REQUEST
  instruction with INPUT=127 (function-supported probe, NOTE 6) or INPUT=126
  (current-setting probe).
- **Frame format reminder.** All commands are 4 bytes. Bit 7 of bytes 2/3/4 is
  always 1. The DESTINATION bit (D, byte 1 bit 6) is 0 from PC → device and 1
  on replies. The OVR bit (byte 4 bit 6) broadcasts commands to all machines
  on the bus.
- **Machine numbering.** For single-machine serial control, use M4..M0 = 1
  and configure the device as MACHINE NUMBER = 1.
- **Replies can be globally disabled** (Instruction 55, NOTE 26). A hardware
  REPLY DIP-switch also exists and overrides the software setting.
- **Multi-frame parameter setting.** Values >7 bits require Instruction 63
  (MSB precursor) before Instruction 21/22. See NOTE 20 and the worked examples.
- **Front-panel echo.** Front-panel operations produce NOTE 2-style outbound
  frames that mirror the instruction/input/output/state-machine tuple — useful
  for keeping a controller UI in sync without polling.
- **Variant protocol families.** Instruction 56 lets the device switch to SVS
  (1), Generic ASCII (2), or Protocol-3000 (3). After switching, the next ASCII
  command takes effect.
- Instructions 17, 32, 33, 34, 35 are reserved for internal use (NOTE 10).

<!-- UNRESOLVED:
  - No source states whether the protocol also runs over TCP/IP or only over
    RS-232/RS-485. Treat as serial-only.
  - No source gives a TCP port number; omit.
  - Protocol revision field is available via Instruction 61 (request_item=9),
    but a particular device's revision number is not fixed in this spec.
  - Firmware compatibility for particular opcodes is per-device and not
    stated in this protocol document.
-->
```

---

## Provenance

```yaml
source_domains:
  - cdn.kramerav.com
  - kramerav.com
  - k.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/manuals/protocol_2000_rev0_51.pdf
  - https://www.kramerav.com/page/technical-papers
  - "https://k.kramerav.com/support/download.asp?f=35567"
retrieved_at: 2026-09-02T17:19:27.901Z
last_checked_at: 2026-09-12T22:16:57.733Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-12T22:16:57.733Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec actions match source instruction codes verbatim; transport values are stated; spec covers the full documented (non-reserved) opcode catalogue. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device-by-device opcode support varies; see Notes."
- "source contains no explicit safety warnings, interlocks, or"
- "- No source states whether the protocol also runs over TCP/IP or only over"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
