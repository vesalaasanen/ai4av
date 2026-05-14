---
spec_id: admin/viewsonic-cde5010-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Viewsonic CDE5010 Series Control Spec"
manufacturer: Viewsonic
model_family: "CDE5010 Series"
aliases: []
compatible_with:
  manufacturers:
    - Viewsonic
  models:
    - "CDE5010 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - viewsonicglobal.com
source_urls:
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDE5010/CDE5010_UG_ENG.pdf
  - "https://www.viewsonicglobal.com/public/products_download/user_guide/projector/LSC_6_7_8_Series/LSC%20Series%20RS-232%20LAN%20Control%20Protocol%20Specification.pdf"
  - "https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf?pass"
  - https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf
retrieved_at: 2026-04-30T10:02:07.423Z
last_checked_at: 2026-05-14T18:17:21.347Z
generated_at: 2026-05-14T18:17:21.347Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:21.347Z
  matched_actions: 32
  action_count: 32
  confidence: high
  summary: "All 51 spec actions (29 Set-Functions + 22 Get-Functions) matched literally to source command tables with exact command codes and parameter ranges; transport parameters verified or correctly marked UNRESOLVED."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Viewsonic CDE5010 Series Control Spec

## Summary
The Viewsonic CDE5010 Series is a commercial display / digital signage product controllable via RS-232C serial and LAN (TCP/IP). This spec covers the ViewSonic SICP serial protocol, which uses fixed-length ASCII command packets with a display ID for daisy-chain addressing (up to 255 displays). Both Set-Function (control) and Get-Function (query) commands are documented, along with an IR pass-through mode.

<!-- UNRESOLVED: LAN/TCP default port not stated (configurable range 1025-65535, excluding 8000/9988/15220/28123/28124) -->
<!-- UNRESOLVED: LAN authentication mechanism not documented -->
<!-- UNRESOLVED: flow_control not stated for serial -->

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
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: null  # UNRESOLVED: default LAN port not stated; configurable range 1025-65535 (excluding 8000, 9988, 15220, 28123, 28124)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable     # inferred: power on/standby commands present
- queryable     # inferred: get-function commands return state values
- levelable     # inferred: volume, brightness, contrast, sharpness, color, tint, bass, treble, balance
- routable      # inferred: input select with multiple sources
```

## Actions
```yaml
# PACKET FORMAT (Set-Function, command_type="s"):
#   Byte 1:   Length ("8") - total bytes excluding CR
#   Bytes 2-3: Display ID - 2-digit ASCII, 01-98 (default 01); 99=broadcast all (no reply)
#   Byte 4:   Command Type - "s"
#   Byte 5:   Command Code - single ASCII character
#   Bytes 6-8: Value - 3-digit zero-padded ASCII
#   Byte 9:   CR (0x0D)
#
# Example (set brightness 76 on display 02): 8 0 2 s $ 0 7 6 CR
#
# REPLY FORMAT:
#   Valid:   {length}{id}+\r    (+ = 0x2B)
#   Invalid: {length}{id}-\r    (- = 0x2D)

- id: power_set
  label: Power On/Standby
  kind: action
  command_code: "!"
  params:
    - name: state
      type: enum
      values: ["000", "001"]
      description: "000=Standby, 001=On"

- id: input_select
  label: Input Select
  kind: action
  command_code: "\""
  params:
    - name: source
      type: enum
      values: ["000", "001", "002", "003", "004", "014", "024", "034", "005", "006", "016", "026", "007", "008", "009", "00A"]
      description: "000=TV, 001=AV, 002=S-Video, 003=YPbPr, 004=HDMI1, 014=HDMI2, 024=HDMI3, 034=HDMI4, 005=DVI, 006=VGA1, 016=VGA2, 026=VGA3, 007=Slot-in PC(OPS/SDM)/HDBT, 008=Internal memory, 009=DP, 00A=Embedded/Main(Android)"

