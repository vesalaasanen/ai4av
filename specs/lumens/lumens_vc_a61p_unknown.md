---
spec_id: admin/lumens-vc-a61p
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens VC-A61P Control Spec"
manufacturer: Lumens
model_family: VC-A61P
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - VC-A61P
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS127%20-%20VC-A61P%20RS-232%20command%20set_1_4.pdf"
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
retrieved_at: 2026-05-13T06:36:00.965Z
last_checked_at: 2026-10-07T20:53:36.407Z
generated_at: 2026-10-07T20:53:36.407Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no stated firmware version range for command applicability"
  - "VISCA over IP does not support broadcast commands (stated in source)"
  - "no multi-step macro sequences described in source"
  - "source does not describe power-on sequencing or safety interlock procedures"
  - "firmware version compatibility ranges not stated"
  - "no power-on sequencing requirements described"
  - "Pelco-D transport details (serial vs IP, baud rate, parity) not specified in this document"
  - "exact VISCA over IP payload header byte layout referenced as Pic.3 but not fully reproduced in text"
verification:
  verdict: verified
  checked_at: 2026-10-07T20:53:36.407Z
  matched_actions: 316
  action_count: 316
  confidence: medium
  summary: "All 316 spec units match source VISCA and Pelco-D entries with correct shapes, serial and UDP 52381 transport is supported, and the source catalogue is essentially fully covered. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Lumens VC-A61P Control Spec

## Summary

Lumens VC-A61P PTZ camera with VISCA RS-232 serial control, VISCA over IP (UDP), and Pelco-D protocol support. Spec covers pan/tilt/zoom, focus, exposure, white balance, presets, audio, tally, network configuration, and image settings. VISCA uses binary packet framing with hex command bytes; Pelco-D uses its own binary framing with checksum.

<!-- UNRESOLVED: no stated firmware version range for command applicability -->
<!-- UNRESOLVED: VISCA over IP does not support broadcast commands (stated in source) -->

## Transport

```yaml
protocols:
  - serial
  - udp
serial:
  baud_rate: 9600  # also supports 38400; configurable via CAM_UART_Baud_Rate command
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED
addressing:
  port: 52381  # UDP port for VISCA over IP
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits

```yaml
traits:
  - powerable    # CAM_Power on/off commands
  - queryable    # extensive inquiry command set
  - levelable    # zoom speed, focus speed, gain, volume, brightness, aperture control
  - ptz          # pan-tilt-zoom with absolute/relative positioning and presets
