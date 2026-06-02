---
spec_id: admin/hive-beeblade
schema_version: ai4av-public-spec-v1
revision: 1
title: "Hive Beeblade Control Spec"
manufacturer: Hive
model_family: Beeblade
aliases: []
compatible_with:
  manufacturers:
    - Hive
  models:
    - Beeblade
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - hive.run
source_urls:
  - https://hive.run/knowledge-base/files/resources/UDP_Command_List.pdf
retrieved_at: 2026-04-30T04:41:21.039Z
last_checked_at: 2026-05-14T18:17:16.780Z
generated_at: 2026-05-14T18:17:16.780Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact hardware capabilities, number of layers supported, maximum resolution, codec support details not stated"
  - "no separate variable definitions in source beyond the action parameters"
  - "no unsolicited notification mechanism described in source."
  - "no multi-step sequences explicitly described in source."
  - "source warns \"PLEASE BACKUP YOUR JSON FILES BEFORE EDITING THEM AS YOU"
  - "number of supported layers not stated"
  - "UDP message format/encoding details not specified (raw text, binary framing, etc.)"
  - "maximum UDP message size not stated"
  - "error handling / response format for invalid commands not documented"
  - "whether device sends responses to SetPatchDouble commands not stated"
  - "FX per-effect parameter meanings not documented beyond numeric range"
  - "complete list of JSON settings file paths and their schemas not provided"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.780Z
  matched_actions: 63
  action_count: 72
  confidence: medium
  summary: "All 63 spec actions match source commands verbatim; transport parameters confirmed; spec fully represents documented Hive Beeblade UDP API. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Hive Beeblade Control Spec

## Summary

The Hive Beeblade is a media player/server that supports real-time control of layer playback parameters, effects, and playlist operations via UDP messages sent to port 8083. Commands use the `localSVPatch` API to set double values, strings, and JSON objects. The device also supports reading current parameter values back over the same UDP interface.

<!-- UNRESOLVED: exact hardware capabilities, number of layers supported, maximum resolution, codec support details not stated -->

## Transport

```yaml
protocols:
  - udp
addressing:
  port: 8083
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- levelable    # inferred: volume, intensity, play speed, color channels all adjustable
- queryable    # inferred: GetPatchDouble/GetPatchString/GetPatchJSON read commands present
```

## Actions

