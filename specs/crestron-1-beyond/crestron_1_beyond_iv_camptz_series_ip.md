---
spec_id: admin/crestron-1-beyond-iv-camptz-12-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Crestron 1 Beyond IV-CAMPTZ-12 Series Control Spec"
manufacturer: "Crestron 1 Beyond"
model_family: IV-CAMPTZ-12-N-W-1B
aliases: []
compatible_with:
  manufacturers:
    - "Crestron 1 Beyond"
  models:
    - IV-CAMPTZ-12-N-W-1B
    - IV-CAMPTZ-12-N-SLVR-1B
    - IV-CAMPTZ-12-W-1B
    - IV-CAMPTZ-12-SLVR-1B
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - crestron.com
source_urls:
  - https://www.crestron.com/getmedia/677f2d1d-8f17-44eb-b5e9-9db167b4eaa6/mg_pm_1-beyond-ptz
retrieved_at: 2026-04-30T04:31:09.936Z
last_checked_at: 2026-06-02T17:21:57.461Z
generated_at: 2026-06-02T17:21:57.461Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RTSP/video system details (ports 554/5000) are video transport only, not control — not modeled here."
  - "data_bits not stated in source"
  - "parity not stated in source"
  - "stop_bits not stated in source"
  - "flow_control not stated in source"
  - "no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "firmware version compatibility not stated in source."
  - "serial data_bits, parity, stop_bits, flow_control not stated in source."
  - "RTSP authentication not stated in source (video stream, out of scope)."
  - "ceiling-mount mode disables tracking — does not affect VISCA control."
  - "pan-tilt status bit field (p,q,r,s) meanings not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:57.461Z
  matched_actions: 126
  action_count: 126
  confidence: medium
  summary: "All 126 spec actions matched to source opcodes; transport parameters (port 5500, baud 9600) verified; source fully represented. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Crestron 1 Beyond IV-CAMPTZ-12 Series Control Spec

## Summary
VISCA-over-IP PTZ camera control for the Crestron 1 Beyond IV-CAMPTZ-12 family (white and silver, N and non-N variants). Control plane: TCP port 5500 carrying VISCA command/response packets. Serial VISCA supported at 9600 bps on the RS-232/485 port. No authentication required.

<!-- UNRESOLVED: RTSP/video system details (ports 554/5000) are video transport only, not control — not modeled here. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 5500  # VISCA over IP, per source "default port for IP control (VISCA over IP) is 5500 (TCP)"
serial:
  baud_rate: 9600  # source: "baud rate is 9600 bps for VISCA protocol"
  # UNRESOLVED: data_bits not stated in source
  # UNRESOLVED: parity not stated in source
  # UNRESOLVED: stop_bits not stated in source
  # UNRESOLVED: flow_control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
powerable    # inferred: CAM_Power On/Off commands
routable     # inferred: preset memory recall (CAM_Memory Recall)
queryable    # inferred: extensive inquiry command set
levelable    # inferred: zoom (CAM_Zoom) and exposure compensation (CAM_ExpComp) level controls
```

## Actions
```yaml
# Address byte "8x" template: substitute x with camera address 1-7 (set via OSD SYSTEM > ADDRESS).
# "y" in response packets = socket number (1 or 2).
# VISCA pan speed VV: 0x01 (low) - 0x18 (high). Tilt speed WW: 0x01 (low) - 0x14 (high).
# Freeze commands hardcode address byte 0x81 (camera address 1).

- id: address_set_broadcast
  label: Address Set (Broadcast)
  kind: action
  command: "88 30 01 FF"

- id: if_clear_broadcast
  label: Interface Clear (Broadcast)
  kind: action
  command: "88 01 00 01 FF"

- id: command_cancel
  label: Command Cancel
  kind: action
  command: "8{address} 2{socket} FF"  # socket: 1 or 2
  params:
    - name: address
      type: integer
      description: Camera address 1-7
    - name: socket
      type: integer
      description: Socket number (1 or 2)

- id: power_on
  label: Camera Power On
  kind: action
  command: "8{address} 01 04 00 02 FF"
  params:
    - name: address
      type: integer
      description: Camera address 1-7

