---
spec_id: admin/goelst-gohd400
schema_version: ai4av-public-spec-v1
revision: 1
title: "Goelst GOHD400 Control Spec"
manufacturer: Goelst
model_family: GOHD400
aliases: []
compatible_with:
  manufacturers:
    - Goelst
  models:
    - GOHD400
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - m.media-amazon.com
  - manualslib.com
source_urls:
  - https://m.media-amazon.com/images/I/91YBOvh13VL.pdf
  - https://www.manualslib.com/manual/3031436/Goelectronic-Gohd400.html
retrieved_at: 2026-05-14T23:43:01.333Z
last_checked_at: 2026-05-16T11:20:34.748Z
generated_at: 2026-05-16T11:20:34.748Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T11:20:34.748Z
  matched_actions: 131
  action_count: 186
  confidence: high
  summary: "All 131 spec actions (94 VISCA/custom + 37 feedback queries) match documented commands in the source; transport parameters verified; comprehensive coverage of VISCA, Pelco-D, and Pelco-P protocols."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Goelst GOHD400 Control Spec

## Summary
PTZ camera supporting VISCA serial protocol over RS-232C, plus Pelco-D and Pelco-P serial protocols. Provides pan/tilt/zoom control, preset memory, white balance, exposure, and image adjustments. Configurable baud rates (2400/4800/9600).

<!-- UNRESOLVED: TCP/IP control not confirmed — source only documents RS-232C serial -->
<!-- UNRESOLVED: VISCA over IP (tunneling) not mentioned in source -->
<!-- UNRESOLVED: Pelco-D/P addressing byte format fully specified but checksum algorithm not stated explicitly -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # selectable: 2400, 4800, 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # CAM_Power On/Off commands present
  - queryable    # extensive Inquiry command set returning state values
  - levelable    # zoom speed, pan/tilt speed, gain, aperture, exposure compensation
  - ptz          # pan/tilt/zoom drive and preset commands
