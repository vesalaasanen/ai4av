---
spec_id: admin/vaddio-roboshot-qusb-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio RoboSHOT QUSB Series Control Spec"
manufacturer: Vaddio
model_family: "RoboSHOT QUSB Series"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "RoboSHOT QUSB Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - fullcompass.com
  - res.cloudinary.com
source_urls:
  - https://www.fullcompass.com/common/files/21194-VaddioClearVIEWHDUSBPTZincl9986990000Manual.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/999-5675-000_Manual.pdf"
retrieved_at: 2026-05-14T04:19:00.221Z
last_checked_at: 2026-05-31T22:44:27.877Z
generated_at: 2026-05-31T22:44:27.877Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:44:27.877Z
  matched_actions: 166
  action_count: 166
  confidence: high
  summary: "All 166 spec action ids map cleanly to VISCA and telnet command sources; transport parameters (9600 8N1 serial + port 23 telnet) verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Vaddio RoboSHOT QUSB Series Control Spec

## Summary
PTZ camera supporting RS-232 serial and TCP/IP (Telnet) control. Protocol derived from Sony VISCA but with Vaddio-specific extensions. Serial:9600 8N1. Telnet: port 23, requires admin credentials.

<!-- UNRESOLVED: default admin password not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # default Telnet port; inferred from "default Telnet Port is 23"
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: username_password  # UNRESOLVED: source says Telnet requires admin credentials but does not state defaults
```

## Traits
```yaml
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
- id: address_set
  label: Address Set (Broadcast)
  kind: action
  params: []
- id: if_clear
  label: IF Clear (Broadcast)
  kind: action
  params: []
- id: command_cancel
  label: Command Cancel
  kind: action
  params:
    - name: socket
      type: integer
      description: Socket number (1-2)
- id: cam_power_on
  label: Power On
  kind: action
  params: []
- id: cam_power_off
  label: Power Off
  kind: action
  params: []
- id: cam_zoom_stop
  label: Zoom Stop
  kind: action
  params: []
- id: cam_zoom_tele_std
  label: Tele Zoom (Standard Speed)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (low) to 7 (high)
- id: cam_zoom_wide_std
  label: Wide Zoom (Standard Speed)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (low) to 7 (high)
- id: cam_zoom_tele_variable
  label: Tele Zoom (Variable Speed)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (low) to 7 (high)
- id: cam_zoom_wide_variable
  label: Wide Zoom (Variable Speed)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (low) to 7 (high)
- id: cam_zoom_direct
  label: Direct Zoom
  kind: action
  params:
    - name: position
      type: integer
      description: Zoom position (0h-4000h)
- id: cam_focus_stop
  label: Focus Stop
  kind: action
  params: []
- id: cam_focus_far_std
  label: Far Focus (Standard)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (low) to 7 (high)
- id: cam_focus_near_std
  label: Near Focus (Standard)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (low) to 7 (high)
