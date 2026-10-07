---
spec_id: admin/jvc-d-ila-projector
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC D-ILA Projector Control Spec"
manufacturer: JVC
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
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
retrieved_at: 2026-04-30T04:26:39.184Z
last_checked_at: 2026-10-07T13:51:15.686Z
generated_at: 2026-10-07T13:51:15.686Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility ranges not stated"
  - "exact model-to-firmware mapping not stated"
  - "LAN control only supported on DLA-X7/X9/X30/X70/X90/RS50/60/45/55/65 per source; RS-232C applies to all models"
  - "source documents no authentication procedure but does not explicitly state that no authentication is required"
  - "Remote Control Emulation table contains many more entries for colour temp,"
  - "no continuous variable ranges documented - all values are discrete enum selections"
  - "no explicit safety interlocks or power-on sequencing documented in source"
  - "source documents the LAN handshake token as \"PJREQ\"; verify token spelling against source before relying on it"
  - "maximum command rate / minimum inter-command delay not specified beyond acknowledgement wait"
  - "LAN connection limit (max simultaneous connections) not stated"
  - "Colour Profile and Colour Management enquiry codes not documented"
  - "Picture Mode enquiry code not documented (no feedback for current picture mode)"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:51:15.686Z
  matched_actions: 269
  action_count: 269
  confidence: medium
  summary: "All 269 action units match source hex codes and shapes; transport (port 20554, 19200 8N1) supported; catalogue essentially fully represented. (12 unresolved item(s) noted in Known Gaps.)"
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
  type: UNRESOLVED  # UNRESOLVED: source documents no authentication procedure but does not explicitly state that no authentication is required
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
  notes: "Works in standby and powered on; source states response is 06 89 01 00 00 0A (a basic acknowledgement), not an echo of the transmitted payload"

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
# ISF mode, CEC, noise reduction, etc. Not all listed here - see source for complete table.

# --- ADDITIONAL DIRECT COMMANDS ---
# Source packet spelling is preserved, including source byte-group spacing.
# For parameterized entries, hex shows the first documented variant; notes give
# the complete packet to send for each parameter selection, replacing hex.

- id: infrared_remote_code_a
  label: Infrared Remote Code A
  kind: action
  hex: "2189 0153 55 52 43 30 0A"
  params: []
  notes: "Remote CodeA - hexcode73; X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: infrared_remote_code_b
  label: Infrared Remote Code B
  kind: action
  hex: "2189 0153 55 52 43 310A"
  params: []
  notes: "Remote CodeB - hexcode 63; X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: colour_profile_off
  label: Colour Profile Off
  kind: action
  hex: "2189 01504D50 5230 30 0A"
  params: []
  notes: "X30/X70/X90/RS45/55/65"

- id: colour_profile_film
  label: Colour Profile Film
  kind: action
  hex: "2189 01504D50 5230 310A"
  params:
    - name: preset
      type: enum
      values: [1, 2]
  notes: "X30/X70/X90/RS45/55/65; in Film mode. 1: 2189 01504D50 5230 310A; 2: 21 89 01 50 4D 50 52 30 32 0A."

- id: colour_profile_standard
  label: Colour Profile Standard
  kind: action
  hex: "21 89 01 50 4D 50 52 30 33 0A"
  params: []
  notes: "X30/X70/X90/RS45/55/65; in Cinema, Natural,Stage & 3D modes"

- id: colour_profile_cinema
  label: Colour Profile Cinema
  kind: action
  hex: "2189 01504D50 5230 340A"
  params:
    - name: preset
      type: enum
      values: [1, 2]
  notes: "X30/X70/X90/RS45/55/65; in Cinema mode. 1: 2189 01504D50 5230 340A; 2: 21 89 01 50 4D 50 52 30 35 0A."

- id: colour_profile_anime
  label: Colour Profile Anime
  kind: action
  hex: "2189 01504D50 5230 36 0A"
  params:
    - name: preset
      type: enum
      values: [1, 2]
  notes: "X30/X70/X90/RS45/55/65; in Animation mode. 1: 2189 01504D50 5230 36 0A; 2: 21 89 01 50 4D 50 52 30 37 0A."

- id: colour_profile_video
  label: Colour Profile Video
  kind: action
  hex: "2189 01504D50 5230 38 0A"
  params: []
  notes: "X30/X70/X90/RS45/55/65; in Natural mode"

- id: colour_profile_vivid
  label: Colour Profile Vivid
  kind: action
  hex: "2189 01504D50 5230 39 0A"
  params: []
  notes: "X30/X70/X90/RS45/55/65; in Natural& 3D modes"

- id: colour_profile_adobe
  label: Colour Profile Adobe
  kind: action
  hex: "21 89 01 50 4D 50 52 30 41 0A"
  params: []
  notes: "X30/X70/X90/RS45/55/65; in Natural mode"

