---
spec_id: admin/sony-ilme-fr7
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony ILME-FR7 Control Spec"
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
  - github.com
  - belle-nuit.com
  - drastic.tv
source_urls:
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://github.com/hideakitai/Sony9PinRemote
  - https://belle-nuit.com/archives/9pin.html
  - https://www.drastic.tv/support-59/legacysoftwarehardware/37-miscellaneous-legacy/180-vvcr-422-serial-protocol
retrieved_at: 2026-04-30T04:24:12.329Z
last_checked_at: 2026-05-14T18:17:20.786Z
generated_at: 2026-05-14T18:17:20.786Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:20.786Z
  matched_actions: 111
  action_count: 122
  confidence: high
  summary: "All 111 spec actions matched to VISCA over IP source commands; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Sony ILME-FR7 Control Spec

## Summary
Sony ILME-FR7 is a PTZ camera system supporting VISCA over IP control via UDP on port 52381. Supports up to 5 simultaneous controllers, pan/tilt/zoom/focus, ND filter, iris, gain, white balance, color correction, detail, knee, and tally functions. Command/ACK protocol with 2-socket command buffering.

<!-- UNRESOLVED: source document is VISCA over IP; RS-422 serial variant not present in this source. -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 52381
  base_url: ""  # UNRESOLVED: IP address set via setup software, not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # Power On/Standby commands present
- routable   # Pan/tilt/zoom drive commands present
- queryable  # Inquiry commands returning state present
- levelable  # ND filter, iris, gain, detail level, knee, white balance R/B gain, tint, color temp, offset commands present
```

## Actions
```yaml
- id: nd_filter_set
  label: ND Filter Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Preset, 1=Variable
    - name: value
      type: integer
      description: p: 0=Preset, 1=Variable
    - name: p
      type: integer
      description: 0=Preset, 1=Variable

- id: nd_variable_up
  label: ND Variable Up
  kind: action
  params: []

- id: nd_variable_down
  label: ND Variable Down
  kind: action
  params: []

- id: nd_variable_direct
  label: ND Variable Direct
  kind: action
  params:
    - name: pp
      type: integer
      description: 00 (1/4) to 14 (1/128)

- id: auto_nd_filter
  label: Auto ND Filter
  kind: action
  params:
    - name: p
      type: integer
      description: 2=On, 3=Off

- id: nd_clear
  label: ND Clear
  kind: action
  params:
    - name: p
      type: integer
      description: 2=Filtered, 3=Clear

- id: nd_preset
  label: ND Preset
  kind: action
  params:
    - name: p
      type: integer
      description: 0=Clear, 1=Preset 1, 2=Preset 2, 3=Preset 3

- id: iris_up
  label: Iris Up
  kind: action
  params:
    - name: pp
      type: integer
      description: Step 01 to FF (1/256 EV per step)

- id: iris_down
  label: Iris Down
  kind: action
  params:
    - name: pp
      type: integer
      description: Step 01 to FF

- id: auto_iris
  label: Auto Iris
  kind: action
  params:
    - name: p
      type: integer
      description: 2=On, 3=Off

- id: agc
  label: AGC
  kind: action
  params:
    - name: p
      type: integer
      description: 2=On, 3=Off

- id: auto_shutter
  label: Auto Shutter
  kind: action
  params:
    - name: p
      type: integer
      description: 2=On, 3=Off

- id: ae_level_up
  label: AE Level Up
  kind: action
  params: []

- id: ae_level_down
  label: AE Level Down
  kind: action
  params: []

- id: backlight_compensation
  label: Backlight Compensation
  kind: action
  params:
    - name: p
      type: integer
      description: 2=On, 3=Off

- id: spotlight_compensation
  label: Spotlight Compensation
  kind: action
  params:
    - name: p
      type: integer
      description: 2=On, 3=Off

- id: white_balance_mode
  label: White Balance Mode
  kind: action
  params:
    - name: p
      type: integer
      description: 4=ATW, 5=Memory A, A=Preset

- id: wb_set
  label: WB Set
  kind: action
  params: []

