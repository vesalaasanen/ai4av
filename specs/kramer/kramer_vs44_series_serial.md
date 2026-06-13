---
spec_id: admin/kramer-vs44hc
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kramer VS-44HC Control Spec"
manufacturer: Kramer
model_family: VS-44HC
aliases: []
compatible_with:
  manufacturers:
    - Kramer
  models:
    - VS-44HC
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.kramerav.com
  - kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/manuals/vs-44hc.pdf
  - https://cdn.kramerav.com/web/downloads/manuals/vs-44hdcp_rev_6.pdf
  - https://cdn.kramerav.com/web/downloads/manuals/vs-44hn_rev_12.pdf
  - https://www.kramerav.com
retrieved_at: 2026-06-01T20:37:37.966Z
last_checked_at: 2026-06-12T19:25:08.764Z
generated_at: 2026-06-12T19:25:08.764Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no power on/off command documented"
  - "Ethernet control not documented — Ethernet config mentioned for factory reset only"
  - "no continuous variable ranges documented beyond parameter value fields in actions"
  - "no safety warnings or interlock procedures documented in source"
  - "protocol version 0.46 stated — unclear if other versions exist or are compatible"
  - "RS-485 termination via DIP 8 mentioned but no RS-485-specific protocol differences documented"
  - "no power on/off command — reset instructions restore power-down state but do not control power"
  - "ASCII protocol mode (instruction 56) mentioned but ASCII command set not documented in source"
  - "no timing/latency specifications for command processing"
  - "memory map for direct memory save (instruction 40) not documented"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:25:08.764Z
  matched_actions: 38
  action_count: 38
  confidence: medium
  summary: "All 38 spec actions found in source Table 18 instruction codes; all transport parameters verified; coverage ratio 38/40 exceeds 0.9 threshold. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Kramer VS-44HC Control Spec

## Summary
4×4 video and audio matrix switcher controlled via Kramer Protocol 2000 (v0.46) over RS-232 or RS-485. Binary 4-byte command protocol supporting video/audio switching, store/recall setups, VIS sync, breakaway, and per-channel video/audio parameter adjustment. Up to 15 units daisy-chained via RS-485.

<!-- UNRESOLVED: no power on/off command documented -->
<!-- UNRESOLVED: Ethernet control not documented — Ethernet config mentioned for factory reset only -->

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
traits:
  - routable     # inferred: switch video/audio input to output commands
  - queryable    # inferred: request status, parameter, VIS, breakaway query commands
  - levelable    # inferred: video gain/contrast/brightness/color/hue, audio gain/bass/treble/midrange controls