- id: power_off
  label: Camera Power Off
  kind: action
  command: "8{address} 01 04 00 03 FF"
  params:
    - name: address
      type: integer
      description: Camera address 1-7

- id: zoom_stop
  label: Zoom Stop
  kind: action
  command: "8{address} 01 04 07 00 FF"
  params:
    - name: address
      type: integer
      description: Camera address 1-7

- id: zoom_tele_standard
  label: Zoom Tele (Standard Speed)
  kind: action
  command: "8{address} 01 04 07 02 FF"

- id: zoom_wide_standard
  label: Zoom Wide (Standard Speed)
  kind: action
  command: "8{address} 01 04 07 03 FF"

- id: zoom_tele_variable
  label: Zoom Tele (Variable Speed)
  kind: action
  command: "8{address} 01 04 07 2{speed} FF"  # speed: 0 (low) - 7 (high)

- id: zoom_wide_variable
  label: Zoom Wide (Variable Speed)
  kind: action
  command: "8{address} 01 04 07 3{speed} FF"  # speed: 0 (low) - 7 (high)

- id: zoom_direct
  label: Zoom Direct Position
  kind: action
  command: "8{address} 01 04 47 0{p1} 0{p2} 0{p3} 0{p4} FF"  # 4-byte zoom position
  params:
    - name: position
      type: integer
      description: 4-byte zoom position (see Zoom Ratio table in source)

- id: focus_stop
  label: Focus Stop
  kind: action
  command: "8{address} 01 04 08 00 FF"

- id: focus_far_standard
  label: Focus Far (Standard Speed)
  kind: action
  command: "8{address} 01 04 08 02 FF"

- id: focus_near_standard
  label: Focus Near (Standard Speed)
  kind: action
  command: "8{address} 01 04 08 03 FF"

- id: focus_far_variable
  label: Focus Far (Variable Speed)
  kind: action
  command: "8{address} 01 04 08 2{speed} FF"  # speed: 0 (low) - 7 (high)

- id: focus_near_variable
  label: Focus Near (Variable Speed)
  kind: action
  command: "8{address} 01 04 08 3{speed} FF"  # speed: 0 (low) - 7 (high)

- id: focus_direct
  label: Focus Direct Position
  kind: action
  command: "8{address} 01 04 48 0{p1} 0{p2} 0{p3} 0{p4} FF"  # 4-byte focus position

- id: focus_auto
  label: Auto Focus On
  kind: action
  command: "8{address} 01 04 38 02 FF"

- id: focus_manual
  label: Manual Focus On
  kind: action
  command: "8{address} 01 04 38 03 FF"

- id: focus_toggle_auto_manual
  label: Auto/Manual Focus Toggle
  kind: action
  command: "8{address} 01 04 38 10 FF"

- id: focus_one_push_trigger
  label: One Push AF Trigger
  kind: action
  command: "8{address} 01 04 18 01 FF"

- id: zoom_focus_direct
  label: Zoom + Focus Direct
  kind: action
  command: "8{address} 01 04 47 0{z1} 0{z2} 0{z3} 0{z4} 0{f1} 0{f2} 0{f3} 0{f4} FF"

- id: wb_auto
  label: White Balance Auto
  kind: action
  command: "8{address} 01 04 35 00 FF"

- id: wb_indoor
  label: White Balance Indoor
  kind: action
  command: "8{address} 01 04 35 01 FF"

- id: wb_outdoor
  label: White Balance Outdoor
  kind: action
  command: "8{address} 01 04 35 02 FF"

- id: wb_one_push_mode
  label: White Balance One Push Mode
  kind: action
  command: "8{address} 01 04 35 03 FF"

- id: wb_manual
  label: White Balance Manual
  kind: action
  command: "8{address} 01 04 35 05 FF"

- id: wb_one_push_trigger
  label: White Balance One Push Trigger
  kind: action
  command: "8{address} 01 04 10 05 FF"

- id: rgain_reset
  label: R Gain Reset
  kind: action
  command: "8{address} 01 04 03 00 FF"