- id: preset_white_up
  label: Preset White Up
  kind: action
  params:
    - name: p
      type: integer
      description: 1=Preset
    - name: qq
      type: integer
      description: Step 01 to FF

- id: preset_white_down
  label: Preset White Down
  kind: action
  params:
    - name: p
      type: integer
      description: 1=Preset
    - name: qq
      type: integer
      description: Step 01 to FF

- id: preset_white_direct
  label: Preset White Direct
  kind: action
  params:
    - name: p
      type: integer
      description: 1=Preset
    - name: rrrr
      type: integer
      description: Preset White 07D0 (2000 K) to 3A98 (15000 K)

- id: r_gain_up
  label: R Gain Up
  kind: action
  params:
    - name: p
      type: integer
      description: 2=Memory A
    - name: qq
      type: integer
      description: Step 01 to FF

- id: r_gain_down
  label: R Gain Down
  kind: action
  params:
    - name: p
      type: integer
      description: 2=Memory A
    - name: qq
      type: integer
      description: Step 01 to FF

- id: r_gain_direct
  label: R Gain Direct
  kind: action
  params:
    - name: p
      type: integer
      description: 2=Memory A
    - name: rrrr
      type: integer
      description: R Gain 0000 (-99.0) to 03DE (0.0) to 07BC (+99.0)

- id: b_gain_up
  label: B Gain Up
  kind: action
  params:
    - name: p
      type: integer
      description: 2=Memory A
    - name: qq
      type: integer
      description: Step 01 to FF

- id: b_gain_down
  label: B Gain Down
  kind: action
  params:
    - name: p
      type: integer
      description: 2=Memory A
    - name: qq
      type: integer
      description: Step 01 to FF

- id: b_gain_direct
  label: B Gain Direct
  kind: action
  params:
    - name: p
      type: integer
      description: 2=Memory A
    - name: rrrr
      type: integer
      description: B Gain 0000 (-99.0) to 03DE (0.0) to 07BC (+99.0)

- id: color_temp_up
  label: Color Temp Up
  kind: action
  params:
    - name: p
      type: integer
      description: 2=Memory A
    - name: qq
      type: integer
      description: Step 01 to 1E

- id: color_temp_down
  label: Color Temp Down
  kind: action
  params:
    - name: p
      type: integer
      description: 2=Memory A
    - name: qq
      type: integer
      description: Step 01 to 1E

- id: color_temp_direct
  label: Color Temp Direct
  kind: action
  params:
    - name: p
      type: integer
      description: 2=Memory A
    - name: rrrr
      type: integer
      description: Color Temp 07D0 (2000 K) to 3A98 (15000 K)

- id: tint_up
  label: Tint Up
  kind: action
  params:
    - name: p
      type: integer
      description: 2=Memory A
    - name: qq
      type: integer
      description: Step 01 to FF

- id: tint_down
  label: Tint Down
  kind: action
  params:
    - name: p
      type: integer
      description: 2=Memory A
    - name: qq
      type: integer
      description: Step 01 to FF

- id: tint_direct
  label: Tint Direct
  kind: action
  params:
    - name: p
      type: integer
      description: 2=Memory A
    - name: rr
      type: integer
      description: Tint 00 (-99) to 63 (0) to C6 (+99)

- id: offset_color_temp_up
  label: Offset Color Temp Up
  kind: action
  params:
    - name: p
      type: integer
      description: 0=ATW
    - name: qq
      type: integer
      description: Step 1 to FF

- id: offset_color_temp_down
  label: Offset Color Temp Down
  kind: action
  params:
    - name: p
      type: integer
      description: 0=ATW
    - name: qq
      type: integer
      description: Step 1 to FF

- id: offset_color_temp_direct
  label: Offset Color Temp Direct
  kind: action
  params:
    - name: p
      type: integer
      description: 0=ATW
    - name: rr
      type: integer
      description: Offset Color Temp 00 (-99) to 63 (0) to C6 (+99)

- id: offset_tint_up
  label: Offset Tint Up
  kind: action
  params:
    - name: p
      type: integer
      description: 0=ATW
    - name: qq
      type: integer
      description: Step 1 to FF