- id: colour_profile_stage
  label: Colour Profile Stage
  kind: action
  hex: "2189 01504D50 5230420A"
  params: []
  notes: "X30/X70/X90/RS45/55/65; in Stage mode"

- id: colour_profile_3d
  label: Colour Profile 3D
  kind: action
  hex: "21 89 01 50 4D 50 52 30 43 0A"
  params: []
  notes: "X30/X70/X90/RS45/55/65; in 3D mode"

- id: colour_profile_thx
  label: Colour Profile THX
  kind: action
  hex: "2189 01504D50 5230440A"
  params: []
  notes: "X30/X70/X90/RS45/55/65; in THX mode"

# --- ADDITIONAL REMOTE CONTROL EMULATION COMMANDS ---

- id: rc_3d_setting
  label: 3D Setting
  kind: action
  hex: "21 89 01 52 43 37 33 44 35 0A"
  params: []
  notes: "Direct access to 3D Setting menu; X30/X70/X90/RS45/55/65"

- id: rc_3d_format_cycle
  label: 3D Format Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 44 36 0A"
  params: []
  notes: "Cycles through all available 3D formats; X30/X70/X90/RS45/55/65"

- id: rc_advanced
  label: Advanced
  kind: action
  hex: "21 89 01 52 43 37 33 37 33 0A"
  params: []
  notes: "Direct access to Picture Adjust > Advanced menu; HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65"

- id: rc_anamorphic_off
  label: Anamorphic Off
  kind: action
  hex: "21 89 01 52 43 37 33 32 34 0A"
  params: []
  notes: "Anamorphic Off: X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65; Vertical Stretch Off: HD350/550/750/950/990/RS10/15/20/25/35. The source repeats this packet under both names."

- id: rc_anamorphic_a
  label: Anamorphic A
  kind: action
  hex: "21 89 01 52 43 37 33 32 33 0A"
  params: []
  notes: "Anamorphic A: X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65; Vertical Stretch On: HD350/550/750/950/990/RS10/15/20/25/35. The source repeats this packet under both names."

- id: rc_anamorphic_b
  label: Anamorphic B
  kind: action
  hex: "21 89 01 52 43 37 33 32 42 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_anamorphic_cycle
  label: Anamorphic Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 43 35 0A"
  params: []
  notes: "Cycles through Off/A/B; X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_aspect_pc_auto
  label: Aspect PC Auto
  kind: action
  hex: "21 89 01 52 43 37 33 41 45 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_aspect_pc_full
  label: Aspect PC Full
  kind: action
  hex: "21 89 01 52 43 37 33 42 30 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_aspect_pc_just
  label: Aspect PC Just
  kind: action
  hex: "21 89 01 52 43 37 33 41 46 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_aspect_cycle
  label: Aspect Cycle
  kind: action
  hex: "2189 0152 43 3733 37370A"
  params: []
  notes: "Cycles through all available modes"

- id: rc_auto_align
  label: Auto Align
  kind: action
  hex: "21 89 01 52 43 37 33 31 33 0A"
  params: []
  notes: "PC input on HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65"

- id: rc_auto_lens_centre
  label: Auto Lens Centre
  kind: action
  hex: "21 89 01 52 43 37 33 43 39 0A"
  params: []
  notes: "X3/X7/X9/X70/X90/RS50/60/45/55/65; source model list preserved"

- id: rc_bnr_off
  label: Block Noise Reduction Off
  kind: action
  hex: "21 89 01 52 43 37 33 31 30 0A"
  params: []

- id: rc_bnr_on
  label: Block Noise Reduction On
  kind: action
  hex: "2189 0152 43 3733 3046 0A"
  params: []

- id: rc_bright_level_down
  label: Bright Level -
  kind: action
  hex: "21 89 01 52 43 37 33 41 33 0A"
  params: []
  notes: "X7/X9/X70/X90/RS50/60/55/65; adjustment range UNRESOLVED"

- id: rc_bright_level_up
  label: Bright Level +
  kind: action
  hex: "2189 0152 43 373341320A"
  params: []
  notes: "X7/X9/X70/X90/RS50/60/55/65; adjustment range UNRESOLVED"

- id: rc_brightness_adjustment
  label: Brightness Adjustment
  kind: action
  hex: "2189 0152 43 3733 30 39 0A"
  params: []
  notes: "Adjustment Bar On/Off toggle"

- id: rc_cec_off
  label: CEC Off
  kind: action
  hex: "21 89 01 52 43 37 33 35 37 0A"
  params: []

- id: rc_cec_on
  label: CEC On
  kind: action
  hex: "2189 0152 43 3733 35 36 0A"
  params: []

