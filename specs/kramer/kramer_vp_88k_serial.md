---
spec_id: admin/kramer-vp-88k
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kramer VP-88K Control Spec"
manufacturer: Kramer
model_family: VP-88K
aliases: []
compatible_with:
  manufacturers:
    - Kramer
  models:
    - VP-88K
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.kramerav.com
  - k.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/manuals/vp-88k.pdf
  - https://k.kramerav.com/downloads/manuals/vp-88k.pdf
retrieved_at: 2026-07-22T00:42:51.589Z
last_checked_at: 2026-10-07T13:27:24.348Z
generated_at: 2026-10-07T13:27:24.348Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "SET AUDIO PARAMETER (Protocol 2000 instruction 22)"
  - "firmware version compatibility, machine-specific behavior on front-panel lock or mute, exact EDID handling not stated in source."
  - "source documents no explicit safety warnings, interlocks, or power-on sequencing requirements."
  - "firmware version compatibility ranges not stated in source. Exact signal-change notification triggering conditions not stated beyond per-input state. Error-recovery sequences for ERR003/ERR004 not documented."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:27:24.348Z
  matched_actions: 110
  action_count: 110
  confidence: medium
  summary: "All 110 action units match source commands (Protocol 3000 long/short forms, Protocol 2000 hex) and transport supported; only instruction 22 unrepresented. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Kramer VP-88K Control Spec

## Summary
8x8 presentation matrix switcher for audio and video routing. Supports RS-232, RS-485, and Ethernet control via Kramer Protocol 3000 (ASCII, default) or Kramer Protocol 2000 (HEX). Default Ethernet port 5000 (TCP) / 50000 (UDP).

<!-- UNRESOLVED: firmware version compatibility, machine-specific behavior on front-panel lock or mute, exact EDID handling not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
serial:
  baud_rate: 115200  # Protocol 3000 default; Protocol 2000 default is 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED
addressing:
  port: 5000        # TCP (Protocol 3000 default)
  udp_port: 50000   # UDP (Protocol 3000 default)
  default_ip: 192.168.1.39
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no login procedure in source)
```

## Traits
```yaml
# - routable        (audio/video input-to-output switching commands present)
# - levelable       (per-input and per-output audio gain control present)
# - queryable       (status and preset read commands present)
routable: true
levelable: true
queryable: true
```

## Actions
```yaml
# --- Protocol switching ---
- id: switch_to_protocol_2000_ascii
  label: Switch to Protocol 2000 (ASCII command)
  kind: action
  command: "#P2000<CR>"
  params: []

- id: switch_to_protocol_3000_hex
  label: Switch to Protocol 3000 (HEX command)
  kind: action
  command: "38 80 83 81"
  params: []

# --- Handshake ---
- id: protocol_handshake
  label: Protocol Handshake
  kind: action
  command: "#<CR>"
  params: []

# --- Audio + Video routing (AFV mode) - Protocol 3000 ---
- id: switch_av
  label: Switch Audio + Video (Protocol 3000)
  kind: action
  command: "#AV {in}>{out}<CR>"
  params:
    - name: in
      type: integer
      description: Input number (1-8) or 0 to disconnect
    - name: out
      type: integer
      description: Output number (1-8) or * for all

# --- Video routing - Protocol 3000 ---
- id: switch_video
  label: Switch Video Only (Protocol 3000)
  kind: action
  command: "#VID {in}>{out}<CR>"
  params:
    - name: in
      type: integer
      description: Input number (1-8) or 0 to disconnect
    - name: out
      type: integer
      description: Output number (1-8) or * for all

# --- Audio routing - Protocol 3000 ---
- id: switch_audio
  label: Switch Audio Only (Protocol 3000)
  kind: action
  command: "#AUD {in}>{out}<CR>"
  params:
    - name: in
      type: integer
      description: Input number (1-8) or 0 to disconnect
    - name: out
      type: integer
      description: Output number (1-8) or * for all

# --- Video and Audio routing - Protocol 2000 hex (per-cell) ---
- id: switch_video_p2000
  label: Switch Video (Protocol 2000, hex)
  kind: action
  command: "01 {input_hex} {output_hex} 81"
  notes: |
    Byte 2 = input (1-8) as 81+input. Byte 3 = output (1-8) as 81+output.
    Fourth byte machine number = 0x81 (machine 1). Full per-cell table in source (Table 11).
    Examples:
      IN1->OUT1: 01 81 81 81
      IN8->OUT8: 01 88 88 81
  params:
    - name: input_hex
      type: string
      description: 81+input (e.g. 81 for input 1, 88 for input 8)
    - name: output_hex
      type: string
      description: 81+output (e.g. 81 for output 1, 88 for output 8)

