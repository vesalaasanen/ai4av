---
spec_id: admin/benq-th671st
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ TH671ST Control Spec"
manufacturer: BenQ
model_family: TH671ST
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - TH671ST
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - files.vivid-illumination.com
  - benq.com
  - manuals.plus
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - http://files.vivid-illumination.com/downloads/projector_user_manual/BenQ_TH671ST_User_Manual.pdf
  - https://esupportdownload.benq.com/esupport/PROJECTOR/UserManual/TH671ST/TH671ST_UM_EN_230426092526.pdf
  - https://www.benq.com/en-us/support/downloads-faq/products/projector/th671st/manual.html
  - https://manuals.plus/asin/B076MHKTFH.pdf
retrieved_at: 2026-05-14T12:24:34.436Z
last_checked_at: 2026-07-21T21:36:49.738Z
generated_at: 2026-07-21T21:36:49.738Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HDBaseT exposed as serial-over-HDBaseT (same protocol, different physical layer); source selection inputs limited to RGB/RGB2/hdmi/hdmi2/vid/svid on this model"
  - "no standalone settable parameters beyond action params"
  - "no unsolicited event definitions in source"
  - "no multi-step macro sequences defined in source"
  - "Lamp2 Hour, network standby, microphone standby, remote receiver, USB, wireless, HDBaseT source-select, DisplayPort, broadcasting, AMX discovery, mac address, projection login code, lamp saver commands marked \"No\" (not supported) on this model"
verification:
  verdict: verified
  checked_at: 2026-07-21T21:36:49.738Z
  matched_actions: 78
  action_count: 78
  confidence: medium
  summary: "All 78 spec actions match literal command tokens in source with correct parameter shapes; transport parameters (port 8000, baud rates 2400-115200) verified verbatim; spec covers source command catalogue comprehensively. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# BenQ TH671ST Control Spec

## Summary
BenQ TH671ST short-throw projector supporting RS-232 serial, TCP/IP (LAN), and RS-232 via HDBaseT control. Commands are ASCII-formatted with `<CR>*key=value#<CR>` syntax. Supports power, source selection, audio, picture settings, and operation controls via query and write commands.

<!-- UNRESOLVED: HDBaseT exposed as serial-over-HDBaseT (same protocol, different physical layer); source selection inputs limited to RGB/RGB2/hdmi/hdmi2/vid/svid on this model -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 8000  # TCP port for RS232 via LAN (stated in source)
serial:
  baud_rate: 9600  # default; selectable: 2400/4800/9600/14400/19200/38400/57600/115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
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
# All commands framed as <CR>*payload#<CR>. Payload shown verbatim in `command:`.
# Via LAN, <CR> delimiters optional (per source note).

# --- Power ---
- id: power_on
  label: Power On
  kind: action
  command: "*pow=on#"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "*pow=off#"
  params: []

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "*pow=?#"
  params: []

# --- Source Selection ---
- id: select_source
  label: Select Source
  kind: action
  command: "*sour={source}#"
  params:
    - name: source
      type: string
      description: Source identifier (RGB, RGB2, hdmi, hdmi2, vid, svid)

- id: current_source_query
  label: Current Source Query
  kind: query
  command: "*sour=?#"
  params: []

# --- Audio Control ---
- id: mute_on
  label: Mute On
  kind: action
  command: "*mute=on#"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "*mute=off#"
  params: []

- id: mute_status_query
  label: Mute Status Query
  kind: query
  command: "*mute=?#"
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  command: "*vol=+#"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "*vol=-#"
  params: []

- id: volume_status_query
  label: Volume Status Query
  kind: query
  command: "*vol=?#"
  params: []

# --- Audio Source ---
- id: set_audio_source
  label: Set Audio Source
  kind: action
  command: "*audiosour={source}#"
  params:
    - name: source
      type: string
      description: Audio source (off, RGB, RGB2, vid, hdmi, hdmi2)

- id: audio_source_status_query
  label: Audio Source Status Query
  kind: query
  command: "*audiosour=?#"
  params: []

# --- Picture Mode ---
- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  command: "*appmod={mode}#"
  params:
    - name: mode
      type: string
      description: Picture mode (preset, srgb, bright, cine, user1, user2, threed)

- id: picture_mode_status_query
  label: Picture Mode Status Query
  kind: query
  command: "*appmod=?#"
  params: []

