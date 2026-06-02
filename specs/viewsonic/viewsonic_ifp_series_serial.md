---
spec_id: admin/viewsonic-cdxxxx-rs232
schema_version: ai4av-public-spec-v1
revision: 1
title: "ViewSonic Commercial CDxxxx / IFP Series RS-232 Control Spec"
manufacturer: ViewSonic
model_family: IFP5550
aliases: []
compatible_with:
  manufacturers:
    - ViewSonic
  models:
    - IFP5550
    - IFP5550-5
    - IFP6550
    - IFP6550-5
    - IFP7550
    - IFP7550-5
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - viewsonicglobal.com
  - viewsonicvsa.freshdesk.com
source_urls:
  - https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf
  - https://viewsonicvsa.freshdesk.com/support/solutions/articles/43000470279-viewsonic-lfd-rs-232-lan-protocol
  - https://viewsonicvsa.freshdesk.com/support/solutions/articles/43000740313-how-to-control-my-viewboard-via-rs232
retrieved_at: 2026-04-30T10:02:07.423Z
last_checked_at: 2026-06-02T07:06:53.229Z
generated_at: 2026-06-02T07:06:53.229Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not state firmware version compatibility, voltage/current, or fault recovery behavior"
  - "no settable parameters beyond the discrete Actions above are documented in source"
  - "no multi-step sequences described in source"
  - "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements"
  - "firmware version compatibility, electrical specs, fault recovery sequences, port numbers (this device uses direct DSUB-9, no IP port), baud rate variations (source states fixed at 9600)"
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:53.229Z
  matched_actions: 37
  action_count: 37
  confidence: medium
  summary: "All 37 spec actions matched exactly with source opcodes; all transport parameters verified; bidirectional coverage complete. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# ViewSonic Commercial CDxxxx / IFP Series RS-232 Control Spec

## Summary
RS-232 control protocol for ViewSonic commercial CD-series and IFP-series large-format displays. Defines two packet formats (Protocol 1 with ID for multi-display control, Protocol 2 without ID for single-display / Network Media Player control), each exposing Set-Function, Get-Function, and Remote Control pass-through commands. Source is the embedded RS-232 protocol section of the ViewSonic full user guide (manuals.viewsonic.com).

<!-- UNRESOLVED: source does not state firmware version compatibility, voltage/current, or fault recovery behavior -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600       # source: "Baud Rate Select: 9600bps (fixed)"
  data_bits: 8          # source: "Data bits: 8bits (fixed)"
  parity: none          # source: "Parity: None (fixed)"
  stop_bits: 1          # source: "Stop Bits: 1(fixed)"
  flow_control: none
  connector: DSUB 9 Pin Male
  pinout:
    pin2: RXD           # input to display
    pin3: TXD           # output from display
    pin5: GND
    frame: GND
  cable: null-modem (crossover) required for PC connection
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from Power command (! 21)
- routable        # inferred from Input Select command (" 22) and PIP Input (< 3C)
- queryable       # inferred from Get-Function commands (a-l, z)
- levelable       # inferred from Contrast/Brightness/Volume/etc. range 000-100 commands
```

## Actions
```yaml
# Packet formats (source §3 and §4):
#   Protocol 1 (with ID, Set): 0x38 0x{id1} {id2} 0x73 0x{cmd} 0x{v1} 0x{v2} 0x{v3} 0x0D  (9 bytes + CR)
#   Protocol 1 (with ID, Get): 0x38 0x{id1} {id2} 0x67 0x{cmd} 0x30 0x30 0x30 0x0D
#   Protocol 1 (reply):        0x34 0x{id1} {id2} 0x2B (+/-) 0x0D
#   Protocol 2 (no ID, Set):   0x{cmd} 0x{v1} 0x{v2} 0x{v3} 0x0D                       (5 bytes + CR)
#   Protocol 2 (no ID, Get):   0x{cmd} 0x30 0x30 0x30 0x0D
# Ack response on valid: "+" (0x2B) + CR. On invalid: "-" (0x2D) + CR.
# All Value fields are 3 ASCII bytes; id "99" broadcasts to all displays (Protocol 1 only, no reply).

- id: set_power
  label: Set Power
  kind: action
  command: "0x73 0x21 0x{v1} 0x{v2} 0x{v3}"   # opcode ! 0x21; Value 000=STBY, 001=ON
  params:
    - name: state
      type: enum
      values: [standby, on]
      description: "000 = standby, 001 = on"