```

## Actions

```yaml
actions:
  - id: cam_power_on
    label: Power On
    kind: action
    params: []
    visca: "8x 01 04 00 02 FF"

  - id: cam_power_off
    label: Power Off (Standby)
    kind: action
    params: []
    visca: "8x 01 04 00 03 FF"

  - id: cam_zoom_stop
    label: Zoom Stop
    kind: action
    params: []
    visca: "8x 01 04 07 00 FF"

  - id: cam_zoom_tele_standard
    label: Zoom Tele (Standard)
    kind: action
    params: []
    visca: "8x 01 04 07 02 FF"

  - id: cam_zoom_wide_standard
    label: Zoom Wide (Standard)
    kind: action
    params: []
    visca: "8x 01 04 07 03 FF"

  - id: cam_zoom_tele_step
    label: Zoom Tele Step
    kind: action
    params: []
    visca: "8x 01 04 07 04 FF"

  - id: cam_zoom_wide_step
    label: Zoom Wide Step
    kind: action
    params: []
    visca: "8x 01 04 07 05 FF"

  - id: cam_zoom_tele_variable
    label: Zoom Tele (Variable Speed)
    kind: action
    params:
      - name: speed
        type: integer
        min: 0
        max: 7
        description: "0=Low, 7=High"
    visca: "8x 01 04 07 2p FF"

  - id: cam_zoom_wide_variable
    label: Zoom Wide (Variable Speed)
    kind: action
    params:
      - name: speed
        type: integer
        min: 0
        max: 7
        description: "0=Low, 7=High"
    visca: "8x 01 04 07 3p FF"

  - id: cam_zoom_direct
    label: Zoom Direct Position
    kind: action
    params:
      - name: position
        type: integer
        min: 0
        max: 16384
        description: "Zoom position 0x0000-0x4000 hex"
    visca: "8x 01 04 47 0p 0q 0r 0s FF"

  - id: cam_zoom_direct_speed
    label: Zoom Direct Position with Speed
    kind: action
    params:
      - name: position
        type: integer
        min: 0
        max: 16384
        description: "Zoom position 0x0000-0x4000 hex"
      - name: speed
        type: integer
        min: 0
        max: 7
        description: "0=Low, 7=High"
    visca: "8x 01 04 47 0p 0q 0r 0s 0t FF"

  - id: cam_zoom_memory_mode_on
    label: Zoom Memory Mode On
    kind: action
    params: []
    visca: "8x 01 04 47 00 02 FF"

  - id: cam_zoom_memory_mode_off
    label: Zoom Memory Mode Off
    kind: action
    params: []
    visca: "8x 01 04 47 00 03 FF"

  - id: cam_focus_stop
    label: Focus Stop
    kind: action
    params: []
    visca: "8x 01 04 08 00 FF"

  - id: cam_focus_far_standard
    label: Focus Far (Standard)
    kind: action
    params: []
    visca: "8x 01 04 08 02 FF"

  - id: cam_focus_near_standard
    label: Focus Near (Standard)
    kind: action
    params: []
    visca: "8x 01 04 08 03 FF"

  - id: cam_focus_far_step
    label: Focus Far Step
    kind: action
    params: []
    visca: "8x 01 04 08 04 FF"

  - id: cam_focus_near_step
    label: Focus Near Step
    kind: action
    params: []
    visca: "8x 01 04 08 05 FF"

  - id: cam_focus_far_variable
    label: Focus Far (Variable Speed)
    kind: action
    params:
      - name: speed
        type: integer
        min: 0
        max: 7
        description: "0=Low, 7=High"
    visca: "8x 01 04 08 2p FF"

  - id: cam_focus_near_variable
    label: Focus Near (Variable Speed)
    kind: action
    params:
      - name: speed
        type: integer
        min: 0
        max: 7
        description: "0=Low, 7=High"
    visca: "8x 01 04 08 3p FF"

  - id: cam_focus_direct
    label: Focus Direct Position
    kind: action
    params:
      - name: position
        type: integer
        min: 0
        max: 1146
        description: "Focus position 0x000-0x47A hex"
    visca: "8x 01 04 48 0p 0q 0r 0s FF"

  - id: cam_auto_focus_on
    label: Auto Focus On
    kind: action
    params: []
    visca: "8x 01 04 38 02 FF"

  - id: cam_manual_focus
    label: Manual Focus
    kind: action
    params: []
    visca: "8x 01 04 38 03 FF"

  - id: cam_focus_one_push_trigger
    label: One Push AF Trigger
    kind: action
    params: []
    visca: "8x 01 04 18 01 FF"

  - id: cam_zoom_focus_direct
    label: Zoom+Focus Direct with Speed
    kind: action
    params:
      - name: zoom_position
        type: integer
        min: 0
        max: 16384
        description: "Zoom position 0x0000-0x4000"
      - name: focus_position
        type: integer
        min: 0
        max: 1146
        description: "Focus position 0x0000-0x047A"
      - name: speed
        type: integer
        min: 0
        max: 7
        description: "0=Low, 7=High"
    visca: "8x 01 04 47 0p 0q 0r 0s 0t 0u 0v 0w 0x FF"

  - id: cam_curve_tracking
    label: Curve Tracking On
    kind: action
    params: []
    visca: "8x 01 04 38 03 02 FF"

  - id: cam_zoom_tracking
    label: Zoom Tracking On
    kind: action
    params: []
    visca: "8x 01 04 38 03 03 FF"

  - id: af_sensitivity
    label: Set AF Sensitivity
    kind: action
    params:
      - name: level
        type: enum
        values: [high, middle, low]
    visca_map:
      high: "8x 01 04 58 01 FF"
      middle: "8x 01 04 58 02 FF"
      low: "8x 01 04 58 03 FF"

  - id: af_frame
    label: Set AF Frame
    kind: action
    params:
      - name: mode
        type: enum
        values: [auto, full_frame, center]
    visca_map:
      auto: "8x 01 04 5C 01 FF"
      full_frame: "8x 01 04 5C 02 FF"
      center: "8x 01 04 5C 03 FF"

  - id: cam_initialize_lens
    label: Lens Initialization
    kind: action
    params: []
    visca: "8x 01 04 19 01 FF"

  - id: resolution_setting
    label: Select Resolution
    kind: action
    params:
      - name: resolution
        type: enum
        values:
          - QFHD_4K_2997p
          - QFHD_4K_25p
          - FHD_1080P_5994p
          - FHD_1080P_50p
          - FHD_1080P_2997p
          - FHD_1080P_25p
          - HD_720P_5994p
          - HD_720P_50p
          - HD_720P_2997p
          - HD_720P_25p
    visca_map:
      QFHD_4K_2997p: "8x 01 06 35 05 00 FF"
      QFHD_4K_25p: "8x 01 06 35 06 00 FF"
      FHD_1080P_5994p: "8x 01 06 35 08 00 FF"
      FHD_1080P_50p: "8x 01 06 35 09 00 FF"
      FHD_1080P_2997p: "8x 01 06 35 0B 00 FF"
      FHD_1080P_25p: "8x 01 06 35 0C 00 FF"
      HD_720P_5994p: "8x 01 06 35 0E 00 FF"
      HD_720P_50p: "8x 01 06 35 0F 00 FF"
      HD_720P_2997p: "8x 01 06 35 11 00 FF"
      HD_720P_25p: "8x 01 06 35 12 00 FF"

  - id: hdmi_output_range
    label: HDMI Output Range
    kind: action
    params:
      - name: range
        type: enum
        values: ["16_235", "1_254"]
    visca_map:
      "16_235": "8x 01 06 37 01 FF"
      "1_254": "8x 01 06 37 02 FF"

  - id: cam_wb
    label: White Balance Mode
    kind: action
    params:
      - name: mode
        type: enum
        values: [auto, indoor, outdoor, one_push, atw, manual, sodium_lamp]
    visca_map:
      auto: "8x 01 04 35 00 FF"
      indoor: "8x 01 04 35 01 FF"
      outdoor: "8x 01 04 35 02 FF"
      one_push: "8x 01 04 35 03 FF"
      atw: "8x 01 04 35 04 FF"
      manual: "8x 01 04 35 05 FF"
      sodium_lamp: "8x 01 04 35 0C FF"

  - id: cam_wb_one_push_trigger
    label: One Push WB Trigger
    kind: action
    params: []
    visca: "8x 01 04 10 05 FF"

  - id: cam_wb_rgain_reset
    label: R Gain Reset
    kind: action
    params: []
    visca: "8x 01 04 03 00 FF"

  - id: cam_wb_rgain_up
    label: R Gain Up
    kind: action
    params: []
    visca: "8x 01 04 03 02 FF"

  - id: cam_wb_rgain_down
    label: R Gain Down
    kind: action
    params: []
    visca: "8x 01 04 03 03 FF"

  - id: cam_wb_rgain_direct
    label: R Gain Direct
    kind: action
    params:
      - name: gain
        type: integer
        min: 0
        max: 128
        description: "R gain 0x00-0x80 hex"
    visca: "8x 01 04 43 00 00 0p 0q FF"

  - id: cam_wb_bgain_reset
    label: B Gain Reset
    kind: action
    params: []
    visca: "8x 01 04 04 00 FF"

  - id: cam_wb_bgain_up
    label: B Gain Up
    kind: action
    params: []
    visca: "8x 01 04 04 02 FF"

  - id: cam_wb_bgain_down
    label: B Gain Down
    kind: action
    params: []
    visca: "8x 01 04 04 03 FF"

  - id: cam_wb_bgain_direct
    label: B Gain Direct
    kind: action
    params:
      - name: gain
        type: integer
        min: 0
        max: 128
        description: "B gain 0x00-0x80 hex"
    visca: "8x 01 04 44 00 00 0p 0q FF"

  - id: cam_ae_full_auto
    label: AE Full Auto
    kind: action
    params: []
    visca: "8x 01 04 39 00 FF"

  - id: cam_ae_manual
    label: AE Manual
    kind: action
    params: []
    visca: "8x 01 04 39 03 FF"

  - id: cam_ae_shutter_priority
    label: AE Shutter Priority
    kind: action
    params: []
    visca: "8x 01 04 39 0A FF"

  - id: cam_ae_iris_priority
    label: AE Iris Priority
    kind: action
    params: []
    visca: "8x 01 04 39 0B FF"

  - id: cam_flickerless
    label: Flickerless Mode
    kind: action
    params:
      - name: mode
        type: enum
        values: [off, "50hz", "60hz"]
    visca_map:
      off: "8x 01 04 3C 00 FF"
      "50hz": "8x 01 04 3C 01 FF"
      "60hz": "8x 01 04 3C 02 FF"

  - id: cam_shutter_reset
    label: Shutter Reset
    kind: action
    params: []
    visca: "8x 01 04 0A 00 FF"

  - id: cam_shutter_up
    label: Shutter Up
    kind: action
    params: []
    visca: "8x 01 04 0A 02 FF"

  - id: cam_shutter_down
    label: Shutter Down
    kind: action
    params: []
    visca: "8x 01 04 0A 03 FF"

  - id: cam_shutter_direct
    label: Shutter Direct
    kind: action
    params:
      - name: position
        type: integer
        min: 0
        max: 21
        description: "Shutter position 0x00-0x15"
    visca: "8x 01 04 4A 00 00 0p 0q FF"

  - id: cam_iris_reset
    label: Iris Reset
    kind: action
    params: []
    visca: "8x 01 04 0B 00 FF"

  - id: cam_iris_up
    label: Iris Up
    kind: action
    params: []
    visca: "8x 01 04 0B 02 FF"

  - id: cam_iris_down
    label: Iris Down
    kind: action
    params: []
    visca: "8x 01 04 0B 03 FF"

  - id: cam_iris_direct
    label: Iris Direct
    kind: action
    params:
      - name: position
        type: integer
        min: 0
        max: 15
        description: "Iris position 0x00-0x0F"
    visca: "8x 01 04 4B 00 00 0p 0q FF"

  - id: cam_iris_limit_min
    label: Iris Limit Minimum
    kind: action
    params:
      - name: f_number
        type: integer
        min: 3
        max: 10
    visca: "8x 01 04 2B 0p FF"

  - id: cam_iris_limit_max
    label: Iris Limit Maximum
    kind: action
    params:
      - name: f_number
        type: integer
        min: 3
        max: 10
    visca: "8x 01 04 2A 0p FF"

  - id: cam_illegal_iris_open_on
    label: Illegal Iris Open On
    kind: action
    params: []
    visca: "8x 01 04 2F 02 FF"

  - id: cam_illegal_iris_open_off
    label: Illegal Iris Open Off
    kind: action
    params: []
    visca: "8x 01 04 2F 03 FF"

  - id: cam_gain_reset
    label: Gain Reset
    kind: action
    params: []
    visca: "8x 01 04 0C 00 FF"

  - id: cam_gain_up
    label: Gain Up
    kind: action
    params: []
    visca: "8x 01 04 0C 02 FF"

  - id: cam_gain_down
    label: Gain Down
    kind: action
    params: []
    visca: "8x 01 04 0C 03 FF"

  - id: cam_gain_direct
    label: Gain Direct
    kind: action
    params:
      - name: position
        type: integer
        min: 0
        max: 15
        description: "Gain position 0x00-0x0F (0dB to +45dB)"
    visca: "8x 01 04 4C 00 00 0p 0q FF"

  - id: cam_gain_limit
    label: Gain Limit
    kind: action
    params:
      - name: position
        type: integer
        min: 3
        max: 15
        description: "Gain limit position 0x03-0x0F"
    visca: "8x 01 04 2C 0p FF"

  - id: cam_bright_reset
    label: Bright Reset
    kind: action
    params: []
    visca: "8x 01 04 0D 00 FF"

  - id: cam_bright_up
    label: Bright Up
    kind: action
    params: []
    visca: "8x 01 04 0D 02 FF"

  - id: cam_bright_down
    label: Bright Down
    kind: action
    params: []
    visca: "8x 01 04 0D 03 FF"

  - id: cam_bright_direct
    label: Bright Direct
    kind: action
    params:
      - name: position
        type: integer
        min: 0
        max: 15
        description: "Bright position 0x00-0x0F"
    visca: "8x 01 04 4D 00 00 0p 0q FF"

  - id: cam_expcomp_on
    label: Exposure Compensation On
    kind: action
    params: []
    visca: "8x 01 04 3E 02 FF"

  - id: cam_expcomp_off
    label: Exposure Compensation Off
    kind: action
    params: []
    visca: "8x 01 04 3E 03 FF"

  - id: cam_expcomp_reset
    label: ExpComp Reset
    kind: action
    params: []
    visca: "8x 01 04 0E 00 FF"

  - id: cam_expcomp_up
    label: ExpComp Up
    kind: action
    params: []
    visca: "8x 01 04 0E 02 FF"

  - id: cam_expcomp_down
    label: ExpComp Down
    kind: action
    params: []
    visca: "8x 01 04 0E 03 FF"

  - id: cam_expcomp_direct
    label: ExpComp Direct
    kind: action
    params:
      - name: position
        type: integer
        min: 0
        max: 10
        description: "ExpComp position 0x00-0x0A"
    visca: "8x 01 04 4E 00 00 0p 0q FF"

  - id: cam_backlight_on
    label: Backlight Compensation On
    kind: action
    params: []
    visca: "8x 01 04 33 02 FF"

  - id: cam_backlight_off
    label: Backlight Compensation Off
    kind: action
    params: []
    visca: "8x 01 04 33 03 FF"

  - id: cam_spot_ae_on
    label: Spot AE On
    kind: action
    params: []
    visca: "8x 01 04 59 02 FF"

  - id: cam_spot_ae_off
    label: Spot AE Off
    kind: action
    params: []
    visca: "8x 01 04 59 03 FF"

  - id: cam_spot_ae_position
    label: Spot AE Position
    kind: action
    params:
      - name: x
        type: integer
        min: 0
        max: 6
        description: "X-axis, center=3"
      - name: y
        type: integer
        min: 0
        max: 4
        description: "Y-axis, center=2"
    visca: "8x 01 04 29 0p 0q 0r 0s FF"

  - id: cam_aperture_reset
    label: Aperture (Sharpness) Reset
    kind: action
    params: []
    visca: "8x 01 04 02 00 FF"

  - id: cam_aperture_up
    label: Aperture Up
    kind: action
    params: []
    visca: "8x 01 04 02 02 FF"

  - id: cam_aperture_down
    label: Aperture Down
    kind: action
    params: []
    visca: "8x 01 04 02 03 FF"

  - id: cam_aperture_direct
    label: Aperture Direct
    kind: action
    params:
      - name: gain
        type: integer
        min: 0
        max: 14
        description: "Aperture gain 0x00-0x0E"
    visca: "8x 01 04 42 00 00 0p 0q FF"

  - id: cam_2dnr
    label: Set 2DNR Level
    kind: action
    params:
      - name: level
        type: integer
        min: 0
        max: 3
        description: "NR level 0-3"
    visca: "8x 01 04 53 0p FF"

  - id: cam_3dnr
    label: Set 3DNR Level
    kind: action
    params:
      - name: level
        type: enum
        values: [off, low, type, max]
    visca_map:
      off: "8x 01 04 54 00 FF"
      low: "8x 01 04 54 01 FF"
      type: "8x 01 04 54 02 FF"
      max: "8x 01 04 54 03 FF"

  - id: cam_gamma
    label: Gamma Setting
    kind: action
    params:
      - name: value
        type: integer
        min: 0
        max: 3
    visca: "8x 01 04 5B 0p FF"

  - id: cam_lr_reverse_on
    label: Mirror Image On
    kind: action
    params: []
    visca: "8x 01 04 61 02 FF"

  - id: cam_lr_reverse_off
    label: Mirror Image Off
    kind: action
    params: []
    visca: "8x 01 04 61 03 FF"

  - id: cam_picture_effect
    label: Picture Effect
    kind: action
    params:
      - name: effect
        type: enum
        values: [off, neg_art, bw]
    visca_map:
      off: "8x 01 04 63 00 FF"
      neg_art: "8x 01 04 63 02 FF"
      bw: "8x 01 04 63 04 FF"

  - id: cam_picture_flip_on
    label: Picture Flip On
    kind: action
    params: []
    visca: "8x 01 04 66 02 FF"

  - id: cam_picture_flip_off
    label: Picture Flip Off
    kind: action
    params: []
    visca: "8x 01 04 66 03 FF"

  - id: cam_rotation_on
    label: Rotation 180 On (Mirror+Flip)
    kind: action
    params: []
    visca: "8x 01 04 67 02 FF"

  - id: cam_rotation_off
    label: Rotation 180 Off
    kind: action
    params: []
    visca: "8x 01 04 67 03 FF"

  - id: cam_icr_on
    label: ICR On
    kind: action
    params: []
    visca: "8x 01 04 01 02 FF"

  - id: cam_icr_off
    label: ICR Off
    kind: action
    params: []
    visca: "8x 01 04 01 03 FF"

  - id: cam_auto_icr_on
    label: Auto ICR On
    kind: action
    params: []
    visca: "8x 01 04 51 02 FF"

  - id: cam_auto_icr_off
    label: Auto ICR Off
    kind: action
    params: []
    visca: "8x 01 04 51 03 FF"

  - id: cam_auto_icr_threshold
    label: Auto ICR Threshold
    kind: action
    params:
      - name: level
        type: integer
        min: 0
        max: 255
        description: "Threshold level 0x00-0xFF"
    visca: "8x 01 04 21 00 00 0p 0q FF"

  - id: cam_preset_reset
    label: Preset Reset
    kind: action
    params:
      - name: number
        type: integer
        min: 0
        max: 255
        description: "Preset number 0-127 (bank 0) or 128-255 (bank 1)"
    visca_bank0: "8x 01 04 3F 00 pp FF"
    visca_bank1: "8x 01 04 3F 10 pp FF"

  - id: cam_preset_set
    label: Preset Set
    kind: action
    params:
      - name: number
        type: integer
        min: 0
        max: 255
    visca_bank0: "8x 01 04 3F 01 pp FF"
    visca_bank1: "8x 01 04 3F 11 pp FF"

  - id: cam_preset_recall
    label: Preset Recall
    kind: action
    params:
      - name: number
        type: integer
        min: 0
        max: 255
    visca_bank0: "8x 01 04 3F 02 pp FF"
    visca_bank1: "8x 01 04 3F 12 pp FF"

  - id: cam_mute_on
    label: Mute On
    kind: action
    params: []
    visca: "8x 01 04 75 02 FF"

  - id: cam_mute_off
    label: Mute Off
    kind: action
    params: []
    visca: "8x 01 04 75 03 FF"

  - id: cam_mute_toggle
    label: Mute Toggle
    kind: action
    params: []
    visca: "8x 01 04 75 10 FF"

  - id: cam_color_gain
    label: Color Gain (Saturation)
    kind: action
    params:
      - name: gain
        type: integer
        min: 0
        max: 15
        description: "Color gain 0x00-0x0F"
    visca: "8x 01 04 49 00 00 0p 0q FF"

  - id: ir_receive_on
    label: IR Receive On
    kind: action
    params: []
    visca: "8x 01 06 08 02 FF"

  - id: ir_receive_off
    label: IR Receive Off
    kind: action
    params: []
    visca: "8x 01 06 08 03 FF"

  - id: ir_receive_toggle
    label: IR Receive Toggle
    kind: action
    params: []
    visca: "8x 01 06 08 10 FF"

  - id: pan_tilt_up
    label: Pan-Tilt Up
    kind: action
    params:
      - name: pan_speed
        type: integer
        min: 1
        max: 24
        description: "Pan speed 0x01-0x18"
      - name: tilt_speed
        type: integer
        min: 1
        max: 24
        description: "Tilt speed 0x01-0x18"
    visca: "8x 01 06 01 VV WW 03 01 FF"

  - id: pan_tilt_down
    label: Pan-Tilt Down
    kind: action
    params:
      - name: pan_speed
        type: integer
        min: 1
        max: 24
      - name: tilt_speed
        type: integer
        min: 1
        max: 24
    visca: "8x 01 06 01 VV WW 03 02 FF"

  - id: pan_tilt_left
    label: Pan-Tilt Left
    kind: action
    params:
      - name: pan_speed
        type: integer
        min: 1
        max: 24
      - name: tilt_speed
        type: integer
        min: 1
        max: 24
    visca: "8x 01 06 01 VV WW 01 03 FF"

  - id: pan_tilt_right
    label: Pan-Tilt Right
    kind: action
    params:
      - name: pan_speed
        type: integer
        min: 1
        max: 24
      - name: tilt_speed
        type: integer
        min: 1
        max: 24
    visca: "8x 01 06 01 VV WW 02 03 FF"

  - id: pan_tilt_upleft
    label: Pan-Tilt Up-Left
    kind: action
    params:
      - name: pan_speed
        type: integer
        min: 1
        max: 24
      - name: tilt_speed
        type: integer
        min: 1
        max: 24
    visca: "8x 01 06 01 VV WW 01 01 FF"

  - id: pan_tilt_upright
    label: Pan-Tilt Up-Right
    kind: action
    params:
      - name: pan_speed
        type: integer
        min: 1
        max: 24
      - name: tilt_speed
        type: integer
        min: 1
        max: 24
    visca: "8x 01 06 01 VV WW 02 01 FF"

  - id: pan_tilt_downleft
    label: Pan-Tilt Down-Left
    kind: action
    params:
      - name: pan_speed
        type: integer
        min: 1
        max: 24
      - name: tilt_speed
        type: integer
        min: 1
        max: 24
    visca: "8x 01 06 01 VV WW 01 02 FF"

  - id: pan_tilt_downright
    label: Pan-Tilt Down-Right
    kind: action
    params:
      - name: pan_speed
        type: integer
        min: 1
        max: 24
      - name: tilt_speed
        type: integer
        min: 1
        max: 24
    visca: "8x 01 06 01 VV WW 02 02 FF"

  - id: pan_tilt_stop
    label: Pan-Tilt Stop
    kind: action
    params:
      - name: pan_speed
        type: integer
        min: 1
        max: 24
      - name: tilt_speed
        type: integer
        min: 1
        max: 24
    visca: "8x 01 06 01 VV WW 03 03 FF"

  - id: pan_tilt_absolute_position
    label: Pan-Tilt Absolute Position
    kind: action
    params:
      - name: pan_speed
        type: integer
        min: 1
        max: 24
      - name: tilt_speed
        type: integer
        min: 1
        max: 24
      - name: pan_position
        type: integer
        description: "Pan position 0x0000-0x6A40 & 0x95C0-0xFFFF, center=0000"
      - name: tilt_position
        type: integer
        description: "Tilt position 0x0000-0x3840 & 0xED40-0xFFFF, center=0000"
    visca: "8x 01 06 02 VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"

  - id: pan_tilt_relative_position
    label: Pan-Tilt Relative Position
    kind: action
    params:
      - name: pan_speed
        type: integer
        min: 1
        max: 24
      - name: tilt_speed
        type: integer
        min: 1
        max: 24
      - name: pan_offset
        type: integer
      - name: tilt_offset
        type: integer
    visca: "8x 01 06 03 VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"

  - id: pan_tilt_home
    label: Pan-Tilt Home
    kind: action
    params: []
    visca: "8x 01 06 04 FF"

  - id: pan_tilt_reset
    label: Pan-Tilt Reset
    kind: action
    params: []
    visca: "8x 01 06 05 FF"

  - id: pan_tilt_limit_set
    label: Pan-Tilt Limit Set
    kind: action
    params:
      - name: corner
        type: enum
        values: [upright, downleft]
      - name: pan_position
        type: integer
      - name: tilt_position
        type: integer
    visca: "8x 01 06 07 00 0W 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"

  - id: pan_tilt_limit_clear
    label: Pan-Tilt Limit Clear
    kind: action
    params:
      - name: corner
        type: enum
        values: [right_up, left_down]
    visca: "8x 01 06 07 01 0W 07 0F 0F 0F 07 0F 0F 0F FF"

  - id: factory_reset
    label: Factory Reset
    kind: action
    params: []
    visca: "8x 01 04 3F 03 00 FF"

  - id: cam_image_mode_default
    label: Image Mode Default
    kind: action
    params: []
    visca: "8x 01 04 3F 04 00 FF"

  - id: cam_image_mode_custom
    label: Image Mode Custom
    kind: action
    params: []
    visca: "8x 01 04 3F 04 01 FF"

  - id: cam_image_load
    label: Image Mode Load
    kind: action
    params:
      - name: mode
        type: integer
        description: "0=default, 1=custom"
    visca: "8x 01 04 3F 05 0p FF"

  - id: cam_prompt_on
    label: OSD Prompt On
    kind: action
    params: []
    visca: "8x 01 04 07 00 02 FF"

  - id: cam_prompt_off
    label: OSD Prompt Off
    kind: action
    params: []
    visca: "8x 01 04 07 00 03 FF"

  - id: sys_menu_on
    label: Menu On
    kind: action
    params: []
    visca: "8x 01 06 06 02 FF"

  - id: sys_menu_off
    label: Menu Off
    kind: action
    params: []
    visca: "8x 01 06 06 03 FF"

  - id: sys_menu_toggle
    label: Menu Toggle
    kind: action
    params: []
    visca: "8x 01 06 06 10 FF"

  - id: sys_menu_enter
    label: Menu Enter
    kind: action
    params: []
    visca: "8x 01 7E 01 02 00 01 FF"

  - id: sys_menu_up
    label: Menu Up
    kind: action
    params: []
    visca: "8x 01 06 01 01 01 03 01 FF"

  - id: sys_menu_down
    label: Menu Down
    kind: action
    params: []
    visca: "8x 01 06 01 01 01 03 02 FF"

  - id: sys_menu_left
    label: Menu Left
    kind: action
    params: []
    visca: "8x 01 06 01 01 01 01 03 FF"

  - id: sys_menu_right
    label: Menu Right
    kind: action
    params: []
    visca: "8x 01 06 01 01 01 02 03 FF"

  - id: tally_mode
    label: Set Tally Mode
    kind: action
    params:
      - name: mode
        type: integer
        min: 0
        max: 7
        description: "0=Off, 4=Red Low, 5=Red High, 6=Green High, 7=Red+Green High"
    visca: "8x 01 7E 01 0A 01 0p FF"

  - id: tally_lamp_on
    label: Tally Lamp On
    kind: action
    params: []
    visca: "8x 01 7E 01 0A 00 02 FF"

  - id: tally_lamp_off
    label: Tally Lamp Off
    kind: action
    params: []
    visca: "8x 01 7E 01 0A 00 03 FF"

  - id: osd_cross_line_on
    label: OSD Cross Line On
    kind: action
    params: []
    visca: "8x 01 04 75 DD 04 02 FF"

  - id: osd_cross_line_off
    label: OSD Cross Line Off
    kind: action
    params: []
    visca: "8x 01 04 75 DD 04 03 FF"

  - id: ip_dhcp_on
    label: DHCP On
    kind: action
    params: []
    visca: "8x 01 7C 01 02 FF"

  - id: ip_dhcp_off
    label: DHCP Off
    kind: action
    params: []
    visca: "8x 01 7C 01 03 FF"

  - id: ip_address_set
    label: Set IP Address
    kind: action
    params:
      - name: address
        type: string
        description: "IPv4 address, e.g. 192.168.100.150"
    visca: "8x 01 7C 02 0p 0q 0r 0s 0t 0u 0v 0x FF"

  - id: ip_netmask_set
    label: Set Netmask
    kind: action
    params:
      - name: address
        type: string
        description: "IPv4 netmask"
    visca: "8x 01 7C 03 0p 0q 0r 0s 0t 0u 0v 0x FF"

  - id: ip_gateway_set
    label: Set Gateway
    kind: action
    params:
      - name: address
        type: string
        description: "IPv4 gateway"
    visca: "8x 01 7C 04 0p 0q 0r 0s 0t 0u 0v 0x FF"

  - id: ip_dns_set
    label: Set DNS
    kind: action
    params:
      - name: address
        type: string
        description: "IPv4 DNS"
    visca: "8x 01 7C 05 0p 0q 0r 0s 0t 0u 0v 0x FF"

  - id: cam_audio_on
    label: Audio On
    kind: action
    params: []
    visca: "8x 01 04 68 02 FF"

  - id: cam_audio_off
    label: Audio Off
    kind: action
    params: []
    visca: "8x 01 04 68 03 FF"

  - id: cam_audio_in_type
    label: Audio Input Type
    kind: action
    params:
      - name: type
        type: enum
        values: [line_in, mic_in]
    visca_map:
      line_in: "8x 01 04 6B 02 FF"
      mic_in: "8x 01 04 6B 03 FF"

  - id: cam_audio_volume
    label: Audio Volume
    kind: action
    params:
      - name: level
        type: integer
        min: 0
        max: 10
        description: "Volume 0x00-0x0A"
    visca: "8x 01 04 6E 0p FF"

  - id: cam_uart_baud_rate
    label: Set UART Baud Rate
    kind: action
    params:
      - name: rate
        type: enum
        values: ["9600", "38400"]
    visca_map:
      "9600": "8x 01 04 24 00 00 00 FF"
      "38400": "8x 01 04 24 00 00 01 FF"

  - id: cam_audio_encode_sample_rate
    label: Audio Encode Sample Rate
    kind: action
    params:
      - name: rate
        type: enum
        values: [aac_48khz, aac_44_1khz, aac_16khz, g711_16khz, g711_8khz]
    visca_map:
      aac_48khz: "8x 01 04 6D 00 FF"
      aac_44_1khz: "8x 01 04 6D 01 FF"
      aac_16khz: "8x 01 04 6D 02 FF"
      g711_16khz: "8x 01 04 6D 03 FF"
      g711_8khz: "8x 01 04 6D 04 FF"

  - id: cam_audio_delay_enable
    label: Audio Delay Enable
    kind: action
    params:
      - name: state
        type: enum
        values: [on, off]
    visca_map:
      on: "8x 01 04 6F 02 FF"
      off: "8x 01 04 6F 03 FF"

  - id: cam_audio_delay_time
    label: Audio Delay Time
    kind: action
    params:
      - name: time_ms
        type: integer
        min: 1
        max: 500
        description: "Delay time 1-500ms (0x001-0x1F4 hex)"
    visca: "8x 01 04 6A 0p 0q 0r FF"

  - id: cam_preset_af_on
    label: Preset AF On
    kind: action
    params: []
    visca: "8x 01 04 5E 02 FF"

  - id: cam_preset_af_off
    label: Preset AF Off
    kind: action
    params: []
    visca: "8x 01 04 5E 03 FF"

  - id: cam_dzoom_limit
    label: Digital Zoom Limit
    kind: action
    params:
      - name: multiplier
        type: integer
        min: 0
        max: 11
        description: "0=x1, 11=x12"
    visca: "8x 01 04 26 0p FF"

  - id: cam_smart_af_on
    label: Smart AF (Face Detection) On
    kind: action
    params: []
    visca: "8x 01 7E 01 01 02 FF"

  - id: cam_smart_af_off
    label: Smart AF (Face Detection) Off
    kind: action
    params: []
    visca: "8x 01 7E 01 01 03 FF"

  - id: cam_pt_standby_mode
    label: PT Standby Mode
    kind: action
    params:
      - name: mode
        type: enum
        values: [normal, ceiling]
    visca_map:
      normal: "8x 01 7E 01 0A 03 02 FF"
      ceiling: "8x 01 7E 01 0A 03 03 FF"

  - id: if_clear
    label: Interface Clear
    kind: action
    params: []
    visca: "8x 01 00 01 FF"

  - id: command_cancel
    label: Command Cancel
    kind: action
    params:
      - name: socket
        type: integer
        min: 1
        max: 2
        description: "Socket number"
    visca: "8x 2p FF"

  - id: address_set
    label: Address Set (Broadcast)
    kind: action
    params: []
    visca: "88 30 01 FF"

  - id: cam_color_hue
    label: Color Hue Direct
    kind: action
    params:
      - name: hue
        type: integer
        min: 0
        max: 15
        description: "Color hue 0x00-0x0F"
    visca: "8x 01 04 4F 00 00 0p 0q FF"

  - id: if_clear_broadcast
    label: Interface Clear (Broadcast)
    kind: action
    params: []
    visca: "88 01 00 01 FF"

  - id: cam_focus_toggle
    label: Auto/Manual Focus Toggle
    kind: action
    params: []
    visca: "8x 01 04 38 10 FF"

  - id: af_frame_cycle
    label: AF Frame Cycle
    kind: action
    params: []
    visca: "8x 01 04 5C 10 FF"

  - id: cam_model_id_set
    label: Set Camera Model ID
    kind: action
    params:
      - name: vendor_id
        type: integer
        min: UNRESOLVED
        max: UNRESOLVED
        description: "ppqq: Vender ID (0001: Sony)"
      - name: model_id
        type: integer
        min: UNRESOLVED
        max: UNRESOLVED
        description: "rrss:Model ID(0513: SRG-300H)"
    visca: "8x 01 04 23 pp qq rr ss FF"

  - id: pelco_d_right
    label: Pelco-D Right
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x02"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x02", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_left
    label: Pelco-D Left
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x04"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x04", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_up
    label: Pelco-D Up
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x08"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x08", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_down
    label: Pelco-D Down
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x10"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x10", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_right_up
    label: Pelco-D Right Up
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x0A"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x0A", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_left_up
    label: Pelco-D Left Up
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x0C"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x0C", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_right_down
    label: Pelco-D Right Down
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x12"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x12", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_left_down
    label: Pelco-D Left Down
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x14"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x14", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_zoom_tele_down
    label: Pelco-D Zoom Tele Down
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x30"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x30", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_zoom_tele_up
    label: Pelco-D Zoom Tele Up
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x28"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x28", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_zoom_tele_left
    label: Pelco-D Zoom Tele Left
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x24"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x24", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_zoom_tele_right
    label: Pelco-D Zoom Tele Right
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x22"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x22", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_zoom_tele_up_left
    label: Pelco-D Zoom Tele Up-Left
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x2C"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x2C", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_zoom_tele_up_right
    label: Pelco-D Zoom Tele Up-Right
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x2A"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x2A", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_zoom_tele_down_left
    label: Pelco-D Zoom Tele Down-Left
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x34"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x34", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_zoom_tele_down_right
    label: Pelco-D Zoom Tele Down-Right
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x32"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x32", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_zoom_wide_down
    label: Pelco-D Zoom Wide Down
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x50"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x50", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_zoom_wide_up
    label: Pelco-D Zoom Wide Up
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x48"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x48", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_zoom_wide_left
    label: Pelco-D Zoom Wide Left
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x44"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x44", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_zoom_wide_right
    label: Pelco-D Zoom Wide Right
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x42"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x42", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_zoom_wide_up_left
    label: Pelco-D Zoom Wide Up-Left
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x4C"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x4C", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_zoom_wide_up_right
    label: Pelco-D Zoom Wide Up-Right
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x4A"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x4A", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_zoom_wide_down_left
    label: Pelco-D Zoom Wide Down-Left
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x54"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x54", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_zoom_wide_down_right
    label: Pelco-D Zoom Wide Down-Right
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x52"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x52", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_focus_far_down
    label: Pelco-D Focus Far Down
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x90"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x90", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_focus_far_up
    label: Pelco-D Focus Far Up
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x88"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x88", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_focus_far_left
    label: Pelco-D Focus Far Left
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x84"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x84", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_focus_far_right
    label: Pelco-D Focus Far Right
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x82"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x82", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_focus_far_up_left
    label: Pelco-D Focus Far Up-Left
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x8C"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x8C", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_focus_far_up_right
    label: Pelco-D Focus Far Up-Right
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x8A"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x8A", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_focus_far_down_left
    label: Pelco-D Focus Far Down-Left
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x94"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x94", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_focus_far_down_right
    label: Pelco-D Focus Far Down-Right
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x92"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x92", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_focus_near_down
    label: Pelco-D Focus Near Down
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x10"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x01", "0x10", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_focus_near_up
    label: Pelco-D Focus Near Up
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x08"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x01", "0x08", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_focus_near_left
    label: Pelco-D Focus Near Left
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x04"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x01", "0x04", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_focus_near_right
    label: Pelco-D Focus Near Right
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x02"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x01", "0x02", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_focus_near_up_left
    label: Pelco-D Focus Near Up-Left
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x0C"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x01", "0x0C", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_focus_near_up_right
    label: Pelco-D Focus Near Up-Right
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x0A"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x01", "0x0A", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_focus_near_down_left
    label: Pelco-D Focus Near Down-Left
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x14"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x01", "0x14", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_focus_near_down_right
    label: Pelco-D Focus Near Down-Right
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: tilt_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "VV  : Tilt speed 0x01 (low speed) to 0x18 (high speed)"
      - name: pan_speed
        type: integer
        min: 0x01
        max: 0x18
        description: "WW : Pan speed 0x01 (low speed) to 0x18 (high speed)"
    opcode: "0x12"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x01", "0x12", "0xVV", "0xWW", "CheckSum"]

  - id: pelco_d_stop
    label: Pelco-D Stop
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
    opcode: "0x00"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x00", "0x00", "0x00", "CheckSum"]
    description: "Stop Pan/Tilt & Zoom/Focus"

  - id: pelco_d_zoom_tele
    label: Pelco-D Zoom Tele
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
    opcode: "0x20"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x20", "0x00", "0x00", "CheckSum"]
    description: "Speed = VISCA Tele (Variable) = 0x03"

  - id: pelco_d_zoom_wide
    label: Pelco-D Zoom Wide
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
    opcode: "0x40"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x40", "0x00", "0x00", "CheckSum"]
    description: "Speed = VISCA Wide (Variable) = 0x03"

  - id: pelco_d_focus_far
    label: Pelco-D Focus Far
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
    opcode: "0x80"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x80", "0x00", "0x00", "CheckSum"]
    description: "Speed = VISCA Far (Variable) = 0x02"

  - id: pelco_d_focus_near
    label: Pelco-D Focus Near
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
    opcode: "0x00"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x01", "0x00", "0x00", "0x00", "CheckSum"]
    description: "Speed = VISCA Near (Variable) = 0x02"

  - id: pelco_d_preset_set
    label: Pelco-D Preset Set
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: number
        type: integer
        min: 0x00
        max: 0xFF
        description: "Memory Number( pq:0x00 To 0xFF)"
    opcode: "0x03"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x03", "0x00", "0xpq", "CheckSum"]

  - id: pelco_d_preset_clear
    label: Pelco-D Preset Clear
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: number
        type: integer
        min: 0x00
        max: 0xFF
        description: "Memory Number( pq:0x00 To 0xFF)"
    opcode: "0x05"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x05", "0x00", "0xpq", "CheckSum"]

  - id: pelco_d_preset_goto
    label: Pelco-D Preset Goto
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: number
        type: integer
        min: 0x00
        max: 0xFF
        description: "Memory Number( pq:0x00 To 0xFF)"
    opcode: "0x07"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x07", "0x00", "0xpq", "CheckSum"]

  - id: pelco_d_power
    label: Pelco-D Power
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: state
        type: enum
        values: ["On", "Off"]
        description: "On:0x01; Off: 0x02"
    opcode: "0x45"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x45", "0x00", "On:0x01<br>Off: 0x02", "CheckSum"]

  - id: pelco_d_menu
    label: Pelco-D Menu
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: state
        type: enum
        values: ["On", "Off"]
        description: "On:0x01; Off: 0x02"
    opcode: "0x47"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x47", "0x00", "On:0x01<br>Off: 0x02", "CheckSum"]

  - id: pelco_d_menu_enter
    label: Pelco-D Menu Enter
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
    opcode: "0x49"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x49", "0x00", "0x00", "CheckSum"]

  - id: pelco_d_backlight
    label: Pelco-D Backlight
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: state
        type: enum
        values: ["On", "Off"]
        description: "On:0x01; Off: 0x02"
    opcode: "0x31"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x31", "0x00", "On:0x01<br>Off: 0x02", "CheckSum"]
    description: "Back Light Compensation ON/OFF; (* Enabled during AE Full Auto Mode)"

  - id: pelco_d_mirror
    label: Pelco-D Mirror And Flip
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: mode
        type: enum
        values: ["Normal", "Mirror", "Flip", "Mirror+Flip"]
        description: "0x01:Normal; 0x02:Mirror; 0x03:Flip; 0x04:Mirror+Flip"
    opcode: "0x4B"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x4B", "0x00", "0x01:Normal<br>0x02:Mirror<br>0x03:Flip<br>0x04:Mirror+Flip", "CheckSum"]

  - id: pelco_d_freeze
    label: Pelco-D Freeze
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: state
        type: enum
        values: ["On", "Off"]
        description: "On:0x01; Off: 0x02"
    opcode: "0x4D"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x4D", "0x00", "On:0x01<br>Off: 0x02", "CheckSum"]

  - id: pelco_d_focus_mode
    label: Pelco-D Focus Mode
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
      - name: mode
        type: enum
        values: ["AF", "MF"]
        description: "AF:0x01; MF: 0x02"
    opcode: "0x2B"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x2B", "0x00", "AF:0x01<br>MF: 0x02", "CheckSum"]

  - id: pelco_d_bright_up
    label: Pelco-D Bright Control Up
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
    opcode: "0xA1"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0xA1", "0x00", "0x00", "CheckSum"]

  - id: pelco_d_bright_down
    label: Pelco-D Bright Control Down
    kind: action
    params:
      - name: address
        type: integer
        min: 0x00
        max: 0xFF
        description: "0x00 ~ 0xFF"
    opcode: "0xA3"
    packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0xA3", "0x00", "0x00", "CheckSum"]
