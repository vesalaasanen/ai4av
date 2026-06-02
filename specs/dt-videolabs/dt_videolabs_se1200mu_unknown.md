---
spec_id: admin/dt-videolabs-se1200mu
schema_version: ai4av-public-spec-v1
revision: 1
title: "DT Videolabs SE-1200MU Control Spec"
manufacturer: "DT Videolabs"
model_family: SE-1200MU
aliases: []
compatible_with:
  manufacturers:
    - "DT Videolabs"
  models:
    - SE-1200MU
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - github.com
  - datavideo.com
  - datavideo.zendesk.com
source_urls:
  - "https://github.com/RoseOO/datavideo-dvip-docs/raw/refs/heads/master/SE1200MU/Datavideo%20SE-1200%20Ethernet%20Control%20Protocol_E1%2020190710.pdf"
  - https://www.datavideo.com/us/faq/360058612373
  - https://www.datavideo.com/us/faq/360058611993
  - https://www.datavideo.com/us/protocol/list
  - https://datavideo.zendesk.com/hc/en-us/articles/360058612373-SE-1200MU-RS-232-serial-commands-Crestron-control-and-command-strings-examples
retrieved_at: 2026-05-18T06:31:11.014Z
last_checked_at: 2026-06-02T21:41:38.843Z
generated_at: 2026-06-02T21:41:38.843Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version range not stated (source refers to v1.3.3.x only); voltage/current/power specs absent; protocol version absent."
  - "source does not document any pre-defined macro sequences or"
  - "source contains no safety warnings, interlock procedures, or"
  - "voltage/current/power specs absent; protocol version number absent; firmware compatibility range beyond v1.3.3.x not stated; configurable IP / DHCP / multi-unit behavior available \"through host configuration files, which are not normally made available to the user\" — not formally documented."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:38.843Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec action units matched verbatim to source opcodes, sub-commands, and RT protocol packets; transport values confirmed; source command catalogue fully covered. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# DT Videolabs SE-1200MU Control Spec

## Summary
The SE-1200MU is a video switcher Processor Unit controlled over Ethernet using TCP/IP. The device exposes 4 paired Command/Real-Time TCP port pairs (default 5002/5001, 5004/5003, 5006/5005, 5008/5007) plus a Connection Request channel on 5009. Two protocols run on top: a Command Protocol (asynchronous request/response) and a Real-Time Protocol (field-synchronous parameter exchange). All values on the wire are 32-bit DWORDS (signed int or float); no authentication is described.

<!-- UNRESOLVED: firmware version range not stated (source refers to v1.3.3.x only); voltage/current/power specs absent; protocol version absent. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  host: 192.168.100.101  # default device IP per source
  port: 5002            # Command Port 1; Real-Time Port 1 is 5001
  # Additional paired channels: Command 5004/5006/5008, Real-Time 5003/5005/5007
  # Connection Request Channel: 5009
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: not explicit in source - UNRESOLVED, remove if unsure
- routable        # inferred: PGM/PST source select and crosspoint controls present
- queryable       # inferred: GET_CONTROL and status register reads present
- levelable       # inferred: per-input proc amp, transition level, keyer opacity present
```

<!-- Trait `powerable` left unresolved: source does not document explicit power on/off. -->

## Actions
```yaml
# Command Protocol opcodes (Section 2.2). Each 32-bit DWORD opcode lives at
# dword index 1 of the packet; Parameter1 / Parameter2 follow at indices 2+.
# Packet size in bytes = N*4 (N dwords). All values 32-bit int or float.
- id: get_control
  label: Get Control Value
  kind: query
  command: "0x00 0x00 0x0C {section_and_control}"  # DV_COMMAND_GET_CONTROL=0
  notes: |
    Packet: size(4B)=0x0C, command=0, parameter1=((section<<16)|control).
    Response arrives as a SET_CONTROL message with the current value.

- id: set_control
  label: Set Control Value
  kind: action
  command: "0x00 0x00 0x0C {section_and_control} {value_dword}"
  notes: |
    Packet: size(4B)=0x0C, command=1, parameter1=((section<<16)|control),
    parameter2=value. Multiple (section/control, value) pairs may follow in
    one packet (see Real-Time Protocol packet example, Section 3.2.2).
  params:
    - name: section
      type: integer
      description: Section number (see Variables/Sections list)
    - name: control
      type: integer
      description: Control number within section
    - name: value
      type: integer
      description: 32-bit int or IEEE-754 float (depends on control type)

- id: open_still_file
  label: Open Still File
  kind: action
  command: "0x00 0x00 0x0C 0x02 {still_num} {mode}"
  notes: command=2. Mode: 0=Read, 1=Write.

- id: open_mini_pic_file
  label: Open Mini-Pic File
  kind: action
  command: "0x00 0x00 0x0C 0x03 {still_num} {mode}"
  notes: command=3. Mode: 0=Read, 1=Write.

- id: close_data_file
  label: Close Data File
  kind: action
  command: "0x00 0x00 0x08 0x04"
  notes: command=4. 8-byte packet (size=0x08).

- id: get_file_data
  label: Get File Data Chunk
  kind: action
  command: "0x00 0x00 0x0C 0x05 {num_bytes}"
  notes: command=5. Returns data via STORE_FILE_DATA.

- id: store_file_data
  label: Store File Data
  kind: action
  command: "0x00 0x00 {size_dword} 0x06 {chunk_length} {chunk_number} {data_bytes}"
  notes: command=6. Also used to return data from GET_FILE_DATA. Packet size = 0x0C + data_size.

- id: still_event
  label: Still Event
  kind: action
  command: "0x00 0x00 0x00 0x07"
  notes: command=7. Not currently supported per source.

