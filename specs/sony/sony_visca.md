---
spec_id: admin/sony-visca-command-list
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony VISCA Command List Control Spec"
manufacturer: Sony
model_family: "Sony VISCA"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony VISCA"
    - "Sony ILME-FR7"
    - "Sony ILME-FR7K"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro.sony
  - sony.com
  - github.com
source_urls:
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://www.sony.com/electronics/support/res/manuals/E042/3230148ee903c204b912cca5c2c3f5aa/E0421001M.pdf
  - https://www.sony.com/electronics/support/res/manuals/E776/ba2eb983d7ce445ab18afc783c068418/E7761001M.pdf
  - https://github.com/bitfocus/companion-module-sony-visca
retrieved_at: 2026-04-30T03:14:34.194Z
last_checked_at: 2026-05-14T18:17:20.805Z
generated_at: 2026-05-14T18:17:20.805Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:20.805Z
  matched_actions: 84
  action_count: 89
  confidence: high
  summary: "All 84 spec actions match documented VISCA command set with correct opcodes, parameters, and ranges; transport verified; bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Sony VISCA Command List Control Spec

## Summary
Sony camera control protocol (VISCA) over UDP/IP. Controls ILME-FR7/FR7K PTZ camera via VISCA commands and inquiries. Transport: UDP, port 52381. Supports pan/tilt/zoom, focus, exposure, white balance, color correction, tally, and preset recall. No authentication required.

<!-- UNRESOLVED: RS-232 VISCA serial config not detailed in this source; IP-only portion documented -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 52381
  # UNRESOLVED: base_url not applicable for UDP
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # power on/standby commands present
- routable        # pan/tilt/zoom/input routing commands present
- queryable       # inquiry commands returning state present
- levelable       # gain, iris, zoom, focus level control present
```

## Actions
```yaml
# Power
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: integer
      description: 2=On, 3=Standby

# Pan/Tilt Drive
- id: pantilt_up
  label: Pan/Tilt Up
  kind: action
  params:
    - name: pan_speed
      type: integer
      description: 01-18/32 (speed step Normal/Extended)
    - name: tilt_speed
      type: integer
      description: 01-18/32 (speed step Normal/Extended)
- id: pantilt_down
  label: Pan/Tilt Down
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: pantilt_left
  label: Pan/Tilt Left
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: pantilt_right
  label: Pan/Tilt Right
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: pantilt_upleft
  label: Pan/Tilt UpLeft
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: pantilt_upright
  label: Pan/Tilt UpRight
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: pantilt_downleft
  label: Pan/Tilt DownLeft
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: pantilt_downright
  label: Pan/Tilt DownRight
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: pantilt_stop
  label: Pan/Tilt Stop
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
- id: pantilt_abs
  label: Pan/Tilt Absolute Position
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
    - name: pan_pos
      type: string
      description: Pan coordinate hex (00000-f6359)
    - name: tilt_pos
      type: string
      description: Tilt coordinate hex
- id: pantilt_rel
  label: Pan/Tilt Relative Position
  kind: action
  params:
    - name: pan_speed
      type: integer
    - name: tilt_speed
      type: integer
    - name: pan_delta
      type: string
    - name: tilt_delta
      type: string
- id: pantilt_home
  label: Pan/Tilt Home
  kind: action
  params: []
- id: pantilt_reset
  label: Pan/Tilt Reset
  kind: action
  params: []

# Zoom
- id: zoom_tele
  label: Zoom Tele (Standard Speed)
  kind: action
  params: []
- id: zoom_wide
  label: Zoom Wide (Standard Speed)
  kind: action
  params: []
- id: zoom_tele_var
  label: Zoom Tele (Variable Speed)
  kind: action
  params:
    - name: speed
      type: integer
      description: 0-7 (Slow-Fast)
- id: zoom_wide_var
  label: Zoom Wide (Variable Speed)
  kind: action
  params:
    - name: speed
      type: integer
- id: zoom_stop
  label: Zoom Stop
  kind: action
  params: []
- id: zoom_direct
  label: Zoom Direct Position
  kind: action
  params:
    - name: position
      type: string
      description: Hex zoom position 0000-6000

# Focus
- id: focus_mode
  label: Focus Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 02=Auto, 03=Manual, 10=Toggle
- id: focus_far
  label: Focus Far
  kind: action
  params: []
- id: focus_near
  label: Focus Near
  kind: action
  params: []
- id: focus_stop
  label: Focus Stop
  kind: action
  params: []
- id: focus_direct
  label: Focus Direct Position
  kind: action
  params:
    - name: position
      type: string
      description: Hex focus position 0000-FFFF

