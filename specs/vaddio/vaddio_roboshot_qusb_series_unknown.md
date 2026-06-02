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
  - cdn-docs.av-iq.com
  - fullcompass.com
  - res.cloudinary.com
source_urls:
  - "http://cdn-docs.av-iq.com/other/342-0796-reva-roboshot-qusb-manual%20%282%29.pdf"
  - https://www.fullcompass.com/common/files/36398-RoboSHOT12USBCompleteManual.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/vaddio-999-9917-000W-UserManual.pdf"
retrieved_at: 2026-05-27T12:48:07.192Z
last_checked_at: 2026-05-31T22:44:27.877Z
generated_at: 2026-05-31T22:44:27.877Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default admin username/password not stated in source"
  - "no unsolicited notifications documented in source"
  - "no multi-step macros documented in source"
  - "no safety warnings or interlock procedures in source"
  - "pan/tilt speed ranges not fully specified (source gives 0x01-0x18 for pan, 0x01-0x14 for tilt only for the PTZ absolute position command)"
verification:
  verdict: verified
  checked_at: 2026-05-31T22:44:27.877Z
  matched_actions: 166
  action_count: 166
  confidence: medium
  summary: "All 166 spec action ids map cleanly to VISCA and telnet command sources; transport parameters (9600 8N1 serial + port 23 telnet) verified verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Vaddio RoboSHOT QUSB Series Control Spec

## Summary
PTZ camera supporting RS-232 serial and TCP/IP (Telnet) control. Protocol derived from Sony VISCA but with Vaddio-specific extensions. Serial: 9600 bps, 8N1, no flow control. Telnet: port 23, requires admin credentials (same username/password as embedded web server). VISCA address byte is `8x` where `x` is the camera address; `88` is broadcast.

<!-- UNRESOLVED: default admin username/password not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # source: "The default Telnet Port is 23"
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: username_password  # source: "Telnet sessions require access verification using the same username and password as the Administrator account on the embedded web server"
```

## Traits
```yaml
- powerable
- queryable
- levelable
```

## Actions
```yaml
- id: address_set
  label: Address Set (Broadcast)
  kind: action
  command: "88 30 01 FF"
  params: []

- id: if_clear
  label: IF Clear (Broadcast)
  kind: action
  command: "88 01 00 01 FF"
  params: []

- id: command_cancel
  label: Command Cancel
  kind: action
  command: "8x 2p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Socket number (1-2)

- id: cam_power_on
  label: Power On
  kind: action
  command: "8x 01 04 00 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_power_off
  label: Power Off
  kind: action
  command: "8x 01 04 00 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_zoom_stop
  label: Zoom Stop
  kind: action
  command: "8x 01 04 07 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_zoom_tele_std
  label: Tele Zoom (Standard Speed)
  kind: action
  command: "8x 01 04 07 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_zoom_wide_std
  label: Wide Zoom (Standard Speed)
  kind: action
  command: "8x 01 04 07 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_zoom_tele_variable
  label: Tele Zoom (Variable Speed)
  kind: action
  command: "8x 01 04 07 2p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Speed 0 (low) to 7 (high)

- id: cam_zoom_wide_variable
  label: Wide Zoom (Variable Speed)
  kind: action
  command: "8x 01 04 07 3p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Speed 0 (low) to 7 (high)

- id: cam_zoom_direct
  label: Direct Zoom
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pqrs
      type: integer
      description: Zoom position (0h-4000h), each nibble as 0p 0q 0r 0s

- id: cam_focus_stop
  label: Focus Stop
  kind: action
  command: "8x 01 04 08 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_focus_far_std
  label: Far Focus (Standard)
  kind: action
  command: "8x 01 04 08 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_focus_near_std
  label: Near Focus (Standard)
  kind: action
  command: "8x 01 04 08 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_focus_far_variable
  label: Far Focus (Variable)
  kind: action
  command: "8x 01 04 08 2p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Speed 0 (low) to 7 (high)

- id: cam_focus_near_variable
  label: Near Focus (Variable)
  kind: action
  command: "8x 01 04 08 3p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Speed 0 (low) to 7 (high)

- id: cam_focus_direct
  label: Direct Focus
  kind: action
  command: "8x 01 04 48 0p 0q 0r 0s FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pqrs
      type: integer
      description: Focus position (1000h-F000h), each nibble as 0p 0q 0r 0s

- id: cam_focus_auto
  label: Auto Focus
  kind: action
  command: "8x 01 04 38 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_focus_manual
  label: Manual Focus
  kind: action
  command: "8x 01 04 38 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_focus_auto_manual_toggle
  label: Auto/Manual Focus Toggle
  kind: action
  command: "8x 01 04 08 10 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_focus_one_push_trigger
  label: One Push AF Trigger
  kind: action
  command: "8x 01 04 18 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_focus_near_limit
  label: Near Focus Limit
  kind: action
  command: "8x 01 04 28 0p 0q 0r 0s FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pqrs
      type: integer
      description: Near focus limit position, each nibble as 0p 0q 0r 0s

- id: cam_af_sensitivity_normal
  label: AF Sensitivity Normal
  kind: action
  command: "8x 01 04 58 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_af_sensitivity_low
  label: AF Sensitivity Low
  kind: action
  command: "8x 01 04 58 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_af_mode_normal
  label: Normal AF Mode
  kind: action
  command: "8x 01 04 57 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_af_mode_interval
  label: Interval AF Mode
  kind: action
  command: "8x 01 04 57 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_af_mode_zoom_trigger
  label: Zoom Trigger AF Mode
  kind: action
  command: "8x 01 04 57 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_af_mode_interval_time
  label: AF Interval Time
  kind: action
  command: "8x 01 04 27 0p 0q 0r 0s FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: integer
      description: Movement time (nibbles p and q)
    - name: rs
      type: integer
      description: Interval (nibbles r and s)

