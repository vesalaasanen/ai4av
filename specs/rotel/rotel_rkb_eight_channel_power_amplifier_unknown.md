---
spec_id: admin/rotel-rkb-eight-channel-power-amplifier
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RKB Eight Channel Power Amplifier Control Spec"
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
retrieved_at: 2026-05-22T17:44:40.251Z
last_checked_at: 2026-06-02T05:46:09.348Z
generated_at: 2026-06-02T05:46:09.348Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 connector pinout / DE-9 wiring not stated in refined source"
  - "command timing / inter-command delay not stated"
  - "no explicit multi-step macro sequences described in source"
  - "no explicit electrical/voltage safety warnings in refined source"
  - "RS-232 connector type and pinout not stated in refined source"
  - "inter-command timing / max command rate not stated"
  - "behaviour when an invalid command is sent (NAK / silent drop) not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:09.348Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 45 spec actions matched verbatim in source; transport parameters verified; full bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Rotel RKB Eight Channel Power Amplifier Control Spec

## Summary
Rotel RKB-850/8100/D850/D8100 multi-channel power amplifiers controlled over RS-232 using ASCII commands terminated with "!". Supports power, per-channel power, volume (master and per-channel L/R), mute, balance, input selection (D-models only), and status queries.

<!-- UNRESOLVED: RS-232 connector pinout / DE-9 wiring not stated in refined source -->
<!-- UNRESOLVED: command timing / inter-command delay not stated -->

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
- powerable    # inferred from power_on/power_off/power_toggle commands
- queryable    # inferred from get_* query commands
- levelable    # inferred from volume_up/volume_down/volume_n commands
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
  label: Turn Specific Channel On
  kind: action
  command: "channel_on!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      description: Optional channel prefix (e.g. "0A:channel_on!"). Omit to apply to all channels.
      required: false

- id: channel_off
  label: Turn Specific Channel Off
  kind: action
  command: "channel_off!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      description: Optional channel prefix. Omit to apply to all channels.
      required: false

- id: volume_up
  label: Volume Up
  kind: action
  command: "volume_up!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: volume_down
  label: Volume Down
  kind: action
  command: "volume_down!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: volume_set
  label: Set Volume to Level
  kind: action
  command: "volume_{n}!"
  params:
    - name: n
      type: integer
      description: Volume level 1-96
      min: 1
      max: 96
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false
  notes: Front panel level trims must all be at minimum for RS-232 volume commands to take effect.

- id: volume_l_up
  label: Left Channel Volume Up
  kind: action
  command: "volume_l_up!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: volume_r_up
  label: Right Channel Volume Up
  kind: action
  command: "volume_r_up!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: volume_l_down
  label: Left Channel Volume Down
  kind: action
  command: "volume_l_down!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: volume_r_down
  label: Right Channel Volume Down
  kind: action
  command: "volume_r_down!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: volume_l_set
  label: Set Left Channel Volume to Level
  kind: action
  command: "volume_l_{n}!"
  params:
    - name: n
      type: integer
      description: Left channel volume level 1-96
      min: 1
      max: 96
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false
  notes: Using independent L/R volume settings resets balance to 0 for the channel.

- id: volume_r_set
  label: Set Right Channel Volume to Level
  kind: action
  command: "volume_r_{n}!"
  params:
    - name: n
      type: integer
      description: Right channel volume level 1-96
      min: 1
      max: 96
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false
  notes: Using independent L/R volume settings resets balance to 0 for the channel.

- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "mute!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: mute_on
  label: Mute On
  kind: action
  command: "mute_on!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: mute_off
  label: Mute Off
  kind: action
  command: "mute_off!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: balance_right
  label: Balance Right (step)
  kind: action
  command: "balance_right!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: balance_left
  label: Balance Left (step)
  kind: action
  command: "balance_left!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: balance_max_left
  label: Set Balance to Max Left
  kind: action
  command: "balance_L15!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: balance_center
  label: Set Balance to 0 (Center)
  kind: action
  command: "balance_000!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: balance_max_right
  label: Set Balance to Max Right
  kind: action
  command: "balance_R15!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: factory_default
  label: Factory Default Reset
  kind: action
  command: "factory_default_on!"
  params: []
  notes: Resets all user settings to factory defaults.

- id: input_sel_auto
  label: Input Selection Auto (D-models)
  kind: action
  command: "input_sel_auto!"
  params: []
  notes: RKB-D850/D8100 only, Main SW V2.45+. Auto selects Optical if digital signal present, else Analog.

