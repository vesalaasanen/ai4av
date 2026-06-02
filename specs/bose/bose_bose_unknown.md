---
spec_id: admin/bose-controlspace-protocol
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bose Professional ControlSpace / PowerMatch / PowerShare / MSA12X / Endpoint Control Spec"
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
    - WP22B
    - WP22BU
    - EP22
    - EP40
    - EX-4ML
    - EX-8ML
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
last_checked_at: 2026-06-02T17:21:46.728Z
generated_at: 2026-06-02T17:21:46.728Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source."
  - "number of unique opcodes and their full variant space is large; see Actions."
  - "voltage / current / power draw values are not stated in source."
  - "no explicit macro definitions in source."
  - "no explicit safety warnings, interlocks, or power-on sequencing requirements"
  - "number of distinct named opcodes covered is large; the spec includes all System, Device, MSA12X, Endpoint, and Subscription commands explicitly listed in the source. Module commands (SA/GA/MA) are parameterized over user-defined module labels and the per-module Index 1/Index 2 tables."
  - "PowerMatch/PowerShare command support for some Module sub-commands varies by hardware revision; the spec lists which modules each device class supports."
  - "PK/RMS Limiter and Compressor/Limiter \"Detect Input\" for mono modules: source notes that 'R' and 'M' are unused on mono."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:46.728Z
  matched_actions: 76
  action_count: 76
  confidence: medium
  summary: "All 76 spec actions matched verbatim in source; all transport values confirmed; source command catalogue is fully represented 1:1. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Bose Professional ControlSpace / PowerMatch / PowerShare / MSA12X / Endpoint Control Spec

## Summary
Third-party ASCII serial control protocol for Bose Professional ControlSpace EX/ESP signal processors, PowerMatch and PowerShare amplifiers, MSA12X steered-array loudspeakers, and Dante endpoint audio interfaces. Commands are sent as ASCII text terminated with `<CR>` (0x0D) over RS-232 (ESP/EX), serial-over-IP (TCP, port 10055), or UDP (port 49494) for MSA12X and endpoints.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: number of unique opcodes and their full variant space is large; see Actions. -->
<!-- UNRESOLVED: voltage / current / power draw values are not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
serial:
  baud_rate: 38400  # default for ESP-880/1240/4120/1600 and ESP-00; 115200 for EX-1280C/440C/1280
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # CTS/RTS optional on ESP per source
addressing:
  # SoIP / TCP: default port 10055 (configurable on 1U ESP and EX only)
  # SoIP / UDP: port 49494 (MSA12X and endpoints, fixed)
  port: 10055
  base_url: null
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: SY/GY standby commands present (PM/PS); MSA12X STANDBY/GETSBST
- routable        # inferred: Router, Source Selector, Matrix Mixer, Conference Room Router, Standard Mixer modules
- queryable       # inferred: GS, GG, GN, GV, GM, GL, IP, NP, GY, GF, GC, GR, GH, GA, AUDIOLEVEL, STATUS, VERSION etc.
- levelable       # inferred: SV/SI/SG/SA level parameters and gain modules
```

## Actions
```yaml
# All commands and responses are ASCII terminated with <CR> (0x0D).
# Module commands reference user-defined labels (set in ControlSpace Designer).
# System and Device commands use hexadecimal for numerical values; Module commands use plain ASCII.

# ---------- 4. System Commands ----------

- id: ss_recall_parameter_set
  label: Recall Parameter Set
  kind: action
  command: "SS {n}"
  params:
    - name: n
      type: integer
      description: Parameter Set number, 1-FF (hex, 1-255 decimal)
- id: gs_query_last_parameter_set
  label: Query Last Recalled Parameter Set
  kind: query
  command: "GS"
  params: []

- id: sg_set_group_level_or_source
  label: Set Group Master Level or Source Selector Channel
  kind: action
  command: "SG {n},{l}"
  params:
    - name: n
      type: integer
      description: Group number, 1-40h (1-64 decimal)
    - name: l
      type: string
      description: 'Level: 0h(-60dB)..90h(+12dB) in 0.5dB steps for ESP; 0h..78h(0dB) for PM/PS. Or source channel 1-20h (1-32).'
- id: gg_query_group_level_or_source
  label: Query Group Master Level or Source Selector Channel
  kind: query
  command: "GG {n}"
  params:
    - name: n
      type: integer
      description: Group number, 1-40h (1-64 decimal)