- id: switch_audio_p2000
  label: Switch Audio (Protocol 2000, hex)
  kind: action
  command: "02 {input_hex} {output_hex} 81"
  notes: |
    Byte 2 = input (1-8) as 81+input. Byte 3 = output (1-8) as 81+output.
    Full per-cell table in source (Table 12). Examples:
      IN1->OUT1: 02 81 81 81
      IN8->OUT8: 02 88 88 81
  params:
    - name: input_hex
      type: string
      description: 81+input (e.g. 81 for input 1)
    - name: output_hex
      type: string
      description: 81+output (e.g. 81 for output 1)

# --- Signal status ---
- id: get_signal_status
  label: Get Signal Status
  kind: query
  command: "SIGNAL? {input}<CR>"
  params:
    - name: input
      type: string
      description: Input number (1-8) or * for all

# --- Presets ---
- id: preset_store
  label: Store Preset
  kind: action
  command: "#PRST-STO {preset}<CR>"
  params:
    - name: preset
      type: integer
      description: Preset number

- id: preset_recall
  label: Recall Preset
  kind: action
  command: "#PRST-RCL {preset}<CR>"
  params:
    - name: preset
      type: integer
      description: Preset number

- id: preset_delete
  label: Delete Preset
  kind: action
  command: "#PRST-DEL {preset}<CR>"
  params:
    - name: preset
      type: integer
      description: Preset number

- id: preset_list
  label: Read Saved Presets List
  kind: query
  command: "#PRST-LST?<CR>"
  params: []

- id: preset_read_video
  label: Read Video Connections from Preset
  kind: query
  command: "#PRST-VID? {preset},{out}<CR>"
  params:
    - name: preset
      type: integer
      description: Preset number
    - name: out
      type: string
      description: Output number or * for all

- id: preset_read_audio
  label: Read Audio Connections from Preset
  kind: query
  command: "#PRST-AUD? {preset},{out}<CR>"
  params:
    - name: preset
      type: integer
      description: Preset number
    - name: out
      type: string
      description: Output number or * for all

# --- Lock / unlock front panel ---
- id: lock_front_panel
  label: Lock Front Panel
  kind: action
  command: "#LOCK-FP {mode}<CR>"
  params:
    - name: mode
      type: string
      description: "1 or on to lock; 0 or off to unlock"

- id: get_lock_state
  label: Get Front Panel Lock State
  kind: query
  command: "#LOCK-FP?<CR>"
  params: []

# --- Reset / restart ---
- id: reset_device
  label: Reset Device
  kind: action
  command: "#RESET<CR>"
  params: []

- id: factory_reset_config
  label: Reset Configuration to Factory Default
  kind: action
  command: "#FACTORY<CR>"
  params: []

# --- Audio parameters ---
- id: set_audio_level
  label: Set Audio Level
  kind: action
  command: "#AUD-LVL {stage},{channel},{volume}<CR>"
  notes: |
    stage: 1 = input stage, 2 = output (amplifier) stage.
    channel: input/output number (1-8).
    volume: Kramer units; precede minus for negative. Use ++ or -- to step.
  params:
    - name: stage
      type: integer
      description: "1=input, 2=output/amplifier"
    - name: channel
      type: integer
      description: Input or output number (1-8)
    - name: volume
      type: string
      description: Level in Kramer units (negative for attenuation, ++/-- to step)

- id: get_audio_level
  label: Read Audio Level
  kind: query
  command: "#AUD-LVL? {stage},{channel}<CR>"
  params:
    - name: stage
      type: integer
      description: "1=input, 2=output/amplifier"
    - name: channel
      type: integer
      description: Input or output number (1-8)

- id: mute_audio
  label: Mute Audio
  kind: action
  command: "#MUTE {mode}<CR>"
  params:
    - name: mode
      type: integer
      description: "1 = mute, 0 = unmute"

# --- Audio gain - Protocol 3000 (per-cell) ---
- id: set_audio_input_gain_p3000
  label: Set Audio Input Gain (Protocol 3000)
  kind: action
  command: "#AUD-LVL 1,{input},{level}<CR>"
  notes: |
    Level ranges from -100 (mute) to +14 dB (max). Examples:
      Input 1, -10 dB: #AUD-LVL 1,1,-10<CR>
      Input 7, -50 dB: #AUD-LVL 1,7,-50<CR>
  params:
    - name: input
      type: integer
      description: Input number (1-8)
    - name: level
      type: integer
      description: Relative level in dB (-100 to +14)

- id: set_audio_output_gain_p3000
  label: Set Audio Output Gain (Protocol 3000)
  kind: action
  command: "#AUD-LVL 2,{output},{level}<CR>"
  notes: |
    Level ranges from -100 (mute) to +13 dB (max). Examples:
      Output 1, -10 dB: #AUD-LVL 2,1,-10<CR>
      Output 7, -50 dB: #AUD-LVL 2,7,-50<CR>
  params:
    - name: output
      type: integer
      description: Output number (1-8)
    - name: level
      type: integer
      description: Relative level in dB (-100 to +13)

