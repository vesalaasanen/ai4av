---
spec_id: admin/bose-corporation-digihiker-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bose ControlSpace Serial Control Protocol Spec"
manufacturer: "Bose Corporation"
model_family: "ControlSpace EX-1280C"
aliases: []
compatible_with:
  manufacturers:
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
    - "ControlSpace WP Endpoint"
    - "ControlSpace EP Endpoint"
    - "ControlSpace EX Dante Endpoint"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.boseprofessional.com
  - applicationmarket.crestron.com
retrieved_at: 2026-04-30T13:19:25.957Z
last_checked_at: 2026-04-30T15:19:06.019Z
generated_at: 2026-04-30T15:19:06.019Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T15:19:06.019Z
  matched_actions: 63
  action_count: 63
  confidence: high
  summary: "All 39 actions and 24 feedback entries matched source commands; all transport values verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Bose ControlSpace Serial Control Protocol Spec

## Summary
ASCII serial control protocol for Bose Professional ControlSpace processors (ESP, EX), PowerMatch and PowerShare amplifiers, MSA12X loudspeakers, and WP/EP/EX Dante endpoints. Supports RS-232, TCP/IP serial-over-Ethernet, and UDP transports. Commands cover system-level parameter sets and groups, device-level I/O volume/mute/signal/IP/reset/standby/fault/alarm, per-module DSP parameter control, MSA12X loudspeaker control, endpoint I/O control, and subscription-based change notifications.

<!-- UNRESOLVED: protocol version number not stated in source -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
addressing:
  port: 10055  # TCP: ESP, EX, PowerMatch, PowerShare serial-over-Ethernet
serial:
  baud_rate: 38400  # ESP-880/1240/4120/1600, EX-1280C/440C/1280
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # NOTE: ESP-00 uses baud_rate 115200
  # NOTE: RS-232 available on ESP and EX only; 3-wire connection sufficient (CTS/RTS optional)
  # NOTE: ESP uses 9-way D connector (DTE); EX uses miniature Phoenix connector
auth:
  type: none  # inferred: no auth procedure in source
```

### UDP Endpoints
```yaml
# MSA12X and WP/EP/EX endpoints use UDP port 49494
# ESP/EX/PM/PS TCP port 10055
# All commands terminated with <CR> (0x0D)
# Maximum simultaneous SoIP connections per product:
#   EX-1280C/12AEC/440C/1280, ESP-880/1240/4120/1600, PMxxxxN: 32
#   ESP-00 Series II/00/88, PS404D/604D: 8
#   MSA12X: 1
```

## Traits
```yaml
traits:
  - powerable    # SY/STANDBY commands, RESET reboot
  - queryable    # GS, GG, GN, GV, GM, GL, GY, GC, GF, GR, GH, GA queries
  - levelable    # SV/GV volume, SG/GG group level, module gain/level params
  - routable     # Router module, Matrix Mixer cross-points, Source Selector
```

## Actions
```yaml
# === SYSTEM COMMANDS (hex notation, apply across multiple devices) ===

- id: set_parameter_set
  label: Set Parameter Set
  kind: action
  description: "Recall/invoke Parameter Set n. SS n<CR>. n=1-FFh (1-255 decimal)."
  params:
    - name: n
      type: integer
      description: "Parameter Set number (1-255 decimal, sent as hex)"

- id: set_group_master_level
  label: Set Group Master Level
  kind: action
  description: "Set master level of Group n to level l. SG n,l<CR>. n=1-40h (1-64). l=0h (-60dB) to 90h (+12dB) in 0.5dB steps, FFh (-inf). PM/PS: 0h to 78h (0dB)."
  params:
    - name: n
      type: integer
      description: "Group number (1-64)"
    - name: l
      type: integer
      description: "Level in hex (0-144 decimal, 0.5dB steps, or 0-120 for PM/PS, or 255 for -inf)"

