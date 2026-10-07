---
spec_id: admin/clearone-converge-sr1212
schema_version: ai4av-public-spec-v1
revision: 1
title: "ClearOne CONVERGE SR 1212 Control Spec"
manufacturer: ClearOne
model_family: "CONVERGE SR 1212"
aliases: []
compatible_with:
  manufacturers:
    - ClearOne
  models:
    - "CONVERGE SR 1212"
    - "CONVERGE SR 1212A"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - kb.clearone.com
  - manualslib.com
  - pdf.textfiles.com
source_urls:
  - https://kb.clearone.com
  - https://www.manualslib.com/manual/791436/Clearone-Converge-Pro-880.html
  - https://www.manualslib.com/manual/1403893/Clearone-Converge-Pro-880.html
  - "http://pdf.textfiles.com/manuals/STARINMANUALS/ClearOne/Manuals/ConvergePro%208i,%20840T,%20880,%20TH20%20-%20RS232%20-%20v1.0.pdf"
retrieved_at: 2026-04-29T16:18:55.068Z
last_checked_at: 2026-10-07T13:44:40.690Z
generated_at: 2026-10-07T13:44:40.690Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "GAIN, RAMP, PRESET, MTRXCLEAR, MTRXLVL, MTRXTYPE, DELAY, AGC, and many other commands are listed in the index but their full syntax/argument tables were not present in the extracted source"
  - "GAIN, RAMP, PRESET, MTRXCLEAR, MTRXLVL, MTRXTYPE, DELAY,"
  - "full response formats for most commands not documented in source"
  - "GAIN command syntax not fully documented in source"
  - "RAMP command syntax not fully documented in source"
  - "MTRXLVL command syntax not fully documented in source"
  - "MACRO command syntax not fully documented in source"
  - "SFTYMUTE command details not documented in source."
  - "no explicit safety warnings, interlock procedures, or"
  - "GAIN, RAMP, PRESET, MTRXCLEAR, MTRXLVL command syntax not fully documented in source"
  - "Groups and Channels reference table not fully extracted — channel numbering scheme incomplete"
  - "Device Type and Device ID ranges table empty in source"
  - "AGCSET, HDAEC, HDAECMODE, MACRO, SFTYMUTE, DEFAULT, DELAY and many other indexed commands lack full syntax docs"
  - "firmware version compatibility not stated in source"
  - "exact command response format (acknowledgement strings) not documented in source"
  - "command termination/delimiter characters not stated in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:44:40.690Z
  matched_actions: 195
  action_count: 195
  confidence: medium
  summary: "All 195 action units match source command tokens with agreeing shapes; transport supported; index essentially fully represented. (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-13
---

# ClearOne CONVERGE SR 1212 Control Spec

## Summary
The ClearOne CONVERGE SR 1212 is a 12x12 audio matrix mixer supporting serial (RS-232) and Telnet (TCP) control. This spec covers the serial command protocol used to control matrix routing, muting, gain, presets, filtering, diagnostics, and GPIO. The command set is shared across the CONVERGE/CONVERGE Pro family; AEC and noise-cancellation commands are not applicable to the SR 1212.

<!-- UNRESOLVED: GAIN, RAMP, PRESET, MTRXCLEAR, MTRXLVL, MTRXTYPE, DELAY, AGC, and many other commands are listed in the index but their full syntax/argument tables were not present in the extracted source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: hardware
  connector: DB-9 female
  notes: >-
    Supported baud rates: 9600, 19200, 38400, 57600, 115200 (default 57600).
    Hardware flow control via DTR/DSR (default On). ClearOne recommends
    connecting all 9 pins to avoid communication errors.
addressing:
  port: 23
auth:
  type: credential
  notes: >-
    Default username: clearone, default password: converge.
    Usernames and passwords are not case sensitive.
```

## Traits
```yaml
- routable    # MTRX command routes inputs to outputs in the matrix
- queryable   # Most commands accept Null to query current value
- levelable   # GAIN, RAMP, MINMAX commands control audio levels
- muteable    # MUTE command on multiple channel groups
```

## Actions
```yaml
# Command syntax: DEVICE <COMMAND> [arguments]
# DEVICE = #<DeviceType><DeviceID> e.g. #01
# Use * for DeviceType or DeviceID to address all units/devices

- id: mute
  label: Mute Channel
  kind: action
  command: "DEVICE MUTE <Channel><Group> [Value]"
  params:
    - name: channel
      type: integer
      description: Channel number (see Groups and Channels)
    - name: group
      type: integer
      description: "Group ID: 1(I), 2(J), 3(O), 5(M), 7(P), 12(L), 16(F), 17(T), 25(R), 26(K/Z/D/U/V)"
    - name: value
      type: enum
      values: [off, on, toggle]
      description: "0=Off, 1=On, 2=Toggle. Null to query."
  notes: Mute applies to multiple channel groups

- id: mtrx_route
  label: Matrix Route
  kind: action
  command: "DEVICE MTRX <SrcCh><SrcGp><DestCh><DestGp> [Value]"
  params:
    - name: source_channel
      type: integer
      description: Source channel
    - name: source_group
      type: integer
      description: "Source group: 1, 3, 5, 6, 7, 12, 17, 25, 26"
    - name: dest_channel
      type: integer
      description: Destination channel
    - name: dest_group
      type: integer
      description: Destination group
    - name: value
      type: float
      description: Routing level (Null to query)
  notes: Routes an input to an output in the audio matrix

- id: filter_adjust
  label: Filter Adjust
  kind: action
  command: "DEVICE FILTER <Channel><Group><Node> [Type Frequency Gain/Slope Bandwidth/Subtype]"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: group
      type: integer
      description: "Group: 3(M), 5(P), 23(J), 29(V)"
    - name: node
      type: integer
      description: Filter node number
    - name: type
      type: integer
      description: Filter type
    - name: frequency
      type: float
      description: Center frequency
    - name: gain_slope
      type: float
      description: Gain or slope value
    - name: bandwidth_subtype
      type: float
      description: Bandwidth or subtype

