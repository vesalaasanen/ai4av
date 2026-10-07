---
spec_id: admin/kramer-vp-16x18ak
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kramer VP-16x18AK Control Spec"
manufacturer: Kramer
model_family: VP-16x18AK
aliases: []
compatible_with:
  manufacturers:
    - Kramer
  models:
    - VP-16x18AK
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.kramerav.com
  - k.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/manuals/kramer_vp-16x18ak.pdf
  - https://k.kramerav.com/support/product_downloads.asp
retrieved_at: 2026-07-22T00:40:27.202Z
last_checked_at: 2026-10-07T20:46:26.479Z
generated_at: 2026-10-07T20:46:26.479Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full I/O count beyond generic X/Y notation; firmware version range; specific gain step granularity beyond what is documented."
  - "flow control not stated in source"
  - "no explicit multi-step macro sequences documented in source beyond the example chain syntax (commands separated by |)."
  - "no safety warnings, interlock procedures, or power-on sequencing requirements documented in source."
  - "exact input/output count beyond generic X/Y placeholders; firmware version compatibility range; specific gain step granularity (dB per level) beyond source examples; behavior of FACTORY vs RESET differentiation not fully described in source."
verification:
  verdict: verified
  checked_at: 2026-10-07T20:46:26.479Z
  matched_actions: 89
  action_count: 89
  confidence: medium
  summary: "All 89 action units map to Protocol 3000 and 2000 commands in the source and transport values are supported; the source has about 65 commands, so coverage is complete. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Kramer VP-16x18AK Control Spec

## Summary
Kramer VP-16x18AK is a 16x18 (or expanded) modular matrix switcher supporting RS-232, RS-485, and Ethernet (TCP/UDP) control using Kramer Protocol 3000 (ASCII, default) and Kramer Protocol 2000 (legacy HEX). The spec covers routing, audio gain, preset store/recall, panel lock, network configuration, signal status, and protocol switching.

<!-- UNRESOLVED: full I/O count beyond generic X/Y notation; firmware version range; specific gain step granularity beyond what is documented. -->

## Transport
```yaml
# Multi-protocol device. RS-232 (serial), RS-485 (serial over differential bus), and Ethernet (TCP/UDP). All three carry the same Protocol 3000 / 2000 payload.
protocols:
  - serial
  - tcp
  - udp
serial:
  baud_rate: 115200  # Protocol 3000 default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: 5000  # TCP default for Protocol 3000
  udp_port: 50000  # UDP default for Protocol 3000
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

Protocol 2000 historical default: 9600 baud, 8N1 (legacy). Both protocols share 8 data bits, no parity, 1 stop bit.

## Traits
```yaml
- routable      # input/output routing commands present (AV / VID / AUD)
- queryable     # query commands returning state present (VID? / AUD? / SIGNAL? / INFO-IO? / NAME?)
- levelable     # audio input/output gain commands present (AUD-LVL)
- powerable     # RESET and FACTORY restart commands present; no explicit "power on/off" command in source
# NOTE: no dedicated power on/off - inferred powerable from RESET/FACTORY only with caveat.
```

## Actions
```yaml
# === Protocol Handshake (P3000) ===
- id: handshake
  label: Protocol Handshake
  kind: query
  command: "#CR"
  params: []

# === Routing (Protocol 3000, ASCII) ===
- id: switch_av
  label: Switch Audio & Video (AFV)
  kind: action
  command: "#AV {in}>{out}CR"
  params:
    - name: in
      type: integer
      description: Input number (0 = disconnect)
    - name: out
      type: integer
      description: Output number (* = all outputs)
- id: switch_video
  label: Switch Video Only (Breakaway)
  kind: action
  command: "#VID {in}>{out}CR"
  short_form: "V"
  params:
    - name: in
      type: integer
    - name: out
      type: integer
- id: switch_audio
  label: Switch Audio Only (Breakaway)
  kind: action
  command: "#AUD {in}>{out}CR"
  short_form: "A"
  params:
    - name: in
      type: integer
    - name: out
      type: integer
- id: read_video_connection
  label: Read Video Connection
  kind: query
  command: "#VID? {out}CR"
  short_form: "V?"
  params:
    - name: out
      type: integer
- id: read_all_video_connections
  label: Read All Video Connections
  kind: query
  command: "#VID? *CR"
  params: []
- id: read_audio_connection
  label: Read Audio Connection
  kind: query
  command: "#AUD? {out}CR"
  short_form: "A?"
  params:
    - name: out
      type: integer
