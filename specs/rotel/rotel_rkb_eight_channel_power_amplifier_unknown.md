---
spec_id: admin/rotel-rkb-850
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel RKB-850/RKB-8100/D850/D8100 Control Spec"
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
  - "https://www.rotel.com/sites/default/files/product/rs232/RCC1055%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RSP1576%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RSX1057%20Protocol.pdf"
  - "https://rotel.com/sites/default/files/product/rs232/RT1080%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RX1050%20Protocol.pdf"
retrieved_at: 2026-04-30T04:32:04.962Z
last_checked_at: 2026-05-31T21:00:11.767Z
generated_at: 2026-05-31T21:00:11.767Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T21:00:11.767Z
  matched_actions: 28
  action_count: 28
  confidence: high
  summary: "All 28 actions matched literal source commands with correct shape; transport parameters fully verified in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Rotel RKB-850/RKB-8100/D850/D8100 Control Spec

## Summary
Rotel multi-channel power amplifier series (RKB-850, RKB-8100, RKB-D850, RKB-D8100) controllable via RS232 ASCII protocol. Commands terminate with "!". Supports per-channel power, volume, balance, mute, and input selection (D models). No authentication required.

<!-- UNRESOLVED: RKB-D850/D8100 analog/digital input selection requires Main Software V2.45; specific firmware version not stated -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  parity: N
  data_bits: 8
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- queryable
- levelable
- routable  # RKB-D850/D8100 input selection
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
- id: channel_on
  label: Channel On (specific channel)
  kind: action
  params:
    - name: channel
      type: string
      description: Channel prefix (0A, 0B, 0C, or 0D)
- id: channel_off
  label: Channel Off (specific channel)
  kind: action
  params:
    - name: channel
      type: string
      description: Channel prefix (0A, 0B, 0C, or 0D)
- id: volume_up
  label: Volume Up (all channels)
  kind: action
  params: []
- id: volume_down
  label: Volume Down (all channels)
  kind: action
  params: []
- id: volume_n
  label: Set Volume (all channels)
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 1-96
- id: volume_l_up
  label: Left Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: Channel prefix (0A, 0B, 0C, or 0D)
- id: volume_r_up
  label: Right Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: Channel prefix (0A, 0B, 0C, or 0D)
- id: volume_l_down
  label: Left Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: Channel prefix (0A, 0B, 0C, or 0D)
- id: volume_r_down
  label: Right Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: Channel prefix (0A, 0B, 0C, or 0D)
- id: volume_l_n
  label: Set Left Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: Channel prefix (0A, 0B, 0C, or 0D)
    - name: level
      type: integer
      description: Volume level 1-96
- id: volume_r_n
  label: Set Right Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: Channel prefix (0A, 0B, 0C, or 0D)
    - name: level
      type: integer
      description: Volume level 1-96
- id: mute
  label: Mute Toggle
  kind: action
  params:
    - name: channel
      type: string
      description: Channel prefix (0A, 0B, 0C, or 0D)
- id: mute_on
  label: Mute On
  kind: action
  params:
    - name: channel
      type: string
      description: Channel prefix (0A, 0B, 0C, or 0D)
- id: mute_off
  label: Mute Off
  kind: action
  params:
    - name: channel
      type: string
      description: Channel prefix (0A, 0B, 0C, or 0D)
- id: balance_right
  label: Balance Right
  kind: action
  params:
    - name: channel
      type: string
      description: Channel prefix (0A, 0B, 0C, or 0D)
- id: balance_left
  label: Balance Left
  kind: action
  params:
    - name: channel
      type: string
      description: Channel prefix (0A, 0B, 0C, or 0D)
- id: balance_L15
  label: Set Balance Max Left
  kind: action
  params:
    - name: channel
      type: string
      description: Channel prefix (0A, 0B, 0C, or 0D)
- id: balance_000
  label: Set Balance to 0
  kind: action
  params:
    - name: channel
      type: string
      description: Channel prefix (0A, 0B, 0C, or 0D)
- id: balance_R15
  label: Set Balance Max Right
  kind: action
  params:
    - name: channel
      type: string
      description: Channel prefix (0A, 0B, 0C, or 0D)
- id: factory_default_on
  label: Factory Default On
  kind: action
  params: []
- id: input_sel_auto
  label: Set Input Selection Auto (D850/D8100)
  kind: action
  params: []
- id: input_sel_digital
  label: Select Optical Input (D850/D8100)
  kind: action
  params: []
- id: input_sel_analog
  label: Select Analog Input (D850/D8100)
  kind: action
  params: []
- id: display_update_auto
  label: Set Status Update Auto
  kind: action
  params: []
