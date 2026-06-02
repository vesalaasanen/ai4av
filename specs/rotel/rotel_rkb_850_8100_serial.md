---
spec_id: admin/rotel-rkb-850-8100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RKB-850/8100/D850/D8100 RS-232 Control Spec"
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
retrieved_at: 2026-06-01T22:26:43.468Z
last_checked_at: 2026-06-02T08:29:28.003Z
generated_at: 2026-06-02T08:29:28.003Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device firmware version range not stated; several commands are gated by Main Software V1.31 (volume/balance/channel), V2.43 (Signal Sense), or V2.45 (input selection) — see Notes."
  - "no continuous settable variables beyond the discrete Actions above."
  - "in automatic display_update mode, the unit sends unsolicited"
  - "no multi-step macro sequences documented in source."
  - "source does not document explicit safety warnings, interlock"
  - "firmware compatibility range (min/max) not stated in source."
  - "no events/subscription contract documented beyond the auto/manual mode toggle."
  - "no safety or protection-recovery procedure documented."
verification:
  verdict: verified
  checked_at: 2026-06-02T08:29:28.003Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 45 spec commands match source verbatim with correct shapes and transport parameters; spec fully covers the 45-command source catalogue. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Rotel RKB-850/8100/D850/D8100 RS-232 Control Spec

## Summary
This spec covers the ASCII-based RS-232 control protocol for the Rotel RKB-850, RKB-8100, RKB-D850, and RKB-D8100 rack-mount power amplifiers. The protocol supports power, per-channel on/off, volume/balance, mute, input selection (D models), status queries, and automatic or manual feedback reporting over a fixed-configuration serial link (115200/8-N-1, no handshaking).

<!-- UNRESOLVED: device firmware version range not stated; several commands are gated by Main Software V1.31 (volume/balance/channel), V2.43 (Signal Sense), or V2.45 (input selection) — see Notes. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from power_on/power_off/power_toggle commands
- levelable  # inferred from volume up/down/set, balance, mute commands
- queryable  # inferred from get_* query commands
- routable  # inferred from input_sel_auto/digital/analog commands (D models, V2.45+)
```

## Actions
```yaml
# Power & Volume
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
  label: Channel On (per-channel, prefix 0A:/0B:/0C:/0D: optional)
  kind: action
  command: "channel_on!"  # use "0A:channel_on!" etc. for a specific channel
  params:
    - name: channel_prefix
      type: string
      description: Optional channel prefix (0A, 0B, 0C, 0D); omit for all channels
    - name: channel_off
      label: Channel Off (per-channel, prefix 0A:/0B:/0C:/0D: optional)
      type: string

- id: channel_off
  label: Channel Off
  kind: action
  command: "channel_off!"
  params:
    - name: channel_prefix
      type: string
      description: Optional channel prefix (0A, 0B, 0C, 0D); omit for all channels

- id: volume_up
  label: Volume Up (all channels)
  kind: action
  command: "volume_up!"
  params: []

- id: volume_down
  label: Volume Down (all channels)
  kind: action
  command: "volume_down!"
  params: []

- id: volume_set
  label: Set Volume (1-96)
  kind: action
  command: "volume_{level}!"
  params:
    - name: level
      type: integer
      description: Volume level 1-96
      min: 1
      max: 96

- id: volume_l_up
  label: Left Channel Volume Up
  kind: action
  command: "volume_l_up!"
  params: []

- id: volume_r_up
  label: Right Channel Volume Up
  kind: action
  command: "volume_r_up!"
  params: []

- id: volume_l_down
  label: Left Channel Volume Down
  kind: action
  command: "volume_l_down!"
  params: []

- id: volume_r_down
  label: Right Channel Volume Down
  kind: action
  command: "volume_r_down!"
  params: []

- id: volume_l_set
  label: Set Left Channel Volume (1-96)
  kind: action
  command: "volume_l_{level}!"
  params:
    - name: level
      type: integer
      description: Left channel volume level 1-96
      min: 1
      max: 96

- id: volume_r_set
  label: Set Right Channel Volume (1-96)
  kind: action
  command: "volume_r_{level}!"
  params:
    - name: level
      type: integer
      description: Right channel volume level 1-96
      min: 1
      max: 96

# Mute
- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "mute!"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "mute_on!"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "mute_off!"
  params: []

# Balance
- id: balance_right
  label: Balance Right
  kind: action
  command: "balance_right!"
  params: []

- id: balance_left
  label: Balance Left
  kind: action
  command: "balance_left!"
  params: []