- id: get_mini_pic
  label: Get Mini-Pic
  kind: action
  command: "0x00 0x00 0x0C 0x08 {num}"
  notes: command=8. Returns DV_COMMAND_RESULT_MINI_PIC (96x54 px, 32bpp RGBA).

- id: get_input_name
  label: Get Input Name
  kind: action
  command: "0x00 0x00 0x0C 0x09 {input_num}"
  notes: command=9. Returns DV_COMMAND_RESULT_INPUT_NAME (Unicode name).

- id: set_input_name
  label: Set Input Name
  kind: action
  command: "0x00 0x00 {size_dword} 0x0A {name_length_chars} {name_unicode}"
  notes: command=10.

- id: get_file_name
  label: Get File Name
  kind: action
  command: "0x00 0x00 0x00 0x0B {type} {file_num}"
  notes: command=11. Type: 0=Mem, 1=Still.

- id: set_file_name
  label: Set File Name
  kind: action
  command: "0x00 0x00 {size_dword} 0x0C {type} {file_num} {name_length_chars} {name_unicode}"
  notes: command=12.

- id: get_user_mem
  label: Get User Memory
  kind: action
  command: "0x00 0x00 0x0C 0x0D {num}"
  notes: command=13. Returns DV_COMMAND_RESULT_USER_MEM.

- id: store_user_mem
  label: Store User Memory
  kind: action
  command: "0x00 0x00 0x00 0x0E {num} {user_mem_data}"
  notes: command=14.

- id: streamer_control
  label: Streamer Control
  kind: action
  command: "0x00 0x00 0x00 0x0F {streamer_cmd} {params...}"
  notes: |
    command=15. Sub-commands: DV_STREAMER_LAUNCH (start), DV_STREAMER_STOP (stop).
    Additional streamer parameters set via SECTION_STREAMER_CTRL (Section 4.1.13).

- id: streamer_launch
  label: Streamer Launch
  kind: action
  command: "0x00 0x00 0x00 0x0F DV_STREAMER_LAUNCH"
  notes: Sub-command of DV_COMMAND_STREAMER_CONTROL (15). Starts the streamer.

- id: streamer_stop
  label: Streamer Stop
  kind: action
  command: "0x00 0x00 0x00 0x0F DV_STREAMER_STOP"
  notes: Sub-command of DV_COMMAND_STREAMER_CONTROL (15). Stops the streamer.

- id: open_software_file
  label: Open Software File
  kind: action
  command: "0x00 0x00 {size_dword} 0x10 {exe_flag} {file_name_0x00_terminated}"
  notes: command=16. Exe flag in dword 3, file name in dwords 4..n (NUL terminated).

- id: install_software
  label: Install Software
  kind: action
  command: "0x00 0x00 0x00 0x11"
  notes: command=17. Finishes the software upgrade process.

- id: open_names_file
  label: Open Names File
  kind: action
  command: "0x00 0x00 0x00 0x12"
  notes: command=18.

- id: recorder_control
  label: Recorder Control
  kind: action
  command: "0x00 0x00 0x00 0x13"
  notes: command=19.

- id: chroma_keyer_auto
  label: Chroma Keyer Auto
  kind: action
  command: "0x00 0x00 0x00 0x14"
  notes: command=20.

# Real-Time Protocol actions operate on the same Section/Control encoding as
# SET_CONTROL; the only difference is transport (Real-Time port + field-rate
# exchange). The Processor Unit pushes Parameter/Value pairs unsolicited.
- id: rt_param_value_packet
  label: Real-Time Parameter/Value Packet
  kind: action
  command: "0x00 0x00 {size_dword} 0x00 {section_and_control} {value_dword} [...]"
  notes: |
    Same format as SET_CONTROL but sent over Real-Time port (e.g. 5003).
    Multiple (section/control, value) pairs per packet. Command dword ignored.
    Controller must reply to every packet (null or param/value).

- id: rt_null_packet
  label: Real-Time Null Packet
  kind: action
  command: "0x00 0x00 0x08 0x00 0x00 0x00 0x00"
  notes: 8-byte null packet. Sent/replied to keep field-rate exchange alive.

# Connection Request Channel (Section 2.1.1)
- id: connection_request
  label: Connection Request
  kind: action
  command: "0x00 0x00 0x08 0x55AA0001"
  notes: |
    Sent to port 5009. Response (8 bytes) is one of:
    0xaa55ffff - no connection available
    0xaa55xxxx - free Real-Time port number (xxxx, e.g. 5001)
    0x55aa0000 - packet size error
    0x55aa0001 - unknown command
```

## Feedbacks
```yaml
# All feedback values are returned via SET_CONTROL messages on the Command
# port, or pushed via Parameter/Value Packets on the Real-Time port.
- id: powerable_trait
  type: boolean
  description: No explicit power on/off command documented in source; power state must be observed via transition engine state, not asserted.

- id: connection_status
  type: enum
  values: [no_connection, pending, connected]
  values_source:
    - DV_CONNECTION_NO_CONNECTION (0)
    - DV_CONNECTION_PENDING (1)
    - DV_CONNECTION_CONNECTED (2)
  description: STATUS_SYSTEM_CONNECTION_STATUS (Section 4.1.1.1)

- id: system_version
  type: integer
  description: STATUS_SYSTEM_VERSION - System Header version

- id: main_version
  type: integer
  description: STATUS_MAIN_VERSION - Main Header version

- id: software_version
  type: integer
  description: |
    STATUS_SOFTWARE_VERSION (Section 4.1.1.4).
    Bits [31:24]=Major, [23:16]=Minor, [15:0]=Build.

- id: fpga_version
  type: integer
  description: |
    STATUS_FPGA_VERSION (Section 4.1.1.5).
    Bit31=SD-mode FPGA, [30:16]=year hex, [15:8]=month hex, [7:0]=day hex.