- id: cam_focus_far_variable
  label: Far Focus (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (low) to 7 (high)
- id: cam_focus_near_variable
  label: Near Focus (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: Speed 0 (low) to 7 (high)
- id: cam_focus_direct
  label: Direct Focus
  kind: action
  params:
    - name: position
      type: integer
      description: Focus position (1000h-F000h)
- id: cam_focus_auto  label: Auto Focus
  kind: action
  params: []
- id: cam_focus_manual
  label: Manual Focus
  kind: action
  params: []
- id: cam_focus_auto_manual_toggle
  label: Auto/Manual Focus Toggle
  kind: action
  params: []
- id: cam_focus_one_push_trigger
  label: One Push AF Trigger
  kind: action
  params: []
- id: cam_focus_near_limit
  label: Near Focus Limit
  kind: action
  params:
    - name: position
      type: integer
      description: Near limit position (pqrs)
- id: cam_af_sensitivity_normal
  label: AF Sensitivity Normal
  kind: action
  params: []
- id: cam_af_sensitivity_low
  label: AF Sensitivity Low
  kind: action
  params: []
- id: cam_af_mode_normal
  label: Normal AF Mode
  kind: action
  params: []
- id: cam_af_mode_interval  label: Interval AF Mode
  kind: action
  params: []
- id: cam_af_mode_zoom_trigger
  label: Zoom Trigger AF Mode
  kind: action
  params: []
- id: cam_af_mode_interval_time
  label: AF Interval Time
  kind: action
  params:
    - name: movement_time
      type: integer
      description: Movement time (pq)
    - name: interval
      type: integer
      description: Interval (rs)
- id: cam_ir_correction_standard
  label: IR Correction Standard
  kind: action
  params: []
- id: cam_ir_correction_ir_light
  label: IR Correction IR Light
  kind: action
  params: []
- id: cam_zoom_focus_direct
  label: Direct Zoom+Focus
  kind: action
  params:
    - name: zoom_position
      type: integer
      description: Zoom position (0h-4000h)
    - name: focus_position
      type: integer
      description: Focus position (1000h-F000h)
- id: cam_wb_auto
  label: White Balance Auto
  kind: action
  params: []
- id: cam_wb_indoor
  label: White Balance Indoor
  kind: action
  params: []
- id: cam_wb_outdoor
  label: White Balance Outdoor
  kind: action
  params: []
- id: cam_wb_one_push
  label: White Balance One Push
  kind: action
  params: []
- id: cam_wb_atw
  label: White Balance ATW
  kind: action
  params: []
- id: cam_wb_manual
  label: White Balance Manual
  kind: action
  params: []
- id: cam_wb_one_push_trigger
  label: White Balance One Push Trigger
  kind: action
  params: []
- id: cam_wb_outdoor_auto
  label: White Balance Outdoor Auto
  kind: action
  params: []
- id: cam_wb_sodium_lamp_auto
  label: White Balance Sodium Lamp Auto
  kind: action
  params: []
- id: cam_wb_sodium_lamp
  label: White Balance Sodium Lamp
  kind: action
  params: []
- id: cam_wb_sodium_lamp_outdoor_auto
  label: White Balance Sodium Lamp Outdoor Auto
  kind: action
  params: []
- id: cam_rgain_reset
  label: Red Gain Reset
  kind: action
  params: []
- id: cam_rgain_up
  label: Red Gain Up
  kind: action
  params: []
- id: cam_rgain_down
  label: Red Gain Down
  kind: action
  params: []
- id: cam_rgain_direct
  label: Direct Red Gain
  kind: action
  params:
    - name: gain
      type: integer
      description: Red gain (00h-FFh)
- id: cam_bgain_reset
  label: Blue Gain Reset
  kind: action
  params: []
- id: cam_bgain_up
  label: Blue Gain Up
  kind: action
  params: []
- id: cam_bgain_down
  label: Blue Gain Down
  kind: action
  params: []
- id: cam_bgain_direct
  label: Direct Blue Gain
  kind: action
  params:
    - name: gain
      type: integer
      description: Blue gain (00h-FFh)
- id: cam_ae_full_auto
  label: Exposure Full Auto
  kind: action
  params: []
- id: cam_ae_manual
  label: Exposure Manual
  kind: action
  params: []
- id: cam_ae_shutter_priority
  label: Exposure Shutter Priority
  kind: action
  params: []
- id: cam_ae_iris_priority
  label: Exposure Iris Priority
  kind: action
  params: []
- id: cam_ae_bright
  label: Exposure Bright Mode
  kind: action
  params: []
- id: cam_shutter_reset
  label: Shutter Reset
  kind: action
  params: []
- id: cam_shutter_up
  label: Shutter Up
  kind: action
  params: []
- id: cam_shutter_down
  label: Shutter Down
  kind: action
  params: []
- id: cam_shutter_direct
  label: Direct Shutter
  kind: action
  params:
    - name: position
      type: integer
      description: Shutter position (00h-15h)
- id: cam_iris_reset
  label: Iris Reset
  kind: action
  params: []
- id: cam_iris_up
  label: Iris Up
  kind: action
  params: []
- id: cam_iris_down
  label: Iris Down
  kind: action
  params: []
- id: cam_iris_direct
  label: Direct Iris
  kind: action
  params:
    - name: position
      type: integer
      description: Iris position (pq)
- id: cam_gain_reset
  label: Gain Reset
  kind: action
  params: []
- id: cam_gain_up
  label: Gain Up
  kind: action
  params: []
- id: cam_gain_down
  label: Gain Down
  kind: action
  params: []
- id: cam_gain_direct
  label: Direct Gain
  kind: action
  params:
    - name: position
      type: integer
      description: Gain position (01h-0Fh)
- id: cam_gain_limit  label: Gain Limit
  kind: action
  params:
    - name: limit
      type: integer
      description: Gain limit
- id: cam_expcomp_on
  label: Exposure Compensation On
  kind: action
  params: []
- id: cam_expcomp_off
  label: Exposure Compensation Off
  kind: action
  params: []
- id: cam_expcomp_reset
  label: Exposure Compensation Reset
  kind: action
  params: []
- id: cam_expcomp_up
  label: Exposure Compensation Up
  kind: action
  params: []
- id: cam_expcomp_down
  label: Exposure Compensation Down
  kind: action
  params: []
- id: cam_expcomp_direct
  label: Direct Exposure Compensation
  kind: action
  params:
    - name: position
      type: integer
      description: ExpComp position (pq)
- id: cam_backlight_on
  label: Backlight Compensation On
  kind: action
  params: []
- id: cam_backlight_off
  label: Backlight Compensation Off
  kind: action
  params: []
- id: cam_tally_on
  label: Tally On
  kind: action
  params: []
- id: cam_tally_off
  label: Tally Off
  kind: action
  params: []
- id: cam_spot_ae_on
  label: Spot AE On
  kind: action
  params: []
- id: cam_spot_ae_off
  label: Spot AE Off
  kind: action
  params: []
- id: cam_spot_ae_position
  label: Spot AE Position
  kind: action
  params:
    - name: x      type: integer
      description: X position (0h-Fh)
    - name: y
      type: integer
      description: Y position (0h-Fh)
- id: cam_wd_on
  label: WD On
  kind: action
  params: []
- id: cam_wd_off
  label: WD Off
  kind: action
  params: []
- id: cam_wd_ve_on
  label: WD VE On
  kind: action
  params: []
- id: cam_wd_set_parameter
  label: WD Set Parameter
  kind: action
  params:
    - name: brightness
      type: integer
      description: Display brightness level (0-6)
    - name: comp_selection
      type: integer
      description: Brightness compensation selection (0:Very dark, 1:Dark, 2:std, 3:bright)
    - name: comp_level
      type: integer
      description: Compensation level (0:Low, 1:Mid, 2:High)
- id: cam_aperture_reset
  label: Aperture Reset
  kind: action
  params: []
- id: cam_aperture_up
  label: Aperture Up
  kind: action
  params: []
- id: cam_aperture_down
  label: Aperture Down
  kind: action
  params: []
- id: cam_aperture_direct
  label: Direct Aperture
  kind: action
  params:
    - name: position
      type: integer
      description: Aperture position (pq)
- id: cam_hr_on
  label: High Resolution Mode On
  kind: action
  params: []
- id: cam_hr_off
  label: High Resolution Mode Off
  kind: action
  params: []
- id: cam_nr
  label: Noise Reduction
  kind: action
  params:
    - name: level
      type: integer
      description: Noise reduction level (0:Off, 1-5)
- id: cam_gamma
  label: Gamma
  kind: action
  params:
    - name: setting
      type: integer
      description: Gamma setting (0:std, 1:Straight)
- id: cam_lr_reverse_on
  label: LR Reverse On (Mirror)
  kind: action
  params: []
- id: cam_lr_reverse_off
  label: LR Reverse Off
  kind: action
  params: []
- id: cam_freeze_on
  label: Freeze On
  kind: action
  params: []
- id: cam_freeze_off
  label: Freeze Off
  kind: action
  params: []
- id: cam_picture_effect_off
  label: Picture Effect Off
  kind: action
  params: []
- id: cam_picture_effect_neg_art
  label: Picture Effect Neg Art
  kind: action
  params: []
- id: cam_picture_effect_bw
  label: Picture Effect Black & White
  kind: action
  params: []
- id: cam_picture_flip_on
  label: Image Flip On
  kind: action
  params: []
- id: cam_picture_flip_off
  label: Image Flip Off
  kind: action
  params: []
- id: cam_icr_on
  label: ICR Mode On
  kind: action
  params: []
- id: cam_icr_off
  label: ICR Mode Off
  kind: action
  params: []
- id: cam_id_write
  label: Camera ID Write
  kind: action
  params:
    - name: id
      type: integer
      description: Camera ID (0h-FFFFh)
- id: cam_memory_reset
  label: Memory Reset
  kind: action
  params:
    - name: preset      type: integer
      description: Preset number (0-0x0F)
- id: cam_memory_set_standard
  label: Memory Set Standard
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0-0x0F)
- id: cam_memory_set_standard_scene
  label: Memory Set Standard with Scene
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0-0x0F)
- id: cam_memory_set_trisync
  label: Memory Set Tri-Sync
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0-0x0F)
    - name: speed
      type: integer
      description: Speed (0x01-0xFF)
