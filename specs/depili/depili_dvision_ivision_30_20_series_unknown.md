---
spec_id: admin/depili-dvision-ivision-30-20-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Depili dVision IVision 30 20 Series Control Spec"
manufacturer: Depili
model_family: "dVision IVision 30 20 Series"
aliases: []
compatible_with:
  manufacturers:
    - Depili
  models:
    - "dVision IVision 30 20 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - projector-database.com
  - agneovo.com
  - assets.lutron.com
  - rakocontrols.com
source_urls:
  - https://www.projector-database.com/pdf/DigitalProjectioniVisionSXHC-rs232c.pdf
  - https://www.agneovo.com/wp-content/uploads/2021/09/TBX-2201_RS232_CommandList.pdf
  - https://www.agneovo.com/wp-content/uploads/2021/07/PD-42_RS232_CommandList.pdf
  - "https://assets.lutron.com/a/documents/hwi%20rs232%20protocol.pdf"
  - https://rakocontrols.com/media/1286/rs232-command-summary.pdf
retrieved_at: 2026-05-14T15:34:54.892Z
last_checked_at: 2026-06-02T21:41:29.209Z
generated_at: 2026-06-02T21:41:29.209Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "header bytes 1-7 in Appendix A are described as \"see Excel sheet\" — bytes 1-5 are constant (BE EF 03 19 00) but the source refers to an external sheet for the full header layout."
  - "response value maps for source/power/orientation/brightness/"
  - "per-parameter min/max/step ranges and units for Brightness,"
  - "no unsolicited event packet formats documented in source."
  - "source does not document multi-step macro sequences."
  - "source contains no explicit safety warnings, interlock"
  - "header bytes 1-7 are described as \"see Excel sheet\" in Appendix A — bytes 1-5 are constant (BE EF 03 19 00) but the full 7-byte header layout refers to an external sheet not present in the source."
  - "response value mappings for Source Get, Power Get, Orientation Get, Brightness Get, Contrast Get, Light On Time Hours/Minutes Get, Unit On Time Hours Get, and Software Version Get are not documented."
  - "per-parameter min/max/step ranges and units not stated in source."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:29.209Z
  matched_actions: 98
  action_count: 98
  confidence: medium
  summary: "All 98 spec actions match literally in source tables; transport verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Depili dVision IVision 30 20 Series Control Spec

## Summary
Binary RS-232 control protocol for a Depili projector (dVision IVision 30 20 Series family). All commands are 32-byte packets (7-byte header + 11-byte payload + 14 bytes padding) with a 16-bit CRC. The protocol exposes SET, GET, INCREMENT/DECREMENT, and EXECUTE operations covering source selection, picture controls, power, scaling, orientation, gamma, color temperature, and projector telemetry.

<!-- UNRESOLVED: header bytes 1-7 in Appendix A are described as "see Excel sheet" — bytes 1-5 are constant (BE EF 03 19 00) but the source refers to an external sheet for the full header layout. -->

## Transport
```yaml
protocols:
  - serial
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
# All traits inferred from command set in source.
- powerable     # inferred from Power on/off commands
- routable      # inferred from source-select commands (VGA1, VGA2, DVI, Component, S-video, Composite)
- queryable     # inferred from GET commands (Lamp Ignition, Thermal Monitor, Source, Power, etc.)
- levelable     # inferred from increment/decrement commands (Brightness, Contrast, Volume, AudioTreble, AudioBass, Hue, etc.)
```