- id: input_sel_digital
  label: Select Digital (Optical) Input (D-models)
  kind: action
  command: "input_sel_digital!"
  params: []
  notes: RKB-D850/D8100 only, Main SW V2.45+.

- id: input_sel_analog
  label: Select Analog Input (D-models)
  kind: action
  command: "input_sel_analog!"
  params: []
  notes: RKB-D850/D8100 only, Main SW V2.45+.

- id: display_update_auto
  label: Set Status Update to Auto
  kind: action
  command: "display_update_auto!"
  params: []
  notes: Unsolicited status updates pushed on state changes.

- id: display_update_manual
  label: Set Status Update to Manual
  kind: action
  command: "display_update_manual!"
  params: []
  notes: Status updates must be polled.

- id: get_product_type
  label: Get Product Type
  kind: query
  command: "get_product_type!"
  params: []

- id: get_product_version
  label: Get Product (CPU SW) Version
  kind: query
  command: "get_product_version!"
  params: []

- id: get_display_update
  label: Get Display Update Mode
  kind: query
  command: "get_display_update!"
  params: []

- id: get_current_power
  label: Get Current Power Status
  kind: query
  command: "get_current_power!"
  params: []

- id: get_input_sel_mode
  label: Get Input Selection Mode (D-models)
  kind: query
  command: "get_input_sel_mode!"
  params: []
  notes: Requires Main SW V2.45+.

- id: get_channel_status
  label: Get Channel Power Status
  kind: query
  command: "get_channel_status!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: get_balance
  label: Get Balance Setting
  kind: query
  command: "get_balance!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: get_current_freq
  label: Get Digital Input Frequency
  kind: query
  command: "get_current_freq!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: get_amp_trim
  label: Get Amplifier Level Trims
  kind: query
  command: "get_amp_trim!"
  params: []

- id: get_temperature
  label: Get Amplifier Temperature
  kind: query
  command: "get_temperature!"
  params: []
  notes: Celsius. RKB-850/D850 returns 3 values (AB, CD, PS). RKB-8100/D8100 returns 4 values (AB, CD, PS1, PS2).

- id: get_fan_status
  label: Get Fan Speed Status
  kind: query
  command: "get_fan_status!"
  params: []

- id: get_amp_status
  label: Get Amplifier Status
  kind: query
  command: "get_amp_status!"
  params: []

- id: get_volume_max
  label: Get Max Volume Value
  kind: query
  command: "get_volume_max!"
  params: []

- id: get_volume_min
  label: Get Min Volume Value
  kind: query
  command: "get_volume_min!"
  params: []

- id: get_volume
  label: Get Current Volume (L+R)
  kind: query
  command: "get_volume!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: get_volume_l
  label: Get Left Channel Volume
  kind: query
  command: "get_volume_l!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false

- id: get_volume_r
  label: Get Right Channel Volume
  kind: query
  command: "get_volume_r!"
  params:
    - name: channel_prefix
      type: enum
      values: ["0A", "0B", "0C", "0D"]
      required: false
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby, SignalSenseMode]
  response_pattern: "power={value}!"
  description: Returned by get_current_power and unsolicited power state changes.

- id: ch_power_state
  type: enum
  values: [on, off, amp_on, amp_off]
  response_pattern: "{0A|0B|0C|0D}:ch_power={value}!"
  description: Per-channel power. amp_on/amp_off only returned in Signal Sense mode.

- id: volume_left
  type: integer
  response_pattern: "{0A|0B|0C|0D}:volume_l_=##!"
  description: 2-digit left channel volume level.

- id: volume_right
  type: integer
  response_pattern: "{0A|0B|0C|0D}:volume_r_=##!"
  description: 2-digit right channel volume level.

- id: volume_max
  type: integer
  response_pattern: "volume_max=##!"
  description: Maximum volume value (typically 96).

- id: volume_min
  type: integer
  response_pattern: "volume_min=##!"
  description: Minimum volume value (typically 0).

- id: mute_state
  type: enum
  values: [on, off]
  response_pattern: "{0A|0B|0C|0D}:mute={value}!"

- id: balance
  type: string
  response_pattern: "{0A|0B|0C|0D}:balance=###!"
  description: Balance value. Format L01-L15 (left), R01-R15 (right), or 000 (center).

- id: digital_freq
  type: enum
  values: [off, "32", "44.1", "48", "88.2", "96", "176.4", "192"]
  response_pattern: "{0A|0B|0C|0D}:freq={value}!"
  description: Digital input sample frequency (kHz).

- id: amp_trim
  type: string
  response_pattern: "{0A|0B|0C|0D}:amp_trim={value}!"
  description: Front-panel level trim per channel. Value is integer or "min"/"max".

