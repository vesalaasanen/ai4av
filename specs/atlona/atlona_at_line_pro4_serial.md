---
spec_id: admin/atlona-at-line-pro4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-LINE-PRO4 Control Spec"
manufacturer: Atlona
model_family: AT-LINE-PRO4
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-LINE-PRO4
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-LINE-PRO4-GEN2.pdf
  - https://atlona.com/downloads/AMX_AT-LINE-PRO4-GEN2.zip
  - https://atlona.com/downloads/CRM_AT-LINE-PRO4-GEN2.zip
retrieved_at: 2026-05-20T18:18:07.787Z
last_checked_at: 2026-06-09T07:33:43.771Z
generated_at: 2026-06-09T07:33:43.771Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "power cycling behavior not documented in source"
  - "flow control not stated in source"
  - "no unsolicited event notifications described in source"
  - "no explicit multi-step macro sequences documented in source"
  - "no safety warnings or interlock procedures found in source"
  - "audio mute control (S command) not found in source — only R AUDIOMUTE query present."
  - "firmware version compatibility not stated in source."
  - "factory reset / device restart procedure not documented in source."
  - "command timing / minimum interval between commands not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:33:43.771Z
  matched_actions: 75
  action_count: 75
  confidence: medium
  summary: "All 75 spec actions matched cleanly against source commands; transport parameters verified; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-20
---

# Atlona AT-LINE-PRO4 Control Spec

## Summary
Atlona AT-LINE-PRO4 is a multi-format presentation scaler/switcher with CV, SV, COMP, PC (PC1-PC3), and HDMI (HDMI1-HDMI4) inputs; HDMI output with configurable EDID. Control via RS-232C at 19200 baud, 8 data bits, no parity, 1 stop bit. No authentication required.

<!-- UNRESOLVED: power cycling behavior not documented in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
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
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: integer
      description: 0 = power on, 1 = power off
      values:
        0: "power on"
        1: "power off"

- id: source
  label: Select Input Source
  kind: action
  params:
    - name: input
      type: integer
      values:
        0: CV
        1: SV
        2: COMP
        3: PC1
        4: PC2
        5: PC3
        6: HDMI1
        7: HDMI2
        8: HDMI3
        9: HDMI4

- id: output_edid
  label: Set Output EDID
  kind: action
  params:
    - name: edid
      type: integer
      values:
        0: NATIVE
        1: VGA
        2: SVGA
        3: XGA
        4: SXGA
        5: UXGA
        6: "480i"
        7: "480p"
        8: "720p@60"
        9: "1080i@60"
        10: "1080p@60"
        11: "576i@60"
        12: "576p@60"
        13: "720p@50"
        14: "1080i@50"
        15: "1080p@50"
        16: WXGA
        17: WSXGA
        18: WUXGA
        19: WXGA+
        20: SXGA+

- id: size
  label: Set Scale Mode
  kind: action
  params:
    - name: mode
      type: integer
      values:
        0: FULL
        1: OVERSCAN
        2: UNDERSCAN
        3: LETTERBOX
        4: PANSCAN

- id: picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      values:
        0: STANDARD
        1: MOVIE
        2: VIVID
        3: USER

- id: contrast
  label: Adjust Contrast
  kind: action
  params:
    - name: value
      type: integer
      min: 0
      max: 100

- id: brightness
  label: Adjust Brightness
  kind: action
  params:
    - name: value
      type: integer
      min: 0
      max: 100

- id: hue
  label: Adjust Hue
  kind: action
  params:
    - name: value
      type: integer
      min: 0
      max: 100

- id: saturation
  label: Adjust Saturation
  kind: action
  params:
    - name: value
      type: integer
      min: 0
      max: 100

- id: sharpness
  label: Adjust Sharpness
  kind: action
  params:
    - name: value
      type: integer
      min: 0
      max: 100