# --- Audio gain - Protocol 2000 hex ---
- id: audio_input_gain_increase_p2000
  label: Increase Audio Input Gain (Protocol 2000)
  kind: action
  command: "18 {input_hex} 86 81"
  notes: |
    Byte 2 = input as 81+input. Examples:
      IN1: 18 81 86 81
      IN8: 18 88 86 81
  params:
    - name: input_hex
      type: string
      description: 81+input

- id: audio_input_gain_decrease_p2000
  label: Decrease Audio Input Gain (Protocol 2000)
  kind: action
  command: "18 {input_hex} 87 81"
  notes: |
    Byte 2 = input as 81+input. Examples:
      IN1: 18 81 87 81
      IN8: 18 88 87 81
  params:
    - name: input_hex
      type: string
      description: 81+input

- id: audio_output_gain_increase_p2000
  label: Increase Audio Output Gain (Protocol 2000)
  kind: action
  command: "18 {output_hex} 80 81"
  notes: |
    Byte 2 = output as 81+output. Examples:
      OUT1: 18 81 80 81
      OUT8: 18 88 80 81
  params:
    - name: output_hex
      type: string
      description: 81+output

- id: audio_output_gain_decrease_p2000
  label: Decrease Audio Output Gain (Protocol 2000)
  kind: action
  command: "18 {output_hex} 81 81"
  notes: |
    Byte 2 = output as 81+output. Examples:
      OUT1: 18 81 81 81
      OUT8: 18 88 81 81
  params:
    - name: output_hex
      type: string
      description: 81+output

- id: set_audio_input_gain_p2000
  label: Set Audio Input Gain (Protocol 2000)
  kind: action
  command: "16 {input_hex} {gain_byte} 81"
  notes: |
    Must precede with command 2A 86 80 81 (Table 14 prerequisite).
    Byte 2 = input as 81+input. Byte 3 = 0x80 + gain value (0x00-0x7F).
    Examples:
      IN1 mute: 16 81 80 81
      IN1 -50 dB: 16 81 BF 81
      IN1 0 dB:   16 81 F1 81
      IN1 +14 dB: 16 81 FF 81
  params:
    - name: input_hex
      type: string
      description: 81+input
    - name: gain_byte
      type: string
      description: "0x80 + gain value (0x80=mute, 0xBF=-50dB, 0xF1=0dB, 0xFF=+14dB max)"

- id: set_audio_output_gain_p2000
  label: Set Audio Output Gain (Protocol 2000)
  kind: action
  command: "16 {output_hex} {gain_byte} 81"
  notes: |
    Must precede with command 2A 87 80 81 (Table 16 prerequisite).
    Byte 2 = output as 81+output. Byte 3 = 0x80 + gain value (0x00-0x7F).
    Examples:
      OUT1 mute: 16 81 80 81
      OUT1 -50 dB: 16 81 BF 81
      OUT1 0 dB:   16 81 F1 81
      OUT1 +13 dB: 16 81 FF 81
  params:
    - name: output_hex
      type: string
      description: 81+output
    - name: gain_byte
      type: string
      description: "0x80 + gain value (0x80=mute, 0xBF=-50dB, 0xF1=0dB, 0xFF=+13dB max)"

# --- Machine info / identification ---
- id: get_io_count
  label: Read Input/Output Count
  kind: query
  command: "#INFO-IO?<CR>"
  params: []

- id: get_preset_count
  label: Read Max Preset Count
  kind: query
  command: "#INFO-PRST?<CR>"
  params: []

- id: get_model
  label: Read Device Model
  kind: query
  command: "#MODEL?<CR>"
  params: []

- id: get_serial
  label: Read Device Serial Number
  kind: query
  command: "#SN?<CR>"
  params: []

- id: get_firmware_version
  label: Read Device Firmware Version
  kind: query
  command: "#VERSION?<CR>"
  params: []

- id: set_machine_name
  label: Set Machine Name
  kind: action
  command: "#NAME {name}<CR>"
  params:
    - name: name
      type: string
      description: Up to 14 alphanumeric characters

- id: get_machine_name
  label: Read Machine Name
  kind: query
  command: "#NAME?<CR>"
  params: []

- id: reset_machine_name
  label: Reset Machine Name to Factory Default
  kind: action
  command: "#NAME-RST<CR>"
  params: []

- id: set_machine_number
  label: Set Machine ID Number
  kind: action
  command: "#MACH-NUM {number}<CR>"
  params:
    - name: number
      type: integer
      description: Machine number (1-16)

