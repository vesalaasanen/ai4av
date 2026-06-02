---
spec_id: admin/planar-hb75-hb86
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar HB75 / HB86 Huddle Board Control Spec"
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
  - manualslib.com
  - manuals.plus
source_urls:
  - https://www.planar.com/media/ixuixe5m/020-1393-00a_planar-hb-series-huddle-board_rs232-user-manual.pdf
  - https://www.manualslib.com/manual/1975691/Planar-Hb-Series.html
  - https://www.planar.com/media/439296/020-1392-00a_planar-hb-series-huddle-board_user-manual.pdf
  - https://manuals.plus/planar/planar-hb-series-huddle-board-manual-hb75-hb86.pdf
  - https://www.planar.com/media/439297/020-1393-00a_planar-hb-series-huddle-board_rs232-user-manual.pdf
retrieved_at: 2026-05-18T09:37:15.005Z
last_checked_at: 2026-06-02T17:23:46.004Z
generated_at: 2026-06-02T17:23:46.004Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "certain commands require later firmware; minimum firmware version not stated in source"
  - "all commands in the source use fixed or per-call hex values; no"
  - "source documents no unsolicited notifications from the display."
  - "source documents no multi-step sequences."
  - "no additional safety warnings or interlock procedures documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:46.004Z
  matched_actions: 58
  action_count: 58
  confidence: medium
  summary: "All 58 spec actions matched the source commands literally; complete coverage of all 18 command codes with bidirectional completeness; transport parameters verified verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Planar HB75 / HB86 Huddle Board Control Spec

## Summary
RS-232 control spec for the Planar HB Series Huddle Board (HB75 and HB86), large-format LCD displays covering power, source selection, picture adjustments, audio, and remote-control passthrough. Commands use a 3-byte ASCII form `XX YY ZZ` over RS-232 (38400 8N1, no flow control) and are also reachable over TCP on port 4660.

<!-- UNRESOLVED: certain commands require later firmware; minimum firmware version not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 4660
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # inferred from Power (ka) commands
- routable       # inferred from Source (kb) commands
- queryable      # inferred from Read (XX 00 ff) command variants
- levelable      # inferred from Contrast, Brightness, Sharpness, Saturation, Volume (kg/kh/kk/ki/kf) commands
```

## Actions
```yaml
# Power (ka)
- id: power_off
  label: Power Off
  kind: action
  command: "ka 00 00"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "ka 00 01"
  params: []

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "ka 00 ff"
  params: []

# Source (kb)
- id: source_home
  label: Select Source Home
  kind: action
  command: "kb 00 00"
  params: []

- id: source_av
  label: Select Source AV
  kind: action
  command: "kb 00 02"
  params: []

- id: source_vga
  label: Select Source VGA
  kind: action
  command: "kb 00 05"
  params: []

- id: source_ops
  label: Select Source OPS
  kind: action
  command: "kb 00 07"
  params: []

- id: source_front_hdmi
  label: Select Source Front HDMI
  kind: action
  command: "kb 00 08"
  params: []

- id: source_hdmi1
  label: Select Source HDMI 1
  kind: action
  command: "kb 00 09"
  params: []

- id: source_hdmi2
  label: Select Source HDMI 2
  kind: action
  command: "kb 00 0a"
  params: []

- id: source_dp
  label: Select Source DisplayPort
  kind: action
  command: "kb 00 0c"
  params: []

- id: source_query
  label: Current Source Query
  kind: query
  command: "kb 00 ff"
  params: []

# Aspect Ratio (kc)
- id: aspect_16_9
  label: Aspect Ratio 16:9
  kind: action
  command: "kc 00 01"
  params: []

- id: aspect_4_3
  label: Aspect Ratio 4:3
  kind: action
  command: "kc 00 02"
  params: []

- id: aspect_native
  label: Aspect Ratio Native
  kind: action
  command: "kc 00 05"
  params: []

- id: aspect_query
  label: Aspect Ratio Query
  kind: query
  command: "kc 00 ff"
  params: []

# Color Temperature (ku)
- id: color_temp_3200k
  label: Color Temperature 3200K
  kind: action
  command: "ku 00 00"
  params: []

- id: color_temp_5500k
  label: Color Temperature 5500K
  kind: action
  command: "ku 00 01"
  params: []

- id: color_temp_6500k
  label: Color Temperature 6500K
  kind: action
  command: "ku 00 02"
  params: []

- id: color_temp_7500k
  label: Color Temperature 7500K
  kind: action
  command: "ku 00 03"
  params: []

- id: color_temp_9300k
  label: Color Temperature 9300K
  kind: action
  command: "ku 00 04"
  params: []

