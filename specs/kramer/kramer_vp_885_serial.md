---
spec_id: admin/kramer-vp-885
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kramer VP-885 Control Spec"
manufacturer: Kramer
model_family: VP-885
aliases: []
compatible_with:
  manufacturers:
    - Kramer
  models:
    - VP-885
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/manuals/vp-885.pdf
retrieved_at: 2026-06-12T02:20:12.227Z
last_checked_at: 2026-06-12T19:25:08.008Z
generated_at: 2026-06-12T19:25:08.008Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "many device features (front-panel labels, video signal types, audio formats) are out of scope for this protocol excerpt; firmware version not stated."
  - "no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "firmware version compatibility not stated; full HEX code tables for all 8x8 video/audio switch combinations and all 8 input gain levels are referenced by Tables 12-17 but not enumerated as separate actions (the parameterized forms above cover them); no explicit port-forward/auth credential mechanism documented."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:25:08.008Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched against source commands with correct opcodes, parameters, and transport settings verified. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Kramer VP-885 Control Spec

## Summary
The Kramer VP-885 is an 8x8 matrix switcher for audio and video. This spec covers serial (RS-232, RS-485) and Ethernet (TCP/UDP) control using Kramer Protocol 3000 (ASCII, default) and Protocol 2000 (HEX, 9600 baud). Protocol 3000 runs at 115200 baud, 8/N/1. Default Ethernet ports: TCP 5000, UDP 50000.

<!-- UNRESOLVED: many device features (front-panel labels, video signal types, audio formats) are out of scope for this protocol excerpt; firmware version not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
serial:
  baud_rate: 115200  # Protocol 3000 default
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  tcp_port: 5000
  udp_port: 50000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable  # inferred from AV/VID/AUD switching commands
- queryable  # inferred from VID?/AUD?/SIGNAL?/NET-IP? query commands
- levelable  # inferred from AUD-LVL commands
```

## Actions
```yaml
# Help
- id: protocol_handshaking
  label: Protocol Handshaking
  kind: action
  command: "#<CR>"
  params: []
  notes: "<CR> = Carriage Return (0x0D). Response: ~OK<CRLF>"

# Basic routing (Protocol 3000)
- id: switch_av
  label: Switch Audio & Video
  kind: action
  command: "#AV {in}>{out}<CR>"
  params:
    - name: in
      type: integer
      description: Input number (0 disconnects)
    - name: out
      type: integer
      description: Output number (or * for all)

- id: switch_video
  label: Switch Video Only
  kind: action
  command: "#VID {in}>{out}<CR>"
  params:
    - name: in
      type: integer
    - name: out
      type: integer
  notes: "Short form: #V {in}>{out}<CR>"

- id: switch_audio
  label: Switch Audio Only
  kind: action
  command: "#AUD {in}>{out}<CR>"
  params:
    - name: in
      type: integer
    - name: out
      type: integer
  notes: "Short form: #A {in}>{out}<CR>"

# Queries
- id: read_video_connection
  label: Read Video Connection
  kind: query
  command: "#VID? {out}<CR>"
  params:
    - name: out
      type: integer
  notes: "Short form: #V? {out}<CR>; or VID? * for all"

- id: read_audio_connection
  label: Read Audio Connection
  kind: query
  command: "#AUD? {out}<CR>"
  params:
    - name: out
      type: integer
  notes: "Short form: #A? {out}<CR>; or AUD? * for all"

# Signal status
- id: get_signal_status
  label: Get Signal Status
  kind: query
  command: "#SIGNAL? {input}<CR>"
  params:
    - name: input
      type: integer
      description: Input number or * for all

# Presets
- id: store_preset
  label: Store Current Connections to Preset
  kind: action
  command: "#PRST-STO {preset}<CR>"
  params:
    - name: preset
      type: integer
  notes: "Short form: #PSTO {preset}<CR>"

- id: recall_preset
  label: Recall Saved Preset
  kind: action
  command: "#PRST-RCL {preset}<CR>"
  params:
    - name: preset
      type: integer
  notes: "Short form: #PRCL {preset}<CR>"

- id: delete_preset
  label: Delete Saved Preset
  kind: action
  command: "#PRST-DEL {preset}<CR>"
  params:
    - name: preset
      type: integer
  notes: "Short form: #PDEL {preset}<CR>"

- id: read_preset_video
  label: Read Video Connections From Saved Preset
  kind: query
  command: "#PRST-VID? {preset},{out}<CR>"
  params:
    - name: preset
      type: integer
    - name: out
      type: integer
  notes: "Short form: #PVID? {preset},{out}<CR>"

