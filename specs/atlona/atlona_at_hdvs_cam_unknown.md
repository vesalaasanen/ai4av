---
spec_id: admin/atlona-at-hdvs-cam
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-HDVS-CAM Control Spec"
manufacturer: Atlona
model_family: AT-HDVS-CAM
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-HDVS-CAM
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-HDVS-CAM_API.pdf
retrieved_at: 2026-05-14T20:20:09.597Z
last_checked_at: 2026-05-20T05:00:17.446Z
generated_at: 2026-05-20T05:00:17.446Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no serial (RS-232) pinout or wiring documented — source only specifies TCP"
  - "firmware version compatibility not stated"
  - "maximum concurrent connections not stated"
  - "no multi-step macro sequences described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing documented in source"
  - "Pelco-D/Pelco-P checksum calculation not explicitly shown"
  - "pan/tilt position coordinate range not documented (TBD noted in source for limit set)"
  - "maximum number of concurrent TCP connections not stated"
  - "whether VISCA and Pelco-D/P can be used simultaneously on same connection"
verification:
  verdict: verified
  checked_at: 2026-05-20T05:00:17.446Z
  matched_actions: 103
  action_count: 103
  confidence: medium
  summary: "All 103 spec actions have exact literal matches in source; transport parameters verified; feedback entries document all inquiry commands. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Atlona AT-HDVS-CAM Control Spec

## Summary
PTZ camera supporting VISCA, Pelco-D, and Pelco-P binary protocols over TCP. Provides pan/tilt/zoom control, focus, white balance, exposure, presets, and image adjustments. Minimum 500 ms between commands.

<!-- UNRESOLVED: no serial (RS-232) pinout or wiring documented — source only specifies TCP -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: maximum concurrent connections not stated -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 1259
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable     # inferred from CAM_Power On/Off commands
- queryable     # inferred from extensive Inquiry Command set
- levelable     # inferred from gain, brightness, contrast, saturation direct-set commands
```

## Actions
```yaml
- id: cam_power_on
  label: Power On
  kind: action
  params: []
  command: "8x 01 04 00 02 FF"
  note: "x = camera address"

- id: cam_power_off
  label: Power Off
  kind: action
  params: []
  command: "8x 01 04 00 03 FF"
  note: "x = camera address"

- id: cam_zoom_stop
  label: Zoom Stop
  kind: action
  params: []
  command: "8x 01 04 07 00 FF"

- id: cam_zoom_tele_standard
  label: Zoom Tele (Standard)
  kind: action
  params: []
  command: "8x 01 04 07 02 FF"

- id: cam_zoom_wide_standard
  label: Zoom Wide (Standard)
  kind: action
  params: []
  command: "8x 01 04 07 03 FF"

