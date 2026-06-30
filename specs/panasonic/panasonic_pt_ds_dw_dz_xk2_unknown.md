---
spec_id: admin/panasonic-pt-ds-dw-dz-xk2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic PT DS DW DZ xK2 Control Spec"
manufacturer: Panasonic
model_family: PT-DS20KXE
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - PT-DS20KXE
    - PT-DW500KXE
    - PT-DZ21K2E
    - "PT-DZ21K2E (and related xK2 series variants)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - na.panasonic.com
  - audiogeneral.com
  - docs.connect.panasonic.com
  - eww.pass.panasonic.co.jp
source_urls:
  - https://na.panasonic.com/ns/35519_PT-DZ870DW830DX100_RS-232C_control_spec_-_.pdf
  - https://www.audiogeneral.com/Panasonic/ptdw17k2_rs232.pdf
  - https://docs.connect.panasonic.com/projector/download/command/
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/InterfaceSpecifications_CompatibleModelTable_E.pdf
retrieved_at: 2026-05-13T13:44:34.873Z
last_checked_at: 2026-06-25T16:04:12.524Z
generated_at: 2026-06-25T16:04:12.524Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial baud rate/config not stated in source"
  - "TCP/IP variant of this protocol not confirmed in source"
  - "baud_rate not stated in source"
  - "data_bits, parity, stop_bits, flow_control not stated in source"
  - "explicit query commands (other than QPW) not fully documented in source excerpt"
  - "unsolicited device notifications not documented in source"
  - "multi-step sequences not explicitly described as macros in source"
  - "safety warnings/sequencing requirements not explicitly stated beyond timing notes"
  - "serial baud rate, data bits, parity, stop bits not stated in source"
  - "firmware version compatibility not stated in source"
  - "TCP/IP control variant not confirmed in source"
  - "query commands beyond QPW not fully enumerated"
verification:
  verdict: verified
  checked_at: 2026-06-25T16:04:12.524Z
  matched_actions: 1
  action_count: 99
  confidence: medium
  summary: "deterministic presence proof: 1/1 payloads verbatim in source; stratified Sonnet sample corroborated (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-13
---

# Panasonic PT DS DW DZ xK2 Control Spec

## Summary
Panasonic professional projector series supporting RS-232 serial control. Protocol uses STX/ETX-wrapped ASCII commands with 4-byte projector ID addressing, 3-byte command mnemonics, and optional subcommand blocks. No authentication required. Command timeout guidance: 10s minimum, 60s warm-up delay before first command post lamp-start.

<!-- UNRESOLVED: serial baud rate/config not stated in source -->
<!-- UNRESOLVED: TCP/IP variant of this protocol not confirmed in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  # UNRESOLVED: baud_rate not stated in source
  # UNRESOLVED: data_bits, parity, stop_bits, flow_control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command examples:
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# Format: STX(02h) + 4-byte ID + ; + 3-byte cmd + :(params) + ETX(03h)
# ID table: AD01-AD64, AD0A-AD0Z (groups), ADZZ (ALL)

- id: power_on
  label: Power On (Lamp On)
  kind: action
  params: []
  command_bytes: "02h 41h 44h 44h 44h 5Ah 5Ah 5Ah 3Bh 50h 4Fh 4Eh 03h"

- id: power_off
  label: Power Off (Standby)
  kind: action
  params: []
  command_bytes: "02h 41h 44h 44h 44h 5Ah 5Ah 5Ah 3Bh 50h 4Fh 46h 03h"

- id: freeze
  label: Freeze
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON
      values: [0, 1]

- id: auto_setup
  label: Auto Setup
  kind: action
  params: []

- id: shutter
  label: Shutter
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON
      values: [0, 1]

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: input
      type: string
      description: RGB1, RGB2, DVI, HDMI, S-VIDEO, VIDEO, SDI, DIGITAL LINK

- id: input_select_digital_link
  label: Input Select (Digital Link)
  kind: action
  params:
    - name: input
      type: string
      description: HDMI1, HDMI2, COMPUTER1, COMPUTER2, S-VIDEO, VIDEO

