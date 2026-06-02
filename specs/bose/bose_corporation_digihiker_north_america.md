---
spec_id: admin/bose-corporation-controlspace-esp-ex-pm-ps-msa12x-endpoints
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bose Professional ControlSpace / PowerMatch / PowerShare / MSA12X / Endpoint Control Protocol"
manufacturer: Bose
model_family: "ControlSpace EX-1280C"
aliases: []
compatible_with:
  manufacturers:
    - Bose
    - "Bose Corporation"
  models:
    - "ControlSpace EX-1280C"
    - "ControlSpace EX-12AEC"
    - "ControlSpace EX-440C"
    - "ControlSpace EX-1280"
    - "ControlSpace ESP-880"
    - "ControlSpace ESP-880A"
    - "ControlSpace ESP-880AD"
    - "ControlSpace ESP-1240"
    - "ControlSpace ESP-1240A"
    - "ControlSpace ESP-1240AD"
    - "ControlSpace ESP-4120"
    - "ControlSpace ESP-1600"
    - "ControlSpace ESP-00 Series II"
    - "ControlSpace ESP-00"
    - "ControlSpace ESP-88"
    - "PowerMatch PM8500N"
    - "PowerMatch PM8250N"
    - "PowerMatch PM4500N"
    - "PowerMatch PM4250N"
    - "PowerShare PS404D"
    - "PowerShare PS604D"
    - MSA12X
    - "ControlSpace WP endpoints"
    - "ControlSpace EP endpoints"
    - "ControlSpace EX endpoints"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.boseprofessional.com
  - applicationmarket.crestron.com
source_urls:
  - https://assets.boseprofessional.com/m/3f75dade2573b467/original/ControlSpace-Serial-Protocol-v5-14-1.pdf
  - https://applicationmarket.crestron.com/content/Help/Bose/digihiker.pdf
retrieved_at: 2026-04-30T13:19:25.957Z
last_checked_at: 2026-06-02T17:21:48.189Z
generated_at: 2026-06-02T17:21:48.189Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device-specific behavior differences (per-family firmware gates) are not exhaustively enumerated."
  - "voltage/current ratings and safety interlock procedures are not described in this control-protocol document."
  - "formal safety interlock procedures (e.g. emergency-stop, evacuation paging) are not enumerated in this control-protocol document."
  - "device-specific firmware gates (which exact module index values each firmware version supports) are not enumerated."
  - "timing parameters (e.g. maximum time between characters, command echo behavior) are described qualitatively in source but not as numeric timeouts."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:48.189Z
  matched_actions: 77
  action_count: 77
  confidence: medium
  summary: "All 77 spec actions have verbatim literal matches in the source and the source command catalogue is fully represented by the spec. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Bose Professional ControlSpace / PowerMatch / PowerShare / MSA12X / Endpoint Control Protocol

## Summary
This spec covers the third-party ASCII control protocol used by Bose Professional audio products — ControlSpace ESP/EX signal processors, PowerMatch and PowerShare amplifiers, MSA12X powered steerable array loudspeakers, and the WP/EP/EX Dante endpoints. The protocol is transported as ASCII text terminated by `<CR>` over RS-232 (ESP/EX), TCP port 10055 (ESP/EX/PM/PS), and UDP port 49494 (MSA12X, endpoints). Commands are divided into System, Device, Module, MSA12X, Endpoint, and Subscription categories. Module commands reference user-defined or fixed module labels in the ControlSpace Designer design.

<!-- UNRESOLVED: device-specific behavior differences (per-family firmware gates) are not exhaustively enumerated. -->
<!-- UNRESOLVED: voltage/current ratings and safety interlock procedures are not described in this control-protocol document. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
addressing:
  tcp_port: 10055
  udp_port: 49494
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

Notes on transport (from source):
- RS-232: 3-wire connection is sufficient; CTS/RTS optional. 1U ESPs (880/1240/4120/1600) default to 38,400 baud. ESP-00 and EX default to 115,200 baud. 8 data bits, no parity, 1 stop bit for all.
- Serial-over-TCP (port 10055) is for ESP, EX, PowerMatch (networked), PowerShare. Device acts as Server; the client must initiate the connection. Up to 32 simultaneous SoIP connections (8 for ESP-00/PS404D/PS604D). Port can be changed/disabled on 1U ESPs and EX via ControlSpace Designer.
- Serial-over-UDP (port 49494) is used by MSA12X and WP/EP/EX endpoints. MSA12X supports 1 SoIP connection. Endpoints also send unsolicited UDP event notifications to an IP/port configured via the SASIP command.
- ESP also sends "Ready" over RS-232 when boot completes; SoIP connections must be re-established after reboot.

