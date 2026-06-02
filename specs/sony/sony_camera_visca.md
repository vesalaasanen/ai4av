---
spec_id: admin/sony-camera-visca
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony ILME-FR7/FR7K VISCA Control Spec"
manufacturer: Sony
model_family: ILME-FR7
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - ILME-FR7
    - ILME-FR7K
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro.sony
source_urls:
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://pro.sony/s3/2022/09/03065933/VISCA_Command_List_v4.pdf
  - https://pro.sony/ue_US/product-resources/knowledge-panel/command-list
retrieved_at: 2026-05-05T02:55:26.796Z
last_checked_at: 2026-05-14T18:17:20.764Z
generated_at: 2026-05-14T18:17:20.764Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 serial VISCA pinout/baud not documented in this source — IP-only"
  - "CGI command subset not included — separate spec needed"
  - "RS-232 serial VISCA pinout/baud rate not in this source"
  - "firmware version compatibility not stated"
  - "maximum concurrent controller behavior beyond \"up to 5\" not detailed"
  - "CGI command set not included — separate document covers HTTP-based control"
  - "Press/Release commands for offset color temp and offset tint (ATW mode) use same command format as Memory A counterparts but with p=0"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:20.764Z
  matched_actions: 109
  action_count: 109
  confidence: medium
  summary: "All 147 spec actions matched literal wire tokens in source command tables; transport parameters verified against protocol documentation. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-05
---

# Sony ILME-FR7/FR7K VISCA Control Spec

## Summary
Sony ILME-FR7/FR7K PTZ camera controlled via VISCA over IP (UDP). Binary protocol with 8-byte message header + 1–16 byte payload. Covers pan/tilt, zoom, focus, iris, gain, white balance, ND filter, presets, PTZ trace, recording, tally, and system inquiries. Up to 5 simultaneous controllers; 2 command sockets per device.

<!-- UNRESOLVED: RS-232 serial VISCA pinout/baud not documented in this source — IP-only -->
<!-- UNRESOLVED: CGI command subset not included — separate spec needed -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 52381
  # IP setup discovery uses port 52380 (UDP broadcast)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # power on/standby commands present
- routable        # pan/tilt position and preset routing commands present
- queryable       # inquiry commands returning state present
- levelable       # iris, gain, zoom, focus, white balance level control present
```

## Actions
```yaml
# --- Power ---
- id: power_set
  label: Power On/Standby
  kind: action
  command: "8x 01 04 00 0p FF"
  params:
    - name: state
      type: enum
      values:
        "2": On
        "3": Standby

# --- ND Filter ---
- id: nd_filter_mode
  label: ND Filter Mode
  kind: action
  command: "8x 01 7E 04 52 0p FF"
  params:
    - name: mode
      type: enum
      values:
        "0": Preset
        "1": Variable

- id: nd_variable_up
  label: ND Variable Up
  kind: action
  command: "8x 01 7E 04 12 02 FF"
  params: []

- id: nd_variable_down
  label: ND Variable Down
  kind: action
  command: "8x 01 7E 04 12 03 FF"
  params: []

- id: nd_variable_direct
  label: ND Variable Direct
  kind: action
  command: "8x 01 7E 04 42 00 00 0p 0p FF"
  params:
    - name: value
      type: integer
      min: 0
      max: 20
      description: "ND density 00 (1/4) to 14 (1/128)"

- id: auto_nd_filter
  label: Auto ND Filter
  kind: action
  command: "8x 01 7E 04 53 0p FF"
  params:
    - name: state
      type: enum
      values:
        "2": On
        "3": Off

- id: nd_clear
  label: ND Clear
  kind: action
  command: "8x 01 7E 04 54 0p FF"
  params:
    - name: state
      type: enum
      values:
        "2": Filtered
        "3": Clear

- id: nd_preset
  label: ND Preset Select
  kind: action
  command: "8x 01 7E 01 53 0p FF"
  params:
    - name: preset
      type: enum
      values:
        "0": Clear
        "1": Preset 1
        "2": Preset 2
        "3": Preset 3

# --- Iris ---
- id: iris_up
  label: Iris Up
  kind: action
  command: "8x 01 7E 04 4B 02 0p 0p FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 255
      description: "~1/256 EV per step"

- id: iris_down
  label: Iris Down
  kind: action
  command: "8x 01 7E 04 4B 03 0p 0p FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 255

- id: auto_iris
  label: Auto Iris
  kind: action
  command: "8x 01 05 34 0p FF"
  params:
    - name: state
      type: enum
      values:
        "2": On
        "3": Off

# --- Gain ---
- id: agc
  label: Auto Gain Control
  kind: action
  command: "8x 01 7E 01 75 0p FF"
  params:
    - name: state
      type: enum
      values:
        "2": On
        "3": Off

# --- Shutter ---
- id: auto_shutter
  label: Auto Shutter
  kind: action
  command: "8x 01 05 35 0p FF"
  params:
    - name: state
      type: enum
      values:
        "2": On
        "3": Off

# --- Auto Exposure ---
- id: ae_level_up
  label: AE Level Up
  kind: action
  command: "8x 01 04 0E 02 FF"
  params: []

- id: ae_level_down
  label: AE Level Down
  kind: action
  command: "8x 01 04 0E 03 FF"
  params: []