- id: flow_control
  label: Flow Control
  kind: action
  command: "DEVICE FLOW [Value]"
  params:
    - name: value
      type: enum
      values: [off, on, toggle]
      description: "0=Off, 1=On, 2=Toggle. Null to query."

- id: gating_mode
  label: Gating Mode
  kind: action
  command: "DEVICE GMODE <Channel> [Value]"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: group
      type: integer
      description: "Group: 3 (M)"
    - name: value
      type: enum
      values: [auto, manual_on, manual_off]
      description: "1=Auto, 2=Manual On, 3=Manual Off. Null to query."

- id: gating_group_select
  label: Gating Group Select
  kind: action
  command: "DEVICE GRPSEL <Channel> [Value]"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: group
      type: integer
      description: "Group: 3 (M)"

- id: minmax_gain
  label: Min/Max Gain Setting
  kind: action
  command: "DEVICE MINMAX <Channel><Group> [Min Max]"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: group
      type: integer
      description: "Group: 1(I), 2(J), 3(O), 5(M), 7(P), 12(L), 16(F), 17(T), 25(R), 26"
    - name: min
      type: float
      description: Minimum gain
    - name: max
      type: float
      description: Maximum gain

- id: multi_channel_mode
  label: Multi-Channel Mode
  kind: action
  command: "DEVICE MC <Channel><Group> [Value]"
  params:
    - name: channel
      type: integer
      description: "1 to n (max channels in MC group / 2)"
    - name: group
      type: integer
      description: "128 (no text group)"

- id: multi_channel_mute
  label: Multi-Channel Mute
  kind: action
  command: "DEVICE MCMUTE <Channel><Group> [Value]"
  params:
    - name: channel
      type: integer
      description: Channel in multi-channel group

- id: delay_select
  label: Delay Select
  kind: action
  command: "DEVICE DELAYSEL <Channel> [Value]"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: group
      type: integer
      description: "Group: 5 (P)"
    - name: value
      type: enum
      values: [off, on, toggle]
      description: "0=Off, 1=On, 2=Toggle. Null to query."

- id: compressor_delay
  label: Compressor Delay
  kind: action
  command: "DEVICE COMPDLY <Channel><Group> [Value]"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: group
      type: integer
      description: "Group: 23 (J)"
    - name: value
      type: integer
      description: "0-20 msec"

- id: compressor_group
  label: Compressor Group Select
  kind: action
  command: "DEVICE CGROUP <Channel> [Value]"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: group
      type: integer
      description: "Group: 5 (P)"
    - name: value
      type: integer
      description: "0=none, 1+"

- id: push_to_talk
  label: Push to Talk
  kind: action
  command: "DEVICE PUSHTOTALK <Channel> [Value]"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: group
      type: integer
      description: "Group: 3 (M)"
    - name: value
      type: enum
      values: [off, on, toggle]
      description: "0=Off, 1=On, 2=Toggle. Null to query."

- id: last_mic_on
  label: Last Mic On Mode
  kind: action
  command: "DEVICE LMO <Channel> [Value]"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: group
      type: integer
      description: "Group: 4 (G)"
    - name: value
      type: integer
      description: "0=Off, 1-8=Mic 1-8, 0xFF(*)=Last Mic stays on"

- id: nom
  label: Number of Open Microphones
  kind: action
  command: "DEVICE NOM <Channel><Group> [Value]"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: group
      type: integer
      description: "Group: 2(J), 16(O), 25(T), 26(K/D)"

- id: level_report_enable
  label: Level Report Enable
  kind: action
  command: "DEVICE LVLREPORTEN [Value]"
  params:
    - name: value
      type: enum
      values: [off, on, off_clear]
      description: "0=Off (keep list), 1=On, 2=Off and clear list. Null to query."

- id: pa_adaptive
  label: PA Adaptive Mode
  kind: action
  command: "DEVICE PAA <Channel> [Value]"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: group
      type: integer
      description: "Group: 3 (M)"
    - name: value
      type: enum
      values: [off, on, toggle]
      description: "0=Off, 1=On, 2=Toggle. Null to query."

- id: pa_limiter_threshold
  label: PA Limiter Threshold
  kind: action
  command: "DEVICE PALT <Channel><Group> [Value]"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: group
      type: integer
      description: "Group: 23 (J)"
    - name: value
      type: float
      description: "-65.00 to +20.00"

- id: pa_sound_mask_mode
  label: PA Sound Mask Mode
  kind: action
  command: "DEVICE PASMM <Channel><Group> [Value]"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: group
      type: integer
      description: "Group: 23 (J)"
    - name: value
      type: enum
      values: [voice_mode, wideband_mode]
      description: "0=Voice Mode, 1=Wideband Mode. Null to query."

- id: pa_eq_filter_set
  label: PA EQ Filter Set
  kind: action
  command: "DEVICE PAEQEN <Channel><Group><Band> [Value]"
  params:
    - name: channel
      type: integer
      description: Channel number
    - name: group
      type: integer
      description: "Group: 23 (J)"
    - name: band
      type: integer
      description: EQ band number

- id: program_string
  label: Program String
  kind: action
  command: "DEVICE PRGSTRING <ID> [Value]"
  params:
    - name: id
      type: integer
      description: "0-7 (8 programmable strings)"
    - name: value
      type: string
      description: "CLEAR to clear, or 1-80 chars. Null to query."
  notes: Command strings for controlling external devices via RS-232

- id: reset
  label: Reset Unit
  kind: action
  command: "DEVICE RESET"
  params: []
  notes: Resets the unit. No query available.