```

## Actions
```yaml
actions:
  - id: reset_video
    label: Reset Video
    kind: action
    command: "00 80 80 {0x80+machine}"
    params:
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | machine. Default 1."
    notes: "Resets to power-down video settings. Also sent by switcher on power-up (NOTE 1)."

  - id: switch_video
    label: Switch Video
    kind: action
    command: "01 {0x80+input} {0x80+output} {0x80+machine}"
    params:
      - name: input
        type: integer
        description: "Video input (1-4, 0=disconnect). Byte 2 = 0x80 | value."
      - name: output
        type: integer
        description: "Video output (1-4, 0=all outputs). Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value. Default 1."
    notes: "Bi-directional (NOTE 2). Switcher echoes command with DESTINATION bit set. Example: 01 85 88 83 = switch input 5 to output 8 on machine 3."

  - id: switch_audio
    label: Switch Audio
    kind: action
    command: "02 {0x80+input} {0x80+output} {0x80+machine}"
    params:
      - name: input
        type: integer
        description: "Audio input (1-4, 0=disconnect). Byte 2 = 0x80 | value."
      - name: output
        type: integer
        description: "Audio output (1-4, 0=all outputs). Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value. Default 1."
    notes: "Bi-directional (NOTE 2)."

  - id: store_video_status
    label: Store Video Status
    kind: action
    command: "03 {0x80+setup} {0x80+store_delete} {0x80+machine}"
    params:
      - name: setup
        type: integer
        description: "Setup number. Byte 2 = 0x80 | setup #."
      - name: store_delete
        type: integer
        description: "0=store, 1=delete. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Bi-directional (NOTE 2). SETUP #0 = present setting. SETUP #1+ = saved in memory (NOTE 3)."

  - id: recall_video_status
    label: Recall Video Status
    kind: action
    command: "04 {0x80+setup} 80 {0x80+machine}"
    params:
      - name: setup
        type: integer
        description: "Setup number to recall. Byte 2 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Bi-directional (NOTE 2)."

  - id: request_video_output_status
    label: Request Video Output Status
    kind: query
    command: "05 {0x80+setup} {0x80+output} {0x80+machine}"
    params:
      - name: setup
        type: integer
        description: "Setup number. Byte 2 = 0x80 | value."
      - name: output
        type: integer
        description: "Output number whose status is requested. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Reply: same instruction and input returned, output = requested parameter value (NOTE 4)."

  - id: request_audio_output_status
    label: Request Audio Output Status
    kind: query
    command: "06 {0x80+setup} {0x80+output} {0x80+machine}"
    params:
      - name: setup
        type: integer
        description: "Setup number. Byte 2 = 0x80 | value."
      - name: output
        type: integer
        description: "Output number whose status is requested. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Reply as per NOTE 4."

  - id: set_vis_source
    label: Set VIS Source
    kind: action
    command: "07 {0x80+input} {0x80+output} {0x80+machine}"
    params:
      - name: input
        type: integer
        description: "Input # when output=6; output # when output=7; blank period in 25ms steps when output=32; 0 otherwise. Byte 2 = 0x80 | value."
      - name: output
        type: integer
        description: "0=No VIS (immediate), 1=Input #1, 2=Ext digital sync, 3=Ext analog sync, 4=Dynamic sync, 5=Inter-machine sync, 6=Input #(input byte), 7=Output #(input byte), 8=User-defined sync, 32=RGBHV seamless switching, 64=Set delayed switch, 65=Execute delayed switch, 66=Cancel delayed switch. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Bi-directional (NOTE 2). For seamless switching, set blanking period in 25ms steps (NOTE 17). Delayed switch: send set(64) then switch, then execute(65) after delay (NOTE 18). Example seamless: 07 8E A0 81 = 350ms blanking."

  - id: set_breakaway
    label: Set Breakaway
    kind: action
    command: "08 {0x80+input} {0x80+output} {0x80+machine}"
    params:
      - name: input
        type: integer
        description: "0 or 1. Byte 2 = 0x80 | value."
      - name: output
        type: integer
        description: "For input=0: 0=audio-follow-video, 1=audio breakaway. For input=1: 0=FOLLOW mode, 1=Normal mode. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Bi-directional (NOTE 2). When OVR bit set, video commands universal - FOLLOW mode machines execute video instructions (NOTE 15)."

  - id: set_video_audio_type
    label: Set Video/Audio Type
    kind: action
    command: "09 {0x80+input} {0x80+output} {0x80+machine}"
    params:
      - name: input
        type: integer
        description: "0=video, 1=audio, 2=VGA and DVI. Byte 2 = 0x80 | value."
      - name: output
        type: integer
        description: "For video: 0=CV, 1=YC, 2=YUV, 3=RGBS, 4=SDI, 5=CV+YC, 6=VGA scaler, 7=DVI. For audio: bit0=balanced, bit1=digital, bits2-4=stereo. For VGA/DVI: 1=640x480, 2=800x600, 3=1024x768. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Bi-directional (NOTE 2)."

  - id: request_vis_setting
    label: Request VIS Setting
    kind: query
    command: "0A {0x80+input} {0x80+output} {0x80+machine}"
    params:
      - name: input
        type: integer
        description: "Setup #, or 126=current setting, or 127=check if function defined. Byte 2 = 0x80 | value."
      - name: output
        type: integer
        description: "0=VIS source, 1=input#/output# of source, 2=vertical sync freq (Hz). Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Reply as per instruction 7 definitions (NOTE 4, NOTE 6, NOTE 7)."

  - id: request_breakaway_setting
    label: Request Breakaway Setting
    kind: query
    command: "0B {0x80+input} {0x80+output} {0x80+machine}"
    params:
      - name: input
        type: integer
        description: "Setup #, or 126/127. Byte 2 = 0x80 | value."
      - name: output
        type: integer
        description: "0=request audio breakaway, 1=request FOLLOW setting. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Reply as per instruction 8 definitions (NOTE 4, NOTE 6)."

  - id: request_video_audio_type_setting
    label: Request Video/Audio Type Setting
    kind: query
    command: "0C {0x80+input} {0x80+output} {0x80+machine}"
    params:
      - name: input
        type: integer
        description: "Setup #, or 126/127. Byte 2 = 0x80 | value."
      - name: output
        type: integer
        description: "0=video, 1=audio, 2=VGA. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "NOTE 4, NOTE 6."

  - id: set_highest_machine_address
    label: Set Highest Machine Address
    kind: action
    command: "0D {0x80+input} {0x80+address} {0x80+machine}"
    params:
      - name: input
        type: integer
        description: "0=for video, 1=for audio. Byte 2 = 0x80 | value."
      - name: address
        type: integer
        description: "Highest machine address. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Bi-directional (NOTE 2)."

  - id: request_highest_machine_address
    label: Request Highest Machine Address
    kind: query
    command: "0E {0x80+input} 80 {0x80+machine}"
    params:
      - name: input
        type: integer
        description: "0=for video, 1=for audio. Byte 2 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "NOTE 4."

  - id: request_setup_defined_valid_input
    label: Request Whether Setup Is Defined / Valid Input
    kind: query
    command: "0F {0x80+setup_or_input} {0x80+check_type} {0x80+machine}"
    params:
      - name: setup_or_input
        type: integer
        description: "Setup # or Input #. Byte 2 = 0x80 | value."
      - name: check_type
        type: integer
        description: "0=check if setup defined, 1=check if input valid. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Reply: output=0 if not defined/no valid input, output=1 if defined/valid (NOTE 8)."

  - id: reset_audio
    label: Reset Audio
    kind: action
    command: "12 80 80 {0x80+machine}"
    params:
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Resets to power-down audio settings."

  - id: store_audio_status
    label: Store Audio Status
    kind: action
    command: "13 {0x80+setup} {0x80+store_delete} {0x80+machine}"
    params:
      - name: setup
        type: integer
        description: "Setup number. Byte 2 = 0x80 | value."
      - name: store_delete
        type: integer
        description: "0=store, 1=delete. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Bi-directional (NOTE 2)."

  - id: recall_audio_status
    label: Recall Audio Status
    kind: action
    command: "14 {0x80+setup} 80 {0x80+machine}"
    params:
      - name: setup
        type: integer
        description: "Setup number to recall. Byte 2 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Bi-directional (NOTE 2)."

  - id: set_video_parameter
    label: Set Video Parameter
    kind: action
    command: "15 {0x80+input_output} {0x80+value} {0x80+machine}"
    params:
      - name: input_output
        type: integer
        description: "Input/output number whose parameter is set (0=all). Byte 2 = 0x80 | value."
      - name: value
        type: integer
        description: "Parameter value. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Precede with instruction 43 (set_video_parameter_context) to specify which parameter (gain/contrast/brightness/etc.). Bi-directional (NOTE 2, NOTE 11, NOTE 24)."

  - id: set_audio_parameter
    label: Set Audio Parameter
    kind: action
    command: "16 {0x80+input_output} {0x80+value} {0x80+machine}"
    params:
      - name: input_output
        type: integer
        description: "Input/output number whose parameter is set (0=all). Byte 2 = 0x80 | value."
      - name: value
        type: integer
        description: "Parameter value. For delay: value in ms (1-127). Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Precede with instruction 42 (set_audio_parameter_context) to specify which parameter (gain/bass/treble/midrange). For delay >127ms, precede with instruction 63 (extended_data). Example: 16 81 85 81 = set delay 5ms on input 2, machine 1. Bi-directional (NOTE 2, NOTE 11, NOTE 20, NOTE 24)."

  - id: increase_decrease_video_parameter
    label: Increase/Decrease Video Parameter
    kind: action
    command: "17 {0x80+input_output} {0x80+operation} {0x80+machine}"
    params:
      - name: input_output
        type: integer
        description: "Input/output number (0=all). Byte 2 = 0x80 | value."
      - name: operation
        type: integer
        description: "0=inc gain, 1=dec gain, 2=inc contrast, 3=dec contrast, 4=inc brightness, 5=dec brightness, 6=inc color, 7=dec color, 8=inc hue, 9=dec hue, 16=inc H-phase, 17=dec H-phase, 18=inc V-position, 19=dec V-position. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Precede with instruction 43 (set_video_parameter_context). NOTE 24."

  - id: increase_decrease_audio_parameter
    label: Increase/Decrease Audio Parameter
    kind: action
    command: "18 {0x80+input_output} {0x80+operation} {0x80+machine}"
    params:
      - name: input_output
        type: integer
        description: "Input/output number (0=all). Byte 2 = 0x80 | value."
      - name: operation
        type: integer
        description: "0=inc output, 1=dec output, 2=inc left output, 3=dec left output, 4=inc right output, 5=dec right output, 6=inc input, 7=dec input, 8=inc left input, 9=dec left input, 10=inc right input, 11=dec right input. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Precede with instruction 42 (set_audio_parameter_context). Example: 18 82 8C 81 = increase IN1 audio delay by 1ms. NOTE 24."

  - id: request_audio_parameter
    label: Request Audio Parameter
    kind: query
    command: "19 {0x80+input_output} 80 {0x80+machine}"
    params:
      - name: input_output
        type: integer
        description: "Input/output number whose parameter is requested. Byte 2 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Precede with instruction 42 (set_audio_parameter_context). Reply: output byte = parameter value (NOTE 4, NOTE 6, NOTE 24)."

  - id: request_video_parameter
    label: Request Video Parameter
    kind: query
    command: "1A {0x80+input_output} 80 {0x80+machine}"
    params:
      - name: input_output
        type: integer
        description: "Input/output number whose parameter is requested. Byte 2 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Precede with instruction 43 (set_video_parameter_context). Reply: output byte = parameter value (NOTE 4, NOTE 6, NOTE 24)."

  - id: lock_front_panel
    label: Lock Front Panel
    kind: action
    command: "1E {0x80+lock} 80 {0x80+machine}"
    params:
      - name: lock
        type: integer
        description: "0=panel unlocked, 1=panel locked. Byte 2 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Bi-directional (NOTE 2)."

  - id: request_panel_locked
    label: Request Whether Panel Is Locked
    kind: query
    command: "1F 80 80 {0x80+machine}"
    params:
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Reply: output=0 if unlocked, output=1 if locked (NOTE 4, NOTE 16)."

  - id: direct_memory_save
    label: Direct Memory Save
    kind: action
    command: "28 {0x80+address} {0x80+data} {0x80+machine}"
    params:
      - name: address
        type: integer
        description: "Memory address. Byte 2 = 0x80 | value."
      - name: data
        type: integer
        description: "Data to store. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Stores data in non-volatile memory (EEPROM). Requires knowledge of machine memory map (NOTE 21)."

  - id: set_audio_parameter_context
    label: Set Audio Parameter Context
    kind: action
    command: "2A {0x80+input_output_type} {0x80+parameter} {0x80+machine}"
    params:
      - name: input_output_type
        type: integer
        description: "Bit0: 0=input, 1=output. Bit1: Left. Bit2: Right. Byte 2 = 0x80 | value."
      - name: parameter
        type: integer
        description: "0=Gain, 1=Bass, 2=Treble, 3=Midrange. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Must be sent BEFORE instructions 22, 24, or 25 to specify which audio parameter (NOTE 24). Example: 2A 84 80 81 then 19 89 81 81 = request right input #9 audio gain."

  - id: set_video_parameter_context
    label: Set Video Parameter Context
    kind: action
    command: "2B {0x80+input_output_type} {0x80+parameter} {0x80+machine}"
    params:
      - name: input_output_type
        type: integer
        description: "1=Input, 2=Output. Byte 2 = 0x80 | value."
      - name: parameter
        type: integer
        description: "0=video gain, 1=contrast, 2=brightness, 3=color, 4=hue, 5=H-phase, 6=V-position. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Must be sent BEFORE instructions 21, 23, or 26 to specify which video parameter (NOTE 24)."

  - id: change_to_ascii
    label: Change to ASCII Protocol
    kind: action
    command: "38 80 {0x80+protocol} {0x80+machine}"
    params:
      - name: protocol
        type: integer
        description: "1=SVS protocol, 2=Generic protocol. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "After sent, unit responds to ASCII command set. Must send ASCII command to return to HEX mode (NOTE 19)."

  - id: set_auto_save
    label: Set Auto-Save
    kind: action
    command: "39 {0x80+save_mode} 80 {0x80+machine}"
    params:
      - name: save_mode
        type: integer
        description: "Bit3=no save, Bit4=auto-save. Byte 2 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Auto-save enabled on power-up by default. Bi-directional (NOTE 2, NOTE 12)."

  - id: execute_loaded_data
    label: Execute Loaded Data
    kind: action
    command: "3A {0x80+setup} {0x80+action} {0x80+machine}"
    params:
      - name: setup
        type: integer
        description: "0 or setup number. Byte 2 = 0x80 | value."
      - name: action
        type: integer
        description: "1=Take (execute), 2=Cancel. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Executes or cancels previously loaded data via instructions 59/60 (NOTE 3, NOTE 22)."

  - id: load_video_data
    label: Load Video Data
    kind: action
    command: "3B {0x80+input} {0x80+output} {0x80+machine}"
    params:
      - name: input
        type: integer
        description: "Video input (0=disconnect, 127=load SETUP #). Byte 2 = 0x80 | value."
      - name: output
        type: integer
        description: "Video output (0=all outputs) or SETUP #. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Loads switching data for later execution via instruction 58 (NOTE 3, NOTE 22, NOTE 23)."

  - id: load_audio_data
    label: Load Audio Data
    kind: action
    command: "3C {0x80+input} {0x80+output} {0x80+machine}"
    params:
      - name: input
        type: integer
        description: "Audio input (0=disconnect, 127=load SETUP #). Byte 2 = 0x80 | value."
      - name: output
        type: integer
        description: "Audio output (0=all outputs) or SETUP #. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Loads switching data for later execution via instruction 58 (NOTE 3, NOTE 22, NOTE 23)."

  - id: identify_machine
    label: Identify Machine
    kind: query
    command: "3D {0x80+info_type} {0x80+part} {0x80+machine}"
    params:
      - name: info_type
        type: integer
        description: "1=video machine name, 2=audio machine name, 3=video software version, 4=audio software version, 5=RS422 controller name, 6=RS422 controller version, 7=remote control name, 8=remote software version, 9=Protocol 2000 revision. Byte 2 = 0x80 | value."
      - name: part
        type: integer
        description: "0=first 4 digits, 1=first suffix, 2=second suffix, 3=third suffix, 10=first prefix, 11=second prefix, 12=third prefix. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Reply: input/output bytes contain name/version as decimal or ASCII values (NOTE 13). Example: 7D 96 90 81 = machine name 2216."

  - id: define_machine
    label: Define Machine
    kind: action
    command: "3E {0x80+property} {0x80+type} {0x80+machine}"
    params:
      - name: property
        type: integer
        description: "1=number of inputs, 2=number of outputs, 3=number of setups. Byte 2 = 0x80 | value."
      - name: type
        type: integer
        description: "1=video, 2=audio, 3=SDI, 4=remote panel, 5=RS-422 controller. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Reply contains the requested count. Per-machine, not system-wide (NOTE 14)."

  - id: extended_data
    label: Extended Data
    kind: action
    command: "3F {0x80+input_msb} {0x80+output_msb} {0x80+machine}"
    params:
      - name: input_msb
        type: integer
        description: "7 MSBs of input data for next instruction. Byte 2 = 0x80 | value."
      - name: output_msb
        type: integer
        description: "7 MSBs of output data for next instruction. Byte 3 = 0x80 | value."
      - name: machine
        type: integer
        description: "Machine number (1-15). Byte 4 = 0x80 | value."
    notes: "Sent before an instruction needing >7-bit data. Provides MSBs for the following instruction's input/output bytes (NOTE 20). Example: 3F 80 85 81 then 16 83 A9 81 = set audio gain of output 3 to 681."