- id: nr
  label: Set Noise Reduction Mode
  kind: action
  params:
    - name: mode
      type: integer
      values:
        0: OFF
        1: LOW
        2: MIDDLE
        3: HIGH

- id: pc_phase
  label: Adjust PC Phase
  kind: action
  params:
    - name: value
      type: integer
      min: 0
      max: 63

- id: pc_clock
  label: Adjust PC Clock
  kind: action
  params:
    - name: value
      type: integer
      min: 0
      max: 100

- id: pc_h_position
  label: Adjust PC Horizontal Position
  kind: action
  params:
    - name: value
      type: integer
      min: 0
      max: 100

- id: pc_v_position
  label: Adjust PC Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      min: 0
      max: 100

- id: color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: mode
      type: integer
      values:
        0: NORMAL
        1: WARM
        2: COOL
        3: USER

- id: red
  label: Adjust Red Hue
  kind: action
  params:
    - name: value
      type: integer
      min: 0
      max: 100

- id: green
  label: Adjust Green Hue
  kind: action
  params:
    - name: value
      type: integer
      min: 0
      max: 100

- id: blue
  label: Adjust Blue Hue
  kind: action
  params:
    - name: value
      type: integer
      min: 0
      max: 100

- id: audio_delay
  label: Set Audio Delay
  kind: action
  params:
    - name: delay
      type: integer
      values:
        0: OFF
        1: "40ms"
        2: "110ms"
        3: "150ms"
- id: r_power
  label: Query Power Status
  kind: query
  params: []

- id: r_source
  label: Query Source Status
  kind: query
  params: []

- id: r_output
  label: Query Output EDID Status
  kind: query
  params: []

- id: r_size
  label: Query Scale Mode Status
  kind: query
  params: []

- id: r_picturemode
  label: Query Picture Mode Status
  kind: query
  params: []

- id: r_contrast
  label: Query Contrast Value
  kind: query
  params: []

- id: r_brightness
  label: Query Brightness Value
  kind: query
  params: []

- id: r_hue
  label: Query Hue Value
  kind: query
  params: []

- id: r_saturation
  label: Query Saturation Value
  kind: query
  params: []

- id: r_sharpness
  label: Query Sharpness Value
  kind: query
  params: []

- id: r_nr
  label: Query Noise Reduction Status
  kind: query
  params: []

- id: r_pchposition
  label: Query PC Horizontal Position
  kind: query
  params: []

- id: r_pcvposition
  label: Query PC Vertical Position
  kind: query
  params: []

- id: r_pcclock
  label: Query PC Clock Value
  kind: query
  params: []

- id: r_pcphase
  label: Query PC Phase Value
  kind: query
  params: []

- id: r_colortemp
  label: Query Color Temperature Mode
  kind: query
  params: []

- id: r_red
  label: Query Red Hue Value
  kind: query
  params: []

- id: r_green
  label: Query Green Hue Value
  kind: query
  params: []

- id: r_blue
  label: Query Blue Hue Value
  kind: query
  params: []

- id: r_osdhposition
  label: Query OSD Horizontal Position
  kind: query
  params: []

- id: r_osdvposition
  label: Query OSD Vertical Position
  kind: query
  params: []

- id: r_osdtimeout
  label: Query OSD Timeout
  kind: query
  params: []

- id: r_osdbackground
  label: Query OSD Background
  kind: query
  params: []

- id: r_audiomute
  label: Query Audio Mute Status
  kind: query
  params: []

- id: r_audiodelay
  label: Query Audio Delay Status
  kind: query
  params: []

- id: k_power
  label: Key Power
  kind: action
  params: []

- id: k_cv
  label: Key CV
  kind: action
  params: []

- id: k_sv
  label: Key SV
  kind: action
  params: []

- id: k_comp
  label: Key COMP
  kind: action
  params: []

- id: k_pc1
  label: Key PC1
  kind: action
  params: []

- id: k_pc2
  label: Key PC2
  kind: action
  params: []

- id: k_pc3
  label: Key PC3
  kind: action
  params: []

