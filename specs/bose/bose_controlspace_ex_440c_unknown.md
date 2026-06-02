---
spec_id: admin/bose-controlspace-ex-440c
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bose ControlSpace EX 440C Control Spec"
manufacturer: Bose
model_family: "ControlSpace EX-440C"
aliases: []
compatible_with:
  manufacturers:
    - Bose
  models:
    - "ControlSpace EX-440C"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.boseprofessional.com
source_urls:
  - https://assets.boseprofessional.com/m/4998082f60dfee56/original/ControlSpace-Serial-Protocol-v5-13.pdf
  - https://assets.boseprofessional.com/m/48b4f11e8a4922b9/original/ug_csp_control_serial.pdf
  - https://assets.boseprofessional.com/m/5967be9a1795e9b9/original/tds_fse4_en.pdf
retrieved_at: 2026-05-14T21:11:44.404Z
last_checked_at: 2026-06-02T17:21:47.454Z
generated_at: 2026-06-02T17:21:47.454Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source; PowerMatch/PowerShare-only, MSA12X, Endpoint, PSTN, and ESP-00-specific commands are out of scope for EX-440C"
  - "complete enumeration of which modules and parameters trigger subscription notifications not provided in source"
  - "no on-protocol macros documented in source"
  - "source contains no explicit safety warnings or interlock procedures for the EX-440C"
  - "firmware version compatibility, default authentication procedure, complete per-model channel counts not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:47.454Z
  matched_actions: 82
  action_count: 82
  confidence: medium
  summary: "All 82 spec actions matched verbatim in the source with correct shapes; transport values (115200 baud, port 10055, miniature Phoenix) confirmed; EX-440C-scoped coverage is complete. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Bose ControlSpace EX 440C Control Spec

## Summary
The Bose ControlSpace EX-440C is a fixed-architecture digital signal processor with 8 analog mic/line inputs, 8 analog outputs, 8 channels of AmpLink output, 16x16 Dante I/O, and 8 channels of Acoustic Echo Cancellation. This spec covers the EX-440C's serial control protocol (v5.13) over RS-232 and TCP/IP for third-party control systems. The source document covers the broader ControlSpace family (ESP, EX, PowerMatch, PowerShare, MSA12X, Endpoints); only EX-440C-relevant commands are enumerated below. All commands and responses are ASCII terminated with `<CR>` (0x0D).

<!-- UNRESOLVED: firmware version compatibility not stated in source; PowerMatch/PowerShare-only, MSA12X, Endpoint, PSTN, and ESP-00-specific commands are out of scope for EX-440C -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: miniature Phoenix (DTE)
addressing:
  port: 10055
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       # inferred: standby/power commands documented
# - routable        # inferred: routing commands present (Matrix, Router, Source Selector, CRR)
# - queryable       # inferred: query commands returning state present
# - levelable       # inferred: volume, gain, level control commands present
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# ============================================================
# 4. System Commands
# ============================================================

- id: set_parameter_set
  label: Recall Parameter Set
  kind: action
  command: "SS{n}<CR>"
  params:
    - name: n
      type: string
      description: Parameter Set number, 1-FFh (1-255 decimal), hex

- id: get_parameter_set
  label: Query Last Invoked Parameter Set
  kind: query
  command: "GS<CR>"
  params: []
  response: "S n<CR>"  # n = 0-FF hex; 0 = no Parameter Set recalled

- id: set_group_master_level
  label: Set Group Master Level
  kind: action
  command: "SG{n},{l}<CR>"
  params:
    - name: n
      type: string
      description: Group number, 1-40h (1-64 decimal)
    - name: l
      type: string
      description: Level, 0h (-60dB) to 90h (+12dB) in 0.5dB steps (0-144 dec), or FFh (-inf)

- id: set_group_source_selector
  label: Set Group Source Selector Channel
  kind: action
  command: "SG{n},{l}<CR>"
  params:
    - name: n
      type: string
      description: Group number, 1-40h (1-64 decimal)
    - name: l
      type: string
      description: Channel to select, 1-20h (1-32 decimal)

- id: get_group
  label: Query Group Master Level or Source Selector
  kind: query
  command: "GG{n}<CR>"
  params:
    - name: n
      type: string
      description: Group number, 1-40h
  response: "GG n,l<CR>"

- id: set_group_level_increment_decrement
  label: Set Group Level Increment/Decrement
  kind: action
  command: "SH{n},{d},{x}<CR>"
  params:
    - name: n
      type: string
      description: Group number, 1-40h
    - name: d
      type: integer
      description: Direction, 1=up, 0=down
    - name: x
      type: string
      description: Number of 0.5dB steps in hex (e.g. 5dB = A)

- id: set_group_master_mute
  label: Set Group Master Mute
  kind: action
  command: "SN{n},{m}<CR>"
  params:
    - name: n
      type: string
      description: Group number, 1-40h
    - name: m
      type: string
      description: "M=Mute, U=Un-mute, T=Toggle"

- id: get_group_master_mute
  label: Query Group Master Mute
  kind: query
  command: "GN{n}<CR>"
  params:
    - name: n
      type: string
      description: Group number, 1-40h
  response: "GN n,m<CR>"