- id: rgain_up
  label: R Gain Up
  kind: action
  command: "8{address} 01 04 03 02 FF"

- id: rgain_down
  label: R Gain Down
  kind: action
  command: "8{address} 01 04 03 03 FF"

- id: rgain_direct
  label: R Gain Direct
  kind: action
  command: "8{address} 01 04 43 00 00 0{p1} 0{p2} FF"

- id: bgain_reset
  label: B Gain Reset
  kind: action
  command: "8{address} 01 04 04 00 FF"

- id: bgain_up
  label: B Gain Up
  kind: action
  command: "8{address} 01 04 04 02 FF"

- id: bgain_down
  label: B Gain Down
  kind: action
  command: "8{address} 01 04 04 03 FF"

- id: bgain_direct
  label: B Gain Direct
  kind: action
  command: "8{address} 01 04 44 00 00 0{p1} 0{p2} FF"

- id: ae_full_auto
  label: AE Full Auto
  kind: action
  command: "8{address} 01 04 39 00 FF"

- id: ae_manual
  label: AE Manual
  kind: action
  command: "8{address} 01 04 39 03 FF"

- id: ae_shutter_priority
  label: AE Shutter Priority
  kind: action
  command: "8{address} 01 04 39 0A FF"

- id: ae_iris_priority
  label: AE Iris Priority
  kind: action
  command: "8{address} 01 04 39 0B FF"

- id: ae_bright
  label: AE Bright Mode
  kind: action
  command: "8{address} 01 04 39 0D FF"

- id: shutter_reset
  label: Shutter Reset
  kind: action
  command: "8{address} 01 04 0A 00 FF"

- id: shutter_up
  label: Shutter Up
  kind: action
  command: "8{address} 01 04 0A 02 FF"

- id: shutter_down
  label: Shutter Down
  kind: action
  command: "8{address} 01 04 0A 03 FF"

- id: shutter_direct
  label: Shutter Direct
  kind: action
  command: "8{address} 01 04 4A 00 00 0{p1} 0{p2} FF"

- id: iris_reset
  label: Iris Reset
  kind: action
  command: "8{address} 01 04 0B 00 FF"

- id: iris_up
  label: Iris Up
  kind: action
  command: "8{address} 01 04 0B 02 FF"

- id: iris_down
  label: Iris Down
  kind: action
  command: "8{address} 01 04 0B 03 FF"

- id: iris_direct
  label: Iris Direct
  kind: action
  command: "8{address} 01 04 4B 00 00 0{p1} 0{p2} FF"

- id: gain_reset
  label: Gain Reset
  kind: action
  command: "8{address} 01 04 0C 00 FF"

- id: gain_up
  label: Gain Up
  kind: action
  command: "8{address} 01 04 0C 02 FF"

- id: gain_down
  label: Gain Down
  kind: action
  command: "8{address} 01 04 0C 03 FF"

- id: gain_direct
  label: Gain Direct
  kind: action
  command: "8{address} 01 04 4C 00 00 0{p1} 0{p2} FF"

- id: bright_reset
  label: Bright Reset
  kind: action
  command: "8{address} 01 04 0D 00 FF"

- id: bright_up
  label: Bright Up
  kind: action
  command: "8{address} 01 04 0D 02 FF"

- id: bright_down
  label: Bright Down
  kind: action
  command: "8{address} 01 04 0D 03 FF"

- id: bright_direct
  label: Bright Direct
  kind: action
  command: "8{address} 01 04 4D 00 00 0{p1} 0{p2} FF"

- id: exp_comp_on
  label: Exposure Compensation On
  kind: action
  command: "8{address} 01 04 3E 02 FF"

- id: exp_comp_off
  label: Exposure Compensation Off
  kind: action
  command: "8{address} 01 04 3E 03 FF"

- id: exp_comp_reset
  label: Exposure Compensation Reset
  kind: action
  command: "8{address} 01 04 0E 00 FF"

- id: exp_comp_up
  label: Exposure Compensation Up
  kind: action
  command: "8{address} 01 04 0E 02 FF"