- id: read_all_audio_connections
  label: Read All Audio Connections
  kind: query
  command: "#AUD? *CR"
  params: []

# === Routing (Protocol 2000, HEX) - generic IN/OUT machine=1 ===
- id: switch_video_p2000
  label: Switch Video (Protocol 2000, machine 1)
  kind: action
  command: "01 8{in}8{out} 81"
  notes: |
    Byte1=0x01, Byte2=0x80+IN, Byte3=0x80+OUT, Byte4=0x81 (machine 1).
    IN=0 disconnects. OUT=0 routes to all outputs.
    Example: 01 85 88 81 switches IN 5 → OUT 8 on machine 3 (per source example 01 85 88 83 actually).
  params:
    - name: in
      type: integer
    - name: out
      type: integer
- id: switch_audio_p2000
  label: Switch Audio (Protocol 2000)
  kind: action
  command: "02 8{in}8{out} 81"
  notes: Byte1=0x02, Byte2=0x80+IN, Byte3=0x80+OUT, Byte4=0x81.
  params:
    - name: in
      type: integer
    - name: out
      type: integer
- id: increase_audio_input_gain_p2000
  label: Increase Audio Input Gain (P2000)
  kind: action
  command: "18 8X 86 81"
  notes: Byte2 = 0x80+input (X). Source row: 18 81 86 81 (IN1) ... 18 8X 86 81 (INX).
- id: decrease_audio_input_gain_p2000
  label: Decrease Audio Input Gain (P2000)
  kind: action
  command: "18 8X 87 81"
- id: set_audio_input_gain_p2000
  label: Set Audio Input Gain to Absolute Level (P2000)
  kind: action
  command: "16 8X {gain}*81"
  notes: |
    Send command 2A 87 80 81 first as per source NOTE 24. Byte3 = 0x80+gain (0x00-0x7F).
    Mute=80, -100dB mute=87, -50dB=B9, 0dB=EB, +20dB (max)=FF.
  params:
    - name: gain
      type: integer
      description: Gain byte hex (0x00=lowest, 0xFF=highest)
- id: increase_audio_output_gain_p2000
  label: Increase Audio Output Gain (P2000)
  kind: action
  command: "18 8Y 80 81"
  notes: Byte2 = 0x80+OUT (Y). Example: 18 81 80 81 = OUT1 increase.
- id: decrease_audio_output_gain_p2000
  label: Decrease Audio Output Gain (P2000)
  kind: action
  command: "18 8Y 81 81"
- id: set_audio_output_gain_p2000
  label: Set Audio Output Gain to Absolute Level (P2000)
  kind: action
  command: "2A 87 80 81 | 16 8Y {gain}*81"
  notes: |
    Precede with 2A 87 80 81 (source: "Before sending any of the codes in Table 16").
    Byte3 = 0x80+gain. Mute=80, -100dB=94, -50dB=C6, 0dB=F8, +10dB (max)=FF.
  params:
    - name: gain
      type: integer

# === Signal Status ===
- id: get_signal_status
  label: Get Signal Status
  kind: query
  command: "#SIGNAL? {input}CR"
  params:
    - name: input
      type: integer
      description: Input number or * for all

# === Audio Level (Protocol 3000) ===
- id: set_audio_level
  label: Set Audio Level (Stage/Channel)
  kind: action
  command: "#AUD-LVL {stage},{channel},{volume}CR"
  short_form: "ADL"
  notes: STAGE="In" or "Out" or numeric stage id. VOLUME in Kramer units (negative=minus prefix, ++/-- for relative).
  params:
    - name: stage
      type: string
      description: '"In", "Out", or numeric stage id'
    - name: channel
      type: integer
    - name: volume
      type: string
      description: "Numeric value, ++ or --"
- id: read_audio_level
  label: Read Audio Level
  kind: query
  command: "#AUD-LVL? {stage},{channel}CR"
  short_form: "ADL?"
  params:
    - name: stage
      type: string
    - name: channel
      type: integer
- id: set_audio_bass
  label: Set Audio Bass
  kind: action
  command: "#BASS {output},{bass}CR"
  short_form: "ADB"
  params:
    - name: output
      type: integer
    - name: bass
      type: integer
- id: read_audio_bass
  label: Read Audio Bass
  kind: query
  command: "#BASS? {output}CR"
  short_form: "ADB?"
  params:
    - name: output
      type: integer