- id: set_input_select
  label: Set Input Select
  kind: action
  command: "0x73 0x22 0x{v1} 0x{v2} 0x{v3}"   # opcode " 0x22
  params:
    - name: input
      type: enum
      values: [vga, hdmi, dvi_d, av, ypbpr, s_video]
      description: "000=VGA, 001=HDMI, 002=DVI-D, 003=AV, 004=YPbPr, 005=S-Video"

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "0x73 0x23 0x{v1} 0x{v2} 0x{v3}"   # opcode # 0x23; range 000-100
  params:
    - name: value
      type: integer
      description: "0-100 (three ASCII bytes, zero-padded)"

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "0x73 0x24 0x{v1} 0x{v2} 0x{v3}"   # opcode $ 0x24; range 000-100
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "0x73 0x25 0x{v1} 0x{v2} 0x{v3}"   # opcode % 0x25; range 000-100
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_color
  label: Set Color
  kind: action
  command: "0x73 0x26 0x{v1} 0x{v2} 0x{v3}"   # opcode & 0x26; range 000-100
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_tint
  label: Set Tint
  kind: action
  command: "0x73 0x27 0x{v1} 0x{v2} 0x{v3}"   # opcode „ 0x27; range 000-100
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_bass
  label: Set Bass
  kind: action
  command: "0x73 0x2E 0x{v1} 0x{v2} 0x{v3}"   # opcode . 0x2E; range 000-100
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_treble
  label: Set Treble
  kind: action
  command: "0x73 0x2F 0x{v1} 0x{v2} 0x{v3}"   # opcode / 0x2F; range 000-100
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_balance
  label: Set Balance
  kind: action
  command: "0x73 0x30 0x{v1} 0x{v2} 0x{v3}"   # opcode 0 0x30; range 000-100
  params:
    - name: value
      type: integer
      description: "0-100 (balance position)"

- id: set_picture_size
  label: Set Picture Size
  kind: action
  command: "0x73 0x31 0x{v1} 0x{v2} 0x{v3}"   # opcode 1 0x31
  params:
    - name: size
      type: enum
      values: [full, normal, custom, dynamic, real]
      description: "000=FULL, 001=NORMAL, 002=CUSTOM, 003=DYNAMIC, 004=REAL"

- id: set_osd_language
  label: Set OSD Language
  kind: action
  command: "0x73 0x32 0x{v1} 0x{v2} 0x{v3}"   # opcode 2 0x32
  params:
    - name: language
      type: enum
      values: [english, french, spanish, germany, italian, simplified_chinese, russian, polish, turkish]
      description: "000=English, 001=French, 002=Spanish, 003=Germany, 004=Italian, 005=Simplified Chinese, 006=Russian, 007=Polish, 008=Turkish"

- id: set_osd_timeout
  label: Set OSD Timeout
  kind: action
  command: "0x73 0x33 0x{v1} 0x{v2} 0x{v3}"   # opcode 3 0x33; range 005-120 sec
  params:
    - name: seconds
      type: integer
      description: "5-120 seconds"

- id: set_volume
  label: Set Volume
  kind: action
  command: "0x73 0x35 0x{v1} 0x{v2} 0x{v3}"   # opcode 5 0x35; range 000-100
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_mute
  label: Set Mute
  kind: action
  command: "0x73 0x36 0x{v1} 0x{v2} 0x{v3}"   # opcode 6 0x36
  params:
    - name: state
      type: enum
      values: [off, on]
      description: "000=OFF, 001=ON (mute)"

- id: set_off_timer
  label: Set Off Timer
  kind: action
  command: "0x73 0x37 0x{v1} 0x{v2} 0x{v3}"   # opcode 7 0x37
  params:
    - name: hours
      type: integer
      description: "000=OFF, 001-024 hours"

- id: set_pip_mode
  label: Set PIP Mode
  kind: action
  command: "0x73 0x39 0x{v1} 0x{v2} 0x{v3}"   # opcode 9 0x39
  params:
    - name: mode
      type: enum
      values: [off, pip, pop, pbp, pbpa]
      description: "000=OFF, 001=PIP, 002=POP, 003=PBP, 004=PBPA"

- id: set_pip_sound_select
  label: Set PIP Sound Select
  kind: action
  command: "0x73 0x3A 0x{v1} 0x{v2} 0x{v3}"   # opcode : 0x3A
  params:
    - name: source
      type: enum
      values: [main, pip]
      description: "000=Main, 001=PIP"

- id: set_pip_position
  label: Set PIP Position
  kind: action
  command: "0x73 0x3B 0x{v1} 0x{v2} 0x{v3}"   # opcode ; 0x3B
  params:
    - name: position
      type: enum
      values: [up, down, left, right]
      description: "000=Up, 001=Down, 002=Left, 003=Right"

