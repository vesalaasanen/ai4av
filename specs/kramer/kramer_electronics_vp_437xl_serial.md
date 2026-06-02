---
spec_id: admin/kramer-electronics-vp-437xl
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
  - www1.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/manuals/protocol_2000_rev0_51.pdf
  - https://cdn.kramerav.com/web/downloads/manuals/site-ctrl_user_guide.pdf
  - https://cdn.kramerav.com/web/downloads/manuals/rs232nul.pdf
  - https://www1.kramerav.com/page/knowledgebase-control
retrieved_at: 2026-05-21T03:34:15.568Z
last_checked_at: 2026-06-02T17:22:46.567Z
generated_at: 2026-06-02T17:22:46.567Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes generic Protocol 2000, not VP-437xl specifically. Number of inputs/outputs, supported sub-set, and any model-specific quirks are not stated."
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version not stated."
  - "VP-437xl input/output count not stated."
  - "VP-437xl-specific supported sub-set of Protocol 2000 instructions not stated."
  - "parameter value ranges for VP-437xl not stated."
  - "whether the device supports ASCII / SVS / Protocol-3000 fallback (instruction 56) is not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:46.567Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec actions found with literal opcodes in source instruction table; frame structure and baud rate parameters verified against Protocol 2000 (VER-0.51) table. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Kramer Electronics VP-437xl Control Spec

## Summary
The VP-437xl is a Kramer Electronics presentation scaler/switcher. This spec covers control via the Kramer **Protocol 2000** (VER-0.51), a 4-byte binary RS-232 (or RS-485) protocol running at 9600 baud, 8 data bits, no parity, 1 stop bit. Protocol 2000 is generic; the VP-437xl uses a sub-set of the documented instruction set per its capabilities.

<!-- UNRESOLVED: source describes generic Protocol 2000, not VP-437xl specifically. Number of inputs/outputs, supported sub-set, and any model-specific quirks are not stated. -->

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

**Frame structure (4 bytes, all values decimal unless noted):**

| Byte | Bit 7 | Purpose | Notes |
|------|-------|---------|-------|
| 1 | 0 | `D` (DESTINATION) + `N5..N0` (INSTRUCTION) | D=0 PC→device; D=1 device→PC |
| 2 | 1 | `I6..I0` (INPUT) | For switch codes, input #; otherwise per instruction |
| 3 | 1 | `O6..O0` (OUTPUT) | For switch codes, output #; otherwise per instruction |
| 4 | 1 | `OVR` + `M4..M0` (MACHINE NUMBER) | OVR=1 = broadcast; default machine = 1 (byte = 0x81) |

Worked example (NOTE 2): `01 85 88 83` switches input 5 → output 8 on machine 3. For a single machine on serial port, set machine byte = `0x81` (machine 1) and configure the device as MACHINE NUMBER = 1.

## Traits
```yaml
- routable  # inferred from instruction 1/2 (SWITCH VIDEO / SWITCH AUDIO) examples
- queryable  # inferred from REQUEST instructions (5, 6, 10, 11, 12, 14, 15, 25, 26, 31, 45, 61, 62)
- levelable  # inferred from SET/INC-DEC PARAMETER instructions 21-24
- powerable  # inferred from reset-on-power-on behavior (NOTE 1) and auto-save (instruction 57)
```

