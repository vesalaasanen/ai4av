---
spec_id: admin/kramer-vp-81ksi
schema_version: ai4av-public-spec-v1
revision: 3
title: "Kramer VP-81KSi Control Spec"
manufacturer: Kramer
model_family: VP-81KSi
aliases: []
compatible_with:
  manufacturers:
    - Kramer
  models:
    - VP-81KSi
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - k.kramerav.com
  - manualslib.com
source_urls:
  - https://k.kramerav.com/downloads/manuals/vp-81ksi.pdf
  - https://www.manualslib.com/manual/890173/Kramer-Vp-81ksi.html
retrieved_at: 2026-06-01T20:24:09.674Z
last_checked_at: 2026-07-21T23:18:54.787Z
generated_at: 2026-07-21T23:18:54.787Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "login/authentication procedure hinted at by ERR004 (\"unauthorized access, running command without the match login\") but no login command documented in source"
  - "serial flow control setting not stated in source"
  - "flow control not stated in source"
  - "ERR004 mentions \"login\" but no login procedure documented in source"
  - "valid protocol values not explicitly listed in source"
  - "valid AFV-MODE values not explicitly enumerated in source"
  - "no multi-step sequences explicitly described in source beyond command chaining"
  - "no safety warnings or interlock procedures found in source"
  - "ETH-PORT valid protocol values not enumerated in source"
  - "AFV-MODE valid values not explicitly enumerated in source"
  - "DHCP_MODE valid values not enumerated in source"
  - "maximum preset count not stated (only queryable via INFO-PRST?)"
  - "login/authentication procedure (ERR004 references \"login\" but no login command documented)"
verification:
  verdict: verified
  checked_at: 2026-07-21T23:18:54.787Z
  matched_actions: 67
  action_count: 67
  confidence: medium
  summary: "All 67 spec actions matched with literal wire-level tokens in source across Protocol 3000 and Protocol 2000; transport parameters verified; complete bidirectional coverage at spec granularity. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Kramer VP-81KSi Control Spec

## Summary
8x8 matrix switcher controlled via RS-232, RS-485, or Ethernet. Default protocol is Kramer Protocol 3000 (ASCII, 115200 baud serial, TCP port 5000, UDP port 50000). Protocol 2000 (hex, 9600 baud) also supported, switchable via `#P2000<CR>`. This spec covers Protocol 3000 and Protocol 2000 commands.

<!-- UNRESOLVED: login/authentication procedure hinted at by ERR004 ("unauthorized access, running command without the match login") but no login command documented in source -->
<!-- UNRESOLVED: serial flow control setting not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
serial:
  rs232:
    baud_rate_p3000: 115200
    baud_rate_p2000: 9600
    data_bits: 8
    parity: none
    stop_bits: 1
    flow_control: null  # UNRESOLVED: flow control not stated in source
  rs485:
    description: "RS-485 port (A+, B-, G) on rear panel. Machine number 1-16 set via DIP-switches 1-3 (default=1). DIP-switch 4 = bus termination (default off)."
addressing:
  port: 5000
  udp_port: 50000
auth:
  type: null  # UNRESOLVED: ERR004 mentions "login" but no login procedure documented in source
```

## Traits
```yaml
traits:
  - routable    # inferred: AV/VID/AUD switching commands present
  - queryable   # inferred: VID?, AUD?, SIGNAL?, INFO-IO?, etc. query commands present
  - levelable   # inferred: AUD-LVL audio gain control present
  - powerable   # inferred: RESET (restart) command present
