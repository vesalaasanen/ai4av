---
spec_id: admin/benq-lu9715
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ LU9715 Control Spec"
manufacturer: BenQ
model_family: LU9715
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - LU9715
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - benq.com
  - manua.ls
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - https://esupportdownload.benq.com/esupport/Projector/UserManual/LU9715/LU9715_UM_EN_180409171906.pdf
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/LU9715/LU9715_RS232%20Control%20Guide_0_Windows7_Windows8_WinXP.pdf"
  - https://www.benq.com/en-us/support/downloads-faq/products/projector/lu9715/manual.html
  - https://www.manua.ls/benq/lu9715/manual
retrieved_at: 2026-05-14T12:10:39.209Z
last_checked_at: 2026-07-21T21:31:59.920Z
generated_at: 2026-07-21T21:31:59.920Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no firmware version compatibility stated"
  - "specific response format for read commands not fully documented (only error responses described)"
  - "configurable (2400/4800/9600/14400/19200/38400/57600/115200); check OSD for current setting"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "exact response format for read commands not documented (e.g. what string is returned for *pow=?#)"
  - "default baud rate not stated"
  - "command timing constraints not stated"
  - "maximum concurrent connection count over TCP not stated"
verification:
  verdict: verified
  checked_at: 2026-07-21T21:31:59.920Z
  matched_actions: 48
  action_count: 48
  confidence: medium
  summary: "All 48 spec actions matched literally; shapes conform to source; transport parameters verified; complete source coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# BenQ LU9715 Control Spec

## Summary
BenQ LU9715 laser projector controllable via RS-232 serial, TCP (port 8000 over LAN), or RS-232 over HDBaseT. Command format is `<CR>*<command>=<value>#<CR>`. Case-insensitive ASCII protocol. Supports power, source selection, audio, picture mode/settings, lamp mode, aspect ratio, 3D, blank/freeze, menu navigation, and various operational settings.

<!-- UNRESOLVED: no firmware version compatibility stated -->
<!-- UNRESOLVED: specific response format for read commands not fully documented (only error responses described) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: configurable (2400/4800/9600/14400/19200/38400/57600/115200); check OSD for current setting
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 8000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "<CR>*pow=on#<CR>"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "<CR>*pow=off#<CR>"
  params: []

- id: select_source
  label: Select Source
  kind: action
  command: "<CR>*sour={source}#<CR>"
  params:
    - name: source
      type: enum
      values: [RGB, RGB2, hdmi, hdmi2, vid, svid]
      description: Input source (supported: RGB, RGB2, hdmi, hdmi2, vid, svid)

- id: mute_on
  label: Mute On
  kind: action
  command: "<CR>*mute=on#<CR>"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "<CR>*mute=off#<CR>"
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: "<CR>*vol=+#<CR>"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "<CR>*vol=-#<CR>"
  params: []

- id: audio_source
  label: Audio Source Select
  kind: action
  command: "<CR>*audiosour={source}#<CR>"
  params:
    - name: source
      type: enum
      values: [off, RGB, RGB2, vid, hdmi, hdmi2]
      description: Audio source

- id: picture_mode
  label: Picture Mode
  kind: action
  command: "<CR>*appmod={mode}#<CR>"
  params:
    - name: mode
      type: enum
      values: [preset, srgb, bright, cine, user1, user2, threed]
      description: Picture mode (supported: preset, srgb, bright, cine, user1, user2, threed)

- id: contrast_up
  label: Contrast Up
  kind: action
  command: "<CR>*con=+#<CR>"
  params: []

- id: contrast_down
  label: Contrast Down
  kind: action
  command: "<CR>*con=-#<CR>"
  params: []

- id: brightness_up
  label: Brightness Up
  kind: action
  command: "<CR>*bri=+#<CR>"
  params: []

- id: brightness_down
  label: Brightness Down
  kind: action
  command: "<CR>*bri=-#<CR>"
  params: []