- id: test_pattern
  label: Test Pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: 0=OFF, 1=White, 2=Black, 3=Flag, 4=Reversed Flag, 5=Focus(White), 6=Color bar(vertical), 7=Convergence, 8=3D-1, 9=3D-2, 10=3D-3, 11=3D-4, 12=Focus(Red), 13=Focus(Green), 14=Focus(Blue), 15=Focus(Cyan), 16=Focus(Magenta), 17=Focus(Yellow), 18=Color bar(Side), 19=16:9/4:3

- id: on_screen
  label: On Screen
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON

- id: menu_key
  label: Menu Key
  kind: action
  params: []

- id: enter_key
  label: Enter Key
  kind: action
  params: []

- id: up_key
  label: Up Key (Cursor)
  kind: action
  params: []

- id: down_key
  label: Down Key (Cursor)
  kind: action
  params: []

- id: left_key
  label: Left Key (Cursor)
  kind: action
  params: []

- id: right_key
  label: Right Key (Cursor)
  kind: action
  params: []

- id: default_key
  label: Default Key
  kind: action
  params: []

- id: function_key
  label: Function Key
  kind: action
  params: []

- id: system_selector_key
  label: System Selector Key
  kind: action
  params: []

- id: aspect_key
  label: Aspect Key
  kind: action
  params: []

- id: numeric_key
  label: Numeric Key
  kind: action
  params:
    - name: digit
      type: integer
      description: 0-9

- id: status_key
  label: Status Key
  kind: action
  params: []

- id: lens_focus_key
  label: Lens Focus Key
  kind: action
  params: []

- id: lens_shift_key
  label: Lens Shift Key
  kind: action
  params: []

- id: lens_zoom_key
  label: Lens Zoom Key
  kind: action
  params: []

- id: digital_link_key
  label: Digital Link Key
  kind: action
  params: []

- id: installation
  label: Installation (Projection Method)
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=FRONT/FLOOR, 1=REAR/FLOOR, 2=FRONT/CEILING, 3=REAR/CEILING
      values: [0, 1, 2, 3]

- id: cooling_condition
  label: Cooling Condition
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=FLOOR, 1=CEILING, 2=VERTICAL UP, 3=VERTICAL DOWN, 9=AUTO
      values: [0, 1, 2, 3, 9]

- id: high_altitude_mode
  label: High Altitude Mode
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON
      values: [0, 1]

- id: lamp_select
  label: Lamp Select
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=DUAL, 1=SINGLE(LAMP1), 2=LAMP2, 3=SINGLE(auto)
      values: [0, 1, 2, 3]

- id: lamp_relay_24h
  label: Lamp Relay 24H
  kind: action
  params:
    - name: mode
      type: string
      description: OFF or HH:MM time format
    - name: sign
      type: string
      description: "+" for add, "=" for set

- id: lamp_relay_week
  label: Lamp Relay Week
  kind: action
  params:
    - name: days
      type: string
      description: Bitmask or OFF, or MON,TUE,WED,THU,FRI,SAT,SUN
    - name: time
      type: string
      description: HH:MM
    - name: sign
      type: string
      description: "+" for add, "=" for set

- id: lamp_power
  label: Lamp Power
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=ECO, 1=NORMAL
      values: [0, 1]

- id: projector_id
  label: Projector ID
  kind: action
  params:
    - name: id
      type: integer
      description: 0(ALL) or 1-63

- id: rs232c_response_all
  label: RS232C Response (ID ALL)
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON
      values: [0, 1]

- id: function_button
  label: Function Button
  kind: action
  params:
    - name: function
      type: integer
      description: 0=DISABLE, 1=SYSTEM SELECTOR, 2=SYSTEM DAYLIGHT VIEW, 3=SUB MEMORY, 4=FREEZE, 5=P IN P, 6=WAVEFORM MONITOR, 8=LEFT/RIGHT SWAP, 9=ASPECT
      values: [0, 1, 2, 3, 4, 5, 6, 8, 9]

- id: signal_list_registration
  label: Signal List Registration
  kind: action
  params: []

