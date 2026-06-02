---
spec_id: admin/benq-mh680-th680
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ MH680/TH680 Control Spec"
manufacturer: BenQ
model_family: MH680
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - MH680
    - TH680
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - benq.com
  - scribd.com
  - audiogeneral.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - "https://esupportdownload.benq.com/esupport/Projector/UserManual/Projector_um_User%20Manual_20131213_084751New_MH680_TH680_EN.pdf"
  - https://www.benq.com/en-us/support/downloads-faq/products/projector/mh680/manual.html
  - https://www.scribd.com/document/499375003/Rs232-Commands-Benq
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
retrieved_at: 2026-05-14T20:27:43.223Z
last_checked_at: 2026-05-14T21:40:22.921Z
generated_at: 2026-05-14T21:40:22.921Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "baud rate selectable via command (*baud=), not fixed"
  - "hour range not stated in source"
  - "all settable parameters also have write actions, no separate Variables needed"
  - "no unsolicited notifications described in source"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "ltim2 (Lamp2 Hour) not supported on this model per source"
  - "micvol commands not supported on this model per source"
  - "network/USB/wireless/HDBaseT source selection not supported on this model per source"
  - "standby network/microphone settings not supported on this model per source"
  - "baud rate is software-settable via *baud= command, not hard-configured"
  - "firmware version not stated in source"
verification:
  verdict: verified
  checked_at: 2026-05-14T21:40:22.921Z
  matched_actions: 69
  action_count: 86
  confidence: medium
  summary: "All 69 spec actions matched verbatim in source command table; transport parameters verified; supported command set fully represented. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# BenQ MH680/TH680 Control Spec

## Summary
BenQ MH680 and TH680 home entertainment projectors. Control via RS-232 serial or TCP/IP (port 8000). Commands wrapped in `<CR>*cmd=value#<CR>` syntax. No authentication required.

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 8000  # stated: "Input 8000 in the TCP port # field"
serial:
  baud_rate: null  # UNRESOLVED: baud rate selectable via command (*baud=), not fixed
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # pow=on/off commands present
- queryable  # pow=?, sour=?, mute=?, vol=?, etc. present
- routable    # source selection commands present
- levelable  # vol+/-, bri+/-, con+/-, color+/-, sharp+/- present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  command: "<CR>*pow=on#<CR>"

- id: power_off
  label: Power Off
  kind: action
  params: []
  command: "<CR>*pow=off#<CR>"

- id: sour_rgb
  label: Select Computer/YPbPr
  kind: action
  params: []
  command: "<CR>*sour=RGB#<CR>"

- id: sour_rgb2
  label: Select Computer 2/YPbPr2
  kind: action
  params: []
  command: "<CR>*sour=RGB2#<CR>"

- id: sour_hdmi
  label: Select HDMI/MHL
  kind: action
  params: []
  command: "<CR>*sour=hdmi#<CR>"

- id: sour_hdmi2
  label: Select HDMI 2/MHL2
  kind: action
  params: []
  command: "<CR>*sour=hdmi2#<CR>"

- id: sour_vid
  label: Select Composite
  kind: action
  params: []
  command: "<CR>*sour=vid#<CR>"

- id: sour_svid
  label: Select S-Video
  kind: action
  params: []
  command: "<CR>*sour=svid#<CR>"

- id: mute_on
  label: Mute On
  kind: action
  params: []
  command: "<CR>*mute=on#<CR>"

- id: mute_off
  label: Mute Off
  kind: action
  params: []
  command: "<CR>*mute=off#<CR>"

- id: vol_up
  label: Volume Up
  kind: action
  params: []
  command: "<CR>*vol=+#<CR>"

- id: vol_down
  label: Volume Down
  kind: action
  params: []
  command: "<CR>*vol=-#<CR>"

- id: audiosour_off
  label: Audio Pass Through Off
  kind: action
  params: []
  command: "<CR>*audiosour=off#<CR>"

- id: audiosour_rgb
  label: Audio-Computer1
  kind: action
  params: []
  command: "<CR>*audiosour=RGB#<CR>"

