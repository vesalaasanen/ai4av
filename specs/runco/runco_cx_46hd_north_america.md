---
spec_id: admin/runco-cx-46hd-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Runco CX-46HD Control Spec"
manufacturer: Runco
model_family: CX-46HD
aliases: []
compatible_with:
  manufacturers:
    - Runco
  models:
    - CX-46HD
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hdtvsolutions.com
  - manualslib.com
  - applicationmarket.crestron.com
source_urls:
  - https://www.hdtvsolutions.com/pdf/CX-40HD_CX-46HDmanual_1-1.pdf
  - "https://www.manualslib.com/manual/315434/Runco-Crystal-Series-Cx-40hd.html#product-CX-46HD"
  - https://applicationmarket.crestron.com/runco-cx-46hd-north-america/
  - https://applicationmarket.crestron.com/content/Help/Runco/runco_cx-46hd_v1_0_help.pdf
retrieved_at: 2026-04-29T21:59:40.595Z
last_checked_at: 2026-09-28T05:22:01.181Z
generated_at: 2026-09-28T05:22:01.181Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP support not mentioned in source"
  - "no explicit query commands returning device state found"
  - "no discrete settable parameters beyond actions; no variable readback documented"
  - "no unsolicited event notifications documented"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "TCP/IP or network control not mentioned in source"
  - "firmware version compatibility not stated"
  - "no query commands for current device state documented"
verification:
  verdict: verified
  checked_at: 2026-09-28T05:22:01.181Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 parameterized command forms match, including all 51 remote-key values; baud, framing, ranges and major-before-minor sequencing are supported. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Runco CX-46HD Control Spec

## Summary
Runco CX-46HD North America variant. RS-232 serial control at 115200 baud (default), 8N1, no flow control. ASCII command syntax with `]` acknowledgement prefix. Supports power, input routing, audio, PIP, and aspect ratio control.

<!-- UNRESOLVED: TCP/IP support not mentioned in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # default; alternatives: 19200, 9600, 2400 (set via ISF Calibration menu)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # Authentication requirements are not stated in the source
```

## Traits
```yaml
# inferred from command set:
# - powerable       ([SAB power on/off)
# - routable        ([S4A main input, [+4A next input, [S4G PIP input)
# - levelable       ([S3A volume, [+3A/[-3A volume up/down)
# - queryable       (device returns ]XXXX ack; state query commands not explicitly listed)
```

## Actions
```yaml
- id: set_audio_volume
  command: "[S3A0###"
  wire_format: "ASCII; volume padded to 3 digits (000-100)"
  label: Set Audio Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level 000-100

- id: audio_volume_up
  command: "[+3A"
  label: Audio Volume Up
  kind: action
  params: []

- id: audio_volume_down
  command: "[-3A"
  label: Audio Volume Down
  kind: action
  params: []

- id: set_audio_mute
  command: "[S3E000#"
  wire_format: "ASCII; trailing digit 0 or 1, padded to 4 chars total"
  label: Set Audio Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: "0 = not muted, 1 = muted"

- id: set_main_input
  command: "[S4A000#"
  wire_format: "ASCII; trailing digit per input enum"
  label: Set Main Input
  kind: action
  params:
    - name: input
      type: integer
      description: "0=TV, 1=Input1, 2=Input2, 3=Input3, 4=Input4, 6=RGB, 8=HDMI1, 9=HDMI2"

- id: next_main_input
  command: "[+4A"
  label: Next Main AV Input
  kind: action
  params: []

- id: set_aspect_ratio
  command: "[S4E000#"
  wire_format: "ASCII; trailing digit per ratio enum"
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: "0=4:3, 1=VirtualWide, 2=Letterbox, 3=16:9"

- id: set_pip_input
  command: "[S4G000#"
  wire_format: "ASCII; trailing digit per input enum"
  label: Set PIP Input
  kind: action
  params:
    - name: input
      type: integer
      description: "0=TV, 1=Input1, 2=Input2, 3=Input3, 4=Input4, 6=RGB, 8=HDMI1, 9=HDMI2"

- id: next_pip_input
  command: "[+4G"
  label: Next PIP AV Input
  kind: action
  params: []

- id: set_power
  command: "[SAB000#"
  wire_format: "ASCII; 0=standby, 1=on"
  label: Set Power
  kind: action
  params:
    - name: power
      type: integer
      description: "0 = standby, 1 = on"

- id: set_caption
  command: "[SCA000#"
  wire_format: "ASCII; 0=off, 1=on"
  label: Set Caption On/Off
  kind: action
  params:
    - name: caption
      type: integer
      description: "0 = off, 1 = on"

- id: set_major_channel_air
  command: "[SCB00##"
  wire_format: "ASCII; ## = 01-99 (AIR)"
  label: Set Major Channel (AIR)
  kind: action
  params:
    - name: channel
      type: integer
      description: "## = 01-99 for AIR"

- id: set_major_channel_cable
  command: "[SCB1###"
  wire_format: "ASCII; ### = 001-125 (CABLE)"
  label: Set Major Channel (CABLE)
  kind: action
  params:
    - name: channel
      type: integer
      description: "### = 001-125 for CABLE"

- id: set_minor_channel
  command: "[SCD####"
  wire_format: "ASCII; #### = 0000-9999; must follow major channel command"
  label: Set Minor Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: "#### = 0000-9999. Send major channel command first."

- id: set_pip_mode
  command: "[SDA000#"
  wire_format: "ASCII; 0=OFF, 1=PIP, 2=PBP"
  label: Set PIP Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=OFF, 1=PIP, 2=PBP"