```

## Feedbacks

```yaml
feedbacks:
  - id: cam_power_inq
    label: Power State
    type: enum
    values: [on, off]
    visca: "8x 09 04 00 FF"
    response_on: "y0 50 02 FF"
    response_off: "y0 50 03 FF"
    query_command: "8x 09 04 00 FF"

  - id: cam_system_status_inq
    label: System Status
    type: enum
    values: [ready, processing]
    visca: "8x 09 04 00 01 FF"
    query_command: "8x 09 04 00 01 FF"

  - id: cam_optical_zoom_pos_inq
    label: Zoom Position
    type: integer
    min: 0
    max: 16384
    visca: "8x 09 04 47 FF"
    query_command: "8x 09 04 47 FF"

  - id: cam_zoom_memory_mode_inq
    label: Zoom Memory Mode
    type: enum
    values: [on]
    visca: "8x 09 04 47 00 FF"
    query_command: "8x 09 04 47 00 FF"

  - id: cam_focus_mode_inq
    label: Focus Mode
    type: enum
    values: [auto, manual]
    visca: "8x 09 04 38 FF"
    query_command: "8x 09 04 38 FF"

  - id: cam_focus_pos_inq
    label: Focus Position
    type: integer
    min: 0
    max: 1146
    visca: "8x 09 04 48 FF"
    query_command: "8x 09 04 48 FF"

  - id: cam_curve_mode_inq
    label: Curve/Zoom Tracking Mode
    type: enum
    values: [curve_tracking, zoom_tracking]
    visca: "8x 09 04 38 03 FF"
    query_command: "8x 09 04 38 03 FF"

  - id: af_sensitivity_inq
    label: AF Sensitivity
    type: enum
    values: [high, middle, low]
    visca: "8x 09 04 58 FF"
    query_command: "8x 09 04 58 FF"

  - id: af_frame_inq
    label: AF Frame
    type: enum
    values: [auto, full_frame, center]
    visca: "8x 09 04 5C FF"
    query_command: "8x 09 04 5C FF"

  - id: resolution_setting_inq
    label: Resolution Setting
    type: enum
    values:
      - QFHD_4K_2997p
      - QFHD_4K_25p
      - FHD_1080P_5994p
      - FHD_1080P_50p
      - FHD_1080P_2997p
      - FHD_1080P_25p
      - HD_720P_5994p
      - HD_720P_50p
      - HD_720P_2997p
      - HD_720P_25p
    visca: "8x 09 06 23 FF"
    query_command: "8x 09 06 23 FF"

  - id: cam_hdmi_output_range_inq
    label: HDMI Output Range
    type: enum
    values: ["16_235", "1_254"]
    visca: "8x 09 06 37 FF"
    query_command: "8x 09 06 37 FF"

  - id: cam_wb_mode_inq
    label: White Balance Mode
    type: enum
    values: [auto, indoor, outdoor, one_push, atw, manual, sodium_lamp]
    visca: "8x 09 04 35 FF"
    query_command: "8x 09 04 35 FF"

  - id: cam_r_gain_inq
    label: R Gain
    type: integer
    min: 0
    max: 128
    visca: "8x 09 04 43 FF"
    query_command: "8x 09 04 43 FF"

  - id: cam_b_gain_inq
    label: B Gain
    type: integer
    min: 0
    max: 128
    visca: "8x 09 04 44 FF"
    query_command: "8x 09 04 44 FF"

  - id: cam_ae_mode_inq
    label: AE Mode
    type: enum
    values: [full_auto, manual, shutter_priority, iris_priority]
    visca: "8x 09 04 39 FF"
    query_command: "8x 09 04 39 FF"

  - id: cam_flickerless_inq
    label: Flickerless Mode
    type: enum
    values: [off, "50hz", "60hz"]
    visca: "8x 09 04 3C FF"
    query_command: "8x 09 04 3C FF"

  - id: cam_shutter_pos_inq
    label: Shutter Position
    type: integer
    min: 0
    max: 21
    visca: "8x 09 04 4A FF"
    query_command: "8x 09 04 4A FF"

  - id: cam_iris_pos_inq
    label: Iris Position
    type: integer
    min: 0
    max: 15
    visca: "8x 09 04 4B FF"
    query_command: "8x 09 04 4B FF"

  - id: cam_gain_pos_inq
    label: Gain Position
    type: integer
    min: 0
    max: 15
    visca: "8x 09 04 4C FF"
    query_command: "8x 09 04 4C FF"

  - id: cam_iris_limit_min_inq
    label: Iris Limit Minimum
    type: integer
    min: 3
    max: 10
    visca: "8x 09 04 2B FF"
    query_command: "8x 09 04 2B FF"

  - id: cam_iris_limit_max_inq
    label: Iris Limit Maximum
    type: integer
    min: 3
    max: 10
    visca: "8x 09 04 2A FF"
    query_command: "8x 09 04 2A FF"

  - id: cam_illegal_iris_open_inq
    label: Illegal Iris Open
    type: enum
    values: [on, off]
    visca: "8x 09 04 2F FF"
    query_command: "8x 09 04 2F FF"

  - id: cam_gain_limit_inq
    label: Gain Limit
    type: integer
    min: 3
    max: 15
    visca: "8x 09 04 2C FF"
    query_command: "8x 09 04 2C FF"

  - id: cam_bright_pos_inq
    label: Bright Position
    type: integer
    min: 0
    max: 15
    visca: "8x 09 04 4D FF"
    query_command: "8x 09 04 4D FF"

  - id: cam_expcomp_mode_inq
    label: Exposure Compensation Mode
    type: enum
    values: [on, off]
    visca: "8x 09 04 3E FF"
    query_command: "8x 09 04 3E FF"

  - id: cam_expcomp_pos_inq
    label: ExpComp Position
    type: integer
    min: 0
    max: 10
    visca: "8x 09 04 4E FF"
    query_command: "8x 09 04 4E FF"

  - id: cam_backlight_mode_inq
    label: Backlight Mode
    type: enum
    values: [on, off]
    visca: "8x 09 04 33 FF"
    query_command: "8x 09 04 33 FF"

  - id: cam_spot_ae_mode_inq
    label: Spot AE Mode
    type: enum
    values: [on, off]
    visca: "8x 09 04 59 FF"
    query_command: "8x 09 04 59 FF"

  - id: cam_spot_ae_pos_inq
    label: Spot AE Position
    type: object
    description: "Returns X (0-6) and Y (0-4) axes"
    visca: "8x 09 04 29 FF"
    query_command: "8x 09 04 29 FF"

  - id: cam_aperture_inq
    label: Aperture Gain
    type: integer
    min: 0
    max: 14
    visca: "8x 09 04 42 FF"
    query_command: "8x 09 04 42 FF"

  - id: cam_2dnr_mode_inq
    label: 2DNR Level
    type: integer
    min: 0
    max: 3
    visca: "8x 09 04 53 FF"
    query_command: "8x 09 04 53 FF"

  - id: cam_3dnr_mode_inq
    label: 3DNR Level
    type: enum
    values: [off, low, type, max]
    visca: "8x 09 04 54 FF"
    query_command: "8x 09 04 54 FF"

  - id: cam_gamma_inq
    label: Gamma Setting
    type: integer
    min: 0
    max: 3
    visca: "8x 09 04 5B FF"
    query_command: "8x 09 04 5B FF"

  - id: cam_lr_reverse_mode_inq
    label: Mirror Mode
    type: enum
    values: [on, off]
    visca: "8x 09 04 61 FF"
    query_command: "8x 09 04 61 FF"

  - id: cam_picture_effect_mode_inq
    label: Picture Effect
    type: enum
    values: [off, neg_art, bw]
    visca: "8x 09 04 63 FF"
    query_command: "8x 09 04 63 FF"

  - id: cam_picture_flip_mode_inq
    label: Picture Flip
    type: enum
    values: [on, off]
    visca: "8x 09 04 66 FF"
    query_command: "8x 09 04 66 FF"

  - id: cam_rotation_mode_inq
    label: Rotation 180
    type: enum
    values: [on, off]
    visca: "8x 09 04 67 FF"
    query_command: "8x 09 04 67 FF"

  - id: cam_icr_inq
    label: ICR State
    type: enum
    values: [on, off]
    visca: "8x 09 04 01 FF"
    query_command: "8x 09 04 01 FF"

  - id: cam_mute_mode_inq
    label: Mute State
    type: enum
    values: [on, off]
    visca: "8x 09 04 75 FF"
    query_command: "8x 09 04 75 FF"

  - id: cam_version_inq
    label: Camera Version
    type: string
    visca: "8x 09 00 02 FF"
    description: "Returns vendor ID, model ID, ROM revision, max socket"
    query_command: "8x 09 00 02 FF"

  - id: cam_fw_version_inq_boot
    label: FW Version Boot
    type: string
    visca: "8x 09 00 02 00 00 FF"
    query_command: "8x 09 00 02 00 00 FF"

  - id: cam_fw_version_inq_cm0
    label: FW Version CM0
    type: string
    visca: "8x 09 00 02 00 01 FF"
    query_command: "8x 09 00 02 00 01 FF"

  - id: cam_fw_version_inq_rtos
    label: FW Version RTOS
    type: string
    visca: "8x 09 00 02 00 02 FF"
    query_command: "8x 09 00 02 00 02 FF"

  - id: cam_fw_version_inq_linux
    label: FW Version Linux
    type: string
    visca: "8x 09 00 02 00 03 FF"
    query_command: "8x 09 00 02 00 03 FF"

  - id: cam_fw_version_inq_mcu
    label: FW Version MCU
    type: string
    visca: "8x 09 00 02 00 04 FF"
    query_command: "8x 09 00 02 00 04 FF"

  - id: cam_fw_version_inq_iq
    label: FW Version IQ
    type: string
    visca: "8x 09 00 02 00 05 FF"
    query_command: "8x 09 00 02 00 05 FF"

  - id: cam_fw_version_inq_ctrl_bd
    label: FW Version CTRL_BD
    type: string
    visca: "8x 09 00 02 00 06 FF"
    query_command: "8x 09 00 02 00 06 FF"

  - id: cam_fw_version_inq_cpld
    label: FW Version CPLD
    type: string
    visca: "8x 09 00 02 00 07 FF"
    query_command: "8x 09 00 02 00 07 FF"

  - id: sys_menu_mode_inq
    label: Menu State
    type: enum
    values: [on, off]
    visca: "8x 09 06 06 FF"
    query_command: "8x 09 06 06 FF"

  - id: ir_receive_inq
    label: IR Receive State
    type: enum
    values: [on, off]
    visca: "8x 09 06 08 FF"
    query_command: "8x 09 06 08 FF"

  - id: pan_tilt_pos_inq
    label: Pan-Tilt Position
    type: object
    description: "Returns pan (0x0000-0x6A40 & 0x95C0-0xFFFF) and tilt (0x0000-0x3840 & 0xED40-0xFFFF) positions, center=0000"
    visca: "8x 09 06 12 FF"
    query_command: "8x 09 06 12 FF"

  - id: cam_image_mode_inq
    label: Image Mode
    type: enum
    values: [default, custom]
    visca: "8x 09 04 3F 04 FF"
    query_command: "8x 09 04 3F 04 FF"

  - id: prompt_inq
    label: OSD Prompt State
    type: enum
    values: [on, off]
    visca: "8x 09 04 07 00 FF"
    query_command: "8x 09 04 07 00 FF"

  - id: cam_serial_inq
    label: Camera Serial Number
    type: string
    visca: "8x 09 02 18 FF"
    query_command: "8x 09 02 18 FF"

  - id: mac_address_read
    label: MAC Address
    type: string
    visca: "8x 09 04 78 FF"
    query_command: "8x 09 04 78 FF"

  - id: tally_mode_inq
    label: Tally Mode
    type: integer
    min: 0
    max: 7
    visca: "8x 09 7E 01 0A 01 FF"
    query_command: "8x 09 7E 01 0A 01 FF"

  - id: tally_lamp_inq
    label: Tally Lamp State
    type: enum
    values: [enabled, disabled]
    visca: "8x 09 7E 01 0A 00 FF"
    query_command: "8x 09 7E 01 0A 00 FF"

  - id: cam_id_inq
    label: Camera ID
    type: string
    visca: "8x 09 7E CE FF"
    query_command: "8x 09 7E CE FF"

  - id: cam_color_gain_inq
    label: Color Gain
    type: integer
    min: 0
    max: 15
    visca: "8x 09 04 49 FF"
    query_command: "8x 09 04 49 FF"

  - id: cam_color_hue_inq
    label: Color Hue
    type: integer
    min: 0
    max: 15
    visca: "8x 09 04 4F FF"
    query_command: "8x 09 04 4F FF"

  - id: ip_dhcp_inq
    label: DHCP State
    type: enum
    values: [on, off]
    visca: "8x 09 7C 01 FF"
    query_command: "8x 09 7C 01 FF"

  - id: ip_address_inq
    label: IP Address
    type: string
    visca: "8x 09 7C 02 FF"
    query_command: "8x 09 7C 02 FF"

  - id: ip_netmask_inq
    label: Netmask
    type: string
    visca: "8x 09 7C 03 FF"
    query_command: "8x 09 7C 03 FF"

  - id: ip_gateway_inq
    label: Gateway
    type: string
    visca: "8x 09 7C 04 FF"
    query_command: "8x 09 7C 04 FF"

  - id: ip_dns_inq
    label: DNS
    type: string
    visca: "8x 09 7C 05 FF"
    query_command: "8x 09 7C 05 FF"

  - id: cam_audio_on_off_inq
    label: Audio State
    type: enum
    values: [on, off]
    visca: "8x 09 04 68 FF"
    query_command: "8x 09 04 68 FF"

  - id: cam_audio_in_type_inq
    label: Audio Input Type
    type: enum
    values: [line_in, mic_in]
    visca: "8x 09 04 6B FF"
    query_command: "8x 09 04 6B FF"

  - id: cam_audio_encode_type_inq
    label: Audio Encode Type
    type: enum
    values: [aac, g711]
    visca: "8x 09 04 6C FF"
    query_command: "8x 09 04 6C FF"

  - id: cam_audio_volume_inq
    label: Audio Volume
    type: integer
    min: 0
    max: 10
    visca: "8x 09 04 6E FF"
    query_command: "8x 09 04 6E FF"

  - id: cam_uart_baud_rate_inq
    label: UART Baud Rate
    type: enum
    values: ["9600", "38400", "115200"]
    visca: "8x 09 04 24 00 FF"
    query_command: "8x 09 04 24 00 FF"

  - id: cam_audio_sample_rate_inq
    label: Audio Sample Rate
    type: enum
    values: [aac_48khz, aac_44_1khz, aac_16khz, g711_16khz, g711_8khz]
    visca: "8x 09 04 6D FF"
    query_command: "8x 09 04 6D FF"

  - id: cam_audio_delay_on_off_inq
    label: Audio Delay State
    type: enum
    values: [on, off]
    visca: "8x 09 04 6F FF"
    query_command: "8x 09 04 6F FF"

  - id: cam_audio_delay_time_inq
    label: Audio Delay Time
    type: integer
    min: 1
    max: 500
    visca: "8x 09 04 6A FF"
    query_command: "8x 09 04 6A FF"

  - id: cam_preset_af_inq
    label: Preset AF State
    type: enum
    values: [on, off]
    visca: "8x 09 04 5E FF"
    query_command: "8x 09 04 5E FF"

  - id: cam_smart_af_inq
    label: Smart AF (Face Detection) State
    type: enum
    values: [on, off]
    visca: "8x 09 7E 01 01 FF"
    query_command: "8x 09 7E 01 01 FF"

  - id: block_inquiry_lens
    label: Lens Control Block Inquiry
    type: object
    visca: "8x 09 7E 7E 00 FF"
    query_command: "8x 09 7E 7E 00 FF"

  - id: block_inquiry_camera
    label: Camera Control Block Inquiry
    type: object
    visca: "8x 09 7E 7E 01 FF"
    query_command: "8x 09 7E 7E 01 FF"

  - id: block_inquiry_other
    label: Other Block Inquiry
    type: object
    visca: "8x 09 7E 7E 02 FF"
    query_command: "8x 09 7E 7E 02 FF"

  - id: block_inquiry_extended_1
    label: Extended 1 Block Inquiry
    type: object
    visca: "8x 09 7E 7E 03 FF"
    query_command: "8x 09 7E 7E 03 FF"

  - id: block_inquiry_extended_2
    label: Extended 2 Block Inquiry
    type: object
    visca: "8x 09 7E 7E 04 FF"
    query_command: "8x 09 7E 7E 04 FF"

  - id: block_inquiry_extended_3
    label: Extended 3 Block Inquiry
    type: object
    visca: "8x 09 7E 7E 05 FF"
    query_command: "8x 09 7E 7E 05 FF"

  - id: pelco_d_pan_position_inq
    label: Pelco-D Pan Position
    type: integer
    description: "pqrz: Pan  Position 0x0000 to 0x06A4 & 0xF95C to 0xFFFF (center 0000)"
    opcode: "0x59"
    query_command: "0x51"
    query_packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x51", "0x00", "0x00", "CheckSum"]
    response_packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x59", "0xpq", "0xrz", "CheckSum"]

  - id: pelco_d_tilt_position_inq
    label: Pelco-D Tilt Position
    type: integer
    description: "pqrz: Tilt Position 0x0000 to 0x0384 & 0xFED4  to 0xFFFF (center 0000)"
    opcode: "0x5B"
    query_command: "0x53"
    query_packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x53", "0x00", "0x00", "CheckSum"]
    response_packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x5B", "0xpq", "0xrz", "CheckSum"]

  - id: pelco_d_zoom_position_inq
    label: Pelco-D Zoom Position
    type: integer
    min: 0x0000
    max: 0x4000
    description: "pqrs: Zoom Position , pqrs: 0x0000~0x4000"
    opcode: "0x5D"
    query_command: "0x55"
    query_packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x55", "0x00", "0x00", "CheckSum"]
    response_packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x5D", "0xpq", "0xrz", "CheckSum"]

  - id: pelco_d_power_inq
    label: Pelco-D Power State
    type: enum
    values: ["On", "Off"]
    opcode: "0x71"
    query_command: "0x61"
    query_packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x61", "0x00", "0x00", "CheckSum"]
    response_packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x71", "0x00", "On:0x01 Off: 0x02", "CheckSum"]

  - id: pelco_d_menu_inq
    label: Pelco-D Menu State
    type: enum
    values: ["On", "Off"]
    opcode: "0x73"
    query_command: "0x63"
    query_packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x63", "0x00", "0x00", "CheckSum"]
    response_packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x73", "0x00", "On:0x01 Off: 0x02", "CheckSum"]

  - id: pelco_d_backlight_inq
    label: Pelco-D Backlight State
    type: enum
    values: ["On", "Off"]
    opcode: "0x75"
    query_command: "0x65"
    query_packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x65", "0x00", "0x00", "CheckSum"]
    response_packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x75", "0x00", "On:0x01 Off: 0x02", "CheckSum"]

  - id: pelco_d_mirror_inq
    label: Pelco-D Mirror And Flip State
    type: enum
    values: ["Normal", "Mirror", "Flip", "Mirror+Flip"]
    opcode: "0x77"
    query_command: "0x67"
    query_packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x67", "0x00", "0x00", "CheckSum"]
    response_packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x77", "0x00", "0x01:Normal<br>0x02:Mirror<br>0x03:Flip<br>0x04:Mirror+Flip", "CheckSum"]

  - id: pelco_d_freeze_inq
    label: Pelco-D Freeze State
    type: enum
    values: ["On", "Off"]
    opcode: "0x79"
    query_command: "0x69"
    query_packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x69", "0x00", "0x00", "CheckSum"]
    response_packet: ["0xFF", "0x00 ~ 0xFF", "0x00", "0x79", "0x00", "On:0x01 Off: 0x02", "CheckSum"]
