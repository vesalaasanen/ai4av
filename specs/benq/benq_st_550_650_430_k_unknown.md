---
spec_id: admin/benq-st550-650-430k
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ ST 550 650 430 K Control Spec"
manufacturer: BenQ
model_family: MS531
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - MS531
    - BS5050
    - ES6540
    - MS521H
    - MX532
    - MW533
    - TW533
    - MH534
    - TH534
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - manualslib.com
  - audiogeneral.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - https://www.manualslib.com/manual/1752140/Benq-St430k-Series.html
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
retrieved_at: 2026-05-14T20:25:55.045Z
last_checked_at: 2026-05-14T21:41:42.710Z
generated_at: 2026-05-14T21:41:42.710Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model mapping for \"ST 550 650 430 K\" not found in source — source lists MS531/BS5050/ES6540/MS521H/MX532/MW533/TW533/MH534/TH534"
  - "firmware version compatibility not stated"
  - "response format beyond error strings not documented"
  - "no discrete settable numeric parameters found - volume/contrast/brightness/color/sharpness use +/- relative commands only"
  - "no unsolicited notification protocol documented in source"
  - "no multi-step sequences documented in source"
  - "source notes commands work if standby power is 0.5W or supported baud rate is set;"
  - "exact response format for query commands beyond error strings"
  - "model name \"ST 550 650 430 K\" not found in source document"
  - "lamp mode response value mapping (lnor/eco/seco) unconfirmed"
verification:
  verdict: verified
  checked_at: 2026-05-14T21:41:42.710Z
  matched_actions: 84
  action_count: 93
  confidence: medium
  summary: "All 84 spec actions match source commands; all transport parameters verified; spec covers complete set of 'Yes' support commands. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# BenQ ST 550 650 430 K Control Spec

## Summary
BenQ projector RS-232 command control via serial (D-Sub 9) or LAN (TCP port 8000). Supports power, source selection, audio, picture settings, lamp control, 3D sync, and operation settings. Command format: `<CR>*<command>=<value>#<CR>`. Available functions vary by model; this spec covers commands marked supported for these models.

<!-- UNRESOLVED: exact model mapping for "ST 550 650 430 K" not found in source — source lists MS531/BS5050/ES6540/MS521H/MX532/MW533/TW533/MH534/TH534 -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: response format beyond error strings not documented -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # configurable: 2400/4800/9600/14400/19200/38400/57600/115200
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
- powerable  # power on/off commands present
- routable  # source selection commands present
- queryable  # query commands returning state present
- levelable  # volume, contrast, brightness, color, sharpness +/- commands present
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

- id: select_source_rgb
  label: Select Source COMPUTER/YPbPr
  kind: action
  command: "<CR>*sour=RGB#<CR>"
  params: []

- id: select_source_rgb2
  label: Select Source COMPUTER 2/YPbPr2
  kind: action
  command: "<CR>*sour=RGB2#<CR>"
  params: []

- id: select_source_hdmi
  label: Select Source HDMI/MHL
  kind: action
  command: "<CR>*sour=hdmi#<CR>"
  params: []

- id: select_source_hdmi2
  label: Select Source HDMI 2/MHL2
  kind: action
  command: "<CR>*sour=hdmi2#<CR>"
  params: []

- id: select_source_composite
  label: Select Source Composite
  kind: action
  command: "<CR>*sour=vid#<CR>"
  params: []

- id: select_source_svideo
  label: Select Source S-Video
  kind: action
  command: "<CR>*sour=svid#<CR>"
  params: []

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

- id: audio_source_off
  label: Audio Pass Through Off
  kind: action
  command: "<CR>*audiosour=off#<CR>"
  params: []

- id: audio_source_rgb
  label: Audio Source Computer1
  kind: action
  command: "<CR>*audiosour=RGB#<CR>"
  params: []

