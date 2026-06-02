---
spec_id: admin/viewsonic-cdxxxx-rs232
schema_version: ai4av-public-spec-v1
revision: 1
title: "ViewSonic Commercial CDxxxx RS-232 Control Spec"
manufacturer: ViewSonic
model_family: CDxxxx
aliases: []
compatible_with:
  manufacturers:
    - ViewSonic
  models:
    - CDxxxx
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - viewsonicglobal.com
source_urls:
  - "https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf?pass"
retrieved_at: 2026-04-30T04:25:10.156Z
last_checked_at: 2026-06-02T07:06:53.959Z
generated_at: 2026-06-02T07:06:53.959Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source doc applies to the \"CDxxxx\" series generically; per-model coverage not enumerated"
  - "firmware version compatibility not stated in source"
  - "voltage, current, and power specifications not stated in source"
  - "flow control setting not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:53.959Z
  matched_actions: 37
  action_count: 37
  confidence: medium
  summary: "All 37 spec actions matched literal command codes in source; transport parameters verified verbatim; full bidirectional coverage. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# ViewSonic Commercial CDxxxx RS-232 Control Spec

## Summary
RS-232 control protocol for ViewSonic Commercial CD-series displays (ViewBoard, Digital Displays, All-in-One LED Displays). DSUB 9-pin male connector on the rear, null-modem crossover cable to PC, fixed 9600/8N1, no authentication. Two protocol variants: with-ID (8-byte payload) and without-ID (5-byte payload); each packet is terminated by CR (0x0D).

<!-- UNRESOLVED: source doc applies to the "CDxxxx" series generically; per-model coverage not enumerated -->

## Transport

```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
auth:
  type: none
```

`auth.type: none` is inferred — the source describes no login, password, or authentication procedure.

## Traits

```yaml
- powerable
- routable
- queryable
- levelable
```

`powerable`, `routable`, `queryable`, `levelable` inferred from documented power, input-select, get, and level commands.

## Actions

```yaml
- id: power
  label: Power
  kind: action
  command: "38 {id} 73 21 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26) or 99 for all displays
    - name: value
      type: string
      description: 000 standby, 001 on
- id: input_select
  label: Input Select
  kind: action
  command: "38 {id} 73 22 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 VGA, 001 HDMI, 002 DVI-D, 003 AV, 004 YPbPr, 005 S-Video
- id: contrast
  label: Contrast
  kind: action
  command: "38 {id} 73 23 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 to 100
- id: brightness
  label: Brightness
  kind: action
  command: "38 {id} 73 24 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 to 100
- id: sharpness
  label: Sharpness
  kind: action
  command: "38 {id} 73 25 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 to 100
- id: color
  label: Color
  kind: action
  command: "38 {id} 73 26 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 to 100
- id: tint
  label: Tint
  kind: action
  command: "38 {id} 73 27 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 to 100
- id: bass
  label: Bass
  kind: action
  command: "38 {id} 73 2E {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 to 100
- id: treble
  label: Treble
  kind: action
  command: "38 {id} 73 2F {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 to 100
- id: balance
  label: Balance
  kind: action
  command: "38 {id} 73 30 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 to 100
- id: picture_size
  label: Picture Size
  kind: action
  command: "38 {id} 73 31 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 FULL, 001 NORMAL, 002 CUSTOM, 003 DYNAMIC, 004 REAL
- id: osd_language
  label: OSD Language
  kind: action
  command: "38 {id} 73 32 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 English, 001 French, 002 Spanish, 003 Germany, 004 Italian, 005 Simplified Chinese, 006 Russian, 007 Polish, 008 Turkish
- id: osd_timeout
  label: OSD Timeout
  kind: action
  command: "38 {id} 73 33 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 005 to 120 seconds
- id: volume
  label: Volume
  kind: action
  command: "38 {id} 73 35 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 to 100
- id: mute
  label: Mute
  kind: action
  command: "38 {id} 73 36 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 off, 001 on
- id: off_timer
  label: Off Timer
  kind: action
  command: "38 {id} 73 37 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 off, 001 to 024 hours
- id: pip_mode
  label: PIP Mode
  kind: action
  command: "38 {id} 73 39 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 off, 001 PIP, 002 POP, 003 PBP, 004 PBPA
- id: pip_sound_select
  label: PIP Sound Select
  kind: action
  command: "38 {id} 73 3A {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 main, 001 PIP
- id: pip_position
  label: PIP Position
  kind: action
  command: "38 {id} 73 3B {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 up, 001 down, 002 left, 003 right
- id: pip_input
  label: PIP Input
  kind: action
  command: "38 {id} 73 3C {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 VGA, 001 HDMI, 002 DVI-D, 003 AV, 004 YPbPr, 005 S-Video
- id: monitor_id
  label: Monitor ID
  kind: action
  command: "38 {id} 73 3D {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 001 to 026
- id: keypad_send
  label: Key Pad Send
  kind: action
  command: "38 {id} 73 41 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 power, 001 source, 002 menu/exit, 003 up, 004 down, 005 left, 006 right, 007 mute
- id: remote_control
  label: Remote Control Mode
  kind: action
  command: "38 {id} 73 42 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 disable, 001 enable, 002 pass-through
- id: keypad_enable
  label: Key Pad Enable
  kind: action
  command: "38 {id} 73 43 {value} 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
    - name: value
      type: string
      description: 000 disable, 001 enable
- id: factory_reset
  label: Factory Reset
  kind: action
  command: "38 {id} 73 7E 000 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
- id: get_contrast
  label: Get Contrast
  kind: query
  command: "38 {id} 67 61 000 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
- id: get_brightness
  label: Get Brightness
  kind: query
  command: "38 {id} 67 62 000 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
- id: get_sharpness
  label: Get Sharpness
  kind: query
  command: "38 {id} 67 63 000 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
- id: get_color
  label: Get Color
  kind: query
  command: "38 {id} 67 64 000 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
- id: get_tint
  label: Get Tint
  kind: query
  command: "38 {id} 67 65 000 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
- id: get_volume
  label: Get Volume
  kind: query
  command: "38 {id} 67 66 000 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
- id: get_mute
  label: Get Mute
  kind: query
  command: "38 {id} 67 67 000 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
- id: get_rcu
  label: Get RCU Mode
  kind: query
  command: "38 {id} 67 68 000 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
- id: get_keypad
  label: Get Key Pad
  kind: query
  command: "38 {id} 67 69 000 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
- id: get_input_select
  label: Get Input Select
  kind: query
  command: "38 {id} 67 6A 000 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
- id: get_power_status
  label: Get Power Status
  kind: query
  command: "38 {id} 67 6C 000 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
- id: get_ack
  label: Get ACK
  kind: query
  command: "38 {id} 67 7A 000 0D"
  params:
    - name: id
      type: string
      description: Two-digit ASCII TV ID (01-26)
```

