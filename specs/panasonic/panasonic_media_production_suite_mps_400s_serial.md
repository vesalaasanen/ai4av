---
spec_id: admin/panasonic-media-production-suite-mps-400s
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic Media Production Suite MPS-400S Video Mixer Plugin Control Spec"
manufacturer: Panasonic
model_family: "Media Production Suite MPS-400S (Video Mixer plugin)"
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
    - "Panasonic Entertainment & Communication Co., Ltd."
  models:
    - "Media Production Suite MPS-400S (Video Mixer plugin)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eww.pass.panasonic.co.jp
source_urls:
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/MPS_VM/WebApplication_en.pdf
retrieved_at: 2026-08-01T09:13:56.201Z
last_checked_at: 2026-08-05T08:34:58.829Z
generated_at: 2026-08-05T08:34:58.829Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Known protocol was given as \"RS-232C\" but the source exclusively describes HTTP and TCP. No RS-232 interface is documented."
  - "no settable parameters documented that are not covered by discrete actions"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences described explicitly in source"
  - "no safety warnings or interlock procedures documented in source"
  - "protocol mismatch between declared \"RS-232C\" and source-documented HTTP/TCP; firmware version not stated; no safety or event documentation."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:34:58.829Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions match source command mnemonics (SPGM/SDSK/SCAP/SAIB/QMVL/QMVC/QPGM/QMVI/SCVL/QVOL/QVME) with correct parameters and shapes; transport ports 1337/1437 verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-01
---

# Panasonic Media Production Suite MPS-400S Control Spec

## Summary
External control API for the Video Mixer plugin of the Panasonic Media Production Suite (MPS-400S) software. The plugin exposes both an HTTP/1.1 GET-based Web API (port 1337) and a framed TCP command channel (port 1437) using STX/ETX delimited messages. The API supports PGM switching, DSK on/off, screenshot capture, AI background capture, multi-view layout/cell queries, volume control, and VideoMixerEnable status queries.

<!-- UNRESOLVED: Known protocol was given as "RS-232C" but the source exclusively describes HTTP and TCP. No RS-232 interface is documented. -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  http:
    port: 1337
    base_url: "/cgi-bin/video_mixer"
  tcp:
    port: 1437
auth:
  type: none  # inferred: no login/password/auth procedure described in source
```

## Traits
```yaml
powerable: false  # inferred: no power on/off commands documented
routable: true  # inferred from PGM switching (SPGM) commands
queryable: true  # inferred from QMVL/QMVC/QPGM/QVOL/QVME queries
levelable: true  # inferred from SCVL volume control command
```

## Actions
```yaml
- id: switch_pgm_http
  label: Switch PGM (HTTP)
  kind: action
  command: "/cgi-bin/video_mixer?cmd=SPGM&cell={cell}"
  params:
    - name: cell
      type: integer
      description: Cell number (1-12, 13=A, 14=B). Mapping depends on layout.
  transport: http

- id: switch_pgm_tcp
  label: Switch PGM (TCP)
  kind: action
  command: "<STX>SPGM:{cell}<ETX>"
  params:
    - name: cell
      type: string
      description: ASCII cell number, e.g. "01"-"14" (1-12 plus A=13, B=14)
  transport: tcp

- id: dsk_on_http
  label: DSK On (HTTP)
  kind: action
  command: "/cgi-bin/video_mixer?cmd=SDSK&control=1"
  params: []
  transport: http

- id: dsk_off_http
  label: DSK Off (HTTP)
  kind: action
  command: "/cgi-bin/video_mixer?cmd=SDSK&control=0"
  params: []
  transport: http

- id: dsk_on_tcp
  label: DSK On (TCP)
  kind: action
  command: "<STX>SDSK:1<ETX>"
  params: []
  transport: tcp

- id: dsk_off_tcp
  label: DSK Off (TCP)
  kind: action
  command: "<STX>SDSK:0<ETX>"
  params: []
  transport: tcp

- id: capture_screenshot_http
  label: Capture Screenshot (HTTP)
  kind: action
  command: "/cgi-bin/video_mixer?cmd=SCAP&control={control}&image={image}"
  params:
    - name: control
      type: integer
      description: "1=PGM, 2=KEY"
    - name: image
      type: integer
      description: "0=no image attached, 1=image attached (PNG)"
  transport: http

- id: capture_screenshot_pgm_tcp
  label: Capture PGM (TCP)
  kind: action
  command: "<STX>SCAP:1<ETX>"
  params: []
  transport: tcp

- id: capture_screenshot_key_tcp
  label: Capture KEY (TCP)
  kind: action
  command: "<STX>SCAP:2<ETX>"
  params: []
  transport: tcp

- id: capture_ai_background_http
  label: Capture AI Background (HTTP)
  kind: action
  command: "/cgi-bin/video_mixer?cmd=SAIB&input={input}&bkgd={bkgd}"
  params:
    - name: input
      type: integer
      description: Input number to capture (1-4)
    - name: bkgd
      type: integer
      description: BKGD number to capture (1-4)
  transport: http

- id: capture_ai_background_tcp
  label: Capture AI Background (TCP)
  kind: action
  command: "<STX>SAIB:{input}:{bkgd}<ETX>"
  params:
    - name: input
      type: integer
      description: Input number (1-4)
    - name: bkgd
      type: integer
      description: BKGD number (1-4)
  transport: tcp

- id: get_multiview_layout_http
  label: Get Multi View Layout (HTTP)
  kind: query
  command: "/cgi-bin/video_mixer?cmd=QMVL"
  params: []
  transport: http

