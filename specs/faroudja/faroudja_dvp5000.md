---
schema_version: ai4av-public-spec-v1
device_id: faroudja/dvp5000
entity_id: faroudja_dvp5000
spec_id: admin/faroudja-dvp5000
revision: 1
author: admin
title: "Faroudja DVP5000 Control Spec"
status: published
manufacturer: Faroudja
manufacturer_key: faroudja
model_family: DVP5000
aliases: []
compatible_with:
  manufacturers:
    - Faroudja
  models:
    - DVP5000
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: faroudja_dvp5000.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T09:04:42.512Z
retrieved_at: 2026-04-27T09:04:42.512Z
last_checked_at: 2026-04-27T09:04:42.512Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps:
  - HELP
  - ST
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T09:04:42.512Z
  matched_actions: 34
  action_count: 34
  confidence: high
  summary: "All 34 spec actions matched to source commands; two extra commands (HELP, ST) in source; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Faroudja DVP5000 Control Spec

## Summary
Faroudja DVP5000 is an HD video processor/scaler with RS-232 control. All control via ASCII text commands over DB-9 serial. Header `DVP5000` or `DVP5000U` precedes each command, delimited by comma, terminated by carriage return (0x13).

<!-- UNRESOLVED: no HTTP/REST/TCP/UDP protocol documented; device is serial-only -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # default; also 4800, 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
addressing:
  port: null  # UNRESOLVED: serial port number not stated (DB-9 only, no TCP)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # ON/OFF commands present
- routable       # V, Y, X, HD, HDP input selection commands present
- queryable      # ST status report command present
- levelable      # B/C/K/T/N/D brightness/contrast/color/tint/noise/detail commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: image_size
  label: Image Size
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Cropped, 1=Normal
- id: scan_rate
  label: Scan Rate
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Line Doubled, 1=Frame Doubled, 2=800x600, 3=720p, 4=1024x768, 5=Line Quadrupled (960p), 6=1280x1024, 7=1080p, 8=1080i"
- id: screen_shape
  label: Screen Shape
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Widescreen, 1=4x3
- id: input_video_standard
  label: Input Video Standard
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Auto, 1=NTSC, 2=PALN, 3=PALM"
- id: output_mode
  label: Output Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0=RGB, 1=YCrCb, 2=YPrPb"
- id: comp_sync
  label: Comp Sync
  kind: action
  params:
    - name: value
      type: integer
      description: "1=On"
- id: sync_on_green
  label: Sync on Green
  kind: action
  params:
    - name: value
      type: integer
      description: "1=On"
- id: hd_pass_scan_rate
  label: HD Pass Scan Rate
  kind: action
  params:
    - name: value
      type: integer
      description: "0=800x600, 1=1024x768, 2=1280x1024, 3=1600x1200, 4=Custom 1, 5=Custom 2, 6=HDTV (720p/1080i), 7=WVHS"
- id: hd_frame_rate
  label: HD Frame Rate
  kind: action
  params:
    - name: value
      type: integer
      description: "0=60Hz, 1=75Hz, 3=85Hz"
- id: hdtv_sync
  label: HDTV Sync
  kind: action
  params:
    - name: value
      type: integer
      description: "0=HV, 1=C"
- id: hd_converter
  label: HD Converter On/Off
  kind: action
  params:
    - name: value
      type: integer
      description: "1=On"
- id: osd_on
  label: OSD On
  kind: action
  params: []
- id: osd_off
  label: OSD Off
  kind: action
  params: []
- id: osd_vertical_start
  label: OSD Vertical Start
  kind: action
  params:
    - name: value
      type: integer
      description: "0=top"
- id: echo_off
  label: Echo Off
  kind: action
  params: []
- id: echo_on
  label: Echo On
  kind: action
  params: []
- id: save_setup
  label: Save Setup To All
  kind: action
  params: []
- id: select_video
  label: Video Input
  kind: action
  params: []
- id: select_yc
  label: Y/C Input
  kind: action
  params: []
- id: select_ycrcb
  label: YCrCb Input
  kind: action
  params: []
- id: select_hdtv
  label: HDTV Input
  kind: action
  params: []
- id: hdtv_input_format
  label: HDTV Input Format
  kind: action
  params:
    - name: value
      type: integer
      description: "0=RGB, 1=YUV, 2=YPrPb"
- id: select_hdtv_passthrough
  label: HDTV Passthrough Input
  kind: action
  params: []
- id: brightness
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-255"
- id: contrast
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "0-255"
- id: color
  label: Color
  kind: action
  params:
    - name: value
      type: integer
      description: "0-255"
- id: tint
  label: Tint
  kind: action
  params:
    - name: value
      type: integer
      description: "0-255"
- id: noise_reduction
  label: Noise Reduction
  kind: action
  params:
    - name: value
      type: integer
      description: "0-15"
- id: detail
  label: Detail
  kind: action
  params:
    - name: value
      type: integer
      description: "0-15"
- id: input_aspect_ratio
  label: Input Aspect Ratio
  kind: action
  params:
    - name: value
      type: integer
      description: "0=4x3, 1=Letterbox, 2=Anamorphic"
- id: store_user_preset
  label: Store User Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-4"
- id: recall_preset
  label: Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "0=Factory, 1-4=User"
```

## Feedbacks
```yaml
- id: status_report
  label: Status Report
  kind: feedback
  params: []
  description: "ST command returns current status; P5 flag indicates change since last preset recall"
```

## Variables
```yaml
# UNRESOLVED: no explicit query commands returning state found in source; ST returns status but response format not documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism documented
```

## Macros
```yaml
# UNRESOLVED: no named macros documented; IR power on/off is a two-command macro with .25s timing requirement
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Command header is `DVP5000` or `DVP5000U` (both valid)
- Header and command are not case sensitive
- All commands terminated by carriage return (0x13)
- Input must be selected before adjusting and storing picture settings (input-specific)
- IR power is a two-command macro: second command must occur within 0.25 seconds of first
- ST status report includes P5 flag when settings changed since last preset recall
- Serial baud rate is adjustable (4800, 9600, 19200); 9600 is default
- `HDIN#` and `OV#` commands present in source but parameter format (numeric suffix vs. `=`) not explicitly documented; interpreted as suffix syntax from examples
<!-- UNRESOLVED: response format for ST command not documented -->
<!-- UNRESOLVED: echo mode response behavior not documented -->
<!-- UNRESOLVED: firmware version not stated in source -->
<!-- UNRESOLVED: TCP/IP or HTTP control not available on this device -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: faroudja_dvp5000.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T09:04:42.512Z
retrieved_at: 2026-04-27T09:04:42.512Z
last_checked_at: 2026-04-27T09:04:42.512Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T09:04:42.512Z
matched_actions: 34
action_count: 34
confidence: high
summary: "All 34 spec actions matched to source commands; two extra commands (HELP, ST) in source; transport parameters verified."
```

## Known Gaps

```yaml
- HELP
- ST
```