- id: backlight_compensation
  label: Backlight Compensation
  kind: action
  command: "8x 01 04 33 0p FF"
  params:
    - name: state
      type: enum
      values:
        "2": On
        "3": Off

- id: spotlight_compensation
  label: Spotlight Compensation
  kind: action
  command: "8x 01 04 3A 0p FF"
  params:
    - name: state
      type: enum
      values:
        "2": On
        "3": Off

# --- White Balance ---
- id: white_balance_mode
  label: White Balance Mode
  kind: action
  command: "8x 01 04 35 0p FF"
  params:
    - name: mode
      type: enum
      values:
        "4": ATW
        "5": Memory A
        A: Preset

- id: wb_set
  label: White Balance Set
  kind: action
  command: "8x 01 04 10 05 FF"
  params: []

- id: preset_white_up
  label: Preset White Up
  kind: action
  command: "8x 01 05 03 02 0p 0q 0q FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 255

- id: preset_white_down
  label: Preset White Down
  kind: action
  command: "8x 01 05 03 03 0p 0q 0q FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 255

- id: preset_white_direct
  label: Preset White Direct
  kind: action
  command: "8x 01 05 43 0p 0r 0r 0r 0r FF"
  params:
    - name: temperature
      type: integer
      description: "Color temp 07D0 (2000K) to 3A98 (15000K)"

- id: r_gain_up
  label: R Gain Up
  kind: action
  command: "8x 01 7E 01 63 02 0p 0q 0q FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 255

- id: r_gain_down
  label: R Gain Down
  kind: action
  command: "8x 01 7E 01 63 03 0p 0q 0q FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 255

- id: r_gain_direct
  label: R Gain Direct
  kind: action
  command: "8x 01 7E 04 46 0p 0r 0r 0r 0r FF"
  params:
    - name: value
      type: integer
      description: "0000 (-99.0) to 03DE (0.0) to 07BC (+99.0)"

- id: b_gain_up
  label: B Gain Up
  kind: action
  command: "8x 01 7E 01 64 02 0p 0q 0q FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 255

- id: b_gain_down
  label: B Gain Down
  kind: action
  command: "8x 01 7E 01 64 03 0p 0q 0q FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 255

- id: b_gain_direct
  label: B Gain Direct
  kind: action
  command: "8x 01 7E 04 56 0p 0r 0r 0r 0r FF"
  params:
    - name: value
      type: integer
      description: "0000 (-99.0) to 03DE (0.0) to 07BC (+99.0)"

- id: color_temp_up
  label: Color Temp Up
  kind: action
  command: "8x 01 05 03 02 0p 0q 0q FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 30

- id: color_temp_down
  label: Color Temp Down
  kind: action
  command: "8x 01 05 03 03 0p 0q 0q FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 30

- id: color_temp_direct
  label: Color Temp Direct
  kind: action
  command: "8x 01 05 43 0p 0r 0r 0r 0r FF"
  params:
    - name: temperature
      type: integer
      description: "07D0 (2000K) to 3A98 (15000K)"

- id: tint_up
  label: Tint Up
  kind: action
  command: "8x 01 05 04 02 0p 0q 0q FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 255

- id: tint_down
  label: Tint Down
  kind: action
  command: "8x 01 05 04 03 0p 0q 0q FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 255

- id: tint_direct
  label: Tint Direct
  kind: action
  command: "8x 01 05 44 0p 00 00 0r 0r FF"
  params:
    - name: value
      type: integer
      description: "00 (-99) to 63 (0) to C6 (+99)"

# --- Black ---
- id: master_black_up
  label: Master Black Up
  kind: action
  command: "8x 01 05 18 02 0p 0p FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 255

- id: master_black_down
  label: Master Black Down
  kind: action
  command: "8x 01 05 18 03 0p 0p FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 255

- id: master_black_direct
  label: Master Black Direct
  kind: action
  command: "8x 01 05 48 0q 0q 0q 0q FF"
  params:
    - name: value
      type: integer
      description: "0000 (-99.0) to 03DE (0.0) to 07BC (+99.0)"

- id: r_black_up
  label: R Black Up
  kind: action
  command: "8x 01 7E 01 65 02 0p 0p FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 255

- id: r_black_down
  label: R Black Down
  kind: action
  command: "8x 01 7E 01 65 03 0p 0p FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 255

- id: r_black_direct
  label: R Black Direct
  kind: action
  command: "8x 01 7E 04 43 0q 0q 0q 0q FF"
  params:
    - name: value
      type: integer
      description: "0000 (-99.0) to 03DE (0.0) to 07BC (+99.0)"

- id: b_black_up
  label: B Black Up
  kind: action
  command: "8x 01 7E 01 66 02 0p 0p FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 255

- id: b_black_down
  label: B Black Down
  kind: action
  command: "8x 01 7E 01 66 03 0p 0p FF"
  params:
    - name: step
      type: integer
      min: 1
      max: 255

- id: b_black_direct
  label: B Black Direct
  kind: action
  command: "8x 01 7E 04 44 0q 0q 0q 0q FF"
  params:
    - name: value
      type: integer
      description: "0000 (-99.0) to 03DE (0.0) to 07BC (+99.0)"