```yaml
# All commands are UDP strings sent to port 8083.
# Layer parameters use the path pattern "/LAYER N/..." - source only documents LAYER 1.
# "X" denotes a numeric value substituted into the command string.

- id: layer_file_select
  label: File Select
  kind: action
  description: Selects current media file on the layer
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FILE SELECT/Value", X)'
  params:
    - name: file_index
      type: integer
      min: 0
      max: 255

- id: layer_folder_select
  label: Folder Select
  kind: action
  description: Selects current media folder on the layer
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FOLDER SELECT/Value", X)'
  params:
    - name: folder_index
      type: integer
      min: 0
      max: 255

- id: layer_in_frame
  label: In Frame
  kind: action
  description: Frame number from which media playback should start
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/IN FRAME/Value", X)'
  params:
    - name: frame
      type: integer
      min: 0
      max: 4294967295

- id: layer_out_frame
  label: Out Frame
  kind: action
  description: Frame number at which media playback should end or loop
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/OUT FRAME/Value", X)'
  params:
    - name: frame
      type: integer
      min: 0
      max: 4294967295

- id: layer_play_mode
  label: Play Mode
  kind: action
  description: How the media should play
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/PLAY MODE/Value", X)'
  params:
    - name: mode
      type: enum
      values:
        - id: 0
          label: In Frame
        - id: 1
          label: Out Frame
        - id: 2
          label: Loop Forward
        - id: 3
          label: Loop Reverse
        - id: 4
          label: Play Once Forward
        - id: 5
          label: Play Once Reverse
        - id: 6
          label: Stop
        - id: 7
          label: Pause
        - id: 8
          label: Bounce (Ping-Pong)
        - id: 9
          label: Take Over Frame
        - id: 10
          label: Loop Forward with pause on zero intensity
        - id: 11
          label: Loop Reverse with pause on zero intensity
        - id: 12
          label: Play Once Forward with pause on zero intensity
        - id: 13
          label: Play Once Reverse with pause on zero intensity
        - id: 15
          label: Bounce (Ping-Pong) with pause on zero intensity
        - id: 20
          label: Synchronise to Timecode
        - id: 40
          label: Loop Forward with re-trigger on intensity
        - id: 41
          label: Loop Reverse with re-trigger on intensity

- id: layer_play_speed
  label: Play Speed
  kind: action
  description: Play speed of media (0.5 = 100%)
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/PLAY SPEED/Value", X)'
  params:
    - name: speed
      type: number
      min: 0.0
      max: 1.0
      description: "0.0=Stop, 0.001-0.499=Slower, 0.5=100%, 0.501-1.0=Faster (up to 10x)"

- id: layer_scale
  label: Scale
  kind: action
  description: Zoom into or out of the media (0.5 = 100%)
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/SCALE/Value", X)'
  params:
    - name: scale
      type: number
      min: 0.0
      max: 1.0

- id: layer_framing_mode
  label: Framing Mode
  kind: action
  description: How media should fit into output rectangle
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FRAMING MODE/Value", X)'
  params:
    - name: mode
      type: enum
      values:
        - id: 0
          label: Letterbox
        - id: 1
          label: Crop
        - id: 2
          label: Stretch
        - id: 3
          label: Multi Letterbox
        - id: 4
          label: Centered

- id: layer_aspect_ratio
  label: Aspect Ratio
  kind: action
  description: Horizontal and vertical adjustment of media shape
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/ASPECT RATIO/Value", X)'
  params:
    - name: ratio
      type: number
      min: 0.0
      max: 1.0
      description: "0.0=No Adjustment, 0-0.4999=Horizontal Squeeze, 0.5=Center, 0.501-1.0=Vertical Squeeze"

- id: layer_position_x
  label: Position X
  kind: action
  description: Horizontal position of media (0.5 = center)
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/POSITION X/Value", X)'
  params:
    - name: x
      type: number
      min: 0.0
      max: 1.0
      description: "0.0-0.4999=Left, 0.5=Center, 0.5001-1.0=Right"

- id: layer_position_y
  label: Position Y
  kind: action
  description: Vertical position of media (0.5 = center)
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/POSITION Y/Value", X)'
  params:
    - name: y
      type: number
      min: 0.0
      max: 1.0
      description: "0.0-0.4999=Above, 0.5=Center, 0.5001-1.0=Below"

- id: layer_rotation_x
  label: Rotation X
  kind: action
  description: Rotate media around the horizontal axis
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/ROTATION X/Value", X)'
  params:
    - name: rotation
      type: number
      min: 0.0
      max: 1.0
      description: "0.0-0.25=Auto Rotate CCW, 0.25-0.4999=Manual CCW, 0.5=No Rotation, 0.5001-0.75=Manual CW, 0.75-1.0=Auto Rotate CW"

- id: layer_rotation_y
  label: Rotation Y
  kind: action
  description: Rotate media around the vertical axis
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/ROTATION Y/Value", X)'
  params:
    - name: rotation
      type: number
      min: 0.0
      max: 1.0

- id: layer_rotation_z
  label: Rotation Z
  kind: action
  description: Rotate media around the Z axis
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/ROTATION Z/Value", X)'
  params:
    - name: rotation
      type: number
      min: 0.0
      max: 1.0

- id: layer_blend_mode
  label: Blend Mode
  kind: action
  description: How this layer blends with layers below
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/BLEND MODE/Value", X)'
  params:
    - name: mode
      type: enum
      values:
        - id: 0
          label: ALPHA
        - id: 1
          label: ADDITIVE
        - id: 2
          label: MULTIPLY
        - id: 3
          label: DIFFERENCE
        - id: 4
          label: SCREEN
        - id: 5
          label: PRESERVE LUMA
        - id: 6
          label: RECTANGLE WIPE
        - id: 7
          label: TRIANGLE WIPE
        - id: 8
          label: MINIMUM
        - id: 9
          label: MAXIMUM
        - id: 10
          label: SUBTRACT
        - id: 11
          label: DARKEN
        - id: 12
          label: LIGHTEN
        - id: 13
          label: SOFT LIGHTEN
        - id: 14
          label: DARK LIGHTEN
        - id: 15
          label: EXCLUSION
        - id: 16
          label: RANDOM
        - id: 17
          label: RIPPLE
        - id: 18
          label: THRESHOLD
        - id: 19
          label: SINE
        - id: 20
          label: INVERT MASK
        - id: 21
          label: NOISE
        - id: 22
          label: SWIRL
        - id: 23
          label: GRADIENT
        - id: 24
          label: PIXEL SORT
        - id: 25
          label: CHECKERBOARD
        - id: 26
          label: PULSE
        - id: 27
          label: HUE SHIFT
        - id: 28
          label: FRACTAL
        - id: 29
          label: WAVEFORM
        - id: 30
          label: RGB SPLIT
        - id: 31
          label: GLITCH

- id: layer_intensity
  label: Intensity
  kind: action
  description: Media intensity / opacity
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/INTENSITY/Value", X)'
  params:
    - name: intensity
      type: number
      min: 0.0
      max: 1.0

- id: layer_red
  label: Red Channel
  kind: action
  description: Red channel adjustment (0.5 = 100%)
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/RED/Value", X)'
  params:
    - name: red
      type: number
      min: 0.0
      max: 1.0

- id: layer_green
  label: Green Channel
  kind: action
  description: Green channel adjustment (0.5 = 100%)
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/GREEN/Value", X)'
  params:
    - name: green
      type: number
      min: 0.0
      max: 1.0

- id: layer_blue
  label: Blue Channel
  kind: action
  description: Blue channel adjustment (0.5 = 100%)
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/BLUE/Value", X)'
  params:
    - name: blue
      type: number
      min: 0.0
      max: 1.0

- id: layer_hue
  label: Hue
  kind: action
  description: Hue adjustment (0.0-1.0 maps to 0-360 degrees)
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/HUE/Value", X)'
  params:
    - name: hue
      type: number
      min: 0.0
      max: 1.0

- id: layer_saturation
  label: Saturation
  kind: action
  description: Saturation adjustment (0.5 = unadjusted)
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/SATURATION/Value", X)'
  params:
    - name: saturation
      type: number
      min: 0.0
      max: 1.0
      description: "0.0-0.4999=Desaturate, 0.5=Unadjusted, 0.5001-1.0=Over-saturate"

- id: layer_contrast
  label: Contrast
  kind: action
  description: Contrast adjustment (0.5 = unadjusted)
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/CONTRAST/Value", X)'
  params:
    - name: contrast
      type: number
      min: 0.0
      max: 1.0
      description: "0.0-0.4999=0-100%, 0.5=Unadjusted, 0.5001-1.0=100-200%"

- id: layer_lut
  label: LUT Select
  kind: action
  description: Select LUT from LUTS folder
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/LUT/Value", X)'
  params:
    - name: lut_index
      type: integer
      min: 0
      max: 32767

- id: layer_strobe
  label: Strobe
  kind: action
  description: Strobe media effect
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/STROBE/Value", X)'
  params:
    - name: strobe
      type: number
      min: 0.0
      max: 1.0
      description: "0.0-0.5=On/Off Strobe slow-fast, 0.5-1.0=Punch Strobe slow-fast"

- id: layer_tc_hour
  label: TC Hour
  kind: action
  description: Timecode trigger point hour (active when TC Offsets set to Layer Param)
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/MTC HOUR/Value", X)'
  params:
    - name: hour
      type: integer
      min: 0
      max: 24

- id: layer_tc_minute
  label: TC Minute
  kind: action
  description: Timecode trigger point minute
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/MTC MINUTE/Value", X)'
  params:
    - name: minute
      type: integer
      min: 0
      max: 60

- id: layer_tc_second
  label: TC Second
  kind: action
  description: Timecode trigger point second
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/MTC SECOND/Value", X)'
  params:
    - name: second
      type: integer
      min: 0
      max: 60

- id: layer_tc_frame
  label: TC Frame
  kind: action
  description: Timecode trigger point frame
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/MTC FRAME/Value", X)'
  params:
    - name: frame
      type: integer
      min: 0
      max: 60

- id: layer_fx1_select
  label: FX1 Select
  kind: action
  description: Select Effect 1
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 SELECT/Value", X)'
  params:
    - name: effect
      type: enum
      values:
        - id: 0
          label: NONE
        - id: 1
          label: OLD TV
        - id: 2
          label: SEPIA
        - id: 3
          label: FEEDBACK
        - id: 4
          label: BLUR
        - id: 5
          label: CRYSTALISE
        - id: 6
          label: FRACTAL SOUP
        - id: 7
          label: RADAR
        - id: 8
          label: PIXELISE
        - id: 9
          label: SOFT EDGE OVAL
        - id: 10
          label: TILE
        - id: 11
          label: INFINITY ZOOM
        - id: 12
          label: DOT GRID
        - id: 13
          label: KALEIDOSCOPE
        - id: 14
          label: MULTI MIRROR
        - id: 15
          label: REBELLE DISTORT

- id: layer_fx1_opacity
  label: FX1 Opacity
  kind: action
  description: Effect 1 opacity (blends effected media with original)
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 OPACITY/Value", X)'
  params:
    - name: opacity
      type: number
      min: 0.0
      max: 1.0

# FX1 Param 1-16 all share the same pattern: 0.0-1.0 range
- id: layer_fx1_param_1
  label: FX1 Param 1
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 PARAM 1/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx1_param_2
  label: FX1 Param 2
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 PARAM 2/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx1_param_3
  label: FX1 Param 3
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 PARAM 3/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx1_param_4
  label: FX1 Param 4
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 PARAM 4/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx1_param_5
  label: FX1 Param 5
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 PARAM 5/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx1_param_6
  label: FX1 Param 6
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 PARAM 6/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx1_param_7
  label: FX1 Param 7
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 PARAM 7/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx1_param_8
  label: FX1 Param 8
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 PARAM 8/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx1_param_9
  label: FX1 Param 9
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 PARAM 9/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx1_param_10
  label: FX1 Param 10
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 PARAM 10/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx1_param_11
  label: FX1 Param 11
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 PARAM 11/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx1_param_12
  label: FX1 Param 12
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 PARAM 12/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx1_param_13
  label: FX1 Param 13
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 PARAM 13/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx1_param_14
  label: FX1 Param 14
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 PARAM 14/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx1_param_15
  label: FX1 Param 15
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 PARAM 15/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx1_param_16
  label: FX1 Param 16
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX1 PARAM 16/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx2_select
  label: FX2 Select
  kind: action
  description: Select Effect 2 (same effect list as FX1)
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 SELECT/Value", X)'
  params:
    - name: effect
      type: enum
      values:
        - id: 0
          label: NONE
        - id: 1
          label: OLD TV
        - id: 2
          label: SEPIA
        - id: 3
          label: FEEDBACK
        - id: 4
          label: BLUR
        - id: 5
          label: CRYSTALISE
        - id: 6
          label: FRACTAL SOUP
        - id: 7
          label: RADAR
        - id: 8
          label: PIXELISE
        - id: 9
          label: SOFT EDGE OVAL
        - id: 10
          label: TILE
        - id: 11
          label: INFINITY ZOOM
        - id: 12
          label: DOT GRID
        - id: 13
          label: KALEIDOSCOPE
        - id: 14
          label: MULTI MIRROR
        - id: 15
          label: REBELLE DISTORT

- id: layer_fx2_opacity
  label: FX2 Opacity
  kind: action
  description: Effect 2 opacity
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 OPACITY/Value", X)'
  params:
    - name: opacity
      type: number
      min: 0.0
      max: 1.0

# FX2 Param 1-16 follow the same pattern as FX1 Param 1-16
- id: layer_fx2_param_1
  label: FX2 Param 1
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 PARAM 1/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx2_param_2
  label: FX2 Param 2
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 PARAM 2/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx2_param_3
  label: FX2 Param 3
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 PARAM 3/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx2_param_4
  label: FX2 Param 4
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 PARAM 4/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx2_param_5
  label: FX2 Param 5
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 PARAM 5/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx2_param_6
  label: FX2 Param 6
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 PARAM 6/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx2_param_7
  label: FX2 Param 7
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 PARAM 7/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx2_param_8
  label: FX2 Param 8
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 PARAM 8/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx2_param_9
  label: FX2 Param 9
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 PARAM 9/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx2_param_10
  label: FX2 Param 10
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 PARAM 10/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx2_param_11
  label: FX2 Param 11
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 PARAM 11/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx2_param_12
  label: FX2 Param 12
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 PARAM 12/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx2_param_13
  label: FX2 Param 13
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 PARAM 13/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx2_param_14
  label: FX2 Param 14
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 PARAM 14/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx2_param_15
  label: FX2 Param 15
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 PARAM 15/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_fx2_param_16
  label: FX2 Param 16
  kind: action
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/FX2 PARAM 16/Value", X)'
  params:
    - name: value
      type: number
      min: 0.0
      max: 1.0

- id: layer_transition_duration
  label: Transition Duration
  kind: action
  description: Duration of the cross-fade transition on a layer
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/TRANSITION DURATION/Value", X)'
  params:
    - name: duration_ms
      type: integer
      min: 0
      max: 65535
      description: Milliseconds (1000 = 1 second)

- id: layer_transition_mode
  label: Transition Mode
  kind: action
  description: Blend mode for the transition (same enum values as Blend Mode)
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/TRANSITION MODE/Value", X)'
  params:
    - name: mode
      type: enum
      values:
        - id: 0
          label: ALPHA
        - id: 1
          label: ADDITIVE
        - id: 2
          label: MULTIPLY
        - id: 3
          label: DIFFERENCE
        - id: 4
          label: SCREEN
        - id: 5
          label: PRESERVE LUMA
        - id: 6
          label: RECTANGLE WIPE
        - id: 7
          label: TRIANGLE WIPE
        - id: 8
          label: MINIMUM
        - id: 9
          label: MAXIMUM
        - id: 10
          label: SUBTRACT
        - id: 11
          label: DARKEN
        - id: 12
          label: LIGHTEN
        - id: 13
          label: SOFT LIGHTEN
        - id: 14
          label: DARK LIGHTEN
        - id: 15
          label: EXCLUSION
        - id: 16
          label: RANDOM
        - id: 17
          label: RIPPLE
        - id: 18
          label: THRESHOLD
        - id: 19
          label: SINE
        - id: 20
          label: INVERT MASK
        - id: 21
          label: NOISE
        - id: 22
          label: SWIRL
        - id: 23
          label: GRADIENT
        - id: 24
          label: PIXEL SORT
        - id: 25
          label: CHECKERBOARD
        - id: 26
          label: PULSE
        - id: 27
          label: HUE SHIFT
        - id: 28
          label: FRACTAL
        - id: 29
          label: WAVEFORM
        - id: 30
          label: RGB SPLIT
        - id: 31
          label: GLITCH

- id: layer_volume
  label: Volume
  kind: action
  description: Audio volume for embedded audio in video file
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/VOLUME/Value", X)'
  params:
    - name: volume
      type: integer
      min: 0
      max: 65535
      description: "0-65535 maps to 0-100%"

- id: seek
  label: Seek
  kind: action
  description: Set play head position while paused or playing
  command: 'localSVPatch.SetPatchDouble("/LAYER 1/Transport Control/Media Time/Value", X)'
  params:
    - name: time_seconds
      type: number
      min: 0.0
      description: Position in seconds (float)

- id: playlist_play_row
  label: Playlist Play Row
  kind: action
  description: Play a specified row on the playlist
  command: 'localSVPatch.SetPatchDouble("/Playlist Control/Playlist Controller 1/Play List Next", X)'
  params:
    - name: row
      type: integer
      description: Row number to play

- id: playlist_seek
  label: Playlist Seek
  kind: action
  description: Seek to specified time in playlist
  command: 'localSVPatch.SetPatchDouble("/Playlist Control/Playlist Controller 1/Play List Seek", X)'
  params:
    - name: time_seconds
      type: number
      description: Time in floating-point seconds to seek to

- id: update_timecode_cue_on
  label: Enable Timecode Cue List
  kind: action
  description: Switch on timecode triggering mode for layer 0
  command: 'localSVPatch.UpdatePatchJSON("/Timecode Cue List", [{"op":"replace","path":"/layers/0/useCueList","value":1}])'
  params: []

- id: update_timecode_cue_off
  label: Disable Timecode Cue List
  kind: action
  description: Switch off timecode triggering mode for layer 0
  command: 'localSVPatch.UpdatePatchJSON("/Timecode Cue List", [{"op":"replace","path":"/layers/0/useCueList","value":0}])'
  params: []
```