- id: sh_increment_decrement_group_level
  label: Increment/Decrement Group Master Level
  kind: action
  command: "SH {n},{d},{x}"
  params:
    - name: n
      type: integer
      description: Group number, 1-40h (1-64 decimal)
    - name: d
      type: integer
      description: Direction, 1=up or 0=down
    - name: x
      type: string
      description: Number of 0.5dB steps in hex (e.g. 5dB = A)

- id: sn_set_group_mute
  label: Set Group Master Mute
  kind: action
  command: "SN {n},{m}"
  params:
    - name: n
      type: integer
      description: Group number, 1-40h (1-64 decimal)
    - name: m
      type: string
      description: 'State, M=Mute, U=Un-mute, T=Toggle'
- id: gn_query_group_mute
  label: Query Group Master Mute
  kind: query
  command: "GN {n}"
  params:
    - name: n
      type: integer
      description: Group number, 1-40h (1-64 decimal)

- id: src_set_room_combine
  label: Set Room Combine (Join/Split) [EX only]
  kind: action
  command: "SRC {n},{a},{b},{s}"
  params:
    - name: n
      type: integer
      description: Room Combine Group number, 1-6 (or name)
    - name: a
      type: string
      description: Room number (1-6) or name
    - name: b
      type: string
      description: Room number (1-6) or name
    - name: s
      type: string
      description: 'State, J=Join or S=Split'
- id: grc_query_room_combine
  label: Query Room Combine [EX only]
  kind: query
  command: "GRC {n},{a},{b}"
  params:
    - name: n
      type: string
      description: Room Combine Group number (1-6) or name
    - name: a
      type: string
      description: Optional room number (1-6) or name
    - name: b
      type: string
      description: Optional room number (1-6) or name

- id: ga_query_parameter_set_list
  label: Query Parameter Set List Selection
  kind: query
  command: 'GA "{list}">{idx}'
  params:
    - name: list
      type: string
      description: Parameter Set List name
    - name: idx
      type: integer
      description: 1 or 2 (selects the slot in the list)
- id: sa_set_parameter_set_list
  label: Set Parameter Set List Selection
  kind: action
  command: 'SA "{list}">{idx}={n}'
  params:
    - name: list
      type: string
      description: Parameter Set List name
    - name: idx
      type: integer
      description: 1 or 2
    - name: n
      type: integer
      description: Index of the Parameter Set in the list to select

# ---------- 5. Device Commands ----------

- id: sv_set_volume
  label: Set Input/Output Volume
  kind: action
  command: "SV {s},{c},{l}"
  params:
    - name: s
      type: integer
      description: Slot number (see Table 1 in source for slot map per device)
    - name: c
      type: integer
      description: Channel number 1-8 (ESP) or 1-4 (PM/PS)
    - name: l
      type: string
      description: 'Level 0h(-60dB)..90h(+12dB) in 0.5dB steps; 0h..78h(0dB) for PM/PS'
- id: gv_query_volume
  label: Query Input/Output Volume
  kind: query
  command: "GV {s},{c}"
  params:
    - name: s
      type: integer
      description: Slot number
    - name: c
      type: integer
      description: Channel number

- id: si_increment_decrement_volume
  label: Increment/Decrement Input/Output Volume
  kind: action
  command: "SI {s},{c},{d},{x}"
  params:
    - name: s
      type: integer
      description: Slot number
    - name: c
      type: integer
      description: Channel number
    - name: d
      type: integer
      description: Direction, 1=up or 0=down
    - name: x
      type: string
      description: Number of 0.5dB steps in hex

- id: sm_set_mute
  label: Set Input/Output Mute
  kind: action
  command: "SM {s},{c},{m}"
  params:
    - name: s
      type: integer
      description: Slot number
    - name: c
      type: integer
      description: Channel number
    - name: m
      type: string
      description: 'M=Mute, U=Un-mute, T=Toggle'
- id: gm_query_mute
  label: Query Input/Output Mute
  kind: query
  command: "GM {s},{c}"
  params:
    - name: s
      type: integer
      description: Slot number
    - name: c
      type: integer
      description: Channel number

- id: gl_get_signal_level
  label: Get Signal Level
  kind: query
  command: "GL {s}[,{p}]"
  params:
    - name: s
      type: integer
      description: Slot index (see GL Indices table in source)
    - name: p
      type: integer
      description: Optional parameter index (e.g. 1=Input, 2=ERL, 3=ERLE for AEC)

