---
spec_id: admin/panasonic-media-production-suite-mps-100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic Media Production Suite MPS-100 Control Spec"
manufacturer: Panasonic
model_family: "Media Production Suite MPS-100"
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - "Media Production Suite MPS-100"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eww.pass.panasonic.co.jp
  - pro-av.panasonic.net
source_urls:
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/MPS_VM/WebApplication_en.pdf
  - https://pro-av.panasonic.net/en/software/mps/vm/features.html
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/download/EN/ep2main/mps_e.htm
retrieved_at: 2026-07-02T21:33:50.641Z
last_checked_at: 2026-07-07T11:48:28.304Z
generated_at: 2026-07-07T11:48:28.304Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input context labels this family \"RS-232C\" but the refined source document specifies only HTTP and TCP transports. No serial/RS-232 configuration is documented. Model name \"MPS-100\" inferred from entity/family context; the source document itself titles the product \"Media Production Suite\" Video Mixer plugin without stating the host server model."
  - "no spontaneous event/notification mechanism described in source."
  - "no multi-step sequences described in source."
  - "entity/family context labels this device RS-232C, but source documents only HTTP (port 1337) and TCP (port 1437). No serial/baud/parity config exists in source."
  - "host server model \"MPS-100\" not explicitly named in the API spec source; inferred from family/entity context."
  - "firmware/software version compatibility for this API (v1.1) not stated beyond the document's own version stamp."
  - "authentication — no login/token procedure described; marked `none` by Tier-2 inference but unverified against a live device."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:48:28.304Z
  matched_actions: 11
  action_count: 11
  confidence: medium
  summary: "All 11 spec actions match source commands verbatim; transport parameters verified in sections 2.1-2.2. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-03
---

# Panasonic Media Production Suite MPS-100 Control Spec

## Summary
External control API specification (v1.1, Nov 2025) for the Video Mixer plugin of the Panasonic Media Production Suite software running on the MPS-100 server. Control surface is an HTTP Web API (GET requests) and a TCP command protocol — not RS-232. Covers PGM switching, DSK control, screenshot/AI-background capture, Multi View layout/cell/image queries, and output audio volume control.

<!-- UNRESOLVED: input context labels this family "RS-232C" but the refined source document specifies only HTTP and TCP transports. No serial/RS-232 configuration is documented. Model name "MPS-100" inferred from entity/family context; the source document itself titles the product "Media Production Suite" Video Mixer plugin without stating the host server model. -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  base_url: /cgi-bin/video_mixer  # HTTP CGI path, verbatim from source
  port: 1337  # HTTP Web API port (Table 2.1-1: "Currently fixed at 1337")
# TCP listening port documented separately as 1437 (section 2.2)
tcp_port: 1437  # TCP external control API listening port (section 2.2)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - routable  # inferred: SPGM PGM switching / cell routing commands
  - queryable  # inferred: QMVL/QMVC/QPGM/QMVI/QVOL/QVME query commands
  - levelable  # inferred: SCVL volume 0-100 control