## Actions
```yaml
# All commands are 32-byte packets: 5-byte constant prefix (BE EF 03 19 00) +
# 2-byte CRC + 1-byte op-type + 2-byte op-code (lo,hi) + 2-byte validation
# (0x00 0x00) + 4-byte target (0x00 0x00 0x00 0x00) + 2-byte value (lo,hi) +
# 14 zero-byte padding. The 16-bit CRC is computed over the entire packet
# with the CRC bytes initialized to zero (see Appendix B for CRC-16 algorithm).
# PAK (0x1E) acknowledgement prepends the echoed command for a 33-byte response.
#
# Op-type codes:
#   0x01 = OPERATION_SET
#   0x02 = OPERATION_GET
#   0x03 = OPERATION_INCREMENT
#   0x04 = OPERATION_DECREMENT
#   0x05 = OPERATION_EXECUTE

# ── SET operations ────────────────────────────────────────────────────────
- id: select_vga1
  label: Select VGA1
  kind: action
  command: "BE EF 03 19 00 EA E9 01 01 44 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_vga2
  label: Select VGA2
  kind: action
  command: "BE EF 03 19 00 7A 28 01 01 44 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_dvi
  label: Select DVI
  kind: action
  command: "BE EF 03 19 00 8B 68 01 01 44 00 00 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_component
  label: Select Component
  kind: action
  command: "BE EF 03 19 00 1B A9 01 01 44 00 00 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_s_video
  label: Select S-video
  kind: action
  command: "BE EF 03 19 00 29 EB 01 01 44 00 00 00 00 00 00 04 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_composite
  label: Select Composite video
  kind: action
  command: "BE EF 03 19 00 B9 2A 01 01 44 00 00 00 00 00 00 05 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_component_hd_source_scan_off
  label: Select Component HD Source scan off
  kind: action
  command: "BE EF 03 19 00 48 6A 01 01 44 00 00 00 00 00 00 06 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: source_scan_on
  label: Source scan on
  kind: action
  command: "BE EF 03 19 00 EB C9 01 23 44 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: power_off
  label: Power off
  kind: action
  command: "BE EF 03 19 00 82 14 01 9C 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: power_on
  label: Power on
  kind: action
  command: "BE EF 03 19 00 12 D5 01 9C 02 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "BE EF 03 19 00 05 3A 01 69 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "BE EF 03 19 00 95 FB 01 69 02 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_scaling_1_1
  label: Select Scaling 1:1
  kind: action
  command: "BE EF 03 19 00 55 B2 01 16 44 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_scaling_16_9
  label: Select Scaling 16:9
  kind: action
  command: "BE EF 03 19 00 A4 F2 01 16 44 00 00 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_scaling_anamorphic
  label: Select Scaling Anamorphic
  kind: action
  command: "BE EF 03 19 00 31 36 01 16 44 00 00 00 00 00 00 0E 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_scaling_fill_aspect_ratio
  label: Select Scaling FillAspectRatio
  kind: action
  command: "BE EF 03 19 00 C5 73 01 16 44 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_scaling_fill_all
  label: Select Scaling FillAll
  kind: action
  command: "BE EF 03 19 00 34 33 01 16 44 00 00 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_gamma_video_video
  label: Select Gamma Video Video
  kind: action
  command: "BE EF 03 19 00 B8 1D 01 91 02 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_gamma_video_photographic
  label: Select Gamma Video Photographic
  kind: action
  command: "BE EF 03 19 00 49 5D 01 91 02 00 00 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_gamma_video_high_brightness
  label: Select Gamma Video High Brightness
  kind: action
  command: "BE EF 03 19 00 D9 9C 01 91 02 00 00 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_gamma_data_video
  label: Select Gamma Data Video
  kind: action
  command: "BE EF 03 19 00 2D 40 01 90 02 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_gamma_data_photographic
  label: Select Gamma Data Photographic
  kind: action
  command: "BE EF 03 19 00 DC 00 01 90 02 00 00 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_gamma_data_high_brightness
  label: Select Gamma Data High Brightness
  kind: action
  command: "BE EF 03 19 00 4C C1 01 90 02 00 00 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_orientation_desktop_front
  label: Select Orientation Desktop Front
  kind: action
  command: "BE EF 03 19 00 11 89 01 51 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_orientation_ceiling_front
  label: Select Orientation Ceiling Front
  kind: action
  command: "BE EF 03 19 00 E0 C9 01 51 02 00 00 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_orientation_desktop_rear
  label: Select Orientation Desktop Rear
  kind: action
  command: "BE EF 03 19 00 70 08 01 51 02 00 00 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_orientation_rear_ceiling
  label: Select Orientation Rear Ceiling
  kind: action
  command: "BE EF 03 19 00 81 48 01 51 02 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_search_picture_off
  label: Select Search Picture Off
  kind: action
  command: "BE EF 03 19 00 FC 1E 01 A6 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_search_picture_logo
  label: Select Search Picture Logo
  kind: action
  command: "BE EF 03 19 00 6C DF 01 A6 02 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_search_picture_blue
  label: Select Search Picture Blue
  kind: action
  command: "BE EF 03 19 00 9D 9F 01 A6 02 00 00 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_search_picture_white
  label: Select Search Picture White
  kind: action
  command: "BE EF 03 19 00 0D 5E 01 A6 02 00 00 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: blank_display_on
  label: Blank Display On (picture mute)
  kind: action
  command: "BE EF 03 19 00 BD BD 01 3B 02 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: blank_display_off
  label: Blank Display Off (picture mute)
  kind: action
  command: "BE EF 03 19 00 2D 7C 01 3B 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: osd_on
  label: OSD On
  kind: action
  command: "BE EF 03 19 00 87 88 01 9D 02 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: osd_off
  label: OSD Off
  kind: action
  command: "BE EF 03 19 00 17 49 01 9D 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_color_temp_custom
  label: Select Color Temp Custom
  kind: action
  command: "BE EF 03 19 00 96 20 01 07 44 00 00 00 00 00 00 04 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_color_temp_6500
  label: Select Color Temp 6500
  kind: action
  command: "BE EF 03 19 00 34 A3 01 07 44 00 00 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_color_temp_7300
  label: Select Color Temp 7300
  kind: action
  command: "BE EF 03 19 00 C5 E3 01 07 44 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: select_color_temp_9300
  label: Select Color Temp 9300
  kind: action
  command: "BE EF 03 19 00 55 22 01 07 44 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# ── INCREMENT / DECREMENT operations ─────────────────────────────────────
# op-type 0x03 = INCREMENT, 0x04 = DECREMENT

- id: brightness_increment
  label: Brightness Increment
  kind: action
  command: "BE EF 03 19 00 C1 C9 03 03 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: brightness_decrement
  label: Brightness Decrement
  kind: action
  command: "BE EF 03 19 00 AF 63 04 03 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: contrast_increment
  label: Contrast Increment
  kind: action
  command: "BE EF 03 19 00 EB 5F 03 04 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: contrast_decrement
  label: Contrast Decrement
  kind: action
  command: "BE EF 03 19 00 85 F5 04 04 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: vertical_keystone_increment
  label: Vertical Keystone Increment
  kind: action
  command: "BE EF 03 19 00 94 75 03 1C 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: vertical_keystone_decrement
  label: Vertical Keystone Decrement
  kind: action
  command: "BE EF 03 19 00 FA DF 04 1C 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: horizontal_keystone_increment
  label: Horizontal Keystone Increment
  kind: action
  command: "BE EF 03 19 00 8A 44 03 21 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: horizontal_keystone_decrement
  label: Horizontal Keystone Decrement
  kind: action
  command: "BE EF 03 19 00 E4 EE 04 21 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_saturation_increment
  label: Color Saturation Increment
  kind: action
  command: "BE EF 03 19 00 01 B8 03 0C 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: color_saturation_decrement
  label: Color Saturation Decrement
  kind: action
  command: "BE EF 03 19 00 6F 12 04 0C 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: volume_increment
  label: Volume Increment
  kind: action
  command: "BE EF 03 19 00 77 E0 03 66 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: volume_decrement
  label: Volume Decrement
  kind: action
  command: "BE EF 03 19 00 19 4A 04 66 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: horizontal_position_increment
  label: Horizontal Position Increment
  kind: action
  command: "BE EF 03 19 00 6B 01 03 0E 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: horizontal_position_decrement
  label: Horizontal Position Decrement
  kind: action
  command: "BE EF 03 19 00 05 AB 04 0E 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: vertical_position_increment
  label: Vertical Position Increment
  kind: action
  command: "BE EF 03 19 00 FE 5C 03 0F 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: vertical_position_decrement
  label: Vertical Position Decrement
  kind: action
  command: "BE EF 03 19 00 90 F6 04 0F 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: hue_increment
  label: Hue Increment
  kind: action
  command: "BE EF 03 19 00 2B 2E 03 0B 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: hue_decrement
  label: Hue Decrement
  kind: action
  command: "BE EF 03 19 00 45 84 04 0B 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: sharpness_increment
  label: Sharpness Increment
  kind: action
  command: "BE EF 03 19 00 94 E5 03 0D 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: sharpness_decrement
  label: Sharpness Decrement
  kind: action
  command: "BE EF 03 19 00 FA 4F 04 0D 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: phase_increment
  label: Phase Increment
  kind: action
  command: "BE EF 03 19 00 AB E0 03 10 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: phase_decrement
  label: Phase Decrement
  kind: action
  command: "BE EF 03 19 00 C5 4A 04 10 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: frequency_increment
  label: Frequency Increment
  kind: action
  command: "BE EF 03 19 00 7E 92 03 14 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: frequency_decrement
  label: Frequency Decrement
  kind: action
  command: "BE EF 03 19 00 10 38 04 14 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: audio_treble_increment
  label: AudioTreble Increment
  kind: action
  command: "BE EF 03 19 00 E2 BD 03 67 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: audio_treble_decrement
  label: AudioTreble Decrement
  kind: action
  command: "BE EF 03 19 00 8C 17 04 67 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: audio_bass_increment
  label: AudioBass Increment
  kind: action
  command: "BE EF 03 19 00 22 CC 03 68 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: audio_bass_decrement
  label: AudioBass Decrement
  kind: action
  command: "BE EF 03 19 00 4C 66 04 68 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: red_brightness_increment
  label: Red Brightness Increment
  kind: action
  command: "BE EF 03 19 00 7E 02 03 05 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: red_brightness_decrement
  label: Red Brightness Decrement
  kind: action
  command: "BE EF 03 19 00 10 A8 04 05 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: red_contrast_increment
  label: Red Contrast Increment
  kind: action
  command: "BE EF 03 19 00 81 E6 03 06 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: red_contrast_decrement
  label: Red Contrast Decrement
  kind: action
  command: "BE EF 03 19 00 EF 4C 04 06 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: green_brightness_increment
  label: Green Brightness Increment
  kind: action
  command: "BE EF 03 19 00 14 BB 03 07 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: green_brightness_decrement
  label: Green Brightness Decrement
  kind: action
  command: "BE EF 03 19 00 7A 11 04 07 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: green_contrast_increment
  label: Green Contrast Increment
  kind: action
  command: "BE EF 03 19 00 D4 CA 03 08 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: green_contrast_decrement
  label: Green Contrast Decrement
  kind: action
  command: "BE EF 03 19 00 BA 60 04 08 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: blue_brightness_increment
  label: Blue Brightness Increment
  kind: action
  command: "BE EF 03 19 00 41 97 03 09 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: blue_brightness_decrement
  label: Blue Brightness Decrement
  kind: action
  command: "BE EF 03 19 00 2F 3D 04 09 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: blue_contrast_increment
  label: Blue Contrast Increment
  kind: action
  command: "BE EF 03 19 00 BE 73 03 0A 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: blue_contrast_decrement
  label: Blue Contrast Decrement
  kind: action
  command: "BE EF 03 19 00 D0 D9 04 0A 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: red_temp_increment
  label: Red Temp Increment
  kind: action
  command: "BE EF 03 19 00 14 2B 03 16 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: red_temp_decrement
  label: Red Temp Decrement
  kind: action
  command: "BE EF 03 19 00 7A 81 04 16 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: green_temp_increment
  label: Green Temp Increment
  kind: action
  command: "BE EF 03 19 00 81 76 03 17 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: green_temp_decrement
  label: Green Temp Decrement
  kind: action
  command: "BE EF 03 19 00 EF DC 04 17 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: blue_temp_increment
  label: Blue Temp Increment
  kind: action
  command: "BE EF 03 19 00 41 07 03 18 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: blue_temp_decrement
  label: Blue Temp Decrement
  kind: action
  command: "BE EF 03 19 00 2F AD 04 18 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# ── GET (query) operations ────────────────────────────────────────────────
# op-type 0x02 = OPERATION_GET. Response: PAK (0x1E) + echoed GET packet,
# with the requested value in bytes 17 (lo) and 18 (hi) of the returned payload.

- id: lamp_ignition_get
  label: Lamp Ignition Get
  kind: query
  command: "BE EF 03 19 00 62 93 02 A2 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: thermal_monitor_get
  label: Thermal Monitor Get
  kind: query
  command: "BE EF 03 19 00 DC E8 02 97 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: source_get
  label: Source Get
  kind: query
  command: "BE EF 03 19 00 A1 16 02 01 44 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: orientation_get
  label: Orientation Get
  kind: query
  command: "BE EF 03 19 00 5A 76 02 51 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: power_get
  label: Power Get
  kind: query
  command: "BE EF 03 19 00 C9 EB 02 9C 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: brightness_get
  label: Brightness Get
  kind: query
  command: "BE EF 03 19 00 38 9D 02 03 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: contrast_get
  label: Contrast Get
  kind: query
  command: "BE EF 03 19 00 12 0B 02 04 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: light_on_time_hours_get
  label: Light On Time Hours Get
  kind: query
  command: "BE EF 03 19 00 2D F2 02 04 10 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: light_on_time_minutes_get
  label: Light On Time Minutes Get
  kind: query
  command: "BE EF 03 19 00 B8 AF 02 05 10 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: unit_on_time_hours_get
  label: Unit On Time Hours Get
  kind: query
  command: "BE EF 03 19 00 92 39 02 02 10 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: lamp_on_get
  label: Lamp On (Get)
  kind: query
  command: "BE EF 03 19 00 07 7F 02 00 04 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

- id: software_version_get
  label: Software Version Get
  kind: query
  command: "BE EF 03 19 00 08 2A 02 A0 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []

# ── EXECUTE operations ───────────────────────────────────────────────────
# op-type 0x05 = OPERATION_EXECUTE. Triggers a pre-programmed algorithm.

- id: auto_adjust
  label: Auto Adjust
  kind: action
  command: "BE EF 03 19 00 2F AE 05 03 42 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
  params: []
```