- id: cam_zoom_tele_variable
  label: Zoom Tele (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      min: 0
      max: 15
      description: "Zoom speed, 0=low, F=high"
  command: "8x 01 04 07 2p FF"

- id: cam_zoom_wide_variable
  label: Zoom Wide (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      min: 0
      max: 15
      description: "Zoom speed, 0=low, F=high"
  command: "8x 01 04 07 3p FF"

- id: cam_zoom_direct
  label: Zoom Direct
  kind: action
  params:
    - name: position
      type: integer
      description: "Zoom position (4 hex nibbles pqrs)"
  command: "8x 01 04 47 0p 0q 0r 0s FF"

- id: cam_focus_stop
  label: Focus Stop
  kind: action
  params: []
  command: "8x 01 04 08 00 FF"

- id: cam_focus_far_standard
  label: Focus Far (Standard)
  kind: action
  params: []
  command: "8x 01 04 08 02 FF"

- id: cam_focus_near_standard
  label: Focus Near (Standard)
  kind: action
  params: []
  command: "8x 01 04 08 03 FF"

- id: cam_focus_far_variable
  label: Focus Far (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      min: 0
      max: 15
      description: "Focus speed, 0=low, F=high"
  command: "8x 01 04 08 2p FF"

- id: cam_focus_near_variable
  label: Focus Near (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      min: 0
      max: 15
      description: "Focus speed, 0=low, F=high"
  command: "8x 01 04 08 3p FF"

- id: cam_focus_direct
  label: Focus Direct
  kind: action
  params:
    - name: position
      type: integer
      description: "Focus position (4 hex nibbles pqrs)"
  command: "8x 01 04 48 0p 0q 0r 0s FF"

- id: cam_auto_focus
  label: Auto Focus
  kind: action
  params: []
  command: "8x 01 04 38 02 FF"

- id: cam_manual_focus
  label: Manual Focus
  kind: action
  params: []
  command: "8x 01 04 38 03 FF"

- id: cam_zoom_focus_direct
  label: Zoom + Focus Direct
  kind: action
  params:
    - name: zoom_position
      type: integer
      description: "Zoom position (pqrs)"
    - name: focus_position
      type: integer
      description: "Focus position (tuvw)"
  command: "8x 01 04 47 0p 0q 0r 0s 0t 0u 0v 0w FF"

- id: cam_wb_auto
  label: White Balance Auto
  kind: action
  params: []
  command: "8x 01 04 35 00 FF"

- id: cam_wb_3000k
  label: White Balance 3000K
  kind: action
  params: []
  command: "8x 01 04 35 01 FF"

- id: cam_wb_4000k
  label: White Balance 4000K
  kind: action
  params: []
  command: "8x 01 04 35 02 FF"

- id: cam_wb_one_push
  label: White Balance One Push
  kind: action
  params: []
  command: "8x 01 04 35 03 FF"

- id: cam_wb_5000k
  label: White Balance 5000K
  kind: action
  params: []
  command: "8x 01 04 35 04 FF"

- id: cam_wb_manual
  label: White Balance Manual
  kind: action
  params: []
  command: "8x 01 04 35 05 FF"

- id: cam_wb_6500k
  label: White Balance 6500K
  kind: action
  params: []
  command: "8x 01 04 35 06 FF"

- id: cam_r_gain_reset
  label: R Gain Reset
  kind: action
  params: []
  command: "8x 01 04 03 00 FF"

- id: cam_r_gain_up
  label: R Gain Up
  kind: action
  params: []
  command: "8x 01 04 03 02 FF"

- id: cam_r_gain_down
  label: R Gain Down
  kind: action
  params: []
  command: "8x 01 04 03 03 FF"

- id: cam_r_gain_direct
  label: R Gain Direct
  kind: action
  params:
    - name: gain
      type: integer
      description: "R gain value (pq)"
  command: "8x 01 04 43 00 00 0p 0q FF"

- id: cam_b_gain_reset
  label: B Gain Reset
  kind: action
  params: []
  command: "8x 01 04 04 00 FF"

- id: cam_b_gain_up
  label: B Gain Up
  kind: action
  params: []
  command: "8x 01 04 04 02 FF"

- id: cam_b_gain_down
  label: B Gain Down
  kind: action
  params: []
  command: "8x 01 04 04 03 FF"

- id: cam_b_gain_direct
  label: B Gain Direct
  kind: action
  params:
    - name: gain
      type: integer
      description: "B gain value (pq)"
  command: "8x 01 04 44 00 00 0p 0q FF"

- id: cam_ae_full_auto
  label: AE Full Auto
  kind: action
  params: []
  command: "8x 01 04 39 00 FF"

- id: cam_ae_manual
  label: AE Manual
  kind: action
  params: []
  command: "8x 01 04 39 03 FF"

- id: cam_ae_shutter_priority
  label: AE Shutter Priority
  kind: action
  params: []
  command: "8x 01 04 39 0A FF"

- id: cam_ae_iris_priority
  label: AE Iris Priority
  kind: action
  params: []
  command: "8x 01 04 39 0B FF"

- id: cam_ae_bright
  label: AE Bright Mode
  kind: action
  params: []
  command: "8x 01 04 39 0D FF"

- id: cam_shutter_reset
  label: Shutter Reset
  kind: action
  params: []
  command: "8x 01 04 0A 00 FF"

- id: cam_shutter_up
  label: Shutter Up
  kind: action
  params: []
  command: "8x 01 04 0A 02 FF"

- id: cam_shutter_down
  label: Shutter Down
  kind: action
  params: []
  command: "8x 01 04 0A 03 FF"

- id: cam_shutter_direct
  label: Shutter Direct
  kind: action
  params:
    - name: position
      type: integer
      description: "Shutter position (pq)"
  command: "8x 01 04 4A 00 00 0p 0q FF"

- id: cam_iris_reset
  label: Iris Reset
  kind: action
  params: []
  command: "8x 01 04 0B 00 FF"

- id: cam_iris_up
  label: Iris Up
  kind: action
  params: []
  command: "8x 01 04 0B 02 FF"

- id: cam_iris_down
  label: Iris Down
  kind: action
  params: []
  command: "8x 01 04 0B 03 FF"

- id: cam_iris_direct
  label: Iris Direct
  kind: action
  params:
    - name: position
      type: integer
      description: "Iris position (pq)"
  command: "8x 01 04 4B 00 00 0p 0q FF"

- id: cam_gain_reset
  label: Gain Reset
  kind: action
  params: []
  command: "8x 01 04 0C 00 FF"

- id: cam_gain_up
  label: Gain Up
  kind: action
  params: []
  command: "8x 01 04 0C 02 FF"

- id: cam_gain_down
  label: Gain Down
  kind: action
  params: []
  command: "8x 01 04 0C 03 FF"

- id: cam_gain_direct
  label: Gain Direct
  kind: action
  params:
    - name: position
      type: integer
      description: "Gain position (pq)"
  command: "8x 01 04 0C 00 00 0p 0q FF"

- id: cam_bright_reset
  label: Brightness Reset
  kind: action
  params: []
  command: "8x 01 04 0D 00 FF"

- id: cam_bright_up
  label: Brightness Up
  kind: action
  params: []
  command: "8x 01 04 0D 02 FF"

- id: cam_bright_down
  label: Brightness Down
  kind: action
  params: []
  command: "8x 01 04 0D 03 FF"

- id: cam_bright_direct
  label: Brightness Direct
  kind: action
  params:
    - name: position
      type: integer
      description: "Brightness position (pq)"
  command: "8x 01 04 4D 00 00 0p 0q FF"

- id: cam_exp_comp_on
  label: Exposure Compensation On
  kind: action
  params: []
  command: "8x 01 04 3E 02 FF"

- id: cam_exp_comp_off
  label: Exposure Compensation Off
  kind: action
  params: []
  command: "8x 01 04 3E 03 FF"

- id: cam_exp_comp_reset
  label: Exposure Compensation Reset
  kind: action
  params: []
  command: "8x 01 04 0E 00 FF"

- id: cam_exp_comp_up
  label: Exposure Compensation Up
  kind: action
  params: []
  command: "8x 01 04 0E 02 FF"

- id: cam_exp_comp_down
  label: Exposure Compensation Down
  kind: action
  params: []
  command: "8x 01 04 0E 03 FF"

- id: cam_exp_comp_direct
  label: Exposure Compensation Direct
  kind: action
  params:
    - name: position
      type: integer
      description: "Exposure compensation position (pq)"
  command: "8x 01 04 4E 00 00 0p 0q FF"

- id: cam_backlight_on
  label: Backlight Compensation On
  kind: action
  params: []
  command: "8x 01 04 33 02 FF"

- id: cam_backlight_off
  label: Backlight Compensation Off
  kind: action
  params: []
  command: "8x 01 04 33 03 FF"

- id: cam_nr_2d
  label: 2D Noise Reduction
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 7
      description: "0=OFF, 1-7=level"
  command: "8x 01 04 53 0p FF"

- id: cam_nr_3d
  label: 3D Noise Reduction
  kind: action
  params:
    - name: level
      type: integer
      min: 0
      max: 8
      description: "0=OFF, 1-8=level"
  command: "8x 01 04 54 0p FF"

- id: cam_gamma
  label: Gamma Setting
  kind: action
  params:
    - name: preset
      type: enum
      values: [default, 0.47, 0.50, 0.52, 0.55]
      description: "0=Default, 1=0.47, 2=0.50, 3=0.52, 4=0.55"
  command: "8x 01 04 5B 0p FF"

- id: cam_flicker_off
  label: Flicker OFF
  kind: action
  params: []
  command: "8x 01 04 23 00 FF"

- id: cam_flicker_50hz
  label: Flicker 50Hz
  kind: action
  params: []
  command: "8x 01 04 23 01 FF"

- id: cam_flicker_60hz
  label: Flicker 60Hz
  kind: action
  params: []
  command: "8x 01 04 23 02 FF"

- id: cam_aperture_reset
  label: Aperture Reset
  kind: action
  params: []
  command: "8x 01 04 02 00 FF"

- id: cam_aperture_up
  label: Aperture Up
  kind: action
  params: []
  command: "8x 01 04 02 02 FF"

- id: cam_aperture_down
  label: Aperture Down
  kind: action
  params: []
  command: "8x 01 04 02 03 FF"

- id: cam_aperture_direct
  label: Aperture Direct
  kind: action
  params:
    - name: gain
      type: integer
      description: "Aperture gain (pq)"
  command: "8x 01 04 42 00 00 0p 0q FF"

- id: cam_memory_reset
  label: Preset Reset
  kind: action
  params:
    - name: preset
      type: integer
      min: 0
      max: 254
      description: "Memory/preset number"
  command: "8x 01 04 3F 00 pq FF"

- id: cam_memory_set
  label: Preset Set
  kind: action
  params:
    - name: preset
      type: integer
      min: 0
      max: 254
      description: "Memory/preset number"
  command: "8x 01 04 3F 01 pq FF"

- id: cam_memory_recall
  label: Preset Recall
  kind: action
  params:
    - name: preset
      type: integer
      min: 0
      max: 254
      description: "Memory/preset number"
  command: "8x 01 04 3F 02 pq FF"

- id: cam_lr_reverse_on
  label: Horizontal Flip On
  kind: action
  params: []
  command: "8x 01 04 61 02 FF"

- id: cam_lr_reverse_off
  label: Horizontal Flip Off
  kind: action
  params: []
  command: "8x 01 04 61 03 FF"

- id: cam_picture_flip_on
  label: Vertical Flip On
  kind: action
  params: []
  command: "8x 01 04 66 02 FF"

- id: cam_picture_flip_off
  label: Vertical Flip Off
  kind: action
  params: []
  command: "8x 01 04 66 03 FF"

- id: cam_color_saturation_direct
  label: Color Saturation Direct
  kind: action
  params:
    - name: level
      type: enum
      values: ["60%", "70%", "80%", "90%", "100%", "110%", "120%", "130%"]
      description: "p=0→60%, 1→70%, 2→80%, 3→90%, 4→100%, 5→110%, 6→120%, 7→130%"
  command: "8x 01 04 49 00 00 00 0p FF"

- id: cam_id_write
  label: Camera ID Write
  kind: action
  params:
    - name: camera_id
      type: integer
      description: "Camera ID (0000 to FFF)"
  command: "8x 01 04 22 0p 0q 0r 0s FF"

- id: sys_menu_on
  label: Menu On
  kind: action
  params: []
  command: "8x 01 04 06 06 02 FF"

- id: sys_menu_off
  label: Menu Off
  kind: action
  params: []
  command: "8x 01 04 06 06 03 FF"

- id: ir_receive_on
  label: IR Receive On
  kind: action
  params: []
  command: "8x 01 06 08 02 FF"

- id: ir_receive_off
  label: IR Receive Off
  kind: action
  params: []
  command: "8x 01 06 08 03 FF"

- id: ir_receive_return_on
  label: IR Receive Return On
  kind: action
  params: []
  command: "8x 01 7D 01 03 00 00 FF"

- id: ir_receive_return_off
  label: IR Receive Return Off
  kind: action
  params: []
  command: "8x 01 7D 01 13 00 00 FF"

- id: cam_setting_reset
  label: Factory Reset
  kind: action
  params: []
  command: "8x 01 04 A0 10 FF"

- id: cam_brightness_direct
  label: Brightness Direct
  kind: action
  params:
    - name: position
      type: integer
      description: "Brightness position (pq)"
  command: "8x 01 04 A1 00 00 0p 0q FF"

- id: cam_contrast_direct
  label: Contrast Direct
  kind: action
  params:
    - name: position
      type: integer
      description: "Contrast position (pq)"
  command: "8x 01 04 A2 00 00 0p 0q FF"

- id: cam_flip_off
  label: Video Flip Off
  kind: action
  params: []
  command: "8x 01 04 A4 00 FF"

- id: cam_flip_h
  label: Video Flip Horizontal
  kind: action
  params: []
  command: "8x 01 04 A4 01 FF"

- id: cam_flip_v
  label: Video Flip Vertical
  kind: action
  params: []
  command: "8x 01 04 A4 02 FF"

- id: cam_flip_hv
  label: Video Flip Horizontal + Vertical
  kind: action
  params: []
  command: "8x 01 04 A4 03 FF"

- id: cam_video_system
  label: Video System Set
  kind: action
  params:
    - name: format
      type: enum
      values:
        - 1080P60
        - 1080P50
        - 1080i60
        - 1080i50
        - 720P60
        - 720P50
        - 1080P30
        - 1080P25
        - 720P30
        - 720P25
        - 1080P59.94
        - 1080i59.94
        - 720P59.94
        - 1080P29.97
        - 720P29.97
      description: "0=1080P60, 1=1080P50, 2=1080i60, 3=1080i50, 4=720P60, 5=720P50, 6=1080P30, 7=1080P25, 8=720P30, 9=720P25, A=1080P59.94, B=1080i59.94, C=720P59.94, D=1080P29.97, E=720P29.97"
  command: "8x 01 06 35 00 0p FF"

- id: address_set
  label: Address Set (Broadcast)
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address (p)"
  command: "88 30 0p FF"

- id: if_clear
  label: Interface Clear (Broadcast)
  kind: action
  params: []
  command: "88 01 00 01 FF"

- id: command_cancel
  label: Command Cancel
  kind: action
  params: []
  command: "8x 21 FF"

- id: pan_tilt_up
  label: Pan-Tilt Up
  kind: action
  params:
    - name: pan_speed
      type: integer
      min: 1
      max: 24
      description: "Pan speed 01 (low) to 18 (high)"
    - name: tilt_speed
      type: integer
      min: 1
      max: 20
      description: "Tilt speed 01 (low) to 14 (high)"
  command: "8x 01 06 01 VV WW 03 01 FF"

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
      max: 20
  command: "8x 01 06 01 VV WW 03 02 FF"

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
      max: 20
  command: "8x 01 06 01 VV WW 01 03 FF"

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
      max: 20
  command: "8x 01 06 01 VV WW 02 03 FF"

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
      max: 20
  command: "8x 01 06 01 VV WW 01 01 FF"

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
      max: 20
  command: "8x 01 06 01 VV WW 02 01 FF"

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
      max: 20
  command: "8x 01 06 01 VV WW 01 02 FF"

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
      max: 20
  command: "8x 01 06 01 VV WW 02 02 FF"

- id: pan_tilt_stop
  label: Pan-Tilt Stop
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
  command: "8x 01 06 01 VV WW 03 03 FF"

- id: pan_tilt_absolute_position
  label: Pan-Tilt Absolute Position
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
    - name: pan_position
      type: integer
      description: "Pan position (YYYY, 4 hex nibbles)"
    - name: tilt_position
      type: integer
      description: "Tilt position (ZZZZ, 4 hex nibbles)"
  command: "8x 01 06 02 VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"

- id: pan_tilt_relative_position
  label: Pan-Tilt Relative Position
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
    - name: pan_position
      type: integer
      description: "Pan offset (YYYY)"
    - name: tilt_position
      type: integer
      description: "Tilt offset (ZZZZ)"
  command: "8x 01 06 03 VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"

- id: pan_tilt_home
  label: Pan-Tilt Home
  kind: action
  params: []
  command: "8x 01 06 04 FF"

- id: pan_tilt_reset
  label: Pan-Tilt Reset
  kind: action
  params: []
  command: "8x 01 06 05 FF"

- id: pan_tilt_limit_set
  label: Pan-Tilt Limit Set
  kind: action
  params:
    - name: corner
      type: enum
      values: [downleft, upright]
      description: "1=UpRight, 0=DownLeft"
    - name: pan_position
      type: integer
      description: "Pan limit (YYYY)"
    - name: tilt_position
      type: integer
      description: "Tilt limit (ZZZZ)"
  command: "8x 01 06 07 00 0W 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"

- id: pan_tilt_limit_clear
  label: Pan-Tilt Limit Clear
  kind: action
  params:
    - name: corner
      type: enum
      values: [downleft, upright]
      description: "1=UpRight, 0=DownLeft"
  command: "8x 01 06 07 01 0W 07 0F 0F 0F 07 0F 0F 0F FF"
- id: cam_picture_effect_off
  label: Picture Effect Off
  kind: action
  params: []
  command: "8x 01 04 63 00 FF"
  note: "CAM_PictureEffect Off (B&W mode off)"

- id: cam_picture_effect_bw
  label: Picture Effect B&W
  kind: action
  params: []
  command: "8x 01 04 63 04 FF"
  note: "CAM_PictureEffect B&W mode"

- id: cam_picture_effect_inq
  label: Picture Effect Mode
  kind: query
  params: []
  command: "8x 09 04 63 FF"
  note: "CAM_PictureEffectModeInq; y0 50 00 FF Off, y0 50 04 FF B&W"

- id: pelco_d_up
  label: Pelco-D Pan-Tilt Up
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: pan_speed
      type: integer
      description: "Pan speed byte"
    - name: tilt_speed
      type: integer
      description: "Tilt speed byte"
  command: "FF [Address] 0x00 0x08 [Pan Speed] [Tilt Speed] [SUM]"
  note: "Pelco-D 7-byte frame; SUM = sum of bytes 2-6 mod 256"

- id: pelco_d_down
  label: Pelco-D Pan-Tilt Down
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: pan_speed
      type: integer
      description: "Pan speed byte"
    - name: tilt_speed
      type: integer
      description: "Tilt speed byte"
  command: "FF [Address] 0x00 0x10 [Pan Speed] [Tilt Speed] [SUM]"

- id: pelco_d_left
  label: Pelco-D Pan-Tilt Left
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: pan_speed
      type: integer
      description: "Pan speed byte"
    - name: tilt_speed
      type: integer
      description: "Tilt speed byte"
  command: "FF [Address] 0x00 0x04 [Pan Speed] [Tilt Speed] [SUM]"

- id: pelco_d_right
  label: Pelco-D Pan-Tilt Right
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: pan_speed
      type: integer
      description: "Pan speed byte"
    - name: tilt_speed
      type: integer
      description: "Tilt speed byte"
  command: "FF [Address] 0x00 0x02 [Pan Speed] [Tilt Speed] [SUM]"

- id: pelco_d_upleft
  label: Pelco-D Pan-Tilt Up-Left
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: pan_speed
      type: integer
      description: "Pan speed byte"
    - name: tilt_speed
      type: integer
      description: "Tilt speed byte"
  command: "FF [Address] 0x00 0x0C [Pan Speed] [Tilt Speed] [SUM]"

- id: pelco_d_upright
  label: Pelco-D Pan-Tilt Up-Right
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: pan_speed
      type: integer
      description: "Pan speed byte"
    - name: tilt_speed
      type: integer
      description: "Tilt speed byte"
  command: "FF [Address] 0x00 0x0A [Pan Speed] [Tilt Speed] [SUM]"

- id: pelco_d_downleft
  label: Pelco-D Pan-Tilt Down-Left
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: pan_speed
      type: integer
      description: "Pan speed byte"
    - name: tilt_speed
      type: integer
      description: "Tilt speed byte"
  command: "FF [Address] 0x00 0x14 [Pan Speed] [Tilt Speed] [SUM]"

- id: pelco_d_downright
  label: Pelco-D Pan-Tilt Down-Right
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: pan_speed
      type: integer
      description: "Pan speed byte"
    - name: tilt_speed
      type: integer
      description: "Tilt speed byte"
  command: "FF [Address] 0x00 0x12 [Pan Speed] [Tilt Speed] [SUM]"

- id: pelco_d_zoom_in
  label: Pelco-D Zoom In
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
  command: "FF [Address] 0x00 0x20 0x00 0x00 [SUM]"

- id: pelco_d_zoom_out
  label: Pelco-D Zoom Out
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
  command: "FF [Address] 0x00 0x40 0x00 0x00 [SUM]"

- id: pelco_d_focus_far
  label: Pelco-D Focus Far
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
  command: "FF [Address] 0x00 0x80 0x00 0x00 [SUM]"

- id: pelco_d_focus_near
  label: Pelco-D Focus Near
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
  command: "FF [Address] 0x01 0x00 0x00 0x00 [SUM]"

- id: pelco_d_preset_set
  label: Pelco-D Set Preset
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: preset_id
      type: integer
      description: "Preset ID byte"
  command: "FF [Address] 0x00 0x03 0x00 [Preset ID] [SUM]"

- id: pelco_d_preset_clear
  label: Pelco-D Clear Preset
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: preset_id
      type: integer
      description: "Preset ID byte"
  command: "FF [Address] 0x00 0x05 0x00 [Preset ID] [SUM]"

- id: pelco_d_preset_call
  label: Pelco-D Call Preset
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: preset_id
      type: integer
      description: "Preset ID byte"
  command: "FF [Address] 0x00 0x07 0x00 [Preset ID] [SUM]"

- id: pelco_d_query_pan
  label: Pelco-D Query Pan Position
  kind: query
  params:
    - name: address
      type: integer
      description: "Camera address byte"
  command: "FF [Address] 0x00 0x51 0x00 0x00 [SUM]"
  note: "Response: FF [Address] 0x00 0x59 [Value High Byte] [Value Low Byte] [SUM]"

- id: pelco_d_query_tilt
  label: Pelco-D Query Tilt Position
  kind: query
  params:
    - name: address
      type: integer
      description: "Camera address byte"
  command: "FF [Address] 0x00 0x53 0x00 0x00 [SUM]"
  note: "Response: FF [Address] 0x00 0x5B [Value High Byte] [Value Low Byte] [SUM]"

- id: pelco_d_query_zoom
  label: Pelco-D Query Zoom Position
  kind: query
  params:
    - name: address
      type: integer
      description: "Camera address byte"
  command: "FF [Address] 0x00 0x55 0x00 0x00 [SUM]"
  note: "Response: FF [Address] 0x00 0x5D [Value High Byte] [Value Low Byte] [SUM]"

- id: pelco_p_up
  label: Pelco-P Pan-Tilt Up
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: pan_speed
      type: integer
      description: "Pan speed byte"
    - name: tilt_speed
      type: integer
      description: "Tilt speed byte"
  command: "A0 [Address] 0x00 0x08 [Pan Speed] [Tilt Speed] 0xAF [XOR]"
  note: "Pelco-P 8-byte frame; XOR of bytes 2-7"

- id: pelco_p_down
  label: Pelco-P Pan-Tilt Down
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: pan_speed
      type: integer
      description: "Pan speed byte"
    - name: tilt_speed
      type: integer
      description: "Tilt speed byte"
  command: "A0 [Address] 0x00 0x10 [Pan Speed] [Tilt Speed] 0xAF [XOR]"

- id: pelco_p_left
  label: Pelco-P Pan-Tilt Left
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: pan_speed
      type: integer
      description: "Pan speed byte"
    - name: tilt_speed
      type: integer
      description: "Tilt speed byte"
  command: "A0 [Address] 0x00 0x04 [Pan Speed] [Tilt Speed] 0xAF [XOR]"

- id: pelco_p_right
  label: Pelco-P Pan-Tilt Right
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: pan_speed
      type: integer
      description: "Pan speed byte"
    - name: tilt_speed
      type: integer
      description: "Tilt speed byte"
  command: "A0 [Address] 0x00 0x02 [Pan Speed] [Tilt Speed] 0xAF [XOR]"

- id: pelco_p_upleft
  label: Pelco-P Pan-Tilt Up-Left
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: pan_speed
      type: integer
      description: "Pan speed byte"
    - name: tilt_speed
      type: integer
      description: "Tilt speed byte"
  command: "A0 [Address] 0x00 0x0C [Pan Speed] [Tilt Speed] 0xAF [XOR]"

- id: pelco_p_upright
  label: Pelco-P Pan-Tilt Up-Right
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: pan_speed
      type: integer
      description: "Pan speed byte"
    - name: tilt_speed
      type: integer
      description: "Tilt speed byte"
  command: "A0 [Address] 0x00 0x0A [Pan Speed] [Tilt Speed] 0xAF [XOR]"

- id: pelco_p_downleft
  label: Pelco-P Pan-Tilt Down-Left
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: pan_speed
      type: integer
      description: "Pan speed byte"
    - name: tilt_speed
      type: integer
      description: "Tilt speed byte"
  command: "A0 [Address] 0x00 0x14 [Pan Speed] [Tilt Speed] 0xAF [XOR]"

- id: pelco_p_downright
  label: Pelco-P Pan-Tilt Down-Right
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: pan_speed
      type: integer
      description: "Pan speed byte"
    - name: tilt_speed
      type: integer
      description: "Tilt speed byte"
  command: "A0 [Address] 0x00 0x12 [Pan Speed] [Tilt Speed] 0xAF [XOR]"

- id: pelco_p_zoom_in
  label: Pelco-P Zoom In
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
  command: "A0 [Address] 0x00 0x20 0x00 0x00 0xAF [XOR]"

- id: pelco_p_zoom_out
  label: Pelco-P Zoom Out
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
  command: "A0 [Address] 0x00 0x40 0x00 0x00 0xAF [XOR]"

- id: pelco_p_focus_far
  label: Pelco-P Focus Far
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
  command: "A0 [Address] 0x01 0x00 0x00 0x00 0xAF [XOR]"

- id: pelco_p_focus_near
  label: Pelco-P Focus Near
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
  command: "A0 [Address] 0x02 0x00 0x00 0x00 0xAF [XOR]"

- id: pelco_p_preset_set
  label: Pelco-P Set Preset
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: preset_id
      type: integer
      description: "Preset ID byte"
  command: "A0 [Address] 0x00 0x03 0x00 [Preset ID] 0xAF [XOR]"

- id: pelco_p_preset_clear
  label: Pelco-P Clear Preset
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: preset_id
      type: integer
      description: "Preset ID byte"
  command: "A0 [Address] 0x00 0x05 0x00 [Preset ID] 0xAF [XOR]"

- id: pelco_p_preset_call
  label: Pelco-P Call Preset
  kind: action
  params:
    - name: address
      type: integer
      description: "Camera address byte"
    - name: preset_id
      type: integer
      description: "Preset ID byte"
  command: "A0 [Address] 0x00 0x07 0x00 [Preset ID] 0xAF [XOR]"

- id: pelco_p_query_pan
  label: Pelco-P Query Pan Position
  kind: query
  params:
    - name: address
      type: integer
      description: "Camera address byte"
  command: "A0 [Address] 0x00 0x51 0x00 0x00 0xAF [XOR]"
  note: "Response: A0 [Address] 0x00 0x59 [Value High Byte] [Value Low Byte] 0xAF [XOR]"

- id: pelco_p_query_tilt
  label: Pelco-P Query Tilt Position
  kind: query
  params:
    - name: address
      type: integer
      description: "Camera address byte"
  command: "A0 [Address] 0x00 0x53 0x00 0x00 0xAF [XOR]"
  note: "Response: A0 [Address] 0x00 0x5B [Value High Byte] [Value Low Byte] 0xAF [XOR]"

- id: pelco_p_query_zoom
  label: Pelco-P Query Zoom Position
  kind: query
  params:
    - name: address
      type: integer
      description: "Camera address byte"
  command: "A0 [Address] 0x00 0x55 0x00 0x00 0xAF [XOR]"
  note: "Response: A0 [Address] 0x00 0x5D [Value High Byte] [Value Low Byte] 0xAF [XOR]"
```

## Feedbacks
```yaml
- id: cam_power_inq
  label: Power State
  type: enum
  values: [on, off]
  command: "8x 09 04 00 FF"
  response:
    on: "y0 50 02 FF"
    off: "y0 50 03 FF"

- id: cam_zoom_pos_inq
  label: Zoom Position
  type: integer
  command: "8x 09 04 47 FF"
  response: "y0 50 0p 0q 0r 0s FF"

- id: cam_focus_af_mode_inq
  label: Focus AF Mode
  type: enum
  values: [auto, manual]
  command: "8x 09 04 38 FF"
  response:
    auto: "y0 50 02 FF"
    manual: "y0 50 03 FF"

- id: cam_focus_pos_inq
  label: Focus Position
  type: integer
  command: "8x 09 04 48 FF"
  response: "y0 50 0p 0q 0r 0s FF"

- id: cam_wb_mode_inq
  label: White Balance Mode
  type: enum
  values: [auto, "3000K", "4000K", one_push, "5000K", manual, "6500K"]
  command: "8x 09 04 35 FF"

- id: cam_r_gain_inq
  label: R Gain
  type: integer
  command: "8x 09 04 43 FF"
  response: "y0 50 00 00 0p 0q FF"

- id: cam_b_gain_inq
  label: B Gain
  type: integer
  command: "8x 09 04 44 FF"
  response: "y0 50 00 00 0p 0q FF"

- id: cam_ae_mode_inq
  label: AE Mode
  type: enum
  values: [full_auto, manual, shutter_priority, iris_priority, bright]
  command: "8x 09 04 39 FF"

- id: cam_shutter_pos_inq
  label: Shutter Position
  type: integer
  command: "8x 09 04 4A FF"
  response: "y0 50 00 00 0p 0q FF"

- id: cam_iris_pos_inq
  label: Iris Position
  type: integer
  command: "8x 09 04 4B FF"
  response: "y0 50 00 00 0p 0q FF"

- id: cam_bright_pos_inq
  label: Bright Position
  type: integer
  command: "8x 09 04 4D FF"
  response: "y0 50 00 00 0p 0q FF"

- id: cam_exp_comp_mode_inq
  label: Exposure Compensation Mode
  type: enum
  values: [on, off]
  command: "8x 09 04 3E FF"

- id: cam_exp_comp_pos_inq
  label: Exposure Compensation Position
  type: integer
  command: "8x 09 04 4E FF"
  response: "y0 50 00 00 0p 0q FF"

- id: cam_backlight_mode_inq
  label: Backlight Compensation Mode
  type: enum
  values: [on, off]
  command: "8x 09 04 33 FF"

- id: cam_nr_2d_level_inq
  label: 2D NR Level
  type: integer
  command: "8x 09 04 53 FF"
  response: "y0 50 0p FF"

- id: cam_nr_3d_level_inq
  label: 3D NR Level
  type: integer
  command: "8x 09 04 54 FF"
  response: "y0 50 0p FF"

- id: cam_flicker_mode_inq
  label: Flicker Mode
  type: enum
  values: [off, "50Hz", "60Hz"]
  command: "8x 09 04 55 FF"

- id: cam_aperture_inq
  label: Aperture Gain
  type: integer
  command: "8x 09 04 42 FF"
  response: "y0 50 00 00 0p 0q FF"

- id: cam_memory_inq
  label: Last Preset Operated
  type: integer
  command: "8x 09 04 3F FF"
  response: "y0 50 0p FF"

- id: sys_menu_mode_inq
  label: Menu State
  type: enum
  values: [on, off]
  command: "8x 09 06 06 FF"

- id: cam_lr_reverse_inq
  label: Horizontal Flip State
  type: enum
  values: [on, off]
  command: "8x 09 04 61 FF"

- id: cam_picture_flip_inq
  label: Vertical Flip State
  type: enum
  values: [on, off]
  command: "8x 09 04 66 FF"

- id: cam_color_saturation_inq
  label: Color Saturation
  type: integer
  command: "8x 09 04 49 FF"
  response: "y0 50 00 00 00 0p FF"

- id: cam_id_inq
  label: Camera ID
  type: integer
  command: "8x 09 04 22 FF"

- id: ir_receive_inq
  label: IR Receive State
  type: enum
  values: [on, off]
  command: "8x 09 06 08 FF"

- id: cam_brightness_inq
  label: Brightness
  type: integer
  command: "8x 09 04 A1 FF"
  response: "y0 50 00 00 0p 0q FF"

- id: cam_contrast_inq
  label: Contrast
  type: integer
  command: "8x 09 04 A2 FF"
  response: "y0 50 00 00 0p 0q FF"

- id: cam_flip_inq
  label: Video Flip State
  type: enum
  values: [off, flip_h, flip_v, flip_hv]
  command: "8x 09 04 A4 FF"

- id: cam_gamma_inq
  label: Gamma Setting
  type: integer
  command: "8x 09 04 5B FF"
  response: "y0 50 0p FF"

- id: cam_version_inq
  label: Firmware Version
  type: string
  command: "8x 09 00 02 FF"
  response: "y0 50 ab cd mn pq rs tu vw FF"
  note: "ab cd=vendor ID (0220), mn pq=model ID, rs tu=ARM version"

- id: video_system_inq
  label: Video System Format
  type: enum
  values:
    - 1080P60
    - 1080P50
    - 1080i60
    - 1080i50
    - 720P60
    - 720P50
    - 1080P30
    - 1080P25
    - 720P30
    - 720P25
    - 1080P59.94
    - 1080i59.94
    - 720P59.94
    - 1080P29.97
    - 720P29.97
  command: "8x 09 06 23 FF"

- id: pan_tilt_max_speed_inq
  label: Pan-Tilt Max Speed
  type: object
  command: "8x 09 06 11 FF"
  response: "y0 50 ww zz FF"
  note: "ww=Pan Max Speed, zz=Tilt Max Speed"

- id: pan_tilt_pos_inq
  label: Pan-Tilt Position
  type: object
  command: "8x 09 06 12 FF"
  response: "y0 50 0w 0w 0w 0w 0z 0z 0z 0z FF"
  note: "wwww=Pan Position, zzzz=Tilt Position"
```

## Variables
```yaml
# No continuously-settable variables beyond the direct-set actions above.
# All parameterized settings are captured as actions with direct-set commands.
```

## Events
```yaml
# VISCA ACK/Completion responses are sent per-command, not unsolicited.
# IR_ReceiveReturn messages are unsolicited when IR receive return is enabled.
- id: ir_receive_return_power
  label: IR Receive Return - Power
  trigger: "Unsolicited when IR remote used while receive return enabled"
  response: "y0 07 7D 01 04 00 FF"

- id: ir_receive_return_zoom
  label: IR Receive Return - Zoom
  trigger: "Unsolicited"
  response: "y0 07 7D 01 04 07 FF"

- id: ir_receive_return_af
  label: IR Receive Return - Auto Focus
  trigger: "Unsolicited"
  response: "y0 07 7D 01 04 38 FF"

- id: ir_receive_return_backlight
  label: IR Receive Return - Backlight
  trigger: "Unsolicited"
  response: "y0 07 7D 01 04 33 FF"

- id: ir_receive_return_memory
  label: IR Receive Return - Memory
  trigger: "Unsolicited"
  response: "y0 07 7D 01 04 3F FF"

- id: ir_receive_return_pan_tilt
  label: IR Receive Return - Pan-Tilt
  trigger: "Unsolicited"
  response: "y0 07 7D 01 06 01 FF"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
note: "500 ms minimum delay between commands. Pan-tilt reset returns camera to home position."
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing documented in source
```

## Notes
Device uses VISCA protocol (Sony PTZ camera command set) with binary hex command packets over TCP. Camera address x is used in commands (8x prefix), response address y = x + 8. ACK (`z0 41 FF`) returned on command acceptance, Completion (`z0 51 FF`) on execution. Error responses: Syntax Error (`z0 60 02 FF`), Command Not Executable (`z0 61 41 FF`). Also supports Pelco-D and Pelco-P protocols on the same TCP port for PTZ and preset operations. Pelco-D uses 7-byte frames (0xFF prefix, address, command bytes, checksum). Pelco-P uses 8-byte frames (0xA0 prefix, 0xAF sentinel, XOR checksum).

<!-- UNRESOLVED: Pelco-D/Pelco-P checksum calculation not explicitly shown -->
<!-- UNRESOLVED: pan/tilt position coordinate range not documented (TBD noted in source for limit set) -->
<!-- UNRESOLVED: maximum number of concurrent TCP connections not stated -->
<!-- UNRESOLVED: whether VISCA and Pelco-D/P can be used simultaneously on same connection -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/AT-HDVS-CAM_API.pdf
retrieved_at: 2026-05-14T20:20:09.597Z
last_checked_at: 2026-05-20T05:00:17.446Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T05:00:17.446Z
matched_actions: 103
action_count: 103
confidence: medium
summary: "All 103 spec actions have exact literal matches in source; transport parameters verified; feedback entries document all inquiry commands. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no serial (RS-232) pinout or wiring documented — source only specifies TCP"
- "firmware version compatibility not stated"
- "maximum concurrent connections not stated"
- "no multi-step macro sequences described in source"
- "no safety warnings, interlock procedures, or power-on sequencing documented in source"
- "Pelco-D/Pelco-P checksum calculation not explicitly shown"
- "pan/tilt position coordinate range not documented (TBD noted in source for limit set)"
- "maximum number of concurrent TCP connections not stated"
- "whether VISCA and Pelco-D/P can be used simultaneously on same connection"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