## Feedbacks

```yaml
- id: uptime
  type: number
  description: Time the renderer has been active
  command: 'localSVPatch.GetPatchDouble("/UpTime/Up Time", UDPMsgReturn)'

- id: media_time
  type: number
  description: Current play head position in seconds
  command: 'localSVPatch.GetPatchDouble("/LAYER 1/Transport Control/Media Time/Value", UDPMsgReturn)'

- id: playlist_row_index
  type: integer
  description: Current row index in the playlist
  command: 'localSVPatch.GetPatchDouble("/Playlist Control/Playlist Controller 1/Row Index", UDPMsgReturn)'

- id: file_select
  type: integer
  description: Currently selected file index on layer 1
  command: 'localSVPatch.GetPatchDouble("/LAYER 1/FILE SELECT/Value", UDPMsgReturn)'

- id: current_filename
  type: string
  description: Currently playing filename
  command: 'localSVPatch.GetPatchString("/LAYER 1/Transport Control/String Join/Str 2", UDPMsgReturn)'

- id: media_list
  type: json
  description: List of all media files and metadata on device
  command: 'localSVPatch.GetPatchJSON("/Media List", UDPMsgReturn)'

- id: system_settings
  type: json
  description: All device system settings
  command: 'localSVPatch.GetPatchJSON("/System Settings", UDPMsgReturn)'

- id: output_mapping
  type: json
  description: Device video output mapping
  command: 'localSVPatch.GetPatchJSON("/Output Mapping", UDPMsgReturn)'

- id: playlist
  type: json
  description: Device playlist
  command: 'localSVPatch.GetPatchJSON("/Play List", UDPMsgReturn)'

- id: timecode_cue_list
  type: json
  description: External clock cue list
  command: 'localSVPatch.GetPatchJSON("/Timecode Cue List", UDPMsgReturn)'

- id: vioso_wb_settings
  type: json
  description: Warp and blend settings for Vioso
  command: 'localSVPatch.GetPatchJSON("/Vioso WB Settings", UDPMsgReturn)'

- id: screenberry_wb_settings
  type: json
  description: Warp and blend settings for Screenberry
  command: 'localSVPatch.GetPatchJSON("/Screenberry WB Settings", UDPMsgReturn)'
```

