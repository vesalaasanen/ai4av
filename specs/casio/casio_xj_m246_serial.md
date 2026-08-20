---
spec_id: admin/casio-xj-m246
schema_version: ai4av-public-spec-v1
revision: 1
title: "Casio XJ-M246 Control Spec"
manufacturer: Casio
model_family: XJ-M246
aliases: []
compatible_with:
  manufacturers:
    - Casio
  models:
    - XJ-M246
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - audiogeneral.com
  - support.casio.com
  - manualslib.com
source_urls:
  - https://www.audiogeneral.com/casio/xjm246_manual.pdf
  - https://support.casio.com/pdf/007/YK-5_RS-232C_Control_E.pdf
  - https://www.manualslib.com/manual/2666925/Casio-Xj-A-Series.html
retrieved_at: 2026-08-10T23:00:48.152Z
last_checked_at: 2026-08-19T09:00:32.050Z
generated_at: 2026-08-19T09:00:32.050Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "cable/connector wiring not described in source. Source references YK-60 special cable and D-Sub 9-pin cross cable but pinout omitted."
  - "source documents no unsolicited events. Projector returns \"?\" on unrecognized commands per source, but this is a response, not an event."
  - "source documents no multi-step sequences."
  - "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
  - "D-Sub 9-pin pinout not in source. YK-60 cable pinout not in source. XJ-A Series-only commands (OZM, OFC, KEY 31-34) marked in source; XJ-M246 may not support."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:00:32.050Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions map 1:1 to source commands with matching shapes; transport (19200/8/N/1, none) is verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Casio XJ-M246 Control Spec

## Summary
RS-232C serial control for Casio XJ-M246 projector. ASCII command/response protocol at 19200 baud, 8N1, no flow control. Spec covers power, input switching, video controls, picture modes, geometry, and diagnostics.

<!-- UNRESOLVED: cable/connector wiring not described in source. Source references YK-60 special cable and D-Sub 9-pin cross cable but pinout omitted. -->

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
- powerable  # inferred from PWR command
- routable   # inferred from SRC command
- queryable  # inferred from PWR?/LMP?/STS? queries
- levelable  # inferred from VOL command
```

## Actions
```yaml
- id: power
  label: Power On/Off
  kind: action
  command: "PWR{value}"
  params:
    - name: value
      type: integer
      description: "0 = Off, 1 = On"
  notes: "Read/write. Only PWR/PWR? valid when projector off (per source)."

- id: power_query
  label: Power Status Query
  kind: query
  command: "PWR?"
  params: []

- id: input_source
  label: Input Source
  kind: action
  command: "SRC{value}"
  params:
    - name: value
      type: integer
      description: "0=RGB, 1=Component, 2=Video, 6=Auto, 7=HDMI, 8=Network, 9=S-Video, 11=File Viewer, 12=USB Display, 13=CASIO USB Tool"
  notes: "Read/write. Value 8 = Wireless for XJ-A Series, Network for XJ-M Series."

- id: input_source_query
  label: Input Source Query
  kind: query
  command: "SRC?"
  params: []

- id: blank_screen
  label: Blank Screen
  kind: action
  command: "BLK{value}"
  params:
    - name: value
      type: integer
      description: "0 = Off, 1 = On"
  notes: "Read/write. Requires valid input signal."

- id: blank_screen_query
  label: Blank Screen Query
  kind: query
  command: "BLK?"
  params: []
  notes: "Read. BLK is RW per source command list."

- id: volume
  label: Volume
  kind: action
  command: "VOL{level}"
  params:
    - name: level
      type: integer
      description: "0-30 (0 = mute)"
  notes: "Read/write."

- id: volume_query
  label: Volume Query
  kind: query
  command: "VOL?"
  params: []

- id: color_mode
  label: Color Mode
  kind: action
  command: "PST{value}"
  params:
    - name: value
      type: integer
      description: "1=Graphics, 2=Theater, 3=Standard, 4=Blackboard, 5=Game"
  notes: "Read/write."

- id: color_mode_query
  label: Color Mode Query
  kind: query
  command: "PST?"
  params: []

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "ARZ{value}"
  params:
    - name: value
      type: integer
      description: "0=Normal, 1=16:9, 2=4:3, 3=Letter Box, 4=Full, 5=True, 6=4:3 (Forced)"
  notes: "Read/write. Requires valid input signal."