- id: ip_get_ip_address
  label: Query IP Address
  kind: query
  command: "IP"
  params: []
- id: ip_set_ip_address
  label: Set IP Address (effective after reboot)
  kind: action
  command: "IP {address}"
  params:
    - name: address
      type: string
      description: IPv4 address in dotted form, e.g. 192.168.1.160

- id: np_query_network_parameter
  label: Query Network Parameter
  kind: query
  command: "NP {p}"
  params:
    - name: p
      type: string
      description: 'T=Type, M=Subnet Mask, G=Default Gateway'
- id: np_set_network_parameter
  label: Set Network Parameter (effective after reboot)
  kind: action
  command: "NP {p},{v}"
  params:
    - name: p
      type: string
      description: 'T=Type, M=Subnet Mask, G=Default Gateway'
    - name: v
      type: string
      description: 'D=DHCP or S=Static for Type; xxx.xxx.xxx.xxx for M/G'
- id: np_reset_network_defaults
  label: Reset All Network Parameters to Defaults
  kind: action
  command: "NP F"
  params: []

- id: reset_device
  label: Reset/Reboot Device
  kind: action
  command: "RESET"
  params: []

- id: sy_set_standby
  label: Set Standby State [PowerMatch/PowerShare only]
  kind: action
  command: "SY {s}"
  params:
    - name: s
      type: string
      description: 'S=Standby, N=Normal'
- id: gy_query_standby
  label: Query Standby State [PowerMatch/PowerShare only]
  kind: query
  command: "GY"
  params: []

- id: gc_get_configuration
  label: Get Output Configuration [PowerMatch only]
  kind: query
  command: "GC"
  params: []

- id: sf_set_fault_notification
  label: Set Fault Output Notification [PowerMatch only]
  kind: action
  command: "SF {n}"
  params:
    - name: n
      type: string
      description: 'O=On, F=Off'
- id: gf_query_fault_status
  label: Query Fault Status [PowerMatch only]
  kind: query
  command: "GF"
  params: []

- id: cf_clear_faults
  label: Clear Faults/Alarms [PowerMatch only]
  kind: action
  command: "CF"
  params: []

- id: sr_set_alarm_reporting
  label: Set Alarm Reporting [PowerMatch only]
  kind: action
  command: "SR {n}"
  params:
    - name: n
      type: string
      description: 'O=On, F=Off'
- id: gr_query_alarm_status
  label: Query Alarm Status for Channel [PowerMatch only]
  kind: query
  command: "GR {c}"
  params:
    - name: c
      type: integer
      description: Channel number 1-8 (1-4 for PM4500N/PM4250N)

- id: gh_get_alarm_history
  label: Get Alarm History/Log [PowerMatch/PowerShare only]
  kind: query
  command: "GH"
  params: []
- id: ch_clear_alarm_history
  label: Clear Alarm History/Log [PowerMatch/PowerShare only]
  kind: action
  command: "CH"
  params: []

# ---------- 6. Module Commands ----------
# Module labels are user-defined (ControlSpace Designer); SA = Set, GA = Get, MA = Action.
# Index 1 / Index 2 are documented per module-type in source. The two index values plus the
# value form the full command; the param block below enumerates which sub-parameters
# the source defines for each module type.

- id: sa_set_module_parameter
  label: Set Module Parameter
  kind: action
  command: 'SA "{"{module}"}">{idx1}[>{idx2}]={value}'
  params:
    - name: module
      type: string
      description: |
        Unique module label (e.g. "Input 1", "Output L", "AEC", "AMM 1", "PEQ-5band A").
        Module types covered in source: Input, Output, ESPLink, AmpLink, Dante I/O,
        Surround Input, PSTN Input, PSTN Output, VoIP Input, VoIP Output, USB Input,
        USB Output, AEC, AGC (Enhanced/Legacy), Array EQ, AMM Gain Sharing, AMM Gated
        (Legacy/Enhanced), Compressor/Limiter, Conference Room Router, Crossover, Delay,
        Ducker, Gain, Gate, GPO, 1/3 Octave Graphic EQ, Logic Input, Logic Output,
        Logic Processing (Toggle/FF, Pulse, Debounce gates), Matrix Mixer, Parametric EQ,
        Peak/RMS Limiter, Router, Signal Generator, Source Selector, Speaker Parametric EQ,
        Standard Mixer, Tone Control EQ, SmartBass, Dynamic EQ, Standard Room Combiner,
        Predictive Feedback Suppression, PM/PS Input, PM Signal Generator, PM/PS Input PEQ,
        PM Array EQ, PM/PS Matrix Mixer, PM/PS Band Pass, PM/PS Speaker PEQ, PM/PS Limiter,
        PM/PS Delay, PM/PS Amp Output.
    - name: idx1
      type: integer
      description: Primary index; module-specific (see source Tables 6.1.x / 6.2.x).
    - name: idx2
      type: integer
      description: Optional secondary index for modules that nest parameters.
    - name: value
      type: string
      description: 'Format depends on parameter; e.g. dB as signed decimal, state as O/F/T, etc.'
