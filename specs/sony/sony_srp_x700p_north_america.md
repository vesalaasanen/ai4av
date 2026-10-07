---
spec_id: admin/sony-srp-x700p
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony SRP-X700P Control Spec"
manufacturer: Sony
model_family: SRP-X700P
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - SRP-X700P
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiocircuit.dk
  - manualslib.com
source_urls:
  - https://audiocircuit.dk/downloads/sony/Sony-SRPX700P-rs232-sm.pdf
  - https://www.manualslib.com/manual/161782/Sony-Rs-232c.html
retrieved_at: 2026-05-03T03:10:42.838Z
last_checked_at: 2026-10-07T16:11:45.783Z
generated_at: 2026-10-07T16:11:45.783Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility ranges for individual commands noted where mentioned (1.20, 1.30) but full matrix not documented"
  - "no power-on sequencing or hardware interlock procedures documented"
  - "exact byte encoding tables for all 74 status parameters only partially documented in summary"
  - "firmware version matrix for Blu-rayDisc, VTR(Inst.), Cassette Deck machine types (>=1.30)"
  - "REMOTE PARAMETER REQUEST opcode is RPIO in source, the same opcode listed for PARALLEL I/O PARAMETER REQUEST; whether this is a source typo is unresolved"
verification:
  verdict: verified
  checked_at: 2026-10-07T16:11:45.783Z
  matched_actions: 108
  action_count: 108
  confidence: medium
  summary: "All 108 action units match source command tokens and shapes, transport matches the source, and the spec covers the full SRP-X700P command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# Sony SRP-X700P Control Spec

## Summary
Sony SRP-X700P Digital Powered Mixer controlled via RS-232C serial interface. Protocol uses ASCII command packets (4-byte command + variable-length parameter + CR delimiter) with ACK/NAK handshake. Supports fader level control, muting, input selection, scene recall/store, parametric EQ, routing, auto-mix, feedback reducer, parallel I/O, projector power control, and CONTROL S IR/Wired remote output.

<!-- UNRESOLVED: firmware version compatibility ranges for individual commands noted where mentioned (1.20, 1.30) but full matrix not documented -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: none
  connector: "D-SUB 9-pin male"
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
traits:
  - powerable     # inferred from projector power control command
  - queryable     # inferred from STATUS REQUEST and parameter request commands
  - levelable     # inferred from fader level commands
  - routable      # inferred from routing commands
