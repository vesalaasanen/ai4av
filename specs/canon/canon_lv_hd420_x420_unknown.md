---
spec_id: admin/canon-lv-hd420-x420
schema_version: ai4av-public-spec-v1
revision: 1
title: "Canon LV HD420 X420 Control Spec"
manufacturer: Canon
model_family: "LV HD420"
aliases: []
compatible_with:
  manufacturers:
    - Canon
  models:
    - "LV HD420"
    - X420
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - projectorcentral.com
  - cdn.marketing-cloud.io
  - asia.canon
  - usermanual.wiki
  - manua.ls
source_urls:
  - https://www.projectorcentral.com/pdf/projector_manual_9765.pdf
  - https://cdn.marketing-cloud.io/wp-content/canon_rebranding/uploads/2025/03/24155528/XC_Control_Protocol_specification_008.pdf
  - "https://asia.canon/en/support/0302672301?model=LV-X420"
  - https://usermanual.wiki/Canon/lvhd420lvx420umeng.74021124.pdf
  - https://www.manua.ls/canon/lv-hd420/manual
retrieved_at: 2026-05-14T21:18:41.187Z
last_checked_at: 2026-07-21T23:10:46.428Z
generated_at: 2026-07-21T23:10:46.428Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "voltage, current, power consumption specs not in source"
  - "no unsolicited notification mechanism described in source"
  - "no explicit multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "LAN auth/password mechanism not described in RS-232 protocol section"
  - "Crestron/AMX/PJLink command syntax not in source"
  - "firmware version not stated"
  - "events/unsolicited responses not documented"
verification:
  verdict: verified
  checked_at: 2026-07-21T23:10:46.428Z
  matched_actions: 59
  action_count: 59
  confidence: medium
  summary: "All 59 spec actions matched semantic counterparts in source; additional GET-only source commands represented via feedbacks; transport parameters verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Canon LV HD420 X420 Control Spec

## Summary
Canon LCD projector supporting RS-232 and wired LAN control. RS-232 protocol uses ASCII header 'V' + command code + optional data + CR terminator. LAN control supports TCP (Telnet on port 23) and is compatible with Crestron, AMX Device Discovery, and PJLink Class 1. Projector supports power on/off, input selection, image adjustment, and comprehensive image geometry controls.

<!-- UNRESOLVED: voltage, current, power consumption specs not in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23  # inferred: RS232 by Telnet uses port 23 (stated in telnet spec)
auth:
  type: none  # inferred: no auth procedure in RS-232 protocol section
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
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
- id: resync
  label: Resync
  kind: action
  params: []
- id: system_reset
  label: System Reset
  kind: action
  params: []
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: Brightness 0-100
- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: Contrast 0-100
- id: set_color
  label: Set Color
  kind: action
  params:
    - name: value
      type: integer
      description: Color 0-100
- id: set_tint
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      description: Tint 0-100
- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: Sharpness 0-31
- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  params:
    - name: value
      type: integer
      description: "0:6500K 1:7500K 2:8300K"
- id: set_gamma
  label: Set Gamma
  kind: action
  params:
    - name: value
      type: integer
      description: "0:1.8 1:2.0 2:2.2 3:2.4 5:Linear"
- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0:Standard 1:Presentation 3:Movie 5:sRGB 7:User"
- id: select_computer1
  label: Select COMPUTER1
  kind: action
  params: []
- id: select_computer2
  label: Select COMPUTER2
  kind: action
  params: []
- id: select_video
  label: Select Video
  kind: action
  params: []
- id: select_s_video
  label: Select S-Video
  kind: action
  params: []
- id: select_hdmi
  label: Select HDMI
  kind: action
  params: []
- id: select_component
  label: Select Component
  kind: action
  params: []
- id: select_hdmi2_mhl
  label: Select HDMI 2/MHL
  kind: action
  params: []
- id: set_scaling
  label: Set Scaling
  kind: action
  params:
    - name: value
      type: integer
      description: "0:Fill 1:4:3 2:16:9 3:Letter Box 4:Real 5:2.35:1"
- id: set_blank
  label: Set Blank
  kind: action
  params:
    - name: value
      type: integer
      description: "0:Off 1:On"
- id: set_freeze
  label: Set Freeze
  kind: action
  params:
    - name: value
      type: integer
      description: "0:Off 1:On"
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 0-10
- id: set_projection_mode
  label: Set Projection Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0:Front 1:Rear 2:Ceiling 3:Rear+Ceiling"
- id: set_vertical_keystone
  label: Set Vertical Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: Keystone -30 to +30
- id: set_horizontal_keystone
  label: Set Horizontal Keystone
  kind: action
  params:
    - name: value
      type: integer
      description: Keystone -30 to +30
