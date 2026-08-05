---
spec_id: admin/viewsonic-cde6502
schema_version: ai4av-public-spec-v1
revision: 1
title: "ViewSonic CDE6502 Control Spec"
manufacturer: ViewSonic
model_family: CDE6502
aliases: []
compatible_with:
  manufacturers:
    - ViewSonic
  models:
    - CDE6502
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - manuals.viewsonic.com
  - pdf.projectorpoint.co.uk
  - mans.io
  - manua.ls
source_urls:
  - https://manuals.viewsonic.com/IFP32_RS-232_Protocols
  - https://manuals.viewsonic.com/LDM_RS-232_Protocol
  - http://pdf.projectorpoint.co.uk/pub/media/pp_products/displays/viewsonic/cde6502/viewsonic_cde6502-manual.pdf
  - https://mans.io/files/viewer/467356/29
  - https://www.manua.ls/viewsonic/cde6502/manual
retrieved_at: 2026-07-17T03:45:02.011Z
last_checked_at: 2026-07-22T07:56:23.966Z
generated_at: 2026-07-22T07:56:23.966Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific CDE6502 model confirmed only by filename; document is generic IFP32 RS-232 protocol applicable to ViewSonic LFD line. Backlight Set command (0x42) collides with Remote Control Set command (0x42) in the source table — see set_backlight note."
  - "CDE6502-specific model confirmation — source doc is generic IFP32 protocol shared across ViewSonic LFD line."
  - "Set-Backlight (0x42) and Set-Remote-Control (0x42) share the same command byte in the source table — source ambiguity, needs device verification."
  - "Get-Menu-Lock listed with cmd 0x6C, same as Get-Power-Status — likely source typo."
  - "Get-IP-Address (0x36) and Get-RS232-Version example (0x36) share cmd byte — likely source typo."
  - "Firmware version compatibility range not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-22T07:56:23.966Z
  matched_actions: 78
  action_count: 78
  confidence: medium
  summary: "All 78 spec actions matched in source protocol tables; transport parameters verified; complete command coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-17
---

# ViewSonic CDE6502 Control Spec