- id: cam_ir_correction_standard
  label: IR Correction Standard
  kind: action
  command: "8x 01 04 11 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_ir_correction_ir_light
  label: IR Correction IR Light
  kind: action
  command: "8x 01 04 11 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_zoom_focus_direct
  label: Direct Zoom+Focus
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s 0t 0u 0v 0w FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pqrs
      type: integer
      description: Zoom position (0h-4000h), each nibble as 0p 0q 0r 0s
    - name: tuvw
      type: integer
      description: Focus position (1000h-F000h), each nibble as 0t 0u 0v 0w

- id: cam_wb_auto
  label: White Balance Auto
  kind: action
  command: "8x 01 04 35 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_indoor
  label: White Balance Indoor
  kind: action
  command: "8x 01 04 35 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_outdoor
  label: White Balance Outdoor
  kind: action
  command: "8x 01 04 35 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_one_push
  label: White Balance One Push WB Mode
  kind: action
  command: "8x 01 04 35 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_atw
  label: White Balance ATW
  kind: action
  command: "8x 01 04 35 04 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_manual
  label: White Balance Manual
  kind: action
  command: "8x 01 04 35 05 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_one_push_trigger
  label: White Balance One Push Trigger
  kind: action
  command: "8x 01 04 10 05 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_outdoor_auto
  label: White Balance Outdoor Auto
  kind: action
  command: "8x 01 04 35 06 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_sodium_lamp_auto
  label: White Balance Sodium Lamp Auto
  kind: action
  command: "8x 01 04 35 07 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_sodium_lamp
  label: White Balance Sodium Lamp
  kind: action
  command: "8x 01 04 35 08 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wb_sodium_lamp_outdoor_auto
  label: White Balance Sodium Lamp Outdoor Auto
  kind: action
  command: "8x 01 04 35 09 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_rgain_reset
  label: Red Gain Reset
  kind: action
  command: "8x 01 04 03 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_rgain_up
  label: Red Gain Up
  kind: action
  command: "8x 01 04 03 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_rgain_down
  label: Red Gain Down
  kind: action
  command: "8x 01 04 03 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_rgain_direct
  label: Direct Red Gain
  kind: action
  command: "8x 01 04 43 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: integer
      description: Red gain (00h-FFh), each nibble as 0p 0q

- id: cam_bgain_reset
  label: Blue Gain Reset
  kind: action
  command: "8x 01 04 04 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_bgain_up
  label: Blue Gain Up
  kind: action
  command: "8x 01 04 04 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_bgain_down
  label: Blue Gain Down
  kind: action
  command: "8x 01 04 04 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_bgain_direct
  label: Direct Blue Gain
  kind: action
  command: "8x 01 04 44 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: integer
      description: Blue gain (00h-FFh), each nibble as 0p 0q

- id: cam_ae_full_auto
  label: Exposure Full Auto
  kind: action
  command: "8x 01 04 39 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_ae_manual
  label: Exposure Manual
  kind: action
  command: "8x 01 04 39 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_ae_shutter_priority
  label: Exposure Shutter Priority
  kind: action
  command: "8x 01 04 39 0A FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_ae_iris_priority
  label: Exposure Iris Priority
  kind: action
  command: "8x 01 04 39 0B FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_ae_bright
  label: Exposure Bright Mode
  kind: action
  command: "8x 01 04 39 0D FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_shutter_reset
  label: Shutter Reset
  kind: action
  command: "8x 01 04 0A 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_shutter_up
  label: Shutter Up
  kind: action
  command: "8x 01 04 0A 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_shutter_down
  label: Shutter Down
  kind: action
  command: "8x 01 04 0A 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_shutter_direct
  label: Direct Shutter
  kind: action
  command: "8x 01 04 4A 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: integer
      description: Shutter position (00h-15h), each nibble as 0p 0q

- id: cam_iris_reset
  label: Iris Reset
  kind: action
  command: "8x 01 04 0B 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_iris_up
  label: Iris Up
  kind: action
  command: "8x 01 04 0B 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_iris_down
  label: Iris Down
  kind: action
  command: "8x 01 04 0B 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_iris_direct
  label: Direct Iris
  kind: action
  command: "8x 01 04 4B 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: integer
      description: Iris position, each nibble as 0p 0q

- id: cam_gain_reset
  label: Gain Reset
  kind: action
  command: "8x 01 04 0C 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_gain_up
  label: Gain Up
  kind: action
  command: "8x 01 04 0C 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_gain_down
  label: Gain Down
  kind: action
  command: "8x 01 04 0C 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_gain_direct
  label: Direct Gain
  kind: action
  command: "8x 01 04 4C 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: integer
      description: Gain position (01h-0Fh), each nibble as 0p 0q

- id: cam_gain_limit
  label: Gain Limit
  kind: action
  command: "8x 01 04 2C 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Gain limit level

- id: cam_expcomp_on
  label: Exposure Compensation On
  kind: action
  command: "8x 01 04 3E 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_expcomp_off
  label: Exposure Compensation Off
  kind: action
  command: "8x 01 04 3E 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_expcomp_reset
  label: Exposure Compensation Reset
  kind: action
  command: "8x 01 04 3E 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_expcomp_up
  label: Exposure Compensation Up
  kind: action
  command: "8x 01 04 3E 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_expcomp_down
  label: Exposure Compensation Down
  kind: action
  command: "8x 01 04 3E 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    # NOTE: source lists same byte 02 for both ExpComp On and Down; this is as documented

