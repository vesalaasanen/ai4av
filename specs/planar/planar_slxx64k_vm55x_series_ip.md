---
schema_version: ai4av-public-spec-v1
device_id: planar/vm55mx-m2
entity_id: planar_slxx64k_vm55x_series
spec_id: admin/planar-slxx64k-vm55x-series
revision: 1
author: admin
title: "Planar SLxx64K_VM55x Series Control Spec"
status: published
manufacturer: Planar
manufacturer_key: planar
model_family: VM55MX-M2
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - VM55MX-M2
    - VM55MX-X2
    - VM55LX-M2
    - VM55LX-X2
    - VM55LX-U2
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
source_documents:
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T11:31:39.528Z
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T11:32:16.729Z
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T11:32:17.729Z
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T11:32:49.173Z
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:40:21.236Z
retrieved_at: 2026-04-29T11:40:21.236Z
last_checked_at: 2026-04-25T21:47:03.550Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps:
  - 0xAE
  - 0xAF
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T21:47:03.550Z
  matched_actions: 29
  action_count: 29
  confidence: low
  summary: "All 29 spec actions matched literal opcodes in source; all transport parameters verified; 0xAE/0xAF referenced but lack detailed specifications"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Planar SLxx64K_VM55x Series Control Spec

## Summary
Planar VM Series commercial displays supporting both RS-232 and Ethernet control. This spec covers the SICP (Serial Input Control Protocol) over RS-232 and LAN. Port 5000 is used for LAN control. Models in this series include VM55MX-M2, VM55MX-X2, VM55LX-M2, VM55LX-X2, and VM55LX-U2.

<!-- UNRESOLVED: SLxx64K models referenced in filename not found in source document body -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 5000  # LAN control port; RS-232 uses 9600 baud
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
- powerable       # power on/off commands present (0x18, 0x19)
- queryable       # query commands present (model, FW, power state, volume, etc.)
- routable        # input/source routing commands present (0xAC, 0xAD)
- levelable       # volume, brightness, contrast, color, treble, bass adjustable
```

## Actions
```yaml
- id: power_state_set
  label: Power State Set
  kind: action
  params:
    - name: state
      type: integer
      description: 0x01 = Power Off, 0x02 = On
  notes: 0x18

- id: power_state_at_cold_start_set
  label: Power State at Cold Start Set
  kind: action
  params:
    - name: state
      type: integer
      description: 0x00 = Power Off, 0x01 = Forced On, 0x02 = Last Status
  notes: 0xA3; value applied on next cold start

- id: input_source_set
  label: Input Source Set
  kind: action
  params:
    - name: source
      type: integer
      description: 0x05=VGA, 0x06=HDMI2, 0x0A=DisplayPort, 0x0B=OPS, 0x0D=HDMI1, 0x0E=DVI-D, 0x0F=HDMI3, 0x10=Browser, 0x11=CMS, 0x16=MediaPlayer, 0x17=PDFPlayer, 0x18=Custom, 0x19=HDMI4
  notes: 0xAC; certain sources model-specific (DisplayPort/HDMI3/4: 65/75/86 only; DVI-D: 43/55 only)

- id: video_parameters_set
  label: Video Parameters Set
  kind: action
  params:
    - name: brightness
      type: integer
      description: 0-100 (%)
    - name: color
      type: integer
      description: 0-100 (%)
    - name: contrast
      type: integer
      description: 0-100 (%)
    - name: sharpness
      type: integer
      description: 0-100 (%)
    - name: tint
      type: integer
      description: 0-100 (%)
    - name: black_level
      type: integer
      description: 0-100 (%)
    - name: gamma
      type: integer
      description: 0x01=Native, 0x02=S gamma, 0x03=2.2, 0x04=2.4, 0x05=DICOM
  notes: 0x32

- id: color_temperature_set
  label: Color Temperature Set
  kind: action
  params:
    - name: temperature
      type: integer
      description: 0x00=User1, 0x01=Native, 0x03=10000K, 0x04=9300K, 0x05=7500K, 0x06=6500K, 0x09=5000K, 0x0A=4000K, 0x0D=3000K, 0x12=User2
  notes: 0x34

- id: color_parameters_set
  label: Color Parameters Set
  kind: action
  params:
    - name: red_gain
      type: integer
      description: 0-255
    - name: green_gain
      type: integer
      description: 0-255
    - name: blue_gain
      type: integer
      description: 0-255
  notes: 0x36

- id: zoom_mode_set
  label: Zoom Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: 0x00=4:3, 0x01=Custom, 0x02=1:1, 0x03=Full, 0x04=21:9
  notes: 0x3A