# --- Picture Setting ---
- id: contrast_up
  label: Contrast Up
  kind: action
  command: "*con=+#"
  params: []

- id: contrast_down
  label: Contrast Down
  kind: action
  command: "*con=-#"
  params: []

- id: contrast_value_query
  label: Contrast Value Query
  kind: query
  command: "*con=?#"
  params: []

- id: brightness_up
  label: Brightness Up
  kind: action
  command: "*bri=+#"
  params: []

- id: brightness_down
  label: Brightness Down
  kind: action
  command: "*bri=-#"
  params: []

- id: brightness_value_query
  label: Brightness Value Query
  kind: query
  command: "*bri=?#"
  params: []

- id: color_up
  label: Color Up
  kind: action
  command: "*color=+#"
  params: []

- id: color_down
  label: Color Down
  kind: action
  command: "*color=-#"
  params: []

- id: color_value_query
  label: Color Value Query
  kind: query
  command: "*color=?#"
  params: []

- id: sharpness_up
  label: Sharpness Up
  kind: action
  command: "*sharp=+#"
  params: []

- id: sharpness_down
  label: Sharpness Down
  kind: action
  command: "*sharp=-#"
  params: []

- id: sharpness_value_query
  label: Sharpness Value Query
  kind: query
  command: "*sharp=?#"
  params: []

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  command: "*ct={temperature}#"
  params:
    - name: temperature
      type: string
      description: Color temperature (warm, normal, cool, native)

- id: color_temperature_status_query
  label: Color Temperature Status Query
  kind: query
  command: "*ct=?#"
  params: []

# --- Aspect Ratio ---
- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: "*asp={ratio}#"
  params:
    - name: ratio
      type: string
      description: Aspect ratio (4:3, 16:9, 16:10, AUTO, REAL)

- id: aspect_status_query
  label: Aspect Status Query
  kind: query
  command: "*asp=?#"
  params: []

# --- Operation ---
- id: zoom_in
  label: Digital Zoom In
  kind: action
  command: "*zoomI#"
  params: []

- id: zoom_out
  label: Digital Zoom Out
  kind: action
  command: "*zoomO#"
  params: []

- id: auto_setup
  label: Auto Setup
  kind: action
  command: "*auto#"
  params: []

# --- Brilliant Color ---
- id: brilliant_color_on
  label: Brilliant Color On
  kind: action
  command: "*BC=on#"
  params: []

- id: brilliant_color_off
  label: Brilliant Color Off
  kind: action
  command: "*BC=off#"
  params: []

- id: brilliant_color_status_query
  label: Brilliant Color Status Query
  kind: query
  command: "*BC=?#"
  params: []

# --- Projector Position ---
- id: set_projector_position
  label: Set Projector Position
  kind: action
  command: "*pp={position}#"
  params:
    - name: position
      type: string
      description: Projector position (FT, RE, RC, FC)

- id: projector_position_status_query
  label: Projector Position Status Query
  kind: query
  command: "*pp=?#"
  params: []

# --- Quick Auto Search ---
- id: quick_auto_search_on
  label: Quick Auto Search On
  kind: action
  command: "*QAS=on#"
  params: []

- id: quick_auto_search_off
  label: Quick Auto Search Off
  kind: action
  command: "*QAS=off#"
  params: []

- id: quick_auto_search_status_query
  label: Quick Auto Search Status Query
  kind: query
  command: "*QAS=?#"
  params: []

# --- Direct Power On ---
- id: direct_power_on_on
  label: Direct Power On On
  kind: action
  command: "*directpower=on#"
  params: []

- id: direct_power_on_off
  label: Direct Power On Off
  kind: action
  command: "*directpower=off#"
  params: []

- id: direct_power_on_status_query
  label: Direct Power On Status Query
  kind: query
  command: "*directpower=?#"
  params: []

# --- Signal Power On ---
- id: signal_power_on_on
  label: Signal Power On On
  kind: action
  command: "*autopower=on#"
  params: []

- id: signal_power_on_off
  label: Signal Power On Off
  kind: action
  command: "*autopower=off#"
  params: []

- id: signal_power_on_status_query
  label: Signal Power On Status Query
  kind: query
  command: "*autopower=?#"
  params: []