- id: set_room_combine_by_number
  label: Join/Split Rooms (by number) [EX Only]
  kind: action
  command: "SRC{n},{a},{b},{s}<CR>"
  params:
    - name: n
      type: integer
      description: Room Combine Group number, 1-6
    - name: a
      type: integer
      description: Room number A, 1-6
    - name: b
      type: integer
      description: Room number B, 1-6
    - name: s
      type: string
      description: "J=Join, S=Split"

- id: set_room_combine_by_name
  label: Join/Split Rooms (by name) [EX Only]
  kind: action
  command: 'SRC"{N}","{A}","{B}",{s}<CR>'
  params:
    - name: N
      type: string
      description: Room Combine Group name
    - name: A
      type: string
      description: Room name A
    - name: B
      type: string
      description: Room name B
    - name: s
      type: string
      description: "J=Join, S=Split"

- id: get_room_combine_by_number
  label: Query Room Combine (by number) [EX Only]
  kind: query
  command: "GRC{n},{a},{b}<CR>"
  params:
    - name: n
      type: integer
      description: Room Combine Group number, 1-6
    - name: a
      type: integer
      description: Room number A, 1-6
    - name: b
      type: integer
      description: Room number B, 1-6
  response: "GRC n,a,b,s<CR>"

- id: get_room_combine_by_name
  label: Query Room Combine (by name) [EX Only]
  kind: query
  command: 'GRC{n},"{A}","{B}"<CR>'
  params:
    - name: n
      type: string
      description: Room Combine Group number or name
    - name: A
      type: string
      description: Room name A
    - name: B
      type: string
      description: Room name B
  response: "GRC n,a,b,s<CR>"

- id: get_joined_rooms
  label: Query Which Rooms Are Currently Joined [EX Only]
  kind: query
  command: "GRC{n}<CR>"
  params:
    - name: n
      type: string
      description: Room Combine Group number or name
  response: "GRC n,[a,b][c,d,f]<CR>"  # brackets indicate which rooms are joined

- id: get_parameter_set_list
  label: Query Current Parameter Set List Selection
  kind: query
  command: 'GA"{A}">{i}<CR>'
  params:
    - name: A
      type: string
      description: Parameter Set List name
    - name: i
      type: integer
      description: Index after '>', 1 or 2
  response: 'GA "A">2=n<CR>'  # or NAK 01/02

- id: set_parameter_set_list
  label: Set Current Parameter Set List Selection
  kind: action
  command: 'SA"{A}">{i}={n}<CR>'
  params:
    - name: A
      type: string
      description: Parameter Set List name
    - name: i
      type: integer
      description: Index, 1 or 2
    - name: n
      type: integer
      description: Index of Parameter Set in list to select
  response: "<ACK>"  # or NAK 01/02/03

# ============================================================
# 5. Device Commands
# ============================================================

- id: set_volume
  label: Set Input/Output Volume
  kind: action
  command: "SV{s},{c},{l}<CR>"
  params:
    - name: s
      type: string
      description: "Slot number (hex). EX-440C: 1=Out1-4, 2=In5-8, 3=In1-4, 4=Out5-8, 5=AmpLink Out, 7=Dante, 8=AEC"
    - name: c
      type: integer
      description: Channel number, 1-8 (EX)
    - name: l
      type: string
      description: Level, 0h (-60dB) to 90h (+12dB) in 0.5dB steps (0-144 dec)

- id: get_volume
  label: Query Input/Output Volume
  kind: query
  command: "GV{s},{c}<CR>"
  params:
    - name: s
      type: string
      description: Slot number (hex)
    - name: c
      type: integer
      description: Channel number, 1-8 (EX)
  response: "GV s,c,l<CR>"

- id: set_volume_increment_decrement
  label: Set Volume Increment/Decrement
  kind: action
  command: "SI{s},{c},{d},{x}<CR>"
  params:
    - name: s
      type: string
      description: Slot number (hex)
    - name: c
      type: integer
      description: Channel number, 1-8 (EX)
    - name: d
      type: integer
      description: Direction, 1=up, 0=down
    - name: x
      type: string
      description: Number of 0.5dB steps in hex

- id: set_mute
  label: Set Input/Output Mute
  kind: action
  command: "SM{s},{c},{m}<CR>"
  params:
    - name: s
      type: string
      description: Slot number (hex)
    - name: c
      type: integer
      description: Channel number, 1-8 (EX)
    - name: m
      type: string
      description: "M=Mute, U=Un-mute, T=Toggle"

- id: get_mute
  label: Query Input/Output Mute
  kind: query
  command: "GM{s},{c}<CR>"
  params:
    - name: s
      type: string
      description: Slot number (hex)
    - name: c
      type: integer
      description: Channel number, 1-8 (EX)
  response: "GM s,c,m<CR>"

- id: get_signal_level
  label: Get Signal Levels for Slot
  kind: query
  command: "GL{s}<CR>"
  params:
    - name: s
      type: string
      description: "Slot index (hex). EX-440C: 1=Out1-4, 2=In5-8, 3=In1-4, 4=Out5-8, 5=AmpLink, 7=Dante, 8=AEC"
  response: "GL s [1,...,N]<CR>"

- id: get_signal_level_param
  label: Get Signal Levels for Parameter in Slot
  kind: query
  command: "GL{s},{p}<CR>"
  params:
    - name: s
      type: string
      description: Slot index (hex)
    - name: p
      type: integer
      description: "Parameter index (e.g. 8,1=AEC Input, 8,2=AEC ERL, 8,3=AEC ERLE)"
  response: "GL s,p [1,...,N]<CR>"