- id: read_preset_audio
  label: Read Audio Connections From Saved Preset
  kind: query
  command: "#PRST-AUD? {preset},{out}<CR>"
  params:
    - name: preset
      type: integer
    - name: out
      type: integer
  notes: "Short form: #PAUD? {preset},{out}<CR>"

- id: read_preset_list
  label: Read Saved Presets List
  kind: query
  command: "#PRST-LST?<CR>"
  notes: "Short form: #PLST?<CR>"

# Operation
- id: lock_front_panel
  label: Lock Front Panel
  kind: action
  command: "#LOCK-FP {lock_mode}<CR>"
  params:
    - name: lock_mode
      type: integer
      description: 0=off (unlock), 1=on (lock)
  notes: "Short form: #LCK {lock_mode}<CR>"

- id: get_lock_state
  label: Get Front Panel Locking State
  kind: query
  command: "#LOCK-FP?<CR>"

- id: reset_device
  label: Restart Device
  kind: action
  command: "#RESET<CR>"

- id: switch_to_protocol_2000
  label: Switch to Protocol 2000
  kind: action
  command: "#P2000<CR>"

# Audio parameters
- id: set_audio_level
  label: Set Audio Level
  kind: action
  command: "#AUD-LVL {stage},{channel},{volume}<CR>"
  params:
    - name: stage
      type: string
      description: "In/Out or numeric stage (0=input, 1=pre-amp, 2=amp)"
    - name: channel
      type: integer
    - name: volume
      type: string
      description: "Kramer units; precede minus for negative; ++ increase; -- decrease"
  notes: "Short form: #ADL {stage},{channel},{volume}<CR>"

- id: read_audio_level
  label: Read Audio Volume Level
  kind: query
  command: "#AUD-LVL? {stage},{channel}<CR>"
  params:
    - name: stage
      type: string
    - name: channel
      type: integer
  notes: "Short form: #ADL? {stage},{channel}<CR>"

- id: mute_audio
  label: Mute Audio
  kind: action
  command: "#MUTE {mute_mode}<CR>"
  params:
    - name: mute_mode
      type: integer
      description: "1=Mute, 0=Unmute"

# Machine info
- id: read_inouts_count
  label: Read In/Outs Count
  kind: query
  command: "#INFO-IO?<CR>"

- id: read_max_presets_count
  label: Read Max Presets Count
  kind: query
  command: "#INFO-PRST?<CR>"

- id: factory_reset
  label: Reset Configuration to Factory Default
  kind: action
  command: "#FACTORY<CR>"

# Identification
- id: protocol_handshaking_id
  label: Protocol Handshaking
  kind: action
  command: "#<CR>"
  notes: "Alias of protocol_handshaking; response ~OK<CRLF>"

- id: read_device_model
  label: Read Device Model
  kind: query
  command: "#MODEL?<CR>"

- id: read_device_serial
  label: Read Device Serial Number
  kind: query
  command: "#SN?<CR>"

- id: read_device_firmware
  label: Read Device Firmware Version
  kind: query
  command: "#VERSION?<CR>"

- id: set_machine_name
  label: Set Machine Name
  kind: action
  command: "#NAME {machine_name}<CR>"
  params:
    - name: machine_name
      type: string
      description: Up to 14 alphanumeric chars

- id: read_machine_name
  label: Read Machine Name
  kind: query
  command: "#NAME?<CR>"

- id: reset_machine_name
  label: Reset Machine Name to Factory Default
  kind: action
  command: "#NAME-RST<CR>"

- id: set_machine_id
  label: Set Machine ID Number
  kind: action
  command: "#MACH-NUM {old_number},{new_number}<CR>"
  params:
    - name: old_number
      type: integer
    - name: new_number
      type: integer

# Network settings
- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "#NET-IP {ip_address}<CR>"
  params:
    - name: ip_address
      type: string
  notes: "Short form: #NTIP {ip_address}<CR>"

- id: read_ip_address
  label: Read IP Address
  kind: query
  command: "#NET-IP?<CR>"
  notes: "Short form: #NTIP?<CR>"

- id: read_mac_address
  label: Read MAC Address
  kind: query
  command: "#NET-MAC?<CR>"
  notes: "Short form: #NTMC?<CR>"

- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "#NET-MASK {subnet_mask}<CR>"
  params:
    - name: subnet_mask
      type: string
  notes: "Short form: #NTMSK {subnet_mask}<CR>"