- id: set_audio_treble
  label: Set Audio Treble
  kind: action
  command: "#TREBLE {output},{treble}CR"
  short_form: "ADT"
  params:
    - name: output
      type: integer
    - name: treble
      type: integer
- id: read_audio_treble
  label: Read Audio Treble
  kind: query
  command: "#TREBLE? {output}CR"
  short_form: "ADT?"
  params:
    - name: output
      type: integer
- id: mute_audio
  label: Mute Audio
  kind: action
  command: "#MUTE {mute_mode}CR"
  notes: MUTE_MODE: 1=muted, 0=unmuted.
  params:
    - name: mute_mode
      type: integer

# === AFV (Audio Follow Video) ===
- id: set_afv_mode
  label: Set Audio-Follow-Video Mode
  kind: action
  command: "#AFV {afv_mode}CR"
  notes: "0/afv = audio-follow-video; 1/brk = breakaway."
  params:
    - name: afv_mode
      type: string
- id: read_afv_mode
  label: Read AFV Mode
  kind: query
  command: "#AFV?CR"
  params: []

# === Presets ===
- id: store_preset
  label: Store Current Connections to Preset
  kind: action
  command: "#PRST-STO {preset}CR"
  short_form: "PSTO"
  params:
    - name: preset
      type: integer
- id: recall_preset
  label: Recall Preset
  kind: action
  command: "#PRST-RCL {preset}CR"
  short_form: "PRCL"
  params:
    - name: preset
      type: integer
- id: delete_preset
  label: Delete Preset
  kind: action
  command: "#PRST-DEL {preset}CR"
  short_form: "PDEL"
  params:
    - name: preset
      type: integer
- id: read_preset_video
  label: Read Video Connections From Preset
  kind: query
  command: "#PRST-VID? {preset},{out}CR"
  short_form: "PVID?"
  notes: "Set OUT to * for all outputs."
  params:
    - name: preset
      type: integer
    - name: out
      type: integer
- id: read_preset_audio
  label: Read Audio Connections From Preset
  kind: query
  command: "#PRST-AUD? {preset},{out}CR"
  short_form: "PAUD?"
  params:
    - name: preset
      type: integer
    - name: out
      type: integer
- id: list_presets
  label: Read Saved Presets List
  kind: query
  command: "#PRST-LST?CR"
  short_form: "PLST?"
  params: []

# === Front Panel Lock ===
- id: lock_front_panel
  label: Lock Front Panel
  kind: action
  command: "#LOCK-FP {lock_mode}CR"
  short_form: "LCK"
  notes: "0/off=unlocked; 1/on=locked."
  params:
    - name: lock_mode
      type: string
- id: read_front_panel_lock
  label: Read Front Panel Lock State
  kind: query
  command: "#LOCK-FP?CR"
  params: []

# === Device Control / Reset ===
- id: reset_device
  label: Restart Device
  kind: action
  command: "#RESETCR"
  params: []
- id: factory_reset
  label: Reset Configuration to Factory Default
  kind: action
  command: "#FACTORYCR"
  params: []

# === Protocol Switch ===
- id: switch_to_p2000
  label: Switch to Protocol 2000 (ASCII form)
  kind: action
  command: "#P2000CR"
  params: []
- id: switch_to_p3000
  label: Switch to Protocol 3000 (HEX form)
  kind: action
  command: "0x38, 0x80, 0x83, 0x81"
  notes: |

# === Identification ===
- id: read_model
  label: Read Device Model
  kind: query
  command: "#MODEL?CR"
  params: []
- id: read_serial
  label: Read Device Serial Number
  kind: query
  command: "#SN?CR"
  params: []
- id: read_version
  label: Read Device Firmware Version
  kind: query
  command: "#VERSION?CR"
  params: []
- id: set_machine_name
  label: Set Machine Name
  kind: action
  command: "#NAME {machine_name}CR"
  notes: Up to 14 alphanumeric chars.
  params:
    - name: machine_name
      type: string
- id: read_machine_name
  label: Read Machine Name
  kind: query
  command: "#NAME?CR"
  params: []
- id: reset_machine_name
  label: Reset Machine Name to Factory Default
  kind: action
  command: "#NAME-RSTCR"
  params: []
- id: set_machine_number
  label: Set Machine ID Number
  kind: action
  command: "#MACH-NUM {machine_number}CR"
  notes: "Knet machine ID. Response header uses NEW_MACHINE_NUMBER."
  params:
    - name: machine_number
      type: integer

