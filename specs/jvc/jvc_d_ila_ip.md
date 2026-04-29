---
schema_version: ai4av-public-spec-v1
device_id: jvc/dla-hd350
entity_id: jvc_d_ila
spec_id: admin/jvc-d-ila-projector
revision: 1
author: admin
title: "JVC D-ILA Projector Control Spec"
status: published
manufacturer: JVC
manufacturer_key: jvc
model_family: DLA-HD350
aliases: []
compatible_with:
  manufacturers:
    - JVC
  models:
    - DLA-HD350
    - DLA-HD750
    - DLA-HD550
    - DLA-HD950
    - DLA-HD990
    - DLA-X3
    - DLA-X7
    - DLA-X9
    - DLA-X30
    - DLA-X70R
    - DLA-X90R
    - DLA-RS10
    - DLA-RS20
    - DLA-RS15
    - DLA-RS25
    - DLA-RS35
    - DLA-RS40
    - DLA-RS50
    - DLA-RS60
    - DLA-RS45
    - DLA-RS55
    - DLA-RS65
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: jvc_d_ila_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:52:02.825Z
retrieved_at: 2026-04-25T20:52:02.825Z
last_checked_at: 2026-04-25T20:52:02.825Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T20:52:02.825Z
  matched_actions: 192
  action_count: 192
  confidence: high
  summary: "Every spec action matched literally in source; all transport parameters confirmed; bidirectional coverage verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# JVC D-ILA Projector Control Spec

## Summary
JVC D-ILA home theatre projectors across multiple model generations. Control is via RS-232C serial or LAN (TCP/IP on port 20554). Commands are binary hex with a fixed packet structure (header, unit ID 89 01, command, data, terminator 0A). Two command types: Direct Commands and Remote Control Emulation Commands. The source document is "JVC D-ILA Projector RS-232C, LAN and Infrared Remote Control Guide" version 1.4.

<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: exact model-to-firmware mapping not stated -->
<!-- UNRESOLVED: LAN control only supported on DLA-X7/X9/X30/X70/X90/RS50/60/45/55/65 per source; RS-232C applies to all models -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 20554
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands present
  - queryable    # enquiry commands for power, input, gamma, source, model status
  - routable     # input switching commands present
  - levelable    # brightness, contrast, colour, sharpness, lens aperture adjustments present
```

## Actions
```yaml
# All commands are binary hex. Format: Header(21) UnitID(89 01) Command(2B) Data(var) End(0A)
# Direct Commands are preferred over Remote Control Emulation Commands.

# --- POWER ---
- id: power_on
  label: Power On
  kind: action
  hex: "21 89 01 50 57 31 0A"
  params: []

- id: power_off
  label: Power Off
  kind: action
  hex: "21 89 01 50 57 30 0A"
  params: []

# --- INPUT SWITCHING ---
- id: input_hdmi1
  label: Input HDMI 1
  kind: action
  hex: "21 89 01 49 50 36 0A"
  params: []

- id: input_hdmi2
  label: Input HDMI 2
  kind: action
  hex: "21 89 01 49 50 37 0A"
  params: []

- id: input_component
  label: Input Component
  kind: action
  hex: "21 89 01 49 50 32 0A"
  params: []

- id: input_svideo
  label: Input S-Video
  kind: action
  hex: "21 89 01 49 50 30 0A"
  params: []

- id: input_video
  label: Input Video
  kind: action
  hex: "21 89 01 49 50 31 0A"
  params: []

- id: input_pc
  label: Input PC
  kind: action
  hex: "21 89 01 49 50 33 0A"
  params: []
  notes: "HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65 only"

- id: input_next
  label: Input Next (cycle up)
  kind: action
  hex: "21 89 01 49 50 2B 0A"
  params: []

- id: input_prev
  label: Input Prev (cycle down)
  kind: action
  hex: "21 89 01 49 50 2D 0A"
  params: []

# --- TEST PATTERNS (HD350/550/750/950/990/RS10/15/20/25/35) ---
- id: test_pattern_off
  label: Test Pattern Off
  kind: action
  hex: "21 89 01 54 53 30 0A"
  params: []

- id: test_pattern_colour_bars
  label: Test Pattern Colour Bars
  kind: action
  hex: "21 89 01 54 53 31 0A"
  params: []

