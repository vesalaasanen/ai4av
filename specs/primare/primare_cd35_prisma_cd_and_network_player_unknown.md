---
spec_id: admin/primare-cd35-prisma
schema_version: ai4av-public-spec-v1
revision: 1
title: "Primare CD35 Prisma CD and Network Player Control Spec"
manufacturer: Primare
model_family: "CD35 Prisma"
aliases: []
compatible_with:
  manufacturers:
    - Primare
  models:
    - "CD35 Prisma"
  firmware: "v2.93 (tested per source)"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2019/01/CD35-RS232-Command-list-official-2018-11-12.pdf
  - https://primare.net/wp-content/uploads/2022/01/Primare-Prisma-API-TCPIP-and-RS232-2025-06-13.pdf
  - https://primare.net/support/documents-downloads/
retrieved_at: 2026-07-10T20:17:43.621Z
last_checked_at: 2026-07-12T09:02:35.472Z
generated_at: 2026-07-12T09:02:35.472Z
firmware_coverage: "v2.93 (tested per source)"
protocol_coverage: []
known_gaps:
  - "track number encoding algorithm for multi-digit tracks (14, 199) is not fully documented in source"
  - "no TCP/IP, HTTP, or network control protocol details documented in this source despite \"network player\" designation"
  - "flow control not stated in source"
  - "encoding algorithm for multi-digit track numbers not documented in source."
  - "track number encoding for multi-digit values (track 14, track 199) is shown only as raw hex examples without a documented algorithm"
  - "flow control setting not stated in source"
  - "read version and read BT name query response formats not documented in source"
  - "verbose mode response format (what additional data verbose mode returns) not documented"
verification:
  verdict: verified
  checked_at: 2026-07-12T09:02:35.472Z
  matched_actions: 64
  action_count: 64
  confidence: medium
  summary: "All 64 spec action hex sequences matched verbatim in source; transport parameters confirmed; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-10
---

# Primare CD35 Prisma CD and Network Player Control Spec

## Summary
The Primare CD35 Prisma is a CD player and network player with Prisma streaming technology. This spec covers RS-232 serial control, including power, volume, balance, mute, dim, transport (play/pause/stop/seek), tray operations, menu navigation, Bluetooth settings, and system query commands. All commands use a binary frame format with hex byte payloads.

<!-- UNRESOLVED: track number encoding algorithm for multi-digit tracks (14, 199) is not fully documented in source -->
<!-- UNRESOLVED: no TCP/IP, HTTP, or network control protocol details documented in this source despite "network player" designation -->

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
  - powerable  # inferred from power/standby command examples
  - queryable  # inferred from read manufacturer/model/version query examples
  - levelable  # inferred from volume set and balance set command examples
```

## Actions
```yaml
# ── Direct Commands ──────────────────────────────────────────────
# All frames: 0x02 = STX (start), 0x03 = ETX (end), 0x10 = DLE.
# 0x57 prefix = direct control command, 0x52 prefix = read/query,
# 0x0f sub-prefix (within 0x57 group) = remote emulation command.

- id: power_toggle
  label: Power Toggle (Operate/Standby)
  kind: action
  command: "0x02 0x57 0x01 0x00 0x10 0x03"
  params: []

- id: standby
  label: Standby
  kind: action
  command: "0x02 0x57 0x81 0x00 0x10 0x03"
  params: []

- id: operate
  label: Operate (Power On)
  kind: action
  command: "0x02 0x57 0x81 0x01 0x10 0x03"
  params: []

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
      description: "Volume level in dB (0-99). Data byte 0x00=0dB through 0x63=99dB."

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
  command: "0x02 0x57 0x84 0x{value} 0x10 0x03"
  params:
    - name: value
      type: integer
      description: "Balance value 0x01-0x13 (1-19). 0x01=00LR-9, 0x0a=00LR00 (center), 0x13=-9LR00."

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "0x02 0x57 0x09 0x00 0x10 0x03"
  params: []

