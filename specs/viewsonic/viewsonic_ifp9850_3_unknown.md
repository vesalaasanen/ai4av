---
spec_id: admin/viewsonic-ifp9850-3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Viewsonic IFP9850-3 Control Spec"
manufacturer: Viewsonic
model_family: IFP9850-3
aliases: []
compatible_with:
  manufacturers:
    - Viewsonic
  models:
    - IFP9850-3
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - viewsonicvsa.freshdesk.com
  - public.shopcdn.co.uk
  - manuals.viewsonic.com
  - mcgrp.ru
source_urls:
  - https://viewsonicvsa.freshdesk.com/helpdesk/attachments/43447586827
  - https://public.shopcdn.co.uk/avpm/1619007581it-ifp9850-3.pdf
  - https://manuals.viewsonic.com/IFP9850-4_RS-232_Protocols
  - https://mcgrp.ru/files/viewer/903083/93
retrieved_at: 2026-05-19T05:55:32.807Z
last_checked_at: 2026-06-02T07:06:52.499Z
generated_at: 2026-06-02T07:06:52.499Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware-version compatibility range, default LFD ID assignment for this specific SKU, exact supported subset of input sources for IFP9850-3 (source is generic family doc)"
  - "source models all writable parameters as Set actions with discrete codes;"
  - "source documents no explicit multi-step macro sequences beyond"
  - "source documents lock-mode behaviors but no electrical safety"
  - "- Firmware version compatibility range and minimum protocol revision required for IFP9850-3."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:52.499Z
  matched_actions: 82
  action_count: 82
  confidence: medium
  summary: "All 82 spec actions matched literally to source commands with correct opcodes; transport parameters verified; source command inventory fully represented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Viewsonic IFP9850-3 Control Spec

## Summary
ViewSonic IFP9850-3 interactive flat panel display, controllable via the shared ViewSonic LFD RS232 & LAN protocol. Supports RS-232 (9600 8N1, DSUB-9 or 3.5mm barrel) and TCP/IP on port 5000. Command set covers power, source switching, picture and audio adjustment, video-wall tiling, PIP, date/time, status queries (including thermal, MAC, IP, FW version), Wake-on-LAN, and an IR pass-through reporting mode. All commands use a fixed 9-byte ASCII frame terminated by CR (0x0D); the display ACKs with "+" or NAKs with "-".

<!-- UNRESOLVED: firmware-version compatibility range, default LFD ID assignment for this specific SKU, exact supported subset of input sources for IFP9850-3 (source is generic family doc) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
  - udp
addressing:
  port: 5000
  base_url: ""  # N/A - raw TCP byte stream, no URL scheme
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: source documents only 3-wire TXD/RXD/GND, no RTS/CTS pins
auth:
  type: none  # inferred: no auth procedure in source; "Logon Credentials: No" stated for LAN
framing:
  message_length: 9  # bytes: 1 length + 2 ID + 1 cmd-type + 1 cmd-code + 3 value + 1 CR
  terminator: "\r"   # 0x0D
  ack: "+"           # 0x2B + CR - valid command reply
  nak: "-"           # 0x2D + CR - invalid command reply
  broadcast_id: "99" # ID=99 applies to all displays; only ID=01 replies
  default_id: "01"
wol:
  protocol: udp
  port: 9
  packet_length_bytes: 126  # 6×0xFF + 16×6-byte MAC + 24×0x00
```

## Traits
```yaml
- powerable    # SET power on/off command !
- queryable    # extensive Get-Function listing
- routable     # Input Select and PIP-Input commands present
- levelable    # Brightness, Volume, Contrast, Sharpness, Color, Tint, Bass, Treble, Balance
```

## Actions
```yaml
# Frame convention for every ASCII action below:
#   "8{id}{type}{code}{value}\r"
#     - "8" (0x38) = total byte length excluding CR
#     - {id}      = 2 ASCII digits, "01"-"98", or "99" broadcast; default "01"
#     - {type}    = 's' for Set, 'g' for Get, 'A'/'a' for Backlight set/get variants
#     - {code}    = 1 ASCII byte (the per-row command code)
#     - {value}   = 3 ASCII bytes (per-row value range)
#     - "\r"      = 0x0D CR
# For brevity, only the {value} param is listed below unless extra params apply.
# The {id} param is implicit and defaults to "01".

