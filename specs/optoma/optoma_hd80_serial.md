---
spec_id: admin/optoma-hd80
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma HD80 Control Spec"
manufacturer: Optoma
model_family: HD80
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - HD80
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - optoma.co.uk
source_urls:
  - https://www.optoma.co.uk/uploads/RS232/HD80-RS232-en-GB.pdf
retrieved_at: 2026-06-02T21:26:12.293Z
last_checked_at: 2026-10-07T18:44:59.272Z
generated_at: 2026-10-07T18:44:59.272Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the Power On command row in the first table of the source PDF was garbled in the refined extract; the literal command code is not legible. Power Off (`002`) is unambiguous."
  - "source PDF row for Power On in the first table was garbled in"
  - "Power On command code not legible in source"
  - "source does not document any unsolicited notifications from"
  - "source does not document any multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-10-07T18:44:59.272Z
  matched_actions: 43
  action_count: 43
  confidence: medium
  summary: "All 43 units match source rows (power_on matched by function only; its code is garbled in source and the spec records UNRESOLVED); transport values confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Optoma HD80 Control Spec

## Summary
The Optoma HD80 is a 1080p home-theater projector. This spec covers RS-232C serial control of the projector using Optoma's "IR" command protocol at 115200 baud, 8N1. Each command is a single ASCII frame of the form `*<sp>0<sp>IR<sp>{code}<CR>`, and the projector echoes `*000<CR>` on success or `*001<CR>` on invalid command. The Power On command code is not legible in the source (the corresponding row in the source's first table was garbled in the refined extract) and is recorded as UNRESOLVED; Power Off (`002`) is unambiguous.

<!-- UNRESOLVED: the Power On command row in the first table of the source PDF was garbled in the refined extract; the literal command code is not legible. Power Off (`002`) is unambiguous. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not document any authentication procedure; do not infer none
```

**Frame format:** `*<sp>0<sp>IR<sp>{code}<CR>` — literal spaces separate the four fields, terminator is `<CR>` (0x0D). Every accepted frame produces `*000<CR>`; an invalid command produces `*001<CR>`.

## Traits
```yaml
- powerable  # Power Off command present (002); Power On command code UNRESOLVED
- routable   # Source select commands: DVI_Digital, HDMI 1, HDMI 2, Composite, S-Video, DVI_Analog
- queryable  # Get commands: 801 Lamp Hour, 802 Video Source, 803 Lamp Status, 804 Projector Status
- levelable  # Brightness, Contrast, Tint, Color commands
```

## Actions
```yaml
- id: power_off
  label: Power Off
  kind: action
  command: "* 0 IR 002\r"
  params: []

- id: menu
  label: Menu
  kind: action
  command: "* 0 IR 008\r"
  params: []

- id: up
  label: Up
  kind: action
  command: "* 0 IR 009\r"
  params: []

- id: down
  label: Down
  kind: action
  command: "* 0 IR 010\r"
  params: []

- id: right
  label: Right
  kind: action
  command: "* 0 IR 011\r"
  params: []

- id: left
  label: Left
  kind: action
  command: "* 0 IR 012\r"
  params: []

- id: enter
  label: Enter
  kind: action
  command: "* 0 IR 013\r"
  params: []

- id: source_cycle
  label: Source
  kind: action
  command: "* 0 IR 014\r"
  params: []

- id: resync
  label: Re-sync
  kind: action
  command: "* 0 IR 015\r"
  params: []

- id: source_dvi_digital
  label: Source: DVI_Digital
  kind: action
  command: "* 0 IR 016\r"
  params: []

- id: source_hdmi_1
  label: Source: HDMI 1
  kind: action
  command: "* 0 IR 017\r"
  params: []

- id: source_composite
  label: Source: Composite Video
  kind: action
  command: "* 0 IR 018\r"
  params: []

- id: source_svideo
  label: Source: S-Video
  kind: action
  command: "* 0 IR 019\r"
  params: []