- id: get_ip_address
  label: Query Device IP Address
  kind: query
  command: "IP<CR>"
  params: []
  response: "IP xxx.xxx.xxx.xxx<CR>"

- id: set_ip_address
  label: Set Device IP Address
  kind: action
  command: "IP{address}<CR>"
  params:
    - name: address
      type: string
      description: "New IP address (changes take effect after reboot)"

- id: get_network_parameter
  label: Query Network Parameter
  kind: query
  command: "NP{p}<CR>"
  params:
    - name: p
      type: string
      description: "T=Type (DHCP/Static), M=Subnet Mask, G=Default Gateway"
  response: "NP p,v<CR>"

- id: set_network_parameter
  label: Set Network Parameter
  kind: action
  command: "NP{p},{v}<CR>"
  params:
    - name: p
      type: string
      description: "T=Type, M=Subnet Mask, G=Default Gateway"
    - name: v
      type: string
      description: "D=DHCP, S=Static, or xxx.xxx.xxx.xxx"
  notes: Changes take effect after reboot.

- id: reset_network_defaults
  label: Reset All Network Parameters to Defaults
  kind: action
  command: "NP F<CR>"
  params: []
  notes: Changes take effect after reboot. For EX processors this affects the control connection only; VoIP settings remain.

- id: reset_reboot_device
  label: Reset/Reboot Device
  kind: action
  command: "RESET<CR>"
  params: []
  notes: Equivalent to power-cycle. Current settings lost, device reverts to power-on (flashed) settings.

# ============================================================
# 6. Module Commands (SA/GA/MA framework)
# Module labels are user-defined in ControlSpace Designer and
# must be unique within a device. Indices vary by module type.
# ============================================================

- id: module_input_set
  label: Set Input Module Parameter
  kind: action
  command: 'SA"Input {n}">{i1}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Channel label (e.g. "Input 1" through "Input 8" for EX-440C)
    - name: i1
      type: integer
      description: "1=Type (M/L), 2=Gain (0/14/24/32/44/54/64), 3=Level (-60.5 to +12.0dB, 0.5 step), 4=Mute (O/F/T), 5=Phantom (O/F/T)"
    - name: v
      type: string
      description: Value per Index 1
  response: "<ACK>"  # or <NAK> nn where nn is 01/02/03/99

- id: module_input_get
  label: Get Input Module Parameter
  kind: query
  command: 'GA"Input {n}">{i1}<CR>'
  params:
    - name: n
      type: integer
      description: Channel label
    - name: i1
      type: integer
      description: Index 1
  response: 'GA "Input n">i1=v<CR>'

- id: module_output_set
  label: Set Output Module Parameter
  kind: action
  command: 'SA"Output {n}">{i1}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Channel label (e.g. "Output 1" through "Output 8" for EX-440C)
    - name: i1
      type: integer
      description: "1=Level (-60.5 to +12.0dB, 0.5 step), 2=Mute (O/F/T)"
    - name: v
      type: string
      description: Value per Index 1

- id: module_output_get
  label: Get Output Module Parameter
  kind: query
  command: 'GA"Output {n}">{i1}<CR>'
  params:
    - name: n
      type: integer
      description: Channel label
    - name: i1
      type: integer
      description: Index 1
  response: 'GA "Output n">i1=v<CR>'

- id: module_amplink_set
  label: Set AmpLink Output Parameter
  kind: action
  command: 'SA"AmpLink-Ch {c}">{i1}={v}<CR>'
  params:
    - name: c
      type: integer
      description: Channel number, 1-8
    - name: i1
      type: integer
      description: "1=Level, 2=Mute (O/F/T), 3=Polarity (O/F/T)"
    - name: v
      type: string
      description: Value per Index 1

- id: module_amplink_get
  label: Get AmpLink Output Parameter
  kind: query
  command: 'GA"AmpLink-Ch {c}">{i1}<CR>'
  params:
    - name: c
      type: integer
      description: Channel number, 1-8
    - name: i1
      type: integer
      description: Index 1
  response: 'GA "AmpLink-Ch c">i1=v<CR>'

- id: module_dante_set
  label: Set Dante I/O Module Parameter
  kind: action
  command: 'SA"Dante 1-{name}">{i1}={v}<CR>'
  params:
    - name: name
      type: string
      description: "Channel name (e.g. \"Input 1\" or \"Output 1\")"
    - name: i1
      type: integer
      description: "1=Level, 2=Mute; polarity (Index 1=3) only on Dante Outputs"
    - name: v
      type: string
      description: Value per Index 1

- id: module_dante_get
  label: Get Dante I/O Module Parameter
  kind: query
  command: 'GA"Dante 1-{name}">{i1}<CR>'
  params:
    - name: name
      type: string
      description: Channel name
    - name: i1
      type: integer
      description: Index 1
  response: 'GA "Dante 1-name">i1=v<CR>'

- id: module_aec_set
  label: Set AEC Module Parameter [EX Only]
  kind: action
  command: 'SA"AEC">{i1}>{i2}={v}<CR>'
  params:
    - name: i1
      type: integer
      description: Input number, 1-12
    - name: i2
      type: integer
      description: "5=Internal Mute (O/F/T), 6=AEC Enable (O/F/T), 7=NLP Control (1=Light/2=Medium/3=Strong), 8=CN Enable (O/F/T), 9=NR Level (0-32dB), 10=Reference (read-only 1-4)"
    - name: v
      type: string
      description: Value per Index 2