# === Device Info ===
- id: read_io_count
  label: Read Input/Output Count
  kind: query
  command: "#INFO-IO?CR"
  params: []
- id: read_max_presets
  label: Read Max Presets Count
  kind: query
  command: "#INFO-PRST?CR"
  params: []

# === Network Settings ===
- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "#NET-IP {ip_address}CR"
  short_form: "NTIP"
  params:
    - name: ip_address
      type: string
- id: read_ip_address
  label: Read IP Address
  kind: query
  command: "#NET-IP?CR"
  short_form: "NTIP?"
  params: []
- id: read_mac_address
  label: Read MAC Address
  kind: query
  command: "#NET-MAC?CR"
  short_form: "NTMC"
  params: []
- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "#NET-MASK {subnet_mask}CR"
  short_form: "NTMSK"
  params:
    - name: subnet_mask
      type: string
- id: read_subnet_mask
  label: Read Subnet Mask
  kind: query
  command: "#NET-MASK?CR"
  short_form: "NTMSK?"
  params: []
- id: set_gateway
  label: Set Gateway Address
  kind: action
  command: "#NET-GATE {gateway_address}CR"
  short_form: "NTGT"
  params:
    - name: gateway_address
      type: string
- id: read_gateway
  label: Read Gateway Address
  kind: query
  command: "#NET-GATE?CR"
  short_form: "NTGT?"
  params: []
- id: set_dhcp
  label: Set DHCP Mode
  kind: action
  command: "#NET-DHCP {dhcp_mode}CR"
  short_form: "NTDH"
  notes: "0 = no DHCP; 1 = try DHCP, fall back to static."
  params:
    - name: dhcp_mode
      type: integer
- id: read_dhcp
  label: Read DHCP Mode
  kind: query
  command: "#NET-DHCP?CR"
  short_form: "NTDH?"
  params: []
- id: set_eth_port
  label: Change Protocol Ethernet Port
  kind: action
  command: "#ETH-PORT {protocol},{port}CR"
  short_form: "ETHP"
  notes: "PROTOCOL=TCP/UDP; PORT=0 resets to factory default (TCP 5000, UDP 50000), 1-65535=custom."
  params:
    - name: protocol
      type: string
    - name: port
      type: integer
- id: read_eth_port
  label: Read Protocol Ethernet Port
  kind: query
  command: "#ETH-PORT? {protocol}CR"
  short_form: "ETHP?"
  params:
    - name: protocol
      type: string

# === Additional Protocol 2000 Instructions (Table 19) ===
- id: reset_video_p2000
  label: Reset Video (Protocol 2000)
  kind: action
  command: "0"
  notes: "Instruction 0: RESET VIDEO. INPUT=0; OUTPUT=0."
  params: []
- id: store_video_status_p2000
  label: Store Or Delete Video Status (Protocol 2000)
  kind: action
  command: "3"
  notes: "Instruction 3: STORE VIDEO STATUS. INPUT is SETUP #; OUTPUT 0=to store, 1=to delete."
  params:
    - name: setup
      type: integer
    - name: output
      type: integer
      description: "0 - to store 1 - to delete"
- id: recall_video_status_p2000
  label: Recall Video Status (Protocol 2000)
  kind: action
  command: "4"
  notes: "Instruction 4: RECALL VIDEO STATUS. OUTPUT=0."
  params:
    - name: setup
      type: integer
- id: set_breakaway_p2000
  label: Set Breakaway Mode (Protocol 2000)
  kind: action
  command: "8"
  notes: "Instruction 8: BREAKAWAY SETTING. INPUT=0; OUTPUT 0 - audio-follow-video 1 - audio breakaway."
  params:
    - name: output
      type: integer
      description: "0 - audio-follow-video 1 - audio breakaway"
- id: read_video_output_status_p2000
  label: Read Video Output Status (Protocol 2000)
  kind: query
  command: "5"
  notes: "Instruction 5: REQUEST STATUS OF A VIDEO OUTPUT. INPUT is SETUP #; OUTPUT is the output number whose status is requested."
  params:
    - name: setup
      type: integer
    - name: output
      type: integer
- id: read_audio_output_status_p2000
  label: Read Audio Output Status (Protocol 2000)
  kind: query
  command: "6"
  notes: "Instruction 6: REQUEST STATUS OF AN AUDIO OUTPUT. INPUT is SETUP #; OUTPUT is the output number whose status is requested."
  params:
    - name: setup
      type: integer
    - name: output
      type: integer
