---
spec_id: admin/primare-pre35-prisma-modular-preamplifier-and-network-player
schema_version: ai4av-public-spec-v1
revision: 1
title: "Primare Pre35 Prisma Modular Preamplifier And Network Player Control Spec"
manufacturer: Primare
model_family: "Pre35 Prisma Modular Preamplifier And Network Player"
aliases: []
compatible_with:
  manufacturers:
    - Primare
  models:
    - "Pre35 Prisma Modular Preamplifier And Network Player"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2020/08/NP5-Prisma-MK2-RS232-Command-list-2021-10-04.pdf
retrieved_at: 2026-07-10T10:59:53.271Z
last_checked_at: 2026-07-12T09:02:37.416Z
generated_at: 2026-07-12T09:02:37.416Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source document is specifically titled for NP5 Prisma MK2, not Pre35 Prisma. Command set is expected to be identical across Prisma-platform devices but this has not been verified against a Pre35 Prisma unit. Input/source selection commands are not present in the source — the Pre35 Prisma as a preamplifier likely supports input switching but it is not documented here."
  - "flow control not stated in source"
  - "source does not document any push/event mechanism."
  - "source contains no safety warnings or interlock procedures."
  - "Source document covers NP5 Prisma MK2, not Pre35 Prisma directly."
  - "Flow control (RTS/CTS, XON/XOFF) not stated in source."
  - "No input/source selection commands documented — Pre35 Prisma as a preamplifier likely supports input switching but it is absent from this source."
  - "Firmware version compatibility for Pre35 Prisma not stated."
verification:
  verdict: verified
  checked_at: 2026-07-12T09:02:37.416Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions matched exactly to source hex command sequences; transport parameters (115200 baud, 8 bits, no parity, 1 stop bit) verified in source header. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-10
---

# Primare Pre35 Prisma Modular Preamplifier And Network Player Control Spec

## Summary
RS-232 serial control spec for the Primare Pre35 Prisma modular preamplifier and network player. Covers power, volume, balance, mute, Bluetooth visibility/auto-connect, verbose mode, factory reset, and device information queries via a binary command protocol. The source document is the RS232 Command List for the Primare NP5 Prisma MK2, which shares the same Prisma platform control protocol.

<!-- UNRESOLVED: Source document is specifically titled for NP5 Prisma MK2, not Pre35 Prisma. Command set is expected to be identical across Prisma-platform devices but this has not been verified against a Pre35 Prisma unit. Input/source selection commands are not present in the source — the Pre35 Prisma as a preamplifier likely supports input switching but it is not documented here. -->

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
  - powerable  # inferred from operate/standby commands
  - levelable  # inferred from volume and balance control commands
  - queryable  # inferred from read commands returning values
```

## Actions
```yaml
# All commands use binary framing: <STX>(0x02) <command> <variable> [<value>] <DLE>(0x10) <ETX>(0x03)
# Write commands use 0x57 (W), read commands use 0x52 (R).
# When verbose mode is enabled, the device replies on each command.

# --- Power ---
- id: power_toggle
  label: Operate/Standby Toggle
  kind: action
  command: "0x02 0x57 0x01 0x00 0x10 0x03"
  params: []

- id: power_set
  label: Operate/Standby Set
  kind: action
  command: "0x02 0x57 0x81 0x{state} 0x10 0x03"
  params:
    - name: state
      type: integer
      description: "0x00 = Standby, 0x01 = Operate"

# --- Volume ---
- id: volume_decrease
  label: Volume Decrease
  kind: action
  command: "0x02 0x57 0x03 0xFF 0x10 0x03"
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
      description: "Volume level 0x00 (vol 0) to 0x63 (vol 99). Hex byte value maps directly to displayed volume."

# --- Balance ---
- id: balance_step_right
  label: Balance One Step Right
  kind: action
  command: "0x02 0x57 0x04 0xFF 0x10 0x03"
  params: []