- id: country
  label: Country Selection
  kind: action
  command: "DEVICE COUNTRY [Value]"
  params:
    - name: value
      type: enum
      values: [us_canada, europe, mexico, australia, south_africa, japan, brazil]
      description: "1=US/Canada, 2=Europe, 3=Mexico, 4=Australia, 5=South Africa, 6=Japan, 7=Brazil"

- id: ethernet_ip
  label: Ethernet IP Address
  kind: action
  command: "DEVICE ENETADDR [Value]"
  params:
    - name: value
      type: string
      description: IP address. Null to query.

- id: serial_echo
  label: Serial Echo
  kind: action
  command: "DEVICE SERECHO [Value]"
  params: []
  notes: Enables/disables echo on the serial port

- id: auto_answer
  label: Auto Answer
  kind: action
  command: "DEVICE AA <Channel> [Value]"
  params:
    - name: channel
      type: integer
      description: Channel number

- id: timeout_select
  label: Timeout Select
  kind: action
  command: "DEVICE TOUT [Value]"
  params:
    - name: value
      type: integer
      description: "0=No timeout, 1+"

- id: device_name
  label: Device Name
  kind: action
  command: "DEVICE DEVICENAME [Value]"
  params:
    - name: value
      type: string
      description: Device name string

- id: expansion_bus_reference
  label: Expansion Bus Reference
  kind: action
  command: "DEVICE EREF <Channel> [Value Channel Value Group]"
  params:
    - name: channel
      type: integer
      description: Reference channel
    - name: group
      type: integer
      description: "Group: 8 (A, E)"

- id: system_checks
  label: System Checks
  kind: action
  command: "DEVICE SYSCHECKS <System Check>"
  params:
    - name: system_check
      type: integer
      description: Hexadecimal bitmask for which tests to run

- id: audible_connect_disconnect_level
  label: Audible Connect Disconnect Level
  kind: action
  command: "DEVICE ACONNLVL <Channel> [Value]"
  params:
    - name: channel
      type: integer
      description: "Groups and Channels"
    - name: group
      type: integer
      description: "17 (R)"
    - name: value
      type: float
      description: "-12.00 –"

- id: agc_adjust
  label: AGC Adjust
  kind: action
  command: "DEVICE AGCSET <Channel><Group> [Threshold Target Attack Gain]"
  params:
    - name: channel
      type: integer
      description: "Groups and Channels"
    - name: group
      type: integer
      description: "1, 3, 7 (I, M, L)"
    - name: threshold
      type: integer
      description: "-50 –"
    - name: target
      type: UNRESOLVED
      description: UNRESOLVED
    - name: attack
      type: UNRESOLVED
      description: UNRESOLVED
    - name: gain
      type: UNRESOLVED
      description: UNRESOLVED

- id: adaptive_volume_gain
  label: Adaptive Volume Gain
  kind: action
  command: "DEVICE AVG <Channel><Group> [Value]"
  params:
    - name: channel
      type: integer
      description: "See GroupsAndChannels"
    - name: group
      type: integer
      description: "23 (J)"
    - name: value
      type: integer
      description: "0.00 to +18.00"

- id: cobranet_address
  label: CobraNet Address
  kind: action
  command: "DEVICE CNETADDR [Value]"
  params:
    - name: value
      type: string
      description: IP Address

- id: cobranet_transmit_bit_depth
  label: CobraNet Transmit Bit Depth
  kind: action
  command: "DEVICE CNETTXDEPTH <Transmitter> [Depth]"
  params:
    - name: transmitter
      type: integer
      description: "1 – 4"
    - name: depth
      type: integer
      description: "16, 20, or 24 ONLY (Default = 24)"

- id: dante_application_version
  label: Dante Application Version
  kind: action
  command: "DEVICE DANTEAPPVER [Value]"
  params: []
  notes: Query only

- id: dante_input_channel_name
  label: Dante Input Channel Name
  kind: action
  command: "DEVICE DANTEINCHAN <Channel><Name>"
  params:
    - name: channel
      type: integer
      description: "1-8 Only"
    - name: name
      type: UNRESOLVED
      description: "1 –"
  notes: Query only

- id: dante_board_name
  label: Dante Board Name
  kind: action
  command: "DEVICE DANTENAME [Value]"
  params:
    - name: value
      type: string
      description: "1 – 31 Characters, Last character always NULL"
  notes: Query only

- id: diagnostic_commands
  label: Diagnostic Commands
  kind: action
  command: "DEVICE DIAG <Channel><Group> [Value]"
  params:
    - name: channel
      type: UNRESOLVED
      description: UNRESOLVED
    - name: group
      type: UNRESOLVED
      description: UNRESOLVED
    - name: value
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Query only

- id: ethernet_dns_server_address_2
  label: Ethernet DNS Server Address 2
  kind: action
  command: "DEVICE ENETDNSA2 [Value]"
  params:
    - name: value
      type: string
      description: IP Address

- id: feedback_elimination_nodes
  label: Feedback Elimination Nodes
  kind: action
  command: "DEVICE FEN <Channel><Group> [Value]"
  params:
    - name: channel
      type: UNRESOLVED
      description: UNRESOLVED
    - name: group
      type: UNRESOLVED
      description: UNRESOLVED
    - name: value
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Query only

- id: nonlinear_processing_adjust
  label: Nonlinear Processing Adjust
  kind: action
  command: "DEVICE HDNLP <Channel><Group> [Value]"
  params: []

- id: location_region
  label: Location Region
  kind: action
  command: "DEVICE LOCREGION [Value]"
  params:
    - name: value
      type: string
      description: "CLEAR = Clear current value, 1 – 63 Characters"

- id: device_log_mask
  label: Device Log Mask
  kind: action
  command: "DEVICE LOGMASK [Value]"
  params:
    - name: value
      type: string
      description: "Hexadecimal 4: XXXX XXXX XXXX XXXX XXXX XXXX XXXX XXXX |||| |||| |||| |||| |||| |||| |||| ||||> Reset |||| |||| |||| |||| |||| |||| |||| ||||>"

