---
spec_id: admin/benq-rp-553k-653k
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ RP 553K 653K Control Spec"
manufacturer: BenQ
model_family: "RP 553K"
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - "RP 553K"
    - "RP 653K"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - manualslib.com
  - manua.ls
  - audiogeneral.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - https://www.manualslib.com/manual/2263420/Benq-Rp553k.html
  - https://www.manua.ls/benq
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
retrieved_at: 2026-05-14T12:02:19.185Z
last_checked_at: 2026-07-21T21:32:01.351Z
generated_at: 2026-07-21T21:32:01.351Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source uses incremental +/- commands rather than absolute value setters"
  - "no unsolicited notification events documented in source"
  - "no multi-step sequences documented in source"
  - "source mentions \"Block item\" response for commands that cannot execute"
  - "exact response format for query commands not specified"
  - "command timing constraints not stated"
  - "maximum command rate or polling interval not stated"
  - "firmware version compatibility not stated"
  - "whether RP 553K and RP 653K share identical command support"
  - "serial port settings table omits 2400 and 4800 baud but command table includes them with Yes support"
verification:
  verdict: verified
  checked_at: 2026-07-21T21:32:01.351Z
  matched_actions: 51
  action_count: 51
  confidence: medium
  summary: "All 51 spec actions matched verbatim in source with correct shapes; all transport parameters (9600 baud, 8-bit data, port 8000) explicitly supported. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# BenQ RP 553K 653K Control Spec

## Summary
BenQ RP 553K and RP 653K interactive displays controlled via RS-232 serial or TCP/IP (LAN). Commands use ASCII format `<CR>*<cmd>=<param>#<CR>`. The device supports power, source selection, audio, picture settings, lamp control, and various operational settings.

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 8000
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # power on/off commands present
- queryable    # query commands returning state present
- routable     # input/output source selection present
- levelable    # volume, contrast, brightness, color, sharpness control present
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
      description: "Input source (RGB=COMPUTER/YPbPr, RGB2=COMPUTER2/YPbPr2, hdmi=HDMI/MHL, hdmi2=HDMI2/MHL2, vid=Composite, svid=S-Video)"

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
      description: "Audio source (off=pass through off, RGB=Audio-Computer1, RGB2=Audio-Computer2, vid=Audio-Video/S-Video, hdmi=Audio-HDMI, hdmi2=Audio-HDMI2)"

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  command: "<CR>*appmod={mode}#<CR>"
  params:
    - name: mode
      type: enum
      values: [preset, srgb, bright, cine, user1, user2, threed]
      description: "Picture mode (preset=Presentation, cine=Cinema, threed=3D)"

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
      description: "Color temperature preset"

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: "<CR>*asp={ratio}#<CR>"
  params:
    - name: ratio
      type: enum
      values: ["4:3", "16:9", "16:10", AUTO, REAL]
      description: "Aspect ratio"

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

- id: auto_adjust
  label: Auto Adjust
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
      description: "Projector position (FT=Front Table, RE=Rear Table, RC=Rear Ceiling, FC=Front Ceiling)"

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

- id: standby_monitor_on
  label: Standby Monitor Out On
  kind: action
  command: "<CR>*standbymnt=on#<CR>"
  params: []

- id: standby_monitor_off
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
      description: "Serial baud rate"

- id: set_lamp_mode
  label: Set Lamp Mode
  kind: action
  command: "<CR>*lampm={mode}#<CR>"
  params:
    - name: mode
      type: enum
      values: [lnor, eco, seco]
      description: "Lamp mode (lnor=Normal, eco=Eco, seco=Smart Eco/ImageCare)"

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

- id: set_3d_mode
  label: Set 3D Mode
  kind: action
  command: "<CR>*3d={mode}#<CR>"
  params:
    - name: mode
      type: enum
      values: [off, auto, tb, fs, fp, sbs, da, iv]
      description: "3D mode (off, auto, tb=TopBottom, fs=FrameSequential, fp=FramePacking, sbs=SideBySide, da=inverter disable, iv=inverter)"

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
  command: "<CR>*pow=?#<CR>"
  type: enum
  values: [on, off]

- id: current_source
  label: Current Source
  command: "<CR>*sour=?#<CR>"
  type: enum
  values: [RGB, RGB2, hdmi, hdmi2, vid, svid]

- id: mute_status
  label: Mute Status
  command: "<CR>*mute=?#<CR>"
  type: enum
  values: [on, off]

- id: volume_status
  label: Volume Status
  command: "<CR>*vol=?#<CR>"
  type: string

- id: audio_source_status
  label: Audio Source Status
  command: "<CR>*audiosour=?#<CR>"
  type: enum
  values: [off, RGB, RGB2, vid, hdmi, hdmi2]

- id: picture_mode
  label: Picture Mode
  command: "<CR>*appmod=?#<CR>"
  type: enum
  values: [preset, srgb, bright, cine, user1, user2, threed]

- id: contrast_value
  label: Contrast Value
  command: "<CR>*con=?#<CR>"
  type: string

- id: brightness_value
  label: Brightness Value
  command: "<CR>*bri=?#<CR>"
  type: string

- id: color_value
  label: Color Value
  command: "<CR>*color=?#<CR>"
  type: string