# ============================================================
# A. Basic Set functions
# ============================================================

- id: power_set
  label: Set Power
  kind: action
  command: "8{id}s!{value}\r"
  params:
    - {name: value, type: enum, values: ["000","001"], description: "000=STBY, 001=ON"}
  notes: "LAN power-on may require specific standby mode; WOL by MAC is an alternative."

- id: input_select
  label: Input Select
  kind: action
  command: "8{id}s\"{value}\r"
  params:
    - name: value
      type: enum
      values: ["000","001","002","003","004","014","024","034","005","006","016","026","007","008","009","029","019","039","00A"]
      description: "000=TV, 001=AV, 002=S-Video, 003=YPbPr, 004=HDMI1, 014=HDMI2, 024=HDMI3, 034=HDMI4, 005=DVI, 006=VGA1, 016=VGA2, 026=VGA3, 007=Slot-in PC (OPS/SDM/HDBT), 008=Internal memory, 009=DP1, 029=DP2, 019=Type-C1, 039=Type-C2, 00A=Embedded/Main (Android)"

- id: input_select_cycle
  label: Input Select Cycle
  kind: action
  command: "8{id}s\"00Z\r"
  notes: "Cycles through display's available inputs. Source lists as separate row from Input Select."

- id: brightness_set
  label: Set Brightness
  kind: action
  command: "8{id}s${value}\r"
  params:
    - {name: value, type: string, description: "000-100 absolute; 900=down by 1; 901=up by 1"}

- id: backlight_set
  label: Set Backlight
  kind: action
  command: "8{id}AB{value}\r"
  params:
    - {name: value, type: integer, description: "000-100"}
  notes: "Uses command type 'A' (0x41), not 's'. For Android platform main mode."

- id: power_lock_set
  label: Set Power Lock
  kind: action
  command: "8{id}s4{value}\r"
  params:
    - {name: value, type: enum, values: ["000","001"], description: "000=Unlock, 001=Lock"}
  notes: "Cannot be unlocked via OSD reset; auto AC power-on under power-lock; SET power on/off still works via RS232 but does not release lock."

- id: volume_set
  label: Set Volume
  kind: action
  command: "8{id}s5{value}\r"
  params:
    - {name: value, type: string, description: "000-100 absolute; 900=down by 1; 901=up by 1"}

- id: mute_set
  label: Set Mute
  kind: action
  command: "8{id}s6{value}\r"
  params:
    - {name: value, type: enum, values: ["000","001"], description: "000=OFF, 001=ON (mute)"}

- id: button_lock_set
  label: Set Button Lock
  kind: action
  command: "8{id}s8{value}\r"
  params:
    - {name: value, type: enum, values: ["000","001"], description: "000=Unlock, 001=Lock"}
  notes: "Locks front-panel and RCU buttons except Power; SET functions over RS232 still workable."

- id: menu_lock_set
  label: Set Menu Lock
  kind: action
  command: "8{id}s>{value}\r"
  params:
    - {name: value, type: enum, values: ["000","001"], description: "000=Unlock, 001=Lock"}

- id: number_key
  label: Number Key
  kind: action
  command: "8{id}s@{value}\r"
  params:
    - {name: value, type: enum, values: ["000","001","002","003","004","005","006","007","008","009"], description: "Numeric key 0-9"}

- id: key_pad
  label: Key Pad
  kind: action
  command: "8{id}sA{value}\r"
  params:
    - name: value
      type: enum
      values: ["000","001","002","003","004","005","006","007"]
      description: "000=UP, 001=DOWN, 002=LEFT, 003=RIGHT, 004=ENTER, 005=INPUT, 006=MENU/EXIT, 007=EXIT"