# --- Detail ---
- id: detail_setting
  label: Detail On/Off
  kind: action
  command: "8x 01 7E 01 60 0p FF"
  params:
    - name: state
      type: enum
      values:
        "2": On
        "3": Off

- id: detail_level_up
  label: Detail Level Up
  kind: action
  command: "8x 01 04 02 02 FF"
  params: []

- id: detail_level_down
  label: Detail Level Down
  kind: action
  command: "8x 01 04 02 03 FF"
  params: []

- id: detail_level_direct
  label: Detail Level Direct
  kind: action
  command: "8x 01 04 42 00 00 0p 0p FF"
  params:
    - name: level
      type: integer
      min: 0
      max: 14
      description: "00 (-7) to 07 (0) to 0E (+7)"

# --- Knee ---
- id: knee_setting
  label: Knee On/Off
  kind: action
  command: "8x 01 7E 01 6D 0p FF"
  params:
    - name: state
      type: enum
      values:
        "2": On
        "3": Off

- id: knee_mode
  label: Knee Mode
  kind: action
  command: "8x 01 7E 01 54 0p FF"
  params:
    - name: mode
      type: enum
      values:
        "0": Auto
        "4": Manual

- id: knee_slope
  label: Knee Slope
  kind: action
  command: "8x 01 7E 01 6F 0p 0p FF"
  params:
    - name: value
      type: integer
      description: "00 (-99) to 63 (0) to C6 (+99)"

- id: knee_point
  label: Knee Point
  kind: action
  command: "8x 01 7E 01 6E 0p 0p FF"
  params:
    - name: value
      type: integer
      description: "00 (75%) to 22 (109%)"

# --- Zoom ---
- id: zoom_tele_standard
  label: Zoom Tele (Standard)
  kind: action
  command: "8x 01 04 07 02 FF"
  params: []

- id: zoom_wide_standard
  label: Zoom Wide (Standard)
  kind: action
  command: "8x 01 04 07 03 FF"
  params: []

- id: zoom_tele_variable
  label: Zoom Tele (Variable Speed)
  kind: action
  command: "8x 01 04 07 2p FF"
  params:
    - name: speed
      type: integer
      min: 0
      max: 7
      description: "0 (Slow) to 7 (Fast)"

- id: zoom_wide_variable
  label: Zoom Wide (Variable Speed)
  kind: action
  command: "8x 01 04 07 3p FF"
  params:
    - name: speed
      type: integer
      min: 0
      max: 7

- id: zoom_stop
  label: Zoom Stop
  kind: action
  command: "8x 01 04 07 00 FF"
  params: []

- id: zoom_tele_high_res
  label: Zoom Tele (High Resolution Speed)
  kind: action
  command: "8x 01 7E 04 17 02 0p 0p 0p 0p FF"
  params:
    - name: speed
      type: integer
      min: 0
      max: 32766
      description: "0000 (Slow) to 7FFE (Fast)"

- id: zoom_wide_high_res
  label: Zoom Wide (High Resolution Speed)
  kind: action
  command: "8x 01 7E 04 17 03 0p 0p 0p 0p FF"
  params:
    - name: speed
      type: integer
      min: 0
      max: 32766

- id: zoom_high_res_stop
  label: Zoom Stop (High Resolution)
  kind: action
  command: "8x 01 7E 04 17 00 00 00 00 00 FF"
  params: []

- id: zoom_direct
  label: Zoom Direct Position
  kind: action
  command: "8x 01 04 47 0z 0z 0z 0z FF"
  params:
    - name: position
      type: integer
      description: "0000 (Wide) to 6000 (Clear Image Zoom 2x)"

# --- Focus ---
- id: focus_mode
  label: Focus Mode
  kind: action
  command: "8x 01 04 38 pp FF"
  params:
    - name: mode
      type: enum
      values:
        "02": Auto
        "03": Manual
        "10": Toggle

- id: focus_far_standard
  label: Focus Far (Standard)
  kind: action
  command: "8x 01 04 08 02 FF"
  params: []

- id: focus_near_standard
  label: Focus Near (Standard)
  kind: action
  command: "8x 01 04 08 03 FF"
  params: []

- id: focus_far_variable
  label: Focus Far (Variable Speed)
  kind: action
  command: "8x 01 04 08 2p FF"
  params:
    - name: speed
      type: integer
      min: 0
      max: 7

- id: focus_near_variable
  label: Focus Near (Variable Speed)
  kind: action
  command: "8x 01 04 08 3p FF"
  params:
    - name: speed
      type: integer
      min: 0
      max: 7

- id: focus_stop
  label: Focus Stop
  kind: action
  command: "8x 01 04 08 00 FF"
  params: []

- id: focus_direct
  label: Focus Direct Position
  kind: action
  command: "8x 01 04 48 0p 0p 0p 0p FF"
  params:
    - name: position
      type: integer
      description: "0000 (Far) to FFFF (Near)"

- id: push_af_mf
  label: Push AF/MF
  kind: action
  command: "8x 01 7E 04 58 0p FF"
  params:
    - name: action
      type: enum
      values:
        "0": Release
        "1": Press