- id: phonebook_count
  label: Phonebook Count
  kind: action
  command: "DEVICE PHONEBOOKCNT <Value>"
  params:
    - name: value
      type: integer
      description: "0 – 20"
  notes: Query only

- id: pa_noise_gate_threshold
  label: PA Noise Gate Threshold
  kind: action
  command: "DEVICE PANGT <Channel><Group> [Value]"
  params: []

- id: ring_cadence_mode
  label: Ring Cadence Mode
  kind: action
  command: "DEVICE RINGMOD <Channel> [Value]"
  params:
    - name: channel
      type: UNRESOLVED
      description: UNRESOLVED
    - name: value
      type: UNRESOLVED
      description: UNRESOLVED

- id: receive_boost_enable
  label: Receive Boost Enable
  kind: action
  command: "DEVICE RXBSTEN <Channel> [Value]"
  params:
    - name: channel
      type: integer
      description: Groups and Channels
    - name: group
      type: integer
      description: "17 (R)"
    - name: value
      type: integer
      description: "0 = Off, 1 = On, 2 = Toggle"

- id: snmp_manager_host_ip
  label: SNMP Manager Host IP
  kind: action
  command: "DEVICE SNMPMNGRIP [Value]"
  params:
    - name: value
      type: string
      description: IP Address of SNMP Manager to send Traps to

- id: telco_adapt_mode
  label: Telco Adapt Mode
  kind: action
  command: "DEVICE TAMODE <Channel> [Value]"
  params:
    - name: channel
      type: integer
      description: Groups and Channels
    - name: group
      type: integer
      description: "17 (R)"
    - name: value
      type: integer
      description: "0 = Auto, 1 = Burst"

- id: auto_answer_rings
  label: Auto Answer Rings
  kind: action
  command: "DEVICE XAARINGS <Channel><Group> [Value]"
  params:
    - name: channel
      type: UNRESOLVED
      description: UNRESOLVED
    - name: group
      type: UNRESOLVED
      description: UNRESOLVED
    - name: value
      type: UNRESOLVED
      description: UNRESOLVED

- id: chairman_override_mode
  label: Chairman Override Mode
  kind: action
  command: "DEVICE XCHAIRO <Channel><Group> [Value]"
  params:
    - name: channel
      type: UNRESOLVED
      description: UNRESOLVED
    - name: group
      type: UNRESOLVED
      description: UNRESOLVED
    - name: value
      type: UNRESOLVED
      description: UNRESOLVED

- id: decay_adjust
  label: Decay Adjust
  kind: action
  command: "DEVICE XDECAY <Channel><Group> [Value]"
  params:
    - name: channel
      type: UNRESOLVED
      description: UNRESOLVED
    - name: group
      type: UNRESOLVED
      description: UNRESOLVED
    - name: value
      type: UNRESOLVED
      description: UNRESOLVED

- id: dtmf_dialing
  label: DTMF Dialing
  kind: action
  command: "DEVICE XDIAL <Channel><Group> [Number]"
  params:
    - name: channel
      type: UNRESOLVED
      description: UNRESOLVED
    - name: group
      type: UNRESOLVED
      description: UNRESOLVED
    - name: number
      type: UNRESOLVED
      description: UNRESOLVED

- id: gating_override
  label: Gating Override
  kind: action
  command: "DEVICE XGOVER <Channel><Group> [Value]"
  params:
    - name: channel
      type: UNRESOLVED
      description: UNRESOLVED
    - name: group
      type: UNRESOLVED
      description: UNRESOLVED
    - name: value
      type: UNRESOLVED
      description: UNRESOLVED

- id: local_number
  label: Local Number
  kind: action
  command: "DEVICE XLOCALNUM <Channel><Group> [Number]"
  params:
    - name: channel
      type: UNRESOLVED
      description: UNRESOLVED
    - name: group
      type: UNRESOLVED
      description: UNRESOLVED
    - name: number
      type: UNRESOLVED
      description: UNRESOLVED

- id: audible_ring_enable
  label: Audible Ring Enable
  kind: action
  command: "DEVICE XRINGEREN <Channel><Group> [Value]"
  params:
    - name: channel
      type: UNRESOLVED
      description: UNRESOLVED
    - name: group
      type: UNRESOLVED
      description: UNRESOLVED
    - name: value
      type: UNRESOLVED
      description: UNRESOLVED

- id: speed_dialing
  label: Speed Dialing
  kind: action
  command: "DEVICE XSPEEDDIAL <Channel><Group> [Value]"
  params:
    - name: channel
      type: integer
      description: Groups and Channels
    - name: group
      type: integer
      description: "17, 26 (R, Z)"
    - name: value
      type: UNRESOLVED
      description: UNRESOLVED

- id: conference_start
  label: Conference Start
  kind: action
  command: "DEVICE CONFSTART <Channel><Group>[Value]"
  params:
    - name: channel
      type: integer
      description: See GroupAndChannels
    - name: group
      type: integer
      description: "26 (Z)"
    - name: reserved
      type: integer
      description: UNRESOLVED
    - name: value
      type: string
      description: UNRESOLVED

- id: transfer_cancel
  label: Transfer Cancel
  kind: action
  command: "DEVICE TRANSCANCEL <Channel><Group>"
  params:
    - name: channel
      type: integer
      description: See GroupAndChannels
    - name: group
      type: integer
      description: "26 (Z)"
  notes: There is no query for this command.

- id: aamb
  label: AAMB
  kind: action
  command: "AAMB"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: avr
  label: AVR
  kind: action
  command: "AVR"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: beamforming_mute_macro
  label: Beamforming Mute Macro
  kind: action
  command: "BFMUTEMACRO"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Defines macros for beamforming microphone mute buttons. Command syntax and SR 1212 applicability are UNRESOLVED.