- id: module_aec_get
  label: Get AEC Module Parameter [EX Only]
  kind: query
  command: 'GA"AEC">{i1}>{i2}<CR>'
  params:
    - name: i1
      type: integer
      description: Input number, 1-12
    - name: i2
      type: integer
      description: Index 2
  response: 'GA "AEC">i1>i2=v<CR>'

- id: module_agc_enhanced_set
  label: Set Enhanced AGC Module Parameter [EX Only]
  kind: action
  command: 'SA"AGC {n}">{i1}>{i2}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: "0=Output/Module, 1-32=Input"
    - name: i2
      type: integer
      description: "Output: 1=Max Total Gain (0-60dB). Input: 1=Activity Threshold (-70 to 0dB), 2=Target Min (-40 to 24dB), 3=Target Max (-40 to 24dB), 4=Cut Rate, 5=Cut Range, 6=Cut Hold, 7=Boost Rate, 8=Boost Range, 9=Boost Hold, 10=Bypass (O/F/T)"
    - name: v
      type: string
      description: Value per Index 2

- id: module_amm_gain_sharing_set
  label: Set AMM Gain Sharing Module Parameter [EX/1U ESP Only]
  kind: action
  command: 'SA"AMM {n}">{i1}>{i2}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: "0=Output/Module, 1-32=Input"
    - name: i2
      type: integer
      description: "Output: 1=Gain, 3=Slope, 4=Attack, 5=Hold, 6=Decay, 7=Input RMS Avg, 8=Output RMS Avg, 9=Bypass All. Input: 1=Gain, 3=Priority (1-5), 4=Bypass, 5=Mute Group"
    - name: v
      type: string
      description: Value per Index 2

- id: module_amm_gated_enhanced_set
  label: Set Enhanced Gated AMM Module Parameter [EX Only]
  kind: action
  command: 'SA"AMM {n}">{i1}>{i2}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: "0=Output/ATS, 1-32=Input"
    - name: i2
      type: integer
      description: "Output/ATS: 1=Gain, 2=Mute, 3=NOM Enable, 4=NOM Limit, 5=Designated Mic On, 8=ATS Attack, 9=ATS Release, 10=ATS Margin, 11=ATS Source (I/A), 12=ATS Sensitivity, 13=ATS LPF, 14=ATS HPF, 15=ATS Slope, 16=ATS Filter Enable, 17=Direct Outputs. Input: 1=Priority, 2=Gain, 3=Mute, 4=Mute Group, 5=Manual Threshold, 6=Auto-Threshold, 7=Bypass, 8=Direct Output, 9=Low Pass, 10=High Pass, 11=RMS Averaging, 12=Ducker Depth, 13=Gate Depth, 14=Gate Attack, 15=Gate Hold, 16=Gate Decay, 17=NOM Gain"
    - name: v
      type: string
      description: Value per Index 2

- id: module_compressor_limiter_set
  label: Set Compressor/Limiter Module Parameter
  kind: action
  command: 'SA"CompLim {n}">{i1}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: "1=Detect Input (L/R/M/S), 2=Threshold (0 to -40 dBFS, 0.5 step), 3=Ratio (1-20, 0.1 step), 4=Attack (0.5-100ms, 0.5 step), 5=Release (1-1000ms, 1 step), 6=Bypass (O/F/T)"
    - name: v
      type: string
      description: Value per Index 1

- id: module_conference_room_router_set
  label: Set Conference Room Router Module Parameter [EX Only]
  kind: action
  command: 'SA"CRR {n}">{i1}>{i2}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: "0=Configuration (read-only), 1=Room/Output, 2=Program/Far End, 3/4=Normal Matrix (On/Off, Level), 5/6=Advanced Matrix (On/Off, Level)"
    - name: i2
      type: integer
      description: "Index 2 within group per source table; for matrices use (input,output) format"
    - name: v
      type: string
      description: Value per Index 2

- id: module_crossover_set
  label: Set Crossover Module Parameter
  kind: action
  command: 'SA"X-Over">{i1}>{i2}={v}<CR>'
  params:
    - name: i1
      type: integer
      description: "Section: 1=LOW, 2=HIGH (2-way); 1=LOW, 2=MID, 3=HIGH (3-way); 1=LOW, 2=LO MID, 3=HIMID, 4=HIGH (4-way)"
    - name: i2
      type: integer
      description: "Per-section: 1=Type, 2=Frequency, 4=Polarity (O/F/T), 5=Mute (O/F/T)"
    - name: v
      type: string
      description: Value per Index 2

- id: module_delay_set
  label: Set Delay Module Parameter
  kind: action
  command: 'SA"Delay {n}">{i1}>{i2}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: Tap number, 1-8
    - name: i2
      type: integer
      description: "1=Delay time (EX: 0-48000 samples = 0-1s), 2=Bypass (O/F/T)"
    - name: v
      type: string
      description: Value per Index 2

- id: module_ducker_set
  label: Set Ducker Module Parameter
  kind: action
  command: 'SA"Ducker {n}">{i1}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: "2=Threshold (0 to -40 dBFS, 0.5 step), 3=Range (0 to -60 dBFS, 0.5 step), 4=Attack (0.5-100ms), 5=Hold (0-1000ms), 6=Decay (5-50000ms), 7=Bypass (O/F/T), 8=Engage Ducker Logic (O/F/T)"
    - name: v
      type: string
      description: Value per Index 1