```

## Actions
```yaml
actions:
  # ===== Protocol 3000 (ASCII, default) =====
  - id: protocol_handshake
    label: Protocol Handshaking
    kind: query
    command: "#"
    params: []
    response: "~OK"

  - id: switch_av
    label: Switch Audio & Video
    kind: action
    command: "AV {in}>{out}"
    params:
      - name: in
        type: integer
        description: "Input number (1-8, 0 to disconnect)"
      - name: out
        type: integer
        description: "Output number (1-8, 0 for all outputs)"
    notes: "Multiple routing pairs comma-separated. Short form none."

  - id: switch_video
    label: Switch Video Only
    kind: action
    command: "VID {in}>{out}"
    params:
      - name: in
        type: integer
        description: "Input number (1-8, 0 to disconnect)"
      - name: out
        type: integer
        description: "Output number (1-8, 0 for all outputs)"
    notes: "Short form: V. In AFV mode also switches audio."

  - id: switch_audio
    label: Switch Audio Only
    kind: action
    command: "AUD {in}>{out}"
    params:
      - name: in
        type: integer
        description: "Input number (1-8, 0 to disconnect)"
      - name: out
        type: integer
        description: "Output number (1-8, 0 for all outputs)"
    notes: "Short form: A. In AFV mode also switches video."

  - id: read_video_connection
    label: Read Video Connection
    kind: query
    command: "VID? {out}"
    params:
      - name: out
        type: integer
        description: "Output number (1-8, or * for all outputs)"
    response: "VID IN>OUT"
    notes: "Short form: V?"

  - id: read_audio_connection
    label: Read Audio Connection
    kind: query
    command: "AUD? {out}"
    params:
      - name: out
        type: integer
        description: "Output number (1-8, or * for all outputs)"
    response: "AUD IN>OUT"
    notes: "Short form: A?"

  - id: set_signal_status
    label: Set Signal Status
    kind: action
    command: "SIGNAL {input},{status}"
    params:
      - name: input
        type: integer
        description: "Input number (1-8, or * for all)"
      - name: status
        type: string
        description: "Signal state: 0/off for no signal, 1/on for signal present"

  - id: get_signal_status
    label: Get Signal Status
    kind: query
    command: "SIGNAL? {input}"
    params:
      - name: input
        type: integer
        description: "Input number (1-8, or * for all)"
    response: "SIGNAL INPUT,STATUS"

  - id: store_preset
    label: Store Preset
    kind: action
    command: "PRST-STO {preset}"
    params:
      - name: preset
        type: integer
        description: Preset number
    notes: "Short form: PSTO"

  - id: recall_preset
    label: Recall Preset
    kind: action
    command: "PRST-RCL {preset}"
    params:
      - name: preset
        type: integer
        description: Preset number
    notes: "Short form: PRCL"

  - id: delete_preset
    label: Delete Preset
    kind: action
    command: "PRST-DEL {preset}"
    params:
      - name: preset
        type: integer
        description: Preset number
    notes: "Short form: PDEL"

  - id: read_preset_video
    label: Read Video Connections from Preset
    kind: query
    command: "PRST-VID? {preset},{out}"
    params:
      - name: preset
        type: integer
        description: Preset number
      - name: out
        type: integer
        description: "Output number (or * for all)"
    response: "PRST-VID PRESET,IN>OUT"
    notes: "Short form: PVID?"

  - id: read_preset_audio
    label: Read Audio Connections from Preset
    kind: query
    command: "PRST-AUD? {preset},{out}"
    params:
      - name: preset
        type: integer
        description: Preset number
      - name: out
        type: integer
        description: "Output number (or * for all)"
    response: "PRST-AUD PRESET,IN>OUT"
    notes: "Short form: PAUD?"

  - id: read_presets_list
    label: Read Saved Presets List
    kind: query
    command: "PRST-LST?"
    params: []
    response: "PRST-LST PRESET,PRESET,..."
    notes: "Short form: PLST?"

  - id: lock_front_panel
    label: Lock Front Panel
    kind: action
    command: "LOCK-FP {lock_mode}"
    params:
      - name: lock_mode
        type: string
        description: "0 or off to unlock, 1 or on to lock"
    notes: "Short form: LCK"

  - id: get_front_panel_lock
    label: Get Front Panel Lock State
    kind: query
    command: "LOCK-FP?"
    params: []
    response: "LOCK-FP LOCK-MODE"

  - id: restart_device
    label: Restart Device
    kind: action
    command: "RESET"
    params: []
    response: "RESET OK"

  - id: switch_protocol_2000
    label: Switch to Protocol 2000
    kind: action
    command: "P2000"
    params: []
    response: "P2000 OK"
    notes: "Switches from Protocol 3000 (ASCII, 115200 baud) to Protocol 2000 (hex, 9600 baud)."

  - id: set_audio_level
    label: Set Audio Level
    kind: action
    command: "AUD-LVL {stage},{channel},{volume}"
    params:
      - name: stage
        type: string
        description: "In, Out, or numeric (0=Input level, 1=Pre-Amp, 2=Amp/Out)"
      - name: channel
        type: integer
        description: "Input or output number (1-8)"
      - name: volume
        type: integer
        description: "Level in dB. Input range -63 to +7. Output range -30 to +20. Precede with minus for negative. ++ increase, -- decrease."
    notes: "Short form: ADL"

  - id: read_audio_level
    label: Read Audio Volume Level
    kind: query
    command: "AUD-LVL? {stage},{channel}"
    params:
      - name: stage
        type: string
        description: "In, Out, or numeric stage value"
      - name: channel
        type: integer
        description: "Input or output number"
    response: "AUD-LVL STAGE,CHANNEL,VOLUME"
    notes: "Short form: ADL?"

  - id: mute_audio
    label: Mute Audio
    kind: action
    command: "MUTE {mute_mode}"
    params:
      - name: mute_mode
        type: integer
        description: "1 to mute, 0 to unmute"
    response: "MUTE MUTE-MODE RESULT"

  - id: read_io_count
    label: Read I/O Count
    kind: query
    command: "INFO-IO?"
    params: []
    response: "INFO-IO: IN INPUTS_COUNT,OUT OUTPUTS_COUNT"

  - id: read_max_presets
    label: Read Max Presets Count
    kind: query
    command: "INFO-PRST?"
    params: []
    response: "INFO-PRST: VID PRESET_VIDEO_COUNT PRESET_AUDIO_COUNT"

  - id: factory_reset
    label: Factory Reset
    kind: action
    command: "FACTORY"
    params: []
    response: "FACTORY RESULT"

  - id: read_model
    label: Read Device Model
    kind: query
    command: "MODEL?"
    params: []
    response: "MODEL MACHINE_MODEL"

  - id: read_serial_number
    label: Read Serial Number
    kind: query
    command: "SN?"
    params: []
    response: "SN SERIAL_NUMBER"

  - id: read_firmware_version
    label: Read Firmware Version
    kind: query
    command: "VERSION?"
    params: []
    response: "VERSION MAJOR.MINOR.BUILD.REVISION"

  - id: set_machine_name
    label: Set Machine Name
    kind: action
    command: "NAME {machine_name}"
    params:
      - name: machine_name
        type: string
        description: "Up to 14 alphanumeric characters"
    response: "NAME MACHINE_NAME RESULT"

  - id: read_machine_name
    label: Read Machine Name
    kind: query
    command: "NAME?"
    params: []
    response: "NAME MACHINE_NAME"

  - id: reset_machine_name
    label: Reset Machine Name to Factory Default
    kind: action
    command: "NAME-RST"
    params: []
    response: "NAME-RST MACHINE_FACTORY_NAME RESULT"
    notes: "Factory name = model name + last 4 digits of serial number."

  - id: set_machine_id
    label: Set Machine ID Number
    kind: action
    command: "MACH-NUM {machine_number}"
    params:
      - name: machine_number
        type: integer
        description: "Machine number (1-16 for RS-485 daisy chain)"
    response: "MACH-NUM OLD_NUMBER,NEW_NUMBER RESULT"
    notes: "Response header uses NEW machine number. For RS-485 multi-unit setups."

  - id: set_ip_address
    label: Set IP Address
    kind: action
    command: "NET-IP {ip_address}"
    params:
      - name: ip_address
        type: string
        description: IP address
    notes: "Short form: NTIP"

  - id: read_ip_address
    label: Read IP Address
    kind: query
    command: "NET-IP?"
    params: []
    response: "NET-IP IP_ADDRESS"
    notes: "Short form: NTIP?"

  - id: read_mac_address
    label: Read MAC Address
    kind: query
    command: "NET-MAC?"
    params: []
    response: "NET-MAC MAC_ADDRESS"
    notes: "Short form: NTMC"

  - id: set_subnet_mask
    label: Set Subnet Mask
    kind: action
    command: "NET-MASK {subnet_mask}"
    params:
      - name: subnet_mask
        type: string
        description: Subnet mask
    notes: "Short form: NTMSK"

  - id: read_subnet_mask
    label: Read Subnet Mask
    kind: query
    command: "NET-MASK?"
    params: []
    response: "NET-MASK SUBNET_MASK"
    notes: "Short form: NTMSK?"

  - id: set_gateway
    label: Set Gateway Address
    kind: action
    command: "NET-GATE {gateway}"
    params:
      - name: gateway
        type: string
        description: Gateway IP address
    notes: "Short form: NTGT"

  - id: read_gateway
    label: Read Gateway Address
    kind: query
    command: "NET-GATE?"
    params: []
    response: "NET-GATE GATEWAY_ADDRESS"
    notes: "Short form: NTGT?"

  - id: set_dhcp_mode
    label: Set DHCP Mode
    kind: action
    command: "NET-DHCP {dhcp_mode}"
    params:
      - name: dhcp_mode
        type: integer
        description: DHCP mode value
    notes: "Short form: NTDH"

  - id: read_dhcp_mode
    label: Read DHCP Mode
    kind: query
    command: "NET-DHCP?"
    params: []
    response: "NET-DHCP DHCP_MODE"
    notes: "Short form: NTDH?"

  - id: set_eth_port
    label: Set Ethernet Protocol Port
    kind: action
    command: "ETH-PORT {protocol}"
    params:
      - name: protocol
        type: integer
        description: "Protocol value"  # UNRESOLVED: valid protocol values not explicitly listed in source
    response: "ETH-PORT PROTOCOL PORT RESULT"
    notes: "Short form: ETHP"

  - id: read_eth_port
    label: Read Ethernet Protocol Port
    kind: query
    command: "ETH-PORT?"
    params: []
    response: "ETH-PORT PROTOCOL PORT"
    notes: "Short form: ETHP?"

  - id: set_afv_mode
    label: Set Audio Follow Video Mode
    kind: action
    command: "AFV {afv_mode}"
    params:
      - name: afv_mode
        type: string
        description: "AFV mode value"  # UNRESOLVED: valid AFV-MODE values not explicitly enumerated in source
    response: "AFV AFV-MODE RESULT"
    notes: "Affects front-panel mode and AUD/VID command behavior."

  - id: read_afv_mode
    label: Read Audio Follow Video Mode
    kind: query
    command: "AFV?"
    params: []
    response: "AFV AFV-MODE"

  # ===== Protocol 2000 (hex, 9600 baud) =====
  # Frame format: 4 bytes [DEST|INSTR bits 0:6] [1|INPUT 0:6] [1|OUTPUT 0:6] [1|OVR|X|MACHINE 0:4]
  # Machine #1 single-unit: 4th byte = 0x81. OVR (broadcast): set bit 6.

  - id: p2000_switch_video
    label: "P2000: Switch Video"
    kind: action
    command: "01 8{in_hex} 8{out_hex} 81"
    params:
      - name: in_hex
        type: string
        description: "Input byte = 0x80 + input number (1-8). E.g. IN 1 = 0x81."
      - name: out_hex
        type: string
        description: "Output byte = 0x80 + output number (1-8). E.g. OUT 1 = 0x81. 0x80 = all outputs."
    notes: "Source Table 11. Example IN 1 to OUT 1: 01 81 81 81."

  - id: p2000_switch_audio
    label: "P2000: Switch Audio"
    kind: action
    command: "02 8{in_hex} 8{out_hex} 81"
    params:
      - name: in_hex
        type: string
        description: "Input byte = 0x80 + input number (1-8). E.g. IN 1 = 0x81."
      - name: out_hex
        type: string
        description: "Output byte = 0x80 + output number (1-8). E.g. OUT 1 = 0x81. 0x80 = all outputs."
    notes: "Source Table 11. Example IN 1 to OUT 1: 02 81 81 81."

  - id: p2000_reset_video
    label: "P2000: Reset Video"
    kind: action
    command: "00 80 80 81"
    params: []
    notes: "Source Table 18 instruction code 0. Resets video to power-down settings."

  - id: p2000_audio_input_gain_increase
    label: "P2000: Increase Audio Input Gain"
    kind: action
    command: "18 8{in_hex} 86 81"
    params:
      - name: in_hex
        type: string
        description: "Input byte = 0x80 + input number (1-8). E.g. IN 1 = 0x81."
    notes: "Source Table 12. Example IN 1: 18 81 86 81."

  - id: p2000_audio_input_gain_decrease
    label: "P2000: Decrease Audio Input Gain"
    kind: action
    command: "18 8{in_hex} 87 81"
    params:
      - name: in_hex
        type: string
        description: "Input byte = 0x80 + input number (1-8). E.g. IN 1 = 0x81."
    notes: "Source Table 12. Example IN 1: 18 81 87 81."

  - id: p2000_audio_input_gain_set
    label: "P2000: Set Audio Input Gain"
    kind: action
    command: "2A 86 80 81 | 16 8{in_hex} 8{gain_hex} 81"
    params:
      - name: in_hex
        type: string
        description: "Input byte = 0x80 + input number (1-8). E.g. IN 1 = 0x81."
      - name: gain_hex
        type: string
        description: "Gain byte = 0x80 + gain value 0x00-0x46. 0x00 = -63dB (mute), 0x46 = +7dB (max)."
    notes: "Source Table 13. Preamble 2A 86 80 81 must be sent first, then the set command. Example IN 1 at 0dB: 2A 86 80 81 then 16 81 BF 81."

  - id: p2000_audio_output_gain_increase
    label: "P2000: Increase Audio Output Gain"
    kind: action
    command: "18 8{out_hex} 80 81"
    params:
      - name: out_hex
        type: string
        description: "Output byte = 0x80 + output number (1-8). E.g. OUT 1 = 0x81."
    notes: "Source Table 14. Example OUT 1: 18 81 80 81."

  - id: p2000_audio_output_gain_decrease
    label: "P2000: Decrease Audio Output Gain"
    kind: action
    command: "18 8{out_hex} 81 81"
    params:
      - name: out_hex
        type: string
        description: "Output byte = 0x80 + output number (1-8). E.g. OUT 1 = 0x81."
    notes: "Source Table 14. Example OUT 1: 18 81 81 81."

  - id: p2000_audio_output_gain_set
    label: "P2000: Set Audio Output Gain"
    kind: action
    command: "2A 87 80 81 | 16 8{out_hex} 8{gain_hex} 81"
    params:
      - name: out_hex
        type: string
        description: "Output byte = 0x80 + output number (1-8). E.g. OUT 1 = 0x81."
      - name: gain_hex
        type: string
        description: "Gain byte = 0x80 + gain value 0x00-0x32. 0x00 = -30dB, 0x32 = +20dB."
    notes: "Source Table 15. Preamble 2A 87 80 81 must be sent first, then the set command. Example OUT 1 at 0dB: 2A 87 80 81 then 16 81 9E 81."

  - id: p2000_breakaway_setting
    label: "P2000: Set Breakaway Setting"
    kind: action
    command: "08 80 8{mode_hex} 81"
    params:
      - name: mode_hex
        type: string
        description: "Mode byte: 0x80 = audio-follow-video, 0x81 = audio breakaway."
    notes: "Source Table 18 instruction code 8."

  - id: p2000_request_breakaway
    label: "P2000: Request Breakaway Setting"
    kind: query
    command: "0B 80 80 81"
    params: []
    response: "4B 80 8{mode_hex} 81"
    notes: "Source Table 18 instruction code 11. Reply mode byte: 0x80 = AFV, 0x81 = breakaway."

  - id: p2000_lock_front_panel
    label: "P2000: Lock Front Panel"
    kind: action
    command: "1E 8{mode_hex} 80 81"
    params:
      - name: mode_hex
        type: string
        description: "Lock byte: 0x80 = unlocked, 0x81 = locked."
    notes: "Source Table 18 instruction code 30."

  - id: p2000_request_panel_lock
    label: "P2000: Request Panel Lock State"
    kind: query
    command: "1F 80 80 81"
    params: []
    response: "4F 80 8{mode_hex} 81"
    notes: "Source Table 18 instruction code 31. Reply mode byte: 0x80 = unlocked, 0x81 = locked."

  - id: p2000_request_video_output_status
    label: "P2000: Request Video Output Status"
    kind: query
    command: "05 8{setup_hex} 8{out_hex} 81"
    params:
      - name: setup_hex
        type: string
        description: "SETUP # byte = 0x80 + setup number (0 = current, 1+ = stored preset)."
      - name: out_hex
        type: string
        description: "Output byte = 0x80 + output number whose status is required."
    notes: "Source Table 18 instruction code 5."

  - id: p2000_request_audio_output_status
    label: "P2000: Request Audio Output Status"
    kind: query
    command: "06 8{setup_hex} 8{out_hex} 81"
    params:
      - name: setup_hex
        type: string
        description: "SETUP # byte = 0x80 + setup number (0 = current, 1+ = stored preset)."
      - name: out_hex
        type: string
        description: "Output byte = 0x80 + output number whose status is required."
    notes: "Source Table 18 instruction code 6."

  - id: p2000_store_video_status
    label: "P2000: Store Video Status to Setup"
    kind: action
    command: "03 8{setup_hex} 8{mode_hex} 81"
    params:
      - name: setup_hex
        type: string
        description: "SETUP # byte = 0x80 + setup number (1+ for store)."
      - name: mode_hex
        type: string
        description: "Mode byte: 0x80 = store, 0x81 = delete."
    notes: "Source Table 18 instruction code 3."

  - id: p2000_recall_video_status
    label: "P2000: Recall Video Status from Setup"
    kind: action
    command: "04 8{setup_hex} 80 81"
    params:
      - name: setup_hex
        type: string
        description: "SETUP # byte = 0x80 + setup number (1+ for recall)."
    notes: "Source Table 18 instruction code 4."

  - id: p2000_change_to_ascii
    label: "P2000: Switch to Protocol 3000 (ASCII)"
    kind: action
    command: "38 80 83 81"
    params: []
    notes: "Source Table 18 instruction code 56. Inverse of P3000 '#P2000' command. Machine will respond to ASCII command set."

  - id: p2000_identify_machine
    label: "P2000: Identify Machine"
    kind: query
    command: "3D 8{info_type_hex} 8{output_type_hex} 81"
    params:
      - name: info_type_hex
        type: string
        description: "INPUT byte: 0x81 = video machine name, 0x82 = audio machine name, 0x83 = video software version, 0x84 = audio software version."
      - name: output_type_hex
        type: string
        description: "OUTPUT byte: 0x80 = first 4 digits, 0x81-0x83 = suffix 1-3, 0x8A-0x8C = prefix 1-3."
    notes: "Source Table 18 instruction code 61."

  - id: p2000_define_machine
    label: "P2000: Define Machine I/O Count"
    kind: query
    command: "3E 8{param_hex} 8{type_hex} 81"
    params:
      - name: param_hex
        type: string
        description: "INPUT byte: 0x81 = number of inputs, 0x82 = number of outputs, 0x83 = number of setups."
      - name: type_hex
        type: string
        description: "OUTPUT byte: 0x81 = for video, 0x82 = for audio."
    notes: "Source Table 18 instruction code 62."

  - id: p2000_request_setup_validity
    label: "P2000: Request Setup/Input Validity"
    kind: query
    command: "0F 8{setup_hex} 8{mode_hex} 81"
    params:
      - name: setup_hex
        type: string
        description: "SETUP # or Input # byte = 0x80 + number."
      - name: mode_hex
        type: string
        description: "Mode byte: 0x80 = check if setup defined, 0x81 = check if input is valid."
    notes: "Source Table 18 instruction code 15."

  - id: p2000_request_audio_parameter
    label: "P2000: Request Audio Parameter"
    kind: query
    command: "19 8{channel_hex} 80 81"
    params:
      - name: channel_hex
        type: string
        description: "Input/Output byte = 0x80 + channel number (0 = all). Requires instruction 42 preamble to select gain/bass/treble/midrange/mix."
    notes: "Source Table 18 instruction code 25. Send instruction 42 (2A 84 80 81 for right input #9) first to specify parameter."

  - id: p2000_audio_parameter_settings
    label: "P2000: Audio Parameter Settings (Preamble)"
    kind: action
    command: "2A 8{input_bits_hex} 8{param_hex} 81"
    params:
      - name: input_bits_hex
        type: string
        description: "INPUT byte: I0=0 for input, 1 for output; I1=Left; I2=Right. Byte = 0x80 + bits. E.g. 0x84 = input Right, 0x81 = output."
      - name: param_hex
        type: string
        description: "OUTPUT byte: 0x80 = Gain, 0x81 = Bass, 0x82 = Treble, 0x83 = Midrange, 0x84 = MixOn."
    notes: "Source Table 18 instruction code 42. Preamble sent before instructions 22 (SET), 24 (INC/DEC), or 25 (REQUEST) to specify the audio parameter and channel. NOTE 24 examples: 2A 84 80 81 = right input gain, then 19 89 81 81 (instruction 25). 2A 81 84 81 = output MixOn, then 16... (instruction 22)."