- id: exp_comp_down
  label: Exposure Compensation Down
  kind: action
  command: "8{address} 01 04 0E 03 FF"

- id: exp_comp_direct
  label: Exposure Compensation Direct
  kind: action
  command: "8{address} 01 04 4E 00 00 0{p1} 0{p2} FF"

- id: backlight_on
  label: Backlight Compensation On
  kind: action
  command: "8{address} 01 04 33 02 FF"

- id: backlight_off
  label: Backlight Compensation Off
  kind: action
  command: "8{address} 01 04 33 03 FF"

- id: aperture_reset
  label: Aperture Reset
  kind: action
  command: "8{address} 01 04 02 00 FF"

- id: aperture_up
  label: Aperture Up
  kind: action
  command: "8{address} 01 04 02 02 FF"

- id: aperture_down
  label: Aperture Down
  kind: action
  command: "8{address} 01 04 02 03 FF"

- id: aperture_direct
  label: Aperture Direct
  kind: action
  command: "8{address} 01 04 42 00 00 0{p1} 0{p2} FF"

- id: picture_effect_off
  label: Picture Effect Off
  kind: action
  command: "8{address} 01 04 63 00 FF"

- id: picture_effect_neg_art
  label: Picture Effect Neg.Art
  kind: action
  command: "8{address} 01 04 63 02 FF"

- id: picture_effect_bw
  label: Picture Effect B&W
  kind: action
  command: "8{address} 01 04 63 04 FF"

- id: memory_reset
  label: Preset Memory Reset
  kind: action
  command: "8{address} 01 04 3F 00 {memory} FF"  # memory 0-255
  params:
    - name: memory
      type: integer
      description: Memory number 0-255

- id: memory_set
  label: Preset Memory Set (Save)
  kind: action
  command: "8{address} 01 04 3F 01 {memory} FF"  # memory 0-255

- id: memory_recall
  label: Preset Memory Recall
  kind: action
  command: "8{address} 01 04 3F 02 {memory} FF"  # memory 0-255. Reserved: 93,95,96,99,100-108.

- id: freeze_on
  label: Freeze On (Immediate, address 1)
  kind: action
  command: "81 01 04 62 02 FF"  # hardcoded camera address 1

- id: freeze_off
  label: Freeze Off (Immediate, address 1)
  kind: action
  command: "81 01 04 62 03 FF"

- id: freeze_preset_on
  label: Freeze On When Running Preset (address 1)
  kind: action
  command: "81 01 04 62 22 FF"

- id: freeze_preset_off
  label: Freeze Off When Running Preset (address 1)
  kind: action
  command: "81 01 04 62 23 FF"

- id: sys_menu_off
  label: System Menu Off
  kind: action
  command: "8{address} 01 06 06 03 FF"

- id: cam_id_write
  label: Camera ID Write
  kind: action
  command: "8{address} 01 04 22 0{p1} 0{p2} 0{p3} 0{p4} FF"  # camera ID 0000-FFFF

- id: ir_receive_on
  label: IR Receiver On
  kind: action
  command: "8{address} 01 06 08 02 FF"

- id: ir_receive_off
  label: IR Receiver Off
  kind: action
  command: "8{address} 01 06 08 03 FF"

- id: info_display_on
  label: Information Display On
  kind: action
  command: "8{address} 01 7E 01 18 02 FF"

- id: info_display_off
  label: Information Display Off
  kind: action
  command: "8{address} 01 7E 01 18 03 FF"

- id: pantilt_up
  label: Pan-Tilt Up
  kind: action
  command: "8{address} 01 06 01 {pan_speed} {tilt_speed} 03 01 FF"  # pan 0x01-0x18, tilt 0x01-0x14

- id: pantilt_down
  label: Pan-Tilt Down
  kind: action
  command: "8{address} 01 06 01 {pan_speed} {tilt_speed} 03 02 FF"

- id: pantilt_left
  label: Pan-Tilt Left
  kind: action
  command: "8{address} 01 06 01 {pan_speed} {tilt_speed} 01 03 FF"