- id: module_gain_set
  label: Set Gain Module Parameter
  kind: action
  command: 'SA"Gain {n}">{i1}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: "1=Level (-60.5 to +12.0dB, 0.5 step), 2=Mute (O/F/T)"
    - name: v
      type: string
      description: Value per Index 1

- id: module_gate_set
  label: Set Gate Module Parameter
  kind: action
  command: 'SA"Gate {n}">{i1}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: "1=Detector (L/R/M/S), 2=Threshold, 3=Range, 4=Attack, 5=Hold, 6=Decay, 7=Bypass (O/F/T)"
    - name: v
      type: string
      description: Value per Index 1

- id: module_gpo_set
  label: Set GPO Module Parameter
  kind: action
  command: 'SA"GP Out">{i1}={v}<CR>'
  params:
    - name: i1
      type: integer
      description: Output pin, 1-8
    - name: v
      type: string
      description: "O=On, F=Off, T=Toggle"

- id: module_gpo_get
  label: Get GPO Module State
  kind: query
  command: 'GA"GP Out">{i1}<CR>'
  params:
    - name: i1
      type: integer
      description: Output pin, 1-8
  response: 'GA "GP Out">i1=v<CR>'

- id: module_geq_set
  label: Set 1/3 Octave Graphic EQ Module Parameter
  kind: action
  command: 'SA"GEQ {n}">{i1}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: "Band 1-31 (20Hz-20kHz) or 32=Bypass All"
    - name: v
      type: string
      description: "For bands 1-31: gain (-15.0 to +15.0dB, 0.1dB step); for 32: O/F/T"

- id: module_logic_input_set
  label: Set Logic Input Module State [EX Only]
  kind: action
  command: 'SA"Logic Input {n}">{i1}>1={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: Input pin, 1-16
    - name: v
      type: string
      description: "O=On, F=Off, T=Toggle, P=Pulse (momentary)"

- id: module_logic_input_get
  label: Get Logic Input Module State [EX Only]
  kind: query
  command: 'GA"System Mode">{i1}>1<CR>'
  params:
    - name: i1
      type: integer
      description: Input pin, 1-16
  response: 'GA "System Mode">i1>1=v<CR>'

- id: module_logic_output_set
  label: Set Logic Output Module State [EX Only]
  kind: action
  command: 'SA"Logic Output {n}">{i1}>1={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: Output pin, 1-16
    - name: v
      type: string
      description: "O=On, F=Off, T=Toggle, P=Pulse (momentary)"

- id: module_logic_output_get
  label: Get Logic Output Module State [EX Only]
  kind: query
  command: 'GA"Status">{i1}>1<CR>'
  params:
    - name: i1
      type: integer
      description: Output pin, 1-16
  response: 'GA "Status">i1>1=v<CR>'

- id: module_logic_processing_toggle_set
  label: Set Logic Processing Toggle/FF Gate
  kind: action
  command: 'SA"Logic Block {n}">{i1}>{i2}>{i3}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: "1=Inputs, 2=Outputs, 3+=Controllable Gates (enumerated in design order)"
    - name: i2
      type: integer
      description: "0=Master, 1-16=Channel"
    - name: i3
      type: integer
      description: "1=Toggle State (O/F/T), 2=Reset All Outputs OFF (Master only)"
    - name: v
      type: string
      description: Value per Index 3

- id: module_logic_processing_pulse_set
  label: Set Logic Processing Pulse Gate
  kind: action
  command: 'SA"Logic Block {n}">{i1}>{i2}>{i3}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: Controllable Gate ID (3+)
    - name: i2
      type: integer
      description: Channel, 1-16
    - name: i3
      type: integer
      description: "1=On Time (100-6000ms, step 100), 2=Off Time (100-6000ms, step 100), 3=Single Pulse (O/F/T), 4=Force ON (O/F/T)"
    - name: v
      type: string
      description: Value per Index 3

- id: module_logic_processing_debounce_set
  label: Set Logic Processing Debounce Gate
  kind: action
  command: 'SA"Logic Block {n}">{i1}>{i2}>{i3}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: Controllable Gate ID (3+)
    - name: i2
      type: integer
      description: Channel, 1-16
    - name: i3
      type: integer
      description: "1=On Delay (100-6000ms, step 100), 2=Off Delay (100-6000ms, step 100)"
    - name: v
      type: string
      description: Value per Index 3

- id: module_matrix_mixer_set
  label: Set Matrix Mixer Cross-point or Channel Mute
  kind: action
  command: 'SA"Matrix {n}">{i1}>{i2}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: "1=On/Off (cross-point), 2=Level (cross-point), 3=Input channel mute, 4=Output channel mute"
    - name: i2
      type: integer
      description: "For 1,2: Index2 = (Input#-1) x Size of Matrix + Output#; for 3,4: 1-32 (channel number)"
    - name: v
      type: string
      description: "For 1: O/F/T; for 2: -60.5 to 0.0dB (0.5 step); for 3,4: O/F/T"