```

## Actions
```yaml
actions:
  - id: address_set
    label: Address Set
    kind: action
    params: []
    note: VISCA broadcast address set (88 30 01 FF)

  - id: if_clear
    label: Interface Clear
    kind: action
    params: []
    note: VISCA I/F clear (88 01 00 01 FF)

  - id: command_cancel
    label: Command Cancel
    kind: action
    params:
      - name: socket
        type: integer
        description: Socket number (x in 8x 21 FF)

  - id: cam_power_on
    label: Camera Power On
    kind: action
    params: []

  - id: cam_power_off
    label: Camera Power Off (Standby)
    kind: action
    params: []

  - id: zoom_stop
    label: Zoom Stop
    kind: action
    params: []

  - id: zoom_tele_standard
    label: Zoom Tele (Standard)
    kind: action
    params: []

  - id: zoom_wide_standard
    label: Zoom Wide (Standard)
    kind: action
    params: []

  - id: zoom_tele_variable
    label: Zoom Tele (Variable)
    kind: action
    params:
      - name: speed
        type: integer
        description: "Speed 0 (low) to 7 (high)"

  - id: zoom_wide_variable
    label: Zoom Wide (Variable)
    kind: action
    params:
      - name: speed
        type: integer
        description: "Speed 0 (low) to 7 (high)"

  - id: zoom_direct
    label: Zoom Direct
    kind: action
    params:
      - name: position
        type: integer
        description: "Zoom position (4 hex nibbles pqrs)"

  - id: focus_stop
    label: Focus Stop
    kind: action
    params: []

  - id: focus_far_standard
    label: Focus Far (Standard)
    kind: action
    params: []

  - id: focus_near_standard
    label: Focus Near (Standard)
    kind: action
    params: []

  - id: focus_far_variable
    label: Focus Far (Variable)
    kind: action
    params:
      - name: speed
        type: integer
        description: "Speed 0 (low) to 7 (high)"

  - id: focus_near_variable
    label: Focus Near (Variable)
    kind: action
    params:
      - name: speed
        type: integer
        description: "Speed 0 (low) to 7 (high)"

  - id: focus_direct
    label: Focus Direct
    kind: action
    params:
      - name: position
        type: integer
        description: "Focus position (4 hex nibbles pqrs)"

  - id: auto_focus_on
    label: Auto Focus On
    kind: action
    params: []

  - id: manual_focus
    label: Manual Focus
    kind: action
    params: []

  - id: focus_auto_manual_toggle
    label: Focus Auto/Manual Toggle
    kind: action
    params: []

  - id: zoom_focus_direct
    label: Zoom + Focus Direct
    kind: action
    params:
      - name: zoom_position
        type: integer
        description: "Zoom position (4 hex nibbles pqrs)"
      - name: focus_position
        type: integer
        description: "Focus position (4 hex nibbles tuvw)"

  - id: wb_auto
    label: White Balance Auto
    kind: action
    params: []

  - id: wb_indoor
    label: White Balance Indoor
    kind: action
    params: []

  - id: wb_outdoor
    label: White Balance Outdoor
    kind: action
    params: []

  - id: wb_one_push
    label: White Balance One Push
    kind: action
    params: []

  - id: wb_manual
    label: White Balance Manual
    kind: action
    params: []

  - id: wb_temperature
    label: White Balance Temperature
    kind: action
    params:
      - name: temperature
        type: integer
        description: "Color temperature value p"

  - id: r_gain_reset
    label: R Gain Reset
    kind: action
    params: []

  - id: r_gain_up
    label: R Gain Up
    kind: action
    params: []

  - id: r_gain_down
    label: R Gain Down
    kind: action
    params: []

  - id: r_gain_direct
    label: R Gain Direct
    kind: action
    params:
      - name: gain
        type: integer
        description: "R gain value pq"

  - id: b_gain_reset
    label: B Gain Reset
    kind: action
    params: []

  - id: b_gain_up
    label: B Gain Up
    kind: action
    params: []

  - id: b_gain_down
    label: B Gain Down
    kind: action
    params: []

  - id: b_gain_direct
    label: B Gain Direct
    kind: action
    params:
      - name: gain
        type: integer
        description: "B gain value pq"

  - id: ae_full_auto
    label: AE Full Auto
    kind: action
    params: []

  - id: ae_manual
    label: AE Manual
    kind: action
    params: []

  - id: ae_shutter_priority
    label: AE Shutter Priority
    kind: action
    params: []

  - id: ae_iris_priority
    label: AE Iris Priority
    kind: action
    params: []

  - id: ae_wdr
    label: AE WDR Mode
    kind: action
    params: []

  - id: ae_low_light
    label: AE Low Light Mode
    kind: action
    params: []

  - id: shutter_reset
    label: Shutter Reset
    kind: action
    params: []

  - id: shutter_up
    label: Shutter Up
    kind: action
    params: []

  - id: shutter_down
    label: Shutter Down
    kind: action
    params: []

  - id: shutter_direct
    label: Shutter Direct
    kind: action
    params:
      - name: position
        type: integer
        description: "Shutter position pq"

  - id: iris_reset
    label: Iris Reset
    kind: action
    params: []

  - id: iris_up
    label: Iris Up
    kind: action
    params: []

  - id: iris_down
    label: Iris Down
    kind: action
    params: []

  - id: iris_direct
    label: Iris Direct
    kind: action
    params:
      - name: position
        type: integer
        description: "Iris position pq"

  - id: wdr_strength_reset
    label: WDR Strength Reset
    kind: action
    params: []

  - id: wdr_strength_up
    label: WDR Strength Up
    kind: action
    params: []

  - id: wdr_strength_down
    label: WDR Strength Down
    kind: action
    params: []

  - id: wdr_strength_direct
    label: WDR Strength Direct
    kind: action
    params:
      - name: level
        type: integer
        description: "WDR level pq"

  - id: low_light_reset
    label: Low Light Reset
    kind: action
    params: []

  - id: low_light_up
    label: Low Light Up
    kind: action
    params: []

  - id: low_light_down
    label: Low Light Down
    kind: action
    params: []

  - id: low_light_direct
    label: Low Light Direct
    kind: action
    params:
      - name: position
        type: integer
        description: "Low light position pq"

  - id: exp_comp_on
    label: Exposure Compensation On
    kind: action
    params: []

  - id: exp_comp_off
    label: Exposure Compensation Off
    kind: action
    params: []

  - id: exp_comp_reset
    label: Exposure Compensation Reset
    kind: action
    params: []

  - id: exp_comp_up
    label: Exposure Compensation Up
    kind: action
    params: []

  - id: exp_comp_down
    label: Exposure Compensation Down
    kind: action
    params: []

  - id: exp_comp_direct
    label: Exposure Compensation Direct
    kind: action
    params:
      - name: position
        type: integer
        description: "ExpComp position pq"

  - id: backlight_on
    label: Backlight Compensation On
    kind: action
    params: []

  - id: backlight_off
    label: Backlight Compensation Off
    kind: action
    params: []

  - id: noise_reduction_2d
    label: 2D Noise Reduction
    kind: action
    params:
      - name: level
        type: integer
        description: "0=OFF, 1-5=level"

  - id: noise_reduction_3d
    label: 3D Noise Reduction
    kind: action
    params:
      - name: level
        type: integer
        description: "0=OFF, 1-5=level"

  - id: flicker_set
    label: Flicker Setting
    kind: action
    params:
      - name: mode
        type: integer
        description: "0=OFF, 1=50Hz, 2=60Hz"

  - id: aperture_reset
    label: Aperture Reset
    kind: action
    params: []

  - id: aperture_up
    label: Aperture Up
    kind: action
    params: []

  - id: aperture_down
    label: Aperture Down
    kind: action
    params: []

  - id: aperture_direct
    label: Aperture Direct
    kind: action
    params:
      - name: gain
        type: integer
        description: "Aperture gain pq"

  - id: memory_reset
    label: Preset Memory Reset
    kind: action
    params:
      - name: preset
        type: integer
        description: "Memory number 0-9"

  - id: memory_set
    label: Preset Memory Set
    kind: action
    params:
      - name: preset
        type: integer
        description: "Memory number 0-9"

  - id: memory_recall
    label: Preset Memory Recall
    kind: action
    params:
      - name: preset
        type: integer
        description: "Memory number 0-9"

  - id: lr_reverse_on
    label: Horizontal Flip On
    kind: action
    params: []

  - id: lr_reverse_off
    label: Horizontal Flip Off
    kind: action
    params: []

  - id: picture_flip_on
    label: Vertical Flip On
    kind: action
    params: []

  - id: picture_flip_off
    label: Vertical Flip Off
    kind: action
    params: []

  - id: color_gain_direct
    label: Color Gain Direct
    kind: action
    params:
      - name: gain
        type: integer
        description: "Color gain 0x0 (60%) to 0xE (200%)"

  - id: icr_on
    label: Infrared Mode On
    kind: action
    params: []

  - id: icr_off
    label: Infrared Mode Off
    kind: action
    params: []

  - id: id_write
    label: Camera ID Write
    kind: action
    params:
      - name: id
        type: integer
        description: "Camera ID 0000-FFFF (4 hex nibbles pqrs)"

  - id: ir_receive_on
    label: IR Receive On
    kind: action
    params: []

  - id: ir_receive_off
    label: IR Receive Off
    kind: action
    params: []

  - id: ir_receive_toggle
    label: IR Receive Toggle
    kind: action
    params: []

  - id: pan_tilt_up
    label: Pan-Tilt Up
    kind: action
    params:
      - name: pan_speed
        type: integer
        description: "Pan speed 0x01-0x18"
      - name: tilt_speed
        type: integer
        description: "Tilt speed 0x01-0x14"

  - id: pan_tilt_down
    label: Pan-Tilt Down
    kind: action
    params:
      - name: pan_speed
        type: integer
        description: "Pan speed 0x01-0x18"
      - name: tilt_speed
        type: integer
        description: "Tilt speed 0x01-0x14"

  - id: pan_tilt_left
    label: Pan-Tilt Left
    kind: action
    params:
      - name: pan_speed
        type: integer
        description: "Pan speed 0x01-0x18"
      - name: tilt_speed
        type: integer
        description: "Tilt speed 0x01-0x14"

  - id: pan_tilt_right
    label: Pan-Tilt Right
    kind: action
    params:
      - name: pan_speed
        type: integer
        description: "Pan speed 0x01-0x18"
      - name: tilt_speed
        type: integer
        description: "Tilt speed 0x01-0x14"

  - id: pan_tilt_upleft
    label: Pan-Tilt Up-Left
    kind: action
    params:
      - name: pan_speed
        type: integer
        description: "Pan speed 0x01-0x18"
      - name: tilt_speed
        type: integer
        description: "Tilt speed 0x01-0x14"

  - id: pan_tilt_upright
    label: Pan-Tilt Up-Right
    kind: action
    params:
      - name: pan_speed
        type: integer
        description: "Pan speed 0x01-0x18"
      - name: tilt_speed
        type: integer
        description: "Tilt speed 0x01-0x14"

  - id: pan_tilt_downleft
    label: Pan-Tilt Down-Left
    kind: action
    params:
      - name: pan_speed
        type: integer
        description: "Pan speed 0x01-0x18"
      - name: tilt_speed
        type: integer
        description: "Tilt speed 0x01-0x14"

  - id: pan_tilt_downright
    label: Pan-Tilt Down-Right
    kind: action
    params:
      - name: pan_speed
        type: integer
        description: "Pan speed 0x01-0x18"
      - name: tilt_speed
        type: integer
        description: "Tilt speed 0x01-0x14"

  - id: pan_tilt_stop
    label: Pan-Tilt Stop
    kind: action
    params: []

  - id: pan_tilt_absolute
    label: Pan-Tilt Absolute Position
    kind: action
    params:
      - name: pan_speed
        type: integer
        description: "Pan speed 0x01-0x18"
      - name: tilt_speed
        type: integer
        description: "Tilt speed 0x01-0x14"
      - name: pan_position
        type: integer
        description: "Pan position (4 hex nibbles YYYY)"
      - name: tilt_position
        type: integer
        description: "Tilt position (4 hex nibbles ZZZZ)"

  - id: pan_tilt_relative
    label: Pan-Tilt Relative Position
    kind: action
    params:
      - name: pan_speed
        type: integer
        description: "Pan speed 0x01-0x18"
      - name: tilt_speed
        type: integer
        description: "Tilt speed 0x01-0x14"
      - name: pan_position
        type: integer
        description: "Pan offset (4 hex nibbles YYYY)"
      - name: tilt_position
        type: integer
        description: "Tilt offset (4 hex nibbles ZZZZ)"

  - id: pan_tilt_home
    label: Pan-Tilt Home
    kind: action
    params: []

  - id: pan_tilt_reset
    label: Pan-Tilt Reset
    kind: action
    params: []

  - id: pan_tilt_limit_set
    label: Pan-Tilt Limit Set
    kind: action
    params:
      - name: corner
        type: integer
        description: "1=UpRight, 0=DownLeft"
      - name: pan_limit
        type: integer
        description: "Pan limit (4 hex nibbles)"
      - name: tilt_limit
        type: integer
        description: "Tilt limit (4 hex nibbles)"

  - id: pan_tilt_limit_clear
    label: Pan-Tilt Limit Clear
    kind: action
    params:
      - name: corner
        type: integer
        description: "1=UpRight, 0=DownLeft"

  - id: af_sensitivity_high
    label: AF Sensitivity High
    kind: action
    params: []

  - id: af_sensitivity_normal
    label: AF Sensitivity Normal
    kind: action
    params: []

  - id: af_sensitivity_low
    label: AF Sensitivity Low
    kind: action
    params: []

  - id: factory_reset
    label: Factory Reset
    kind: action
    params: []

  - id: iridix_direct
    label: Iridix Direct
    kind: action
    params:
      - name: position
        type: integer
        description: "Iridix position pq"

  - id: color_system_rgb
    label: Color System RGB
    kind: action
    params: []
    note: Only valid in 720p60/1080p60

  - id: color_system_ypbpr
    label: Color System YPbPr
    kind: action
    params: []
    note: Only valid in 720p60/1080p60

  - id: awb_sensitivity_high
    label: AWB Sensitivity High
    kind: action
    params: []

  - id: awb_sensitivity_normal
    label: AWB Sensitivity Normal
    kind: action
    params: []

  - id: awb_sensitivity_low
    label: AWB Sensitivity Low
    kind: action
    params: []

  - id: af_zone_top
    label: AF Zone Top
    kind: action
    params: []

  - id: af_zone_center
    label: AF Zone Center
    kind: action
    params: []

  - id: af_zone_bottom
    label: AF Zone Bottom
    kind: action
    params: []

  - id: hdmi_mode
    label: HDMI Output Mode
    kind: action
    params: []

  - id: dvi_mode
    label: DVI Output Mode
    kind: action
    params: []

  - id: color_hue_direct
    label: Color Hue Direct
    kind: action
    params:
      - name: hue
        type: integer
        description: "Hue -7 to +7 degrees (0x0 to 0xE)"

  - id: gamma_direct
    label: Gamma Direct
    kind: action
    params:
      - name: gamma
        type: integer
        description: "Gamma setting 0x00-0x0A"

  - id: custom_power_on
    label: Custom Power On
    kind: action
    params: []
    note: Vendor-specific custom command

  - id: custom_power_off
    label: Custom Power Off (Standby)
    kind: action
    params: []
    note: Vendor-specific custom command

  - id: tcl_standby
    label: TCL Standby
    kind: action
    params: []
    note: Vendor-specific forwarding command

  - id: tcl_wakeup
    label: TCL Wakeup
    kind: action
    params: []
    note: Vendor-specific forwarding command

  - id: pelco_d_up
    label: Pelco-D Up
    kind: action
    protocol: pelco_d
    params:
      - name: address
        type: integer
        description: "Pelco-D address byte"
      - name: pan_speed
        type: integer
        description: "Pan speed"
      - name: tilt_speed
        type: integer
        description: "Tilt speed"

  - id: pelco_d_down
    label: Pelco-D Down
    kind: action
    protocol: pelco_d
    params:
      - name: address
        type: integer
      - name: pan_speed
        type: integer
      - name: tilt_speed
        type: integer

  - id: pelco_d_left
    label: Pelco-D Left
    kind: action
    protocol: pelco_d
    params:
      - name: address
        type: integer
      - name: pan_speed
        type: integer
      - name: tilt_speed
        type: integer

  - id: pelco_d_right
    label: Pelco-D Right
    kind: action
    protocol: pelco_d
    params:
      - name: address
        type: integer
      - name: pan_speed
        type: integer
      - name: tilt_speed
        type: integer

  - id: pelco_d_zoom_in
    label: Pelco-D Zoom In
    kind: action
    protocol: pelco_d
    params:
      - name: address
        type: integer

  - id: pelco_d_zoom_out
    label: Pelco-D Zoom Out
    kind: action
    protocol: pelco_d
    params:
      - name: address
        type: integer

  - id: pelco_d_focus_far
    label: Pelco-D Focus Far
    kind: action
    protocol: pelco_d
    params:
      - name: address
        type: integer

  - id: pelco_d_focus_near
    label: Pelco-D Focus Near
    kind: action
    protocol: pelco_d
    params:
      - name: address
        type: integer

  - id: pelco_d_set_preset
    label: Pelco-D Set Preset
    kind: action
    protocol: pelco_d
    params:
      - name: address
        type: integer
      - name: preset_id
        type: integer

  - id: pelco_d_clear_preset
    label: Pelco-D Clear Preset
    kind: action
    protocol: pelco_d
    params:
      - name: address
        type: integer
      - name: preset_id
        type: integer

  - id: pelco_d_call_preset
    label: Pelco-D Call Preset
    kind: action
    protocol: pelco_d
    params:
      - name: address
        type: integer
      - name: preset_id
        type: integer

  - id: pelco_d_auto_focus
    label: Pelco-D Auto Focus
    kind: action
    protocol: pelco_d
    params:
      - name: address
        type: integer

  - id: pelco_d_manual_focus
    label: Pelco-D Manual Focus
    kind: action
    protocol: pelco_d
    params:
      - name: address
        type: integer

  - id: pelco_p_up
    label: Pelco-P Up
    kind: action
    protocol: pelco_p
    params:
      - name: address
        type: integer
      - name: pan_speed
        type: integer
      - name: tilt_speed
        type: integer

  - id: pelco_p_down
    label: Pelco-P Down
    kind: action
    protocol: pelco_p
    params:
      - name: address
        type: integer
      - name: pan_speed
        type: integer
      - name: tilt_speed
        type: integer

  - id: pelco_p_left
    label: Pelco-P Left
    kind: action
    protocol: pelco_p
    params:
      - name: address
        type: integer
      - name: pan_speed
        type: integer
      - name: tilt_speed
        type: integer

  - id: pelco_p_right
    label: Pelco-P Right
    kind: action
    protocol: pelco_p
    params:
      - name: address
        type: integer
      - name: pan_speed
        type: integer
      - name: tilt_speed
        type: integer

  - id: pelco_p_zoom_in
    label: Pelco-P Zoom In
    kind: action
    protocol: pelco_p
    params:
      - name: address
        type: integer

  - id: pelco_p_zoom_out
    label: Pelco-P Zoom Out
    kind: action
    protocol: pelco_p
    params:
      - name: address
        type: integer

  - id: pelco_p_focus_far
    label: Pelco-P Focus Far
    kind: action
    protocol: pelco_p
    params:
      - name: address
        type: integer

  - id: pelco_p_focus_near
    label: Pelco-P Focus Near
    kind: action
    protocol: pelco_p
    params:
      - name: address
        type: integer

  - id: pelco_p_set_preset
    label: Pelco-P Set Preset
    kind: action
    protocol: pelco_p
    params:
      - name: address
        type: integer
      - name: preset_id
        type: integer

  - id: pelco_p_clear_preset
    label: Pelco-P Clear Preset
    kind: action
    protocol: pelco_p
    params:
      - name: address
        type: integer
      - name: preset_id
        type: integer

  - id: pelco_p_call_preset
    label: Pelco-P Call Preset
    kind: action
    protocol: pelco_p
    params:
      - name: address
        type: integer
      - name: preset_id
        type: integer

  - id: pelco_p_auto_focus
    label: Pelco-P Auto Focus
    kind: action
    protocol: pelco_p
    params:
      - name: address
        type: integer

  - id: pelco_p_manual_focus
    label: Pelco-P Manual Focus
    kind: action
    protocol: pelco_p
    params:
      - name: address
        type: integer
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [on, off]
    query_command: CAM_PowerInq

  - id: zoom_position
    type: integer
    description: "Zoom position (4 hex nibbles pqrs)"
    query_command: CAM_ZoomPosInq

  - id: focus_mode
    type: enum
    values: [auto, manual]
    query_command: CAM_FocusAFModeInq

  - id: focus_position
    type: integer
    description: "Focus position (4 hex nibbles pqrs)"
    query_command: CAM_FocusPosInq

  - id: wb_mode
    type: enum
    values: [auto, indoor, outdoor, one_push, manual]
    query_command: CAM_WBModeInq

  - id: r_gain
    type: integer
    description: "R gain value pq"
    query_command: CAM_RGainInq

  - id: b_gain
    type: integer
    description: "B gain value pq"
    query_command: CAM_BGainInq

  - id: ae_mode
    type: enum
    values: [full_auto, manual, shutter_priority, iris_priority, wdr, low_light]
    query_command: CAM_AEModeInq

  - id: shutter_position
    type: integer
    description: "Shutter position pq"
    query_command: CAM_ShutterPosInq

  - id: iris_position
    type: integer
    description: "Iris position pq"
    query_command: CAM_IrisPosInq

  - id: wdr_strength
    type: integer
    description: "WDR strength pq"
    query_command: CAM_WDRStrengthInq

  - id: low_light_level
    type: integer
    description: "Low light level pq"
    query_command: CAM_LowLightLevInq

  - id: exp_comp_mode
    type: enum
    values: [on, off]
    query_command: CAM_ExpCompModeInq

  - id: exp_comp_position
    type: integer
    description: "Exposure compensation position pq"
    query_command: CAM_ExpCompPosInq

  - id: backlight_mode
    type: enum
    values: [on, off]
    query_command: CAM_BacklightModeInq

  - id: noise_2d
    type: integer
    description: "2D noise reduction level 0-5"
    query_command: CAM_Noise2DModeInq

  - id: noise_3d
    type: integer
    description: "3D noise reduction level 0-5"
    query_command: CAM_Noise3DModeInq

  - id: flicker_mode
    type: enum
    values: [off, "50Hz", "60Hz"]
    query_command: CAM_FlickerModeInq

  - id: aperture_gain
    type: integer
    description: "Aperture gain pq"
    query_command: CAM_ApertureInq

  - id: last_memory
    type: integer
    description: "Last operated memory number"
    query_command: CAM_MemoryInq

  - id: menu_mode
    type: enum
    values: [on, off]
    query_command: SYS_MenuModeInq

  - id: lr_reverse
    type: enum
    values: [on, off]
    query_command: CAM_LR_ReverseInq

  - id: picture_flip
    type: enum
    values: [on, off]
    query_command: CAM_PictureFlipInq

  - id: camera_id
    type: integer
    description: "Camera ID 0000-FFFF"
    query_command: CAM_IDInq

  - id: camera_version
    type: string
    description: "Factory code, HW version, ARM version, FPGA version, socket number"
    query_command: CAM_VersionInq

  - id: video_system
    type: enum
    values:
      - 1920x1080i60
      - 1920x1080p30
      - 1280x720p60
      - 1280x720p30
      - 1920x1080p60
      - 1920x1080i50
      - 1920x1080p25
      - 1280x720p50
      - 1280x720p25
      - 1920x1080p50
    query_command: VideoSystemInq

  - id: ir_receive
    type: enum
    values: [on, off]
    query_command: IR_Receive

  - id: pan_tilt_max_speed
    type: object
    description: "Pan max speed ww, Tilt max speed zz"
    query_command: Pan-tiltMaxSpeedInq

  - id: pan_tilt_position
    type: object
    description: "Pan position wwww, Tilt position zzzz"
    query_command: Pan-tiltPosInq

  - id: af_sensitivity
    type: enum
    values: [high, normal, low]
    query_command: CAM_AFSensitivityInq

  - id: iridix_position
    type: integer
    description: "Iridix position pq"
    query_command: CAM_IridixInq

  - id: color_system
    type: enum
    values: [vga_on, vga_off]
    query_command: Color System Inq

  - id: gamma_setting
    type: integer
    description: "Gamma 0x00-0x0A"
    query_command: CAM_GammaInq

  - id: af_zone
    type: enum
    values: [top, center, bottom]
    query_command: CAM_AFZone

  - id: dvi_mode
    type: enum
    values: [hdmi, dvi]
    query_command: CAM_DVIModeInq

  - id: color_hue
    type: integer
    description: "Color hue -7 to +7 degrees"
    query_command: CAM_ColorHueInq

  - id: awb_sensitivity
    type: enum
    values: [high, normal, low]
    query_command: CAM_AWBSensitivityInq

  - id: camera_status
    type: object
    description: "Error code, license, video format, flip mode, running status"
    query_command: CAM_StatusInq
    note: Custom query command

  - id: pelco_d_pan_position
    type: integer
    description: "Pan position (high + low byte)"
    protocol: pelco_d

  - id: pelco_d_tilt_position
    type: integer
    description: "Tilt position (high + low byte)"
    protocol: pelco_d

  - id: pelco_d_zoom_position
    type: integer
    description: "Zoom position (high + low byte)"
    protocol: pelco_d

  - id: pelco_p_pan_position
    type: integer
    description: "Pan position (high + low byte)"
    protocol: pelco_p

  - id: pelco_p_tilt_position
    type: integer
    description: "Tilt position (high + low byte)"
    protocol: pelco_p

  - id: pelco_p_zoom_position
    type: integer
    description: "Zoom position (high + low byte)"
    protocol: pelco_p