- id: board_id_version
  type: integer
  description: STATUS_BOARD_ID_VERSION

- id: tally_source_1_to_4
  type: integer
  description: STATUS_TALLY_SOURCE1..4 (7..26 in section 0)

- id: tally_pgm_src
  type: integer
  description: STATUS_TALLY_PGM_SRC (control 27)

- id: tally_pst_src
  type: integer
  description: STATUS_TALLY_PST_SRC (control 28)

- id: tally_key1_fill_src
  type: integer
  description: STATUS_TALLY_KEY1_FILL_SRC (control 29)

- id: tally_key1_key_src
  type: integer
  description: STATUS_TALLY_KEY1_KEY_SRC (control 30)

- id: tally_key2_fill_src
  type: integer
  description: STATUS_TALLY_KEY2_FILL_SRC (control 31)

- id: tally_key2_key_src
  type: integer
  description: STATUS_TALLY_KEY2_KEY_SRC (control 32)

- id: tally_dsk1_fill_src
  type: integer
  description: STATUS_TALLY_DSK1_FILL_SRC (control 33)

- id: tally_dsk1_key_src
  type: integer
  description: STATUS_TALLY_DSK1_KEY_SRC (control 34)

- id: tally_dsk2_fill_src
  type: integer
  description: STATUS_TALLY_DSK2_FILL_SRC (control 35)

- id: tally_dsk2_key_src
  type: integer
  description: STATUS_TALLY_DSK2_KEY_SRC (control 36)

- id: me_trans_state
  type: enum
  values: [stopped, at_start, running, at_end, paused]
  values_source: [0, 1, 2, 3, 4]
  description: ME_TRANS_STATE - current M/E Transition Engine state

- id: dsk_trans_state
  type: enum
  values: [stopped, at_start, running, at_end, paused]
  description: DSK_TRANS_STATE - DSK Transition Engine state

- id: ftb_trans_state
  type: enum
  values: [stopped, at_start, running, at_end, paused]
  description: FTB_TRANS_STATE - FTB Transition Engine state

- id: me_trans_command_ready
  type: boolean
  description: |
    ME_TRANS_COMMAND returns value 8 (Transition Ready) once the engine has
    processed the previous command. Poll before issuing next command.

- id: memory_state
  type: enum
  values: [ready, busy, error]
  values_source: [0, 1, 2]
  description: MEMORY_STATE - Memory Command Processor state

- id: memory_result
  type: enum
  values: [ok, fail, not_found, illegal_command, illegal_value]
  values_source: [0, 1, 2, 3, 4]
  description: MEMORY_RESULT

- id: memory_event
  type: integer
  description: |
    MEMORY_EVENT - incremented whenever a memory-altering command (Store/Delete)
    completes. Detects changes made by other controllers.

- id: memory_present_flags
  type: integer
  description: |
    SECTION_MEMORY_PRESENT - 1000 1-bit flags packed into 32 dwords. 1=memory stored.

- id: still_state
  type: enum
  values: [ready, busy, error]
  values_source: [0, 1, 2]
  description: STILL_STATE

- id: still_result
  type: enum
  values: [ok, fail, not_found, illegal_command, illegal_value]
  values_source: [0, 1, 2, 3, 4]
  description: STILL_RESULT

- id: still_event
  type: integer
  description: STILL_EVENT - incremented on Store/Delete

- id: still_present_flags
  type: integer
  description: |
    SECTION_STILL_PRESENT - 100 1-bit flags packed into 4 dwords.

- id: input_valid
  type: boolean
  description: INPUT_INPUT_VALID - 0=not valid, 1=valid
```

## Variables
```yaml
# Sections (control num encoding, 16-bit each):
# Section 0: SECTION_STATUS, 1: SECTION_SYSTEM, 2: SECTION_SWITCHER,
# 3: SECTION_INPUT (per channel), 4: SECTION_INPUT_CTRL, 5: SECTION_OUTPUT_CTRL,
# 6: SECTION_AUDIO_CTRL, 7: SECTION_TRANSITION_CTRL, 8: SECTION_MEMORY_CTRL,
# 9: SECTION_MEMORY_PRESENT, 10: SECTION_STILL_CTRL, 11: SECTION_STILL_PRESENT,
# 12: SECTION_STREAMER_CTRL.

- id: system_standard
  section: 1
  control: 0
  type: enum
  values_source:
    - DV_STD_HD1080I_60 (0) - 1080i/60
    - DV_STD_HD1080I_59_94 (1) - 1080i/59.94
    - DV_STD_HD1080I_50 (2) - 1080i/50
    - DV_STD_HD720P_60 (3) - 720p/60
    - DV_STD_HD720P_59_94 (4) - 720p/59.94
    - DV_STD_HD720P_50 (5) - 720p/50

- id: system_aspect
  section: 1
  control: 1
  type: flag

- id: system_genlock_enable
  section: 1
  control: 2
  type: flag

- id: system_genlock_src
  section: 1
  control: 3
  type: integer

- id: system_genlock_h_phase
  section: 1
  control: 4
  type: integer

- id: system_genlock_v_phase
  section: 1
  control: 5
  type: integer

# Wipe controls (Section 2 = SWITCHER, controls 0..12)
- id: switcher_wipe_pattern_num
  section: 2
  control: 0
  type: integer
  range: [1, 32]

- id: switcher_wipe_level
  section: 2
  control: 1
  type: float
  range: [0.0, 100.0]

- id: switcher_wipe_position_x
  section: 2
  control: 2
  type: float
  range: [-16.0, 16.0]

- id: switcher_wipe_position_y
  section: 2
  control: 3
  type: float
  range: [-16.0, 16.0]

- id: switcher_wipe_rotation
  section: 2
  control: 4
  type: float
  range: [-16.0, 16.0]