- id: volume_set
  label: Volume Set
  kind: action
  params:
    - name: volume
      type: integer
      description: 0-100 (%)
    - name: audio_out_volume
      type: integer
      description: 0-100 (%)
  notes: 0x44; sending volume=0 mutes but does not overwrite mute status

- id: audio_parameters_set
  label: Audio Parameters Set
  kind: action
  params:
    - name: treble
      type: integer
      description: 0-100 (%)
    - name: bass
      type: integer
      description: 0-100 (%)
  notes: 0x42

- id: keypad_lock_set
  label: Keypad Lock Set
  kind: action
  params:
    - name: lock_status
      type: integer
      description: 0x01=Unlock All, 0x02=Lock All, 0x03=Lock All but Power, 0x04=Lock All but Volume
  notes: 0x1A

- id: ir_remote_lock_set
  label: IR Remote Lock Set
  kind: action
  params:
    - name: lock_status
      type: integer
      description: 0x01=Unlock All, 0x02=Lock All, 0x03=Lock All but Power, 0x04=Lock All but Volume, 0x05=Primary, 0x06=Secondary
  notes: 0x1C

- id: tiling_set
  label: Tiling Set
  kind: action
  params:
    - name: enable
      type: integer
      description: 0x00=No, 0x01=Yes
    - name: frame_comp
      type: integer
      description: 0x00=No, 0x01=Yes, 0x02=keep previous
    - name: position
      type: integer
      description: 0x00=keep previous, 0x01-0xE1=position (max 225)
    - name: monitor_layout
      type: integer
      description: (V monitors-1) x 15 + H monitors; max 15x15
  notes: 0x22

- id: tiling_preset_set
  label: Tiling Preset Set
  kind: action
  params:
    - name: action
      type: integer
      description: 0x00=Save, 0x01=Recall
    - name: preset
      type: integer
      description: 0x00-0x09 (Preset1-Preset10)
  notes: 0x24

- id: auto_adjust_set
  label: Auto Adjust Set
  kind: action
  params:
    - name: item
      type: integer
      description: 0x40=Auto Adjust (VGA only)
  notes: 0x70; VGA input only

- id: model_info_get
  label: Model / FW / Build Date Get
  kind: action
  params:
    - name: info_type
      type: integer
      description: 0x00=Model Number, 0x01=FW version, 0x02=Build Date
  notes: 0xA1

- id: power_state_get
  label: Power State Get
  kind: action
  params: []
  notes: 0x19

- id: current_source_get
  label: Current Source Get
  kind: action
  params: []
  notes: 0xAD

- id: video_parameters_get
  label: Video Parameters Get
  kind: action
  params: []
  notes: 0x33

- id: color_temperature_get
  label: Color Temperature Get
  kind: action
  params: []
  notes: 0x35

- id: color_parameters_get
  label: Color Parameters Get
  kind: action
  params: []
  notes: 0x37

- id: zoom_mode_get
  label: Zoom Mode Get
  kind: action
  params: []
  notes: 0x3B

- id: volume_get
  label: Volume Get
  kind: action
  params: []
  notes: 0x45

- id: audio_parameters_get
  label: Audio Parameters Get
  kind: action
  params: []
  notes: 0x43

- id: keypad_lock_get
  label: Keypad Lock Get
  kind: action
  params: []
  notes: 0x1B

- id: ir_remote_lock_get
  label: IR Remote Lock Get
  kind: action
  params: []
  notes: 0x1D

- id: power_state_at_cold_start_get
  label: Power State at Cold Start Get
  kind: action
  params: []
  notes: 0xA4

- id: tiling_get
  label: Tiling Get
  kind: action
  params: []
  notes: 0x23

- id: serial_code_get
  label: Serial Code Get
  kind: action
  params: []
  notes: 0x15; returns 14-digit production code

- id: misc_info_get
  label: Misc Info Get
  kind: action
  params:
    - name: item
      type: integer
      description: 0x02=Operating Hours
  notes: 0x0F
```

## Feedbacks
```yaml
- id: power_state_report
  type: enum
  values:
    - 0x01: Power Off
    - 0x02: On
  notes: response to 0x19; DATA[1] = state

- id: ack_reply
  type: string
  notes: 0x21 header, DATA[0]=0x00, DATA[1]=0x00 = command well executed

- id: nak_reply
  type: string
  notes: 0x21 header, DATA[0]=0x00, DATA[1]=0x03 = command not acknowledged

- id: nav_reply
  type: string
  notes: 0x21 header, DATA[0]=0x00, DATA[1]=0x04 = command not available or checksum error

