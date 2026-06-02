---
spec_id: admin/viewsonic-cde5010-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "ViewSonic CDE5010 Series Control Spec"
manufacturer: ViewSonic
model_family: "CDE5010 Series"
aliases: []
compatible_with:
  manufacturers:
    - ViewSonic
  models:
    - "CDE5010 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - viewsonicglobal.com
source_urls:
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDE5010/CDE5010_UG_ENG.pdf
retrieved_at: 2026-04-30T04:25:05.911Z
last_checked_at: 2026-06-02T07:06:51.005Z
generated_at: 2026-06-02T07:06:51.005Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/LAN control is mentioned in the hardware section (RJ-45, SICP Network Port 1025-65535) but the source does not document the TCP wire protocol for the command set; LAN transport is therefore not represented here."
  - "flow control not stated in source (parity/data/stop fixed; flow not mentioned)"
  - "no protocol command documented to set monitor ID; configured via OSD only per source."
  - "no multi-step macros documented in source."
  - "source contains no safety warnings, voltage interlocks, or power-sequencing requirements"
  - "LAN command transport not specified in source."
  - "firmware version compatibility, voltage / power specs, error recovery behavior, and TCP transport details are not stated in the source excerpt provided."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:51.005Z
  matched_actions: 67
  action_count: 67
  confidence: medium
  summary: "All 67 spec actions matched to source commands with correct opcodes, parameters, and ranges; all transport values verified verbatim in source documentation. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# ViewSonic CDE5010 Series Control Spec

## Summary
ViewSonic CDE5010 Series commercial display / digital signage panel controllable over RS-232C using an 8-byte ASCII command packet plus CR. The protocol defines a Set-Function block, a Get-Function block, and a Remote Control Pass-through mode that surfaces front-panel/RCU key presses to the host. Multiple displays can be daisy-chained via RS-232 OUT / IN; each display is addressed by a monitor ID (01-98, 99 = broadcast).

<!-- UNRESOLVED: TCP/LAN control is mentioned in the hardware section (RJ-45, SICP Network Port 1025-65535) but the source does not document the TCP wire protocol for the command set; LAN transport is therefore not represented here. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source (parity/data/stop fixed; flow not mentioned)
  connector: DSUB-9 Male  # Pin 2 RXD (in), Pin 3 TXD (out), Pin 5 GND; crossover (null-modem) cable required for PC use
auth:
  type: none  # inferred: no auth procedure in source
addressing:
  device_id_range: "01-98"   # monitor ID; default 01; 99 = broadcast (no reply)
```

## Traits
```yaml
- powerable     # inferred from Set Power on/off (cmd "!") and Get-Power status (cmd "l")
- routable      # inferred from Set Input Select (cmd '"') and PIP-Input (cmd "7")
- queryable     # inferred from 20+ Get-Function commands
- levelable     # inferred from Brightness / Contrast / Volume / Bass / Treble / Sharpness / Color / Tint set commands
```

## Actions
```yaml
# Frame format (all set/get actions, derived from source 11.3 protocol description):
#   Length(1='8') + ID(2 ASCII digits) + Type(1: 's' set, 'g' get) + Command(1 ASCII) + Value1(1) + Value2(1) + Value3(1) + CR(0x0D)
# Total 9 bytes; Length byte counts 8 bytes excluding CR.
# Templates below use {id} = 2-digit ASCII monitor ID (e.g. "01"); broadcast = "99".
# {value} = exactly 3 ASCII bytes per source value-range column.

# -------------------- Set-Function: Basic --------------------

- id: set_power
  label: Set Power (Standby / On)
  kind: action
  command: "8{id}s!{value}\r"   # cmd '!' = 0x21
  params:
    - name: id
      type: string
      description: 2-digit ASCII monitor ID 01-98, or 99 for broadcast
    - name: value
      type: enum
      values: ["000", "001"]    # 000 STBY, 001 ON
      description: 000 = Standby, 001 = Power on