- id: read_subnet_mask
  label: Read Subnet Mask
  kind: query
  command: "#NET-MASK?<CR>"
  notes: "Short form: #NTMSK?<CR>"

- id: set_gateway
  label: Set Gateway Address
  kind: action
  command: "#NET-GATE {gateway_address}<CR>"
  params:
    - name: gateway_address
      type: string
  notes: "Short form: #NTGT {gateway_address}<CR>"

- id: read_gateway
  label: Read Gateway Address
  kind: query
  command: "#NET-GATE?<CR>"
  notes: "Short form: #NTGT?<CR>"

- id: set_dhcp_mode
  label: Set DHCP Mode
  kind: action
  command: "#NET-DHCP {dhcp_mode}<CR>"
  params:
    - name: dhcp_mode
      type: integer
      description: "0=don't use DHCP; 1=try DHCP, fall back to static"
  notes: "Short form: #NTDH {dhcp_mode}<CR>"

- id: read_dhcp_mode
  label: Read DHCP Mode
  kind: query
  command: "#NET-DHCP?<CR>"
  notes: "Short form: #NTDH?<CR>"

- id: change_eth_port
  label: Change Protocol Ethernet Port
  kind: action
  command: "#ETH-PORT {protocol},{port}<CR>"
  params:
    - name: protocol
      type: string
      description: "TCP or UDP"
    - name: port
      type: integer
      description: "1-65535 user-defined; 0 resets to factory (TCP 5000, UDP 50000)"
  notes: "Short form: #ETHP {protocol},{port}<CR>"

- id: read_eth_port
  label: Read Protocol Ethernet Port
  kind: query
  command: "#ETH-PORT? {protocol}<CR>"
  params:
    - name: protocol
      type: string
      description: "TCP or UDP"
  notes: "Short form: #ETHP? {protocol}<CR>"

# Advanced switching
- id: set_afv_mode
  label: Set Audio Follow Video Mode
  kind: action
  command: "#AFV {afv_mode}<CR>"
  params:
    - name: afv_mode
      type: string
      description: '"0"/"afv" = audio-follow-video; "1"/"brk" = breakaway'

- id: read_afv_mode
  label: Read Audio Follow Video Mode
  kind: query
  command: "#AFV?<CR>"

# Protocol 2000 (HEX) switching
- id: switch_video_p2000
  label: Switch Video (Protocol 2000)
  kind: action
  command: "0x01 {in_hex} {out_hex} {machine_hex}"
  params:
    - name: in_hex
      type: string
      description: Input number 1-8 (0=disconnect)
    - name: out_hex
      type: string
      description: Output number 1-8 (0=all)
    - name: machine_hex
      type: string
      description: "Machine number with OVR; 0x81 = M1 no override"
  notes: "Example: 01 85 88 83 = switch IN5 to OUT8 on M3"

- id: switch_audio_p2000
  label: Switch Audio (Protocol 2000)
  kind: action
  command: "0x02 {in_hex} {out_hex} {machine_hex}"
  params:
    - name: in_hex
      type: string
    - name: out_hex
      type: string
    - name: machine_hex
      type: string
  notes: "Example: 02 85 88 83 = switch audio IN5 to OUT8 on M3"

- id: switch_to_p3000_from_p2000
  label: Switch from Protocol 2000 to Protocol 3000
  kind: action
  command: "0x38 0x80 0x83 0x81"
  notes: "Inverse of P2000 command"

- id: increase_audio_input_gain_p2000
  label: Increase Audio Input Gain (Protocol 2000)
  kind: action
  command: "0x18 {in_hex} 0x86 {machine_hex}"
  params:
    - name: in_hex
      type: string
    - name: machine_hex
      type: string
  notes: "Table 14"

- id: decrease_audio_input_gain_p2000
  label: Decrease Audio Input Gain (Protocol 2000)
  kind: action
  command: "0x18 {in_hex} 0x87 {machine_hex}"
  params:
    - name: in_hex
      type: string
    - name: machine_hex
      type: string

- id: set_audio_input_gain_p2000
  label: Set Audio Input Gain (Protocol 2000)
  kind: action
  command: "0x2A 0x86 0x80 0x81  0x16 {in_hex} {gain_byte_hex} 0x81"
  params:
    - name: in_hex
      type: string
      description: Input number 1-8
    - name: gain_byte_hex
      type: string
      description: "0x80 + gain value (0x00-0x7F); 0x80=Mute, 0xF1=0dB, 0xFF=+14dB max"
  notes: "Table 15; the 0x2A 0x86 0x80 0x81 preamble must be sent first"

