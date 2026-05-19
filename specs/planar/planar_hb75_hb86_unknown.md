---
spec_id: admin/planar-hb75-hb86
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar HB75 HB86 Control Spec"
manufacturer: Planar
model_family: HB75
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - HB75
    - HB86
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
  - https://www.planar.com/media/evgb35qb/020-1430-00a_planar-simplicity-m-series-rs232-user-manual.pdf
  - https://www.planar.com/media/q2zg4yzj/020-1449-00a_ultrares-p-series-urpxx2-serial-commands-user-manual.pdf
retrieved_at: 2026-04-30T04:27:27.764Z
last_checked_at: 2026-05-18T16:46:51.845Z
generated_at: 2026-05-18T16:46:51.845Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-18T16:46:51.845Z
  matched_actions: 57
  action_count: 57
  confidence: high
  summary: "All 57 spec actions matched semantically to source commands; transport parameters fully verified in manual."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-18
---

# Planar HB75 HB86 Control Spec

## Summary
Planar HB Series Huddle Board large-format displays (HB75, HB86). RS-232 control via 9-pin DE-9 connector at 38400/8/N/1. TCP control via port 4660. Supports power, source routing, display adjustments, and OSD locking. No authentication required.

<!-- UNRESOLVED: no safety warnings or interlock procedures in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 4660  # stated: RS-232 over LAN via TCP port 4660
serial:
  baud_rate: 38400  # stated
  data_bits: 8
  parity: none
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
- routable
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
- id: power_read
  label: Read Power State
  kind: query
  params: []

- id: source_home
  label: Source - Home
  kind: action
  params: []
- id: source_ops
  label: Source - OPS
  kind: action
  params: []
- id: source_front_hdmi
  label: Source - Front HDMI
  kind: action
  params: []
- id: source_hdmi1
  label: Source - HDMI 1
  kind: action
  params: []
- id: source_hdmi2
  label: Source - HDMI 2
  kind: action
  params: []
- id: source_dp
  label: Source - DisplayPort
  kind: action
  params: []
- id: source_vga
  label: Source - VGA
  kind: action
  params: []
- id: source_av
  label: Source - AV
  kind: action
  params: []
- id: source_read
  label: Read Source
  kind: query
  params: []

- id: aspect_ratio_16_9
  label: Aspect Ratio - 16:9
  kind: action
  params: []
- id: aspect_ratio_4_3
  label: Aspect Ratio - 4:3
  kind: action
  params: []
- id: aspect_ratio_native
  label: Aspect Ratio - Native
  kind: action
  params: []
- id: aspect_ratio_read
  label: Read Aspect Ratio
  kind: query
  params: []

- id: color_temp_3200k
  label: Color Temp - 3200K
  kind: action
  params: []
- id: color_temp_5500k
  label: Color Temp - 5500K
  kind: action
  params: []
- id: color_temp_6500k
  label: Color Temp - 6500K
  kind: action
  params: []
- id: color_temp_7500k
  label: Color Temp - 7500K
  kind: action
  params: []
- id: color_temp_9300k
  label: Color Temp - 9300K
  kind: action
  params: []
- id: color_temp_read
  label: Read Color Temp
  kind: query
  params: []

- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: contrast_read
  label: Read Contrast
  kind: query
  params: []

- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: brightness_read
  label: Read Brightness
  kind: query
  params: []

- id: sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: sharpness_read
  label: Read Sharpness
  kind: query
  params: []

- id: saturation_set
  label: Set Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: saturation_read
  label: Read Saturation
  kind: query
  params: []

- id: freeze_off
  label: Freeze - Off
  kind: action
  params: []
- id: freeze_on
  label: Freeze - On
  kind: action
  params: []
- id: freeze_read
  label: Read Freeze State
  kind: query
  params: []

- id: mute_off
  label: Mute - Off
  kind: action
  params: []
- id: mute_on
  label: Mute - On
  kind: action
  params: []
- id: mute_read
  label: Read Mute State
  kind: query
  params: []

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: volume_read
  label: Read Volume
  kind: query
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: volume_up
  label: Volume Up
  kind: action
  params: []

- id: ir_sensor_off
  label: IR Sensor - Off
  kind: action
  params: []
- id: ir_sensor_on
  label: IR Sensor - On
  kind: action
  params: []
- id: ir_sensor_read
  label: Read IR Sensor State
  kind: query
  params: []

- id: osd_key_lock_off
  label: OSD Key Lock - Off
  kind: action
  params: []
- id: osd_key_lock_on
  label: OSD Key Lock - On
  kind: action
  params: []
- id: osd_key_lock_read
  label: Read OSD Key Lock State
  kind: query
  params: []

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []

- id: info_action
  label: Info Action
  kind: action
  params: []

- id: remote_power
  label: Remote - Power
  kind: action
  params: []
- id: remote_menu
  label: Remote - Menu
  kind: action
  params: []
- id: remote_left
  label: Remote - Left
  kind: action
  params: []
- id: remote_up
  label: Remote - Up
  kind: action
  params: []
- id: remote_ok
  label: Remote - OK
  kind: action
  params: []
- id: remote_right
  label: Remote - Right
  kind: action
  params: []
- id: remote_down
  label: Remote - Down
  kind: action
  params: []
- id: remote_exit
  label: Remote - Exit
  kind: action
  params: []
- id: remote_source
  label: Remote - Source
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
- id: source_state
  type: enum
  values: [home, ops, front_hdmi, hdmi1, hdmi2, dp, vga, av]
- id: aspect_ratio_state
  type: enum
  values: [16_9, 4_3, native]
- id: color_temp_state
  type: enum
  values: [3200k, 5500k, 6500k, 7500k, 9300k]
- id: contrast_value
  type: integer
  range: [0, 100]
- id: brightness_value
  type: integer
  range: [0, 100]
- id: sharpness_value
  type: integer
  range: [0, 100]
- id: saturation_value
  type: integer
  range: [0, 100]
- id: freeze_state
  type: enum
  values: [off, on]
- id: mute_state
  type: enum
  values: [off, on]
- id: volume_value
  type: integer
  range: [0, 100]
- id: ir_sensor_state
  type: enum
  values: [off, on]
- id: osd_key_lock_state
  type: enum
  values: [off, on]
- id: mcu_version
  type: string
  # UNRESOLVED: format not specified in source; MCU Version cmd only supported in standby
```

## Variables
```yaml
# All settable parameters exposed via read/write commands are covered in Actions.
# No separate Variables section needed.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
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
RS-232 format: `XX YY ZZ` where XX=command code, YY=address byte (always "00" for this product), ZZ=data byte or "ff" for read. Responses mirror commands; invalid commands receive no response. Port 4660 TCP enables RS-232 over LAN. MCU Version command (`mu ff`) only available in standby. Some commands require latest firmware.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
  - https://www.planar.com/media/evgb35qb/020-1430-00a_planar-simplicity-m-series-rs232-user-manual.pdf
  - https://www.planar.com/media/q2zg4yzj/020-1449-00a_ultrares-p-series-urpxx2-serial-commands-user-manual.pdf
retrieved_at: 2026-04-30T04:27:27.764Z
last_checked_at: 2026-05-18T16:46:51.845Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:46:51.845Z
matched_actions: 57
action_count: 57
confidence: high
summary: "All 57 spec actions matched semantically to source commands; transport parameters fully verified in manual."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