- id: cam_expcomp_direct
  label: Direct Exposure Compensation
  kind: action
  command: "8x 01 04 4E 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: integer
      description: ExpComp position, each nibble as 0p 0q

- id: cam_backlight_on
  label: Backlight Compensation On
  kind: action
  command: "8x 01 04 33 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_backlight_off
  label: Backlight Compensation Off
  kind: action
  command: "8x 01 04 33 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_tally_on
  label: Tally On
  kind: action
  command: "8x 01 7E 01 0A 00 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_tally_off
  label: Tally Off
  kind: action
  command: "8x 01 7E 01 0A 00 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_spot_ae_on
  label: Spot AE On
  kind: action
  command: "8x 01 04 59 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_spot_ae_off
  label: Spot AE Off
  kind: action
  command: "8x 01 04 59 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_spot_ae_position
  label: Spot AE Position
  kind: action
  command: "8x 01 04 29 0p 0q 0r 0s FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: integer
      description: X position (0h-Fh), each nibble as 0p 0q
    - name: rs
      type: integer
      description: Y position (0h-Fh), each nibble as 0r 0s

- id: cam_wd_on
  label: WD On
  kind: action
  command: "8x 01 04 3D 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wd_off
  label: WD Off
  kind: action
  command: "8x 01 04 3D 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wd_ve_on
  label: WD VE On
  kind: action
  command: "8x 01 04 3D 06 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_wd_set_parameter
  label: WD Set Parameter
  kind: action
  command: "8x 01 04 2D 00 0q 0r 0s 00 00 00 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: q
      type: integer
      description: Display brightness level (0 Dark to 6 Bright)
    - name: r
      type: integer
      description: Brightness compensation selection (0:Very dark, 1:Dark, 2:std, 3:bright)
    - name: s
      type: integer
      description: Compensation level (0:Low, 1:Mid, 2:High)

- id: cam_aperture_reset
  label: Aperture Reset
  kind: action
  command: "8x 01 04 02 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_aperture_up
  label: Aperture Up
  kind: action
  command: "8x 01 04 02 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_aperture_down
  label: Aperture Down
  kind: action
  command: "8x 01 04 02 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_aperture_direct
  label: Direct Aperture
  kind: action
  command: "8x 01 04 42 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pq
      type: integer
      description: Aperture position, each nibble as 0p 0q

- id: cam_hr_on
  label: High Resolution Mode On
  kind: action
  command: "8x 01 04 52 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_hr_off
  label: High Resolution Mode Off
  kind: action
  command: "8x 01 04 52 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_nr
  label: Noise Reduction
  kind: action
  command: "8x 01 04 53 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Noise reduction level (0:Off, 1-5)

- id: cam_gamma
  label: Gamma
  kind: action
  command: "8x 01 04 5B 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Gamma setting (0:std, 1:Straight)

- id: cam_lr_reverse_on
  label: LR Reverse On (Mirror)
  kind: action
  command: "8x 01 04 61 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_lr_reverse_off
  label: LR Reverse Off
  kind: action
  command: "8x 01 04 61 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_freeze_on
  label: Freeze On
  kind: action
  command: "8x 01 04 62 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_freeze_off
  label: Freeze Off
  kind: action
  command: "8x 01 04 62 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_picture_effect_off
  label: Picture Effect Off
  kind: action
  command: "8x 01 04 63 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_picture_effect_neg_art
  label: Picture Effect Neg Art
  kind: action
  command: "8x 01 04 63 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_picture_effect_bw
  label: Picture Effect Black & White
  kind: action
  command: "8x 01 04 63 04 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_picture_flip_on
  label: Image Flip On
  kind: action
  command: "8x 01 04 66 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_picture_flip_off
  label: Image Flip Off
  kind: action
  command: "8x 01 04 66 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_icr_on
  label: ICR Mode On
  kind: action
  command: "8x 01 04 01 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_icr_off
  label: ICR Mode Off
  kind: action
  command: "8x 01 04 01 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_id_write
  label: Camera ID Write
  kind: action
  command: "8x 01 04 22 0p 0q 0r 0s FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pqrs
      type: integer
      description: Camera ID (0h-FFFFh), each nibble as 0p 0q 0r 0s

- id: cam_memory_reset
  label: Memory Reset
  kind: action
  command: "8x 01 04 3F 00 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Preset number (0-0x0F)

- id: cam_memory_set_standard
  label: Memory Set Standard
  kind: action
  command: "8x 01 04 3F 01 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Preset number (0-0x0F)

- id: cam_memory_set_standard_scene
  label: Memory Set Standard with Scene
  kind: action
  command: "8x 01 04 3F 21 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Preset number (0-0x0F)

- id: cam_memory_set_trisync
  label: Memory Set Tri-Sync
  kind: action
  command: "8x 01 04 3F 11 0p 0q 0r FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Preset number (0-0x0F)
    - name: qr
      type: integer
      description: Speed (0x01-0xFF), each nibble as 0q 0r

- id: cam_memory_set_trisync_scene
  label: Memory Set Tri-Sync with Scene
  kind: action
  command: "8x 01 04 3F 31 0p 0q 0r FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Preset number (0-0x0F)
    - name: qr
      type: integer
      description: Speed (0x01-0xFF), each nibble as 0q 0r