- id: audio_source_rgb2
  label: Audio Source Computer2
  kind: action
  command: "<CR>*audiosour=RGB2#<CR>"
  params: []

- id: audio_source_vid
  label: Audio Source Video/S-Video
  kind: action
  command: "<CR>*audiosour=vid#<CR>"
  params: []

- id: audio_source_hdmi
  label: Audio Source HDMI
  kind: action
  command: "<CR>*audiosour=hdmi#<CR>"
  params: []

- id: audio_source_hdmi2
  label: Audio Source HDMI2
  kind: action
  command: "<CR>*audiosour=hdmi2#<CR>"
  params: []

- id: picture_mode_presentation
  label: Picture Mode Presentation
  kind: action
  command: "<CR>*appmod=preset#<CR>"
  params: []

- id: picture_mode_srgb
  label: Picture Mode sRGB
  kind: action
  command: "<CR>*appmod=srgb#<CR>"
  params: []

- id: picture_mode_bright
  label: Picture Mode Bright
  kind: action
  command: "<CR>*appmod=bright#<CR>"
  params: []

- id: picture_mode_cinema
  label: Picture Mode Cinema
  kind: action
  command: "<CR>*appmod=cine#<CR>"
  params: []

- id: picture_mode_user1
  label: Picture Mode User1
  kind: action
  command: "<CR>*appmod=user1#<CR>"
  params: []

- id: picture_mode_user2
  label: Picture Mode User2
  kind: action
  command: "<CR>*appmod=user2#<CR>"
  params: []

- id: picture_mode_3d
  label: Picture Mode 3D
  kind: action
  command: "<CR>*appmod=threed#<CR>"
  params: []

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

- id: color_temp_warm
  label: Color Temperature Warm
  kind: action
  command: "<CR>*ct=warm#<CR>"
  params: []

- id: color_temp_normal
  label: Color Temperature Normal
  kind: action
  command: "<CR>*ct=normal#<CR>"
  params: []

- id: color_temp_cool
  label: Color Temperature Cool
  kind: action
  command: "<CR>*ct=cool#<CR>"
  params: []

- id: color_temp_native
  label: Color Temperature Lamp Native
  kind: action
  command: "<CR>*ct=native#<CR>"
  params: []

- id: aspect_4_3
  label: Aspect Ratio 4:3
  kind: action
  command: "<CR>*asp=4:3#<CR>"
  params: []

- id: aspect_16_9
  label: Aspect Ratio 16:9
  kind: action
  command: "<CR>*asp=16:9#<CR>"
  params: []

- id: aspect_16_10
  label: Aspect Ratio 16:10
  kind: action
  command: "<CR>*asp=16:10#<CR>"
  params: []

- id: aspect_auto
  label: Aspect Ratio Auto
  kind: action
  command: "<CR>*asp=AUTO#<CR>"
  params: []

- id: aspect_real
  label: Aspect Ratio Real
  kind: action
  command: "<CR>*asp=REAL#<CR>"
  params: []

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

- id: auto
  label: Auto
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

- id: position_front_table
  label: Projector Position Front Table
  kind: action
  command: "<CR>*pp=FT#<CR>"
  params: []

- id: position_rear_table
  label: Projector Position Rear Table
  kind: action
  command: "<CR>*pp=RE#<CR>"
  params: []

- id: position_rear_ceiling
  label: Projector Position Rear Ceiling
  kind: action
  command: "<CR>*pp=RC#<CR>"
  params: []

- id: position_front_ceiling
  label: Projector Position Front Ceiling
  kind: action
  command: "<CR>*pp=FC#<CR>"
  params: []

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

- id: direct_power_on_on
  label: Direct Power On Enable
  kind: action
  command: "<CR>*directpower=on#<CR>"
  params: []

- id: direct_power_on_off
  label: Direct Power On Disable
  kind: action
  command: "<CR>*directpower=off#<CR>"
  params: []