- id: aspect_ratio_query
  label: Aspect Ratio Query
  kind: query
  command: "ARZ?"
  params: []

- id: zoom_shift
  label: Zoom Shift
  kind: action
  command: "OZM{value}"
  params:
    - name: value
      type: integer
      description: "0=None, 1=One step shift towards Wide, 2=One step shift towards Tele"
  notes: "Write-only. XJ-A Series only per source. XJ-M246 may not support."

- id: focus_shift
  label: Focus Shift
  kind: action
  command: "OFC{value}"
  params:
    - name: value
      type: integer
      description: "0=None, 1=One step shift closer, 2=One step shift further"
  notes: "Write-only. XJ-A Series only per source. XJ-M246 may not support."

- id: light_time_query
  label: Light Time Query
  kind: query
  command: "LMP?"
  params: []
  notes: "Read-only. Returns hours."

- id: eco_mode
  label: Eco Mode
  kind: action
  command: "PMD{value}"
  params:
    - name: value
      type: integer
      description: "0=Off (Bright), 1=Off (Normal), 2=On (Auto), 3=On (Manual 1), 4=On (Manual 2), 5=On (Manual 3), 6=On (Manual 4), 7=On (Manual 5)"
  notes: "Read/write."

- id: eco_mode_query
  label: Eco Mode Query
  kind: query
  command: "PMD?"
  params: []

- id: freeze
  label: Freeze
  kind: action
  command: "FRZ{value}"
  params:
    - name: value
      type: integer
      description: "0 = Off, 1 = On"
  notes: "Read/write."

- id: freeze_query
  label: Freeze Query
  kind: query
  command: "FRZ?"
  params: []

- id: keystone
  label: Keystone Correction
  kind: action
  command: "KST{value}"
  params:
    - name: value
      type: integer
      description: "0-120. 0=-60, 60=0, 120=+60. 65≈+5."
  notes: "Read/write."

- id: keystone_query
  label: Keystone Correction Query
  kind: query
  command: "KST?"
  params: []

- id: keystone_increment
  label: Keystone Correction +
  kind: action
  command: "KSP"
  params: []
  notes: "Write-only. Raises current keystone by 1."

- id: keystone_decrement
  label: Keystone Correction -
  kind: action
  command: "KSM"
  params: []
  notes: "Write-only. Lowers current keystone by 1."

- id: key_press
  label: Remote Key Press
  kind: action
  command: "KEY{value}"
  params:
    - name: value
      type: integer
      description: "1-34. 1-4=blank, 5=ENTER, 6=ESC, 10=FUNC, 11=MENU, 12=POWER, 13=AUTO, 14=INPUT, 15=TIMER, 16=ASPECT, 17=BLANK, 18=FREEZE, 19=ECO, 20=KEYSTONE+, 21=KEYSTONE-, 22=D-ZOOM+, 23=D-ZOOM-, 24=VOLUME+, 25=VOLUME-, 26=PLAY, 27=REWIND, 28=FORWARD, 29=PREVIOUS, 30=NEXT, 31=ZOOM+, 32=ZOOM-, 33=FOCUS, 34=FOCUS"
  notes: "Write-only. Values 31-34 XJ-A Series only."

- id: setup_type
  label: Setup Type
  kind: action
  command: "POS{value}"
  params:
    - name: value
      type: integer
      description: "0=Front, 1=Ceiling mounted (rear), 2=Rear, 3=Ceiling mounted (front)"
  notes: "Read/write."

- id: setup_type_query
  label: Setup Type Query
  kind: query
  command: "POS?"
  params: []

- id: auto_power_off
  label: Auto Power Off
  kind: action
  command: "APO{value}"
  params:
    - name: value
      type: integer
      description: "0=Off, 1=5 min, 2=10 min, 3=15 min, 4=20 min, 5=30 min"
  notes: "Read/write."

- id: auto_power_off_query
  label: Auto Power Off Query
  kind: query
  command: "APO?"
  params: []

- id: error_status
  label: Error Status
  kind: query
  command: "STS?"
  params: []
  notes: "Read-only. 0=Normal, 1=Fan error, 2=Temp error, 7=Light error, 16=Other."

- id: volume_increment
  label: Volume +
  kind: action
  command: "VLP"
  params: []
  notes: "Write-only. Raises current volume by 1."

- id: volume_decrement
  label: Volume -
  kind: action
  command: "VLM"
  params: []
  notes: "Write-only. Lowers current volume by 1."

