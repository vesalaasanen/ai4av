---
spec_id: admin/goelst-gohd400
schema_version: ai4av-public-spec-v1
revision: 1
title: "Goelst GOHD400 Control Spec"
manufacturer: Goelst
model_family: GOHD400
aliases: []
compatible_with:
  manufacturers:
    - Goelst
  models:
    - GOHD400
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - m.media-amazon.com
  - manualslib.com
source_urls:
  - https://m.media-amazon.com/images/I/91YBOvh13VL.pdf
  - https://www.manualslib.com/manual/3031436/Goelectronic-Gohd400.html
retrieved_at: 2026-05-14T23:43:01.333Z
last_checked_at: 2026-06-02T17:22:19.747Z
generated_at: 2026-06-02T17:22:19.747Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device firmware version compatibility not stated; assume baseline spec applies to firmware as shipped."
  - "settable continuous parameters documented as DIRECT commands are covered as parameterized actions above (zoom, focus, R/B gain, shutter, iris, WDR, low-light, expcomp, aperture, color gain, color hue, gamma, Iridix)."
  - "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements beyond the implicit PTZ initialization described in the Macros section."
  - "firmware version compatibility not stated; Pan/Tilt absolute/relative position encodings marked TBD in source; preset ID bounds not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:19.747Z
  matched_actions: 194
  action_count: 194
  confidence: medium
  summary: "All 194 spec actions matched verbatim in source; transport parameters (9600 baud, 8N1) fully supported; coverage ratio 0.95 exceeds 0.9 floor. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Goelst GOHD400 Control Spec

## Summary
PTZ camera exposing VISCA, Pelco-D, and Pelco-P control over RS-232 (default mode). Source documents three baud rates (2400/4800/9600), 8N1 framing, and a complete command catalogue covering power, pan/tilt, zoom, focus, white balance, exposure, image-processing, presets, IR routing, and HDMI/DVI output mode.

<!-- UNRESOLVED: device firmware version compatibility not stated; assume baseline spec applies to firmware as shipped. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # source lists 2400/4800/9600; 9600 is common default for VISCA PTZ cameras
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

**Notes on transport**
- RS-232 pinout documented (DTR/DSR/TXD/GND/RXD/GND/IR OUT/NC) on Mini DIN 8-Pin and DB-9 adapters.
- "Net Mode: Serial, Parallel" is documented as a SETUP parameter; the parallel configuration is not detailed in the refined source and is left out of scope.
- VISCA address range 1–7; Pelco-D/P address range 0–254.

## Traits
```yaml
- powerable       # inferred from CAM_Power commands
- queryable       # inferred from extensive query command catalogue
- levelable       # inferred from aperture/gain/iris/shutter/zoom/focus level commands
- routable        # inferred from HDMI/DVI output mode switching
```