- id: get_multiview_layout_tcp
  label: Get Multi View Layout (TCP)
  kind: query
  command: "<STX>QMVL:1<ETX>"
  params: []
  transport: tcp

- id: get_multiview_cell_http
  label: Get Multi View Cell (HTTP)
  kind: query
  command: "/cgi-bin/video_mixer?cmd=QMVC&cell={cell}"
  params:
    - name: cell
      type: integer
      description: Cell number (1-14; 13=A, 14=B)
  transport: http

- id: get_multiview_cell_tcp
  label: Get Multi View Cell (TCP)
  kind: query
  command: "<STX>QMVC:{cell}<ETX>"
  params:
    - name: cell
      type: integer
      description: Cell number (1-14)
  transport: tcp

- id: get_pgm_cell_http
  label: Get PGM Cell (HTTP)
  kind: query
  command: "/cgi-bin/video_mixer?cmd=QPGM"
  params: []
  transport: http

- id: get_pgm_cell_tcp
  label: Get PGM Cell (TCP)
  kind: query
  command: "<STX>QPGM<ETX>"
  params: []
  transport: tcp

- id: get_multiview_image_http
  label: Get Multi View Image (HTTP)
  kind: query
  command: "/cgi-bin/video_mixer?cmd=QMVI&cell={cell}"
  params:
    - name: cell
      type: integer
      description: Cell number (1-14)
  transport: http

- id: control_volume_http
  label: Control Volume (HTTP)
  kind: action
  command: "/cgi-bin/video_mixer?cmd=SCVL&volume={volume}"
  params:
    - name: volume
      type: integer
      description: Volume level (0-100)
  transport: http

- id: control_volume_tcp
  label: Control Volume (TCP)
  kind: action
  command: "<STX>SCVL:{volume}<ETX>"
  params:
    - name: volume
      type: integer
      description: Volume level (0-100)
  transport: tcp

- id: get_volume_http
  label: Get Audio Volume (HTTP)
  kind: query
  command: "/cgi-bin/video_mixer?cmd=QVOL"
  params: []
  transport: http

- id: get_volume_tcp
  label: Get Audio Volume (TCP)
  kind: query
  command: "<STX>QVOL<ETX>"
  params: []
  transport: tcp

- id: get_vm_enable_status_http
  label: Get VM Enable Status (HTTP)
  kind: query
  command: "/cgi-bin/video_mixer?cmd=QVME"
  params: []
  transport: http

- id: get_vm_enable_status_tcp
  label: Get VM Enable Status (TCP)
  kind: query
  command: "<STX>QVME<ETX>"
  params: []
  transport: tcp
```

## Feedbacks
```yaml
- id: pgm_cell
  label: PGM Cell Number
  type: integer
  description: Currently selected PGM cell (1-14); 0 if none selected
- id: multiview_layout
  label: Multi View Layout
  type: enum
  values: [layout1, layout2, layout3]
- id: multiview_cell_name
  label: Multi View Cell Name
  type: string
- id: multiview_cell_type
  label: Multi View Cell Type
  type: enum
  values: [none, input, movie, image, key, scene, pgm_output, pvw, internal_sg]
- id: output_volume
  label: Output Volume
  type: integer
  description: Volume value 0-100
- id: vm_enable_status
  label: VideoMixerEnable Status
  type: enum
  values: [off, on]
- id: tcp_error
  label: TCP Error Response
  type: enum
  values: [api_format_error, undefined_command, communication_error, communication_timeout]
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented that are not covered by discrete actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures documented in source
```

## Notes
- Known protocol given as "RS-232C" but source exclusively documents HTTP (port 1337) and TCP (port 1437). No RS-232 / serial interface is described.
- HTTP requests are GET only; URL pattern: `http://[IP]:1337/cgi-bin/video_mixer?cmd=[Command]&[Param]=[Value]&...`
- TCP frame format: `<STX>` (0x02) + 4-char Command + `:` + params separated by `:` + `<ETX>` (0x03).
- TCP responses generally begin with response mnemonic (`APGM`, `ADSK`, `ACAP`, `AAIB`, `AMVL`, `AMVC`, `AVOL`, `AVME`) followed by `:`-separated parameters.
- TCP errors use command `EROR` with codes 01 (API format error), 02 (undefined command), 03 (communication error), 04 (communication timeout).
- TCP server disconnects after 20 seconds of inactivity since the last response command.
- `QMVI` (Get Multi View Image) is HTTP-only; TCP not supported.
- `SCAP` via TCP returns the captured file name in parameter 2 on success; TCP does not attach image files (use HTTP for that).
<!-- UNRESOLVED: protocol mismatch between declared "RS-232C" and source-documented HTTP/TCP; firmware version not stated; no safety or event documentation. -->

## Provenance

```yaml
source_domains:
  - eww.pass.panasonic.co.jp
source_urls:
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/MPS_VM/WebApplication_en.pdf
retrieved_at: 2026-08-01T09:13:56.201Z
last_checked_at: 2026-08-05T08:34:58.829Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:34:58.829Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions match source command mnemonics (SPGM/SDSK/SCAP/SAIB/QMVL/QMVC/QPGM/QMVI/SCVL/QVOL/QVME) with correct parameters and shapes; transport ports 1337/1437 verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Known protocol was given as \"RS-232C\" but the source exclusively describes HTTP and TCP. No RS-232 interface is documented."
- "no settable parameters documented that are not covered by discrete actions"
- "no unsolicited notifications documented in source"
- "no multi-step sequences described explicitly in source"
- "no safety warnings or interlock procedures documented in source"
- "protocol mismatch between declared \"RS-232C\" and source-documented HTTP/TCP; firmware version not stated; no safety or event documentation."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