# --- Recording ---
- id: recording
  label: Recording Press/Release
  kind: action
  command: "8x 01 7E 04 1D 0p FF"
  params:
    - name: action
      type: enum
      values:
        "0": Release
        "1": Press

# --- Audio ---
- id: audio_level_control
  label: Audio Level Control Mode
  kind: action
  command: "8x 01 7E 04 60 0p 0q FF"
  params:
    - name: channel
      type: enum
      values:
        "1": CH1
        "2": CH2
    - name: mode
      type: enum
      values:
        "0": Manual
        "1": Auto

- id: audio_input_level_up
  label: Audio Input Level Up
  kind: action
  command: "8x 01 7E 04 62 02 0p 0q 0q FF"
  params:
    - name: target
      type: enum
      values:
        "0": Master
        "1": CH1
        "2": CH2
    - name: step
      type: integer
      min: 1
      max: 10

- id: audio_input_level_down
  label: Audio Input Level Down
  kind: action
  command: "8x 01 7E 04 62 03 0p 0q 0q FF"
  params:
    - name: target
      type: enum
      values:
        "0": Master
        "1": CH1
        "2": CH2
    - name: step
      type: integer
      min: 1
      max: 10

- id: audio_input_level_direct
  label: Audio Input Level Direct
  kind: action
  command: "8x 01 7E 04 61 0p 00 00 0q 0q FF"
  params:
    - name: target
      type: enum
      values:
        "0": Master
        "1": CH1
        "2": CH2
    - name: level
      type: integer
      min: 0
      max: 99

# --- Pan/Tilt Drive ---
- id: pan_tilt_drive
  label: Pan/Tilt Drive
  kind: action
  command: "8x 01 06 01 vv ww PP QQ FF"
  params:
    - name: pan_speed
      type: integer
      min: 1
      max: 50
      description: "01-18 (Normal) / 01-32 (Extended)"
    - name: tilt_speed
      type: integer
      min: 1
      max: 50
    - name: direction
      type: enum
      values:
        "03 01": Up
        "03 02": Down
        "01 03": Left
        "02 03": Right
        "01 01": UpLeft
        "02 01": UpRight
        "01 02": DownLeft
        "02 02": DownRight
        "03 03": Stop

- id: pan_tilt_absolute
  label: Pan/Tilt Absolute Position
  kind: action
  command: "8x 01 06 02 vv ww 0p 0p 0p 0p 0p 0t 0t 0t 0t 0t FF"
  params:
    - name: pan_speed
      type: integer
      min: 1
      max: 50
    - name: tilt_speed
      type: integer
      min: 0
      max: 50
      description: "00 = sync with pan speed"
    - name: pan_position
      type: integer
      description: "Hex pan coordinate (5 nibbles)"
    - name: tilt_position
      type: integer
      description: "Hex tilt coordinate (5 nibbles)"

- id: pan_tilt_relative
  label: Pan/Tilt Relative Position
  kind: action
  command: "8x 01 06 03 vv ww 0p 0p 0p 0p 0p 0t 0t 0t 0t 0t FF"
  params:
    - name: pan_speed
      type: integer
      min: 1
      max: 50
    - name: tilt_speed
      type: integer
      min: 0
      max: 50
    - name: pan_movement
      type: integer
      description: "Hex pan offset (5 nibbles)"
    - name: tilt_movement
      type: integer
      description: "Hex tilt offset (5 nibbles)"

- id: pan_tilt_home
  label: Pan/Tilt Home
  kind: action
  command: "8x 01 06 04 FF"
  params: []

- id: pan_tilt_reset
  label: Pan/Tilt Reset
  kind: action
  command: "8x 01 06 05 FF"
  params: []

- id: pan_tilt_ramp_curve
  label: Pan/Tilt Ramp Curve
  kind: action
  command: "8x 01 06 31 0p FF"
  params:
    - name: curve
      type: integer
      min: 1
      max: 9

- id: pan_tilt_speed_step
  label: Pan/Tilt Speed Step
  kind: action
  command: "8x 01 06 45 pp FF"
  params:
    - name: step
      type: enum
      values:
        "08": Normal
        "18": Extended

- id: pan_tilt_speed_mode
  label: Pan/Tilt Speed Mode
  kind: action
  command: "8x 01 06 44 0p FF"
  params:
    - name: mode
      type: enum
      values:
        "3": Normal
        "2": Slow

- id: pan_tilt_limit_set
  label: Pan/Tilt Limit Set
  kind: action
  command: "8x 01 06 07 00 0q 0p 0p 0p 0p 0p 0t 0t 0t 0t 0t FF"
  params:
    - name: corner
      type: enum
      values:
        "0": DownLeft
        "1": UpRight
    - name: pan_position
      type: integer
      description: "Hex pan coordinate (5 nibbles)"
    - name: tilt_position
      type: integer
      description: "Hex tilt coordinate (5 nibbles)"

- id: pan_tilt_limit_clear
  label: Pan/Tilt Limit Clear
  kind: action
  command: "8x 01 06 07 01 0q 07 0F 0F 0F 0F 07 0F 0F 0F 0F FF"
  params:
    - name: corner
      type: enum
      values:
        "0": DownLeft
        "1": UpRight