- id: color_temp_query
  label: Color Temperature Query
  kind: query
  command: "ku 00 ff"
  params: []

# Contrast (kg) 0..100
- id: contrast_set
  label: Set Contrast
  kind: action
  command: "kg 00 {value}"
  params:
    - name: value
      type: integer
      description: Contrast level 0-100 (hex byte; example: 50 = 0x32)

- id: contrast_query
  label: Contrast Query
  kind: query
  command: "kg 00 ff"
  params: []

# Brightness (kh) 0..100
- id: brightness_set
  label: Set Brightness
  kind: action
  command: "kh 00 {value}"
  params:
    - name: value
      type: integer
      description: Brightness level 0-100 (hex byte; example: 65 = 0x41)

- id: brightness_query
  label: Brightness Query
  kind: query
  command: "kh 00 ff"
  params: []

# Sharpness (kk) 0..100
- id: sharpness_set
  label: Set Sharpness
  kind: action
  command: "kk 00 {value}"
  params:
    - name: value
      type: integer
      description: Sharpness level 0-100 (hex byte; example: 50 = 0x32)

- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "kk 00 ff"
  params: []

# Saturation (ki) 0..100
- id: saturation_set
  label: Set Saturation
  kind: action
  command: "ki 00 {value}"
  params:
    - name: value
      type: integer
      description: Saturation level 0-100 (hex byte; example: 50 = 0x32)

- id: saturation_query
  label: Saturation Query
  kind: query
  command: "ki 00 ff"
  params: []

# Freeze (kz)
- id: freeze_off
  label: Freeze Off
  kind: action
  command: "kz 00 00"
  params: []

- id: freeze_on
  label: Freeze On
  kind: action
  command: "kz 00 01"
  params: []

- id: freeze_query
  label: Freeze Query
  kind: query
  command: "kz 00 ff"
  params: []

# Mute (ke)
- id: mute_off
  label: Mute Off
  kind: action
  command: "ke 00 00"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "ke 00 01"
  params: []

- id: mute_query
  label: Mute Query
  kind: query
  command: "ke 00 ff"
  params: []

# Volume (kf) 0..100
- id: volume_set
  label: Set Volume
  kind: action
  command: "kf 00 {value}"
  params:
    - name: value
      type: integer
      description: Volume level 0-100 (hex byte; example: 50 = 0x32)

- id: volume_query
  label: Volume Query
  kind: query
  command: "kf 00 ff"
  params: []

# Volume Increment (kv)
- id: volume_down
  label: Volume Down (step)
  kind: action
  command: "kv 00 00"
  params: []

- id: volume_up
  label: Volume Up (step)
  kind: action
  command: "kv 00 01"
  params: []

# Remote Control passthrough (mc)
- id: remote_power
  label: Remote Power
  kind: action
  command: "mc 00 80"
  params: []

- id: remote_of
  label: Remote OF
  kind: action
  command: "mc 00 8c"
  params: []

- id: remote_up
  label: Remote Up
  kind: action
  command: "mc 00 8d"
  params: []

- id: remote_down
  label: Remote Down
  kind: action
  command: "mc 00 8e"
  params: []

- id: remote_left
  label: Remote Left
  kind: action
  command: "mc 00 8f"
  params: []

- id: remote_right
  label: Remote Right
  kind: action
  command: "mc 00 90"
  params: []

- id: remote_menu
  label: Remote Menu
  kind: action
  command: "mc 00 95"
  params: []

- id: remote_exit
  label: Remote Exit
  kind: action
  command: "mc 00 96"
  params: []

- id: remote_source
  label: Remote Source
  kind: action
  command: "mc 00 ac"
  params: []

# Info (kd)
- id: info_action
  label: Show Info
  kind: action
  command: "kd 00 01"
  params: []

# Factory Reset (kl)
- id: factory_reset
  label: Factory Reset
  kind: action
  command: "kl 00 01"
  params: []

# IR Sensor (ms)
- id: ir_sensor_off
  label: IR Sensor Off
  kind: action
  command: "ms 00 00"
  params: []

- id: ir_sensor_on
  label: IR Sensor On
  kind: action
  command: "ms 00 01"
  params: []

- id: ir_sensor_query
  label: IR Sensor Query
  kind: query
  command: "ms 00 ff"
  params: []

# OSD Key Lock (mo)
- id: osd_key_lock_off
  label: OSD Key Lock Off
  kind: action
  command: "mo 00 00"
  params: []

- id: osd_key_lock_on
  label: OSD Key Lock On
  kind: action
  command: "mo 00 01"
  params: []