- id: mute_disable
  label: Mute Disable (Unmute)
  kind: action
  command: "0x02 0x57 0x89 0x00 0x10 0x03"
  params: []

- id: mute_enable
  label: Mute Enable
  kind: action
  command: "0x02 0x57 0x89 0x01 0x10 0x03"
  params: []

- id: dim_cycle
  label: Dim Cycle
  kind: action
  command: "0x02 0x57 0x0a 0x00 0x10 0x03"
  params: []

- id: dim_off
  label: Dim Off
  kind: action
  command: "0x02 0x57 0x8a 0x00 0x10 0x03"
  params: []

- id: dim_low
  label: Dim Low
  kind: action
  command: "0x02 0x57 0x8a 0x01 0x10 0x03"
  params: []

- id: dim_mid
  label: Dim Mid
  kind: action
  command: "0x02 0x57 0x8a 0x02 0x10 0x03"
  params: []

- id: dim_high
  label: Dim High
  kind: action
  command: "0x02 0x57 0x8a 0x03 0x10 0x03"
  params: []

- id: verbose_toggle
  label: Verbose Toggle
  kind: action
  command: "0x02 0x57 0x0d 0x00 0x10 0x03"
  params: []

- id: verbose_disable
  label: Verbose Disable
  kind: action
  command: "0x02 0x57 0x8d 0x00 0x10 0x03"
  params: []

- id: verbose_enable
  label: Verbose Enable
  kind: action
  command: "0x02 0x57 0x8d 0x01 0x10 0x03"
  params: []

- id: menu_toggle
  label: Menu Toggle (Enter/Leave)
  kind: action
  command: "0x02 0x57 0x0e 0x00 0x10 0x03"
  params: []

- id: menu_exit
  label: Menu Exit
  kind: action
  command: "0x02 0x57 0x8e 0x00 0x10 0x03"
  params: []

- id: menu_enter
  label: Menu Enter
  kind: action
  command: "0x02 0x57 0x8e 0x01 0x10 0x03"
  params: []

- id: ir_input_toggle
  label: IR Input Toggle
  kind: action
  command: "0x02 0x57 0x12 0x00 0x10 0x03"
  params: []

- id: ir_input_front
  label: IR Input Set Front
  kind: action
  command: "0x02 0x57 0x92 0x00 0x10 0x03"
  params: []

- id: ir_input_back
  label: IR Input Set Back
  kind: action
  command: "0x02 0x57 0x92 0x01 0x10 0x03"
  params: []

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "0x02 0x57 0x13 0x00 0x10 0x03"
  params: []

- id: bt_visible_toggle
  label: Bluetooth Visible Toggle
  kind: action
  command: "0x02 0x57 0x18 0x00 0x10 0x03"
  params: []

- id: bt_visible_disable
  label: Bluetooth Visible Disable
  kind: action
  command: "0x02 0x57 0x98 0x00 0x10 0x03"
  params: []

- id: bt_visible_enable
  label: Bluetooth Visible Enable
  kind: action
  command: "0x02 0x57 0x98 0x01 0x10 0x03"
  params: []

- id: bt_auto_connect_toggle
  label: Bluetooth Auto-Connect Toggle
  kind: action
  command: "0x02 0x57 0x19 0x00 0x10 0x03"
  params: []

- id: bt_auto_connect_disable
  label: Bluetooth Auto-Connect Disable
  kind: action
  command: "0x02 0x57 0x99 0x00 0x10 0x03"
  params: []

- id: bt_auto_connect_enable
  label: Bluetooth Auto-Connect Enable
  kind: action
  command: "0x02 0x57 0x99 0x01 0x10 0x03"
  params: []

# ── Read / Query Commands ────────────────────────────────────────

- id: read_manufacturer
  label: Read Manufacturer
  kind: query
  command: "0x02 0x52 0x15 0x00 0x10 0x03"
  params: []

- id: read_model
  label: Read Model Name
  kind: query
  command: "0x02 0x52 0x16 0x00 0x10 0x03"
  params: []