- id: cobranet_conductor
  label: CobraNet Conductor
  kind: action
  command: "CNETCONDUCTOR"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: cobranet_name
  label: CobraNet Name
  kind: action
  command: "CNETNAME"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: cobranet_transmit_bundle_number
  label: CobraNet Transmit Bundle Number
  kind: action
  command: "CNETTXBNUM"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: cobranet_transmit_latency
  label: CobraNet Transmit Latency
  kind: action
  command: "CNETTXLATENCY"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: dante_bf_version
  label: Dante BF Version
  kind: action
  command: "DANTEBFVER"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: dante_output_channel
  label: Dante Output Channel
  kind: action
  command: "DANTEOUTCHAN"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: decay
  label: Decay Adjust
  kind: action
  command: "DECAY"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: default_settings
  label: Default Settings
  kind: action
  command: "DEFAULT"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: delay_adjust
  label: Delay Adjust
  kind: action
  command: "DELAY"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: device_subtype
  label: Device Subtype
  kind: action
  command: "DEVICESUBTYPE"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: device_type
  label: Device Type
  kind: action
  command: "DEVICETYPE"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: default_meter_channel
  label: Default Meter Channel
  kind: action
  command: "DFLTM"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: dial
  label: Dial
  kind: action
  command: "DIAL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax is UNRESOLVED. Source restricts Telco-related commands to devices with telephone interfaces.

- id: digital_microphones
  label: Number Of Digital Mics
  kind: action
  command: "DIGMICS"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Selects/reports the number of digital microphone inputs processed in the microphone processing chain. DIGMICSEN must also be enabled. Syntax and SR 1212 applicability are UNRESOLVED.

- id: dtmf_tone_level
  label: DTMF Tone Level
  kind: action
  command: "DTMFLVL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax is UNRESOLVED. Source restricts Telco-related commands to devices with telephone interfaces.

- id: dtone_level
  label: DTONE Level
  kind: action
  command: "DTONELVL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: ethernet_dhcp
  label: Ethernet DHCP Enable
  kind: action
  command: "ENETDHCP"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: ethernet_dns
  label: Ethernet DNS Server Address
  kind: action
  command: "ENETDNS"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: ethernet_dns_address
  label: Ethernet DNS Server Address
  kind: action
  command: "ENETDNSA"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: ethernet_domain
  label: Ethernet Domain Name
  kind: action
  command: "ENETDOMAIN"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: ethernet_gateway
  label: Ethernet Gateway Address
  kind: action
  command: "ENETGATE"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: ethernet_qos_value
  label: Ethernet QoS Value
  kind: action
  command: "ENETQOSVAL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: feedback_elimination_fixed_filter
  label: Feedback Elimination Fixed Filter
  kind: action
  command: "FEF"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Sets the number of fixed filters used during feedback eliminator initialization. Command syntax and device applicability are UNRESOLVED.

- id: ferng
  label: FERNG
  kind: action
  command: "FERNG"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: feedback_elimination_stereo_channel
  label: Feedback Elimination Stereo Channel
  kind: action
  command: "FESC"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: filter_select
  label: Filter Select
  kind: action
  command: "FILTSEL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: gain
  label: Gain
  kind: action
  command: "GAIN"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: gate_adjust
  label: Gate Adjust
  kind: action
  command: "GATE"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: gate_hold_time
  label: Gate Hold Time
  kind: action
  command: "GHOLD"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: gover
  label: Gating Override
  kind: action
  command: "GOVER"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: gpio_status
  label: GPIO Status
  kind: action
  command: "GPIOSTSTATUS"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: gate_ratio
  label: Gate Ratio
  kind: action
  command: "GRATIO"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: gate_report
  label: Gate Report
  kind: action
  command: "GREPORT"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: hd_aec
  label: HD AEC
  kind: action
  command: "HDAEC"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Syntax is UNRESOLVED. Source explicitly excludes AEC-related commands from SR 1212 and SR 1212A support.

- id: hd_aec_mode
  label: HD AEC Mode
  kind: action
  command: "HDAECMODE"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Syntax is UNRESOLVED. Source explicitly excludes AEC-related commands from SR 1212 and SR 1212A support.

- id: hd_reference_select_1
  label: HD Reference Select 1
  kind: action
  command: "HDREFSEL1"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Reference selection for stereo acoustic echo cancellation. Syntax is UNRESOLVED; AEC-related commands do not work on SR 1212 or SR 1212A.

- id: hd_reference_select_2
  label: HD Reference Select 2
  kind: action
  command: "HDREFSEL2"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Reference selection for stereo acoustic echo cancellation. Syntax is UNRESOLVED; AEC-related commands do not work on SR 1212 or SR 1212A.

- id: hold
  label: Hold
  kind: action
  command: "HOLD"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: hook
  label: Hook
  kind: action
  command: "HOOK"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax is UNRESOLVED. Source restricts Telco-related commands to devices with telephone interfaces.

- id: hook_delay
  label: Hook Delay
  kind: action
  command: "HOOKD"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax is UNRESOLVED. Source restricts Telco-related commands to devices with telephone interfaces.

- id: channel_label
  label: Channel Label
  kind: action
  command: "LABEL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: lcd_contrast
  label: LCD Contrast
  kind: action
  command: "LCDCONTRAST"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: localnum
  label: Local Number
  kind: action
  command: "LOCALNUM"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax is UNRESOLVED. Source restricts Telco-related commands to devices with telephone interfaces.