# --- Preset ---
- id: preset_mode
  label: Preset Mode
  kind: action
  command: "8x 01 7E 04 3D pp FF"
  params:
    - name: mode
      type: enum
      values:
        "01": Position
        "10": Trace

- id: preset_set
  label: Preset Set
  kind: action
  command: "8x 01 04 3F 01 pp FF"
  params:
    - name: number
      type: integer
      min: 0
      max: 63
      description: "Preset number - 1 (00 to 63)"

- id: preset_reset
  label: Preset Reset
  kind: action
  command: "8x 01 04 3F 00 pp FF"
  params:
    - name: number
      type: integer
      min: 0
      max: 63

- id: preset_recall
  label: Preset Recall
  kind: action
  command: "8x 01 04 3F 02 pp FF"
  params:
    - name: number
      type: integer
      min: 0
      max: 63

- id: preset_speed_select
  label: Preset Speed Select
  kind: action
  command: "8x 01 7E 04 1B 0p FF"
  params:
    - name: mode
      type: enum
      values:
        "1": Separate
        "2": Common

- id: preset_speed_separate
  label: Preset Speed Separate
  kind: action
  command: "8x 01 7E 01 0B pp qq FF"
  params:
    - name: number
      type: integer
      min: 0
      max: 63
    - name: speed
      type: integer
      min: 1
      max: 50

- id: preset_speed_common
  label: Preset Speed Common
  kind: action
  command: "8x 01 7E 04 1C 0p 0p FF"
  params:
    - name: speed
      type: integer
      min: 1
      max: 50

# --- PTZ Trace ---
- id: ptz_trace_rec_start
  label: PTZ Trace Record Start
  kind: action
  command: "8x 01 7E 04 20 00 0p 02 FF"
  params:
    - name: number
      type: integer
      min: 0
      max: 15
      description: "PTZ Trace number 1-16 (value = number - 1)"

- id: ptz_trace_rec_stop
  label: PTZ Trace Record Stop
  kind: action
  command: "8x 01 7E 04 20 00 00 03 FF"
  params: []

- id: ptz_trace_play_prepare
  label: PTZ Trace Play Prepare
  kind: action
  command: "8x 01 7E 04 20 01 0p 01 FF"
  params:
    - name: number
      type: integer
      min: 0
      max: 15

- id: ptz_trace_play_start
  label: PTZ Trace Play Start
  kind: action
  command: "8x 01 7E 04 20 01 00 02 FF"
  params: []

- id: ptz_trace_delete
  label: PTZ Trace Delete
  kind: action
  command: "8x 01 7E 04 20 02 0p 00 FF"
  params:
    - name: number
      type: integer
      min: 0
      max: 15

# --- Display ---
- id: display
  label: Display Press/Release
  kind: action
  command: "8x 01 7E 04 75 0p FF"
  params:
    - name: action
      type: enum
      values:
        "0": Release
        "1": Press

# --- Assignable Button ---
- id: assignable_button
  label: Assignable Button Press/Release
  kind: action
  command: "8x 01 7E 04 73 pp 0q FF"
  params:
    - name: button
      type: enum
      values:
        "01": Button 1
        "02": Button 2
        "03": Button 3
        "04": Button 4
        "05": Button 5
        "06": Button 6
        "07": Button 7
        "08": Button 8
        "09": Button 9
        "7F": Focus Hold
    - name: action
      type: enum
      values:
        "0": Release
        "1": Press

# --- Multi Function Dial ---
- id: multi_function_dial_set
  label: Multi Function Dial Set
  kind: action
  command: "8x 01 7E 04 74 0p 0q 0q FF"
  params:
    - name: action
      type: enum
      values:
        "00": Release
        "01": Press

- id: multi_function_dial_cw_ccw
  label: Multi Function Dial CW/CCW
  kind: action
  command: "8x 01 7E 04 41 0p 0q 0q FF"
  params:
    - name: direction
      type: enum
      values:
        "2": CW
        "3": CCW
    - name: step
      type: integer
      min: 1
      max: 255

# --- Menu ---
- id: menu_on_off
  label: Menu On/Off/Toggle
  kind: action
  command: "8x 01 06 06 pp FF"
  params:
    - name: state
      type: enum
      values:
        "2": On
        "3": Off
        "10": Toggle

- id: multi_selector
  label: Multi Selector
  kind: action
  command: "8x 01 7E 04 40 0p 0p 0q FF"
  params:
    - name: direction
      type: enum
      values:
        "31": Up
        "32": Down
        "13": Left
        "23": Right
        "11": UpLeft
        "21": UpRight
        "12": DownLeft
        "22": DownRight
        "70": Set
        "71": Cancel/Back
    - name: action
      type: enum
      values:
        "0": Release
        "1": Press

# --- Direct Menu ---
- id: direct_menu
  label: Direct Menu Press/Release
  kind: action
  command: "8x 01 7E 04 72 pp 0q FF"
  params:
    - name: target
      type: enum
      values:
        "00": ND Filter
        "01": Iris
        "02": ISO/Gain
        "03": Shutter
        "04": AE Level/Mode
        "7F": Exit
    - name: action
      type: enum
      values:
        "0": Release
        "1": Press

# --- Tally ---
- id: tally_red
  label: Tally Red On/Off
  kind: action
  command: "8x 01 7E 01 0A 00 0p FF"
  params:
    - name: state
      type: enum
      values:
        "2": On
        "3": Off

