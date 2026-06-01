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
  - agneovo.com
  - projector-database.com
source_urls:
  - https://www.agneovo.com/wp-content/uploads/2021/09/TBX-2201_RS232_CommandList.pdf
  - https://www.projector-database.com/pdf/DigitalProjectioniVisionSXHC-rs232c.pdf
retrieved_at: 2026-05-19T04:31:40.666Z
last_checked_at: 2026-05-19T17:04:12.741Z
generated_at: 2026-05-19T17:04:12.741Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-19T17:04:12.741Z
  matched_actions: 86
  action_count: 86
  confidence: high
  summary: "All 86 spec actions match wire-literal byte sequences in source tables; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Depili dVision IVision 30 20 Series Control Spec

## Summary

RS-232 binary control protocol for Depili dVision IVision 30 20 Series projectors. 32-byte packets with CRC-16 checksum support SET, GET, INCREMENT, DECREMENT, and EXECUTE operations covering power, source selection, image adjustment, audio, orientation, scaling, gamma, and diagnostic queries.

<!-- UNRESOLVED: TCP/IP control not mentioned — serial-only per source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: min/max ranges for adjustable parameters not stated in source (only increment/decrement available) -->

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
traits:
  - powerable     # inferred from power on/off commands
  - queryable     # inferred from GET operations (power, brightness, source, etc.)
  - levelable     # inferred from brightness, contrast, volume increment/decrement
  - routable      # inferred from source selection commands (VGA1, VGA2, DVI, etc.)
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    params: []
    bytes: "BE EF 03 19 00 12 D5 01 9C 02 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: power_off
    label: Power Off
    kind: action
    params: []
    bytes: "BE EF 03 19 00 82 14 01 9C 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_vga1
    label: Select VGA1
    kind: action
    params: []
    bytes: "BE EF 03 19 00 EA E9 01 01 44 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_vga2
    label: Select VGA2
    kind: action
    params: []
    bytes: "BE EF 03 19 00 7A 28 01 01 44 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_dvi
    label: Select DVI
    kind: action
    params: []
    bytes: "BE EF 03 19 00 8B 68 01 01 44 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_component
    label: Select Component
    kind: action
    params: []
    bytes: "BE EF 03 19 00 1B A9 01 01 44 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_svideo
    label: Select S-Video
    kind: action
    params: []
    bytes: "BE EF 03 19 00 29 EB 01 01 44 00 00 00 00 04 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_composite
    label: Select Composite Video
    kind: action
    params: []
    bytes: "BE EF 03 19 00 B9 2A 01 01 44 00 00 00 00 05 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_component_hd
    label: Select Component HD
    kind: action
    params: []
    bytes: "BE EF 03 19 00 48 6A 01 01 44 00 00 00 00 06 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: source_scan_on
    label: Source Scan On
    kind: action
    params: []
    bytes: "BE EF 03 19 00 EB C9 01 23 44 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: mute_on
    label: Mute On
    kind: action
    params: []
    bytes: "BE EF 03 19 00 05 3A 01 69 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: mute_off
    label: Mute Off
    kind: action
    params: []
    bytes: "BE EF 03 19 00 95 FB 01 69 02 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: blank_on
    label: Blank Display On
    kind: action
    params: []
    bytes: "BE EF 03 19 00 BD BD 01 3B 02 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: blank_off
    label: Blank Display Off
    kind: action
    params: []
    bytes: "BE EF 03 19 00 2D 7C 01 3B 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: osd_on
    label: OSD On
    kind: action
    params: []
    bytes: "BE EF 03 19 00 87 88 01 9D 02 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: osd_off
    label: OSD Off
    kind: action
    params: []
    bytes: "BE EF 03 19 00 17 49 01 9D 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_scaling_1to1
    label: Select Scaling 1:1
    kind: action
    params: []
    bytes: "BE EF 03 19 00 55 B2 01 16 44 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_scaling_16x9
    label: Select Scaling 16:9
    kind: action
    params: []
    bytes: "BE EF 03 19 00 A4 F2 01 16 44 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_scaling_anamorphic
    label: Select Scaling Anamorphic
    kind: action
    params: []
    bytes: "BE EF 03 19 00 31 36 01 16 44 00 00 00 00 0E 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_scaling_fill_aspect
    label: Select Scaling Fill Aspect Ratio
    kind: action
    params: []
    bytes: "BE EF 03 19 00 C5 73 01 16 44 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_scaling_fill_all
    label: Select Scaling Fill All
    kind: action
    params: []
    bytes: "BE EF 03 19 00 34 33 01 16 44 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_gamma_video_video
    label: Select Gamma Video - Video
    kind: action
    params: []
    bytes: "BE EF 03 19 00 B8 1D 01 91 02 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_gamma_video_photo
    label: Select Gamma Video - Photographic
    kind: action
    params: []
    bytes: "BE EF 03 19 00 49 5D 01 91 02 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_gamma_video_highbrightness
    label: Select Gamma Video - High Brightness
    kind: action
    params: []
    bytes: "BE EF 03 19 00 D9 9C 01 91 02 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_gamma_data_video
    label: Select Gamma Data - Video
    kind: action
    params: []
    bytes: "BE EF 03 19 00 2D 40 01 90 02 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_gamma_data_photo
    label: Select Gamma Data - Photographic
    kind: action
    params: []
    bytes: "BE EF 03 19 00 DC 00 01 90 02 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_gamma_data_highbrightness
    label: Select Gamma Data - High Brightness
    kind: action
    params: []
    bytes: "BE EF 03 19 00 4C C1 01 90 02 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_orientation_desktop_front
    label: Select Orientation Desktop Front
    kind: action
    params: []
    bytes: "BE EF 03 19 00 11 89 01 51 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_orientation_ceiling_front
    label: Select Orientation Ceiling Front
    kind: action
    params: []
    bytes: "BE EF 03 19 00 E0 C9 01 51 02 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_orientation_desktop_rear
    label: Select Orientation Desktop Rear
    kind: action
    params: []
    bytes: "BE EF 03 19 00 70 08 01 51 02 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_orientation_rear_ceiling
    label: Select Orientation Rear Ceiling
    kind: action
    params: []
    bytes: "BE EF 03 19 00 81 48 01 51 02 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_search_picture_off
    label: Select Search Picture Off
    kind: action
    params: []
    bytes: "BE EF 03 19 00 FC 1E 01 A6 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_search_picture_logo
    label: Select Search Picture Logo
    kind: action
    params: []
    bytes: "BE EF 03 19 00 6C DF 01 A6 02 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_search_picture_blue
    label: Select Search Picture Blue
    kind: action
    params: []
    bytes: "BE EF 03 19 00 9D 9F 01 A6 02 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_search_picture_white
    label: Select Search Picture White
    kind: action
    params: []
    bytes: "BE EF 03 19 00 0D 5E 01 A6 02 00 00 00 00 03 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_color_temp_custom
    label: Select Color Temperature Custom
    kind: action
    params: []
    bytes: "BE EF 03 19 00 96 20 01 07 44 00 00 00 00 00 00 04 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_color_temp_6500
    label: Select Color Temperature 6500K
    kind: action
    params: []
    bytes: "BE EF 03 19 00 34 A3 01 07 44 00 00 00 00 00 00 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_color_temp_7300
    label: Select Color Temperature 7300K
    kind: action
    params: []
    bytes: "BE EF 03 19 00 C5 E3 01 07 44 00 00 00 00 00 00 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: select_color_temp_9300
    label: Select Color Temperature 9300K
    kind: action
    params: []
    bytes: "BE EF 03 19 00 55 22 01 07 44 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: brightness_increment
    label: Brightness Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 C1 C9 03 03 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: brightness_decrement
    label: Brightness Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 AF 63 04 03 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: contrast_increment
    label: Contrast Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 EB 5F 03 04 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: contrast_decrement
    label: Contrast Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 85 F5 04 04 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: vertical_keystone_increment
    label: Vertical Keystone Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 94 75 03 1C 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: vertical_keystone_decrement
    label: Vertical Keystone Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 FA DF 04 1C 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: horizontal_keystone_increment
    label: Horizontal Keystone Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 8A 44 03 21 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: horizontal_keystone_decrement
    label: Horizontal Keystone Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 E4 EE 04 21 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: color_saturation_increment
    label: Color Saturation Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 01 B8 03 0C 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: color_saturation_decrement
    label: Color Saturation Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 6F 12 04 0C 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: volume_increment
    label: Volume Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 77 E0 03 66 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: volume_decrement
    label: Volume Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 19 4A 04 66 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: horizontal_position_increment
    label: Horizontal Position Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 6B 01 03 0E 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: horizontal_position_decrement
    label: Horizontal Position Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 05 AB 04 0E 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: vertical_position_increment
    label: Vertical Position Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 FE 5C 03 0F 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: vertical_position_decrement
    label: Vertical Position Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 90 F6 04 0F 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: hue_increment
    label: Hue Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 2B 2E 03 0B 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: hue_decrement
    label: Hue Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 45 84 04 0B 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: sharpness_increment
    label: Sharpness Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 94 E5 03 0D 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: sharpness_decrement
    label: Sharpness Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 FA 4F 04 0D 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: phase_increment
    label: Phase Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 AB E0 03 10 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: phase_decrement
    label: Phase Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 C5 4A 04 10 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: frequency_increment
    label: Frequency Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 7E 92 03 14 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: frequency_decrement
    label: Frequency Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 10 38 04 14 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: treble_increment
    label: Audio Treble Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 E2 BD 03 67 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: treble_decrement
    label: Audio Treble Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 8C 17 04 67 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: bass_increment
    label: Audio Bass Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 22 CC 03 68 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: bass_decrement
    label: Audio Bass Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 4C 66 04 68 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: red_brightness_increment
    label: Red Brightness Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 7E 02 03 05 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: red_brightness_decrement
    label: Red Brightness Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 10 A8 04 05 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: red_contrast_increment
    label: Red Contrast Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 81 E6 03 06 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: red_contrast_decrement
    label: Red Contrast Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 EF 4C 04 06 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: green_brightness_increment
    label: Green Brightness Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 14 BB 03 07 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: green_brightness_decrement
    label: Green Brightness Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 7A 11 04 07 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: green_contrast_increment
    label: Green Contrast Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 D4 CA 03 08 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: green_contrast_decrement
    label: Green Contrast Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 BA 60 04 08 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: blue_brightness_increment
    label: Blue Brightness Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 41 97 03 09 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: blue_brightness_decrement
    label: Blue Brightness Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 2F 3D 04 09 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: blue_contrast_increment
    label: Blue Contrast Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 BE 73 03 0A 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: blue_contrast_decrement
    label: Blue Contrast Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 D0 D9 04 0A 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: red_temp_increment
    label: Red Color Temperature Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 14 2B 03 16 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: red_temp_decrement
    label: Red Color Temperature Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 7A 81 04 16 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: green_temp_increment
    label: Green Color Temperature Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 81 76 03 17 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: green_temp_decrement
    label: Green Color Temperature Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 EF DC 04 17 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: blue_temp_increment
    label: Blue Color Temperature Increment
    kind: action
    params: []
    bytes: "BE EF 03 19 00 41 07 03 18 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: blue_temp_decrement
    label: Blue Color Temperature Decrement
    kind: action
    params: []
    bytes: "BE EF 03 19 00 2F AD 04 18 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"

  - id: auto_adjust
    label: Auto Adjust
    kind: action
    params: []
    bytes: "BE EF 03 19 00 2F AE 05 03 42 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    type: enum
    values: [on, off]
    get_bytes: "BE EF 03 19 00 C9 EB 02 9C 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
    response_value_bytes: [17, 18]

  - id: lamp_ignition_state
    label: Lamp Ignition State
    type: enum
    values:
      - value: 0
        label: Lamp does not ignite
      - value: 1
        label: Lamp is warming up
      - value: 2
        label: Lamp ignited
      - value: 3
        label: Lamp is off
      - value: 4
        label: Lamp is cooling down
    get_bytes: "BE EF 03 19 00 62 93 02 A2 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
    response_value_bytes: [17, 18]

  - id: lamp_on_state
    label: Lamp On State
    type: enum
    values:
      - value: 0
        label: Lamp is not lit
      - value: 1
        label: Lamp is lit
    get_bytes: "BE EF 03 19 00 07 7F 02 00 04 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
    response_value_bytes: [17, 18]

  - id: source
    label: Current Source
    type: enum
    values:
      - value: 0
        label: VGA1
      - value: 1
        label: VGA2
      - value: 2
        label: DVI
      - value: 3
        label: Component
      - value: 4
        label: S-Video
      - value: 5
        label: Composite Video
      - value: 6
        label: Component HD
    get_bytes: "BE EF 03 19 00 A1 16 02 01 44 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
    response_value_bytes: [17, 18]

  - id: orientation
    label: Current Orientation
    type: enum
    values:
      - value: 0
        label: Desktop Front
      - value: 1
        label: Rear Ceiling
      - value: 2
        label: Desktop Rear
      - value: 3
        label: Ceiling Front
    get_bytes: "BE EF 03 19 00 5A 76 02 51 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
    response_value_bytes: [17, 18]

  - id: brightness
    label: Brightness
    type: integer
    get_bytes: "BE EF 03 19 00 38 9D 02 03 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
    response_value_bytes: [17, 18]

  - id: contrast
    label: Contrast
    type: integer
    get_bytes: "BE EF 03 19 00 12 0B 02 04 40 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
    response_value_bytes: [17, 18]

  - id: thermal_monitor
    label: Thermal Monitor State
    type: enum
    values:
      - value: 0
        label: OK
      - value: 1
        label: Temperature too high
      - value: 2
        label: Temperature warning
      - value: 3
        label: Fan 70x70 stopped
      - value: 4
        label: Fan 60x60 stopped
      - value: 5
        label: Fan Blower stopped
    get_bytes: "BE EF 03 19 00 DC E8 02 97 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
    response_value_bytes: [17, 18]

  - id: light_on_time_hours
    label: Light On Time Hours
    type: integer
    get_bytes: "BE EF 03 19 00 2D F2 02 04 10 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
    response_value_bytes: [17, 18]

  - id: light_on_time_minutes
    label: Light On Time Minutes
    type: integer
    get_bytes: "BE EF 03 19 00 B8 AF 02 05 10 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
    response_value_bytes: [17, 18]

  - id: unit_on_time_hours
    label: Unit On Time Hours
    type: integer
    get_bytes: "BE EF 03 19 00 92 39 02 02 10 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
    response_value_bytes: [17, 18]

  - id: software_version
    label: Software Version
    type: integer
    get_bytes: "BE EF 03 19 00 08 2A 02 A0 02 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00"
    response_value_bytes: [17, 18]