- id: ga_get_module_parameter
  label: Get Module Parameter
  kind: query
  command: 'GA "{"{module}"}">{idx1}[>{idx2}]'
  params:
    - name: module
      type: string
      description: Unique module label (same set as sa_set_module_parameter).
    - name: idx1
      type: integer
      description: Primary index; module-specific.
    - name: idx2
      type: integer
      description: Optional secondary index.
- id: sa_set_module_parameter_remote_device
  label: Set Module Parameter on a Different Device (ESP network)
  kind: action
  command: 'SA @ "{device}" "{module}">{idx1}[>{idx2}]={value}'
  params:
    - name: device
      type: string
      description: Unique device label (ControlSpace Designer)
    - name: module
      type: string
      description: Unique module label on that device
    - name: idx1
      type: integer
      description: Primary index
    - name: idx2
      type: integer
      description: Optional secondary index
    - name: value
      type: string
      description: Parameter value
- id: ga_get_module_parameter_remote_device
  label: Get Module Parameter on a Different Device (ESP network)
  kind: query
  command: 'GA @ "{device}" "{module}">{idx1}[>{idx2}]'
  params:
    - name: device
      type: string
      description: Unique device label
    - name: module
      type: string
      description: Unique module label on that device
    - name: idx1
      type: integer
      description: Primary index
    - name: idx2
      type: integer
      description: Optional secondary index
- id: ma_invoke_module_action
  label: Invoke Module Action (e.g. PSTN/VoIP dial/end)
  kind: action
  command: 'MA "{module}">{idx1}[={param}]'
  params:
    - name: module
      type: string
      description: Module with actions (PSTN In, VoIP In, etc.)
    - name: idx1
      type: integer
      description: Action index (1=Dial Key, 2=Make Call, 3=End Call, 4=Answer Call, 5=TransferCall for VoIP)
    - name: param
      type: string
      description: Optional argument (e.g. phone number, dial key)

# ---------- 7. MSA12X Commands (UDP 49494, ACK + echo responses) ----------

- id: msa12x_fu_find_unit
  label: MSA12X Find Unit (5s LED flash)
  kind: action
  command: "FU {n}"
  params:
    - name: n
      type: integer
      description: Module within the array, 1, 2, or 3 (2-module array uses 1 & 3)
- id: msa12x_id_identify
  label: MSA12X Identify (persistent LED)
  kind: action
  command: "ID {n} {s}"
  params:
    - name: n
      type: integer
      description: Module within the array, 1, 2, or 3
    - name: s
      type: integer
      description: '1=On, 0=Off'

- id: msa12x_array_query
  label: MSA12X Query Array Module Count
  kind: query
  command: "ARRAY"
  params: []

- id: msa12x_ig_set_input_gain
  label: MSA12X Set Input Gain
  kind: action
  command: "IG {t} {g}"
  params:
    - name: t
      type: string
      description: 'Input type, A=Analog or D=Dante'
    - name: g
      type: string
      description: 'Gain, 0.0, 14.0, or 24.0'
- id: msa12x_ig_query_input_gain
  label: MSA12X Query Input Gain
  kind: query
  command: "IG {t} Q"
  params:
    - name: t
      type: string
      description: 'Input type, A=Analog or D=Dante'

- id: msa12x_input_set_source
  label: MSA12X Set Input Source
  kind: action
  command: "INPUT 1 {t}"
  params:
    - name: t
      type: integer
      description: '0=Dante, 1=Analog'