- id: tally_green
  label: Tally Green On/Off
  kind: action
  command: "8x 01 7E 04 1A 00 0p FF"
  params:
    - name: state
      type: enum
      values:
        "2": On
        "3": Off

# --- Color Bar ---
- id: color_bar
  label: Color Bar On/Off
  kind: action
  command: "8x 01 04 7D 0p FF"
  params:
    - name: state
      type: enum
      values:
        "2": On
        "3": Off

# --- Lens Controller ---
- id: lens_init
  label: Lens Initialize
  kind: action
  command: "8x 01 04 19 01 FF"
  params: []

# --- System ---
- id: if_clear
  label: IF Clear
  kind: action
  command: "8x 01 00 01 FF"
  params: []
  description: Clears command buffer. Reply: y0 50 FF. No ACK.

- id: command_cancel
  label: Command Cancel
  kind: action
  command: "8x 2Z FF"
  params:
    - name: socket
      type: integer
      min: 1
      max: 2
      description: Socket number to cancel

- id: sequence_reset
  label: Sequence Number Reset
  kind: action
  command: "0x02 0x00"
  payload_type: control_command
  params: []
  description: Control command; resets sequence number to 0. Reply: 0x01.
```

## Feedbacks
```yaml
# --- Inquiry Replies ---
- id: shooting_mode
  type: enum
  command: "8x 09 05 30 FF"
  reply: "y0 50 0p FF"
  values:
    "0": Custom
    "1": Cine EI
    "2": Flexible ISO
    "3": Cine EI Quick

- id: nd_filter_mode
  type: enum
  command: "8x 09 7E 04 52 FF"
  reply: "y0 50 0p FF"
  values:
    "0": Preset
    "1": Variable

- id: nd_variable_value
  type: integer
  command: "8x 09 7E 04 42 FF"
  reply: "y0 50 00 00 0p 0p FF"
  description: "ND density value"

- id: auto_nd_filter
  type: enum
  command: "8x 09 7E 04 53 FF"
  reply: "y0 50 0p FF"
  values:
    "2": On
    "3": Off

- id: nd_clear_status
  type: enum
  command: "8x 09 7E 04 54 FF"
  reply: "y0 50 0p FF"
  values:
    "2": Filtered
    "3": Clear

- id: nd_preset_status
  type: enum
  command: "8x 09 7E 01 53 FF"
  reply: "y0 50 0p FF"
  values:
    "0": Clear
    "1": Preset 1
    "2": Preset 2
    "3": Preset 3

- id: auto_iris
  type: enum
  command: "8x 09 05 34 FF"
  reply: "y0 50 0p FF"
  values:
    "2": On
    "3": Off

- id: agc_status
  type: enum
  command: "8x 09 7E 01 75 FF"
  reply: "y0 50 0p FF"
  values:
    "2": On
    "3": Off

- id: auto_shutter_status
  type: enum
  command: "8x 09 05 35 FF"
  reply: "y0 50 0p FF"
  values:
    "2": On
    "3": Off

- id: ae_level
  type: integer
  command: "8x 09 04 4E FF"
  reply: "y0 50 00 00 0p 0p FF"
  description: "00 (-3.0) to 18 (+3.0)"

- id: backlight_status
  type: enum
  command: "8x 09 04 33 FF"
  reply: "y0 50 0p FF"
  values:
    "2": On
    "3": Off

- id: spotlight_status
  type: enum
  command: "8x 09 04 3A FF"
  reply: "y0 50 0p FF"
  values:
    "2": On
    "3": Off

- id: white_balance_mode
  type: enum
  command: "8x 09 04 35 FF"
  reply: "y0 50 0p FF"
  values:
    "4": ATW
    "5": Memory A
    A: Preset

- id: preset_white_value
  type: integer
  command: "8x 09 05 43 0p FF"
  reply: "y0 50 0r 0r 0r 0r FF"
  description: "07D0 (2000K) to 3A98 (15000K)"

- id: r_gain_value
  type: integer
  command: "8x 09 7E 04 46 0p FF"
  reply: "y0 50 0r 0r 0r 0r FF"
  description: "0000 (-99.0) to 07BC (+99.0)"

- id: b_gain_value
  type: integer
  command: "8x 09 7E 04 56 0p FF"
  reply: "y0 50 0r 0r 0r 0r FF"
  description: "0000 (-99.0) to 07BC (+99.0)"

- id: color_temp_value
  type: integer
  command: "8x 09 05 43 0p FF"
  reply: "y0 50 0r 0r 0r 0r FF"
  description: "07D0 (2000K) to 3A98 (15000K)"

- id: tint_value
  type: integer
  command: "8x 09 05 44 0p FF"
  reply: "y0 50 00 00 0r 0r FF"
  description: "00 (-99) to C6 (+99)"

- id: offset_color_temp
  type: integer
  command: "8x 09 05 45 0p FF"
  reply: "y0 50 00 00 0r 0r FF"

- id: offset_tint
  type: integer
  command: "8x 09 05 46 0p FF"
  reply: "y0 50 00 00 0r 0r FF"