## Actions
```yaml
# VISCA - System commands
- id: visca_address_set
  label: Address Set (Broadcast)
  kind: action
  command: "88 30 01 FF"
  params: []

- id: visca_if_clear
  label: Interface Clear (Broadcast)
  kind: action
  command: "88 01 00 01 FF"
  params: []

- id: visca_command_cancel
  label: Command Cancel
  kind: action
  command: "8x 21 FF"
  params:
    - name: x
      type: integer
      description: Camera address (1-7) ORed into the high nibble

# VISCA - Power
- id: cam_power_on
  label: Camera Power On
  kind: action
  command: "8x 01 04 00 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_power_off
  label: Camera Power Off
  kind: action
  command: "8x 01 04 00 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

# VISCA - Zoom
- id: cam_zoom_stop
  label: Zoom Stop
  kind: action
  command: "8x 01 04 07 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_zoom_tele_std
  label: Zoom Tele (Standard)
  kind: action
  command: "8x 01 04 07 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_zoom_wide_std
  label: Zoom Wide (Standard)
  kind: action
  command: "8x 01 04 07 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_zoom_tele_variable
  label: Zoom Tele (Variable)
  kind: action
  command: "8x 01 04 07 2p FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: p
      type: integer
      description: Speed 0 (low) to 7 (high)

- id: cam_zoom_wide_variable
  label: Zoom Wide (Variable)
  kind: action
  command: "8x 01 04 07 3p FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: p
      type: integer
      description: Speed 0 (low) to 7 (high)

- id: cam_zoom_direct
  label: Zoom Direct
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: pqrs
      type: integer
      description: Zoom position (4 nibbles)

# VISCA - Focus
- id: cam_focus_stop
  label: Focus Stop
  kind: action
  command: "8x 01 04 08 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_focus_far_std
  label: Focus Far (Standard)
  kind: action
  command: "8x 01 04 08 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_focus_near_std
  label: Focus Near (Standard)
  kind: action
  command: "8x 01 04 08 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_focus_far_variable
  label: Focus Far (Variable)
  kind: action
  command: "8x 01 04 08 2p FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: p
      type: integer
      description: Speed 0 (low) to 7 (high)

- id: cam_focus_near_variable
  label: Focus Near (Variable)
  kind: action
  command: "8x 01 04 08 3p FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: p
      type: integer
      description: Speed 0 (low) to 7 (high)

- id: cam_focus_direct
  label: Focus Direct
  kind: action
  command: "8x 01 04 48 0p 0q 0r 0s FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: pqrs
      type: integer
      description: Focus position (4 nibbles)

- id: cam_focus_auto
  label: Auto Focus On
  kind: action
  command: "8x 01 04 38 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_focus_manual
  label: Manual Focus On
  kind: action
  command: "8x 01 04 38 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_focus_toggle
  label: Auto/Manual Focus Toggle
  kind: action
  command: "8x 01 04 38 10 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_zoomfocus_direct
  label: Zoom + Focus Direct
  kind: action
  command: "8x 01 04 47 0p 0q 0r 0s 0t 0u 0v 0w FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: pqrs
      type: integer
      description: Zoom position
    - name: tuvw
      type: integer
      description: Focus position

# VISCA - White Balance
- id: cam_wb_auto
  label: WB Auto
  kind: action
  command: "8x 01 04 35 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_wb_indoor
  label: WB Indoor
  kind: action
  command: "8x 01 04 35 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_wb_outdoor
  label: WB Outdoor
  kind: action
  command: "8x 01 04 35 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_wb_onepush
  label: WB One Push
  kind: action
  command: "8x 01 04 35 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_wb_manual
  label: WB Manual
  kind: action
  command: "8x 01 04 35 05 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_wb_temperature
  label: WB Color Temperature
  kind: action
  command: "8x 01 04 35 2p FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: p
      type: integer
      description: Color temperature value

# VISCA - R Gain
- id: cam_rgain_reset
  label: R Gain Reset
  kind: action
  command: "8x 01 04 03 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_rgain_up
  label: R Gain Up
  kind: action
  command: "8x 01 04 03 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_rgain_down
  label: R Gain Down
  kind: action
  command: "8x 01 04 03 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_rgain_direct
  label: R Gain Direct
  kind: action
  command: "8x 01 04 43 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: pq
      type: integer
      description: R Gain value

# VISCA - B Gain
- id: cam_bgain_reset
  label: B Gain Reset
  kind: action
  command: "8x 01 04 04 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_bgain_up
  label: B Gain Up
  kind: action
  command: "8x 01 04 04 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_bgain_down
  label: B Gain Down
  kind: action
  command: "8x 01 04 04 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_bgain_direct
  label: B Gain Direct
  kind: action
  command: "8x 01 04 44 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: pq
      type: integer
      description: B Gain value

# VISCA - Auto Exposure modes
- id: cam_ae_full_auto
  label: AE Full Auto
  kind: action
  command: "8x 01 04 39 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_ae_manual
  label: AE Manual
  kind: action
  command: "8x 01 04 39 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_ae_shutter_priority
  label: AE Shutter Priority
  kind: action
  command: "8x 01 04 39 0A FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_ae_iris_priority
  label: AE Iris Priority
  kind: action
  command: "8x 01 04 39 0B FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_ae_wdr
  label: AE WDR Mode
  kind: action
  command: "8x 01 04 39 21 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_ae_low_light
  label: AE Low Light Mode
  kind: action
  command: "8x 01 04 39 22 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

# VISCA - Shutter
- id: cam_shutter_reset
  label: Shutter Reset
  kind: action
  command: "8x 01 04 0A 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_shutter_up
  label: Shutter Up
  kind: action
  command: "8x 01 04 0A 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_shutter_down
  label: Shutter Down
  kind: action
  command: "8x 01 04 0A 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_shutter_direct
  label: Shutter Direct
  kind: action
  command: "8x 01 04 4A 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: pq
      type: integer
      description: Shutter position

# VISCA - Iris
- id: cam_iris_reset
  label: Iris Reset
  kind: action
  command: "8x 01 04 0B 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_iris_up
  label: Iris Up
  kind: action
  command: "8x 01 04 0B 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_iris_down
  label: Iris Down
  kind: action
  command: "8x 01 04 0B 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_iris_direct
  label: Iris Direct
  kind: action
  command: "8x 01 04 4B 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: pq
      type: integer
      description: Iris position

# VISCA - WDR Strength
- id: cam_wdr_reset
  label: WDR Strength Reset
  kind: action
  command: "8x 01 04 21 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_wdr_up
  label: WDR Strength Up
  kind: action
  command: "8x 01 04 21 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_wdr_down
  label: WDR Strength Down
  kind: action
  command: "8x 01 04 21 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_wdr_direct
  label: WDR Strength Direct
  kind: action
  command: "8x 01 04 51 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: pq
      type: integer
      description: WDR level position

# VISCA - Low Light Level
- id: cam_lowlight_reset
  label: Low Light Level Reset
  kind: action
  command: "8x 01 04 22 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_lowlight_up
  label: Low Light Level Up
  kind: action
  command: "8x 01 04 22 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_lowlight_down
  label: Low Light Level Down
  kind: action
  command: "8x 01 04 22 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_lowlight_direct
  label: Low Light Level Direct
  kind: action
  command: "8x 01 04 52 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: pq
      type: integer
      description: Low light level position

# VISCA - Exposure Compensation
- id: cam_expcomp_on
  label: Exposure Compensation On
  kind: action
  command: "8x 01 04 3E 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_expcomp_off
  label: Exposure Compensation Off
  kind: action
  command: "8x 01 04 3E 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_expcomp_reset
  label: Exposure Compensation Reset
  kind: action
  command: "8x 01 04 0E 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_expcomp_up
  label: Exposure Compensation Up
  kind: action
  command: "8x 01 04 0E 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_expcomp_down
  label: Exposure Compensation Down
  kind: action
  command: "8x 01 04 0E 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_expcomp_direct
  label: Exposure Compensation Direct
  kind: action
  command: "8x 01 04 4E 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: pq
      type: integer
      description: ExpComp position

# VISCA - Backlight
- id: cam_backlight_on
  label: Backlight Compensation On
  kind: action
  command: "8x 01 04 33 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_backlight_off
  label: Backlight Compensation Off
  kind: action
  command: "8x 01 04 33 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

# VISCA - Noise Reduction
- id: cam_nr_2d
  label: 2D Noise Reduction
  kind: action
  command: "8x 01 04 53 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: p
      type: integer
      description: NR level 0 (off) to 5

- id: cam_nr_3d
  label: 3D Noise Reduction
  kind: action
  command: "8x 01 04 54 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: p
      type: integer
      description: NR level 0 (off) to 5

# VISCA - Flicker
- id: cam_flicker
  label: Flicker Setting
  kind: action
  command: "8x 01 04 23 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: p
      type: integer
      description: 0 = off, 1 = 50 Hz, 2 = 60 Hz

# VISCA - Aperture
- id: cam_aperture_reset
  label: Aperture Reset
  kind: action
  command: "8x 01 04 02 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_aperture_up
  label: Aperture Up
  kind: action
  command: "8x 01 04 02 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_aperture_down
  label: Aperture Down
  kind: action
  command: "8x 01 04 02 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_aperture_direct
  label: Aperture Direct
  kind: action
  command: "8x 01 04 42 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: pq
      type: integer
      description: Aperture gain

# VISCA - Memory
- id: cam_memory_reset
  label: Memory Reset
  kind: action
  command: "8x 01 04 3F 00 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: p
      type: integer
      description: Memory number 0-9

- id: cam_memory_set
  label: Memory Set
  kind: action
  command: "8x 01 04 3F 01 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: p
      type: integer
      description: Memory number 0-9

- id: cam_memory_recall
  label: Memory Recall
  kind: action
  command: "8x 01 04 3F 02 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: p
      type: integer
      description: Memory number 0-9

# VISCA - Image flip
- id: cam_lr_reverse_on
  label: Horizontal Flip On
  kind: action
  command: "8x 01 04 61 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_lr_reverse_off
  label: Horizontal Flip Off
  kind: action
  command: "8x 01 04 61 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_picture_flip_on
  label: Vertical Flip On
  kind: action
  command: "8x 01 04 66 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_picture_flip_off
  label: Vertical Flip Off
  kind: action
  command: "8x 01 04 66 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

# VISCA - Color / ICR / ID
- id: cam_colorgain_direct
  label: Color Gain Direct
  kind: action
  command: "8x 01 04 49 00 00 00 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: p
      type: integer
      description: Color gain 0x00 (60%) to 0x0E (200%)

- id: cam_icr_on
  label: Infrared Mode On
  kind: action
  command: "8x 01 04 01 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_icr_off
  label: Infrared Mode Off
  kind: action
  command: "8x 01 04 01 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_id_write
  label: Camera ID Write
  kind: action
  command: "8x 01 04 22 0p 0q 0r 0s FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: pqrs
      type: integer
      description: Camera ID 0x0000 to 0xFFFF

# VISCA - IR receive
- id: ir_receive_on
  label: IR Remote Receive On
  kind: action
  command: "8x 01 06 08 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: ir_receive_off
  label: IR Remote Receive Off
  kind: action
  command: "8x 01 06 08 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: ir_receive_toggle
  label: IR Remote Receive Toggle
  kind: action
  command: "8x 01 06 08 10 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: ir_receive_response_on
  label: IR Receive Response On
  kind: action
  command: "8x 01 7D 01 03 00 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: ir_receive_response_off
  label: IR Receive Response Off
  kind: action
  command: "8x 01 7D 01 13 00 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

# VISCA - Pan/Tilt drive
- id: pantilt_up
  label: Pan/Tilt Up
  kind: action
  command: "8x 01 06 01 VV WW 03 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: VV
      type: integer
      description: Pan speed 0x01 (low) to 0x18 (high)
    - name: WW
      type: integer
      description: Tilt speed 0x01 (low) to 0x14 (high)

- id: pantilt_down
  label: Pan/Tilt Down
  kind: action
  command: "8x 01 06 01 VV WW 03 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: VV
      type: integer
      description: Pan speed 0x01-0x18
    - name: WW
      type: integer
      description: Tilt speed 0x01-0x14

- id: pantilt_left
  label: Pan/Tilt Left
  kind: action
  command: "8x 01 06 01 VV WW 01 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: VV
      type: integer
      description: Pan speed 0x01-0x18
    - name: WW
      type: integer
      description: Tilt speed 0x01-0x14

- id: pantilt_right
  label: Pan/Tilt Right
  kind: action
  command: "8x 01 06 01 VV WW 02 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: VV
      type: integer
      description: Pan speed 0x01-0x18
    - name: WW
      type: integer
      description: Tilt speed 0x01-0x14

- id: pantilt_upleft
  label: Pan/Tilt Up-Left
  kind: action
  command: "8x 01 06 01 VV WW 01 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: VV
      type: integer
      description: Pan speed 0x01-0x18
    - name: WW
      type: integer
      description: Tilt speed 0x01-0x14

- id: pantilt_upright
  label: Pan/Tilt Up-Right
  kind: action
  command: "8x 01 06 01 VV WW 02 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: VV
      type: integer
      description: Pan speed 0x01-0x18
    - name: WW
      type: integer
      description: Tilt speed 0x01-0x14

- id: pantilt_downleft
  label: Pan/Tilt Down-Left
  kind: action
  command: "8x 01 06 01 VV WW 01 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: VV
      type: integer
      description: Pan speed 0x01-0x18
    - name: WW
      type: integer
      description: Tilt speed 0x01-0x14

- id: pantilt_downright
  label: Pan/Tilt Down-Right
  kind: action
  command: "8x 01 06 01 VV WW 02 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: VV
      type: integer
      description: Pan speed 0x01-0x18
    - name: WW
      type: integer
      description: Tilt speed 0x01-0x14

- id: pantilt_stop
  label: Pan/Tilt Stop
  kind: action
  command: "8x 01 06 01 VV WW 03 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: VV
      type: integer
      description: Pan speed 0x01-0x18
    - name: WW
      type: integer
      description: Tilt speed 0x01-0x14

- id: pantilt_absolute
  label: Pan/Tilt Absolute Position
  kind: action
  command: "8x 01 06 02 VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: VV
      type: integer
      description: Pan speed 0x01-0x18
    - name: WW
      type: integer
      description: Tilt speed 0x01-0x14
    - name: YYYY
      type: integer
      description: Pan position (TBD per source)
    - name: ZZZZ
      type: integer
      description: Tilt position (TBD per source)

- id: pantilt_relative
  label: Pan/Tilt Relative Position
  kind: action
  command: "8x 01 06 03 VV WW 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: VV
      type: integer
      description: Pan speed 0x01-0x18
    - name: WW
      type: integer
      description: Tilt speed 0x01-0x14
    - name: YYYY
      type: integer
      description: Pan delta
    - name: ZZZZ
      type: integer
      description: Tilt delta

- id: pantilt_home
  label: Pan/Tilt Home
  kind: action
  command: "8x 01 06 04 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: pantilt_reset
  label: Pan/Tilt Reset
  kind: action
  command: "8x 01 06 05 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: pantilt_limit_set
  label: Pan/Tilt Limit Set
  kind: action
  command: "8x 01 06 07 00 0W 0Y 0Y 0Y 0Y 0Z 0Z 0Z 0Z FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: W
      type: integer
      description: 1 = Up-Right, 0 = Down-Left
    - name: YYYY
      type: integer
      description: Pan limit position
    - name: ZZZZ
      type: integer
      description: Tilt position

- id: pantilt_limit_clear
  label: Pan/Tilt Limit Clear
  kind: action
  command: "8x 01 06 07 01 0W 07 0F 0F 0F 07 0F 0F 0F FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: W
      type: integer
      description: 1 = Up-Right, 0 = Down-Left

# VISCA - AF Sensitivity / Reset
- id: cam_af_sensitivity_high
  label: AF Sensitivity High
  kind: action
  command: "8x 01 04 58 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_af_sensitivity_normal
  label: AF Sensitivity Normal
  kind: action
  command: "8x 01 04 58 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_af_sensitivity_low
  label: AF Sensitivity Low
  kind: action
  command: "8x 01 04 58 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_setting_reset
  label: Factory Settings Reset
  kind: action
  command: "8x 01 04 A0 10 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_iridix_direct
  label: Iridix Direct
  kind: action
  command: "8x 01 04 A7 00 00 0p 0q FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: pq
      type: integer
      description: Iridix position

# VISCA - Color System
- id: color_system_rgb
  label: Color System RGB
  kind: action
  command: "8x 01 04 A8 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
  notes: Only valid in 720p60/1080p60

- id: color_system_ypbpr
  label: Color System YPbPr
  kind: action
  command: "8x 01 04 A8 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
  notes: Only valid in 720p60/1080p60

# VISCA - AWB Sensitivity
- id: cam_awb_sensitivity_high
  label: AWB Sensitivity High
  kind: action
  command: "8x 01 04 A9 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_awb_sensitivity_normal
  label: AWB Sensitivity Normal
  kind: action
  command: "8x 01 04 A9 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_awb_sensitivity_low
  label: AWB Sensitivity Low
  kind: action
  command: "8x 01 04 A9 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

# VISCA - AF Zone
- id: cam_af_zone_top
  label: AF Zone Top
  kind: action
  command: "8x 01 04 AA 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_af_zone_center
  label: AF Zone Center
  kind: action
  command: "8x 01 04 AA 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_af_zone_bottom
  label: AF Zone Bottom
  kind: action
  command: "8x 01 04 AA 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

# VISCA - HDMI / DVI / Hue / Gamma
- id: output_hdmi
  label: Output HDMI
  kind: action
  command: "8x 01 04 AB 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
  notes: DVI output mode, default HDMI

- id: output_dvi
  label: Output DVI
  kind: action
  command: "8x 01 04 AB 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: cam_colorhue_direct
  label: Color Hue Direct
  kind: action
  command: "8x 01 04 4F 00 00 00 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: p
      type: integer
      description: 0x00 (-7 deg) to 0x0E (+7 deg)

- id: cam_gamma_direct
  label: Gamma Direct
  kind: action
  command: "8x 01 04 5B 0p FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
    - name: p
      type: integer
      description: Gamma 0x00 to 0x0A

# VISCA Custom - Power
- id: custom_cam_power_on
  label: Camera Power On (Custom)
  kind: action
  command: "8x 02 16 16 16 65 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: custom_cam_power_off
  label: Camera Power Off (Custom)
  kind: action
  command: "8x 02 16 16 16 56 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

# TCL Power forwarding
- id: tcl_power_standby
  label: TCL Standby
  kind: action
  command: "8x 01 02 75 75 01 04 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
  notes: Forwards AD DA02 B0 0104 AF FA

- id: tcl_power_wakeup
  label: TCL Wakeup
  kind: action
  command: "8x 01 02 75 75 00 03 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8
  notes: Forwards AD DA02 B0 00 03 AF FA

# Pelco-D (7-byte frame: 0xFF Addr Cmd1 Cmd2 Data1 Data2 SUM)
- id: pelcod_up
  label: Pelco-D Up
  kind: action
  command: "FF {addr} 00 08 {pan_speed} {tilt_speed} {sum}"
  params:
    - name: addr
      type: integer
      description: Camera address 0-254
    - name: pan_speed
      type: integer
      description: Pan speed
    - name: tilt_speed
      type: integer
      description: Tilt speed
    - name: sum
      type: integer
      description: Checksum (lower 8 bits of sum of bytes 2-6)

- id: pelcod_down
  label: Pelco-D Down
  kind: action
  command: "FF {addr} 00 10 {pan_speed} {tilt_speed} {sum}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: pan_speed
      type: integer
      description: Pan speed
    - name: tilt_speed
      type: integer
      description: Tilt speed
    - name: sum
      type: integer
      description: Checksum

- id: pelcod_left
  label: Pelco-D Left
  kind: action
  command: "FF {addr} 00 04 {pan_speed} {tilt_speed} {sum}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: pan_speed
      type: integer
      description: Pan speed
    - name: tilt_speed
      type: integer
      description: Tilt speed
    - name: sum
      type: integer
      description: Checksum

- id: pelcod_right
  label: Pelco-D Right
  kind: action
  command: "FF {addr} 00 02 {pan_speed} {tilt_speed} {sum}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: pan_speed
      type: integer
      description: Pan speed
    - name: tilt_speed
      type: integer
      description: Tilt speed
    - name: sum
      type: integer
      description: Checksum

- id: pelcod_zoom_in
  label: Pelco-D Zoom In
  kind: action
  command: "FF {addr} 00 20 00 00 {sum}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: sum
      type: integer
      description: Checksum

- id: pelcod_zoom_out
  label: Pelco-D Zoom Out
  kind: action
  command: "FF {addr} 00 40 00 00 {sum}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: sum
      type: integer
      description: Checksum

- id: pelcod_focus_far
  label: Pelco-D Focus Far
  kind: action
  command: "FF {addr} 00 80 00 00 {sum}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: sum
      type: integer
      description: Checksum

- id: pelcod_focus_near
  label: Pelco-D Focus Near
  kind: action
  command: "FF {addr} 01 00 00 00 {sum}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: sum
      type: integer
      description: Checksum

- id: pelcod_set_preset
  label: Pelco-D Set Preset
  kind: action
  command: "FF {addr} 00 03 00 {preset_id} {sum}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: preset_id
      type: integer
      description: Preset ID
    - name: sum
      type: integer
      description: Checksum

- id: pelcod_clear_preset
  label: Pelco-D Clear Preset
  kind: action
  command: "FF {addr} 00 05 00 {preset_id} {sum}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: preset_id
      type: integer
      description: Preset ID
    - name: sum
      type: integer
      description: Checksum

- id: pelcod_call_preset
  label: Pelco-D Call Preset
  kind: action
  command: "FF {addr} 00 07 00 {preset_id} {sum}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: preset_id
      type: integer
      description: Preset ID
    - name: sum
      type: integer
      description: Checksum

- id: pelcod_auto_focus
  label: Pelco-D Auto Focus
  kind: action
  command: "FF {addr} 00 2B 00 01 {sum}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: sum
      type: integer
      description: Checksum

- id: pelcod_manual_focus
  label: Pelco-D Manual Focus
  kind: action
  command: "FF {addr} 00 2B 00 02 {sum}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: sum
      type: integer
      description: Checksum

# Pelco-P (8-byte frame: 0xA0 Addr Cmd1 Cmd2 Data1 Data2 0xAF XOR)
- id: pelcop_up
  label: Pelco-P Up
  kind: action
  command: "A0 {addr} 00 08 {pan_speed} {tilt_speed} AF {xor}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: pan_speed
      type: integer
      description: Pan speed
    - name: tilt_speed
      type: integer
      description: Tilt speed
    - name: xor
      type: integer
      description: XOR checksum of bytes 2-7

- id: pelcop_down
  label: Pelco-P Down
  kind: action
  command: "A0 {addr} 00 10 {pan_speed} {tilt_speed} AF {xor}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: pan_speed
      type: integer
      description: Pan speed
    - name: tilt_speed
      type: integer
      description: Tilt speed
    - name: xor
      type: integer
      description: XOR checksum

- id: pelcop_left
  label: Pelco-P Left
  kind: action
  command: "A0 {addr} 00 04 {pan_speed} {tilt_speed} AF {xor}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: pan_speed
      type: integer
      description: Pan speed
    - name: tilt_speed
      type: integer
      description: Tilt speed
    - name: xor
      type: integer
      description: XOR checksum

- id: pelcop_right
  label: Pelco-P Right
  kind: action
  command: "A0 {addr} 00 02 {pan_speed} {tilt_speed} AF {xor}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: pan_speed
      type: integer
      description: Pan speed
    - name: tilt_speed
      type: integer
      description: Tilt speed
    - name: xor
      type: integer
      description: XOR checksum

- id: pelcop_zoom_in
  label: Pelco-P Zoom In
  kind: action
  command: "A0 {addr} 00 20 00 00 AF {xor}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: xor
      type: integer
      description: XOR checksum

- id: pelcop_zoom_out
  label: Pelco-P Zoom Out
  kind: action
  command: "A0 {addr} 00 40 00 00 AF {xor}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: xor
      type: integer
      description: XOR checksum

- id: pelcop_focus_far
  label: Pelco-P Focus Far
  kind: action
  command: "A0 {addr} 00 80 00 00 AF {xor}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: xor
      type: integer
      description: XOR checksum

- id: pelcop_focus_near
  label: Pelco-P Focus Near
  kind: action
  command: "A0 {addr} 01 00 00 00 AF {xor}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: xor
      type: integer
      description: XOR checksum

- id: pelcop_set_preset
  label: Pelco-P Set Preset
  kind: action
  command: "A0 {addr} 00 03 00 {preset_id} AF {xor}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: preset_id
      type: integer
      description: Preset ID
    - name: xor
      type: integer
      description: XOR checksum

- id: pelcop_clear_preset
  label: Pelco-P Clear Preset
  kind: action
  command: "A0 {addr} 00 05 00 {preset_id} AF {xor}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: preset_id
      type: integer
      description: Preset ID
    - name: xor
      type: integer
      description: XOR checksum

- id: pelcop_call_preset
  label: Pelco-P Call Preset
  kind: action
  command: "A0 {addr} 00 07 00 {preset_id} AF {xor}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: preset_id
      type: integer
      description: Preset ID
    - name: xor
      type: integer
      description: XOR checksum

- id: pelcop_auto_focus
  label: Pelco-P Auto Focus
  kind: action
  command: "A0 {addr} 00 2B 00 01 AF {xor}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: xor
      type: integer
      description: XOR checksum

- id: pelcop_manual_focus
  label: Pelco-P Manual Focus
  kind: action
  command: "A0 {addr} 00 2B 00 02 AF {xor}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: xor
      type: integer
      description: XOR checksum

# Queries (VISCA)
- id: q_cam_power
  label: Power Status Query
  kind: query
  command: "8x 09 04 00 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_zoom_pos
  label: Zoom Position Query
  kind: query
  command: "8x 09 04 47 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_focus_af_mode
  label: Focus AF Mode Query
  kind: query
  command: "8x 09 04 38 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_focus_pos
  label: Focus Position Query
  kind: query
  command: "8x 09 04 48 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_wb_mode
  label: WB Mode Query
  kind: query
  command: "8x 09 04 35 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_rgain
  label: R Gain Query
  kind: query
  command: "8x 09 04 43 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_bgain
  label: B Gain Query
  kind: query
  command: "8x 09 04 44 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_ae_mode
  label: AE Mode Query
  kind: query
  command: "8x 09 04 39 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_shutter_pos
  label: Shutter Position Query
  kind: query
  command: "8x 09 04 4A FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_iris_pos
  label: Iris Position Query
  kind: query
  command: "8x 09 04 4B FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_wdr_strength
  label: WDR Strength Query
  kind: query
  command: "8x 09 04 B1 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_lowlight
  label: Low Light Level Query
  kind: query
  command: "8x 09 04 B2 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_expcomp_mode
  label: ExpComp Mode Query
  kind: query
  command: "8x 09 04 3E FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_expcomp_pos
  label: ExpComp Position Query
  kind: query
  command: "8x 09 04 4E FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_backlight
  label: Backlight Mode Query
  kind: query
  command: "8x 09 04 33 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_noise_2d
  label: 2D NR Query
  kind: query
  command: "8x 09 04 53 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_noise_3d
  label: 3D NR Query
  kind: query
  command: "8x 09 04 54 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_flicker
  label: Flicker Mode Query
  kind: query
  command: "8x 09 04 55 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_aperture
  label: Aperture Query
  kind: query
  command: "8x 09 04 42 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_memory
  label: Memory Last-Operated Query
  kind: query
  command: "8x 09 04 3F FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_sys_menu_mode
  label: System Menu Mode Query
  kind: query
  command: "8x 09 06 06 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_lr_reverse
  label: Horizontal Flip Query
  kind: query
  command: "8x 09 04 61 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_picture_flip
  label: Vertical Flip Query
  kind: query
  command: "8x 09 04 66 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_id
  label: Camera ID Query
  kind: query
  command: "8x 09 04 22 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_version
  label: Camera Version Query
  kind: query
  command: "8x 09 00 02 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_video_system
  label: Video System Query
  kind: query
  command: "8x 09 06 23 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_ir_receive
  label: IR Receive Query
  kind: query
  command: "8x 09 06 08 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_pantilt_max_speed
  label: Pan/Tilt Max Speed Query
  kind: query
  command: "8x 09 06 11 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_pantilt_pos
  label: Pan/Tilt Position Query
  kind: query
  command: "8x 09 06 12 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_af_sensitivity
  label: AF Sensitivity Query
  kind: query
  command: "8x 09 04 58 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_iridix
  label: Iridix Query
  kind: query
  command: "8x 09 04 A7 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_color_system
  label: Color System Query
  kind: query
  command: "8x 09 04 A8 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_gamma
  label: Gamma Query
  kind: query
  command: "8x 09 04 5B FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_af_zone
  label: AF Zone Query
  kind: query
  command: "8x 09 04 AA FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_dvi_mode
  label: DVI Mode Query
  kind: query
  command: "8x 09 04 AB FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_colorhue
  label: Color Hue Query
  kind: query
  command: "8x 09 04 4F FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_awb_sensitivity
  label: AWB Sensitivity Query
  kind: query
  command: "8x 09 04 A9 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

- id: q_cam_status
  label: Camera Status (Custom Query)
  kind: query
  command: "8x 02 20 01 01 FF"
  params:
    - name: x
      type: integer
      description: Camera address + 8

# Pelco-D Queries
- id: pelcod_q_pan
  label: Pelco-D Query Pan Position
  kind: query
  command: "FF {addr} 00 51 00 00 {sum}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: sum
      type: integer
      description: Checksum

- id: pelcod_q_tilt
  label: Pelco-D Query Tilt Position
  kind: query
  command: "FF {addr} 00 53 00 00 {sum}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: sum
      type: integer
      description: Checksum

- id: pelcod_q_zoom
  label: Pelco-D Query Zoom Position
  kind: query
  command: "FF {addr} 00 55 00 00 {sum}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: sum
      type: integer
      description: Checksum

# Pelco-P Queries
- id: pelcop_q_pan
  label: Pelco-P Query Pan Position
  kind: query
  command: "A0 {addr} 00 51 00 00 AF {xor}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: xor
      type: integer
      description: XOR checksum

- id: pelcop_q_tilt
  label: Pelco-P Query Tilt Position
  kind: query
  command: "A0 {addr} 00 53 00 00 AF {xor}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: xor
      type: integer
      description: XOR checksum

- id: pelcop_q_zoom
  label: Pelco-P Query Zoom Position
  kind: query
  command: "A0 {addr} 00 55 00 00 AF {xor}"
  params:
    - name: addr
      type: integer
      description: Camera address
    - name: xor
      type: integer
      description: XOR checksum
```