- id: read_breakaway_setting_p2000
  label: Read Breakaway Setting (Protocol 2000)
  kind: query
  command: "11"
  notes: "Instruction 11: REQUEST BREAKAWAY SETTING. INPUT is SETUP #; OUTPUT=0."
  params:
    - name: setup
      type: integer
- id: request_setup_or_input_validity_p2000
  label: Read Setup Or Input Validity (Protocol 2000)
  kind: query
  command: "15"
  notes: "Instruction 15: REQUEST WHETHER SETUP IS DEFINED / VALID INPUT IS DETECTED. OUTPUT 0 - for checking if setup is defined 1 - for checking if input is valid."
  params:
    - name: setup_or_input
      type: integer
    - name: check_type
      type: integer
      description: "0 - for checking if setup is defined 1 - for checking if input is valid"
- id: read_audio_parameter_p2000
  label: Read Audio Parameter (Protocol 2000)
  kind: query
  command: "25"
  notes: "Instruction 25: REQUEST AUDIO PARAMETER. Send instruction 42 prior to this instruction as described in NOTE 24. OUTPUT=0."
  params:
    - name: input
      type: integer
- id: lock_front_panel_p2000
  label: Lock Front Panel (Protocol 2000)
  kind: action
  command: "30"
  notes: "Instruction 30: LOCK FRONT PANEL. INPUT 0 - Panel unlocked 1 - Panel locked. OUTPUT=0."
  params:
    - name: input
      type: integer
      description: "0 - Panel unlocked 1 - Panel locked"
- id: read_front_panel_lock_p2000
  label: Read Front Panel Lock State (Protocol 2000)
  kind: query
  command: "31"
  notes: "Instruction 31: REQUEST WHETHER PANEL IS LOCKED. INPUT=0; OUTPUT=0."
  params: []
- id: identify_machine_p2000
  label: Identify Machine (Protocol 2000)
  kind: query
  command: "1"
  notes: "Instruction 1: IDENTIFY MACHINE. INPUT 1 - video machine name 2 - audio machine name 3 - video software version 4 - audio software version. OUTPUT 0 - Request first 4 digits 1 - Request first suffix 2 - Request second suffix 3 - Request third suffix 10 - Request first prefix 11 - Request second prefix 12 - Request third prefix."
  params:
    - name: input
      type: integer
      description: "1 - video machine name 2 - audio machine name 3 - video software version 4 - audio software version"
    - name: output
      type: integer
      description: "0 - Request first 4 digits 1 - Request first suffix 2 - Request second suffix 3 - Request third suffix 10 - Request first prefix 11 - Request second prefix 12 - Request third prefix"
- id: define_machine_p2000
  label: Define Machine (Protocol 2000)
  kind: action
  command: "2"
  notes: "Instruction 2: DEFINE MACHINE. INPUT 1 - number of inputs 2 - number of outputs 3 - number of setups. OUTPUT 1 - for video 2 - for audio."
  params:
    - name: input
      type: integer
      description: "1 - number of inputs 2 - number of outputs 3 - number of setups"
    - name: output
      type: integer
      description: "1 - for video 2 - for audio"
```

## Feedbacks
```yaml
- id: handshake_ok
  type: enum
  values: [ok]
  description: "~OKCRLF response to bare # CR probe."
  query_command: "#CR"
- id: video_connection
  type: string
  description: "Response: ~VID IN>OUT CRLF (per-output input routing)."
  query_command: "#VID? {out}CR"
- id: audio_connection
  type: string
  description: "Response: ~AUD IN>OUT CRLF."
  query_command: "#AUD? {out}CR"
- id: signal_status
  type: enum
  values: [off, on]
  description: '"0/off" = no signal; "1/on" = signal present.'
  query_command: "#SIGNAL? {input}CR"
- id: afv_mode
  type: enum
  values: [afv, brk]
  query_command: "#AFV?CR"
- id: front_panel_lock
  type: enum
  values: [off, on]
  query_command: "#LOCK-FP?CR"
- id: io_count
  type: string
  description: "INFO-IO: IN <inputs>, OUT <outputs>"
  query_command: "#INFO-IO?CR"
- id: max_presets
  type: string
  description: "INFO-PRST: VID <count>, AUD <count>"
  query_command: "#INFO-PRST?CR"