```

## Actions
```yaml
actions:
  # HTTP command template (all GET): http://[IP]:1337/cgi-bin/video_mixer?cmd=[CMD]&[Param]=[Value]
  # TCP command template: <STX>(0x02) [CMD]:[Param1]:[Param2]<ETX>(0x03)
  # Response codes (TCP): 00 normal, 01 parameter error, 02 operation disabled, 03 VideoMixerEnable OFF

  - id: switch_pgm
    label: Switch PGM
    kind: action
    command: "SPGM"
    transport_notes: "HTTP: cmd=SPGM&cell={cell} | TCP: <STX>SPGM:{cell}<ETX>"
    params:
      - name: cell
        type: integer
        description: "Multi View cell number (1-12, 13=A, 14=B). Layout-dependent."

  - id: dsk_control
    label: DSK ON/OFF
    kind: action
    command: "SDSK"
    transport_notes: "HTTP: cmd=SDSK&control={control} | TCP: <STX>SDSK:{control}<ETX>"
    params:
      - name: control
        type: integer
        description: "0=DSK OFF, 1=DSK ON"

  - id: capture_screenshot
    label: Capture Screenshot
    kind: action
    command: "SCAP"
    transport_notes: "HTTP: cmd=SCAP&control={control}&image={image} (image attach HTTP-only) | TCP: <STX>SCAP:{control}<ETX> (no image attach over TCP)"
    params:
      - name: control
        type: integer
        description: "1=PGM video capture, 2=KEY video capture"
      - name: image
        type: integer
        description: "0=no image attached, 1=image attached (HTTP only)"

  - id: capture_ai_background
    label: Capture AI Background
    kind: action
    command: "SAIB"
    transport_notes: "HTTP: cmd=SAIB&input={input}&bkgd={bkgd} | TCP: <STX>SAIB:{input}:{bkgd}<ETX>. Note: Table 2.3-1 row 4 lists control cmd 'PAUSE'/response 'AAIB' but section 3.4 documents the command mnemonic as SAIB; SAIB used here as the verbatim detailed-spec payload."
    params:
      - name: input
        type: integer
        description: "Input number to capture (1-4)"
      - name: bkgd
        type: integer
        description: "BKGD number to capture to (1-4)"

  - id: control_volume
    label: Control Volume
    kind: action
    command: "SCVL"
    transport_notes: "HTTP: cmd=SCVL&volume={volume} | TCP: <STX>SCVL:{volume}<ETX>"
    params:
      - name: volume
        type: integer
        description: "Output audio volume (0-100)"

  - id: query_multi_view_layout
    label: Get Multi View Layout
    kind: query
    command: "QMVL"
    transport_notes: "HTTP: cmd=QMVL | TCP: <STX>QMVL<ETX>"
    params: []

  - id: query_multi_view_cell
    label: Get Multi View Cell
    kind: query
    command: "QMVC"
    transport_notes: "HTTP: cmd=QMVC&cell={cell} | TCP: <STX>QMVC:{cell}<ETX>"
    params:
      - name: cell
        type: integer
        description: "Cell number to retrieve (1-14; 13=A, 14=B)"

  - id: query_pgm_cell
    label: Get PGM Cell
    kind: query
    command: "QPGM"
    transport_notes: "HTTP: cmd=QPGM | TCP: <STX>QPGM<ETX>"
    params: []

  - id: query_multi_view_image
    label: Get Multi View Image
    kind: query
    command: "QMVI"
    transport_notes: "HTTP only: cmd=QMVI&cell={cell} (returns JPEG thumbnail). TCP NOT supported (section 3.8.2)."
    params:
      - name: cell
        type: integer
        description: "Cell number thumbnail to retrieve (1-14)"

  - id: query_audio_volume
    label: Get Audio Volume
    kind: query
    command: "QVOL"
    transport_notes: "HTTP: cmd=QVOL | TCP: <STX>QVOL<ETX>"
    params: []

  - id: query_vm_enable_status
    label: Get VM Enable Status
    kind: query
    command: "QVME"
    transport_notes: "HTTP: cmd=QVME | TCP: <STX>QVME<ETX>"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: http_response
    type: enum
    values: [ack, nack]
    description: "HTTP response value for all commands (Table 2.1-2). Query commands return structured [key]:[value] instead."

  - id: tcp_response_status
    type: enum
    values: ["00", "01", "02", "03"]
    description: "TCP response param 1: 00=normal, 01=parameter error, 02=operation disabled, 03=VideoMixerEnable OFF."

  - id: tcp_error
    type: enum
    values: ["01", "02", "03", "04"]
    description: "TCP unsolicited EROR command param 1 (Table 4.2-1): 01=API format error, 02=undefined command, 03=communication error, 04=communication timeout. Payload: <STX>EROR:{code}<ETX>."

  - id: multi_view_layout
    type: enum
    values: [1, 2, 3]
    description: "QMVL/AMVL response: layout pattern (1=Layout1, 2=Layout2, 3=Layout3)."

  - id: multi_view_cell_type
    type: enum
    values: [0, 1, 2, 3, 4, 5, 6, 7, 8]
    description: "QMVC/AMVC cell type: 0=None,1=Input,2=Movie,3=Image,4=Key,5=Scene,6=PGM Output,7=PVW,8=Internal SG."

  - id: pgm_cell
    type: integer
    description: "QPGM/APGM response: currently selected PGM cell number (1-14), 0 if none."

  - id: audio_volume
    type: integer
    description: "QVOL/AVOL response: volume 0-100."

  - id: vm_enable_status
    type: enum
    values: [0, 1]
    description: "QVME/AVME response: VideoMixerEnable state (0=OFF, 1=ON)."