- id: source_dvi_analog
  label: Source: DVI_Analog
  kind: action
  command: "* 0 IR 020\r"
  params: []

- id: aspect_16_9
  label: Aspect Ratio 16:9
  kind: action
  command: "* 0 IR 025\r"
  params: []

- id: aspect_4_3
  label: Aspect Ratio 4:3
  kind: action
  command: "* 0 IR 026\r"
  params: []

- id: aspect_letterbox
  label: Aspect ratio LetterBox
  kind: action
  command: "* 0 IR 027\r"
  params: []

- id: aspect_1_1
  label: Aspect ratio 1:1
  kind: action
  command: "* 0 IR 028\r"
  params: []

- id: source_lock_on
  label: Source Lock On
  kind: action
  command: "* 0 IR 030\r"
  params: []

- id: source_lock_off
  label: Source Lock Off
  kind: action
  command: "* 0 IR 031\r"
  params: []

- id: brightness
  label: Brightness
  kind: action
  command: "* 0 IR 035\r"
  params: []

- id: contrast
  label: Contrast
  kind: action
  command: "* 0 IR 036\r"
  params: []

- id: tint
  label: Tint
  kind: action
  command: "* 0 IR 037\r"
  params: []

- id: color
  label: Color
  kind: action
  command: "* 0 IR 038\r"
  params: []

- id: image_shift_up
  label: Image shift up
  kind: action
  command: "* 0 IR 039\r"
  params: []

- id: image_shift_down
  label: Image shift down
  kind: action
  command: "* 0 IR 040\r"
  params: []

- id: mode
  label: Mode
  kind: action
  command: "* 0 IR 041\r"
  params: []

- id: edge_mask
  label: Edge mask (overscan)
  kind: action
  command: "* 0 IR 042\r"
  params: []

- id: overscan_zoom
  label: Overscan (zoom)
  kind: action
  command: "* 0 IR 043\r"
  params: []

- id: keystone_up
  label: Keystone shift up
  kind: action
  command: "* 0 IR 046\r"
  params: []

- id: keystone_down
  label: Keystone shift down
  kind: action
  command: "* 0 IR 047\r"
  params: []

- id: image_shift_left
  label: Image shift left
  kind: action
  command: "* 0 IR 048\r"
  params: []

- id: image_shift_right
  label: Image shift right
  kind: action
  command: "* 0 IR 049\r"
  params: []

- id: source_hdmi_2
  label: Source: HDMI 2
  kind: action
  command: "* 0 IR 050\r"
  params: []

- id: power_on
  label: Power On
  kind: action
  # UNRESOLVED: source PDF row for Power On in the first table was garbled in
  # the refined extract (the command-code cells rendered as "OKOKOKOKOK"); the
  # literal command code cannot be confirmed from the source.
  command: UNRESOLVED  # UNRESOLVED: Power On command code not legible in source
  params: []

- id: get_lamp_hour
  label: Get Lamp Hour
  kind: query
  command: "* 0 IR 801\r"
  params: []
  notes: "Response: *002 xxxxx  (xxxxx range 0..99999)"

- id: get_video_source
  label: Get Video Source
  kind: query
  command: "* 0 IR 802\r"
  params: []
  notes: |
    Response: *003 xx where xx is one of:
      00 = no source
      01 = DVI_Digital
      02 = HDMI 1
      03 = Composite Video
      04 = S-Video
      05 = DVI_Analog
      06 = Component Video
      07 = HDMI 2
      08 = Testing

- id: get_lamp_status
  label: Get Lamp Status
  kind: query
  command: "* 0 IR 803\r"
  params: []
  notes: "Response: *004 xx  (00 = Brite Mode Off, 01 = Brtire Mode)"

- id: get_projector_status
  label: Get Projector status
  kind: query
  command: "* 0 IR 804\r"
  params: []
  notes: |
    Response: *005 xx where xx is:
      00 = Standby mode
      01 = Power On
      03 = Cooling on or cooling off
      04 = Lamp error
      05 = Thermal error