- id: module_parametric_eq_set
  label: Set Parametric EQ Module Parameter
  kind: action
  command: 'SA"PEQ {n}">{i1}>{i2}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: Band number, 1-16
    - name: i2
      type: integer
      description: "1=Frequency (20-20000Hz), 2=Q (0.10-10.0), 3=Gain (-20 to +20dB), 4=Slope (0/-6/-12dB/oct), 5=Type (B/HS/LS/HC/LC/N), 6=Bypass"
    - name: v
      type: string
      description: Value per Index 2

- id: module_peak_rms_limiter_set
  label: Set Peak/RMS Limiter Module Parameter
  kind: action
  command: 'SA"PkRMSLim {n}">{i1}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: "1=Detect Input (L/R/M/S), 2=PK Threshold, 7=RMS Threshold, 8=RMS Attack (500-10000ms, 100 step), 9=RMS Release (500-10000ms, 100 step)"
    - name: v
      type: string
      description: Value per Index 1

- id: module_router_set
  label: Set Router Module Output
  kind: action
  command: 'SA"Router {n}">{i1}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: Output number, 1-32
    - name: v
      type: integer
      description: Input number to route to output (0=Off, 1-32)

- id: module_router_get
  label: Get Router Module Output
  kind: query
  command: 'GA"Router {n}">{i1}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: Output number, 1-32
  response: 'GA "Router n">i1=v<CR>'

- id: module_signal_generator_sine_set
  label: Set Sine Wave Signal Generator
  kind: action
  command: 'SA"Sine {n}">1>{i2}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i2
      type: integer
      description: "1=Frequency (20-20000Hz), 2=Gain (-60.5 to +12.0dB, 0.5 step), 3=Mute (O/F/T)"
    - name: v
      type: string
      description: Value per Index 2

- id: module_signal_generator_noise_set
  label: Set White/Pink Noise Signal Generator
  kind: action
  command: 'SA"Noise {n}">{i1}>{i2}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: "2=White Noise, 3=Pink Noise"
    - name: i2
      type: integer
      description: "1=Gain (-60.5 to +12.0dB, 0.5 step), 2=Mute (O/F/T)"
    - name: v
      type: string
      description: Value per Index 2

- id: module_signal_generator_sweep_set
  label: Set Sweep Signal Generator
  kind: action
  command: 'SA"Sweep {n}">4>{i2}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i2
      type: integer
      description: "1=Gain, 2=Slow/Fast (S/F), 3=Repeat (O/F), 4=Start/Stop (O/F)"
    - name: v
      type: string
      description: Value per Index 2

- id: module_source_selector_set
  label: Set Source Selector Module Input
  kind: action
  command: 'SA"Selector {n}">1={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: v
      type: integer
      description: Input number to select, 1-16

- id: module_source_selector_get
  label: Get Source Selector Module Input
  kind: query
  command: 'GA"Selector {n}">1<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
  response: 'GA "Selector n">1=v<CR>'

- id: module_speaker_peq_set
  label: Set Speaker Parametric EQ Module Parameter
  kind: action
  command: 'SA"SPEQ {n}">{i1}>{i2}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: "0=Band Pass/Delay/EQ Gain, 1-9=PEQ Band"
    - name: i2
      type: integer
      description: "Index1=0: 3=EQ Gain, 4=Align Delay (0-480 samples), 5=Type (HP), 8=Frequency (HP), 9=LP Bypass, 10=HP Bypass, 11=Polarity. Index1=1-9: 1=Frequency, 2=Q, 3=Gain, 5=Type (B/HS/LS/N), 6=Bypass"
    - name: v
      type: string
      description: Value per Index 2

- id: module_standard_mixer_set
  label: Set Standard Mixer Module Parameter
  kind: action
  command: 'SA"StdMixer {n}">{i1}>{i2}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: "1=Input, 2=Output, 3=Cross-point A (multi-output routing), 4=Cross-point B (direct)"
    - name: i2
      type: integer
      description: "Per Index 1: input/output channel number (Index2=odd=Level, even=Mute) or (input,output) for cross-point B; for routing A use 1..M for input number (8-hex nibble bitmap for value)"
    - name: v
      type: string
      description: Value per Index 2

- id: module_standard_room_combiner_set
  label: Set Standard Room Combiner Module Parameter
  kind: action
  command: 'SA"StRC {n}">1>{i2}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i2
      type: integer
      description: "1=BGM Source (0=None, N=BGM N), 2=BGM Gain (-60.5 to +12.0dB), 3=BGM Mute (O/F/T), 4=Main Input Gain, 5=Main Input Mute, 6=Main Output Gain, 7=Main Output Mute"
    - name: v
      type: string
      description: Value per Index 2

- id: module_tone_eq_set
  label: Set Tone Control EQ Module Parameter
  kind: action
  command: 'SA"ToneEQ {n}">{i1}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: "1=Low Gain (-15 to +15dB, 0.1 step), 2=Low Bypass, 3=Mid Gain, 4=Mid Bypass, 5=High Gain, 6=High Bypass"
    - name: v
      type: string
      description: Value per Index 1

- id: module_smartbass_set
  label: Set SmartBass Module Bypass [EX/1U ESP Only]
  kind: action
  command: 'SA"SmartBass {n}">1={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: v
      type: string
      description: "O=On, F=Off, T=Toggle"

- id: module_smartbass_get
  label: Get SmartBass Module Bypass [EX/1U ESP Only]
  kind: query
  command: 'GA"SmartBass {n}">1<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
  response: 'GA "SmartBass n">1=v<CR>'

