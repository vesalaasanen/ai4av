---
spec_id: admin/jvc-dlax35-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "JVC DLA-X35 Series Control Spec"
manufacturer: JVC
model_family: DLA-X35
aliases: []
compatible_with:
  manufacturers:
    - JVC
  models:
    - DLA-X35
    - DLA-X35B
    - DLA-X35W
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
retrieved_at: 2026-07-24T20:33:18.510Z
last_checked_at: 2026-08-05T08:27:20.279Z
generated_at: 2026-08-05T08:27:20.279Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The DLA-X35 is NOT in the source's FOR MODELS list. The v1.4 guide covers"
  - "A newer guide revision (v1.5+) may add X35-specific commands. Source used is"
  - "LAN control is documented only for X7/X9/X30/X70/X90/RS50/60/45/55/65."
  - "no DLA-X35 model identifier is documented in this source."
  - "no parameterised set-value command form documented for the X35."
  - "no unsolicited events documented."
  - "no multi-step command sequences documented in the source."
  - "DLA-X35 not in source FOR MODELS list; entire command set is unverified for this model."
  - "firmware version compatibility not stated."
  - "whether DLA-X35 has a LAN control port is not stated."
  - "DLA-X35 model-status identifier (for model_status_query) not documented."
  - "a v1.5+ guide revision may exist that explicitly covers the X35."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:27:20.279Z
  matched_actions: 329
  action_count: 329
  confidence: medium
  summary: "All 329 spec actions match literal source commands (RC commands normalized for IR-hex-as-ASCII-byte encoding); transport values verbatim in source. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# JVC DLA-X35 Series Control Spec

## Summary
JVC D-ILA home theatre projector controlled over RS-232C (binary hex commands) and, on
LAN-capable models, TCP/IP. Derived from the JVC "RS-232C, LAN and Infrared Remote Control
Guide" Version 1.4, which documents the standard JVC D-ILA control protocol.

<!-- UNRESOLVED: The DLA-X35 is NOT in the source's FOR MODELS list. The v1.4 guide covers
DLA-HD350/550/750/950/990, DLA-X3/X7/X9/X30/X70R/X90R, and DLA-RS10..RS65. The DLA-X35
(2013) postdates this guide. The command set and transport details below are the documented
JVC D-ILA standard and are EXPECTED to apply to the X35, but this is not confirmed against a
real device. Command-level model applicability notes are carried per-action where the source
restricts a command to a subset of models. -->

<!-- UNRESOLVED: A newer guide revision (v1.5+) may add X35-specific commands. Source used is
the closest available proxy; no X35-specific differences (if any) are represented. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 19200  # "19200bps (19.2kbps)" - stated explicitly
  data_bits: 8  # "8 Bit" - stated
  parity: none  # "None" - stated
  stop_bits: 1  # "StopBit 1" - stated
  flow_control: none  # "Flow Control None" - stated
  # DataFormat: Binary. Interface: 9-pin D-Sub male, asynchronous.
  # Pinout: 2=Rx (controller->projector), 3=Tx (projector->controller),
  # 5=Ground, 1/4/6-9=No Connection. Null-modem (DTE-DTE) cable required for PC test.
addressing:
  port: 20554  # TCP port stated for LAN control
  # UNRESOLVED: LAN control is documented only for X7/X9/X30/X70/X90/RS50/60/45/55/65.
  # Whether the DLA-X35 has an RJ45 LAN control port is NOT confirmed by this source.
auth:
  type: none  # inferred: no password/login in source; LAN uses PJ_OK/PJREQ/PJACK handshake, no credential
```

## Traits
```yaml
traits:
  - powerable  # inferred: power on/off commands present
  - queryable  # inferred: power/input/gamma/source/model status enquiries return values
  - levelable  # inferred: brightness/contrast/colour/sharpness/tint +/- commands present
  - routable  # inferred: input switching commands present
```

## Actions
```yaml
# NOTE: Hex payloads are reconstructed to canonical byte boundaries per the source's own
# Command Format (Header=21, Unit ID=89 01, Command=2 bytes, Data=n bytes, End=0A). The
# source PDF spacing was irregular (OCR artefact). Reconstruction validated against the
# source's worked examples (Power On = 21 89 01 50 57 31 0A).
#
# Many commands are restricted to a subset of models; applicability notes are kept
# per-action. DLA-X35 membership in any restricted group is UNRESOLVED.

# ---- DIRECT COMMANDS ----
- id: power_off
  label: Power Off
  kind: action
  command: "21 89 01 50 57 30 0A"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "21 89 01 50 57 31 0A"
  params: []

- id: input_hdmi1
  label: Input - HDMI 1
  kind: action
  command: "21 89 01 49 50 36 0A"
  params: []

- id: input_hdmi2
  label: Input - HDMI 2
  kind: action
  command: "21 89 01 49 50 37 0A"
  params: []

- id: input_component
  label: Input - Component
  kind: action
  command: "21 89 01 49 50 32 0A"
  params: []

- id: input_svideo
  label: Input - S-Video
  kind: action
  command: "21 89 01 49 50 30 0A"
  params: []

- id: input_video
  label: Input - Video
  kind: action
  command: "21 89 01 49 50 31 0A"
  params: []

- id: input_pc
  label: Input - PC
  kind: action
  command: "21 89 01 49 50 33 0A"
  params: []
  # Source restricts to HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65.

- id: input_next_highest
  label: Input + (go to next highest input)
  kind: action
  command: "21 89 01 49 50 2B 0A"
  params: []

- id: input_next_lowest
  label: Input - (go to next lowest input)
  kind: action
  command: "21 89 01 49 50 2D 0A"
  params: []

# ---- TEST PATTERNS (source: HD350/550/750/950/990/RS10/15/20/25/35) ----
- id: test_pattern_off
  label: Test Pattern - Off
  kind: action
  command: "21 89 01 54 53 30 0A"
  params: []

- id: test_pattern_colour_bars
  label: Test Pattern - Colour Bars
  kind: action
  command: "21 89 01 54 53 31 0A"
  params: []

- id: test_pattern_stairstep_bw
  label: Test Pattern - Stairstep (black and white)
  kind: action
  command: "21 89 01 54 53 36 0A"
  params: []

- id: test_pattern_stairstep_red
  label: Test Pattern - Stairstep (red)
  kind: action
  command: "21 89 01 54 53 37 0A"
  params: []

- id: test_pattern_stairstep_green
  label: Test Pattern - Stair step (green)
  kind: action
  command: "21 89 01 54 53 38 0A"
  params: []

- id: test_pattern_stairstep_blue
  label: Test Pattern - Stairstep (blue)
  kind: action
  command: "21 89 01 54 53 39 0A"
  params: []

- id: test_pattern_crosshatch_green
  label: Test Pattern - Crosshatch (green)
  kind: action
  command: "21 89 01 54 53 41 0A"
  params: []

# ---- GAMMA TABLE ----
- id: gamma_normal
  label: Gamma - Normal
  kind: action
  command: "21 89 01 47 54 30 0A"
  params: []

- id: gamma_a
  label: Gamma - A
  kind: action
  command: "21 89 01 47 54 31 0A"
  params: []

- id: gamma_b
  label: Gamma - B
  kind: action
  command: "21 89 01 47 54 32 0A"
  params: []

- id: gamma_c
  label: Gamma - C
  kind: action
  command: "21 89 01 47 54 33 0A"
  params: []

- id: gamma_d
  label: Gamma - D
  kind: action
  command: "21 89 01 47 54 37 0A"
  params: []
  # Source restricts to HD550/950/990/X3/X7/X9/X30/X70/X90/RS15/25/35/40/50/60/45/55/65.

- id: gamma_custom_1
  label: Gamma - Custom 1
  kind: action
  command: "21 89 01 47 54 34 0A"
  params: []

- id: gamma_custom_2
  label: Gamma - Custom 2
  kind: action
  command: "21 89 01 47 54 35 0A"
  params: []

- id: gamma_custom_3
  label: Gamma - Custom 3
  kind: action
  command: "21 89 01 47 54 36 0A"
  params: []

# ---- GAMMA VALUE ----
- id: gamma_value_18
  label: Gamma Correction Value - 1.8
  kind: action
  command: "21 89 01 47 50 30 0A"
  params: []

- id: gamma_value_19
  label: Gamma Correction Value - 1.9
  kind: action
  command: "21 89 01 47 50 31 0A"
  params: []

- id: gamma_value_20
  label: Gamma Correction Value - 2.0
  kind: action
  command: "21 89 01 47 50 32 0A"
  params: []

- id: gamma_value_21
  label: Gamma Correction Value - 2.1
  kind: action
  command: "21 89 01 47 50 33 0A"
  params: []

- id: gamma_value_22
  label: Gamma Correction Value - 2.2 (Default)
  kind: action
  command: "21 89 01 47 50 34 0A"
  params: []

