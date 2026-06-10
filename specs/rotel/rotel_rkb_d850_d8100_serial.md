---
spec_id: admin/rotel-rkb-d850-d8100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RKB-D850/D8100 Control Spec"
manufacturer: Rotel
model_family: RKB-850
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - RKB-850
    - RKB-8100
    - RKB-D850
    - RKB-D8100
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RKB850%20Protocol.pdf"
retrieved_at: 2026-05-21T20:50:35.800Z
last_checked_at: 2026-06-09T07:16:12.342Z
generated_at: 2026-06-09T07:16:12.342Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Balance set range not exhaustively listed; only L15, 000, R15 shown as discrete commands"
  - "exact unsolicited event message formats not exhaustively documented"
  - "firmware version compatibility not stated in source"
  - "exact unsolicited event message formats not fully documented"
  - "balance_set parameterized action omitted; only L15, 000, R15 shown as discrete commands"
verification:
  verdict: verified
  checked_at: 2026-06-09T07:16:12.342Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 45 spec actions found as exact literals in source; all transport parameters verified; one-to-one coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Rotel RKB-D850/D8100 Control Spec

## Summary
Multi-channel power amplifier with RS-232C ASCII control at 115200 baud, 8N1, no flow control. Supports 4 channels (A-D, prefixes 0A/0B/0C/0D) with independent volume, balance, mute, and power control per channel. Analog/digital input selection supported on D-series models with Main SW V2.45+. Signal Sense mode on V02 units (SW V2.43+) disables power commands.

<!-- UNRESOLVED: Balance set range not exhaustively listed; only L15, 000, R15 shown as discrete commands -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: "The RS232 hardware does not support flow control"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable  # input selection on D-series models
- levelable  # volume, balance
- queryable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "power_on!"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "power_off!"
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "power_toggle!"
  params: []

- id: channel_on
  label: Channel On
  kind: action
  command: "channel_on!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: channel_off
  label: Channel Off
  kind: action
  command: "channel_off!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: volume_up
  label: Volume Up
  kind: action
  command: "volume_up!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: volume_down
  label: Volume Down
  kind: action
  command: "volume_down!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: volume_set
  label: Set Volume
  kind: action
  command: "volume_n!"
  params:
    - name: level
      type: integer
      description: Volume level 1-96
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: volume_l_up
  label: Left Channel Volume Up
  kind: action
  command: "volume_l_up!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: volume_r_up
  label: Right Channel Volume Up
  kind: action
  command: "volume_r_up!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: volume_l_down
  label: Left Channel Volume Down
  kind: action
  command: "volume_l_down!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: volume_r_down
  label: Right Channel Volume Down
  kind: action
  command: "volume_r_down!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: volume_l_set
  label: Set Left Channel Volume
  kind: action
  command: "volume_l_n!"
  params:
    - name: level
      type: integer
      description: Volume level 1-96
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: volume_r_set
  label: Set Right Channel Volume
  kind: action
  command: "volume_r_n!"
  params:
    - name: level
      type: integer
      description: Volume level 1-96
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "mute!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: mute_on
  label: Mute On
  kind: action
  command: "mute_on!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: mute_off
  label: Mute Off
  kind: action
  command: "mute_off!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: balance_right
  label: Balance Right
  kind: action
  command: "balance_right!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: balance_left
  label: Balance Left
  kind: action
  command: "balance_left!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: balance_L15
  label: Set Balance Max Left
  kind: action
  command: "balance_L15!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: balance_000
  label: Set Balance Center
  kind: action
  command: "balance_000!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: balance_R15
  label: Set Balance Max Right
  kind: action
  command: "balance_R15!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: input_sel_auto
  label: Set Input Selection Auto
  kind: action
  command: "input_sel_auto!"
  params: []
  # Requires Main SW V2.45, RKB-D850/D8100 only