- id: k_hdmi1
  label: Key HDMI1
  kind: action
  params: []

- id: k_hdmi2
  label: Key HDMI2
  kind: action
  params: []

- id: k_hdmi3
  label: Key HDMI3
  kind: action
  params: []

- id: k_hdmi4
  label: Key HDMI4
  kind: action
  params: []

- id: k_menu
  label: Key Menu
  kind: action
  params: []

- id: k_dec
  label: Key Decrement
  kind: action
  params: []

- id: k_inc
  label: Key Increment
  kind: action
  params: []

- id: k_enter
  label: Key Enter
  kind: action
  params: []

- id: k_source
  label: Key Source
  kind: action
  params: []

- id: k_vga
  label: Key VGA
  kind: action
  params: []

- id: k_svga
  label: Key SVGA
  kind: action
  params: []

- id: k_xga
  label: Key XGA
  kind: action
  params: []

- id: k_sxga
  label: Key SXGA
  kind: action
  params: []

- id: k_uxga
  label: Key UXGA
  kind: action
  params: []

- id: k_1080i60
  label: Key 1080i60
  kind: action
  params: []

- id: k_480p
  label: Key 480p
  kind: action
  params: []

- id: k_720p60
  label: Key 720p60
  kind: action
  params: []

- id: k_1080p60
  label: Key 1080p60
  kind: action
  params: []

- id: k_up
  label: Key Up
  kind: action
  params: []

- id: k_down
  label: Key Down
  kind: action
  params: []

- id: k_left
  label: Key Left
  kind: action
  params: []

- id: k_right
  label: Key Right
  kind: action
  params: []

- id: k_exit
  label: Key Exit
  kind: action
  params: []

- id: k_auto
  label: Key Auto
  kind: action
  params: []

- id: k_reset
  label: Key Reset
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_feedback
  label: Power Status
  type: enum
  values:
    - ">POWER ON"
    - ">POWER OFF"

- id: source_feedback
  label: Source Status
  type: enum
  values:
    - ">SOURCE CV"
    - ">SOURCE SV"
    - ">SOURCE COMP"
    - ">SOURCE PC1"
    - ">SOURCE PC2"
    - ">SOURCE PC3"
    - ">SOURCE HDMI1"
    - ">SOURCE HDMI2"
    - ">SOURCE HDMI3"
    - ">SOURCE HDMI4"

- id: output_edid_feedback
  label: Output EDID Status
  type: enum
  values:
    - ">OUTPUT NATIVE"
    - ">OUTPUT VGA"
    - ">OUTPUT SVGA"
    - ">OUTPUT XGA"
    - ">OUTPUT SXGA"
    - ">OUTPUT UXGA"
    - ">OUTPUT 480i"
    - ">OUTPUT 480p"
    - ">OUTPUT 720p@60"
    - ">OUTPUT 1080i@60"
    - ">OUTPUT 1080p@60"
    - ">OUTPUT 576i@60"
    - ">OUTPUT 576p@60"
    - ">OUTPUT 720p@50"
    - ">OUTPUT 1080i50"
    - ">OUTPUT 1080p50"
    - ">OUTPUT WXGA"
    - ">OUTPUT WSXGA"
    - ">OUTPUT WUXGA"
    - ">OUTPUT WXGA+"
    - ">OUTPUT SXGA+"

- id: size_feedback
  label: Scale Mode Status
  type: enum
  values:
    - ">SIZE FULL"
    - ">SIZE OVERSCAN"
    - ">SIZE UNDERSCAN"
    - ">SIZE LETTERBOX"
    - ">SIZE PANSCAN"

- id: picture_mode_feedback
  label: Picture Mode Status
  type: enum
  values:
    - ">PICTUREMODE STANDARD"
    - ">PICTUREMODE MOVIE"
    - ">PICTUREMODE VIVID"
    - ">PICTUREMODE USER"