- id: gamma_value_23
  label: Gamma Correction Value - 2.3
  kind: action
  command: "21 89 01 47 50 35 0A"
  params: []

- id: gamma_value_24
  label: Gamma Correction Value - 2.4
  kind: action
  command: "21 89 01 47 50 36 0A"
  params: []

- id: gamma_value_25
  label: Gamma Correction Value - 2.5
  kind: action
  command: "21 89 01 47 50 37 0A"
  params: []

- id: gamma_value_26
  label: Gamma Correction Value - 2.6
  kind: action
  command: "21 89 01 47 50 38 0A"
  params: []

# ---- OFF TIMER (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) ----
- id: off_timer_off
  label: Off Timer - Off
  kind: action
  command: "21 89 01 46 55 4F 54 30 0A"
  params: []

- id: off_timer_1h
  label: Off Timer - Set 1 Hour
  kind: action
  command: "21 89 01 46 55 4F 54 31 0A"
  params: []

- id: off_timer_2h
  label: Off Timer - Set 2 Hours
  kind: action
  command: "21 89 01 46 55 4F 54 32 0A"
  params: []

- id: off_timer_3h
  label: Off Timer - Set 3 Hours
  kind: action
  command: "21 89 01 46 55 4F 54 33 0A"
  params: []

- id: off_timer_4h
  label: Off Timer - Set 4 Hours
  kind: action
  command: "21 89 01 46 55 4F 54 34 0A"
  params: []

# ---- LAMP POWER (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) ----
- id: lamp_power_normal
  label: Lamp Power - Normal
  kind: action
  command: "21 89 01 50 4D 4C 50 30 0A"
  params: []

- id: lamp_power_high
  label: Lamp Power - High
  kind: action
  command: "21 89 01 50 4D 4C 50 31 0A"
  params: []

# ---- INFRARED REMOTE CODE (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) ----
- id: remote_code_a
  label: Remote Code A (hex code 73)
  kind: action
  command: "21 89 01 53 55 52 43 30 0A"
  params: []

- id: remote_code_b
  label: Remote Code B (hex code 63)
  kind: action
  command: "21 89 01 53 55 52 43 31 0A"
  params: []

# ---- TRIGGER OUTPUT SET (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) ----
- id: trigger_off
  label: Trigger - Off
  kind: action
  command: "21 89 01 46 55 54 52 30 0A"
  params: []

- id: trigger_on_power
  label: Trigger - On (Power)
  kind: action
  command: "21 89 01 46 55 54 52 31 0A"
  params: []

- id: trigger_on_anamorphic
  label: Trigger - On (Anamorphic)
  kind: action
  command: "21 89 01 46 55 54 52 32 0A"
  params: []

# ---- CLEAR MOTION DRIVE (CMD models) ----
- id: cmd_off
  label: Clear Motion Drive - Off
  kind: action
  command: "21 89 01 50 4D 43 4D 30 0A"
  params: []

- id: cmd_mode_1
  label: Clear Motion Drive - Mode 1 (Low on HD550/950/990)
  kind: action
  command: "21 89 01 50 4D 43 4D 31 0A"
  params: []

- id: cmd_mode_2
  label: Clear Motion Drive - Mode 2 (High on HD550/950/990)
  kind: action
  command: "21 89 01 50 4D 43 4D 32 0A"
  params: []

- id: cmd_mode_3
  label: Clear Motion Drive - Mode 3
  kind: action
  command: "21 89 01 50 4D 43 4D 33 0A"
  params: []
  # Source restricts Mode 3/4/Inv.Telecine to X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65.

- id: cmd_mode_4
  label: Clear Motion Drive - Mode 4
  kind: action
  command: "21 89 01 50 4D 43 4D 34 0A"
  params: []

- id: cmd_inverse_telecine
  label: Clear Motion Drive - Inverse Telecine
  kind: action
  command: "21 89 01 50 4D 43 4D 35 0A"
  params: []

# ---- ANAMORPHIC (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) ----
- id: anamorphic_off
  label: Anamorphic - Off
  kind: action
  command: "21 89 01 49 4E 56 53 30 0A"
  params: []

- id: anamorphic_a
  label: Anamorphic - A
  kind: action
  command: "21 89 01 49 4E 56 53 31 0A"
  params: []

- id: anamorphic_b
  label: Anamorphic - B
  kind: action
  command: "21 89 01 49 4E 56 53 32 0A"
  params: []