- id: audiosour_rgb2
  label: Audio-Computer2
  kind: action
  params: []
  command: "<CR>*audiosour=RGB2#<CR>"

- id: audiosour_vid
  label: Audio-Video/S-Video
  kind: action
  params: []
  command: "<CR>*audiosour=vid#<CR>"

- id: audiosour_hdmi
  label: Audio-HDMI
  kind: action
  params: []
  command: "<CR>*audiosour=hdmi#<CR>"

- id: audiosour_hdmi2
  label: Audio-HDMI2
  kind: action
  params: []
  command: "<CR>*audiosour=hdmi2#<CR>"

- id: appmod_presentation
  label: Presentation Mode
  kind: action
  params: []
  command: "<CR>*appmod=preset#<CR>"

- id: appmod_srgb
  label: sRGB Mode
  kind: action
  params: []
  command: "<CR>*appmod=srgb#<CR>"

- id: appmod_bright
  label: Bright Mode
  kind: action
  params: []
  command: "<CR>*appmod=bright#<CR>"

- id: appmod_cinema
  label: Cinema Mode
  kind: action
  params: []
  command: "<CR>*appmod=cine#<CR>"

- id: appmod_user1
  label: User1 Mode
  kind: action
  params: []
  command: "<CR>*appmod=user1#<CR>"

- id: appmod_user2
  label: User2 Mode
  kind: action
  params: []
  command: "<CR>*appmod=user2#<CR>"

- id: appmod_threed
  label: 3D Mode
  kind: action
  params: []
  command: "<CR>*appmod=threed#<CR>"

- id: con_up
  label: Contrast Up
  kind: action
  params: []
  command: "<CR>*con=+#<CR>"

- id: con_down
  label: Contrast Down
  kind: action
  params: []
  command: "<CR>*con=-#<CR>"

- id: bri_up
  label: Brightness Up
  kind: action
  params: []
  command: "<CR>*bri=+#<CR>"

- id: bri_down
  label: Brightness Down
  kind: action
  params: []
  command: "<CR>*bri=-#<CR>"

- id: color_up
  label: Color Up
  kind: action
  params: []
  command: "<CR>*color=+#<CR>"

- id: color_down
  label: Color Down
  kind: action
  params: []
  command: "<CR>*color=-#<CR>"

- id: sharp_up
  label: Sharpness Up
  kind: action
  params: []
  command: "<CR>*sharp=+#<CR>"

- id: sharp_down
  label: Sharpness Down
  kind: action
  params: []
  command: "<CR>*sharp=-#<CR>"

- id: ct_warm
  label: Color Temperature-Warm
  kind: action
  params: []
  command: "<CR>*ct=warm#<CR>"

- id: ct_normal
  label: Color Temperature-Normal
  kind: action
  params: []
  command: "<CR>*ct=normal#<CR>"

- id: ct_cool
  label: Color Temperature-Cool
  kind: action
  params: []
  command: "<CR>*ct=cool#<CR>"

- id: ct_native
  label: Color Temperature-Lamp Native
  kind: action
  params: []
  command: "<CR>*ct=native#<CR>"

- id: asp_4x3
  label: Aspect 4:3
  kind: action
  params: []
  command: "<CR>*asp=4:3#<CR>"

- id: asp_16x9
  label: Aspect 16:9
  kind: action
  params: []
  command: "<CR>*asp=16:9#<CR>"

- id: asp_16x10
  label: Aspect 16:10
  kind: action
  params: []
  command: "<CR>*asp=16:10#<CR>"

- id: asp_auto
  label: Aspect Auto
  kind: action
  params: []
  command: "<CR>*asp=AUTO#<CR>"

- id: asp_real
  label: Aspect Real
  kind: action
  params: []
  command: "<CR>*asp=REAL#<CR>"

- id: zoom_in
  label: Digital Zoom In
  kind: action
  params: []
  command: "<CR>*zoomI#<CR>"

- id: zoom_out
  label: Digital Zoom Out
  kind: action
  params: []
  command: "<CR>*zoomO#<CR>"

- id: auto
  label: Auto Adjust
  kind: action
  params: []
  command: "<CR>*auto#<CR>"