- id: sharpness_value
  label: Sharpness Value
  command: "<CR>*sharp=?#<CR>"
  type: string

- id: color_temperature
  label: Color Temperature Status
  command: "<CR>*ct=?#<CR>"
  type: enum
  values: [warm, normal, cool, native]

- id: aspect_status
  label: Aspect Status
  command: "<CR>*asp=?#<CR>"
  type: enum
  values: ["4:3", "16:9", "16:10", AUTO, REAL]

- id: brilliant_color_status
  label: Brilliant Color Status
  command: "<CR>*BC=?#<CR>"
  type: enum
  values: [on, off]

- id: projector_position
  label: Projector Position Status
  command: "<CR>*pp=?#<CR>"
  type: enum
  values: [FT, RE, RC, FC]

- id: quick_auto_search_status
  label: Quick Auto Search Status
  command: "<CR>*QAS=?#<CR>"
  type: enum
  values: [on, off]

- id: direct_power_status
  label: Direct Power On Status
  command: "<CR>*directpower=?#<CR>"
  type: enum
  values: [on, off]

- id: signal_power_status
  label: Signal Power On Status
  command: "<CR>*autopower=?#<CR>"
  type: enum
  values: [on, off]

- id: standby_monitor_status
  label: Standby Monitor Out Status
  command: "<CR>*standbymnt=?#<CR>"
  type: enum
  values: [on, off]

- id: baud_rate_status
  label: Current Baud Rate
  command: "<CR>*baud=?#<CR>"
  type: enum
  values: [2400, 4800, 9600, 14400, 19200, 38400, 57600, 115200]

- id: lamp_hours
  label: Lamp Hours
  command: "<CR>*ltim=?#<CR>"
  type: string

- id: lamp_mode_status
  label: Lamp Mode Status
  command: "<CR>*lampm=?#<CR>"
  type: enum
  values: [lnor, eco, seco]

- id: model_name
  label: Model Name
  command: "<CR>*modelname=?#<CR>"
  type: string

- id: blank_status
  label: Blank Status
  command: "<CR>*blank=?#<CR>"
  type: enum
  values: [on, off]

- id: freeze_status
  label: Freeze Status
  command: "<CR>*freeze=?#<CR>"
  type: enum
  values: [on, off]

- id: 3d_status
  label: 3D Sync Status
  command: "<CR>*3d=?#<CR>"
  type: enum
  values: [off, auto, tb, fs, fp, sbs, da, iv]

- id: instant_on_status
  label: Instant On Status
  command: "<CR>*ins=?#<CR>"
  type: enum
  values: [on, off]

- id: high_altitude_status
  label: High Altitude Mode Status
  command: "<CR>*Highaltitude=?#<CR>"
  type: enum
  values: [on, off]
```

## Variables
```yaml
# UNRESOLVED: source uses incremental +/- commands rather than absolute value setters
# for volume, contrast, brightness, color, sharpness - no direct numeric set commands found
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
# UNRESOLVED: source mentions "Block item" response for commands that cannot execute
# under certain conditions, but no explicit safety interlock procedures documented
```

## Notes
- Command format: `<CR>*<command>=<value>#<CR>` over serial or TCP. `<CR>` = carriage return (0x0D).
- Commands are case-insensitive (uppercase, lowercase, and mixed accepted).
- Illegal format returns `Illegal format`. Unsupported commands return `Unsupported item`. Conditionally blocked commands return `Block item`.
- RS232 via LAN uses identical commands with `<CR>` start/end delimiters; TCP port 8000.
- HDBaseT RS232 passthrough uses same serial settings.
- Commands work only when standby power is 0.5W or a supported baud rate is set.
- Source document labels this as projector commands; RP 553K/653K are interactive flat panels — command set may differ from what is listed. Support column used to filter applicable commands.
- Volume, contrast, brightness, color, and sharpness use incremental +/- controls rather than absolute values.

<!-- UNRESOLVED: exact response format for query commands not specified -->
<!-- UNRESOLVED: command timing constraints not stated -->
<!-- UNRESOLVED: maximum command rate or polling interval not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: whether RP 553K and RP 653K share identical command support -->
<!-- UNRESOLVED: serial port settings table omits 2400 and 4800 baud but command table includes them with Yes support -->

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - manualslib.com
  - manua.ls
  - audiogeneral.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - https://www.manualslib.com/manual/2263420/Benq-Rp553k.html
  - https://www.manua.ls/benq
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
retrieved_at: 2026-05-14T12:02:19.185Z
last_checked_at: 2026-07-21T21:32:01.351Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:32:01.351Z
matched_actions: 51
action_count: 51
confidence: medium
summary: "All 51 spec actions matched verbatim in source with correct shapes; all transport parameters (9600 baud, 8-bit data, port 8000) explicitly supported. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source uses incremental +/- commands rather than absolute value setters"
- "no unsolicited notification events documented in source"
- "no multi-step sequences documented in source"
- "source mentions \"Block item\" response for commands that cannot execute"
- "exact response format for query commands not specified"
- "command timing constraints not stated"
- "maximum command rate or polling interval not stated"
- "firmware version compatibility not stated"
- "whether RP 553K and RP 653K share identical command support"
- "serial port settings table omits 2400 and 4800 baud but command table includes them with Yes support"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