- id: set_input_select
  label: Set Input Select
  kind: action
  command: "8{id}s\"{value}\r"  # cmd '"' = 0x22
  params:
    - name: id
      type: string
    - name: value
      type: enum
      values: ["000","001","002","003","004","014","024","034","005","006","016","026","007","008","009","00A"]
      description: |
        000 TV, 001 AV, 002 S-Video, 003 YPbPr, 004 HDMI1, 014 HDMI2, 024 HDMI3, 034 HDMI4,
        005 DVI, 006 VGA1, 016 VGA2, 026 VGA3, 007 Slot-in PC (OPS/SDM)/HDBT,
        008 Internal memory, 009 DP, 00A Embedded/Main (Android).
        Source note: HEX of "00A" is 30 30 41.

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "8{id}s${value}\r"   # cmd '$' = 0x24
  params:
    - name: id
      type: string
    - name: value
      type: string
      description: 3-digit ASCII, 000-100

- id: set_power_lock
  label: Set Power Lock
  kind: action
  command: "8{id}s4{value}\r"   # cmd '4' = 0x34
  params:
    - name: id
      type: string
    - name: value
      type: enum
      values: ["000", "001"]    # 000 Unlock, 001 Lock

- id: set_volume
  label: Set Volume
  kind: action
  command: "8{id}s5{value}\r"   # cmd '5' = 0x35
  params:
    - name: id
      type: string
    - name: value
      type: string
      description: 000-100 absolute; 900 = volume down (-1); 901 = volume up (+1)

- id: set_mute
  label: Set Mute
  kind: action
  command: "8{id}s6{value}\r"   # cmd '6' = 0x36
  params:
    - name: id
      type: string
    - name: value
      type: enum
      values: ["000", "001"]    # 000 OFF, 001 ON (mute)

- id: set_button_lock
  label: Set Button Lock
  kind: action
  command: "8{id}s8{value}\r"   # cmd '8' = 0x38
  params:
    - name: id
      type: string
    - name: value
      type: enum
      values: ["000", "001"]    # 000 Unlock, 001 Lock

- id: set_menu_lock
  label: Set Menu Lock
  kind: action
  command: "8{id}s>{value}\r"   # cmd '>' = 0x3E
  params:
    - name: id
      type: string
    - name: value
      type: enum
      values: ["000", "001"]    # 000 Unlock, 001 Lock

- id: set_remote_control
  label: Set Remote Control Mode
  kind: action
  command: "8{id}sB{value}\r"   # cmd 'B' = 0x42
  params:
    - name: id
      type: string
    - name: value
      type: enum
      values: ["000", "001", "002"]
      description: 000 Disable, 001 Enable, 002 Pass through

# -------------------- Set-Function: Optional --------------------

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "8{id}s#{value}\r"   # cmd '#' = 0x23
  params:
    - {name: id, type: string}
    - {name: value, type: string, description: "000-100"}

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "8{id}s%{value}\r"   # cmd '%' = 0x25
  params:
    - {name: id, type: string}
    - {name: value, type: string, description: "000-100"}

- id: set_color
  label: Set Color
  kind: action
  command: "8{id}s&{value}\r"   # cmd '&' = 0x26
  params:
    - {name: id, type: string}
    - {name: value, type: string, description: "000-100"}

- id: set_tint
  label: Set Tint
  kind: action
  command: "8{id}s'{value}\r"   # cmd '\'' = 0x27
  params:
    - {name: id, type: string}
    - {name: value, type: string, description: "000-100"}

- id: set_color_mode
  label: Set Color Mode
  kind: action
  command: "8{id}s){value}\r"   # cmd ')' = 0x29
  params:
    - {name: id, type: string}
    - name: value
      type: enum
      values: ["000", "001", "002", "003"]
      description: 000 Normal, 001 Warm, 002 Cold, 003 Personal

- id: set_surround_sound
  label: Set Surround Sound
  kind: action
  command: "8{id}s-{value}\r"   # cmd '-' = 0x2D
  params:
    - {name: id, type: string}
    - name: value
      type: enum
      values: ["000", "001"]    # 000 Off, 001 On

- id: set_bass
  label: Set Bass
  kind: action
  command: "8{id}s.{value}\r"   # cmd '.' = 0x2E
  params:
    - {name: id, type: string}
    - {name: value, type: string, description: "000-100"}

- id: set_treble
  label: Set Treble
  kind: action
  command: "8{id}s/{value}\r"   # cmd '/' = 0x2F
  params:
    - {name: id, type: string}
    - {name: value, type: string, description: "000-100"}