- id: bc_on
  label: Brilliant Color On
  kind: action
  params: []
  command: "<CR>*BC=on#<CR>"

- id: bc_off
  label: Brilliant Color Off
  kind: action
  params: []
  command: "<CR>*BC=off#<CR>"

- id: pp_ft
  label: Projector Position-Front Table
  kind: action
  params: []
  command: "<CR>*pp=FT#<CR>"

- id: pp_re
  label: Projector Position-Rear Table
  kind: action
  params: []
  command: "<CR>*pp=RE#<CR>"

- id: pp_rc
  label: Projector Position-Rear Ceiling
  kind: action
  params: []
  command: "<CR>*pp=RC#<CR>"

- id: pp_fc
  label: Projector Position-Front Ceiling
  kind: action
  params: []
  command: "<CR>*pp=FC#<CR>"

- id: qas_on
  label: Quick Auto Search On
  kind: action
  params: []
  command: "<CR>*QAS=on#<CR>"

- id: qas_off
  label: Quick Auto Search Off
  kind: action
  params: []
  command: "<CR>*QAS=off#<CR>"

- id: directpower_on
  label: Direct Power On On
  kind: action
  params: []
  command: "<CR>*directpower=on#<CR>"

- id: directpower_off
  label: Direct Power On Off
  kind: action
  params: []
  command: "<CR>*directpower=off#<CR>"

- id: autopower_on
  label: Signal Power On On
  kind: action
  params: []
  command: "<CR>*autopower=on#<CR>"

- id: autopower_off
  label: Signal Power On Off
  kind: action
  params: []
  command: "<CR>*autopower=off#<CR>"

- id: standbymnt_on
  label: Standby Monitor Out On
  kind: action
  params: []
  command: "<CR>*standbymnt=on#<CR>"

- id: standbymnt_off
  label: Standby Monitor Out Off
  kind: action
  params: []
  command: "<CR>*standbymnt=off#<CR>"

- id: baud_write
  label: Set Baud Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: Baud rate (2400/4800/9600/14400/19200/38400/57600/115200)
  command: "<CR>*baud={rate}#<CR>"

- id: lampm_normal
  label: Lamp Mode Normal
  kind: action
  params: []
  command: "<CR>*lampm=lnor#<CR>"

- id: lampm_eco
  label: Lamp Mode Eco
  kind: action
  params: []
  command: "<CR>*lampm=eco#<CR>"

- id: lampm_seco
  label: Lamp Mode SmartEco
  kind: action
  params: []
  command: "<CR>*lampm=seco#<CR>"

- id: blank_on
  label: Blank On
  kind: action
  params: []
  command: "<CR>*blank=on#<CR>"

- id: blank_off
  label: Blank Off
  kind: action
  params: []
  command: "<CR>*blank=off#<CR>"

- id: freeze_on
  label: Freeze On
  kind: action
  params: []
  command: "<CR>*freeze=on#<CR>"

- id: freeze_off
  label: Freeze Off
  kind: action
  params: []
  command: "<CR>*freeze=off#<CR>"

- id: menu_on
  label: Menu On
  kind: action
  params: []
  command: "<CR>*menu=on#<CR>"

- id: menu_off
  label: Menu Off
  kind: action
  params: []
  command: "<CR>*menu=off#<CR>"

- id: up
  label: Up
  kind: action
  params: []
  command: "<CR>*up#<CR>"

- id: down
  label: Down
  kind: action
  params: []
  command: "<CR>*down#<CR>"

- id: right
  label: Right
  kind: action
  params: []
  command: "<CR>*right#<CR>"

- id: left
  label: Left
  kind: action
  params: []
  command: "<CR>*left#<CR>"

- id: enter
  label: Enter
  kind: action
  params: []
  command: "<CR>*enter#<CR>"

- id: 3d_off
  label: 3D Sync Off
  kind: action
  params: []
  command: "<CR>*3d=off#<CR>"

- id: 3d_auto
  label: 3D Auto
  kind: action
  params: []
  command: "<CR>*3d=auto#<CR>"

- id: 3d_tb
  label: 3D Sync TopBottom
  kind: action
  params: []
  command: "<CR>*3d=tb#<CR>"