- id: temperature
  type: string
  response_pattern: "temperature={ab},{cd},{ps}[,{ps2}]!"
  description: Channel pair and power supply temperatures in Celsius. 3 values for RKB-850/D850, 4 values for RKB-8100/D8100.

- id: fan_status
  type: enum
  values: [normal, high]
  response_pattern: "fan={value}!"

- id: amp_status
  type: enum
  values: [normal, protection]
  response_pattern: "amp={value}!"

- id: display_update_mode
  type: enum
  values: [auto, manual]
  response_pattern: "display_update={value}!"

- id: input_sel_mode
  type: enum
  values: [auto, digital, analog]
  response_pattern: "input_sel_mode={value}!"
  description: D-models only.

- id: product_type
  type: string
  response_pattern: "product_type=##,text"
  description: 2-digit length prefix + comma + product name text. No "!" terminator.

- id: product_version
  type: string
  response_pattern: "product_version=##,text"
  description: 2-digit length prefix + comma + version text. No "!" terminator.
```

## Variables
```yaml
- id: volume_level
  type: integer
  min: 1
  max: 96
  description: Master volume level per channel.

- id: volume_l_level
  type: integer
  min: 1
  max: 96
  description: Left channel independent volume level.

- id: volume_r_level
  type: integer
  min: 1
  max: 96
  description: Right channel independent volume level.

- id: balance_position
  type: string
  description: L01-L15, R01-R15, or 000 (center).
```

## Events
```yaml
# When display_update_auto is enabled, the device sends unsolicited status updates
# on any state change (power, temperature, level trims, digital input frequency, etc.)
# using the same response_pattern formats listed in Feedbacks.
- id: auto_status_push
  description: Unsolicited push of any feedback string when display update mode is auto and device state changes.
  trigger: state change while display_update=auto
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_default
interlocks:
  - condition: front_panel_level_trims_not_at_minimum
    effect: RS-232 volume control commands have no effect on the unit.
  - condition: signal_sense_mode_active
    effect: RS-232 power_on/power_off and channel_on/channel_off commands are disabled.
  - condition: channels_disabled_via_channel_off
    effect: Channels will not respond to power_on; must be re-enabled via channel_on.
notes: |
  RS-232 hardware does not support flow control. Sender/receiver must pace transmissions
  to avoid packet loss. Commands must terminate with "!" and contain no spaces, CR, or LF.
# UNRESOLVED: no explicit electrical/voltage safety warnings in refined source
```

## Notes
- Protocol is ASCII over RS-232 at 115200 8N1, no flow control. Every outbound command ends with "!".
- Responses terminate with "!" except `product_type` and `product_version` which use a 2-digit length prefix (the count covers only the text, not the prefix or comma) and no trailing "!".
- Channel-specific prefixes: `0A:` (Channel A), `0B:`, `0C:`, `0D:`. Omitting the prefix applies the command to all channels and returns multi-line responses separated by CR.
- Volume range 1-96 (max queryable via `get_volume_max!`, min via `get_volume_min!`).
- Balance range L15 (max left) … 000 (center) … R15 (max right), single-step via `balance_left!`/`balance_right!`.
- Use either `power_on`/`power_off` OR `channel_on`/`channel_off`, not both; mixing leaves channels unreachable from power commands.
- Switching to independent L/R volume control resets per-channel balance to 0.
- Feature-gating by firmware: V1.31 for volume/mute/balance/channel-on-off, V2.43 for Signal Sense, V2.45 for input selection on D-models.
- Temperature query: 3 values on RKB-850/D850 (AB, CD, PSU); 4 values on RKB-8100/D8100 (AB, CD, PSU1, PSU2).
<!-- UNRESOLVED: RS-232 connector type and pinout not stated in refined source -->
<!-- UNRESOLVED: inter-command timing / max command rate not stated -->
<!-- UNRESOLVED: behaviour when an invalid command is sent (NAK / silent drop) not stated -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/RKB850%20Protocol.pdf"
retrieved_at: 2026-05-22T17:44:40.251Z
last_checked_at: 2026-06-02T05:46:09.348Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:09.348Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 45 spec actions matched verbatim in source; transport parameters verified; full bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 connector pinout / DE-9 wiring not stated in refined source"
- "command timing / inter-command delay not stated"
- "no explicit multi-step macro sequences described in source"
- "no explicit electrical/voltage safety warnings in refined source"
- "RS-232 connector type and pinout not stated in refined source"
- "inter-command timing / max command rate not stated"
- "behaviour when an invalid command is sent (NAK / silent drop) not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