- id: location_building
  label: Location Building
  kind: action
  command: "LOCBLDG"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: location_city
  label: Location City
  kind: action
  command: "LOCCITY"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: location_room
  label: Location Room
  kind: action
  command: "LOCROOM"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: macro
  label: Macro
  kind: action
  command: "MACRO"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: multi_channel_minmax
  label: Multi-Channel Min/Max
  kind: action
  command: "MCMINMAX"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: multi_channel_ramp
  label: Multi-Channel Ramp
  kind: action
  command: "MCRAMP"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: mic_line
  label: Mic Line
  kind: action
  command: "MLINE"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: mmax
  label: MMAX
  kind: action
  command: "MMAX"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: matrix_clear
  label: Matrix Clear
  kind: action
  command: "MTRXCLEAR"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: matrix_level
  label: Matrix Level
  kind: action
  command: "MTRXLVL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: matrix_type
  label: Matrix Type
  kind: action
  command: "MTRXTYPE"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: multilnen
  label: MULTILNEN
  kind: action
  command: "MULTILNEN"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: multilnstat
  label: MULTILNSTAT
  kind: action
  command: "MULTILNSTAT"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: name
  label: Device Name
  kind: action
  command: "NAME"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: noise_cancellation_select
  label: Noise Cancellation Select
  kind: action
  command: "NCSEL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Syntax is UNRESOLVED. Source explicitly excludes NC-related commands from SR 1212 and SR 1212A support.

- id: ntp_server
  label: NTP Network Time Server Address
  kind: action
  command: "NTPSRV"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: null
  label: Null
  kind: action
  command: "NULL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: offa
  label: OFFA
  kind: action
  command: "OFFA"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: pa_compressor_enable
  label: PA Compressor Enable
  kind: action
  command: "PACEN"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: pa_energy
  label: PA Energy
  kind: action
  command: "PAENERGY"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: pa_eq_reset
  label: PA EQ Reset
  kind: action
  command: "PAEQRST"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: paeqset
  label: PA EQ Filter Set
  kind: action
  command: "PAEQSET"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists PAEQSET but gives a PAEQEN command form under its heading. PAEQSET syntax is UNRESOLVED; the existing PAEQEN action is preserved.

- id: pa_filter
  label: PA Filter
  kind: action
  command: "PAFLT"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: pa_impedance
  label: PA Impedance
  kind: action
  command: "PAIMPED"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: pa_length
  label: PA Length
  kind: action
  command: "PALEN"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: pa_noise_gate
  label: PA Noise Gate
  kind: action
  command: "PANGAT"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: pbdial
  label: PBDIAL
  kind: action
  command: "PBDIAL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: phonebook_add
  label: Add Phonebook Entry
  kind: action
  command: "PHONEBOOKADD"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: phonebook_delete
  label: Delete Phonebook Entry
  kind: action
  command: "PHONEBOOKDEL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Deletes an entry in the phonebook. Command syntax and device applicability are UNRESOLVED.

- id: phonebook_read
  label: Read Phonebook Entry
  kind: action
  command: "PHONEBOOKREAD"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: preset
  label: Preset
  kind: action
  command: "PRESET"
  params:
    - name: preset
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Executes a preset. Source states there are 32 presets but does not state the argument syntax or numbering range.

- id: proxy_status
  label: Proxy Status
  kind: action
  command: "PROXYSTAT"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: ptt_threshold
  label: PTT Threshold
  kind: action
  command: "PTTTHRESHOLD"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: ramp_gain
  label: Ramp Gain
  kind: action
  command: "RAMP"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: redial
  label: Redial
  kind: action
  command: "REDIAL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax is UNRESOLVED. Source restricts Telco-related commands to devices with telephone interfaces.

- id: reference_select
  label: Reference Select
  kind: action
  command: "REFSEL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: reference_set
  label: Reference Set
  kind: action
  command: "REFSET"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: ringeren
  label: Audible Ring Enable
  kind: action
  command: "RINGEREN"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax is UNRESOLVED. Source restricts Telco-related commands to devices with telephone interfaces.

- id: ringer_level
  label: Ringer Level
  kind: action
  command: "RINGERLVL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax is UNRESOLVED. Source restricts Telco-related commands to devices with telephone interfaces.

- id: ringer_melody_select
  label: Audible Ring Melody Selection
  kind: action
  command: "RINGERSEL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax is UNRESOLVED. Source restricts Telco-related commands to devices with telephone interfaces.

- id: ringer_test
  label: Ringer Test
  kind: action
  command: "RINGERTEST"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax is UNRESOLVED. Source restricts Telco-related commands to devices with telephone interfaces.

- id: ring_off_time
  label: Ring Off Time
  kind: action
  command: "RINGOFF"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Sets ring cadence with RINGON. Syntax is UNRESOLVED; source restricts Telco-related commands to devices with telephone interfaces.

- id: ring_on_time
  label: Ring On Time
  kind: action
  command: "RINGON"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Sets ring cadence with RINGOFF. Syntax is UNRESOLVED; source restricts Telco-related commands to devices with telephone interfaces.

- id: receive_boost
  label: Receive Boost
  kind: action
  command: "RXBOOST"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: safety_mute
  label: Safety Mute
  kind: action
  command: "SFTYMUTE"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: signal_generator_sweep
  label: Signal Generator Sweep
  kind: action
  command: "SIGGENSWEEP"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Starts a tone sweep. If Repeat is 0, the signal generator will turn off after the sweep. If Repeat is 1, the signal generator will turn off after signal generator timeout. Command syntax and argument positions are UNRESOLVED.

- id: signal_generator_enable
  label: Signal Generator Enable
  kind: action
  command: "SIGGENEN"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source states that sending SIGGENEN with a 0 stops a sweep. Full syntax, argument positions, and remaining values are UNRESOLVED.

- id: snmp_manager_port
  label: SNMP Manager Port
  kind: action
  command: "SNMPMNGRPORT"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: te
  label: TE
  kind: action
  command: "TE"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: telco_override
  label: Telco Override
  kind: action
  command: "TELOVER"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax is UNRESOLVED. Source restricts Telco-related commands to devices with telephone interfaces.

- id: time_locale
  label: Time Locale
  kind: action
  command: "TIMELOCALE"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Command syntax and device applicability are UNRESOLVED.