- id: switcher_wipe_soft
  section: 2
  control: 5
  type: float
  range: [0.0, 100.0]

- id: switcher_wipe_soft_bal
  section: 2
  control: 7
  type: float
  range: [-100.0, 100.0]

- id: switcher_wipe_border_width
  section: 2
  control: 8
  type: float
  range: [0.0, 100.0]

- id: switcher_wipe_border_enable
  section: 2
  control: 9
  type: flag

- id: switcher_wipe_border_hue
  section: 2
  control: 10
  type: float
  range: [0.0, 360.0]

- id: switcher_wipe_border_sat
  section: 2
  control: 11
  type: float
  range: [0.0, 100.0]

- id: switcher_wipe_border_luma
  section: 2
  control: 12
  type: float
  range: [0.0, 100.0]

# Keyer 1 (controls 19..48)
- id: switcher_key1_keyer_on
  section: 2
  control: 19
  type: flag

- id: switcher_key1_key_src
  section: 2
  control: 20
  type: enum
  values_source:
    - "00: Black"
    - "01-04: Input 1-4"
    - "17: Matte"
    - "18: Flex Src"
    - "19: Still 1"
    - "20: Still 2"

- id: switcher_key1_split_src
  section: 2
  control: 21
  type: integer

- id: switcher_key1_linear_opacity
  section: 2
  control: 22
  type: float

- id: switcher_key1_linear_lift
  section: 2
  control: 23
  type: float
  range: [0.0, 100.0]

- id: switcher_key1_linear_gain
  section: 2
  control: 24
  type: float
  range: [0.0, 16.0]

- id: switcher_key1_linear_key_mode
  section: 2
  control: 25
  type: enum
  values_source: ["0: Linear Mix (Luma)", "1: Additive Mix (Linear)"]

- id: switcher_key1_linear_key_invert
  section: 2
  control: 26
  type: float

- id: switcher_key1_linear_key_sel_mode
  section: 2
  control: 27
  type: enum
  values_source: ["0: Self Key", "1: Split", "2: PIP"]

- id: switcher_key1_linear_key_fill_mode
  section: 2
  control: 28
  type: enum
  values_source: ["0: Video Fill", "1: Matte"]

- id: switcher_key1_linear_matte_hue
  section: 2
  control: 29
  type: float

- id: switcher_key1_linear_matte_sat
  section: 2
  control: 30
  type: float

- id: switcher_key1_linear_matte_luma
  section: 2
  control: 31
  type: float

- id: switcher_key1_chroma_enable
  section: 2
  control: 32
  type: boolean

- id: switcher_key1_chroma_matte_hue
  section: 2
  control: 33
  type: float

- id: switcher_key1_chroma_matte_sat
  section: 2
  control: 34
  type: float

- id: switcher_key1_chroma_matte_luma
  section: 2
  control: 35
  type: float

- id: switcher_key1_chroma_key_acc
  section: 2
  control: 36
  type: float
  range: [0.0, 180.0]

- id: switcher_key1_chroma_key_gain
  section: 2
  control: 37
  type: float
  range: [0.0, 16.0]

- id: switcher_key1_chroma_key_lift
  section: 2
  control: 38
  type: float

- id: switcher_key1_chroma_chroma_acc
  section: 2
  control: 39
  type: float
  range: [0.0, 180.0]

- id: switcher_key1_chroma_chroma_sup
  section: 2
  control: 40
  type: float

- id: switcher_key1_chroma_key_soft
  section: 2
  control: 41
  type: float

- id: switcher_key1_chroma_key_shrink
  section: 2
  control: 42
  type: float

- id: switcher_key1_chroma_bgnd_suppress
  section: 2
  control: 43
  type: integer

- id: switcher_key1_mask_left
  section: 2
  control: 44
  type: float

- id: switcher_key1_mask_right
  section: 2
  control: 45
  type: float

- id: switcher_key1_mask_top
  section: 2
  control: 46
  type: float

- id: switcher_key1_mask_bottom
  section: 2
  control: 47
  type: float

- id: switcher_key1_mask_enable
  section: 2
  control: 48
  type: boolean

# Keyer 2 (controls 49..78) - same pattern as Keyer 1
- id: switcher_key2_keyer_on
  section: 2
  control: 49
  type: integer

- id: switcher_key2_key_src
  section: 2
  control: 50
  type: integer

- id: switcher_key2_split_src
  section: 2
  control: 51
  type: integer

- id: switcher_key2_linear_opacity
  section: 2
  control: 52
  type: float

- id: switcher_key2_linear_lift
  section: 2
  control: 53
  type: float

- id: switcher_key2_linear_gain
  section: 2
  control: 54
  type: float
  range: [0.0, 16.0]

- id: switcher_key2_linear_key_mode
  section: 2
  control: 55
  type: integer

- id: switcher_key2_linear_key_invert
  section: 2
  control: 56
  type: float

- id: switcher_key2_linear_key_sel_mode
  section: 2
  control: 57
  type: integer

- id: switcher_key2_linear_key_fill_mode
  section: 2
  control: 58
  type: integer

- id: switcher_key2_linear_matte_hue
  section: 2
  control: 59
  type: float

- id: switcher_key2_linear_matte_sat
  section: 2
  control: 60
  type: float

- id: switcher_key2_linear_matte_luma
  section: 2
  control: 61
  type: float

- id: switcher_key2_chroma_enable
  section: 2
  control: 62
  type: integer

- id: switcher_key2_chroma_matte_hue
  section: 2
  control: 63
  type: float

- id: switcher_key2_chroma_matte_sat
  section: 2
  control: 64
  type: float

- id: switcher_key2_chroma_matte_luma
  section: 2
  control: 65
  type: float