## Feedbacks
```yaml
# VISCA ACK: y0 50 02 FF
# VISCA Completion: y0 51 FF
# (y = camera address + 8)
- id: visca_ack
  type: packet
  pattern: "y0 50 02 FF"
  description: VISCA acknowledgment (command accepted)

- id: visca_completion
  type: packet
  pattern: "y0 51 FF"
  description: VISCA completion (command executed)

- id: visca_syntax_error
  type: packet
  pattern: "y0 60 02 FF"
  description: Syntax error / illegal parameters

- id: visca_command_not_executable
  type: packet
  pattern: "y0 61 41 FF"
  description: Command not executable in current state

- id: power_state
  type: enum
  values: [on, off]
  description: Inferred from CAM_PowerInq response (02=on, 03=off)

- id: focus_af_mode
  type: enum
  values: [auto, manual]
  description: From CAM_FocusAFModeInq (02=auto, 03=manual)

- id: wb_mode
  type: enum
  values: [auto, indoor, outdoor, onepush, manual]
  description: From CAM_WBModeInq (00/01/02/03/05)

- id: ae_mode
  type: enum
  values: [full_auto, manual, shutter_priority, iris_priority, wdr, low_light]
  description: From CAM_AEModeInq (00/03/0A/0B/21/22)

- id: video_system
  type: enum
  values: [1080i60, 1080p30, 720p60, 720p30, 1080p60, 1080i50, 1080p25, 720p50, 720p25, 1080p50]
  description: From VideoSystemInq (00/01/02/03/07/08/09/0A/0B/0F)

- id: dvi_mode
  type: enum
  values: [hdmi, dvi]
  description: From CAM_DVIModeInq (02=HDMI, 03=DVI)

- id: af_zone
  type: enum
  values: [top, center, bottom]
  description: From CAM_AFZone query (00/01/02)

- id: af_sensitivity
  type: enum
  values: [high, normal, low]
  description: From CAM_AFSensitivityInq (01/02/03)

- id: awb_sensitivity
  type: enum
  values: [high, normal, low]
  description: From CAM_AWBSensitivityInq (00/01/02)

- id: ir_receive_state
  type: enum
  values: [on, off]
  description: From IR_Receive query (02=on)
```