- id: signal_list_delete
  label: Signal List Delete
  kind: action
  params:
    - name: signal
      type: string
      description: A1-A8 or L1-L8

- id: sub_memory_list_changeover
  label: Sub Memory List Changeover
  kind: action
  params:
    - name: index
      type: string
      description: mm-nn (memory slot number)
    - name: sub_index
      type: string
      description: Sub memory number

- id: sub_memory_list_registration
  label: Sub Memory List Registration
  kind: action
  params: []

- id: sub_memory_list_delete
  label: Sub Memory List Delete
  kind: action
  params:
    - name: index
      type: string
      description: mm-nn (memory slot number)
    - name: sub_index
      type: string
      description: Sub memory number

- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: NATURAL, CINEMA, USER, STANDARD, DYNAMIC, GRAPHIC, DICOM SIM., REC709

- id: ye_modulate
  label: Ye Modulate
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON
      values: [0, 1]

- id: dynamic_rgb_booster
  label: Dynamic RGB Booster
  kind: action
  params:
    - name: level
      type: integer
      description: 0-7

- id: color
  label: Color
  kind: action
  params:
    - name: value
      type: integer
      description: -31 to +30

- id: tint
  label: Tint
  kind: action
  params:
    - name: value
      type: integer
      description: -31 to +30

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: preset
      type: string
      description: DEFAULT, USER1, USER2
    - name: value
      type: integer
      description: Temperature in K (3200-9300, increments of 100)

- id: white_balance_low_red
  label: White Balance Low Red
  kind: action
  params:
    - name: value
      type: integer
      description: -127 to 127

- id: white_balance_low_green
  label: White Balance Low Green
  kind: action
  params:
    - name: value
      type: integer
      description: -127 to 127

- id: white_balance_low_blue
  label: White Balance Low Blue
  kind: action
  params:
    - name: value
      type: integer
      description: -127 to 127

- id: white_balance_high_red
  label: White Balance High Red
  kind: action
  params:
    - name: value
      type: integer
      description: 0-255

- id: white_balance_high_green
  label: White Balance High Green
  kind: action
  params:
    - name: value
      type: integer
      description: 0-255

- id: white_balance_high_blue
  label: White Balance High Blue
  kind: action
  params:
    - name: value
      type: integer
      description: 0-255

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: -31 to +31

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: -31 to +31

- id: white_gain
  label: White Gain
  kind: action
  params:
    - name: value
      type: integer
      description: 0-10

- id: gamma
  label: Gamma
  kind: action
  params:
    - name: mode
      type: string
      description: "1.8", "2.0", "2.2", DEFAULT, USER

- id: system_daylight_view
  label: System Daylight View
  kind: action
  params:
    - name: level
      type: integer
      description: 0=OFF, 1-3=levels

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 0-13

- id: noise_reduction
  label: Noise Reduction
  kind: action
  params:
    - name: level
      type: integer
      description: 0=OFF, 1, 2, 3

- id: dynamic_iris
  label: Dynamic Iris
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=OFF, 1, 2, 3, 4=USER

- id: dynamic_iris_auto
  label: Dynamic Iris (Auto Iris)
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1-253, 254, 255

- id: dynamic_iris_manual
  label: Dynamic Iris (Manual Iris)
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1-255

- id: dynamic_iris_dynamic_gamma
  label: Dynamic Iris (Dynamic Gamma)
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1, 2, 3

- id: digital_cinema_realitiy
  label: Digital Cinema Reality
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=AUTO, 1=OFF, 2=30p/25p FIXED

- id: tv_system
  label: TV System
  kind: action
  params:
    - name: system
      type: string
      description: AUTO, NTSC, NTSC4.43, PAL, PAL-M, PAL-N, SECAM, PAL60

- id: shift_horizontal
  label: Shift Horizontal
  kind: action
  params:
    - name: value
      type: integer
      description: 0-4095

- id: shift_vertical
  label: Shift Vertical
  kind: action
  params:
    - name: value
      type: integer
      description: 0-4094

- id: aspect
  label: Aspect
  kind: action
  params:
    - name: mode
      type: integer
      description: Depends on input terminal/signal (0-9)