- id: offset_tint_down
  label: Offset Tint Down
  kind: action
  params:
    - name: p
      type: integer
      description: 0=ATW
    - name: qq
      type: integer
      description: Step 1 to FF

- id: offset_tint_direct
  label: Offset Tint Direct
  kind: action
  params:
    - name: p
      type: integer
      description: 0=ATW
    - name: rr
      type: integer
      description: Offset Tint 00 (-99) to 63 (0) to C6 (+99)

- id: master_black_up
  label: Master Black Up
  kind: action
  params:
    - name: pp
      type: integer
      description: Step 01 to FF

- id: master_black_down
  label: Master Black Down
  kind: action
  params:
    - name: pp
      type: integer
      description: Step 01 to FF

- id: master_black_direct
  label: Master Black Direct
  kind: action
  params:
    - name: qqqq
      type: integer
      description: Master Black 0000 (-99.0) to 03DE (0.0) to 07BC (+99.0)

- id: r_black_up
  label: R Black Up
  kind: action
  params:
    - name: pp
      type: integer
      description: Step 01 to FF

- id: r_black_down
  label: R Black Down
  kind: action
  params:
    - name: pp
      type: integer
      description: Step 01 to FF

- id: r_black_direct
  label: R Black Direct
  kind: action
  params:
    - name: qqqq
      type: integer
      description: R Black 0000 (-99.0) to 03DE (0.0) to 07BC (+99.0)

- id: b_black_up
  label: B Black Up
  kind: action
  params:
    - name: pp
      type: integer
      description: Step 01 to FF

- id: b_black_down
  label: B Black Down
  kind: action
  params:
    - name: pp
      type: integer
      description: Step 01 to FF

- id: b_black_direct
  label: B Black Direct
  kind: action
  params:
    - name: qqqq
      type: integer
      description: B Black 0000 (-99.0) to 03DE (0.0) to 07BC (+99.0)

- id: detail_setting
  label: Detail Setting
  kind: action
  params:
    - name: p
      type: integer
      description: 2=On, 3=Off

- id: detail_level_up
  label: Detail Level Up
  kind: action
  params: []

- id: detail_level_down
  label: Detail Level Down
  kind: action
  params: []

- id: detail_level_direct
  label: Detail Level Direct
  kind: action
  params:
    - name: pp
      type: integer
      description: Detail Level 00 (-7) to 07 (0) to 0E (+7)

- id: knee_setting
  label: Knee Setting
  kind: action
  params:
    - name: p
      type: integer
      description: 2=On, 3=Off

- id: knee_mode
  label: Knee Mode
  kind: action
  params:
    - name: p
      type: integer
      description: 0=Auto, 4=Manual

- id: knee_slope
  label: Knee Slope
  kind: action
  params:
    - name: pp
      type: integer
      description: Knee Slope 00 (-99) to 63 (0) to C6 (+99)

- id: knee_point
  label: Knee Point
  kind: action
  params:
    - name: pp
      type: integer
      description: Knee Point 00 (75%) to 22 (109%)

- id: zoom_tele_standard
  label: Zoom Tele Standard Speed
  kind: action
  params: []

- id: zoom_wide_standard
  label: Zoom Wide Standard Speed
  kind: action
  params: []

- id: zoom_tele_variable
  label: Zoom Tele Variable Speed
  kind: action
  params:
    - name: p
      type: integer
      description: Speed 0 (Slow) to 7 (Fast)

- id: zoom_wide_variable
  label: Zoom Wide Variable Speed
  kind: action
  params:
    - name: p
      type: integer
      description: Speed 0 (Slow) to 7 (Fast)

- id: zoom_stop
  label: Zoom Stop
  kind: action
  params: []

- id: zoom_tele_high_res
  label: Zoom Tele High Resolution Speed
  kind: action
  params:
    - name: pppp
      type: integer
      description: Speed 0000 (Slow) to 7FFE (Fast)