- id: set_group_level_increment
  label: Set Group Level Increment/Decrement
  kind: action
  description: "Increment/decrement master level of Group n by x steps. SH n,d,x<CR>."
  params:
    - name: n
      type: integer
      description: "Group number (1-64)"
    - name: d
      type: integer
      description: "Direction: 1=up, 0=down"
    - name: x
      type: integer
      description: "Number of 0.5dB steps (hex)"

- id: set_group_master_mute
  label: Set Group Master Mute
  kind: action
  description: "Set/change mute state for Group n. SN n,m<CR>."
  params:
    - name: n
      type: integer
      description: "Group number (1-64)"
    - name: m
      type: string
      description: "M=Mute, U=Unmute, T=Toggle"

- id: set_room_combine
  label: Set Room Combine
  kind: action
  description: "Join or split rooms in a Room Combine Group. SRC n,a,b,s<CR> or SRC \"N\",\"A\",\"B\",s<CR>. EX only."
  params:
    - name: n
      type: integer
      description: "Room Combine Group number (1-6) or group name string"
    - name: a
      type: string
      description: "First room number or name"
    - name: b
      type: string
      description: "Second room number or name"
    - name: s
      type: string
      description: "J=Join, S=Split"

- id: set_parameter_set_list
  label: Set Parameter Set List Selection
  kind: action
  description: "Change current selection of Parameter Set List. SA \"A\">1=n<CR>."
  params:
    - name: list_name
      type: string
      description: "Parameter Set List name"
    - name: n
      type: integer
      description: "Index of Parameter Set to select"

# === DEVICE COMMANDS (hex notation) ===

- id: set_io_volume
  label: Set Input/Output Volume
  kind: action
  description: "Set volume for slot s, channel c, to level l. SV s,c,l<CR>. Ignored if channel muted. PM/PS outputs only."
  params:
    - name: s
      type: integer
      description: "Slot number (hex)"
    - name: c
      type: integer
      description: "Channel number (1-8 ESP, 1-4 PM/PS)"
    - name: l
      type: integer
      description: "Level in hex (0h=-60dB to 90h=+12dB, 0.5dB steps; PM/PS 0h to 78h=0dB)"

- id: set_volume_increment
  label: Set Volume Increment/Decrement
  kind: action
  description: "Increment/decrement level of slot s, channel c. SI s,c,d,x<CR>. Ignored if muted."
  params:
    - name: s
      type: integer
      description: "Slot number (hex)"
    - name: c
      type: integer
      description: "Channel number"
    - name: d
      type: integer
      description: "Direction: 1=up, 0=down"
    - name: x
      type: integer
      description: "Number of 0.5dB steps (hex)"

- id: set_io_mute
  label: Set Input/Output Mute
  kind: action
  description: "Set/change mute status for slot s, channel c. SM s,c,m<CR>."
  params:
    - name: s
      type: integer
      description: "Slot number (hex)"
    - name: c
      type: integer
      description: "Channel number"
    - name: m
      type: string
      description: "M=Mute, U=Unmute, T=Toggle"

- id: set_ip_address
  label: Set IP Address
  kind: action
  description: "Set/change device IP address. IP xxx.xxx.xxx.xxx<CR>. Takes effect after reboot."
  params:
    - name: address
      type: string
      description: "IP address in dotted decimal"

- id: set_network_parameter
  label: Set Network Parameter
  kind: action
  description: "Set subnet mask, gateway, or DHCP mode. NP p,v<CR>. NP F resets to defaults."
  params:
    - name: p
      type: string
      description: "T=Type(DHCP/Static), M=Subnet Mask, G=Default Gateway, F=Reset all"
    - name: v
      type: string
      description: "D=DHCP, S=Static, or xxx.xxx.xxx.xxx address. Omit for F."

- id: reset_device
  label: Reset/Reboot Device
  kind: action
  description: "Instruct device to restart (equivalent to power-cycle). RESET<CR>. Reverts to power-on settings."

- id: set_standby
  label: Set Standby Status
  kind: action
  description: "Set standby state for PowerMatch/PowerShare. SY s<CR>. Not supported on ESP."
  params:
    - name: s
      type: string
      description: "S=Standby, N=Normal"