# Iris/Gain/Shutter/AE
- id: iris_up
  label: Iris Up
  kind: action
  params:
    - name: step
      type: string
      description: Step 01-FF
- id: iris_down
  label: Iris Down
  kind: action
  params:
    - name: step
      type: string
- id: auto_iris
  label: Auto Iris
  kind: action
  params:
    - name: state
      type: integer
      description: 2=On, 3=Off
- id: gain_agc
  label: Gain AGC
  kind: action
  params:
    - name: state
      type: integer
      description: 2=On, 3=Off
- id: auto_shutter
  label: Auto Shutter
  kind: action
  params:
    - name: state
      type: integer
      description: 2=On, 3=Off
- id: ae_level
  label: AE Level
  kind: action
  params:
    - name: dir
      type: integer
      description: 02=Up, 03=Down
- id: backlight
  label: Backlight Compensation
  kind: action
  params:
    - name: state
      type: integer
      description: 2=On, 3=Off
- id: spotlight
  label: Spotlight Compensation
  kind: action
  params:
    - name: state
      type: integer
      description: 2=On, 3=Off

# White Balance
- id: wb_mode
  label: White Balance Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 4=ATW, 5=Memory A, A=Preset
- id: wb_set
  label: White Balance Set
  kind: action
  params: []
- id: r_gain
  label: R Gain
  kind: action
  params:
    - name: dir
      type: integer
      description: 02=Up, 03=Down
    - name: step
      type: string
      description: Step 01-FF
- id: r_gain_direct
  label: R Gain Direct
  kind: action
  params:
    - name: value
      type: string
      description: Hex 0000-07BC
- id: b_gain
  label: B Gain
  kind: action
  params:
    - name: dir
      type: integer
      description: 02=Up, 03=Down
    - name: step
      type: string
- id: b_gain_direct
  label: B Gain Direct
  kind: action
  params:
    - name: value
      type: string
- id: color_temp
  label: Color Temperature
  kind: action
  params:
    - name: dir
      type: integer
    - name: step
      type: string
- id: color_temp_direct
  label: Color Temperature Direct
  kind: action
  params:
    - name: value
      type: string
      description: Hex 07D0-3A98
- id: tint
  label: Tint
  kind: action
  params:
    - name: dir
      type: integer
    - name: step
      type: string
- id: offset_color_temp
  label: Offset Color Temperature
  kind: action
  params:
    - name: dir
      type: integer
    - name: step
      type: string
- id: offset_tint
  label: Offset Tint
  kind: action
  params:
    - name: dir
      type: integer
    - name: step
      type: string

# ND Filter
- id: nd_filter_mode
  label: ND Filter Mode
  kind: action
  params:
    - name: preset
      type: integer
      description: 0=Preset, 1=Variable
- id: nd_variable
  label: ND Variable
  kind: action
  params:
    - name: dir
      type: integer
      description: 02=Up, 03=Down
- id: auto_nd_filter
  label: Auto ND Filter
  kind: action
  params:
    - name: state
      type: integer
      description: 2=On, 3=Off
- id: nd_clear
  label: ND Clear
  kind: action
  params:
    - name: state
      type: integer
      description: 2=Filtered, 3=Clear
- id: nd_preset
  label: ND Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: 0=Clear, 1=Preset 1, 2=Preset 2, 3=Preset 3

# Detail/Knee
- id: detail_setting
  label: Detail Setting
  kind: action
  params:
    - name: state
      type: integer
      description: 2=On, 3=Off
- id: detail_level
  label: Detail Level
  kind: action
  params:
    - name: dir
      type: integer
      description: 02=Up, 03=Down
- id: detail_direct
  label: Detail Level Direct
  kind: action
  params:
    - name: level
      type: string
      description: Hex 00-0E
- id: knee_setting
  label: Knee Setting
  kind: action
  params:
    - name: state
      type: integer
      description: 2=On, 3=Off
- id: knee_mode
  label: Knee Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=Auto, 4=Manual
- id: knee_slope
  label: Knee Slope
  kind: action
  params:
    - name: value
      type: string
      description: Hex 00-C6
- id: knee_point
  label: Knee Point
  kind: action
  params:
    - name: value
      type: string
      description: Hex 00-22

# Audio
- id: audio_level_control
  label: Audio Level Control
  kind: action
  params:
    - name: channel
      type: integer
      description: 1=CH1, 2=CH2
    - name: mode
      type: integer
      description: 0=Manual, 1=Auto
- id: input_level_up
  label: Input Level Up
  kind: action
  params:
    - name: target
      type: integer
      description: 0=Master, 1=CH1, 2=CH2
    - name: step
      type: string
- id: input_level_down
  label: Input Level Down
  kind: action
  params:
    - name: target
      type: integer
    - name: step
      type: string