- id: set_balance
  label: Set Balance
  kind: action
  command: "8{id}s0{value}\r"   # cmd '0' = 0x30
  params:
    - {name: id, type: string}
    - {name: value, type: string, description: "000-100; 050 is central"}

- id: set_picture_size
  label: Set Picture Size
  kind: action
  command: "8{id}s1{value}\r"   # cmd '1' = 0x31
  params:
    - {name: id, type: string}
    - name: value
      type: enum
      values: ["000", "001", "002"]
      description: 000 FULL (16:9), 001 NORMAL (4:3), 002 REAL (1:1)

- id: set_osd_language
  label: Set OSD Language
  kind: action
  command: "8{id}s2{value}\r"   # cmd '2' = 0x32
  params:
    - {name: id, type: string}
    - name: value
      type: enum
      values: ["000", "001", "002"]
      description: 000 English, 001 French, 002 Spanish. Source notes additional languages may be supported per model.

- id: set_pip_mode
  label: Set PIP Mode
  kind: action
  command: "8{id}s9{value}\r"   # cmd '9' = 0x39
  params:
    - {name: id, type: string}
    - name: value
      type: enum
      values: ["000", "001", "002"]
      description: 000 OFF, 001 PIP (POP), 002 PBP

- id: set_pip_sound_select
  label: Set PIP Sound Select
  kind: action
  command: "8{id}s:{value}\r"   # cmd ':' = 0x3A
  params:
    - {name: id, type: string}
    - name: value
      type: enum
      values: ["000", "001"]    # 000 Main, 001 PIP (POP)

- id: set_pip_position
  label: Set PIP Position
  kind: action
  command: "8{id}s;{value}\r"   # cmd ';' = 0x3B
  params:
    - {name: id, type: string}
    - name: value
      type: enum
      values: ["000", "001", "002", "003"]
      description: 000 Up, 001 Down, 002 Left, 003 Right

- id: set_pip_input
  label: Set PIP Input
  kind: action
  command: "8{id}s7{value}\r"   # cmd '7' = 0x37
  params:
    - {name: id, type: string}
    - name: value
      type: enum
      values: ["000","001","002","003","004","014","024","034","005","006","016","026","007","008","009","00A"]
      description: Same value enum as set_input_select.

- id: set_number
  label: Number Key Input
  kind: action
  command: "8{id}s@{value}\r"   # cmd '@' = 0x40
  params:
    - {name: id, type: string}
    - {name: value, type: string, description: "000-009"}

- id: set_key_pad
  label: Key Pad Input
  kind: action
  command: "8{id}sA{value}\r"   # cmd 'A' = 0x41
  params:
    - {name: id, type: string}
    - name: value
      type: enum
      values: ["000","001","002","003","004","005","006","007"]
      description: 000 UP, 001 DOWN, 002 LEFT, 003 RIGHT, 004 ENTER, 005 INPUT, 006 MENU/(EXIT), 007 EXIT

- id: set_tiling_mode
  label: Set Tiling Mode
  kind: action
  command: "8{id}sP{value}\r"   # cmd 'P' = 0x50
  params:
    - {name: id, type: string}
    - name: value
      type: enum
      values: ["000", "001"]    # 000 OFF, 001 ON

- id: set_tiling_compensation
  label: Set Tiling Bezel Compensation
  kind: action
  command: "8{id}sQ{value}\r"   # cmd 'Q' = 0x51
  params:
    - {name: id, type: string}
    - name: value
      type: enum
      values: ["000", "001"]    # 000 OFF, 001 ON

- id: set_tiling_h_by_v
  label: Set Tiling H by V Monitors
  kind: action
  command: "8{id}sR{value}\r"   # cmd 'R' = 0x52
  params:
    - {name: id, type: string}
    - {name: value, type: string, description: "01x~09x H monitors; 0x1~0x9 V monitors (2nd digit H, 3rd digit V)"}

- id: set_tiling_position
  label: Set Tiling Position
  kind: action
  command: "8{id}sS{value}\r"   # cmd 'S' = 0x53
  params:
    - {name: id, type: string}
    - {name: value, type: string, description: "001-025; copy screen of Position# to identified display"}

