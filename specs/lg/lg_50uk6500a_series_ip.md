---
spec_id: admin/lg-50uk6500a-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG 50UK6500A Series Control Spec"
manufacturer: LG
model_family: 50UK6500A
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 50UK6500A
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - justaddpower.com
source_urls:
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
retrieved_at: 2026-06-02T02:35:27.943Z
last_checked_at: 2026-06-02T17:23:01.670Z
generated_at: 2026-06-02T17:23:01.670Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control protocol mentioned in input hint but not present in this source document. The refined document covers RS-232C only."
  - "IR codes section lists discrete codes but no IR receiver IP control mapping is in scope of this spec."
  - "whether the device returns a discrete power-state ACK for the FF read on opcode `ka`. Treated as inferred."
  - "no auxiliary variable read/write pair documented in source beyond the action/query set."
  - "source describes only solicited request/response (ACK/NG) and one IR-input \"Key\" command (mc) that takes a code; no unsolicited event stream is documented."
  - "source does not document any multi-step macro sequences defined on the device."
  - "source does not include explicit safety warnings, interlock procedures, or power-on sequencing requirements."
  - "TCP/IP / LAN control protocol not present in this source."
  - "full IR key-code table referenced on page A18 of the source is not in the refined excerpt."
  - "voltage, current, power consumption, and physical pinout of the RS-232C connector are not stated."
  - "firmware version compatibility range not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:01.670Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec actions matched verbatim in source command table; transport parameters verified; bidirectional coverage confirmed. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# LG 50UK6500A Series Control Spec

## Summary
RS-232C control protocol for the LG 50UK6500A Series display. Source document covers 26 commands (power, input select, picture/sound tuning, OSD, key/remote lock, tile mode, fault reads) transmitted as ASCII over a UART link at 9600 8N1. Set ID addressing (1-99, 0 = broadcast) allows multi-set installations.

<!-- UNRESOLVED: TCP/IP control protocol mentioned in input hint but not present in this source document. The refined document covers RS-232C only. -->
<!-- UNRESOLVED: IR codes section lists discrete codes but no IR receiver IP control mapping is in scope of this spec. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

**Addressing notes (from source):**
- Set ID range: 1-99 (two ASCII digits). Set ID `0` broadcasts to all sets; do not check ACK in that case.
- Frame terminator: Carriage Return, ASCII `0x0D`.
- Field separator: ASCII Space `0x20`.
- Communication code: ASCII.

## Traits
```yaml
- powerable       # inferred: power on/off commands present
- routable        # inferred: input select command present
- queryable       # inferred: query commands returning state present
- levelable       # inferred: volume, contrast, brightness, color, tint, sharpness, balance controls present
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  command: "ka {set_id} {data}\r"   # data 00 = Off, 01 = On, FF = query (see status action)
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 00H (off) or 01H (on)

- id: input_select
  label: Input Select
  kind: action
  command: "kb {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 02H AV, 04H Component1, 05H Component2, 06H RGB(DTV), 07H RGB(PC), 08H HDMI(DTV), 09H HDMI(PC)

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "kc {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 01H 4:3, 02H 16:9, 03H Horizon, 04H Zoom1, 05H Zoom2, 06H Original, 07H 14:9, 08H Full (Europe), 09H 1:1 (PC)

- id: screen_mute
  label: Screen Mute
  kind: action
  command: "kd {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 00H picture on, 01H picture off

- id: volume_mute
  label: Volume Mute
  kind: action
  command: "ke {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 00H mute on, 01H mute off

- id: volume_control
  label: Volume Control
  kind: action
  command: "kf {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 00H-64H (0-100 in 101 steps; real mapping: 0=0, A=10, F=15, 10=16, 64=100)

- id: contrast
  label: Contrast
  kind: action
  command: "kg {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 00H-64H

- id: brightness
  label: Brightness
  kind: action
  command: "kh {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 00H-64H

- id: color
  label: Color
  kind: action
  command: "ki {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 00H-64H (video only)

- id: tint
  label: Tint
  kind: action
  command: "kj {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 00H Red (L50) - 64H Green (R50); midpoint 32H = 0

- id: sharpness
  label: Sharpness
  kind: action
  command: "kk {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 00H-64H (video only)

- id: osd_select
  label: OSD Select
  kind: action
  command: "kl {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 00H OSD off, 01H OSD on

- id: remote_lock
  label: Remote Lock / Key Lock
  kind: action
  command: "km {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 00H off, 01H on (locks remote control and local keys)

- id: balance
  label: Balance
  kind: action
  command: "kt {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 00H-64H (L50 - R50; midpoint 32H = center)

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "ku {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 00H Normal, 01H Cool, 02H Warm, 03H User

- id: abnormal_state
  label: Abnormal State (Read)
  kind: query
  command: "kz {set_id} FF\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
  notes: "Response data: 0 Normal (power on + signal), 1 No signal (power on), 2 Off by remote, 3 Off by sleep timer, 4 Off by RS-232C, 6 AC down, 8 Off by off-timer, 9 Off by auto off."

- id: ism_mode
  label: ISM Mode
  kind: action
  command: "jp {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 01H Inversion, 02H Orbiter, 04H White Wash, 08H Normal (command table lists range 00-08; only 1/2/4/8 documented in detail)

- id: auto_configuration
  label: Auto Configure
  kind: action
  command: "ju {set_id} 01\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
  notes: "Operates only in RGB(PC) mode."

- id: key
  label: IR Remote Key
  kind: action
  command: "mc {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: IR key code (hex) per source page A18

- id: tile_mode
  label: Tile Mode
  kind: action
  command: "dd {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 00H off, 12H 1x2, 13H 1x3, 14H 1x4 ... 44H 4x4 (column x row; 0X/X0 invalid except 00)

- id: tile_h_size
  label: Tile H Size
  kind: action
  command: "dg {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 00H-64H (horizontal tile size)

- id: tile_v_size
  label: Tile V Size
  kind: action
  command: "dh {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 00H-64H (vertical tile size)

- id: tile_id_set
  label: Tile ID Set
  kind: action
  command: "di {set_id} {data}\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
    - name: data
      type: string
      description: 00H-10H (tile ID for tiling function)

- id: elapsed_time
  label: Elapsed Time Return
  kind: query
  command: "dl {set_id} FF\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
  notes: "Response data is used hours in hexadecimal."

- id: temperature_value
  label: Temperature Value
  kind: query
  command: "dn {set_id} FF\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
  notes: "Response data is 1 byte hex (inside temperature reading)."

- id: lamp_fault_check
  label: Lamp Fault Check
  kind: query
  command: "dp {set_id} FF\r"
  params:
    - name: set_id
      type: string
      description: Set ID 01-99, or 00 for broadcast
  notes: "Response: 0 Lamp Fault, 1 Lamp OK."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  source: "ka {set_id} {data}\r" with data=FF (see abnormal_state)
  # Note: explicit power-state query by sending FF on the `ka` opcode is not shown as a dedicated row in the command reference table; it is documented only inside the Power (k a) detail section.
  # UNRESOLVED: whether the device returns a discrete power-state ACK for the FF read on opcode `ka`. Treated as inferred.

- id: abnormal_state_code
  type: enum
  values: [normal, no_signal, off_by_remote, off_by_sleep, off_by_rs232, ac_down, off_by_off_timer, off_by_auto_off]
  source: "kz {set_id} FF\r"

- id: lamp_fault
  type: enum
  values: [fault, ok]
  source: "dp {set_id} FF\r"

- id: ack_ok
  type: string
  pattern: "[command2] [set_id] OK [data]"
  notes: "Returned for every successful command. For read mode, [data] holds present status; for write mode, [data] echoes the value written."

- id: ack_ng
  type: string
  pattern: "[command2] [set_id] NG [data]"
  notes: "Returned on error."
```