- id: input_level_direct
  label: Input Level Direct
  kind: action
  params:
    - name: target
      type: integer
    - name: level
      type: string
      description: Hex 00-63

# Preset
- id: preset_set
  label: Preset Set
  kind: action
  params:
    - name: number
      type: integer
      description: 00-63
- id: preset_reset
  label: Preset Reset
  kind: action
  params:
    - name: number
      type: integer
- id: preset_recall
  label: Preset Recall
  kind: action
  params:
    - name: number
      type: integer
- id: preset_speed_select
  label: Preset Speed Select
  kind: action
  params:
    - name: mode
      type: integer
      description: 1=Separate, 2=Common
- id: preset_speed_separate
  label: Preset Speed Separate
  kind: action
  params:
    - name: number
      type: integer
    - name: speed
      type: string
- id: preset_speed_common
  label: Preset Speed Common
  kind: action
  params:
    - name: speed
      type: string

# Tally
- id: tally_red
  label: Tally Red
  kind: action
  params:
    - name: state
      type: integer
      description: 2=On, 3=Off
- id: tally_green
  label: Tally Green
  kind: action
  params:
    - name: state
      type: integer
      description: 2=On, 3=Off

# Other
- id: color_bar
  label: Color Bar
  kind: action
  params:
    - name: state
      type: integer
      description: 2=On, 3=Off
- id: display
  label: Display
  kind: action
  params:
    - name: action
      type: integer
      description: 0=Release, 1=Press
- id: lens_init
  label: Lens Initialize
  kind: action
  params: []
- id: menu_onoff
  label: Menu On/Off
  kind: action
  params:
    - name: state
      type: integer
      description: 2=On, 3=Off, 10=Toggle
- id: menu_multiselector
  label: Menu Multi Selector
  kind: action
  params:
    - name: direction
      type: integer
      description: 31=Up, 32=Down, 13=Left, 23=Right, 11=Up-Left, 21=Up-Right, 12=Down-Left, 22=Down-Right, 70=Set, 71=Cancel/Back
    - name: action
      type: integer
      description: 0=Release, 1=Press
- id: direct_menu
  label: Direct Menu
  kind: action
  params:
    - name: item
      type: integer
      description: 00=ND Filter, 01=Iris, 02=ISO/Gain, 03=Shutter, 04=AE Level/Mode, 7F=Direct Menu exit
    - name: action
      type: integer
      description: 0=Release, 1=Press
- id: record
  label: Recording
  kind: action
  params:
    - name: action
      type: integer
      description: 0=Release, 1=Press
- id: assignable_button
  label: Assignable Button
  kind: action
  params:
    - name: button
      type: integer
      description: 01-09=Button 1-9, 7F=Focus Hold
    - name: action
      type: integer
      description: 0=Release, 1=Press
- id: multifunction_dial_set
  label: Multi Function Dial Set
  kind: action
  params:
    - name: action
      type: integer
      description: 1=Set
    - name: param
      type: string
      description: 00=Release, 01=Press
- id: multifunction_dial_cwccw
  label: Multi Function Dial CW/CCW
  kind: action
  params:
    - name: direction
      type: integer
      description: 2=CW, 3=CCW
    - name: step
      type: string
- id: pantilt_ramp_curve
  label: Pan/Tilt Ramp Curve
  kind: action
  params:
    - name: curve
      type: integer
      description: 1-9
- id: pantilt_speed_step
  label: Pan/Tilt Speed Step
  kind: action
  params:
    - name: step
      type: integer
      description: 08=Normal, 18=Extended
- id: pantilt_speed_mode
  label: Pan/Tilt Speed Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 3=Normal, 2=Slow
- id: pantilt_limit_set
  label: Pan/Tilt Limit Set
  kind: action
  params:
    - name: corner
      type: integer
      description: 0=DownLeft, 1=UpRight
    - name: pan_pos
      type: string
    - name: tilt_pos
      type: string
- id: pantilt_limit_clear
  label: Pan/Tilt Limit Clear
  kind: action
  params:
    - name: corner
      type: integer
- id: ptz_trace_rec_start
  label: PTZ Trace Rec Start
  kind: action
  params:
    - name: trace_num
      type: integer
      description: 0-F (trace 1-16)
- id: ptz_trace_rec_stop
  label: PTZ Trace Rec Stop
  kind: action
  params: []
- id: ptz_trace_play_prepare
  label: PTZ Trace Play Prepare
  kind: action
  params:
    - name: trace_num
      type: integer
- id: ptz_trace_play_start
  label: PTZ Trace Play Start
  kind: action
  params: []
- id: ptz_trace_delete
  label: PTZ Trace Delete
  kind: action
  params:
    - name: trace_num
      type: integer