- id: set_date_year
  label: Set Date - Year
  kind: action
  command: "8{id}sV{value}\r"   # cmd 'V' = 0x56
  params:
    - {name: id, type: string}
    - {name: value, type: string, description: "Y17~Y99 (last 2 digits of year 2017-2099)"}

- id: set_date_month
  label: Set Date - Month
  kind: action
  command: "8{id}sV{value}\r"   # cmd 'V' = 0x56 (shared opcode with year/day; differentiated by value prefix)
  params:
    - {name: id, type: string}
    - {name: value, type: string, description: "M01~M12"}

- id: set_date_day
  label: Set Date - Day
  kind: action
  command: "8{id}sV{value}\r"   # cmd 'V' = 0x56
  params:
    - {name: id, type: string}
    - {name: value, type: string, description: "D01~D31"}

- id: set_time_hour
  label: Set Time - Hour
  kind: action
  command: "8{id}sW{value}\r"   # cmd 'W' = 0x57
  params:
    - {name: id, type: string}
    - {name: value, type: string, description: "H00~H23 (24-hour format)"}

- id: set_time_min
  label: Set Time - Minute
  kind: action
  command: "8{id}sW{value}\r"   # cmd 'W' = 0x57
  params:
    - {name: id, type: string}
    - {name: value, type: string, description: "M00~M59"}

- id: set_time_sec
  label: Set Time - Second
  kind: action
  command: "8{id}sW{value}\r"   # cmd 'W' = 0x57
  params:
    - {name: id, type: string}
    - {name: value, type: string, description: "S00~S59"}

# -------------------- Get-Function: Basic --------------------

- id: get_contrast
  label: Get Contrast
  kind: query
  command: "8{id}ga000\r"        # cmd 'a' = 0x61
  params:
    - {name: id, type: string}

- id: get_brightness
  label: Get Brightness
  kind: query
  command: "8{id}gb000\r"        # cmd 'b' = 0x62
  params:
    - {name: id, type: string}

- id: get_sharpness
  label: Get Sharpness
  kind: query
  command: "8{id}gc000\r"        # cmd 'c' = 0x63
  params:
    - {name: id, type: string}

- id: get_color
  label: Get Color
  kind: query
  command: "8{id}gd000\r"        # cmd 'd' = 0x64
  params:
    - {name: id, type: string}

- id: get_tint
  label: Get Tint
  kind: query
  command: "8{id}ge000\r"        # cmd 'e' = 0x65
  params:
    - {name: id, type: string}

- id: get_volume
  label: Get Volume
  kind: query
  command: "8{id}gf000\r"        # cmd 'f' = 0x66
  params:
    - {name: id, type: string}

- id: get_mute
  label: Get Mute
  kind: query
  command: "8{id}gg000\r"        # cmd 'g' = 0x67
  params:
    - {name: id, type: string}

- id: get_input_select
  label: Get Input Select
  kind: query
  command: "8{id}gj000\r"        # cmd 'j' = 0x6A
  params:
    - {name: id, type: string}

- id: get_power_status
  label: Get Power Status (ON / STBY)
  kind: query
  command: "8{id}gl000\r"        # cmd 'l' = 0x6C
  params:
    - {name: id, type: string}

- id: get_remote_control
  label: Get Remote Control Mode
  kind: query
  command: "8{id}gn000\r"        # cmd 'n' = 0x6E
  params:
    - {name: id, type: string}

- id: get_power_lock
  label: Get Power Lock
  kind: query
  command: "8{id}go000\r"        # cmd 'o' = 0x6F
  params:
    - {name: id, type: string}

- id: get_button_lock
  label: Get Button Lock
  kind: query
  command: "8{id}gp000\r"        # cmd 'p' = 0x70
  params:
    - {name: id, type: string}

- id: get_menu_lock
  label: Get Menu Lock
  kind: query
  command: "8{id}gq000\r"        # cmd 'q' = 0x71
  params:
    - {name: id, type: string}

- id: get_tiling_mode
  label: Get Tiling Mode
  kind: query
  command: "8{id}gv000\r"        # cmd 'v' = 0x76
  params:
    - {name: id, type: string}