- id: zoom_wide_high_res
  label: Zoom Wide High Resolution Speed
  kind: action
  params:
    - name: pppp
      type: integer
      description: Speed 0000 (Slow) to 7FFE (Fast)

- id: zoom_stop_high_res
  label: Zoom Stop High Resolution
  kind: action
  params: []

- id: zoom_direct
  label: Zoom Direct
  kind: action
  params:
    - name: zzzz
      type: integer
      description: Zoom Position (0000 Wide to 6000 Tele)

- id: focus_mode
  label: Focus Mode
  kind: action
  params:
    - name: pp
      type: integer
      description: 02=Auto, 03=Manual, 10=Toggle

- id: focus_far_standard
  label: Focus Far Standard Speed
  kind: action
  params: []

- id: focus_near_standard
  label: Focus Near Standard Speed
  kind: action
  params: []

- id: focus_far_variable
  label: Focus Far Variable Speed
  kind: action
  params:
    - name: p
      type: integer
      description: Speed 0 (Slow) to 7 (Fast)

- id: focus_near_variable
  label: Focus Near Variable Speed
  kind: action
  params:
    - name: p
      type: integer
      description: Speed 0 (Slow) to 7 (Fast)

- id: focus_stop
  label: Focus Stop
  kind: action
  params: []

- id: focus_direct
  label: Focus Direct
  kind: action
  params:
    - name: pppp
      type: integer
      description: Focus Position 0000 (Far) to FFFF (Near)

- id: push_af_mf
  label: Push AF/MF
  kind: action
  params:
    - name: p
      type: integer
      description: 0=Release, 1=Press

- id: recording
  label: Recording Press/Release
  kind: action
  params:
    - name: p
      type: integer
      description: 0=Release, 1=Press

- id: audio_level_control
  label: Audio Level Control
  kind: action
  params:
    - name: p
      type: integer
      description: 1=CH1, 2=CH2
    - name: q
      type: integer
      description: 0=Manual, 1=Auto

- id: input_level_up
  label: Input Level Up
  kind: action
  params:
    - name: p
      type: integer
      description: 0=Master, 1=CH1, 2=CH2
    - name: qq
      type: integer
      description: Step 01 to 0A

- id: input_level_down
  label: Input Level Down
  kind: action
  params:
    - name: p
      type: integer
      description: 0=Master, 1=CH1, 2=CH2
    - name: qq
      type: integer
      description: Step 01 to 0A

- id: input_level_direct
  label: Input Level Direct
  kind: action
  params:
    - name: p
      type: integer
      description: 0=Master, 1=CH1, 2=CH2
    - name: qq
      type: integer
      description: Level 00 (0) to 63 (99)

- id: pan_tilt_up
  label: Pan/Tilt Up
  kind: action
  params:
    - name: vv
      type: integer
      description: Pan speed 01 to 18/32
    - name: ww
      type: integer
      description: Tilt speed 01 to 18/32

- id: pan_tilt_down
  label: Pan/Tilt Down
  kind: action
  params:
    - name: vv
      type: integer
      description: Pan speed 01 to 18/32
    - name: ww
      type: integer
      description: Tilt speed 01 to 18/32

- id: pan_tilt_left
  label: Pan/Tilt Left
  kind: action
  params:
    - name: vv
      type: integer
      description: Pan speed 01 to 18/32
    - name: ww
      type: integer
      description: Tilt speed 01 to 18/32

- id: pan_tilt_right
  label: Pan/Tilt Right
  kind: action
  params:
    - name: vv
      type: integer
      description: Pan speed 01 to 18/32
    - name: ww
      type: integer
      description: Tilt speed 01 to 18/32

- id: pan_tilt_upleft
  label: Pan/Tilt UpLeft
  kind: action
  params:
    - name: vv
      type: integer
      description: Pan speed 01 to 18/32
    - name: ww
      type: integer
      description: Tilt speed 01 to 18/32

- id: pan_tilt_upright
  label: Pan/Tilt UpRight
  kind: action
  params:
    - name: vv
      type: integer
      description: Pan speed 01 to 18/32
    - name: ww
      type: integer
      description: Tilt speed 01 to 18/32