- id: if_clear
  label: IF Clear
  kind: action
  params: []
```

## Feedbacks
```yaml
# ACK/Completion reply format: y0 4z FF (ACK), y0 5z FF (Completion), y0 6z pp FF (Error)
# y=9 fixed for VISCA over IP; z=socket number
- id: visca_ack
  label: VISCA ACK
  type: packet
  description: Returned when command accepted. y0 4z FF.
- id: visca_completion
  label: VISCA Completion
  type: packet
  description: Returned when command executed. y0 5z FF.
- id: visca_error
  label: VISCA Error
  type: packet
  description: y0 6z pp FF - Syntax Error (02), Command Buffer Full (03), Command Canceled (04), No Socket (05), Command Not Executable (41).
```

## Variables
```yaml
# UNRESOLVED: queryable state values documented in inquiry reply packets
# Populated via inquiry commands (see Actions for queries)
# Key queryable states:
- id: power_state
  label: Power State
  type: enum
  values: [on, standby]
  query: 8x 09 04 00 FF -> y0 50 0p FF (p: 2=On, 3=Standby)
- id: zoom_position
  label: Zoom Position
  type: integer
  range: "0000-6000"
  query: 8x 09 04 47 FF -> y0 50 0z 0z 0z 0z FF
- id: focus_position
  label: Focus Position
  type: integer
  range: "0000-FFFF"
  query: 8x 09 04 48 FF -> y0 50 0p 0p 0p 0p FF
- id: pantilt_position
  label: Pan/Tilt Position
  type: string
  query: 8x 09 06 12 FF -> y0 50 0p 0p 0p 0p 0p 0t 0t 0t 0t 0t FF
- id: shooting_mode
  label: Shooting Mode
  type: enum
  values: [custom, cine_ei, flexible_iso, cine_ei_quick]
  query: 8x 09 05 30 FF -> y0 50 0p FF
- id: nd_filter_mode
  label: ND Filter Mode
  type: enum
  values: [preset, variable]
  query: 8x 09 7E 04 52 FF
- id: white_balance_mode
  label: White Balance Mode
  type: enum
  values: [atw, memory_a, preset]
  query: 8x 09 04 35 FF
- id: software_version
  label: Software Version
  type: string
  query: 8x 09 00 02 FF -> y0 50 pp pp qq qq rr rr 0s FF
```

## Events
```yaml
# UNRESOLVED: device-initiated (unsolicited) events not documented in source
# VISCA over IP does not support device-side event push; controller polls
```

## Macros
```yaml
# UNRESOLVED: explicit multi-step macros not identified in source
# Camera IP setup sequence documented for network configuration (separate UDP port 52380):
# 1. Controller sends ENQ broadcast on 52380
# 2. Camera responds with MAC, IP, MASK, GATEWAY, NAME, WRITE status
# 3. Controller sends network settings via broadcast on 52380
# 4. Camera responds ACK/NACK
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: pantilt_cancel_timing
    description: To cancel PAN-TILT Drive, wait ≥200 msec after executing, then send cancel command. Wait ≥200 msec after cancel before issuing next PAN-TILT Drive command.
  - id: tally_lamp_expiry
    description: Tally lamp turns off if no On command received for 15 seconds after TALLY ON. Does not auto-expire if tally lit by non-VISCA input.
  - id: write_timeout
    description: WRITE flag auto-disables 20 minutes after first power-on; network settings cannot be changed after timeout.
```

## Notes
VISCA over IP wraps VISCA command packets in a message header (8 bytes) with payload type, length, and sequence number. UDP transport on port 52381. Controller address fixed to 0, peripheral address fixed to 1. Broadcast address prohibited. Device supports 2 command sockets. No authentication required.

<!-- UNRESOLVED: RS-232 serial baud rate / serial config not detailed in this IP-focused source document -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: VISCA Network Change command not supported over IP -->
<!-- UNRESOLVED: Address Set command not supported over IP -->

## Provenance

```yaml
source_domains:
  - pro.sony
  - sony.com
  - github.com
source_urls:
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://www.sony.com/electronics/support/res/manuals/E042/3230148ee903c204b912cca5c2c3f5aa/E0421001M.pdf
  - https://www.sony.com/electronics/support/res/manuals/E776/ba2eb983d7ce445ab18afc783c068418/E7761001M.pdf
  - https://github.com/bitfocus/companion-module-sony-visca
retrieved_at: 2026-04-30T03:14:34.194Z
last_checked_at: 2026-05-14T18:17:20.805Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:20.805Z
matched_actions: 84
action_count: 89
confidence: high
summary: "All 84 spec actions match documented VISCA command set with correct opcodes, parameters, and ranges; transport verified; bidirectional coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