```

## Feedbacks
```yaml
- id: ack
  type: enum
  values: [ok, invalid]
  description: |
    Projector echoes a default ACK on every accepted frame and a distinct
    ACK on invalid command. Literal strings per the source:
      "*000<CR>" : Received OK
      "*001<CR>" : Invalid Command

- id: video_source
  type: enum
  values: [none, dvi_digital, hdmi_1, composite, svideo, dvi_analog, component, hdmi_2, testing]
  description: Returned by Get Video Source (802) as two-digit code 00..08
  query_command: "* 0 IR 802\r"

- id: lamp_status
  type: enum
  values: [brite_off, brite_on]
  description: Returned by Get Lamp Status (803) as 00 or 01
  query_command: "* 0 IR 803\r"

- id: projector_status
  type: enum
  values: [standby, power_on, cooling, lamp_error, thermal_error]
  description: Returned by Get Projector Status (804) as 00, 01, 03, 04, or 05
  query_command: "* 0 IR 804\r"

- id: lamp_hours
  type: integer
  description: Returned by Get Lamp Hour (801); range 0..99999
  query_command: "* 0 IR 801\r"
```

## Variables
```yaml
# No settable parameter ranges are documented in the source. Each command
# is a discrete action with no payload data fields.
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited notifications from
# the device (e.g. on lamp error, thermal warning, source change).
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Populate from explicit source text only.
```

## Notes
- **Baud rate is non-default for the Optoma family.** Most Optoma projectors default to 9600 baud; the HD80 explicitly requires 115200. Confirm against the projector's service menu before integrating.
- **Frame terminator.** The source's first table notes both `<CR> <LF>` together (line 19) and per-row `TERM1 = <CR>` (e.g. line 32). The per-row examples and the explicit `Terminator: <CR> = 0Dh` definition show that a single `<CR>` (0x0D) terminates each frame; the first table's `<CR> <LF>` notation is treated as descriptive, not as a required two-byte terminator. The source's own byte table at the top also has `<CR> = 0Dh = "\n"` which inverts the standard convention (CR is normally `"\r"`); the byte value 0x0D is trusted over the textual `\n` label.
- **Source typos carried verbatim.** Line 78 of the source spells "Brtire Mode" (almost certainly "Brite Mode"). Preserved in the `get_lamp_status` notes to keep the spec faithful to the source.
- **"Mode" and "Source" cycle commands.** The labels for codes 014 (`Source`) and 041 (`Mode`) are terse in the source. The exact cycle order and which display modes 041 steps through are not enumerated.
- **Power On ambiguity.** Code 002 = Power Off is unambiguous. The Power On row in the source's first table was garbled in the refined extract; the literal command code is recorded as UNRESOLVED rather than guessed (e.g. `001`).
- **Address field.** Every documented command uses address `0`. The frame format does not show other addresses in scope, and the spec preserves the literal `* 0 IR` form.
- **Authentication.** The source does not document any authentication procedure; `auth.type` is recorded as UNRESOLVED rather than inferred as `none`.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - optoma.co.uk
source_urls:
  - https://www.optoma.co.uk/uploads/RS232/HD80-RS232-en-GB.pdf
retrieved_at: 2026-06-02T21:26:12.293Z
last_checked_at: 2026-10-07T18:44:59.272Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T18:44:59.272Z
matched_actions: 43
action_count: 43
confidence: medium
summary: "All 43 units match source rows (power_on matched by function only; its code is garbled in source and the spec records UNRESOLVED); transport values confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the Power On command row in the first table of the source PDF was garbled in the refined extract; the literal command code is not legible. Power Off (`002`) is unambiguous."
- "source PDF row for Power On in the first table was garbled in"
- "Power On command code not legible in source"
- "source does not document any unsolicited notifications from"
- "source does not document any multi-step sequences."
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