- id: set_pip_input
  label: Set PIP Input
  kind: action
  command: "0x73 0x3C 0x{v1} 0x{v2} 0x{v3}"   # opcode < 0x3C
  params:
    - name: input
      type: enum
      values: [vga, hdmi, dvi_d, av, ypbpr, s_video]
      description: "000=VGA, 001=HDMI, 002=DVI-D, 003=AV, 004=YPbPr, 005=S-Video"

- id: set_monitor_id
  label: Set Monitor ID
  kind: action
  command: "0x73 0x3D 0x{v1} 0x{v2} 0x{v3}"   # opcode = 0x3D; range 001-026
  params:
    - name: id
      type: integer
      description: "1-26"

- id: set_keypad_simulate
  label: Set Key Pad Simulate (A)
  kind: action
  command: "0x73 0x41 0x{v1} 0x{v2} 0x{v3}"   # opcode A 0x41; emulate keypad button
  params:
    - name: key
      type: enum
      values: [power, source, menu_exit, up, down, left, right, mute]
      description: "000=POWER, 001=SOURCE, 002=MENU/EXIT, 003=UP, 004=DOWN, 005=LEFT, 006=RIGHT, 007=MUTE"

- id: set_remote_control
  label: Set Remote Control Mode
  kind: action
  command: "0x73 0x42 0x{v1} 0x{v2} 0x{v3}"   # opcode B 0x42
  params:
    - name: mode
      type: enum
      values: [disable, enable, pass_through]
      description: "000=Disable, 001=Enable, 002=Pass through (RCU codes forwarded to PC)"

- id: set_keypad_enable
  label: Set Key Pad Enable (C)
  kind: action
  command: "0x73 0x43 0x{v1} 0x{v2} 0x{v3}"   # opcode C 0x43
  params:
    - name: state
      type: enum
      values: [disable, enable]
      description: "000=Disable, 001=Enable (key pad controls HDTV)"

- id: set_factory_reset
  label: Set Factory Reset
  kind: action
  command: "0x73 0x7E 0x30 0x30 0x30"          # opcode ~ 0x7E; value fixed 000
  params: []

- id: get_contrast
  label: Get Contrast
  kind: query
  command: "0x67 0x61 0x30 0x30 0x30"          # opcode a 0x61; range 000-100
  params: []

- id: get_brightness
  label: Get Brightness
  kind: query
  command: "0x67 0x62 0x30 0x30 0x30"          # opcode b 0x62; range 000-100
  params: []

- id: get_sharpness
  label: Get Sharpness
  kind: query
  command: "0x67 0x63 0x30 0x30 0x30"          # opcode c 0x63; range 000-100
  params: []

- id: get_color
  label: Get Color
  kind: query
  command: "0x67 0x64 0x30 0x30 0x30"          # opcode d 0x64; range 000-100
  params: []

- id: get_tint
  label: Get Tint
  kind: query
  command: "0x67 0x65 0x30 0x30 0x30"          # opcode e 0x65; range 000-100
  params: []

- id: get_volume
  label: Get Volume
  kind: query
  command: "0x67 0x66 0x30 0x30 0x30"          # opcode f 0x66; range 000-100
  params: []

- id: get_mute
  label: Get Mute
  kind: query
  command: "0x67 0x67 0x30 0x30 0x30"          # opcode g 0x67
  params: []

- id: get_rcu
  label: Get RCU Mode
  kind: query
  command: "0x67 0x68 0x30 0x30 0x30"          # opcode h 0x68
  params: []

- id: get_keypad_enable
  label: Get Key Pad Enable
  kind: query
  command: "0x67 0x69 0x30 0x30 0x30"          # opcode i 0x69
  params: []

- id: get_input_select
  label: Get Input Select
  kind: query
  command: "0x67 0x6A 0x30 0x30 0x30"          # opcode j 0x6A
  params: []

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "0x67 0x6C 0x30 0x30 0x30"          # opcode l 0x6C
  params: []

- id: get_ack
  label: Get ACK (link test)
  kind: query
  command: "0x67 0x7A 0x30 0x30 0x30"          # opcode z 0x7A; tests comm link
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]
  description: "From Get-Power status (opcode l 0x6C): 000=STBY, 001=ON"

- id: input_state
  type: enum
  values: [vga, hdmi, dvi_d, av, ypbpr, s_video]
  description: "From Get-Input select (opcode j 0x6A)"

- id: mute_state
  type: enum
  values: [off, on]
  description: "From Get-Mute (opcode g 0x67): 000=OFF, 001=ON"

- id: rcu_mode
  type: enum
  values: [disable, enable, pass_through]
  description: "From Get-RCU (opcode h 0x68)"

- id: keypad_enabled
  type: enum
  values: [disable, enable]
  description: "From Get-Key Pad (opcode i 0x69)"

- id: contrast_value
  type: integer
  range: [0, 100]
  description: "From Get-Contrast (opcode a 0x61)"