- id: set_fault_notification
  label: Set Fault Notification
  kind: action
  description: "Enable/disable unsolicited Fault Output state changes for PowerMatch. SF n<CR>. Not retained on power-down."
  params:
    - name: n
      type: string
      description: "O=On, F=Off"

- id: clear_fault_alarms
  label: Clear Fault/Alarms
  kind: action
  description: "Clear active alarm conditions and reset Fault Output on PowerMatch. CF<CR>."

- id: set_alarm_reporting
  label: Set Alarm Reporting
  kind: action
  description: "Enable/disable unsolicited alarm/fault notifications for PowerMatch. SR n<CR>. Not retained on power-down."
  params:
    - name: n
      type: string
      description: "O=On, F=Off"

- id: clear_alarm_history
  label: Clear Alarm History
  kind: action
  description: "Clear internal alarm log on PowerMatch/PowerShare. CH<CR>."

# === MODULE COMMANDS (ASCII text notation) ===

- id: set_module_parameter
  label: Set Module Parameter
  kind: action
  description: "Set a DSP module parameter. SA \"Module Name\">Index1>Index2=Value<CR>. Response: ACK (0x06) or NAK nn."
  params:
    - name: module_name
      type: string
      description: "Unique module label from ControlSpace Designer"
    - name: index_1
      type: integer
      description: "Primary index"
    - name: index_2
      type: integer
      description: "Secondary index (optional)"
    - name: value
      type: string
      description: "Parameter value as ASCII text"

- id: set_module_parameter_remote
  label: Set Module Parameter on Remote Device
  kind: action
  description: "Set module parameter on different ESP device. SA @\"Device Name\" \"Module Name\">I1>I2=Value<CR>."
  params:
    - name: device_name
      type: string
      description: "Unique device label from ControlSpace Designer"
    - name: module_name
      type: string
      description: "Module label"
    - name: index_1
      type: integer
      description: "Primary index"
    - name: index_2
      type: integer
      description: "Secondary index (optional)"
    - name: value
      type: string
      description: "Parameter value"

- id: invoke_module_action
  label: Invoke Module Action
  kind: action
  description: "Invoke action for modules with actions (PSTN, VoIP). MA \"Module Name\">Index1=Parameter<CR>."
  params:
    - name: module_name
      type: string
      description: "Module label"
    - name: index_1
      type: integer
      description: "Action index"
    - name: parameter
      type: string
      description: "Action parameter"

# === MSA12X COMMANDS ===

- id: msa_identify
  label: MSA12X Identify Device
  kind: action
  description: "Activate/deactivate Identify LED on MSA12X module. ID n s<CR>. n=module(1-3), s=1=On, 0=Off."
  params:
    - name: n
      type: integer
      description: "Module in array (1, 2, or 3)"
    - name: s
      type: integer
      description: "1=On, 0=Off"

- id: msa_find_unit
  label: MSA12X Find Unit
  kind: action
  description: "Flash status LED for 5 seconds. FU n<CR>. n=module(1-3)."
  params:
    - name: n
      type: integer
      description: "Module in array (1, 2, or 3)"

- id: msa_set_input_gain
  label: MSA12X Set Input Gain
  kind: action
  description: "Set pre-amp gain for analog or Dante input. IG t g<CR>."
  params:
    - name: t
      type: string
      description: "A=Analog, D=Dante"
    - name: g
      type: number
      description: "Gain: 0.0, 14.0, or 24.0"

- id: msa_set_input_source
  label: MSA12X Set Input Source
  kind: action
  description: "Select input source when backup not active. INPUT 1 t<CR>."
  params:
    - name: t
      type: integer
      description: "0=Dante, 1=Analog"

- id: msa_set_standby
  label: MSA12X Set Standby
  kind: action
  description: "Enter/exit standby. STANDBY a<CR>."
  params:
    - name: a
      type: string
      description: "NOW=enter standby, WAKE=exit standby"

