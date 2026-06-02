---
spec_id: admin/benq-unknown-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ Projector RS232 Control Spec"
manufacturer: BenQ
model_family: UNKNOWN
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - UNKNOWN
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - benqimage.blob.core.windows.net
  - manualslib.com
source_urls:
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - https://www.manualslib.com/manual/2887673/Benq-Rs232.html
retrieved_at: 2026-05-01T01:21:07.107Z
last_checked_at: 2026-06-02T21:51:24.992Z
generated_at: 2026-06-02T21:51:24.992Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is generic BenQ RS232 manual, NOT specific to any model. Exact command support per model (7200/8200/8220) unknown."
  - "source uses incremental (+/-) commands for volume, contrast, brightness,"
  - "no multi-step sequences described in source"
  - "compatible_with.models is UNKNOWN — source does not list specific model numbers"
  - "no firmware version ranges stated"
  - "volume/contrast/brightness/color/sharpness range limits not stated"
  - "which commands are available on which models not specified"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:51:24.992Z
  matched_actions: 66
  action_count: 66
  confidence: medium
  summary: "Generic BenQ RS232 spec with all 66 actions sourced from manual. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-01
---

# BenQ Projector RS232 Control Spec

## Summary
Generic BenQ projector RS-232 control protocol. Command format: `<CR>*command=value#<CR>` (ASCII 13 prefix, `#` terminator). Source is a model-agnostic RS232 installation manual; available functions and commands vary by model. Covers power, source selection, audio, picture settings, lamp control, and projector configuration.