# ---- PICTURE MODE (group A: X30/X70/X90/RS45/55/65) ----
- id: picture_mode_a_film
  label: Picture Mode - Film (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 30 0A"
  params: []

- id: picture_mode_a_cinema
  label: Picture Mode - Cinema (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 31 0A"
  params: []

- id: picture_mode_a_animation
  label: Picture Mode - Animation (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 32 0A"
  params: []

- id: picture_mode_a_natural
  label: Picture Mode - Natural (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 33 0A"
  params: []

- id: picture_mode_a_stage
  label: Picture Mode - Stage (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 34 0A"
  params: []

- id: picture_mode_a_thx
  label: Picture Mode - THX (X70/X90/RS55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 36 0A"
  params: []

- id: picture_mode_a_3d
  label: Picture Mode - 3D (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 42 0A"
  params: []

- id: picture_mode_a_user_1
  label: Picture Mode - User 1 (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 43 0A"
  params: []

- id: picture_mode_a_user_2
  label: Picture Mode - User 2 (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 44 0A"
  params: []

- id: picture_mode_a_user_3
  label: Picture Mode - User 3 (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 45 0A"
  params: []

- id: picture_mode_a_user_4
  label: Picture Mode - User 4 (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 46 0A"
  params: []

- id: picture_mode_a_user_5
  label: Picture Mode - User 5 (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 50 4D 50 4D 31 30 0A"
  params: []

# ---- PICTURE MODE (group B: X3/X7/X9/RS40/50/60) ----
- id: picture_mode_b_film
  label: Picture Mode - Film (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 0A"
  params: []

- id: picture_mode_b_cinema
  label: Picture Mode - Cinema (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 31 0A"
  params: []

- id: picture_mode_b_animation
  label: Picture Mode - Animation (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 32 0A"
  params: []

- id: picture_mode_b_natural
  label: Picture Mode - Natural (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 33 0A"
  params: []

- id: picture_mode_b_stage
  label: Picture Mode - Stage (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 34 0A"
  params: []

- id: picture_mode_b_3d
  label: Picture Mode - 3D (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 45 0A"
  params: []

- id: picture_mode_b_user_1
  label: Picture Mode - User 1 (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 36 0A"
  params: []

- id: picture_mode_b_user_2
  label: Picture Mode - User 2 (X3/X7/X9/RS40/50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 37 0A"
  params: []

- id: picture_mode_b_thx
  label: Picture Mode - THX (X7/X9/RS50/60)
  kind: action
  command: "21 89 01 50 4D 50 4D 39 0A"
  params: []

# ---- PICTURE MODE (group C: HD350/750/550/950/990/RS10/20/15/25/35) ----
- id: picture_mode_c_cinema_1
  label: Picture Mode - Cinema 1 (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 30 0A"
  params: []

- id: picture_mode_c_cinema_2
  label: Picture Mode - Cinema 2 (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 31 0A"
  params: []

- id: picture_mode_c_cinema_3
  label: Picture Mode - Cinema 3 (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 32 0A"
  params: []

- id: picture_mode_c_natural
  label: Picture Mode - Natural (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 33 0A"
  params: []

- id: picture_mode_c_stage
  label: Picture Mode - Stage (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 34 0A"
  params: []

- id: picture_mode_c_dynamic
  label: Picture Mode - Dynamic (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 35 0A"
  params: []

- id: picture_mode_c_user_1
  label: Picture Mode - User 1 (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 36 0A"
  params: []

- id: picture_mode_c_user_2
  label: Picture Mode - User 2 (HD350/750/550/950/990/RS10/20/15/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 37 0A"
  params: []

- id: picture_mode_c_thx
  label: Picture Mode - THX (HD750/950/990/RS20/25/35)
  kind: action
  command: "21 89 01 50 4D 50 4D 39 0A"
  params: []

# ---- COLOUR PROFILE (X30/X70/X90/RS45/55/65) ----
- id: colour_profile_off
  label: Colour Profile - Off
  kind: action
  command: "21 89 01 50 4D 50 52 30 30 0A"
  params: []

- id: colour_profile_film_1
  label: Colour Profile - Film 1 (in Film mode)
  kind: action
  command: "21 89 01 50 4D 50 52 30 31 0A"
  params: []

- id: colour_profile_film_2
  label: Colour Profile - Film 2 (in Film mode)
  kind: action
  command: "21 89 01 50 4D 50 52 30 32 0A"
  params: []

- id: colour_profile_standard
  label: Colour Profile - Standard (in Cinema/Natural/Stage/3D modes)
  kind: action
  command: "21 89 01 50 4D 50 52 30 33 0A"
  params: []

- id: colour_profile_cinema_1
  label: Colour Profile - Cinema 1 (in Cinema mode)
  kind: action
  command: "21 89 01 50 4D 50 52 30 34 0A"
  params: []

- id: colour_profile_cinema_2
  label: Colour Profile - Cinema 2 (in Cinema mode)
  kind: action
  command: "21 89 01 50 4D 50 52 30 35 0A"
  params: []

- id: colour_profile_anime_1
  label: Colour Profile - Anime 1 (in Animation mode)
  kind: action
  command: "21 89 01 50 4D 50 52 30 36 0A"
  params: []

- id: colour_profile_anime_2
  label: Colour Profile - Anime 2 (in Animation mode)
  kind: action
  command: "21 89 01 50 4D 50 52 30 37 0A"
  params: []

- id: colour_profile_video
  label: Colour Profile - Video (in Natural mode)
  kind: action
  command: "21 89 01 50 4D 50 52 30 38 0A"
  params: []

- id: colour_profile_vivid
  label: Colour Profile - Vivid (in Natural & 3D modes)
  kind: action
  command: "21 89 01 50 4D 50 52 30 39 0A"
  params: []

- id: colour_profile_adobe
  label: Colour Profile - Adobe (in Natural mode)
  kind: action
  command: "21 89 01 50 4D 50 52 30 41 0A"
  params: []

- id: colour_profile_stage
  label: Colour Profile - Stage (in Stage mode)
  kind: action
  command: "21 89 01 50 4D 50 52 30 42 0A"
  params: []

- id: colour_profile_3d
  label: Colour Profile - 3D (in 3D mode)
  kind: action
  command: "21 89 01 50 4D 50 52 30 43 0A"
  params: []

- id: colour_profile_thx
  label: Colour Profile - THX (in THX mode)
  kind: action
  command: "21 89 01 50 4D 50 52 30 44 0A"
  params: []

# ---- 3D FORMAT (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) ----
- id: three_d_format_off
  label: 3D Format - Off (2D)
  kind: action
  command: "21 89 01 49 53 33 44 30 0A"
  params: []

- id: three_d_format_auto
  label: 3D Format - Auto
  kind: action
  command: "21 89 01 49 53 33 44 31 0A"
  params: []

- id: three_d_format_frame_packing
  label: 3D Format - Frame Packing
  kind: action
  command: "21 89 01 49 53 33 44 32 0A"
  params: []

- id: three_d_format_side_by_side
  label: 3D Format - Side by Side
  kind: action
  command: "21 89 01 49 53 33 44 33 0A"
  params: []

- id: three_d_format_top_and_bottom
  label: 3D Format - Top and Bottom
  kind: action
  command: "21 89 01 49 53 33 44 34 0A"
  params: []

# ---- 2D to 3D CONVERSION (X30/X70/X90/RS45/55/65) ----
- id: two_d_to_three_d_off
  label: 2D to 3D Conversion - Off
  kind: action
  command: "21 89 01 49 53 33 43 30 0A"
  params: []

- id: two_d_to_three_d_on
  label: 2D to 3D Conversion - On
  kind: action
  command: "21 89 01 49 53 33 43 31 0A"
  params: []

# ---- 3D SUBTITLE CORRECTION (X30/X70/X90/RS45/55/65) ----
- id: three_d_subtitle_correction_off
  label: 3D Subtitle Correction - Off
  kind: action
  command: "21 89 01 49 53 33 54 31 0A"
  params: []

- id: three_d_subtitle_correction_on
  label: 3D Subtitle Correction - On
  kind: action
  command: "21 89 01 49 53 33 54 30 0A"
  params: []

# ---- LENS MEMORY (X30/X70/X90/RS45/55/65) ----
- id: lens_memory_save_1
  label: Lens Memory Save - Memory 1
  kind: action
  command: "21 89 01 49 4E 4D 53 30 0A"
  params: []

- id: lens_memory_save_2
  label: Lens Memory Save - Memory 2
  kind: action
  command: "21 89 01 49 4E 4D 53 31 0A"
  params: []

- id: lens_memory_save_3
  label: Lens Memory Save - Memory 3
  kind: action
  command: "21 89 01 49 4E 4D 53 32 0A"
  params: []

- id: lens_memory_select_1
  label: Lens Memory Select - Memory 1
  kind: action
  command: "21 89 01 49 4E 4D 4C 30 0A"
  params: []

- id: lens_memory_select_2
  label: Lens Memory Select - Memory 2
  kind: action
  command: "21 89 01 49 4E 4D 4C 31 0A"
  params: []

- id: lens_memory_select_3
  label: Lens Memory Select - Memory 3
  kind: action
  command: "21 89 01 49 4E 4D 4C 32 0A"
  params: []

# ---- TEST COMMAND ----
- id: null_command
  label: Null Command (to check communication)
  kind: action
  command: "21 89 01 00 00 0A"
  params: []

# ---- REMOTE CONTROL EMULATION COMMANDS (prefix 21 89 01 52 43 37 33 = "RC73") ----
# Each command's variable byte equals the IR hex code (rightmost source column).
# DLA-X35 applicability per-row is UNRESOLVED where the source restricts a command.

- id: rc_3d_setting
  label: 3D Setting - direct access to 3D Setting menu (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 D5 0A"
  params: []
  # IR hex code: D5

- id: rc_3d_format_cycle
  label: 3D Format - cycles through all available 3D formats (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 D6 0A"
  params: []
  # IR hex code: D6

- id: rc_advanced
  label: Advanced - direct access to Picture Adjust > Advanced menu
  kind: action
  command: "21 89 01 52 43 37 33 73 0A"
  params: []
  # IR hex code: 73

- id: rc_anamorphic_off
  label: Anamorphic - Off / Vertical Stretch - Off
  kind: action
  command: "21 89 01 52 43 37 33 24 0A"
  params: []
  # IR hex code: 24

- id: rc_anamorphic_a
  label: Anamorphic - A / Vertical Stretch - On
  kind: action
  command: "21 89 01 52 43 37 33 23 0A"
  params: []
  # IR hex code: 23

- id: rc_anamorphic_b
  label: Anamorphic - B
  kind: action
  command: "21 89 01 52 43 37 33 2B 0A"
  params: []
  # IR hex code: 2B

- id: rc_anamorphic_cycle
  label: Anamorphic - cycles through Off/A/B
  kind: action
  command: "21 89 01 52 43 37 33 C5 0A"
  params: []
  # IR hex code: C5

- id: rc_aspect_16_9
  label: Aspect - 16:9
  kind: action
  command: "21 89 01 52 43 37 33 26 0A"
  params: []
  # IR hex code: 26

- id: rc_aspect_4_3
  label: Aspect - 4:3
  kind: action
  command: "21 89 01 52 43 37 33 25 0A"
  params: []
  # IR hex code: 25

- id: rc_aspect_zoom
  label: Aspect - Zoom
  kind: action
  command: "21 89 01 52 43 37 33 27 0A"
  params: []
  # IR hex code: 27

- id: rc_aspect_pc_auto
  label: Aspect (PC) - Auto
  kind: action
  command: "21 89 01 52 43 37 33 AE 0A"
  params: []
  # IR hex code: AE

- id: rc_aspect_pc_full
  label: Aspect (PC) - Full
  kind: action
  command: "21 89 01 52 43 37 33 B0 0A"
  params: []
  # IR hex code: B0

- id: rc_aspect_pc_just
  label: Aspect (PC) - Just
  kind: action
  command: "21 89 01 52 43 37 33 AF 0A"
  params: []
  # IR hex code: AF

- id: rc_aspect_plus
  label: Aspect + (cycles through all available modes)
  kind: action
  command: "21 89 01 52 43 37 33 77 0A"
  params: []
  # IR hex code: 77

- id: rc_auto_align
  label: Auto Align (PC input)
  kind: action
  command: "21 89 01 52 43 37 33 13 0A"
  params: []
  # IR hex code: 13

- id: rc_auto_lens_centre
  label: Auto Lens Centre
  kind: action
  command: "21 89 01 52 43 37 33 C9 0A"
  params: []
  # IR hex code: C9

- id: rc_back
  label: Back - steps backwards through menus / removes OSD messages
  kind: action
  command: "21 89 01 52 43 37 33 03 0A"
  params: []
  # IR hex code: 03

- id: rc_bnr_off
  label: BNR (Block Noise Reduction) - Off
  kind: action
  command: "21 89 01 52 43 37 33 10 0A"
  params: []
  # IR hex code: 10

- id: rc_bnr_on
  label: BNR (Block Noise Reduction) - On
  kind: action
  command: "21 89 01 52 43 37 33 0F 0A"
  params: []
  # IR hex code: 0F

- id: rc_bright_level_minus
  label: Bright Level - (X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 A3 0A"
  params: []
  # IR hex code: A3

- id: rc_bright_level_plus
  label: Bright Level + (X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 A2 0A"
  params: []
  # IR hex code: A2

- id: rc_brightness_minus
  label: Brightness -
  kind: action
  command: "21 89 01 52 43 37 33 7B 0A"
  params: []
  # IR hex code: 7B

- id: rc_brightness_plus
  label: Brightness +
  kind: action
  command: "21 89 01 52 43 37 33 7A 0A"
  params: []
  # IR hex code: 7A

- id: rc_brightness_adj
  label: Brightness Adj. (adjustment bar On/Off toggle)
  kind: action
  command: "21 89 01 52 43 37 33 09 0A"
  params: []
  # IR hex code: 09

- id: rc_cec_off
  label: CEC - Off
  kind: action
  command: "21 89 01 52 43 37 33 57 0A"
  params: []
  # IR hex code: 57

- id: rc_cec_on
  label: CEC - On
  kind: action
  command: "21 89 01 52 43 37 33 56 0A"
  params: []
  # IR hex code: 56

- id: rc_cmd_cycle
  label: Clear Motion Drive - cycles through Off/Mode1/Mode2/Mode3/Mode4/Inverse Telecine
  kind: action
  command: "21 89 01 52 43 37 33 8A 0A"
  params: []
  # IR hex code: 8A

- id: rc_cmd_off
  label: Clear Motion Drive - Off
  kind: action
  command: "21 89 01 52 43 37 33 47 0A"
  params: []
  # IR hex code: 47

- id: rc_cmd_mode_1
  label: Clear Motion Drive - Mode 1
  kind: action
  command: "21 89 01 52 43 37 33 CE 0A"
  params: []
  # IR hex code: CE

- id: rc_cmd_mode_2
  label: Clear Motion Drive - Mode 2
  kind: action
  command: "21 89 01 52 43 37 33 CF 0A"
  params: []
  # IR hex code: CF

- id: rc_cmd_mode_3
  label: Clear Motion Drive - Mode 3
  kind: action
  command: "21 89 01 52 43 37 33 48 0A"
  params: []
  # IR hex code: 48

- id: rc_cmd_mode_4
  label: Clear Motion Drive - Mode 4
  kind: action
  command: "21 89 01 52 43 37 33 49 0A"
  params: []
  # IR hex code: 49

- id: rc_cmd_inverse_telecine
  label: Clear Motion Drive - Inverse Telecine
  kind: action
  command: "21 89 01 52 43 37 33 4A 0A"
  params: []
  # IR hex code: 4A

- id: rc_colour_minus
  label: Colour -
  kind: action
  command: "21 89 01 52 43 37 33 7D 0A"
  params: []
  # IR hex code: 7D

- id: rc_colour_plus
  label: Colour +
  kind: action
  command: "21 89 01 52 43 37 33 7C 0A"
  params: []
  # IR hex code: 7C

- id: rc_colour_adj
  label: Colour Adj. (adjustment bar On/Off toggle)
  kind: action
  command: "21 89 01 52 43 37 33 15 0A"
  params: []
  # IR hex code: 15

- id: rc_colour_management_off
  label: Colour Management - Off
  kind: action
  command: "21 89 01 52 43 37 33 60 0A"
  params: []
  # IR hex code: 60

- id: rc_colour_management_custom_1
  label: Colour Management - Custom 1
  kind: action
  command: "21 89 01 52 43 37 33 61 0A"
  params: []
  # IR hex code: 61

- id: rc_colour_management_custom_2
  label: Colour Management - Custom 2
  kind: action
  command: "21 89 01 52 43 37 33 62 0A"
  params: []
  # IR hex code: 62

- id: rc_colour_management_custom_3
  label: Colour Management - Custom 3
  kind: action
  command: "21 89 01 52 43 37 33 63 0A"
  params: []
  # IR hex code: 63

- id: rc_colour_management_cycle
  label: Colour Management - cycles through Off/Custom1/Custom2/Custom3
  kind: action
  command: "21 89 01 52 43 37 33 89 0A"
  params: []
  # IR hex code: 89

- id: rc_colour_profile_cycle
  label: Colour Profile - cycles through all available profiles
  kind: action
  command: "21 89 01 52 43 37 33 88 0A"
  params: []
  # IR hex code: 88

- id: rc_colour_space_cycle
  label: Colour Space - cycles through Standard/Wide 1/Wide 2 (X3/X30/RS40/RS45)
  kind: action
  command: "21 89 01 52 43 37 33 CD 0A"
  params: []
  # IR hex code: CD

- id: rc_colour_temp_5800k
  label: Colour Temp. - 5800K
  kind: action
  command: "21 89 01 52 43 37 33 4E 0A"
  params: []
  # IR hex code: 4E

- id: rc_colour_temp_6500k
  label: Colour Temp. - 6500K
  kind: action
  command: "21 89 01 52 43 37 33 4F 0A"
  params: []
  # IR hex code: 4F

- id: rc_colour_temp_7500k
  label: Colour Temp. - 7500K
  kind: action
  command: "21 89 01 52 43 37 33 50 0A"
  params: []
  # IR hex code: 50

- id: rc_colour_temp_9300k
  label: Colour Temp. - 9300K
  kind: action
  command: "21 89 01 52 43 37 33 51 0A"
  params: []
  # IR hex code: 51

- id: rc_colour_temp_custom_1
  label: Colour Temp. - Custom 1
  kind: action
  command: "21 89 01 52 43 37 33 53 0A"
  params: []
  # IR hex code: 53

- id: rc_colour_temp_custom_2
  label: Colour Temp. - Custom 2
  kind: action
  command: "21 89 01 52 43 37 33 54 0A"
  params: []
  # IR hex code: 54

- id: rc_colour_temp_custom_3
  label: Colour Temp. - Custom 3
  kind: action
  command: "21 89 01 52 43 37 33 55 0A"
  params: []
  # IR hex code: 55

- id: rc_colour_temp_high_bright
  label: Colour Temp. - High Bright
  kind: action
  command: "21 89 01 52 43 37 33 52 0A"
  params: []
  # IR hex code: 52

- id: rc_colour_temp_plus
  label: Colour Temp. + (cycles through all options)
  kind: action
  command: "21 89 01 52 43 37 33 76 0A"
  params: []
  # IR hex code: 76

- id: rc_ct_gain_blue_minus
  label: Colour Temperature Gain Blue -
  kind: action
  command: "21 89 01 52 43 37 33 91 0A"
  params: []
  # IR hex code: 91

- id: rc_ct_gain_blue_plus
  label: Colour Temperature Gain Blue +
  kind: action
  command: "21 89 01 52 43 37 33 90 0A"
  params: []
  # IR hex code: 90

- id: rc_ct_gain_green_minus
  label: Colour Temperature Gain Green -
  kind: action
  command: "21 89 01 52 43 37 33 8F 0A"
  params: []
  # IR hex code: 8F

- id: rc_ct_gain_green_plus
  label: Colour Temperature Gain Green +
  kind: action
  command: "21 89 01 52 43 37 33 8E 0A"
  params: []
  # IR hex code: 8E

- id: rc_ct_gain_red_minus
  label: Colour Temperature Gain Red -
  kind: action
  command: "21 89 01 52 43 37 33 8D 0A"
  params: []
  # IR hex code: 8D

- id: rc_ct_gain_red_plus
  label: Colour Temperature Gain Red +
  kind: action
  command: "21 89 01 52 43 37 33 8C 0A"
  params: []
  # IR hex code: 8C

- id: rc_ct_offset_blue_minus
  label: Colour Temperature Offset Blue -
  kind: action
  command: "21 89 01 52 43 37 33 97 0A"
  params: []
  # IR hex code: 97

- id: rc_ct_offset_blue_plus
  label: Colour Temperature Offset Blue +
  kind: action
  command: "21 89 01 52 43 37 33 96 0A"
  params: []
  # IR hex code: 96

- id: rc_ct_offset_green_minus
  label: Colour Temperature Offset Green -
  kind: action
  command: "21 89 01 52 43 37 33 95 0A"
  params: []
  # IR hex code: 95

- id: rc_ct_offset_green_plus
  label: Colour Temperature Offset Green +
  kind: action
  command: "21 89 01 52 43 37 33 94 0A"
  params: []
  # IR hex code: 94

- id: rc_ct_offset_red_minus
  label: Colour Temperature Offset Red -
  kind: action
  command: "21 89 01 52 43 37 33 93 0A"
  params: []
  # IR hex code: 93

- id: rc_ct_offset_red_plus
  label: Colour Temperature Offset Red +
  kind: action
  command: "21 89 01 52 43 37 33 92 0A"
  params: []
  # IR hex code: 92

- id: rc_contrast_minus
  label: Contrast -
  kind: action
  command: "21 89 01 52 43 37 33 79 0A"
  params: []
  # IR hex code: 79

- id: rc_contrast_plus
  label: Contrast +
  kind: action
  command: "21 89 01 52 43 37 33 78 0A"
  params: []
  # IR hex code: 78

- id: rc_contrast_adj
  label: Contrast Adj. (adjustment bar On/Off toggle)
  kind: action
  command: "21 89 01 52 43 37 33 0A 0A"
  params: []
  # IR hex code: 0A

- id: rc_cti_off
  label: CTI (Colour Transient Improvement) - Off
  kind: action
  command: "21 89 01 52 43 37 33 5C 0A"
  params: []
  # IR hex code: 5C

- id: rc_cti_low
  label: CTI (Colour Transient Improvement) - Low
  kind: action
  command: "21 89 01 52 43 37 33 5D 0A"
  params: []
  # IR hex code: 5D

- id: rc_cti_middle
  label: CTI (Colour Transient Improvement) - Middle
  kind: action
  command: "21 89 01 52 43 37 33 5E 0A"
  params: []
  # IR hex code: 5E

- id: rc_cti_high
  label: CTI (Colour Transient Improvement) - High
  kind: action
  command: "21 89 01 52 43 37 33 5F 0A"
  params: []
  # IR hex code: 5F

- id: rc_cursor_down
  label: Cursor Down
  kind: action
  command: "21 89 01 52 43 37 33 02 0A"
  params: []
  # IR hex code: 02

- id: rc_cursor_left
  label: Cursor Left
  kind: action
  command: "21 89 01 52 43 37 33 36 0A"
  params: []
  # IR hex code: 36

- id: rc_cursor_right
  label: Cursor Right
  kind: action
  command: "21 89 01 52 43 37 33 34 0A"
  params: []
  # IR hex code: 34

- id: rc_cursor_up
  label: Cursor Up
  kind: action
  command: "21 89 01 52 43 37 33 01 0A"
  params: []
  # IR hex code: 01

- id: rc_dark_level_minus
  label: Dark Level - (X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 A5 0A"
  params: []
  # IR hex code: A5

- id: rc_dark_level_plus
  label: Dark Level + (X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 A4 0A"
  params: []
  # IR hex code: A4

- id: rc_detail_enhance_minus
  label: Detail Enhance -
  kind: action
  command: "21 89 01 52 43 37 33 12 0A"
  params: []
  # IR hex code: 12

- id: rc_detail_enhance_plus
  label: Detail Enhance +
  kind: action
  command: "21 89 01 52 43 37 33 11 0A"
  params: []
  # IR hex code: 11

- id: rc_picture_tone_blue_minus
  label: Picture Tone Blue -
  kind: action
  command: "21 89 01 52 43 37 33 A1 0A"
  params: []
  # IR hex code: A1

- id: rc_picture_tone_blue_plus
  label: Picture Tone Blue +
  kind: action
  command: "21 89 01 52 43 37 33 A0 0A"
  params: []
  # IR hex code: A0

- id: rc_picture_tone_green_minus
  label: Picture Tone Green -
  kind: action
  command: "21 89 01 52 43 37 33 9F 0A"
  params: []
  # IR hex code: 9F

- id: rc_picture_tone_green_plus
  label: Picture Tone Green +
  kind: action
  command: "21 89 01 52 43 37 33 9E 0A"
  params: []
  # IR hex code: 9E

- id: rc_picture_tone_red_minus
  label: Picture Tone Red -
  kind: action
  command: "21 89 01 52 43 37 33 9D 0A"
  params: []
  # IR hex code: 9D

- id: rc_picture_tone_red_plus
  label: Picture Tone Red +
  kind: action
  command: "21 89 01 52 43 37 33 9C 0A"
  params: []
  # IR hex code: 9C

- id: rc_picture_tone_white_minus
  label: Picture Tone White -
  kind: action
  command: "21 89 01 52 43 37 33 9B 0A"
  params: []
  # IR hex code: 9B

- id: rc_picture_tone_white_plus
  label: Picture Tone White +
  kind: action
  command: "21 89 01 52 43 37 33 9A 0A"
  params: []
  # IR hex code: 9A

- id: rc_gamma_a
  label: Gamma - A
  kind: action
  command: "21 89 01 52 43 37 33 39 0A"
  params: []
  # IR hex code: 39

- id: rc_gamma_b
  label: Gamma - B
  kind: action
  command: "21 89 01 52 43 37 33 3A 0A"
  params: []
  # IR hex code: 3A

- id: rc_gamma_c
  label: Gamma - C
  kind: action
  command: "21 89 01 52 43 37 33 3B 0A"
  params: []
  # IR hex code: 3B

- id: rc_gamma_custom_1
  label: Gamma - Custom 1
  kind: action
  command: "21 89 01 52 43 37 33 3C 0A"
  params: []
  # IR hex code: 3C

- id: rc_gamma_custom_2
  label: Gamma - Custom 2
  kind: action
  command: "21 89 01 52 43 37 33 3D 0A"
  params: []
  # IR hex code: 3D

- id: rc_gamma_custom_3
  label: Gamma - Custom 3
  kind: action
  command: "21 89 01 52 43 37 33 3E 0A"
  params: []
  # IR hex code: 3E

- id: rc_gamma_d
  label: Gamma - D
  kind: action
  command: "21 89 01 52 43 37 33 3F 0A"
  params: []
  # IR hex code: 3F

- id: rc_gamma_normal
  label: Gamma - Normal
  kind: action
  command: "21 89 01 52 43 37 33 38 0A"
  params: []
  # IR hex code: 38

- id: rc_gamma_plus
  label: Gamma + (cycles through all options)
  kind: action
  command: "21 89 01 52 43 37 33 75 0A"
  params: []
  # IR hex code: 75

- id: rc_hide_off
  label: Hide - Off
  kind: action
  command: "21 89 01 52 43 37 33 D1 0A"
  params: []
  # IR hex code: D1

- id: rc_hide_on
  label: Hide - On
  kind: action
  command: "21 89 01 52 43 37 33 D0 0A"
  params: []
  # IR hex code: D0

- id: rc_hide_toggle
  label: Hide (On/Off toggle)
  kind: action
  command: "21 89 01 52 43 37 33 1D 0A"
  params: []
  # IR hex code: 1D

- id: rc_horizontal_position_minus
  label: Horizontal Position -
  kind: action
  command: "21 89 01 52 43 37 33 AB 0A"
  params: []
  # IR hex code: AB

- id: rc_horizontal_position_plus
  label: Horizontal Position +
  kind: action
  command: "21 89 01 52 43 37 33 AA 0A"
  params: []
  # IR hex code: AA

- id: rc_information
  label: Information (displays Information tab of menu)
  kind: action
  command: "21 89 01 52 43 37 33 74 0A"
  params: []
  # IR hex code: 74

- id: rc_input_component
  label: Input - Component
  kind: action
  command: "21 89 01 52 43 37 33 4D 0A"
  params: []
  # IR hex code: 4D

- id: rc_input_hdmi1
  label: Input - HDMI 1
  kind: action
  command: "21 89 01 52 43 37 33 70 0A"
  params: []
  # IR hex code: 70

- id: rc_input_hdmi2
  label: Input - HDMI 2
  kind: action
  command: "21 89 01 52 43 37 33 71 0A"
  params: []
  # IR hex code: 71

- id: rc_input_pc
  label: Input - PC
  kind: action
  command: "21 89 01 52 43 37 33 46 0A"
  params: []
  # IR hex code: 46

- id: rc_input_svideo
  label: Input - S-Video
  kind: action
  command: "21 89 01 52 43 37 33 4C 0A"
  params: []
  # IR hex code: 4C

- id: rc_input_video
  label: Input - Video
  kind: action
  command: "21 89 01 52 43 37 33 4B 0A"
  params: []
  # IR hex code: 4B

- id: rc_input_plus
  label: Input + (cycles through all available inputs)
  kind: action
  command: "21 89 01 52 43 37 33 08 0A"
  params: []
  # IR hex code: 08

- id: rc_isf_day
  label: ISF - Day (X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 64 0A"
  params: []
  # IR hex code: 64

- id: rc_isf_night
  label: ISF - Night (X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 65 0A"
  params: []
  # IR hex code: 65

- id: rc_isf_off
  label: ISF - Off
  kind: action
  command: "21 89 01 52 43 37 33 5A 0A"
  params: []
  # IR hex code: 5A

- id: rc_isf_on
  label: ISF - On
  kind: action
  command: "21 89 01 52 43 37 33 5B 0A"
  params: []
  # IR hex code: 5B

- id: rc_keystone_horizontal_minus
  label: Keystone Correction Horizontal -
  kind: action
  command: "21 89 01 52 43 37 33 41 0A"
  params: []
  # IR hex code: 41

- id: rc_keystone_horizontal_plus
  label: Keystone Correction Horizontal +
  kind: action
  command: "21 89 01 52 43 37 33 40 0A"
  params: []
  # IR hex code: 40

- id: rc_keystone_vertical_minus
  label: Keystone Correction Vertical -
  kind: action
  command: "21 89 01 52 43 37 33 1C 0A"
  params: []
  # IR hex code: 1C

- id: rc_keystone_vertical_plus
  label: Keystone Correction Vertical +
  kind: action
  command: "21 89 01 52 43 37 33 1B 0A"
  params: []
  # IR hex code: 1B

- id: rc_lens_aperture_1
  label: Lens Aperture - 1 (HD350/HD550)
  kind: action
  command: "21 89 01 52 43 37 33 28 0A"
  params: []
  # IR hex code: 28

- id: rc_lens_aperture_2
  label: Lens Aperture - 2 (HD350/HD550)
  kind: action
  command: "21 89 01 52 43 37 33 29 0A"
  params: []
  # IR hex code: 29

- id: rc_lens_aperture_3
  label: Lens Aperture - 3 (HD350/HD550)
  kind: action
  command: "21 89 01 52 43 37 33 2A 0A"
  params: []
  # IR hex code: 2A

- id: rc_lens_aperture_minus
  label: Lens Aperture - (displays gauge / decreases)
  kind: action
  command: "21 89 01 52 43 37 33 1F 0A"
  params: []
  # IR hex code: 1F

- id: rc_lens_aperture_plus
  label: Lens Aperture + (displays gauge / increases)
  kind: action
  command: "21 89 01 52 43 37 33 1E 0A"
  params: []
  # IR hex code: 1E

- id: rc_lens_aperture_adj
  label: Lens Aperture Adj. (adjustment bar toggle / display / cycle)
  kind: action
  command: "21 89 01 52 43 37 33 20 0A"
  params: []
  # IR hex code: 20

- id: rc_lens_control_cycle
  label: Lens Control (cycles through all options)
  kind: action
  command: "21 89 01 52 43 37 33 30 0A"
  params: []
  # IR hex code: 30

- id: rc_lens_focus_minus
  label: Lens Focus -
  kind: action
  command: "21 89 01 52 43 37 33 32 0A"
  params: []
  # IR hex code: 32

- id: rc_lens_focus_plus
  label: Lens Focus +
  kind: action
  command: "21 89 01 52 43 37 33 31 0A"
  params: []
  # IR hex code: 31

- id: rc_lens_memory_cycle
  label: Lens Memory - cycles through Lens Memory pages Select/Save/Name Edit (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 D4 0A"
  params: []
  # IR hex code: D4

- id: rc_lens_memory_1
  label: Lens Memory 1 (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 D8 0A"
  params: []
  # IR hex code: D8

- id: rc_lens_memory_2
  label: Lens Memory 2 (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 D9 0A"
  params: []
  # IR hex code: D9

- id: rc_lens_memory_3
  label: Lens Memory 3 (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 DA 0A"
  params: []
  # IR hex code: DA

- id: rc_lens_shift_down
  label: Lens Shift - Down
  kind: action
  command: "21 89 01 52 43 37 33 22 0A"
  params: []
  # IR hex code: 22

- id: rc_lens_shift_left
  label: Lens Shift - Left
  kind: action
  command: "21 89 01 52 43 37 33 44 0A"
  params: []
  # IR hex code: 44

- id: rc_lens_shift_right
  label: Lens Shift - Right
  kind: action
  command: "21 89 01 52 43 37 33 43 0A"
  params: []
  # IR hex code: 43

- id: rc_lens_shift_up
  label: Lens Shift - Up
  kind: action
  command: "21 89 01 52 43 37 33 21 0A"
  params: []
  # IR hex code: 21

- id: rc_lens_zoom_in
  label: Lens Zoom - In
  kind: action
  command: "21 89 01 52 43 37 33 35 0A"
  params: []
  # IR hex code: 35

- id: rc_lens_zoom_out
  label: Lens Zoom - Out
  kind: action
  command: "21 89 01 52 43 37 33 37 0A"
  params: []
  # IR hex code: 37

- id: rc_mask_bottom_minus
  label: Mask Bottom -
  kind: action
  command: "21 89 01 52 43 37 33 B8 0A"
  params: []
  # IR hex code: B8

- id: rc_mask_bottom_plus
  label: Mask Bottom +
  kind: action
  command: "21 89 01 52 43 37 33 B7 0A"
  params: []
  # IR hex code: B7

- id: rc_mask_left_minus
  label: Mask Left -
  kind: action
  command: "21 89 01 52 43 37 33 B2 0A"
  params: []
  # IR hex code: B2

- id: rc_mask_left_plus
  label: Mask Left +
  kind: action
  command: "21 89 01 52 43 37 33 B1 0A"
  params: []
  # IR hex code: B1

- id: rc_mask_right_minus
  label: Mask Right -
  kind: action
  command: "21 89 01 52 43 37 33 B4 0A"
  params: []
  # IR hex code: B4

- id: rc_mask_right_plus
  label: Mask Right +
  kind: action
  command: "21 89 01 52 43 37 33 B3 0A"
  params: []
  # IR hex code: B3

- id: rc_mask_top_minus
  label: Mask Top -
  kind: action
  command: "21 89 01 52 43 37 33 B6 0A"
  params: []
  # IR hex code: B6

- id: rc_mask_top_plus
  label: Mask Top +
  kind: action
  command: "21 89 01 52 43 37 33 B5 0A"
  params: []
  # IR hex code: B5

- id: rc_menu_toggle
  label: Menu (On/Off toggle)
  kind: action
  command: "21 89 01 52 43 37 33 2E 0A"
  params: []
  # IR hex code: 2E

- id: rc_menu_position
  label: Menu Position
  kind: action
  command: "21 89 01 52 43 37 33 42 0A"
  params: []
  # IR hex code: 42

- id: rc_mnr_minus
  label: MNR (Mosquito Noise Reduction) -
  kind: action
  command: "21 89 01 52 43 37 33 0E 0A"
  params: []
  # IR hex code: 0E

- id: rc_mnr_plus
  label: MNR (Mosquito Noise Reduction) +
  kind: action
  command: "21 89 01 52 43 37 33 0D 0A"
  params: []
  # IR hex code: 0D

- id: rc_nr_toggle
  label: NR (toggles display of RNR/MNR) (HD350/550/750/950/990/RS10/15/20/25/35)
  kind: action
  command: "21 89 01 52 43 37 33 18 0A"
  params: []
  # IR hex code: 18

- id: rc_ok
  label: OK (accept currently selected option)
  kind: action
  command: "21 89 01 52 43 37 33 2F 0A"
  params: []
  # IR hex code: 2F

- id: rc_phase_minus
  label: Phase (PC Input) -
  kind: action
  command: "21 89 01 52 43 37 33 A9 0A"
  params: []
  # IR hex code: A9

- id: rc_phase_plus
  label: Phase (PC Input) +
  kind: action
  command: "21 89 01 52 43 37 33 A8 0A"
  params: []
  # IR hex code: A8

- id: rc_picture_adjust
  label: Picture Adjust
  kind: action
  command: "21 89 01 52 43 37 33 72 0A"
  params: []
  # IR hex code: 72

- id: rc_picture_mode_3d
  label: Picture Mode - 3D (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 87 0A"
  params: []
  # IR hex code: 87

- id: rc_picture_mode_cinema1_film
  label: Picture Mode - Cinema 1 / Film mode (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 69 0A"
  params: []
  # IR hex code: 69

- id: rc_picture_mode_cinema2_cinema
  label: Picture Mode - Cinema 2 / Cinema mode
  kind: action
  command: "21 89 01 52 43 37 33 68 0A"
  params: []
  # IR hex code: 68

- id: rc_picture_mode_cinema3_animation
  label: Picture Mode - Cinema 3 / Animation mode
  kind: action
  command: "21 89 01 52 43 37 33 66 0A"
  params: []
  # IR hex code: 66

- id: rc_picture_mode_dynamic
  label: Picture Mode - Dynamic (HD350/550/750/950/990)
  kind: action
  command: "21 89 01 52 43 37 33 6B 0A"
  params: []
  # IR hex code: 6B

- id: rc_picture_mode_natural
  label: Picture Mode - Natural
  kind: action
  command: "21 89 01 52 43 37 33 6A 0A"
  params: []
  # IR hex code: 6A

- id: rc_picture_mode_stage
  label: Picture Mode - Stage
  kind: action
  command: "21 89 01 52 43 37 33 67 0A"
  params: []
  # IR hex code: 67

- id: rc_picture_mode_thx
  label: Picture Mode - THX (HD750/950/990/X7/X9/X70/X90/RS20/25/35/50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 6F 0A"
  params: []
  # IR hex code: 6F

- id: rc_picture_mode_user_1
  label: Picture Mode - User 1
  kind: action
  command: "21 89 01 52 43 37 33 6C 0A"
  params: []
  # IR hex code: 6C

- id: rc_picture_mode_user_2
  label: Picture Mode - User 2
  kind: action
  command: "21 89 01 52 43 37 33 6D 0A"
  params: []
  # IR hex code: 6D

- id: rc_picture_mode_user_3
  label: Picture Mode - User 3 (HD550/750/950/990/X3/X30/RS20/25/35/40/45)
  kind: action
  command: "21 89 01 52 43 37 33 6E 0A"
  params: []
  # IR hex code: 6E

- id: rc_picture_mode_user_4
  label: Picture Mode - User 4 (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 CA 0A"
  params: []
  # IR hex code: CA

- id: rc_picture_mode_user_5
  label: Picture Mode - User 5 (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 CB 0A"
  params: []
  # IR hex code: CB

- id: rc_pixel_shift_h_blue_minus
  label: Pixel Shift - Horizontal Blue -
  kind: action
  command: "21 89 01 52 43 37 33 BE 0A"
  params: []
  # IR hex code: BE

- id: rc_pixel_shift_h_blue_plus
  label: Pixel Shift - Horizontal Blue +
  kind: action
  command: "21 89 01 52 43 37 33 BD 0A"
  params: []
  # IR hex code: BD

- id: rc_pixel_shift_h_green_minus
  label: Pixel Shift - Horizontal Green -
  kind: action
  command: "21 89 01 52 43 37 33 BC 0A"
  params: []
  # IR hex code: BC

- id: rc_pixel_shift_h_green_plus
  label: Pixel Shift - Horizontal Green +
  kind: action
  command: "21 89 01 52 43 37 33 BB 0A"
  params: []
  # IR hex code: BB

- id: rc_pixel_shift_h_red_minus
  label: Pixel Shift - Horizontal Red -
  kind: action
  command: "21 89 01 52 43 37 33 BA 0A"
  params: []
  # IR hex code: BA

- id: rc_pixel_shift_h_red_plus
  label: Pixel Shift - Horizontal Red +
  kind: action
  command: "21 89 01 52 43 37 33 B9 0A"
  params: []
  # IR hex code: B9

- id: rc_pixel_shift_v_blue_minus
  label: Pixel Shift - Vertical Blue -
  kind: action
  command: "21 89 01 52 43 37 33 C4 0A"
  params: []
  # IR hex code: C4

- id: rc_pixel_shift_v_blue_plus
  label: Pixel Shift - Vertical Blue +
  kind: action
  command: "21 89 01 52 43 37 33 C3 0A"
  params: []
  # IR hex code: C3

- id: rc_pixel_shift_v_green_minus
  label: Pixel Shift - Vertical Green -
  kind: action
  command: "21 89 01 52 43 37 33 C2 0A"
  params: []
  # IR hex code: C2

- id: rc_pixel_shift_v_green_plus
  label: Pixel Shift - Vertical Green +
  kind: action
  command: "21 89 01 52 43 37 33 C1 0A"
  params: []
  # IR hex code: C1

- id: rc_pixel_shift_v_red_minus
  label: Pixel Shift - Vertical Red -
  kind: action
  command: "21 89 01 52 43 37 33 C0 0A"
  params: []
  # IR hex code: C0

- id: rc_pixel_shift_v_red_plus
  label: Pixel Shift - Vertical Red +
  kind: action
  command: "21 89 01 52 43 37 33 BF 0A"
  params: []
  # IR hex code: BF

- id: rc_power_off
  label: Power - Off (send twice with short delay between to switch off)
  kind: action
  command: "21 89 01 52 43 37 33 06 0A"
  params: []
  # IR hex code: 06

- id: rc_power_on
  label: Power - On
  kind: action
  command: "21 89 01 52 43 37 33 05 0A"
  params: []
  # IR hex code: 05

- id: rc_rnr_minus
  label: RNR (Random Noise Reduction) -
  kind: action
  command: "21 89 01 52 43 37 33 0C 0A"
  params: []
  # IR hex code: 0C

- id: rc_rnr_plus
  label: RNR (Random Noise Reduction) +
  kind: action
  command: "21 89 01 52 43 37 33 0B 0A"
  params: []
  # IR hex code: 0B

- id: rc_screen_adjust_off
  label: Screen Adjust - Off (X3/X30/RS40/45)
  kind: action
  command: "21 89 01 52 43 37 33 80 0A"
  params: []
  # IR hex code: 80

- id: rc_screen_adjust_a
  label: Screen Adjust - A (X3/X30/RS40/45)
  kind: action
  command: "21 89 01 52 43 37 33 81 0A"
  params: []
  # IR hex code: 81

- id: rc_screen_adjust_b
  label: Screen Adjust - B (X3/X30/RS40/45)
  kind: action
  command: "21 89 01 52 43 37 33 82 0A"
  params: []
  # IR hex code: 82

- id: rc_screen_adjust_c
  label: Screen Adjust - C (X3/X30/RS40/45)
  kind: action
  command: "21 89 01 52 43 37 33 83 0A"
  params: []
  # IR hex code: 83

- id: rc_sharpness_minus
  label: Sharpness -
  kind: action
  command: "21 89 01 52 43 37 33 7F 0A"
  params: []
  # IR hex code: 7F

- id: rc_sharpness_plus
  label: Sharpness +
  kind: action
  command: "21 89 01 52 43 37 33 7E 0A"
  params: []
  # IR hex code: 7E

- id: rc_sharpness_adj
  label: Sharpness Adj. (adjustment bar On/Off toggle)
  kind: action
  command: "21 89 01 52 43 37 33 14 0A"
  params: []
  # IR hex code: 14

- id: rc_shutter_close
  label: Shutter - Close
  kind: action
  command: "21 89 01 52 43 37 33 19 0A"
  params: []
  # IR hex code: 19

- id: rc_shutter_open
  label: Shutter - Open
  kind: action
  command: "21 89 01 52 43 37 33 1A 0A"
  params: []
  # IR hex code: 1A

- id: rc_shutter_off
  label: Shutter - Off (unsynchronises shutter with Hide function)
  kind: action
  command: "21 89 01 52 43 37 33 2D 0A"
  params: []
  # IR hex code: 2D

- id: rc_shutter_on
  label: Shutter - On (synchronises shutter with Hide function)
  kind: action
  command: "21 89 01 52 43 37 33 2C 0A"
  params: []
  # IR hex code: 2C

- id: rc_test_pattern_cycle
  label: Test Pattern (cycles through all patterns) (HD350/550/750/950/990/RS10/15/20/25/35)
  kind: action
  command: "21 89 01 52 43 37 33 59 0A"
  params: []
  # IR hex code: 59

- id: rc_thx_bright
  label: THX - Bright (X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 85 0A"
  params: []
  # IR hex code: 85

- id: rc_thx_dark
  label: THX - Dark (X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 86 0A"
  params: []
  # IR hex code: 86

- id: rc_thx_off
  label: THX - Off (X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 C7 0A"
  params: []
  # IR hex code: C7

- id: rc_thx_on
  label: THX - On (X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 C8 0A"
  params: []
  # IR hex code: C8

- id: rc_tint_minus
  label: Tint - (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 99 0A"
  params: []
  # IR hex code: 99

- id: rc_tint_plus
  label: Tint + (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 98 0A"
  params: []
  # IR hex code: 98

- id: rc_tint_adj
  label: Tint Adj. (adjustment bar On/Off toggle)
  kind: action
  command: "21 89 01 52 43 37 33 16 0A"
  params: []
  # IR hex code: 16

- id: rc_tracking_minus
  label: Tracking - (PC Input) (X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 A7 0A"
  params: []
  # IR hex code: A7

- id: rc_tracking_plus
  label: Tracking + (PC Input) (X7/X9/X70/X90/RS50/60/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 A6 0A"
  params: []
  # IR hex code: A6

- id: rc_user_cycle
  label: User - cycles through User 1-5 Picture Modes (X30/X70/X90/RS45/55/65)
  kind: action
  command: "21 89 01 52 43 37 33 D7 0A"
  params: []
  # IR hex code: D7

- id: rc_vertical_position_minus
  label: Vertical Position -
  kind: action
  command: "21 89 01 52 43 37 33 AD 0A"
  params: []
  # IR hex code: AD

- id: rc_vertical_position_plus
  label: Vertical Position +
  kind: action
  command: "21 89 01 52 43 37 33 AC 0A"
  params: []
  # IR hex code: AC

- id: rc_vertical_stretch_off
  label: Vertical Stretch - Off (HD350/550/750/950/990/RS10/15/20/25/35) / Anamorphic - Off (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) [alias of rc_anamorphic_off]
  kind: action
  command: "21 89 01 52 43 37 33 24 0A"
  params: []
  # IR hex code: 24

- id: rc_vertical_stretch_on
  label: Vertical Stretch - On (HD350/550/750/950/990/RS10/15/20/25/35) / Anamorphic - A (X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65) [alias of rc_anamorphic_a]
  kind: action
  command: "21 89 01 52 43 37 33 23 0A"
  params: []
  # IR hex code: 23

# ---- STATUS ENQUIRY COMMANDS (header 3F = detailed response request) ----
- id: power_status_query
  label: Power Status Enquiry
  kind: query
  command: "3F 89 01 50 57 0A"
  params: []

- id: input_status_query
  label: Input Status Enquiry
  kind: query
  command: "3F 89 01 49 50 0A"
  params: []

- id: gamma_table_query
  label: Gamma Table Enquiry
  kind: query
  command: "3F 89 01 47 54 0A"
  params: []

- id: gamma_value_query
  label: Gamma Value Enquiry
  kind: query
  command: "3F 89 01 47 50 0A"
  params: []

- id: source_status_query
  label: Source Status Enquiry
  kind: query
  command: "3F 89 01 53 43 0A"
  params: []

- id: model_status_query
  label: Model Status Enquiry
  kind: query
  command: "3F 89 01 4D 44 0A"
  params: []
```

## Feedbacks
```yaml
# Detailed response format: 06 89 01 CC CC 0A  (basic ack) then
# 40 89 01 CC CC RR 0A  (detailed, RR = return code). CC CC = command bytes.
- id: power_state
  type: enum
  query: power_status_query
  values:
    - { code: "30", label: Standby }
    - { code: "31", label: Power On }
    - { code: "32", label: Cooling }
    - { code: "34", label: Emergency }

- id: input_state
  type: enum
  query: input_status_query
  values:
    - { code: "30", label: S-Video }
    - { code: "31", label: Video }
    - { code: "32", label: Component }
    - { code: "33", label: PC }
    - { code: "36", label: HDMI 1 }
    - { code: "37", label: HDMI 2 }

- id: gamma_table_state
  type: enum
  query: gamma_table_query
  values:
    - { code: "30", label: Gamma Normal }
    - { code: "31", label: Gamma A }
    - { code: "32", label: Gamma B }
    - { code: "33", label: Gamma C }
    - { code: "34", label: Gamma Custom 1 }
    - { code: "35", label: Gamma Custom 2 }
    - { code: "36", label: Gamma Custom 3 }

- id: gamma_value_state
  type: enum
  query: gamma_value_query
  values:
    - { code: "30", label: "1.8" }
    - { code: "31", label: "1.9" }
    - { code: "32", label: "2.0" }
    - { code: "33", label: "2.1" }
    - { code: "34", label: "2.2" }
    - { code: "35", label: "2.3" }
    - { code: "36", label: "2.4" }
    - { code: "37", label: "2.5" }
    - { code: "38", label: "2.6" }

- id: source_state
  type: enum
  query: source_status_query
  values:
    - { code: "00", label: JVC Logo displayed }
    - { code: "30", label: "No signal or signal out of range" }
    - { code: "31", label: Signal input correctly }

- id: model_state
  type: enum
  query: model_status_query
  values:
    # Return code is a multi-byte model identifier (hex), not a single byte.
    # DLA-X35 is NOT listed among these identifiers (source predates X35).
    - { code: "494C4150 504A202D2D2D5848 34", label: DLA-HD350 }
    - { code: "494C4150 504A202D2D2D5848 37", label: DLA-RS10 }
    - { code: "494C4150 504A202D2D2D5848 35", label: "DLA-HD750 & DLA-RS20" }
    - { code: "494C4150 504A202D2D2D5848 38", label: DLA-HD550 }
    - { code: "494C4150 504A202D2D2D5848 41", label: DLA-RS15 }
    - { code: "494C4150 504A202D2D2D5848 39", label: "DLA-HD950/HD990/DLA-RS25/RS35" }
    - { code: "494C4150 504A202D2D2D5848 42", label: "DLA-X3 & DLA-RS40" }
    - { code: "494C4150 504A202D2D2D5848 43", label: "DLA-X7/X9 & DLA-RS50/60" }
    - { code: "494C4150 504A202D2D2D5848 45", label: "DLA-X30 & DLA-RS45" }
    - { code: "494C4150 504A202D2D2D5848 46", label: "DLA-X70R/X90R & DLA-RS55/65" }
    # UNRESOLVED: no DLA-X35 model identifier is documented in this source.
```

## Variables
```yaml
# All settable picture parameters are exposed as discrete +/- and absolute actions
# above (brightness, contrast, colour, sharpness, tint, lens aperture, colour
# temperature gain/offset, etc.). No continuous set-with-value variable syntax is
# documented in the source; values are stepped via the +/- emulation commands.
# UNRESOLVED: no parameterised set-value command form documented for the X35.
```

## Events
```yaml
# The projector emits Acknowledgement Response Return Codes only in reply to a
# command (basic 06 ... or detailed 40 ... ). No unsolicited/notification events
# are documented in the source.
# UNRESOLVED: no unsolicited events documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences documented in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# The source documents error/timing behaviour but no safety interlocks:
#   - Projector ignores unrecognised/inappropriate commands (e.g. Power On while cooling).
#   - Commands received with a break >= 50ms in the incoming data are discarded.
#   - Consecutive commands: controller must wait for the Acknowledgement Response
#     before sending the next command.
#   - Power Off (RC emulation, IR 06) must be sent twice with a short delay between
#     to actually switch the projector off.
#   - LAN: connection auto-closes after 5s of inactivity; PJ_OK/PJREQ/PJACK handshake
#     must complete within 5s windows.
# No power-on sequencing, thermal interlock, or lamp-safety procedures are stated.
```

## Notes
- Source: JVC "RS-232C, LAN and Infrared Remote Control Guide" Version 1.4. The DLA-X35 is
  NOT in this guide's FOR MODELS list (it postdates v1.4). All commands are the documented
  JVC D-ILA standard and are EXPECTED — not confirmed — to apply to the DLA-X35.
- Hex payloads were reconstructed to canonical byte boundaries using the source's own Command
  Format (Header 21 / 3F; Unit ID 89 01; 2-byte command; data; End 0A). The source PDF had
  irregular spacing (e.g. "2189 0150 5730 0A"); reconstruction validated against the source's
  worked example: Power On = `21 89 01 50 57 31 0A`.
- Direct Commands are preferred over Remote Control Emulation Commands where both exist
  (per source). The RC emulation prefix `21 89 01 52 43 37 33` decodes to ASCII "RC73"; the
  variable byte equals the IR hex code shown in the source's right-hand column.
- Multiple Projector Infrared Control: X3/X7/X9/X30/X70/X90/RS40/50/60/45/55/65 accept IR
  device code 73 (Code A, default) or 63 (Code B). Whether the X35 supports Code B is UNRESOLVED.
- LAN control: TCP three-way handshake to port 20554, then projector sends `PJ_OK`, controller
  replies `PJREQ` (within 5s), projector replies `PJACK`, then command (within 5s). Connection
  closes after 5s; each command needs a fresh handshake.
- Defaults (LAN-capable models only): IP 192.168.0.2, subnet 255.255.255.0, gateway
  192.168.0.254, DHCP off. Terminal must be switched from "RS-232C" to "LAN" in the Function menu.

<!-- UNRESOLVED: DLA-X35 not in source FOR MODELS list; entire command set is unverified for this model. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: whether DLA-X35 has a LAN control port is not stated. -->
<!-- UNRESOLVED: DLA-X35 model-status identifier (for model_status_query) not documented. -->
<!-- UNRESOLVED: a v1.5+ guide revision may exist that explicitly covers the X35. -->

## Provenance

```yaml
source_domains:
  - support.jvc.com
source_urls:
  - https://support.jvc.com/consumer/support/documents/DILAremoteControlGuide.pdf
retrieved_at: 2026-07-24T20:33:18.510Z
last_checked_at: 2026-08-05T08:27:20.279Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:27:20.279Z
matched_actions: 329
action_count: 329
confidence: medium
summary: "All 329 spec actions match literal source commands (RC commands normalized for IR-hex-as-ASCII-byte encoding); transport values verbatim in source. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The DLA-X35 is NOT in the source's FOR MODELS list. The v1.4 guide covers"
- "A newer guide revision (v1.5+) may add X35-specific commands. Source used is"
- "LAN control is documented only for X7/X9/X30/X70/X90/RS50/60/45/55/65."
- "no DLA-X35 model identifier is documented in this source."
- "no parameterised set-value command form documented for the X35."
- "no unsolicited events documented."
- "no multi-step command sequences documented in the source."
- "DLA-X35 not in source FOR MODELS list; entire command set is unverified for this model."
- "firmware version compatibility not stated."
- "whether DLA-X35 has a LAN control port is not stated."
- "DLA-X35 model-status identifier (for model_status_query) not documented."
- "a v1.5+ guide revision may exist that explicitly covers the X35."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