- id: msa_set_auto_standby
  label: MSA12X Set Auto-Standby Timer
  kind: action
  description: "Set auto-standby wait time. STANDBY w<CR>. 0=disabled."
  params:
    - name: w
      type: integer
      description: "Wait time in minutes (0-120)"

- id: msa_load_preset
  label: MSA12X Load Preset
  kind: action
  description: "Recall stored preset configuration. LOAD p<CR>."
  params:
    - name: p
      type: integer
      description: "Preset index 0-9 (preset number minus 1)"

# === ENDPOINT COMMANDS ===

- id: endpoint_identify
  label: Endpoint Identify Device
  kind: action
  description: "Activate/deactivate Identify LED on endpoint. ID s<CR>. s=1=On, 0=Off."
  params:
    - name: s
      type: integer
      description: "1=On, 0=Off"

- id: endpoint_find_unit
  label: Endpoint Find Unit
  kind: action
  description: "Flash power LED for 5 seconds. FU<CR>."

- id: endpoint_set_input_gain
  label: Endpoint Set Input Gain
  kind: action
  description: "Set pre-amp gain for input channel. IG c g<CR>."
  params:
    - name: c
      type: integer
      description: "Channel number"
    - name: g
      type: number
      description: "Gain value (model-dependent: 0.0/15.0/30.0/45.0 or 0.0/25.0/40.0)"

- id: endpoint_set_input_source
  label: Endpoint Set Input Source
  kind: action
  description: "Select input source for WP22BU channel 2. IS c s<CR>."
  params:
    - name: c
      type: integer
      description: "Channel number (2 for WP22BU)"
    - name: s
      type: string
      description: "A, B, or A+B"

- id: endpoint_set_phantom_power
  label: Endpoint Set Phantom Power
  kind: action
  description: "Activate/deactivate phantom power for input channel. PP c s<CR>."
  params:
    - name: c
      type: integer
      description: "Channel number (1-8)"
    - name: s
      type: integer
      description: "1=On, 0=Off"

- id: endpoint_set_output_gain
  label: Endpoint Set Output Gain
  kind: action
  description: "Set output gain for EP22 channel. OG c g<CR>."
  params:
    - name: c
      type: integer
      description: "Channel number"
    - name: g
      type: number
      description: "Gain: 0.0 or 10.0"

- id: endpoint_set_logic_output
  label: Endpoint Set Logic Output
  kind: action
  description: "Set state of logic output on EX-4ML/EX-8ML. WLO p s<CR>."
  params:
    - name: p
      type: integer
      description: "Logic output pin (1-16 for EX-8ML, 1-8 for EX-4ML)"
    - name: s
      type: integer
      description: "1=On, 0=Off"

- id: endpoint_set_logic_event
  label: Endpoint Set Logic Event
  kind: action
  description: "Configure automatic event notification on logic input change. EVNT p e<CR>."
  params:
    - name: p
      type: integer
      description: "Logic input (1-8 for EX-8ML, 1-4 for EX-4ML)"
    - name: e
      type: string
      description: "RISE, FALL, BOTH, or OFF"

- id: endpoint_set_event_ip
  label: Endpoint Set Event Notification IP
  kind: action
  description: "Set IP address and port for UDP event notifications. SASIP a:p<CR>."
  params:
    - name: address
      type: string
      description: "IP address xxx.xxx.xxx.xxx"
    - name: port
      type: integer
      description: "Port number"

- id: endpoint_restore_defaults
  label: Endpoint Restore Factory Defaults
  kind: action
  description: "Reset endpoint to factory settings. DEFAULTS<CR>. Gains=0.0, Phantom=Off, Logic outputs=Off."

# === SUBSCRIPTION COMMANDS ===

- id: subscribe
  label: Subscribe to Data Change
  kind: action
  description: "Register for unsolicited updates when a parameter changes. SUB \"GET command\"<CR>."
  params:
    - name: get_command
      type: string
      description: "Full text of supported GET command to subscribe to"

- id: unsubscribe
  label: Unsubscribe from Data Change
  kind: action
  description: "Stop unsolicited updates. UNS \"GET command\"<CR>."
  params:
    - name: get_command
      type: string
      description: "Full text of GET command to unsubscribe from"