- id: switcher_key2_chroma_key_acc
  section: 2
  control: 66
  type: float
  range: [0.0, 180.0]

- id: switcher_key2_chroma_key_gain
  section: 2
  control: 67
  type: float
  range: [0.0, 16.0]

- id: switcher_key2_chroma_key_lift
  section: 2
  control: 68
  type: float

- id: switcher_key2_chroma_chroma_acc
  section: 2
  control: 69
  type: float
  range: [0.0, 180.0]

- id: switcher_key2_chroma_chroma_sup
  section: 2
  control: 70
  type: float

- id: switcher_key2_chroma_key_soft
  section: 2
  control: 71
  type: float

- id: switcher_key2_chroma_key_shrink
  section: 2
  control: 72
  type: float

- id: switcher_key2_chroma_bgnd_suppress
  section: 2
  control: 73
  type: integer

- id: switcher_key2_mask_left
  section: 2
  control: 74
  type: float

- id: switcher_key2_mask_right
  section: 2
  control: 75
  type: float

- id: switcher_key2_mask_top
  section: 2
  control: 76
  type: float

- id: switcher_key2_mask_bottom
  section: 2
  control: 77
  type: float

- id: switcher_key2_mask_enable
  section: 2
  control: 78
  type: integer

# Transition controls (79..90)
- id: switcher_trans_bgnd
  section: 2
  control: 79
  type: flag

- id: switcher_trans_key1
  section: 2
  control: 80
  type: flag

- id: switcher_trans_key2
  section: 2
  control: 81
  type: flag

- id: switcher_trans_priority
  section: 2
  control: 82
  type: flag

- id: switcher_trans_preview
  section: 2
  control: 83
  type: flag

- id: switcher_trans_reverse
  section: 2
  control: 84
  type: flag

- id: switcher_trans_normal_rev
  section: 2
  control: 85
  type: flag

- id: switcher_pgm_src
  section: 2
  control: 86
  type: integer
  description: M/E Program Source (same encoding as Keyer source)

- id: switcher_pst_src
  section: 2
  control: 87
  type: integer
  description: M/E Preset Source

- id: switcher_trans_type
  section: 2
  control: 88
  type: enum
  values_source: ["0: Mix", "1: Wipe"]

- id: switcher_key_priority
  section: 2
  control: 90
  type: flag
  description: "0: K1 bottom/K2 top; 1: K1 top/K2 bottom"

# DSK1 (91..108) and DSK2 (109..126) - same pattern as Keyer 1, no chroma
- id: switcher_dsk1_keyer_on
  section: 2
  control: 91
  type: flag

- id: switcher_dsk1_key_src
  section: 2
  control: 92
  type: integer

- id: switcher_dsk1_split_src
  section: 2
  control: 93
  type: integer

- id: switcher_dsk1_linear_opacity
  section: 2
  control: 94
  type: float

- id: switcher_dsk1_linear_lift
  section: 2
  control: 95
  type: float
  range: [0.0, 100.0]

- id: switcher_dsk1_linear_gain
  section: 2
  control: 96
  type: float
  range: [0.0, 16.0]

- id: switcher_dsk1_linear_key_mode
  section: 2
  control: 97
  type: integer

- id: switcher_dsk1_linear_key_invert
  section: 2
  control: 98
  type: float

- id: switcher_dsk1_linear_key_sel_mode
  section: 2
  control: 99
  type: integer

- id: switcher_dsk1_linear_key_fill_mode
  section: 2
  control: 100
  type: integer

- id: switcher_dsk1_linear_matte_hue
  section: 2
  control: 101
  type: float

- id: switcher_dsk1_linear_matte_sat
  section: 2
  control: 102
  type: float

- id: switcher_dsk1_linear_matte_luma
  section: 2
  control: 103
  type: float

- id: switcher_dsk1_mask_left
  section: 2
  control: 104
  type: float

- id: switcher_dsk1_mask_right
  section: 2
  control: 105
  type: float

- id: switcher_dsk1_mask_top
  section: 2
  control: 106
  type: float

- id: switcher_dsk1_mask_bottom
  section: 2
  control: 107
  type: float

- id: switcher_dsk1_mask_enable
  section: 2
  control: 108
  type: flag

- id: switcher_dsk2_keyer_on
  section: 2
  control: 109
  type: flag

- id: switcher_dsk2_key_src
  section: 2
  control: 110
  type: integer

- id: switcher_dsk2_split_src
  section: 2
  control: 111
  type: integer

- id: switcher_dsk2_linear_opacity
  section: 2
  control: 112
  type: float

- id: switcher_dsk2_linear_lift
  section: 2
  control: 113
  type: float
  range: [0.0, 100.0]

- id: switcher_dsk2_linear_gain
  section: 2
  control: 114
  type: float
  range: [0.0, 16.0]

- id: switcher_dsk2_linear_key_mode
  section: 2
  control: 115
  type: integer

- id: switcher_dsk2_linear_key_invert
  section: 2
  control: 116
  type: float

- id: switcher_dsk2_linear_key_sel_mode
  section: 2
  control: 117
  type: integer

- id: switcher_dsk2_linear_key_fill_mode
  section: 2
  control: 118
  type: integer

- id: switcher_dsk2_linear_matte_hue
  section: 2
  control: 119
  type: float

- id: switcher_dsk2_linear_matte_sat
  section: 2
  control: 120
  type: float

- id: switcher_dsk2_linear_matte_luma
  section: 2
  control: 121
  type: float

- id: switcher_dsk2_mask_left
  section: 2
  control: 122
  type: float

- id: switcher_dsk2_mask_right
  section: 2
  control: 123
  type: float

- id: switcher_dsk2_mask_top
  section: 2
  control: 124
  type: float