- id: rc_cmd_cycle
  label: Clear Motion Drive Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 38 41 0A"
  params: []
  notes: "Cycles through: Off/Mode 1/Mode 2/Mode 3/Mode 4/Inverse Telecine; X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_cmd_off
  label: Clear Motion Drive Off
  kind: action
  hex: "21 89 01 52 43 37 33 34 37 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_cmd_mode
  label: Clear Motion Drive Mode
  kind: action
  hex: "21 89 01 52 43 37 33 43 45 0A"
  params:
    - name: mode
      type: enum
      values: [1, 2, 3, 4]
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65. 1: 21 89 01 52 43 37 33 43 45 0A; 2: 21 89 01 52 43 37 33 43 46 0A; 3: 21 89 01 52 43 37 33 34 38 0A; 4: 21 89 01 52 43 37 33 34 39 0A."

- id: rc_cmd_inverse_telecine
  label: Clear Motion Drive Inverse Telecine
  kind: action
  hex: "21 89 01 52 43 37 33 34 41 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_colour_adjustment
  label: Colour Adjustment
  kind: action
  hex: "2189 0152 43 3733 3135 0A"
  params: []
  notes: "Adjustment Bar On/Off toggle"

- id: rc_colour_management_off
  label: Colour Management Off
  kind: action
  hex: "21 89 01 52 43 37 33 36 30 0A"
  params: []
  notes: "HD750/950/990/X7/X9/RS20/25/35/50/60/55/65"

- id: rc_colour_management_custom
  label: Colour Management Custom
  kind: action
  hex: "21 89 01 52 43 37 33 36 31 0A"
  params:
    - name: preset
      type: enum
      values: [1, 2, 3]
  notes: "HD750/950/990/X7/X9/RS20/25/35/50/60/55/65. Custom 1: 21 89 01 52 43 37 33 36 31 0A; Custom 2: 21 89 01 52 43 37 33 36 32 0A; Custom 3: 21 89 01 52 43 37 33 36 33 0A."

- id: rc_colour_management_cycle
  label: Colour Management Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 38 39 0A"
  params: []
  notes: "Cycles through: Off/Custom 1/Custom 2/Custom 3; X7/X9/X70/X90/RS50/60/55/65"

- id: rc_colour_profile_cycle
  label: Colour Profile Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 38 38 0A"
  params: []
  notes: "Cycles through all available Colour Profiles; X7/X9/X79/X90/RS50/60/55/65, as printed in source; X79 applicability UNRESOLVED"

- id: rc_colour_space_cycle
  label: Colour Space Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 43 44 0A"
  params: []
  notes: "Cycles through Standard/Wide 1/Wide 2; X3/X30/RS40/RS45"

- id: rc_colour_temp_5800k
  label: Colour Temperature 5800K
  kind: action
  hex: "21 89 01 52 43 37 33 34 45 0A"
  params: []
  notes: "HD350/550/750/950/990/RS10/15/20/25/35"

- id: rc_colour_temp_6500k
  label: Colour Temperature 6500K
  kind: action
  hex: "2189 0152 43 3733 34 46 0A"
  params: []

- id: rc_colour_temp_7500k
  label: Colour Temperature 7500K
  kind: action
  hex: "21 89 01 52 43 37 33 35 30 0A"
  params: []
  notes: "HD350/550/750/950/990/RS10/15/20/25/35"

- id: rc_colour_temp_9300k
  label: Colour Temperature 9300K
  kind: action
  hex: "21 89 01 52 43 37 33 35 31 0A"
  params: []
  notes: "HD350/550/750/950/990/RS10/15/20/25/35"

- id: rc_colour_temp_custom
  label: Colour Temperature Custom
  kind: action
  hex: "2189 0152 43 3733 35 33 0A"
  params:
    - name: preset
      type: enum
      values: [1, 2, 3]
  notes: "Custom 1: 2189 0152 43 3733 35 33 0A; Custom 2: 21 89 01 52 43 37 33 35 34 0A; Custom 3: 2189 0152 43 3733 35 35 0A."

- id: rc_colour_temp_high_bright
  label: Colour Temperature High Bright
  kind: action
  hex: "21 89 01 52 43 37 33 35 32 0A"
  params: []
  notes: "HD350/550/750/950/990/X3/X30/RS10/15/20/25/35/40/45"

- id: rc_colour_temp_cycle
  label: Colour Temperature Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 37 36 0A"
  params: []
  notes: "Cycles through all options"

- id: rc_colour_temperature_gain
  label: Colour Temperature Gain
  kind: action
  hex: "21 89 01 52 43 37 33 39 31 0A"
  params:
    - name: channel
      type: enum
      values: [Blue, Green, Red]
    - name: direction
      type: enum
      values: ["–", "+"]
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65; adjustment range UNRESOLVED. Blue –: 21 89 01 52 43 37 33 39 31 0A; Blue +: 21 89 01 52 43 37 33 39 30 0A; Green –: 21 89 01 52 43 37 33 38 46 0A; Green +: 21 89 01 52 43 37 33 38 45 0A; Red –: 21 89 01 52 43 37 33 38 44 0A; Red +: 21 89 01 52 43 37 33 38 43 0A."