- id: msa12x_ginput_query_source
  label: MSA12X Query Input Source
  kind: query
  command: "GINPUT"
  params: []

- id: msa12x_gbkstg_query_backup
  label: MSA12X Query Backup Strategy
  kind: query
  command: "GBKSTG"
  params: []

- id: msa12x_standby_set
  label: MSA12X Set Standby State
  kind: action
  command: "STANDBY {a}"
  params:
    - name: a
      type: string
      description: 'NOW=enter Standby immediately, WAKE=exit Standby immediately'
- id: msa12x_getsbst_query_standby
  label: MSA12X Query Standby State
  kind: query
  command: "GETSBST"
  params: []
- id: msa12x_standby_set_wait
  label: MSA12X Set Auto-Standby Wait Time
  kind: action
  command: "STANDBY {w}"
  params:
    - name: w
      type: integer
      description: Wait time in minutes, 0-120 (0 disables Auto-Standby)
- id: msa12x_getsbtime_query_wait
  label: MSA12X Query Auto-Standby Wait Time
  kind: query
  command: "GETSBTIME"
  params: []

- id: msa12x_load_preset
  label: MSA12X Load Preset
  kind: action
  command: "LOAD {p}"
  params:
    - name: p
      type: integer
      description: Preset index 0-9 (preset number-1)
- id: msa12x_gcp_query_last_preset
  label: MSA12X Query Last Recalled Preset
  kind: query
  command: "GCP"
  params: []

- id: msa12x_audiolevel_query
  label: MSA12X Query Audio Level
  kind: query
  command: "AUDIOLEVEL"
  params: []

- id: msa12x_status_warning
  label: MSA12X Query Warning Status for Module
  kind: query
  command: "STATUS 0 {n}"
  params:
    - name: n
      type: integer
      description: Module within the array, 1, 2, or 3
- id: msa12x_status_fault
  label: MSA12X Query Fault Status for Module
  kind: query
  command: "STATUS 1 {n}"
  params:
    - name: n
      type: integer
      description: Module within the array, 1, 2, or 3

- id: msa12x_version_query
  label: MSA12X Query Module Firmware Version
  kind: query
  command: "VERSION {n}"
  params:
    - name: n
      type: integer
      description: Module within the array, 1, 2, or 3

# ---------- 8. Endpoint Commands (UDP 49494, ACK + echo responses) ----------

- id: ep_fu_find_unit
  label: Endpoint Find Unit (5s LED flash)
  kind: action
  command: "FU"
  params: []
- id: ep_id_identify
  label: Endpoint Identify (persistent LED)
  kind: action
  command: "ID {s}"
  params:
    - name: s
      type: integer
      description: '1=On, 0=Off'

- id: ep_ig_set_input_gain
  label: Endpoint Set Input Gain
  kind: action
  command: "IG {c} {g}"
  params:
    - name: c
      type: integer
      description: Channel number
    - name: g
      type: string
      description: 'Gain - EX-4ML/EX-8ML/EP40: 0.0/15.0/30.0/45.0; EP22/WP22B/WP22BU: 0.0/25.0/40.0'
- id: ep_ig_query_input_gain
  label: Endpoint Query Input Gain [EX-4ML/EX-8ML only]
  kind: query
  command: "IG {c} Q"
  params:
    - name: c
      type: integer
      description: Channel number (0 to query all channels)

- id: ep_is_set_input_source
  label: Endpoint Set Input Source [WP22BU only]
  kind: action
  command: "IS {c} {s}"
  params:
    - name: c
      type: integer
      description: Channel 2 (WP22BU only)
    - name: s
      type: string
      description: 'A, B, or A+B'

- id: ep_pp_set_phantom_power
  label: Endpoint Set Phantom Power
  kind: action
  command: "PP {c} {s}"
  params:
    - name: c
      type: integer
      description: Channel number 1-8
    - name: s
      type: integer
      description: '1=On, 0=Off'
- id: ep_pp_query_phantom_power
  label: Endpoint Query Phantom Power [EX-4ML/EX-8ML only]
  kind: query
  command: "PP {c} Q"
  params:
    - name: c
      type: integer
      description: Channel number (0 to query all channels)

- id: ep_og_set_output_gain
  label: Endpoint Set Output Gain [EP22 only]
  kind: action
  command: "OG {c} {g}"
  params:
    - name: c
      type: integer
      description: Channel number
    - name: g
      type: string
      description: 'Gain, 0.0 or 10.0'