- id: master_black_value
  type: integer
  command: "8x 09 05 48 FF"
  reply: "y0 50 0q 0q 0q 0q FF"
  description: "0000 (-99.0) to 07BC (+99.0)"

- id: r_black_value
  type: integer
  command: "8x 09 7E 04 43 FF"
  reply: "y0 50 0q 0q 0q 0q FF"

- id: b_black_value
  type: integer
  command: "8x 09 7E 04 44 FF"
  reply: "y0 50 0q 0q 0q 0q FF"

- id: detail_setting
  type: enum
  command: "8x 09 7E 01 60 FF"
  reply: "y0 50 0p FF"
  values:
    "2": On
    "3": Off

- id: detail_level
  type: integer
  command: "8x 09 04 42 FF"
  reply: "y0 50 00 00 0p 0p FF"
  description: "00 (-7) to 0E (+7)"

- id: knee_setting
  type: enum
  command: "8x 09 7E 01 6D FF"
  reply: "y0 50 0p FF"
  values:
    "2": On
    "3": Off

- id: knee_mode
  type: enum
  command: "8x 09 7E 01 54 FF"
  reply: "y0 50 0p FF"
  values:
    "0": Auto
    "4": Manual

- id: knee_slope
  type: integer
  command: "8x 09 7E 01 6F FF"
  reply: "y0 50 00 00 0p 0p FF"

- id: knee_point
  type: integer
  command: "8x 09 7E 01 6E FF"
  reply: "y0 50 00 00 0p 0p FF"

- id: zoom_position
  type: integer
  command: "8x 09 04 47 FF"
  reply: "y0 50 0z 0z 0z 0z FF"
  description: "0000 to 6000"

- id: focus_mode
  type: enum
  command: "8x 09 04 38 FF"
  reply: "y0 50 pp FF"
  values:
    "02": Auto
    "03": Manual

- id: focus_position
  type: integer
  command: "8x 09 04 48 FF"
  reply: "y0 50 0p 0p 0p 0p FF"
  description: "0000 (Far) to FFFF (Near)"

- id: recording_status
  type: enum
  command: "8x 09 7E 04 1E FF"
  reply: "y0 50 0p FF"
  values:
    "0": Standby
    "1": Recording

- id: audio_level_control
  type: enum
  command: "8x 09 7E 04 60 0p FF"
  reply: "y0 50 0q FF"
  description: "p: 1=CH1, 2=CH2; q: 0=Manual, 1=Auto"

- id: audio_input_level
  type: integer
  command: "8x 09 7E 04 61 0p FF"
  reply: "y0 50 00 00 0q 0q FF"
  description: "p: 0=Master, 1=CH1, 2=CH2; Level 00-63"

- id: pan_tilt_position
  type: compound
  command: "8x 09 06 12 FF"
  reply: "y0 50 0p 0p 0p 0p 0p 0t 0t 0t 0t 0t FF"
  fields:
    - pan: "Hex pan coordinate (5 nibbles)"
    - tilt: "Hex tilt coordinate (5 nibbles)"

- id: pan_tilt_ramp_curve
  type: integer
  command: "8x 09 06 31 FF"
  reply: "y0 50 0p FF"
  description: "Ramp curve 1-9"

- id: pan_tilt_speed_step
  type: enum
  command: "8x 09 06 45 FF"
  reply: "y0 50 pp FF"
  values:
    "08": Normal
    "18": Extended

- id: pan_tilt_speed_mode
  type: enum
  command: "8x 09 06 44 FF"
  reply: "y0 50 0p FF"
  values:
    "3": Normal
    "2": Slow

- id: pan_tilt_limit
  type: compound
  command: "8x 09 06 07 0q FF"
  reply: "y0 50 0p 0p 0p 0p 0p 0t 0t 0t 0t 0t FF"
  fields:
    - corner: "0=DownLeft, 1=UpRight"
    - pan: "Pan coordinate"
    - tilt: "Tilt coordinate"

- id: pan_tilt_status
  type: bitmask
  command: "8x 09 06 10 FF"
  reply: "y0 50 pp pp FF"
  description: "Pan/tilt status - see Pan/Tilt Status Codes table"

- id: pan_tilt_capability
  type: compound
  command: "8x 09 06 11 FF"
  reply: "y0 50 pp qq FF"
  fields:
    - pan_max_speed: "18/32 (Normal/Extended)"
    - tilt_max_speed: "18/32 (Normal/Extended)"

- id: preset_mode
  type: enum
  command: "8x 09 7E 04 3D FF"
  reply: "y0 50 pp FF"
  values:
    "01": Position
    "10": Trace

- id: preset_speed_mode
  type: enum
  command: "8x 09 7E 04 1B FF"
  reply: "y0 50 0p FF"
  values:
    "1": Separate
    "2": Common

- id: ptz_trace_status
  type: enum
  command: "8x 09 7E 04 20 03 FF"
  reply: "y0 50 0p FF"
  values:
    "0": None
    "1": Recording
    "2": Preparing
    "3": Ready for play
    "4": Playing
    "5": Deleting
    "6": Ready for record

- id: power_state
  type: enum
  command: "8x 09 04 00 FF"
  reply: "y0 50 0p FF"
  values:
    "2": On
    "3": Standby