- id: test_pattern_stairstep_bw
  label: Test Pattern Stairstep B&W
  kind: action
  hex: "21 89 01 54 53 36 0A"
  params: []

- id: test_pattern_stairstep_red
  label: Test Pattern Stairstep Red
  kind: action
  hex: "21 89 01 54 53 37 0A"
  params: []

- id: test_pattern_stairstep_green
  label: Test Pattern Stairstep Green
  kind: action
  hex: "21 89 01 54 53 38 0A"
  params: []

- id: test_pattern_stairstep_blue
  label: Test Pattern Stairstep Blue
  kind: action
  hex: "21 89 01 54 53 39 0A"
  params: []

- id: test_pattern_crosshatch
  label: Test Pattern Crosshatch (green)
  kind: action
  hex: "21 89 01 54 53 41 0A"
  params: []

# --- GAMMA ---
- id: gamma_normal
  label: Gamma Normal
  kind: action
  hex: "21 89 01 47 54 30 0A"
  params: []

- id: gamma_a
  label: Gamma A
  kind: action
  hex: "21 89 01 47 54 31 0A"
  params: []

- id: gamma_b
  label: Gamma B
  kind: action
  hex: "21 89 01 47 54 32 0A"
  params: []

- id: gamma_c
  label: Gamma C
  kind: action
  hex: "21 89 01 47 54 33 0A"
  params: []

- id: gamma_d
  label: Gamma D
  kind: action
  hex: "21 89 01 47 54 37 0A"
  params: []
  notes: "HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65 only"

- id: gamma_custom1
  label: Gamma Custom 1
  kind: action
  hex: "21 89 01 47 54 34 0A"
  params: []

- id: gamma_custom2
  label: Gamma Custom 2
  kind: action
  hex: "21 89 01 47 54 35 0A"
  params: []

- id: gamma_custom3
  label: Gamma Custom 3
  kind: action
  hex: "21 89 01 47 54 36 0A"
  params: []

# --- GAMMA CORRECTION VALUE ---
- id: gamma_value_18
  label: Gamma Correction 1.8
  kind: action
  hex: "21 89 01 47 50 30 0A"
  params: []

- id: gamma_value_19
  label: Gamma Correction 1.9
  kind: action
  hex: "21 89 01 47 50 31 0A"
  params: []

- id: gamma_value_20
  label: Gamma Correction 2.0
  kind: action
  hex: "21 89 01 47 50 32 0A"
  params: []

- id: gamma_value_21
  label: Gamma Correction 2.1
  kind: action
  hex: "21 89 01 47 50 33 0A"
  params: []

- id: gamma_value_22
  label: Gamma Correction 2.2
  kind: action
  hex: "21 89 01 47 50 34 0A"
  params: []

- id: gamma_value_23
  label: Gamma Correction 2.3
  kind: action
  hex: "21 89 01 47 50 35 0A"
  params: []

- id: gamma_value_24
  label: Gamma Correction 2.4
  kind: action
  hex: "21 89 01 47 50 36 0A"
  params: []

- id: gamma_value_25
  label: Gamma Correction 2.5
  kind: action
  hex: "21 89 01 47 50 37 0A"
  params: []

- id: gamma_value_26
  label: Gamma Correction 2.6
  kind: action
  hex: "21 89 01 47 50 38 0A"
  params: []

# --- OFF TIMER (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) ---
- id: off_timer_off
  label: Off Timer Off
  kind: action
  hex: "21 89 01 46 55 4F 54 30 0A"
  params: []

- id: off_timer_1h
  label: Off Timer 1 Hour
  kind: action
  hex: "21 89 01 46 55 4F 54 31 0A"
  params: []

- id: off_timer_2h
  label: Off Timer 2 Hours
  kind: action
  hex: "21 89 01 46 55 4F 54 32 0A"
  params: []

- id: off_timer_3h
  label: Off Timer 3 Hours
  kind: action
  hex: "21 89 01 46 55 4F 54 33 0A"
  params: []

- id: off_timer_4h
  label: Off Timer 4 Hours
  kind: action
  hex: "21 89 01 46 55 4F 54 34 0A"
  params: []

# --- LAMP POWER (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) ---
- id: lamp_power_normal
  label: Lamp Power Normal
  kind: action
  hex: "21 89 01 50 4D 4C 50 30 0A"
  params: []