- id: pantilt_right
  label: Pan-Tilt Right
  kind: action
  command: "8{address} 01 06 01 {pan_speed} {tilt_speed} 02 03 FF"

- id: pantilt_up_left
  label: Pan-Tilt UpLeft
  kind: action
  command: "8{address} 01 06 01 {pan_speed} {tilt_speed} 01 01 FF"

- id: pantilt_up_right
  label: Pan-Tilt UpRight
  kind: action
  command: "8{address} 01 06 01 {pan_speed} {tilt_speed} 02 01 FF"

- id: pantilt_down_left
  label: Pan-Tilt DownLeft
  kind: action
  command: "8{address} 01 06 01 {pan_speed} {tilt_speed} 01 02 FF"

- id: pantilt_down_right
  label: Pan-Tilt DownRight
  kind: action
  command: "8{address} 01 06 01 {pan_speed} {tilt_speed} 02 02 FF"

- id: pantilt_stop
  label: Pan-Tilt Stop
  kind: action
  command: "8{address} 01 06 01 {pan_speed} {tilt_speed} 03 03 FF"

- id: pantilt_absolute_position
  label: Pan-Tilt Absolute Position
  kind: action
  command: "8{address} 01 06 02 {pan_speed} {tilt_speed} 0{y1} 0{y2} 0{y3} 0{y4} 0{z1} 0{z2} 0{z3} 0{z4} FF"

- id: pantilt_relative_position
  label: Pan-Tilt Relative Position
  kind: action
  command: "8{address} 01 06 03 {pan_speed} {tilt_speed} 0{y1} 0{y2} 0{y3} 0{y4} 0{z1} 0{z2} 0{z3} 0{z4} FF"

- id: pantilt_home
  label: Pan-Tilt Home
  kind: action
  command: "8{address} 01 06 04 FF"

- id: pantilt_reset
  label: Pan-Tilt Reset
  kind: action
  command: "8{address} 01 06 05 FF"

- id: pantilt_limit_set
  label: Pan-Tilt Limit Set
  kind: action
  command: "8{address} 01 06 07 00 0{corner} 0{y1} 0{y2} 0{y3} 0{y4} 0{z1} 0{z2} 0{z3} 0{z4} FF"  # corner: 1=UpRight, 0=DownLeft

# --- Inquiry commands (kind: query) ---

- id: power_status_query
  label: Power Status Inquiry
  kind: query
  command: "8{address} 09 04 00 FF"

- id: zoom_position_query
  label: Zoom Position Inquiry
  kind: query
  command: "8{address} 09 04 47 FF"

- id: focus_mode_query
  label: Focus Mode Inquiry
  kind: query
  command: "8{address} 09 04 38 FF"

- id: focus_position_query
  label: Focus Position Inquiry
  kind: query
  command: "8{address} 09 04 48 FF"

- id: wb_mode_query
  label: White Balance Mode Inquiry
  kind: query
  command: "8{address} 09 04 35 FF"

- id: rgain_query
  label: R Gain Inquiry
  kind: query
  command: "8{address} 09 04 43 FF"

- id: bgain_query
  label: B Gain Inquiry
  kind: query
  command: "8{address} 09 04 44 FF"

- id: ae_mode_query
  label: AE Mode Inquiry
  kind: query
  command: "8{address} 09 04 39 FF"

- id: shutter_position_query
  label: Shutter Position Inquiry
  kind: query
  command: "8{address} 09 04 4A FF"

- id: iris_position_query
  label: Iris Position Inquiry
  kind: query
  command: "8{address} 09 04 4B FF"

- id: gain_position_query
  label: Gain Position Inquiry
  kind: query
  command: "8{address} 09 04 4C FF"

- id: bright_position_query
  label: Bright Position Inquiry
  kind: query
  command: "8{address} 09 04 4D FF"

- id: exp_comp_mode_query
  label: Exposure Compensation Mode Inquiry
  kind: query
  command: "8{address} 09 04 3E FF"

