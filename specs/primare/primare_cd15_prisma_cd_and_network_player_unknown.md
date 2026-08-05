---
spec_id: admin/primare-cd15
schema_version: ai4av-public-spec-v1
revision: 1
title: "Primare CD15 Control Spec"
manufacturer: Primare
model_family: CD15
aliases: []
compatible_with:
  manufacturers:
    - Primare
  models:
    - CD15
  firmware: "\"v1.62 (tested)\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2018/11/CD15-RS232-Command-list-official-2018-11-12.pdf
  - https://primare.net/wp-content/uploads/2022/01/Primare-Prisma-API-TCPIP-and-RS232-2025-06-13.pdf
retrieved_at: 2026-07-10T20:17:48.097Z
last_checked_at: 2026-07-12T08:59:06.341Z
generated_at: 2026-07-12T08:59:06.341Z
firmware_coverage: "\"v1.62 (tested)\""
protocol_coverage: []
known_gaps:
  - "Prisma/network player features (streaming services, network configuration) not documented in the RS232 command list. Track number encoding for multi-digit tracks is not fully explained. Read-query response formats (manufacturer, model, version, BT name) are not documented."
  - "flow control not stated in source"
  - "source marks as \"n/a\" - no RS232 payload"
  - "toggle commands (power_toggle, volume_decrease/increase,"
  - "response format for read queries (manufacturer, model,"
  - "verbose mode may emit unsolicited state-change events,"
  - "source does not document power-on sequencing requirements"
  - "flow_control not stated in source"
  - "response formats for read queries (manufacturer/model/version/BT name) not documented"
  - "verbose mode event format and trigger conditions not documented"
  - "toggle command reply bytes not explicitly documented (\"See below\" in source)"
  - "track number multi-digit encoding algorithm not explained"
  - "Prisma network streaming features not covered in this RS232 command document"
verification:
  verdict: verified
  checked_at: 2026-07-12T08:59:06.341Z
  matched_actions: 58
  action_count: 58
  confidence: medium
  summary: "All 58 spec actions matched verbatim with source commands; serial transport parameters (115200/8/N/1) confirmed; color buttons correctly marked as n/a. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-10
---

# Primare CD15 Control Spec

## Summary
The Primare CD15 is a CD player and network streamer with Bluetooth support, controllable via RS-232 serial interface. This spec covers the binary RS232 command protocol including power, volume, balance, mute, dim, transport (play/pause/stop/seek), menu navigation, Bluetooth configuration, and remote-control emulation commands.

<!-- UNRESOLVED: Prisma/network player features (streaming services, network configuration) not documented in the RS232 command list. Track number encoding for multi-digit tracks is not fully explained. Read-query response formats (manufacturer, model, version, BT name) are not documented. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred: power on/off/standby commands present
  - levelable   # inferred: volume and balance control present
  - queryable   # inferred: read manufacturer/model/version queries present
```

## Actions
```yaml
# ── Frame format ──
# All commands use the frame: 0x02 [addr] [cmd_bytes...] 0x10 0x03
#   0x02        = start byte
#   0x57 (addr) = write command (set/toggle/action)
#   0x52 (addr) = read query
#   0x10 0x03   = end sequence
# Remote-emulation commands use addr 0x57 with first cmd byte 0x0f.

# ── Power ──
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "0x02 0x57 0x01 0x00 0x10 0x03"
  params: []

- id: power_set
  label: Power Set
  kind: action
  command: "0x02 0x57 0x81 0x{state} 0x10 0x03"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0 = standby, 1 = operate"

# ── Volume ──
- id: volume_decrease
  label: Volume Decrease
  kind: action
  command: "0x02 0x57 0x03 0xff 0x10 0x03"
  params: []

- id: volume_increase
  label: Volume Increase
  kind: action
  command: "0x02 0x57 0x03 0x01 0x10 0x03"
  params: []

- id: volume_set
  label: Volume Set
  kind: action
  command: "0x02 0x57 0x83 0x{level} 0x10 0x03"
  params:
    - name: level
      type: integer
      min: 0
      max: 99
      description: "Volume level in dB (0x00=0dB through 0x63=99dB)"

# ── Balance ──
- id: balance_step_left
  label: Balance Step Left
  kind: action
  command: "0x02 0x57 0x04 0xff 0x10 0x03"
  params: []