- id: zoom_horizontal
  label: Zoom Horizontal
  kind: action
  params:
    - name: value
      type: integer
      description: 50-997

- id: zoom_vertical
  label: Zoom Vertical
  kind: action
  params:
    - name: value
      type: integer
      description: 50-997

- id: zoom_both
  label: Zoom Both
  kind: action
  params:
    - name: value
      type: integer
      description: 50-997

- id: zoom_interlocked
  label: Zoom Interlocked
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON

- id: zoom_mode
  label: Zoom Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=INTERNAL, 1=FULL

- id: clock_phase
  label: Clock Phase
  kind: action
  params:
    - name: value
      type: integer
      description: 0-31

- id: input_resolution_total_dots
  label: Input Resolution Total Dots
  kind: action
  params:
    - name: value
      type: integer
      description: 330-4095

- id: input_resolution_display_dots
  label: Input Resolution Display Dots
  kind: action
  params:
    - name: value
      type: integer
      description: 300-4065

- id: input_resolution_total_lines
  label: Input Resolution Total Lines
  kind: action
  params:
    - name: value
      type: integer
      description: 155-2047

- id: input_resolution_display_lines
  label: Input Resolution Display Lines
  kind: action
  params:
    - name: value
      type: integer
      description: 150-2037

- id: clamp_position
  label: Clamp Position
  kind: action
  params:
    - name: value
      type: integer
      description: 1-255

- id: keystone
  label: Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: -127 to +127

- id: keystone_sub_keystone
  label: Keystone Sub Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: -63 to +63

- id: keystone_linearity
  label: Keystone Linearity
  kind: action
  params:
    - name: value
      type: integer
      description: -127 to +127

- id: geometry
  label: Geometry
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=OFF, 1=KEYSTONE, 2=CURVED, 3=PC-1, 4=PC-2, 5=PC-3, 10=CORNER-CORRECTION
      values: [0, 1, 2, 3, 4, 5, 10]

- id: geometry_keystone_lens_throw_ratio
  label: Geometry Keystone Lens Throw Ratio
  kind: action
  params:
    - name: ratio
      type: number
      description: 0.7-16.5 (0.1 increments)

- id: geometry_keystone_vertical_balance
  label: Geometry Keystone Vertical Balance
  kind: action
  params:
    - name: value
      type: integer
      description: -60 to +60

- id: geometry_keystone_horizontal_balance
  label: Geometry Keystone Horizontal Balance
  kind: action
  params:
    - name: value
      type: integer
      description: -30 to +30

- id: geometry_keystone_vertical_keystone
  label: Geometry Keystone Vertical Keystone
  kind: action
  params:
    - name: value
      type: number
      description: -40.0 to +40.0 (0.2 increments)

- id: geometry_keystone_horizontal_keystone
  label: Geometry Keystone Horizontal Keystone
  kind: action
  params:
    - name: value
      type: number
      description: -15.0 to +15.0 (0.2 increments)

- id: geometry_curved_lens_throw_ratio
  label: Geometry Curved Lens Throw Ratio
  kind: action
  params:
    - name: ratio
      type: number
      description: 0.7-16.5 (0.1 increments)

- id: geometry_curved_vertical_arc
  label: Geometry Curved Vertical Arc
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to +50

- id: geometry_curved_horizontal_arc
  label: Geometry Curved Horizontal Arc
  kind: action
  params:
    - name: value
      type: integer
      description: -50 to +50

- id: geometry_curved_vertical_balance
  label: Geometry Curved Vertical Balance
  kind: action
  params:
    - name: value
      type: integer
      description: -60 to +60

- id: geometry_curved_horizontal_balance
  label: Geometry Curved Horizontal Balance
  kind: action
  params:
    - name: value
      type: integer
      description: -30 to +30

- id: geometry_curved_vertical_keystone
  label: Geometry Curved Vertical Keystone
  kind: action
  params:
    - name: value
      type: number
      description: -40.0 to +40.0 (0.2 increments)

- id: geometry_curved_horizontal_keystone
  label: Geometry Curved Horizontal Keystone
  kind: action
  params:
    - name: value
      type: number
      description: -15.0 to +15.0 (0.2 increments)

