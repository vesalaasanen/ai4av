---
spec_id: admin/bose-controlspace-serial-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bose ControlSpace Serial Control Protocol Spec"
manufacturer: Bose
model_family: "ControlSpace EX-1280C"
aliases: []
compatible_with:
  manufacturers:
    - Bose
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
    - "ControlSpace WP Endpoints"
    - "ControlSpace EP Endpoints"
    - "ControlSpace EX Dante Endpoints"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.boseprofessional.com
  - kms.boseprofessional.com
source_urls:
  - https://assets.boseprofessional.com/m/3f75dade2573b467/original/ControlSpace-Serial-Protocol-v5-14-1.pdf
  - https://kms.boseprofessional.com/en-us/article/KA-01417
  - https://kms.boseprofessional.com/en-us/article/KA-01277
retrieved_at: 2026-05-16T00:36:39.992Z
last_checked_at: 2026-05-20T07:53:51.999Z
generated_at: 2026-05-20T07:53:51.999Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T07:53:51.999Z
  matched_actions: 139
  action_count: 139
  confidence: high
  summary: "All 139 spec actions matched literally with corresponding wire-level command tokens; transport (ports 10055/49494, baud 38400/115200, TCP/Serial/UDP) verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# Bose ControlSpace Serial Control Protocol Spec