- id: cam_memory_recall_standard
  label: Memory Recall Standard
  kind: action
  command: "8x 01 04 3F 02 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Preset number (0-0x0F)

- id: cam_memory_recall_trisync
  label: Memory Recall Tri-Sync
  kind: action
  command: "8x 01 04 3F 12 0p 0q 0r FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Preset number (0-0x0F)
    - name: qr
      type: integer
      description: Speed (0x01-0xFF), each nibble as 0q 0r

- id: cam_display_on
  label: Display On
  kind: action
  command: "8x 01 04 15 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_display_on_alternate
  label: Display On (Alternate)
  kind: action
  command: "8x 01 06 06 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_display_off
  label: Display Off
  kind: action
  command: "8x 01 04 15 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_display_off_alternate
  label: Display Off (Alternate)
  kind: action
  command: "8x 01 06 06 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_display_on_off
  label: Display On/Off Toggle
  kind: action
  command: "8x 01 04 15 10 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_display_on_off_alternate
  label: Display On/Off Toggle (Alternate)
  kind: action
  command: "8x 01 06 06 10 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_mute_on
  label: Mute On
  kind: action
  command: "8x 01 04 75 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_mute_off
  label: Mute Off
  kind: action
  command: "8x 01 04 75 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_mute_on_off
  label: Mute On/Off Toggle
  kind: action
  command: "8x 01 04 75 10 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_color_enhance_set
  label: Color Enhancement Set Parameter
  kind: action
  command: "8x 01 04 20 mm 00 pp qq rr ss tt uu FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: mm
      type: integer
      description: Threshold level (01h-7Fh)
    - name: pp
      type: integer
      description: Y fixed color for high-intensity
    - name: qq
      type: integer
      description: Cr fixed color for high-intensity
    - name: rr
      type: integer
      description: Cb fixed color for high-intensity
    - name: ss
      type: integer
      description: Y fixed color for low-intensity
    - name: tt
      type: integer
      description: Cr fixed color for low-intensity
    - name: uu
      type: integer
      description: Cb fixed color for low-intensity

- id: cam_color_enhance_on
  label: Color Enhancement On
  kind: action
  command: "8x 01 04 50 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_color_enhance_off
  label: Color Enhancement Off
  kind: action
  command: "8x 01 04 50 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_chroma_suppress
  label: Chroma Suppress
  kind: action
  command: "8x 01 04 5F pp FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pp
      type: integer
      description: Chroma suppress level (00:Off, 01h-03h:On, 3 levels)

- id: cam_color_gain_direct
  label: Direct Color Gain
  kind: action
  command: "8x 01 04 49 00 00 00 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Color gain setting (0h-4h)

- id: cam_color_hue_direct
  label: Direct Color Hue
  kind: action
  command: "8x 01 04 4F 00 00 00 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Color hue setting (0h:-14deg to Eh:+14deg)

- id: cam_gamma_offset_direct
  label: Direct Gamma Offset
  kind: action
  command: "8x 01 04 1E 00 00 00 0s 0t 0u FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: s
      type: integer
      description: Polarity offset (0:plus, 1:minus)
    - name: tu
      type: integer
      description: Offset; RoboSHOT 12 (00h-10h), RoboSHOT 30 (00h-40h)

- id: pantilt_up
  label: Pan-Tilt Up
  kind: action
  command: "8x 01 06 01 vv ww 03 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed
    - name: ww
      type: integer
      description: Tilt speed

- id: pantilt_down
  label: Pan-Tilt Down
  kind: action
  command: "8x 01 06 01 vv ww 03 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed
    - name: ww
      type: integer
      description: Tilt speed

- id: pantilt_left
  label: Pan-Tilt Left
  kind: action
  command: "8x 01 06 01 vv ww 01 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed
    - name: ww
      type: integer
      description: Tilt speed

- id: pantilt_right
  label: Pan-Tilt Right
  kind: action
  command: "8x 01 06 01 vv ww 02 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed
    - name: ww
      type: integer
      description: Tilt speed

- id: pantilt_upleft
  label: Pan-Tilt UpLeft
  kind: action
  command: "8x 01 06 01 vv ww 01 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed
    - name: ww
      type: integer
      description: Tilt speed

- id: pantilt_upright
  label: Pan-Tilt UpRight
  kind: action
  command: "8x 01 06 01 vv ww 02 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed
    - name: ww
      type: integer
      description: Tilt speed

- id: pantilt_downleft
  label: Pan-Tilt DownLeft
  kind: action
  command: "8x 01 06 01 vv ww 01 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed
    - name: ww
      type: integer
      description: Tilt speed

- id: pantilt_downright
  label: Pan-Tilt DownRight
  kind: action
  command: "8x 01 06 01 vv ww 02 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed
    - name: ww
      type: integer
      description: Tilt speed

- id: pantilt_stop
  label: Pan-Tilt Stop
  kind: action
  command: "8x 01 06 01 vv ww 03 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed
    - name: ww
      type: integer
      description: Tilt speed

- id: pantilt_abs
  label: Pan-Tilt Absolute Position
  kind: action
  command: "8x 01 06 02 vv ww 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed
    - name: ww
      type: integer
      description: Tilt speed
    - name: YYYY
      type: integer
      description: Pan position (4 nibbles, each prefixed 0Y)
    - name: ZZZZ
      type: integer
      description: Tilt position (4 nibbles, each prefixed 0Z)

- id: pantilt_home
  label: Pan-Tilt Home
  kind: action
  command: "8x 01 06 04 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: pantilt_zoom_up
  label: Pan-Tilt-Zoom Up
  kind: action
  command: "8x 01 06 0A vv ww rr 03 01 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed
    - name: ww
      type: integer
      description: Tilt speed
    - name: rr
      type: integer
      description: Zoom speed

