---
spec_id: admin/viewsonic-ifp-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Viewsonic IFP Series Control Spec"
manufacturer: Viewsonic
model_family: "ViewSonic IFP5550-5"
aliases: []
compatible_with:
  manufacturers:
    - Viewsonic
  models:
    - "ViewSonic IFP5550-5"
    - "ViewSonic IFP6550-5"
    - "ViewSonic IFP7550-5"
    - "ViewSonic IFP8650-5"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - viewsonicglobal.com
retrieved_at: 2026-04-30T10:02:07.423Z
last_checked_at: 2026-04-30T15:28:14.408Z
generated_at: 2026-04-30T15:28:14.408Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T15:28:14.408Z
  matched_actions: 38
  action_count: 38
  confidence: high
  summary: "All 38 spec actions matched literally; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Viewsonic IFP Series Control Spec

## Summary
ViewSonic IFP Series interactive flat panel displays support RS-232C serial control. Two protocol variants are documented: Protocol 1 (with display ID, 11-byte set / 5-byte get commands) for multi-display control; Protocol 2 (without ID, 5-byte commands) for single-display or Network Media Player control. Both protocols include Set-Function, Get-Function, and Remote Control pass-through modes. Serial settings are fixed at 9600 baud, 8 data bits, no parity, 1 stop bit. No authentication is required.

<!-- UNRESOLVED: REST/TCP/IP control not documented for this series -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # fixed per source
  data_bits: 8     # fixed per source
  parity: none     # fixed per source
  stop_bits: 1     # fixed per source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # power on/off commands present
- queryable    # get-function commands returning state present
- levelable    # contrast, brightness, volume, tint, sharpness, color, bass, treble, balance present
- routable     # input select and PIP input routing commands present
```

## Actions
```yaml
# Protocol 1 - with ID (11-byte set commands)
# Protocol 2 - without ID (5-byte set commands)
# Both protocol variants share the same command codes and value ranges.
# Protocol 1 requires 2-digit decimal ID (00-99); Protocol 2 omits ID.

- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: enum
      values: [000, 001]
      description: 000=STBY, 001=ON
  protocol: [1, 2]
  command_code: "!"  # 0x21

- id: input_select
  label: Input Select
  kind: action
  params:
    - name: input
      type: enum
      values: [000, 001, 002, 003, 004, 005]
      description: 000=VGA, 001=HDMI, 002=DVI-D, 003=AV, 004=YPbPr, 005=S-Video
  protocol: [1, 2]
  command_code: '"'  # 0x22

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: 000~100
  protocol: [1, 2]
  command_code: "#"  # 0x23

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: 000~100
  protocol: [1, 2]
  command_code: "$"  # 0x24

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  protocol: [1, 2]
  command_code: "%"  # 0x25

- id: color
  label: Color
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  protocol: [1, 2]
  command_code: "&"  # 0x26

- id: tint
  label: Tint
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  protocol: [1, 2]
  command_code: "„"  # 0x27

- id: bass
  label: Bass
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  protocol: [1, 2]
  command_code: "."  # 0x2E

- id: treble
  label: Treble
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  protocol: [1, 2]
  command_code: "/"  # 0x2F

- id: balance
  label: Balance
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  protocol: [1, 2]
  command_code: "0"  # 0x30

- id: picture_size
  label: Picture Size
  kind: action
  params:
    - name: mode
      type: enum
      values: [000, 001, 002, 003, 004]
      description: 000=FULL, 001=NORMAL, 002=CUSTOM, 003=DYNAMIC, 004=REAL
  protocol: [1, 2]
  command_code: "1"  # 0x31

- id: osd_language
  label: OSD Language
  kind: action
  params:
    - name: language
      type: enum
      values: [000, 001, 002, 003, 004, 005, 006, 007, 008]
      description: 000=English, 001=French, 002=Spanish, 003=German, 004=Italian, 005=Simplified Chinese, 006=Russian, 007=Polish, 008=Turkish
  protocol: [1, 2]
  command_code: "2"  # 0x32

- id: osd_timeout
  label: OSD Timeout
  kind: action
  params:
    - name: seconds
      type: integer
      range: [5, 120]
  protocol: [1, 2]
  command_code: "3"  # 0x33

- id: volume
  label: Volume
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
  protocol: [1, 2]
  command_code: "5"  # 0x35

- id: mute
  label: Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [000, 001]
      description: 000=OFF, 001=ON
  protocol: [1, 2]
  command_code: "6"  # 0x36

- id: off_timer
  label: Off Timer
  kind: action
  params:
    - name: hours
      type: enum
      values: [000, 001, 002, 003, 004, 005, 006, 007, 008, 009, 010, 011, 012, 013, 014, 015, 016, 017, 018, 019, 020, 021, 022, 023, 024]
      description: 000=OFF, 001~024=hours
  protocol: [1, 2]
  command_code: "7"  # 0x37