- id: exp_comp_position_query
  label: Exposure Compensation Position Inquiry
  kind: query
  command: "8{address} 09 04 4E FF"

- id: backlight_mode_query
  label: Backlight Mode Inquiry
  kind: query
  command: "8{address} 09 04 33 FF"

- id: aperture_query
  label: Aperture Inquiry
  kind: query
  command: "8{address} 09 04 42 FF"

- id: picture_effect_mode_query
  label: Picture Effect Mode Inquiry
  kind: query
  command: "8{address} 09 04 63 FF"

- id: memory_query
  label: Memory Last Operated Inquiry
  kind: query
  command: "8{address} 09 04 3F FF"

- id: sys_menu_mode_query
  label: System Menu Mode Inquiry
  kind: query
  command: "8{address} 09 06 06 FF"

- id: cam_id_query
  label: Camera ID Inquiry
  kind: query
  command: "8{address} 09 04 22 FF"

- id: version_query
  label: Camera Version Inquiry
  kind: query
  command: "8{address} 09 00 02 FF"

- id: info_display_query
  label: Information Display Inquiry
  kind: query
  command: "8{address} 09 7E 01 18 FF"

- id: video_system_query
  label: Video System Inquiry
  kind: query
  command: "8{address} 09 06 23 FF"

- id: ir_receive_query
  label: IR Receive Inquiry
  kind: query
  command: "8{address} 09 06 08 FF"

- id: pantilt_max_speed_query
  label: Pan-Tilt Max Speed Inquiry
  kind: query
  command: "8{address} 09 06 11 FF"

- id: pantilt_position_query
  label: Pan-Tilt Position Inquiry
  kind: query
  command: "8{address} 09 06 12 FF"

- id: pantilt_mode_query
  label: Pan-Tilt Mode Inquiry
  kind: query
  command: "8{address} 09 06 10 FF"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off, internal_power_circuit_error]
  description: Response to CAM_PowerInq. Maps to y0 50 02 FF (on), y0 50 03 FF (off/standby), y0 50 04 FF (internal power circuit error).

- id: zoom_position
  type: integer
  description: 4-byte zoom position from CAM_ZoomPosInq. Source provides 1x-20x optical reference table.

- id: focus_mode
  type: enum
  values: [auto, manual]
  description: y0 50 02 FF = Auto, y0 50 03 FF = Manual.

- id: focus_position
  type: integer
  description: 4-byte focus position from CAM_FocusPosInq.

- id: wb_mode
  type: enum
  values: [auto, indoor, outdoor, one_push_wb, manual]
  description: y0 50 00/01/02/03/05 FF.

- id: rgain
  type: integer
  description: 2-byte R gain from CAM_RGainInq.

- id: bgain
  type: integer
  description: 2-byte B gain from CAM_BGainInq.

- id: ae_mode
  type: enum
  values: [full_auto, manual, shutter_priority, iris_priority, bright]
  description: y0 50 00/03/0A/0B/0D FF.

- id: shutter_position
  type: integer
  description: 2-byte shutter position from CAM_ShutterPosInq.

- id: iris_position
  type: integer
  description: 2-byte iris position from CAM_IrisPosInq.

- id: gain_position
  type: integer
  description: 2-byte gain position from CAM_GainPosInq.

- id: bright_position
  type: integer
  description: 2-byte bright position from CAM_BrightPosInq.

- id: exp_comp_mode
  type: enum
  values: [on, off]
  description: y0 50 02 FF = On. (Off response not enumerated in source; mark source incomplete here.)

- id: exp_comp_position
  type: integer
  description: 2-byte exp comp position. Source table maps 0E..00 to +7..-7 (note: source has a duplicate row at "02/-6" - likely typo for 01/-6).

- id: backlight_mode
  type: enum
  values: [on]
  description: y0 50 02 FF = On. (Off response not enumerated in source.)

- id: aperture_gain
  type: integer
  description: 2-byte aperture gain from CAM_ApertureInq.

- id: picture_effect_mode
  type: enum
  values: [off, neg_art, bw]
  description: y0 50 00/02/04 FF.