- id: signal_power_on_on
  label: Signal Power On Enable
  kind: action
  command: "<CR>*autopower=on#<CR>"
  params: []

- id: signal_power_on_off
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

- id: set_baud_2400
  label: Set Baud Rate 2400
  kind: action
  command: "<CR>*baud=2400#<CR>"
  params: []

- id: set_baud_4800
  label: Set Baud Rate 4800
  kind: action
  command: "<CR>*baud=4800#<CR>"
  params: []

- id: set_baud_9600
  label: Set Baud Rate 9600
  kind: action
  command: "<CR>*baud=9600#<CR>"
  params: []

- id: set_baud_14400
  label: Set Baud Rate 14400
  kind: action
  command: "<CR>*baud=14400#<CR>"
  params: []

- id: set_baud_19200
  label: Set Baud Rate 19200
  kind: action
  command: "<CR>*baud=19200#<CR>"
  params: []

- id: set_baud_38400
  label: Set Baud Rate 38400
  kind: action
  command: "<CR>*baud=38400#<CR>"
  params: []

- id: set_baud_57600
  label: Set Baud Rate 57600
  kind: action
  command: "<CR>*baud=57600#<CR>"
  params: []

- id: set_baud_115200
  label: Set Baud Rate 115200
  kind: action
  command: "<CR>*baud=115200#<CR>"
  params: []

- id: lamp_mode_normal
  label: Lamp Mode Normal
  kind: action
  command: "<CR>*lampm=lnor#<CR>"
  params: []

- id: lamp_mode_eco
  label: Lamp Mode Eco
  kind: action
  command: "<CR>*lampm=eco#<CR>"
  params: []

- id: lamp_mode_smart_eco
  label: Lamp Mode Smart Eco (ImageCare)
  kind: action
  command: "<CR>*lampm=seco#<CR>"
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

- id: 3d_sync_off
  label: 3D Sync Off
  kind: action
  command: "<CR>*3d=off#<CR>"
  params: []

- id: 3d_auto
  label: 3D Auto
  kind: action
  command: "<CR>*3d=auto#<CR>"
  params: []

- id: 3d_top_bottom
  label: 3D Sync TopBottom
  kind: action
  command: "<CR>*3d=tb#<CR>"
  params: []

- id: 3d_frame_sequential
  label: 3D Sync Frame Sequential
  kind: action
  command: "<CR>*3d=fs#<CR>"
  params: []

- id: 3d_frame_packing
  label: 3D Framepacking
  kind: action
  command: "<CR>*3d=fp#<CR>"
  params: []

- id: 3d_side_by_side
  label: 3D Side by Side
  kind: action
  command: "<CR>*3d=sbs#<CR>"
  params: []

- id: 3d_inverter_disable
  label: 3D Inverter Disable
  kind: action
  command: "<CR>*3d=da#<CR>"
  params: []

- id: 3d_inverter
  label: 3D Inverter
  kind: action
  command: "<CR>*3d=iv#<CR>"
  params: []

- id: instant_on_on
  label: Instant On Enable
  kind: action
  command: "<CR>*ins=on#<CR>"
  params: []

- id: instant_on_off
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
- id: power_state
  label: Power Status
  type: enum
  command: "<CR>*pow=?#<CR>"
  values: [on, off]

- id: current_source
  label: Current Source
  type: enum
  command: "<CR>*sour=?#<CR>"
  values: [RGB, RGB2, hdmi, hdmi2, vid, svid]

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
  type: enum
  command: "<CR>*audiosour=?#<CR>"
  values: [off, RGB, RGB2, vid, hdmi, hdmi2]

- id: picture_mode
  label: Picture Mode
  type: enum
  command: "<CR>*appmod=?#<CR>"
  values: [preset, srgb, bright, cine, user1, user2, threed]

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
  type: enum
  command: "<CR>*ct=?#<CR>"
  values: [warm, normal, cool, native]