<!-- UNRESOLVED: source is generic BenQ RS232 manual, NOT specific to any model. Exact command support per model (7200/8200/8220) unknown. -->

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
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands present
  - queryable    # query commands returning state present
  - routable     # input/output routing commands present
  - levelable    # volume, contrast, brightness control present
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
        values:
          - RGB
          - RGB2
          - ypbr
          - ypbr2
          - dviA
          - dvid
          - hdmi
          - hdmi2
          - vid
          - svid
          - network
          - usbdisplay
          - usbreader
        description: "Source input (RGB=Computer/YPbPr, vid=Composite, svid=S-Video, etc.)"

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

  - id: mic_volume_up
    label: Microphone Volume Up
    kind: action
    command: "<CR>*micvol=+#<CR>"
    params: []

  - id: mic_volume_down
    label: Microphone Volume Down
    kind: action
    command: "<CR>*micvol=-#<CR>"
    params: []

  - id: select_audio_source
    label: Select Audio Source
    kind: action
    command: "<CR>*audiosour={source}#<CR>"
    params:
      - name: source
        type: enum
        values:
          - "off"
          - RGB
          - RGB2
          - vid
          - ypbr
          - hdmi
          - hdmi2
        description: "Audio source (off=pass through off, RGB=Computer1, vid=Video/S-Video, ypbr=Component)"

  - id: set_picture_mode
    label: Set Picture Mode
    kind: action
    command: "<CR>*appmod={mode}#<CR>"
    params:
      - name: mode
        type: enum
        values:
          - dynamic
          - preset
          - srgb
          - bright
          - livingroom
          - game
          - cine
          - std
          - user1
          - user2
          - user3
          - isfday
          - isfnight
          - threed
        description: "Picture mode (preset=Presentation, std=Standard, cine=Cinema, threed=3D)"

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
        values:
          - warmer
          - warm
          - normal
          - cool
          - cooler
          - native
        description: "Color temperature (native=lamp native)"

  - id: set_aspect_ratio
    label: Set Aspect Ratio
    kind: action
    command: "<CR>*asp={ratio}#<CR>"
    params:
      - name: ratio
        type: enum
        values:
          - "4:3"
          - "16:9"
          - "16:10"
          - AUTO
          - REAL
          - LBOX
          - WIDE
          - ANAM
        description: "Aspect ratio (LBOX=Letterbox, ANAM=Anamorphic)"

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
        values:
          - FT
          - RE
          - RC
          - FC
        description: "FT=Front Table, RE=Rear Table, RC=Rear Ceiling, FC=Front Ceiling"

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

  - id: standby_network_on
    label: Standby Network On
    kind: action
    command: "<CR>*standbynet=on#<CR>"
    params: []

  - id: standby_network_off
    label: Standby Network Off
    kind: action
    command: "<CR>*standbynet=off#<CR>"
    params: []

  - id: standby_mic_on
    label: Standby Microphone On
    kind: action
    command: "<CR>*standbymic=on#<CR>"
    params: []

  - id: standby_mic_off
    label: Standby Microphone Off
    kind: action
    command: "<CR>*standbymic=off#<CR>"
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
        values:
          - "2400"
          - "4800"
          - "9600"
          - "14400"
          - "19200"
          - "38400"
          - "57600"
          - "115200"
        description: "Baud rate (changes serial connection speed)"

  - id: set_lamp_mode
    label: Set Lamp Mode
    kind: action
    command: "<CR>*lampm={mode}#<CR>"
    params:
      - name: mode
        type: enum
        values:
          - lnor
          - eco
          - seco
          - dualbr
          - dualre
          - single
          - singleeco
        description: "Lamp mode (lnor=Normal, eco=Eco, seco=Smart Eco, dualbr=Dual Brightest, dualre=Dual Reliable, single=Single Alternative, singleeco=Single Alt Eco)"

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
        values:
          - "off"
          - auto
          - tb
          - fs
          - fp
          - sbs
          - da
          - iv
          - 2d3d
          - nvidia
        description: "3D mode (tb=Top/Bottom, fs=Frame Sequential, fp=Frame Packing, sbs=Side by Side, da=Inverter Disable, iv=Inverter, 2d3d=2D to 3D)"

  - id: set_remote_receiver
    label: Set Remote Receiver
    kind: action
    command: "<CR>*rr={mode}#<CR>"
    params:
      - name: mode
        type: enum
        values:
          - fr
          - f
          - r
        description: "fr=Front+Rear, f=Front, r=Rear"

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

  - id: lamp_saver_on
    label: LampSaver Mode On
    kind: action
    command: "<CR>*lpsaver=on#<CR>"
    params: []

  - id: lamp_saver_off
    label: LampSaver Mode Off
    kind: action
    command: "<CR>*lpsaver=off#<CR>"
    params: []

  - id: projection_login_on
    label: Projection Login Code On
    kind: action
    command: "<CR>*prjlogincode=on#<CR>"
    params: []

  - id: projection_login_off
    label: Projection Login Code Off
    kind: action
    command: "<CR>*prjlogincode=off#<CR>"
    params: []

  - id: broadcasting_on
    label: Broadcasting On
    kind: action
    command: "<CR>*broadcasting=on#<CR>"
    params: []

  - id: broadcasting_off
    label: Broadcasting Off
    kind: action
    command: "<CR>*broadcasting=off#<CR>"
    params: []

  - id: amx_discovery_on
    label: AMX Device Discovery On
    kind: action
    command: "<CR>*amxdd=on#<CR>"
    params: []

  - id: amx_discovery_off
    label: AMX Device Discovery Off
    kind: action
    command: "<CR>*amxdd=off#<CR>"
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
    values:
      - ON
      - OFF
    description: "Returns POW=ON# or POW=OFF#"

  - id: current_source
    label: Current Source
    type: enum
    command: "<CR>*sour=?#<CR>"
    values:
      - RGB
      - RGB2
      - ypbr
      - ypbr2
      - dviA
      - dvid
      - hdmi
      - hdmi2
      - vid
      - svid
      - network
      - usbdisplay
      - usbreader

  - id: mute_state
    label: Mute Status
    type: enum
    command: "<CR>*mute=?#<CR>"
    values:
      - ON
      - OFF

  - id: volume_status
    label: Volume Status
    type: string
    command: "<CR>*vol=?#<CR>"

  - id: mic_volume_status
    label: Microphone Volume Status
    type: string
    command: "<CR>*micvol=?#<CR>"

  - id: audio_source_status
    label: Audio Source Status
    type: enum
    command: "<CR>*audiosour=?#<CR>"
    values:
      - "off"
      - RGB
      - RGB2
      - vid
      - ypbr
      - hdmi
      - hdmi2

  - id: picture_mode
    label: Picture Mode
    type: enum
    command: "<CR>*appmod=?#<CR>"
    values:
      - dynamic
      - preset
      - srgb
      - bright
      - livingroom
      - game
      - cine
      - std
      - user1
      - user2
      - user3
      - isfday
      - isfnight
      - threed

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
    values:
      - warmer
      - warm
      - normal
      - cool
      - cooler
      - native

  - id: aspect_status
    label: Aspect Ratio Status
    type: enum
    command: "<CR>*asp=?#<CR>"
    values:
      - "4:3"
      - "16:9"
      - "16:10"
      - AUTO
      - REAL
      - LBOX
      - WIDE
      - ANAM

  - id: brilliant_color_status
    label: Brilliant Color Status
    type: enum
    command: "<CR>*BC=?#<CR>"
    values:
      - ON
      - OFF

  - id: projector_position
    label: Projector Position Status
    type: enum
    command: "<CR>*pp=?#<CR>"
    values:
      - FT
      - RE
      - RC
      - FC

  - id: quick_auto_search_status
    label: Quick Auto Search Status
    type: enum
    command: "<CR>*QAS=?#<CR>"
    values:
      - ON
      - OFF

  - id: direct_power_status
    label: Direct Power On Status
    type: enum
    command: "<CR>*directpower=?#<CR>"
    values:
      - ON
      - OFF

  - id: signal_power_status
    label: Signal Power On Status
    type: enum
    command: "<CR>*autopower=?#<CR>"
    values:
      - ON
      - OFF

  - id: standby_network_status
    label: Standby Network Status
    type: enum
    command: "<CR>*standbynet=?#<CR>"
    values:
      - ON
      - OFF

  - id: standby_mic_status
    label: Standby Microphone Status
    type: enum
    command: "<CR>*standbymic=?#<CR>"
    values:
      - ON
      - OFF

  - id: standby_monitor_status
    label: Standby Monitor Out Status
    type: enum
    command: "<CR>*standbymnt=?#<CR>"
    values:
      - ON
      - OFF

  - id: current_baud_rate
    label: Current Baud Rate
    type: enum
    command: "<CR>*baud=?#<CR>"
    values:
      - "2400"
      - "4800"
      - "9600"
      - "14400"
      - "19200"
      - "38400"
      - "57600"
      - "115200"

  - id: lamp_hours
    label: Lamp Hours
    type: string
    command: "<CR>*ltim=?#<CR>"

  - id: lamp2_hours
    label: Lamp 2 Hours
    type: string
    command: "<CR>*ltim2=?#<CR>"

  - id: lamp_mode_status
    label: Lamp Mode Status
    type: enum
    command: "<CR>*lampm=?#<CR>"
    values:
      - lnor
      - eco
      - seco
      - dualbr
      - dualre
      - single
      - singleeco

  - id: model_name
    label: Model Name
    type: string
    command: "<CR>*modelname=?#<CR>"

  - id: blank_status
    label: Blank Status
    type: enum
    command: "<CR>*blank=?#<CR>"
    values:
      - ON
      - OFF

  - id: freeze_status
    label: Freeze Status
    type: enum
    command: "<CR>*freeze=?#<CR>"
    values:
      - ON
      - OFF

  - id: 3d_status
    label: 3D Sync Status
    type: enum
    command: "<CR>*3d=?#<CR>"
    values:
      - "off"
      - auto
      - tb
      - fs
      - fp
      - sbs
      - da
      - iv
      - 2d3d
      - nvidia

  - id: remote_receiver_status
    label: Remote Receiver Status
    type: enum
    command: "<CR>*rr=?#<CR>"
    values:
      - fr
      - f
      - r

  - id: instant_on_status
    label: Instant On Status
    type: enum
    command: "<CR>*ins=?#<CR>"
    values:
      - ON
      - OFF

  - id: lamp_saver_status
    label: LampSaver Mode Status
    type: enum
    command: "<CR>*lpsaver=?#<CR>"
    values:
      - ON
      - OFF

  - id: projection_login_status
    label: Projection Login Code Status
    type: enum
    command: "<CR>*prjlogincode=?#<CR>"
    values:
      - ON
      - OFF

  - id: broadcasting_status
    label: Broadcasting Status
    type: enum
    command: "<CR>*broadcasting=?<CR>"
    values:
      - ON
      - OFF

  - id: amx_discovery_status
    label: AMX Device Discovery Status
    type: enum
    command: "<CR>*amxdd=?#<CR>"
    values:
      - ON
      - OFF

  - id: mac_address
    label: MAC Address
    type: string
    command: "<CR>*macaddr=?#<CR>"

  - id: high_altitude_status
    label: High Altitude Mode Status
    type: enum
    command: "<CR>*Highaltitude=?#<CR>"
    values:
      - ON
      - OFF