## Feedbacks
```yaml
- id: lamp_ignition_state
  type: enum
  values:
    - {value: 0, label: "Lamp does not ignite"}
    - {value: 1, label: "Lamp is warming up"}
    - {value: 2, label: "Lamp ignited"}
    - {value: 3, label: "Lamp is off"}
    - {value: 4, label: "Lamp is cooling down"}

- id: thermal_monitor_state
  type: enum
  values:
    - {value: 0, label: "OK"}
    - {value: 1, label: "Temperature too high"}
    - {value: 2, label: "Temperature warning"}
    - {value: 3, label: "Fan 70x70 stopped"}
    - {value: 4, label: "Fan 60x60 stopped"}
    - {value: 5, label: "Fan Blower stopped"}

- id: lamp_on_state
  type: enum
  values:
    - {value: 0, label: "Lamp is not lit"}
    - {value: 1, label: "Lamp is lit"}

# Note: Source Get, Power Get, Orientation Get, Brightness Get, Contrast Get,
# Light/Unit On Time Gets, and Software Version Get return a WORD in bytes
# 17-18 of the response payload, but the source does not enumerate the
# value-to-state mapping for these (only their existence as commands).
# UNRESOLVED: response value maps for source/power/orientation/brightness/
# contrast/light-on-time/unit-on-time/software-version queries.
```

