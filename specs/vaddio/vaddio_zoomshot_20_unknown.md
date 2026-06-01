---
spec_id: admin/vaddio-zoomshot-20
schema_version: ai4av-public-spec-v1
revision: 1
title: "Vaddio ZoomSHOT 20 Control Spec"
manufacturer: Vaddio
model_family: "ZoomSHOT 20"
aliases: []
compatible_with:
  manufacturers:
    - Vaddio
  models:
    - "ZoomSHOT 20"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - fullcompass.com
  - res.cloudinary.com
source_urls:
  - https://www.fullcompass.com/common/files/21194-VaddioClearVIEWHDUSBPTZincl9986990000Manual.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/999-5675-000_Manual.pdf"
retrieved_at: 2026-05-14T04:19:00.221Z
last_checked_at: 2026-05-31T22:44:28.614Z
generated_at: 2026-05-31T22:44:28.614Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:44:28.614Z
  matched_actions: 89
  action_count: 89
  confidence: high
  summary: "All 89 spec actions matched to source commands with correct opcodes, parameters, and ranges; transport values verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Vaddio ZoomSHOT 20 Control Spec

## Summary
PTZ camera with RS-232 VISCA-like binary control protocol. 9600/8N1, no flow control. Protocol is similar to Sony VISCA but HD-Series specific commands are present. Supports power, zoom, focus, white balance, exposure, image enhancement, memory presets, and tally.

<!-- UNRESOLVED: Telnet/TCP control via Quick-Connect USB Ethernet port mentioned in prior recovery notes but not in this source document — not included -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- queryable
- levelable  # zoom, focus, gain, iris, brightness, shutter, exposure compensation
```

## Actions
```yaml
# Address and IF management
- id: address_set
  label: Address Set (Broadcast)
  kind: action
  params: []
  notes: "88 30 01 FF - daisychain addressing"

- id: if_clear
  label: IF Clear (Broadcast)
  kind: action
  params: []
  notes: "88 01 00 01 FF"

- id: command_cancel
  label: Command Cancel
  kind: action
  params:
    - name: socket
      type: integer
      description: "Socket number (1 or 2)"
  notes: "8x 2p FF"

# Power
- id: cam_power_on
  label: Camera Power On
  kind: action
  params: []

- id: cam_power_off
  label: Camera Power Off (Standby)
  kind: action
  params: []

# Zoom - Stop
- id: cam_zoom_stop
  label: Zoom Stop
  kind: action
  params: []

# Zoom - Tele (Standard)
- id: cam_zoom_tele_standard
  label: Zoom Tele (Standard)
  kind: action
  params: []

# Zoom - Wide (Standard)
- id: cam_zoom_wide_standard
  label: Zoom Wide (Standard)
  kind: action
  params: []