- id: input_source_report
  type: enum
  values:
    - 0x05: VGA
    - 0x06: HDMI 2
    - 0x0A: DisplayPort
    - 0x0B: OPS
    - 0x0D: HDMI 1
    - 0x0E: DVI-D
    - 0x0F: HDMI 3
    - 0x10: Browser
    - 0x11: CMS
    - 0x16: Media Player
    - 0x17: PDF Player
    - 0x18: Custom
    - 0x19: HDMI 4
  notes: response to current source query

- id: video_parameters_report
  type: object
  properties:
    - brightness: 0-100
    - color: 0-100
    - contrast: 0-100
    - sharpness: 0-100
    - tint: 0-100
    - black_level: 0-100
    - gamma: 0x01-0x05
  notes: response to 0x33

- id: color_temperature_report
  type: enum
  values:
    - 0x00: User 1
    - 0x01: Native
    - 0x03: 10000K
    - 0x04: 9300K
    - 0x05: 7500K
    - 0x06: 6500K
    - 0x09: 5000K
    - 0x0A: 4000K
    - 0x0D: 3000K
    - 0x12: User 2
  notes: response to 0x35

- id: color_parameters_report
  type: object
  properties:
    - red_gain: 0-255
    - green_gain: 0-255
    - blue_gain: 0-255
  notes: response to 0x37

- id: zoom_mode_report
  type: enum
  values:
    - 0x00: 4:3
    - 0x01: Custom
    - 0x02: Real / 1:1
    - 0x03: Full
    - 0x04: 21:9
  notes: response to 0x3B

- id: volume_report
  type: integer
  range: 0-100
  notes: response to 0x45; DATA[1] = volume level

- id: audio_parameters_report
  type: object
  properties:
    - treble: 0-100
    - bass: 0-100
  notes: response to 0x43

- id: keypad_lock_report
  type: enum
  values:
    - 0x01: Unlock All
    - 0x02: Lock All
    - 0x03: Lock All but Power
    - 0x04: Lock All but Volume
  notes: response to 0x1B

- id: ir_remote_lock_report
  type: enum
  values:
    - 0x01: Unlock All
    - 0x02: Lock All
    - 0x03: Lock All but Power
    - 0x04: Lock All but Volume
    - 0x05: Primary (Master)
    - 0x06: Secondary (daisy chain PD)
  notes: response to 0x1D

- id: tiling_report
  type: object
  properties:
    - enable: boolean
    - frame_comp: boolean
    - position: integer
    - monitor_layout: integer
  notes: response to 0x23; position max 225 (0xE1)

- id: model_info_report
  type: string
  notes: response to 0xA1; up to 36 ASCII characters

- id: operating_hours_report
  type: integer
  notes: response to 0x0F with item=0x02; 16-bit value (DATA[1]=MSB, DATA[2]=LSB)
```

## Variables
```yaml
# No standalone settable parameters — all parameters are action-based.
# UNRESOLVED: auto signal detect commands (0xAE, 0xAF) referenced in command summary but details not provided in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions found in source — device sends only ACK/NAK/NAV replies to commands
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Protocol header byte for commands is 0xA6; response header is 0x21.
- Monitor ID range: 1-255; broadcast ID is 0 (no ACK or report expected).
- Checksum algorithm: XOR of all bytes in message except the checksum itself.
- Reply timing: retry after 500ms if no response received.
- LAN port 5000: serial commands over LAN are not relayed through RS-232 out to daisy-chained monitors — each monitor must be connected directly to LAN.
- Command buffer must not be corrupted (transmission errors cause NAK).
- No reply is sent when wrong ID address is used.

<!-- UNRESOLVED: auto signal detect commands (0xAE Get, 0xAF Set) listed in command summary but full parameter details not included in source -->
<!-- UNRESOLVED: SICP protocol version number not stated in source -->
<!-- UNRESOLVED: maximum operating hours value range not stated -->

## Provenance

```yaml
source_urls:
  - https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
source_documents:
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T11:31:39.528Z
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T11:32:16.729Z
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T11:32:17.729Z
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T11:32:49.173Z
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:40:21.236Z
retrieved_at: 2026-04-29T11:40:21.236Z
last_checked_at: 2026-04-25T21:47:03.550Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:47:03.550Z
matched_actions: 29
action_count: 29
confidence: low
summary: "All 29 spec actions matched literal opcodes in source; all transport parameters verified; 0xAE/0xAF referenced but lack detailed specifications"
```

## Known Gaps

```yaml
- 0xAE
- 0xAF
```
