---
spec_id: admin/meridian-810-reference-video-system
schema_version: ai4av-public-spec-v1
revision: 1
title: "Meridian 810 Reference Video System Control Spec"
manufacturer: Meridian
model_family: "810 Reference Video System"
aliases: []
compatible_with:
  manufacturers:
    - Meridian
  models:
    - "810 Reference Video System"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - meridian-audio.info
  - meridian-audio.com
source_urls:
  - "https://www.meridian-audio.info/public/810-rs232-information[1899].pdf"
  - "https://www.meridian-audio.info/public/810_video_system_user_guide[1293].pdf"
  - https://www.meridian-audio.com/download/user_guides.html
retrieved_at: 2026-05-21T12:39:22.586Z
last_checked_at: 2026-05-27T15:39:42.373Z
generated_at: 2026-05-27T15:39:42.373Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "projector model number not stated in source; unified 810 system only"
  - "colour adjustment commands return numeric feedback but no discrete"
  - "no unsolicited notifications described in source"
  - "no multi-step sequences described in source"
  - "lamp hour limit (1500h) is advisory only; no hard interlock described"
  - "no safety interlock procedure for projector control via scaler"
  - "lamp hour reset method not stated in source; UNRESOLVED: firmware version not stated in source"
verification:
  verdict: verified
  checked_at: 2026-05-27T15:39:42.373Z
  matched_actions: 63
  action_count: 63
  confidence: medium
  summary: "All 63 spec actions matched their source commands one-to-one; transport parameters fully verified. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Meridian 810 Reference Video System Control Spec

## Summary
Meridian 810 Reference Video System, a scaler/projector combo. RS232 control via Scaler (projector controlled through Scaler). All commands terminated with CR. No auth described.

<!-- UNRESOLVED: projector model number not stated in source; unified 810 system only -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: scaler_power_on
  label: Scaler Power On
  kind: action
  params: []
- id: scaler_power_off
  label: Scaler Power Off
  kind: action
  params: []
- id: scaler_source_logical
  label: Set Source (Logical)
  kind: action
  params:
    - name: source
      type: string
      enum: [SC_SRC, SC_CD, SC_RD, SC_AX, SC_TV, SC_TA, SC_SA, SC_DC, SC_CB, SC_DV, SC_V1, SC_V2, SC_GA]
- id: scaler_input_physical
  label: Set Input (Physical)
  kind: action
  params:
    - name: input
      type: string
      enum: [SC_HDMI, SC_DVI]
- id: scaler_menu
  label: Menu
  kind: action
  params: []
- id: scaler_menu_up
  label: Menu Up
  kind: action
  params: []
- id: scaler_menu_down
  label: Menu Down
  kind: action
  params: []
- id: scaler_menu_left
  label: Menu Left
  kind: action
  params: []
- id: scaler_menu_right
  label: Menu Right
  kind: action
  params: []
- id: scaler_enter
  label: Enter
  kind: action
  params: []
- id: scaler_preset
  label: Preset
  kind: action
  params: []
- id: scaler_aspect_toggle
  label: Aspect Toggle
  kind: action
  params: []
- id: scaler_aspect_16_9
  label: Aspect 16:9
  kind: action
  params: []
- id: scaler_aspect_2_35_1
  label: Aspect 2.35:1
  kind: action
  params: []
- id: scaler_aspect_4_3
  label: Aspect 4:3
  kind: action
  params: []
- id: scaler_aspect_full
  label: Aspect Full
  kind: action
  params: []
- id: scaler_preset_select
  label: Video Preset Selection
  kind: action
  params:
    - name: preset
      type: string
      enum: [BYPASS, QDEO, 1, 2, 3, 4, 5, 6, 7]
- id: scaler_noise_reduction
  label: Noise Reduction
  kind: action
  params:
    - name: level
      type: string
      enum: [OFF, L, M, H]
- id: scaler_compression_artifact_reduction
  label: Compression Artifact Reduction
  kind: action
  params:
    - name: value
      type: string
      enum: [OFF, ON]
- id: scaler_intelligent_colour_remapping
  label: Intelligent Colour Remapping
  kind: action
  params:
    - name: mode
      type: string
      enum: [VIVID, SKY+GRASS, SKY, GRASS, OFF]
