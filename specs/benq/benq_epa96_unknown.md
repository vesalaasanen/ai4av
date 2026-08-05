---
spec_id: admin/benq-epa96
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ EPA96 Control Spec"
manufacturer: BenQ
model_family: EPA96
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - EPA96
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - scribd.com
  - benq.com
  - github.com
  - audiogeneral.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - https://www.scribd.com/document/499375003/Rs232-Commands-Benq
  - https://www.benq.com/en-us/business/support/user-manual.html
  - https://github.com/rrooggiieerr/benqprojector.py
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
retrieved_at: 2026-05-14T12:06:38.167Z
last_checked_at: 2026-08-05T08:10:34.532Z
generated_at: 2026-08-05T08:10:34.532Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "default baud rate not stated in source; 9600 listed first"
  - "no absolute settable numeric ranges found; volume/contrast/brightness/color/sharpness use incremental +/- only"
  - "no unsolicited notification events documented in source"
  - "no multi-step sequences documented in source"
  - "power-off cooldown or lamp restrike delay not documented in source"
  - "default baud rate not confirmed (9600 listed first in serial settings; device supports 2400-115200 per command table)"
  - "volume/contrast/brightness/color/sharpness numeric ranges not stated"
  - "response format for read queries not fully documented"
  - "power-on/off timing constraints and lamp cooldown not stated"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:10:34.532Z
  matched_actions: 51
  action_count: 51
  confidence: medium
  summary: "All 51 spec actions and feedbacks match source-documented Yes-supported wire tokens; transport values (port 8000, baud 9600, 8N1, no flow control) literal in source. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# BenQ EPA96 Control Spec

## Summary

BenQ EPA96 projector with RS-232 serial control and RS-232-over-LAN (TCP) control. Commands use ASCII format `<CR>*<command>=<value>#<CR>`. Case-insensitive. Error responses: `Illegal format`, `Unsupported item`, `Block item`.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport

```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 8000
serial:
  baud_rate: 9600  # UNRESOLVED: default baud rate not stated in source; 9600 listed first
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
traits:
  - powerable    # power on/off commands present
  - routable     # source selection commands present
  - queryable    # read/status query commands present
  - levelable    # volume, contrast, brightness, color, sharpness controls present
```

## Actions

```yaml
actions:
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
        description: Input source (supported values for EPA96)

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

  - id: select_audio_source
    label: Select Audio Source
    kind: action
    command: "<CR>*audiosour={source}#<CR>"
    params:
      - name: source
        type: enum
        values: [off, RGB, RGB2, vid, hdmi, hdmi2]
        description: Audio source (supported values for EPA96)

  - id: select_picture_mode
    label: Select Picture Mode
    kind: action
    command: "<CR>*appmod={mode}#<CR>"
    params:
      - name: mode
        type: enum
        values: [preset, srgb, bright, cine, user1, user2, threed]
        description: Picture mode (supported values for EPA96)

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

  - id: set_color_temperature
    label: Set Color Temperature
    kind: action
    command: "<CR>*ct={temp}#<CR>"
    params:
      - name: temp
        type: enum
        values: [warm, normal, cool, native]
        description: Color temperature preset (supported values for EPA96)

  - id: set_aspect_ratio
    label: Set Aspect Ratio
    kind: action
    command: "<CR>*asp={ratio}#<CR>"
    params:
      - name: ratio
        type: enum
        values: ["4:3", "16:9", "16:10", AUTO, REAL]
        description: Aspect ratio (supported values for EPA96)

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

  - id: set_projector_position
    label: Set Projector Position
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
    label: Direct Power On Enable
    kind: action
    command: "<CR>*directpower=on#<CR>"
    params: []

  - id: direct_power_off
    label: Direct Power On Disable
    kind: action
    command: "<CR>*directpower=off#<CR>"
    params: []

  - id: signal_power_on
    label: Signal Power On Enable
    kind: action
    command: "<CR>*autopower=on#<CR>"
    params: []

  - id: signal_power_off
    label: Signal Power On Disable
    kind: action
    command: "<CR>*autopower=off#<CR>"
    params: []

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
        values: [2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200]
        description: Baud rate in bps

  - id: set_lamp_mode
    label: Set Lamp Mode
    kind: action
    command: "<CR>*lampm={mode}#<CR>"
    params:
      - name: mode
        type: enum
        values: [lnor, eco, seco]
        description: "Normal, Eco, Smart Eco (supported values for EPA96)"

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
    label: Enter
    kind: action
    command: "<CR>*enter#<CR>"
    params: []

  - id: set_3d_mode
    label: Set 3D Mode
    kind: action
    command: "<CR>*3d={mode}#<CR>"
    params:
      - name: mode
        type: enum
        values: [off, auto, tb, fs, fp, sbs, da, iv]
        description: "3D sync mode (supported values for EPA96)"

  - id: instant_on
    label: Instant On Enable
    kind: action
    command: "<CR>*ins=on#<CR>"
    params: []

  - id: instant_off
    label: Instant On Disable
    kind: action
    command: "<CR>*ins=off#<CR>"
    params: []

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
feedbacks:
  - id: power_state
    label: Power Status
    type: enum
    command: "<CR>*pow=?#<CR>"
    values: [on, off]

  - id: current_source
    label: Current Source
    type: string
    command: "<CR>*sour=?#<CR>"

  - id: mute_status
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

  - id: picture_mode
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

  - id: color_temperature
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

  - id: projector_position
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

  - id: baud_rate
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

  - id: 3d_status
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
# UNRESOLVED: no absolute settable numeric ranges found; volume/contrast/brightness/color/sharpness use incremental +/- only
```