- id: channel_up
  command: "[+CB"
  label: TV Channel Up
  kind: action
  params: []

- id: channel_down
  command: "[-CB"
  label: TV Channel Down
  kind: action
  params: []

- id: set_pip_size
  command: "[SDB000#"
  wire_format: "ASCII; 0=small, 1=medium, 2=large"
  label: Set PIP Size
  kind: action
  params:
    - name: size
      type: integer
      description: "0=small, 1=medium, 2=large"

- id: set_pip_aspect
  command: "[SDE000#"
  wire_format: "ASCII; 0=4:3, 1=16:9"
  label: Set PIP Aspect Ratio
  kind: action
  params:
    - name: aspect
      type: integer
      description: "0=4:3, 1=16:9"

- id: set_pip_position
  command: "[SDF000#"
  wire_format: "ASCII; 0=TL, 1=TR, 2=BL, 3=BR"
  label: Set PIP Window Position
  kind: action
  params:
    - name: position
      type: integer
      description: "0=Top/Left, 1=Top/Right, 2=Bottom/Left, 3=Bottom/Right"

- id: remote_key
  command: "[key####"
  wire_format: "ASCII; #### = 4-digit keycode from source table"
  label: Remote Control Button
  kind: action
  params:
    - name: keycode
      type: integer
      values: [2, 15, 4, 5, 6, 8, 9, 10, 12, 13, 14, 35, 17, 23, 105, 27, 28, 1, 102, 101, 19, 3, 62, 31, 40, 43, 39, 126, 7, 16, 18, 11, 46, 26, 100, 63, 47, 34, 32, 37, 52, 33, 36, 53, 54, 24, 91, 57, 45, 44, 55]
      description: "Allowed remote keycode; encode as exactly four decimal digits, including leading zeros, after [key."
```

## Feedbacks
```yaml
# Acknowledgement format: ]XXXX after valid command
# Error responses: >MAX (value too high), <MIN (value too low), -N/A (unrecognized command)
# UNRESOLVED: no explicit query commands returning device state found
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond actions; no variable readback documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Commands are ASCII, not case-sensitive. No carriage return required. Valid commands return `]XXXX` where XXXX is the four-digit command code. Invalid parameter range returns `>MAX` or `<MIN`. Unrecognized command returns `-N/A`.

Baud rate configurable via ISF Calibration menu: 115200 (default), 19200, 9600, 2400.

Pin assignments: Pin 2 = RX, Pin 3 = TX, Pin 5 = Ground. Pins 1,4,6,7,8,9 = NC.

<!-- UNRESOLVED: TCP/IP or network control not mentioned in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: no query commands for current device state documented -->

Remote emulation payloads use `[key` followed by the four-digit keycode below (no closing bracket, no CR):

| Keycode | Button |
| --- | --- |
| 0002 | OFF |
| 0015 | ON |
| 0004 | Num1 |
| 0005 | Num2 |
| 0006 | Num3 |
| 0008 | Num4 |
| 0009 | Num5 |
| 0010 | Num6 |
| 0012 | Num7 |
| 0013 | Num8 |
| 0014 | Num9 |
| 0035 | Number - |
| 0017 | Num0 |
| 0023 | TV |
| 0105 | INPUT1 |
| 0027 | INPUT2 |
| 0028 | INPUT3 |
| 0001 | INPUT4 |
| 0102 | HDMI1 |
| 0101 | HDMI2 |
| 0019 | RGB HD |
| 0003 | CUSTOM |
| 0062 | ISF NIGHT |
| 0031 | ISF DAY |
| 0040 | 16:9 ANA |
| 0043 | 4:3 |
| 0039 | LETTERBOX |
| 0126 | VIRTUALWIDE |
| 0007 | Right |
| 0016 | Down |
| 0018 | Up |
| 0011 | Left |
| 0046 | ENTER |
| 0026 | MENU |
| 0100 | EXIT |
| 0063 | PIP ASPECT RATIO |
| 0047 | PIP SIZE |
| 0034 | PIP POSITION |
| 0032 | PIP |
| 0037 | TIMER OFF |
| 0052 | S.SWAP |
| 0033 | SWAP |
| 0036 | TV/AV |
| 0053 | S.MODE |
| 0054 | SURROUND |
| 0024 | MTS/SAP |
| 0091 | MUTE |
| 0057 | PREVIOUS CHANNEL |
| 0045 | FAVORITE CHANNEL |
| 0044 | CLOSED CAPTION |
| 0055 | INFO |

## Provenance

```yaml
source_domains:
  - hdtvsolutions.com
  - manualslib.com
  - applicationmarket.crestron.com
source_urls:
  - https://www.hdtvsolutions.com/pdf/CX-40HD_CX-46HDmanual_1-1.pdf
  - "https://www.manualslib.com/manual/315434/Runco-Crystal-Series-Cx-40hd.html#product-CX-46HD"
  - https://applicationmarket.crestron.com/runco-cx-46hd-north-america/
  - https://applicationmarket.crestron.com/content/Help/Runco/runco_cx-46hd_v1_0_help.pdf
retrieved_at: 2026-04-29T21:59:40.595Z
last_checked_at: 2026-09-28T05:22:01.181Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-28T05:22:01.181Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 parameterized command forms match, including all 51 remote-key values; baud, framing, ranges and major-before-minor sequencing are supported. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP support not mentioned in source"
- "no explicit query commands returning device state found"
- "no discrete settable parameters beyond actions; no variable readback documented"
- "no unsolicited event notifications documented"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures in source"
- "TCP/IP or network control not mentioned in source"
- "firmware version compatibility not stated"
- "no query commands for current device state documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