- id: balance_L15
  label: Set Balance to Max Left
  kind: action
  command: "balance_L15!"
  params: []

- id: balance_000
  label: Set Balance to Center
  kind: action
  command: "balance_000!"
  params: []

- id: balance_R15
  label: Set Balance to Max Right
  kind: action
  command: "balance_R15!"
  params: []

# Other
- id: factory_default
  label: Factory Default Reset
  kind: action
  command: "factory_default_on!"
  params: []

# Input Selection (RKB-D850/D8100, Main Software V2.45+)
- id: input_sel_auto
  label: Input Select Mode - Auto
  kind: action
  command: "input_sel_auto!"
  params: []

- id: input_sel_digital
  label: Input Select Mode - Optical/Digital
  kind: action
  command: "input_sel_digital!"
  params: []

- id: input_sel_analog
  label: Input Select Mode - Analog
  kind: action
  command: "input_sel_analog!"
  params: []

# Status Refresh Mode
- id: display_update_auto
  label: Status Update - Auto
  kind: action
  command: "display_update_auto!"
  params: []

- id: display_update_manual
  label: Status Update - Manual
  kind: action
  command: "display_update_manual!"
  params: []

# Feedback Requests (queries)
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
  label: Request Current Input Select Mode (V2.45+)
  kind: query
  command: "get_input_sel_mode!"
  params: []

- id: get_channel_status
  label: Request Current Channel Power Status
  kind: query
  command: "get_channel_status!"  # or "0A:get_channel_status!" etc. for specific channel
  params:
    - name: channel_prefix
      type: string
      description: Optional channel prefix (0A, 0B, 0C, 0D); omit for all channels

- id: get_balance
  label: Request Current Balance
  kind: query
  command: "get_balance!"
  params:
    - name: channel_prefix
      type: string
      description: Optional channel prefix (0A, 0B, 0C, 0D); omit for all channels

- id: get_current_freq
  label: Request Current Digital Input Frequency
  kind: query
  command: "get_current_freq!"
  params:
    - name: channel_prefix
      type: string
      description: Optional channel prefix (0A, 0B, 0C, 0D); omit for all channels

- id: get_amp_trim
  label: Request Current Level Trims
  kind: query
  command: "get_amp_trim!"
  params: []

- id: get_temperature
  label: Request Current Amplifier Temperature (Celsius)
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
  label: Request Current Volume (both channels)
  kind: query
  command: "get_volume!"
  params:
    - name: channel_prefix
      type: string
      description: Optional channel prefix (0A, 0B, 0C, 0D); omit for all channels

- id: get_volume_l
  label: Request Current Left Channel Volume
  kind: query
  command: "get_volume_l!"
  params:
    - name: channel_prefix
      type: string
      description: Optional channel prefix (0A, 0B, 0C, 0D); omit for all channels

- id: get_volume_r
  label: Request Current Right Channel Volume
  kind: query
  command: "get_volume_r!"
  params:
    - name: channel_prefix
      type: string
      description: Optional channel prefix (0A, 0B, 0C, 0D); omit for all channels
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  description: Returned by power_on/power_off/power_toggle/get_current_power
  values: [on, standby, SignalSenseMode]

- id: ch_power
  type: enum
  description: Per-channel power; returned by channel_on/channel_off/get_channel_status
  values: [on, off, amp_on, amp_off]
  notes: "amp_on/amp_off returned only in Signal Sense mode"

- id: volume_l
  type: integer
  description: 2-digit left channel volume level (00-96)
  min: 0
  max: 96

- id: volume_r
  type: integer
  description: 2-digit right channel volume level (00-96)
  min: 0
  max: 96

- id: volume_max
  type: integer
  description: Max volume value returned by get_volume_max
  example: 96

- id: volume_min
  type: integer
  description: Min volume value returned by get_volume_min
  example: 0

- id: mute_state
  type: enum
  description: Returned by mute/mute_on/mute_off
  values: [on, off]

- id: balance
  type: string
  description: "Balance value. Format: 000, L01-L15, R01-R15, or L##/R## in response to balance_right/balance_left"
  example: "L03"

- id: amp_trim
  type: enum
  description: Per-channel level trim
  values: ["##", min, max]
  example: "45"

- id: frequency
  type: enum
  description: Digital input sample rate
  values: [off, 32, 44.1, 48, 88.2, 96, 176.4, 192]
  units: kHz

- id: temperature
  type: string
  description: "Temperature per channel pair/power supply. 3 values for RKB-850/D850, 4 for RKB-8100/D8100 (2 power supplies). Comma-separated, in Celsius."
  example: "32,32,34"