- id: get_tiling_compensation
  label: Get Tiling Bezel Compensation
  kind: query
  command: "8{id}gw000\r"        # cmd 'w' = 0x77
  params:
    - {name: id, type: string}

- id: get_tiling_h_by_v
  label: Get Tiling H by V Monitors
  kind: query
  command: "8{id}gx000\r"        # cmd 'x' = 0x78
  params:
    - {name: id, type: string}

- id: get_tiling_position
  label: Get Tiling Position
  kind: query
  command: "8{id}gy000\r"        # cmd 'y' = 0x79
  params:
    - {name: id, type: string}

- id: get_ack
  label: Get ACK (Communication Link Test)
  kind: query
  command: "8{id}gz000\r"        # cmd 'z' = 0x7A
  params:
    - {name: id, type: string}

- id: get_thermal
  label: Get Thermal (deg C)
  kind: query
  command: "8{id}g0000\r"        # cmd '0' = 0x30 (for specific models only per source)
  params:
    - {name: id, type: string}

- id: get_power_log
  label: Get Power On/Off Log
  kind: query
  command: "8{id}g1000\r"        # cmd '1' = 0x31 (for specific models only per source)
  params:
    - {name: id, type: string}

- id: get_date
  label: Get Date (umbrella)
  kind: query
  command: "8{id}g2000\r"        # cmd '2' = 0x32 (see Set-Date for response format)
  params:
    - {name: id, type: string}

- id: get_time
  label: Get Time (umbrella)
  kind: query
  command: "8{id}g3000\r"        # cmd '3' = 0x33 (see Set-Time for response format)
  params:
    - {name: id, type: string}

# -------------------- Get-Function: Optional (only rows new vs. basic) --------------------

- id: get_pip_mode
  label: Get PIP Mode
  kind: query
  command: "8{id}gt000\r"        # cmd 't' = 0x74
  params:
    - {name: id, type: string}

- id: get_pip_input
  label: Get PIP Input
  kind: query
  command: "8{id}gu000\r"        # cmd 'u' = 0x75
  params:
    - {name: id, type: string}

- id: get_date_year
  label: Get Date - Year
  kind: query
  command: "8{id}g2000\r"        # cmd '2' = 0x32; response value Y00~Y00
  params:
    - {name: id, type: string}

- id: get_date_month
  label: Get Date - Month
  kind: query
  command: "8{id}g2000\r"        # cmd '2' = 0x32; response value M00~M00
  params:
    - {name: id, type: string}

- id: get_date_day
  label: Get Date - Day
  kind: query
  command: "8{id}g2000\r"        # cmd '2' = 0x32; response value D00~D00
  params:
    - {name: id, type: string}

- id: get_time_hour
  label: Get Time - Hour
  kind: query
  command: "8{id}g3000\r"        # cmd '3' = 0x33; response value H00~H00
  params:
    - {name: id, type: string}

- id: get_time_min
  label: Get Time - Minute
  kind: query
  command: "8{id}g3000\r"        # cmd '3' = 0x33; response value M00~M00
  params:
    - {name: id, type: string}

- id: get_time_sec
  label: Get Time - Second
  kind: query
  command: "8{id}g3000\r"        # cmd '3' = 0x33; response value S00~S00
  params:
    - {name: id, type: string}

- id: get_rs232_version
  label: Get RS232 Protocol Version
  kind: query
  command: "8{id}g6000\r"        # cmd '6' = 0x36; response 001~ (Version 0.0.1~9.9.9)
  params:
    - {name: id, type: string}
```

## Feedbacks
```yaml
# Generic reply ACK / NAK frames returned after every Set / Get command.
- id: set_ack
  label: Set Acknowledge
  type: frame
  pattern: "4{id}+\r"            # Length=4, ID, Command Type '+' = 0x2B, CR. Source 11.2.3 / Set-Function reply.
  description: Sent by display after a valid Set-Function command.

- id: set_nak
  label: Set Negative Acknowledge
  type: frame
  pattern: "4{id}-\r"            # Length=4, ID, Command Type '-' = 0x2D, CR.
  description: Sent by display after an invalid Set-Function command.

- id: get_reply
  label: Get-Function Valid Reply
  type: frame
  pattern: "8{id}r{cmd}{v1}{v2}{v3}\r"  # Length=8, ID, Type 'r' = 0x72, command echo, 3 ASCII value bytes, CR.
  description: Sent by display in response to a valid Get-Function query.