## Traits
```yaml
- powerable       # inferred from SY/Standby commands on PM/PS, MSA12X STANDBY
- routable        # inferred from Router, Matrix Mixer, Source Selector, Conference Room Router commands
- queryable       # inferred from GS, GG, GN, GV, GM, GL, GY, GF, GR, GH, GA, STATUS, VERSION, AUDIOLEVEL queries
- levelable       # inferred from SV/GV volume, SG/GG group level, EQ, gain, delay, dynamics parameters
```

## Actions
```yaml
# ----------------------------------------------------------------------------
# System Commands (System-level Parameter Sets, Groups, Room Combine)
# ----------------------------------------------------------------------------
- id: set_parameter_set
  label: Recall Parameter Set
  kind: action
  command: "SS{n}"
  params:
    - name: n
      type: hex
      description: Parameter Set number, 1-FFh (1-255 decimal)
- id: get_parameter_set
  label: Get Last Invoked Parameter Set
  kind: query
  command: "GS"
- id: set_group_level
  label: Set Group Master Level
  kind: action
  command: "SG{n,l}"
  params:
    - name: n
      type: hex
      description: Group number, 1-40h (1-64 decimal)
    - name: l
      type: hex
      description: Level, 0h (-60dB) to 90h (+12dB) in 0.5dB steps (ESP); PM/PS 0h-78h (0dB); FFh (-60.5dB/-inf)
- id: get_group_level
  label: Get Group Master Level
  kind: query
  command: "GG{n}"
- id: set_group_level_increment
  label: Set Group Level Increment/Decrement
  kind: action
  command: "SH{n,d,x}"
  params:
    - name: n
      type: hex
      description: Group number, 1-40h (1-64 decimal)
    - name: d
      type: integer
      description: Direction, 1=up or 0=down
    - name: x
      type: hex
      description: Number of 0.5dB steps (e.g. 5dB = A)
- id: set_group_mute
  label: Set Group Master Mute
  kind: action
  command: "SN{n,m}"
  params:
    - name: n
      type: hex
      description: Group number, 1-40h (1-64 decimal)
    - name: m
      type: enum
      description: 'M=Mute, U=Un-mute, T=Toggle mute state'
- id: get_group_mute
  label: Get Group Master Mute
  kind: query
  command: "GN{n}"
- id: set_room_combine
  label: Set Room Combine
  kind: action
  command: "SRC{n,a,b,s}"
  params:
    - name: n
      type: integer
      description: Room Combine Group number, 1-6 (EX only)
    - name: a
      type: integer
      description: Room number 1-6 (or name)
    - name: b
      type: integer
      description: Room number 1-6 (or name)
    - name: s
      type: enum
      description: 'J=Join, S=Split'
- id: get_room_combine
  label: Get Room Combine
  kind: query
  command: "GRC{n,a,b}"
- id: set_parameter_set_list
  label: Set Parameter Set List Selection
  kind: action
  command: 'SA"A">{1|2}={n}'
  params:
    - name: list_name
      type: string
      description: Parameter Set List name (quoted)
    - name: index1
      type: integer
      description: Always 1 or 2 to select the list
    - name: n
      type: integer
      description: Index of Parameter Set within the list
- id: get_parameter_set_list
  label: Get Parameter Set List Selection
  kind: query
  command: 'GA"A">{1|2}'

# ----------------------------------------------------------------------------
# Device Commands (slot/channel level, mute, signal level, network, faults)
# ----------------------------------------------------------------------------
- id: set_io_volume
  label: Set Input/Output Volume
  kind: action
  command: "SV{s,c,l}"
  params:
    - name: s
      type: hex
      description: Slot number (see Source Tables 1-2 for slot map per device)
    - name: c
      type: integer
      description: Channel number 1-8 (ESP) or 1-4 (PM/PS)
    - name: l
      type: hex
      description: 'Level 0h (-60dB) to 90h (+12dB), 0.5dB steps (ESP); 0h-78h (0dB) for PM/PS'
- id: get_io_volume
  label: Get Input/Output Volume
  kind: query
  command: "GV{s,c}"
- id: set_io_volume_increment
  label: Set Input/Output Volume Increment/Decrement
  kind: action
  command: "SI{s,c,d,x}"
  params:
    - name: s
      type: hex
      description: Slot number
    - name: c
      type: integer
      description: Channel number 1-8 (ESP) or 1-4 (PM/PS)
    - name: d
      type: integer
      description: '1=up, 0=down'
    - name: x
      type: hex
      description: Number of 0.5dB steps
- id: set_io_mute
  label: Set Input/Output Mute
  kind: action
  command: "SM{s,c,m}"
  params:
    - name: s
      type: hex
      description: Slot number
    - name: c
      type: integer
      description: Channel number 1-8 (ESP) or 1-4 (PM/PS)
    - name: m
      type: enum
      description: 'M=Mute, U=Un-mute, T=Toggle'
- id: get_io_mute
  label: Get Input/Output Mute
  kind: query
  command: "GM{s,c}"
- id: get_signal_level
  label: Get Signal Level
  kind: query
  command: "GL{s}"
  params:
    - name: s
      type: hex
      description: Slot index (see GL Indices table in source)
- id: get_signal_level_param
  label: Get Signal Level (Parameter)
  kind: query
  command: "GL{s,p}"
  params:
    - name: s
      type: hex
      description: Slot index
    - name: p
      type: integer
      description: Parameter index (for AEC Input=1, ERL=2, ERLE=3)
- id: get_ip_address
  label: Get IP Address
  kind: query
  command: "IP"
- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "IP{ip}"
  params:
    - name: ip
      type: string
      description: 'Dotted quad xxx.xxx.xxx.xxx (takes effect after reboot)'
- id: get_network_parameter
  label: Get Network Parameter
  kind: query
  command: "NP{p}"
  params:
    - name: p
      type: enum
      description: 'T=Type (DHCP/Static), M=Subnet Mask, G=Default Gateway'
- id: set_network_parameter
  label: Set Network Parameter
  kind: action
  command: "NP{p,v}"
  params:
    - name: p
      type: enum
      description: 'T, M, or G'
    - name: v
      type: string
      description: 'D=DHCP, S=Static, or xxx.xxx.xxx.xxx (takes effect after reboot)'
- id: reset_network_defaults
  label: Reset Network Parameters to Defaults
  kind: action
  command: "NPF"
- id: reset_reboot
  label: Reset / Reboot Device
  kind: action
  command: "RESET"
- id: set_standby
  label: Set Standby State (PM/PS only)
  kind: action
  command: "SY{s}"
  params:
    - name: s
      type: enum
      description: 'S=Standby, N=Normal'
- id: get_standby
  label: Get Standby State (PM/PS only)
  kind: query
  command: "GY"
- id: get_configuration
  label: Get Output Configuration (PM only)
  kind: query
  command: "GC"
- id: set_fault_notification
  label: Set Fault Output Notification (PM only)
  kind: action
  command: "SF{n}"
  params:
    - name: n
      type: enum
      description: 'O=On, F=Off (preference not retained across power-cycle)'
- id: get_fault_status
  label: Get Fault Status (PM only)
  kind: query
  command: "GF"
- id: clear_fault_alarms
  label: Clear Fault/Alarms (PM only)
  kind: action
  command: "CF"
- id: set_alarm_reporting
  label: Set Alarm Reporting (PM only)
  kind: action
  command: "SR{n}"
  params:
    - name: n
      type: enum
      description: 'O=On, F=Off (preference not retained across power-cycle)'
- id: get_alarm_status
  label: Get Alarm Status (PM only)
  kind: query
  command: "GR{c}"
  params:
    - name: c
      type: integer
      description: 'Channel 1-8 (1-4 for PM4500N/PM4250N), or 0 for non-channel-specific alarms'
- id: get_alarm_history
  label: Get Alarm History (PM/PS only)
  kind: query
  command: "GH"
- id: clear_alarm_history
  label: Clear Alarm History (PM/PS only)
  kind: action
  command: "CH"

# ----------------------------------------------------------------------------
# Module Commands (SA/GA/MA) - parameter ranges per module type are documented
# in the source's "ESP/EX Module Indices" and "PowerMatch / PowerShare Module
# Indices" sections. Each action below is a parameterized template; Index 1,
# Index 2, and Value are user-defined per the per-module table in the source.
# ----------------------------------------------------------------------------
- id: set_module_parameter
  label: Set Module Parameter
  kind: action
  command: 'SA"Module Name">{Index1}>{Index2}={Value}'
  params:
    - name: module
      type: string
      description: Module label (quoted; user-defined in ControlSpace Designer, or fixed for PM/PS)
    - name: index1
      type: string
      description: Primary index - selects input, channel, sub-module, or section per module type
    - name: index2
      type: string
      description: Secondary index (where applicable) - selects parameter per module type
    - name: value
      type: string
      description: 'Value to set (range and format per module type - see source sections 6.1.x / 6.2.x)'
- id: set_module_parameter_remote
  label: Set Module Parameter on a Different Device
  kind: action
  command: 'SA@"Device Name" "Module Name">{Index1}>{Index2}={Value}'
  params:
    - name: device
      type: string
      description: Device label (quoted; ESP network only - not for PM)
    - name: module
      type: string
      description: Module label (quoted)
    - name: index1
      type: string
      description: Primary index
    - name: index2
      type: string
      description: Secondary index
    - name: value
      type: string
      description: Value to set
- id: get_module_parameter
  label: Get Module Parameter
  kind: query
  command: 'GA"Module Name">{Index1}>{Index2}'
- id: get_module_parameter_remote
  label: Get Module Parameter on a Different Device
  kind: query
  command: 'GA@"Device Name" "Module Name">{Index1}>{Index2}'
- id: invoke_module_action
  label: Invoke Module Action (MA) - PSTN/VoIP
  kind: action
  command: 'MA"Module Name">{Index1}={Parameter}'
  params:
    - name: module
      type: string
      description: Module label (PSTN In / VoIP In)
    - name: index1
      type: integer
      description: '1=Dial Key, 2=Make Call, 3=End Call, 4=Answer Call, 5=TransferCall (VoIP)'
    - name: parameter
      type: string
      description: Dial digits, number, or SIP target

# ----------------------------------------------------------------------------
# MSA12X Commands (UDP port 49494)
# ----------------------------------------------------------------------------
- id: msa12x_find_unit
  label: MSA12X Find Unit (LED flash 5s)
  kind: action
  command: "FU{n}"
  params:
    - name: n
      type: integer
      description: 'Module within array: 1, 2, or 3 (2-module array uses 1 and 3)'
- id: msa12x_identify
  label: MSA12X Identify (persistent LED)
  kind: action
  command: "ID{n} {s}"
  params:
    - name: n
      type: integer
      description: 'Module 1, 2, or 3 (2-module array: 1 and 3)'
    - name: s
      type: integer
      description: '1=On, 0=Off'
- id: msa12x_array_count
  label: MSA12X Array Module Count
  kind: query
  command: "ARRAY"
- id: msa12x_set_input_gain
  label: MSA12X Set Input Gain
  kind: action
  command: "IG{t} {g}"
  params:
    - name: t
      type: enum
      description: 'A=Analog, D=Dante'
    - name: g
      type: number
      description: 'Gain: 0.0, 14.0, or 24.0'
- id: msa12x_get_input_gain
  label: MSA12X Get Input Gain
  kind: query
  command: "IG{t} Q"
  params:
    - name: t
      type: enum
      description: 'A=Analog, D=Dante'
- id: msa12x_set_input_source
  label: MSA12X Set Input Source
  kind: action
  command: "INPUT 1 {t}"
  params:
    - name: t
      type: integer
      description: '0=Dante, 1=Analog (ignored if backup mode is active)'
- id: msa12x_get_input_source
  label: MSA12X Get Input Source
  kind: query
  command: "GINPUT"
- id: msa12x_get_backup_strategy
  label: MSA12X Get Input Backup Strategy
  kind: query
  command: "GBKSTG"
- id: msa12x_set_standby
  label: MSA12X Set Standby Action
  kind: action
  command: "STANDBY {a}"
  params:
    - name: a
      type: enum
      description: 'NOW=enter Standby, WAKE=exit Standby'
- id: msa12x_get_standby
  label: MSA12X Get Standby State
  kind: query
  command: "GETSBST"
- id: msa12x_set_autostandby_time
  label: MSA12X Set Auto-Standby Wait Time (minutes)
  kind: action
  command: "STANDBY {w}"
  params:
    - name: w
      type: integer
      description: 'Wait time in minutes, 0-120 (0 disables auto-standby)'
- id: msa12x_get_autostandby_time
  label: MSA12X Get Auto-Standby Wait Time
  kind: query
  command: "GETSBTIME"
- id: msa12x_load_preset
  label: MSA12X Load Preset
  kind: action
  command: "LOAD {p}"
  params:
    - name: p
      type: integer
      description: 'Preset index 0-9 (preset number-1)'
- id: msa12x_get_current_preset
  label: MSA12X Get Last Invoked Preset
  kind: query
  command: "GCP"
- id: msa12x_get_audio_level
  label: MSA12X Get Audio Level
  kind: query
  command: "AUDIOLEVEL"
- id: msa12x_get_status_warning
  label: MSA12X Get Module Warning Status
  kind: query
  command: "STATUS 0 {n}"
  params:
    - name: n
      type: integer
      description: 'Module 1, 2, or 3'
- id: msa12x_get_status_fault
  label: MSA12X Get Module Fault Status
  kind: query
  command: "STATUS 1 {n}"
  params:
    - name: n
      type: integer
      description: 'Module 1, 2, or 3'
- id: msa12x_get_firmware_version
  label: MSA12X Get Module Firmware Version
  kind: query
  command: "VERSION {n}"
  params:
    - name: n
      type: integer
      description: 'Module 1, 2, or 3'

# ----------------------------------------------------------------------------
# Endpoint Commands (UDP port 49494) - WP/EP/EX Dante endpoints
# ----------------------------------------------------------------------------
- id: ep_find_unit
  label: Endpoint Find Unit (LED flash 5s)
  kind: action
  command: "FU"
- id: ep_identify
  label: Endpoint Identify (persistent LED)
  kind: action
  command: "ID{s}"
  params:
    - name: s
      type: integer
      description: '1=On, 0=Off'
- id: ep_set_input_gain
  label: Endpoint Set Input Gain
  kind: action
  command: "IG{c} {g}"
  params:
    - name: c
      type: integer
      description: Channel number
    - name: g
      type: number
      description: 'Gain per model: EX-4ML/EX-8ML/EP40 = 0/15/30/45 dB; EP22/WP22B/BU = 0/25/40 dB'
- id: ep_get_input_gain
  label: Endpoint Get Input Gain (EX-4ML/EX-8ML only)
  kind: query
  command: "IG{c} Q"
  params:
    - name: c
      type: integer
      description: 'Channel number, or 0 for all channels'
- id: ep_set_input_source
  label: Endpoint Set Input Source (WP22BU)
  kind: action
  command: "IS{c} {s}"
  params:
    - name: c
      type: integer
      description: 'Channel 2 only for WP22BU'
    - name: s
      type: enum
      description: 'A, B, or A+B'
- id: ep_set_phantom_power
  label: Endpoint Set Phantom Power
  kind: action
  command: "PP{c} {s}"
  params:
    - name: c
      type: integer
      description: Channel number, 1-8
    - name: s
      type: integer
      description: '1=On, 0=Off'
- id: ep_get_phantom_power
  label: Endpoint Get Phantom Power (EX-4ML/EX-8ML only)
  kind: query
  command: "PP{c} Q"
  params:
    - name: c
      type: integer
      description: 'Channel number, or 0 for all'
- id: ep_set_output_gain
  label: Endpoint Set Output Gain (EP22)
  kind: action
  command: "OG{c} {g}"
  params:
    - name: c
      type: integer
      description: Channel number
    - name: g
      type: number
      description: 'Gain: 0.0 or 10.0'
- id: ep_read_signal_level
  label: Endpoint Read Signal Level (EX-4ML/EX-8ML)
  kind: query
  command: "RSL"
- id: ep_write_logic_output
  label: Endpoint Write Logic Output
  kind: action
  command: "WLO{p} {s}"
  params:
    - name: p
      type: integer
      description: 'Output 1-16 (EX-8ML) or 1-8 (EX-4ML)'
    - name: s
      type: integer
      description: '1=On, 0=Off'
- id: ep_read_logic_output
  label: Endpoint Read Logic Output
  kind: query
  command: "RLO{p}"
  params:
    - name: p
      type: integer
      description: 'Output number, or 0 for all'
- id: ep_read_logic_input
  label: Endpoint Read Logic Input
  kind: query
  command: "RLI{p}"
  params:
    - name: p
      type: integer
      description: 'Input 1-8 (EX-8ML) or 1-4 (EX-4ML), or 0 for all'
- id: ep_set_logic_event
  label: Endpoint Set Logic Event Notification
  kind: action
  command: "EVNT{p} {e}"
  params:
    - name: p
      type: integer
      description: Logic input number
    - name: e
      type: enum
      description: 'RISE, FALL, BOTH, or OFF'
- id: ep_set_event_notification_ip
  label: Endpoint Set Event Notification IP/Port
  kind: action
  command: "SASIP{a}:{p}"
  params:
    - name: a
      type: string
      description: 'Target IP xxx.xxx.xxx.xxx'
    - name: p
      type: integer
      description: Target UDP port
- id: ep_query_audio_settings
  label: Endpoint Query All Audio Settings
  kind: query
  command: "QUERY"
- id: ep_restore_factory_defaults
  label: Endpoint Restore Factory Defaults
  kind: action
  command: "DEFAULTS"
- id: ep_get_firmware_version
  label: Endpoint Get Firmware Version
  kind: query
  command: "VERSION"

# ----------------------------------------------------------------------------
# Subscription Commands (unsolicited updates)
# ----------------------------------------------------------------------------
- id: subscription_support_query
  label: Query Device Subscription Support
  kind: query
  command: "SUB"
- id: subscription_register
  label: Subscribe to Data Change
  kind: action
  command: 'SUB"{GET_command_text}"'
  params:
    - name: get_command
      type: string
      description: 'Quoted GET command text (System, Device, or Module GET command)'
- id: subscription_unregister
  label: Unsubscribe from Data Change
  kind: action
  command: 'UNS"{GET_command_text}"'
  params:
    - name: get_command
      type: string
      description: 'Quoted GET command text (must match a prior subscription)'
```