- id: brightness_set
  label: Set Brightness
  kind: action
  command_code: "$"
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: contrast_set
  label: Set Contrast
  kind: action
  command_code: "#"
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: sharpness_set
  label: Set Sharpness
  kind: action
  command_code: "%"
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: color_set
  label: Set Color
  kind: action
  command_code: "&"
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: tint_set
  label: Set Tint
  kind: action
  command_code: "'"
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: color_mode_set
  label: Set Color Mode
  kind: action
  command_code: ")"
  params:
    - name: mode
      type: enum
      values: ["000", "001", "002", "003"]
      description: "000=Normal, 001=Warm, 002=Cold, 003=Personal"

- id: volume_set
  label: Set Volume
  kind: action
  command_code: "5"
  params:
    - name: value
      type: string
      description: "000-100 for absolute level; 900=down(-1); 901=up(+1)"

- id: mute_set
  label: Mute On/Off
  kind: action
  command_code: "6"
  params:
    - name: state
      type: enum
      values: ["000", "001"]
      description: "000=Off(unmuted), 001=On(muted)"

- id: surround_sound_set
  label: Set Surround Sound
  kind: action
  command_code: "-"
  params:
    - name: state
      type: enum
      values: ["000", "001"]
      description: "000=Off, 001=On"

- id: bass_set
  label: Set Bass
  kind: action
  command_code: "."
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: treble_set
  label: Set Treble
  kind: action
  command_code: "/"
  params:
    - name: level
      type: integer
      range: [0, 100]

- id: balance_set
  label: Set Balance
  kind: action
  command_code: "0"
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: "050=central"

- id: picture_size_set
  label: Set Picture Size
  kind: action
  command_code: "1"
  params:
    - name: mode
      type: enum
      values: ["000", "001", "002"]
      description: "000=FULL(16:9), 001=NORMAL(4:3), 002=REAL(1:1)"

- id: osd_language_set
  label: Set OSD Language
  kind: action
  command_code: "2"
  params:
    - name: language
      type: enum
      values: ["000", "001", "002"]
      description: "000=English, 001=French, 002=Spanish"

- id: power_lock_set
  label: Set Power Lock
  kind: action
  command_code: "4"
  params:
    - name: state
      type: enum
      values: ["000", "001"]
      description: "000=Unlock, 001=Lock"

- id: pip_mode_set
  label: Set PIP Mode
  kind: action
  command_code: "9"
  params:
    - name: mode
      type: enum
      values: ["000", "001", "002"]
      description: "000=Off, 001=PIP(POP), 002=PBP"

- id: pip_input_set
  label: Set PIP Input
  kind: action
  command_code: "7"
  params:
    - name: source
      type: enum
      values: ["000", "001", "002", "003", "004", "014", "024", "034", "005", "006", "016", "026", "007", "008", "009", "00A"]
      description: "Same source codes as input_select"

- id: pip_sound_select
  label: Set PIP Sound
  kind: action
  command_code: ":"
  params:
    - name: source
      type: enum
      values: ["000", "001"]
      description: "000=Main, 001=PIP(POP)"

- id: pip_position_set
  label: Set PIP Position
  kind: action
  command_code: ";"
  params:
    - name: position
      type: enum
      values: ["000", "001", "002", "003"]
      description: "000=Up, 001=Down, 002=Left, 003=Right"

- id: button_lock_set
  label: Set Button Lock
  kind: action
  command_code: "8"
  params:
    - name: state
      type: enum
      values: ["000", "001"]
      description: "000=Unlock, 001=Lock"

- id: menu_lock_set
  label: Set Menu Lock
  kind: action
  command_code: ">"
  params:
    - name: state
      type: enum
      values: ["000", "001"]
      description: "000=Unlock, 001=Lock"

- id: remote_control_set
  label: Set Remote Control Mode
  kind: action
  command_code: "B"
  params:
    - name: mode
      type: enum
      values: ["000", "001", "002"]
      description: "000=Disable (RCU inert), 001=Enable (normal), 002=Pass through (forward RC code to RS232, display ignores)"

- id: keypad
  label: Send Key Pad
  kind: action
  command_code: "A"
  params:
    - name: key
      type: enum
      values: ["000", "001", "002", "003", "004", "005", "006", "007"]
      description: "000=UP, 001=DOWN, 002=LEFT, 003=RIGHT, 004=ENTER, 005=INPUT, 006=MENU(EXIT), 007=EXIT"