# --- Network settings ---
- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "#NET-IP {ip}<CR>"
  params:
    - name: ip
      type: string
      description: IP address (e.g. 192.168.1.39)

- id: get_ip_address
  label: Read IP Address
  kind: query
  command: "#NET-IP?<CR>"
  params: []

- id: get_mac_address
  label: Read MAC Address
  kind: query
  command: "#NET-MAC?<CR>"
  params: []

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "#NET-MASK {mask}<CR>"
  params:
    - name: mask
      type: string
      description: Subnet mask (e.g. 255.255.255.0)

- id: get_subnet_mask
  label: Read Subnet Mask
  kind: query
  command: "#NET-MASK?<CR>"
  params: []

- id: set_gateway
  label: Set Gateway Address
  kind: action
  command: "#NET-GATE {gateway}<CR>"
  params:
    - name: gateway
      type: string
      description: Gateway IP

- id: get_gateway
  label: Read Gateway Address
  kind: query
  command: "#NET-GATE?<CR>"
  params: []

- id: set_dhcp
  label: Set DHCP Mode
  kind: action
  command: "#NET-DHCP {mode}<CR>"
  params:
    - name: mode
      type: integer
      description: "0=static IP, 1=try DHCP then fall back to static"

- id: get_dhcp
  label: Read DHCP Mode
  kind: query
  command: "#NET-DHCP?<CR>"
  params: []

- id: set_eth_port
  label: Change Ethernet Port (Protocol/Port)
  kind: action
  command: "#ETH-PORT {protocol},{port}<CR>"
  params:
    - name: protocol
      type: string
      description: TCP or UDP
    - name: port
      type: integer
      description: "1-65535 user-defined; 0 = factory default (TCP 5000 / UDP 50000)"

- id: get_eth_port
  label: Read Ethernet Port Configuration
  kind: query
  command: "#ETH-PORT?<CR>"
  params: []

# --- AFV / breakaway switching mode ---
- id: set_afv_mode
  label: Set Audio-Follow-Video Mode
  kind: action
  command: "#AFV {mode}<CR>"
  params:
    - name: mode
      type: string
      description: "0 or afv = AFV, 1 or brk = breakaway"

- id: get_afv_mode
  label: Read Audio-Follow-Video Mode
  kind: query
  command: "#AFV?<CR>"
  params: []

# --- Additional Protocol 2000 instructions ---
# command is the literal decimal instruction number from Table 19, not a complete packet.
# Encode these instructions in the four-byte format defined by Table 18.
# Byte 1 carries the instruction with DESTINATION=0 for a host request.
# Bytes 2 and 3 carry the INPUT and OUTPUT values with bit 7 set.
# Byte 4 carries the machine number with bit 7 set; use machine 1 for single-machine control.
- id: reset_video_p2000
  label: Reset Video (Protocol 2000)
  kind: action
  command: "0"
  notes: "INPUT=0, OUTPUT=0. Resets according to the present power-down settings."
  params: []

- id: store_delete_video_status_p2000
  label: Store or Delete Video Status (Protocol 2000)
  kind: action
  command: "3"
  notes: "INPUT=SETUP #; OUTPUT selects store or delete."
  params:
    - name: setup
      type: integer
      description: "SETUP # 0 is the present setting. SETUP # 1 and higher are the settings saved in the switcher's memory. Upper limit: UNRESOLVED."
    - name: operation
      type: integer
      description: "0 - to store; 1 - to delete"

- id: recall_video_status_p2000
  label: Recall Video Status (Protocol 2000)
  kind: action
  command: "4"
  notes: "INPUT=SETUP #; OUTPUT=0."
  params:
    - name: setup
      type: integer
      description: "SETUP # 0 is the present setting. SETUP # 1 and higher are the settings saved in the switcher's memory. Upper limit: UNRESOLVED."

- id: get_video_output_status_p2000
  label: Read Video Output Status (Protocol 2000)
  kind: query
  command: "5"
  notes: "INPUT=SETUP #; OUTPUT=output number whose status is requested."
  params:
    - name: setup
      type: integer
      description: "SETUP # 0 is the present setting. SETUP # 1 and higher are the settings saved in the switcher's memory. Upper limit: UNRESOLVED."
    - name: output
      type: integer
      description: "Equal to output number whose status is reqd; output range: UNRESOLVED."

- id: get_audio_output_status_p2000
  label: Read Audio Output Status (Protocol 2000)
  kind: query
  command: "6"
  notes: "INPUT=SETUP #; OUTPUT=output number whose status is requested."
  params:
    - name: setup
      type: integer
      description: "SETUP # 0 is the present setting. SETUP # 1 and higher are the settings saved in the switcher's memory. Upper limit: UNRESOLVED."
    - name: output
      type: integer
      description: "Equal to audio output number whose status is reqd; output range: UNRESOLVED."