## Actions
```yaml
# All 4-byte commands use the frame: 0x{INSTR} 0x80|0x8{INPUT} 0x80|0x8{OUTPUT} 0x80|0x8{MACHINE}
# For a single machine, the 4th byte is typically 0x81. Params shown as {var}.
# Source: KRAMER Protocol 2000 (VER-0.51), instruction table.

- id: reset_video
  label: Reset Video (instruction 0)
  kind: action
  command: "00 80 80 81"
  params: []

- id: switch_video
  label: Switch Video (instruction 1)
  kind: action
  command: "01 8{input} 8{output} 8{machine}"
  params:
    - name: input
      type: integer
      description: Video input number (0 = disconnect)
    - name: output
      type: integer
      description: Video output number (0 = all outputs)
    - name: machine
      type: integer
      description: Machine number, 1-31 (1 for standalone)

- id: switch_audio
  label: Switch Audio (instruction 2)
  kind: action
  command: "02 8{input} 8{output} 8{machine}"
  params:
    - name: input
      type: integer
      description: Audio input number (0 = disconnect)
    - name: output
      type: integer
      description: Audio output number (0 = all outputs)
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: store_video_status
  label: Store Video Status (instruction 3)
  kind: action
  command: "03 8{setup} 8{store_or_delete} 8{machine}"
  params:
    - name: setup
      type: integer
      description: SETUP # (0 = current)
    - name: store_or_delete
      type: integer
      description: 0 = store, 1 = delete
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: recall_video_status
  label: Recall Video Status (instruction 4)
  kind: action
  command: "04 8{setup} 80 8{machine}"
  params:
    - name: setup
      type: integer
      description: SETUP # to recall (0 = current)
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: request_video_output_status
  label: Request Status of a Video Output (instruction 5)
  kind: query
  command: "05 8{setup} 8{output} 8{machine}"
  params:
    - name: setup
      type: integer
      description: SETUP #, or 126/127 for capability check
    - name: output
      type: integer
      description: Output number whose status is requested
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: request_audio_output_status
  label: Request Status of an Audio Output (instruction 6)
  kind: query
  command: "06 8{setup} 8{output} 8{machine}"
  params:
    - name: setup
      type: integer
      description: SETUP #, or 126/127 for capability check
    - name: output
      type: integer
      description: Output number whose status is requested
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: vis_source
  label: VIS Source (instruction 7)
  kind: action
  command: "07 8{input} 8{output} 8{machine}"
  params:
    - name: input
      type: integer
      description: Input # (when OUTPUT=6); output # (when OUTPUT=7); blank period in 25ms steps (when OUTPUT=32); 0 otherwise
    - name: output
      type: integer
      description: 0=no VIS (immediate); 1=input 1; 2=ext digital sync; 3=ext analog sync; 4=dynamic; 5=inter-machine; 6=input(INPUT); 7=output(INPUT); 8=user sync; 32=RGBHV seamless; 64=set delayed; 65=execute delayed; 66=cancel delayed
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: breakaway_setting
  label: Breakaway Setting (instruction 8)
  kind: action
  command: "08 8{input} 8{output} 8{machine}"
  params:
    - name: input
      type: integer
      description: 0=video, 1=audio; if OUTPUT=1: 0=FOLLOW, 1=Normal
    - name: output
      type: integer
      description: 0=audio-follow-video; 1=audio breakaway VIDEO; 2=AUDIO; 3=DATA; 0=FOLLOW; 1=Normal
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: video_audio_type_setting
  label: Video/Audio Type Setting (instruction 9)
  kind: action
  command: "09 8{input} 8{output} 8{machine}"
  params:
    - name: input
      type: integer
      description: 0=video, 1=audio, 2=VGA/DVI
    - name: output
      type: integer
      description: 0=CV, 1=YC, 2=YUV, 3=RGBS, 4=SDI, 5=CV+YC, 6=VGA scaler, 7=DVI; O0 unbal/bal audio; O1 dig/ana audio; O2-O4 mono/stereo; 1=640x480; 2=800x600; 3=1024x768
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: request_vis_setting
  label: Request VIS Setting (instruction 10)
  kind: query
  command: "0A 8{setup} 8{output} 8{machine}"
  params:
    - name: setup
      type: integer
      description: SETUP #, or 126/127 for capability check
    - name: output
      type: integer
      description: 0=VIS source, 1=input/output # of source, 2=vertical sync freq (Hz)
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: request_breakaway_setting
  label: Request Breakaway Setting (instruction 11)
  kind: query
  command: "0B 8{setup} 8{output} 8{machine}"
  params:
    - name: setup
      type: integer
      description: SETUP #, or 126/127 for capability check
    - name: output
      type: integer
      description: 0=request audio breakaway, 1=request FOLLOW setting
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: request_video_audio_type_setting
  label: Request Video/Audio Type Setting (instruction 12)
  kind: query
  command: "0C 8{setup} 8{output} 8{machine}"
  params:
    - name: setup
      type: integer
      description: SETUP #, or 126/127 for capability check
    - name: output
      type: integer
      description: 0=video, 1=audio, 2=VGA
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: set_highest_machine_address
  label: Set Highest Machine Address (instruction 13)
  kind: action
  command: "0D 8{input} 8{address} 8{machine}"
  params:
    - name: input
      type: integer
      description: 0=video, 1=audio
    - name: address
      type: integer
      description: Highest machine address in system
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: request_highest_machine_address
  label: Request Highest Machine Address (instruction 14)
  kind: query
  command: "0E 8{input} 80 8{machine}"
  params:
    - name: input
      type: integer
      description: 0=video, 1=audio
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: request_setup_defined_or_input_valid
  label: Request Whether Setup is Defined / Valid Input Detected (instruction 15)
  kind: query
  command: "0F 8{setup_or_input} 8{check_mode} 8{machine}"
  params:
    - name: setup_or_input
      type: integer
      description: SETUP # or input #
    - name: check_mode
      type: integer
      description: 0=check if setup defined, 1=check if input valid
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: error_busy
  label: Error / Busy (instruction 16, unsolicited)
  kind: event
  command: "10 8{input} 8{output} 8{machine}"
  params:
    - name: input
      type: integer
      description: Input # (when OUTPUT=4 or 5)
    - name: output
      type: integer
      description: 0=error, 1=invalid instruction, 2=out of range, 3=machine busy, 4=invalid input, 5=valid input, 6=RX buffer overflow
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: reset_audio
  label: Reset Audio (instruction 18)
  kind: action
  command: "12 80 80 81"
  params: []

- id: store_audio_status
  label: Store Audio Status (instruction 19)
  kind: action
  command: "13 8{setup} 8{store_or_delete} 8{machine}"
  params:
    - name: setup
      type: integer
      description: SETUP #
    - name: store_or_delete
      type: integer
      description: 0=store, 1=delete
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: recall_audio_status
  label: Recall Audio Status (instruction 20)
  kind: action
  command: "14 8{setup} 80 8{machine}"
  params:
    - name: setup
      type: integer
      description: SETUP # to recall
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: set_video_parameter
  label: Set Video Parameter (instruction 21)
  kind: action
  command: "15 8{io_number} 8{value} 8{machine}"
  params:
    - name: io_number
      type: integer
      description: Input/output number whose video parameter to set (0=all)
    - name: value
      type: integer
      description: Parameter value (sub-mnemonic defined by instruction 43)
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: set_audio_parameter
  label: Set Audio Parameter (instruction 22)
  kind: action
  command: "16 8{io_number} 8{value} 8{machine}"
  params:
    - name: io_number
      type: integer
      description: Input/output number (0=all)
    - name: value
      type: integer
      description: Parameter value (sub-mnemonic defined by instruction 42)
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: inc_dec_video_parameter
  label: Increase / Decrease Video Parameter (instruction 23)
  kind: action
  command: "17 8{io_number} 8{operation} 8{machine}"
  params:
    - name: io_number
      type: integer
      description: Input/output number (0=all)
    - name: operation
      type: integer
      description: 0=inc gain, 1=dec gain, 2=inc contrast, 3=dec contrast, 4=inc bright, 5=dec bright, 6=inc color, 7=dec color, 8=inc hue, 9=dec hue, 16=inc H-phase, 17=dec H-phase, 18=inc V-pos, 19=dec V-pos
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: inc_dec_audio_parameter
  label: Increase / Decrease Audio Parameter (instruction 24)
  kind: action
  command: "18 8{io_number} 8{operation} 8{machine}"
  params:
    - name: io_number
      type: integer
      description: Input/output number (0=all)
    - name: operation
      type: integer
      description: 0=inc output, 1=dec output, 2=inc L out, 3=dec L out, 4=inc R out, 5=dec R out, 6=inc input, 7=dec input, 8=inc L in, 9=dec L in, 10=inc R in, 11=dec R in
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: request_audio_parameter
  label: Request Audio Parameter (instruction 25)
  kind: query
  command: "19 8{io_number} 80 8{machine}"
  params:
    - name: io_number
      type: integer
      description: Input/output number whose parameter is requested
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: request_video_parameter
  label: Request Video Parameter (instruction 26)
  kind: query
  command: "1A 8{io_number} 80 8{machine}"
  params:
    - name: io_number
      type: integer
      description: Input/output number whose video parameter is requested
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: lock_front_panel
  label: Lock Front Panel (instruction 30)
  kind: action
  command: "1E 8{lock_state} 80 8{machine}"
  params:
    - name: lock_state
      type: integer
      description: 0=unlocked, 1=locked
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: request_panel_lock
  label: Request Whether Panel is Locked (instruction 31)
  kind: query
  command: "1F 80 80 8{machine}"
  params:
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: direct_memory_save
  label: Direct Memory Save (instruction 40)
  kind: action
  command: "28 8{memory_address} 8{data} 8{machine}"
  params:
    - name: memory_address
      type: integer
      description: EEPROM address
    - name: data
      type: integer
      description: Data byte to store
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: audio_parameter_settings
  label: Audio Parameter Settings for instructions 22/24/25 (instruction 42)
  kind: action
  command: "2A 8{input_bits} 8{output} 8{machine}"
  params:
    - name: input_bits
      type: integer
      description: I0=0 input / 1 output; I1=Left; I2=Right
    - name: output
      type: integer
      description: 0=Gain, 1=Bass, 2=Treble, 3=Midrange, 4=Mix On
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: video_parameter_settings
  label: Video Parameter Settings for instructions 21/23/26 (instruction 43)
  kind: action
  command: "2B 8{io_select} 8{parameter} 8{machine}"
  params:
    - name: io_select
      type: integer
      description: 1=Input, 2=Output
    - name: parameter
      type: integer
      description: 0=gain, 1=contrast, 2=brightness, 3=colour, 4=hue, 5=H-phase, 6=V-position
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: switch_control_data
  label: Switch Control Data (instruction 44)
  kind: action
  command: "2C 8{input} 8{output} 8{machine}"
  params:
    - name: input
      type: integer
      description: Control data input (0=disconnect)
    - name: output
      type: integer
      description: Control data output (0=all); bit 6 = 1 reverses DATA direction
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: request_control_data_output_status
  label: Request Status of Control Data Output (instruction 45)
  kind: query
  command: "2D 8{setup} 8{output} 8{machine}"
  params:
    - name: setup
      type: integer
      description: SETUP #
    - name: output
      type: integer
      description: Output number whose status is requested
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: reply_on
  label: Reply On/Off (instruction 55)
  kind: action
  command: "37 80 8{state} 8{machine}"
  params:
    - name: state
      type: integer
      description: 0=Off, 1=On
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: change_to_ascii
  label: Change to ASCII / Protocol switch (instruction 56)
  kind: action
  command: "38 80 8{protocol} 8{machine}"
  params:
    - name: protocol
      type: integer
      description: 1=SVS protocol, 2=Generic protocol, 3=Protocol-3000
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: set_auto_save
  label: Set Auto-Save (instruction 57)
  kind: action
  command: "39 8{auto_save_bits} 80 8{machine}"
  params:
    - name: auto_save_bits
      type: integer
      description: I3=no save, I4=auto-save
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: execute_loaded_data
  label: Execute Loaded Data (instruction 58)
  kind: action
  command: "3A 8{setup} 8{action} 8{machine}"
  params:
    - name: setup
      type: integer
      description: SETUP #, or 0
    - name: action
      type: integer
      description: 1=Take, 2=Cancel
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: load_video_data
  label: Load Video Data (instruction 59)
  kind: action
  command: "3B 8{input} 8{output_or_setup} 8{machine}"
  params:
    - name: input
      type: integer
      description: Video input (0=disconnect, 127=load SETUP #)
    - name: output_or_setup
      type: integer
      description: Video output (0=all) or SETUP #
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: load_audio_data
  label: Load Audio Data (instruction 60)
  kind: action
  command: "3C 8{input} 8{output_or_setup} 8{machine}"
  params:
    - name: input
      type: integer
      description: Audio input (0=disconnect, 127=load SETUP #)
    - name: output_or_setup
      type: integer
      description: Audio output (0=all) or SETUP #
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: identify_machine
  label: Identify Machine (instruction 61)
  kind: query
  command: "3D 8{input} 8{output} 8{machine}"
  params:
    - name: input
      type: integer
      description: 1=video name, 2=audio name, 3=video SW ver, 4=audio SW ver, 5=RS422 ctrl name, 6=RS422 ctrl ver, 7=remote name, 8=remote SW ver, 9=P2000 revision, 10=ctrl data machine name, 11=ctrl data SW ver
    - name: output
      type: integer
      description: 0=first 4 digits; 1,2,3=first/second/third suffix; 10,11,12=first/second/third prefix
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: define_machine
  label: Define Machine (instruction 62)
  kind: action
  command: "3E 8{input} 8{output} 8{machine}"
  params:
    - name: input
      type: integer
      description: 1=#inputs, 2=#outputs, 3=#setups
    - name: output
      type: integer
      description: 1=video, 2=audio, 3=SDI, 4=remote panel, 5=RS-422 ctrl, 6=ctrl data
    - name: machine
      type: integer
      description: Machine number, 1-31

- id: extended_data
  label: Extended Data (instruction 63, MSB prefix)
  kind: action
  command: "3F 8{input_msbs} 8{output_msbs} 8{machine}"
  params:
    - name: input_msbs
      type: integer
      description: 7 MSBs for next instruction's INPUT
    - name: output_msbs
      type: integer
      description: 7 MSBs for next instruction's OUTPUT
    - name: machine
      type: integer
      description: Machine number, 1-31
```