## Summary
Bose Professional ControlSpace serial control protocol for ESP, EX, PowerMatch, PowerShare processors/amplifiers, MSA12X loudspeakers, and WP/EP/EX Dante endpoints. Supports RS-232 serial (ESP/EX), TCP serial-over-Ethernet (port 10055), and UDP (port 49494 for MSA12X/endpoints). All commands are ASCII text terminated with CR (0x0D). Covers system commands, device commands, module parameter commands, MSA12X commands, endpoint commands, and subscription commands.

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - udp
addressing:
  port: 10055
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none
```

> **Note:** Baud rate is 38,400 for ESP-880/1240/4120/1600 and ESP-00; 115,200 for EX-1280C/440C/1280. Configurable via ControlSpace Designer. UDP port 49494 used for MSA12X loudspeakers and WP/EP/EX Dante endpoints. TCP port 10055 used for ESP, EX, PowerMatch, PowerShare. Device acts as server; client must initiate connection.

## Traits
```yaml
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
actions:
  - id: set_parameter_set
    label: Set Parameter Set
    kind: action
    description: "Recall Parameter Set n (1-255 decimal). Format: SS n<CR>"
    params:
      - name: n
        type: integer
        description: "Parameter Set number (1-255 decimal, entered as hex 1-FF)"

  - id: get_parameter_set
    label: Get Parameter Set
    kind: query
    description: "Query last invoked Parameter Set. Format: GS<CR>. Response: S n<CR>"

  - id: set_group_level
    label: Set Group Master Level
    kind: action
    description: "Set master level of Group n to level l. Format: SG n,l<CR>"
    params:
      - name: group
        type: integer
        description: "Group number (1-64 decimal, hex 1-40)"
      - name: level
        type: integer
        description: "Level 0h(-60dB) to 90h(+12dB) in 0.5dB steps, or FFh(-inf)"

  - id: get_group_level
    label: Get Group Master Level
    kind: query
    description: "Query level of Group n. Format: GG n<CR>"

  - id: set_group_increment
    label: Set Group Level Increment/Decrement
    kind: action
    description: "Increment or decrement Group n level by x 0.5dB steps. Format: SH n,d,x<CR>"
    params:
      - name: group
        type: integer
        description: "Group number (1-64 decimal)"
      - name: direction
        type: integer
        description: "1=up, 0=down"
      - name: steps
        type: integer
        description: "Number of 0.5dB steps in hex"

  - id: set_group_mute
    label: Set Group Master Mute
    kind: action
    description: "Set mute state for Group n. Format: SN n,m<CR>"
    params:
      - name: group
        type: integer
        description: "Group number (1-64 decimal)"
      - name: mute
        type: string
        description: "M=Mute, U=Unmute, T=Toggle"

  - id: get_group_mute
    label: Get Group Master Mute
    kind: query
    description: "Query mute state of Group n. Format: GN n<CR>"

  - id: set_room_combine
    label: Set Room Combine
    kind: action
    description: "Join or split rooms in a Room Combine Group. Format: SRC n,a,b,s<CR> or SRC \"N\",\"A\",\"B\",s<CR>"
    params:
      - name: group
        type: integer
        description: "Room Combine Group number (1-6)"
      - name: room_a
        type: integer
        description: "Room number (1-6)"
      - name: room_b
        type: integer
        description: "Room number (1-6)"
      - name: state
        type: string
        description: "J=Join, S=Split"

  - id: get_room_combine
    label: Get Room Combine
    kind: query
    description: "Query whether two rooms are joined. Format: GRC n,a,b<CR>"

  - id: set_parameter_set_list
    label: Set Parameter Set List Selection
    kind: action
    description: "Change current selection of a Parameter Set List. Format: SA \"A\">1=n<CR>"
    params:
      - name: name
        type: string
        description: "Parameter Set List name"
      - name: index
        type: integer
        description: "Index of Parameter Set to select"

  - id: get_parameter_set_list
    label: Get Parameter Set List Selection
    kind: query
    description: "Query current selection of a Parameter Set List. Format: GA \"A\">2<CR>"

  - id: set_volume
    label: Set Input/Output Volume
    kind: action
    description: "Set volume for slot s, channel c to level l. Format: SV s,c,l<CR>"
    params:
      - name: slot
        type: integer
        description: "Slot number (device-dependent)"
      - name: channel
        type: integer
        description: "Channel number (1-8 ESP, 1-4 PM/PS)"
      - name: level
        type: integer
        description: "Level in hex (0h=-60dB to 90h=+12dB in 0.5dB steps)"

  - id: get_volume
    label: Get Input/Output Volume
    kind: query
    description: "Query volume for slot s, channel c. Format: GV s,c<CR>"

  - id: set_volume_increment
    label: Set Volume Increment/Decrement
    kind: action
    description: "Increment/decrement volume for slot s, channel c. Format: SI s,c,d,x<CR>"
    params:
      - name: slot
        type: integer
      - name: channel
        type: integer
      - name: direction
        type: integer
        description: "1=up, 0=down"
      - name: steps
        type: integer
        description: "Number of 0.5dB steps (hex)"

  - id: set_mute
    label: Set Input/Output Mute
    kind: action
    description: "Set mute for slot s, channel c. Format: SM s,c,m<CR>"
    params:
      - name: slot
        type: integer
      - name: channel
        type: integer
      - name: mute
        type: string
        description: "M=Mute, U=Unmute, T=Toggle"

  - id: get_mute
    label: Get Input/Output Mute
    kind: query
    description: "Query mute for slot s, channel c. Format: GM s,c<CR>"

  - id: get_signal_level
    label: Get Signal Level
    kind: query
    description: "Query current signal levels for slot s. Format: GL s<CR> or GL s,p<CR>"

  - id: set_ip_address
    label: Set IP Address
    kind: action
    description: "Set device IP address. Takes effect after reboot. Format: IP xxx.xxx.xxx.xxx<CR>"
    params:
      - name: address
        type: string
        description: "IP address in dotted decimal"

  - id: get_ip_address
    label: Get IP Address
    kind: query
    description: "Query device IP address. Format: IP<CR>"

  - id: set_network_parameter
    label: Set Network Parameter
    kind: action
    description: "Set network parameter (type/subnet/gateway). Format: NP p,v<CR> or NP F<CR> to reset"
    params:
      - name: parameter
        type: string
        description: "T=Type, M=Subnet Mask, G=Default Gateway, F=Reset to defaults"
      - name: value
        type: string
        description: "D=DHCP, S=Static for Type; xxx.xxx.xxx.xxx for others"

  - id: get_network_parameter
    label: Get Network Parameter
    kind: query
    description: "Query network parameter. Format: NP p<CR>"

  - id: reset_device
    label: Reset/Reboot Device
    kind: action
    description: "Reboot the device (equivalent to power-cycle). Format: RESET<CR>"

  - id: set_standby
    label: Set Standby Status
    kind: action
    description: "Set standby state for PowerMatch/PowerShare. Format: SY s<CR>"
    params:
      - name: state
        type: string
        description: "S=Standby, N=Normal"

  - id: get_standby
    label: Get Standby Status
    kind: query
    description: "Query standby state. Format: GY<CR>"

  - id: get_configuration
    label: Get Configuration
    kind: query
    description: "Get output configuration of PowerMatch amplifier. Format: GC<CR>"

  - id: set_fault_notification
    label: Set Fault Notification
    kind: action
    description: "Enable/disable unsolicited fault output state changes for PowerMatch. Format: SF n<CR>"
    params:
      - name: state
        type: string
        description: "O=On, F=Off"

  - id: get_fault_status
    label: Get Fault Status
    kind: query
    description: "Query current fault status of PowerMatch. Format: GF<CR>"

  - id: clear_fault_alarms
    label: Clear Fault/Alarms
    kind: action
    description: "Clear active alarm conditions on PowerMatch. Format: CF<CR>"

  - id: set_alarm_reporting
    label: Set Alarm Reporting
    kind: action
    description: "Enable/disable unsolicited alarm/fault notifications for PowerMatch. Format: SR n<CR>"
    params:
      - name: state
        type: string
        description: "O=On, F=Off"

  - id: get_alarm_status
    label: Get Alarm Status
    kind: query
    description: "Query alarm/fault status for a channel of PowerMatch. Format: GR c<CR>"

  - id: get_alarm_history
    label: Get Alarm History
    kind: query
    description: "Request dump of internal alarm history for PowerMatch/PowerShare. Format: GH<CR>"

  - id: clear_alarm_history
    label: Clear Alarm History
    kind: action
    description: "Clear internal alarm log for PowerMatch/PowerShare. Format: CH<CR>"

  - id: set_module_parameter
    label: Set Module Parameter
    kind: action
    description: "Set a parameter for a named signal processing module. Format: SA \"Module Name\">Index1>Index2=Value<CR>"
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
        description: "Parameter value"

  - id: get_module_parameter
    label: Get Module Parameter
    kind: query
    description: "Query a parameter for a named module. Format: GA \"Module Name\">Index1>Index2<CR>"

  - id: invoke_module_action
    label: Invoke Module Action
    kind: action
    description: "Invoke an action for a module (e.g. PSTN/VoIP make call). Format: MA \"Module Name\">Index1=Parameter<CR>"
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
      - name: parameter
        type: string

  - id: msa12x_find_unit
    label: MSA12X Find Unit
    kind: action
    description: "Flash status LED for 5 seconds on MSA12X module. Format: FU n<CR>"
    params:
      - name: module
        type: integer
        description: "Module number (1, 2, or 3)"

  - id: msa12x_identify
    label: MSA12X Identify
    kind: action
    description: "Toggle identify LED on MSA12X module. Format: ID n s<CR>"
    params:
      - name: module
        type: integer
      - name: state
        type: integer
        description: "1=On, 0=Off"

  - id: msa12x_get_array_count
    label: MSA12X Get Array Module Count
    kind: query
    description: "Get number of modules in MSA12X array. Format: ARRAY<CR>"

  - id: msa12x_set_input_gain
    label: MSA12X Set Input Gain
    kind: action
    description: "Set input gain for MSA12X. Format: IG t g<CR>"
    params:
      - name: type
        type: string
        description: "A=Analog, D=Dante"
      - name: gain
        type: number
        description: "0.0, 14.0, or 24.0 dB"

  - id: msa12x_get_input_gain
    label: MSA12X Get Input Gain
    kind: query
    description: "Query input gain for MSA12X. Format: IG t Q<CR>"

  - id: msa12x_set_input_source
    label: MSA12X Set Input Source
    kind: action
    description: "Set input source for MSA12X. Format: INPUT 1 t<CR>"
    params:
      - name: source
        type: integer
        description: "0=Dante, 1=Analog"

  - id: msa12x_get_input_source
    label: MSA12X Get Input Source
    kind: query
    description: "Query active input source for MSA12X. Format: GINPUT<CR>"

  - id: msa12x_get_backup_strategy
    label: MSA12X Get Backup Strategy
    kind: query
    description: "Query backup strategy for MSA12X. Format: GBKSTG<CR>"

  - id: msa12x_set_standby
    label: MSA12X Set Standby
    kind: action
    description: "Enter/exit standby on MSA12X. Format: STANDBY a<CR>"
    params:
      - name: action
        type: string
        description: "NOW=enter standby, WAKE=exit standby"

  - id: msa12x_get_standby_state
    label: MSA12X Get Standby State
    kind: query
    description: "Query standby state for MSA12X. Format: GETSBST<CR>"

  - id: msa12x_set_auto_standby
    label: MSA12X Set Auto-Standby Time
    kind: action
    description: "Set auto-standby wait time for MSA12X. Format: STANDBY w<CR>"
    params:
      - name: minutes
        type: integer
        description: "Wait time in minutes (0-120, 0=disabled)"

  - id: msa12x_get_auto_standby
    label: MSA12X Get Auto-Standby Time
    kind: query
    description: "Query auto-standby wait time for MSA12X. Format: GETSBTIME<CR>"

  - id: msa12x_load_preset
    label: MSA12X Load Preset
    kind: action
    description: "Recall MSA12X preset. Format: LOAD p<CR>"
    params:
      - name: preset
        type: integer
        description: "Preset index 0-9 (preset number minus 1)"

  - id: msa12x_get_preset
    label: MSA12X Get Current Preset
    kind: query
    description: "Query last recalled MSA12X preset. Format: GCP<CR>"

  - id: msa12x_get_audio_level
    label: MSA12X Get Audio Level
    kind: query
    description: "Query current input signal level for MSA12X. Format: AUDIOLEVEL<CR>"

  - id: msa12x_get_status
    label: MSA12X Get Module Status
    kind: query
    description: "Query warning/fault status for MSA12X module. Format: STATUS t n<CR>"
    params:
      - name: type
        type: integer
        description: "0=warning, 1=fault"
      - name: module
        type: integer
        description: "Module number (1-3)"

  - id: msa12x_get_firmware
    label: MSA12X Get Firmware Version
    kind: query
    description: "Query firmware version for MSA12X module. Format: VERSION n<CR>"

  - id: ep_find_unit
    label: Endpoint Find Unit
    kind: action
    description: "Flash power LED for 5 seconds on endpoint. Format: FU<CR>"

  - id: ep_identify
    label: Endpoint Identify
    kind: action
    description: "Toggle identify LED on endpoint. Format: ID s<CR>"
    params:
      - name: state
        type: integer
        description: "1=On, 0=Off"

  - id: ep_set_input_gain
    label: Endpoint Set Input Gain
    kind: action
    description: "Set input gain for endpoint channel. Format: IG c g<CR>"
    params:
      - name: channel
        type: integer
      - name: gain
        type: number

  - id: ep_get_input_gain
    label: Endpoint Get Input Gain
    kind: query
    description: "Query input gain for endpoint channel. Format: IG c Q<CR>"

  - id: ep_set_input_source
    label: Endpoint Set Input Source
    kind: action
    description: "Set input source for WP22BU. Format: IS c s<CR>"
    params:
      - name: channel
        type: integer
      - name: source
        type: string
        description: "A, B, or A+B"

  - id: ep_set_phantom_power
    label: Endpoint Set Phantom Power
    kind: action
    description: "Set phantom power for endpoint channel. Format: PP c s<CR>"
    params:
      - name: channel
        type: integer
      - name: state
        type: integer
        description: "1=On, 0=Off"

  - id: ep_get_phantom_power
    label: Endpoint Get Phantom Power
    kind: query
    description: "Query phantom power for endpoint channel. Format: PP c Q<CR>"

  - id: ep_set_output_gain
    label: Endpoint Set Output Gain
    kind: action
    description: "Set output gain for EP22. Format: OG c g<CR>"
    params:
      - name: channel
        type: integer
      - name: gain
        type: number
        description: "0.0 or 10.0 dB"

  - id: ep_read_signal_level
    label: Endpoint Read Signal Level
    kind: query
    description: "Query signal levels for EX-4ML/EX-8ML. Format: RSL<CR>"

  - id: ep_write_logic_output
    label: Endpoint Write Logic Output
    kind: action
    description: "Set logic output state for EX-4ML/EX-8ML. Format: WLO p s<CR>"
    params:
      - name: pin
        type: integer
      - name: state
        type: integer
        description: "1=On, 0=Off"

  - id: ep_read_logic_output
    label: Endpoint Read Logic Output
    kind: query
    description: "Query logic output state for EX-4ML/EX-8ML. Format: RLO p<CR>"

  - id: ep_read_logic_input
    label: Endpoint Read Logic Input
    kind: query
    description: "Query logic input state for EX-4ML/EX-8ML. Format: RLI p<CR>"

  - id: ep_set_logic_event
    label: Endpoint Set Logic Event
    kind: action
    description: "Configure event notification for logic input change. Format: EVNT p e<CR>"
    params:
      - name: pin
        type: integer
      - name: event
        type: string
        description: "RISE, FALL, BOTH, or OFF"

  - id: ep_set_event_address
    label: Endpoint Set Event Notification Address
    kind: action
    description: "Set IP:port for event notifications. Format: SASIP a:p<CR>"
    params:
      - name: address
        type: string
        description: "IP:port format xxx.xxx.xxx.xxx:xxxxx"

  - id: ep_query_audio
    label: Endpoint Query Audio Settings
    kind: query
    description: "Get snapshot of all audio parameters. Format: QUERY<CR>"

  - id: ep_restore_defaults
    label: Endpoint Restore Factory Defaults
    kind: action
    description: "Reset endpoint to factory settings. Format: DEFAULTS<CR>"

  - id: ep_get_firmware
    label: Endpoint Get Firmware Version
    kind: query
    description: "Query endpoint firmware version. Format: VERSION<CR>"

  - id: subscribe
    label: Subscribe to Data Change
    kind: action
    description: "Register for unsolicited updates on value change. Format: SUB \"GET command\"<CR>"

  - id: unsubscribe
    label: Unsubscribe from Data Change
    kind: action
    description: "Stop unsolicited updates. Format: UNS \"GET command\"<CR>"

  - id: query_subscription_support
    label: Query Subscription Support
    kind: query
    description: "Check if device supports subscriptions. Format: SUB<CR>"
  - id: sa_cross_device
    label: Set Module Parameter on Remote Device
    kind: action
    params:
      - name: device_name
        type: string
        description: Unique device label from ControlSpace Designer
      - name: module_name
        type: string
        description: Unique module label
      - name: index_1
        type: integer
      - name: value
        type: string

  - id: ga_cross_device
    label: Get Module Parameter on Remote Device
    kind: query
    params:
      - name: device_name
        type: string
      - name: module_name
        type: string
      - name: index_1
        type: integer
      - name: index_2
        type: integer
        description: Secondary index (optional)

  - id: sa_input_module
    label: Set Input Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: "1=Type, 2=Gain, 3=Level, 4=Mute, 5=Phantom"
      - name: value
        type: string

  - id: ga_input_module
    label: Get Input Module Parameter
    kind: query
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer

  - id: sa_output_module
    label: Set Output Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: "1=Level, 2=Mute, 3=Polarity"
      - name: value
        type: string

  - id: ga_output_module
    label: Get Output Module Parameter
    kind: query
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer

  - id: sa_esplink_module
    label: Set ESPLink Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
        description: ESPLink channel name e.g. ESPLink 1-Ch 1
      - name: index_1
        type: integer
        description: "1=Level, 2=Mute, 3=Polarity"
      - name: value
        type: string

  - id: sa_amplink_module
    label: Set AmpLink Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
        description: AmpLink channel name e.g. AmpLink-Ch 1
      - name: index_1
        type: integer
        description: "1=Level, 2=Mute, 3=Polarity"
      - name: value
        type: string

  - id: sa_dante_module
    label: Set Dante I/O Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
        description: Dante channel name
      - name: index_1
        type: integer
        description: "1=Level, 2=Mute, 3=Polarity"
      - name: value
        type: string

  - id: sa_surround_input
    label: Set Surround Input Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: "1=InputSource, 4-11=channel levels"
      - name: value
        type: string

  - id: sa_pstn_input
    label: Set PSTN Input Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: "0=CallSettings, 1=AudioInput"
      - name: index_2
        type: integer
      - name: value
        type: string

  - id: ga_pstn_input
    label: Get PSTN Input Module Parameter
    kind: query
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
      - name: index_2
        type: integer

  - id: ma_pstn_dial_key
    label: PSTN Dial Key
    kind: action
    params:
      - name: module_name
        type: string
      - name: key
        type: string
        description: "0-9, #, *, ! (hook flash)"

  - id: ma_pstn_make_call
    label: PSTN Make Call
    kind: action
    params:
      - name: module_name
        type: string
      - name: number
        type: string

  - id: ma_pstn_end_call
    label: PSTN End Call
    kind: action
    params:
      - name: module_name
        type: string

  - id: ma_pstn_answer_call
    label: PSTN Answer Call
    kind: action
    params:
      - name: module_name
        type: string

  - id: sa_voip_input
    label: Set VoIP Input Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: "0=CallSettings, 1=AudioInput"
      - name: index_2
        type: integer
      - name: value
        type: string

  - id: ma_voip_make_call
    label: VoIP Make Call
    kind: action
    params:
      - name: module_name
        type: string
      - name: number
        type: string
        description: Phone number or SIP URI

  - id: ma_voip_end_call
    label: VoIP End Call
    kind: action
    params:
      - name: module_name
        type: string

  - id: ma_voip_answer_call
    label: VoIP Answer Call
    kind: action
    params:
      - name: module_name
        type: string

  - id: ma_voip_transfer_call
    label: VoIP Transfer Call
    kind: action
    params:
      - name: module_name
        type: string
      - name: number
        type: string

  - id: sa_usb_io
    label: Set USB I/O Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: Channel 1 or 2
      - name: index_2
        type: integer
        description: "1=Level, 2=Mute"
      - name: value
        type: string

  - id: sa_aec_module
    label: Set AEC Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: Input channel 1-12
      - name: index_2
        type: integer
      - name: value
        type: string

  - id: sa_agc_module
    label: Set AGC Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: 0=Output/Module, 1-32=Input
      - name: index_2
        type: integer
      - name: value
        type: string

  - id: sa_amm_module
    label: Set AMM Gain Sharing Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: 0=Output, 1-32=Input
      - name: index_2
        type: integer
      - name: value
        type: string

  - id: sa_compressor_limiter
    label: Set Compressor/Limiter Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: "1=DetectInput, 2=Threshold, 3=Ratio, 4=Attack, 5=Release, 6=Bypass"
      - name: value
        type: string

  - id: sa_conference_room_router
    label: Set Conference Room Router Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: "1=Room/Output, 2=Program/FarEnd, 3-6=Matrix"
      - name: index_2
        type: string
      - name: value
        type: string

  - id: sa_crossover_module
    label: Set Crossover Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: Section number
      - name: index_2
        type: integer
      - name: value
        type: string

  - id: sa_delay_module
    label: Set Delay Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: Delay tap 1-8
      - name: index_2
        type: integer
        description: "1=DelayTime, 2=Bypass"
      - name: value
        type: string

  - id: sa_ducker_module
    label: Set Ducker Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: "2=Threshold, 3=Range, 4=Attack, 5=Hold, 6=Decay, 7=Bypass, 8=Engage"
      - name: value
        type: string

  - id: sa_gain_module
    label: Set Gain Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: "1=Level, 2=Mute"
      - name: value
        type: string

  - id: sa_gate_module
    label: Set Gate Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: "1=Detector, 2=Threshold, 3=Range, 4=Attack, 5=Hold, 6=Decay, 7=Bypass"
      - name: value
        type: string

  - id: sa_gpo_module
    label: Set GPO Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: Output pin 1-8
      - name: value
        type: string
        description: "O=On, F=Off, T=Toggle"

  - id: sa_geq_module
    label: Set 1/3 Octave Graphic EQ Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: "1-31=bands, 32=BypassAll"
      - name: value
        type: string

  - id: sa_matrix_mixer
    label: Set Matrix Mixer Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: "1=CrosspointOnOff, 2=CrosspointLevel, 3=InputMute, 4=OutputMute"
      - name: index_2
        type: integer
      - name: value
        type: string

  - id: sa_peq_module
    label: Set Parametric EQ Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: EQ band 1-16
      - name: index_2
        type: integer
        description: "1=Frequency, 2=Q, 3=Gain, 4=Slope, 5=Type, 6=Bypass"
      - name: value
        type: string

  - id: sa_peak_rms_limiter
    label: Set Peak/RMS Limiter Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
      - name: value
        type: string

  - id: sa_router_module
    label: Set Router Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: Output number
      - name: value
        type: integer
        description: Input number (0=Off)

  - id: sa_signal_generator
    label: Set Signal Generator Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: "1=Sine, 2=White, 3=Pink, 4=Sweep"
      - name: index_2
        type: integer
      - name: value
        type: string

  - id: sa_source_selector
    label: Set Source Selector Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: value
        type: integer
        description: Input number 1-16

  - id: sa_standard_mixer
    label: Set Standard Mixer Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: "1=Input, 2=Output, 3=CrosspointA, 4=CrosspointB"
      - name: index_2
        type: string
      - name: value
        type: string

  - id: sa_tone_control_eq
    label: Set Tone Control EQ Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: "1=LowGain, 2=LowBypass, 3=MidGain, 4=MidBypass, 5=HighGain, 6=HighBypass"
      - name: value
        type: string

  - id: sa_pm_input_module
    label: Set PowerMatch Input Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: "1=AnalogSensitivity, 2=Mute, 3=Source"
      - name: value
        type: string

  - id: sa_pm_amp_output
    label: Set PowerMatch Amp Output Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: "1=Level, 2=Mute, 3=Polarity"
      - name: value
        type: string

  - id: sa_pm_limiter
    label: Set PowerMatch Limiter Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_2
        type: integer
        description: "1=PeakThresh, 2=RMSThresh, 3=Attack, 4=Release, 5=LinkGroup"
      - name: value
        type: string

  - id: sa_logic_input_module
    label: Set Logic Input Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: Input pin 1-16
      - name: value
        type: string
        description: "O=On, F=Off, T=Toggle, P=Pulse"

  - id: sa_logic_output_module
    label: Set Logic Output Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
      - name: index_1
        type: integer
        description: Output pin 1-16
      - name: value
        type: string
        description: "O=On, F=Off, T=Toggle, P=Pulse"