- id: aspect_status
  label: Aspect Ratio Status
  type: enum
  command: "<CR>*asp=?#<CR>"
  values: ["4:3", "16:9", "16:10", AUTO, REAL]

- id: brilliant_color_status
  label: Brilliant Color Status
  type: enum
  command: "<CR>*BC=?#<CR>"
  values: [on, off]

- id: projector_position
  label: Projector Position Status
  type: enum
  command: "<CR>*pp=?#<CR>"
  values: [FT, RE, RC, FC]

- id: quick_auto_search_status
  label: Quick Auto Search Status
  type: enum
  command: "<CR>*QAS=?#<CR>"
  values: [on, off]

- id: direct_power_on_status
  label: Direct Power On Status
  type: enum
  command: "<CR>*directpower=?#<CR>"
  values: [on, off]

- id: signal_power_on_status
  label: Signal Power On Status
  type: enum
  command: "<CR>*autopower=?#<CR>"
  values: [on, off]

- id: standby_monitor_out_status
  label: Standby Monitor Out Status
  type: enum
  command: "<CR>*standbymnt=?#<CR>"
  values: [on, off]

- id: current_baud_rate
  label: Current Baud Rate
  type: enum
  command: "<CR>*baud=?#<CR>"
  values: [2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200]

- id: lamp_hours
  label: Lamp Hours
  type: integer
  command: "<CR>*ltim=?#<CR>"

- id: lamp_mode_status
  label: Lamp Mode Status
  type: enum
  command: "<CR>*lampm=?#<CR>"
  values: [lnor, eco, seco]

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
  type: enum
  command: "<CR>*3d=?#<CR>"
  values: [off, auto, tb, fs, fp, sbs, da, iv]

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
# UNRESOLVED: no discrete settable numeric parameters found - volume/contrast/brightness/color/sharpness use +/- relative commands only
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes commands work if standby power is 0.5W or supported baud rate is set;
# no interlock or power-on sequencing requirements documented
```

## Notes
- Command format: `<CR>*<command>=<value>#<CR>`. Case-insensitive.
- Error responses: `Illegal format` (bad syntax), `Unsupported item` (valid but not for this model), `Block item` (valid but cannot execute under current conditions).
- Serial via LAN uses same command set over TCP port 8000.
- HDBaseT passthrough uses same serial settings.
- Source selection and features vary by projector model; only commands marked "Yes" in source are included.
- Volume, contrast, brightness, color, sharpness use relative +/- commands — no absolute value set commands documented.

<!-- UNRESOLVED: exact response format for query commands beyond error strings -->
<!-- UNRESOLVED: model name "ST 550 650 430 K" not found in source document -->
<!-- UNRESOLVED: lamp mode response value mapping (lnor/eco/seco) unconfirmed -->

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - manualslib.com
  - audiogeneral.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - https://www.manualslib.com/manual/1752140/Benq-St430k-Series.html
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
retrieved_at: 2026-05-14T20:25:55.045Z
last_checked_at: 2026-05-14T21:41:42.710Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T21:41:42.710Z
matched_actions: 84
action_count: 93
confidence: medium
summary: "All 84 spec actions match source commands; all transport parameters verified; spec covers complete set of 'Yes' support commands. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model mapping for \"ST 550 650 430 K\" not found in source — source lists MS531/BS5050/ES6540/MS521H/MX532/MW533/TW533/MH534/TH534"
- "firmware version compatibility not stated"
- "response format beyond error strings not documented"
- "no discrete settable numeric parameters found - volume/contrast/brightness/color/sharpness use +/- relative commands only"
- "no unsolicited notification protocol documented in source"
- "no multi-step sequences documented in source"
- "source notes commands work if standby power is 0.5W or supported baud rate is set;"
- "exact response format for query commands beyond error strings"
- "model name \"ST 550 650 430 K\" not found in source document"
- "lamp mode response value mapping (lnor/eco/seco) unconfirmed"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