## Feedbacks
```yaml
# All REQUEST instructions return values in the OUTPUT byte of the reply frame
# (same 4-byte frame, with byte 1 DESTINATION bit D=1).
- id: error_status
  type: enum
  values: [error, invalid_instruction, out_of_range, machine_busy, invalid_input, valid_input, rx_buffer_overflow]
  source_instruction: 16

- id: reply_payload
  type: bytes
  description: "Generic reply: device echoes the 4-byte command with byte 1 D-bit set high (e.g. command `01 85 88 81` → reply `41 85 88 81`)."

- id: setup_defined
  type: enum
  values: [undefined, defined]
  source_instruction: 15

- id: input_valid
  type: enum
  values: [invalid, valid]
  source_instruction: 15

- id: panel_locked
  type: enum
  values: [unlocked, locked]
  source_instruction: 31

- id: vis_source_state
  type: integer
  source_instruction: 7
  description: "Returned in OUTPUT byte per instruction 7 encoding"

- id: breakaway_state
  type: integer
  source_instruction: 8
  description: "0=follow video, 1=normal; sub-mode encoded in OUTPUT byte"

- id: video_audio_type_state
  type: integer
  source_instruction: 9
  description: "Type code per instruction 9 OUTPUT byte table"

- id: machine_name
  type: bytes
  source_instruction: 61
  description: "Returned as INPUT+OUTPUT decimal pair (e.g. 22/16 = '2216')"

- id: software_version
  type: string
  source_instruction: 61
  description: "Format: INPUT = digits before decimal, OUTPUT = digits after"

- id: protocol_2000_revision
  type: integer
  source_instruction: 61
  description: "Protocol 2000 revision number (source says VER-0.51)"

- id: video_output_status
  type: bytes
  source_instruction: 5
  description: "Status of requested video output, format per machine"

- id: audio_output_status
  type: bytes
  source_instruction: 6
  description: "Status of requested audio output, format per machine"

- id: control_data_output_status
  type: bytes
  source_instruction: 45
  description: "Status of requested control-data output"

- id: number_of_inputs
  type: integer
  source_instruction: 62

- id: number_of_outputs
  type: integer
  source_instruction: 62

- id: number_of_setups
  type: integer
  source_instruction: 62

- id: highest_machine_address
  type: integer
  source_instruction: 14
```