```

## Feedbacks
```yaml
# === SYSTEM QUERY RESPONSES ===

- id: get_parameter_set
  type: string
  description: "Last invoked Parameter Set. GS<CR> -> S n<CR>. n=0-FF (0 if none recalled)."

- id: get_group_master_level
  type: string
  description: "Group n master level. GG n<CR> -> GG n,l<CR>."

- id: get_group_master_mute
  type: string
  description: "Group n mute state. GN n<CR> -> GN n,m<CR>. m=M(Muted)/U(Unmuted)."

- id: get_room_combine
  type: string
  description: "Room combine state. GRC n<CR> -> GRC n,[a,b][c,d,f]<CR>. Brackets show joined rooms."

- id: get_parameter_set_list
  type: string
  description: "Current selection of Parameter Set List. GA \"A\">2<CR> -> GA \"A\">2=n<CR>."

# === DEVICE QUERY RESPONSES ===

- id: get_io_volume
  type: string
  description: "Input/output volume for slot s, channel c. GV s,c<CR> -> GV s,c,l<CR>."

- id: get_signal_level
  type: string
  description: "Current signal levels for channels in slot s. GL s<CR> -> GL s [1..N]<CR>. Returns hex array."

- id: get_io_mute
  type: string
  description: "Mute status for slot s, channel c. GM s,c<CR> -> GM s,c,m<CR>."

- id: get_ip_address
  type: string
  description: "Current IP address. IP<CR> -> IP xxx.xxx.xxx.xxx<CR>."

- id: get_network_parameter
  type: string
  description: "Network setting. NP p<CR> -> NP p,v<CR>."

- id: get_standby_status
  type: string
  description: "Standby state for PM/PS. GY<CR> -> GY s<CR>. s=S(Standby)/N(Normal)."

- id: get_configuration
  type: string
  description: "PM output configuration. GC<CR> -> GC 1,2,...,8<CR>. IN/BL/B7/B1/PA/QL/Q7/Q1 per channel."

- id: get_fault_status
  type: string
  description: "PM fault status. GF<CR> -> GF f<CR>. f=F(Fault)/C(No Fault)."

- id: get_alarm_status
  type: string
  description: "PM alarm status for channel c. GR c<CR> -> GR c,s,t<CR>. s=severity(W/F/S), t=type(N/O/S/A/D/I/L/C/P/Z)."

- id: get_alarm_history
  type: string
  description: "PM/PS alarm log dump. GH<CR> -> GH [Time,Date,Description...]<CR>."

# === MODULE QUERY RESPONSES ===

- id: get_module_parameter
  type: string
  description: "Query module parameter. GA \"Module Name\">I1>I2<CR> -> GA \"Module Name\">I1>I2=Value<CR>."

# === MSA12X QUERY RESPONSES ===

- id: msa_get_array_count
  type: integer
  description: "Number of modules in MSA12X array. ARRAY<CR> -> ACK ARRAY n<CR>. n=1,2,3."

- id: msa_get_input_gain
  type: string
  description: "Input gain for analog or Dante. IG t Q<CR> -> ACK IG t g<CR>."

- id: msa_get_input_source
  type: string
  description: "Active input source. GINPUT<CR> -> ACK GINPUT ANALOG|DANTE<CR>."

- id: msa_get_backup_strategy
  type: string
  description: "Backup strategy. GBKSTG<CR> -> ACK GBKSTG FORCE|SP 1<CR>."

- id: msa_get_standby_state
  type: integer
  description: "Standby state. GETSBST<CR> -> ACK GETSBST s<CR>. 0=Not standby, 1=In standby."

- id: msa_get_auto_standby_time
  type: integer
  description: "Auto-standby wait time. GETSBTIME<CR> -> ACK GETSBTIME w<CR>. Minutes (0-120)."

- id: msa_get_current_preset
  type: integer
  description: "Last recalled preset. GCP<CR> -> ACK GCP p<CR>. Index 0-9."