- id: get_nak
  label: Get-Function Invalid Reply
  type: frame
  pattern: "4{id}-\r"            # Length=4, ID, '-' = 0x2D, CR.
  description: Sent by display when a Get-Function command opcode is not in the table.

# Observable state derived from the Get reply payloads.
- id: power_state
  type: enum
  values: ["off", "on"]          # 000 STBY -> off, 001 ON -> on (Get-Power status, cmd 'l')

- id: mute_state
  type: enum
  values: ["off", "on"]          # 000 unmuted, 001 muted (Get-Mute, cmd 'g')

- id: input_state
  type: enum
  values: ["TV","AV","S-Video","YPbPr","HDMI1","HDMI2","HDMI3","HDMI4","DVI","VGA1","VGA2","VGA3","Slot-in PC","Internal memory","DP","Embedded/Android"]
  description: From Get-Input Select reply (cmd 'j'); value mapping per Set-Input table.

- id: volume_level
  type: integer
  range: [0, 100]                # From Get-Volume (cmd 'f')

- id: brightness_level
  type: integer
  range: [0, 100]                # From Get-Brightness (cmd 'b')

- id: contrast_level
  type: integer
  range: [0, 100]                # From Get-Contrast (cmd 'a')

- id: power_lock_state
  type: enum
  values: ["unlock", "lock"]     # From Get-Power Lock (cmd 'o')

- id: button_lock_state
  type: enum
  values: ["unlock", "lock"]     # From Get-Button Lock (cmd 'p')

- id: menu_lock_state
  type: enum
  values: ["unlock", "lock"]     # From Get-Menu Lock (cmd 'q')

- id: thermal_value
  type: integer
  range: [-99, 100]              # From Get-Thermal (cmd '0'): 000~100 = 0~+100 degC, -01~-99 = -1~-99 degC
```

## Variables
```yaml
# Settable persistent parameters. Each maps to a Set / Get pair above.
- id: brightness
  type: integer
  range: [0, 100]
  set_action: set_brightness
  get_action: get_brightness

- id: contrast
  type: integer
  range: [0, 100]
  set_action: set_contrast
  get_action: get_contrast

- id: sharpness
  type: integer
  range: [0, 100]
  set_action: set_sharpness
  get_action: get_sharpness

- id: color
  type: integer
  range: [0, 100]
  set_action: set_color
  get_action: get_color

- id: tint
  type: integer
  range: [0, 100]
  set_action: set_tint
  get_action: get_tint

- id: volume
  type: integer
  range: [0, 100]
  set_action: set_volume
  get_action: get_volume

- id: bass
  type: integer
  range: [0, 100]
  set_action: set_bass

- id: treble
  type: integer
  range: [0, 100]
  set_action: set_treble

- id: balance
  type: integer
  range: [0, 100]
  description: 050 is central
  set_action: set_balance

- id: monitor_id
  type: integer
  range: [1, 255]
  description: OSD-configurable monitor ID for RS-232 addressing (1-255 per OSD; protocol address space 01-98 + 99 broadcast)
  # UNRESOLVED: no protocol command documented to set monitor ID; configured via OSD only per source.