```

## Feedbacks
```yaml
feedbacks:
  - id: command_echo
    type: raw
    description: "Switcher echoes received command with DESTINATION bit (bit 6 of byte 1) set. Byte 1 has 0x40 added. Example: sent 01 85 88 83, reply 41 85 88 83."
    notes: "Applies to bi-directional instructions (NOTE 2)."

  - id: video_output_status
    type: integer
    description: "Reply to request_video_output_status (instruction 5). Output byte = input number connected to requested output."

  - id: audio_output_status
    type: integer
    description: "Reply to request_audio_output_status (instruction 6). Output byte = input number connected to requested output."

  - id: vis_setting
    type: integer
    description: "Reply to request_vis_setting (instruction 10). Output byte value per instruction 7 definitions."

  - id: breakaway_setting
    type: integer
    description: "Reply to request_breakaway_setting (instruction 11). Output byte value per instruction 8 definitions."

  - id: video_audio_type_setting
    type: integer
    description: "Reply to request_video_audio_type_setting (instruction 12). Output byte value per instruction 9 definitions."

  - id: highest_machine_address
    type: integer
    description: "Reply to request_highest_machine_address (instruction 14). Output byte = highest address."

  - id: setup_defined
    type: boolean
    description: "Reply to request_setup_defined_valid_input (instruction 15). Output=1 if defined/valid, output=0 if not."

  - id: audio_parameter
    type: integer
    description: "Reply to request_audio_parameter (instruction 25). Output byte = parameter value."

  - id: video_parameter
    type: integer
    description: "Reply to request_video_parameter (instruction 26). Output byte = parameter value."

  - id: panel_lock_state
    type: boolean
    description: "Reply to request_panel_locked (instruction 31). Output=0 unlocked, output=1 locked."

  - id: machine_identity
    type: raw
    description: "Reply to identify_machine (instruction 61). Input/output bytes encode name/version as decimal or ASCII (NOTE 13)."

  - id: machine_definition
    type: raw
    description: "Reply to define_machine (instruction 62). Input/output bytes encode input/output/setup counts."