- id: pan_tilt_downleft
  label: Pan/Tilt DownLeft
  kind: action
  params:
    - name: vv
      type: integer
      description: Pan speed 01 to 18/32
    - name: ww
      type: integer
      description: Tilt speed 01 to 18/32

- id: pan_tilt_downright
  label: Pan/Tilt DownRight
  kind: action
  params:
    - name: vv
      type: integer
      description: Pan speed 01 to 18/32
    - name: ww
      type: integer
      description: Tilt speed 01 to 18/32

- id: pan_tilt_stop
  label: Pan/Tilt Stop
  kind: action
  params:
    - name: vv
      type: integer
      description: Pan speed 01 to 18/32
    - name: ww
      type: integer
      description: Tilt speed 01 to 18/32

- id: pan_tilt_abs
  label: Pan/Tilt Absolute Position
  kind: action
  params:
    - name: vv
      type: integer
      description: Pan speed 01 to 18/32
    - name: ww
      type: integer
      description: Tilt speed 00=Synced, 01 to 18/32
    - name: ppppp
      type: integer
      description: Pan coordinates
    - name: ttttt
      type: integer
      description: Tilt coordinates

- id: pan_tilt_rel
  label: Pan/Tilt Relative Position
  kind: action
  params:
    - name: vv
      type: integer
      description: Pan speed 01 to 18/32
    - name: ww
      type: integer
      description: Tilt speed 00=Synced, 01 to 18/32
    - name: ppppp
      type: integer
      description: Pan movement amount
    - name: ttttt
      type: integer
      description: Tilt movement amount

- id: pan_tilt_home
  label: Pan/Tilt Home
  kind: action
  params: []

- id: pan_tilt_reset
  label: Pan/Tilt Reset
  kind: action
  params: []

- id: ramp_curve
  label: Ramp Curve
  kind: action
  params:
    - name: p
      type: integer
      description: Ramp Curve 1 to 9

- id: speed_step
  label: Speed Step
  kind: action
  params:
    - name: pp
      type: integer
      description: 08=Normal, 18=Extended

- id: speed_mode
  label: Speed Mode
  kind: action
  params:
    - name: p
      type: integer
      description: 3=Normal, 2=Slow

- id: pan_tilt_limit_set
  label: Pan/Tilt Limit Set
  kind: action
  params:
    - name: q
      type: integer
      description: 0=DownLeft, 1=UpRight
    - name: ppppp
      type: integer
      description: Pan coordinates
    - name: ttttt
      type: integer
      description: Tilt coordinates

- id: pan_tilt_limit_clear
  label: Pan/Tilt Limit Clear
  kind: action
  params:
    - name: q
      type: integer
      description: 0=DownLeft, 1=UpRight

- id: preset_mode
  label: Preset Mode
  kind: action
  params:
    - name: pp
      type: integer
      description: 01=POSITION, 10=TRACE

- id: preset_set
  label: Preset Set
  kind: action
  params:
    - name: pp
      type: integer
      description: Preset number 00 to 63 (1 to 64)

- id: preset_reset
  label: Preset Reset
  kind: action
  params:
    - name: pp
      type: integer
      description: Preset number 00 to 63 (1 to 64)

- id: preset_recall
  label: Preset Recall
  kind: action
  params:
    - name: pp
      type: integer
      description: Preset number 00 to 63 (1 to 64)

- id: preset_speed_select
  label: Preset Speed Select
  kind: action
  params:
    - name: p
      type: integer
      description: 1=Separate, 2=Common

- id: preset_speed_separate
  label: Preset Speed Separate
  kind: action
  params:
    - name: pp
      type: integer
      description: Preset number 00 to 63
    - name: qq
      type: integer
      description: Separate speed 01 to 32

- id: preset_speed_common
  label: Preset Speed Common
  kind: action
  params:
    - name: pp
      type: integer
      description: Common speed 01 to 32

- id: ptz_trace_rec_start
  label: PTZ Trace Rec Start
  kind: action
  params:
    - name: p
      type: integer
      description: PTZ TRACE number 0 to F (1 to 16)