- id: color_up
  label: Color Up
  kind: action
  command: "<CR>*color=+#<CR>"
  params: []

- id: color_down
  label: Color Down
  kind: action
  command: "<CR>*color=-#<CR>"
  params: []

- id: sharpness_up
  label: Sharpness Up
  kind: action
  command: "<CR>*sharp=+#<CR>"
  params: []

- id: sharpness_down
  label: Sharpness Down
  kind: action
  command: "<CR>*sharp=-#<CR>"
  params: []

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "<CR>*ct={temp}#<CR>"
  params:
    - name: temp
      type: enum
      values: [warm, normal, cool, native]
      description: Color temperature (supported: warm, normal, cool, native)

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "<CR>*asp={ratio}#<CR>"
  params:
    - name: ratio
      type: enum
      values: ["4:3", "16:9", "16:10", AUTO, REAL]
      description: Aspect ratio (supported: 4:3, 16:9, 16:10, AUTO, REAL)

- id: digital_zoom_in
  label: Digital Zoom In
  kind: action
  command: "<CR>*zoomI#<CR>"
  params: []

- id: digital_zoom_out
  label: Digital Zoom Out
  kind: action
  command: "<CR>*zoomO#<CR>"
  params: []

- id: auto_sync
  label: Auto Sync
  kind: action
  command: "<CR>*auto#<CR>"
  params: []

- id: brilliant_color_on
  label: Brilliant Color On
  kind: action
  command: "<CR>*BC=on#<CR>"
  params: []

- id: brilliant_color_off
  label: Brilliant Color Off
  kind: action
  command: "<CR>*BC=off#<CR>"
  params: []

- id: projector_position
  label: Projector Position
  kind: action
  command: "<CR>*pp={position}#<CR>"
  params:
    - name: position
      type: enum
      values: [FT, RE, RC, FC]
      description: "Front Table, Rear Table, Rear Ceiling, Front Ceiling"

- id: quick_auto_search_on
  label: Quick Auto Search On
  kind: action
  command: "<CR>*QAS=on#<CR>"
  params: []

- id: quick_auto_search_off
  label: Quick Auto Search Off
  kind: action
  command: "<CR>*QAS=off#<CR>"
  params: []

- id: direct_power_on
  label: Direct Power On
  kind: action
  command: "<CR>*directpower={state}#<CR>"
  params:
    - name: state
      type: enum
      values: [on, off]
      description: Enable/disable direct power on

- id: signal_power_on
  label: Signal Power On
  kind: action
  command: "<CR>*autopower={state}#<CR>"
  params:
    - name: state
      type: enum
      values: [on, off]
      description: Enable/disable signal power on

- id: standby_monitor_out_on
  label: Standby Monitor Out On
  kind: action
  command: "<CR>*standbymnt=on#<CR>"
  params: []

- id: standby_monitor_out_off
  label: Standby Monitor Out Off
  kind: action
  command: "<CR>*standbymnt=off#<CR>"
  params: []

- id: set_baud_rate
  label: Set Baud Rate
  kind: action
  command: "<CR>*baud={rate}#<CR>"
  params:
    - name: rate
      type: enum
      values: ["2400", "4800", "9600", "14400", "19200", "38400", "57600", "115200"]
      description: Baud rate in bps

- id: lamp_mode
  label: Lamp Mode
  kind: action
  command: "<CR>*lampm={mode}#<CR>"
  params:
    - name: mode
      type: enum
      values: [lnor, eco, seco]
      description: "Lamp mode (supported: lnor=Normal, eco=Eco, seco=Smart Eco/ImageCare)"

- id: blank_on
  label: Blank On
  kind: action
  command: "<CR>*blank=on#<CR>"
  params: []

- id: blank_off
  label: Blank Off
  kind: action
  command: "<CR>*blank=off#<CR>"
  params: []