- id: scaler_adaptive_contrast_enhancement
  label: Adaptive Contrast Enhancement
  kind: action
  params:
    - name: level
      type: string
      enum: [OFF, L, M, H]
- id: scaler_edge_enhancement
  label: Edge Enhancement
  kind: action
  params:
    - name: level
      type: string
      enum: [OFF, L, M, H]
- id: scaler_brightness_adjust
  label: Brightness Adjust
  kind: action
  params:
    - name: value
      type: string
      enum: [-, +]
- id: scaler_contrast_adjust
  label: Contrast Adjust
  kind: action
  params:
    - name: value
      type: string
      enum: [-, +]
- id: scaler_saturation_adjust
  label: Saturation Adjust
  kind: action
  params:
    - name: value
      type: string
      enum: [-, +]
- id: scaler_tint_adjust
  label: Tint Adjust
  kind: action
  params:
    - name: value
      type: string
      enum: [-, +]
- id: scaler_cyan_colour_adjust
  label: Cyan Colour Adjust
  kind: action
  params:
    - name: value
      type: string
      enum: [-, +]
- id: scaler_yellow_colour_adjust
  label: Yellow Colour Adjust
  kind: action
  params:
    - name: value
      type: string
      enum: [-, +]
- id: scaler_magenta_colour_adjust
  label: Magenta Colour Adjust
  kind: action
  params:
    - name: value
      type: string
      enum: [-, +]
- id: scaler_red_colour_adjust
  label: Red Colour Adjust
  kind: action
  params:
    - name: value
      type: string
      enum: [-, +]
- id: scaler_green_colour_adjust
  label: Green Colour Adjust
  kind: action
  params:
    - name: value
      type: string
      enum: [-, +]
- id: scaler_blue_colour_adjust
  label: Blue Colour Adjust
  kind: action
  params:
    - name: value
      type: string
      enum: [-, +]
- id: projector_power_on
  label: Projector Power On
  kind: action
  params: []
- id: projector_power_off
  label: Projector Power Off
  kind: action
  params: []
- id: projector_gamma_a
  label: Gamma A
  kind: action
  params: []
- id: projector_gamma_b
  label: Gamma B
  kind: action
  params: []
- id: projector_gamma_c
  label: Gamma C
  kind: action
  params: []
- id: projector_zoom_big_step_plus
  label: Zoom + Big Step
  kind: action
  params: []
- id: projector_zoom_small_step_plus
  label: Zoom + Small Step
  kind: action
  params: []
- id: projector_zoom_big_step_minus
  label: Zoom - Big Step
  kind: action
  params: []
- id: projector_zoom_small_step_minus
  label: Zoom - Small Step
  kind: action
  params: []
- id: projector_focus_big_step_plus
  label: Focus + Big Step
  kind: action
  params: []
- id: projector_focus_small_step_plus
  label: Focus + Small Step
  kind: action
  params: []
- id: projector_focus_big_step_minus
  label: Focus - Big Step
  kind: action
  params: []
- id: projector_focus_small_step_minus
  label: Focus - Small Step
  kind: action
  params: []
- id: projector_h_shift_big_step_plus
  label: H Shift + Big Step
  kind: action
  params: []
- id: projector_h_shift_small_step_plus
  label: H Shift + Small Step
  kind: action
  params: []
- id: projector_h_shift_big_step_minus
  label: H Shift - Big Step
  kind: action
  params: []
- id: projector_h_shift_small_step_minus
  label: H Shift - Small Step
  kind: action
  params: []
- id: projector_v_shift_big_step_plus
  label: V Shift + Big Step
  kind: action
  params: []
- id: projector_v_shift_small_step_plus
  label: V Shift + Small Step
  kind: action
  params: []
- id: projector_v_shift_big_step_minus
  label: V Shift - Big Step
  kind: action
  params: []
- id: projector_v_shift_small_step_minus
  label: V Shift - Small Step
  kind: action
  params: []
- id: projector_frame_lock
  label: Projector Frame Lock
  kind: action
  params:
    - name: value
      type: string
      enum: [OFF, ON]
- id: projector_display_mode
  label: Projector Display Mode
  kind: action
  params:
    - name: mode
      type: string
      enum: [SINGLE, DOUBLE, CROSS]