```

## Variables
```yaml
# UNRESOLVED: source uses incremental (+/-) commands for volume, contrast, brightness,
# color, sharpness. No absolute set-value syntax documented.
```

## Events
```yaml
# Source describes echo responses but no unsolicited event notifications.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes: power off command only works from standby-to-on state.
# "Illegal format" echo for bad commands; "Unsupported item" for model-invalid commands;
# "Block item" for contextually invalid commands.
# 5-second timeout returns 0D,0A,00 if no command sent.
```

## Notes
- Command format: ASCII `<CR>` (0x0D) prefix, `*` command prefix, `=` separator for write/read, `#` terminator, `<CR>` suffix.
- Query commands use `?` as value (e.g. `*pow=?#`).
- Echo: projector echoes the command back in uppercase (e.g. send `*pow=on#`, receive `> *pow=on#*POW=ON#`).
- Error responses: "Illegal format" (bad syntax), "Unsupported item" (valid but not for this model), "Block item" (valid but blocked in current state).
- 5-second inactivity timeout: projector sends `0D,0A,00` if no command within 5 seconds.
- Ready indicator: `<CR>` alone returns `3E,00` (projector ready for RS-232 commands).
- Lowercase and uppercase input characters are both accepted.
- Baud rate default 115200; configurable via OSD menu or `*baud=` command.
- Dual-lamp commands (`dualbr`, `dualre`, `single`, `singleeco`) may not apply to all models.
- Source is generic BenQ RS232 manual — not model-specific.

<!-- UNRESOLVED: compatible_with.models is UNKNOWN — source does not list specific model numbers -->
<!-- UNRESOLVED: no firmware version ranges stated -->
<!-- UNRESOLVED: volume/contrast/brightness/color/sharpness range limits not stated -->
<!-- UNRESOLVED: which commands are available on which models not specified -->

## Provenance

```yaml
source_domains:
  - benqimage.blob.core.windows.net
  - manualslib.com
source_urls:
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - https://www.manualslib.com/manual/2887673/Benq-Rs232.html
retrieved_at: 2026-05-01T01:21:07.107Z
last_checked_at: 2026-06-02T21:51:24.992Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:51:24.992Z
matched_actions: 66
action_count: 66
confidence: medium
summary: "Generic BenQ RS232 spec with all 66 actions sourced from manual. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is generic BenQ RS232 manual, NOT specific to any model. Exact command support per model (7200/8200/8220) unknown."
- "source uses incremental (+/-) commands for volume, contrast, brightness,"
- "no multi-step sequences described in source"
- "compatible_with.models is UNKNOWN — source does not list specific model numbers"
- "no firmware version ranges stated"
- "volume/contrast/brightness/color/sharpness range limits not stated"
- "which commands are available on which models not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