```

## Actions
```yaml
actions:
  - id: control_s
    label: "Control S Remote Command"
    kind: action
    command: "CRCS"
    description: "Send CONTROL S IR/Wired remote command to external equipment"
    params:
      - name: channel
        type: enum
        values: ["1", "2", "3", "4", "5", "6", "7", "8"]
        description: "1=LINE3, 2=LINE4A, 3=LINE4B, 4=LINE4C, 5=LINE4D, 6=LINE4E, 7=LINE4F, 8=LINE4(current)"
      - name: remote_command
        type: enum
        values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":"]
        description: "0=Stop, 1=PLAY, 2=PAUSE, 3=STOP, 4=F.F., 5=REW, 6=REC, 7=NEXT, 8=PREV, 9=POWER ON, :=POWER STANDBY"

  - id: fader_level_set
    label: "Set Fader Level"
    kind: action
    command: "CLVL"
    description: "Set fader level on specified channel (-inf to +10 dB). Firmware >=1.30."
    params:
      - name: channel
        type: enum
        values: ["@", "A", "B", "C", "D", "E", "F", "G"]
        description: "@=MASTER A, A=MASTER B, B=REMOTE 1, C=REMOTE 2, D=REMOTE 3, E=REMOTE 4, F=REMOTE 5, G=REMOTE 6"
      - name: level
        type: string
        description: "Single ASCII byte representing dB level (-inf to +10 dB in 0.5 dB steps)"

  - id: level_down
    label: "Level Down"
    kind: action
    command: "CLV-"
    description: "Continuously decrease volume on specified channel until CLVS sent"
    params:
      - name: channel
        type: enum
        values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G"]
        description: "0=MIC1/WL1 through G=REMOTE 6"

  - id: level_up
    label: "Level Up"
    kind: action
    command: "CLV+"
    description: "Continuously increase volume on specified channel until CLVS sent"
    params:
      - name: channel
        type: enum
        values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G"]

  - id: level_stop
    label: "Level Up/Down Stop"
    kind: action
    command: "CLVS"
    description: "Stop continuous level up/down on specified channel"
    params:
      - name: channel
        type: enum
        values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G"]

  - id: line4_select
    label: "LINE 4 Select"
    kind: action
    command: "CSEL"
    description: "Select LINE4 input channel (A-F) or OFF"
    params:
      - name: channel
        type: enum
        values: ["0", "1", "2", "3", "4", "5", "6"]
        description: "0=OFF, 1=A, 2=B, 3=C, 4=D, 5=E, 6=F"

  - id: muting
    label: "Mute/Unmute Channel"
    kind: action
    command: "CMUT"
    description: "Mute or cancel muting on specified channel"
    params:
      - name: channel
        type: enum
        values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D", "E", "F", "G"]
      - name: mute
        type: enum
        values: ["@", "A"]
        description: "@=CANCEL MUTE, A=MUTE"

  - id: parallel_output_off
    label: "Parallel Output Off"
    kind: action
    command: "CPOF"
    description: "Turn off specified parallel output channel"
    params:
      - name: channel
        type: enum
        values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", ":"]
        description: "1-10 (: = 10)"

  - id: parallel_output_on
    label: "Parallel Output On"
    kind: action
    command: "CPON"
    description: "Turn on specified parallel output channel"
    params:
      - name: channel
        type: enum
        values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", ":"]
        description: "1-10 (: = 10)"

  - id: projector_power
    label: "Projector Power Control"
    kind: action
    command: "CPJP"
    description: "Power on or standby the connected projector"
    params:
      - name: power
        type: enum
        values: ["@", "A"]
        description: "@=STANDBY, A=ON"

  - id: scene_recall
    label: "Scene Recall"
    kind: action
    command: "CRCL"
    description: "Recall a scene (1-20)"
    params:
      - name: scene
        type: enum
        values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", ":", ";", "<", "=", ">", "?", "@", "A", "B", "C", "D"]
        description: "1-20 (ASCII encoded)"

  - id: factory_preset
    label: "Factory Preset Reset"
    kind: action
    command: "CRST"
    description: "Reset all parameters to factory defaults. Overwrites all user settings."
    params: []

  - id: panel_lock
    label: "Panel Lock"
    kind: action
    command: "CLCK"
    description: "Lock or unlock front panel operations"
    params:
      - name: lock
        type: enum
        values: ["@", "B"]
        description: "@=LOCK RELEASE, B=LOCK"

  - id: auto_mix_on_off
    label: "Auto Mix On/Off"
    kind: action
    command: "CAMX"
    description: "Enable or disable automatic mixer (5-byte fixed parameter block)"
    params:
      - name: parameters
        type: string
        description: "5-byte parameter; ON bytes: ';31C' followed by 0x7F (DELETE); OFF=';31@@' per source table"

  - id: auto_mix_edit
    label: "Auto Mix Edit Parameters"
    kind: action
    command: "CAMP"
    description: "Set auto mixer parameters (14 bytes). Firmware >=1.20."
    params:
      - name: parameters
        type: string
        description: "14-byte parameter block (compressor, gate, limiter, function on/off, channel enables)"

  - id: fr_setup
    label: "Feedback Reducer Setup"
    kind: action
    command: "CFRS"
    description: "Start/stop feedback reducer auto setup for specified mic channel"
    params:
      - name: channel
        type: enum
        values: ["1", "2", "3", "4", "5", "6", "7"]
        description: "1=MIC1/WL1, 2=MIC2/WL2, 3=MIC3, 4=MIC4, 5=MIC5/LINE1, 6=MIC6/LINE2, 7=CANCEL"

  - id: group_fader_set
    label: "Group Fader Set MASTER A"
    kind: action
    command: "CGFA"
    description: "Set MASTER A group fader assignment. 13-byte parameter with scene memory support."
    params:
      - name: parameters
        type: string
        description: "13-byte block: scene No., 8-byte index, MIC/LINE/OUTPUT fader assignment bytes"

  - id: group_fader_set_master_b
    label: "Group Fader Set MASTER B"
    kind: action
    command: "CGFB"
    description: "Set MASTER B group fader assignment. 13-byte parameter with scene memory support."
    params:
      - name: parameters
        type: string
        description: "13-byte block: scene No., 8-byte index, MIC/LINE/OUTPUT fader assignment bytes"

  - id: group_fader_set_remote_1
    label: "Group Fader Set REMOTE 1"
    kind: action
    command: "CGF1"
    description: "Set REMOTE 1 group fader assignment. 13-byte parameter with scene memory support."
    params:
      - name: parameters
        type: string
        description: "13-byte block: scene No., 8-byte index, MIC/LINE/OUTPUT fader assignment bytes"

  - id: group_fader_set_remote_2
    label: "Group Fader Set REMOTE 2"
    kind: action
    command: "CGF2"
    description: "Set REMOTE 2 group fader assignment. 13-byte parameter with scene memory support."
    params:
      - name: parameters
        type: string
        description: "13-byte block: scene No., 8-byte index, MIC/LINE/OUTPUT fader assignment bytes"

  - id: group_fader_set_remote_3
    label: "Group Fader Set REMOTE 3"
    kind: action
    command: "CGF3"
    description: "Set REMOTE 3 group fader assignment. 13-byte parameter with scene memory support."
    params:
      - name: parameters
        type: string
        description: "13-byte block: scene No., 8-byte index, MIC/LINE/OUTPUT fader assignment bytes"

  - id: group_fader_set_remote_4
    label: "Group Fader Set REMOTE 4"
    kind: action
    command: "CGF4"
    description: "Set REMOTE 4 group fader assignment. 13-byte parameter with scene memory support."
    params:
      - name: parameters
        type: string
        description: "13-byte block: scene No., 8-byte index, MIC/LINE/OUTPUT fader assignment bytes"

  - id: group_fader_set_remote_5
    label: "Group Fader Set REMOTE 5"
    kind: action
    command: "CGF5"
    description: "Set REMOTE 5 group fader assignment. 13-byte parameter with scene memory support."
    params:
      - name: parameters
        type: string
        description: "13-byte block: scene No., 8-byte index, MIC/LINE/OUTPUT fader assignment bytes"

  - id: group_fader_set_remote_6
    label: "Group Fader Set REMOTE 6"
    kind: action
    command: "CGF6"
    description: "Set REMOTE 6 group fader assignment. 13-byte parameter with scene memory support."
    params:
      - name: parameters
        type: string
        description: "13-byte block: scene No., 8-byte index, MIC/LINE/OUTPUT fader assignment bytes"

  - id: information_set
    label: "Set Information / Power-On Setting"
    kind: action
    command: "CINF"
    description: "Set power-on behavior and 128-byte information text. 129-byte parameter."
    params:
      - name: power_on_setting
        type: enum
        values: ["0", "1", "2"]
        description: "0=LAST MEMORY, 1=DEFAULT, 2=SCENE No.1"
      - name: information
        type: string
        description: "128-byte ASCII information string"

  - id: mic_input_set
    label: "MIC Input Channel Setup (MIC1/WL1)"
    kind: action
    command: "CIM1"
    description: "Configure MIC1/WL1 input channel (41-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "41-byte block: scene, index, trim, PEQ, FR, compressor, gain limit, fader"

  - id: mic_input_set_mic2_wl2
    label: "MIC Input Channel Setup (MIC2/WL2)"
    kind: action
    command: "CIM2"
    description: "Configure MIC2/WL2 input channel (41-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "41-byte block: scene, index, trim, PEQ, FR, compressor, gain limit, fader"

  - id: mic_input_set_mic3
    label: "MIC Input Channel Setup (MIC3)"
    kind: action
    command: "CIM3"
    description: "Configure MIC3 input channel (41-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "41-byte block: scene, index, trim, PEQ, FR, compressor, gain limit, fader"

  - id: mic_input_set_mic4
    label: "MIC Input Channel Setup (MIC4)"
    kind: action
    command: "CIM4"
    description: "Configure MIC4 input channel (41-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "41-byte block: scene, index, trim, PEQ, FR, compressor, gain limit, fader"

  - id: mic_input_set_mic5_line1
    label: "MIC Input Channel Setup (MIC5/LINE1)"
    kind: action
    command: "CIM5"
    description: "Configure MIC5/LINE1 input channel (41-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "41-byte block: scene, index, trim, PEQ, FR, compressor, gain limit, fader"

  - id: mic_input_set_mic6_line2
    label: "MIC Input Channel Setup (MIC6/LINE2)"
    kind: action
    command: "CIM6"
    description: "Configure MIC6/LINE2 input channel (41-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "41-byte block: scene, index, trim, PEQ, FR, compressor, gain limit, fader"

  - id: line3_input_set
    label: "LINE 3 Input Setup"
    kind: action
    command: "CIL3"
    description: "Configure LINE 3 input channel (19-byte parameter)"
    params:
      - name: parameters
        type: string
        description: "19-byte block: scene, index, trim, PEQ, gain limit, fader"

  - id: line4_input_set
    label: "LINE 4 Input Setup"
    kind: action
    command: "CIL4"
    description: "Configure LINE 4 input channel (64-byte parameter for A-F sub-channels)"
    params:
      - name: parameters
        type: string
        description: "64-byte block: scene, indexes A-F, trims A-F, PEQ, gain limit, fader"

  - id: line_output_1_2_set
    label: "LINE OUTPUT 1 Setup"
    kind: action
    command: "COL1"
    description: "Configure LINE OUTPUT 1 (47-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "47-byte block: scene, index, ref level, PEQ1-11, delay, gain limit, fader"

  - id: line_output_2_set
    label: "LINE OUTPUT 2 Setup"
    kind: action
    command: "COL2"
    description: "Configure LINE OUTPUT 2 (47-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "47-byte block: scene, index, ref level, PEQ1-11, delay, gain limit, fader"

  - id: line_output_3_8_set
    label: "LINE OUTPUT 3 Setup"
    kind: action
    command: "COL3"
    description: "Configure LINE OUTPUT 3 (26-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "26-byte block: scene, index, ref level, PEQ1-4, delay, gain limit, fader"

  - id: line_output_4_set
    label: "LINE OUTPUT 4 Setup"
    kind: action
    command: "COL4"
    description: "Configure LINE OUTPUT 4 (26-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "26-byte block: scene, index, ref level, PEQ1-4, delay, gain limit, fader"

  - id: line_output_5_set
    label: "LINE OUTPUT 5 Setup"
    kind: action
    command: "COL5"
    description: "Configure LINE OUTPUT 5 (26-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "26-byte block: scene, index, ref level, PEQ1-4, delay, gain limit, fader"

  - id: line_output_6_set
    label: "LINE OUTPUT 6 Setup"
    kind: action
    command: "COL6"
    description: "Configure LINE OUTPUT 6 (26-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "26-byte block: scene, index, ref level, PEQ1-4, delay, gain limit, fader"

  - id: line_output_7_set
    label: "LINE OUTPUT 7 Setup"
    kind: action
    command: "COL7"
    description: "Configure LINE OUTPUT 7 (26-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "26-byte block: scene, index, ref level, PEQ1-4, delay, gain limit, fader"

  - id: line_output_8_set
    label: "LINE OUTPUT 8 Setup"
    kind: action
    command: "COL8"
    description: "Configure LINE OUTPUT 8 (26-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "26-byte block: scene, index, ref level, PEQ1-4, delay, gain limit, fader"

  - id: muting_line4_select_scene
    label: "Muting/LINE4 Select Scene Store"
    kind: action
    command: "CMTS"
    description: "Write muting and LINE4 select setup to scene memory (8-byte parameter)"
    params:
      - name: parameters
        type: string
        description: "8-byte block: scene No., MIC muting, LINE muting, output muting, LINE4 select"

  - id: parallel_io_set
    label: "Parallel I/O Setup"
    kind: action
    command: "CPIO"
    description: "Set parallel I/O terminal functions (44-byte parameter)"
    params:
      - name: parameters
        type: string
        description: "44-byte block: input1-12 function1/2, output1-10 function1/2"

  - id: remote_set
    label: "Remote (CONTROL S / Projector) Setup"
    kind: action
    command: "CSIO"
    description: "Set CONTROL S output and projector control configuration (24-byte parameter)"
    params:
      - name: parameters
        type: string
        description: "24-byte block: machine types, connected channels, I/F type, PJ control, signal defines, protocol"

  - id: routing_set
    label: "Routing Set LINE OUTPUT 1"
    kind: action
    command: "CRL1"
    description: "Set input-to-output routing for LINE OUTPUT 1 (20-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "20-byte block: scene, levels, ON/OFF routing bits"

  - id: routing_set_line_out_2
    label: "Routing Set LINE OUTPUT 2"
    kind: action
    command: "CRL2"
    description: "Set input-to-output routing for LINE OUTPUT 2 (20-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "20-byte block: scene, levels, ON/OFF routing bits"

  - id: routing_set_line_out_3
    label: "Routing Set LINE OUTPUT 3"
    kind: action
    command: "CRL3"
    description: "Set input-to-output routing for LINE OUTPUT 3 (20-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "20-byte block: scene, levels, ON/OFF routing bits"

  - id: routing_set_line_out_4
    label: "Routing Set LINE OUTPUT 4"
    kind: action
    command: "CRL4"
    description: "Set input-to-output routing for LINE OUTPUT 4 (20-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "20-byte block: scene, levels, ON/OFF routing bits"

  - id: routing_set_line_out_5
    label: "Routing Set LINE OUTPUT 5"
    kind: action
    command: "CRL5"
    description: "Set input-to-output routing for LINE OUTPUT 5 (20-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "20-byte block: scene, levels, ON/OFF routing bits"

  - id: routing_set_line_out_6
    label: "Routing Set LINE OUTPUT 6"
    kind: action
    command: "CRL6"
    description: "Set input-to-output routing for LINE OUTPUT 6 (20-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "20-byte block: scene, levels, ON/OFF routing bits"

  - id: routing_set_line_out_7
    label: "Routing Set LINE OUTPUT 7"
    kind: action
    command: "CRL7"
    description: "Set input-to-output routing for LINE OUTPUT 7 (20-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "20-byte block: scene, levels, ON/OFF routing bits"

  - id: routing_set_line_out_8
    label: "Routing Set LINE OUTPUT 8"
    kind: action
    command: "CRL8"
    description: "Set input-to-output routing for LINE OUTPUT 8 (20-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "20-byte block: scene, levels, ON/OFF routing bits"

  - id: routing_set_rec_out_1
    label: "Routing Set REC OUT 1"
    kind: action
    command: "CRR1"
    description: "Set input-to-output routing for REC OUT 1 (20-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "20-byte block: scene, levels, ON/OFF routing bits"

  - id: routing_set_rec_out_2
    label: "Routing Set REC OUT 2"
    kind: action
    command: "CRR2"
    description: "Set input-to-output routing for REC OUT 2 (20-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "20-byte block: scene, levels, ON/OFF routing bits"

  - id: scene_store
    label: "Scene Store"
    kind: action
    command: "CSTR"
    description: "Store current state to scene memory (11-byte parameter)"
    params:
      - name: parameters
        type: string
        description: "11-byte block: scene No., 8-byte index, function1, function2"

  - id: scene_recall_button
    label: "Scene Recall Button Assignment"
    kind: action
    command: "CRSA"
    description: "Assign scene numbers to front panel RECALL A-D buttons (4-byte parameter)"
    params:
      - name: parameters
        type: string
        description: "4 scene numbers for buttons A, B, C, D"

  - id: speaker_output_set
    label: "Speaker Output Setup"
    kind: action
    command: "COSP"
    description: "Set speaker output configuration (22-byte parameter)"
    params:
      - name: parameters
        type: string
        description: "22-byte block: scene, function on/off, CH1/CH2 index, selector, ATT"

  - id: rec_out_set
    label: "REC OUT 1 Setup"
    kind: action
    command: "COR1"
    description: "Set REC OUT 1 configuration (10-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "10-byte block: scene, index, ref level"

  - id: rec_out_2_set
    label: "REC OUT 2 Setup"
    kind: action
    command: "COR2"
    description: "Set REC OUT 2 configuration (10-byte parameter)."
    params:
      - name: parameters
        type: string
        description: "10-byte block: scene, index, ref level"