- id: brightness_value
  type: integer
  range: [0, 100]
  description: "From Get-Brightness (opcode b 0x62)"

- id: sharpness_value
  type: integer
  range: [0, 100]
  description: "From Get-Sharpness (opcode c 0x63)"

- id: color_value
  type: integer
  range: [0, 100]
  description: "From Get-Color (opcode d 0x64)"

- id: tint_value
  type: integer
  range: [0, 100]
  description: "From Get-Tint (opcode e 0x65)"

- id: volume_value
  type: integer
  range: [0, 100]
  description: "From Get-Volume (opcode f 0x66)"

- id: ack
  type: enum
  values: [ok, fail]
  description: "From Get-ACK (opcode z 0x7A): '+' = link OK, '-' = link fail"
```

## Variables
```yaml
# UNRESOLVED: no settable parameters beyond the discrete Actions above are documented in source
```

## Events
```yaml
# Remote Control pass-through (3-byte packet from display to PC) is sent when:
# 1. Display is in Remote Control pass-through mode (set by set_remote_control mode=002)
# 2. An RCU button is pressed (RCU has no effect on display in this mode)
#
# Packet format: 0x33 0x{MSB} 0x{LSB} 0x0D  (Length=3, two ASCII hex digits, CR)
- id: rc_pass_through
  description: "Unsolicited 3-byte packet from display forwarding RCU keypresses"
  payload_template: "0x33 0x{MSB} 0x{LSB} 0x0D"
  keys:
    size: 0F
    volume_up: 10
    volume_down: 11
    mute: 12
    power: 15
    input: 16
    pip_on_off: 17
    menu: 1A
    up: 1B
    down: 1C
    left: 1D
    right: 1E
    set: 1F
    pip_input: 20
    pip_change: 21
    picture_mode: 22
    audio_input: 23
    screen_saver_motion: 24
    screen_saver_brightness: 25
    display: 26
    auto_setup: 27
    exit: 28
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset        # source: set_factory_reset returns HDTV to factory settings
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
Two protocol variants share the same opcodes but use different packet framing:
- **Protocol 1 (with ID, §3):** 9-byte packet `0x38 0x{id1} {id2} 0x{type} 0x{cmd} 0x{v1} 0x{v2} 0x{v3} 0x0D`. Type `s` (0x73)=set, `g` (0x67)=get, `r` (0x72)=reply. ID "99" broadcasts to all displays and produces no reply. Per-set reply is 5 bytes `0x34 0x{id1} {id2} 0x2B/0x2D 0x0D`.
- **Protocol 2 (without ID, §4):** 5-byte packet `0x{cmd} 0x{v1} 0x{v2} 0x{v3} 0x0D` (length byte 0x35 is sometimes implicit). Get reply uses 4 ASCII value bytes (0000-9999). No ID field.

Acknowledgement: valid command returns `+` (0x2B) + CR; invalid returns `-` (0x2D) + CR. Source documents the protocol as "fixed" for baud/data/parity/stop — no negotiation.

The factory-reset command (`~`, 0x7E) is non-recoverable and clears user settings.

Source covers ViewSonic "Commercial CD" displays and is referenced from the IFP50-5 / IFP5550-5 / IFP6550-5 / IFP7550-5 user guides (manuals.viewsonic.com). Source extracted from embedded RS-232 protocol section of full user guide; no standalone RS-232 command reference PDF exists.

<!-- UNRESOLVED: firmware version compatibility, electrical specs, fault recovery sequences, port numbers (this device uses direct DSUB-9, no IP port), baud rate variations (source states fixed at 9600) -->

## Provenance

```yaml
source_domains:
  - viewsonicglobal.com
  - viewsonicvsa.freshdesk.com
source_urls:
  - https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf
  - https://viewsonicvsa.freshdesk.com/support/solutions/articles/43000470279-viewsonic-lfd-rs-232-lan-protocol
  - https://viewsonicvsa.freshdesk.com/support/solutions/articles/43000740313-how-to-control-my-viewboard-via-rs232
retrieved_at: 2026-04-30T10:02:07.423Z
last_checked_at: 2026-06-02T07:06:53.229Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:53.229Z
matched_actions: 37
action_count: 37
confidence: medium
summary: "All 37 spec actions matched exactly with source opcodes; all transport parameters verified; bidirectional coverage complete. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state firmware version compatibility, voltage/current, or fault recovery behavior"
- "no settable parameters beyond the discrete Actions above are documented in source"
- "no multi-step sequences described in source"
- "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements"
- "firmware version compatibility, electrical specs, fault recovery sequences, port numbers (this device uses direct DSUB-9, no IP port), baud rate variations (source states fixed at 9600)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