```

## Feedbacks
```yaml
feedbacks:
  - id: error_code
    type: enum
    values: [ERR001, ERR002, ERR003, ERR004]
    description: "ERR001=Syntax Error, ERR002=Command not available for this device, ERR003=Parameter out of range, ERR004=Unauthorized access"

  - id: command_result
    type: enum
    values: [OK]
    description: "Command succeeded. Returned as RESULT in response."

  - id: audio_level
    type: integer
    description: "Audio level in dB returned by AUD-LVL? query"

  - id: video_connection
    type: string
    description: "Video routing state IN>OUT returned by VID? query"

  - id: audio_connection
    type: string
    description: "Audio routing state IN>OUT returned by AUD? query"

  - id: signal_status
    type: enum
    values: ["0", "1"]
    description: "0/off=no signal, 1/on=signal present"

  - id: front_panel_lock
    type: enum
    values: ["0", "1"]
    description: "0=unlocked, 1=locked"

  - id: afv_mode
    type: string
    description: "Audio follow video mode state"

  - id: p2000_error_busy
    type: enum
    values: ["ERR0", "ERR1", "ERR2", "ERR3", "ERR4", "ERR5", "ERR6"]
    description: "P2000 instruction 16 reply codes: 0=error, 1=invalid instruction, 2=out of range, 3=machine busy, 4=invalid input, 5=valid input, 6=RX buffer overflow. Hex: 0x10 0x8{input} 0x84/85 0x81."