## Variables
```yaml
# Source documents only INCREMENT/DECREMENT operations for the picture
# parameters (no absolute SET for Brightness/Contrast/Volume/etc.) and a
# single SET for color temperature presets. Continuous parameter ranges,
# units, and limits are not enumerated in the source.
# UNRESOLVED: per-parameter min/max/step ranges and units for Brightness,
# Contrast, Hue, Sharpness, Color Saturation, Phase, Frequency, Volume,
# AudioTreble, AudioBass, Horizontal/Vertical Position, Horizontal/Vertical
# Keystone, and per-channel (R/G/B) Brightness/Contrast/Temp adjustments.
```

## Events
```yaml
# The source describes PAK (0x1E) acknowledgements echoed after every
# operation, but does not document unsolicited notifications (e.g. lamp
# fault, thermal shutdown) that the device may send.
# UNRESOLVED: no unsolicited event packet formats documented in source.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock
# procedures, or power-on sequencing requirements.
```

## Notes
All packets are 32 bytes: 5-byte constant prefix `BE EF 03 19 00`, then a 16-bit CRC, then a 1-byte op-type (0x01=SET, 0x02=GET, 0x03=INCREMENT, 0x04=DECREMENT, 0x05=EXECUTE), then a 2-byte op-code (little-endian), then 2 bytes validation, 4 bytes target, 2 bytes value, and 14 bytes of zero padding to reach 32. The CRC is a 16-bit lookup-table CRC (CRC-16/ARC variant per Appendix B) computed over the entire 32-byte packet with the CRC bytes initialized to zero. Every response prepends PAK (0x1E) to the echoed command for a 33-byte response; for INCREMENT/DECREMENT/EXECUTE the echoed packet's byte 11 carries a validation code of 0x01 and the CRC is recomputed accordingly. Sub-Brightness and Sub-Contrast adjustments apply only to analog RGB (VGA) inputs. R/G/B color-temperature increment/decrement commands require "Custom color temp" to be selected first (via one of the Color Temp SET commands) or they will not take effect.