## Variables
```yaml
# VP-437xl exposes standard audio/video parameters through instructions 21/22/23/24.
# Sub-mnemonic selection is sent ahead via instruction 42 (audio) or 43 (video).
- id: video_gain
  type: integer
  range: "0-255 (8-bit) or 0-16383 with extended-data prefix (instruction 63)"
  source_instruction: 21
  parameter_code: 0

- id: video_contrast
  type: integer
  source_instruction: 21
  parameter_code: 1

- id: video_brightness
  type: integer
  source_instruction: 21
  parameter_code: 2

- id: video_colour
  type: integer
  source_instruction: 21
  parameter_code: 3

- id: video_hue
  type: integer
  source_instruction: 21
  parameter_code: 4

- id: video_h_phase
  type: integer
  source_instruction: 21
  parameter_code: 5

- id: video_v_position
  type: integer
  source_instruction: 21
  parameter_code: 6

- id: audio_gain
  type: integer
  range: "0-255 (8-bit) or extended"
  source_instruction: 22
  parameter_code: 0

- id: audio_bass
  type: integer
  source_instruction: 22
  parameter_code: 1

- id: audio_treble
  type: integer
  source_instruction: 22
  parameter_code: 2

- id: audio_midrange
  type: integer
  source_instruction: 22
  parameter_code: 3

- id: audio_mix
  type: boolean
  source_instruction: 22
  parameter_code: 4
  description: "Mix On"
```