- id: transfer_complete
  label: Transfer Complete
  kind: action
  command: "TRANSCOMPLETE"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: transfer_start
  label: Transfer Start
  kind: action
  command: "TRANSSTART"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xaamb
  label: XAAMB
  kind: action
  command: "XAAMB"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xaconn
  label: XACONN
  kind: action
  command: "XACONN"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xaconnlvl
  label: XACONNLVL
  kind: action
  command: "XACONNLVL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xacalldur
  label: XACALLDUR
  kind: action
  command: "XACALLDUR"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xacallerid
  label: XACALLERID
  kind: action
  command: "XACALLERID"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xamblvl
  label: XAMBLVL
  kind: action
  command: "XAMBLVL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xcalldur
  label: XCALLDUR
  kind: action
  command: "XCALLDUR"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xcallerid
  label: XCALLERID
  kind: action
  command: "XCALLERID"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xcgroup
  label: XCGROUP
  kind: action
  command: "XCGROUP"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xcompress
  label: XCOMPRESS
  kind: action
  command: "XCOMPRESS"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xcompsel
  label: XCOMPSEL
  kind: action
  command: "XCOMPSEL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xdelay
  label: XDELAY
  kind: action
  command: "XDELAY"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xdelaysel
  label: XDELAYSEL
  kind: action
  command: "XDELAYSEL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xdtmflvl
  label: XDTMFLVL
  kind: action
  command: "XDTMFLVL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xdtonetlvl
  label: XDTONETLVL
  kind: action
  command: "XDTONETLVL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xghold
  label: XGHOLD
  kind: action
  command: "XGHOLD"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xgmode
  label: XGMODE
  kind: action
  command: "XGMODE"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xrингertest
  label: XRINGERTEST
  kind: action
  command: "XRINGERTEST"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xslvl
  label: XSLVL
  kind: action
  command: "XSLVL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: xtelcolvlctrl
  label: XTELCOLVLCTRL
  kind: action
  command: "XTELCOLVLCTRL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source lists the command token only; syntax and device applicability are UNRESOLVED.

- id: conference_cancel
  label: Conference Cancel
  kind: action
  command: "CONFCANCEL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Listed in the source support table. Syntax and device applicability are UNRESOLVED.

- id: conference_complete
  label: Conference Complete
  kind: action
  command: "CONFCOMPLETE"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Listed in the source support table. Syntax and device applicability are UNRESOLVED.

- id: control_master
  label: Control Master
  kind: action
  command: "CTRLMASTER"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Listed in the source support table. Syntax and device applicability are UNRESOLVED.

- id: digital_microphones_enable
  label: Digital Microphones Enable
  kind: action
  command: "DIGMICSEN"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source identifies this system-wide command as a prerequisite for DIGMICS. Syntax and SR 1212 applicability are UNRESOLVED.

- id: execute_command_string
  label: Execute Command String
  kind: action
  command: "STRING"
  params:
    - name: string
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Executes a stored external-device command string. Source states up to eight strings are supported; execution syntax and numbering range are UNRESOLVED.

- id: aarings
  label: Auto Answer Rings
  kind: action
  command: "AARINGS"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source identifies AARINGS as a command replaceable by XAARINGS for the R group. Syntax is UNRESOLVED; Telco-related commands require a telephone interface.

- id: chairo
  label: Chairman Override Mode
  kind: action
  command: "CHAIRO"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source identifies CHAIRO as a command replaceable by XCHAIRO for the M group. Syntax and device applicability are UNRESOLVED.

- id: speeddial
  label: Speed Dialing
  kind: action
  command: "SPEEDDIAL"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source identifies SPEEDDIAL as a command replaceable by XSPEEDDIAL for the R group. Syntax is UNRESOLVED; Telco-related commands require a telephone interface.

- id: nlp
  label: Nonlinear Processing
  kind: action
  command: "NLP"
  params:
    - name: arguments
      type: UNRESOLVED
      description: UNRESOLVED
  notes: Source identifies NLP as a command replaceable by HDNLP for the M group. Syntax and SR 1212 applicability are UNRESOLVED.

# UNRESOLVED: GAIN, RAMP, PRESET, MTRXCLEAR, MTRXLVL, MTRXTYPE, DELAY,
# AGCSET, AGC, DEFAULT, HDAEC, HDAECMODE, MACRO, SFTYMUTE and many other
# indexed commands have incomplete syntax documentation in source.
```

## Feedbacks
```yaml
- id: mute_state
  type: enum
  values: [off, on]
  description: Query mute status by sending Null as Value in MUTE command
  query_command: "DEVICE MUTE <Channel><Group> [Value]"

- id: audio_presence
  type: bitmap
  description: >-
    ADPRESENT command returns bitmap of channels with valid audio.
    Bit 0 (lsb) = Input 1 through bit 11 (msb) = Input 12.
  command: "DEVICE ADPRESENT [Values]"
  query_command: "DEVICE ADPRESENT [Values]"

- id: gain_range
  type: object
  description: MINMAX query returns min and max gain for a channel
  command: "DEVICE MINMAX <Channel><Group>"
  query_command: "DEVICE MINMAX <Channel><Group> [Min Max]"

- id: device_firmware_version
  type: string
  description: DVER command returns firmware version
  command: "DEVICE DVER"

- id: model
  type: string
  description: MODEL command returns device model
  command: "DEVICE MODEL"

- id: system_check_result
  type: object
  description: >-
    SYSRESULT is sent asynchronously after SYSCHECKS. Each test bit
    generates a separate result. Report only, cannot be queried or set.
  command: "DEVICE SYSRESULT"

- id: download_update_status
  type: object
  description: DUPDATE returns download update status
  command: "DEVICE DUPDATE [Channel Group Status Percent Done Message]"
  query_command: "DEVICE DUPDATE [Channel Group Status Percent Done Message]"