```

## Feedbacks
```yaml
feedbacks:
  - id: ack
    type: enum
    values: ["ACK", "NAK"]
    description: "ACK (0x41 'A') returned on success; NAK (0x4E 'N') on failure"

  - id: status_request
    type: raw
    description: "RSTT command returns single parameter value; RAST returns 74-byte global status"
    command: "RSTT"
    query_command: "RSTT"

  - id: all_status
    type: raw
    description: "Global read of all 74 parameters (level meters, fader values, muting states, etc.)"
    command: "RAST"
    query_command: "RAST"

  - id: firmware_version
    type: string
    description: "RVER returns 7-byte ASCII firmware version + fixed trailing byte"
    command: "RVER"
    query_command: "RVER"

  - id: auto_mix_parameter
    type: raw
    description: "RAMX returns auto mix on/off state (5-byte parameter)"
    command: "RAMX"
    query_command: "RAMX"

  - id: auto_mix_edit_parameter
    type: raw
    description: "RAMP returns 14-byte auto mixer parameter block. Firmware >=1.20."
    command: "RAMP"
    query_command: "RAMP"

  - id: group_fader_parameter
    type: raw
    description: "RGFA returns 12-byte group fader parameter block for MASTER A"
    command: "RGFA"
    query_command: "RGFA"

  - id: group_fader_parameter_master_b
    type: raw
    description: "RGFB returns 12-byte group fader parameter block for MASTER B"
    command: "RGFB"
    query_command: "RGFB"

  - id: group_fader_parameter_remote_1
    type: raw
    description: "RGF1 returns 12-byte group fader parameter block for REMOTE 1"
    command: "RGF1"
    query_command: "RGF1"

  - id: group_fader_parameter_remote_2
    type: raw
    description: "RGF2 returns 12-byte group fader parameter block for REMOTE 2"
    command: "RGF2"
    query_command: "RGF2"

  - id: group_fader_parameter_remote_3
    type: raw
    description: "RGF3 returns 12-byte group fader parameter block for REMOTE 3"
    command: "RGF3"
    query_command: "RGF3"

  - id: group_fader_parameter_remote_4
    type: raw
    description: "RGF4 returns 12-byte group fader parameter block for REMOTE 4"
    command: "RGF4"
    query_command: "RGF4"

  - id: group_fader_parameter_remote_5
    type: raw
    description: "RGF5 returns 12-byte group fader parameter block for REMOTE 5"
    command: "RGF5"
    query_command: "RGF5"

  - id: group_fader_parameter_remote_6
    type: raw
    description: "RGF6 returns 12-byte group fader parameter block for REMOTE 6"
    command: "RGF6"
    query_command: "RGF6"

  - id: information_parameter
    type: raw
    description: "RINF returns 129-byte block (power-on setting + 128-byte information text)"
    command: "RINF"
    query_command: "RINF"

  - id: mic_input_parameter
    type: raw
    description: "RIM1 returns 40-byte MIC input parameter block for MIC1/WL1"
    command: "RIM1"
    query_command: "RIM1"

  - id: mic_input_parameter_mic2_wl2
    type: raw
    description: "RIM2 returns 40-byte MIC input parameter block for MIC2/WL2"
    command: "RIM2"
    query_command: "RIM2"

  - id: mic_input_parameter_mic3
    type: raw
    description: "RIM3 returns 40-byte MIC input parameter block for MIC3"
    command: "RIM3"
    query_command: "RIM3"

  - id: mic_input_parameter_mic4
    type: raw
    description: "RIM4 returns 40-byte MIC input parameter block for MIC4"
    command: "RIM4"
    query_command: "RIM4"

  - id: mic_input_parameter_mic5_line1
    type: raw
    description: "RIM5 returns 40-byte MIC input parameter block for MIC5/LINE1"
    command: "RIM5"
    query_command: "RIM5"

  - id: mic_input_parameter_mic6_line2
    type: raw
    description: "RIM6 returns 40-byte MIC input parameter block for MIC6/LINE2"
    command: "RIM6"
    query_command: "RIM6"

  - id: line3_input_parameter
    type: raw
    description: "RIL3 returns 18-byte LINE 3 input parameter block"
    command: "RIL3"
    query_command: "RIL3"

  - id: line4_input_parameter
    type: raw
    description: "RIL4 returns 63-byte LINE 4 input parameter block"
    command: "RIL4"
    query_command: "RIL4"

  - id: line_output_1_2_parameter
    type: raw
    description: "ROL1 returns 46-byte LINE OUTPUT 1 parameter block"
    command: "ROL1"
    query_command: "ROL1"

  - id: line_output_2_parameter
    type: raw
    description: "ROL2 returns 46-byte LINE OUTPUT 2 parameter block"
    command: "ROL2"
    query_command: "ROL2"

  - id: line_output_3_8_parameter
    type: raw
    description: "ROL3 returns 25-byte LINE OUTPUT 3 parameter block"
    command: "ROL3"
    query_command: "ROL3"

  - id: line_output_4_parameter
    type: raw
    description: "ROL4 returns 25-byte LINE OUTPUT 4 parameter block"
    command: "ROL4"
    query_command: "ROL4"

  - id: line_output_5_parameter
    type: raw
    description: "ROL5 returns 25-byte LINE OUTPUT 5 parameter block"
    command: "ROL5"
    query_command: "ROL5"

  - id: line_output_6_parameter
    type: raw
    description: "ROL6 returns 25-byte LINE OUTPUT 6 parameter block"
    command: "ROL6"
    query_command: "ROL6"

  - id: line_output_7_parameter
    type: raw
    description: "ROL7 returns 25-byte LINE OUTPUT 7 parameter block"
    command: "ROL7"
    query_command: "ROL7"

  - id: line_output_8_parameter
    type: raw
    description: "ROL8 returns 25-byte LINE OUTPUT 8 parameter block"
    command: "ROL8"
    query_command: "ROL8"

  - id: muting_line4_select_parameter
    type: raw
    description: "RMTS returns 7-byte muting/LINE4 select parameter block for specified scene"
    command: "RMTS"
    query_command: "RMTS"

  - id: parallel_io_parameter
    type: raw
    description: "RPIO returns 44-byte parallel I/O configuration"
    command: "RPIO"
    query_command: "RPIO"

  - id: rec_out_parameter
    type: raw
    description: "ROR1 returns 9-byte REC OUT 1 parameter block"
    command: "ROR1"
    query_command: "ROR1"

  - id: rec_out_2_parameter
    type: raw
    description: "ROR2 returns 9-byte REC OUT 2 parameter block"
    command: "ROR2"
    query_command: "ROR2"

  - id: remote_parameter
    type: raw
    description: "RPIO is the REMOTE PARAMETER REQUEST opcode printed in the source; whether this shared opcode is a source typo is UNRESOLVED"
    command: "RPIO"
    query_command: "RPIO"

  - id: routing_parameter
    type: raw
    description: "RRL1 returns 19-byte routing parameter block for LINE OUTPUT 1"
    command: "RRL1"
    query_command: "RRL1"

  - id: routing_parameter_line_out_2
    type: raw
    description: "RRL2 returns 19-byte routing parameter block for LINE OUTPUT 2"
    command: "RRL2"
    query_command: "RRL2"

  - id: routing_parameter_line_out_3
    type: raw
    description: "RRL3 returns 19-byte routing parameter block for LINE OUTPUT 3"
    command: "RRL3"
    query_command: "RRL3"

  - id: routing_parameter_line_out_4
    type: raw
    description: "RRL4 returns 19-byte routing parameter block for LINE OUTPUT 4"
    command: "RRL4"
    query_command: "RRL4"

  - id: routing_parameter_line_out_5
    type: raw
    description: "RRL5 returns 19-byte routing parameter block for LINE OUTPUT 5"
    command: "RRL5"
    query_command: "RRL5"

  - id: routing_parameter_line_out_6
    type: raw
    description: "RRL6 returns 19-byte routing parameter block for LINE OUTPUT 6"
    command: "RRL6"
    query_command: "RRL6"

  - id: routing_parameter_line_out_7
    type: raw
    description: "RRL7 returns 19-byte routing parameter block for LINE OUTPUT 7"
    command: "RRL7"
    query_command: "RRL7"

  - id: routing_parameter_line_out_8
    type: raw
    description: "RRL8 returns 19-byte routing parameter block for LINE OUTPUT 8"
    command: "RRL8"
    query_command: "RRL8"

  - id: routing_parameter_rec_out_1
    type: raw
    description: "RRR1 returns 19-byte routing parameter block for REC OUT 1"
    command: "RRR1"
    query_command: "RRR1"

  - id: routing_parameter_rec_out_2
    type: raw
    description: "RRR2 returns 19-byte routing parameter block for REC OUT 2"
    command: "RRR2"
    query_command: "RRR2"

  - id: scene_index
    type: raw
    description: "RSCI returns 8-byte scene index for specified scene number"
    command: "RSCI"
    query_command: "RSCI"

  - id: scene_parameter
    type: raw
    description: "RSTR returns 40-byte scene recall function configuration for all 20 scenes"
    command: "RSTR"
    query_command: "RSTR"

  - id: scene_recall_button_parameter
    type: raw
    description: "RRSA returns 4-byte scene recall button assignments"
    command: "RRSA"
    query_command: "RRSA"

  - id: speaker_output_parameter
    type: raw
    description: "ROSP returns 21-byte speaker output parameter block"
    command: "ROSP"
    query_command: "ROSP"