- id: ptz_trace_rec_stop
  label: PTZ Trace Rec Stop
  kind: action
  params: []

- id: ptz_trace_play_prepare
  label: PTZ Trace Play Prepare
  kind: action
  params:
    - name: p
      type: integer
      description: PTZ TRACE number 0 to F (1 to 16)

- id: ptz_trace_play_start
  label: PTZ Trace Play Start
  kind: action
  params: []

- id: ptz_trace_delete
  label: PTZ Trace Delete
  kind: action
  params:
    - name: p
      type: integer
      description: PTZ TRACE number 0 to F (1 to 16)

- id: power
  label: Power
  kind: action
  params:
    - name: p
      type: integer
      description: 2=On, 3=Standby

- id: display
  label: Display Press/Release
  kind: action
  params:
    - name: p
      type: integer
      description: 0=Release, 1=Press

- id: assignable_button
  label: Assignable Button Press/Release
  kind: action
  params:
    - name: pp
      type: integer
      description: 01 to 09=Button 1 to 9, 7F=Focus Hold
    - name: q
      type: integer
      description: 0=Release, 1=Press

- id: multi_function_dial_set
  label: Multi Function Dial Set
  kind: action
  params:
    - name: p
      type: integer
      description: 1=Set
    - name: qq
      type: integer
      description: 00=Release, 01=Press

- id: multi_function_dial_2
  label: Multi Function Dial 2 CW/CCW
  kind: action
  params:
    - name: p
      type: integer
      description: 2=CW, 3=CCW
    - name: qq
      type: integer
      description: Step 01 to FF

- id: menu_on_off
  label: Menu On/Off
  kind: action
  params:
    - name: pp
      type: integer
      description: 2=On, 3=Off, 10=Toggle

- id: multi_selector
  label: Multi Selector
  kind: action
  params:
    - name: pp
      type: integer
      description: 31=Up, 32=Down, 13=Left, 23=Right, 11=Up-Left, 21=Up-Right, 12=Down-Left, 22=Down-Right, 70=Set, 71=Cancel/Back
    - name: q
      type: integer
      description: 0=Release, 1=Press

- id: direct_menu
  label: Direct Menu Press/Release
  kind: action
  params:
    - name: pp
      type: integer
      description: 00=ND Filter, 01=Iris, 02=ISO/Gain, 03=Shutter, 04=AE Level/Mode, 7F=Direct Menu exit
    - name: q
      type: integer
      description: 0=Release, 1=Press

- id: tally_red
  label: Tally Red
  kind: action
  params:
    - name: p
      type: integer
      description: 2=On, 3=Off

- id: tally_green
  label: Tally Green
  kind: action
  params:
    - name: p
      type: integer
      description: 2=On, 3=Off

- id: color_bar
  label: Color Bar
  kind: action
  params:
    - name: p
      type: integer
      description: 2=On, 3=Off

- id: lens_init
  label: Lens Init
  kind: action
  params: []

- id: if_clear
  label: IF_Clear
  kind: action
  description: Clears command buffer in unit
  params: []

- id: command_cancel
  label: Command Cancel
  kind: action
  params:
    - name: z
      type: integer
      description: Socket number to cancel
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  description: Power On/Standby state; reply y0 50 0p FF where p: 2=On, 3=Standby

- id: shooting_mode
  type: enum
  values: [custom, cine_ei, flexible_iso, cine_ei_quick]
  description: Shooting mode; reply y0 50 0p FF where p: 0=Custom, 1=Cine EI, 2=Flexible ISO, 3=Cine EI Quick

- id: nd_filter_mode
  type: enum
  values: [preset, variable]
  description: ND filter mode; reply y0 50 0p FF where p: 0=Preset, 1=Variable

- id: zoom_position
  type: integer
  description: Zoom position 0000 to 6000; reply y0 50 0z 0z 0z 0z FF

- id: focus_mode_state
  type: enum
  values: [auto, manual]
  description: Focus mode; reply y0 50 pp FF where pp: 02=Auto, 03=Manual