```

## Variables

```yaml
# All settable parameters are represented as Actions with direct-value commands.
# No additional Variables section needed beyond Actions and Feedbacks.
```

## Events

```yaml
# VISCA protocol uses ACK and Completion messages:
# ACK: X0 4Y FF (Y = socket number)
# Completion (command): X0 5Y FF (Y = socket number)
# Completion (inquiry): X0 50 ... FF
# Network Change: X0 38 FF (X = 9 to F, camera address + 8)
# Error messages: X0 60 02 FF (syntax), X0 60 03 FF (buffer full),
#   X0 6Y 04 FF (cancelled), X0 6Y 05 FF (no socket), X0 6Y 41 FF (not executable)
```

## Macros

```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety

```yaml
confirmation_required_for:
  - factory_reset
  - pan_tilt_reset
interlocks: []
# UNRESOLVED: source does not describe power-on sequencing or safety interlock procedures
```

## Notes

VISCA (Video System Control Architecture) binary protocol over RS-232 serial and UDP. Camera address 1-7 maps to header byte 8x where x=address; reply headers use 9x-Fx (address+8). Two command sockets (1 and 2) allow concurrent command processing. Broadcast header is 88h (serial only; not available over VISCA over IP). VISCA over IP uses UDP port 52381 with an 8-byte message header + 1-16 byte payload; delivery confirmation is application-level (wait for reply, timeout and retransmit on failure).