- id: ep_rsl_read_signal_level
  label: Endpoint Read Signal Level [EX-4ML/EX-8ML only]
  kind: query
  command: "RSL"
  params: []

- id: ep_wlo_write_logic_output
  label: Endpoint Write Logic Output [EX-4ML/EX-8ML only]
  kind: action
  command: "WLO {p} {s}"
  params:
    - name: p
      type: integer
      description: 'Logic output 1-16 (EX-8ML) or 1-8 (EX-4ML)'
    - name: s
      type: integer
      description: '1=On, 0=Off'
- id: ep_rlo_read_logic_output
  label: Endpoint Read Logic Output [EX-4ML/EX-8ML only]
  kind: query
  command: "RLO {p}"
  params:
    - name: p
      type: integer
      description: 'Logic output; 0 to query all outputs'

- id: ep_rli_read_logic_input
  label: Endpoint Read Logic Input [EX-4ML/EX-8ML only]
  kind: query
  command: "RLI {p}"
  params:
    - name: p
      type: integer
      description: 'Logic input; 0 to query all inputs'

- id: ep_evnt_set_logic_event
  label: Endpoint Set Logic Event [EX-4ML/EX-8ML only]
  kind: action
  command: "EVNT {p} {e}"
  params:
    - name: p
      type: integer
      description: 'Logic input 1-8 (EX-8ML) or 1-4 (EX-4ML)'
    - name: e
      type: string
      description: 'RISE, FALL, BOTH, or OFF'

- id: ep_sasip_set_notification_address
  label: Endpoint Set Event Notification IP Address [EX-4ML/EX-8ML only]
  kind: action
  command: "SASIP {a}:{p}"
  params:
    - name: a
      type: string
      description: IPv4 address in dotted form
    - name: p
      type: integer
      description: UDP port number

- id: ep_query_audio_settings
  label: Endpoint Query All Audio Settings
  kind: query
  command: "QUERY"
  params: []

- id: ep_defaults_restore
  label: Endpoint Restore Factory Defaults
  kind: action
  command: "DEFAULTS"
  params: []

- id: ep_version_query
  label: Endpoint Query Firmware Version
  kind: query
  command: "VERSION"
  params: []

# ---------- 9. Subscription Commands ----------

- id: sub_query_device_support
  label: Query Device Subscription Support
  kind: query
  command: "SUB"
  params: []
- id: sub_subscribe
  label: Subscribe to Data Change
  kind: action
  command: 'SUB "{get_command}"'
  params:
    - name: get_command
      type: string
      description: |
        Text of an existing GET command. Eligible commands per source:
        System: GS, GG n, GN n,m, GA "list">1 or 2.
        Device: GV s,c, GM s,c.
        Module: GA "Module">Idx1>Idx2.
- id: uns_unsubscribe
  label: Unsubscribe from Data Change
  kind: action
  command: 'UNS "{get_command}"'
  params:
    - name: get_command
      type: string
      description: Text of a previously subscribed GET command.
```

## Feedbacks
```yaml
# All feedback uses ASCII <CR>-terminated lines. Examples are taken verbatim from the source.
- id: parameter_set_query_response
  type: string
  description: 'S n<CR> response to GS, where n = 0..FF (0 if no Parameter Set recalled, e.g. after power-up)'
- id: group_level_query_response
  type: string
  description: 'GG n,l<CR> - n=group, l=level (hex 0h..90h) or channel (1..20h)'
- id: group_mute_query_response
  type: string
  description: 'GN n,m<CR> - n=group, m=M/U'
- id: room_combine_query_response
  type: string
  description: 'GRC n,a,b,s<CR> - s=J/S, or GRC n,[a,b][c,d,f]<CR> for full state'
- id: input_output_volume_response
  type: string
  description: 'GV s,c,l<CR>'
- id: input_output_mute_response
  type: string
  description: 'GM s,c,m<CR> - m=M/U'
- id: signal_level_response
  type: array
  description: 'GL s [l1,…,lN]<CR> - N hex values, scaling per device type (see 5.4 in source)'
- id: ip_address_response
  type: string
  description: 'IP xxx.xxx.xxx.xxx<CR>'
- id: network_parameter_response
  type: string
  description: 'NP p,v<CR> - p=T/M/G, v=D/S for T or dotted address for M/G'