- id: nr_feedback
  label: Noise Reduction Status
  type: enum
  values:
    - ">NR OFF"
    - ">NR LOW"
    - ">NR MIDDLE"
    - ">NR HIGH"

- id: color_temp_feedback
  label: Color Temperature Status
  type: enum
  values:
    - ">COLORTEMP NORMAL"
    - ">COLORTEMP WARM"
    - ">COLORTEMP COOL"
    - ">COLORTEMP USER"

- id: audio_mute_feedback
  label: Audio Mute Status
  type: enum
  values:
    - ">AUDIOMUTE OFF"
    - ">AUDIOMUTE ON"

- id: audio_delay_feedback
  label: Audio Delay Status
  type: enum
  values:
    - ">AUDIODELAY OFF"
    - ">AUDIODELAY 40ms"
    - ">AUDIODELAY 110ms"
    - ">AUDIODELAY 150ms"

- id: command_failed
  label: Command Failed
  type: enum
  values:
    - ">Command FAILED"
```

## Variables
```yaml
- id: contrast
  label: Contrast
  type: integer
  min: 0
  max: 100

- id: brightness
  label: Brightness
  type: integer
  min: 0
  max: 100

- id: hue
  label: Hue
  type: integer
  min: 0
  max: 100

- id: saturation
  label: Saturation
  type: integer
  min: 0
  max: 100

- id: sharpness
  label: Sharpness
  type: integer
  min: 0
  max: 100

- id: red
  label: Red
  type: integer
  min: 0
  max: 100

- id: green
  label: Green
  type: integer
  min: 0
  max: 100

- id: blue
  label: Blue
  type: integer
  min: 0
  max: 100

- id: pc_phase
  label: PC Phase
  type: integer
  min: 0
  max: 63

- id: pc_clock
  label: PC Clock
  type: integer
  min: 0
  max: 100

- id: pc_h_position
  label: PC Horizontal Position
  type: integer
  min: 0
  max: 100

- id: pc_v_position
  label: PC Vertical Position
  type: integer
  min: 0
  max: 100

- id: osd_h_position
  label: OSD Horizontal Position
  type: integer
  min: 0
  max: 100

- id: osd_v_position
  label: OSD Vertical Position
  type: integer
  min: 0
  max: 100

- id: osd_timeout
  label: OSD Timeout
  type: integer
  min: 0
  max: 100

- id: osd_background
  label: OSD Background
  type: integer
  min: 0
  max: 8
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
All commands are ASCII, terminated with a carriage return (CR). Commands are case-sensitive — capitalization, spacing, and lettering must match exactly. On command failure or malformed input, the device returns `>Command FAILED`. Power command uses inverted logic: `S POWER 0` activates power (feedback: `>POWER ON`), `S POWER 1` deactivates power (feedback: `>POWER OFF`).

<!-- UNRESOLVED: audio mute control (S command) not found in source — only R AUDIOMUTE query present. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: factory reset / device restart procedure not documented in source. -->
<!-- UNRESOLVED: command timing / minimum interval between commands not stated in source. -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-LINE-PRO4-GEN2.pdf
  - https://atlona.com/downloads/AMX_AT-LINE-PRO4-GEN2.zip
  - https://atlona.com/downloads/CRM_AT-LINE-PRO4-GEN2.zip
retrieved_at: 2026-05-20T18:18:07.787Z
last_checked_at: 2026-06-09T07:33:43.771Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:33:43.771Z
matched_actions: 75
action_count: 75
confidence: medium
summary: "All 75 spec actions matched cleanly against source commands; transport parameters verified; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "power cycling behavior not documented in source"
- "flow control not stated in source"
- "no unsolicited event notifications described in source"
- "no explicit multi-step macro sequences documented in source"
- "no safety warnings or interlock procedures found in source"
- "audio mute control (S command) not found in source — only R AUDIOMUTE query present."
- "firmware version compatibility not stated in source."
- "factory reset / device restart procedure not documented in source."
- "command timing / minimum interval between commands not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