- id: number_set
  label: Set Number
  kind: action
  command_code: "@"
  params:
    - name: value
      type: integer
      range: [0, 9]
      description: "Channel/slot number 000-009"

- id: tiling_mode_set
  label: Set Tiling Mode (Video Wall)
  kind: action
  command_code: "P"
  params:
    - name: state
      type: enum
      values: ["000", "001"]
      description: "000=Off, 001=On"

- id: tiling_compensation_set
  label: Set Tiling Compensation
  kind: action
  command_code: "Q"
  params:
    - name: state
      type: enum
      values: ["000", "001"]
      description: "000=Off, 001=On (bezel width compensation)"

- id: tiling_hv_set
  label: Set Tiling H x V Monitors
  kind: action
  command_code: "R"
  params:
    - name: config
      type: string
      description: "2-digit: 1st digit=H(1-9), 2nd digit=V(1-9)"

- id: tiling_position_set
  label: Set Tiling Position
  kind: action
  command_code: "S"
  params:
    - name: position
      type: integer
      range: [1, 25]

- id: date_set
  label: Set Date
  kind: action
  command_code: "V"
  params:
    - name: value
      type: string
      description: "Year: Y17-Y99; Month: M01-M12; Day: D01-D31 (prefix selects field)"

- id: time_set
  label: Set Time
  kind: action
  command_code: "W"
  params:
    - name: value
      type: string
      description: "Hour: H00-H23; Minute: M00-M59; Second: S00-S59 (prefix selects field)"
```

## Feedbacks
```yaml
# GET-FUNCTION FORMAT (command_type="g", value always "000"):
#   Send: {length}{id_2d}g{cmd}000\r
#   Reply valid:   {length}{id_2d}r{cmd}{val_3d}\r   (r = 0x72)
#   Reply invalid: {length}{id_2d}-\r                  (- = 0x2D)

- id: power_state
  label: Power Status
  type: enum
  command_code: "l"
  values: [standby, on]

- id: input_state
  label: Current Input
  type: string
  command_code: "j"
  description: "Returns 3-digit input source code (see input_select values)"

- id: brightness
  label: Brightness
  type: integer
  command_code: "b"
  range: [0, 100]

- id: contrast
  label: Contrast
  type: integer
  command_code: "a"
  range: [0, 100]

- id: sharpness
  label: Sharpness
  type: integer
  command_code: "c"
  range: [0, 100]

- id: color
  label: Color
  type: integer
  command_code: "d"
  range: [0, 100]

- id: tint
  label: Tint
  type: integer
  command_code: "e"
  range: [0, 100]

- id: volume
  label: Volume
  type: integer
  command_code: "f"
  range: [0, 100]

- id: mute_state
  label: Mute Status
  type: enum
  command_code: "g"
  values: [off, on]

- id: remote_control_state
  label: Remote Control Mode
  type: enum
  command_code: "n"
  values: [disabled, enabled, pass_through]

- id: power_lock_state
  label: Power Lock Status
  type: enum
  command_code: "o"
  values: [unlocked, locked]

- id: button_lock_state
  label: Button Lock Status
  type: enum
  command_code: "p"
  values: [unlocked, locked]

- id: menu_lock_state
  label: Menu Lock Status
  type: enum
  command_code: "q"
  values: [unlocked, locked]

- id: pip_mode_state
  label: PIP Mode
  type: enum
  command_code: "t"
  values: [off, pip_pop, pbp]

- id: pip_input_state
  label: PIP Input
  type: string
  command_code: "u"
  description: "Returns PIP input source code"

- id: tiling_mode_state
  label: Tiling Mode
  type: enum
  command_code: "v"
  values: [off, on]

- id: tiling_compensation_state
  label: Tiling Compensation
  type: enum
  command_code: "w"
  values: [off, on]

- id: tiling_hv_state
  label: Tiling H x V Monitors
  type: string
  command_code: "x"
  description: "2-digit: 1st=H count, 2nd=V count"

- id: tiling_position_state
  label: Tiling Position
  type: integer
  command_code: "y"

- id: ack
  label: Communication Test (ACK)
  type: constant
  command_code: "z"
  description: "Returns 000 to confirm link is active"