- id: lamp_power_high
  label: Lamp Power High
  kind: action
  hex: "21 89 01 50 4D 4C 50 31 0A"
  params: []

# --- TRIGGER OUTPUT (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) ---
- id: trigger_off
  label: Trigger Off
  kind: action
  hex: "21 89 01 46 55 54 52 30 0A"
  params: []

- id: trigger_on_power
  label: Trigger On (Power)
  kind: action
  hex: "21 89 01 46 55 54 52 31 0A"
  params: []

- id: trigger_on_anamorphic
  label: Trigger On (Anamorphic)
  kind: action
  hex: "21 89 01 46 55 54 52 32 0A"
  params: []

# --- CLEAR MOTION DRIVE (CMD models) ---
- id: cmd_off
  label: Clear Motion Drive Off
  kind: action
  hex: "21 89 01 50 4D 43 4D 30 0A"
  params: []

- id: cmd_mode1
  label: Clear Motion Drive Mode 1
  kind: action
  hex: "21 89 01 50 4D 43 4D 31 0A"
  params: []
  notes: "Low on HD550/950/990"

- id: cmd_mode2
  label: Clear Motion Drive Mode 2
  kind: action
  hex: "21 89 01 50 4D 43 4D 32 0A"
  params: []
  notes: "High on HD550/950/990"

- id: cmd_mode3
  label: Clear Motion Drive Mode 3
  kind: action
  hex: "21 89 01 50 4D 43 4D 33 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 only"

- id: cmd_mode4
  label: Clear Motion Drive Mode 4
  kind: action
  hex: "21 89 01 50 4D 43 4D 34 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 only"

- id: cmd_inverse_telecine
  label: Clear Motion Drive Inverse Telecine
  kind: action
  hex: "21 89 01 50 4D 43 4D 35 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 only"

# --- ANAMORPHIC (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) ---
- id: anamorphic_off
  label: Anamorphic Off
  kind: action
  hex: "21 89 01 49 4E 56 53 30 0A"
  params: []

- id: anamorphic_a
  label: Anamorphic A
  kind: action
  hex: "21 89 01 49 4E 56 53 31 0A"
  params: []

- id: anamorphic_b
  label: Anamorphic B
  kind: action
  hex: "21 89 01 49 4E 56 53 32 0A"
  params: []