- id: balance_step_left
  label: Balance One Step Left
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
      description: "0x01=L9, 0x02=L8, 0x03=L7, 0x04=L6, 0x05=L5, 0x06=L4, 0x07=L3, 0x08=L2, 0x09=L1, 0x0A=Centered, 0x0B=R1, 0x0C=R2, 0x0D=R3, 0x0E=R4, 0x0F=R5, 0x10=R6, 0x11=R7, 0x12=R8, 0x13=R9"

# --- Mute ---
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
      description: "0x00 = Mute disable (unmute), 0x01 = Mute enable"

# --- Verbose Mode ---
- id: verbose_toggle
  label: Verbose Toggle
  kind: action
  command: "0x02 0x57 0x0D 0x00 0x10 0x03"
  params: []

- id: verbose_set
  label: Verbose Set
  kind: action
  command: "0x02 0x57 0x8D 0x{state} 0x10 0x03"
  params:
    - name: state
      type: integer
      description: "0x00 = Disable verbose (no reply), 0x01 = Enable verbose (replies sent)"

# --- Factory Reset ---
- id: factory_reset
  label: Factory Reset
  kind: action
  command: "0x02 0x57 0x13 0x00 0x10 0x03"
  params: []

# --- Bluetooth ---
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
      description: "0x00 = Disable, 0x01 = Enable"

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
      description: "0x00 = Disable, 0x01 = Enable"

# --- Read / Query Commands ---
- id: read_input_name
  label: Read Current Input Name
  kind: query
  command: "0x02 0x52 0x14 0x00 0x10 0x03"
  params: []

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
  label: Read Firmware Version
  kind: query
  command: "0x02 0x52 0x17 0x00 0x10 0x03"
  params: []

- id: read_volume
  label: Read Current Volume
  kind: query
  command: "0x02 0x52 0x1F 0x00 0x10 0x03"
  params: []

- id: read_bt_name
  label: Read Bluetooth Name
  kind: query
  command: "0x02 0x52 0x1C 0x00 0x10 0x03"
  params: []
```

## Feedbacks
```yaml
# Device replies only when verbose mode is enabled.
# Reply format: <STX>(0x02) <variable> [<value>] <DLE>(0x10) <ETX>(0x03)

- id: power_state
  type: enum
  values: [standby, operate]
  reply_pattern: "0x02 0x01 0x{value} 0x10 0x03"
  value_map:
    "0x00": standby
    "0x01": operate

- id: volume_level
  type: integer
  reply_pattern: "0x02 0x03 0x{value} 0x10 0x03"
  value_range: "0x00-0x63"

- id: balance_position
  type: enum
  reply_pattern: "0x02 0x04 0x{value} 0x10 0x03"
  value_map:
    "0x01": L9
    "0x02": L8
    "0x03": L7
    "0x04": L6
    "0x05": L5
    "0x06": L4
    "0x07": L3
    "0x08": L2
    "0x09": L1
    "0x0A": Centered
    "0x0B": R1
    "0x0C": R2
    "0x0D": R3
    "0x0E": R4
    "0x0F": R5
    "0x10": R6
    "0x11": R7
    "0x12": R8
    "0x13": R9

- id: mute_state
  type: enum
  values: [unmuted, muted]
  reply_pattern: "0x02 0x09 0x{value} 0x10 0x03"
  value_map:
    "0x00": unmuted
    "0x01": muted

- id: verbose_state
  type: enum
  values: [disabled, enabled]
  reply_pattern: "0x02 0x0D 0x{value} 0x10 0x03"
  value_map:
    "0x00": disabled
    "0x01": enabled

- id: bt_visible_state
  type: enum
  values: [disabled, enabled]
  reply_pattern: "0x02 0x18 0x{value} 0x10 0x03"
  value_map:
    "0x00": disabled
    "0x01": enabled

- id: bt_auto_connect_state
  type: enum
  values: [disabled, enabled]
  reply_pattern: "0x02 0x19 0x{value} 0x10 0x03"
  value_map:
    "0x00": disabled
    "0x01": enabled

- id: input_name
  type: string
  reply_pattern: "0x02 0x14 [alias] 0x10 0x03"
  description: "Alias of current input as a text string"