- id: switcher_dsk2_mask_bottom
  section: 2
  control: 125
  type: float

- id: switcher_dsk2_mask_enable
  section: 2
  control: 126
  type: flag

# Additional DSK controls (127..129)
- id: switcher_dsk1_trans_enable
  section: 2
  control: 127
  type: flag

- id: switcher_dsk2_trans_enable
  section: 2
  control: 128
  type: flag

- id: switcher_dsk_trans_level
  section: 2
  control: 129
  type: float
  description: Read-only DSK transition level (progress)

# Bus Matte (130..132)
- id: switcher_bus_matte_hue
  section: 2
  control: 130
  type: float

- id: switcher_bus_matte_sat
  section: 2
  control: 131
  type: float

- id: switcher_bus_matte_luma
  section: 2
  control: 132
  type: float
  range: [0.0, 100.0]

# Fade to Black (133..135)
- id: switcher_ftb_enable
  section: 2
  control: 133
  type: flag

- id: switcher_ftb_dirn
  section: 2
  control: 134
  type: flag
  description: "0: fading down, 1: fading up"

- id: switcher_ftb_level
  section: 2
  control: 135
  type: float
  range: [0.0, 100.0]
  description: "Read-only FTB transition level (progress)"

# Flex Src (136..141)
- id: switcher_flex_src_bgnd_src
  section: 2
  control: 136
  type: integer

- id: switcher_flex_src_dve1_src
  section: 2
  control: 137
  type: integer

- id: switcher_flex_src_dve2_src
  section: 2
  control: 138
  type: integer

- id: switcher_flex_src_fgnd_src
  section: 2
  control: 139
  type: integer

- id: switcher_flex_src_fgnd_src_k
  section: 2
  control: 140
  type: integer

- id: switcher_flex_src_fgnd_enable
  section: 2
  control: 141
  type: flag

# Flex Src DVE1 (142..165) - position, size, crop, border
- id: switcher_flex_src_dve1_enable
  section: 2
  control: 142
  type: flag

- id: switcher_flex_src_dve1_position_x
  section: 2
  control: 143
  type: float
  range: [-16.0, 16.0]

- id: switcher_flex_src_dve1_position_y
  section: 2
  control: 144
  type: float
  range: [-16.0, 16.0]

- id: switcher_flex_src_dve1_position_z
  section: 2
  control: 145
  type: float
  range: [-16.0, 16.0]

- id: switcher_flex_src_dve1_size_x
  section: 2
  control: 147
  type: float
  range: [0.0, 16.0]

- id: switcher_flex_src_dve1_size_y
  section: 2
  control: 148
  type: float
  range: [0.0, 16.0]

- id: switcher_flex_src_dve1_size_z
  section: 2
  control: 149
  type: float
  range: [0.0, 16.0]

- id: switcher_flex_src_dve1_crop_size
  section: 2
  control: 150
  type: float

- id: switcher_flex_src_dve1_crop_left
  section: 2
  control: 151
  type: float

- id: switcher_flex_src_dve1_crop_right
  section: 2
  control: 152
  type: float

- id: switcher_flex_src_dve1_crop_top
  section: 2
  control: 153
  type: float

- id: switcher_flex_src_dve1_crop_bottom
  section: 2
  control: 154
  type: float

- id: switcher_flex_src_dve1_crop_soft
  section: 2
  control: 155
  type: float

- id: switcher_flex_src_dve1_border_size
  section: 2
  control: 156
  type: float

- id: switcher_flex_src_dve1_border_left
  section: 2
  control: 157
  type: float

- id: switcher_flex_src_dve1_border_right
  section: 2
  control: 158
  type: float

- id: switcher_flex_src_dve1_border_top
  section: 2
  control: 159
  type: float

- id: switcher_flex_src_dve1_border_bottom
  section: 2
  control: 160
  type: float

- id: switcher_flex_src_dve1_border_soft
  section: 2
  control: 161
  type: float

- id: switcher_flex_src_dve1_border_style
  section: 2
  control: 162
  type: float
  description: "0: Off, 1: Normal (only two styles supported)"

- id: switcher_flex_src_dve1_border_hue
  section: 2
  control: 163
  type: float

- id: switcher_flex_src_dve1_border_sat
  section: 2
  control: 164
  type: float

- id: switcher_flex_src_dve1_border_luma
  section: 2
  control: 165
  type: float

# Section 3 = INPUT (per-channel; channel encoded in command bits [7:4])
- id: input_proc_amp_black_level
  section: 3
  control: 0
  type: float

- id: input_proc_amp_chroma_gain
  section: 3
  control: 1
  type: float
  range: [0.0, 16.0]

- id: input_proc_amp_white_clip
  section: 3
  control: 2
  type: float

- id: input_valid
  section: 3
  control: 3
  type: boolean

- id: input_mode
  section: 3
  control: 4
  type: integer

- id: input_freeze_mode
  section: 3
  control: 5
  type: enum
  values_source:
    - "0: Live"
    - "1: Freeze"
    - "2: Still"
    - "3: Clip"
    - "4: Capture"

- id: input_frame_mode
  section: 3
  control: 6
  type: enum
  values_source: ["0: Frame", "1: Field", "2: Video & Key"]

- id: input_remap
  section: 3
  control: 7
  type: integer
  range: [0, 6]
  description: "0=source not used; 1-6=physical source used"

- id: input_freeze_still_load
  section: 3
  control: 8
  type: flag

- id: input_freeze_still_num
  section: 3
  control: 9
  type: integer

# Section 4 = INPUT_CTRL (common)
- id: input_dvi_input_enable
  section: 4
  control: 0
  type: boolean
  description: "Enables DVI Input onto Input 7"

- id: input_enable_remap
  section: 4
  control: 1
  type: boolean

