---
spec_id: admin/lightware-mx16x16dvi-plus
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lightware MX16x16DVI-Plus Control Spec"
manufacturer: Lightware
model_family: MX16x16DVI-Plus
aliases: []
compatible_with:
  manufacturers:
    - Lightware
  models:
    - MX16x16DVI-Plus
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - archive.lightware.com
  - lightware.com
source_urls:
  - https://archive.lightware.com/pub/media/lightware/filedownloader/file/User-Manual/MX_DVI-Plus_UsersManual.pdf
  - https://lightware.com/our-open-api-environment
retrieved_at: 2026-08-07T18:13:52.708Z
last_checked_at: 2026-08-19T09:31:54.951Z
generated_at: 2026-08-19T09:31:54.951Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents Protocol #2 exists and is selectable via {P_2}, but does not document any Protocol #2 command syntax. All actions below are LW2 (protocol #1) only."
  - "RS-422 variant mentioned (\"can be ordered with either RS-232 or RS-422\"); no RS-422 line settings stated."
  - "flow_control not stated. Pins 4/6 (DTR/DSR) and 7/8 (RTS/CTS) are"
  - "no protocol command for setting an arbitrary port is documented;"
  - "source contains no electrical safety warnings, interlock procedures, or"
  - "Protocol #2 command syntax is not documented in the source; only its existence and the {P_2} selector."
  - "RS-422 line settings not stated, though the source says the unit can be factory-ordered with RS-422 instead of RS-232."
  - "flow control mode not stated. DTR/DSR and RTS/CTS pin pairs are internally looped per the pinout table, but no flow control mode is named."
  - "error list <class> values and <e_desc> vocabulary not enumerated in source."
  - "no method documented in this protocol for setting an arbitrary static IP address or TCP port; only defaults-reload and DHCP."
  - "firmware compatibility range not stated."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:31:54.951Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 spec actions match literal tokens in source; all source commands (sections7.3-7.9 + quick summary 7.10) are represented; transport values match source. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-07
---

# Lightware MX16x16DVI-Plus Control Spec