- id: remote_control_mode_set
  label: Set Remote Control Mode
  kind: action
  command: "8{id}sB{value}\r"
  params:
    - name: value
      type: enum
      values: ["000","001","002"]
      description: "000=Disable, 001=Enable, 002=Pass through"
  notes: "Pass-through forwards RCU codes to host via RS232 without acting on them locally."

- id: restore_default
  label: Restore Factory Default
  kind: action
  command: "8{id}s~000\r"
  params: []
  notes: "Recovers display to factory settings."

# ============================================================
# B. Optional Set functions
# ============================================================

- id: contrast_set
  label: Set Contrast
  kind: action
  command: "8{id}s#{value}\r"
  params:
    - {name: value, type: integer, description: "000-100"}

- id: sharpness_set
  label: Set Sharpness
  kind: action
  command: "8{id}s%{value}\r"
  params:
    - {name: value, type: integer, description: "000-100"}

- id: color_set
  label: Set Color
  kind: action
  command: "8{id}s&{value}\r"
  params:
    - {name: value, type: integer, description: "000-100"}

- id: tint_set
  label: Set Tint
  kind: action
  command: "8{id}s'{value}\r"
  params:
    - {name: value, type: integer, description: "000-100"}

- id: backlight_on_off_set
  label: Set Backlight On/Off
  kind: action
  command: "8{id}s({value}\r"
  params:
    - {name: value, type: enum, values: ["000","001"], description: "000=Off, 001=On"}
  notes: "Retained for backward compatibility; see Function On_Off (=) for new mechanism."

- id: color_mode_set
  label: Set Color Mode
  kind: action
  command: "8{id}s){value}\r"
  params:
    - {name: value, type: enum, values: ["000","001","002","003"], description: "000=Normal, 001=Warm, 002=Cold, 003=Personal"}

- id: freeze_on_off_set
  label: Set Freeze On/Off
  kind: action
  command: "8{id}s*{value}\r"
  params:
    - {name: value, type: enum, values: ["000","001"], description: "000=Off, 001=On"}
  notes: "Retained for backward compatibility; see Function On_Off (=) for new mechanism."

- id: surround_sound_set
  label: Set Surround Sound
  kind: action
  command: "8{id}s-{value}\r"
  params:
    - {name: value, type: enum, values: ["000","001"], description: "000=Off, 001=On"}

- id: bass_set
  label: Set Bass
  kind: action
  command: "8{id}s.{value}\r"
  params:
    - {name: value, type: integer, description: "000-100"}

- id: treble_set
  label: Set Treble
  kind: action
  command: "8{id}s/{value}\r"
  params:
    - {name: value, type: integer, description: "000-100"}

- id: balance_set
  label: Set Balance
  kind: action
  command: "8{id}s0{value}\r"
  params:
    - {name: value, type: integer, description: "000-100 (050 is center)"}

- id: picture_size_set
  label: Set Picture Size
  kind: action
  command: "8{id}s1{value}\r"
  params:
    - {name: value, type: enum, values: ["000","001","002"], description: "000=FULL (16:9), 001=NORMAL (4:3), 002=REAL (1:1)"}

- id: osd_language_set
  label: Set OSD Language
  kind: action
  command: "8{id}s2{value}\r"
  params:
    - {name: value, type: enum, values: ["000","001","002"], description: "000=English, 001=French, 002=Spanish (extendable per model)"}

- id: pip_mode_set
  label: Set PIP Mode
  kind: action
  command: "8{id}s9{value}\r"
  params:
    - {name: value, type: enum, values: ["000","001","002"], description: "000=OFF, 001=PIP (POP), 002=PBP"}

- id: pip_sound_select_set
  label: Set PIP Sound Source
  kind: action
  command: "8{id}s:{value}\r"
  params:
    - {name: value, type: enum, values: ["000","001"], description: "000=Main, 001=Sub"}

- id: pip_position_set
  label: Set PIP Position
  kind: action
  command: "8{id}s;{value}\r"
  params:
    - {name: value, type: enum, values: ["000","001","002","003"], description: "000=Up, 001=Down, 002=Left, 003=Right"}