Baud rate default is 9600 bps, configurable to 38400 via CAM_UART_Baud_Rate command. Inquiry response for baud rate also lists 115200 as a possible reading. VISCA over IP supports up to 5 simultaneous controller connections on one LAN segment.

Pan position range: 0x0000 to 0x6A40 (positive) and 0x95C0 to 0xFFFF (negative), center = 0x0000. Tilt position range: 0x0000 to 0x3840 (positive) and 0xED40 to 0xFFFF (negative), center = 0x0000.

Pelco-D protocol is also supported with its own command set (Sections 16-17) for pan/tilt/zoom/focus/preset/menu/power/backlight/mirror/freeze and query commands. Pelco-D uses checksum = Mod(sum of bytes 2-6, 0x100).

<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: no power-on sequencing requirements described -->
<!-- UNRESOLVED: Pelco-D transport details (serial vs IP, baud rate, parity) not specified in this document -->
<!-- UNRESOLVED: exact VISCA over IP payload header byte layout referenced as Pic.3 but not fully reproduced in text -->

For appended Pelco-D entries, `opcode` is the literal Byte 4 token from the source table. `packet`, `query_packet`, and `response_packet` list the seven source table cells in Byte 1 through Byte 7 order, preserving each cell's literal spelling. The address cell `0x00 ~ 0xFF` is replaced by the selected address byte; `0xVV` and `0xWW` are replaced by speed bytes, and `0xpq` and `0xrz` by the documented data bytes. State and mode cells containing alternatives specify the selected Byte 6 value; `<br>` separates source alternatives and is not transmitted. `CheckSum` is replaced by Mod((Byte 2 + Byte 3 + Byte 4 + Byte 5 + Byte 6), 0x100).