```

## Variables
```yaml
# Variables are implicitly covered by the parameter-set commands (fader level, PEQ, routing, etc.)
# No separate variable namespace documented beyond the action/feedback system.
```

## Events
```yaml
# No unsolicited events documented. Protocol is strictly poll-based (computer sends command, device responds).
```

## Macros
```yaml
# Scene recall provides multi-parameter restore but is not a step-by-step macro in source.
# SCENE STORE procedure (source page 60) is a documented multi-step sequence:
#   1. Send parameter-set commands (CIM/CIL/COL/COR/CRL/CRR/CMTS/CGF) targeting the desired scene No.
#   2. Send CSTR with scene No., index, and FUNCTION1/2 recall-enable bits to commit.
```

## Safety
```yaml
confirmation_required_for:
  - factory_preset  # Overwrites all user settings including scene memories
interlocks:
  - description: "Control S remote commands (PLAY, PAUSE, etc.) require a follow-up Stop Sending command (0x30) to terminate the signal"
  - description: "Do not assign INPUT fader and OUTPUT fader to the same GROUP FADER channel"
# UNRESOLVED: no power-on sequencing or hardware interlock procedures documented
```

## Notes
- Protocol uses half-duplex start-stop (asynchronous) serial communication.
- Command packets: 4-byte ASCII command + variable-length parameter + 0x0D (CR) delimiter.
- ACK (0x41 'A') on success; NAK (0x4E 'N') on failure. Additional data may follow ACK for query commands.
- Computer must wait for ACK/NAK before sending next command. 1000 ms timeout; re-send if no response.
- Command transmission must complete within 500 ms or NAK returned.
- CONTROL S signals require explicit Stop Sending (0x30) after each remote command.
- FADER LEVEL (CLVL) command requires firmware >=1.30. AUTO MIX EDIT (CAMP/RAMP) requires >=1.20.
- Scene memory supports 20 scenes (1-20). Scene No. 0x30 ('0') means NONE (current state, no write).
- Level meter values range from under -30 dB to +3 dB. Fader values range from -inf to +10 dB (CLVL) or +20 dB (status).
- All parameter values encoded as single ASCII bytes with specific hex-to-character mappings documented in source tables.
- Per-channel opcodes enumerated as distinct actions per source tables: GROUP FADER (CGFA/CGFB/CGF1-6), MIC INPUT (CIM1-6), LINE OUTPUT (COL1-2/COL3-8), REC OUT (COR1-2), ROUTING (CRL1-8/CRR1-2), plus matching parameter-request opcodes.
- CONTROL S machine types Blu-rayDisc (0x39), VTR(Inst.) (0x3A), Cassette Deck (0x3B) require firmware >=1.30.
- Projector protocols VPL-PX11 (0x37), VPL-PX40/35 (0x38), PFM-50C1 (0x39) require firmware >=1.20.

<!-- UNRESOLVED: exact byte encoding tables for all 74 status parameters only partially documented in summary -->
<!-- UNRESOLVED: firmware version matrix for Blu-rayDisc, VTR(Inst.), Cassette Deck machine types (>=1.30) -->
<!-- UNRESOLVED: REMOTE PARAMETER REQUEST opcode is RPIO in source, the same opcode listed for PARALLEL I/O PARAMETER REQUEST; whether this is a source typo is unresolved -->
```

## Provenance

```yaml
source_domains:
  - audiocircuit.dk
  - manualslib.com
source_urls:
  - https://audiocircuit.dk/downloads/sony/Sony-SRPX700P-rs232-sm.pdf
  - https://www.manualslib.com/manual/161782/Sony-Rs-232c.html
retrieved_at: 2026-05-03T03:10:42.838Z
last_checked_at: 2026-10-07T16:11:45.783Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T16:11:45.783Z
matched_actions: 108
action_count: 108
confidence: medium
summary: "All 108 action units match source command tokens and shapes, transport matches the source, and the spec covers the full SRP-X700P command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility ranges for individual commands noted where mentioned (1.20, 1.30) but full matrix not documented"
- "no power-on sequencing or hardware interlock procedures documented"
- "exact byte encoding tables for all 74 status parameters only partially documented in summary"
- "firmware version matrix for Blu-rayDisc, VTR(Inst.), Cassette Deck machine types (>=1.30)"
- "REMOTE PARAMETER REQUEST opcode is RPIO in source, the same opcode listed for PARALLEL I/O PARAMETER REQUEST; whether this is a source typo is unresolved"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