- id: cam_memory_set_trisync_scene
  label: Memory Set Tri-Sync with Scene
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0-0x0F)
    - name: speed
      type: integer
      description: Speed (0x01-0xFF)
- id: cam_memory_recall_standard
  label: Memory Recall Standard
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0-0x0F)
- id: cam_memory_recall_trisync
  label: Memory Recall Tri-Sync
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0-0x0F)
    - name: speed
      type: integer
      description: Speed (0x01-0xFF)
- id: cam_display_on
  label: Display On
  kind: action
  params: []
- id: cam_display_on_alternate
  label: Display On (Alternate)
  kind: action
  params: []
- id: cam_display_off
  label: Display Off
  kind: action
  params: []
- id: cam_display_off_alternate
  label: Display Off (Alternate)
  kind: action
  params: []
- id: cam_display_on_off
  label: Display On/Off
  kind: action
  params: []
- id: cam_display_on_off_alternate
  label: Display On/Off (Alternate)
  kind: action
  params: []
- id: cam_mute_on
  label: Mute On
  kind: action
  params: []
- id: cam_mute_off
  label: Mute Off
  kind: action
  params: []
- id: cam_mute_on_off
  label: Mute On/Off
  kind: action
  params: []
- id: cam_color_enhance_set  label: Color Enhancement Set Parameter
  kind: action
  params:
    - name: threshold
      type: integer
      description: Threshold level (01h-7Fh)
    - name: y_high
      type: integer
      description: Y fixed color for high-intensity
    - name: cr_high
      type: integer
      description: Cr fixed color for high-intensity
    - name: cb_high
      type: integer
      description: Cb fixed color for high-intensity
    - name: y_low
      type: integer
      description: Y fixed color for low-intensity
    - name: cr_low
      type: integer
      description: Cr fixed color for low-intensity
    - name: cb_low
      type: integer
      description: Cb fixed color for low-intensity