```

## Events
```yaml
# IR Pass-through events (Section 11.3.3).
# Emitted only when Remote Control mode is set to 002 (Pass through) via set_remote_control.
- id: ir_passthrough_key
  label: IR Pass-through Key Press
  trigger: RCU button press while pass-through mode active
  pattern: "6{id}p{code_msb}{code_lsb}\r"   # 7-byte frame: Length=6, ID(2), Type 'p' = 0x70, RCU Code MSB, RCU Code LSB, CR
  fields:
    - name: id
      description: Source monitor ID
    - name: code
      description: |
        Two-byte RCU key code (MSB,LSB). Source documents these codes:
        01=1, 02=2, 03=3, 04=4, 05=5, 06=6, 07=7, 08=8, 09=9, 0A=0,
        0B=- , 0C=RECALL(LAST), 0D=INFO(DISPLAY),
        0F=ASPECT(ZOOM,SIZE), 10=VOLUME UP(+), 11=VOLUME DOWN(-), 12=MUTE,
        13=CHANNEL/PAGE UP(+)/BRIGHTNESS+, 14=CHANNEL/PAGE DOWN(-)/BRIGHTNESS-,
        15=POWER, 16=SOURCES(INPUTS), 19=SLEEP, 1A=MENU,
        1B=UP, 1C=DOWN, 1D=LEFT(-), 1E=RIGHT(+), 1F=OK(ENTER,SET), 20=EXIT,
        2C=RED(F1), 2D=GREEN(F2), 2E=YELLOW(F3), 2F=BLUE(F4).
  notes: |
    - IR pass-through codes are not identical to internal RCU key codes (source 11.3.3 note 1).
    - POWER key special handling (note 2):
      - When display is OFF and receives IR POWER: display turns on then forwards POWER code to host.
      - When display is ON and receives IR POWER: display forwards POWER code to host then turns off.
      - When SET-Power Lock is enabled, display does not respond to POWER key.
    - VOLUME UP / VOLUME DOWN repeat while the key is held.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, voltage interlocks, or power-sequencing requirements
# for the RS-232 control surface; only the IR-pass-through POWER key sequence (documented as an event
# note) and the SET-Power Lock behavior are described.
```

## Notes
- Monitor ID address space: 01-98 (default 01); 99 is broadcast and produces no reply on Set-Function commands except #1 unit which replies as ID=01 per source note.
- Frame length byte is ASCII '8' (0x38) for both Set and Get; the Length value counts message bytes excluding the trailing CR.
- All command codes in the YAML `command:` fields are written verbatim from the Set-Function / Get-Function tables (source Section 11.3.1 and 11.3.2). Hex byte for each opcode is captured in the inline comment.
- Set-Date (cmd `V` = 0x56) and Set-Time (cmd `W` = 0x57) reuse a single opcode across Year/Month/Day or Hour/Minute/Second respectively; the value prefix byte (Y/M/D, H/M/S) selects the field. They are listed as separate source rows and therefore as separate actions, matching the granularity rule.
- "Power on" reply is documented as an exception for VT2405LED-1 and VT3205LED (reply 0x32 2B 0D = "2+<CR>"); the CDE5010 Series is not called out as one of these exception models, but the note is reproduced here for awareness.
- "Power STBY status" Get reply is similarly noted as an exception for VT2405LED-1 and VT3205LED (reply 0x36 72 6C 30 30 30 0D = "6rl000<CR>"); same caveat as above.
- LAN/RJ-45 control is referenced in the hardware section along with an OSD "RS232-Routing" selector (RS232 / LAN -> RS232) and an SICP Network Port (1025-65535, unavailable: 8000 / 9988 / 15220 / 28123 / 28124), but the TCP/IP wire protocol is not documented in this excerpt. <!-- UNRESOLVED: LAN command transport not specified in source. -->
- IR loop-through supports up to 9 displays (and IR daisy-chain via RS232 likewise up to 9 displays) per the hardware notes.
<!-- UNRESOLVED: firmware version compatibility, voltage / power specs, error recovery behavior, and TCP transport details are not stated in the source excerpt provided. -->

## Provenance

```yaml
source_domains:
  - viewsonicglobal.com
source_urls:
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDE5010/CDE5010_UG_ENG.pdf
retrieved_at: 2026-04-30T04:25:05.911Z
last_checked_at: 2026-06-02T07:06:51.005Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:51.005Z
matched_actions: 67
action_count: 67
confidence: medium
summary: "All 67 spec actions matched to source commands with correct opcodes, parameters, and ranges; all transport values verified verbatim in source documentation. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/LAN control is mentioned in the hardware section (RJ-45, SICP Network Port 1025-65535) but the source does not document the TCP wire protocol for the command set; LAN transport is therefore not represented here."
- "flow control not stated in source (parity/data/stop fixed; flow not mentioned)"
- "no protocol command documented to set monitor ID; configured via OSD only per source."
- "no multi-step macros documented in source."
- "source contains no safety warnings, voltage interlocks, or power-sequencing requirements"
- "LAN command transport not specified in source."
- "firmware version compatibility, voltage / power specs, error recovery behavior, and TCP transport details are not stated in the source excerpt provided."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