## Events
```yaml
- id: power_on_reset
  description: "On power-up the device sends instruction 0 (RESET VIDEO) to the PC."
  source: NOTE_1

- id: input_validity_change
  description: "When the device detects a change in input validity, it sends instruction 16 with OUTPUT=4 (invalid) or 5 (valid). E.g. input 3 invalid → `10 83 84 81`."
  source: NOTE_25

- id: front_panel_action
  description: "Any front-panel keystroke that performs a bi-directional instruction causes the device to send the same code to the PC with byte 1 D-bit = 1."
  source: NOTE_2
```

## Macros
```yaml
# Worked example from source (NOTE 18): delayed switch of input 4 → output 3
- id: delayed_switch_input4_to_output3
  description: "Three-step sequence that arms, queues, and executes a delayed switch."
  steps:
    - "07 80 C0 81   # instruction 7, OUTPUT=64: Set for delayed switch"
    - "01 84 83 81   # instruction 1: queue switch input 4 → output 3 (not yet executed)"
    - "07 80 C1 81   # instruction 7, OUTPUT=65: Execute delayed switch"

# Worked example from source (NOTE 17): 350ms RGBHV blanking
- id: seamless_switch_350ms_blanking
  description: "Set blanking period for seamless RGBHV switching."
  steps:
    - "07 8E A0 81   # instruction 7, INPUT=14 (14×25ms=350ms), OUTPUT=32 (RGBHV seamless)"

# Worked example (NOTE 24): request right-input audio gain
- id: request_right_input_audio_gain
  description: "Sub-mnemonic prefix + request."
  steps:
    - "2A 84 80 81   # instruction 42: I0=0 (input), I2=1 (right), OUTPUT=0 (gain)"
    - "19 89 81 81   # instruction 25: request parameter of input 9"

# Worked example (NOTE 20): set audio gain of output 3 to 681 (0x2A9)
- id: set_audio_gain_output3_to_681
  description: "Extended-data prefix for >7-bit values."
  steps:
    - "3F 80 85 81   # instruction 63: OUTPUT MSBs = 0x05 (top 7 bits of 0x2A9)"
    - "16 83 A9 81   # instruction 22: output 3, value 0xA9 lower byte"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. No populate.
```