- id: increase_audio_output_gain_p2000
  label: Increase Audio Output Gain (Protocol 2000)
  kind: action
  command: "0x18 {out_hex} 0x80 {machine_hex}"
  params:
    - name: out_hex
      type: string
    - name: machine_hex
      type: string
  notes: "Table 16"

- id: decrease_audio_output_gain_p2000
  label: Decrease Audio Output Gain (Protocol 2000)
  kind: action
  command: "0x18 {out_hex} 0x81 {machine_hex}"
  params:
    - name: out_hex
      type: string
    - name: machine_hex
      type: string

- id: set_audio_output_gain_p2000
  label: Set Audio Output Gain (Protocol 2000)
  kind: action
  command: "0x2A 0x87 0x80 0x81  0x16 {out_hex} {gain_byte_hex} 0x81"
  params:
    - name: out_hex
      type: string
      description: Output number 1-8
    - name: gain_byte_hex
      type: string
      description: "0x80 + gain value (0x00-0x7F); 0x80=Mute, 0xF1=0dB, 0xFF=+13dB max"
  notes: "Table 17; the 0x2A 0x87 0x80 0x81 preamble must be sent first"
```

## Feedbacks
```yaml
- id: handshaking_ack
  type: string
  values: ["~OK"]
  notes: "Response to Protocol Handshaking (#<CR>)"
- id: command_result_ok
  type: string
  values: ["OK"]
  notes: "Standard trailing result on success"
- id: signal_status
  type: enum
  values: [on, off]
  notes: "Response to SIGNAL? query; '0'/'off' = not present, '1'/'on' = present"
- id: afv_mode
  type: enum
  values: [afv, brk]
  notes: "Response to AFV? query; '0'/'afv' or '1'/'brk'"
- id: lock_state
  type: enum
  values: [on, off]
  notes: "Response to LOCK-FP?; '0'/'off' = unlocked, '1'/'on' = locked"
- id: dhcp_mode
  type: enum
  values: [0, 1]
  notes: "Response to NET-DHCP?; 0=no DHCP, 1=DHCP with fallback"
- id: protocol_error_syntax
  type: string
  values: ["ERR001"]
  notes: "Syntax error"
- id: protocol_error_unavailable
  type: string
  values: ["ERR002"]
  notes: "Command not available for this device"
- id: protocol_error_range
  type: string
  values: ["ERR003"]
  notes: "Parameter out of range"
- id: protocol_error_auth
  type: string
  values: ["ERR004"]
  notes: "Unauthorized access"
```

## Variables
```yaml
# Settable via Protocol 3000 commands
- id: audio_volume
  description: Audio level per stage/channel
  settable_command: "#AUD-LVL {stage},{channel},{volume}<CR>"
  query_command: "#AUD-LVL? {stage},{channel}<CR>"
  notes: "stage: In/Out (or 0/1/2); channel: 1-8; volume in Kramer units, ++/-- for relative"
- id: machine_name
  description: Friendly machine name (separate from model)
  settable_command: "#NAME {machine_name}<CR>"
  query_command: "#NAME?<CR>"
  notes: "Up to 14 alphanumeric chars"
- id: ip_address
  settable_command: "#NET-IP {ip_address}<CR>"
  query_command: "#NET-IP?<CR>"
  default: "192.168.1.39"
- id: subnet_mask
  settable_command: "#NET-MASK {subnet_mask}<CR>"
  query_command: "#NET-MASK?<CR>"
  default: "255.255.255.0"
- id: gateway
  settable_command: "#NET-GATE {gateway_address}<CR>"
  query_command: "#NET-GATE?<CR>"
  default: "192.168.1.1"
- id: dhcp_mode
  settable_command: "#NET-DHCP {dhcp_mode}<CR>"
  query_command: "#NET-DHCP?<CR>"
- id: tcp_port
  settable_command: "#ETH-PORT TCP,{port}<CR>"
  query_command: "#ETH-PORT? TCP<CR>"
  default: 5000
- id: udp_port
  settable_command: "#ETH-PORT UDP,{port}<CR>"
  query_command: "#ETH-PORT? UDP<CR>"
  default: 50000
- id: afv_mode
  settable_command: "#AFV {afv_mode}<CR>"
  query_command: "#AFV?<CR>"