# Section 5 = OUTPUT_CTRL
- id: output_multiviewer_mode
  section: 5
  control: 4
  type: integer
  description: Not used in SE-1200 per source

- id: output_multiviewer_main1_src
  section: 5
  control: 5
  type: integer

- id: output_multiviewer_transp_labels
  section: 5
  control: 9
  type: boolean

- id: output_multiviewer_auto_num
  section: 5
  control: 10
  type: boolean

- id: output_multiviewer_label_info
  section: 5
  control: 11
  type: boolean

- id: output_analog_out_select
  section: 5
  control: 12
  type: integer

- id: output_analog_out_mode
  section: 5
  control: 13
  type: integer

- id: output_analog_out_sync_mode
  section: 5
  control: 14
  type: integer

- id: output_dvi_out_select
  section: 5
  control: 15
  type: enum
  values_source:
    - "0: PGM"
    - "1: PVW"
    - "2: PGM DSK1"
    - "3: PVW DSK1"
    - "4: Multiviewer"

- id: output_multi_out1_select
  section: 5
  control: 16
  type: integer
  description: Same selections as DVI Out

# Section 6 = AUDIO_CTRL
- id: audio_source
  section: 6
  control: 0
  type: enum
  values_source:
    - "0: Audio Follow Video"
    - "1-4: Inputs 1-4"

- id: audio_chan
  section: 6
  control: 1
  type: enum
  values_source:
    - "0: Chan 1&2"
    - "1: Chan 3&4"
    - "2: Chan 5&6"
    - "3: Chan 7&8"
    - "4: Chan 9&10"
    - "5: Chan 11&12"
    - "6: Chan 13&14"
    - "7: Chan 15&16"

- id: audio_mode
  section: 6
  control: 2
  type: enum
  values_source: ["0: Off", "1: Digital", "2: Analog", "3: Test"]

# Section 7 = TRANSITION_CTRL (M/E, DSK, FTB engines - each has command/type/state/duration/dirn)
- id: me_trans_command
  section: 7
  control: 0
  type: enum
  values_source:
    - "0: Stop"
    - "1: Run"
    - "2: Pause"
    - "3: Continue"
    - "4: Goto Start"
    - "5: Goto End"
    - "6: Restart"
    - "7: Stop And Clear"
    - "8: Ready"

- id: me_trans_type
  section: 7
  control: 1
  type: enum
  values_source: ["0: One Shot", "1: Loop", "2: PingPong"]

- id: me_trans_state
  section: 7
  control: 2
  type: enum
  values_source: ["0: Stopped", "1: At Start", "2: Running", "3: At End", "4: Paused"]

- id: me_trans_duration
  section: 7
  control: 3
  type: integer
  description: Duration in frames

- id: me_trans_dirn
  section: 7
  control: 4
  type: enum
  values_source: ["0: Forwards", "1: Reverse"]

- id: dsk_trans_command
  section: 7
  control: 5
  type: integer
  description: Same enum as ME_TRANS_COMMAND

- id: dsk_trans_type
  section: 7
  control: 6
  type: integer

- id: dsk_trans_state
  section: 7
  control: 7
  type: integer

- id: dsk_trans_duration
  section: 7
  control: 8
  type: integer

- id: dsk_trans_dirn
  section: 7
  control: 9
  type: integer

- id: ftb_trans_command
  section: 7
  control: 10
  type: integer

- id: ftb_trans_type
  section: 7
  control: 11
  type: integer

- id: ftb_trans_state
  section: 7
  control: 12
  type: integer

- id: ftb_trans_duration
  section: 7
  control: 13
  type: integer

- id: ftb_trans_dirn
  section: 7
  control: 14
  type: integer

# Section 8 = MEMORY_CTRL
- id: memory_select
  section: 8
  control: 0
  type: integer
  range: [0, 1000]
  description: "0-999 general; 1000=system memory"

- id: memory_command
  section: 8
  control: 1
  type: enum
  values_source:
    - "0: DV_MEMORY_READY (status)"
    - "1: DV_MEMORY_LOAD"
    - "2: DV_MEMORY_STORE"
    - "3: DV_MEMORY_DELETE"

- id: memory_state
  section: 8
  control: 2
  type: enum
  values_source: ["0: Ready", "1: Busy", "2: Error"]

- id: memory_result
  section: 8
  control: 3
  type: enum
  values_source: ["0: OK", "1: Fail", "2: Not Found", "3: Illegal Command", "4: Illegal Value"]

- id: memory_event
  section: 8
  control: 4
  type: integer

- id: memory_flags
  section: 8
  control: 5
  type: integer
  description: |
    Bit-packed memory section flags (1 bit per word, not packed).
    Bits: ENABLE, SWITCHER_SRC, FLEX_SRC_SRC, SWITCHER, FLEX_SRC, AUX_BUS,
    MULTIVIEWER, AUDIO, INPUTS, OUTPUTS.

- id: memory_load_all_sections
  section: 8
  control: 6
  type: flag
  description: Override memory flags and load all sections; auto-clears after use

# Section 10 = STILL_CTRL
- id: still_select
  section: 10
  control: 0
  type: integer
  range: [0, 100]

- id: still_buf
  section: 10
  control: 1
  type: integer
  range: [0, 7]
  description: 8 still buffers

- id: still_command
  section: 10
  control: 2
  type: enum
  values_source:
    - "0: DV_STILL_READY (status)"
    - "1: DV_STILL_LOAD"
    - "2: DV_STILL_STORE"
    - "3: DV_STILL_GRAB"
    - "4: DV_STILL_DELETE"

- id: still_state
  section: 10
  control: 3
  type: enum
  values_source: ["0: Ready", "1: Busy", "2: Error"]