- id: geometry_curved_maintain_aspect_ratio
  label: Geometry Curved Maintain Aspect Ratio
  kind: action
  params:
    - name: state
      type: integer
      description: 0=OFF, 1=ON
      values: [0, 1]

- id: geometry_corner_correction_upper_left
  label: Geometry Corner Correction Upper Left
  kind: action
  params:
    - name: x
      type: integer
      description: Horizontal position
    - name: y
      type: integer
      description: Vertical position

- id: geometry_corner_correction_upper_right
  label: Geometry Corner Correction Upper Right
  kind: action
  params:
    - name: x
      type: integer
      description: Horizontal position
    - name: y
      type: integer
      description: Vertical position
```

## Feedbacks
```yaml
# Responses follow same STX/ETX format as commands.
# Success: 02h + cmd-ack + 03h
# Error: 02h 45h 52h 34h 30h 3xh 03h (ER40x)
# ER401: parameter error or REMOTE2 priority conflict
# ER402: out of range

- id: power_state
  label: Power State Query
  type: enum
  query_command: QPW
  response_bytes: "02h 50h 4Fh 4Eh 03h"
  values:
    - on
    - off

- id: error_response
  label: Error Response
  type: enum
  values:
    - ER401
    - ER402

- id: command_accepted
  label: Command Accepted
  type: string
  description: "Echo of sent command as confirmation"
```

## Variables
```yaml
# UNRESOLVED: explicit query commands (other than QPW) not fully documented in source excerpt
```

## Events
```yaml
# UNRESOLVED: unsolicited device notifications not documented in source
```

## Macros
```yaml
# UNRESOLVED: multi-step sequences not explicitly described as macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings/sequencing requirements not explicitly stated beyond timing notes
```

## Notes
**Command timing:** Wait ≥60s after lamp starts illuminating before sending first command. Wait ≥0.5s between consecutive commands (after receiving response). Timeout ≥10s for any single command.

**ID broadcast:** Commands targeted at ALL/Group IDs return response only when projector ID matches or when RESPONSE(ID GROUP) is enabled in RS232C settings.

**Error handling:** REMOTE2 mode gives priority to REMOTE2 input; commands differing from REMOTE2 setup return ER401. Some geometry commands return ER401 on non-DZ870 models. Sub-memory operations use (mm-nn) notation.

<!-- UNRESOLVED: serial baud rate, data bits, parity, stop bits not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: TCP/IP control variant not confirmed in source -->
<!-- UNRESOLVED: query commands beyond QPW not fully enumerated -->

## Provenance

```yaml
source_domains:
  - na.panasonic.com
  - audiogeneral.com
  - docs.connect.panasonic.com
  - eww.pass.panasonic.co.jp
source_urls:
  - https://na.panasonic.com/ns/35519_PT-DZ870DW830DX100_RS-232C_control_spec_-_.pdf
  - https://www.audiogeneral.com/Panasonic/ptdw17k2_rs232.pdf
  - https://docs.connect.panasonic.com/projector/download/command/
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/InterfaceSpecifications_CompatibleModelTable_E.pdf
retrieved_at: 2026-05-13T13:44:34.873Z
last_checked_at: 2026-06-25T16:04:12.524Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T16:04:12.524Z
matched_actions: 1
action_count: 99
confidence: medium
summary: "deterministic presence proof: 1/1 payloads verbatim in source; stratified Sonnet sample corroborated (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial baud rate/config not stated in source"
- "TCP/IP variant of this protocol not confirmed in source"
- "baud_rate not stated in source"
- "data_bits, parity, stop_bits, flow_control not stated in source"
- "explicit query commands (other than QPW) not fully documented in source excerpt"
- "unsolicited device notifications not documented in source"
- "multi-step sequences not explicitly described as macros in source"
- "safety warnings/sequencing requirements not explicitly stated beyond timing notes"
- "serial baud rate, data bits, parity, stop bits not stated in source"
- "firmware version compatibility not stated in source"
- "TCP/IP control variant not confirmed in source"
- "query commands beyond QPW not fully enumerated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