- id: memory_last_operated
  type: integer
  description: Single-byte memory number from CAM_MemoryInq.

- id: sys_menu_mode
  type: enum
  values: [on]
  description: y0 50 02 FF = On.

- id: camera_id
  type: string
  description: 4-hex-digit camera ID (0000-FFFF).

- id: camera_version
  type: object
  description: |
    From CAM_VersionInq response y0 50 00 01 mn pq rs tu vw FF:
    m,n,p,q: Model Code (0504 in source)
    r,s,t,u: ROM version
    v,w: Socket number (02)

- id: info_display_state
  type: enum
  values: [on]
  description: y0 50 02 FF = On.

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
  description: Maps y0 50 00..0F FF per VideoSystemInq.

- id: ir_receive_state
  type: enum
  values: [on]
  description: y0 50 02 FF = On.

- id: pantilt_max_speed
  type: object
  description: ww = Pan Max Speed, zz = Tilt Max Speed (1 byte each).

- id: pantilt_position
  type: object
  description: wwww (4-byte pan position) + zzzz (4-byte tilt position).

- id: pantilt_mode
  type: string
  description: p,q,r,s bytes from y0 50 pq rs FF (Pan/Tilt Status bits; field meanings not stated in source).

- id: ack
  type: bytes
  description: "z0 4{socket} FF - command accepted. z = device address + 8."

- id: completion
  type: bytes
  description: "z0 5{socket} FF - command executed. z = device address + 8."

- id: error_syntax
  type: bytes
  description: "z0 60 02 FF - syntax error or illegal parameters."

- id: error_buffer_full
  type: bytes
  description: "z0 60 03 FF - both sockets busy, command rejected."

- id: error_command_canceled
  type: bytes
  description: "z0 6{socket} 04 FF - command canceled in specified socket."

- id: error_no_socket
  type: bytes
  description: "z0 6{socket} 05 FF - no command in specified socket, or invalid socket."

- id: error_command_not_executable
  type: bytes
  description: "z0 6{socket} 41 FF - command not executable in current state (e.g. focus manual commands during auto focus)."
```

## Variables
```yaml
- id: pan_speed
  type: integer
  range: [0x01, 0x18]
  description: Pan speed for pan-tilt drive commands. Low to high.

- id: tilt_speed
  type: integer
  range: [0x01, 0x14]
  description: Tilt speed for pan-tilt drive commands. Low to high.

- id: zoom_speed
  type: integer
  range: [0, 7]
  description: Variable zoom speed (0 = low, 7 = high).

- id: focus_speed
  type: integer
  range: [0, 7]
  description: Variable focus speed (0 = low, 7 = high).

- id: memory_number
  type: integer
  range: [0, 255]
  description: Preset memory slot. Source marks 93, 95, 96, 99, 100-108 as reserved (non-overwritable proprietary functions).

- id: camera_address
  type: integer
  range: [1, 7]
  description: VISCA camera address (set via OSD SYSTEM > ADDRESS). Becomes "8x" address byte. Broadcast uses 0x88.

- id: ir_address
  type: integer
  range: [1, 4]
  description: IR remote address (OSD SYSTEM > IR ADDRESS). Not part of VISCA command encoding per source.
```

## Macros
```yaml
# Reserved preset numbers invoke proprietary functions. Each is a memory_recall with the listed number.
- id: preset_cruise
  label: Cruise through presets 0-29 (10s intervals)
  steps:
    - action: memory_recall
      params: { memory: 93 }

- id: preset_open_osd
  label: Open OSD Menu
  steps:
    - action: memory_recall
      params: { memory: 95 }

- id: preset_clear_all_user_presets
  label: Clear All User Presets
  steps:
    - action: memory_recall
      params: { memory: 96 }

- id: preset_reboot
  label: Reboot Camera
  steps:
    - action: memory_recall
      params: { memory: 99 }

# Video format presets - each is a memory_recall with the listed number.
- id: preset_video_1080p50
  label: Video Format 1920x1080p50
  steps:
    - action: memory_recall
      params: { memory: 100 }