# --- Standby Monitor Out ---
- id: standby_monitor_out_on
  label: Standby Monitor Out On
  kind: action
  command: "*standbymnt=on#"
  params: []

- id: standby_monitor_out_off
  label: Standby Monitor Out Off
  kind: action
  command: "*standbymnt=off#"
  params: []

- id: standby_monitor_out_status_query
  label: Standby Monitor Out Status Query
  kind: query
  command: "*standbymnt=?#"
  params: []

# --- Baud Rate ---
- id: set_baud_rate
  label: Set Baud Rate
  kind: action
  command: "*baud={rate}#"
  params:
    - name: rate
      type: integer
      description: Baud rate (2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200)

- id: baud_rate_status_query
  label: Baud Rate Status Query
  kind: query
  command: "*baud=?#"
  params: []

# --- Lamp ---
- id: lamp_hour_query
  label: Lamp Hour Query
  kind: query
  command: "*ltim=?#"
  params: []

- id: set_lamp_mode
  label: Set Lamp Mode
  kind: action
  command: "*lampm={mode}#"
  params:
    - name: mode
      type: string
      description: Lamp mode (lnor, eco, seco)

- id: lamp_mode_status_query
  label: Lamp Mode Status Query
  kind: query
  command: "*lampm=?#"
  params: []

- id: model_name_query
  label: Model Name Query
  kind: query
  command: "*modelname=?#"
  params: []

# --- Blank ---
- id: blank_on
  label: Blank On
  kind: action
  command: "*blank=on#"
  params: []

- id: blank_off
  label: Blank Off
  kind: action
  command: "*blank=off#"
  params: []

- id: blank_status_query
  label: Blank Status Query
  kind: query
  command: "*blank=?#"
  params: []

# --- Freeze ---
- id: freeze_on
  label: Freeze On
  kind: action
  command: "*freeze=on#"
  params: []

- id: freeze_off
  label: Freeze Off
  kind: action
  command: "*freeze=off#"
  params: []

- id: freeze_status_query
  label: Freeze Status Query
  kind: query
  command: "*freeze=?#"
  params: []

# --- Menu / Navigation ---
- id: menu_on
  label: Menu On
  kind: action
  command: "*menu=on#"
  params: []

- id: menu_off
  label: Menu Off
  kind: action
  command: "*menu=off#"
  params: []

- id: up
  label: Up
  kind: action
  command: "*up#"
  params: []

- id: down
  label: Down
  kind: action
  command: "*down#"
  params: []

- id: right
  label: Right
  kind: action
  command: "*right#"
  params: []

- id: left
  label: Left
  kind: action
  command: "*left#"
  params: []

- id: enter
  label: Enter
  kind: action
  command: "*enter#"
  params: []

# --- 3D Sync ---
- id: set_3d_sync
  label: Set 3D Sync
  kind: action
  command: "*3d={mode}#"
  params:
    - name: mode
      type: string
      description: 3D sync mode (off, auto, tb, fs, fp, sbs, da, iv)

- id: d3d_sync_status_query
  label: 3D Sync Status Query
  kind: query
  command: "*3d=?#"
  params: []

# --- Instant On ---
- id: instant_on_on
  label: Instant On On
  kind: action
  command: "*ins=on#"
  params: []

- id: instant_on_off
  label: Instant On Off
  kind: action
  command: "*ins=off#"
  params: []

- id: instant_on_status_query
  label: Instant On Status Query
  kind: query
  command: "*ins=?#"
  params: []

# --- High Altitude ---
- id: high_altitude_on
  label: High Altitude Mode On
  kind: action
  command: "*Highaltitude=on#"
  params: []

- id: high_altitude_off
  label: High Altitude Mode Off
  kind: action
  command: "*Highaltitude=off#"
  params: []

- id: high_altitude_status_query
  label: High Altitude Mode Status Query
  kind: query
  command: "*Highaltitude=?#"
  params: []
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values: [on, off]

- id: current_source
  label: Current Source
  type: string

- id: mute_status
  label: Mute Status
  type: enum
  values: [on, off]

- id: volume_status
  label: Volume Status
  type: integer

- id: audio_source_status
  label: Audio Source Status
  type: string

- id: picture_mode_status
  label: Picture Mode Status
  type: string

- id: contrast_value
  label: Contrast Value
  type: integer