## Feedbacks
```yaml
- id: parameter_set_last_invoked
  type: integer
  description: Last invoked Parameter Set number, 0-FF (0 = none)
- id: group_level
  type: integer
  description: Group master level in 0.5dB steps (0=−60dB, 90=+12dB on ESP, 78=0dB on PM/PS, FF=−inf)
- id: group_mute_state
  type: enum
  values: [muted, unmuted]
- id: room_combine_state
  type: string
  description: 'Bracketed pairing list e.g. "GRC 1,[2,4,5][1,3]" indicating which rooms are joined'
- id: io_volume
  type: integer
  description: 'I/O level in 0.5dB steps per slot/channel (see SV/GV action for ranges)'
- id: io_mute_state
  type: enum
  values: [muted, unmuted]
- id: signal_level_array
  type: array
  description: 'Hex array of channel levels; convert via formula 20*log10(level/16777215) where applicable (MSA12X AUDIOLEVEL)'
- id: ip_address
  type: string
  description: 'Dotted quad xxx.xxx.xxx.xxx (response to IP query)'
- id: network_parameter
  type: string
  description: 'D=DHCP, S=Static, or dotted quad (response to NP query)'
- id: standby_state
  type: enum
  values: [standby, normal]
- id: output_configuration
  type: array
  description: 'Per-channel config tokens: IN, BL, B7, B1, PA, QL, Q7, Q1 (PM only, GC response)'
- id: fault_state
  type: enum
  values: [fault, no_fault]
- id: alarm_status
  type: string
  description: '"GR c,s,t" - channel/severity(W|F|S|N)/type(N|O|S|A|D|I|L|C|P|Z)'
- id: alarm_history
  type: array
  description: 'Array of [Time, Date, Description] entries from GH (PM/PS only)'
- id: msa12x_audio_level
  type: string
  description: 'ACK AUDIOLEVEL i l - i in {1,18,19}, l is 32-bit hex (24-bit level)'
- id: msa12x_warning_code
  type: integer
  description: '0=None, 18=Signal Clip, 19=Amp Limiting, 20=High Temperature'
- id: msa12x_fault_code
  type: integer
  description: '0=None, 1101=Driver Fault, 1104=Temperature Fault, 1105=Amp/Internal Connection Fault'
- id: msa12x_firmware_version
  type: string
  description: 'Firmware version string e.g. "x.x" (per module)'
- id: ep_logic_io_state
  type: integer
  description: '1=On, 0=Off (per pin, from RLI/RLO/RLI responses)'
- id: ep_audio_settings_snapshot
  type: string
  description: 'ACK QUERY IG1=... PP1=... ID=... snapshot of all audio parameters (per model)'
- id: ep_firmware_version
  type: string
  description: 'Firmware version string from VERSION'
```