- id: pantilt_zoom_down
  label: Pan-Tilt-Zoom Down
  kind: action
  command: "8x 01 06 0A vv ww rr 03 02 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed
    - name: ww
      type: integer
      description: Tilt speed
    - name: rr
      type: integer
      description: Zoom speed

- id: pantilt_zoom_left
  label: Pan-Tilt-Zoom Left
  kind: action
  command: "8x 01 06 0A vv ww rr 01 03 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed
    - name: ww
      type: integer
      description: Tilt speed
    - name: rr
      type: integer
      description: Zoom speed

- id: pantilt_zoom_right
  label: Pan-Tilt-Zoom Right
  kind: action
  command: "8x 01 06 0A vv ww rr 02 03 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed
    - name: ww
      type: integer
      description: Tilt speed
    - name: rr
      type: integer
      description: Zoom speed

- id: pantilt_zoom_in
  label: Pan-Tilt-Zoom In
  kind: action
  command: "8x 01 06 0A vv ww rr 03 03 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed
    - name: ww
      type: integer
      description: Tilt speed
    - name: rr
      type: integer
      description: Zoom speed

- id: pantilt_zoom_out
  label: Pan-Tilt-Zoom Out
  kind: action
  command: "8x 01 06 0A vv ww rr 03 03 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed
    - name: ww
      type: integer
      description: Tilt speed
    - name: rr
      type: integer
      description: Zoom speed

- id: pantilt_zoom_stop
  label: Pan-Tilt-Zoom Stop
  kind: action
  command: "8x 01 06 0A vv ww rr 03 03 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed
    - name: ww
      type: integer
      description: Tilt speed
    - name: rr
      type: integer
      description: Zoom speed

- id: pantilt_zoom_abs
  label: Pan-Tilt-Zoom Absolute Position
  kind: action
  command: "8x 01 06 0B vv ww 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z 0R 0R 0R 0R FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: vv
      type: integer
      description: Pan speed (0x01-0x18)
    - name: ww
      type: integer
      description: Tilt speed (0x01-0x14)
    - name: YYYY
      type: integer
      description: Pan position (4 nibbles, each prefixed 0Y)
    - name: ZZZZ
      type: integer
      description: Tilt position (4 nibbles, each prefixed 0Z)
    - name: RRRR
      type: integer
      description: Zoom position (4 nibbles, each prefixed 0R)

- id: pantilt_zoom_home
  label: Pan-Tilt-Zoom Home
  kind: action
  command: "8x 01 06 0C FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)

- id: cam_ptz_preset_speed
  label: PTZ Preset Speed
  kind: action
  command: "8x 01 7E 01 0B pp qq rr FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: pp
      type: integer
      description: Pan speed
    - name: qq
      type: integer
      description: Tilt speed
    - name: rr
      type: integer
      description: Zoom speed

- id: telnet_camera_home
  label: Telnet Camera Home
  kind: action
  command: "camera home"
  params: []

- id: telnet_camera_pan
  label: Telnet Camera Pan
  kind: action
  command: "camera pan {left|right|stop} [{speed}]"
  params:
    - name: direction
      type: string
      enum: [left, right, stop]
    - name: speed
      type: integer
      description: Speed 1-24 (default 12); optional

- id: telnet_camera_tilt
  label: Telnet Camera Tilt
  kind: action
  command: "camera tilt {up|down|stop} [{speed}]"
  params:
    - name: direction
      type: string
      enum: [up, down, stop]
    - name: speed
      type: integer
      description: Speed 1-20 (default 10); optional

- id: telnet_camera_zoom
  label: Telnet Camera Zoom
  kind: action
  command: "camera zoom {in|out|stop} [{speed}]"
  params:
    - name: direction
      type: string
      enum: [in, out, stop]
    - name: speed
      type: integer
      description: Speed 1-7 (default 3); optional

- id: telnet_camera_focus
  label: Telnet Camera Focus
  kind: action
  command: "camera focus {{near|far|stop} [{speed}]|mode {auto|manual}}"
  params:
    - name: direction
      type: string
      enum: [near, far, stop]
    - name: speed
      type: integer
      description: Speed 1-8; optional
    - name: mode
      type: string
      enum: [auto, manual]
      description: Focus mode (alternative form)

- id: telnet_camera_preset_recall
  label: Telnet Camera Preset Recall
  kind: action
  command: "camera preset recall {preset}"
  params:
    - name: preset
      type: integer
      description: Preset number 1-12

- id: telnet_camera_preset_store
  label: Telnet Camera Preset Store
  kind: action
  command: "camera preset store {preset} [tri-sync {speed}] [save-ccu]"
  params:
    - name: preset
      type: integer
      description: Preset number 1-12
    - name: speed
      type: integer
      description: Tri-sync speed; optional
    - name: save_ccu
      type: boolean
      description: Append save-ccu to also save CCU settings; optional

- id: telnet_camera_standby_toggle
  label: Telnet Camera Standby Toggle
  kind: action
  command: "camera standby toggle"
  params: []

- id: telnet_camera_ccu_set
  label: Telnet Camera CCU Set
  kind: action
  command: "camera ccu set {parameter} {value}"
  params:
    - name: parameter
      type: string
      enum: [auto_white_balance, red_gain, blue_gain, backlight_compensation, auto_iris, iris, gain, detail, chroma]
    - name: value
      type: string
      description: "on/off for boolean params; 0-255 for gain/iris/detail/chroma"