```

## Variables
```yaml
# UNRESOLVED: no continuous variable ranges documented beyond parameter value fields in actions
```

## Events
```yaml
events:
  - id: error_busy
    description: "Sent from switcher to PC on invalid instruction, out-of-range parameter, or machine busy (instruction 16). Byte 2 = input # for input validity checks. Byte 3 = error code: 0=error, 1=invalid instruction, 2=out of range, 3=machine busy, 4=invalid input, 5=valid input. Reception by switcher not valid (NOTE 9)."
    command: "10 {0x80+input} {0x80+error_code} {0x80+machine}"

  - id: input_validity_change
    description: "Unsolicited instruction 16 sent when unit detects change in video input validity (NOTE 25). Example: 10 83 84 81 = input 3 invalid, 10 87 85 81 = input 7 valid."
    command: "10 {0x80+input} {0x80+validity} {0x80+machine}"

  - id: front_panel_operation
    description: "When user operates front panel, switcher sends the corresponding protocol command with DESTINATION bit set (NOTE 2). Example: front panel switches input 1 to output 7 on machine 3 → sends 41 81 87 83."
    command: "{0x40+instruction} {0x80+input} {0x80+output} {0x80+machine}"

  - id: power_on_reset
    description: "On power-up, switcher sends reset code (instruction 0) to PC (NOTE 1)."
    command: "40 80 80 {0x80+machine}"