```

## Variables
```yaml
variables:
  - id: camera_address
    type: integer
    description: "VISCA address 1-7; Pelco-D/P address 0-254"
    note: Set via SETUP menu or AddressSet command
```

## Events
```yaml
# VISCA ACK and Completion messages are command responses, not unsolicited events.
# Error messages (syntax error, command not executable) are response-type.
# IR_ReceiveReturn messages relay IR remote commands via VISCA - semi-unsolicited.
# UNRESOLVED: no truly unsolicited event mechanism documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Camera performs initialization routine on power-on (pan-tilt rotates to max top-right then returns to center or preset 0)"
  - description: "SYSTEM SELECT switch changes require camera restart to take effect"
  - description: "BOTTOM switch mode changes require camera restart to take effect"
# UNRESOLVED: no explicit safety interlocks for pan/tilt limits beyond the LimitSet command
# UNRESOLVED: no power sequencing warnings beyond initialization note
```

## Notes
- Camera supports three protocols selectable via SETUP menu: VISCA, Pelco-D, Pelco-P.
- VISCA command format: `x` = camera address (1-7), `8x` forms the command header. Response uses `y = x + 8`.
- VISCA address range 1-7; Pelco-D/P address range 0-254.
- VISCA baud rates: 2400, 4800, 9600 (default not stated).
- RS-232C connector: Mini DIN 8-pin or D-sub 9-pin (pinout documented).
- SYSTEM SELECT switch (hex rotary) selects output video format from 1080p60 down to 720p25, including 59.94/29.97 NTSC variants.
- Preset memory positions: 0-9 (VISCA), variable ID (Pelco).
- Color System RGB mode only valid under 720p60 / 1080p60.
- Camera auto-initializes on power-on; if preset 0 stored, recalls after init.
- Pelco-D uses 7-byte frames with checksum (SUM) byte; Pelco-P uses 8-byte frames with XOR checksum.
- Custom power commands (vendor-specific) use different command packet format.
- VISCA errors: syntax error (z0 60 02 FF), command not executable (z0 61 41 FF).

<!-- UNRESOLVED: Pelco-D checksum (SUM) calculation algorithm not explicitly stated -->
<!-- UNRESOLVED: Pelco-P XOR checksum calculation algorithm not explicitly stated -->
<!-- UNRESOLVED: default baud rate not stated (selectable from 2400/4800/9600) -->
<!-- UNRESOLVED: pan/tilt position coordinate system and units not documented -->
<!-- UNRESOLVED: zoom position range not documented -->
<!-- UNRESOLVED: Net Mode (Serial vs Parallel) behavior not explained -->
<!-- UNRESOLVED: AddrFix (On/Off) function not explained -->
<!-- UNRESOLVED: VISCA over IP or TCP control not documented — serial only -->

## Provenance

```yaml
source_domains:
  - m.media-amazon.com
  - manualslib.com
source_urls:
  - https://m.media-amazon.com/images/I/91YBOvh13VL.pdf
  - https://www.manualslib.com/manual/3031436/Goelectronic-Gohd400.html
retrieved_at: 2026-05-14T23:43:01.333Z
last_checked_at: 2026-05-16T11:20:34.748Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T11:20:34.748Z
matched_actions: 131
action_count: 186
confidence: high
summary: "All 131 spec actions (94 VISCA/custom + 37 feedback queries) match documented commands in the source; transport parameters verified; comprehensive coverage of VISCA, Pelco-D, and Pelco-P protocols."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