- id: standby_response
  type: string
  description: 'GY s<CR> - s=S/N'
- id: configuration_response
  type: array
  description: 'GC c1,c2,…,c8<CR> - IN/BL/B7/B1/PA/QL/Q7/Q1 per channel (1-4 for PM4500N/PM4250N)'
- id: fault_status_response
  type: string
  description: 'GF f<CR> - f=F=in fault, C=No fault'
- id: alarm_status_response
  type: string
  description: 'GR c,s,t<CR> or unsolicited GR c,s,t,x<CR> - c=channel, s=severity W/F/S, t=type O/S/A/D/I/L/C/P/Z/N, x=S/C'
- id: alarm_history_dump
  type: array
  description: 'GH [Time, Date, Description<CR>…Time, Date, Description]<CR>'
- id: module_parameter_response
  type: string
  description: 'GA "Module">Idx1>Idx2=Value<CR>; or <ACK> / <NAK> nn on Set'
- id: module_nak_error_codes
  type: map
  description: |
    01 Invalid Module Name, 02 Illegal Index, 03 Value out-of-range, 99 Unknown.
    Module commands respond with <ACK> (0x06) on success, <NAK> nn (0x15) on failure.
- id: msa12x_ack_envelope
  type: string
  description: |
    MSA12X/Endpoint responses are text "ACK" plus echo of received command (NOT raw 0x06).
    Example: ACK STANDBY NOW<CR>
- id: msa12x_audiolevel_response
  type: string
  description: 'ACK AUDIOLEVEL i l<CR> - i=signal indication (1/18/19), l=32-bit hex level; dB = 20*log10(level/16777215)'
- id: msa12x_status_warning
  type: string
  description: 'ACK STATUS 0 n w<CR> - w=0/18/19/20 (NoWarning/Clip/Limit/HighTemp)'
- id: msa12x_status_fault
  type: string
  description: 'ACK STATUS 1 n f<CR> - f=0/1101/1104/1105 (None/Driver/Temp/Amp)'
- id: endpoint_audio_settings_snapshot
  type: string
  description: 'ACK QUERY IG1=… IG2=… PP1=… PP2=… ID=…<CR> (model-dependent; per channel)'
- id: subscription_response
  type: string
  description: |
    SUB<CR> → SUB yes<CR> if device supports subscription.
    SUB "GET cmd"<CR> → SUB "GET cmd",yes<CR> on success; otherwise error form.
    Subsequent unsolicited updates echo the GET response as values change.
```

## Variables
```yaml
# Settable numeric/string parameters are addressed through Module commands (SA/GA/MA) or
# the appropriate System/Device command. There is no separate "variable" namespace.
# Concrete ranges per module are documented in source Tables 6.1.x and 6.2.x.
- id: input_gain_dbu_pm_ps
  type: number
  unit: dBu
  range: [0, 4, 12, 24]
  description: 'PowerMatch Input Analog Sensitivity (module-level via SA, discrete 0/4/12/24 dBu)'
- id: delay_samples_esp_00
  type: integer
  unit: samples
  range: [0, 144000]
  description: 'ESP-00 Delay module max 3 s (144000 samples @ 48 kHz)'
- id: delay_samples_1u_esp_ex
  type: integer
  unit: samples
  range: [0, 48000]
  description: '1U ESP/EX Delay module max 1 s (48000 samples @ 48 kHz)'
- id: msa12x_input_gain_db
  type: number
  unit: dB
  range: [0.0, 14.0, 24.0]
  description: 'MSA12X pre-amp gain (Analog or Dante)'
- id: endpoint_input_gain_db
  type: number
  unit: dB
  range_model_specific: true
  description: |
    EX-4ML/EX-8ML/EP40: 0.0/15.0/30.0/45.0
    EP22/WP22B/WP22BU: 0.0/25.0/40.0
- id: pstn_country_code
  type: integer
  range: [0, 196]
  description: 'PSTN Country Code (see Appendix A of source for full 0-196 list)'
```

## Events
```yaml
# Subscription (Section 9): once subscribed, device sends unsolicited updates as values change.
# Format mirrors the corresponding GET response.
- id: subscription_update
  description: |
    Unsolicited echo of the subscribed GET response. Examples from source:
    GG 1,5b<CR>    (group volume changed)
    GV 1,1,75<CR>  (input/output volume changed)
    GA "Gain 1">2=O<CR> (module mute changed)