- id: pip_input_set
  label: Set PIP Input
  kind: action
  command: "8{id}s7{value}\r"
  params:
    - name: value
      type: enum
      values: ["000","001","002","003","004","014","024","034","005","006","016","026","007","008","009","00A"]
      description: "Same range as Input Select; 009 covers DP/Type-C combined."

- id: tiling_mode_set
  label: Set Tiling Mode
  kind: action
  command: "8{id}sP{value}\r"
  params:
    - {name: value, type: enum, values: ["000","001"], description: "000=OFF, 001=ON (video wall)"}

- id: tiling_compensation_set
  label: Set Tiling Compensation
  kind: action
  command: "8{id}sQ{value}\r"
  params:
    - {name: value, type: enum, values: ["000","001"], description: "000=OFF, 001=ON - bezel width compensation"}

- id: tiling_h_by_v_set
  label: Set Tiling H by V Monitors
  kind: action
  command: "8{id}sR{value}\r"
  params:
    - name: value
      type: string
      description: "2nd digit = horizontal monitors (1-9); 3rd digit = vertical monitors (1-9). Range 01x-09x for H, 0x1-0x9 for V."

- id: tiling_position_set
  label: Set Tiling Position
  kind: action
  command: "8{id}sS{value}\r"
  params:
    - {name: value, type: string, description: "001-025: copy screen of this position number to identified display"}

- id: date_year_set
  label: Set Date - Year
  kind: action
  command: "8{id}sV{value}\r"
  params:
    - {name: value, type: string, description: "Y17-Y99 (last 2 digits of 20YY)"}

- id: date_month_set
  label: Set Date - Month
  kind: action
  command: "8{id}sV{value}\r"
  params:
    - {name: value, type: string, description: "M01-M12"}

- id: date_day_set
  label: Set Date - Day
  kind: action
  command: "8{id}sV{value}\r"
  params:
    - {name: value, type: string, description: "D01-D31"}

- id: time_hour_set
  label: Set Time - Hour
  kind: action
  command: "8{id}sW{value}\r"
  params:
    - {name: value, type: string, description: "H00-H23 (24-hr)"}

- id: time_min_set
  label: Set Time - Minute
  kind: action
  command: "8{id}sW{value}\r"
  params:
    - {name: value, type: string, description: "M00-M59"}

- id: time_sec_set
  label: Set Time - Second
  kind: action
  command: "8{id}sW{value}\r"
  params:
    - {name: value, type: string, description: "S00-S59"}

- id: customized_hot_keys_set
  label: Set Customized Hot Keys
  kind: action
  command: "8{id}sX{value}\r"
  params:
    - {name: value, type: string, description: "001-999; 001=Open MVBA app"}

- id: function_on_off_set
  label: Set Function On/Off
  kind: action
  command: "8{id}s={value}\r"
  params:
    - name: value
      type: enum
      values: ["001","101","002","102","003","103"]
      description: "001=Backlight Off, 101=Backlight On, 002=Freeze Off, 102=Freeze On, 003=Touch Off, 103=Touch On"

# ============================================================
# A. Basic Get functions
# ============================================================

- id: brightness_query
  label: Get Brightness
  kind: query
  command: "8{id}gb000\r"
  params: []

- id: backlight_query
  label: Get Backlight
  kind: query
  command: "8{id}aB000\r"
  params: []
  notes: "Uses command type 'a' (0x61), paired with Set-Backlight type 'A'."

- id: volume_query
  label: Get Volume
  kind: query
  command: "8{id}gf000\r"
  params: []

- id: mute_query
  label: Get Mute
  kind: query
  command: "8{id}gg000\r"
  params: []

- id: input_select_query
  label: Get Input Select
  kind: query
  command: "8{id}gj000\r"
  params: []
  notes: "Reply 1st digit: 0=no signal, 1=signal detected. 2nd-3rd digit: source index (see Set Input Select)."

- id: power_status_query
  label: Get Power Status
  kind: query
  command: "8{id}gl000\r"
  params: []

- id: remote_control_mode_query
  label: Get Remote Control Mode
  kind: query
  command: "8{id}gn000\r"
  params: []