<!-- UNRESOLVED: header bytes 1-7 are described as "see Excel sheet" in Appendix A — bytes 1-5 are constant (BE EF 03 19 00) but the full 7-byte header layout refers to an external sheet not present in the source. -->
<!-- UNRESOLVED: response value mappings for Source Get, Power Get, Orientation Get, Brightness Get, Contrast Get, Light On Time Hours/Minutes Get, Unit On Time Hours Get, and Software Version Get are not documented. -->
<!-- UNRESOLVED: per-parameter min/max/step ranges and units not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - projector-database.com
  - agneovo.com
  - assets.lutron.com
  - rakocontrols.com
source_urls:
  - https://www.projector-database.com/pdf/DigitalProjectioniVisionSXHC-rs232c.pdf
  - https://www.agneovo.com/wp-content/uploads/2021/09/TBX-2201_RS232_CommandList.pdf
  - https://www.agneovo.com/wp-content/uploads/2021/07/PD-42_RS232_CommandList.pdf
  - "https://assets.lutron.com/a/documents/hwi%20rs232%20protocol.pdf"
  - https://rakocontrols.com/media/1286/rs232-command-summary.pdf
retrieved_at: 2026-05-14T15:34:54.892Z
last_checked_at: 2026-06-02T21:41:29.209Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:29.209Z
matched_actions: 98
action_count: 98
confidence: medium
summary: "All 98 spec actions match literally in source tables; transport verified; complete bidirectional coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "header bytes 1-7 in Appendix A are described as \"see Excel sheet\" — bytes 1-5 are constant (BE EF 03 19 00) but the source refers to an external sheet for the full header layout."
- "response value maps for source/power/orientation/brightness/"
- "per-parameter min/max/step ranges and units for Brightness,"
- "no unsolicited event packet formats documented in source."
- "source does not document multi-step macro sequences."
- "source contains no explicit safety warnings, interlock"
- "header bytes 1-7 are described as \"see Excel sheet\" in Appendix A — bytes 1-5 are constant (BE EF 03 19 00) but the full 7-byte header layout refers to an external sheet not present in the source."
- "response value mappings for Source Get, Power Get, Orientation Get, Brightness Get, Contrast Get, Light On Time Hours/Minutes Get, Unit On Time Hours Get, and Software Version Get are not documented."
- "per-parameter min/max/step ranges and units not stated in source."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