- id: focus_position
  type: integer
  description: Focus position 0000 (Far) to FFFF (Near); reply y0 50 0p 0p 0p 0p FF

- id: pan_tilt_position
  type: object
  properties:
    pan: integer
    tilt: integer
  description: Pan/Tilt position; reply y0 50 0p 0p 0p 0p 0p 0t 0t 0t 0t 0t FF

- id: pan_tilt_status
  type: object
  description: Pan/Tilt status bits; reply y0 50 pp pp FF (see Pan/Tilt Status Codes table)

- id: recording_status
  type: enum
  values: [standby, recording]
  description: Recording status; reply y0 50 0p FF where p: 0=Standby, 1=Recording

- id: white_balance_mode_state
  type: enum
  values: [atw, memory_a, preset]
  description: White balance mode; reply y0 50 0p FF where p: 4=ATW, 5=Memory A, A=Preset

- id: r_gain
  type: integer
  description: R Gain 0000 to 07BC; reply y0 50 0r 0r 0r 0r FF

- id: b_gain
  type: integer
  description: B Gain 0000 to 07BC; reply y0 50 0r 0r 0r 0r FF

- id: color_temp
  type: integer
  description: Color temp 07D0 to 3A98; reply y0 50 0r 0r 0r 0r FF

- id: tint
  type: integer
  description: Tint 00 to C6; reply y0 50 00 00 0r 0r FF

- id: master_black
  type: integer
  description: Master black 0000 to 07BC; reply y0 50 0q 0q 0q 0q FF

- id: detail_level
  type: integer
  description: Detail level 00 to 0E; reply y0 50 00 00 0p 0p FF

- id: knee_setting_state
  type: enum
  values: [on, off]
  description: Knee setting; reply y0 50 0p FF where p: 2=On, 3=Off

- id: knee_mode_state
  type: enum
  values: [auto, manual]
  description: Knee mode; reply y0 50 0p FF where p: 0=Auto, 4=Manual

- id: ramp_curve_state
  type: integer
  description: Ramp curve 1 to 9; reply y0 50 0p FF

- id: speed_step_state
  type: enum
  values: [normal, extended]
  description: Speed step; reply y0 50 pp FF where pp: 08=Normal, 18=Extended

- id: speed_mode_state
  type: enum
  values: [normal, slow]
  description: Speed mode; reply y0 50 0p FF where p: 3=Normal, 2=Slow

- id: preset_mode_state
  type: enum
  values: [position, trace]
  description: Preset mode; reply y0 50 pp FF where pp: 01=POSITION, 10=TRACE

- id: preset_speed_mode
  type: enum
  values: [separate, common]
  description: Preset speed mode; reply y0 50 0p FF where p: 1=Separate, 2=Common

- id: ptz_trace_status
  type: enum
  values: [none, recording, preparing, ready_for_play, playing, deleting, ready_for_record]
  description: PTZ trace status; reply y0 50 0p FF

- id: assignable_button_lamp
  type: enum
  values: [not_lit, lit]
  description: Assignable button lamp state; reply y0 50 0q FF where q: 0=Not lit, 1=Lit

- id: menu_state
  type: enum
  values: [on, off]
  description: Menu on/off; reply y0 50 pp FF where pp: 2=On, 3=Off

- id: tally_red_state
  type: enum
  values: [on, off]
  description: Tally red; reply y0 50 0p FF where p: 2=On, 3=Off

- id: tally_green_state
  type: enum
  values: [on, off]
  description: Tally green; reply y0 50 0p FF where p: 2=On, 3=Off

- id: color_bar_state
  type: enum
  values: [on, off]
  description: Color bar; reply y0 50 0p FF where p: 2=On, 3=Off

- id: cam_version
  type: object
  properties:
    vendor_id: string
    model_id: string
    rom_revision: string
    max_socket: integer
  description: VISCA interface version info; reply y0 50 GG GG HH HH JJ JJ KK FF

- id: camera_generation
  type: object
  description: Camera generation info; reply y0 50 0h 0k 0m 0n 0p 0q 0r 0s 0t 0u uu 0v vv FF

