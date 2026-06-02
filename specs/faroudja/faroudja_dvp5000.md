---
spec_id: admin/faroudja-dvp5000
schema_version: ai4av-public-spec-v1
revision: 1
title: "Faroudja DVP5000 Control Spec"
manufacturer: Faroudja
model_family: DVP5000
aliases: []
compatible_with:
  manufacturers:
    - Faroudja
  models:
    - DVP5000
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - biggerhammer.net
  - manualslib.com
source_urls:
  - https://www.biggerhammer.net/mediaroom/faroudja/5000manfinal.pdf
  - "https://www.manualslib.com/manual/689190/Faroudja-Dvp5000.html?page=13"
retrieved_at: 2026-06-02T00:51:24.269Z
last_checked_at: 2026-06-02T01:48:08.219Z
generated_at: 2026-06-02T01:48:08.219Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HD pass-through scan rate \"Custom 1/2\" value semantics not detailed; HF index 2 missing from table (jumps 1→3)"
  - "ST response format/schema not detailed in source; only \"Report Current Status\" mentioned with footnote that P5 indicates \"something changed since last preset was recalled\"."
  - "source does not document unsolicited notifications."
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements for RS-232."
verification:
  verdict: verified
  checked_at: 2026-06-02T01:48:08.219Z
  matched_actions: 36
  action_count: 36
  confidence: medium
  summary: "All 36 spec actions matched literally to source command table; transport parameters verified; bidirectional coverage complete. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Faroudja DVP5000 Control Spec

## Summary
Faroudja DVP5000 HD video processor/scaler. RS-232 control via DB-9 female, ASCII text commands prefixed with `DVP5000` or `DVP5000U` header and terminated with carriage return (0x0D). Default 9600 8N1; adjustable 4800/9600/19200.

<!-- UNRESOLVED: HD pass-through scan rate "Custom 1/2" value semantics not detailed; HF index 2 missing from table (jumps 1→3) -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # default; source also lists 4800, 19200 as adjustable
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred from ON/OFF commands
- routable    # inferred from V/Y/X/HD/HDP input select commands
- queryable   # inferred from ST status report command
- levelable   # inferred from B/C/K/T/N/D range commands
```

## Actions
```yaml
# Command format: DVP5000,<command>\r  (header + comma + command + 0x0D)
# Header may also be DVP5000U. Case insensitive. Parameterized commands use {} placeholder.

- id: image_size
  label: Image Size
  kind: action
  command: "DVP5000,SZ{value}\r"
  params:
    - name: value
      type: integer
      description: "0=Cropped, 1=Normal"

- id: scan_rate
  label: Scan Rate
  kind: action
  command: "DVP5000,S{value}\r"
  params:
    - name: value
      type: integer
      description: "0=Line Doubled, 1=Frame Doubled, 2=800x600, 3=720p, 4=1024x768, 5=Line Quadrupled (960p), 6=1280x1024, 7=1080p, 8=1080i"

- id: screen_shape
  label: Screen Shape
  kind: action
  command: "DVP5000,W{value}\r"
  params:
    - name: value
      type: integer
      description: "0=Widescreen, 1=4x3"

- id: input_video_standard
  label: Input Video Standard
  kind: action
  command: "DVP5000,F{value}\r"
  params:
    - name: value
      type: integer
      description: "0=Auto, 1=NTSC, 2=PALN, 3=PALM"

- id: output_mode
  label: Output Mode
  kind: action
  command: "DVP5000,M{value}\r"
  params:
    - name: value
      type: integer
      description: "0=RGB, 1=YCrCb, 2=YPrPb"

- id: comp_sync
  label: Composite Sync
  kind: action
  command: "DVP5000,CS{value}\r"
  params:
    - name: value
      type: integer
      description: "1=On"

- id: sync_on_green
  label: Sync on Green
  kind: action
  command: "DVP5000,G{value}\r"
  params:
    - name: value
      type: integer
      description: "1=On"

- id: hd_pass_scan_rate
  label: HD Pass Scan Rate
  kind: action
  command: "DVP5000,HS{value}\r"
  params:
    - name: value
      type: integer
      description: "0=800x600, 1=1024x768, 2=1280x1024, 3=1600x1200, 4=Custom 1, 5=Custom 2, 6=HDTV (720p/1080i), 7=WVHS"

- id: hd_frame_rate
  label: HD Frame Rate
  kind: action
  command: "DVP5000,HF{value}\r"
  params:
    - name: value
      type: integer
      description: "0=60Hz, 1=75Hz, 3=85Hz  # source jumps 1→3"

- id: hdtv_sync
  label: HDTV Sync
  kind: action
  command: "DVP5000,HDS{value}\r"
  params:
    - name: value
      type: integer
      description: "0=HV, 1=C"

- id: hd_converter
  label: HD Converter On/Off
  kind: action
  command: "DVP5000,HDUC{value}\r"
  params:
    - name: value
      type: integer
      description: "1=On"

- id: osd_on
  label: OSD On
  kind: action
  command: "DVP5000,OSDON\r"
  params: []

- id: osd_off
  label: OSD Off
  kind: action
  command: "DVP5000,OSDOFF\r"
  params: []

- id: osd_vertical_start
  label: OSD Vertical Start
  kind: action
  command: "DVP5000,OV{value}\r"
  params:
    - name: value
      type: integer
      description: "0=top"