- id: ring_indication
  type: event
  description: RING indicates a ringing line. Report only, cannot be queried or set.
  command: "DEVICE RING <Channel><Value>"

- id: call_status
  type: object
  description: CALLSTATUS reports VoIP channel status. Queryable and asynchronous.
  command: "DEVICE CALLSTATUS <Channel>"
  query_command: "DEVICE CALLSTATUS <Channel>"

- id: beamforming_beam_info
  type: string
  description: BFBINFO returns binary representation of active beams (read only)
  command: "DEVICE BFBINFO [Value]"
  query_command: "DEVICE BFBINFO [Value]"

- id: cobra_mac_address
  type: string
  description: CNETMAC returns MAC address (query only)
  command: "DEVICE CNETMAC [Value]"
  query_command: "DEVICE CNETMAC [Value]"

# UNRESOLVED: full response formats for most commands not documented in source
```

## Variables
```yaml
- id: gain
  type: float
  description: Per-channel gain level
  # UNRESOLVED: GAIN command syntax not fully documented in source

- id: ramp_gain
  type: float
  description: Ramp gain to target level over time
  # UNRESOLVED: RAMP command syntax not fully documented in source

- id: matrix_level
  type: float
  description: Per-crosspoint matrix level
  # UNRESOLVED: MTRXLVL command syntax not fully documented in source
```

## Events
```yaml
- id: ring_event
  description: >-
    RING command sent asynchronously when a line rings.
    Cannot be queried or set.
  command: "DEVICE RING <Channel><Value>"

- id: system_check_result_event
  description: >-
    SYSRESULT sent asynchronously after SYSCHECKS execution.
    Each test bit produces a separate result.
  command: "DEVICE SYSRESULT"

- id: call_status_event
  description: >-
    CALLSTATUS sent asynchronously when VoIP channel status changes.
  command: "DEVICE CALLSTATUS <Channel>"
```

## Macros
```yaml
- id: macro
  description: >-
    Macros define a series of commands runnable from front panel LCD, serial
    commands, control ports, presets, web portal, SNMP, and other macros.
    Macros can contain commands for other units on the E-bus.
  # UNRESOLVED: MACRO command syntax not fully documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >-
  SFTYMUTE (Safety Mute) command exists in the command index but its
  syntax is not fully documented in source.
# UNRESOLVED: SFTYMUTE command details not documented in source.
# UNRESOLVED: no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements found in the extracted source text.
```

## Notes
- Command format uses `DEVICE` prefix where DEVICE = `#<DeviceType><DeviceID>` (e.g. `#01`). Asterisk `*` in DeviceType or DeviceID applies the command to all units/devices.
- AEC and noise-cancellation commands do not work on SR 1212 / SR 1212A.
- 32 presets available; recalled via PRESET command, executable from macros, serial, GPIO, front panel, or web.
- 8 programmable command strings (PRGSTRING) for controlling external devices through RS-232.
- GPIO via DB-25 ports with active-low inputs and open-collector outputs (40 VDC max, 40 mA each).
- Supports CobraNet (CNET* commands) and Dante (DANTE* commands) networking modules.

<!-- UNRESOLVED: GAIN, RAMP, PRESET, MTRXCLEAR, MTRXLVL command syntax not fully documented in source -->
<!-- UNRESOLVED: Groups and Channels reference table not fully extracted — channel numbering scheme incomplete -->
<!-- UNRESOLVED: Device Type and Device ID ranges table empty in source -->
<!-- UNRESOLVED: AGCSET, HDAEC, HDAECMODE, MACRO, SFTYMUTE, DEFAULT, DELAY and many other indexed commands lack full syntax docs -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact command response format (acknowledgement strings) not documented in source -->
<!-- UNRESOLVED: command termination/delimiter characters not stated in source -->

## Provenance

```yaml
source_domains:
  - kb.clearone.com
  - manualslib.com
  - pdf.textfiles.com
source_urls:
  - https://kb.clearone.com
  - https://www.manualslib.com/manual/791436/Clearone-Converge-Pro-880.html
  - https://www.manualslib.com/manual/1403893/Clearone-Converge-Pro-880.html
  - "http://pdf.textfiles.com/manuals/STARINMANUALS/ClearOne/Manuals/ConvergePro%208i,%20840T,%20880,%20TH20%20-%20RS232%20-%20v1.0.pdf"
retrieved_at: 2026-04-29T16:18:55.068Z
last_checked_at: 2026-10-07T13:44:40.690Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:44:40.690Z
matched_actions: 195
action_count: 195
confidence: medium
summary: "All 195 action units match source command tokens with agreeing shapes; transport supported; index essentially fully represented. (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "GAIN, RAMP, PRESET, MTRXCLEAR, MTRXLVL, MTRXTYPE, DELAY, AGC, and many other commands are listed in the index but their full syntax/argument tables were not present in the extracted source"
- "GAIN, RAMP, PRESET, MTRXCLEAR, MTRXLVL, MTRXTYPE, DELAY,"
- "full response formats for most commands not documented in source"
- "GAIN command syntax not fully documented in source"
- "RAMP command syntax not fully documented in source"
- "MTRXLVL command syntax not fully documented in source"
- "MACRO command syntax not fully documented in source"
- "SFTYMUTE command details not documented in source."
- "no explicit safety warnings, interlock procedures, or"
- "GAIN, RAMP, PRESET, MTRXCLEAR, MTRXLVL command syntax not fully documented in source"
- "Groups and Channels reference table not fully extracted — channel numbering scheme incomplete"
- "Device Type and Device ID ranges table empty in source"
- "AGCSET, HDAEC, HDAECMODE, MACRO, SFTYMUTE, DEFAULT, DELAY and many other indexed commands lack full syntax docs"
- "firmware version compatibility not stated in source"
- "exact command response format (acknowledgement strings) not documented in source"
- "command termination/delimiter characters not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