- id: brightness_value
  label: Brightness Value
  type: integer

- id: color_value
  label: Color Value
  type: integer

- id: sharpness_value
  label: Sharpness Value
  type: integer

- id: color_temperature_status
  label: Color Temperature Status
  type: string

- id: aspect_status
  label: Aspect Status
  type: string

- id: brilliant_color_status
  label: Brilliant Color Status
  type: enum
  values: [on, off]

- id: projector_position_status
  label: Projector Position Status
  type: string

- id: quick_auto_search_status
  label: Quick Auto Search Status
  type: enum
  values: [on, off]

- id: direct_power_on_status
  label: Direct Power On Status
  type: enum
  values: [on, off]

- id: signal_power_on_status
  label: Signal Power On Status
  type: enum
  values: [on, off]

- id: standby_monitor_out_status
  label: Standby Monitor Out Status
  type: enum
  values: [on, off]

- id: baud_rate_status
  label: Baud Rate Status
  type: integer

- id: lamp_hours
  label: Lamp Hours
  type: integer

- id: lamp_mode_status
  label: Lamp Mode Status
  type: string

- id: model_name
  label: Model Name
  type: string

- id: blank_status
  label: Blank Status
  type: enum
  values: [on, off]

- id: freeze_status
  label: Freeze Status
  type: enum
  values: [on, off]

- id: d3d_sync_status
  label: 3D Sync Status
  type: string

- id: instant_on_status
  label: Instant On Status
  type: enum
  values: [on, off]

- id: high_altitude_status
  label: High Altitude Mode Status
  type: enum
  values: [on, off]
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters beyond action params
```

## Events
```yaml
# UNRESOLVED: no unsolicited event definitions in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
- Commands accept uppercase, lowercase, and mixed case.
- When controlling via LAN (TCP), commands work with or without `<CR>` delimiters.
- Echo responses: `Illegal format` (bad syntax), `Unsupported item` (invalid for model), `Block item` (cannot execute under current condition).
- Standby power requirement: 0.5W minimum for RS232 control to work.
- Baud rate is configurable via `*baud=XXXX#` command.
- RS232 via HDBaseT uses identical serial settings (baud/data/parity/stop/flow) over the HDBaseT physical layer; same command set applies.
- Source document version: 1.01-C.
<!-- UNRESOLVED: Lamp2 Hour, network standby, microphone standby, remote receiver, USB, wireless, HDBaseT source-select, DisplayPort, broadcasting, AMX discovery, mac address, projection login code, lamp saver commands marked "No" (not supported) on this model -->
````

Upgrade done. Added `command:` payloads to all 49 existing actions (were missing = not implementable), appended 27 read/query actions as `kind: query`, added 2 missing standby-monitor-out write actions. Preserved all existing IDs/shapes + feedbacks. Added HDBaseT serial note.

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - files.vivid-illumination.com
  - benq.com
  - manuals.plus
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - http://files.vivid-illumination.com/downloads/projector_user_manual/BenQ_TH671ST_User_Manual.pdf
  - https://esupportdownload.benq.com/esupport/PROJECTOR/UserManual/TH671ST/TH671ST_UM_EN_230426092526.pdf
  - https://www.benq.com/en-us/support/downloads-faq/products/projector/th671st/manual.html
  - https://manuals.plus/asin/B076MHKTFH.pdf
retrieved_at: 2026-05-14T12:24:34.436Z
last_checked_at: 2026-07-21T21:36:49.738Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:36:49.738Z
matched_actions: 78
action_count: 78
confidence: medium
summary: "All 78 spec actions match literal command tokens in source with correct parameter shapes; transport parameters (port 8000, baud rates 2400-115200) verified verbatim; spec covers source command catalogue comprehensively. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HDBaseT exposed as serial-over-HDBaseT (same protocol, different physical layer); source selection inputs limited to RGB/RGB2/hdmi/hdmi2/vid/svid on this model"
- "no standalone settable parameters beyond action params"
- "no unsolicited event definitions in source"
- "no multi-step macro sequences defined in source"
- "Lamp2 Hour, network standby, microphone standby, remote receiver, USB, wireless, HDBaseT source-select, DisplayPort, broadcasting, AMX discovery, mac address, projection login code, lamp saver commands marked \"No\" (not supported) on this model"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