- id: pip_mode
  label: PIP Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [000, 001, 002, 003, 004]
      description: 000=OFF, 001=PIP, 002=POP, 003=PBP, 004=PBPA
  protocol: [1, 2]
  command_code: "9"  # 0x39

- id: pip_sound_select
  label: PIP Sound Select
  kind: action
  params:
    - name: source
      type: enum
      values: [000, 001]
      description: 000=Main, 001=PIP
  protocol: [1, 2]
  command_code: ":"  # 0x3A

- id: pip_position
  label: PIP Position
  kind: action
  params:
    - name: position
      type: enum
      values: [000, 001, 002, 003]
      description: 000=Up, 001=Down, 002=Left, 003=Right
  protocol: [1, 2]
  command_code: ";"  # 0x3B

- id: pip_input
  label: PIP Input
  kind: action
  params:
    - name: input
      type: enum
      values: [000, 001, 002, 003, 004, 005]
      description: 000=VGA, 001=HDMI, 002=DVI-D, 003=AV, 004=YPbPr, 005=S-Video
  protocol: [1, 2]
  command_code: "<"  # 0x3C

- id: monitor_id
  label: Monitor ID
  kind: action
  params:
    - name: id
      type: integer
      range: [1, 26]
  protocol: [1, 2]
  command_code: "="  # 0x3D

- id: remote_control
  label: Remote Control
  kind: action
  params:
    - name: mode
      type: enum
      values: [000, 001, 002]
      description: 000=Disable, 001=Enable, 002=Pass through
  protocol: [1, 2]
  command_code: "B"  # 0x42

- id: key_pad
  label: Key Pad Control
  kind: action
  params:
    - name: mode
      type: enum
      values: [000, 001]
      description: 000=Disable, 001=Enable
  protocol: [1, 2]
  command_code: "C"  # 0x43

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []
  protocol: [1, 2]
  command_code: "~"  # 0x7E

# Remote Control Pass-through events (unsolicited, device→host)
- id: rcu_pass_through
  label: Remote Control Pass-through
  kind: event
  params:
    - name: key_code
      type: hex
      description: 1-byte key code from RCU
  protocol: [1, 2]
  direction: device_to_host
  command_code: "p"  # 0x70
- id: key_pad_simulate
  label: Key Pad Simulate Button Press
  kind: action
  params:
    - name: key
      type: integer
      description: "0=POWER, 1=SOURCE, 2=MENU/EXIT, 3=UP, 4=DOWN, 5=LEFT, 6=RIGHT, 7=MUTE"
  command_code: "A"
```

## Feedbacks
```yaml
# Acknowledgement responses (both protocols)
- id: ack_valid
  label: Valid Command Ack
  type: string
  values: ["+"]
  description: "+" (0x2B) sent by device on valid command reception, followed by CR

- id: ack_invalid
  label: Invalid Command Ack
  type: string
  values: ["-"]
  description: "-" (0x2D) sent by device on invalid command reception, followed by CR

# Get-function query responses (value returned in Value1-3 bytes)
- id: power_status
  label: Power Status
  type: enum
  values: [000, 001]
  description: 000=STBY, 001=ON
  command_code: "l"  # 0x6C

- id: input_status
  label: Input Select Status
  type: enum
  values: [000, 001, 002, 003, 004, 005]
  description: 000=VGA, 001=HDMI, 002=DVI-D, 003=AV, 004=YPbPr, 005=S-Video
  command_code: "j"  # 0x6A

- id: contrast_status
  label: Contrast Status
  type: integer
  range: [0, 100]
  command_code: "a"  # 0x61

- id: brightness_status
  label: Brightness Status
  type: integer
  range: [0, 100]
  command_code: "b"  # 0x62

- id: sharpness_status
  label: Sharpness Status
  type: integer
  range: [0, 100]
  command_code: "c"  # 0x63

- id: color_status
  label: Color Status
  type: integer
  range: [0, 100]
  command_code: "d"  # 0x64

- id: tint_status
  label: Tint Status
  type: integer
  range: [0, 100]
  command_code: "e"  # 0x65

- id: volume_status
  label: Volume Status
  type: integer
  range: [0, 100]
  command_code: "f"  # 0x66

- id: mute_status
  label: Mute Status
  type: enum
  values: [000, 001]
  description: 000=OFF (unmuted), 001=ON (muted)
  command_code: "g"  # 0x67

- id: rcu_status
  label: RCU Mode Status
  type: enum
  values: [000, 001, 002]
  description: 000=Disable, 001=Enable, 002=Pass through
  command_code: "h"  # 0x68

- id: keypad_status
  label: Key Pad Status
  type: enum
  values: [000, 001]
  description: 000=Disable, 001=Enable
  command_code: "i"  # 0x69