## Feedbacks

```yaml
- id: power_state
  type: enum
  values: [stby, on]
- id: input_source
  type: enum
  values: [vga, hdmi, dvi-d, av, ypbpr, s-video]
- id: contrast
  type: integer
  range: [0, 100]
- id: brightness
  type: integer
  range: [0, 100]
- id: sharpness
  type: integer
  range: [0, 100]
- id: color
  type: integer
  range: [0, 100]
- id: tint
  type: integer
  range: [0, 100]
- id: volume
  type: integer
  range: [0, 100]
- id: mute
  type: enum
  values: [off, on]
- id: rcu_mode
  type: enum
  values: [disable, enable, pass_through]
- id: keypad_enabled
  type: enum
  values: [disable, enable]
```

## Events

```yaml
- id: rcu_pass_through
  description: When monitor is in RCU pass-through mode, RCU key presses are forwarded to PC as 3-byte packets
  packet: "33 {msb} {lsb} 0D"
  codes:
    "Size": "0F"
    "Volume Up": "10"
    "Volume Down": "11"
    "Mute": "12"
    "POWER": "15"
    "INPUT": "16"
    "PIP ON/OFF": "17"
    "MENU": "1A"
    "Up": "1B"
    "Down": "1C"
    "Left": "1D"
    "Right": "1E"
    "SET": "1F"
    "PIP INPUT": "20"
    "PIP CHANGE": "21"
    "PICTURE MODE": "22"
    "AUDIO INPUT": "23"
    "SCREEN SAVER MOTION": "24"
    "SCREEN SAVER BRIGHTNESS": "25"
    "DISPLAY": "26"
    "AUTO SETUP": "27"
    "EXIT": "28"
```

## Notes

### Cable and connector
- Connector: DSUB 9-pin male on the rear of the display.
- Cable: crossover (null-modem) cable required when connecting to a PC.

### Protocol 1 packet framing (with ID)
- Length byte 0x38 = ASCII "8" (8 bytes of payload, excluding CR).
- ID field: 2 ASCII bytes, "01"-"26" for individual displays, or "99" to broadcast to all.
- Command Type: 0x73 ('s') for Set, 0x67 ('g') for Get.
- Command: 1 ASCII byte, the command code.
- Value: 3 ASCII bytes, zero-padded number, or fixed "000" for queries.
- Every packet ends with CR (0x0D).
- Valid command reply: 0x2B ('+') + CR.
- Invalid command reply: 0x2D ('-') + CR.
- Broadcast ("99") receives no reply.

### Protocol 2 packet framing (without ID)
- Length byte 0x35 = ASCII "5" (5 bytes of payload, excluding CR).
- No ID field; intended for single-display control and ViewSonic Network Media Players.
- Same command codes and value ranges as Protocol 1.
- Valid command reply: 0x2B ('+') + CR.
- Invalid command reply: 0x2D ('-') + CR.

### Get-Response (Protocol 2)
- Get reply packet: 0x35 (length) + 4 ASCII value bytes + CR.
- Exception: On-Hours response is 6 bytes (value 00000-99999).
- Get-ACK returns '+' or '-' rather than a numeric value.

### RCU pass-through
- Enabled by setting the Remote Control action to value 002.
- In pass-through mode, the RCU has no effect on the display; key codes are forwarded to the PC over RS-232 as 3-byte packets terminated with CR.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: voltage, current, and power specifications not stated in source -->
<!-- UNRESOLVED: flow control setting not stated in source -->

## Provenance

```yaml
source_domains:
  - viewsonicglobal.com
source_urls:
  - "https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf?pass"
retrieved_at: 2026-04-30T04:25:10.156Z
last_checked_at: 2026-06-02T07:06:53.959Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:53.959Z
matched_actions: 37
action_count: 37
confidence: medium
summary: "All 37 spec actions matched literal command codes in source; transport parameters verified verbatim; full bidirectional coverage. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source doc applies to the \"CDxxxx\" series generically; per-model coverage not enumerated"
- "firmware version compatibility not stated in source"
- "voltage, current, and power specifications not stated in source"
- "flow control setting not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