- id: telnet_camera_ccu_scene_recall
  label: Telnet Camera CCU Scene Recall
  kind: action
  command: "camera ccu scene recall {factory|custom} {scene_num}"
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
  command: "camera ccu scene store {scene_num}"
  params:
    - name: scene_num
      type: integer
      description: Scene 1-3

- id: telnet_system_factory_reset
  label: Telnet System Factory Reset
  kind: action
  command: "system factory-reset {get|on|off}"
  params:
    - name: action
      type: string
      enum: [get, on, off]

- id: telnet_system_reboot
  label: Telnet System Reboot
  kind: action
  command: "system reboot [{seconds}]"
  params:
    - name: seconds
      type: integer
      description: Optional delay in seconds

- id: telnet_system_update
  label: Telnet System Update
  kind: action
  command: "system update {url}"
  params:
    - name: url
      type: string
      description: URL to update file

- id: telnet_network_ping
  label: Telnet Network Ping
  kind: action
  command: "network ping [count {count}] [size {size}] {destination_ip}"
  params:
    - name: destination_ip
      type: string
    - name: count
      type: integer
      description: Packet count (default 5); optional
    - name: size
      type: integer
      description: Packet size in bytes (default 56); optional

- id: telnet_network_settings_get
  label: Telnet Network Settings Get
  kind: action
  command: "network settings get"
  params: []

- id: telnet_exit
  label: Telnet Exit Session
  kind: action
  command: "exit"
  params: []

- id: telnet_help
  label: Telnet Help
  kind: action
  command: "help"
  params: []

- id: telnet_history
  label: Telnet History
  kind: action
  command: "history [{limit}]"
  params:
    - name: limit
      type: integer
      description: Number of history entries to show; optional

- id: telnet_version
  label: Telnet Version
  kind: action
  command: "version"
  params: []
```

## Feedbacks
```yaml
- id: cam_power_inq
  label: Power Status Query
  kind: query
  command: "8x 09 04 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 02 FF"
      meaning: On
    - value: "y0 50 03 FF"
      meaning: Off (Standby)

- id: cam_zoom_pos_inq
  label: Zoom Position Query
  kind: query
  command: "8x 09 04 47 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 0p 0q 0r 0s FF — pqrs: Zoom Position"

- id: cam_focus_mode_inq
  label: Focus Mode Query
  kind: query
  command: "8x 09 04 38 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 02 FF"
      meaning: Auto Focus
    - value: "y0 50 03 FF"
      meaning: Manual Focus

- id: cam_focus_pos_inq
  label: Focus Position Query
  kind: query
  command: "8x 09 04 48 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 0p 0q 0r 0s FF — pqrs: Focus Position"

- id: cam_focus_near_limit_inq
  label: Focus Near Limit Query
  kind: query
  command: "8x 09 04 28 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 0p 0q 0r 0s FF — pqrs: Focus Near Limit Position"

- id: cam_af_sensitivity_inq
  label: AF Sensitivity Query
  kind: query
  command: "8x 09 04 58 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 02 FF"
      meaning: AF Sensitivity Normal
    - value: "y0 50 03 FF"
      meaning: AF Sensitivity Low

- id: cam_af_mode_inq
  label: AF Mode Query
  kind: query
  command: "8x 09 04 57 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 00 FF"
      meaning: Normal AF
    - value: "y0 50 01 FF"
      meaning: Interval AF
    - value: "y0 50 02 FF"
      meaning: Zoom Trigger AF

- id: cam_af_time_setting_inq
  label: AF Time Setting Query
  kind: query
  command: "8x 09 04 27 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 0p 0q 0r 0s FF — pq: Movement Time, rs: Interval"

- id: cam_ir_correction_inq
  label: IR Correction Query
  kind: query
  command: "8x 09 04 11 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 00 FF"
      meaning: Standard
    - value: "y0 50 01 FF"
      meaning: IR Light

- id: cam_wb_mode_inq
  label: White Balance Mode Query
  kind: query
  command: "8x 09 04 35 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 00 FF"
      meaning: Auto
    - value: "y0 50 01 FF"
      meaning: Indoor
    - value: "y0 50 02 FF"
      meaning: Outdoor
    - value: "y0 50 03 FF"
      meaning: One Push WB
    - value: "y0 50 04 FF"
      meaning: ATW
    - value: "y0 50 05 FF"
      meaning: Manual
    - value: "y0 50 06 FF"
      meaning: Outdoor Auto
    - value: "y0 50 07 FF"
      meaning: Sodium Lamp Auto
    - value: "y0 50 08 FF"
      meaning: Sodium Lamp
    - value: "y0 50 09 FF"
      meaning: Sodium Lamp Outdoor Auto

- id: cam_rgain_inq
  label: Red Gain Query
  kind: query
  command: "8x 09 04 43 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 00 00 0p 0q FF — pq: RGain"

- id: cam_bgain_inq
  label: Blue Gain Query
  kind: query
  command: "8x 09 04 44 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 00 00 0p 0q FF — pq: BGain"

- id: cam_ae_mode_inq
  label: AE Mode Query
  kind: query
  command: "8x 09 04 39 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 00 FF"
      meaning: Full Auto
    - value: "y0 50 03 FF"
      meaning: Manual
    - value: "y0 50 0A FF"
      meaning: Shutter Priority
    - value: "y0 50 0B FF"
      meaning: Iris Priority
    - value: "y0 50 0D FF"
      meaning: Bright