## Variables
```yaml
# UNRESOLVED: settable continuous parameters documented as DIRECT commands are covered as parameterized actions above (zoom, focus, R/B gain, shutter, iris, WDR, low-light, expcomp, aperture, color gain, color hue, gamma, Iridix).
```

## Events
```yaml
# IR receive-return notifications (broadcast from camera when IR is received and forwarding enabled).
# Source: IR_Receive "On" / "On/Off" row: y0 07 7D 01 04 00 FF (Power ON/OFF)
#         y0 07 7D 01 04 07 FF (Zoom tele/wide)
#         y0 07 7D 01 04 38 FF (AF On/Off)
#         y0 07 7D 01 04 33 FF (CAM_Backlight)
#         y0 07 7D 01 04 3F FF (CAM_Memory)
#         y0 07 7D 01 06 01 FF (Pan_tiltDrive)
- id: ir_event_power
  type: packet
  pattern: "y0 07 7D 01 04 00 FF"
  description: IR remote power press

- id: ir_event_zoom
  type: packet
  pattern: "y0 07 7D 01 04 07 FF"
  description: IR remote zoom (tele/wide)

- id: ir_event_af
  type: packet
  pattern: "y0 07 7D 01 04 38 FF"
  description: IR remote AF toggle

- id: ir_event_backlight
  type: packet
  pattern: "y0 07 7D 01 04 33 FF"
  description: IR remote backlight

- id: ir_event_memory
  type: packet
  pattern: "y0 07 7D 01 04 3F FF"
  description: IR remote memory

- id: ir_event_pantilt
  type: packet
  pattern: "y0 07 7D 01 06 01 FF"
  description: IR remote pan/tilt
```