## Variables
```yaml
# Module parameters are addressable as Variables in ControlSpace Designer.
# Each module type exposes a user-defined set of parameters; range/format
# details per module are documented in source sections 6.1.x and 6.2.x.
# Examples (representative - full set is per module type):
- id: input_gain
  type: number
  description: 'Pre-amp gain in dB. ESP/EX: 0/14/24/32/44/54/64 (Mic/Line II, 1U ESP, EX); legacy set differs. MSA12X: 0.0/14.0/24.0. Endpoints: per model 0/15/30/45 or 0/25/40 dB.'
- id: input_type
  type: enum
  description: 'M=Mic, L=Line (Input module Index 1=1)'
- id: input_mute
  type: enum
  description: 'O=On (muted), F=Off, T=Toggle'
- id: phantom_power
  type: enum
  description: 'O=On, F=Off, T=Toggle'
- id: output_level
  type: number
  description: '−60.5 to +12.0 dB in 0.5 dB steps (most modules); PM/PS: −60.5 to 0.0 dB'
- id: output_mute
  type: enum
  description: 'O=On (muted), F=Off, T=Toggle'
- id: output_polarity
  type: enum
  description: 'O=On (inverted), F=Off, T=Toggle'
- id: peq_band_frequency
  type: integer
  description: '20 to 20000 Hz'
- id: peq_band_q
  type: number
  description: '0.10 to 10.0 in 0.1 steps'
- id: peq_band_gain
  type: number
  description: '−20.0 to +20.0 dB in 0.1 dB steps'
- id: geq_band_gain
  type: number
  description: '−15.0 to +15.0 dB in 0.1 dB steps (per band of 31, 20Hz-20kHz)'
- id: delay_time
  type: integer
  description: 'Samples; ESP-00 up to 144000 (3s), 1U ESP/EX up to 48000 (1s), PM up to 144000 (3s), PS up to 2400 (50ms)'
- id: limiter_peak_threshold
  type: number
  description: '0.5 to 71.0 V (or 142.0 for bridged), 0.5 step (PM Limiter)'
- id: matrix_cross_point_level
  type: number
  description: '−60.5 to 0.0 dB in 0.5 dB steps'
- id: source_selector_input
  type: integer
  description: '1-16 (mono or stereo source selector module)'
- id: router_output_input
  type: integer
  description: 'Output 1-32, Input 0-32 (0=Off)'
- id: pstn_auto_answer_rings
  type: integer
  description: '0=Off to 8 rings (PSTN Input module)'
- id: pstn_country_code
  type: integer
  description: '0 to 196 (see Appendix A in source)'
- id: voip_account_status
  type: string
  description: 'NOT_CONFIGURED|CONFIGURED|P2P_REGISTERED|PROXY_REGISTERING|PROXY_REGISTERED|PROXY_TIMEOUT (VoIP module, read-only)'
- id: voip_call_status
  type: string
  description: 'INCOMING|DIALING|RINGBACK|ACTIVE|HANGUP|HOLD_STATE_PEER (VoIP module, read-only)'
- id: agc_target_level
  type: number
  description: '−40.0 to +24 dB, 1 dB step (AGC Enhanced)'
- id: gate_threshold
  type: number
  description: '0 to −40 dBFS, 0.5 dB step'
- id: ducker_threshold
  type: number
  description: '0 to −40 dBFS, 0.5 step'
- id: pfs_dynamic_filter_release
  type: integer
  description: '1 to 43200 seconds'
```