- id: power_lock_query
  label: Get Power Lock
  kind: query
  command: "8{id}go000\r"
  params: []

- id: button_lock_query
  label: Get Button Lock
  kind: query
  command: "8{id}gp000\r"
  params: []

- id: menu_lock_query
  label: Get Menu Lock
  kind: query
  command: "8{id}gq000\r"
  params: []

- id: ack_query
  label: Get ACK (Comm Test)
  kind: query
  command: "8{id}gz000\r"
  params: []
  notes: "Used purely to test the communication link."

- id: thermal_query
  label: Get Thermal
  kind: query
  command: "8{id}g0000\r"
  params: []
  notes: "Reply 000-100 = 0..+100 °C; -01..-99 = negative °C."

- id: operation_hour_query
  label: Get Operation Hour
  kind: query
  command: "8{id}g1000\r"
  params: []
  notes: "Reply in 32-byte format; 6-digit accumulated hours (000,001-999,999). Not reset on FW update or factory init."

- id: device_name_query
  label: Get Device Name
  kind: query
  command: "8{id}g4000\r"
  params: []
  notes: "Reply in 32-byte format."

- id: mac_address_query
  label: Get MAC Address
  kind: query
  command: "8{id}g5000\r"
  params: []
  notes: "LAN models only. Reply in 32-byte format."

- id: ip_address_query
  label: Get IP Address
  kind: query
  command: "8{id}g6000\r"
  params: []
  notes: "LAN models only. Reply in 32-byte format."

- id: serial_number_query
  label: Get Serial Number
  kind: query
  command: "8{id}g7000\r"
  params: []
  notes: "Reply in 32-byte format."

- id: fw_version_query
  label: Get Firmware Version
  kind: query
  command: "8{id}g8000\r"
  params: []
  notes: "Reply in 32-byte format."

# ============================================================
# B. Optional Get functions
# ============================================================

- id: contrast_query
  label: Get Contrast
  kind: query
  command: "8{id}ga000\r"
  params: []

- id: sharpness_query
  label: Get Sharpness
  kind: query
  command: "8{id}gc000\r"
  params: []

- id: color_query
  label: Get Color
  kind: query
  command: "8{id}gd000\r"
  params: []

- id: tint_query
  label: Get Tint
  kind: query
  command: "8{id}ge000\r"
  params: []

- id: backlight_on_off_query
  label: Get Backlight On/Off
  kind: query
  command: "8{id}gh000\r"
  params: []

- id: freeze_on_off_query
  label: Get Freeze On/Off
  kind: query
  command: "8{id}gi000\r"
  params: []

- id: pip_mode_query
  label: Get PIP Mode
  kind: query
  command: "8{id}gt000\r"
  params: []

- id: pip_input_query
  label: Get PIP Input
  kind: query
  command: "8{id}gu000\r"
  params: []

- id: tiling_mode_query
  label: Get Tiling Mode
  kind: query
  command: "8{id}gv000\r"
  params: []

- id: tiling_compensation_query
  label: Get Tiling Compensation
  kind: query
  command: "8{id}gw000\r"
  params: []

- id: tiling_h_by_v_query
  label: Get Tiling H by V Monitors
  kind: query
  command: "8{id}gx000\r"
  params: []

- id: tiling_position_query
  label: Get Tiling Position
  kind: query
  command: "8{id}gy000\r"
  params: []

- id: date_year_query
  label: Get Date - Year
  kind: query
  command: "8{id}g2Y00\r"
  params: []

- id: date_month_query
  label: Get Date - Month
  kind: query
  command: "8{id}g2M00\r"
  params: []

- id: date_day_query
  label: Get Date - Day
  kind: query
  command: "8{id}g2D00\r"
  params: []

- id: time_hour_query
  label: Get Time - Hour
  kind: query
  command: "8{id}g3H00\r"
  params: []

- id: time_min_query
  label: Get Time - Minute
  kind: query
  command: "8{id}g3M00\r"
  params: []

- id: time_sec_query
  label: Get Time - Second
  kind: query
  command: "8{id}g3S00\r"
  params: []