- id: cam_shutter_pos_inq
  label: Shutter Position Query
  kind: query
  command: "8x 09 04 4A FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 00 00 0p 0q FF — pq: Shutter Position"

- id: cam_iris_pos_inq
  label: Iris Position Query
  kind: query
  command: "8x 09 04 4B FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 00 00 0p 0q FF — pq: Iris Position"

- id: cam_gain_pos_inq
  label: Gain Position Query
  kind: query
  command: "8x 09 04 4C FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 00 00 0p 0q FF — pq: Gain Position"

- id: cam_gain_limit_inq
  label: Gain Limit Query
  kind: query
  command: "8x 09 04 2C FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 0q FF — p: Gain Limit"

- id: cam_expcomp_mode_inq
  label: ExpComp Mode Query
  kind: query
  command: "8x 09 04 3E FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 02 FF"
      meaning: On
    - value: "y0 50 03 FF"
      meaning: Off

- id: cam_expcomp_pos_inq
  label: ExpComp Position Query
  kind: query
  command: "8x 09 04 4E FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 00 00 0p 0q FF — pq: ExpComp Position"

- id: cam_backlight_mode_inq
  label: Backlight Mode Query
  kind: query
  command: "8x 09 04 33 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 02 FF"
      meaning: On
    - value: "y0 50 03 FF"
      meaning: Off

- id: cam_tally_inq
  label: Tally Query
  kind: query
  command: "8x 01 7E 01 0A FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 02 FF"
      meaning: On
    - value: "y0 50 03 FF"
      meaning: Off

- id: cam_resolution_inq
  label: Resolution Query
  kind: query
  command: "8x 09 06 23 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 0p 0q FF — pq: Video Resolution"

- id: cam_spot_ae_mode_inq
  label: Spot AE Mode Query
  kind: query
  command: "8x 09 04 59 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 02 FF"
      meaning: On
    - value: "y0 50 03 FF"
      meaning: Off

- id: cam_spot_ae_pos_inq
  label: Spot AE Position Query
  kind: query
  command: "8x 09 04 29 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 0p 0q 0r 0s FF — pq: X Position, rs: Y Position"

- id: cam_wd_mode_inq
  label: WD Mode Query
  kind: query
  command: "8x 09 04 3D FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 02 FF"
      meaning: On
    - value: "y0 50 03 FF"
      meaning: Off
    - value: "y0 50 06 FF"
      meaning: VE On

- id: cam_wd_parameter_inq
  label: WD Parameter Query
  kind: query
  command: "8x 09 04 2D FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 00 0q 0r 0s 0t 0u 00 00 FF — q: brightness, r: compensation selection, s: compensation level"

- id: cam_aperture_inq
  label: Aperture Query
  kind: query
  command: "8x 09 04 42 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 00 00 0p 0q FF — pq: Aperture Gain"

- id: cam_hr_mode_inq
  label: High Resolution Mode Query
  kind: query
  command: "8x 09 04 52 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 02 FF"
      meaning: On
    - value: "y0 50 03 FF"
      meaning: Off

- id: cam_nr_inq
  label: Noise Reduction Query
  kind: query
  command: "8x 09 04 53 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 0p FF — p: 00h to 05h"

- id: cam_gamma_inq
  label: Gamma Query
  kind: query
  command: "8x 09 04 5B FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 0p FF — p: 00h (std), 01h (straight)"

- id: cam_lr_reverse_mode_inq
  label: LR Reverse Mode Query
  kind: query
  command: "8x 09 04 61 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 02 FF"
      meaning: On (mirror)
    - value: "y0 50 03 FF"
      meaning: Off

- id: cam_freeze_mode_inq
  label: Freeze Mode Query
  kind: query
  command: "8x 09 04 62 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 02 FF"
      meaning: On
    - value: "y0 50 03 FF"
      meaning: Off

- id: cam_picture_effect_mode_inq
  label: Picture Effect Mode Query
  kind: query
  command: "8x 09 04 63 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 00 FF"
      meaning: Off
    - value: "y0 50 02 FF"
      meaning: Neg. Art
    - value: "y0 50 04 FF"
      meaning: Black & White

- id: cam_picture_flip_mode_inq
  label: Picture Flip Mode Query
  kind: query
  command: "8x 09 04 66 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 02 FF"
      meaning: On
    - value: "y0 50 03 FF"
      meaning: Off

- id: cam_icr_mode_inq
  label: ICR Mode Query
  kind: query
  command: "8x 09 04 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 02 FF"
      meaning: On
    - value: "y0 50 03 FF"
      meaning: Off

- id: cam_memory_inq
  label: Memory Query (last recalled)
  kind: query
  command: "8x 09 04 3F FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 pp FF — pp: Memory number recalled last"

- id: cam_memory_status_inq
  label: Memory Status Query
  kind: query
  command: "8x 09 04 3F 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: p
      type: integer
      description: Memory number to query
  response: "y0 50 0p 0q 0r 0s FF — p: memory num, q: mode (00-std, 10-std/ccu, 01-trisync, 11-trisync/ccu), rs: speed"

- id: cam_mem_save_inq
  label: Memory Save Query
  kind: query
  command: "8x 09 04 23 0X FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: X
      type: integer
      description: Address (00h-07h)
  response: "y0 50 0p 0q 0r 0s FF — pqrs: data (0000h-FFFFh)"

- id: cam_display_mode_inq
  label: Display Mode Query
  kind: query
  command: "8x 09 04 15 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 02 FF"
      meaning: On
    - value: "y0 50 03 FF"
      meaning: Off