## Events
```yaml
# Unsolicited notifications defined in source:
- id: msa12x_event
  description: 'Sent as UDP to the configured SASIP target. Format: ACK EVNT p e response, or RLI/RLO echoes of state changes.'
- id: endpoint_logic_event
  description: 'UDP packet sent when configured via EVNT (RISE/FALL/BOTH). Format documented alongside EVNT command in source.'
- id: subscribed_parameter_change
  description: 'For System/Device/Module GET commands that have subscription support (e.g. GG, GN, GV, GM, GA), the current value is sent automatically when it changes. Sent on the same TCP connection that issued SUB.'
- id: msa12x_warning_fault_change
  description: 'For PowerMatch, SR O enables unsolicited GR c,s,t,x alarms; SF O enables unsolicited GF notifications.'
- id: automatic_module_notification
  description: 'Module commands on a module whose label is prefixed with "#" (e.g. "#Hall") cause a GA response to be sent automatically whenever parameters for that module change from other devices (CC-16/CC-64). Not sent when the change is via the serial command itself.'
```

## Macros
```yaml
# Multi-step examples documented in source. Implementers can compose these
# from the Actions above; they are not standalone device commands.
- id: confirm_set_with_get
  description: 'Per source: "Following a Set command with a Get is a useful way to confirm command success." Pattern: issue SA/SV/SN/etc, then issue matching GA/GV/GN query.'
- id: boot_wait_then_reconnect
  description: 'On RS-232, ESP sends "Ready" after boot. On SoIP, callers must re-establish the TCP/UDP connection after sufficient time has elapsed (varies by device and installed cards).'
- id: controlspace_designer_link_break
  description: 'When the device goes on-line with ControlSpace Designer, the SoIP third-party control connection is closed; the control system must re-establish it once on-line.'
```