- id: read_version
  label: Read Software Version
  kind: query
  command: "0x02 0x52 0x17 0x00 0x10 0x03"
  params: []

- id: read_bt_name
  label: Read Bluetooth Name
  kind: query
  command: "0x02 0x52 0x1c 0x00 0x10 0x03"
  params: []

# ── Remote Emulation Commands (0x0f sub-prefix) ─────────────────
# These emulate the IR remote control over RS-232.

- id: remote_standby_toggle
  label: Remote Standby Toggle
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
  label: Remote Mute Toggle
  kind: action
  command: "0x02 0x57 0x0f 0x2d 0x10 0x03"
  params: []

- id: remote_dim
  label: Remote Cycle Dim Mode
  kind: action
  command: "0x02 0x57 0x0f 0x31 0x10 0x03"
  params: []

- id: remote_menu
  label: Remote Toggle Menu
  kind: action
  command: "0x02 0x57 0x0f 0x33 0x10 0x03"
  params: []

- id: remote_select
  label: Remote Select
  kind: action
  command: "0x02 0x57 0x0f 0x1e 0x10 0x03"
  params: []

- id: remote_return
  label: Remote Return (Navigate Back)
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
  command: "0x02 0x57 0x0f 0x{track_data} 0x10 0x03"
  params:
    - name: track_data
      type: hex
      description: >
        Track number encoded as hex byte(s).
        Examples from source:
        Track 1=0x06, Track 2=0x08, Track 3=0x0a,
        Track 14=0x07 0x0c, Track 199=0x05 0x16 0x16.
        UNRESOLVED: encoding algorithm for multi-digit track numbers not documented in source.

- id: remote_volume_up
  label: Remote Volume Increase
  kind: action
  command: "0x02 0x57 0x0f 0x18 0x10 0x03"
  params: []

- id: remote_volume_down
  label: Remote Volume Decrease
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

- id: remote_open
  label: Remote Open Tray
  kind: action
  command: "0x02 0x57 0x0f 0x24 0x10 0x03"
  params: []

- id: remote_close
  label: Remote Close Tray
  kind: action
  command: "0x02 0x57 0x0f 0x26 0x10 0x03"
  params: []

- id: remote_repeat
  label: Remote Toggle Repeat (repeat all / repeat off)
  kind: action
  command: "0x02 0x57 0x0f 0x2b 0x10 0x03"
  params: []
```

## Feedbacks
```yaml
# Reply frames from CD35. Format: 0x02 [response_code] [value] 0x10 0x03.
# These are solicited responses to set/toggle commands.

- id: power_state_reply
  type: enum
  values: [standby, operate]
  description: "Reply to power/standby commands. Standby: 0x02 0x01 0x00 0x10 0x03. Operate: 0x02 0x01 0x01 0x10 0x03."

- id: volume_level_reply
  type: integer
  description: "Reply to volume set: 0x02 0x03 0x{level} 0x10 0x03. Level 0x00-0x63 (0-99dB)."

- id: balance_level_reply
  type: integer
  description: "Reply to balance set: 0x02 0x04 0x{value} 0x10 0x03. Value 0x01-0x13 (1-19)."

- id: mute_state_reply
  type: enum
  values: [disabled, enabled]
  description: "Reply to mute set. Disabled: 0x02 0x09 0x00 0x10 0x03. Enabled: 0x02 0x09 0x01 0x10 0x03."

- id: dim_state_reply
  type: enum
  values: [off, low, mid, high]
  description: "Reply to dim set. Off: 0x02 0x0a 0x00 0x10 0x03. Low: 0x02 0x0a 0x01 0x10 0x03. Mid: 0x02 0x0a 0x02 0x10 0x03. High: 0x02 0x0a 0x03 0x10 0x03."

- id: verbose_state_reply
  type: enum
  values: [disabled, enabled]
  description: "Reply to verbose set. Disabled: 0x02 0x0d 0x00 0x10 0x03. Enabled: 0x02 0x0d 0x01 0x10 0x03."