- id: smart_hub_query
  label: Get Smart Hub
  kind: query
  command: "8{id}g:{value}\r"
  params:
    - name: value
      type: enum
      values: ["000","00A","00B","00C","00D"]
      description: "000=all, 00A=Amb_Temp, 00B=Amb_Humidity, 00C=Amb_Light, 00D=Amb_PIR detection"
  notes: "Reply in 32-byte format; each sub-item is 6 bytes."

- id: function_on_off_query
  label: Get Function On/Off
  kind: query
  command: "8{id}g={value}\r"
  params:
    - name: value
      type: enum
      values: ["001","002","003"]
      description: "Send 001 to query Backlight status, 002 for Freeze, 003 for Touch"

# ============================================================
# Wake-on-LAN (UDP port 9, alternative to SET power-on)
# ============================================================

- id: wake_on_lan
  label: Wake on LAN
  kind: action
  command: "FF FF FF FF FF FF {mac} {mac} {mac} {mac} {mac} {mac} {mac} {mac} {mac} {mac} {mac} {mac} {mac} {mac} {mac} {mac} 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params:
    - name: mac
      type: bytes
      description: "Target display MAC address (6 bytes). Repeated 16× per WOL standard."
  notes: "126-byte UDP packet to port 9. Layout: 6 bytes 0xFF + 16 repetitions of the 6-byte MAC + 24 bytes 0x00."
```

## Feedbacks
```yaml
- id: command_ack
  type: enum
  values: ["+","-"]
  description: "Per-command response: '+' (0x2B) = valid command accepted, '-' (0x2D) = invalid command rejected. Followed by CR. Frame: 8{id}{+|-}\r"

- id: power_state
  type: enum
  values: ["000","001"]
  description: "000=STBY, 001=ON - from Get-Power Status reply"

- id: input_select_state
  type: string
  description: "Reply from Get-Input Select. 1st digit: 0=no signal, 1=signal detected. 2nd-3rd digit: source index (see Set Input Select enum)."

- id: brightness_level
  type: integer
  description: "0-100 - from Get-Brightness reply"

- id: backlight_level
  type: integer
  description: "0-100 - from Get-Backlight reply"

- id: volume_level
  type: integer
  description: "0-100 - from Get-Volume reply"

- id: mute_state
  type: enum
  values: ["000","001"]
  description: "000=Off, 001=On - from Get-Mute reply"

- id: remote_control_mode
  type: enum
  values: ["000","001","002"]
  description: "000=Disable, 001=Enable, 002=Pass through"

- id: power_lock_state
  type: enum
  values: ["000","001"]
  description: "000=Unlock, 001=Lock"

- id: button_lock_state
  type: enum
  values: ["000","001"]
  description: "000=Unlock, 001=Lock"

- id: menu_lock_state
  type: enum
  values: ["000","001"]
  description: "000=Unlock, 001=Lock"

- id: thermal_celsius
  type: string
  description: "Reply 000-100 = 0..+100 °C; -01..-99 = negative °C."

- id: operation_hour_count
  type: integer
  description: "Accumulated operation hours, 6-digit integer (000,001-999,999). 32-byte reply format."

- id: device_name
  type: string
  description: "Device name string. 32-byte reply format."

- id: mac_address
  type: string
  description: "12 hex chars (no separators) of MAC address. 32-byte reply format."

- id: ip_address
  type: string
  description: "Dotted-quad IPv4 address. 32-byte reply format."

- id: serial_number
  type: string
  description: "Device serial number. 32-byte reply format."

- id: fw_version
  type: string
  description: "Firmware version string. 32-byte reply format."

- id: contrast_level
  type: integer
  description: "0-100"

- id: sharpness_level
  type: integer
  description: "0-100"

- id: color_level
  type: integer
  description: "0-100"

- id: tint_level
  type: integer
  description: "0-100"

- id: backlight_on_off_state
  type: enum
  values: ["000","001"]
  description: "000=Off, 001=On"

- id: freeze_on_off_state
  type: enum
  values: ["000","001"]
  description: "000=Off, 001=On"