# Zoom - Tele (Variable)
- id: cam_zoom_tele_variable
  label: Zoom Tele (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: "Speed 0-7"

# Zoom - Wide (Variable)
- id: cam_zoom_wide_variable
  label: Zoom Wide (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: "Speed 0-7"

# Zoom - Direct
- id: cam_zoom_direct
  label: Zoom Direct
  kind: action
  params:
    - name: position
      type: integer
      description: "0x000-0x071A"

# Zoom - Direct (Variable)
- id: cam_zoom_direct_variable
  label: Zoom Direct (Variable Speed)
  kind: action
  params:
    - name: speed
      type: integer
      description: "0-7"
    - name: position
      type: integer
      description: "0x000-0x071A"

# Focus - Stop
- id: cam_focus_stop
  label: Focus Stop
  kind: action
  params: []

# Focus - Far (Standard)
- id: cam_focus_far_standard
  label: Focus Far (Standard)
  kind: action
  params: []

# Focus - Near (Standard)
- id: cam_focus_near_standard
  label: Focus Near (Standard)
  kind: action
  params: []

# Focus - Far (Variable)
- id: cam_focus_far_variable
  label: Focus Far (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: "Speed 0-7"

# Focus - Near (Variable)
- id: cam_focus_near_variable
  label: Focus Near (Variable)
  kind: action
  params:
    - name: speed
      type: integer
      description: "Speed 0-7"

# Focus - Auto
- id: cam_focus_auto
  label: Auto Focus
  kind: action
  params: []

# Focus - Manual
- id: cam_focus_manual
  label: Manual Focus
  kind: action
  params: []

# Focus - Auto/Manual Toggle
- id: cam_focus_auto_manual_toggle
  label: Auto/Manual Focus Toggle
  kind: action
  params: []

# Focus - Direct
- id: cam_focus_direct
  label: Focus Direct
  kind: action
  params:
    - name: position
      type: integer
      description: "0x0ed-0x0944 (dependent on zoom)"

# White Balance - Auto
- id: cam_wb_auto
  label: White Balance Auto
  kind: action
  params: []

# White Balance - Manual
- id: cam_wb_manual
  label: White Balance Manual
  kind: action
  params: []

# White Balance - Indoor
- id: cam_wb_indoor
  label: White Balance Indoor
  kind: action
  params: []

# White Balance - Outdoor
- id: cam_wb_outdoor
  label: White Balance Outdoor
  kind: action
  params: []

# White Balance - One Push
- id: cam_wb_one_push
  label: White Balance One Push
  kind: action
  params: []

# Red Gain - Reset
- id: cam_rgain_reset
  label: Red Gain Reset
  kind: action
  params: []

# Red Gain - Up
- id: cam_rgain_up
  label: Red Gain Up
  kind: action
  params: []

# Red Gain - Down
- id: cam_rgain_down
  label: Red Gain Down
  kind: action
  params: []

# Red Gain - Direct
- id: cam_rgain_direct
  label: Red Gain Direct
  kind: action
  params:
    - name: value
      type: integer
      description: "0x0000-0xFFFF"

# Blue Gain - Reset
- id: cam_bgain_reset
  label: Blue Gain Reset
  kind: action
  params: []

# Blue Gain - Up
- id: cam_bgain_up
  label: Blue Gain Up
  kind: action
  params: []

# Blue Gain - Down
- id: cam_bgain_down
  label: Blue Gain Down
  kind: action
  params: []

# Blue Gain - Direct
- id: cam_bgain_direct
  label: Blue Gain Direct
  kind: action
  params:
    - name: value
      type: integer
      description: "0x0000-0xFFFF"

# Auto Exposure - Full Auto
- id: cam_ae_full_auto
  label: Auto Exposure Full Auto
  kind: action
  params: []

# Auto Exposure - Manual
- id: cam_ae_manual
  label: Auto Exposure Manual
  kind: action
  params: []

# Auto Exposure - Shutter Priority
- id: cam_ae_shutter_priority
  label: Auto Exposure Shutter Priority
  kind: action
  params: []

# Auto Exposure - Iris Priority
- id: cam_ae_iris_priority
  label: Auto Exposure Iris Priority
  kind: action
  params: []

# Iris - Reset
- id: cam_iris_reset
  label: Iris Reset
  kind: action
  params: []

# Iris - Up
- id: cam_iris_up
  label: Iris Up
  kind: action
  params: []

# Iris - Down
- id: cam_iris_down
  label: Iris Down
  kind: action
  params: []

# Iris - Direct
- id: cam_iris_direct
  label: Iris Direct
  kind: action
  params:
    - name: value
      type: integer
      description: "0x00-0x08"

# Gain - Reset
- id: cam_gain_reset
  label: Gain Reset
  kind: action
  params: []

# Gain - Up
- id: cam_gain_up
  label: Gain Up
  kind: action
  params: []

# Gain - Down
- id: cam_gain_down
  label: Gain Down
  kind: action
  params: []

# Gain - Direct
- id: cam_gain_direct
  label: Gain Direct
  kind: action
  params:
    - name: value
      type: integer
      description: "0x00-0x2A"

# Brightness - Reset
- id: cam_brightness_reset
  label: Brightness Reset
  kind: action
  params: []

# Brightness - Up
- id: cam_brightness_up
  label: Brightness Up
  kind: action
  params: []

# Brightness - Down
- id: cam_brightness_down
  label: Brightness Down
  kind: action
  params: []

# Brightness - Direct
- id: cam_brightness_direct
  label: Brightness Direct
  kind: action
  params:
    - name: value
      type: integer
      description: "0x01-0x64"

# Backlight - On
- id: cam_backlight_on
  label: Backlight Compensation On
  kind: action
  params: []

# Backlight - Off
- id: cam_backlight_off
  label: Backlight Compensation Off
  kind: action
  params: []

# Aperture - Reset
- id: cam_aperture_reset
  label: Aperture Reset
  kind: action
  params: []

# Aperture - Up
- id: cam_aperture_up
  label: Aperture Up
  kind: action
  params: []

# Aperture - Down
- id: cam_aperture_down
  label: Aperture Down
  kind: action
  params: []

# Aperture - Direct
- id: cam_aperture_direct
  label: Aperture Direct
  kind: action
  params:
    - name: value
      type: integer
      description: "0x00-0x1F"

# Memory - Reset
- id: cam_memory_reset
  label: Memory Reset
  kind: action
  params:
    - name: slot
      type: integer
      description: "0-15"

# Memory - Set
- id: cam_memory_set
  label: Memory Set (Save Preset)
  kind: action
  params:
    - name: slot
      type: integer
      description: "0-15"

# Memory - Recall
- id: cam_memory_recall
  label: Memory Recall (Load Preset)
  kind: action
  params:
    - name: slot
      type: integer
      description: "0-15"

# Camera ID Write
- id: cam_id_write
  label: Camera ID Write
  kind: action
  params:
    - name: id
      type: integer
      description: "0x0000-0xFFFF"

# Mirror (Horizontal Flip) - On
- id: cam_lr_reverse_on
  label: Mirror On (Horizontal Flip)
  kind: action
  params: []

# Mirror (Horizontal Flip) - Off
- id: cam_lr_reverse_off
  label: Mirror Off
  kind: action
  params: []

# IR Receive - On
- id: ir_receive_on
  label: IR Receive On
  kind: action
  params: []

# IR Receive - Off
- id: ir_receive_off
  label: IR Receive Off
  kind: action
  params: []

# IR Receive - On/Off Toggle
- id: ir_receive_toggle
  label: IR Receive On/Off Toggle
  kind: action
  params: []

# Tally - On
- id: tally_on
  label: Tally On
  kind: action
  params: []

# Tally - Off
- id: tally_off
  label: Tally Off
  kind: action
  params: []

# Gamma Enhancement
- id: gamma_enhance
  label: Gamma Enhancement
  kind: action
  params:
    - name: value
      type: integer
      description: "0x00-0x10"

# Chroma Enhancement
- id: chroma_enhance
  label: Chroma Enhancement
  kind: action
  params:
    - name: value
      type: integer
      description: "0x00-0x64"

# Digital Image Stabilizer - On
- id: dis_on
  label: Digital Image Stabilizer On
  kind: action
  params: []

# Digital Image Stabilizer - Off
- id: dis_off
  label: Digital Image Stabilizer Off
  kind: action
  params: []

# Super Noise Reduction - On
- id: snr_on
  label: Super Noise Reduction On
  kind: action
  params: []

# Super Noise Reduction - Off
- id: snr_off
  label: Super Noise Reduction Off
  kind: action
  params: []

# AGC Mode - Off
- id: agc_off
  label: AGC Off
  kind: action
  params: []

# AGC Mode - Low
- id: agc_low
  label: AGC Low
  kind: action
  params: []

# AGC Mode - Medium
- id: agc_medium
  label: AGC Medium
  kind: action
  params: []

# AGC Mode - High
- id: agc_high
  label: AGC High
  kind: action
  params: []

# Shutter - Reset
- id: cam_shutter_reset
  label: Shutter Reset
  kind: action
  params: []

# Shutter - Up
- id: cam_shutter_up
  label: Shutter Up
  kind: action
  params: []

# Shutter - Down
- id: cam_shutter_down
  label: Shutter Down
  kind: action
  params: []

# Shutter - Direct
- id: cam_shutter_direct
  label: Shutter Direct
  kind: action
  params:
    - name: value
      type: integer
      description: "0x00-0x1C"

# Exposure Compensation - On
- id: cam_expcomp_on
  label: Exposure Compensation On (AE Off)
  kind: action
  params: []

# Exposure Compensation - Off
- id: cam_expcomp_off
  label: Exposure Compensation Off (AE On)
  kind: action
  params: []

# Exposure Compensation - Reset
- id: cam_expcomp_reset
  label: Exposure Compensation Reset
  kind: action
  params: []

# Exposure Compensation - Up
- id: cam_expcomp_up
  label: Exposure Compensation Up
  kind: action
  params: []

# Exposure Compensation - Down
- id: cam_expcomp_down
  label: Exposure Compensation Down
  kind: action
  params: []

# Exposure Compensation - Direct
- id: cam_expcomp_direct
  label: Exposure Compensation Direct
  kind: action
  params:
    - name: value
      type: integer
      description: "0x00-0x2A"

# ICR Cut Filter - On
- id: icr_on
  label: ICR Cut Filter On (Filter Out)
  kind: action
  params: []

# ICR Cut Filter - Off
- id: icr_off
  label: ICR Cut Filter Off (Filter In)
  kind: action
  params: []
```

## Feedbacks
```yaml
# Query responses - power
- id: power_state
  label: Power State
  type: enum
  values:
    - on  # 50 02
    - off  # 50 03

# Query responses - zoom
- id: zoom_position
  label: Zoom Position
  type: integer
  range: [0, 0x071A]

# Query responses - focus
- id: focus_position
  label: Focus Position
  type: integer
  range: [0x0ed, 0x0944]

# Query responses - white balance mode
- id: wb_mode
  label: White Balance Mode
  type: enum
  values:
    - auto  # 50 00
    - manual  # 50 05
    - indoor  # 50 01
    - outdoor  # 50 02
    - one_push  # 50 03

# Query responses - red gain
- id: rgain_value
  label: Red Gain Value
  type: integer
  range: [0, 0xFFFF]

# Query responses - blue gain
- id: bgain_value
  label: Blue Gain Value
  type: integer
  range: [0, 0xFFFF]

# Query responses - iris
- id: iris_value
  label: Iris Value
  type: integer
  range: [0, 0x08]

# Query responses - gain
- id: gain_value
  label: Gain Value
  type: integer
  range: [0, 0x2A]

# Query responses - brightness
- id: brightness_value
  label: Brightness Value
  type: integer
  range: [1, 0x64]

# Query responses - backlight
- id: backlight_mode
  label: Backlight Compensation Mode
  type: enum
  values:
    - on  # 50 02
    - off  # 50 03

# Query responses - aperture
- id: aperture_value
  label: Aperture Value
  type: integer
  range: [0, 0x1F]

# Query responses - memory (preset)
- id: memory_slot
  label: Memory Preset Slot
  type: integer
  range: [0, 0xF]

# Query responses - camera ID
- id: camera_id
  label: Camera ID
  type: integer
  range: [0, 0xFFFF]

# Query responses - IR receive
- id: ir_receive_state
  label: IR Receive State
  type: enum
  values:
    - on  # 50 02
    - off  # 50 03

# Query responses - mirror
- id: lr_reverse_state
  label: Mirror (LR Reverse) State
  type: enum
  values:
    - on  # 50 02
    - off  # 50 03

# Query responses - tally
- id: tally_state
  label: Tally State
  type: enum
  values:
    - on  # 50 02
    - off  # 50 03

# Query responses - gamma
- id: gamma_value
  label: Gamma Value
  type: integer
  range: [0, 0x10]

# Query responses - chroma
- id: chroma_value
  label: Chroma Value
  type: integer
  range: [0, 0x64]

# Query responses - DIS
- id: dis_state
  label: Digital Image Stabilizer State
  type: enum
  values:
    - on  # 50 02
    - off  # 50 03

# Query responses - SNR
- id: snr_state
  label: Super Noise Reduction State
  type: enum
  values:
    - on  # 50 02
    - off  # 50 03

# Query responses - AGC
- id: agc_mode
  label: AGC Mode
  type: enum
  values:
    - off  # 50 00
    - low  # 50 01
    - medium  # 50 02
    - high  # 50 03
    - manual  # 50 04

# Query responses - AE mode
- id: ae_mode
  label: Auto Exposure Mode
  type: enum
  values:
    - auto  # 50 00
    - manual  # 50 03
    - shutter_priority  # 50 0A
    - iris_priority  # 50 0B

# Query responses - shutter position
- id: shutter_position
  label: Shutter Position
  type: integer
  range: [0, 0x1C]

# Query responses - exp comp mode
- id: expcomp_mode
  label: Exposure Compensation Mode
  type: enum
  values:
    - on  # 50 02 (AE off)
    - off  # 50 03 (AE on)

# Query responses - exp comp position
- id: expcomp_position
  label: Exposure Compensation Position
  type: integer
  range: [0, 0x2A]

# Query responses - ICR mode
- id: icr_mode
  label: ICR Cut Filter Mode
  type: enum
  values:
    - on  # 50 02 (filter out)
    - off  # 50 03 (filter in)
```

## Variables
```yaml
# No standalone settable variables separate from discrete commands in this spec
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
- Protocol is VISCA-like but not identical — some Sony VISCA commands not supported; HD-Series specific commands present
- Zoom range: 0x000–0x071A; Focus range: 0x0ed–0x0944 (dependent on zoom position)
- DIP switches configure IR channel (1/2/3), IR on/off, and image flip mode
- HD Video rotary switch selects resolution (720p/1080i/1080p at various frame rates)
<!-- UNRESOLVED: Telnet/TCP control interface not documented in this source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: events/unsolicited notifications not stated in source --></parameter>

## Provenance

```yaml
source_domains:
  - fullcompass.com
  - res.cloudinary.com
source_urls:
  - https://www.fullcompass.com/common/files/21194-VaddioClearVIEWHDUSBPTZincl9986990000Manual.pdf
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/999-5675-000_Manual.pdf"
retrieved_at: 2026-05-14T04:19:00.221Z
last_checked_at: 2026-05-31T22:44:28.614Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:44:28.614Z
matched_actions: 89
action_count: 89
confidence: high
summary: "All 89 spec actions matched to source commands with correct opcodes, parameters, and ranges; transport values verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