- id: cam_color_enhance_on
  label: Color Enhancement On
  kind: action
  params: []
- id: cam_color_enhance_off
  label: Color Enhancement Off
  kind: action
  params: []
- id: cam_chroma_suppress
  label: Chroma Suppress
  kind: action
  params:
    - name: level
      type: integer
      description: Chroma suppress level (00:Off, 01h-03h:On)
- id: cam_color_gain_direct
  label: Direct Color Gain
  kind: action
  params:
    - name: gain
      type: integer
      description: Color gain (0h-4h)
- id: cam_color_hue_direct
  label: Direct Color Hue
  kind: action
  params:
    - name: hue
      type: integer
      description: Color hue (0h:-14deg to Eh:+14deg)
- id: cam_gamma_offset_direct
  label: Direct Gamma Offset
  kind: action
  params:
    - name: polarity
      type: integer
      description: Polarity offset (0:plus, 1:minus)
    - name: offset
      type: integer
      description: Offset (RoboSHOT 12: 00h-10h, RoboSHOT 30: 00h-40h)
- id: pantilt_up
  label: Pan-Tilt Up
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (vv)
    - name: tilt_speed
      type: integer
      description: Tilt speed (ww)
- id: pantilt_down
  label: Pan-Tilt Down
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (vv)
    - name: tilt_speed
      type: integer
      description: Tilt speed (ww)