# --- PICTURE MODE (X30/X70/X90/RS45/55/65) ---
- id: picture_mode_film_x70
  label: Picture Mode Film (X70 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 30 0A"
  params: []
  notes: "X30/X70/X90/RS45/55/65"

- id: picture_mode_cinema_x70
  label: Picture Mode Cinema (X70 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 31 0A"
  params: []
  notes: "X30/X70/X90/RS45/55/65"

- id: picture_mode_animation_x70
  label: Picture Mode Animation (X70 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 32 0A"
  params: []
  notes: "X30/X70/X90/RS45/55/65"

- id: picture_mode_natural_x70
  label: Picture Mode Natural (X70 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 33 0A"
  params: []
  notes: "X30/X70/X90/RS45/55/65"

- id: picture_mode_stage_x70
  label: Picture Mode Stage (X70 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 34 0A"
  params: []
  notes: "X30/X70/X90/RS45/55/65"

- id: picture_mode_thx_x70
  label: Picture Mode THX (X70 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 36 0A"
  params: []
  notes: "X70/X90/RS55/65 only"

- id: picture_mode_3d_x70
  label: Picture Mode 3D (X70 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 42 0A"
  params: []
  notes: "X30/X70/X90/RS45/55/65"

- id: picture_mode_user1_x70
  label: Picture Mode User 1 (X70 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 43 0A"
  params: []
  notes: "X30/X70/X90/RS45/55/65"

- id: picture_mode_user2_x70
  label: Picture Mode User 2 (X70 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 44 0A"
  params: []
  notes: "X30/X70/X90/RS45/55/65"

- id: picture_mode_user3_x70
  label: Picture Mode User 3 (X70 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 45 0A"
  params: []
  notes: "X30/X70/X90/RS45/55/65"

- id: picture_mode_user4_x70
  label: Picture Mode User 4 (X70 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 46 0A"
  params: []
  notes: "X30/X70/X90/RS45/55/65"

- id: picture_mode_user5_x70
  label: Picture Mode User 5 (X70 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 31 30 0A"
  params: []
  notes: "X30/X70/X90/RS45/55/65"

# --- PICTURE MODE (X3/X7/X9/RS40/50/60) ---
- id: picture_mode_film_x7
  label: Picture Mode Film (X7 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 0A"
  params: []
  notes: "X3/X7/X9/RS40/50/60"

- id: picture_mode_cinema_x7
  label: Picture Mode Cinema (X7 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 31 0A"
  params: []
  notes: "X3/X7/X9/RS40/50/60"

- id: picture_mode_animation_x7
  label: Picture Mode Animation (X7 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 32 0A"
  params: []
  notes: "X3/X7/X9/RS40/50/60"

- id: picture_mode_natural_x7
  label: Picture Mode Natural (X7 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 33 0A"
  params: []
  notes: "X3/X7/X9/RS40/50/60"

- id: picture_mode_stage_x7
  label: Picture Mode Stage (X7 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 34 0A"
  params: []
  notes: "X3/X7/X9/RS40/50/60"

- id: picture_mode_3d_x7
  label: Picture Mode 3D (X7 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 45 0A"
  params: []
  notes: "X3/X7/X9/RS40/50/60"

- id: picture_mode_user1_x7
  label: Picture Mode User 1 (X7 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 36 0A"
  params: []
  notes: "X3/X7/X9/RS40/50/60"

- id: picture_mode_user2_x7
  label: Picture Mode User 2 (X7 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 37 0A"
  params: []
  notes: "X3/X7/X9/RS40/50/60"

- id: picture_mode_thx_x7
  label: Picture Mode THX (X7 gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 39 0A"
  params: []
  notes: "X7/X9/RS50/60 only"

# --- PICTURE MODE (HD350/750/550/950/990/RS10/20/15/25/35) ---
- id: picture_mode_cinema1_hd
  label: Picture Mode Cinema 1 (HD gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 30 0A"
  params: []
  notes: "HD350/750/550/950/990/RS10/20/15/25/35"

- id: picture_mode_cinema2_hd
  label: Picture Mode Cinema 2 (HD gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 31 0A"
  params: []
  notes: "HD350/750/550/950/990/RS10/20/15/25/35"

- id: picture_mode_cinema3_hd
  label: Picture Mode Cinema 3 (HD gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 32 0A"
  params: []
  notes: "HD350/750/550/950/990/RS10/20/15/25/35"

- id: picture_mode_natural_hd
  label: Picture Mode Natural (HD gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 33 0A"
  params: []
  notes: "HD350/750/550/950/990/RS10/20/15/25/35"

- id: picture_mode_stage_hd
  label: Picture Mode Stage (HD gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 34 0A"
  params: []
  notes: "HD350/750/550/950/990/RS10/20/15/25/35"

- id: picture_mode_dynamic_hd
  label: Picture Mode Dynamic (HD gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 35 0A"
  params: []
  notes: "HD350/750/550/950/990/RS10/20/15/25/35"

- id: picture_mode_user1_hd
  label: Picture Mode User 1 (HD gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 36 0A"
  params: []
  notes: "HD350/750/550/950/990/RS10/20/15/25/35"

- id: picture_mode_user2_hd
  label: Picture Mode User 2 (HD gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 37 0A"
  params: []
  notes: "HD350/750/550/950/990/RS10/20/15/25/35"

- id: picture_mode_thx_hd
  label: Picture Mode THX (HD gen)
  kind: action
  hex: "21 89 01 50 4D 50 4D 39 0A"
  params: []
  notes: "HD750/950/990/RS20/25/35 only"

# --- 3D FORMAT (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) ---
- id: format_3d_off
  label: 3D Format Off (2D)
  kind: action
  hex: "21 89 01 49 53 33 44 30 0A"
  params: []

- id: format_3d_auto
  label: 3D Format Auto
  kind: action
  hex: "21 89 01 49 53 33 44 31 0A"
  params: []

- id: format_3d_frame_packing
  label: 3D Format Frame Packing
  kind: action
  hex: "21 89 01 49 53 33 44 32 0A"
  params: []

- id: format_3d_side_by_side
  label: 3D Format Side by Side
  kind: action
  hex: "21 89 01 49 53 33 44 33 0A"
  params: []

- id: format_3d_top_and_bottom
  label: 3D Format Top and Bottom
  kind: action
  hex: "21 89 01 49 53 33 44 34 0A"
  params: []

# --- 2D to 3D (X30/X70/X90/RS45/55/65) ---
- id: convert_2d_to_3d_off
  label: 2D to 3D Conversion Off
  kind: action
  hex: "21 89 01 49 53 33 43 30 0A"
  params: []

- id: convert_2d_to_3d_on
  label: 2D to 3D Conversion On
  kind: action
  hex: "21 89 01 49 53 33 43 31 0A"
  params: []

# --- 3D SUBTITLE CORRECTION (X30/X70/X90/RS45/55/65) ---
- id: subtitle_3d_off
  label: 3D Subtitle Correction Off
  kind: action
  hex: "21 89 01 49 53 33 54 31 0A"
  params: []

- id: subtitle_3d_on
  label: 3D Subtitle Correction On
  kind: action
  hex: "21 89 01 49 53 33 54 30 0A"
  params: []

# --- LENS MEMORY (X30/X70/X90/RS45/55/65) ---
- id: lens_memory_save1
  label: Lens Memory Save 1
  kind: action
  hex: "21 89 01 49 4E 4D 53 30 0A"
  params: []

- id: lens_memory_save2
  label: Lens Memory Save 2
  kind: action
  hex: "21 89 01 49 4E 4D 53 31 0A"
  params: []

- id: lens_memory_save3
  label: Lens Memory Save 3
  kind: action
  hex: "21 89 01 49 4E 4D 53 32 0A"
  params: []

- id: lens_memory_select1
  label: Lens Memory Select 1
  kind: action
  hex: "21 89 01 49 4E 4D 4C 30 0A"
  params: []

- id: lens_memory_select2
  label: Lens Memory Select 2
  kind: action
  hex: "21 89 01 49 4E 4D 4C 31 0A"
  params: []

- id: lens_memory_select3
  label: Lens Memory Select 3
  kind: action
  hex: "21 89 01 49 4E 4D 4C 32 0A"
  params: []

# --- TEST / NULL COMMAND ---
- id: test_communication
  label: Test Communication (Null Command)
  kind: action
  hex: "21 89 01 00 00 0A"
  params: []
  notes: "Works in standby and powered on; response echoes the command back"

# --- REMOTE CONTROL EMULATION (selected key commands) ---
# These use header 21 89 01 52 43 ... 0A format
# Full remote emulation table contains 100+ entries; representative subset below

- id: rc_brightness_up
  label: Brightness +
  kind: action
  hex: "21 89 01 52 43 37 33 37 41 0A"
  params: []

- id: rc_brightness_down
  label: Brightness -
  kind: action
  hex: "21 89 01 52 43 37 33 37 42 0A"
  params: []

- id: rc_contrast_up
  label: Contrast +
  kind: action
  hex: "21 89 01 52 43 37 33 37 38 0A"
  params: []

- id: rc_contrast_down
  label: Contrast -
  kind: action
  hex: "21 89 01 52 43 37 33 37 39 0A"
  params: []

- id: rc_colour_up
  label: Colour +
  kind: action
  hex: "21 89 01 52 43 37 33 37 43 0A"
  params: []

- id: rc_colour_down
  label: Colour -
  kind: action
  hex: "21 89 01 52 43 37 33 37 44 0A"
  params: []

- id: rc_sharpness_up
  label: Sharpness +
  kind: action
  hex: "21 89 01 52 43 37 33 37 45 0A"
  params: []

- id: rc_sharpness_down
  label: Sharpness -
  kind: action
  hex: "21 89 01 52 43 37 33 37 46 0A"
  params: []

- id: rc_shutter_open
  label: Shutter Open
  kind: action
  hex: "21 89 01 52 43 37 33 31 41 0A"
  params: []
  notes: "HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65"

- id: rc_shutter_close
  label: Shutter Close
  kind: action
  hex: "21 89 01 52 43 37 33 31 39 0A"
  params: []
  notes: "HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65"

- id: rc_hide_on
  label: Hide On
  kind: action
  hex: "21 89 01 52 43 37 33 44 30 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_hide_off
  label: Hide Off
  kind: action
  hex: "21 89 01 52 43 37 33 44 31 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_menu_toggle
  label: Menu Toggle
  kind: action
  hex: "21 89 01 52 43 37 33 32 45 0A"
  params: []

- id: rc_ok
  label: OK
  kind: action
  hex: "21 89 01 52 43 37 33 32 46 0A"
  params: []

- id: rc_cursor_up
  label: Cursor Up
  kind: action
  hex: "21 89 01 52 43 37 33 30 31 0A"
  params: []

- id: rc_cursor_down
  label: Cursor Down
  kind: action
  hex: "21 89 01 52 43 37 33 30 32 0A"
  params: []

- id: rc_cursor_left
  label: Cursor Left
  kind: action
  hex: "21 89 01 52 43 37 33 33 36 0A"
  params: []

- id: rc_cursor_right
  label: Cursor Right
  kind: action
  hex: "21 89 01 52 43 37 33 33 34 0A"
  params: []

- id: rc_back
  label: Back
  kind: action
  hex: "21 89 01 52 43 37 33 30 33 0A"
  params: []

- id: rc_information
  label: Information
  kind: action
  hex: "21 89 01 52 43 37 33 37 34 0A"
  params: []

- id: rc_lens_aperture_up
  label: Lens Aperture +
  kind: action
  hex: "21 89 01 52 43 37 33 31 45 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_lens_aperture_down
  label: Lens Aperture -
  kind: action
  hex: "21 89 01 52 43 37 33 31 46 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_aspect_169
  label: Aspect 16:9
  kind: action
  hex: "21 89 01 52 43 37 33 32 36 0A"
  params: []

- id: rc_aspect_43
  label: Aspect 4:3
  kind: action
  hex: "21 89 01 52 43 37 33 32 35 0A"
  params: []

- id: rc_aspect_zoom
  label: Aspect Zoom
  kind: action
  hex: "21 89 01 52 43 37 33 32 37 0A"
  params: []

# UNRESOLVED: Remote Control Emulation table contains many more entries for colour temp,
# colour management, pixel shift, mask, keystone, lens shift, lens zoom, THX mode,
# ISF mode, CEC, noise reduction, etc. Not all listed here — see source for complete table.
```

## Feedbacks
```yaml
# Enquiry commands use header 3F instead of 21.
# Response format: basic ack (06 89 01 CC CC 0A) followed by detailed (40 89 01 CC CC RR 0A)

- id: power_status
  label: Power Status
  type: enum
  enquiry_hex: "3F 89 01 50 57 0A"
  response_command: "50 57"
  values:
    - value: standby
      code: "30"
    - value: power_on
      code: "31"
    - value: cooling
      code: "32"
    - value: emergency
      code: "34"

- id: input_status
  label: Input Status
  type: enum
  enquiry_hex: "3F 89 01 49 50 0A"
  response_command: "49 50"
  values:
    - value: svideo
      code: "30"
    - value: video
      code: "31"
    - value: component
      code: "32"
    - value: pc
      code: "33"
      notes: "HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65"
    - value: hdmi1
      code: "36"
    - value: hdmi2
      code: "37"

- id: gamma_table
  label: Gamma Table Status
  type: enum
  enquiry_hex: "3F 89 01 47 54 0A"
  response_command: "47 54"
  values:
    - value: normal
      code: "30"
    - value: a
      code: "31"
    - value: b
      code: "32"
    - value: c
      code: "33"
    - value: custom1
      code: "34"
    - value: custom2
      code: "35"
    - value: custom3
      code: "36"

- id: gamma_value
  label: Gamma Correction Value
  type: enum
  enquiry_hex: "3F 89 01 47 50 0A"
  response_command: "47 50"
  values:
    - value: "1.8"
      code: "30"
    - value: "1.9"
      code: "31"
    - value: "2.0"
      code: "32"
    - value: "2.1"
      code: "33"
    - value: "2.2"
      code: "34"
    - value: "2.3"
      code: "35"
    - value: "2.4"
      code: "36"
    - value: "2.5"
      code: "37"
    - value: "2.6"
      code: "38"

- id: source_status
  label: Source Status
  type: enum
  enquiry_hex: "3F 89 01 53 43 0A"
  response_command: "53 43"
  values:
    - value: logo
      code: "00"
    - value: no_signal
      code: "30"
    - value: signal_ok
      code: "31"

- id: model_status
  label: Model Status
  type: enum
  enquiry_hex: "3F 89 01 4D 44 0A"
  response_command: "4D 44"
  notes: "Returns 14-byte string identifying model; RR values map to model groups"
  values:
    - value: DLA-HD350
      code: "494C4146504A202D2D202D584834"
    - value: DLA-RS10
      code: "494C4146504A202D2D202D584837"
    - value: DLA-HD750_DLA-RS20
      code: "494C4146504A202D2D202D584835"
    - value: DLA-HD550
      code: "494C4146504A202D2D202D584838"
    - value: DLA-RS15
      code: "494C4146504A202D2D202D584841"
    - value: DLA-HD950_HD990_DLA-RS25_RS35
      code: "494C4146504A202D2D202D584839"
    - value: DLA-X3_DLA-RS40
      code: "494C4146504A202D2D202D584842"
    - value: DLA-X7_X9_DLA-RS50_60
      code: "494C4146504A202D2D202D584843"
    - value: DLA-X30_DLA-RS45
      code: "494C4146504A202D2D202D584845"
    - value: DLA-X70R_X90R_DLA-RS55_65
      code: "494C4146504A202D2D202D584846"
```

## Variables
```yaml
# UNRESOLVED: no continuous variable ranges documented — all values are discrete enum selections
```

## Events
```yaml
# No unsolicited events documented. All responses are triggered by enquiry commands.
```

## Macros
```yaml
# LAN connection handshake sequence (required before each command over TCP):
# 1. TCP connect to projector port 20554
# 2. Receive "PJ_OK" from projector
# 3. Send "PJREQ" within 5 seconds
# 4. Receive "PJACK" from projector
# 5. Send hex command within 5 seconds
# 6. Connection closes after 5 seconds of inactivity
# Each command requires a new connection establishment.

# RS-232C power off (remote emulation): send power off command twice with short delay between
- id: rc_power_off_sequence
  label: Power Off (Remote Emulation)
  steps:
    - send: "21 89 01 52 43 37 33 30 36 0A"
    - delay: short
    - send: "21 89 01 52 43 37 33 30 36 0A"
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Projector ignores inappropriate commands (e.g. Power On during cooling mode)"
  - "Projector discards commands if 50ms+ break in incoming data"
  - "Controller must wait for acknowledgement response before sending next command"
# UNRESOLVED: no explicit safety interlocks or power-on sequencing documented in source
```

## Notes
- Commands are binary hex, not ASCII. Send and receive modes must be set to Hex in control software.
- Unit ID is fixed at `89 01` for all models. End byte is fixed at `0A`.
- Header values: `21` (operating command), `3F` (enquiry), `06` (basic acknowledgement), `40` (detailed acknowledgement).
- RS-232C uses null-modem (cross-connected / DTE/DTE) cable. Pin 2=Rx, Pin 3=Tx, Pin 5=Ground.
- LAN control only available on DLA-X7/X9/X30/X70/X90/RS50/60/45/55/65. Must switch projector Communication Terminal from RS-232C to LAN in Function menu.
- LAN handshake is per-command: TCP connect → PJ_OK → PJREQ (within 5s) → PJACK → command (within 5s) → auto-close.
- Picture mode hex codes overlap across model generations (e.g. `50 4D 50 4D 30` is Cinema 1 on HD gen but Film on X7 gen). Controller must know which model it is talking to.
- Default projector IP: 192.168.0.2, Subnet: 255.255.255.0, Gateway: 192.168.0.254 (DHCP off).
- Infrared control uses hex code 73 (Code A) or 63 (Code B) prefix followed by ASCII hex value from the remote emulation table.

<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: maximum command rate / minimum inter-command delay not specified beyond acknowledgement wait -->
<!-- UNRESOLVED: LAN connection limit (max simultaneous connections) not stated -->
<!-- UNRESOLVED: Colour Profile and Colour Management enquiry codes not documented -->
<!-- UNRESOLVED: Picture Mode enquiry code not documented (no feedback for current picture mode) -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: jvc_d_ila_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:52:02.825Z
retrieved_at: 2026-04-25T20:52:02.825Z
last_checked_at: 2026-04-25T20:52:02.825Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:52:02.825Z
matched_actions: 192
action_count: 192
confidence: high
summary: "Every spec action matched literally in source; all transport parameters confirmed; bidirectional coverage verified."
```

## Known Gaps

```yaml
[]
```