- id: rc_colour_temperature_offset
  label: Colour Temperature Offset
  kind: action
  hex: "21 89 01 52 43 37 33 39 37 0A"
  params:
    - name: channel
      type: enum
      values: [Blue, Green, Red]
    - name: direction
      type: enum
      values: ["–", "+"]
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65; adjustment range UNRESOLVED. Blue –: 21 89 01 52 43 37 33 39 37 0A; Blue +: 21 89 01 52 43 37 33 39 36 0A; Green –: 21 89 01 52 43 37 33 39 35 0A; Green +: 21 89 01 52 43 37 33 39 34 0A; Red –: 21 89 01 52 43 37 33 39 33 0A; Red +: 21 89 01 52 43 37 33 39 32 0A."

- id: rc_contrast_adjustment
  label: Contrast Adjustment
  kind: action
  hex: "2189 0152 43 3733 30410A"
  params: []
  notes: "Adjustment Bar On/Off toggle"

- id: rc_cti_off
  label: Colour Transient Improvement Off
  kind: action
  hex: "21 89 01 52 43 37 33 35 43 0A"
  params: []
  notes: "HD350/550/750/950/990/RS10/15/20/25/35"

- id: rc_cti_low
  label: Colour Transient Improvement Low
  kind: action
  hex: "21 89 01 52 43 37 33 35 44 0A"
  params: []
  notes: "HD350/550/750/950/990/RS10/15/20/25/35"

- id: rc_cti_middle
  label: Colour Transient Improvement Middle
  kind: action
  hex: "21 89 01 52 43 37 33 35 45 0A"
  params: []
  notes: "HD350/550/750/950/990/RS10/15/20/25/35"

- id: rc_cti_high
  label: Colour Transient Improvement High
  kind: action
  hex: "21 89 01 52 43 37 33 35 46 0A"
  params: []
  notes: "HD350/550/750/950/990/RS10/15/20/25/35"

- id: rc_dark_level_down
  label: Dark Level -
  kind: action
  hex: "2189 0152 43 37334135 0A"
  params: []
  notes: "X7/X9/X70/X90/RS50/60/55/65; adjustment range UNRESOLVED"

- id: rc_dark_level_up
  label: Dark Level +
  kind: action
  hex: "21 89 01 52 43 37 33 41 34 0A"
  params: []
  notes: "X7/X9/X70/X90/RS50/60/55/65; adjustment range UNRESOLVED"

- id: rc_detail_enhance_down
  label: Detail Enhance -
  kind: action
  hex: "2189 0152 43 3733 31320A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_detail_enhance_up
  label: Detail Enhance +
  kind: action
  hex: "21 89 01 52 43 37 33 31 31 0A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_picture_tone
  label: Picture Tone
  kind: action
  hex: "21 89 01 52 43 37 33 41 31 0A"
  params:
    - name: channel
      type: enum
      values: [Blue, Green, Red, White]
    - name: direction
      type: enum
      values: ["–", "+"]
  notes: "X7/X9/RS50/60 - Film Mode Only; X70/X90/RS55/65 - All Modes; adjustment range UNRESOLVED. Blue –: 21 89 01 52 43 37 33 41 31 0A; Blue +: 21 89 01 52 43 37 33 41 30 0A; Green –: 21 89 01 52 43 37 33 39 46 0A; Green +: 21 89 01 52 43 37 33 39 45 0A; Red –: 21 89 01 52 43 37 33 39 44 0A; Red +: 21 89 01 52 43 37 33 39 43 0A; White –: 21 89 01 52 43 37 33 39 42 0A; White +: 21 89 01 52 43 37 33 39 41 0A."

- id: rc_gamma_a
  label: Gamma A
  kind: action
  hex: "2189 0152 43 3733 33 39 0A"
  params: []

- id: rc_gamma_b
  label: Gamma B
  kind: action
  hex: "21 89 01 52 43 37 33 33 41 0A"
  params: []

- id: rc_gamma_c
  label: Gamma C
  kind: action
  hex: "2189 0152 43 3733 33420A"
  params: []

- id: rc_gamma_custom
  label: Gamma Custom
  kind: action
  hex: "21 89 01 52 43 37 33 33 43 0A"
  params:
    - name: preset
      type: enum
      values: [1, 2, 3]
  notes: "Custom 1: 21 89 01 52 43 37 33 33 43 0A; Custom 2: 2189 0152 43 3733 33440A; Custom 3: 2189 0152 43 3733 3345 0A."

- id: rc_gamma_d
  label: Gamma D
  kind: action
  hex: "21 89 01 52 43 37 33 33 46 0A"
  params: []
  notes: "HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65"