- id: balance_step_right
  label: Balance Step Right
  kind: action
  command: "0x02 0x57 0x04 0x01 0x10 0x03"
  params: []

- id: balance_set
  label: Balance Set
  kind: action
  command: "0x02 0x57 0x84 0x{position} 0x10 0x03"
  params:
    - name: position
      type: integer
      min: 1
      max: 19
      description: "0x01=full right (00LR-9) through 0x0a=center (00LR00) through 0x13=full left (-9LR00)"

# ── Mute ──
- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "0x02 0x57 0x09 0x00 0x10 0x03"
  params: []

- id: mute_set
  label: Mute Set
  kind: action
  command: "0x02 0x57 0x89 0x{state} 0x10 0x03"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0 = mute disable, 1 = mute enable"

# ── Dim ──
- id: dim_cycle
  label: Dim Cycle
  kind: action
  command: "0x02 0x57 0x0a 0x00 0x10 0x03"
  params: []

- id: dim_set
  label: Dim Set
  kind: action
  command: "0x02 0x57 0x8a 0x{level} 0x10 0x03"
  params:
    - name: level
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=OFF, 1=LOW, 2=MID, 3=HIGH"

# ── Verbose ──
- id: verbose_toggle
  label: Verbose Toggle
  kind: action
  command: "0x02 0x57 0x0d 0x00 0x10 0x03"
  params: []

- id: verbose_set
  label: Verbose Set
  kind: action
  command: "0x02 0x57 0x8d 0x{state} 0x10 0x03"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0 = disable verbose, 1 = enable verbose"

# ── Menu ──
- id: menu_toggle
  label: Menu Toggle
  kind: action
  command: "0x02 0x57 0x0e 0x00 0x10 0x03"
  params: []

- id: menu_set
  label: Menu Set
  kind: action
  command: "0x02 0x57 0x8e 0x{state} 0x10 0x03"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0 = exit menu, 1 = enter menu"

# ── IR Input ──
- id: ir_input_toggle
  label: IR Input Toggle
  kind: action
  command: "0x02 0x57 0x12 0x00 0x10 0x03"
  params: []

- id: ir_input_set
  label: IR Input Set
  kind: action
  command: "0x02 0x57 0x92 0x{source} 0x10 0x03"
  params:
    - name: source
      type: integer
      enum: [0, 1]
      description: "0 = front IR, 1 = back IR"

# ── Factory Reset ──
- id: factory_reset
  label: Factory Reset
  kind: action
  command: "0x02 0x57 0x13 0x00 0x10 0x03"
  params: []

# ── Bluetooth Visible ──
- id: bt_visible_toggle
  label: Bluetooth Visible Toggle
  kind: action
  command: "0x02 0x57 0x18 0x00 0x10 0x03"
  params: []

- id: bt_visible_set
  label: Bluetooth Visible Set
  kind: action
  command: "0x02 0x57 0x98 0x{state} 0x10 0x03"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0 = disable BT visibility, 1 = enable BT visibility"

# ── Bluetooth Auto-Connect ──
- id: bt_auto_connect_toggle
  label: Bluetooth Auto-Connect Toggle
  kind: action
  command: "0x02 0x57 0x19 0x00 0x10 0x03"
  params: []

- id: bt_auto_connect_set
  label: Bluetooth Auto-Connect Set
  kind: action
  command: "0x02 0x57 0x99 0x{state} 0x10 0x03"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0 = disable BT auto-connect, 1 = enable BT auto-connect"

# ── Read Queries (addr 0x52) ──
- id: query_manufacturer
  label: Read Manufacturer
  kind: query
  command: "0x02 0x52 0x15 0x00 0x10 0x03"
  params: []

- id: query_model
  label: Read Model
  kind: query
  command: "0x02 0x52 0x16 0x00 0x10 0x03"
  params: []

- id: query_version
  label: Read Software Version
  kind: query
  command: "0x02 0x52 0x17 0x00 0x10 0x03"
  params: []

- id: query_bt_name
  label: Read Bluetooth Name
  kind: query
  command: "0x02 0x52 0x1c 0x00 0x10 0x03"
  params: []

# ── Remote Emulation Commands (cmd byte 0x0f) ──
- id: remote_power_toggle
  label: Remote Power Toggle
  kind: action
  command: "0x02 0x57 0x0f 0x03 0x10 0x03"
  params: []