- id: manufacturer_name
  type: string
  reply_pattern: "0x02 0x15 [PRIMARE] 0x10 0x03"
  description: "Manufacturer string, always PRIMARE"

- id: model_name
  type: string
  reply_pattern: "0x02 0x16 [model] 0x10 0x03"
  description: "Model name string"

- id: firmware_version
  type: string
  reply_pattern: "0x02 0x17 [firmware] 0x10 0x03"
  description: "Firmware version string"

- id: current_volume
  type: integer
  reply_pattern: "0x02 0x1F [volume] 0x10 0x03"
  description: "Current volume level"

- id: bluetooth_name
  type: string
  reply_pattern: "0x02 0x1C [BT name] 0x10 0x03"
  description: "Bluetooth device name string"
```

## Variables
```yaml
# No settable parameters beyond those already represented as discrete Actions
# (volume, balance, mute, power, verbose, BT settings are all action-driven).
```

## Events
```yaml
# No unsolicited notifications documented in source. Device only replies when
# verbose mode is enabled and a command is received.
# UNRESOLVED: source does not document any push/event mechanism.
```

## Macros
```yaml
# No multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset  # resets device to factory default settings
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
```

## Notes
- Source document is titled "Primare NP5 Prisma MK2 - RS232 Command List." The Pre35 Prisma and NP5 Prisma MK2 share the Prisma platform; the RS232 command set is expected to be identical but has not been verified against a Pre35 Prisma unit.
- Command framing: every command is a binary sequence `<STX>(0x02) <command> <variable> [<value>] <DLE>(0x10) <ETX>(0x03)`. Write commands use 0x57 (ASCII 'W'), read commands use 0x52 (ASCII 'R').
- Verbose mode must be enabled (0x0D toggle or 0x8D set with value 0x01) for the device to send replies. With verbose disabled, no reply is sent.
- Toggle commands use variable bytes in the 0x01–0x19 range; corresponding set commands use variable byte + 0x80 (e.g. toggle power = var 0x01, set power = var 0x81).
- Volume range: hex byte 0x00–0x63 maps to displayed volume 0–99. The hex value equals the decimal display value.
- Balance: 19 discrete positions from L9 (0x01) through Centered (0x0A) to R9 (0x13).
- Source notes protocol was "Tested with v1.99" firmware on NP5 Prisma MK2.
- Flow control setting is not specified in the source.

<!-- UNRESOLVED: Source document covers NP5 Prisma MK2, not Pre35 Prisma directly. -->
<!-- UNRESOLVED: Flow control (RTS/CTS, XON/XOFF) not stated in source. -->
<!-- UNRESOLVED: No input/source selection commands documented — Pre35 Prisma as a preamplifier likely supports input switching but it is absent from this source. -->
<!-- UNRESOLVED: Firmware version compatibility for Pre35 Prisma not stated. -->
```
```

## Provenance

```yaml
source_domains:
  - primare.net
source_urls:
  - https://primare.net/wp-content/uploads/2020/08/NP5-Prisma-MK2-RS232-Command-list-2021-10-04.pdf
retrieved_at: 2026-07-10T10:59:53.271Z
last_checked_at: 2026-07-12T09:02:37.416Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T09:02:37.416Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions matched exactly to source hex command sequences; transport parameters (115200 baud, 8 bits, no parity, 1 stop bit) verified in source header. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source document is specifically titled for NP5 Prisma MK2, not Pre35 Prisma. Command set is expected to be identical across Prisma-platform devices but this has not been verified against a Pre35 Prisma unit. Input/source selection commands are not present in the source — the Pre35 Prisma as a preamplifier likely supports input switching but it is not documented here."
- "flow control not stated in source"
- "source does not document any push/event mechanism."
- "source contains no safety warnings or interlock procedures."
- "Source document covers NP5 Prisma MK2, not Pre35 Prisma directly."
- "Flow control (RTS/CTS, XON/XOFF) not stated in source."
- "No input/source selection commands documented — Pre35 Prisma as a preamplifier likely supports input switching but it is absent from this source."
- "Firmware version compatibility for Pre35 Prisma not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