```

## Variables
```yaml
# No settable continuous parameters beyond discrete actions; volume is covered by SCVL action.
```

## Events
```yaml
# No unsolicited notifications documented. EROR is a response to a malformed/undefined command, not a device-initiated event.
# UNRESOLVED: no spontaneous event/notification mechanism described in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Most control commands return error 03 (VideoMixerEnable operation while OFF) when VideoMixerEnable is OFF on the I/O Settings screen (sections 3.1-3.4, 3.9)."
  - "TCP connection auto-disconnects after 20s of inactivity since last response (section 2.2.2); reconnect requires re-establishing the connection."
  - "QMVI (Get Multi View Image) is HTTP-only - TCP not supported (section 3.8.2)."
  - "SCAP image attachment is HTTP-only - TCP returns filename only, no image bytes (section 3.3.2)."
# No explicit safety warnings, interlock sequences, or power-on ordering in source.
```

## Notes
- Two transports share command mnemonics but differ in framing: HTTP uses `cmd=` query params on `GET /cgi-bin/video_mixer`; TCP uses `<STX>(0x02) CMD:p1:p2 <ETX>(0x03)` ASCII framing with hex byte tables provided per command.
- TCP examples give explicit hex encodings (e.g. `<STX>SVME:1<ETX>` = `02 53 56 4D 45 3A 31 03`).
- Source document is titled "Media Production Suite Video Mixer Plugin External Control API Specification v1.1 (Nov 2025)" — it covers only the Video Mixer plugin; other MPS plugins (PTZ Control, etc.) have separate specs not included here.
- Table 2.3-1 row 4 appears to contain a typo: control command listed as "PAUSE" and response as "AAIB", but section 3.4 ("Capture AI Background") documents the control mnemonic as `SAIB` with response `AAIB`. The detailed section (3.4) is authoritative; `SAIB` used in Actions.
- Table 3.10-3 header for QVOL response command reads "AMVL" but the example response uses `AVOL` — likely a table typo; `AVOL` is the documented response mnemonic (section 3.10.2 example).

<!-- UNRESOLVED: entity/family context labels this device RS-232C, but source documents only HTTP (port 1337) and TCP (port 1437). No serial/baud/parity config exists in source. -->
<!-- UNRESOLVED: host server model "MPS-100" not explicitly named in the API spec source; inferred from family/entity context. -->
<!-- UNRESOLVED: firmware/software version compatibility for this API (v1.1) not stated beyond the document's own version stamp. -->
<!-- UNRESOLVED: authentication — no login/token procedure described; marked `none` by Tier-2 inference but unverified against a live device. -->

## Provenance

```yaml
source_domains:
  - eww.pass.panasonic.co.jp
  - pro-av.panasonic.net
source_urls:
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/MPS_VM/WebApplication_en.pdf
  - https://pro-av.panasonic.net/en/software/mps/vm/features.html
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/download/EN/ep2main/mps_e.htm
retrieved_at: 2026-07-02T21:33:50.641Z
last_checked_at: 2026-07-07T11:48:28.304Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:48:28.304Z
matched_actions: 11
action_count: 11
confidence: medium
summary: "All 11 spec actions match source commands verbatim; transport parameters verified in sections 2.1-2.2. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input context labels this family \"RS-232C\" but the refined source document specifies only HTTP and TCP transports. No serial/RS-232 configuration is documented. Model name \"MPS-100\" inferred from entity/family context; the source document itself titles the product \"Media Production Suite\" Video Mixer plugin without stating the host server model."
- "no spontaneous event/notification mechanism described in source."
- "no multi-step sequences described in source."
- "entity/family context labels this device RS-232C, but source documents only HTTP (port 1337) and TCP (port 1437). No serial/baud/parity config exists in source."
- "host server model \"MPS-100\" not explicitly named in the API spec source; inferred from family/entity context."
- "firmware/software version compatibility for this API (v1.1) not stated beyond the document's own version stamp."
- "authentication — no login/token procedure described; marked `none` by Tier-2 inference but unverified against a live device."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