- id: 3d_fs
  label: 3D Sync Frame Sequential
  kind: action
  params: []
  command: "<CR>*3d=fs#<CR>"

- id: 3d_fp
  label: 3D Framepacking
  kind: action
  params: []
  command: "<CR>*3d=fp#<CR>"

- id: 3d_sbs
  label: 3D Side by Side
  kind: action
  params: []
  command: "<CR>*3d=sbs#<CR>"

- id: 3d_da
  label: 3D Inverter Disable
  kind: action
  params: []
  command: "<CR>*3d=da#<CR>"

- id: 3d_iv
  label: 3D Inverter
  kind: action
  params: []
  command: "<CR>*3d=iv#<CR>"

- id: ins_on
  label: Instant On On
  kind: action
  params: []
  command: "<CR>*ins=on#<CR>"

- id: ins_off
  label: Instant On Off
  kind: action
  params: []
  command: "<CR>*ins=off#<CR>"

- id: highaltitude_on
  label: High Altitude Mode On
  kind: action
  params: []
  command: "<CR>*Highaltitude=on#<CR>"

- id: highaltitude_off
  label: High Altitude Mode Off
  kind: action
  params: []
  command: "<CR>*Highaltitude=off#<CR>"
```

## Feedbacks
```yaml
- id: power_state
  label: Power Status
  type: enum
  query: "<CR>*pow=?#<CR>"
  values:
    - on
    - off

- id: sour_state
  label: Current Source
  type: enum
  query: "<CR>*sour=?#<CR>"
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
    - wireless
    - hdbaset
    - dp

- id: mute_state
  label: Mute Status
  type: enum
  query: "<CR>*mute=?#<CR>"
  values:
    - on
    - off

- id: vol_state
  label: Volume Status
  type: integer
  query: "<CR>*vol=?#<CR>"
  range: 0-20

- id: audiosour_state
  label: Audio Pass Status
  type: enum
  query: "<CR>*audiosour=?#<CR>"
  values:
    - off
    - RGB
    - RGB2
    - vid
    - ypbr
    - hdmi
    - hdmi2

- id: appmod_state
  label: Picture Mode Status
  type: enum
  query: "<CR>*appmod=?#<CR>"
  values:
    - dynamic
    - preset
    - srgb
    - bright
    - livingroom
    - game
    - cine
    - std
    - football
    - dicom
    - user1
    - user2
    - user3
    - isfday
    - isfnight
    - threed

- id: con_state
  label: Contrast Value
  type: integer
  query: "<CR>*con=?#<CR>"
  range: 0-100

- id: bri_state
  label: Brightness Value
  type: integer
  query: "<CR>*bri=?#<CR>"
  range: 0-100

- id: color_state
  label: Color Value
  type: integer
  query: "<CR>*color=?#<CR>"
  range: 0-100

- id: sharp_state
  label: Sharpness Value
  type: integer
  query: "<CR>*sharp=?#<CR>"
  range: 0-100

- id: ct_state
  label: Color Temperature Status
  type: enum
  query: "<CR>*ct=?#<CR>"
  values:
    - warmer
    - warm
    - normal
    - cool
    - cooler
    - native

- id: asp_state
  label: Aspect Status
  type: enum
  query: "<CR>*asp=?#<CR>"
  values:
    - "4:3"
    - "16:6"
    - "16:9"
    - "16:10"
    - AUTO
    - REAL
    - LBOX
    - WIDE
    - ANAM

- id: bc_state
  label: Brilliant Color Status
  type: enum
  query: "<CR>*BC=?#<CR>"
  values:
    - on
    - off

- id: pp_state
  label: Projector Position Status
  type: enum
  query: "<CR>*pp=?#<CR>"
  values:
    - FT
    - RE
    - RC
    - FC

- id: qas_state
  label: Quick Auto Search Status
  type: enum
  query: "<CR>*QAS=?#<CR>"
  values:
    - on
    - off

- id: directpower_state
  label: Direct Power On Status
  type: enum
  query: "<CR>*directpower=?#<CR>"
  values:
    - on
    - off