- id: preset_video_1080p25
  label: Video Format 1920x1080p25
  steps:
    - action: memory_recall
      params: { memory: 101 }

- id: preset_video_1080i50
  label: Video Format 1920x1080i50
  steps:
    - action: memory_recall
      params: { memory: 102 }

- id: preset_video_720p50
  label: Video Format 1280x720p50
  steps:
    - action: memory_recall
      params: { memory: 103 }

- id: preset_video_1080p60
  label: Video Format 1920x1080p60
  steps:
    - action: memory_recall
      params: { memory: 105 }

- id: preset_video_1080p30
  label: Video Format 1920x1080p30
  steps:
    - action: memory_recall
      params: { memory: 106 }

- id: preset_video_1080i60
  label: Video Format 1920x1080i60
  steps:
    - action: memory_recall
      params: { memory: 107 }

- id: preset_video_720p60
  label: Video Format 1280x720p60
  steps:
    - action: memory_recall
      params: { memory: 108 }
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements
# stated in source beyond the "Privacy" section describing a tilt-backwards posture for
# inactive cameras (no specific command provided in source - must be done via standard
# pantilt commands or OSD menu).
```

## Notes
- Default IP 192.168.18.77, subnet 255.255.255.0 (from OSD system settings section). Not part of the AI4AV Transport.addressing block because that block carries port/auth, not device IP.
- VISCA over IP uses TCP port 5500. Serial VISCA at 9600 baud. Both available; VISCA command set is identical on both transports.
- Serial data_bits / parity / stop_bits / flow_control not specified in source — leave as UNRESOLVED.
- OSD protocol options: VISCA, PELCO-D, PELCO-P. This spec covers VISCA only; PELCO command sets are not in source.
- OSD baud rate range: 2400-34800 (label appears to be a typo in source — "34800" should likely be "38400" or similar; not corrected).
- OSD RS485 port: HALF-DUPLEX, 1/2 — duplex setting, not control commands.
- Camera model "1 Beyond" (Crestron 1 Beyond PTZ Series) covers four SKU variants: -N-W-1B, -N-SLVR-1B, -W-1B, -SLVR-1B. All share the VISCA command set documented here.
- RTSP port 554 or 5000 (default). Video transport only — not modeled in control spec.
- The "Privacy" section in source describes tilting camera backwards when not in use, but does not list a specific command. Implementers should use standard pantilt commands.
- Source exposure-comp table has a duplicate row (02 / -6 listed twice; one should be 01 / -6). Flagged for review.

<!-- UNRESOLVED: firmware version compatibility not stated in source.
     UNRESOLVED: serial data_bits, parity, stop_bits, flow_control not stated in source.
     UNRESOLVED: RTSP authentication not stated in source (video stream, out of scope).
     UNRESOLVED: ceiling-mount mode disables tracking — does not affect VISCA control.
     UNRESOLVED: pan-tilt status bit field (p,q,r,s) meanings not stated in source. -->

## Provenance

```yaml
source_domains:
  - crestron.com
source_urls:
  - https://www.crestron.com/getmedia/677f2d1d-8f17-44eb-b5e9-9db167b4eaa6/mg_pm_1-beyond-ptz
retrieved_at: 2026-04-30T04:31:09.936Z
last_checked_at: 2026-06-02T17:21:57.461Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:57.461Z
matched_actions: 126
action_count: 126
confidence: medium
summary: "All 126 spec actions matched to source opcodes; transport parameters (port 5500, baud 9600) verified; source fully represented. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RTSP/video system details (ports 554/5000) are video transport only, not control — not modeled here."
- "data_bits not stated in source"
- "parity not stated in source"
- "stop_bits not stated in source"
- "flow_control not stated in source"
- "no safety warnings, interlock procedures, or power-on sequencing requirements"
- "firmware version compatibility not stated in source."
- "serial data_bits, parity, stop_bits, flow_control not stated in source."
- "RTSP authentication not stated in source (video stream, out of scope)."
- "ceiling-mount mode disables tracking — does not affect VISCA control."
- "pan-tilt status bit field (p,q,r,s) meanings not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