- id: pantilt_left
  label: Pan-Tilt Left
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (vv)
    - name: tilt_speed
      type: integer
      description: Tilt speed (ww)
- id: pantilt_right
  label: Pan-Tilt Right
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (vv)
    - name: tilt_speed
      type: integer
      description: Tilt speed (ww)
- id: pantilt_upleft
  label: Pan-Tilt UpLeft
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (vv)
    - name: tilt_speed
      type: integer
      description: Tilt speed (ww)
- id: pantilt_upright
  label: Pan-Tilt UpRight
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (vv)
    - name: tilt_speed
      type: integer
      description: Tilt speed (ww)
- id: pantilt_downleft
  label: Pan-Tilt DownLeft
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (vv)
    - name: tilt_speed
      type: integer
      description: Tilt speed (ww)
- id: pantilt_downright
  label: Pan-Tilt DownRight
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (vv)
    - name: tilt_speed
      type: integer
      description: Tilt speed (ww)
- id: pantilt_stop
  label: Pan-Tilt Stop
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (vv)
    - name: tilt_speed
      type: integer
      description: Tilt speed (ww)
- id: pantilt_abs
  label: Pan-Tilt Absolute Position
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (vv)
    - name: tilt_speed
      type: integer
      description: Tilt speed (ww)
    - name: pan_position
      type: integer
      description: Pan position (0Y0Y0Y0Y)
    - name: tilt_position
      type: integer
      description: Tilt position (0Z0Z0Z0Z)
- id: pantilt_home
  label: Pan-Tilt Home
  kind: action
  params: []
- id: pantilt_zoom_up
  label: Pan-Tilt-Zoom Up
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (vv)
    - name: tilt_speed
      type: integer
      description: Tilt speed (ww)
    - name: zoom_speed
      type: integer
      description: Zoom speed (rr)
- id: pantilt_zoom_down
  label: Pan-Tilt-Zoom Down
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (vv)
    - name: tilt_speed
      type: integer
      description: Tilt speed (ww)
    - name: zoom_speed
      type: integer
      description: Zoom speed (rr)
- id: pantilt_zoom_left
  label: Pan-Tilt-Zoom Left
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (vv)
    - name: tilt_speed
      type: integer
      description: Tilt speed (ww)
    - name: zoom_speed
      type: integer
      description: Zoom speed (rr)
- id: pantilt_zoom_right
  label: Pan-Tilt-Zoom Right
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (vv)
    - name: tilt_speed
      type: integer
      description: Tilt speed (ww)
    - name: zoom_speed
      type: integer
      description: Zoom speed (rr)
- id: pantilt_zoom_in
  label: Pan-Tilt-Zoom In
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (vv)
    - name: tilt_speed
      type: integer
      description: Tilt speed (ww)
    - name: zoom_speed
      type: integer
      description: Zoom speed (rr)
- id: pantilt_zoom_out
  label: Pan-Tilt-Zoom Out
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (vv)
    - name: tilt_speed
      type: integer
      description: Tilt speed (ww)
    - name: zoom_speed
      type: integer
      description: Zoom speed (rr)
- id: pantilt_zoom_stop
  label: Pan-Tilt-Zoom Stop
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (vv)
    - name: tilt_speed
      type: integer
      description: Tilt speed (ww)
    - name: zoom_speed
      type: integer
      description: Zoom speed (rr)