# PowerMatch unsolicited alarm/fault (Section 5.10, 5.12):
- id: power_match_fault_event
  description: 'GF f<CR> - f=F/C; sent when SF has been set O and Fault Output changes'
- id: power_match_alarm_event
  description: 'GR c,s,t,x<CR> - c=channel (0 for non-channel specific), s=severity, t=type, x=S/C'
# Endpoint logic-input event notifications (Section 8.10): UDP datagram to SASIP target.
- id: endpoint_logic_event
  description: |
    Sent as UDP to the IP:port configured by SASIP when EVNT is RISE/FALL/BOTH and
    the corresponding logic input changes.
```

## Macros
```yaml
# Source does not define multi-step sequences. All control is per-command; clients compose sequences.
# UNRESOLVED: no explicit macro definitions in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing requirements
# present in the control-protocol document. Source is a pure command reference; safety
# considerations (e.g. electrical, acoustic) are out of scope for this document.
```

## Notes
- All commands/responses are ASCII terminated with `<CR>` (0x0D). Module commands additionally use `;` (0x3B) to separate multiple commands on a single line.
- Default RS-232 settings differ by family: ESP-880/1240/4120/1600 and ESP-00 use 38400 baud; EX-1280C/440C/1280 use 115200 baud. Data 8, Parity None, Stop 1 in all cases. Configurable via ControlSpace Designer.
- Serial-over-IP default port 10055 (configurable on 1U ESP and EX; fixed on ESP-00, PM, PS). MSA12X and endpoints use UDP 49494 only.
- Network setting changes (IP, NP) only take effect after the device reboots (or `RESET`).
- Going on-line with ControlSpace Designer closes any open third-party control SoIP connection; the client must reconnect.
- For Slot/Channel numbering in SV/GV/SM/GM, see source Table 1 (per-device slot map) and Table 2 (PM/PS). Channel number is relative to the slot, and for mixed I/O slots output channels immediately follow input channels (e.g. Dante 1–16 = Ch 1–16, Dante Out 1–16 = Ch 17–32).
- Module labels must be unique within a device. Duplicate names break SA/GA/MA for all conflicting modules.
- The `#` prefix on a module label in ControlSpace Designer enables automatic notification when module parameters change via other devices.
- MSA12X in a 2-module array uses module IDs 1 and 3 (not 1 and 2).
- MSA12X `AUDIOLEVEL` dBFS conversion: `dB = 20 * log10(level / 16777215)`, ignoring the 2 MSBs of the 32-bit level.
- Endpoint default notification port for SASIP: source example uses 41494 (not stated as canonical default — only one example given).

<!-- UNRESOLVED: number of distinct named opcodes covered is large; the spec includes all System, Device, MSA12X, Endpoint, and Subscription commands explicitly listed in the source. Module commands (SA/GA/MA) are parameterized over user-defined module labels and the per-module Index 1/Index 2 tables. -->
<!-- UNRESOLVED: PowerMatch/PowerShare command support for some Module sub-commands varies by hardware revision; the spec lists which modules each device class supports. -->
<!-- UNRESOLVED: PK/RMS Limiter and Compressor/Limiter "Detect Input" for mono modules: source notes that 'R' and 'M' are unused on mono. -->

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
last_checked_at: 2026-06-02T17:21:46.728Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:46.728Z
matched_actions: 76
action_count: 76
confidence: medium
summary: "All 76 spec actions matched verbatim in source; all transport values confirmed; source command catalogue is fully represented 1:1. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source."
- "number of unique opcodes and their full variant space is large; see Actions."
- "voltage / current / power draw values are not stated in source."
- "no explicit macro definitions in source."
- "no explicit safety warnings, interlocks, or power-on sequencing requirements"
- "number of distinct named opcodes covered is large; the spec includes all System, Device, MSA12X, Endpoint, and Subscription commands explicitly listed in the source. Module commands (SA/GA/MA) are parameterized over user-defined module labels and the per-module Index 1/Index 2 tables."
- "PowerMatch/PowerShare command support for some Module sub-commands varies by hardware revision; the spec lists which modules each device class supports."
- "PK/RMS Limiter and Compressor/Limiter \"Detect Input\" for mono modules: source notes that 'R' and 'M' are unused on mono."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