- id: module_dynamic_eq_set
  label: Set Dynamic EQ Module Bypass [EX/1U ESP Only]
  kind: action
  command: 'SA"Dynamic EQ {n}">1={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: v
      type: string
      description: "O=On, F=Off, T=Toggle"

- id: module_dynamic_eq_get
  label: Get Dynamic EQ Module Bypass [EX/1U ESP Only]
  kind: query
  command: 'GA"Dynamic EQ {n}">1<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
  response: 'GA "Dynamic EQ n">1=v<CR>'

- id: module_predictive_feedback_suppression_set
  label: Set Predictive Feedback Suppression Module Parameter [EX/1U ESP Only]
  kind: action
  command: 'SA"PFS {n}">{i1}>{i2}={v}<CR>'
  params:
    - name: n
      type: integer
      description: Module instance number
    - name: i1
      type: integer
      description: "0=Bypass, 1=Update, 2-17=Filter, 18=Static Filter, 19=System Gain, 20=GUI"
    - name: i2
      type: integer
      description: "Per Index 1 group; see source table for parameter selection"
    - name: v
      type: string
      description: Value per Index 2

- id: module_set_cross_device
  label: Set Module Parameter on Different Device
  kind: action
  command: 'SA@"Device Name" "Module Name">{i1}>{i2}={v}<CR>'
  params:
    - name: device_name
      type: string
      description: Device label from ControlSpace Designer
    - name: module_name
      type: string
      description: Module label
    - name: i1
      type: integer
      description: Index 1
    - name: i2
      type: integer
      description: Index 2
    - name: v
      type: string
      description: Value
  response: "<ACK>"  # or NAK

- id: module_get_cross_device
  label: Get Module Parameter on Different Device
  kind: query
  command: 'GA@"Device Name" "Module Name">{i1}>{i2}<CR>'
  params:
    - name: device_name
      type: string
      description: Device label
    - name: module_name
      type: string
      description: Module label
    - name: i1
      type: integer
      description: Index 1
    - name: i2
      type: integer
      description: Index 2
  response: 'GA "Module Name">i1>i2=v<CR>'

# ============================================================
# 9. Subscription Commands
# ============================================================

- id: query_subscription_support
  label: Query Device Subscription Support
  kind: query
  command: "SUB<CR>"
  params: []
  response: "SUB yes<CR>"

- id: subscribe_data_change
  label: Subscribe to Data Change
  kind: action
  command: 'SUB"{get_command}"<CR>'
  params:
    - name: get_command
      type: string
      description: "Text of a GET command from System, Device, or Module Commands (e.g. \"GG 1\", \"GV 1,1\", \"GA \\\"Gain 1\\\">2\")"
  response: 'SUB "get_command",yes<CR>'

- id: unsubscribe_data_change
  label: Unsubscribe from Data Change
  kind: action
  command: 'UNS"{get_command}"<CR>'
  params:
    - name: get_command
      type: string
      description: Text of a previously subscribed GET command
  response: 'UNS "get_command",yes<CR>'
```

## Feedbacks
```yaml
- id: last_parameter_set
  type: string
  description: Last invoked Parameter Set number (hex, 0-FF; 0 = none)
  source: response to GS (format: S n)

- id: group_master_level
  type: number
  description: Group master level in dB
  source: response to GG (format: GG n,l)

- id: group_source_selector
  type: integer
  description: Source selector channel for group
  source: response to GG

- id: group_master_mute
  type: enum
  values: [M, U]
  description: Group master mute state
  source: response to GN (format: GN n,m)

- id: room_combine_pair_state
  type: enum
  values: [J, S]
  description: Joined/split state for room pair
  source: response to GRC (format: GRC n,a,b,s)

- id: joined_rooms_list
  type: string
  description: Bracket notation of joined rooms in RC group
  source: response to GRC n (format: GRC n,[a,b][c,d,f])

- id: parameter_set_list_selection
  type: integer
  description: Current Parameter Set List selection index
  source: response to GA (format: GA "A">2=n)

- id: volume_level
  type: number
  description: Volume in dB (hex, 0h=-60dB to 90h=+12dB)
  source: response to GV (format: GV s,c,l)

- id: mute_state
  type: enum
  values: [M, U, T]
  description: Mute state
  source: response to GM (format: GM s,c,m)

- id: signal_level_array
  type: string
  description: Hex array of channel signal levels
  source: response to GL (format: GL s [1,...,N])

- id: ip_address
  type: string
  description: Device IP address
  source: response to IP

- id: network_parameter
  type: string
  description: Network parameter value (DHCP/Static/subnet/gateway)
  source: response to NP

- id: ack
  type: string
  description: "<ACK> (ASCII 0x06) for successful SA commands"

- id: nak
  type: string
  description: "<NAK> nn (ASCII 0x15) where nn is 01/02/03/99 error code"

- id: subscription_yes
  type: string
  description: Confirmation of subscription/unsubscription
  source: response to SUB/UNS (format: ... ,yes)
```

## Variables
```yaml
- id: signal_generator_type
  type: enum
  values: [Pink Noise, White Noise, Tone, Sweep]
  description: Signal generator type selection

- id: input_module_type
  type: enum
  values: [M, L]
  description: Input module type (M=Mic, L=Line)