- id: still_result
  section: 10
  control: 4
  type: enum
  values_source: ["0: OK", "1: Fail", "2: Not Found", "3: Illegal Command", "4: Illegal Value"]

- id: still_event
  section: 10
  control: 5
  type: integer

# Section 12 = STREAMER_CTRL
- id: streamer_command
  section: 12
  control: 0
  type: integer

- id: streamer_codec
  section: 12
  control: 1
  type: integer

- id: streamer_size
  section: 12
  control: 2
  type: enum
  values_source:
    - "0: Full Size"
    - "1: Half Size"
    - "2: Quarter Size"
    - "3: Sixth Size"
  description: Only STREAMER_SIZE implemented in current software per source

- id: streamer_quality
  section: 12
  control: 3
  type: integer
```

## Events
```yaml
# Real-Time Protocol pushes Parameter/Value packets to the Controller at field
# rate. Any control that changes (locally, or from another Controller) is
# pushed. The Controller must reply to every packet.
- id: rt_param_value_update
  description: |
    Unsolicited Parameter/Value packet on Real-Time port (e.g. 5003). Format
    identical to SET_CONTROL. Multiple (section, control, value) tuples per
    packet. Reply required (null packet or echo of changed values).

- id: rt_null_packet
  description: 8-byte null packet. Reply required to keep protocol in sync.

- id: memory_event_change
  description: |
    Section 8 control 4 (MEMORY_EVENT) increments when another controller
    Stores or Deletes a memory. Use to redraw memory list GUIs.

- id: still_event_change
  description: |
    Section 10 control 5 (STILL_EVENT) increments when another controller
    Stores or Deletes a still.

- id: first_packet_full_state
  description: |
    The first packet the Processor Unit sends after Real-Time connection
    contains the full machine state; controllers should reset local state
    to all-zeros before connecting so the first packet populates it.
```

## Macros
```yaml
# UNRESOLVED: source does not document any pre-defined macro sequences or
# multi-step recipes; only individual command opcodes and transition engines.
# No transitions to enumerate as macros because ME_TRANS_COMMAND/DSK/FTB
# engines already encode the full transition state machine.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Voltage/current/power specs absent.
```

## Notes
- Protocol is binary 32-bit DWORD-oriented; no ASCII command set, no terminators, no checksums. All values 32-bit signed int or IEEE-754 float.
- Four paired (Real-Time, Command) port pairs: (5001,5002), (5003,5004), (5005,5006), (5007,5008). Port 5001/5002 reserved for the hardware Control Panel; external controllers can use them when the panel is absent.
- Source warns explicitly: "When connecting using the Command protocol, be sure to use even port numbers (5002, 5004, 5006, 5008)". Connecting to Real-Time ports with Command Protocol appears to work initially but eventually desyncs.
- Connection Request Channel (port 5009) returns a free Real-Time port. Add +1 to get the matching Command port.
- SET_CONTROL and GET_CONTROL take `Parameter1 = (Section << 16) | Control`. Many (section, control, value) tuples may be packed into a single packet.
- Transition Engines (M/E, DSK, FTB) operate at field rate. Source: "The Transition Engine only processes command[s] at the Field Interval, it is important to wait until a command has been processed (by checking for 'Ready') before checking the Transition State."
- DV_CONTROL_SECTION_SWITCHER exposes >300 control variables across wipe, keyer 1, keyer 2, transitions, DSK1, DSK2, bus matte, FTB, flex src, and flex src DVE.
- Flex Src is not a true Flex Src processor; SE-1200 has a single 2D resizeable DVE tile exposed as Flex Src DVE1.
- Chroma Keyer available on Keyer 1 & Keyer 2 only; not on DSK1/DSK2.
- Memory 1000 is the system memory (always loaded at boot). Memory 0 always loads after system memory at boot.
- STREAMER_SIZE is the only implemented control in STREAMER_CTRL in current software per source.
- Mini-Pic is 96x54 px, 32 bpp, RGBA (R[7:0], G[15:8], B[23:16]).
- Source document refers to software v1.3.3.x; compatibility range not stated.
- Auth: no login/password procedure described anywhere in the document; TCP sockets connect directly to the listed ports.
<!-- UNRESOLVED: voltage/current/power specs absent; protocol version number absent; firmware compatibility range beyond v1.3.3.x not stated; configurable IP / DHCP / multi-unit behavior available "through host configuration files, which are not normally made available to the user" — not formally documented. -->

## Provenance

```yaml
source_domains:
  - github.com
  - datavideo.com
  - datavideo.zendesk.com
source_urls:
  - "https://github.com/RoseOO/datavideo-dvip-docs/raw/refs/heads/master/SE1200MU/Datavideo%20SE-1200%20Ethernet%20Control%20Protocol_E1%2020190710.pdf"
  - https://www.datavideo.com/us/faq/360058612373
  - https://www.datavideo.com/us/faq/360058611993
  - https://www.datavideo.com/us/protocol/list
  - https://datavideo.zendesk.com/hc/en-us/articles/360058612373-SE-1200MU-RS-232-serial-commands-Crestron-control-and-command-strings-examples
retrieved_at: 2026-05-18T06:31:11.014Z
last_checked_at: 2026-06-02T21:41:38.843Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:38.843Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec action units matched verbatim to source opcodes, sub-commands, and RT protocol packets; transport values confirmed; source command catalogue fully covered. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version range not stated (source refers to v1.3.3.x only); voltage/current/power specs absent; protocol version absent."
- "source does not document any pre-defined macro sequences or"
- "source contains no safety warnings, interlock procedures, or"
- "voltage/current/power specs absent; protocol version number absent; firmware compatibility range beyond v1.3.3.x not stated; configurable IP / DHCP / multi-unit behavior available \"through host configuration files, which are not normally made available to the user\" — not formally documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