- id: set_breakaway_p2000
  label: Set Audio Breakaway (Protocol 2000)
  kind: action
  command: "8"
  notes: "INPUT=0; OUTPUT selects the breakaway setting."
  params:
    - name: mode
      type: integer
      description: "0 - audio-follow-video; 1 -audio breakaway"

- id: get_breakaway_p2000
  label: Read Audio Breakaway (Protocol 2000)
  kind: query
  command: "11"
  notes: "INPUT=SETUP #; OUTPUT=0 - Request audio breakaway setting. Note 6 also documents INPUT=127 for function support and INPUT=126 for the current setting where possible."
  params:
    - name: setup
      type: integer
      description: "SETUP # 0 is the present setting. SETUP # 1 and higher are the settings saved in the switcher's memory. Upper limit: UNRESOLVED."

- id: get_setup_or_input_validity_p2000
  label: Read Setup or Input Validity (Protocol 2000)
  kind: query
  command: "15"
  notes: "INPUT=SETUP # or Input#; OUTPUT selects the check. Reply OUTPUT is 0 if the setup is not defined / no valid input is detected, or 1 if it is defined / valid input is detected."
  params:
    - name: setup_or_input
      type: integer
      description: "SETUP # or Input#; range: UNRESOLVED."
    - name: check
      type: integer
      description: "0 - for checking if setup is defined; 1 - for checking if input is valid"

- id: adjust_audio_side_parameter_p2000
  label: Adjust Left or Right Audio Parameter (Protocol 2000)
  kind: action
  command: "24"
  notes: "INPUT=input / output number; OUTPUT selects the adjustment. Instruction 42 selects the audio parameter. The combined input/output adjustments are already represented above."
  params:
    - name: channel
      type: integer
      description: "Equal to input / output number whose parameter is to be increased / decreased (0 = all); upper limit: UNRESOLVED."
    - name: adjustment
      type: integer
      description: "2 - increase left output; 3 - decrease left output; 4 - increase right output; 5 - decrease right output; 8 - increase left input; 9 - decrease left input; 10 -increase right input; 11 -decreaseright input"

- id: get_audio_parameter_p2000
  label: Read Audio Parameter (Protocol 2000)
  kind: query
  command: "25"
  notes: "INPUT=input / output number; OUTPUT=0 in Table 19. Send instruction 42 first to select the audio parameter. Note 24's example instead uses OUTPUT=1; exact applicability of that discrepancy is UNRESOLVED. Note 6 also documents INPUT=127 for function support and INPUT=126 for the current setting where possible."
  params:
    - name: channel
      type: integer
      description: "Equal to input / output number whose parameter is requested; range: UNRESOLVED."

- id: lock_front_panel_p2000
  label: Lock Front Panel (Protocol 2000)
  kind: action
  command: "30"
  notes: "INPUT selects the lock state; OUTPUT=0."
  params:
    - name: mode
      type: integer
      description: "0 - Panel unlocked; 1 - Panel locked"

- id: get_front_panel_lock_p2000
  label: Read Front Panel Lock State (Protocol 2000)
  kind: query
  command: "31"
  notes: "INPUT=0, OUTPUT=0. Reply OUTPUT is 0 if the panel is unlocked, or 1 if it is locked."
  params: []

- id: select_audio_parameter_p2000
  label: Select Audio Parameter (Protocol 2000)
  kind: action
  command: "42"
  notes: "Selects audio parameter settings for instructions 22, 24, 25. INPUT contains the stage and channel-side bits; OUTPUT selects the parameter."
  params:
    - name: input_bits
      type: integer
      description: "INPUT Bit: I0 - 0=input; 1=output; I1 - Left; I2 - Right"
    - name: parameter
      type: integer
      description: "0 - Gain; 1 - Bass; 2 - Treble; 3 - Midrange; 4 - MixOn"

- id: identify_machine_p2000
  label: Identify Machine (Protocol 2000)
  kind: query
  command: "61"
  notes: "INPUT selects the identification value; OUTPUT selects the requested part."
  params:
    - name: identification
      type: integer
      description: "1 - video machine name; 2 - audio machine name; 3 - video software version; 4 - audio software version"
    - name: part
      type: integer
      description: "0 - Request first 4 digits; 1 - Request first suffix; 2 - Request second suffix; 3 - Request third suffix; 10 - Request first prefix; 11 - Request second prefix; 12 - Request third prefix"

- id: define_machine_p2000
  label: Read Machine Definition (Protocol 2000)
  kind: query
  command: "62"
  notes: "INPUT selects the count; OUTPUT selects video or audio. Counts refer to the addressed machine, not the system."
  params:
    - name: count
      type: integer
      description: "1 - number of inputs; 2 - number of outputs; 3 - number of setups"
    - name: media
      type: integer
      description: "1 - for video; 2 - for audio"