- id: rc_gamma_normal
  label: Gamma Normal
  kind: action
  hex: "2189 0152 43 3733 33 38 0A"
  params: []

- id: rc_gamma_cycle
  label: Gamma Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 37 35 0A"
  params: []
  notes: "Cycles through all options"

- id: rc_hide_toggle
  label: Hide Toggle
  kind: action
  hex: "2189 0152 43 3733 31 440A"
  params: []
  notes: "On/Off toggle"

- id: rc_horizontal_position_down
  label: Horizontal Position -
  kind: action
  hex: "21 89 01 52 43 37 33 41 42 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65; adjustment range UNRESOLVED"

- id: rc_horizontal_position_up
  label: Horizontal Position +
  kind: action
  hex: "21 89 01 52 43 37 33 41 41 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65; adjustment range UNRESOLVED"

- id: rc_input_component
  label: Input Component
  kind: action
  hex: "2189 0152 43 3733 34 440A"
  params: []

- id: rc_input_hdmi1
  label: Input HDMI 1
  kind: action
  hex: "21 89 01 52 43 37 33 37 30 0A"
  params: []

- id: rc_input_hdmi2
  label: Input HDMI 2
  kind: action
  hex: "2189 0152 43 3733 37310A"
  params: []

- id: rc_input_pc
  label: Input PC
  kind: action
  hex: "21 89 01 52 43 37 33 34 36 0A"
  params: []
  notes: "HD750/950/990/X7/X9/X70/X90 RS20/25/35/50/60/55/65"

- id: rc_input_svideo
  label: Input S-Video
  kind: action
  hex: "2189 0152 43 3733 34 43 0A"
  params: []
  notes: "HD350/550/750/950/990"

- id: rc_input_video
  label: Input Video
  kind: action
  hex: "21 89 01 52 43 37 33 34 42 0A"
  params: []
  notes: "HD350/550/750/950/990"

- id: rc_input_cycle
  label: Input Cycle
  kind: action
  hex: "2189 0152 43 3733 30 38 0A"
  params: []
  notes: "Cycles through all available inputs"

- id: rc_isf_day
  label: ISF Day
  kind: action
  hex: "21 89 01 52 43 37 33 36 34 0A"
  params: []
  notes: "X7/X9/X70/X90/RS50/60/55/65"

- id: rc_isf_night
  label: ISF Night
  kind: action
  hex: "2189 0152 43 3733 36 35 0A"
  params: []
  notes: "X7/X9/X70/X90/RS50/60/55/65"

- id: rc_isf_off
  label: ISF Off
  kind: action
  hex: "21 89 01 52 43 37 33 35 41 0A"
  params: []
  notes: "HD950/990/X7/X9/X70/X90/RS25/35/50/60/55/65"

- id: rc_isf_on
  label: ISF On
  kind: action
  hex: "21 89 01 52 43 37 33 35 42 0A"
  params: []
  notes: "HD950/990/X7/X9/X70/X90/RS25/35/50/60/55/65"

- id: rc_keystone_horizontal_down
  label: Keystone Correction Horizontal -
  kind: action
  hex: "21 89 01 52 43 37 33 34 31 0A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_keystone_horizontal_up
  label: Keystone Correction Horizontal +
  kind: action
  hex: "2189 0152 43 3733 3430 0A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_keystone_vertical_down
  label: Keystone Correction Vertical -
  kind: action
  hex: "2189 0152 43 3733 31 43 0A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_keystone_vertical_up
  label: Keystone Correction Vertical +
  kind: action
  hex: "21 89 01 52 43 37 33 31 42 0A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_lens_aperture_preset
  label: Lens Aperture Preset
  kind: action
  hex: "2189 0152 43 3733 3238 0A"
  params:
    - name: preset
      type: enum
      values: [1, 2, 3]
  notes: "HD350/HD550. 1: 2189 0152 43 3733 3238 0A; 2: 21 89 01 52 43 37 33 32 39 0A; 3: 2189 0152 43 3733 32 410A."

- id: rc_lens_aperture_adjustment
  label: Lens Aperture Adjustment
  kind: action
  hex: "21 89 01 52 43 37 33 32 30 0A"
  params: []
  notes: "HD350/750/950/990/RS10/20/25/35 - Adjustment Bar On/Off toggle; X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 - Displays Adjustment Bar; HD550/RS15 - Cycles through all options"

- id: rc_lens_control_cycle
  label: Lens Control Cycle
  kind: action
  hex: "2189 0152 43 3733 33 30 0A"
  params: []
  notes: "Cycles through all options"