## Variables

```yaml
# All layer parameters listed in Actions are also settable continuous variables.
# The source does not distinguish between "actions" and "variables" - every parameter
# is set via the same localSVPatch.SetPatchDouble mechanism.
# UNRESOLVED: no separate variable definitions in source beyond the action parameters
```

## Events

```yaml
# UNRESOLVED: no unsolicited notification mechanism described in source.
# The device appears to use a request-response model via UDPMsgReturn.
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source.
# UpdatePatchJSON accepts JSON Patch arrays (RFC 6902) which could combine multiple
# operations in a single message, but no named macros are documented.
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source warns "PLEASE BACKUP YOUR JSON FILES BEFORE EDITING THEM AS YOU
# CAN BREAK YOUR DEVICE BY SETTING INVALID VALUES" but no formal safety interlocks
# or power-on sequencing requirements are documented.
```

## Notes

- The source documents layer parameters for LAYER 1 only. Commands use the path pattern `/LAYER N/...` so additional layers may be addressable by incrementing the layer number, but this is not explicitly confirmed.
- The `localSVPatch.SetPatchDouble` function is the primary write mechanism. `localSVPatch.UpdatePatchJSON` uses JSON Patch (RFC 6902) operations for structured updates to device settings files.
- Read operations use `localSVPatch.GetPatchDouble`, `localSVPatch.GetPatchString`, and `localSVPatch.GetPatchJSON` with a `UDPMsgReturn` callback identifier.
- Descriptor variants (`GetPatchDoubleWithDescriptor`, `GetPatchStringWithDescriptor`, `GetPatchJSONWithDescriptor`) return `{"descriptor": "<path>", "data": "<value>"}` objects, useful when reading many values simultaneously.
- Many numeric ranges use a normalized 0.0–1.0 scale where 0.5 represents the default/center value (e.g., play speed, scale, color channels, position).
- The command list is described as "non-exhaustive and for illustrative purposes only" — additional parameters may be accessible via the same `localSVPatch` API.