- id: set_3d_mode
  label: Set 3D Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0:Off 1:DLP"
- id: set_3d_sync_inverter
  label: Set 3D Sync Inverter
  kind: action
  params:
    - name: value
      type: integer
      description: "0:Off 1:On"
- id: set_3d_format
  label: Set 3D Format
  kind: action
  params:
    - name: value
      type: integer
      description: "0:FS 1:TB 2:SBS 3:FP"
- id: set_lamp_mode
  label: Set Lamp Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0:Eco 1:Normal 2:SmartECO"
- id: set_fan_speed
  label: Set Fan Speed
  kind: action
  params:
    - name: value
      type: integer
      description: "0:Normal 1:HighSpeed"
- id: set_rgain
  label: Set R Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Gain 0-200
- id: set_ggain
  label: Set G Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Gain 0-200
- id: set_bgain
  label: Set B Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Gain 0-200
- id: set_r_offset
  label: Set R Offset
  kind: action
  params:
    - name: value
      type: integer
      description: Offset -100 to 100
- id: set_g_offset
  label: Set G Offset
  kind: action
  params:
    - name: value
      type: integer
      description: Offset -100 to 100
- id: set_b_offset
  label: Set B Offset
  kind: action
  params:
    - name: value
      type: integer
      description: Offset -100 to 100
- id: set_white_rgain
  label: Set White R Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Gain 0-100
- id: set_white_ggain
  label: Set White G Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Gain 0-200
- id: set_white_bgain
  label: Set White B Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Gain 0-200
- id: set_red_hue
  label: Set Red Hue
  kind: action
  params:
    - name: value
      type: integer
      description: Hue -100 to 100
- id: set_red_saturation
  label: Set Red Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: Saturation -100 to 100
- id: set_red_gain
  label: Set Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Gain -100 to 100
- id: set_green_hue
  label: Set Green Hue
  kind: action
  params:
    - name: value
      type: integer
      description: Hue -100 to 100
- id: set_green_saturation
  label: Set Green Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: Saturation -100 to 100
- id: set_green_gain
  label: Set Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Gain -100 to 100
- id: set_blue_hue
  label: Set Blue Hue
  kind: action
  params:
    - name: value
      type: integer
      description: Hue -100 to 100
- id: set_blue_saturation
  label: Set Blue Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: Saturation -100 to 100
- id: set_blue_gain
  label: Set Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Gain -100 to 100
- id: set_cyan_hue
  label: Set Cyan Hue
  kind: action
  params:
    - name: value
      type: integer
      description: Hue -100 to 100
- id: set_cyan_saturation
  label: Set Cyan Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: Saturation -100 to 100
- id: set_cyan_gain
  label: Set Cyan Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Gain -100 to 100
- id: set_magenta_hue
  label: Set Magenta Hue
  kind: action
  params:
    - name: value
      type: integer
      description: Hue -100 to 100
- id: set_magenta_saturation
  label: Set Magenta Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: Saturation -100 to 100
- id: set_magenta_gain
  label: Set Magenta Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Gain -100 to 100
- id: set_yellow_hue
  label: Set Yellow Hue
  kind: action
  params:
    - name: value
      type: integer
      description: Hue -100 to 100
- id: set_yellow_saturation
  label: Set Yellow Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: Saturation -100 to 100
- id: set_yellow_gain
  label: Set Yellow Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Gain -100 to 100
- id: set_ir_on_off
  label: Set IR On/Off
  kind: action
  params:
    - name: value
      type: integer
      description: "0:Both on 1:Front on 2:Back on 3:Both off"
```

## Feedbacks
```yaml
- id: lamp_hours
  label: Lamp Hours
  type: integer
  description: Lamp operation hours
- id: system_status
  label: System Status
  type: enum
  values:
    - "0:Reset"
    - "1:Standby"
    - "2:Operation"
    - "3:Cooling"
- id: fw_version
  label: Firmware Version
  type: string
- id: brightness
  label: Brightness
  type: integer
  range: [0, 100]
- id: contrast
  label: Contrast
  type: integer
  range: [0, 100]
- id: color
  label: Color
  type: integer
  range: [0, 100]
- id: tint
  label: Tint
  type: integer
  range: [0, 100]
- id: sharpness
  label: Sharpness
  type: integer
  range: [0, 31]
- id: color_temperature
  label: Color Temperature
  type: enum
  values:
    - "0:6500K"
    - "1:7500K"
    - "2:8300K"
- id: gamma
  label: Gamma
  type: enum
  values:
    - "0:1.8"
    - "1:2.0"
    - "2:2.2"
    - "3:2.4"
    - "5:Linear"
- id: picture_mode
  label: Picture Mode
  type: enum
  values:
    - "0:Standard"
    - "1:Presentation"
    - "3:Movie"
    - "5:sRGB"
    - "7:User"