- id: rc_lens_focus_down
  label: Lens Focus -
  kind: action
  hex: "2189 0152 43 3733 33 320A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_lens_focus_up
  label: Lens Focus +
  kind: action
  hex: "21 89 01 52 43 37 33 33 31 0A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_lens_memory_pages
  label: Lens Memory Pages
  kind: action
  hex: "21 89 01 52 43 37 33 44 34 0A"
  params: []
  notes: "Cycles through Lens Memory Pages: Select/Save/Name Edit; X30/X70/X90/RS45/55/65"

- id: rc_lens_memory_select
  label: Lens Memory Select
  kind: action
  hex: "21 89 01 52 43 37 33 44 38 0A"
  params:
    - name: memory
      type: enum
      values: [1, 2, 3]
  notes: "X30/X70/X90/RS45/55/65. 1: 21 89 01 52 43 37 33 44 38 0A; 2: 2189 0152 43 37334439 0A; 3: 21 89 01 52 43 37 33 44 41 0A."

- id: rc_lens_shift_down
  label: Lens Shift Down
  kind: action
  hex: "2189 0152 43 3733 32320A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_lens_shift_left
  label: Lens Shift Left
  kind: action
  hex: "21 89 01 52 43 37 33 34 34 0A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_lens_shift_right
  label: Lens Shift Right
  kind: action
  hex: "2189 0152 43 3733 3433 0A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_lens_shift_up
  label: Lens Shift Up
  kind: action
  hex: "2189 0152 43 3733 32310A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_lens_zoom_in
  label: Lens Zoom In
  kind: action
  hex: "21 89 01 52 43 37 33 33 35 0A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_lens_zoom_out
  label: Lens Zoom Out
  kind: action
  hex: "2189 0152 43 3733 33 370A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_mask_adjustment
  label: Mask Adjustment
  kind: action
  hex: "21 89 01 52 43 37 33 42 38 0A"
  params:
    - name: edge
      type: enum
      values: [Bottom, Left, Right, Top]
    - name: direction
      type: enum
      values: ["–", "+"]
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65; adjustment range UNRESOLVED. Bottom –: 21 89 01 52 43 37 33 42 38 0A; Bottom +: 21 89 01 52 43 37 33 42 37 0A; Left –: 21 89 01 52 43 37 33 42 32 0A; Left +: 21 89 01 52 43 37 33 42 31 0A; Right –: 21 89 01 52 43 37 33 42 34 0A; Right +: 21 89 01 52 43 37 33 42 33 0A; Top –: 21 89 01 52 43 37 33 42 36 0A; Top +: 21 89 01 52 43 37 33 42 35 0A."

- id: rc_menu_position
  label: Menu Position
  kind: action
  hex: "21 89 01 52 43 37 33 34 32 0A"
  params: []
  notes: "HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65"

- id: rc_mnr_down
  label: Mosquito Noise Reduction -
  kind: action
  hex: "2189 0152 43 3733 3045 0A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_mnr_up
  label: Mosquito Noise Reduction +
  kind: action
  hex: "21 89 01 52 43 37 33 30 44 0A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_noise_reduction_display
  label: Noise Reduction Display
  kind: action
  hex: "21 89 01 52 43 37 33 31 38 0A"
  params: []
  notes: "Toggles display of RNR/MNR; HD350/550/750/950/990/RS10/15/20/25/35"

- id: rc_phase_down
  label: Phase -
  kind: action
  hex: "21 89 01 52 43 37 33 41 39 0A"
  params: []
  notes: "PC Input; X7/X9/X70/X90/RS50/60/55/65; adjustment range UNRESOLVED"

- id: rc_phase_up
  label: Phase +
  kind: action
  hex: "21 89 01 52 43 37 33 41 38 0A"
  params: []
  notes: "PC Input; X7/X9/X70/X90/RS50/60/55/65; adjustment range UNRESOLVED"

- id: rc_picture_adjust
  label: Picture Adjust
  kind: action
  hex: "21 89 01 52 43 37 33 37 32 0A"
  params: []
  notes: "HD550/750/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65; source model list preserved"

- id: rc_picture_mode_3d
  label: Picture Mode 3D
  kind: action
  hex: "21 89 01 52 43 37 33 38 37 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65"

- id: rc_picture_mode_cinema
  label: Picture Mode Cinema
  kind: action
  hex: "21 89 01 52 43 37 33 36 39 0A"
  params:
    - name: preset
      type: enum
      values: [1, 2, 3]
  notes: "Cinema 1: 21 89 01 52 43 37 33 36 39 0A (Film Mode on X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65); Cinema 2: 21 89 01 52 43 37 33 36 38 0A (Cinema Mode on X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65); Cinema 3: 21 89 01 52 43 37 33 36 36 0A (HD550/750/990/RS15/25/35; Animation Mode on X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65). Source states commands without a model restriction work with all models."

- id: rc_picture_mode_dynamic
  label: Picture Mode Dynamic
  kind: action
  hex: "21 89 01 52 43 37 33 36 42 0A"
  params: []
  notes: "HD350/550/750/950/990"