```

## Variables
```yaml
variables:
  - id: audio_input_gain
    type: integer
    min: -63
    max: 7
    unit: dB
    description: "Audio input gain level (-63dB mute to +7dB max). Set via AUD-LVL stage=In. P2000 gain byte = 0x80 + value 0x00-0x46."

  - id: audio_output_gain
    type: integer
    min: -30
    max: 20
    unit: dB
    description: "Audio output gain level (-30dB to +20dB). Set via AUD-LVL stage=Out. P2000 gain byte = 0x80 + value 0x00-0x32."
```

## Events
```yaml
events:
  - id: av_switched
    description: "Unsolicited notification when audio-video channel switches via front panel (AFV mode)"
    format: "AV IN>OUT"

  - id: video_switched
    description: "Unsolicited notification when video channel switches via front panel (breakaway mode)"
    format: "VID IN>OUT"

  - id: audio_switched
    description: "Unsolicited notification when audio channel switches via front panel (breakaway mode)"
    format: "AUD IN>OUT"

  - id: start_message
    description: "Sent on power-up. Format: Kramer Electronics LTD., Version SOFTWARE_VERSION Device Model"
    format: "~Kramer Electronics LTD., Version X.X DEVICE_MODEL"

  - id: error_busy
    description: "Error notification for invalid instruction, out of range, or busy state"
    format: "ERR###"

  - id: p2000_front_panel_switch
    description: "P2000 unsolicited echo from front-panel switch: byte1 sets DEST bit (0x40), byte2 = 0x80 + input, byte3 = 0x80 + output, byte4 = machine. Example: 41 81 87 83 = machine 3, input 1, output 7."
    format: "4{instr_hex} 8{in_hex} 8{out_hex} 8{machine_hex}"

  - id: p2000_input_validity
    description: "P2000 unsolicited notification (instruction 16) when device detects a change in video input validity in real-time. Byte 2 = 0x80 + input number. Byte 3: 0x84 = invalid input, 0x85 = valid input. Example: 10 83 84 81 = input 3 invalid. 10 87 85 81 = input 7 valid."
    format: "10 8{in_hex} 8{status_hex} 81"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source beyond command chaining
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- Device is an 8-input, 8-output matrix switcher for video and audio.
- Default Protocol 3000 (ASCII) serial config: 115200 baud, 8N1. Protocol 2000 (hex, Version 0.5) uses 9600 baud, 8N1.
- Default IP address: 192.168.1.39, subnet mask: 255.255.255.0, gateway: 192.168.1.1.
- Up to 8 units can be daisy-chained via RS-485. Machine numbers 1-8 set via DIP-switches 1-3; DIP-switch 4 sets bus termination (off=default).
- RS-232 connection: straight 9-pin D-sub cable (pin 2→2, pin 3→3, pin 5→5).
- RS-485 connection: A+ to A+, B- to B-, G to G on rear panel terminal block.
- Front panel protocol switch: P3000→P2000 = hold Output 1 + Output 2; P2000→P3000 = hold Output 1 + Output 3.
- Command chaining supported: separate multiple commands with pipe `|` character. Max input string: 64 characters.
- Knet device addressing supported: prefix command with `#<machine_id>@`. Example: `#6@VID 4>2<CR>` addresses machine 6.
- Protocol 2000 frame: 4 bytes `[DEST|INSTR]` `[1|INPUT]` `[1|OUTPUT]` `[1|OVR|X|MACHINE]`. Bit 7 of bytes 2-4 is always 1. For single-unit: byte 4 = 0x81 (machine 1).
- Protocol 2000 audio gain set requires preamble: 2A 86 80 81 before input gain set, 2A 87 80 81 before output gain set.
- AFV mode: when active, VID command also switches audio; AUD command also switches video.
- Input 0 = disconnect. Output 0 or * = all outputs.
- Short forms documented: V=VID, A=AUD, PSTO=PRST-STO, PRCL=PRST-RCL, PDEL=PRST-DEL, PVID?=PRST-VID?, PAUD?=PRST-AUD?, PLST?=PRST-LST?, LCK=LOCK-FP, ADL=AUD-LVL, NTIP=NET-IP, NTMC=NET-MAC, NTMSK=NET-MASK, NTGT=NET-GATE, NTDH=NET-DHCP, ETHP=ETH-PORT.