```

## Macros
```yaml
macros:
  - id: delayed_switch
    label: Delayed Video Switch
    steps:
      - action: set_vis_source
        params: { output: 64 }
        command: "07 80 C0 81"
        description: "Set for delayed switch"
      - action: switch_video
        params: { input: "{desired_input}", output: "{desired_output}" }
        command: "01 {0x80+input} {0x80+output} 81"
        description: "Send switch command (not executed yet)"
      - action: set_vis_source
        params: { output: 65 }
        command: "07 80 C1 81"
        description: "Execute delayed switch after desired delay"
    notes: "Auto-cancelled after execution. Cancel manually with output=66 (NOTE 18)."

  - id: extended_audio_delay
    label: Set Audio Delay >127ms
    steps:
      - action: extended_data
        params: { output_msb: "{msb_of_delay}" }
        command: "3F 80 {0x80+msb} 81"
        description: "Send MSBs of delay value"
      - action: set_audio_parameter
        params: { input_output: "{input_channel}", value: "{lsb_of_delay}" }
        command: "16 {0x80+input} {0x80+lsb} 81"
        description: "Send LSBs of delay value"
    notes: "For delay values exceeding 127ms. Two-command sequence (NOTE 20)."

  - id: query_audio_gain_with_context
    label: Query Audio Gain with Context
    steps:
      - action: set_audio_parameter_context
        params: { input_output_type: "{io_type}", parameter: 0 }
        command: "2A {0x80+io_type} 80 81"
        description: "Set context: specify input/output and gain parameter"
      - action: request_audio_parameter
        params: { input_output: "{channel}" }
        command: "19 {0x80+channel} 80 81"
        description: "Request the parameter value"
    notes: "Instruction 42 must precede instructions 22, 24, 25 (NOTE 24)."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures documented in source