- id: thermal
  label: Temperature
  type: integer
  command_code: "0"
  description: "Temperature in deg C; 000-100=positive, -01 to -99=negative (specific models only)"

- id: power_log
  label: Power On/Off Log
  type: string
  command_code: "1"
  description: "Power cycle history (specific models only)"

- id: date
  label: Date
  type: string
  command_code: "2"

- id: time
  label: Time
  type: string
  command_code: "3"

- id: rs232_version
  label: RS232 Protocol Version
  type: string
  command_code: "6"
  description: "Version 0.0.1 through 9.9.9"
```

## Variables
```yaml
# All settable parameters are covered by Actions above with their params.
# No additional continuously-variable parameters beyond those.
```

## Events
```yaml
# IR Pass-Through Mode: when Remote Control mode is set to "002" (Pass through),
# the display sends unsolicited 7-byte packets when RCU keys are pressed:
#   Byte 1:   Length ("6")
#   Bytes 2-3: Display ID
#   Byte 4:   Command Type "p" (0x70)
#   Byte 5:   RCU Code MSB
#   Byte 6:   RCU Code LSB
#   Byte 7:   CR (0x0D)
#
# Key codes (hex): 01-0A=digits 1-9/0, 0B= "-", 0C=RECALL, 0D=INFO,
# 0F=ASPECT, 10=VOL+, 11=VOL-, 12=MUTE, 13=CH+/BRIGHT+, 14=CH-/BRIGHT-,
# 15=POWER, 16=SOURCES, 19=SLEEP, 1A=MENU, 1B=UP, 1C=DOWN, 1D=LEFT, 1E=RIGHT,
# 1F=OK/ENTER, 20=EXIT, 2C=RED(F1), 2D=GREEN(F2), 2E=YELLOW(F3), 2F=BLUE(F4)
#
# Special POWER key behavior:
# - TV OFF + IR POWER: TV turns on, then forwards POWER code to RS232 host
# - TV ON + IR POWER: TV forwards POWER code to RS232 host, then turns off
# - POWER LOCK enabled: display ignores POWER key

- id: ir_passthrough
  label: IR Pass-Through Event
  type: event
  description: "Unsolicited RCU key code forwarded to RS232 host when in pass-through mode"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlock procedures,
# or power-on sequencing requirements beyond the POWER LOCK feature.
```

## Notes
- Connector: DSUB 9-Pin Male (pin 2=RXD, pin 3=TXD, pin 5=GND). Crossover (null modem) cable required. Some models use 2.5mm barrel (tip=TXD, ring=RXD, sleeve=GND).
- Display IDs are 2-digit ASCII (01-98), configurable via OSD. ID 99 broadcasts to all displays with no reply expected (only ID=01 replies on broadcast).
- IR pass-through supports up to 9 displays in daisy-chain.
- The SICP Network Port (LAN) is configurable in range 1025-65535; ports 8000, 9988, 15220, 28123, 28124 are reserved/unavailable.
- Date and time set commands share command codes (V for date, W for time) — the letter prefix in the value field (Y/M/D or H/M/S) selects which sub-field to set.
- Volume supports both absolute values (000-100) and relative step commands (900=down, 901=up).

<!-- UNRESOLVED: LAN transport details — whether protocol over TCP uses identical packet format is implied but not explicitly stated -->
<!-- UNRESOLVED: no mention of flow control for serial -->
<!-- UNRESOLVED: specific models supporting thermal and power-log features not enumerated -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - viewsonicglobal.com
source_urls:
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDE5010/CDE5010_UG_ENG.pdf
  - "https://www.viewsonicglobal.com/public/products_download/user_guide/projector/LSC_6_7_8_Series/LSC%20Series%20RS-232%20LAN%20Control%20Protocol%20Specification.pdf"
  - "https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf?pass"
  - https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf
retrieved_at: 2026-04-30T10:02:07.423Z
last_checked_at: 2026-05-14T18:17:21.347Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:21.347Z
matched_actions: 32
action_count: 32
confidence: high
summary: "All 51 spec actions (29 Set-Functions + 22 Get-Functions) matched literally to source command tables with exact command codes and parameter ranges; transport parameters verified or correctly marked UNRESOLVED."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