- id: msa_get_audio_level
  type: string
  description: "Current audio level and presence. AUDIOLEVEL<CR> -> ACK AUDIOLEVEL i l<CR>. i=presence(1)/clip(18)/limit(19), l=24-bit hex level."

- id: msa_get_module_status
  type: string
  description: "Module warning/fault status. STATUS t n<CR>. t=0(warning)/1(fault). Warning codes: 0/18/19/20. Fault codes: 0/1101/1104/1105."

- id: msa_get_firmware_version
  type: string
  description: "Firmware version for module. VERSION n<CR> -> ACK VERSION n x.x<CR>."

# === ENDPOINT QUERY RESPONSES ===

- id: endpoint_get_input_gain
  type: string
  description: "Input gain for channel. IG c Q<CR> -> ACK IG c g<CR>. EX-4ML/EX-8ML only."

- id: endpoint_get_phantom_power
  type: string
  description: "Phantom power state for channel. PP c Q<CR> -> ACK PP c s<CR>. EX-4ML/EX-8ML only."

- id: endpoint_get_signal_level
  type: string
  description: "Signal levels for all channels. RSL<CR> -> ACK RSL 1 2 ... 8<CR>. EX-4ML/EX-8ML only."

- id: endpoint_get_logic_output
  type: string
  description: "Logic output state. RLO p<CR> -> ACK RLO p s<CR>. EX-4ML/EX-8ML."

- id: endpoint_get_logic_input
  type: string
  description: "Logic input state. RLI p<CR> -> ACK RLI p s<CR>. EX-4ML/EX-8ML."

- id: endpoint_query_audio_settings
  type: string
  description: "Snapshot of all audio parameters. QUERY<CR> -> ACK QUERY settings<CR>."

- id: endpoint_get_firmware_version
  type: string
  description: "Firmware version. VERSION<CR> -> ACK VERSION x.x<CR>."

# === SUBSCRIPTION ===

- id: subscription_support
  type: string
  description: "Check subscription support. SUB<CR> -> SUB yes<CR> if supported."
```

## Variables
```yaml
# System-level settable parameters are represented as actions above.
# Module parameters are addressed dynamically by module name + indices.
# Key settable parameter categories accessible via SA/GA module commands:

- id: module_input_level
  type: number
  description: "Input module level (-60.5 to +12.0 dB, 0.5dB step). SA \"Input N\">3=value<CR>."

- id: module_input_mute
  type: string
  description: "Input mute state. O=On, F=Off, T=Toggle. SA \"Input N\">4=value<CR>."

- id: module_output_level
  type: number
  description: "Output module level (-60.5 to +12.0 dB, 0.5dB step). SA \"Output N\">1=value<CR>."

- id: module_output_mute
  type: string
  description: "Output mute state. O=On, F=Off, T=Toggle. SA \"Output N\">2=value<CR>."

- id: module_gain_level
  type: number
  description: "Gain module level (-60.5 to +12.0 dB, 0.5dB step). SA \"ModuleName\">1=value<CR>."

- id: module_gain_mute
  type: string
  description: "Gain module mute. O=On, F=Off, T=Toggle. SA \"ModuleName\">2=value<CR>."

- id: module_router_source
  type: integer
  description: "Router output routing. SA \"Router N\">output=input<CR>. Input 0=Off."

- id: module_peq_band_frequency
  type: number
  description: "Parametric EQ band frequency (20-20000 Hz). SA \"PEQ N\">band>1=value<CR>."

- id: module_peq_band_gain
  type: number
  description: "Parametric EQ band gain (-20.0 to +20.0 dB). SA \"PEQ N\">band>3=value<CR>."

- id: module_geq_band_gain
  type: number
  description: "Graphic EQ band gain (-15.0 to +15.0 dB, 0.1dB step). SA \"GEQ N\">band=value<CR>."

- id: module_delay_time
  type: integer
  description: "Delay time in samples (0-48000 for 1U ESP/EX, 0-144000 for ESP-00). SA \"Delay N\">tap>1=value<CR>."