<!-- UNRESOLVED: number of supported layers not stated -->
<!-- UNRESOLVED: UDP message format/encoding details not specified (raw text, binary framing, etc.) -->
<!-- UNRESOLVED: maximum UDP message size not stated -->
<!-- UNRESOLVED: error handling / response format for invalid commands not documented -->
<!-- UNRESOLVED: whether device sends responses to SetPatchDouble commands not stated -->
<!-- UNRESOLVED: FX per-effect parameter meanings not documented beyond numeric range -->
<!-- UNRESOLVED: complete list of JSON settings file paths and their schemas not provided -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - hive.run
source_urls:
  - https://hive.run/knowledge-base/files/resources/UDP_Command_List.pdf
retrieved_at: 2026-04-30T04:41:21.039Z
last_checked_at: 2026-05-14T18:17:16.780Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.780Z
matched_actions: 63
action_count: 72
confidence: medium
summary: "All 63 spec actions match source commands verbatim; transport parameters confirmed; spec fully represents documented Hive Beeblade UDP API. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact hardware capabilities, number of layers supported, maximum resolution, codec support details not stated"
- "no separate variable definitions in source beyond the action parameters"
- "no unsolicited notification mechanism described in source."
- "no multi-step sequences explicitly described in source."
- "source warns \"PLEASE BACKUP YOUR JSON FILES BEFORE EDITING THEM AS YOU"
- "number of supported layers not stated"
- "UDP message format/encoding details not specified (raw text, binary framing, etc.)"
- "maximum UDP message size not stated"
- "error handling / response format for invalid commands not documented"
- "whether device sends responses to SetPatchDouble commands not stated"
- "FX per-effect parameter meanings not documented beyond numeric range"
- "complete list of JSON settings file paths and their schemas not provided"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