- id: menu_state_reply
  type: enum
  values: [exit, enter]
  description: "Reply to menu set. Exit: 0x02 0x0e 0x00 0x10 0x03. Enter: 0x02 0x0e 0x01 0x10 0x03."

- id: ir_input_state_reply
  type: enum
  values: [front, back]
  description: "Reply to IR input set. Front: 0x02 0x12 0x00 0x10 0x03. Back: 0x02 0x12 0x01 0x10 0x03."

- id: factory_reset_reply
  type: boolean
  description: "Reply to factory reset: 0x02 0x13 0x01 0x10 0x03."

- id: bt_visible_state_reply
  type: enum
  values: [disabled, enabled]
  description: "Reply to BT visible set. Disabled: 0x02 0x18 0x00 0x10 0x03. Enabled: 0x02 0x18 0x01 0x10 0x03."

- id: bt_auto_connect_state_reply
  type: enum
  values: [disabled, enabled]
  description: "Reply to BT auto-connect set. Disabled: 0x02 0x19 0x00 0x10 0x03. Enabled: 0x02 0x19 0x01 0x10 0x03."

- id: manufacturer_reply
  type: string
  description: "Reply to read manufacturer query. Returns 'Primare'."

- id: model_reply
  type: string
  description: "Reply to read model query. Returns 'CD35'."
```

## Variables
```yaml
# No settable parameters beyond those already represented as discrete actions.
# Volume and balance are settable via their respective set commands above.
```

## Events
```yaml
# Source documents no unsolicited notification events.
# Toggle commands (power, mute, dim, verbose, menu, IR, BT) reply with current state - see Feedbacks.
```

## Macros
```yaml
# Source documents no multi-step command sequences.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset  # destructive: resets all device settings
interlocks: []
# Source contains no explicit safety warnings or interlock procedures.
```

## Notes
- All command frames use the format `0x02 [prefix] [command] [data] 0x10 0x03` where 0x02=STX, 0x03=ETX, 0x10=DLE.
- The 0x57 prefix group covers direct control commands; the 0x52 prefix group covers read/query commands.
- A second command group uses 0x57 0x0f as a sub-prefix for remote emulation commands that mirror the physical IR remote.
- Some functions have both a direct command and a remote emulation variant (e.g. power toggle, volume up/down, mute, dim, menu) with different byte sequences but equivalent effect.
- The source lists RED, GREEN, YELLOW, BLUE color buttons as "n/a" with no command bytes — these are not implemented in RS-232.
- Source tested with firmware v2.93, dated 2018-11-12.
<!-- UNRESOLVED: track number encoding for multi-digit values (track 14, track 199) is shown only as raw hex examples without a documented algorithm -->
<!-- UNRESOLVED: flow control setting not stated in source -->
<!-- UNRESOLVED: read version and read BT name query response formats not documented in source -->
<!-- UNRESOLVED: verbose mode response format (what additional data verbose mode returns) not documented -->

## Provenance

```yaml
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2019/01/CD35-RS232-Command-list-official-2018-11-12.pdf
  - https://primare.net/wp-content/uploads/2022/01/Primare-Prisma-API-TCPIP-and-RS232-2025-06-13.pdf
  - https://primare.net/support/documents-downloads/
retrieved_at: 2026-07-10T20:17:43.621Z
last_checked_at: 2026-07-12T09:02:35.472Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T09:02:35.472Z
matched_actions: 64
action_count: 64
confidence: medium
summary: "All 64 spec action hex sequences matched verbatim in source; transport parameters confirmed; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "track number encoding algorithm for multi-digit tracks (14, 199) is not fully documented in source"
- "no TCP/IP, HTTP, or network control protocol details documented in this source despite \"network player\" designation"
- "flow control not stated in source"
- "encoding algorithm for multi-digit track numbers not documented in source."
- "track number encoding for multi-digit values (track 14, track 199) is shown only as raw hex examples without a documented algorithm"
- "flow control setting not stated in source"
- "read version and read BT name query response formats not documented in source"
- "verbose mode response format (what additional data verbose mode returns) not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