- id: freeze_on
  label: Freeze On
  kind: action
  command: "<CR>*freeze=on#<CR>"
  params: []

- id: freeze_off
  label: Freeze Off
  kind: action
  command: "<CR>*freeze=off#<CR>"
  params: []

- id: menu_on
  label: Menu On
  kind: action
  command: "<CR>*menu=on#<CR>"
  params: []

- id: menu_off
  label: Menu Off
  kind: action
  command: "<CR>*menu=off#<CR>"
  params: []

- id: nav_up
  label: Navigate Up
  kind: action
  command: "<CR>*up#<CR>"
  params: []

- id: nav_down
  label: Navigate Down
  kind: action
  command: "<CR>*down#<CR>"
  params: []

- id: nav_right
  label: Navigate Right
  kind: action
  command: "<CR>*right#<CR>"
  params: []

- id: nav_left
  label: Navigate Left
  kind: action
  command: "<CR>*left#<CR>"
  params: []

- id: nav_enter
  label: Navigate Enter
  kind: action
  command: "<CR>*enter#<CR>"
  params: []

- id: 3d_mode
  label: 3D Mode
  kind: action
  command: "<CR>*3d={mode}#<CR>"
  params:
    - name: mode
      type: enum
      values: [off, auto, tb, fs, fp, sbs, da, iv]
      description: "3D sync mode (supported: off, auto=Auto, tb=TopBottom, fs=FrameSequential, fp=FramePacking, sbs=SideBySide, da=InverterDisable, iv=Inverter)"

- id: instant_on
  label: Instant On
  kind: action
  command: "<CR>*ins={state}#<CR>"
  params:
    - name: state
      type: enum
      values: [on, off]
      description: Enable/disable instant on

- id: high_altitude_on
  label: High Altitude Mode On
  kind: action
  command: "<CR>*Highaltitude=on#<CR>"
  params: []

- id: high_altitude_off
  label: High Altitude Mode Off
  kind: action
  command: "<CR>*Highaltitude=off#<CR>"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power Status
  type: enum
  command: "<CR>*pow=?#<CR>"
  values: [on, off]

- id: current_source
  label: Current Source
  type: string
  command: "<CR>*sour=?#<CR>"

- id: mute_state
  label: Mute Status
  type: enum
  command: "<CR>*mute=?#<CR>"
  values: [on, off]

- id: volume_status
  label: Volume Status
  type: string
  command: "<CR>*vol=?#<CR>"

- id: audio_source_status
  label: Audio Source Status
  type: string
  command: "<CR>*audiosour=?#<CR>"

- id: picture_mode_status
  label: Picture Mode
  type: string
  command: "<CR>*appmod=?#<CR>"

- id: contrast_value
  label: Contrast Value
  type: string
  command: "<CR>*con=?#<CR>"

- id: brightness_value
  label: Brightness Value
  type: string
  command: "<CR>*bri=?#<CR>"

- id: color_value
  label: Color Value
  type: string
  command: "<CR>*color=?#<CR>"

- id: sharpness_value
  label: Sharpness Value
  type: string
  command: "<CR>*sharp=?#<CR>"

- id: color_temperature_status
  label: Color Temperature Status
  type: string
  command: "<CR>*ct=?#<CR>"

- id: aspect_status
  label: Aspect Status
  type: string
  command: "<CR>*asp=?#<CR>"

- id: brilliant_color_status
  label: Brilliant Color Status
  type: enum
  command: "<CR>*BC=?#<CR>"
  values: [on, off]

- id: projector_position_status
  label: Projector Position Status
  type: string
  command: "<CR>*pp=?#<CR>"

- id: quick_auto_search_status
  label: Quick Auto Search Status
  type: enum
  command: "<CR>*QAS=?#<CR>"
  values: [on, off]

- id: direct_power_status
  label: Direct Power On Status
  type: enum
  command: "<CR>*directpower=?#<CR>"
  values: [on, off]