- id: get_ack
  label: Get ACK
  type: string
  values: ["+", "-"]
  description: Communication link test response; "+" = link OK
  command_code: "z"  # 0x7A
```

## Variables
```yaml
# UNRESOLVED: settable parameters not covered by discrete actions are
# not explicitly documented in the source. All known parameters have
# corresponding set/get action pairs.
```

## Events
```yaml
# Remote Control Pass-through (Protocol 1 and 2)
# When device is set to RCU Pass-through mode, it sends 3-byte packet on RCU press:
# Format: Length(3) | RCU-Code1(MSB) | RCU-Code2(LSB) | CR
#
# Known key codes:
- id: rcu_key_size
  label: RCU Key - Size
  type: event
  value_hex: "0F"

- id: rcu_key_volume_up
  label: RCU Key - Volume Up
  type: event
  value_hex: "10"

- id: rcu_key_volume_down
  label: RCU Key - Volume Down
  type: event
  value_hex: "11"

- id: rcu_key_mute
  label: RCU Key - Mute
  type: event
  value_hex: "12"

- id: rcu_key_power
  label: RCU Key - Power
  type: event
  value_hex: "15"

- id: rcu_key_input
  label: RCU Key - Input
  type: event
  value_hex: "16"

- id: rcu_key_pip_on_off
  label: RCU Key - PIP On/Off
  type: event
  value_hex: "17"

- id: rcu_key_menu
  label: RCU Key - Menu
  type: event
  value_hex: "1A"

- id: rcu_key_up
  label: RCU Key - Up
  type: event
  value_hex: "1B"

- id: rcu_key_down
  label: RCU Key - Down
  type: event
  value_hex: "1C"

- id: rcu_key_left
  label: RCU Key - Left
  type: event
  value_hex: "1D"

- id: rcu_key_right
  label: RCU Key - Right
  type: event
  value_hex: "1E"

- id: rcu_key_set
  label: RCU Key - Set/OK
  type: event
  value_hex: "1F"

- id: rcu_key_pip_input
  label: RCU Key - PIP Input
  type: event
  value_hex: "20"

- id: rcu_key_pip_change
  label: RCU Key - PIP Change
  type: event
  value_hex: "21"

- id: rcu_key_picture_mode
  label: RCU Key - Picture Mode
  type: event
  value_hex: "22"

- id: rcu_key_audio_input
  label: RCU Key - Audio Input
  type: event
  value_hex: "23"

- id: rcu_key_screen_saver_motion
  label: RCU Key - Screen Saver Motion
  type: event
  value_hex: "24"

- id: rcu_key_screen_saver_brightness
  label: RCU Key - Screen Saver Brightness
  type: event
  value_hex: "25"

- id: rcu_key_display
  label: RCU Key - Display
  type: event
  value_hex: "26"

- id: rcu_key_auto_setup
  label: RCU Key - Auto Setup
  type: event
  value_hex: "27"

- id: rcu_key_exit
  label: RCU Key - Exit
  type: event
  value_hex: "28"
```

## Macros
```yaml
# UNRESOLVED: explicit multi-step macro sequences not described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Crossover (null modem) cable required for use with PC
    source: "Pin assignment notes, Section 2.1"
  - description: Remote Control Pass-through mode disables local RCU control while active; all RCU codes are forwarded to host via RS-232
    source: "Remote Control command description, Section 4.3"
# UNRESOLVED: power-on sequencing, voltage/current specs, fault recovery not in source
```

## Notes
- Protocol 1 (with ID): 11-byte Set / 5-byte Get commands. ID range 00–99. Broadcast to all displays: ID=99 (no reply sent).
- Protocol 2 (without ID): 5-byte commands. Best suited for single display or ViewSonic Network Media Players.
- Serial settings are fixed and cannot be changed (9600/8/N/1).
- All commands use ASCII encoding. CR (0x0D) terminates every message.
- ACK timing: device responds with "+" (valid) or "-" (invalid) followed by CR after every command receipt.
- Get-function responses return the current value in Value1–Value3 bytes (4 bytes for On-Hours exception).
- No password, login, or authentication procedure described in the source.
- TCP/IP, REST, or Crestron/Q-SYS driver documentation not found for this series.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: flow control (RTS/CTS, XON/XOFF) not stated in source -->
<!-- UNRESOLVED: supported model list may extend beyond IFP50-5 series variants -->

## Provenance

```yaml
source_domains:
  - viewsonicglobal.com
retrieved_at: 2026-04-30T10:02:07.423Z
last_checked_at: 2026-04-30T15:28:14.408Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T15:28:14.408Z
matched_actions: 38
action_count: 38
confidence: high
summary: "All 38 spec actions matched literally; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