- id: module_compressor_threshold
  type: number
  description: "Compressor threshold (0 to -40 dBFS, 0.5 step). SA \"CompLim N\">2=value<CR>."

- id: module_matrix_crosspoint_level
  type: number
  description: "Matrix Mixer cross-point level (-60.5 to 0.0 dB). SA \"Matrix N\">2>cp=value<CR>."
```

## Events
```yaml
# Unsolicited notifications the device sends

- id: subscription_update
  description: "Unsolicited parameter value update sent when a subscribed parameter changes. Format matches corresponding GET response."

- id: pm_fault_notification
  description: "PowerMatch unsolicited Fault Output state change. Format: GF f<CR>. Enabled via SF O<CR>."

- id: pm_alarm_notification
  description: "PowerMatch unsolicited alarm/fault event. Format: GR c,s,t,x<CR>. Enabled via SR O<CR>."

- id: module_auto_notification
  description: "Automatic module parameter change notification. Sent when module name prefixed with '#' in Designer and parameter changed by other devices. Not sent for serial-initiated changes."

- id: endpoint_logic_event
  description: "UDP event notification when logic input changes on EX-4ML/EX-8ML. Sent to address configured via SASIP. Enabled via EVNT command."

- id: esp_ready_after_reset
  description: "ESP sends 'Ready' string on RS-232 after boot completes following RESET command."
```

## Macros
```yaml
# No explicit multi-step macros defined in source.
# Common pattern: follow SET with GET to confirm command success.
# Example: SS b<CR> then GS<CR> to confirm Parameter Set recall.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Set Volume commands (SV, SI) ignored if channel is muted"
  - "IP/Network changes only take effect after RESET/reboot"
  - "PM/PS entering/exiting standby is not immediate; allow adequate time"
  - "ControlSpace Designer connection closes third-party control socket when going online"
  - "PM alarm reporting/fault notification preferences not retained on power-down"
  - "Alarm/fault conditions that persist after CF clear will auto-reset"
# UNRESOLVED: no explicit safety interlock sequences or power-on sequencing requirements stated in source
```

## Notes
- All commands use ASCII characters terminated with `<CR>` (0x0D).
- System and Device commands use hexadecimal notation for numerical values; Module commands use plain ASCII decimal.
- Module labels must be unique within a device; duplicate names cause SA/GA/MA to malfunction.
- For ESP processors, Module commands can target a different device using `SA @"Device Name" "Module Name"` syntax.
- For EX processors, inputs/outputs are composite modules; individual channels addressed by channel label (e.g. "Input 1"), not container.
- GPO module: pin state O=On, F=Off, T=Toggle. ESP-00 can have two GPIO cards as separate modules.
- Subscription (SUB/UNS) supports System GET commands (GS, GG, GN, GA list), Device GET commands (GV, GM), and Module GET commands (GA).
- ESP-00 references apply equally to ESP-00 II and legacy ESP-00/ESP-88 unless specified.
- ESP-880 references apply to ESP-880A and ESP-880AD unless specified.
- ESP-1240 references apply to ESP-1240A and ESP-1240AD unless specified.
- MSA12X 2-module arrays use module IDs 1 and 3 (not 1 and 2).
- Endpoint EVNT/SASIP mechanism is used when endpoints paired with EX processors; changes may cause unexpected side-effects.
- Delay module max: 3 seconds (ESP-00), 1 second (1U ESP/EX).
- Serial-over-Ethernet: device acts as Server; client must initiate connection.

<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: protocol version number not stated -->
<!-- UNRESOLVED: maximum command string length not stated -->
<!-- UNRESOLVED: command processing latency/retry behavior not stated -->

## Provenance

```yaml
source_domains:
  - assets.boseprofessional.com
  - applicationmarket.crestron.com
retrieved_at: 2026-04-30T13:19:25.957Z
last_checked_at: 2026-04-30T15:19:06.019Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T15:19:06.019Z
matched_actions: 63
action_count: 63
confidence: high
summary: "All 39 actions and 24 feedback entries matched source commands; all transport values verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