- id: display_update_manual
  label: Set Status Update Manual
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: get_product_type
  label: Get Product Type
  kind: query
  params: []
  response: product_type=##,text
- id: get_product_version
  label: Get Product Version
  kind: query
  params: []
  response: product_version=##,text
- id: get_display_update
  label: Get Display Update Mode
  kind: query
  params: []
  response: display_update=auto! | display_update=manual!
- id: get_current_power
  label: Get Current Power Status
  kind: query
  params: []
  response: power=on! | power=standby! | power=SignalSenseMode!
- id: get_input_sel_mode
  label: Get Input Select Mode (D850/D8100, V2.45+)
  kind: query
  params: []
  response: input_sel_mode=auto! | input_sel_mode=digital! | input_sel_mode=analog!
- id: get_channel_status
  label: Get Channel Status
  kind: query
  params:
    - name: channel
      type: string
      required: false
      description: Channel prefix (0A, 0B, 0C, 0D) or omit for all
  response: "0X:ch_power=on! | 0X:ch_power=off! | 0X:ch_power=amp_on! | 0X:ch_power=amp_off!"
- id: get_balance
  label: Get Balance
  kind: query
  params:
    - name: channel
      type: string
      required: false
      description: Channel prefix or omit for all
  response: "0X:balance=L01-15! | 0X:balance=000! | 0X:balance=R01-15!"
- id: get_current_freq
  label: Get Current Frequency (digital input)
  kind: query
  params:
    - name: channel
      type: string
      required: false
      description: Channel prefix or omit for all
  response: "0X:freq=off! | freq=32! | freq=44.1! | freq=48! | freq=88.2! | freq=96! | freq=176.4! | freq=192!"
- id: get_amp_trim
  label: Get Amplifier Trim
  kind: query
  params: []
  response: "0X:amp_trim=##! | 0X:amp_trim=min! | 0X:amp_trim=max!"
- id: get_temperature
  label: Get Temperature
  kind: query
  params: []
  response: "temperature=AB,CD,PS! (RKB-850/D850) or temperature=AB,CD,PS1,PS2! (RKB-8100/D8100)"
- id: get_fan_status
  label: Get Fan Status
  kind: query
  params: []
  response: fan=normal! | fan=high!
- id: get_amp_status
  label: Get Amplifier Status
  kind: query
  params: []
  response: amp=normal! | amp=protection!
- id: get_volume_max
  label: Get Max Volume
  kind: query
  params: []
  response: volume_max=##!
- id: get_volume_min
  label: Get Min Volume
  kind: query
  params: []
  response: volume_min=##!
- id: get_volume
  label: Get Volume (both channels)
  kind: query
  params:
    - name: channel
      type: string
      required: false
      description: Channel prefix or omit for all
  response: "0X:volume_l_=##! 0X:volume_r_=##!"
- id: get_volume_l
  label: Get Left Channel Volume
  kind: query
  params:
    - name: channel
      type: string
      required: false
      description: Channel prefix or omit for all
  response: "0X:volume_l_=##!"
- id: get_volume_r
  label: Get Right Channel Volume
  kind: query
  params:
    - name: channel
      type: string
      required: false
      description: Channel prefix or omit for all
  response: "0X:volume_r_=##!"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters outside of action commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions in source; device sends automatic
# status updates only when display_update_auto is enabled and status changes
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
- All commands terminate with "!". No carriage return or line feed.
- Channel prefixes: 0A=Channel A, 0B=Channel B, 0C=Channel C, 0D=Channel D.
- Omit prefix to target all channels.
- Volume control requires all 4 front panel level trims set to minimum.
- Individual channel on/off (channel_on/channel_off) and power_on/power_off are mutually exclusive — channels disabled via channel_off ignore power_on.
- Signal Sense mode (V02 units with Main Software V2.43+) disables RS232 power/channel commands and modifies feedback responses.
- RKB-D850/D8100 input selection requires Main Software V2.45.
- RS232 hardware does not support flow control — care needed to avoid packet loss.
<!-- UNRESOLVED: voltage/current/power specifications not in source -->

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/RCC1055%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RSP1576%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RSX1057%20Protocol.pdf"
  - "https://rotel.com/sites/default/files/product/rs232/RT1080%20Protocol.pdf"
  - "https://www.rotel.com/sites/default/files/product/rs232/RX1050%20Protocol.pdf"
retrieved_at: 2026-04-30T04:32:04.962Z
last_checked_at: 2026-05-31T21:00:11.767Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:00:11.767Z
matched_actions: 28
action_count: 28
confidence: high
summary: "All 28 actions matched literal source commands with correct shape; transport parameters fully verified in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