```

## Events
```yaml
# Device-initiated messages (Protocol 3000)
- id: start_message
  description: Sent at startup
  format: "Kramer Electronics LTD., {Device Model} Version {Software Version}"
- id: av_switched_afv
  description: Audio-video channel switched (AFV mode)
  format: "AV {IN}>{OUT}"
- id: video_switched_breakaway
  description: Video channel switched (breakaway mode)
  format: "VID {IN}>{OUT}"
- id: audio_switched_breakaway
  description: Audio channel switched (breakaway mode)
  format: "AUD {IN}>{OUT}"
- id: machine_number_changed
  description: After MACH-NUM changes
  format: "{NEW_MACHINE_NUMBER}@MACH-NUM {OLD_MACHINE_NUMBER},{NEW_MACHINE_NUMBER} OK"
```

## Macros
```yaml
# Explicit multi-step sequences from source
- id: protocol_switch_via_serial_p3000_to_p2000
  description: Switch from P3000 to P2000
  steps:
    - command: "#P2000<CR>"
- id: protocol_switch_via_serial_p2000_to_p3000
  description: Switch from P2000 to P3000
  steps:
    - command: "0x38 0x80 0x83 0x81"
- id: chain_multiple_commands
  description: Multiple commands in one message using '|' separator
  example: "#AV 1>* | V 3>4, 2>2, 82>1, 0>2 | V 82>3 | A 0>1 | V? *<CR>"
  notes: "Input string max length 64 chars; separate response sent for each command in chain"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements
# documented in this protocol excerpt beyond factory-reset behavior.
```

## Notes
- Two protocols coexist: P3000 (ASCII, 115200 baud, default) and P2000 (HEX, 9600 baud). Switch via `#P2000<CR>` (P3000→P2000) or `0x38 0x80 0x83 0x81` (P2000→P3000). Front-panel equivalent: hold OUT1+OUT2 (to P2000) or OUT1+OUT3 (to P3000).
- RS-232 pinout: 9-wire straight cable, pin 2↔2, pin 3↔3, pin 5↔5. No null-modem adapter required.
- RS-485 supports up to 16 chained units (machine numbers 1-16); DIP-switches 5-8 set machine number, DIP-switch 1 sets RS-485 termination.
- Default Ethernet: IP 192.168.1.39 / Mask 255.255.255.0 / Gateway 192.168.1.1, TCP 5000, UDP 50000. Default machine name: `KRAMER_XXXX` (last 4 digits of serial).
- Factory reset (hold FACTORY RESET button on power-up): resets audio/switching/Ethernet to defaults, all switching configuration erased, audio gain 0dB on all I/O, display mode cycles 1-8, audio mode AFV.
- Protocol 3000 command syntax: `#CMD p1,p2,...<CR>` (host); `~CMD ... CRLF` (device). Device long response includes echoing the command: `~@CMD [p1,p2,…] result<CRLF>`. Multiple commands chained with `|`. Max input string 64 chars.
- Protocol 2000 uses 4-byte frames: byte1 bit7=0, byte2-4 bit7=1; bit7 of byte1 is destination flag (0=to switcher, 1=to PC).
- Audio input gain range: -100dB (mute) to +14dB (max). Audio output gain range: -100dB (mute) to +13dB (max).
- Audio gain setting in P2000: byte3 = 0x80 + gain value (0x00-0x7F); a preamble command (e.g. `2A 86 80 81` for inputs, `2A 87 80 81` for outputs) must be sent before the gain-set frame.

<!-- UNRESOLVED: firmware version compatibility not stated; full HEX code tables for all 8x8 video/audio switch combinations and all 8 input gain levels are referenced by Tables 12-17 but not enumerated as separate actions (the parameterized forms above cover them); no explicit port-forward/auth credential mechanism documented. -->

## Provenance

```yaml
source_domains:
  - cdn.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/manuals/vp-885.pdf
retrieved_at: 2026-06-12T02:20:12.227Z
last_checked_at: 2026-06-12T19:25:08.008Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:25:08.008Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched against source commands with correct opcodes, parameters, and transport settings verified. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "many device features (front-panel labels, video signal types, audio formats) are out of scope for this protocol excerpt; firmware version not stated."
- "no safety warnings, interlock procedures, or power-on sequencing requirements"
- "firmware version compatibility not stated; full HEX code tables for all 8x8 video/audio switch combinations and all 8 input gain levels are referenced by Tables 12-17 but not enumerated as separate actions (the parameterized forms above cover them); no explicit port-forward/auth credential mechanism documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