```

## Notes
- Kramer Protocol 2000 version 0.46. 4-byte binary protocol over RS-232 or RS-485.
- Up to 15 units controllable via RS-485 daisy-chain. Each unit addressed by machine # set via DIP switches 1-4.
- For single unit, set machine # = 1 (DIP switches 1-4 all OFF).
- 4th byte OVR bit (bit 6): when set, all machines accept command; addressed machine replies.
- Byte construction: byte 1 = instruction (bit 7=0 from PC, bit 6=0); byte 2 = 0x80 | input; byte 3 = 0x80 | output; byte 4 = 0x80 | machine.
- Response from switcher: byte 1 has DESTINATION bit set (0x40 added).
- Ethernet configuration exists (factory default IP 192.168.1.39) but no TCP/IP control protocol documented — Ethernet for factory reset only.
- RS-232 connection: straight cable (not null-modem) with pin crossing as specified. Pins 2↔3, 5↔5, 4→6, 8+7+1 looped.

<!-- UNRESOLVED: protocol version 0.46 stated — unclear if other versions exist or are compatible -->
<!-- UNRESOLVED: RS-485 termination via DIP 8 mentioned but no RS-485-specific protocol differences documented -->
<!-- UNRESOLVED: no power on/off command — reset instructions restore power-down state but do not control power -->
<!-- UNRESOLVED: ASCII protocol mode (instruction 56) mentioned but ASCII command set not documented in source -->
<!-- UNRESOLVED: no timing/latency specifications for command processing -->
<!-- UNRESOLVED: memory map for direct memory save (instruction 40) not documented -->

## Provenance

```yaml
source_domains:
  - cdn.kramerav.com
  - kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/manuals/vs-44hc.pdf
  - https://cdn.kramerav.com/web/downloads/manuals/vs-44hdcp_rev_6.pdf
  - https://cdn.kramerav.com/web/downloads/manuals/vs-44hn_rev_12.pdf
  - https://www.kramerav.com
retrieved_at: 2026-06-01T20:37:37.966Z
last_checked_at: 2026-06-12T19:25:08.764Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:25:08.764Z
matched_actions: 38
action_count: 38
confidence: medium
summary: "All 38 spec actions found in source Table 18 instruction codes; all transport parameters verified; coverage ratio 38/40 exceeds 0.9 threshold. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no power on/off command documented"
- "Ethernet control not documented — Ethernet config mentioned for factory reset only"
- "no continuous variable ranges documented beyond parameter value fields in actions"
- "no safety warnings or interlock procedures documented in source"
- "protocol version 0.46 stated — unclear if other versions exist or are compatible"
- "RS-485 termination via DIP 8 mentioned but no RS-485-specific protocol differences documented"
- "no power on/off command — reset instructions restore power-down state but do not control power"
- "ASCII protocol mode (instruction 56) mentioned but ASCII command set not documented in source"
- "no timing/latency specifications for command processing"
- "memory map for direct memory save (instruction 40) not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