## Safety
```yaml
confirmation_required_for:
  - reset_reboot  # source: "all the current settings in the device will be lost and the device will revert to its power-on (flashed) settings"
  - np_f  # reset all network parameters to defaults
  - clear_fault_alarms  # alarms may re-trigger if conditions persist
  - ep_restore_factory_defaults  # source: returns to factory settings; Preset 0 stored with those defaults
  - ip_set  # change of network reachability
interlocks: []
# Source notes (no formal interlock list):
# - Set Volume commands are ignored if the channel is muted (mute first, then set level).
# - PowerMatch standby transitions are not immediate; allow time to complete.
# - IP and NP changes only take effect after a device reboot.
# - For MSA12X, if Backup Strategy is SP (Signal Presence), INPUT source changes are ignored.
# - Endpoints paired with an EX processor: directly changing endpoint settings may be overridden by the processor's programmed settings.
# - MSA12X is a Class-2 wiring device; nothing in the source describes AC mains interlocks.
# UNRESOLVED: formal safety interlock procedures (e.g. emergency-stop, evacuation paging) are not enumerated in this control-protocol document.
```

## Notes
- All ASCII commands and responses are terminated with `<CR>` (carriage return, ASCII 0x0D). Hex values may be sent in upper or lower case; responses are always lower case.
- Module Commands: Set commands and Get responses end with `=` followed by the value; multiple commands on one line are separated by `;`. Devices respond with `<ACK>` (ASCII 0x06) or `<NAK> nn` where `nn` is a 2-digit error code (01=Invalid Module Name, 02=Illegal Index, 03=Value out-of-range, 99=Unknown error).
- MSA12X and Endpoint Commands: respond with literal "ACK" and echo of received command on success, or "NACK" on failure. (Not the raw ASCII `<ACK>`/`<NAK>` bytes used by Module Commands.)
- Set/Get IP and NP changes do not take effect until the device is rebooted; pair with `RESET` to apply.
- For Module commands, module labels must be unique within a device. If two modules share a name (e.g. an Output and a PEQ both called "Left"), SA/GA/MA will not work correctly.
- Module names prefixed with `#` (set in ControlSpace Designer) cause automatic GA responses when other devices change that module's parameters.
- For 8-channel PowerMatch and PowerShare devices, the `GL` command uses only Slot 1 (inputs) and Slot 2 (outputs) for all 8 channels.
- Cross-point routing for the Standard Mixer uses an 8-hex-digit bitmask where each hex digit represents 4 outputs (little-endian within each digit).
- Endpoint "Backup Strategy" (MSA12X): `FORCE` allows manual input selection via the `INPUT` command; `SP 1` (Signal Presence) makes the device auto-failover to Analog and ignores manual `INPUT` commands.
- The source is a multi-product control protocol document; the device name "DigiHiker" provided in the input does not match any product in the source. This spec covers the protocol as it applies across the listed model family.
<!-- UNRESOLVED: device-specific firmware gates (which exact module index values each firmware version supports) are not enumerated. -->
<!-- UNRESOLVED: timing parameters (e.g. maximum time between characters, command echo behavior) are described qualitatively in source but not as numeric timeouts. -->

## Provenance

```yaml
source_domains:
  - assets.boseprofessional.com
  - applicationmarket.crestron.com
source_urls:
  - https://assets.boseprofessional.com/m/3f75dade2573b467/original/ControlSpace-Serial-Protocol-v5-14-1.pdf
  - https://applicationmarket.crestron.com/content/Help/Bose/digihiker.pdf
retrieved_at: 2026-04-30T13:19:25.957Z
last_checked_at: 2026-06-02T17:21:48.189Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:48.189Z
matched_actions: 77
action_count: 77
confidence: medium
summary: "All 77 spec actions have verbatim literal matches in the source and the source command catalogue is fully represented by the spec. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device-specific behavior differences (per-family firmware gates) are not exhaustively enumerated."
- "voltage/current ratings and safety interlock procedures are not described in this control-protocol document."
- "formal safety interlock procedures (e.g. emergency-stop, evacuation paging) are not enumerated in this control-protocol document."
- "device-specific firmware gates (which exact module index values each firmware version supports) are not enumerated."
- "timing parameters (e.g. maximum time between characters, command echo behavior) are described qualitatively in source but not as numeric timeouts."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