- id: input_sel_digital
  label: Select Optical Input
  kind: action
  command: "input_sel_digital!"
  params: []
  # Requires Main SW V2.45, RKB-D850/D8100 only

- id: input_sel_analog
  label: Select Analog Input
  kind: action
  command: "input_sel_analog!"
  params: []
  # Requires Main SW V2.45, RKB-D850/D8100 only

- id: display_update_auto
  label: Set Status Update Auto
  kind: action
  command: "display_update_auto!"
  params: []

- id: display_update_manual
  label: Set Status Update Manual
  kind: action
  command: "display_update_manual!"
  params: []

- id: factory_default_on
  label: Factory Default
  kind: action
  command: "factory_default_on!"
  params: []

- id: get_product_type
  label: Request Product Type
  kind: query
  command: "get_product_type!"
  params: []

- id: get_product_version
  label: Request Main CPU Software Version
  kind: query
  command: "get_product_version!"
  params: []

- id: get_display_update
  label: Request Status Update Mode
  kind: query
  command: "get_display_update!"
  params: []

- id: get_current_power
  label: Request Current Power Status
  kind: query
  command: "get_current_power!"
  params: []

- id: get_input_sel_mode
  label: Request Current Input Select Mode
  kind: query
  command: "get_input_sel_mode!"
  params: []
  # Requires Main SW V2.45, RKB-D850/D8100 only

- id: get_channel_status
  label: Request Current Channel Power Status
  kind: query
  command: "get_channel_status!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: get_balance
  label: Request Current Balance Setting
  kind: query
  command: "get_balance!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: get_current_freq
  label: Request Current Digital Input Frequency
  kind: query
  command: "get_current_freq!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: get_amp_trim
  label: Request Current Level Trims
  kind: query
  command: "get_amp_trim!"
  params: []

- id: get_temperature
  label: Request Current Amplifier Temperature
  kind: query
  command: "get_temperature!"
  params: []

- id: get_fan_status
  label: Request Current Fan Speed Status
  kind: query
  command: "get_fan_status!"
  params: []

- id: get_amp_status
  label: Request Current Amplifier Status
  kind: query
  command: "get_amp_status!"
  params: []

- id: get_volume_max
  label: Request Max Volume Value
  kind: query
  command: "get_volume_max!"
  params: []

- id: get_volume_min
  label: Request Min Volume Value
  kind: query
  command: "get_volume_min!"
  params: []

- id: get_volume
  label: Request Current Volume
  kind: query
  command: "get_volume!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: get_volume_l
  label: Request Current Left Channel Volume
  kind: query
  command: "get_volume_l!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.

- id: get_volume_r
  label: Request Current Right Channel Volume
  kind: query
  command: "get_volume_r!"
  params:
    - name: channel
      type: enum
      values: [0A, 0B, 0C, 0D]
      description: Channel prefix. Omit for all channels.
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [on, standby, SignalSenseMode]
  comment: SignalSenseMode returned for V02 units in Signal Sense mode (SW V2.43+)

- id: channel_power_state
  label: Channel Power State
  type: enum
  values: [on, off, amp_on, amp_off]
  comment: amp_on/amp_off returned when in Signal Sense mode