- id: remote_operate
  label: Remote Operate
  kind: action
  command: "0x02 0x57 0x0f 0x01 0x10 0x03"
  params: []

- id: remote_up
  label: Remote Arrow Up
  kind: action
  command: "0x02 0x57 0x0f 0x1a 0x10 0x03"
  params: []

- id: remote_down
  label: Remote Arrow Down
  kind: action
  command: "0x02 0x57 0x0f 0x1b 0x10 0x03"
  params: []

- id: remote_left
  label: Remote Arrow Left
  kind: action
  command: "0x02 0x57 0x0f 0x1c 0x10 0x03"
  params: []

- id: remote_right
  label: Remote Arrow Right
  kind: action
  command: "0x02 0x57 0x0f 0x1d 0x10 0x03"
  params: []

- id: remote_mute
  label: Remote Mute
  kind: action
  command: "0x02 0x57 0x0f 0x2d 0x10 0x03"
  params: []

- id: remote_dim
  label: Remote Dim
  kind: action
  command: "0x02 0x57 0x0f 0x31 0x10 0x03"
  params: []

- id: remote_menu
  label: Remote Menu
  kind: action
  command: "0x02 0x57 0x0f 0x33 0x10 0x03"
  params: []

- id: remote_select
  label: Remote Select
  kind: action
  command: "0x02 0x57 0x0f 0x1e 0x10 0x03"
  params: []

- id: remote_return
  label: Remote Return
  kind: action
  command: "0x02 0x57 0x0f 0x1f 0x10 0x03"
  params: []

- id: remote_info_short
  label: Remote Info (Short Press)
  kind: action
  command: "0x02 0x57 0x0f 0x2f 0x10 0x03"
  params: []

- id: remote_info_long
  label: Remote Info (Long Press)
  kind: action
  command: "0x02 0x57 0x0f 0x30 0x10 0x03"
  params: []

- id: remote_track_select
  label: Remote Track Select
  kind: action
  command: "0x02 0x57 0x0f {track_bytes} 0x10 0x03"
  params:
    - name: track_bytes
      type: string
      description: >-
        Encoded track number as hex byte sequence. Source examples:
        Track 1 = 0x06, Track 2 = 0x08, Track 3 = 0x0a,
        Track 14 = 0x07 0x0c, Track 199 = 0x05 0x16 0x16.
        Encoding rule not fully documented in source.

- id: remote_volume_up
  label: Remote Volume Up
  kind: action
  command: "0x02 0x57 0x0f 0x18 0x10 0x03"
  params: []

- id: remote_volume_down
  label: Remote Volume Down
  kind: action
  command: "0x02 0x57 0x0f 0x19 0x10 0x03"
  params: []

- id: remote_previous
  label: Remote Previous Track
  kind: action
  command: "0x02 0x57 0x0f 0x28 0x10 0x03"
  params: []

- id: remote_next
  label: Remote Next Track
  kind: action
  command: "0x02 0x57 0x0f 0x27 0x10 0x03"
  params: []

- id: remote_ffwd
  label: Remote Fast Forward
  kind: action
  command: "0x02 0x57 0x0f 0x29 0x10 0x03"
  params: []

- id: remote_frwd
  label: Remote Fast Rewind
  kind: action
  command: "0x02 0x57 0x0f 0x2a 0x10 0x03"
  params: []

- id: remote_play_pause
  label: Remote Play/Pause Toggle
  kind: action
  command: "0x02 0x57 0x0f 0x23 0x10 0x03"
  params: []

- id: remote_play
  label: Remote Play
  kind: action
  command: "0x02 0x57 0x0f 0x21 0x10 0x03"
  params: []

- id: remote_pause
  label: Remote Pause
  kind: action
  command: "0x02 0x57 0x0f 0x22 0x10 0x03"
  params: []

- id: remote_stop
  label: Remote Stop
  kind: action
  command: "0x02 0x57 0x0f 0x25 0x10 0x03"
  params: []

- id: remote_eject
  label: Remote Eject
  kind: action
  command: "0x02 0x57 0x0f 0x24 0x10 0x03"
  params: []

- id: remote_insert
  label: Remote Insert
  kind: action
  command: "0x02 0x57 0x0f 0x26 0x10 0x03"
  params: []