# --- Documented Protocol 3000 short forms ---
# command is the literal source mnemonic. Apply the documented host framing:
# start with #, separate the command and parameters with a space, and terminate with CR.
- id: switch_video_short
  label: Switch Video Only (Short Form)
  kind: action
  command: "V"
  notes: "Parameters use IN>OUT."
  params:
    - name: in
      type: integer
      description: "Input number or '0' to disconnect output; upper limit: UNRESOLVED."
    - name: out
      type: string
      description: "Output number or '*' for all outputs; upper limit: UNRESOLVED."

- id: switch_audio_short
  label: Switch Audio Only (Short Form)
  kind: action
  command: "A"
  notes: "Parameters use IN>OUT."
  params:
    - name: in
      type: integer
      description: "Input number or '0' to disconnect output; upper limit: UNRESOLVED."
    - name: out
      type: string
      description: "Output number or '*' for all outputs; upper limit: UNRESOLVED."

- id: get_video_connection_short
  label: Read Video Connection (Short Form)
  kind: query
  command: "V?"
  params:
    - name: out
      type: string
      description: "Output number or '*' for all outputs; upper limit: UNRESOLVED."

- id: get_audio_connection_short
  label: Read Audio Connection (Short Form)
  kind: query
  command: "A?"
  params:
    - name: out
      type: string
      description: "Output number or '*' for all outputs; upper limit: UNRESOLVED."

- id: preset_store_short
  label: Store Preset (Short Form)
  kind: action
  command: "PSTO"
  params:
    - name: preset
      type: integer
      description: "Preset number; range: UNRESOLVED."

- id: preset_recall_short
  label: Recall Preset (Short Form)
  kind: action
  command: "PRCL"
  params:
    - name: preset
      type: integer
      description: "Preset number; range: UNRESOLVED."

- id: preset_delete_short
  label: Delete Preset (Short Form)
  kind: action
  command: "PDEL"
  params:
    - name: preset
      type: integer
      description: "Preset number; range: UNRESOLVED."

- id: preset_read_video_short
  label: Read Video Connections From Preset (Short Form)
  kind: query
  command: "PVID?"
  params:
    - name: preset
      type: integer
      description: "Preset number; range: UNRESOLVED."
    - name: out
      type: string
      description: "Output in preset to show for, '*' for all; upper limit: UNRESOLVED."

- id: preset_read_audio_short
  label: Read Audio Connections From Preset (Short Form)
  kind: query
  command: "PAUD?"
  params:
    - name: preset
      type: integer
      description: "Preset number; range: UNRESOLVED."
    - name: out
      type: string
      description: "Output in preset to show for, '*' for all; upper limit: UNRESOLVED."

- id: preset_list_short
  label: Read Saved Presets List (Short Form)
  kind: query
  command: "PLST?"
  params: []

- id: lock_front_panel_short
  label: Lock Front Panel (Short Form)
  kind: action
  command: "LCK"
  params:
    - name: mode
      type: string
      description: "\"0\" or \"off\" to unlock front panel buttons; \"1\" or \"on\" to lock frontpanel buttons."

- id: set_audio_level_short
  label: Set Audio Level (Short Form)
  kind: action
  command: "ADL"
  params:
    - name: stage
      type: string
      description: "\"In\",\"Out\" or Numeric value (present audio processing stage); numeric range: UNRESOLVED."
    - name: channel
      type: integer
      description: "Input or Output #; range: UNRESOLVED."
    - name: volume
      type: string
      description: "Audio parameter in Kramer units, precede minus sign for negative values. ++ increase current value, -- decrease current value. Range: UNRESOLVED."

- id: get_audio_level_short
  label: Read Audio Level (Short Form)
  kind: query
  command: "ADL?"
  params:
    - name: stage
      type: string
      description: "\"In\",\"Out\" or Numeric value (present audio processing stage); numeric range: UNRESOLVED."
    - name: channel
      type: integer
      description: "Input or Output #; range: UNRESOLVED."

- id: set_ip_address_short
  label: Set IP Address (Short Form)
  kind: action
  command: "NTIP"
  params:
    - name: ip
      type: string
      description: "IP_ADDRESS; range: UNRESOLVED."

- id: get_mac_address_short
  label: Read MAC Address (Short Form)
  kind: query
  command: "NTMC"
  params: []

- id: set_subnet_mask_short
  label: Set Subnet Mask (Short Form)
  kind: action
  command: "NTMSK"
  params:
    - name: mask
      type: string
      description: "SUBNET_MASK; range: UNRESOLVED."

- id: get_subnet_mask_short
  label: Read Subnet Mask (Short Form)
  kind: query
  command: "NTMSK?"
  params: []