- id: volume_l_state
  label: Left Channel Volume State
  type: integer
  range: [0, 96]
  comment: Per channel. Returned with trailing underscore (e.g. volume_l_=##!)

- id: volume_r_state
  label: Right Channel Volume State
  type: integer
  range: [0, 96]
  comment: Per channel. Returned with trailing underscore (e.g. volume_r_=##!)

- id: mute_state
  label: Mute State
  type: enum
  values: [on, off]

- id: balance_state
  label: Balance State
  type: enum
  values: [L01, L02, L03, L04, L05, L06, L07, L08, L09, L10, L11, L12, L13, L14, L15, 000, R01, R02, R03, R04, R05, R06, R07, R08, R09, R10, R11, R12, R13, R14, R15]
  comment: Per channel. Format L01-15, 000, R01-15.

- id: input_sel_mode
  label: Input Selection Mode
  type: enum
  values: [auto, digital, analog]
  comment: RKB-D850/D8100 only, requires Main SW V2.45

- id: display_update_mode
  label: Display Update Mode
  type: enum
  values: [auto, manual]

- id: product_type
  label: Product Type
  type: string
  comment: Format "product_type=##,text" - 2-digit length prefix + comma + text, no terminating "!"

- id: product_version
  label: Product Version
  type: string
  comment: Format "product_version=##,text" - 2-digit length prefix + comma + text, no terminating "!"

- id: frequency
  label: Digital Input Frequency
  type: enum
  values: [off, 32, 44.1, 48, 88.2, 96, 176.4, 192]
  comment: Per channel for digital source input

- id: amp_trim
  label: Amplifier Trim
  type: enum
  values: [min, max, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96"]
  comment: Returns level trim per channel. Example values: 19, min, max.

- id: temperature
  label: Temperature
  type: string
  comment: RKB-850/D850: 3 values (AB, CD, PS). RKB-8100/D8100: 4 values (AB, CD, PS, PS). Format "temperature=32,32,34!"

- id: fan_status
  label: Fan Status
  type: enum
  values: [normal, high]

- id: amp_status
  label: Amplifier Status
  type: enum
  values: [normal, protection]

- id: volume_max
  label: Volume Max
  type: integer
  range: [0, 96]
  comment: Example volume_max=96!

- id: volume_min
  label: Volume Min
  type: integer
  range: [0, 96]
  comment: Example volume_min=0!
```

## Variables
```yaml
# All settable parameters exposed as discrete actions above.
# No additional variables beyond what is covered by Actions/Feedbacks.
```

## Events
```yaml
# In display_update_auto mode, device sends unsolicited status changes:
# - power state changes
# - temperature updates
# - input level trim changes
# - digital input frequency changes
# Each line separated by carriage return when multi-channel.
# UNRESOLVED: exact unsolicited event message formats not exhaustively documented
```

## Macros
```yaml
# No explicit multi-step macros documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - desc: RS232 volume control requires all 4 front panel level trims set to minimum
    source: "Enabling Volume Control section"
  - desc: Do not mix power_on/power_off with channel_on/channel_off - use one or the other
    source: "Power On vs Channel On section"
  - desc: Signal Sense mode disables RS232 power commands (V02 units with SW V2.43+)
    source: "Signal Sense Mode section"
  - desc: RS232 hardware does not support flow control; care needed to avoid packet loss
    source: "RS232 ASCII Controller Command List intro"
```

## Notes
All commands terminated by "!". No spaces in commands. No carriage return/line feed after command. Responses terminated by "!" or byte count prefix (2-digit length + "," + text, no terminating character) for variable length text. Channel prefixes: 0A=ChA, 0B=ChB, 0C=ChC, 0D=ChD. Omit prefix for all-channel commands. Balance and individual L/R volume are mutually exclusive — using L/R volume resets balance to 0. Volume up/down set commands require n in 1-96. Balance L15/L01..L15, 000, R01..R15.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact unsolicited event message formats not fully documented -->
<!-- UNRESOLVED: balance_set parameterized action omitted; only L15, 000, R15 shown as discrete commands -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RKB850%20Protocol.pdf"
retrieved_at: 2026-05-21T20:50:35.800Z
last_checked_at: 2026-06-09T07:16:12.342Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:16:12.342Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 45 spec actions found as exact literals in source; all transport parameters verified; one-to-one coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Balance set range not exhaustively listed; only L15, 000, R15 shown as discrete commands"
- "exact unsolicited event message formats not exhaustively documented"
- "firmware version compatibility not stated in source"
- "exact unsolicited event message formats not fully documented"
- "balance_set parameterized action omitted; only L15, 000, R15 shown as discrete commands"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