- id: osd_key_lock_query
  label: OSD Key Lock Query
  kind: query
  command: "mo 00 ff"
  params: []

# MCU Version (mu) - standby only
- id: mcu_version_query
  label: MCU Version Query (standby only)
  kind: query
  command: "mu 00 ff"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  source: "ka 00 01 / ka 00 00"

- id: source
  type: enum
  values: [home, av, vga, ops, front_hdmi, hdmi1, hdmi2, dp]
  source: "kb 00 {00,02,05,07,08,09,0a,0c}"

- id: aspect_ratio
  type: enum
  values: ["16:9", "4:3", native]
  source: "kc 00 {01,02,05}"

- id: color_temp
  type: enum
  values: ["3200K", "5500K", "6500K", "7500K", "9300K"]
  source: "ku 00 {00,01,02,03,04}"

- id: contrast
  type: integer
  range: 0..100
  source: "kg 00 {value}  (hex)"

- id: brightness
  type: integer
  range: 0..100
  source: "kh 00 {value}  (hex)"

- id: sharpness
  type: integer
  range: 0..100
  source: "kk 00 {value}  (hex)"

- id: saturation
  type: integer
  range: 0..100
  source: "ki 00 {value}  (hex)"

- id: freeze
  type: enum
  values: [on, off]
  source: "kz 00 {00,01}"

- id: mute
  type: enum
  values: [on, off]
  source: "ke 00 {00,01}"

- id: volume
  type: integer
  range: 0..100
  source: "kf 00 {value}  (hex)"

- id: ir_sensor
  type: enum
  values: [on, off]
  source: "ms 00 {00,01}"

- id: osd_key_lock
  type: enum
  values: [locked, unlocked]
  source: "mo 00 {00,01}"

- id: mcu_version
  type: string
  source: "mu 00 ff (standby only)"
```

## Variables
```yaml
# UNRESOLVED: all commands in the source use fixed or per-call hex values; no
# persistent settable parameters beyond the action set are documented.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications from the display.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset   # kl 00 01 - irreversible
interlocks: []
# UNRESOLVED: no additional safety warnings or interlock procedures documented
# in the RS-232 manual; refer to the device User Manual for installation safety.
```

## Notes
- Command frame is 3 ASCII bytes separated by spaces: `XX YY ZZ`. The middle byte `YY` is always `00` for this product. `ZZ = ff` means read; any other `ZZ` means write. Responses echo the command on success; invalid/unrecognized commands receive no response.
- Connector is straight-through RS-232: Pin 2 Tx, Pin 3 Rx, Pin 5 Gnd, Shell Gnd. No other pins connected.
- RS-232 is **disabled by default** — must be enabled via the OSD setting `RS232C Control = On`.
- LAN access uses TCP port **4660** (RS-232 commands wrapped over the TCP stream). Behavior in standby depends on the OSD `Power Management` setting: `Standby Mode` disables LAN in standby; `Networked Standby Mode` only accepts Wake-on-LAN (use WOL to power on, not `ka 00 01`); `Fast Startup` keeps full LAN support in standby.
- `mu 00 ff` (MCU version query) only responds while the display is in standby.
- "OF" remote button (`mc 00 8c`) name preserved verbatim from source — meaning not specified.
- Some commands require later firmware; upgrade to latest if a command is rejected.

## Provenance

```yaml
source_domains:
  - planar.com
  - manualslib.com
  - manuals.plus
source_urls:
  - https://www.planar.com/media/ixuixe5m/020-1393-00a_planar-hb-series-huddle-board_rs232-user-manual.pdf
  - https://www.manualslib.com/manual/1975691/Planar-Hb-Series.html
  - https://www.planar.com/media/439296/020-1392-00a_planar-hb-series-huddle-board_user-manual.pdf
  - https://manuals.plus/planar/planar-hb-series-huddle-board-manual-hb75-hb86.pdf
  - https://www.planar.com/media/439297/020-1393-00a_planar-hb-series-huddle-board_rs232-user-manual.pdf
retrieved_at: 2026-05-18T09:37:15.005Z
last_checked_at: 2026-06-02T17:23:46.004Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:46.004Z
matched_actions: 58
action_count: 58
confidence: medium
summary: "All 58 spec actions matched the source commands literally; complete coverage of all 18 command codes with bidirectional completeness; transport parameters verified verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "certain commands require later firmware; minimum firmware version not stated in source"
- "all commands in the source use fixed or per-call hex values; no"
- "source documents no unsolicited notifications from the display."
- "source documents no multi-step sequences."
- "no additional safety warnings or interlock procedures documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