- id: rc_picture_mode_natural
  label: Picture Mode Natural
  kind: action
  hex: "2189 0152 43 3733 36410A"
  params: []

- id: rc_picture_mode_stage
  label: Picture Mode Stage
  kind: action
  hex: "21 89 01 52 43 37 33 36 37 0A"
  params: []

- id: rc_picture_mode_thx
  label: Picture Mode THX
  kind: action
  hex: "21 89 01 52 43 37 33 36 46 0A"
  params: []
  notes: "HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65"

- id: rc_picture_mode_user
  label: Picture Mode User
  kind: action
  hex: "2189 0152 43 3733 3643 0A"
  params:
    - name: preset
      type: enum
      values: [1, 2, 3, 4, 5]
  notes: "User 1: 2189 0152 43 3733 3643 0A; User 2: 21 89 01 52 43 37 33 36 44 0A; User 3: 21 89 01 52 43 37 33 36 45 0A (HD550/750/950/990/X3/X30/RS20/25/35/40/45); User 4: 21 89 01 52 43 37 33 43 41 0A (X30/X70/X90/RS45/55/65); User 5: 21 89 01 52 43 37 33 43 42 0A (X30/X70/X90/RS45/55/65)."

- id: rc_pixel_shift
  label: Pixel Shift
  kind: action
  hex: "21 89 01 52 43 37 33 42 45 0A"
  params:
    - name: axis
      type: enum
      values: [Horizontal, Vertical]
    - name: channel
      type: enum
      values: [Blue, Green, Red]
    - name: direction
      type: enum
      values: ["–", "+"]
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65; adjustment range UNRESOLVED. Horizontal Blue –: 21 89 01 52 43 37 33 42 45 0A; Horizontal Blue +: 21 89 01 52 43 37 33 42 44 0A; Horizontal Green –: 21 89 01 52 43 37 33 42 43 0A; Horizontal Green +: 21 89 01 52 43 37 33 42 42 0A; Horizontal Red –: 21 89 01 52 43 37 33 42 41 0A; Horizontal Red +: 21 89 01 52 43 37 33 42 39 0A; Vertical Blue –: 21 89 01 52 43 37 33 43 34 0A; Vertical Blue +: 21 89 01 52 43 37 33 43 33 0A; Vertical Green –: 21 89 01 52 43 37 33 43 32 0A; Vertical Green +: 21 89 01 52 43 37 33 43 31 0A; Vertical Red –: 21 89 01 52 43 37 33 43 30 0A; Vertical Red +: 21 89 01 52 43 37 33 42 46 0A."

- id: rc_power_on
  label: Power On
  kind: action
  hex: "2189 0152 43 3733 30 35 0A"
  params: []
  notes: "Remote Power Off packet is already represented by rc_power_off_sequence in Macros"

- id: rc_rnr_down
  label: Random Noise Reduction -
  kind: action
  hex: "21 89 01 52 43 37 33 30 43 0A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_rnr_up
  label: Random Noise Reduction +
  kind: action
  hex: "2189 0152 43 3733 30420A"
  params: []
  notes: "Adjustment range UNRESOLVED"

- id: rc_screen_adjust_off
  label: Screen Adjust Off
  kind: action
  hex: "21 89 01 52 43 37 33 38 30 0A"
  params: []
  notes: "X3/X30/RS40/45"

- id: rc_screen_adjust_a
  label: Screen Adjust A
  kind: action
  hex: "2189 0152 43 3733 38 310A"
  params: []
  notes: "X3/X30/RS40/45"

- id: rc_screen_adjust_b
  label: Screen Adjust B
  kind: action
  hex: "2189 0152 43 3733 38 320A"
  params: []
  notes: "X3/X30/RS40/45"

- id: rc_screen_adjust_c
  label: Screen Adjust C
  kind: action
  hex: "21 89 01 52 43 37 33 38 33 0A"
  params: []
  notes: "X3/X30/RS40/45"

- id: rc_sharpness_adjustment
  label: Sharpness Adjustment
  kind: action
  hex: "21 89 01 52 43 37 33 31 34 0A"
  params: []
  notes: "Adjustment Bar On/Off toggle"

- id: rc_shutter_off
  label: Shutter Off
  kind: action
  hex: "21 89 01 52 43 37 33 32 44 0A"
  params: []
  notes: "Un-synchronises shutter with Hide function; HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65"

- id: rc_shutter_on
  label: Shutter On
  kind: action
  hex: "21 89 01 52 43 37 33 32 43 0A"
  params: []
  notes: "Synchronises shutter with Hide function; HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65"

- id: rc_test_pattern_cycle
  label: Test Pattern Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 35 39 0A"
  params: []
  notes: "Cycles through all patterns; HD350/550/750/950/990/RS10/15/20/25/35"