The Pelco-D speed mapping follows Section 16 literally: VV is tilt speed and WW is pan speed. Pelco-D pan and tilt inquiry ranges follow Section 17.2 literally and differ from the VISCA ranges. Pelco-D `query_command` contains the literal query Byte 4 opcode; `query_packet` supplies its complete byte layout. Pelco-D transport selection and communication settings remain UNRESOLVED.

## Provenance

```yaml
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS127%20-%20VC-A61P%20RS-232%20command%20set_1_4.pdf"
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
retrieved_at: 2026-05-13T06:36:00.965Z
last_checked_at: 2026-10-07T20:53:36.407Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:53:36.407Z
matched_actions: 316
action_count: 316
confidence: medium
summary: "All 316 spec units match source VISCA and Pelco-D entries with correct shapes, serial and UDP 52381 transport is supported, and the source catalogue is essentially fully covered. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no stated firmware version range for command applicability"
- "VISCA over IP does not support broadcast commands (stated in source)"
- "no multi-step macro sequences described in source"
- "source does not describe power-on sequencing or safety interlock procedures"
- "firmware version compatibility ranges not stated"
- "no power-on sequencing requirements described"
- "Pelco-D transport details (serial vs IP, baud rate, parity) not specified in this document"
- "exact VISCA over IP payload header byte layout referenced as Pic.3 but not fully reproduced in text"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