- id: fan_state
  type: enum
  description: Returned by get_fan_status
  values: [normal, high]

- id: amp_state
  type: enum
  description: Returned by get_amp_status
  values: [normal, protection]

- id: input_sel_mode
  type: enum
  description: Returned by get_input_sel_mode (V2.45+)
  values: [auto, digital, analog]

- id: display_update_mode
  type: enum
  description: Returned by get_display_update
  values: [auto, manual]

- id: product_type
  type: string
  description: "2-digit length prefix + comma + product name. e.g. product_type=08,RKB-850"

- id: product_version
  type: string
  description: "2-digit length prefix + comma + main CPU software version. e.g. product_version=06,V1.2.2"
```

## Variables
```yaml
# UNRESOLVED: no continuous settable variables beyond the discrete Actions above.
# Volume, balance, and input select mode are all addressed via the discrete
# volume_*, balance_*, and input_sel_* commands; treat them as command-driven
# state, not free-form variables.
```

## Events
```yaml
# UNRESOLVED: in automatic display_update mode, the unit sends unsolicited
# updates on status changes (power, temperature, input level trims, digital
# input frequency). The source documents the response strings but does not
# enumerate a complete event subscription contract beyond enabling auto mode
# via display_update_auto!. See Notes.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document explicit safety warnings, interlock
# procedures, or power-on sequencing. The "amp=protection" feedback value
# implies an internal protection state, but recovery procedure is not stated.
```

## Notes
- **Serial framing:** all commands terminate with `!` and must NOT include spaces, carriage returns, or line feeds. Status responses terminate with `!`, except variable-length text payloads which use a 2-digit byte-count prefix followed by `,` and the text (e.g. `product_type=08,RKB-850`).
- **Channel prefixes:** commands and queries that affect a single channel accept an optional `0A:`, `0B:`, `0C:`, or `0D:` prefix (e.g. `0C:volume_l_=40!`). Without a prefix, the command applies to all four channels and the unit returns one feedback line per channel separated by carriage return.
- **Flow control:** the source explicitly notes that the RS-232 hardware does not support flow control; the control application must pace sends/receives to avoid packet loss.
- **Feature gates by Main Software version** (relevant for compatibility):
  - **V1.31** added volume, mute, balance, and per-channel on/off commands.
  - **V2.43** added Signal Sense mode (disables `power_on`/`power_off` and per-channel on/off; `get_current_power` returns `power=SignalSenseMode!` and `get_channel_status` returns `ch_power=amp_on!`/`ch_power=amp_off!`).
  - **V2.45** added analog/digital input selection commands (`input_sel_*`) and the `get_input_sel_mode` query. Applies to RKB-D850/D8100 only.
- **Power vs. channel on/off:** it is recommended to use either `power_on`/`power_off` or the per-channel `channel_on`/`channel_off` commands, not both. If a channel is disabled via `channel_off!`, it will not respond to `power_on!` and must be re-enabled via `channel_on!`.
- **Volume control prereq:** for RS-232 volume commands to function, all four front-panel level trims must be set to minimum.
- **Balance vs. L/R volume:** if independent L/R volume settings are used, balance commands have no effect and existing balance is reset to 0.
- **Default input mode (D models):** `auto` — selects optical input if a digital signal is present, otherwise falls back to analog.
- **Temperature count differs by model:** RKB-850/D850 return 3 temperature values (channels AB, channels CD, power supply); RKB-8100/D8100 return 4 (adds a second power supply reading).

<!-- UNRESOLVED: firmware compatibility range (min/max) not stated in source. -->
<!-- UNRESOLVED: no events/subscription contract documented beyond the auto/manual mode toggle. -->
<!-- UNRESOLVED: no safety or protection-recovery procedure documented. -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RKB850%20Protocol.pdf"
retrieved_at: 2026-06-01T22:26:43.468Z
last_checked_at: 2026-06-02T08:29:28.003Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:29:28.003Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 45 spec commands match source verbatim with correct shapes and transport parameters; spec fully covers the 45-command source catalogue. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device firmware version range not stated; several commands are gated by Main Software V1.31 (volume/balance/channel), V2.43 (Signal Sense), or V2.45 (input selection) — see Notes."
- "no continuous settable variables beyond the discrete Actions above."
- "in automatic display_update mode, the unit sends unsolicited"
- "no multi-step macro sequences documented in source."
- "source does not document explicit safety warnings, interlock"
- "firmware compatibility range (min/max) not stated in source."
- "no events/subscription contract documented beyond the auto/manual mode toggle."
- "no safety or protection-recovery procedure documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