```

## Variables
```yaml
# UNRESOLVED: source documents increment/decrement operations but does not state min/max ranges
# for brightness, contrast, keystone, color saturation, volume, position, hue, sharpness, phase,
# frequency, treble, bass, or RGB brightness/contrast. SET with explicit value uses operation bytes
# 17-18 but the range is not documented.
```

## Events
```yaml
# No unsolicited notifications documented. Device only responds to SET/GET/INCREMENT/DECREMENT/EXECUTE.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe power-on sequencing requirements, thermal shutdown behavior,
# or lamp cooldown interlock procedures. Lamp states (warming up, cooling down) suggest thermal
# management exists but details not documented.
```

## Notes

Binary RS-232 protocol. 32-byte packets: 7-byte header (bytes 1-7) + 11-byte payload (bytes 8-18) + 14-byte zero padding (bytes 19-32). Header preamble always `0xBE 0xEF 0x03 0x06 0x00` (bytes 1-5), followed by CRC-16 low/high (bytes 6-7). CRC calculated over entire 32-byte packet with CRC bytes initialized to zero. CRC lookup tables provided in Appendix B.

Operation type (byte 8): SET=1, GET=2, INCREMENT=3, DECREMENT=4, EXECUTE=5. Operation ID in bytes 9-10 (little-endian WORD). Operation value in bytes 17-18 (little-endian WORD) for SET; response value in bytes 17-18 for GET responses.

Response packet: 33 bytes — PAK byte (0x1E) followed by the original 32-byte packet. For GET responses, requested value in bytes 17-18 of the echoed packet. For INCREMENT/DECREMENT responses, byte 11 carries validation code 0x01.

Custom color temperature adjustments require selecting "Custom color temp" first (Appendix E). Sub-brightness and sub-contrast apply only to analog RGB (VGA) sources.

<!-- UNRESOLVED: min/max value ranges for all adjustable parameters not stated -->
<!-- UNRESOLVED: power-on/warm-up delay before accepting commands not documented -->
<!-- UNRESOLVED: error recovery or NAK response format not documented -->
<!-- UNRESOLVED: whether protocol version applies across firmware revisions -->

## Provenance

```yaml
source_domains:
  - agneovo.com
  - projector-database.com
source_urls:
  - https://www.agneovo.com/wp-content/uploads/2021/09/TBX-2201_RS232_CommandList.pdf
  - https://www.projector-database.com/pdf/DigitalProjectioniVisionSXHC-rs232c.pdf
retrieved_at: 2026-05-19T04:31:40.666Z
last_checked_at: 2026-05-19T17:04:12.741Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-19T17:04:12.741Z
matched_actions: 86
action_count: 86
confidence: high
summary: "All 86 spec actions match wire-literal byte sequences in source tables; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