- id: projector_force_signal
  label: Projector Force Signal
  kind: action
  params:
    - name: value
      type: string
      enum: [OFF, 1, 2, 3, 4, 5, 6, 7, 8]
- id: projector_test_pattern_off
  label: Test Pattern Off
  kind: action
  params: []
- id: projector_test_pattern_1
  label: Test Pattern 1 (Colour Bars)
  kind: action
  params: []
- id: projector_test_pattern_2
  label: Test Pattern 2 (Colour Crosshatch)
  kind: action
  params: []
- id: projector_test_pattern_3
  label: Test Pattern 3 (Crosshatch)
  kind: action
  params: []
- id: projector_test_pattern_4
  label: Test Pattern 4 (Staircase)
  kind: action
  params: []
- id: projector_test_pattern_5
  label: Test Pattern 5 (Ramp)
  kind: action
  params: []
- id: projector_test_pattern_6
  label: Test Pattern 6 (White Window)
  kind: action
  params: []
```

## Feedbacks
```yaml
# All commands echo back command name as feedback.
# Error codes (PR_ERROR) map to fault conditions.
- id: scaler_feedback
  type: string
- id: projector_feedback
  type: string
- id: latest_error_code
  type: enum
  values:
    - "01"
    - "02"
    - "06"
    - "08"
    - "09"
    - "0A"
    - "15"
    - "30"
    - "31"
    - "32"
    - "33"
    - "40"
    - "41"
    - "42"
    - "43"
    - "44"
    - "46"
    - "47"
    - "49"
    - "4A"
  description: |
    Error codes returned by PR_ERROR query:
    01 Lamp does not turn on
    02 Accumulated lamp time exceeded 1500 hours
    06 Lamp goes off during projection
    08 Abnormal temperature in projector
    09 Abnormal temperature at intake vent
    0A Abnormal temperature at exhaust vent
    15 Lamp cover is open
    30 Trouble with CPU circuit board
    31 Trouble with MAIN circuit board
    32 Trouble with DD-RB circuit board
    33 Trouble with DD-G circuit board
    40 FAN1 (DD cooling fan) stopped
    41 FAN2 (lamp cooling fan) stopped
    42 FAN3 (overall exhaust fan) stopped
    43 FAN4 (MAIN circuit board fan) stopped
    44 FAN5 (lighting system PCS fan) stopped
    46 FAN7 (device fan) stopped
    47 FAN8 (lamp power supply fan) stopped
    49 FAN10 (DD fan) stopped
    4A FAN11 (DD fan) stopped
```

## Variables
```yaml
# UNRESOLVED: colour adjustment commands return numeric feedback but no discrete
# parameter set defined; only +/- direction indicated in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: lamp hour limit (1500h) is advisory only; no hard interlock described
# UNRESOLVED: no safety interlock procedure for projector control via scaler
```

## Notes
Projector is controlled via Scaler — all PR_ commands routed through SC_ prefix chain. Source documents two sections: 810 Scaler and 810 Projector. Terminate all commands with Carriage Return. <!-- UNRESOLVED: lamp hour reset method not stated in source; UNRESOLVED: firmware version not stated in source -->

## Provenance

```yaml
source_domains:
  - meridian-audio.info
  - meridian-audio.com
source_urls:
  - "https://www.meridian-audio.info/public/810-rs232-information[1899].pdf"
  - "https://www.meridian-audio.info/public/810_video_system_user_guide[1293].pdf"
  - https://www.meridian-audio.com/download/user_guides.html
retrieved_at: 2026-05-21T12:39:22.586Z
last_checked_at: 2026-05-27T15:39:42.373Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T15:39:42.373Z
matched_actions: 63
action_count: 63
confidence: medium
summary: "All 63 spec actions matched their source commands one-to-one; transport parameters fully verified. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "projector model number not stated in source; unified 810 system only"
- "colour adjustment commands return numeric feedback but no discrete"
- "no unsolicited notifications described in source"
- "no multi-step sequences described in source"
- "lamp hour limit (1500h) is advisory only; no hard interlock described"
- "no safety interlock procedure for projector control via scaler"
- "lamp hour reset method not stated in source; UNRESOLVED: firmware version not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