- id: mute
  label: Mute
  kind: action
  command: "MUT{value}"
  params:
    - name: value
      type: integer
      description: "0 = Off, 1 = On"
  notes: "Read/write."

- id: mute_query
  label: Mute Query
  kind: query
  command: "MUT?"
  params: []
```

## Feedbacks
```yaml
# CRITICAL: source documents no unsolicited feedback.
# Responses to queries use the format (range,current) per source.
# Populated as Variables below.
```

## Variables
```yaml
- id: power_state
  type: enum
  values: [off, on]
  source_command: "PWR?"
  notes: "Response format: (0-1,current)."

- id: input_source
  type: enum
  values: [rgb, component, video, auto, hdmi, network, s_video, file_viewer, usb_display, casio_usb_tool]
  source_command: "SRC?"
  notes: "Response format: (0-13,current)."

- id: blank_state
  type: enum
  values: [off, on]
  source_command: "BLK?"
  notes: "Response format: (0-1,current)."

- id: volume
  type: integer
  range: [0, 30]
  source_command: "VOL?"

- id: color_mode
  type: enum
  values: [graphics, theater, standard, blackboard, game]
  source_command: "PST?"

- id: aspect_ratio
  type: enum
  values: [normal, "16:9", "4:3", letter_box, full, true, "4:3_forced"]
  source_command: "ARZ?"

- id: light_time_hours
  type: integer
  range: [0, null]
  source_command: "LMP?"
  notes: "Returns hours."

- id: eco_mode
  type: enum
  values: [off_bright, off_normal, on_auto, on_manual_1, on_manual_2, on_manual_3, on_manual_4, on_manual_5]
  source_command: "PMD?"

- id: freeze_state
  type: enum
  values: [off, on]
  source_command: "FRZ?"

- id: keystone
  type: integer
  range: [0, 120]
  source_command: "KST?"

- id: setup_type
  type: enum
  values: [front, ceiling_rear, rear, ceiling_front]
  source_command: "POS?"

- id: auto_power_off
  type: enum
  values: [off, "5_min", "10_min", "15_min", "20_min", "30_min"]
  source_command: "APO?"

- id: error_status
  type: enum
  values: [normal, fan_error, temperature_error, light_error, other_error]
  source_command: "STS?"

- id: mute_state
  type: enum
  values: [off, on]
  source_command: "MUT?"
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited events. Projector returns "?" on unrecognized commands per source, but this is a response, not an event.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
Cmd format: parens wrap all commands. Sent as `(CMD)`. Response to read: `(range,current)`. Source notes: only PWR/PWR?/LMP? valid when projector off. Unknown cmd → `?` response. Out-of-range value ignored. Cmd send must wait until prev process completes ("serial port busy" risk). ASCII chars, decimal integers.
<!-- UNRESOLVED: D-Sub 9-pin pinout not in source. YK-60 cable pinout not in source. XJ-A Series-only commands (OZM, OFC, KEY 31-34) marked in source; XJ-M246 may not support. -->
````

Self-check pass: no fabricated voltages/ports/baud. 19200 stated. Auth=none inferred (Tier 2). Added 3 actions (`blank_screen_query`, `zoom_shift`, `focus_shift`) + 1 variable (`blank_state`). Existing IDs/shapes preserved.

## Provenance

```yaml
source_domains:
  - audiogeneral.com
  - support.casio.com
  - manualslib.com
source_urls:
  - https://www.audiogeneral.com/casio/xjm246_manual.pdf
  - https://support.casio.com/pdf/007/YK-5_RS-232C_Control_E.pdf
  - https://www.manualslib.com/manual/2666925/Casio-Xj-A-Series.html
retrieved_at: 2026-08-10T23:00:48.152Z
last_checked_at: 2026-08-19T09:00:32.050Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:00:32.050Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions map 1:1 to source commands with matching shapes; transport (19200/8/N/1, none) is verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "cable/connector wiring not described in source. Source references YK-60 special cable and D-Sub 9-pin cross cable but pinout omitted."
- "source documents no unsolicited events. Projector returns \"?\" on unrecognized commands per source, but this is a response, not an event."
- "source documents no multi-step sequences."
- "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
- "D-Sub 9-pin pinout not in source. YK-60 cable pinout not in source. XJ-A Series-only commands (OZM, OFC, KEY 31-34) marked in source; XJ-M246 may not support."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