- id: current_source
  label: Current Source
  type: enum
  values:
    - "1:COMPUTER1"
    - "2:COMPUTER2"
    - "4:Video"
    - "5:S-Video"
    - "6:HDMI"
    - "8:Component"
    - "9:HDMI 2/MHL"
- id: scaling
  label: Scaling
  type: enum
  values:
    - "0:Fill"
    - "1:4:3"
    - "2:16:9"
    - "3:Letter Box"
    - "4:Real"
    - "5:2.35:1"
- id: blank_state
  label: Blank State
  type: enum
  values:
    - "0:Off"
    - "1:On"
- id: freeze_state
  label: Freeze State
  type: enum
  values:
    - "0:Off"
    - "1:On"
- id: volume
  label: Volume
  type: integer
  range: [0, 10]
- id: projection_mode
  label: Projection Mode
  type: enum
  values:
    - "0:Front"
    - "1:Rear"
    - "2:Ceiling"
    - "3:Rear+Ceiling"
- id: vertical_keystone
  label: Vertical Keystone
  type: integer
  range: [-30, 30]
- id: horizontal_keystone
  label: Horizontal Keystone
  type: integer
  range: [-30, 30]
- id: lamp_mode
  label: Lamp Mode
  type: enum
  values:
    - "0:Eco"
    - "1:Normal"
    - "2:SmartECO"
- id: fan_speed
  label: Fan Speed
  type: enum
  values:
    - "0:Normal"
    - "1:HighSpeed"
- id: rgain
  label: R Gain
  type: integer
  range: [0, 200]
- id: ggain
  label: G Gain
  type: integer
  range: [0, 200]
- id: bgain
  label: B Gain
  type: integer
  range: [0, 200]
- id: r_offset
  label: R Offset
  type: integer
  range: [-100, 100]
- id: g_offset
  label: G Offset
  type: integer
  range: [-100, 100]
- id: b_offset
  label: B Offset
  type: integer
  range: [-100, 100]
- id: white_rgain
  label: White R Gain
  type: integer
  range: [0, 100]
- id: white_ggain
  label: White G Gain
  type: integer
  range: [0, 200]
- id: white_bgain
  label: White B Gain
  type: integer
  range: [0, 200]
- id: ir_status
  label: IR On/Off Status
  type: enum
  values:
    - "0:Both on"
    - "1:Front on"
    - "2:Back on"
    - "3:Both off"
```

## Variables
```yaml
# All settable parameters represented as action params; no discrete variable store needed
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

Command structure: `VXX[Command][Data]<CR>` where `XX=00-98` is projector ID, `99` broadcasts to all projectors. Set commands use suffix `n` for parameter value. Minimum inter-command delay: 1ms for RS-232 direct, 200ms for Telnet.

RS232 by Telnet limitations: max 50 bytes network payload, max 26 bytes per RS-232 command, min 200ms between commands.

Crestron/IP settings: IP ID 3, Port 5. PJLink Class 1 (v1.00) supported.

Standby modes: Full (both network + RS-232), RS-232 only (network disabled), Network only (RS-232 disabled). No password required for RS-232 control.

<!-- UNRESOLVED: LAN auth/password mechanism not described in RS-232 protocol section -->
<!-- UNRESOLVED: Crestron/AMX/PJLink command syntax not in source -->
<!-- UNRESOLVED: firmware version not stated -->
<!-- UNRESOLVED: events/unsolicited responses not documented -->

## Provenance

```yaml
source_domains:
  - projectorcentral.com
  - cdn.marketing-cloud.io
  - asia.canon
  - usermanual.wiki
  - manua.ls
source_urls:
  - https://www.projectorcentral.com/pdf/projector_manual_9765.pdf
  - https://cdn.marketing-cloud.io/wp-content/canon_rebranding/uploads/2025/03/24155528/XC_Control_Protocol_specification_008.pdf
  - "https://asia.canon/en/support/0302672301?model=LV-X420"
  - https://usermanual.wiki/Canon/lvhd420lvx420umeng.74021124.pdf
  - https://www.manua.ls/canon/lv-hd420/manual
retrieved_at: 2026-05-14T21:18:41.187Z
last_checked_at: 2026-07-21T23:10:46.428Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T23:10:46.428Z
matched_actions: 59
action_count: 59
confidence: medium
summary: "All 59 spec actions matched semantic counterparts in source; additional GET-only source commands represented via feedbacks; transport parameters verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "voltage, current, power consumption specs not in source"
- "no unsolicited notification mechanism described in source"
- "no explicit multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "LAN auth/password mechanism not described in RS-232 protocol section"
- "Crestron/AMX/PJLink command syntax not in source"
- "firmware version not stated"
- "events/unsolicited responses not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
