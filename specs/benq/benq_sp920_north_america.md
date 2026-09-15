---
spec_id: admin/benq-sp920
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ SP920 Control Spec"
manufacturer: BenQ
model_family: SP920
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - SP920
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ia803208.us.archive.org
  - manualslib.com
source_urls:
  - https://ia803208.us.archive.org/30/items/manualsbase-id-106036/106036.pdf
  - "https://www.manualslib.com/manual/1385485/Benq-Sp920.html?page=53"
  - "https://www.manualslib.com/manual/1385485/Benq-Sp920.html?page=113"
  - "https://www.manualslib.com/manual/1385485/Benq-Sp920.html?page=114"
  - "https://www.manualslib.com/manual/1385485/Benq-Sp920.html?page=115"
retrieved_at: 2026-09-12T10:54:37.245Z
last_checked_at: 2026-09-12T22:16:27.246Z
generated_at: 2026-09-12T22:16:27.246Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "query response formats and error echo values for responses not fully documented (see Feedbacks/Notes)"
  - "response format not stated in source"
  - "response format and range not stated in source"
  - "firmware version compatibility not stated in source"
  - "query response payload formats not stated in source"
  - "volume/contrast/brightness ranges not stated in source"
verification:
  verdict: verified
  checked_at: 2026-09-12T22:16:27.246Z
  matched_actions: 48
  action_count: 48
  confidence: medium
  summary: "All 48 spec actions match verbatim ASCII tokens in source command table; transport parameters confirmed; source has no additional commands beyond those represented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-12
---

# BenQ SP920 Control Spec

## Summary
BenQ SP920 projector controlled over RS-232 serial. Spec covers power, source selection, audio (mute/volume), picture settings (contrast, brightness, aspect, blank, freeze, zoom, auto), lamp control/mode, lamp hour queries, and menu navigation commands.

<!-- UNRESOLVED: query response formats and error echo values for responses not fully documented (see Feedbacks/Notes) -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # default; changeable via OSD menu (2400/4800/9600/14400/19200/38400/57600/115200)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable   (inferred: power on/off commands present)
# - queryable   (inferred: query commands returning state present)
# - levelable   (inferred: volume/contrast/brightness +/- commands present)
# - routable    (inferred: source selection commands present)
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
# Power
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

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "<CR>*pow=?#<CR>"
  params: []

# Source Selection
- id: select_source_analog_rgb
  label: Select Source Analog RGB
  kind: action
  command: "<CR>*sour=RGB#<CR>"
  params: []

- id: select_source_dvi_d
  label: Select Source DVI-D
  kind: action
  command: "<CR>*sour=dvid#<CR>"
  params: []

- id: select_source_hdmi
  label: Select Source HDMI
  kind: action
  command: "<CR>*sour=hdmi#<CR>"
  params: []

- id: select_source_composite
  label: Select Source Composite
  kind: action
  command: "<CR>*sour=vid#<CR>"
  params: []

- id: select_source_s_video
  label: Select Source S-Video
  kind: action
  command: "<CR>*sour=svid#<CR>"
  params: []

- id: select_source_component
  label: Select Source Component
  kind: action
  command: "<CR>*sour=ypbr#<CR>"
  params: []

- id: source_status_query
  label: Current Source Query
  kind: query
  command: "<CR>*sour=?#<CR>"
  params: []

# Audio
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

- id: mute_status_query
  label: Mute Status Query
  kind: query
  command: "<CR>*mute=?#<CR>"
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

- id: volume_status_query
  label: Volume Status Query
  kind: query
  command: "<CR>*vol=?#<CR>"
  params: []

# Picture Setting
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

- id: contrast_query
  label: Contrast Value Query
  kind: query
  command: "<CR>*con=?#<CR>"
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

- id: brightness_query
  label: Brightness Value Query
  kind: query
  command: "<CR>*bri=?#<CR>"
  params: []

- id: aspect_4_3
  label: Aspect 4:3
  kind: action
  command: "<CR>*asp=4:3#<CR>"
  params: []

- id: aspect_16_9
  label: Aspect 16:9
  kind: action
  command: "<CR>*asp=16:9#<CR>"
  params: []

- id: aspect_auto
  label: Aspect Auto
  kind: action
  command: "<CR>*asp=AUTO#<CR>"
  params: []

- id: aspect_real
  label: Aspect Real
  kind: action
  command: "<CR>*asp=REAL#<CR>"
  params: []

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

- id: blank_status_query
  label: Blank Status Query
  kind: query
  command: "<CR>*blank=?#<CR>"
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

- id: freeze_status_query
  label: Freeze Status Query
  kind: query
  command: "<CR>*freeze=?#<CR>"
  params: []

- id: zoom_in
  label: Zoom In
  kind: action
  command: "<CR>*zoomI#<CR>"
  params: []

- id: zoom_out
  label: Zoom Out
  kind: action
  command: "<CR>*zoomO#<CR>"
  params: []

- id: auto_image
  label: Auto
  kind: action
  command: "<CR>*auto#<CR>"
  params: []

# Lamp Control
- id: lamp_hour_query
  label: Lamp Hour Query
  kind: query
  command: "<CR>*ltim=?#<CR>"
  params: []