## Macros
```yaml
# Power-on initialization sequence (described in source, not as a single command):
# "Pan-Tilt will rotate to the maximum top right position after the camera is powered on.
#  It will return to the center position when the process of initialization is finished.
#  If the position preset 0 has been stored, the position preset 0 will be called up after initialization."
- id: power_on_init
  description: Implicit initialization: PTZ rotates to top-right, then returns to center, then recalls preset 0 if stored.
  steps:
    - Wait for completion after Power On command.
    - PTZ self-initializes (top-right → center).
    - If preset 0 stored, camera recalls preset 0.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on sequencing requirements beyond the implicit PTZ initialization described in the Macros section.
```

## Notes
- Source documents three protocols selectable via SETUP → Protocol menu: VISCA, P-D, P-P. Address and baud rate are also set in the SETUP menu.
- BOTTOM dip switches select camera mode (Normal / Software Update / Factory Debug / None). Software Update Mode and Factory Debug Mode are not control protocols and are out of scope for this spec.
- SYSTEM SELECT switch controls video output format (1080p60, 1080p50, 1080i60, 1080i50, 720p60, 720p50, 1080p30, 1080p25, 720p30, 720p25, 1080p59.94, 1080i59.94, 720p59.94, 1080p29.97, 720p29.97). Changes require camera restart.
- "Net Mode: Serial, Parallel" is documented but the parallel configuration is not detailed in the refined source; not modelled.
- Pan/Tilt position encoding for Absolute/Relative commands is annotated TBD in the source — positions cannot be implemented without further documentation.
- Pelco-D and Pelco-P preset IDs are not bounded in the source — assumed 0–255 by protocol convention but not stated.
- Custom Power commands (8x 02 16 16 16 …) are listed alongside standard CAM_Power; both achieve the same result per source.
- Two manufacturer-specific power-forwarding commands for TCL displays are included (TCL_Standby, TCL_Wakeup); they forward AD DA02 B0 … AF FA payloads.
- Refined source was extracted from VISCA / Pelco-D / Pelco-P protocol documentation; full manual context (model-specific installation, dimensions, electrical specs) not present.