- id: remote_repeat
  label: Remote Repeat Toggle
  kind: action
  command: "0x02 0x57 0x0f 0x2b 0x10 0x03"
  params: []

# ── Remote Color Buttons (no RS232 payload documented) ──
- id: remote_red
  label: Remote Red Button
  kind: action
  command: null  # UNRESOLVED: source marks as "n/a" - no RS232 payload
  params: []

- id: remote_green
  label: Remote Green Button
  kind: action
  command: null  # UNRESOLVED: source marks as "n/a" - no RS232 payload
  params: []

- id: remote_yellow
  label: Remote Yellow Button
  kind: action
  command: null  # UNRESOLVED: source marks as "n/a" - no RS232 payload
  params: []

- id: remote_blue
  label: Remote Blue Button
  kind: action
  command: null  # UNRESOLVED: source marks as "n/a" - no RS232 payload
  params: []
```

## Feedbacks
```yaml
# Replies documented in source - device echoes command category with resulting state.
# Frame format for replies: 0x02 [category] [state] 0x10 0x03

- id: power_state
  type: enum
  values: [standby, operate]
  description: >-
    Reply to power_set. Standby reply: 0x02 0x01 0x00 0x10 0x03.
    Operate reply: 0x02 0x01 0x01 0x10 0x03.

- id: volume_level
  type: integer
  min: 0
  max: 99
  description: >-
    Reply to volume_set. Format: 0x02 0x03 0x{level} 0x10 0x03.
    Example: 0x02 0x03 0x00 0x10 0x03 (0dB).

- id: balance_position
  type: integer
  min: 1
  max: 19
  description: >-
    Reply to balance_set. Format: 0x02 0x04 0x{position} 0x10 0x03.
    Example: 0x02 0x04 0x01 0x10 0x03 (00LR-9).

- id: mute_state
  type: enum
  values: [disabled, enabled]
  description: >-
    Reply to mute_set. Disabled: 0x02 0x09 0x00 0x10 0x03.
    Enabled: 0x02 0x09 0x01 0x10 0x03.

- id: dim_level
  type: enum
  values: [off, low, mid, high]
  description: >-
    Reply to dim_set. Format: 0x02 0x0a 0x{level} 0x10 0x03.
    0x00=OFF, 0x01=LOW, 0x02=MID, 0x03=HIGH.

- id: verbose_state
  type: enum
  values: [disabled, enabled]
  description: >-
    Reply to verbose_set. Disabled: 0x02 0x0d 0x00 0x10 0x03.
    Enabled: 0x02 0x0d 0x01 0x10 0x03.

- id: menu_state
  type: enum
  values: [exited, entered]
  description: >-
    Reply to menu_set. Exit: 0x02 0x0e 0x00 0x10 0x03.
    Enter: 0x02 0x0e 0x01 0x10 0x03.

- id: ir_input_source
  type: enum
  values: [front, back]
  description: >-
    Reply to ir_input_set. Front: 0x02 0x12 0x00 0x10 0x03.
    Back: 0x02 0x12 0x01 0x10 0x03.

- id: factory_reset_ack
  type: enum
  values: [complete]
  description: "Reply to factory_reset: 0x02 0x13 0x01 0x10 0x03"

- id: bt_visible_state
  type: enum
  values: [disabled, enabled]
  description: >-
    Reply to bt_visible_set. Disabled: 0x02 0x18 0x00 0x10 0x03.
    Enabled: 0x02 0x18 0x01 0x10 0x03.

- id: bt_auto_connect_state
  type: enum
  values: [disabled, enabled]
  description: >-
    Reply to bt_auto_connect_set. Disabled: 0x02 0x19 0x00 0x10 0x03.
    Enabled: 0x02 0x19 0x01 0x10 0x03.

# UNRESOLVED: toggle commands (power_toggle, volume_decrease/increase,
# balance_step_left/right, mute_toggle, dim_cycle, verbose_toggle,
# menu_toggle, ir_input_toggle, bt_visible_toggle, bt_auto_connect_toggle)
# list reply as "See below" - no explicit reply bytes documented.
# UNRESOLVED: response format for read queries (manufacturer, model,
# version, BT name) not documented in source.
```

## Variables
```yaml
- id: volume
  type: integer
  min: 0
  max: 99
  unit: dB
  description: "Variable audio output level (0-99dB)"