## Events

```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: power-off cooldown or lamp restrike delay not documented in source
```

## Notes

- Command format: `<CR>*<command>=<value>#<CR>` over serial; identical over TCP (LAN) with `<CR>` framing required.
- Case-insensitive command parsing.
- Error responses: `Illegal format` (bad syntax), `Unsupported item` (valid syntax, unsupported on model), `Block item` (valid but blocked by current state).
- Baud rate is configurable via command (2400-115200); default not explicitly stated.
- Volume, contrast, brightness, color, and sharpness are incremental (+/-) only — no absolute value set commands documented.
- RS-232 via HDBaseT also supported with identical serial settings.
- Source table includes both "Yes" and "No" support columns; only "Yes" commands listed in this spec.
- Supported 3D sync modes confirmed by source: off, auto, tb, fs, fp, sbs, da, iv. Unsupported modes (2d3d, nvidia) not included.

<!-- UNRESOLVED: default baud rate not confirmed (9600 listed first in serial settings; device supports 2400-115200 per command table) -->
<!-- UNRESOLVED: volume/contrast/brightness/color/sharpness numeric ranges not stated -->
<!-- UNRESOLVED: response format for read queries not fully documented -->
<!-- UNRESOLVED: power-on/off timing constraints and lamp cooldown not stated -->

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - scribd.com
  - benq.com
  - github.com
  - audiogeneral.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - https://www.scribd.com/document/499375003/Rs232-Commands-Benq
  - https://www.benq.com/en-us/business/support/user-manual.html
  - https://github.com/rrooggiieerr/benqprojector.py
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
retrieved_at: 2026-05-14T12:06:38.167Z
last_checked_at: 2026-08-05T08:10:34.532Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:10:34.532Z
matched_actions: 51
action_count: 51
confidence: medium
summary: "All 51 spec actions and feedbacks match source-documented Yes-supported wire tokens; transport values (port 8000, baud 9600, 8N1, no flow control) literal in source. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "default baud rate not stated in source; 9600 listed first"
- "no absolute settable numeric ranges found; volume/contrast/brightness/color/sharpness use incremental +/- only"
- "no unsolicited notification events documented in source"
- "no multi-step sequences documented in source"
- "power-off cooldown or lamp restrike delay not documented in source"
- "default baud rate not confirmed (9600 listed first in serial settings; device supports 2400-115200 per command table)"
- "volume/contrast/brightness/color/sharpness numeric ranges not stated"
- "response format for read queries not fully documented"
- "power-on/off timing constraints and lamp cooldown not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