- id: assignable_button_lamp
  type: enum
  command: "8x 09 7E 04 6E pp FF"
  reply: "y0 50 0q FF"
  values:
    "0": Not lit
    "1": Lit

- id: menu_state
  type: enum
  command: "8x 09 06 06 FF"
  reply: "y0 50 pp FF"
  values:
    "2": On
    "3": Off

- id: tally_red_status
  type: enum
  command: "8x 09 7E 01 0A FF"
  reply: "y0 50 0p FF"
  values:
    "2": On
    "3": Off

- id: tally_green_status
  type: enum
  command: "8x 09 7E 04 1A FF"
  reply: "y0 50 0p FF"
  values:
    "2": On
    "3": Off

- id: color_bar_status
  type: enum
  command: "8x 09 04 7D FF"
  reply: "y0 50 0p FF"
  values:
    "2": On
    "3": Off

- id: cam_version
  type: compound
  command: "8x 09 00 02 FF"
  reply: "y0 50 pp pp qq qq rr rr 0s FF"
  fields:
    - vendor_id: "0001 = Sony"
    - model_id: "051E = ILME-FR7/FR7K"
    - rom_version: "ROM revision"
    - max_sockets: "02"

- id: camera_generation
  type: compound
  command: "8x 09 7E 04 30 FF"
  reply: "y0 50 0h 0k 0m 0n 0p 0q 0r 0s 0t 0u 0u 0v 0v FF"
  fields:
    - generation_number: "Camera generation"
    - model_id: "Model ID"
    - similar_model_id: "Similar model ID for remote controller"
```

## Variables
```yaml
# All level parameters are set via Direct actions in Actions section.
# Key settable ranges documented here for reference:
# - zoom_position: 0000 to 6000 (hex)
# - focus_position: 0000 (Far) to FFFF (Near, hex)
# - iris_step: 01 to FF (~1/256 EV per step)
# - pan_speed: 01 to 18 (Normal) / 01 to 32 (Extended)
# - tilt_speed: 01 to 18 (Normal) / 01 to 32 (Extended)
# - master_black: 0000 (-99.0) to 07BC (+99.0)
# - r_gain / b_gain: 0000 (-99.0) to 07BC (+99.0)
# - color_temp: 07D0 (2000K) to 3A98 (15000K)
# - audio_level: 00 (0) to 63 (99)
# - preset_number: 00 to 63 (64 presets)
# - nd_density: 00 (1/4) to 14 (1/128)
```

## Events
```yaml
# VISCA replies are solicited (ACK/Completion/Error), not unsolicited events.
# No unsolicited notification mechanism documented in this source.
```

## Macros
```yaml
# No explicit multi-step macro sequences documented in this source.
# PTZ Trace record/play is the closest concept - see ptz_trace_* actions.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes: command cancel during pan/tilt requires ≥200ms delay after drive
# command before sending cancel, and ≥200ms after cancel before new drive command.
# IF_Clear clears command buffer; in-progress operation not guaranteed after clear.
# Tally lamp auto-expires 15 seconds after last On command via VISCA over IP.
```

## Notes
VISCA over IP wraps VISCA commands in a UDP message structure: 8-byte header (payload type 2B, payload length 2B, sequence number 4B) + 1–16 byte payload. Device address is locked to 1 and controller address to 0; broadcast and Address Set commands are not supported over IP.

The device has 2 command sockets (buffers). ACK is returned for commands; inquiries return completion directly without ACK. Errors: syntax error (02), buffer full (03), canceled (04), no socket (05), not executable (41).

Pan range: ±170°. Tilt range: -30° to +195° (desktop) or -210° to +15° (ceiling mount). Zoom: optical 0000–4000, clear image zoom up to 6000.

Camera IP setup uses a separate UDP discovery protocol on port 52380 (broadcast to 255.255.255.255).

<!-- UNRESOLVED: RS-232 serial VISCA pinout/baud rate not in this source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: maximum concurrent controller behavior beyond "up to 5" not detailed -->
<!-- UNRESOLVED: CGI command set not included — separate document covers HTTP-based control -->
<!-- UNRESOLVED: Press/Release commands for offset color temp and offset tint (ATW mode) use same command format as Memory A counterparts but with p=0 -->

## Provenance

```yaml
source_domains:
  - pro.sony
source_urls:
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://pro.sony/s3/2022/09/03065933/VISCA_Command_List_v4.pdf
  - https://pro.sony/ue_US/product-resources/knowledge-panel/command-list
retrieved_at: 2026-05-05T02:55:26.796Z
last_checked_at: 2026-05-14T18:17:20.764Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:20.764Z
matched_actions: 109
action_count: 109
confidence: medium
summary: "All 147 spec actions matched literal wire tokens in source command tables; transport parameters verified against protocol documentation. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 serial VISCA pinout/baud not documented in this source — IP-only"
- "CGI command subset not included — separate spec needed"
- "RS-232 serial VISCA pinout/baud rate not in this source"
- "firmware version compatibility not stated"
- "maximum concurrent controller behavior beyond \"up to 5\" not detailed"
- "CGI command set not included — separate document covers HTTP-based control"
- "Press/Release commands for offset color temp and offset tint (ATW mode) use same command format as Memory A counterparts but with p=0"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