- id: pantilt_zoom_abs
  label: Pan-Tilt-Zoom Absolute Position
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (0x01-0x18)
    - name: tilt_speed
      type: integer
      description: Tilt speed (0x01-0x14)
    - name: pan_position
      type: integer
      description: Pan position (0Y0Y0Y0Y)
    - name: tilt_position
      type: integer
      description: Tilt position (0Z0Z0Z0Z)
    - name: zoom_position
      type: integer
      description: Zoom position (0R0R0R0R)
- id: pantilt_zoom_home
  label: Pan-Tilt-Zoom Home
  kind: action
  params: []
- id: cam_ptz_preset_speed
  label: PTZ Preset Speed
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: Pan speed (pp)
    - name: tilt_speed
      type: integer
      description: Tilt speed (qq)
    - name: zoom_speed
      type: integer
      description: Zoom speed (rr)
- id: telnet_camera_home
  label: Telnet Camera Home
  kind: action
  params: []
- id: telnet_camera_pan
  label: Telnet Camera Pan
  kind: action
  params:
    - name: direction
      type: string
      enum: [left, right, stop]
    - name: speed
      type: integer
      description: Speed 1-24 (default 12)
- id: telnet_camera_tilt
  label: Telnet Camera Tilt
  kind: action
  params:
    - name: direction
      type: string
      enum: [up, down, stop]
    - name: speed
      type: integer
      description: Speed 1-20 (default 10)
- id: telnet_camera_zoom
  label: Telnet Camera Zoom
  kind: action
  params:
    - name: direction
      type: string
      enum: [in, out, stop]
    - name: speed
      type: integer
      description: Speed 1-7 (default 3)
- id: telnet_camera_focus
  label: Telnet Camera Focus
  kind: action
  params:
    - name: direction
      type: string
      enum: [near, far, stop]
    - name: speed
      type: integer
      description: Speed 1-8 (default varies)
- id: telnet_camera_focus_mode
  label: Telnet Camera Focus Mode  kind: action
  params:
    - name: mode
      type: string
      enum: [auto, manual]
- id: telnet_camera_preset_recall
  label: Telnet Camera Preset Recall
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-12
- id: telnet_camera_preset_store
  label: Telnet Camera Preset Store
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-12
    - name: mode
      type: string
      enum: [tri-sync]
      description: Optional mode
    - name: speed
      type: integer
      description: Optional speed
- id: telnet_camera_standby_toggle
  label: Telnet Camera Standby Toggle
  kind: action
  params: []
- id: telnet_camera_ccu_set
  label: Telnet Camera CCU Set
  kind: action
  params:
    - name: parameter
      type: string
      enum: [auto_white_balance, red_gain, blue_gain, backlight_compensation, auto_iris, iris, gain, detail, chroma]
    - name: value
      type: string
      description: on/off or0-255
- id: telnet_camera_ccu_scene_recall
  label: Telnet Camera CCU Scene Recall
  kind: action
  params:
    - name: scene_type
      type: string
      enum: [factory, custom]
    - name: scene_num
      type: integer
      description: Factory 1-6 or Custom 1-3
- id: telnet_camera_ccu_scene_store
  label: Telnet Camera CCU Scene Store
  kind: action
  params:
    - name: scene_num
      type: integer
      description: Scene 1-3
- id: telnet_system_factory_reset
  label: Telnet System Factory Reset
  kind: action
  params:
    - name: action
      type: string
      enum: [get, on, off]
- id: telnet_system_reboot
  label: Telnet System Reboot
  kind: action
  params:
    - name: seconds
      type: integer
      description: Optional delay in seconds
- id: telnet_system_update
  label: Telnet System Update
  kind: action
  params:
    - name: url
      type: string
      description: URL to update file
- id: telnet_network_ping
  label: Telnet Network Ping
  kind: action
  params:
    - name: destination_ip
      type: string
    - name: count
      type: integer
      description: Packet count (default 5)
    - name: size
      type: integer
      description: Packet size (default 56)