- id: echo_off
  label: Echo Off
  kind: action
  command: "DVP5000,E0\r"
  params: []

- id: echo_on
  label: Echo On
  kind: action
  command: "DVP5000,E1\r"
  params: []

- id: save_setup
  label: Save Setup To All
  kind: action
  command: "DVP5000,SET\r"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "DVP5000,ON\r"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "DVP5000,OFF\r"
  params: []

- id: help
  label: Display Help Menu
  kind: action
  command: "DVP5000,HELP\r"
  params: []

- id: status_report
  label: Report Current Status
  kind: query
  command: "DVP5000,ST\r"
  params: []

- id: select_video
  label: Select Video Input
  kind: action
  command: "DVP5000,V\r"
  params: []

- id: select_yc
  label: Select Y/C Input
  kind: action
  command: "DVP5000,Y\r"
  params: []

- id: select_ycrcb
  label: Select YCrCb Input
  kind: action
  command: "DVP5000,X\r"
  params: []

- id: select_hdtv
  label: Select HDTV Input
  kind: action
  command: "DVP5000,HD\r"
  params: []

- id: hdtv_input_format
  label: HDTV Input Format
  kind: action
  command: "DVP5000,HDIN{value}\r"
  params:
    - name: value
      type: integer
      description: "0=RGB, 1=YUV, 2=YPrPb"

- id: hdtv_passthrough
  label: HDTV Passthrough Input
  kind: action
  command: "DVP5000,HDP\r"
  params: []

- id: brightness
  label: Brightness
  kind: action
  command: "DVP5000,B{value}\r"
  params:
    - name: value
      type: integer
      description: "0-255"

- id: contrast
  label: Contrast
  kind: action
  command: "DVP5000,C{value}\r"
  params:
    - name: value
      type: integer
      description: "0-255"

- id: color
  label: Color
  kind: action
  command: "DVP5000,K{value}\r"
  params:
    - name: value
      type: integer
      description: "0-255"

- id: tint
  label: Tint
  kind: action
  command: "DVP5000,T{value}\r"
  params:
    - name: value
      type: integer
      description: "0-255"

- id: noise_reduction
  label: Noise Reduction
  kind: action
  command: "DVP5000,N{value}\r"
  params:
    - name: value
      type: integer
      description: "0-15"

- id: detail
  label: Detail
  kind: action
  command: "DVP5000,D{value}\r"
  params:
    - name: value
      type: integer
      description: "0-15"

- id: input_aspect_ratio
  label: Input Aspect Ratio
  kind: action
  command: "DVP5000,A{value}\r"
  params:
    - name: value
      type: integer
      description: "0=4x3, 1=Letterbox, 2=Anamorphic"

- id: store_preset
  label: Store User Preset
  kind: action
  command: "DVP5000,L{value}\r"
  params:
    - name: value
      type: integer
      description: "1-4"

- id: recall_preset
  label: Recall Preset
  kind: action
  command: "DVP5000,P{value}\r"
  params:
    - name: value
      type: integer
      description: "0=Factory, 1-4=User"
```

## Feedbacks
```yaml
# UNRESOLVED: ST response format/schema not detailed in source; only "Report Current Status" mentioned with footnote that P5 indicates "something changed since last preset was recalled".
```

## Variables
```yaml
# None beyond the parameterized action ranges (brightness/contrast/color/tint/noise/detail 0-255 or 0-15).
# Source documents no independent settable variables outside action params.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications.
```

## Macros
```yaml
# Power on/off via IR is described as a two-command macro (second within 0.25s of first):
#   On  = Power, Value Up
#   Off = Power, Value Down
# This is an IR-side macro, not an RS-232 macro. Source provides no RS-232 macro syntax.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements for RS-232.
```

## Notes
- Header `DVP5000U` accepted as alternate of `DVP5000` per source.
- All commands terminated with CR (0x0D). Source writes "0x13" which is carriage return.
- Commands case-insensitive.
- Picture settings (B/C/K/T/N/D) are input-specific; must select input (V/Y/X) before adjusting.
- HF source table skips value 2 (jumps 1→3); preserved as-is.
- Baud adjustable 4800/9600/19200; default 9600. No source command shown for changing baud.

## Provenance

```yaml
source_domains:
  - biggerhammer.net
  - manualslib.com
source_urls:
  - https://www.biggerhammer.net/mediaroom/faroudja/5000manfinal.pdf
  - "https://www.manualslib.com/manual/689190/Faroudja-Dvp5000.html?page=13"
retrieved_at: 2026-06-02T00:51:24.269Z
last_checked_at: 2026-06-02T01:48:08.219Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T01:48:08.219Z
matched_actions: 36
action_count: 36
confidence: medium
summary: "All 36 spec actions matched literally to source command table; transport parameters verified; bidirectional coverage complete. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HD pass-through scan rate \"Custom 1/2\" value semantics not detailed; HF index 2 missing from table (jumps 1→3)"
- "ST response format/schema not detailed in source; only \"Report Current Status\" mentioned with footnote that P5 indicates \"something changed since last preset was recalled\"."
- "source does not document unsolicited notifications."
- "source contains no safety warnings, interlocks, or power-on sequencing requirements for RS-232."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