- id: balance
  type: integer
  min: 1
  max: 19
  description: "L/R balance position. 10=center, 1-9=right bias, 11-19=left bias"
```

## Events
```yaml
# No unsolicited notifications documented in source.
# UNRESOLVED: verbose mode may emit unsolicited state-change events,
# but format/trigger conditions not documented.
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset  # destructive: restores device to factory defaults
interlocks: []
# UNRESOLVED: source does not document power-on sequencing requirements
# or safety interlock procedures.
```

## Notes
- **Serial settings typo in source:** "Buad Rate" should read "Baud Rate." Values confirmed: 115200 baud, 8 data bits, no parity, 1 stop bit.
- **Firmware:** Tested with firmware v1.62 (dated 2018-11-12). No minimum version or compatibility range stated.
- **Command structure:** Two address bytes distinguish operation type: `0x57` = write/set/toggle/action, `0x52` = read/query. Remote emulation commands are a subset of `0x57` commands using command byte `0x0f`.
- **Toggle vs Set pattern:** Many functions have both a toggle command (even-numbered opcodes like `0x01`, `0x03`, `0x09`) and a set command (opcode + `0x80`, e.g. `0x81`, `0x83`, `0x89`). The set variant takes an explicit state parameter; the toggle variant cycles to the next value.
- **Duplicate entry:** Source lists "Standby" (line: `0x02 0x57 0x0f 0x03 0x10 0x03`) twice under Remote commands — once as "Standby toggle" and once as "Standby." Both are identical to `remote_power_toggle`. Not duplicated in this spec.
- **Track encoding:** Source documents specific track examples (1=0x06, 2=0x08, 3=0x0a, 14=0x07 0x0c, 199=0x05 0x16 0x16) but does not explain the encoding algorithm. Single-digit tracks appear to use `digit*2+4`; multi-digit encoding involves additional bytes of unclear semantics.
- **Color buttons:** RED, GREEN, YELLOW, BLUE remote buttons are listed in the source but marked "n/a" — no RS232 equivalent payload exists.

<!-- UNRESOLVED: flow_control not stated in source -->
<!-- UNRESOLVED: response formats for read queries (manufacturer/model/version/BT name) not documented -->
<!-- UNRESOLVED: verbose mode event format and trigger conditions not documented -->
<!-- UNRESOLVED: toggle command reply bytes not explicitly documented ("See below" in source) -->
<!-- UNRESOLVED: track number multi-digit encoding algorithm not explained -->
<!-- UNRESOLVED: Prisma network streaming features not covered in this RS232 command document -->
````Spec output above. 58 actions total — 54 with verbatim hex payloads, 4 color buttons marked UNRESOLVED (source says "n/a"). All serial values from source direct (115200/8/N/1). Flow control marked UNRESOLVED — not in source. No fabricated port/voltage/firmware values.

## Provenance

```yaml
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2018/11/CD15-RS232-Command-list-official-2018-11-12.pdf
  - https://primare.net/wp-content/uploads/2022/01/Primare-Prisma-API-TCPIP-and-RS232-2025-06-13.pdf
retrieved_at: 2026-07-10T20:17:48.097Z
last_checked_at: 2026-07-12T08:59:06.341Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T08:59:06.341Z
matched_actions: 58
action_count: 58
confidence: medium
summary: "All 58 spec actions matched verbatim with source commands; serial transport parameters (115200/8/N/1) confirmed; color buttons correctly marked as n/a. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Prisma/network player features (streaming services, network configuration) not documented in the RS232 command list. Track number encoding for multi-digit tracks is not fully explained. Read-query response formats (manufacturer, model, version, BT name) are not documented."
- "flow control not stated in source"
- "source marks as \"n/a\" - no RS232 payload"
- "toggle commands (power_toggle, volume_decrease/increase,"
- "response format for read queries (manufacturer, model,"
- "verbose mode may emit unsolicited state-change events,"
- "source does not document power-on sequencing requirements"
- "flow_control not stated in source"
- "response formats for read queries (manufacturer/model/version/BT name) not documented"
- "verbose mode event format and trigger conditions not documented"
- "toggle command reply bytes not explicitly documented (\"See below\" in source)"
- "track number multi-digit encoding algorithm not explained"
- "Prisma network streaming features not covered in this RS232 command document"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