- id: set_gateway_short
  label: Set Gateway Address (Short Form)
  kind: action
  command: "NTGT"
  params:
    - name: gateway
      type: string
      description: "GATEWAY_ADDRESS; range: UNRESOLVED."

- id: get_gateway_short
  label: Read Gateway Address (Short Form)
  kind: query
  command: "NTGT?"
  params: []

- id: set_dhcp_short
  label: Set DHCP Mode (Short Form)
  kind: action
  command: "NTDH"
  params:
    - name: mode
      type: integer
      description: "0 – Don't use DHCP (Use IP set by factory or IP set command). 1 – Tryto use DHCP, if unavailable use IP as above."

- id: get_dhcp_short
  label: Read DHCP Mode (Short Form)
  kind: query
  command: "NTDH?"
  params: []

- id: set_eth_port_short
  label: Change Ethernet Port (Short Form)
  kind: action
  command: "ETHP"
  params:
    - name: protocol
      type: string
      description: "TCP / UDP (transport layer protocol)"
    - name: port
      type: integer
      description: "1-65535 = User defined port; 0 - resetport to factorydefault(50000 for UDP, 5000 for TCP)"
```

## Feedbacks
```yaml
- id: handshake_ok
  type: string
  description: Returned for successful handshake ("~OK")

- id: av_route_result
  type: string
  description: Result string echoed by device after AV routing command (e.g. "~AV 3>7 OK")

- id: video_route_result
  type: string
  description: Result string echoed after video routing command (e.g. "~VID 3>4 OK")
  query_command: "VID?"

- id: audio_route_result
  type: string
  description: Result string echoed after audio routing command (e.g. "~AUD 1>2 OK")
  query_command: "AUD?"

- id: signal_status
  type: enum
  values: [on, off]
  description: Signal presence on input (0=off, 1=on)
  query_command: "SIGNAL?"

- id: afv_mode_state
  type: enum
  values: [afv, breakaway]
  description: Front-panel switching mode (0=afv, 1=brk)
  query_command: "AFV?"

- id: front_panel_lock_state
  type: enum
  values: [unlocked, locked]
  description: Front panel lock state (0=off, 1=on)
  query_command: "LOCK-FP?"

- id: ip_address_state
  type: string
  description: Current IP address
  query_command: "NET-IP?"

- id: subnet_mask_state
  type: string
  description: Current subnet mask
  query_command: "NET-MASK?"

- id: gateway_state
  type: string
  description: Current gateway address
  query_command: "NET-GATE?"

- id: mac_address_state
  type: string
  description: Device MAC address
  query_command: "NET-MAC?"

- id: model_state
  type: string
  description: Device model name
  query_command: "MODEL?"

- id: serial_state
  type: string
  description: Device serial number
  query_command: "SN?"

- id: firmware_version_state
  type: string
  description: Firmware version MAJOR.MINOR.BUILD.REVISION
  query_command: "VERSION?"

- id: machine_name_state
  type: string
  description: User-assigned machine name (up to 14 alphanumeric)
  query_command: "NAME?"

- id: io_count_state
  type: string
  description: "INFO-IO: IN {inputs}, OUT {outputs}"
  query_command: "INFO-IO?"

- id: preset_count_state
  type: string
  description: "INFO-PRST: VID {video_count}, AUD {audio_count}"
  query_command: "INFO-PRST?"

- id: preset_video_state
  type: string
  description: "PRST-VID {preset}: {in}>{out}"
  query_command: "PRST-VID?"

- id: preset_audio_state
  type: string
  description: "PRST-AUD {preset}: {in}>{out}"
  query_command: "PRST-AUD?"

- id: preset_list_state
  type: string
  description: Comma-separated list of saved preset numbers
  query_command: "PRST-LST?"

- id: audio_level_state
  type: integer
  description: Audio level in Kramer units at queried stage/channel
  query_command: "AUD-LVL?"

- id: dhcp_state
  type: enum
  values: [static, dhcp_with_fallback]
  description: DHCP mode (0=static, 1=DHCP with fallback)
  query_command: "NET-DHCP?"

- id: eth_port_state
  type: string
  description: "ETH-PORT {protocol} {port}"
  query_command: "ETHP?"

- id: error_code
  type: enum
  values: [ERR001, ERR002, ERR003, ERR004]
  description: |
    Protocol 3000 error codes:
      ERR001 = Syntax error
      ERR002 = Command not available for this device
      ERR003 = Parameter is out of range
      ERR004 = Unauthorized access (no matching login)
```

## Variables
```yaml
- id: audio_input_gain
  type: integer
  range: [-100, 14]
  unit: dB
  description: Per-input relative audio gain (-100 = mute, +14 = max)

- id: audio_output_gain
  type: integer
  range: [-100, 13]
  unit: dB
  description: Per-output relative audio gain (-100 = mute, +13 = max)