## Summary
16x16 DVI matrix router. Controlled over RS-232 (9-pole D-SUB female) or Ethernet TCP/IP. This spec covers the Lightware LW2 protocol (protocol #1): commands wrapped in curly brackets `{ }`, responses in round brackets `( )` terminated CrLf (0x0D 0x0A). Covers crosspoint switching, mute/lock, 32 presets, port/preset naming, EDID router, and status queries.

<!-- UNRESOLVED: source documents Protocol #2 exists and is selectable via {P_2}, but does not document any Protocol #2 command syntax. All actions below are LW2 (protocol #1) only. -->
<!-- UNRESOLVED: RS-422 variant mentioned ("can be ordered with either RS-232 or RS-422"); no RS-422 line settings stated. -->
<!-- CONFLICT: two different baud rates stated in the same document. See Transport and Notes. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  # CONFLICT IN SOURCE - verify against hardware before use:
  #   Section 4.4.4 "Serial Port Settings": "57600 Baud, 8 data bit, 1 stop bit, no parity"
  #   Specifications appendix "RS-232 Control Port": "9600 Baud, 8 bit, 1 stop bit, no parity"
  # Value below is the 4.4.4 figure, which the source labels the device default setting.
  baud_rate: 57600  # CONFLICT: source also states 9600 in the specifications appendix
  data_bits: 8
  parity: none
  stop_bits: 1
  # UNRESOLVED: flow_control not stated. Pins 4/6 (DTR/DSR) and 7/8 (RTS/CTS) are
  # internally looped per the pinout table, but the source never names a flow control mode.
addressing:
  port: 10001  # factory default TCP port, stated in IP Settings and TCP Port Configuration sections
  default_ip: "192.168.254.254"  # factory default fix IP, stated in source
  # NOTE: source's terminal-application walkthrough states a different default IP
  # (192.168.0.100); the IP Settings and TCP Port Configuration sections both state
  # 192.168.254.254. Value above follows the two agreeing sections.
  port_range_allowed: "1025-65535, excluding 9999, 14000-14009, 30704, 30718"  # stated in source
auth:
  type: none  # inferred: no login/password/auth procedure anywhere in source
```

## Traits
```yaml
- routable    # inferred from crosspoint switching commands ({<in>@<out>}, {<in>@O})
- queryable   # inferred from query commands returning state ({VC}, {VM}, {I}, {S}, {F})
# NOT powerable: source documents no power on/off command. {RST} restarts the CPU
#   controller, which is a reboot, not a power state change.
# NOT levelable: no volume/gain/brightness commands in source (DVI video routing only).
```

## Actions
```yaml
# LW2 protocol. All commands sent surrounded by { }. Input is converted to uppercase
# by the device, so case in the command payload is not significant.
# Multiple commands may be concatenated as a batch with a single CrLf at the end.

# --- 7.3 Switching and control ---
- id: switch_input_to_output
  label: Switch Input to Output
  kind: action
  command: "{<in>@<out>}"
  params:
    - name: in
      type: string
      description: Input number, 1- or 2-digit ASCII (e.g. 01, 5, 07, 16)
    - name: out
      type: string
      description: Output number, 1- or 2-digit ASCII
  response: "(O<out2>•I<in2>)CrLf"
  notes: Switching a muted output does not unmute it.

- id: switch_input_to_all_outputs
  label: Switch Input to All Outputs
  kind: action
  command: "{<in>@O}"
  params:
    - name: in
      type: string
      description: Input number, 1- or 2-digit ASCII
  response: "(I<in2>•ALL)CrLf"
  notes: Response does not indicate muted or locked outputs; query separately.

- id: query_io_connections
  label: Query I/O Connections
  kind: query
  command: "{VC}"
  params: []
  response: "(ALL•<O1>•<O2>•...•<O16>)CrLf"

- id: reset_outputs
  label: Reset Outputs to Factory Default
  kind: action
  command: "{r00}"
  params: []
  response: "(APWSE)CrLf"

- id: query_mute_states
  label: Query Mute States
  kind: query
  command: "{VM}"
  params: []
  response: "(MUT•<M1>•<M2>•...•<M16>)CrLf"

- id: mute_output
  label: Mute Output
  kind: action
  command: "{#<out>}"
  params:
    - name: out
      type: string
      description: Output number, 1- or 2-digit ASCII
  response: "(1MT<out2>)CrLf"
  notes: Disables the output; does not change crosspoint state.

- id: unmute_output
  label: Unmute Output
  kind: action
  command: "{+<out>}"
  params:
    - name: out
      type: string
      description: Output number, 1- or 2-digit ASCII
  response: "(0MT<out2>)CrLf"

- id: lock_output
  label: Lock Output
  kind: action
  command: "{#><out>}"
  params:
    - name: out
      type: string
      description: Output number, 1- or 2-digit ASCII
  response: "(1LO<out2>)CrLf"

- id: unlock_output
  label: Unlock Output
  kind: action
  command: "{+<<out>}"
  params:
    - name: out
      type: string
      description: Output number, 1- or 2-digit ASCII
  response: "(0LO<out2>)CrLf"
  notes: Device responds identically regardless of previous lock state.

- id: save_preset
  label: Save Preset
  kind: action
  command: "{$<id>}"
  params:
    - name: id
      type: string
      description: Preset number, 1- or 2-digit ASCII (max 32)
  response: "(SPR<id2>)CrLf"
  notes: Saves crosspoint and mute state. Lock states are NOT saved.

- id: load_preset
  label: Load Preset
  kind: action
  command: "{%<id>}"
  params:
    - name: id
      type: string
      description: Preset number, 1- or 2-digit ASCII (max 32)
  response: "(LPR<id2>)CrLf"
  notes: Presets do not affect locked outputs.

- id: preset_preview
  label: Preset Preview
  kind: query
  command: "{VP#<id>=?}"
  params:
    - name: id
      type: string
      description: Preset number
  response: "(VP#<id>=•<O1>•<O2>•...•<O16>)CrLf"

# --- 7.4 Port/preset naming ---
- id: query_preset_name
  label: Query Preset Name
  kind: query
  command: "{PNAME#<id>=?}"
  params:
    - name: id
      type: string
      description: Preset number
  response: "(PNAME#<id>=•<preset_name>)CrLf"

- id: rename_preset
  label: Rename Preset
  kind: action
  command: "{PNAME#<id>=<preset_name>}"
  params:
    - name: id
      type: string
      description: Preset number
    - name: preset_name
      type: string
      description: New preset name
  response: "(PNAME#<id>=•<preset_name>)CrLf"

- id: query_input_name
  label: Query Input Name
  kind: query
  command: "{INAME#<in>=?}"
  params:
    - name: in
      type: string
      description: Input number
  response: "(INAME#<in>=•<Input_name>)CrLf"

- id: rename_input
  label: Rename Input
  kind: action
  command: "{INAME#<in>=<input_name>}"
  params:
    - name: in
      type: string
      description: Input number
    - name: input_name
      type: string
      description: New input name
  response: "(INAME#<in>=<input_name>)CrLf"

- id: query_output_name
  label: Query Output Name
  kind: query
  command: "{ONAME#<out>=?}"
  params:
    - name: out
      type: string
      description: Output number
  response: "(ONAME#<out>=•<output_name>)CrLf"

- id: rename_output
  label: Rename Output
  kind: action
  command: "{ONAME#<out>=<output_name>}"
  params:
    - name: out
      type: string
      description: Output number
    - name: output_name
      type: string
      description: New output name
  response: "(ONAME#<out>=•<output_name>)CrLf"

- id: default_preset_names
  label: Reset All Preset Names to Default
  kind: action
  command: "{PNAME#<id>=!}"
  params:
    - name: id
      type: string
      description: Any valid preset number; the value is ignored, ALL presets are affected
  response: "(PNAME#<id>=•Preset•<id>)CrLf"

- id: default_input_names
  label: Reset All Input Names to Default
  kind: action
  command: "{INAME#<id>=!}"
  params:
    - name: id
      type: string
      description: Any valid input number; the value is ignored, ALL inputs are affected
  response: "(INAME#<id>=•Input•<id>)CrLf"

- id: default_output_names
  label: Reset All Output Names to Default
  kind: action
  command: "{ONAME#<id>=!}"
  params:
    - name: id
      type: string
      description: Any valid output number; the value is ignored, ALL outputs are affected
  response: "(ONAME#<id>=•Output•<id>)CrLf"

# --- 7.5 Communication setup ---
- id: query_ip_settings
  label: Query IP Settings
  kind: query
  command: "{IP_CONFIG=?}"
  params: []
  response: "(IP_CONFIG=<id>•<ip_address>•<port>•<mask>•<gateway>)CrLf"

- id: reload_default_ip_settings
  label: Reload Default IP Settings
  kind: action
  command: "{IP_CONFIG=!}"
  params: []
  response: "(Changing•IP•configuration…)CrLf then (DONE!)CrLf or (FAILED!)CrLf"
  notes: Serial port only. Cannot be executed over the Ethernet connection.

- id: set_dynamic_ip
  label: Set Dynamic IP Address (DHCP)
  kind: action
  command: "{IP_CONFIG=D}"
  params: []
  response: "(Changing•IP•configuration…)CrLf then (DONE!)CrLf or (FAILED!)CrLf"
  notes: Serial port only. Port, subnet mask and gateway remain unchanged.

- id: query_network_components
  label: Query Network Components
  kind: query
  command: "{LAN_VER=?}"
  params: []
  response: "(MAC_ADDR=<mac>)CrLf (WEB_VER=<web>)CrLf (SERVER_VER=<ser>)CrLf"

# --- 7.6 Port status ---
- id: input_port_status
  label: Input Port Status
  kind: query
  command: "{:ISD}"
  params: []
  response: "(ISD•<INPUT_D>)CrLf"
  notes: 32 decimal digits returned; only the first 16 valid on this model. 1 = source connected and sending 5V.

- id: output_port_status
  label: Output Port Status
  kind: query
  command: "{:OSD}"
  params: []
  response: "(OSD•<OUTPUT_D>)CrLf"
  notes: 32 decimal digits returned; only the first 16 valid on this model. 1 = sink presenting Hotplug.

# --- 7.7 Router status ---
- id: query_product_type
  label: Query Product Type
  kind: query
  command: "{I}"
  params: []
  response: "(<PRODUCT_TYPE>)CrLf"

- id: query_serial_number
  label: Query Serial Number
  kind: query
  command: "{S}"
  params: []
  response: "(SN:<SERIAL_N>)CrLf"

- id: query_cpu_fw_version
  label: Query CPU Firmware Version
  kind: query
  command: "{F}"
  params: []
  response: "(FW:<FW_VER>)CrLf"

- id: query_cpu_fw_compile_time
  label: Query CPU Firmware Compile Time
  kind: query
  command: "{CT}"
  params: []
  response: "(Compiled:•<DATE>•<TIME>•Build:•<tag>)CrLf"

- id: query_installed_io_boards
  label: Query Installed I/O Boards
  kind: query
  command: "{IS}"
  params: []
  response: "(SL#•0•<MB_DESC>)CrLf ... (SL#•8•<IB_DESC>)CrLf"
  notes: Compact model; Empty Slot descriptors are returned for compatibility only.

- id: query_controllers_firmware
  label: Query Controllers' Firmware
  kind: query
  command: "{FC}"
  params: []
  response: "(<FIRMWARE_LIST>)CrLf"

- id: query_current_protocol
  label: Query Current Protocol
  kind: query
  command: "{P_?}"
  params: []
  response: "(CURRENT•PROTOCOL•=•#<x>)CrLf"

- id: set_current_protocol
  label: Set Current Protocol
  kind: action
  command: "{P_<x>}"
  params:
    - name: x
      type: integer
      description: "1 = Lightware protocol (default), 2 = P#2 protocol"
  response: "(PROTOCOL•#<x>•SELECTED!)CrLf"
  notes: Setting protocol 2 makes all other commands in this spec inapplicable on that interface.

- id: view_error_list
  label: View Error List
  kind: query
  command: "{ELIST=?}"
  params: []
  response: "(<class>,<e_desc><e_code>,<e_occ>)CrLf per entry"

- id: clear_error_list
  label: Clear Error List
  kind: action
  command: "{ELIST=!}"
  params: []
  response: "(List•is•empty!)CrLf"

# --- 7.8 EDID router ---
- id: static_edid_emulation
  label: Static EDID Emulation
  kind: action
  command: "{<in>:<loc>}"
  params:
    - name: in
      type: string
      description: Input number
    - name: loc
      type: string
      description: EDID memory location, 1..100 (static range)
  response: "(E_S_C)CrLf - sent only if the new EDID differs from the previous one"

- id: dynamic_edid_emulation
  label: Dynamic EDID Emulation
  kind: action
  command: "{<in>:<loc>}"
  params:
    - name: in
      type: string
      description: Input number
    - name: loc
      type: string
      description: EDID memory location 101..116 on MX16x16DVI-Plus; outputs 1..16 map to 101..116
  response: "(E_S_C)CrLf - sent only if the new EDID differs from the previous one"
  notes: Input then tracks EDID changes on the mapped output.

- id: route_edid_to_all_inputs
  label: Route EDID to All Inputs
  kind: action
  command: "{A:<loc>}"
  params:
    - name: loc
      type: string
      description: 1..100 static, 101..116 dynamic
  notes: Takes about 10 seconds.

- id: query_emulated_edids
  label: Query Emulated EDIDs
  kind: query
  command: "{VEDID}"
  params: []
  response: "(VEDID•<IN1>•<IN2>•...•<IN16>)CrLf"

- id: save_edid_learning
  label: Save EDID (Learning)
  kind: action
  command: "{<out>><loc>}"
  params:
    - name: out
      type: string
      description: Output number to learn EDID from
    - name: loc
      type: string
      description: Target memory location, 51..100 (user-writable range)

- id: view_edid_header
  label: View EDID Header
  kind: query
  command: "{WH<loc>}"
  params:
    - name: loc
      type: string
      description: EDID memory location
  response: "(EH#<loc>•<PNPID>•<res>•<name>)CrLf"

- id: query_edid_validity_table
  label: Query EDID Validity Table
  kind: query
  command: "{WV}"
  params: []
  response: "(EV•<VALIDITY_TABLE>)CrLf - 164 characters"
  notes: "0 = invalid, 1 = valid, 3 = changed."

- id: download_edid_content
  label: Download EDID Content
  kind: query
  command: "{WE<loc>}"
  params:
    - name: loc
      type: string
      description: EDID memory location
  response: "(EB#<loc>•<B1>•<B2>•...•<B256>)CrLf"

- id: begin_edid_upload
  label: Begin EDID Upload
  kind: action
  command: "{WL#<loc>}"
  params:
    - name: loc
      type: string
      description: Target memory location, 51..100 (user programmable only)
  response: "(E_L_S)CrLf"
  notes: Step 1 of the EDID upload sequence. See Macros.

- id: send_edid_block
  label: Send EDID Block
  kind: action
  command: "{WB#<num>•<B1>•<B2>•<B3>•<B4>•<B5>•<B6>•<B7>•<B8>}"
  params:
    - name: num
      type: integer
      description: Block sequence number, 1..32
    - name: B1..B8
      type: string
      description: Eight EDID bytes as space-separated hex represented in ASCII
  response: "(EL#<num>)CrLf"

- id: delete_all_edid
  label: Delete All EDID from Memory
  kind: action
  command: "{:CLREDID}"
  params: []
  notes: Clears User, Emulated and Last-attached-Monitor EDIDs. Factory EDIDs are retained.

# --- 7.9 Router initiated ---
- id: restart_cpu
  label: Restart CPU
  kind: action
  command: "{RST}"
  params: []
  response: "(CPU_RESET...)CrLf(<name>•Ready!)CrLf"

- id: restart_edid_controller
  label: Restart EDID Controller
  kind: action
  command: "{:RST}"
  params: []
  response: "(Booting...)CrLf then per-slot BOOT SLOT n STARTED/FINISHED lines"
```

## Feedbacks
```yaml
- id: crosspoint_state
  type: string
  source_command: "{VC}"
  description: >
    Per-output connected input as 2-digit ASCII, optionally prefixed with a state letter.
  prefix_legend:
    "<none>": connected, neither muted nor locked
    "M": connected, muted, unlocked
    "L": connected, not muted, locked
    "U": connected, muted and locked

- id: output_mute_state
  type: enum
  values: [0, 1]
  source_command: "{VM}"
  description: Per-output mute flag. 0 = unmuted, 1 = muted.

- id: switch_confirmation
  type: string
  source_command: "{<in>@<out>}"
  pattern: "(O<out2>•I<in2>)CrLf"

- id: mute_confirmation
  type: string
  pattern: "(1MT<out2>)CrLf / (0MT<out2>)CrLf"

- id: lock_confirmation
  type: string
  pattern: "(1LO<out2>)CrLf / (0LO<out2>)CrLf"

- id: preset_confirmation
  type: string
  pattern: "(SPR<id2>)CrLf / (LPR<id2>)CrLf"

- id: input_port_signal_presence
  type: string
  source_command: "{:ISD}"
  description: 32 digits, first 16 valid. 0 = no source or no 5V, 1 = source present with 5V.

- id: output_port_hotplug
  type: string
  source_command: "{:OSD}"
  description: 32 digits, first 16 valid. 0 = no sink or no Hotplug, 1 = Hotplug present.

- id: product_type
  type: string
  source_command: "{I}"

- id: serial_number
  type: string
  source_command: "{S}"
  description: 8-digit serial number.

- id: cpu_firmware_version
  type: string
  source_command: "{F}"

- id: current_protocol
  type: enum
  values: [1, 2]
  source_command: "{P_?}"
  description: 1 = Lightware protocol (default), 2 = P#2 protocol.

- id: ip_configuration
  type: string
  source_command: "{IP_CONFIG=?}"
  description: "<id> <ip_address> <port> <mask> <gateway>; id 0 = fix IP, 7 = DHCP."

- id: edid_validity_table
  type: string
  source_command: "{WV}"
  description: 164 characters. 0 = invalid, 1 = valid, 3 = changed.

- id: emulated_edid_map
  type: string
  source_command: "{VEDID}"
  description: Per-input 3-digit EDID location currently emulated.
```

## Variables
```yaml
- id: preset_name
  type: string
  get: "{PNAME#<id>=?}"
  set: "{PNAME#<id>=<preset_name>}"
  range: preset id 1..32

- id: input_name
  type: string
  get: "{INAME#<in>=?}"
  set: "{INAME#<in>=<input_name>}"

- id: output_name
  type: string
  get: "{ONAME#<out>=?}"
  set: "{ONAME#<out>=<output_name>}"

- id: tcp_port
  type: integer
  get: "{IP_CONFIG=?}"
  default: 10001
  range: "1025-65535, excluding 9999, 14000-14009, 30704, 30718"
  notes: >
    Source states port 23 is required for Barco Encore and 10001 for Vista Spyder.
    UNRESOLVED: no protocol command for setting an arbitrary port is documented;
    only {IP_CONFIG=!} (defaults) and {IP_CONFIG=D} (DHCP) exist in this protocol.

- id: control_protocol
  type: enum
  values: [1, 2]
  get: "{P_?}"
  set: "{P_<x>}"
```

## Events
```yaml
- id: edid_status_changed
  pattern: "(E_S_C)CrLf"
  description: >
    Unsolicited. Sent after an EDID-changing command, or when a new EDID source is
    connected. Recommended handling: issue {WV} and read every location marked '3'.
  notes: >
    Not re-sent if a display with an identical EDID is reconnected to the same output,
    because the router retains the last attached display's EDID.

- id: crosspoint_broadcast
  description: >
    Responses to crosspoint switch, mute/unmute, lock/unlock and preset setting commands
    are sent to ALL connected interfaces, not only the originating one. All other
    responses go only to the querying interface. Translated to the target interface's
    protocol form if protocols differ.

- id: error_response
  type: enum
  values:
    - code: "(ERR01)CrLf"
      meaning: Invalid input number - exceeds maximum inputs or equals zero
    - code: "(ERR02)CrLf"
      meaning: Invalid output number - exceeds installed outputs or equals zero
    - code: "(ERR03)CrLf"
      meaning: Invalid value - exceeds maximum allowed value
    - code: "(ERR04)CrLf"
      meaning: Invalid preset number - exceeds maximum (32)
```

## Macros
```yaml
- id: upload_edid
  label: Upload Full EDID to a Memory Location
  description: Explicit 6-step sequence documented in section 7.8.9.
  applies_to: memory locations 51..100 only
  steps:
    - send: "{WL#<loc>}"
      await: "(E_L_S)CrLf"
    - send: "{WB#<num>•<B1>•<B2>•<B3>•<B4>•<B5>•<B6>•<B7>•<B8>}"
      await: "(EL#<num>)CrLf"
      repeat: 32 blocks, num 1..32, 8 bytes each, 256 bytes total
    - await: "(E_S_C)CrLf"
      description: Router signals EDID status changed after the final acknowledgement.

- id: reset_ip_configuration_front_panel
  label: Reset IP Configuration via Front Panel
  description: Physical button sequence documented in section 4.4.3.
  steps:
    - Switch router to Take mode (hold Take/Auto 3 seconds until light goes off) if it was in Autotake mode
    - Press Control Lock (button shines red continuously)
    - Press and hold Output Lock (current protocol indication lights up)
    - "Press and release Load Preset for factory default IP (192.168.254.254, port 10001, mask 255.255.0.0, gateway 0.0.0.0), OR Save Preset to enable DHCP"
    - Confirmation light sequence runs (Take/Auto, Load Preset, Save Preset light in turn)
    - Reconnect LAN cable if it was unplugged
    - Wait about 20 seconds before connecting to the matrix
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no electrical safety warnings, interlock procedures, or
# power-on sequencing requirements in the control-protocol sections provided.
# Operational cautions (not safety interlocks) are recorded in Notes.
```

## Notes

**Baud rate conflict — unresolved in source.** The document states two different values:
- Section 4.4.4 "Serial Port Settings": *"57600 Baud, 8 data bit, 1 stop bit, no parity"*, described as the device's default settings.
- Specifications appendix "RS-232 Control Port": *"9600 Baud, 8 bit, 1 stop bit, no parity"*.

The Transport block carries 57600 because section 4.4.4 explicitly labels it the default. This was not verified against hardware. Try 57600 first, fall back to 9600.

**Default IP discrepancy.** Sections 4.4.3 and TCP Port Configuration both state 192.168.254.254. The terminal-application walkthrough (7.2) states 192.168.0.100. Spec follows the two agreeing sections.

**Protocol framing.** Commands are wrapped in `{ }`. Responses come back in `( )` and only when a command executed successfully. Input is uppercased by the device. Responses terminate with CrLf (0x0D 0x0A). `•` denotes a space character (0x20) in the source's notation and is reproduced literally in the response patterns above.

**Batch commands.** Multiple `{ }` commands may be concatenated with a single CrLf at the end of the batch. Consecutive switching commands with no other command interleaved are grouped and executed in one step, and the response format changes to the `{VC}` form. Any non-switch command between them breaks the grouping.

**Multi-interface behaviour.** Ethernet and serial control can be used simultaneously, and the Ethernet interface accepts multiple connections on the same TCP port. Crosspoint, mute/unmute, lock/unlock and preset responses broadcast to all interfaces to keep controllers in sync; everything else replies only to the querying interface.

**IP commands are serial-only.** `{IP_CONFIG=!}` and `{IP_CONFIG=D}` cannot be executed over the Ethernet connection — serial port only. Use the built-in website or Lightware Device Controller to change IP settings over Ethernet.

**Timing.** `{A:<loc>}` (route EDID to all inputs) takes about 10 seconds. Static and dynamic EDID emulation commands are documented with an unspecified "...delay..." before the response. After a front-panel IP reset, wait about 20 seconds before reconnecting.

**Preset limits.** 32 preset memories on all matrix routers. Presets store crosspoint and mute state but not lock state; loading a preset does not affect locked outputs.

**Mute semantics.** Muting disables the output without changing the crosspoint, so unmuting restores the prior connection. Switching a muted output does not unmute it.

<!-- UNRESOLVED: Protocol #2 command syntax is not documented in the source; only its existence and the {P_2} selector. -->
<!-- UNRESOLVED: RS-422 line settings not stated, though the source says the unit can be factory-ordered with RS-422 instead of RS-232. -->
<!-- UNRESOLVED: flow control mode not stated. DTR/DSR and RTS/CTS pin pairs are internally looped per the pinout table, but no flow control mode is named. -->
<!-- UNRESOLVED: error list <class> values and <e_desc> vocabulary not enumerated in source. -->
<!-- UNRESOLVED: no method documented in this protocol for setting an arbitrary static IP address or TCP port; only defaults-reload and DHCP. -->
<!-- UNRESOLVED: firmware compatibility range not stated. -->
```

Coverage: 50 actions, all source rows. Two conflicts flagged not silently resolved. No voltage/current invented. Baud and port both from source text only — port 10001 stated in three places, baud disputed.

## Provenance

```yaml
source_domains:
  - archive.lightware.com
  - lightware.com
source_urls:
  - https://archive.lightware.com/pub/media/lightware/filedownloader/file/User-Manual/MX_DVI-Plus_UsersManual.pdf
  - https://lightware.com/our-open-api-environment
retrieved_at: 2026-08-07T18:13:52.708Z
last_checked_at: 2026-08-19T09:31:54.951Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:31:54.951Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 spec actions match literal tokens in source; all source commands (sections7.3-7.9 + quick summary 7.10) are represented; transport values match source. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents Protocol #2 exists and is selectable via {P_2}, but does not document any Protocol #2 command syntax. All actions below are LW2 (protocol #1) only."
- "RS-422 variant mentioned (\"can be ordered with either RS-232 or RS-422\"); no RS-422 line settings stated."
- "flow_control not stated. Pins 4/6 (DTR/DSR) and 7/8 (RTS/CTS) are"
- "no protocol command for setting an arbitrary port is documented;"
- "source contains no electrical safety warnings, interlock procedures, or"
- "Protocol #2 command syntax is not documented in the source; only its existence and the {P_2} selector."
- "RS-422 line settings not stated, though the source says the unit can be factory-ordered with RS-422 instead of RS-232."
- "flow control mode not stated. DTR/DSR and RTS/CTS pin pairs are internally looped per the pinout table, but no flow control mode is named."
- "error list <class> values and <e_desc> vocabulary not enumerated in source."
- "no method documented in this protocol for setting an arbitrary static IP address or TCP port; only defaults-reload and DHCP."
- "firmware compatibility range not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