<!-- UNRESOLVED: ETH-PORT valid protocol values not enumerated in source -->
<!-- UNRESOLVED: AFV-MODE valid values not explicitly enumerated in source -->
<!-- UNRESOLVED: DHCP_MODE valid values not enumerated in source -->
<!-- UNRESOLVED: maximum preset count not stated (only queryable via INFO-PRST?) -->
<!-- UNRESOLVED: login/authentication procedure (ERR004 references "login" but no login command documented) -->

## Provenance

```yaml
source_domains:
  - k.kramerav.com
  - manualslib.com
source_urls:
  - https://k.kramerav.com/downloads/manuals/vp-81ksi.pdf
  - https://www.manualslib.com/manual/890173/Kramer-Vp-81ksi.html
retrieved_at: 2026-06-01T20:24:09.674Z
last_checked_at: 2026-07-21T23:18:54.787Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:18:54.787Z
matched_actions: 67
action_count: 67
confidence: medium
summary: "All 67 spec actions matched with literal wire-level tokens in source across Protocol 3000 and Protocol 2000; transport parameters verified; complete bidirectional coverage at spec granularity. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "login/authentication procedure hinted at by ERR004 (\"unauthorized access, running command without the match login\") but no login command documented in source"
- "serial flow control setting not stated in source"
- "flow control not stated in source"
- "ERR004 mentions \"login\" but no login procedure documented in source"
- "valid protocol values not explicitly listed in source"
- "valid AFV-MODE values not explicitly enumerated in source"
- "no multi-step sequences explicitly described in source beyond command chaining"
- "no safety warnings or interlock procedures found in source"
- "ETH-PORT valid protocol values not enumerated in source"
- "AFV-MODE valid values not explicitly enumerated in source"
- "DHCP_MODE valid values not enumerated in source"
- "maximum preset count not stated (only queryable via INFO-PRST?)"
- "login/authentication procedure (ERR004 references \"login\" but no login command documented)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