## Notes
- Protocol header identifies the document as **Protocol 2000, version 0.51**. This is a generic Kramer protocol; the VP-437xl implements a sub-set (per the document's own statement: "Protocol 2000 compatible does not imply that a machine includes all of the commands below").
- Default serial config: 9600 baud, 8 data bits, no parity, 1 stop bit. RS-232 uses a null-modem cable. RS-485 also supported at the same framing.
- Reply mechanism (NOTE 2): the device echoes the 4-byte command with byte 1 bit 6 (DESTINATION) set to 1. Disable via instruction 55 (`reply_on` action with state=0).
- Machine number 1 is the default for a single machine on a serial port. Machine byte 0x81 = bit7=1 + M4..M0=00001. Set the OVR bit (machine byte 0xC1) to broadcast; addressed machine still replies.
- SETUP # 0 = present (live) setting; SETUP # 1+ = stored presets (NOTE 3).
- Reset on power-up is a device-initiated event (NOTE 1); reception of the reset code by the device is a separate action (instruction 0).
- Delayed switching (NOTE 18): arm with OUTPUT=64, queue with instruction 1, execute with OUTPUT=65. Mode auto-cancels after execution.
- VP-437xl-specific facts (number of inputs/outputs, exact parameter range, exact supported sub-set) are not stated in this refined source — `compatible_with.firmware` and per-parameter ranges remain unresolved.
- Source is a single shared Protocol 2000 manual, not a VP-437xl datasheet; spec should be considered a **best-effort draft** until cross-checked against the VP-437xl user manual and a live unit.

<!-- UNRESOLVED: firmware version not stated. -->
<!-- UNRESOLVED: VP-437xl input/output count not stated. -->
<!-- UNRESOLVED: VP-437xl-specific supported sub-set of Protocol 2000 instructions not stated. -->
<!-- UNRESOLVED: parameter value ranges for VP-437xl not stated. -->
<!-- UNRESOLVED: whether the device supports ASCII / SVS / Protocol-3000 fallback (instruction 56) is not stated. -->
```

Spec drafted. All 39+ Protocol 2000 instructions enumerated, plus reply/busy events and three worked-example macros from source. Caveman resume.

## Provenance

```yaml
source_domains:
  - cdn.kramerav.com
  - www1.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/manuals/protocol_2000_rev0_51.pdf
  - https://cdn.kramerav.com/web/downloads/manuals/site-ctrl_user_guide.pdf
  - https://cdn.kramerav.com/web/downloads/manuals/rs232nul.pdf
  - https://www1.kramerav.com/page/knowledgebase-control
retrieved_at: 2026-05-21T03:34:15.568Z
last_checked_at: 2026-06-02T17:22:46.567Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:46.567Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec actions found with literal opcodes in source instruction table; frame structure and baud rate parameters verified against Protocol 2000 (VER-0.51) table. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes generic Protocol 2000, not VP-437xl specifically. Number of inputs/outputs, supported sub-set, and any model-specific quirks are not stated."
- "source contains no safety warnings, interlock procedures, or"
- "firmware version not stated."
- "VP-437xl input/output count not stated."
- "VP-437xl-specific supported sub-set of Protocol 2000 instructions not stated."
- "parameter value ranges for VP-437xl not stated."
- "whether the device supports ASCII / SVS / Protocol-3000 fallback (instruction 56) is not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