- id: pip_mode_state
  type: enum
  values: ["000","001","002"]
  description: "000=OFF, 001=PIP/POP, 002=PBP"

- id: pip_input_state
  type: string
  description: "Source index, same encoding as Get-Input Select."

- id: tiling_mode_state
  type: enum
  values: ["000","001"]
  description: "000=OFF, 001=ON"

- id: tiling_compensation_state
  type: enum
  values: ["000","001"]
  description: "000=OFF, 001=ON"

- id: tiling_h_by_v_state
  type: string
  description: "01x-09x for H, 0x1-0x9 for V"

- id: tiling_position_state
  type: string
  description: "000=OFF, 001-025 = position"

- id: date_state
  type: string
  description: "Y-prefix year (Y17-Y99), M-prefix month (M01-M12), D-prefix day (D01-D31)"

- id: time_state
  type: string
  description: "H-prefix hour (H00-H23), M-prefix min (M00-M59), S-prefix sec (S00-S59)"

- id: smart_hub_data
  type: string
  description: "Concatenation of Amb_Temp (A-prefix), Amb_Humidity (B-prefix), Amb_Light (C-prefix), Amb_PIR (D-prefix). Each sub-item 6 bytes. 32-byte reply format."

- id: function_on_off_state
  type: enum
  values: ["001","101","002","102","003","103"]
  description: "001=Backlight Off, 101=Backlight On, 002=Freeze Off, 102=Freeze On, 003=Touch Off, 103=Touch On"
```

## Variables
```yaml
# UNRESOLVED: source models all writable parameters as Set actions with discrete codes;
# no separate variable/parameter address space exposed beyond the action set.
```

## Events
```yaml
# Auto Reply [*3.2.1] - display sends updated data/status without a GET query
# whenever the value is changed via RCU, front keys, or touch screen.
# Format: same as the corresponding Get reply frame (8{id}r{code}{value}\r).
- id: auto_reply_power
  trigger: power state changed by user
  payload_command_code: "l"
  description: "Power on/off auto-notification"

- id: auto_reply_input
  trigger: input source changed by user
  payload_command_code: "j"
  description: "Input Select auto-notification"

- id: auto_reply_brightness
  trigger: brightness changed by user
  payload_command_code: "b"
  description: "Brightness auto-notification"

- id: auto_reply_backlight
  trigger: backlight changed by user
  payload_command_code: "B"
  description: "Backlight auto-notification (type 'a')"

- id: auto_reply_volume
  trigger: volume changed by user
  payload_command_code: "f"
  description: "Volume auto-notification"

- id: auto_reply_mute
  trigger: mute changed by user
  payload_command_code: "g"
  description: "Mute on/off auto-notification"