<!-- UNRESOLVED: firmware version compatibility not stated; Pan/Tilt absolute/relative position encodings marked TBD in source; preset ID bounds not stated. -->

## Provenance

```yaml
source_domains:
  - m.media-amazon.com
  - manualslib.com
source_urls:
  - https://m.media-amazon.com/images/I/91YBOvh13VL.pdf
  - https://www.manualslib.com/manual/3031436/Goelectronic-Gohd400.html
retrieved_at: 2026-05-14T23:43:01.333Z
last_checked_at: 2026-06-02T17:22:19.747Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:19.747Z
matched_actions: 194
action_count: 194
confidence: medium
summary: "All 194 spec actions matched verbatim in source; transport parameters (9600 baud, 8N1) fully supported; coverage ratio 0.95 exceeds 0.9 floor. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device firmware version compatibility not stated; assume baseline spec applies to firmware as shipped."
- "settable continuous parameters documented as DIRECT commands are covered as parameterized actions above (zoom, focus, R/B gain, shutter, iris, WDR, low-light, expcomp, aperture, color gain, color hue, gamma, Iridix)."
- "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements beyond the implicit PTZ initialization described in the Macros section."
- "firmware version compatibility not stated; Pan/Tilt absolute/relative position encodings marked TBD in source; preset ID bounds not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