- id: telnet_network_settings_get
  label: Telnet Network Settings Get
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: cam_power_inq
  label: Power Status Query
  kind: query
  params: []
  response_values: [on, off]
- id: cam_zoom_pos_inq
  label: Zoom Position Query
  kind: query
  params: []
- id: cam_focus_mode_inq
  label: Focus Mode Query
  kind: query
  params: []
  response_values: [auto_focus, manual_focus]
- id: cam_focus_pos_inq
  label: Focus Position Query
  kind: query
  params: []
- id: cam_focus_near_limit_inq
  label: Focus Near Limit Query
  kind: query
  params: []
- id: cam_af_sensitivity_inq
  label: AF Sensitivity Query
  kind: query
  params: []
  response_values: [normal, low]
- id: cam_af_mode_inq
  label: AF Mode Query
  kind: query
  params: []
  response_values: [normal_af, interval_af, zoom_trigger_af]
- id: cam_af_time_setting_inq
  label: AF Time Setting Query
  kind: query
  params: []
- id: cam_ir_correction_inq
  label: IR Correction Query
  kind: query
  params: []
  response_values: [standard, ir_light]
- id: cam_wb_mode_inq
  label: White Balance Mode Query
  kind: query
  params: []
  response_values: [auto, indoor, outdoor, one_push_wb, atw, manual, outdoor_auto, sodium_lamp_auto, sodium_lamp, sodium_lamp_outdoor_auto]
- id: cam_rgain_inq
  label: Red Gain Query
  kind: query
  params: []
- id: cam_bgain_inq
  label: Blue Gain Query
  kind: query
  params: []
- id: cam_ae_mode_inq
  label: AE Mode Query
  kind: query
  params: []
  response_values: [full_auto, manual, shutter_priority, iris_priority, bright]
- id: cam_shutter_pos_inq
  label: Shutter Position Query
  kind: query
  params: []
- id: cam_iris_pos_inq
  label: Iris Position Query
  kind: query
  params: []
- id: cam_gain_pos_inq
  label: Gain Position Query
  kind: query
  params: []
- id: cam_gain_limit_inq
  label: Gain Limit Query
  kind: query
  params: []
- id: cam_expcomp_mode_inq
  label: ExpComp Mode Query
  kind: query
  params: []
  response_values: [on, off]
- id: cam_expcomp_pos_inq
  label: ExpComp Position Query
  kind: query
  params: []
- id: cam_backlight_mode_inq
  label: Backlight Mode Query
  kind: query
  params: []
  response_values: [on, off]
- id: cam_tally_inq
  label: Tally Query
  kind: query
  params: []
  response_values: [on, off]
- id: cam_resolution_inq
  label: Resolution Query
  kind: query
  params: []
- id: cam_spot_ae_mode_inq
  label: Spot AE Mode Query
  kind: query
  params: []
  response_values: [on, off]
- id: cam_spot_ae_pos_inq
  label: Spot AE Position Query
  kind: query
  params: []
- id: cam_wd_mode_inq
  label: WD Mode Query
  kind: query
  params: []
  response_values: [on, off, ve_on]
- id: cam_wd_parameter_inq
  label: WD Parameter Query
  kind: query
  params: []
- id: cam_aperture_inq
  label: Aperture Query
  kind: query
  params: []
- id: cam_hr_mode_inq
  label: High Resolution Mode Query
  kind: query
  params: []
  response_values: [on, off]
- id: cam_nr_inq
  label: Noise Reduction Query
  kind: query
  params: []
  response_values: [0, 1, 2, 3, 4, 5]
- id: cam_gamma_inq
  label: Gamma Query
  kind: query
  params: []
  response_values: [std, straight]
- id: cam_lr_reverse_mode_inq
  label: LR Reverse Mode Query
  kind: query
  params: []
  response_values: [on, off]
- id: cam_freeze_mode_inq
  label: Freeze Mode Query
  kind: query
  params: []
  response_values: [on, off]
- id: cam_picture_effect_mode_inq
  label: Picture Effect Mode Query
  kind: query
  params: []
  response_values: [off, neg_art, bw]