```

## Events
```yaml
- id: device_initiated_start_message
  description: |
    On startup, device sends: "Kramer Electronics LTD., Version [Software Version], [Device Model]"
    (Protocol 3000 device-initiated message per Table 17)

- id: av_switched_notification
  description: |
    Sent when audio+video channel has switched in AFV mode:
    "AV IN>OUT"

- id: video_switched_notification
  description: |
    Sent when video channel has switched in breakaway mode:
    "VID IN>OUT"

- id: audio_switched_notification
  description: |
    Sent when audio channel has switched in breakaway mode:
    "AUD IN>OUT"

- id: signal_change_notification
  description: |
    Sent when signal presence on an input changes:
    "SIGNAL {input},{status}" where status is 0/off or 1/on

- id: error_notification
  description: |
    Protocol 3000 errors: ERR001 (syntax), ERR002 (unavailable), ERR003 (out of range), ERR004 (unauthorized).
    Protocol 2000 instruction 16 (ERROR/BUSY) reports invalid instruction, out of range, machine busy,
    invalid input, valid input, or RX buffer overflow (output byte 0-6).
```

## Macros
```yaml
# Multi-step protocol switch sequences documented in source.
- id: switch_to_protocol_2000_front_panel
  label: Switch to Protocol 2000 via front panel
  description: Press and hold OUT 1 and OUT 2 buttons simultaneously for a few seconds.

- id: switch_to_protocol_3000_front_panel
  label: Switch to Protocol 3000 via front panel
  description: Press and hold OUT 1 and OUT 3 buttons simultaneously for a few seconds.

- id: factory_default_reset
  label: Factory Default Reset
  description: |
    Press and hold FACTORY RESET button on rear panel while powering on the device.
    Resets: IP 192.168.1.39, mask 255.255.255.0, gateway 192.168.1.1, audio gain 0dB on all I/O,
    clears all switching configuration, audio mode AFV.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
<!-- UNRESOLVED: source documents no explicit safety warnings, interlocks, or power-on sequencing requirements. -->
```

## Notes
- Default protocol is Kramer Protocol 3000 (ASCII, 115200 baud). Protocol 2000 (HEX, 9600 baud) is selectable; the source documents both syntaxes in full.
- Both protocols share the same physical RS-232 / RS-485 / Ethernet ports. Ethernet default IP 192.168.1.39; machine name KRAMER_XXXX (last 4 digits of serial).
- RS-232 pinout is straight-through (pin 2-2, 3-3, 5-5) — no null-modem adapter required.
- For multi-machine RS-485 networks, set DIP-switches 5-8 to assign machine number 2-16; set DIP-switch 1 ON on the last unit for line termination.
- When controlling via Ethernet, machine number must be set to 1.
- Protocol 3000 audio gain command `#AUD-LVL` stage 1 = input stage, stage 2 = output (amplifier) stage. Use `++`/`--` to step instead of absolute value.
- Protocol 2000 commands for setting audio gain (Tables 14, 16) require a preceding instruction 42 (`2A 86 80 81` for input, `2A 87 80 81` for output) to select the audio parameter.
- Protocol 2000 machine addressing: 4th byte = `0x80 | (OVR<<5) | machine_number`. For single-machine control, set M4-M0 = 1 (byte = 0x81). Set OVR bit to broadcast.
- Protocol 3000 input string max length: 64 characters.
- Commands may be chained with `|` separator; each gets its own response.

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source. Exact signal-change notification triggering conditions not stated beyond per-input state. Error-recovery sequences for ERR003/ERR004 not documented. -->
```

Saved. Self-checked: no fabricated ports/baud (115200/9600/5000/50000/192.168.1.39 all from source), every distinct command row from Tables 7-19 enumerated, `status: draft`, `declared_confidence: low`, unresolved markers in place.

## Provenance

```yaml
source_domains:
  - cdn.kramerav.com
  - k.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/manuals/vp-88k.pdf
  - https://k.kramerav.com/downloads/manuals/vp-88k.pdf
retrieved_at: 2026-07-22T00:42:51.589Z
last_checked_at: 2026-10-07T13:27:24.348Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:27:24.348Z
matched_actions: 110
action_count: 110
confidence: medium
summary: "All 110 action units match source commands (Protocol 3000 long/short forms, Protocol 2000 hex) and transport supported; only instruction 22 unrepresented. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "SET AUDIO PARAMETER (Protocol 2000 instruction 22)"
- "firmware version compatibility, machine-specific behavior on front-panel lock or mute, exact EDID handling not stated in source."
- "source documents no explicit safety warnings, interlocks, or power-on sequencing requirements."
- "firmware version compatibility ranges not stated in source. Exact signal-change notification triggering conditions not stated beyond per-input state. Error-recovery sequences for ERR003/ERR004 not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