- id: cam_display_mode_inq_alt
  label: Display Mode Query (Alternate)
  kind: query
  command: "8x 09 06 06 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 02 FF"
      meaning: On
    - value: "y0 50 03 FF"
      meaning: Off

- id: cam_mute_mode_inq
  label: Mute Mode Query
  kind: query
  command: "8x 09 04 75 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 02 FF"
      meaning: On
    - value: "y0 50 03 FF"
      meaning: Off

- id: cam_id_inq
  label: Camera ID Query
  kind: query
  command: "8x 09 04 22 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 0p 0q 0r 0s FF — pqrs: Camera ID"

- id: cam_version_inq
  label: Version Query
  kind: query
  command: "8x 09 00 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 00 10 mnpq 0E 0E 02 FF — mnpq: Model Code"

- id: vaddio_model_inq
  label: Vaddio Model Query
  kind: query
  command: "8x 09 08 0E FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 05 00 00 00 00 FF"
      meaning: RoboSHOT-12
    - value: "y0 50 05 01 00 00 00 FF"
      meaning: RoboSHOT-30

- id: cam_register_value_inq
  label: Register Value Query
  kind: query
  command: "8x 09 04 24 mm FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
    - name: mm
      type: integer
      description: Register number (00h-7Fh)
  response: "y0 50 0p 0p FF — pp: Register Value (00h-FFh)"

- id: cam_color_enhance_inq
  label: Color Enhancement Parameter Query
  kind: query
  command: "8x 09 04 20 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 mm 00 pp qq rr ss tt uu FF"

- id: cam_color_enhance_mode_inq
  label: Color Enhancement Mode Query
  kind: query
  command: "8x 09 04 50 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response_values:
    - value: "y0 50 02 FF"
      meaning: On
    - value: "y0 50 03 FF"
      meaning: Off

- id: cam_chroma_suppress_inq
  label: Chroma Suppress Query
  kind: query
  command: "8x 09 04 5F FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 pp FF — pp: Chroma Suppress setting level"

- id: cam_color_gain_inq
  label: Color Gain Query
  kind: query
  command: "8x 09 04 49 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 00 00 00 0p FF — p: Color Gain Setting (0h-4h)"

- id: cam_color_hue_inq
  label: Color Hue Query
  kind: query
  command: "8x 09 04 4F FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 00 00 00 0p FF — p: Color Hue Setting (0h-Eh)"

- id: cam_temp_inq
  label: Temperature Query
  kind: query
  command: "8x 09 04 68 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "Y0 50 00 00 0p 0q FF — pq: Lens Temperature"

- id: cam_gamma_offset_inq
  label: Gamma Offset Query
  kind: query
  command: "8x 09 04 1E FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 00 00 00 0s 0t 0u FF — s: polarity offset, tu: offset value"

- id: pantilt_pos_inq
  label: Pan-Tilt Position Query
  kind: query
  command: "8x 09 06 12 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7)
  response: "y0 50 0w 0w 0w 0w 0z 0z 0z 0z FF — wwww: Pan position, zzzz: Tilt position"

- id: telnet_camera_ccu_get
  label: Telnet Camera CCU Get
  kind: query
  command: "camera ccu get {parameter}"
  params:
    - name: parameter
      type: string
      enum: [auto_white_balance, red_gain, blue_gain, backlight_compensation, auto_iris, iris, gain, detail, chroma]

- id: telnet_camera_ccu_scene_get
  label: Telnet Camera CCU Scene Get
  kind: query
  command: "camera ccu get all"
  params: []
```

## Variables
```yaml
# All settable parameters covered via Actions/Feedbacks above.
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
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
VISCA-derived protocol. Not all Sony VISCA commands are supported; Vaddio adds many extensions including CAM_Tally, CAM_WD, CAM_PictureFlip, Tri-Sync memory recall, and the extended Pan-Tilt-Zoom drive. Telnet API uses ASCII text commands over port 23 with admin credentials (same as embedded web server). Serial API uses binary VISCA packets where `8x` is the camera address byte and `FF` is the packet terminator. `88` is used for broadcast commands (AddressSet, IF_Clear). Two interfaces share the same command semantics. CTRL+5 clears the serial buffer on the device. CAM_DZoom is explicitly documented as "Not supported".
<!-- UNRESOLVED: default admin username/password not stated in source -->
<!-- UNRESOLVED: pan/tilt speed ranges not fully specified (source gives 0x01-0x18 for pan, 0x01-0x14 for tilt only for the PTZ absolute position command) -->

## Provenance

```yaml
source_domains:
  - cdn-docs.av-iq.com
  - fullcompass.com
  - res.cloudinary.com
source_urls:
  - "http://cdn-docs.av-iq.com/other/342-0796-reva-roboshot-qusb-manual%20%282%29.pdf"
  - https://www.fullcompass.com/common/files/36398-RoboSHOT12USBCompleteManual.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/vaddio-999-9917-000W-UserManual.pdf"
retrieved_at: 2026-05-27T12:48:07.192Z
last_checked_at: 2026-05-31T22:44:27.877Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:44:27.877Z
matched_actions: 166
action_count: 166
confidence: medium
summary: "All 166 spec action ids map cleanly to VISCA and telnet command sources; transport parameters (9600 8N1 serial + port 23 telnet) verified verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default admin username/password not stated in source"
- "no unsolicited notifications documented in source"
- "no multi-step macros documented in source"
- "no safety warnings or interlock procedures in source"
- "pan/tilt speed ranges not fully specified (source gives 0x01-0x18 for pan, 0x01-0x14 for tilt only for the PTZ absolute position command)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