## Variables
```yaml
# Per-source no separate variable surface; all settable parameters are exposed as parameterized actions above (volume, contrast, brightness, color, tint, sharpness, balance, color temperature).
# UNRESOLVED: no auxiliary variable read/write pair documented in source beyond the action/query set.
```

## Events
```yaml
# UNRESOLVED: source describes only solicited request/response (ACK/NG) and one IR-input "Key" command (mc) that takes a code; no unsolicited event stream is documented.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step macro sequences defined on the device.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not include explicit safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Source document is the LG commercial-display RS-232C protocol manual for the 50UK6500A Series (and family). Frame format is strictly `[C1][C2] [SetID] [DATA]\r` with `[Cr] = 0x0D` and field separator `0x20`. All numeric fields (SetID, DATA) are 2-character uppercase hex.
- ACK/NG framing: the command's second letter is echoed back, e.g. setting power on Set 1 returns `a 01 OK01x`; reading abnormal state on Set 1 returns `z 01 OK02x` (where `02` is the data byte). The `x` suffix is a literal character per source.
- Set ID `0` is broadcast — the source explicitly warns that ACK messages from all sets will collide and must not be checked.
- Power state read uses opcode `ka` with DATA `FF`, returning the same ACK shape as a write. This is shown in the Power (k a) detail section but not as a separate row in the Command Reference List.
- IR codes section (page A18 reference) is reproduced in the source but uses the wired-remote IR path, not RS-232; included here only as cross-reference, not as RS-232 commands. The IR-code page-numbered key table (A18) is not in the refined excerpt, so concrete `mc` key codes are not enumerated.
- TCP/IP control was hinted in the input metadata but is not documented in this source. Treat as a separate protocol to be captured from a different source.
<!-- UNRESOLVED: TCP/IP / LAN control protocol not present in this source. -->
<!-- UNRESOLVED: full IR key-code table referenced on page A18 of the source is not in the refined excerpt. -->
<!-- UNRESOLVED: voltage, current, power consumption, and physical pinout of the RS-232C connector are not stated. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
```

Self-check: no invented voltage/current/port/baud; `status: draft`; `declared_confidence: low`; all 26 source commands enumerated; Set ID parameterized; `entity_id` placeholder retained; UNRESOLVED markers in place for TCP/IP, IR table, firmware, pinout.

## Provenance

```yaml
source_domains:
  - justaddpower.com
source_urls:
  - https://www.justaddpower.com/docs/manuals/rs232-lg.pdf
retrieved_at: 2026-06-02T02:35:27.943Z
last_checked_at: 2026-06-02T17:23:01.670Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:01.670Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec actions matched verbatim in source command table; transport parameters verified; bidirectional coverage confirmed. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control protocol mentioned in input hint but not present in this source document. The refined document covers RS-232C only."
- "IR codes section lists discrete codes but no IR receiver IP control mapping is in scope of this spec."
- "whether the device returns a discrete power-state ACK for the FF read on opcode `ka`. Treated as inferred."
- "no auxiliary variable read/write pair documented in source beyond the action/query set."
- "source describes only solicited request/response (ACK/NG) and one IR-input \"Key\" command (mc) that takes a code; no unsolicited event stream is documented."
- "source does not document any multi-step macro sequences defined on the device."
- "source does not include explicit safety warnings, interlock procedures, or power-on sequencing requirements."
- "TCP/IP / LAN control protocol not present in this source."
- "full IR key-code table referenced on page A18 of the source is not in the refined excerpt."
- "voltage, current, power consumption, and physical pinout of the RS-232C connector are not stated."
- "firmware version compatibility range not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