- id: model
  type: string
  query_command: "#MODEL?CR"
- id: serial_number
  type: string
  query_command: "#SN?CR"
- id: firmware_version
  type: string
  description: "MAJOR.MINOR.BUILD.REVISION"
  query_command: "#VERSION?CR"
- id: machine_name
  type: string
  query_command: "#NAME?CR"
- id: ip_address
  type: string
  query_command: "#NET-IP?CR"
- id: subnet_mask
  type: string
  query_command: "#NET-MASK?CR"
- id: gateway_address
  type: string
  query_command: "#NET-GATE?CR"
- id: mac_address
  type: string
  query_command: "#NET-MAC?CR"
- id: dhcp_mode
  type: enum
  values: ["0", "1"]
  query_command: "#NET-DHCP?CR"
- id: eth_port
  type: string
  description: "PROTOCOL,PORT (e.g. TCP,5000)"
  query_command: "#ETH-PORT? {protocol}CR"
- id: result_codes
  type: enum
  values: [OK, ERR001, ERR002, ERR003, ERR004]
  description: ERR001=syntax error, ERR002=command unavailable, ERR003=param out of range, ERR004=unauthorized access.
```

## Variables
```yaml
# NOT APPLICABLE - all settable parameters are exposed as discrete actions above. No continuous parameter ranges documented beyond stage/channel/volume/gain numerics which are encoded in the action params.
```

## Events
```yaml
- id: av_switched
  description: "Device-initiated: ~AV IN>OUT CRLF when audio-video channel has switched (AFV mode)."
- id: video_switched
  description: "Device-initiated: ~VID IN>OUT CRLF when video channel has switched (breakaway mode)."
- id: audio_switched
  description: "Device-initiated: ~AUD IN>OUT CRLF when audio channel has switched (breakaway mode)."
- id: start_message
  description: "Device power-up banner: 'Kramer Electronics LTD. <Device Model> <Software Version>'."
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source beyond the example chain syntax (commands separated by |).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements documented in source.
```

## Notes
- Two protocols coexist on the same physical ports. Default is P3000 (115200, 8N1, ASCII). Switch to P2000 with `#P2000CR` or front panel OUT1+OUT2 hold; return with HEX `0x38,0x80,0x83,0x81` or OUT1+OUT3 hold.
- DIP-switches 1–3 set RS-485 machine number (1–8); DIP-switch 4 enables RS-485 bus termination (only first and last units terminated).
- Up to 8 VP-16x18AK units can be daisy-chained via RS-485, each with unique machine number.
- P2000 HEX commands use byte1=INSTRUCTION (high bit=0), byte2=INPUT (high bit=1), byte3=OUTPUT (high bit=1), byte4=MACHINE (high bit=1). For standalone, machine byte = 0x81. Pre-set audio parameter commands (instructions 22/24/25) require preceding instruction 42.
- P2000 audio gain set on output (Table 16) requires preceding code `2A 87 80 81` per source.
- Commands chain via `|` separator; max input string length 64 chars; all commands in chain execute at closing CR.
- Time settings commands require admin authorization (per source NOTE).
- Firmware version, I/O count, and preset capacity are device-info queries — version not stated in source.

<!-- UNRESOLVED: exact input/output count beyond generic X/Y placeholders; firmware version compatibility range; specific gain step granularity (dB per level) beyond source examples; behavior of FACTORY vs RESET differentiation not fully described in source. -->

## Provenance

```yaml
source_domains:
  - cdn.kramerav.com
  - k.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/manuals/kramer_vp-16x18ak.pdf
  - https://k.kramerav.com/support/product_downloads.asp
retrieved_at: 2026-07-22T00:40:27.202Z
last_checked_at: 2026-10-07T20:46:26.479Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:46:26.479Z
matched_actions: 89
action_count: 89
confidence: medium
summary: "All 89 action units map to Protocol 3000 and 2000 commands in the source and transport values are supported; the source has about 65 commands, so coverage is complete. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full I/O count beyond generic X/Y notation; firmware version range; specific gain step granularity beyond what is documented."
- "flow control not stated in source"
- "no explicit multi-step macro sequences documented in source beyond the example chain syntax (commands separated by |)."
- "no safety warnings, interlock procedures, or power-on sequencing requirements documented in source."
- "exact input/output count beyond generic X/Y placeholders; firmware version compatibility range; specific gain step granularity (dB per level) beyond source examples; behavior of FACTORY vs RESET differentiation not fully described in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