- id: rc_thx_bright
  label: THX Bright
  kind: action
  hex: "21 89 01 52 43 37 33 38 35 0A"
  params: []
  notes: "X7/X9/X70/X90/RS50/60/55/65"

- id: rc_thx_dark
  label: THX Dark
  kind: action
  hex: "2189 0152 43 3733 38 36 0A"
  params: []
  notes: "X7/X9/X70/X90/RS50/60/55/65"

- id: rc_thx_off
  label: THX Off
  kind: action
  hex: "2189 0152 43 373343 370A"
  params: []
  notes: "X7/X9/X70/X90/RS50/60/55/65"

- id: rc_thx_on
  label: THX On
  kind: action
  hex: "21 89 01 52 43 37 33 43 38 0A"
  params: []
  notes: "X7/X9/X70/X90/RS50/60/55/65"

- id: rc_tint_down
  label: Tint -
  kind: action
  hex: "21 89 01 52 43 37 33 39 39 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65; adjustment range UNRESOLVED"

- id: rc_tint_up
  label: Tint +
  kind: action
  hex: "21 89 01 52 43 37 33 39 38 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65; adjustment range UNRESOLVED"

- id: rc_tint_adjustment
  label: Tint Adjustment
  kind: action
  hex: "2189 0152 43 3733 3136 0A"
  params: []
  notes: "Adjustment Bar On/Off toggle"

- id: rc_tracking_down
  label: Tracking -
  kind: action
  hex: "21 89 01 52 43 37 33 41 37 0A"
  params: []
  notes: "PC Input; X7/X9/X70/X90/RS50/60/55/65; adjustment range UNRESOLVED"

- id: rc_tracking_up
  label: Tracking +
  kind: action
  hex: "21 89 01 52 43 37 33 41 36 0A"
  params: []
  notes: "PC Input; X7/X9/X70/X90/RS50/60/55/65; adjustment range UNRESOLVED"

- id: rc_user_cycle
  label: User Cycle
  kind: action
  hex: "21 89 01 52 43 37 33 44 37 0A"
  params: []
  notes: "Cycles through User 1 - User 5 Picture Modes; X30/X70/X90/RS45/55/65"

- id: rc_vertical_position_down
  label: Vertical Position -
  kind: action
  hex: "21 89 01 52 43 37 33 41 44 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65; adjustment range UNRESOLVED"

- id: rc_vertical_position_up
  label: Vertical Position +
  kind: action
  hex: "21 89 01 52 43 37 33 41 43 0A"
  params: []
  notes: "X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65; adjustment range UNRESOLVED"
```

## Feedbacks
```yaml
# Enquiry commands use header 3F instead of 21.
# Response format: basic ack (06 89 01 CC CC 0A) followed by detailed (40 89 01 CC CC RR 0A)

- id: power_status
  label: Power Status
  type: enum
  enquiry_hex: "3F 89 01 50 57 0A"
  query_command: "3F 89 01 50 57 0A"
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
  query_command: "3F89 01 49 50 0A"
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
  query_command: "3F 89 01 47 54 0A"
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
  query_command: "3F 89 01 47 50 0A"
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
  query_command: "3F 89 01 53 43 0A"
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
  query_command: "3F89 01 4D 440A"
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
# UNRESOLVED: no continuous variable ranges documented - all values are discrete enum selections
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
- LAN handshake is per-command: TCP connect → PJ_OK → PMREQ (within 5s) → PJACK → command (within 5s) → auto-close.
<!-- UNRESOLVED: source documents the LAN handshake token as "PJREQ"; verify token spelling against source before relying on it -->
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
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
retrieved_at: 2026-04-30T04:26:39.184Z
last_checked_at: 2026-10-07T13:51:15.686Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:51:15.686Z
matched_actions: 269
action_count: 269
confidence: medium
summary: "All 269 action units match source hex codes and shapes; transport (port 20554, 19200 8N1) supported; catalogue essentially fully represented. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility ranges not stated"
- "exact model-to-firmware mapping not stated"
- "LAN control only supported on DLA-X7/X9/X30/X70/X90/RS50/60/45/55/65 per source; RS-232C applies to all models"
- "source documents no authentication procedure but does not explicitly state that no authentication is required"
- "Remote Control Emulation table contains many more entries for colour temp,"
- "no continuous variable ranges documented - all values are discrete enum selections"
- "no explicit safety interlocks or power-on sequencing documented in source"
- "source documents the LAN handshake token as \"PJREQ\"; verify token spelling against source before relying on it"
- "maximum command rate / minimum inter-command delay not specified beyond acknowledgement wait"
- "LAN connection limit (max simultaneous connections) not stated"
- "Colour Profile and Colour Management enquiry codes not documented"
- "Picture Mode enquiry code not documented (no feedback for current picture mode)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