```

## Feedbacks
```yaml
feedbacks:
  - id: parameter_set_state
    type: integer
    description: "Last invoked Parameter Set number (0-255, 0=none recalled)"

  - id: group_level
    type: integer
    description: "Group master level in hex (0-144 decimal, 0.5dB steps)"

  - id: group_mute_state
    type: enum
    values: [M, U]
    description: "M=Muted, U=Unmuted"

  - id: channel_volume
    type: integer
    description: "Channel volume level in hex"

  - id: channel_mute_state
    type: enum
    values: [M, U]
    description: "M=Muted, U=Unmuted"

  - id: signal_level
    type: array
    description: "Array of channel signal levels in hex"

  - id: standby_state
    type: enum
    values: [S, N]
    description: "S=Standby, N=Normal"

  - id: fault_status
    type: enum
    values: [F, C]
    description: "F=Fault, C=No Fault (PowerMatch only)"

  - id: alarm_status
    type: string
    description: "Alarm info: channel, severity (W/F/S/N), type (N/O/S/A/D/I/L/C/P/Z), condition (S/C)"

  - id: output_configuration
    type: string
    description: "PowerMatch output config per channel: IN/BL/B7/B1/PA/QL/Q7/Q1"

  - id: ip_address
    type: string
    description: "Current IP address in dotted decimal"

  - id: network_mode
    type: enum
    values: [D, S]
    description: "D=DHCP, S=Static"

  - id: msa12x_audio_level
    type: string
    description: "Signal indication (1=Presence, 18=Clip, 19=Limit) and hex level"

  - id: msa12x_module_status
    type: string
    description: "Warning code (0/18/19/20) or fault code (0/1101/1104/1105)"

  - id: ep_signal_levels
    type: array
    description: "Per-channel signal levels, values: -99, -40, -9, -3 dB"