- id: peq_filter_type
  type: enum
  values: [B, HS, LS, HC, LC, N]
  description: PEQ/SPEQ filter type (B=Band, HS=High Shelf, LS=Low Shelf, HC=High Cut, LC=Low Cut, N=Notch)

- id: room_combine_state
  type: enum
  values: [J, S]
  description: Room combine state (J=Join, S=Split)
```

## Events
```yaml
# Unsolicited notifications occur when a module is prefixed with "#" in ControlSpace Designer
# (e.g. #Hall), or via subscription (SUB command).
# Notification format mirrors the GA response: GA "Module Name">i1>i2=Value<CR>
# Triggered by parameter changes from other devices (CC-16, CC-64, other networked devices).
# Note: a notification is NOT sent if the change is made via serial command.
# UNRESOLVED: complete enumeration of which modules and parameters trigger subscription notifications not provided in source
```

## Macros
```yaml
# The protocol itself has no built-in macro language.
# Parameter Sets (PS) and Groups configured in ControlSpace Designer software can be invoked
# via SS/SG/GG commands to act as multi-step sequences. The sequence content is configured externally.
# UNRESOLVED: no on-protocol macros documented in source
```

## Safety
```yaml
confirmation_required_for:
  - set_ip_address  # Note: changes do not take effect until after reboot
  - set_network_parameter  # Note: changes do not take effect until after reboot
  - reset_network_defaults  # Resets all network parameters to defaults
  - reset_reboot_device  # Resets device to power-on (flashed) settings; current settings lost
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings or interlock procedures for the EX-440C
```

## Notes
- Source: Bose ControlSpace Serial Control Protocol v5.13. Covers entire ControlSpace family; this spec covers EX-440C-relevant commands only.
- Slot addressing for EX-440C (Table 1): 1=Out 1-4, 2=In 5-8, 3=In 1-4, 4=Out 5-8, 5=AmpLink Out 1-8, 7=Dante In/Out 1-16, 8=AEC In/Out 1-8. No Slot 6 (PSTN), 9 (VoIP), A (USB), or B (PSTN) on EX-440C.
- GL Indices for EX-440C: Out 1-4=1, In 5-8=2, In 1-4=3, Out 5-8=4, AmpLink=5, Dante=7, AEC Input=8,1, AEC ERL=8,2, AEC ERLE=8,3.
- EX-440C default network: DHCP (default gateway N/A).
- The third-party TCP control connection (port 10055) is closed when going on-line with ControlSpace Designer. Re-establish after design load.
- The EX-440C acts only as Server for serial-over-Ethernet; client must initiate connection.
- No authentication procedure is documented in the source.
- Serial settings (115200/8/N/1) can be changed via ControlSpace Designer software if needed.
- All commands and responses are ASCII terminated with `<CR>` (0x0D).
- No acknowledgement for System/Device 'Set' commands — follow with a 'Get' to confirm success.
- Module 'Set' commands return `<ACK>` (0x06) on success or `<NAK> nn` (0x15) on failure.
- Module labels must be unique within a device. Duplicates break SA/GA/MA addressing.
- To receive auto-notification on parameter change, prefix module name with "#" in Designer (e.g. #Hall).
- Maximum 32 simultaneous serial-over-Ethernet connections on EX-440C (shared with ControlSpace Remote).
- The following are out of scope for EX-440C and intentionally excluded: PowerMatch/PowerShare-only commands (SY/GY/SF/GF/CF/SR/GR/GH/CH/GC), MSA12X commands (ID/FU/ARRAY/IG/INPUT/STANDBY/LOAD/AUDIOLEVEL/STATUS/VERSION), Endpoint commands (ID/FU/IG/IS/PP/OG/RSL/RLO/WLO/RLI/EVNT/SASIP/QUERY/DEFAULTS/VERSION), PSTN module (EX-12AEC only), USB module (EX-1280C/EX-12AEC), VoIP module (EX-1280/EX-1280C/EX-12AEC), ESPLink module (ESP only), CobraNet/Surround modules (ESP-00 only).

<!-- UNRESOLVED: firmware version compatibility, default authentication procedure, complete per-model channel counts not stated in source -->

## Provenance

```yaml
source_domains:
  - assets.boseprofessional.com
source_urls:
  - https://assets.boseprofessional.com/m/4998082f60dfee56/original/ControlSpace-Serial-Protocol-v5-13.pdf
  - https://assets.boseprofessional.com/m/48b4f11e8a4922b9/original/ug_csp_control_serial.pdf
  - https://assets.boseprofessional.com/m/5967be9a1795e9b9/original/tds_fse4_en.pdf
retrieved_at: 2026-05-14T21:11:44.404Z
last_checked_at: 2026-06-02T17:21:47.454Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:47.454Z
matched_actions: 82
action_count: 82
confidence: medium
summary: "All 82 spec actions matched verbatim in the source with correct shapes; transport values (115200 baud, port 10055, miniature Phoenix) confirmed; EX-440C-scoped coverage is complete. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source; PowerMatch/PowerShare-only, MSA12X, Endpoint, PSTN, and ESP-00-specific commands are out of scope for EX-440C"
- "complete enumeration of which modules and parameters trigger subscription notifications not provided in source"
- "no on-protocol macros documented in source"
- "source contains no explicit safety warnings or interlock procedures for the EX-440C"
- "firmware version compatibility, default authentication procedure, complete per-model channel counts not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