- id: cam_picture_flip_mode_inq
  label: Picture Flip Mode Query
  kind: query
  params: []
  response_values: [on, off]
- id: cam_icr_mode_inq
  label: ICR Mode Query
  kind: query
  params: []
  response_values: [on, off]
- id: cam_memory_inq
  label: Memory Query
  kind: query
  params: []
- id: cam_memory_status_inq
  label: Memory Status Query
  kind: query
  params:
    - name: memory_num
      type: integer
- id: cam_mem_save_inq
  label: Memory Save Query  kind: query
  params:
    - name: address
      type: integer
      description: Address (00h-07h)
- id: cam_display_mode_inq
  label: Display Mode Query
  kind: query
  params: []
  response_values: [on, off]
- id: cam_mute_mode_inq
  label: Mute Mode Query
  kind: query
  params: []
  response_values: [on, off]
- id: cam_id_inq
  label: Camera ID Query
  kind: query
  params: []
- id: cam_version_inq
  label: Version Query
  kind: query
  params: []
- id: vaddio_model_inq
  label: Vaddio Model Query
  kind: query
  params: []
  response_values: [roboshot_12, roboshot_30]
- id: cam_register_value_inq
  label: Register Value Query
  kind: query
  params:
    - name: register
      type: integer
      description: Register number (00h-7Fh)
- id: cam_color_enhance_inq
  label: Color Enhancement Query
  kind: query
  params: []
  response_values: [on, off]
- id: cam_chroma_suppress_inq
  label: Chroma Suppress Query
  kind: query
  params: []
- id: cam_color_gain_inq
  label: Color Gain Query
  kind: query
  params: []
- id: cam_color_hue_inq
  label: Color Hue Query
  kind: query
  params: []
- id: cam_temp_inq
  label: Temperature Query
  kind: query
  params: []
- id: cam_gamma_offset_inq
  label: Gamma Offset Query
  kind: query
  params: []
- id: pantilt_pos_inq
  label: Pan-Tilt Position Query
  kind: query
  params: []
- id: telnet_camera_ccu_get
  label: Telnet Camera CCU Get
  kind: query
  params:
    - name: parameter
      type: string
      enum: [auto_white_balance, red_gain, blue_gain, backlight_compensation, auto_iris, iris, gain, detail, chroma]
- id: telnet_camera_ccu_scene_get
  label: Telnet Camera CCU Scene Get
  kind: query
  params: []
- id: telnet_network_settings_get_response
  label: Telnet Network Settings Get Response
  kind: query
  params: []
- id: telnet_system_factory_reset_get
  label: Telnet System Factory Reset Get
  kind: query
  params: []
- id: telnet_version
  label: Telnet Version  kind: query
  params: []
```

## Variables
```yaml
# All settable parameters are covered via Actions. Telnet API uses get/set
# commands mapped above.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
<!-- UNRESOLVED: no safety warnings or interlock procedures in source -->
```

## Notes
VISCA-derived protocol. Not all Sony VISCA commands supported; Vaddio adds many extensions. Telnet API uses ASCII text commands over port 23 with admin auth (same credentials as embedded web server). Serial API uses binary packets with 8xyy format addresses. Both interfaces share the same command semantics — queries on serial use8x prefix, Telnet uses "camera ccu get" style text commands. Two-byte shortcut codes (Ctrl+5) clear the serial buffer on the device.

## Provenance

```yaml
source_domains:
  - fullcompass.com
  - res.cloudinary.com
source_urls:
  - https://www.fullcompass.com/common/files/21194-VaddioClearVIEWHDUSBPTZincl9986990000Manual.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/999-5675-000_Manual.pdf"
retrieved_at: 2026-05-14T04:19:00.221Z
last_checked_at: 2026-05-31T22:44:27.877Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:44:27.877Z
matched_actions: 166
action_count: 166
confidence: high
summary: "All 166 spec action ids map cleanly to VISCA and telnet command sources; transport parameters (9600 8N1 serial + port 23 telnet) verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