```

## Variables
```yaml
variables: []
```

## Events
```yaml
events:
  - id: alarm_notification
    description: "Unsolicited alarm/fault event from PowerMatch when enabled via SR O. Format: GR c,s,t,x<CR>"
  - id: fault_notification
    description: "Unsolicited fault output state change from PowerMatch when enabled via SF O. Format: GF f<CR>"
  - id: subscription_update
    description: "Unsolicited value update when subscribed via SUB command. Sends current value when change occurs."
  - id: module_auto_notification
    description: "Automatic GA response when a module prefixed with '#' has parameters changed by other devices"
  - id: ep_logic_event
    description: "UDP event notification from EX-4ML/EX-8ML when logic input changes (configured via EVNT command)"
```

## Macros
```yaml
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
- All system and device commands use **hexadecimal** ASCII for numerical values; module commands use plain decimal ASCII.
- Commands are uppercase; responses are lowercase for hex values.
- No acknowledgement is sent for system/device commands. Confirm success by issuing a Get after a Set.
- Module commands return ACK (0x06) on success or NAK nn (0x15) on failure with 2-digit error code (01=invalid module, 02=illegal index, 03=out of range, 99=unknown).
- MSA12X and endpoint commands return text "ACK" or "NACK" (not ASCII control characters).
- Multiple module commands can be sent on one line separated by semicolons (0x3B).
- Module name must be unique; duplicate names cause SA/GA/MA commands to malfunction.
- Set Volume commands are ignored if the channel is muted.
- IP and network parameter changes require device reboot (RESET command) to take effect.
- Maximum simultaneous TCP connections: 32 for most devices, 8 for ESP-00/PS404D/PS604D.
- MSA12X modules in a 2-module array are numbered 1 and 3 (not 1 and 2).
- ESP-880 references also apply to ESP-880A and ESP-880AD unless otherwise specified.
- ESP-1240 references also apply to ESP-1240A and ESP-1240AD unless otherwise specified.
- ESP-00 references also apply to ESP-00 II and legacy ESP-00/ESP-88 unless otherwise specified.

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: exact serial pinout details only partially described -->
<!-- UNRESOLVED: maximum command string length not stated -->
<!-- UNRESOLVED: command processing latency / timing constraints not stated -->
<!-- UNRESOLVED: concurrent RS-232 and TCP command interaction edge cases not fully documented -->
<!-- UNRESOLVED: CobraNet I/O modules not directly controllable via serial (must use Parameter Sets) -->

## Provenance

```yaml
source_domains:
  - assets.boseprofessional.com
  - kms.boseprofessional.com
source_urls:
  - https://assets.boseprofessional.com/m/3f75dade2573b467/original/ControlSpace-Serial-Protocol-v5-14-1.pdf
  - https://kms.boseprofessional.com/en-us/article/KA-01417
  - https://kms.boseprofessional.com/en-us/article/KA-01277
retrieved_at: 2026-05-16T00:36:39.992Z
last_checked_at: 2026-05-20T07:53:51.999Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T07:53:51.999Z
matched_actions: 139
action_count: 139
confidence: high
summary: "All 139 spec actions matched literally with corresponding wire-level command tokens; transport (ports 10055/49494, baud 38400/115200, TCP/Serial/UDP) verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