# Remote Control pass-through (when Set-Remote-Control = 002)
# 7-byte packet, format: 6{id}p{RCU_code1_MSB}{RCU_code2_LSB}\r
- id: ir_pass_through
  trigger: RCU button pressed while Remote Control mode = Pass through
  frame: "6{id}p{rcu_code_msb}{rcu_code_lsb}\r"
  description: "Display forwards the RCU key code to host instead of acting on it locally."
  rcu_codes:
    "01": "1"
    "02": "2"
    "03": "3"
    "04": "4"
    "05": "5"
    "06": "6"
    "07": "7"
    "08": "8"
    "09": "9"
    "0A": "0"
    "0B": "-"
    "0C": "RECALL (LAST)"
    "0D": "INFO (DISPLAY)"
    "0F": "ASPECT (ZOOM, SIZE)"
    "10": "VOLUME UP (+)"
    "11": "VOLUME DOWN (-)"
    "12": "MUTE"
    "13": "CHANNEL/PAGE UP (+) / BRIGHTNESS+"
    "14": "CHANNEL/PAGE DOWN (-) / BRIGHTNESS-"
    "15": "POWER"
    "16": "SOURCES (INPUTS)"
    "19": "SLEEP"
    "1A": "MENU"
    "1B": "UP"
    "1C": "DOWN"
    "1D": "LEFT (-)"
    "1E": "RIGHT (+)"
    "1F": "OK (ENTER, SET)"
    "20": "EXIT"
    "2C": "RED (F1)"
    "2D": "GREEN (F2)"
    "2E": "YELLOW (F3)"
    "2F": "BLUE (F4)"
  notes: "Pass-through IR code differs from native RCU key code. Special POWER handling: when display is OFF and IR POWER received → display turns itself on, then forwards POWER code; when ON → forwards POWER code, then turns off. SET-POWER-LOCK suppresses POWER key entirely. VOLUME UP/DOWN auto-repeats while held."
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step macro sequences beyond
# the per-field date/time set examples (Year+Month+Day, Hour+Min+Sec), which
# are already captured as individual actions.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source documents lock-mode behaviors but no electrical safety
# warnings, voltage/current interlocks, or sequenced power-on procedures.
# Operationally relevant lock semantics (Power-Lock prevents OSD reset, blocks
# RCU/front-panel POWER, keeps RS232 SET-POWER working but does not release
# lock) are captured in Notes and per-action notes rather than safety
# interlocks.
```

## Notes
- Frame is invariant 9 bytes ASCII: `8 {ID2} {type1} {code1} {value3} \r`. Length byte `8` (0x38) is the count excluding CR.
- Broadcast: ID=`99` applies to all displays; only ID=`01` replies, using ID=`01` in its reply frame.
- ACK is `8{id}+\r` (length 4 → byte `4` = 0x34); NAK is `8{id}-\r` (same length byte).
- Backlight command pair uniquely uses uppercase `A` (set) / lowercase `a` (get) instead of `s`/`g` — verify on real hardware before treating as a typo.
- Long replies (Device Name, MAC, IP, Serial, FW version, Operation Hour, Smart Hub) use a "new 32-byte format" — exact byte layout shown by example only; length byte for those replies is `2 0 1` (0x32 0x30 0x31) in the examples.
- IFP9850-3 may not implement every command in this generic LFD doc. Vendor note: "Some product may not support full command set due to platform constrain. Please see the individual product spec or user manual for details."
- Power-on via LAN may require the display to be in a specific standby mode; Wake-on-LAN (UDP port 9, MAC magic packet) is offered as an alternative.
- Default LFD ID is `01`; the ID range is `01`-`98` configured via OSD.

<!-- UNRESOLVED:
  - Firmware version compatibility range and minimum protocol revision required for IFP9850-3.
  - Per-SKU subset of the generic command set that the IFP9850-3 actually implements.
  - Default network configuration (DHCP vs static, default IP) for LAN control.
  - Behavior of Length byte for replies longer than 9 bytes is shown only by example (0x32 0x30 0x31 = "201") — no general formula stated.
  - Whether broadcast ID=99 is supported over TCP/IP in addition to RS-232.
-->

## Provenance

```yaml
source_domains:
  - viewsonicvsa.freshdesk.com
  - public.shopcdn.co.uk
  - manuals.viewsonic.com
  - mcgrp.ru
source_urls:
  - https://viewsonicvsa.freshdesk.com/helpdesk/attachments/43447586827
  - https://public.shopcdn.co.uk/avpm/1619007581it-ifp9850-3.pdf
  - https://manuals.viewsonic.com/IFP9850-4_RS-232_Protocols
  - https://mcgrp.ru/files/viewer/903083/93
retrieved_at: 2026-05-19T05:55:32.807Z
last_checked_at: 2026-06-02T07:06:52.499Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:52.499Z
matched_actions: 82
action_count: 82
confidence: medium
summary: "All 82 spec actions matched literally to source commands with correct opcodes; transport parameters verified; source command inventory fully represented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware-version compatibility range, default LFD ID assignment for this specific SKU, exact supported subset of input sources for IFP9850-3 (source is generic family doc)"
- "source models all writable parameters as Set actions with discrete codes;"
- "source documents no explicit multi-step macro sequences beyond"
- "source documents lock-mode behaviors but no electrical safety"
- "- Firmware version compatibility range and minimum protocol revision required for IFP9850-3."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