- id: autopower_state
  label: Signal Power On Status
  type: enum
  query: "<CR>*autopower=?#<CR>"
  values:
    - on
    - off

- id: standbymnt_state
  label: Standby Monitor Out Status
  type: enum
  query: "<CR>*standbymnt=?#<CR>"
  values:
    - on
    - off

- id: baud_state
  label: Current Baud Rate
  type: enum
  query: "<CR>*baud=?#<CR>"
  values:
    - "2400"
    - "4800"
    - "9600"
    - "14400"
    - "19200"
    - "38400"
    - "57600"
    - "115200"

- id: ltim_state
  label: Lamp Hour
  type: integer
  query: "<CR>*ltim=?#<CR>"
  # UNRESOLVED: hour range not stated in source

- id: lampm_state
  label: Lamp Mode Status
  type: enum
  query: "<CR>*lampm=?#<CR>"
  values:
    - lnor
    - eco
    - seco
    - seco2
    - seco3
    - dimming
    - custom
    - dualbr
    - dualre
    - single
    - singleeco

- id: modelname_state
  label: Model Name
  type: string
  query: "<CR>*modelname=?#<CR>"

- id: blank_state
  label: Blank Status
  type: enum
  query: "<CR>*blank=?#<CR>"
  values:
    - on
    - off

- id: freeze_state
  label: Freeze Status
  type: enum
  query: "<CR>*freeze=?#<CR>"
  values:
    - on
    - off

- id: 3d_state
  label: 3D Sync Status
  type: enum
  query: "<CR>*3d=?#<CR>"
  values:
    - off
    - auto
    - tb
    - fs
    - fp
    - sbs
    - da
    - iv
    - "2d3d"
    - nvidia

- id: ins_state
  label: Instant On Status
  type: enum
  query: "<CR>*ins=?#<CR>"
  values:
    - on
    - off

- id: highaltitude_state
  label: High Altitude Mode Status
  type: enum
  query: "<CR>*Highaltitude=?#<CR>"
  values:
    - on
    - off
```

## Variables
```yaml
# UNRESOLVED: all settable parameters also have write actions, no separate Variables needed
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command wrapper format: `<CR>*cmd=value#<CR>` (carriage return delimited). Both TCP and serial use identical commands. Case-insensitive. Error responses: "Illegal format", "Unsupported item", "Block item". Commands work only when standby power ≤0.5W or supported baud rate set.

<!-- UNRESOLVED: ltim2 (Lamp2 Hour) not supported on this model per source -->
<!-- UNRESOLVED: micvol commands not supported on this model per source -->
<!-- UNRESOLVED: network/USB/wireless/HDBaseT source selection not supported on this model per source -->
<!-- UNRESOLVED: standby network/microphone settings not supported on this model per source -->
<!-- UNRESOLVED: baud rate is software-settable via *baud= command, not hard-configured -->
<!-- UNRESOLVED: firmware version not stated in source -->

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - benq.com
  - scribd.com
  - audiogeneral.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - "https://esupportdownload.benq.com/esupport/Projector/UserManual/Projector_um_User%20Manual_20131213_084751New_MH680_TH680_EN.pdf"
  - https://www.benq.com/en-us/support/downloads-faq/products/projector/mh680/manual.html
  - https://www.scribd.com/document/499375003/Rs232-Commands-Benq
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
retrieved_at: 2026-05-14T20:27:43.223Z
last_checked_at: 2026-05-14T21:40:22.921Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T21:40:22.921Z
matched_actions: 69
action_count: 86
confidence: medium
summary: "All 69 spec actions matched verbatim in source command table; transport parameters verified; supported command set fully represented. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "baud rate selectable via command (*baud=), not fixed"
- "hour range not stated in source"
- "all settable parameters also have write actions, no separate Variables needed"
- "no unsolicited notifications described in source"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "ltim2 (Lamp2 Hour) not supported on this model per source"
- "micvol commands not supported on this model per source"
- "network/USB/wireless/HDBaseT source selection not supported on this model per source"
- "standby network/microphone settings not supported on this model per source"
- "baud rate is software-settable via *baud= command, not hard-configured"
- "firmware version not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