- id: signal_power_status
  label: Signal Power On Status
  type: enum
  command: "<CR>*autopower=?#<CR>"
  values: [on, off]

- id: standby_monitor_out_status
  label: Standby Monitor Out Status
  type: enum
  command: "<CR>*standbymnt=?#<CR>"
  values: [on, off]

- id: baud_rate_status
  label: Current Baud Rate
  type: string
  command: "<CR>*baud=?#<CR>"

- id: lamp_hours
  label: Lamp Hours
  type: integer
  command: "<CR>*ltim=?#<CR>"

- id: lamp_mode_status
  label: Lamp Mode Status
  type: string
  command: "<CR>*lampm=?#<CR>"

- id: model_name
  label: Model Name
  type: string
  command: "<CR>*modelname=?#<CR>"

- id: blank_status
  label: Blank Status
  type: enum
  command: "<CR>*blank=?#<CR>"
  values: [on, off]

- id: freeze_status
  label: Freeze Status
  type: enum
  command: "<CR>*freeze=?#<CR>"
  values: [on, off]

- id: 3d_sync_status
  label: 3D Sync Status
  type: string
  command: "<CR>*3d=?#<CR>"

- id: instant_on_status
  label: Instant On Status
  type: enum
  command: "<CR>*ins=?#<CR>"
  values: [on, off]

- id: high_altitude_status
  label: High Altitude Mode Status
  type: enum
  command: "<CR>*Highaltitude=?#<CR>"
  values: [on, off]
```

## Variables
```yaml
# No continuous settable variables with explicit numeric ranges found.
# Volume and picture parameters use incremental +/- commands only.
```

## Events
```yaml
# Source describes no unsolicited notifications.
```

## Macros
```yaml
# Source describes no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
- Command format: `<CR>*<param>=<value>#<CR>` for writes; `<CR>*<param>?#<CR>` for reads.
- Commands are case-insensitive (uppercase, lowercase, mixed all accepted).
- Error responses: `Illegal format` (bad syntax), `Unsupported item` (valid but not for this model), `Block item` (valid but cannot execute under current conditions).
- Commands work when standby power is 0.5W or a supported baud rate is set.
- TCP control over LAN uses same command set as serial; commands must start and end with `<CR>`.
- Source table marks many commands `No` (unsupported on LU9715) — only `Yes`-marked commands included above.
- Default baud rate is not stated; must be checked from projector OSD menu.

<!-- UNRESOLVED: exact response format for read commands not documented (e.g. what string is returned for *pow=?#) -->
<!-- UNRESOLVED: default baud rate not stated -->
<!-- UNRESOLVED: command timing constraints not stated -->
<!-- UNRESOLVED: maximum concurrent connection count over TCP not stated -->

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - benq.com
  - manua.ls
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - https://esupportdownload.benq.com/esupport/Projector/UserManual/LU9715/LU9715_UM_EN_180409171906.pdf
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/LU9715/LU9715_RS232%20Control%20Guide_0_Windows7_Windows8_WinXP.pdf"
  - https://www.benq.com/en-us/support/downloads-faq/products/projector/lu9715/manual.html
  - https://www.manua.ls/benq/lu9715/manual
retrieved_at: 2026-05-14T12:10:39.209Z
last_checked_at: 2026-07-21T21:31:59.920Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:31:59.920Z
matched_actions: 48
action_count: 48
confidence: medium
summary: "All 48 spec actions matched literally; shapes conform to source; transport parameters verified; complete source coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no firmware version compatibility stated"
- "specific response format for read commands not fully documented (only error responses described)"
- "configurable (2400/4800/9600/14400/19200/38400/57600/115200); check OSD for current setting"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
- "exact response format for read commands not documented (e.g. what string is returned for *pow=?#)"
- "default baud rate not stated"
- "command timing constraints not stated"
- "maximum concurrent connection count over TCP not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