- id: lamp2_hour_query
  label: Lamp-2 Hour Query
  kind: query
  command: "<CR>*ltim2=?#<CR>"
  params: []

- id: lamp_mode_dual_brightest
  label: Lamp Mode Dual Brightest
  kind: action
  command: "<CR>*lampm=dualbr#<CR>"
  params: []

- id: lamp_mode_dual_reliable
  label: Lamp Mode Dual Reliable
  kind: action
  command: "<CR>*lampm=dualre#<CR>"
  params: []

- id: lamp_mode_single_alternative
  label: Lamp Mode Single Alternative
  kind: action
  command: "<CR>*lampm=single#<CR>"
  params: []

- id: lamp_mode_status_query
  label: Lamp Mode Status Query
  kind: query
  command: "<CR>*lampm=?#<CR>"
  params: []

# Menu Control
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

- id: menu_up
  label: Menu Up
  kind: action
  command: "<CR>*up#<CR>"
  params: []

- id: menu_down
  label: Menu Down
  kind: action
  command: "<CR>*down#<CR>"
  params: []

- id: menu_right
  label: Menu Right
  kind: action
  command: "<CR>*right#<CR>"
  params: []

- id: menu_left
  label: Menu Left
  kind: action
  command: "<CR>*left#<CR>"
  params: []

- id: menu_enter
  label: Menu Enter
  kind: action
  command: "<CR>*enter#<CR>"
  params: []
```

## Feedbacks
```yaml
# Response payload formats not documented in source; echo text mirrors the
# command except for query commands (Note4). Value enums below inferred from
# the corresponding write-command operands.
- id: power_state
  type: enum
  values: [on, off]  # UNRESOLVED: response format not stated in source

- id: current_source
  type: enum
  values: [RGB, dvid, hdmi, vid, svid, ypbr]  # UNRESOLVED: response format not stated in source

- id: mute_state
  type: enum
  values: [on, off]  # UNRESOLVED: response format not stated in source

- id: volume_level
  type: integer  # UNRESOLVED: response format and range not stated in source

- id: contrast_value
  type: integer  # UNRESOLVED: response format and range not stated in source

- id: brightness_value
  type: integer  # UNRESOLVED: response format and range not stated in source

- id: blank_state
  type: enum
  values: [on, off]  # UNRESOLVED: response format not stated in source

- id: freeze_state
  type: enum
  values: [on, off]  # UNRESOLVED: response format not stated in source

- id: lamp1_hours
  type: integer  # UNRESOLVED: response format not stated in source

- id: lamp2_hours
  type: integer  # UNRESOLVED: response format not stated in source

- id: lamp_mode
  type: enum
  values: [dualbr, dualre, single]  # UNRESOLVED: response format not stated in source
```

## Variables
```yaml
# No absolute set-value commands documented; volume/contrast/brightness are
# relative (+/-) only. Not applicable.
```

## Events
```yaml
# No unsolicited notifications documented in source. Not applicable.
```

## Macros
```yaml
# No multi-step sequences documented in source. Not applicable.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Computer and projector must be turned off before making serial connection."
  - "Power on the computer first, then plug in projector power cord; not following this may cause COM port incorrect function."
```

## Notes
- Command framing: `<CR>*{command}#<CR>` (ASCII).
- Error echoes (explicit in source): "Illegal format" (illegal command format), "Unsupported item" (command not supported), "Block item" (command disabled).
- Note4 (source): all echo text is the same as the command executed, except for query commands.
- RS-232 pin assignment (control terminal): 1=RX, 2=CTS, 3=NC, 4=GND, 5=RTS, 6=NC, 7=TX, 8=GND.
- Baud rate changeable via OSD menu: 2400/4800/9600/14400/19200/38400/57600/115200; default 115200.
- Adapters may be necessary depending on the connected PC (contact dealer per source).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: query response payload formats not stated in source -->
<!-- UNRESOLVED: volume/contrast/brightness ranges not stated in source -->

## Provenance

```yaml
source_domains:
  - ia803208.us.archive.org
  - manualslib.com
source_urls:
  - https://ia803208.us.archive.org/30/items/manualsbase-id-106036/106036.pdf
  - "https://www.manualslib.com/manual/1385485/Benq-Sp920.html?page=53"
  - "https://www.manualslib.com/manual/1385485/Benq-Sp920.html?page=113"
  - "https://www.manualslib.com/manual/1385485/Benq-Sp920.html?page=114"
  - "https://www.manualslib.com/manual/1385485/Benq-Sp920.html?page=115"
retrieved_at: 2026-09-12T10:54:37.245Z
last_checked_at: 2026-09-12T22:16:27.246Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-12T22:16:27.246Z
matched_actions: 48
action_count: 48
confidence: medium
summary: "All 48 spec actions match verbatim ASCII tokens in source command table; transport parameters confirmed; source has no additional commands beyond those represented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "query response formats and error echo values for responses not fully documented (see Feedbacks/Notes)"
- "response format not stated in source"
- "response format and range not stated in source"
- "firmware version compatibility not stated in source"
- "query response payload formats not stated in source"
- "volume/contrast/brightness ranges not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