## Summary
ViewSonic CDE6502 large-format commercial display supporting RS-232 and TCP/IP control. Protocol uses a 9-byte ASCII packet: `[Len=0x38][ID_hi][ID_lo][Type][Cmd][v1][v2][v3][CR=0x0D]`. Set command type is `s` (0x73), Get is `g` (0x67), Get reply is `r` (0x72), Set ack is `+` (0x2B valid) / `-` (0x2D invalid). Broadcast ID `99` applies to all displays (only ID#1 replies). Auto-reply events fire on power, input, brightness, backlight, volume, and mute changes.

<!-- UNRESOLVED: specific CDE6502 model confirmed only by filename; document is generic IFP32 RS-232 protocol applicable to ViewSonic LFD line. Backlight Set command (0x42) collides with Remote Control Set command (0x42) in the source table — see set_backlight note. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 5000
auth:
  type: none  # inferred: source states "Logon Credentials: No"
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# All Set-Function packets: 0x38 {id2}{id3} 0x73 {cmd} {v1}{v2}{v3} 0x0D
# ID default 01; broadcast 99. Value is 3 ASCII digits unless noted.

- id: power_on
  label: Power On
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x21 0x30 0x30 0x31 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits (01~98, default 01, 99=broadcast)"
  notes: "Power-on via LAN may work only under specific mode (see UG). WOL by MAC available as alternative."

- id: power_off
  label: Power Off (Standby)
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x21 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits (01~98, default 01, 99=broadcast)"

- id: set_power
  label: Set Power State
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x21 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000=STBY, 001=ON"

- id: select_input
  label: Select Input
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x22 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: input
      type: integer
      description: "000: TV 001: AV 002: S-Video 003: YPbPr 004: HDMI1 014: HDMI2 024: HDMI3 034: HDMI4 005: DVI 006: VGA1 016: VGA2 026: VGA3 007: Slot-in PC/OPS/HDBT 008: Internal memory 009: DP 00A: Embedded/Main (Android)"

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x24 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000~100, 900=bright down (-1), 901=bright up (+1)"

- id: set_backlight
  label: Set Backlight
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x42 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000~100"
  notes: "Source table shows Type col 'A', Code col 'B', Hex 42 for Backlight - hex 42='B'. NOTE: hex 0x42 collides with Set-Remote-Control command byte; treat as source ambiguity. For Android platform main mode = backlight, other sources = brightness."

- id: set_power_lock
  label: Set Power Lock
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x34 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000=Unlock, 001=Lock"

- id: set_volume
  label: Set Volume
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x35 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000~100, 900=volume down (-1), 901=volume up (+1)"

- id: set_mute
  label: Set Mute
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x36 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000=OFF, 001=ON"

- id: set_button_lock
  label: Set Button Lock
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x38 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000=Unlock, 001=Lock"

- id: set_menu_lock
  label: Set Menu Lock
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x3E {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000=Unlock, 001=Lock"

- id: send_number
  label: Send Number
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x40 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000~009"

- id: send_key_pad
  label: Send Key Pad
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x41 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: key
      type: integer
      description: "000: UP 001: DOWN 002: LEFT 003: RIGHT 004: ENTER 005: INPUT 006: MENU/(EXIT) 007: EXIT"

- id: set_remote_control
  label: Set Remote Control
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x42 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000: Disable 001: Enable 002: Pass through"
  notes: "Disable: RCU no function. Enable: RCU controls normally. Pass through: Display bypasses RC code to connected device via RS-232, does not react itself. NOTE: cmd byte 0x42 collides with Set-Backlight in source table."

- id: restore_default
  label: Restore Default
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x7E 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  notes: "Value must be 000. Recovers to factory setting."

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x23 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000~100"

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x25 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000~100"

- id: set_color
  label: Set Color
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x26 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000~100"

- id: set_tint
  label: Set Tint
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x27 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000~100"

- id: set_backlight_on_off
  label: Set Backlight On/Off
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x28 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000=Off, 001=On"

- id: set_color_mode
  label: Set Color Mode
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x29 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000: Normal 001: Warm 002: Cold 003: Personal"

- id: set_surround_sound
  label: Set Surround Sound
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x2D {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000~100"

- id: set_bass
  label: Set Bass
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x2E {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000~100"

- id: set_treble
  label: Set Treble
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x2F {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000~100"

- id: set_balance
  label: Set Balance
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x30 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000~100 (050=central)"

- id: set_picture_size
  label: Set Picture Size
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x31 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000: FULL (16:9) 001: NORMAL (4:3) 002: REAL (1:1)"

- id: set_osd_language
  label: Set OSD Language
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x32 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000: English 001: French 002: Spanish"

- id: set_pip_mode
  label: Set PIP Mode
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x39 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000: OFF 001: PIP(POP) 002: PBP"

- id: set_pip_sound_select
  label: Set PIP Sound Select
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x3A {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000: Main 001: Sub"

- id: set_pip_position
  label: Set PIP Position
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x3B {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000: Up 001: Down 002: Left 003: Right"

- id: set_pip_input
  label: Set PIP Input
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x37 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: input
      type: integer
      description: "Same range as Set-Input select"

- id: set_tiling_mode
  label: Set Tiling Mode
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x50 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000: OFF 001: ON (video wall)"

- id: set_tiling_compensation
  label: Set Tiling Compensation
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x51 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "000: OFF 001: ON (bezel width compensation)"

- id: set_tiling_h_monitors
  label: Set Tiling H Monitors
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x52 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "01x~09x (2nd digit H monitors 1~9). Source combines H+V in one cmd 0x52 row."
  notes: "Source lists H and V monitors as a single row (cmd 0x52) encoding both digits. This action targets the H (2nd) digit."

- id: set_tiling_v_monitors
  label: Set Tiling V Monitors
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x52 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "0x1~0x9 (3rd digit V monitors 1~9). Source combines H+V in one cmd 0x52 row."
  notes: "Source lists H and V monitors as a single row (cmd 0x52) encoding both digits. This action targets the V (3rd) digit."

- id: set_tiling_position
  label: Set Tiling Position
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x53 {v1}{v2}{v3} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: integer
      description: "001~025 (copy screen of Position# to identified display)"

- id: set_date_year
  label: Set Date Year
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x56 0x59 {yy2} {yy1} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: string
      description: "Y17~Y99 (last 2 digits, (20)17~(20)99)"
  notes: "Value prefix 'Y' is literal ASCII 0x59 in the packet. Example Y17 → bytes 0x59 0x31 0x37."

- id: set_date_month
  label: Set Date Month
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x56 0x4D {m2} {m1} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: string
      description: "M01~M12"
  notes: "Value prefix 'M' is literal ASCII 0x4D. Example M03 → bytes 0x4D 0x30 0x33."

- id: set_date_day
  label: Set Date Day
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x56 0x44 {d2} {d1} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: string
      description: "D01~D31"
  notes: "Value prefix 'D' is literal ASCII 0x44. Example D15 → bytes 0x44 0x31 0x35."

- id: set_time_hour
  label: Set Time Hour
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x57 0x48 {h2} {h1} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: string
      description: "H00~H23 (24-hr format)"
  notes: "Value prefix 'H' is literal ASCII 0x48. Example H16 → bytes 0x48 0x31 0x36."

- id: set_time_minute
  label: Set Time Minute
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x57 0x4D {m2} {m1} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: string
      description: "M00~M59"
  notes: "Value prefix 'M' is literal ASCII 0x4D. Example M27 → bytes 0x4D 0x32 0x37."

- id: set_time_second
  label: Set Time Second
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x57 0x53 {s2} {s1} 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: value
      type: string
      description: "S00~S59"
  notes: "Value prefix 'S' is literal ASCII 0x53. Example S59 → bytes 0x53 0x35 0x39."

# ---- Get-Function queries (added in upgrade pass) ----
# All Get packets: 0x38 {id_hi}{id_lo} 0x67 {cmd} 0x30 0x30 0x30 0x0D (value always 000)
# Valid reply: 0x38 {id_hi}{id_lo} 0x72 {cmd} {v1}{v2}{v3} 0x0D

- id: get_brightness
  label: Get Brightness
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x62 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "integer 000~100 (reply cmd 0x62, type r)"

- id: get_backlight
  label: Get Backlight
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x42 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "integer 000~100 (reply cmd 0x42, type r)"

- id: get_volume
  label: Get Volume
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x66 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "integer 000~100 (reply cmd 0x66, type r)"

- id: get_mute
  label: Get Mute
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x67 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "000: Off 001: On (reply cmd 0x67, type r)"

- id: get_input_select
  label: Get Input Select
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x6A 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "3 digits: 1st = signal detection (0=no signal, 1=detected); 2nd/3rd = input source code (see Set-Input). Reply cmd 0x6A, type r."

- id: get_power_status
  label: Get Power Status (ON/STBY)
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x6C 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "001: ON 000: STBY (reply cmd 0x6C, type r)"

- id: get_remote_control
  label: Get Remote Control Mode
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x6E 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "000: Disable 001: Enable 002: Pass through (reply cmd 0x6E, type r)"

- id: get_power_lock
  label: Get Power Lock
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x6F 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "000: Unlock 001: Lock (reply cmd 0x6F, type r)"

- id: get_button_lock
  label: Get Button Lock
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x70 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "000: Unlock 001: Lock (reply cmd 0x70, type r)"

- id: get_menu_lock
  label: Get Menu Lock
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x6C 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "000: Unlock 001: Lock (reply cmd 0x6C, type r)"
  notes: "Source table lists Get-Menu-Lock with same cmd byte 0x6C as Get-Power-Status - likely source typo. Flag for device verification."

- id: get_ack
  label: Get ACK (Link Test)
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x7A 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "000 (reply cmd 0x7A, type r). Used to test the communication link."

- id: get_thermal
  label: Get Thermal
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x30 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "000~100 = 0~+100 deg C; -01~-99 = -1~-99 deg C (reply cmd 0x30, type r)"

- id: get_operation_time
  label: Get Operation Time
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x31 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "Accumulated hours, 6-digit integer (000001~999999). Reply in 32-byte format. Example reply: 0x32 0x30 0x31 0x72 0x31 [6 ASCII digits] 0x00...0x00 0x0D. Cannot be reset on FW update / factory init."

- id: get_device_name
  label: Get Device Name
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x34 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "ASCII string, 32-byte reply format. Example reply for 'CDE-5500': 0x32 0x30 0x31 0x72 0x34 0x43 0x44 0x45 0x2D 0x35 0x35 0x30 0x30 0x00...0x00 0x0D"

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x35 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "ASCII MAC, 32-byte reply format. Example for 00:11:22:aa:bb:cc: 0x32 0x30 0x31 0x72 0x35 0x30 0x30 0x31 0x31 0x32 0x32 0x61 0x61 0x62 0x62 0x63 0x63 0x00...0x00 0x0D. LAN models only."

- id: get_ip_address
  label: Get IP Address
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x36 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "ASCII dotted-quad, 32-byte reply format. Example for 192.168.100.2: 0x32 0x30 0x31 0x72 0x36 0x31 0x39 0x32 0x2E 0x31 0x36 0x38 0x2E 0x31 0x30 0x30 0x2E 0x32 0x00...0x00 0x0D. LAN models only."

- id: get_serial_number
  label: Get Serial Number
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x37 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "ASCII string, 32-byte reply format. Example for 'ABC180212345': 0x32 0x30 0x31 0x72 0x37 0x41 0x42 0x43 0x31 0x38 0x30 0x32 0x31 0x32 0x33 0x34 0x35 0x00...0x00 0x0D"

- id: get_fw_version
  label: Get Firmware Version
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x38 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "ASCII version string, 32-byte reply format. Example for '3.02.001': 0x32 0x30 0x31 0x72 0x38 0x33 0x2E 0x30 0x32 0x2E 0x30 0x30 0x31 0x00...0x00 0x0D"

- id: get_contrast
  label: Get Contrast
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x61 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "integer 000~100 (reply cmd 0x61, type r)"

- id: get_sharpness
  label: Get Sharpness
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x63 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "integer 000~100 (reply cmd 0x63, type r)"

- id: get_color
  label: Get Color
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x64 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "integer 000~100 (reply cmd 0x64, type r)"

- id: get_tint
  label: Get Tint
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x65 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "integer 000~100 (reply cmd 0x65, type r)"

- id: get_backlight_on_off
  label: Get Backlight On/Off
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x68 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "000: Off 001: On (reply cmd 0x68, type r)"

- id: get_pip_mode
  label: Get PIP Mode
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x74 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "000: OFF 001: PIP(POP) 002: PBP (reply cmd 0x74, type r)"

- id: get_pip_input
  label: Get PIP Input
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x75 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "input code, see Set-Input select (reply cmd 0x75, type r)"

- id: get_tiling_mode
  label: Get Tiling Mode
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x76 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "000: OFF 001: ON (reply cmd 0x76, type r)"

- id: get_tiling_compensation
  label: Get Tiling Compensation
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x77 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "000: OFF 001: ON (reply cmd 0x77, type r)"

- id: get_tiling_h_v_monitors
  label: Get Tiling H by V Monitors
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x78 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "3 digits: 2nd = H monitors (1~9), 3rd = V monitors (1~9) (reply cmd 0x78, type r)"

- id: get_tiling_position
  label: Get Tiling Position
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x79 0x30 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "000: OFF, 001~025 position (reply cmd 0x79, type r)"

- id: get_date_year
  label: Get Date Year
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x32 0x59 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "Y-prefix + 2 digits, e.g. Y17 (reply cmd 0x32 type r, value col 2nd byte = 0x59 'Y')"

- id: get_date_month
  label: Get Date Month
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x32 0x4D 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "M-prefix + 2 digits, e.g. M03 (reply cmd 0x32, value 2nd byte = 0x4D 'M')"

- id: get_date_day
  label: Get Date Day
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x32 0x44 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "D-prefix + 2 digits, e.g. D15 (reply cmd 0x32, value 2nd byte = 0x44 'D')"

- id: get_time_hour
  label: Get Time Hour
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x33 0x48 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "H-prefix + 2 digits, e.g. H16 (reply cmd 0x33, value 2nd byte = 0x48 'H')"

- id: get_time_minute
  label: Get Time Minute
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x33 0x4D 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "M-prefix + 2 digits, e.g. M27 (reply cmd 0x33, value 2nd byte = 0x4D 'M')"

- id: get_time_second
  label: Get Time Second
  kind: query
  command: "0x38 {id_hi}{id_lo} 0x67 0x33 0x53 0x30 0x30 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  returns: "S-prefix + 2 digits, e.g. S59 (reply cmd 0x33, value 2nd byte = 0x53 'S')"

- id: ir_pass_through
  label: IR Pass Through (enable mode then listen)
  kind: action
  command: "0x38 {id_hi}{id_lo} 0x73 0x42 0x30 0x30 0x32 0x0D"
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
  notes: "Sets Remote Control mode to 002 (Pass through). Once active, RCU button presses produce 7-byte 'p' (0x70) reply packets - see Events: ir_pass_through_event. VOL+/VOL- repeat while held."
```

## Feedbacks
```yaml
- id: command_ack
  label: Command Acknowledgement
  type: enum
  values:
    - valid
    - invalid
  notes: "Valid reply: 0x34 {id_hi}{id_lo} 0x2B 0x0D ('+'). Invalid reply: 0x34 {id_hi}{id_lo} 0x2D 0x0D ('-'). Length byte 0x34='4' (4 bytes follow)."

- id: power_state
  label: Power State
  type: enum
  values:
    - ON
    - STBY

- id: input_status
  label: Input Select Status
  type: object
  fields:
    signal_detected: boolean
    input_source: integer
  values_description: "1st digit: 0=no signal, 1=signal detected; 2nd/3rd digit: input source code"

- id: mute_state
  label: Mute State
  type: enum
  values:
    - OFF
    - ON

- id: remote_control_mode
  label: Remote Control Mode
  type: enum
  values:
    - Disable
    - Enable
    - Pass_through

- id: power_lock_state
  label: Power Lock State
  type: enum
  values:
    - Unlock
    - Lock

- id: button_lock_state
  label: Button Lock State
  type: enum
  values:
    - Unlock
    - Lock

- id: menu_lock_state
  label: Menu Lock State
  type: enum
  values:
    - Unlock
    - Lock
```

## Variables
```yaml
- id: brightness
  label: Brightness
  type: integer
  range: 000~100

- id: backlight
  label: Backlight
  type: integer
  range: 000~100

- id: volume
  label: Volume
  type: integer
  range: 000~100

- id: contrast
  label: Contrast
  type: integer
  range: 000~100

- id: sharpness
  label: Sharpness
  type: integer
  range: 000~100

- id: color
  label: Color
  type: integer
  range: 000~100

- id: tint
  label: Tint
  type: integer
  range: 000~100

- id: backlight_on_off
  label: Backlight On/Off
  type: enum
  values:
    - Off
    - On

- id: color_mode
  label: Color Mode
  type: enum
  values:
    - Normal
    - Warm
    - Cold
    - Personal

- id: surround_sound
  label: Surround Sound
  type: integer
  range: 000~100

- id: bass
  label: Bass
  type: integer
  range: 000~100

- id: treble
  label: Treble
  type: integer
  range: 000~100

- id: balance
  label: Balance
  type: integer
  range: 000~100
  note: "050 is central"

- id: picture_size
  label: Picture Size
  type: enum
  values:
    - FULL_16_9
    - NORMAL_4_3
    - REAL_1_1

- id: osd_language
  label: OSD Language
  type: enum
  values:
    - English
    - French
    - Spanish

- id: pip_mode
  label: PIP Mode
  type: enum
  values:
    - OFF
    - PIP_POP
    - PBP

- id: pip_sound_select
  label: PIP Sound Select
  type: enum
  values:
    - Main
    - Sub

- id: pip_position
  label: PIP Position
  type: enum
  values:
    - Up
    - Down
    - Left
    - Right

- id: pip_input
  label: PIP Input
  type: integer

- id: tiling_mode
  label: Tiling Mode
  type: enum
  values:
    - OFF
    - ON

- id: tiling_compensation
  label: Tiling Compensation
  type: enum
  values:
    - OFF
    - ON

- id: tiling_h_monitors
  label: Tiling H Monitors
  type: integer

- id: tiling_v_monitors
  label: Tiling V Monitors
  type: integer

- id: tiling_position
  label: Tiling Position
  type: integer
  range: 001~025

- id: date
  label: Date
  type: object
  fields:
    year: string
    month: string
    day: string

- id: time
  label: Time
  type: object
  fields:
    hour: string
    minute: string
    second: string

- id: thermal
  label: Thermal
  type: integer
  note: "0~+100 deg C = 000~100; -1~-99 deg C = -01~-99"

- id: operation_hours
  label: Operation Hours
  type: integer
  note: "000,001~999,999 hours; 6-digit integer"

- id: device_name
  label: Device Name
  type: string

- id: mac_address
  label: MAC Address
  type: string
  note: "Format 00:11:22:aa:bb:cc"

- id: ip_address
  label: IP Address
  type: string
  note: "Format xxx.xxx.xxx.xxx"

- id: serial_number
  label: Serial Number
  type: string

- id: fw_version
  label: Firmware Version
  type: string

- id: rs232_version
  label: RS232 Protocol Version
  type: string
  note: "Added in upgrade pass. Source Get-RS232-version example: send 0x38 0x30 0x31 0x67 0x36 0x30 0x30 0x30 0x0D, reply 0x38 0x30 0x31 0x72 0x36 0x33 0x30 0x31 0x0D ('301'). NOTE: cmd byte 0x36 collides with Get-IP-Address (0x36) in source table - likely source typo; flagged for device verification."
```

## Events
```yaml
# Auto-reply: display sends updated status unsolicited when changed via RCU/front keys/touch.
- id: event_power_change
  label: Power State Changed
  params:
    - name: state
      type: string
      description: ON or STBY

- id: event_input_change
  label: Input Changed
  params:
    - name: input
      type: integer

- id: event_brightness_change
  label: Brightness Changed
  params:
    - name: value
      type: integer

- id: event_backlight_change
  label: Backlight Changed
  params:
    - name: value
      type: integer

- id: event_volume_change
  label: Volume Changed
  params:
    - name: value
      type: integer

- id: event_mute_change
  label: Mute Changed
  params:
    - name: state
      type: string

# IR Pass-Through event: 7-byte packet when RCU key pressed while in Pass-through mode.
# Format: 0x36 {id_hi}{id_lo} 0x70 {rcu_msb} {rcu_lsb} 0x0D
- id: ir_pass_through_event
  label: IR Pass-Through RCU Code
  params:
    - name: id
      type: string
      description: "LFD ID, 2 ASCII digits"
    - name: rcu_code
      type: integer
      description: "RCU key code (hex, see table below). VOL+/VOL- (0x10/0x11) repeat while held."
  notes: |
    RCU pass-through code table (from source):
      01=Key1 02=Key2 03=Key3 04=Key4 05=Key5 06=Key6 07=Key7 08=Key8 09=Key9
      0A=Key0 0B='-' 0C=RECALL(LAST) 0D=INFO(DISPLAY) 0E=(reserved)
      0F=ASPECT(ZOOM,SIZE) 10=VOL+ 11=VOL- 12=MUTE
      13=CH+/BRIGHTNESS+ 14=CH-/BRIGHTNESS- 15=POWER 16=SOURCES(INPUTS)
      17=(reserved) 18=(reserved) 19=SLEEP 1A=MENU 1B=UP 1C=DOWN
      1D=LEFT(-) 1E=RIGHT(+) 1F=OK(ENTER,SET) 20=EXIT
      21~2B=(reserved) 2C=RED(F1) 2D=GREEN(F2) 2E=YELLOW(F3) 2F=BLUE(F4)
    Special POWER sequence under pass-through:
      Display OFF + IR POWER → turn on, then forward POWER code to host.
      Display ON + IR POWER → forward POWER code to host, then turn off.
      SET-POWER-LOCK enabled → Display ignores POWER key.
```

## Macros
```yaml
- id: wake_on_lan
  label: Wake-on-LAN
  description: "Alternative to Set-Power-On via LAN. 126-byte magic packet."
  command: "0xFF 0xFF 0xFF 0xFF 0xFF 0xFF {MAC x6} {MAC x6} {MAC x6} {MAC x6} {MAC x6} {MAC x6} {MAC x6} {MAC x6} {MAC x6} {MAC x6} {MAC x6} {MAC x6} {MAC x6} {MAC x6} {MAC x6} {MAC x6} {MAC x6} 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00"
  params:
    - name: mac
      type: string
      description: "Target MAC address (6 bytes), repeated 16 times in payload"
  notes: "Layout: 6 bytes 0xFF + (MAC × 16) + 24 bytes 0x00 = 126 bytes total."
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_lock_interlock
    description: "When POWER LOCK is enabled: POWER key on front panel + RCU locked; SET_POWER on/off via RS-232 still works but does NOT release the lock; lock cannot be cleared by OSD reset; will auto AC power-on in power-lock; will NOT enter power saving when no PC signal and will NOT turn off when no video signal after 15 minutes."
  - id: button_lock_interlock
    description: "Button Lock locks all front-panel + RCU keys except POWER. All SET functions still workable via RS-232, including hot-key functions like Mute."
  - id: menu_lock_interlock
    description: "Menu Lock locks MENU key on front panel + RCU. Factory and Hospitality modes (entered via MENU-combined key) are not blocked; alternative entry indicated separately per model."
  - id: remote_control_disable_interlock
    description: "Remote Control Disable locks RCU keys but keeps front-panel buttons workable."
  - id: ir_power_sequence
    description: "Under IR pass-through: Display ON + IR POWER received = forward POWER code to host then turn off; Display OFF + IR POWER received = turn on then forward POWER code to host. Under SET-POWER-LOCK the Display ignores POWER key entirely."
```

## Notes
- Packet framing is fixed 9 bytes for Set/Get (excluding CR). Length byte is ASCII '8' (0x38). Reply ack is 4 bytes (0x34 + id + type + CR).
- ID field is 2 ASCII digits, range 01~98, default 01. ID 99 = broadcast to all connected displays; only ID#1 replies.
- RS-232 hardware: DB9 male or 3.5mm barrel; use null-modem (crossover) cable. DB9 pin 2=RXD, 3=TXD, 5=GND, 9=+5V/2A dongle power. Barrel: tip=TXD, ring=RXD, sleeve=GND.
- LAN: RJ45, TCP/IP, port 5000 fixed, no cross-subnet, no logon credentials.
- Value field is always 3 ASCII bytes; for Set-Date/Set-Time the first value byte is a literal prefix char (Y/M/D/H/S).
- 32-byte reply format used by: operation hours, device name, MAC, IP, serial number, FW version.
- Auto-reply fires unsolicited on changes to: power, input, brightness, backlight, volume, mute — regardless of how the change was triggered (RCU, front keys, touch).

<!-- UNRESOLVED: CDE6502-specific model confirmation — source doc is generic IFP32 protocol shared across ViewSonic LFD line. -->
<!-- UNRESOLVED: Set-Backlight (0x42) and Set-Remote-Control (0x42) share the same command byte in the source table — source ambiguity, needs device verification. -->
<!-- UNRESOLVED: Get-Menu-Lock listed with cmd 0x6C, same as Get-Power-Status — likely source typo. -->
<!-- UNRESOLVED: Get-IP-Address (0x36) and Get-RS232-Version example (0x36) share cmd byte — likely source typo. -->
<!-- UNRESOLVED: Firmware version compatibility range not stated in source. -->
```

Spec above. Key upgrades vs on-disk:
- Added `command:` payloads to ALL existing actions (verbatim hex packet templates)
- Added 30 Get-Function query actions (`get_*`) — were entirely missing
- Added `ir_pass_through_event` with full RCU code table (01–2F)
- Added WOL macro command bytes
- Added Safety interlocks for button_lock / menu_lock / remote_control_disable
- Added `rs232_version` variable
- Transport: annotated `auth.type: none` with inference note

Flagged 3 source cmd-byte collisions (backlight/remote, menu_lock/power_status, ip/rs232_version) as UNRESOLVED for device verification — did not invent resolution.

## Provenance

```yaml
source_domains:
  - manuals.viewsonic.com
  - pdf.projectorpoint.co.uk
  - mans.io
  - manua.ls
source_urls:
  - https://manuals.viewsonic.com/IFP32_RS-232_Protocols
  - https://manuals.viewsonic.com/LDM_RS-232_Protocol
  - http://pdf.projectorpoint.co.uk/pub/media/pp_products/displays/viewsonic/cde6502/viewsonic_cde6502-manual.pdf
  - https://mans.io/files/viewer/467356/29
  - https://www.manua.ls/viewsonic/cde6502/manual
retrieved_at: 2026-07-17T03:45:02.011Z
last_checked_at: 2026-07-22T07:56:23.966Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T07:56:23.966Z
matched_actions: 78
action_count: 78
confidence: medium
summary: "All 78 spec actions matched in source protocol tables; transport parameters verified; complete command coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific CDE6502 model confirmed only by filename; document is generic IFP32 RS-232 protocol applicable to ViewSonic LFD line. Backlight Set command (0x42) collides with Remote Control Set command (0x42) in the source table — see set_backlight note."
- "CDE6502-specific model confirmation — source doc is generic IFP32 protocol shared across ViewSonic LFD line."
- "Set-Backlight (0x42) and Set-Remote-Control (0x42) share the same command byte in the source table — source ambiguity, needs device verification."
- "Get-Menu-Lock listed with cmd 0x6C, same as Get-Power-Status — likely source typo."
- "Get-IP-Address (0x36) and Get-RS232-Version example (0x36) share cmd byte — likely source typo."
- "Firmware version compatibility range not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