- id: ack
  type: object
  description: ACK message; reply y0 4z FF (z: Socket No.)

- id: completion
  type: object
  description: Completion message; reply y0 5z FF (z: Socket No.)

- id: error
  type: enum
  values: [syntax_error, command_buffer_full, command_canceled, no_socket, command_not_executable]
  description: Error message; reply y0 6z pp FF where pp: 02=Syntax Error, 03=Command Buffer Full, 04=Command Canceled, 05=No Socket, 41=Command Not Executable
```

## Variables
```yaml
# UNRESOLVED: source documents PTZ parameters as discrete commands, not as settable Variables.
# Pan/tilt position, zoom, focus are controlled via action commands.
```

## Events
```yaml
# UNRESOLVED: source describes only request/response pattern (controller queries, device replies).
# No unsolicited event messages documented.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Tally lamp auto-off: if not receiving TALLY ON command for 15 seconds after receiving TALLY ON, lamp turns off. If tally lit by input other than VISCA over IP (e.g., OPTION connector or CGI command), lamp will not auto-off."
    source: "Limitations section"
  - description: "VISCA Network Change command not supported over IP."
    source: "Limitations section"
  - description: "Do not use broadcast address for VISCA messages - serial communication required; operations not guaranteed."
    source: "Limitations section"
  - description: "Do not use Address Set command - requires serial communication; operations not guaranteed."
    source: "Limitations section"
```

## Notes
- Device: Sony ILME-FR7/FR7K PTZ camera system (from source document)
- Protocol: VISCA over IP using UDP on port 52381 (big-endian, LSB first)
- Command format: 9–24 byte packets (8-byte header + 1–16 byte payload)
- Header: [payload type (2 bytes), payload length (2 bytes), sequence number (4 bytes)]
- Payload types: 0x01/0x00=VISCA command, 0x01/0x10=VISCA inquiry, 0x01/0x11=VISCA reply, 0x01/0x20=device setting command
- Controller address locked to 0, peripheral address locked to 1 over IP
- Two command sockets (buffers) for concurrent command execution
- Delivery confirmation and retransmission handled by application layer (UDP)
- Network setup port: 52380 (for camera IP configuration via broadcast)
- WRITE flag auto-off 20 minutes after first power-on; can be set via CGI command
- Max 8-character camera name (alphanumeric + spaces)
- Pan range: –170° to +170°; Tilt range (desktop): –30° to +195°; Tilt range (ceiling): –210° to +15°
- Zoom: 0000 (Wide) to 6000 (Tele including Clear Image Zoom 2.0×)
- Focus: 0000 (Far) to FFFF (Near)
- Speed step: Normal (24-step, max 60°/s) or Extended (50-step, max 40°/s in Slow mode)
- Vendor ID: 0001 (Sony); Model ID: 051E (ILME-FR7/FR7K)
- Command cancel: wait ≥200ms after PAN-TILT Drive before sending cancel; wait ≥200ms after cancel response before issuing new PAN-TILT command

<!-- UNRESOLVED: device name input "Sony RS422" does not match source document (ILME-FR7 VISCA over IP). Source describes UDP-based VISCA over IP, not RS-422 serial protocol. -->
<!-- UNRESOLVED: RS-422 serial variant command set not present in this source document. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: authentication credentials or token format not applicable (no auth). -->

## Provenance

```yaml
source_domains:
  - pro.sony
  - github.com
  - belle-nuit.com
  - drastic.tv
source_urls:
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://github.com/hideakitai/Sony9PinRemote
  - https://belle-nuit.com/archives/9pin.html
  - https://www.drastic.tv/support-59/legacysoftwarehardware/37-miscellaneous-legacy/180-vvcr-422-serial-protocol
retrieved_at: 2026-04-30T04:24:12.329Z
last_checked_at: 2026-05-14T18:17:20.786Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:20.786Z
matched_actions: 111
action_count: 122
confidence: high
summary: "All 111 spec actions matched to VISCA over IP source commands; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
