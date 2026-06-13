---
spec_id: admin/benq-w5800
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ W5800 Control Spec"
manufacturer: BenQ
model_family: W5800
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - W5800
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/PROJECTOR%20FOR%20CONSUMER/Control%20Protocols/W5800/W5800_RS232%20Control%20Guide_1.0.1_Windows_250409141831.pdf"
retrieved_at: 2026-06-12T02:02:19.291Z
last_checked_at: 2026-06-12T19:12:22.075Z
generated_at: 2026-06-12T19:12:22.075Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "multiple supported (9600/14400/19200/38400/57600/115200); check device OSD"
  - "no settable continuous variables beyond those represented as actions"
  - "source does not document unsolicited notifications"
  - "no multi-step sequences in source"
  - "source mentions standby power 0.5W requirement but no explicit safety interlocks"
  - "specific baud rate default not stated — must check OSD"
  - "response format/structure not documented beyond error strings"
  - "lamp `ltim` query — unit (hours?) not stated"
  - "contrast/brightness/color/sharpness/fleshtone value ranges not stated"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:12:22.075Z
  matched_actions: 124
  action_count: 124
  confidence: medium
  summary: "All 124 spec actions verified against source table with exact literal matches; transport parameters confirmed; full source command coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# BenQ W5800 Control Spec

## Summary

BenQ W5800 laser projector controllable via RS-232 serial (direct, HDBaseT) or RS-232-over-LAN (TCP port 8000). Commands use ASCII format `<CR>*<mnemonic>=<value>#<CR>`. This spec covers power, source selection, picture settings, keystone, lamp control, 3D, and miscellaneous operations.

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 8000
serial:
  baud_rate: null  # UNRESOLVED: multiple supported (9600/14400/19200/38400/57600/115200); check device OSD
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
  - powerable       # power on/off commands
  - queryable       # read/status queries for many parameters
  - levelable       # contrast, brightness, color, sharpness, flesh tone values
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

  - id: power_status
    label: Power Status
    kind: query
    command: "<CR>*pow=?#<CR>"
    params: []

  - id: source_hdmi
    label: Select HDMI 1
    kind: action
    command: "<CR>*sour=hdmi#<CR>"
    params: []

  - id: source_hdmi2
    label: Select HDMI 2
    kind: action
    command: "<CR>*sour=hdmi2#<CR>"
    params: []

  - id: source_usbreader
    label: Select USB Reader
    kind: action
    command: "<CR>*sour=usbreader#<CR>"
    params: []

  - id: source_status
    label: Current Source Query
    kind: query
    command: "<CR>*sour=?#<CR>"
    params: []

  - id: picture_bright
    label: Picture Mode Bright
    kind: action
    command: "<CR>*appmod=bright#<CR>"
    params: []

  - id: picture_brightcine
    label: Picture Mode Bright Cinema
    kind: action
    command: "<CR>*appmod=brightcine#<CR>"
    params: []

  - id: picture_filmmaker
    label: Picture Mode FILMMAKER MODE
    kind: action
    command: "<CR>*appmod=filmmaker#<CR>"
    params: []

  - id: picture_cine
    label: Picture Mode Cinema (Rec.709)
    kind: action
    command: "<CR>*appmod=cine#<CR>"
    params: []

  - id: picture_user
    label: Picture Mode User
    kind: action
    command: "<CR>*appmod=user#<CR>"
    params: []

  - id: picture_isfday
    label: Picture Mode ISF Day
    kind: action
    command: "<CR>*appmod=isfday#<CR>"
    params: []

  - id: picture_isfnight
    label: Picture Mode ISF Night
    kind: action
    command: "<CR>*appmod=isfnight#<CR>"
    params: []

  - id: picture_3d
    label: Picture Mode 3D
    kind: action
    command: "<CR>*appmod=threed#<CR>"
    params: []

  - id: picture_hdr
    label: Picture Mode HDR10
    kind: action
    command: "<CR>*appmod=hdr#<CR>"
    params: []

  - id: picture_hdr_plus
    label: Picture Mode HDR10+
    kind: action
    command: "<CR>*appmod=hdr+#<CR>"
    params: []

  - id: picture_hlg
    label: Picture Mode HLG
    kind: action
    command: "<CR>*appmod=hlg#<CR>"
    params: []

  - id: picture_mode_status
    label: Picture Mode Query
    kind: query
    command: "<CR>*appmod=?#<CR>"
    params: []

  - id: contrast_up
    label: Contrast Increase
    kind: action
    command: "<CR>*con=+#<CR>"
    params: []

  - id: contrast_down
    label: Contrast Decrease
    kind: action
    command: "<CR>*con=-#<CR>"
    params: []

  - id: contrast_set
    label: Set Contrast
    kind: action
    command: "<CR>*con=value#<CR>"
    params:
      - name: value
        type: integer
        description: Contrast value

  - id: contrast_status
    label: Contrast Query
    kind: query
    command: "<CR>*con=?#<CR>"
    params: []

  - id: brightness_up
    label: Brightness Increase
    kind: action
    command: "<CR>*bri=+#<CR>"
    params: []

  - id: brightness_down
    label: Brightness Decrease
    kind: action
    command: "<CR>*bri=-#<CR>"
    params: []

  - id: brightness_set
    label: Set Brightness
    kind: action
    command: "<CR>*bri=value#<CR>"
    params:
      - name: value
        type: integer
        description: Brightness value

  - id: brightness_status
    label: Brightness Query
    kind: query
    command: "<CR>*bri=?#<CR>"
    params: []

  - id: color_up
    label: Color Increase
    kind: action
    command: "<CR>*color=+#<CR>"
    params: []

  - id: color_down
    label: Color Decrease
    kind: action
    command: "<CR>*color=-#<CR>"
    params: []

  - id: color_set
    label: Set Color
    kind: action
    command: "<CR>*color=value#<CR>"
    params:
      - name: value
        type: integer
        description: Color value

  - id: color_status
    label: Color Query
    kind: query
    command: "<CR>*color=?#<CR>"
    params: []

  - id: sharpness_up
    label: Sharpness Increase
    kind: action
    command: "<CR>*sharp=+#<CR>"
    params: []

  - id: sharpness_down
    label: Sharpness Decrease
    kind: action
    command: "<CR>*sharp=-#<CR>"
    params: []

  - id: sharpness_set
    label: Set Sharpness
    kind: action
    command: "<CR>*sharp=value#<CR>"
    params:
      - name: value
        type: integer
        description: Sharpness value

  - id: sharpness_status
    label: Sharpness Query
    kind: query
    command: "<CR>*sharp=?#<CR>"
    params: []

  - id: fleshtone_up
    label: Flesh Tone Increase
    kind: action
    command: "<CR>*fleshtone=+#<CR>"
    params: []

  - id: fleshtone_down
    label: Flesh Tone Decrease
    kind: action
    command: "<CR>*fleshtone=-#<CR>"
    params: []

  - id: fleshtone_set
    label: Set Flesh Tone
    kind: action
    command: "<CR>*fleshtone=value#<CR>"
    params:
      - name: value
        type: integer
        description: Flesh Tone value

  - id: fleshtone_status
    label: Flesh Tone Query
    kind: query
    command: "<CR>*fleshtone=?#<CR>"
    params: []

  - id: ct_warm
    label: Color Temperature Warm
    kind: action
    command: "<CR>*ct=warm#<CR>"
    params: []

  - id: ct_normal
    label: Color Temperature Normal
    kind: action
    command: "<CR>*ct=normal#<CR>"
    params: []

  - id: ct_cool
    label: Color Temperature Cool
    kind: action
    command: "<CR>*ct=cool#<CR>"
    params: []

  - id: ct_native
    label: Color Temperature Lamp Native
    kind: action
    command: "<CR>*ct=native#<CR>"
    params: []

  - id: ct_status
    label: Color Temperature Query
    kind: query
    command: "<CR>*ct=?#<CR>"
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

  - id: aspect_2_35
    label: Aspect 2.35:1
    kind: action
    command: "<CR>*asp=2.35#<CR>"
    params: []

  - id: aspect_auto
    label: Aspect Auto
    kind: action
    command: "<CR>*asp=AUTO#<CR>"
    params: []

  - id: aspect_status
    label: Aspect Query
    kind: query
    command: "<CR>*asp=?#<CR>"
    params: []

  - id: vkeystone_up
    label: Vertical Keystone Increase
    kind: action
    command: "<CR>*vkeystone=+#<CR>"
    params: []

  - id: vkeystone_down
    label: Vertical Keystone Decrease
    kind: action
    command: "<CR>*vkeystone=-#<CR>"
    params: []

  - id: vkeystone_status
    label: Vertical Keystone Query
    kind: query
    command: "<CR>*vkeystone=?#<CR>"
    params: []

  - id: hkeystone_up
    label: Horizontal Keystone Increase
    kind: action
    command: "<CR>*hkeystone=+#<CR>"
    params: []

  - id: hkeystone_down
    label: Horizontal Keystone Decrease
    kind: action
    command: "<CR>*hkeystone=-#<CR>"
    params: []

  - id: hkeystone_status
    label: Horizontal Keystone Query
    kind: query
    command: "<CR>*hkeystone=?#<CR>"
    params: []

  - id: reset_current_picture
    label: Reset Current Picture Settings
    kind: action
    command: "<CR>*rstcurpicsetting#<CR>"
    params: []

  - id: reset_all_picture
    label: Reset All Picture Settings
    kind: action
    command: "<CR>*rstallpicsetting#<CR>"
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

  - id: position_status
    label: Projector Position Query
    kind: query
    command: "<CR>*pp=?#<CR>"
    params: []

  - id: quick_auto_search_status
    label: Quick Auto Search Query
    kind: query
    command: "<CR>*QAS=?#<CR>"
    params: []

  - id: menu_position_center
    label: Menu Position Center
    kind: action
    command: "<CR>*menuposition=center#<CR>"
    params: []

  - id: menu_position_tl
    label: Menu Position Top-Left
    kind: action
    command: "<CR>*menuposition=tl#<CR>"
    params: []

  - id: menu_position_tr
    label: Menu Position Top-Right
    kind: action
    command: "<CR>*menuposition=tr#<CR>"
    params: []

  - id: menu_position_br
    label: Menu Position Bottom-Right
    kind: action
    command: "<CR>*menuposition=br#<CR>"
    params: []

  - id: menu_position_bl
    label: Menu Position Bottom-Left
    kind: action
    command: "<CR>*menuposition=bl#<CR>"
    params: []

  - id: menu_position_status
    label: Menu Position Query
    kind: query
    command: "<CR>*menuposition=?#<CR>"
    params: []

  - id: direct_power_on
    label: Direct Power On
    kind: action
    command: "<CR>*directpower=on#<CR>"
    params: []

  - id: direct_power_off
    label: Direct Power Off
    kind: action
    command: "<CR>*directpower=off#<CR>"
    params: []

  - id: direct_power_status
    label: Direct Power On Query
    kind: query
    command: "<CR>*directpower=?#<CR>"
    params: []

  - id: standby_net_on
    label: Standby Network On
    kind: action
    command: "<CR>*standbynet=on#<CR>"
    params: []

  - id: standby_net_off
    label: Standby Network Off
    kind: action
    command: "<CR>*standbynet=off#<CR>"
    params: []

  - id: standby_net_status
    label: Standby Network Query
    kind: query
    command: "<CR>*standbynet=?#<CR>"
    params: []

  - id: baud_9600
    label: Set Baud Rate 9600
    kind: action
    command: "<CR>*baud=9600#<CR>"
    params: []

  - id: baud_19200
    label: Set Baud Rate 19200
    kind: action
    command: "<CR>*baud=19200#<CR>"
    params: []

  - id: baud_38400
    label: Set Baud Rate 38400
    kind: action
    command: "<CR>*baud=38400#<CR>"
    params: []

  - id: baud_57600
    label: Set Baud Rate 57600
    kind: action
    command: "<CR>*baud=57600#<CR>"
    params: []

  - id: baud_115200
    label: Set Baud Rate 115200
    kind: action
    command: "<CR>*baud=115200#<CR>"
    params: []

  - id: baud_status
    label: Baud Rate Query
    kind: query
    command: "<CR>*baud=?#<CR>"
    params: []

  - id: lamp_time
    label: Lamp Hours Query
    kind: query
    command: "<CR>*ltim=?#<CR>"
    params: []

  - id: lamp_normal
    label: Lamp Mode Normal
    kind: action
    command: "<CR>*lampm=lnor#<CR>"
    params: []

  - id: lamp_eco
    label: Lamp Mode Eco
    kind: action
    command: "<CR>*lampm=eco#<CR>"
    params: []

  - id: lamp_dynamic
    label: Lamp Mode Dynamic Black
    kind: action
    command: "<CR>*appmod=dynamic#<CR>"
    params: []

  - id: lamp_custom
    label: Lamp Mode Custom
    kind: action
    command: "<CR>*lampm=custom#<CR>"
    params: []

  - id: lamp_custom_level
    label: Set Custom Light Level
    kind: action
    command: "<CR>*lampcustom=value#<CR>"
    params:
      - name: value
        type: integer
        description: Light level for custom lamp mode

  - id: lamp_custom_status
    label: Custom Light Level Query
    kind: query
    command: "<CR>*lampcustom=?#<CR>"
    params: []

  - id: lamp_mode_status
    label: Lamp Mode Query
    kind: query
    command: "<CR>*lampm=?#<CR>"
    params: []

  - id: model_name
    label: Model Name Query
    kind: query
    command: "<CR>*modelname=?#<CR>"
    params: []

  - id: sys_fw_version
    label: System Firmware Query
    kind: query
    command: "<CR>*sysfwversion=?#<CR>"
    params: []

  - id: scaler_fw_version
    label: Scaler Firmware Query
    kind: query
    command: "<CR>*scalerfwversion=?#<CR>"
    params: []

  - id: lan_fw_version
    label: LAN Firmware Query
    kind: query
    command: "<CR>*lanfwversion=?#<CR>"
    params: []

  - id: mcu_fw_version
    label: MCU Firmware Query
    kind: query
    command: "<CR>*mcufwversion=?#<CR>"
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

  - id: blank_status
    label: Blank Query
    kind: query
    command: "<CR>*blank=?#<CR>"
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

  - id: menu_status
    label: Menu Query
    kind: query
    command: "<CR>*menu=?#<CR>"
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

  - id: nav_back
    label: Navigate Back
    kind: action
    command: "<CR>*back#<CR>"
    params: []

  - id: source_menu_on
    label: Source Menu On
    kind: action
    command: "<CR>*sourmenu=on#<CR>"
    params: []

  - id: source_menu_off
    label: Source Menu Off
    kind: action
    command: "<CR>*sourmenu=off#<CR>"
    params: []

  - id: source_menu_status
    label: Source Menu Query
    kind: query
    command: "<CR>*sourmenu=?#<CR>"
    params: []

  - id: sync_3d_off
    label: 3D Sync Off
    kind: action
    command: "<CR>*3d=off#<CR>"
    params: []

  - id: sync_3d_on
    label: 3D Sync On
    kind: action
    command: "<CR>*3d=on#<CR>"
    params: []

  - id: sync_3d_auto
    label: 3D Sync Auto
    kind: action
    command: "<CR>*3d=auto#<CR>"
    params: []

  - id: sync_3d_tb
    label: 3D Sync Top Bottom
    kind: action
    command: "<CR>*3d=tb#<CR>"
    params: []

  - id: sync_3d_fs
    label: 3D Sync Frame Sequential
    kind: action
    command: "<CR>*3d=fs#<CR>"
    params: []

  - id: sync_3d_fp
    label: 3D Frame Packing
    kind: action
    command: "<CR>*3d=fp#<CR>"
    params: []

  - id: sync_3d_sbs
    label: 3D Side by Side
    kind: action
    command: "<CR>*3d=sbs#<CR>"
    params: []

  - id: sync_3d_da
    label: 3D Inverter Disable
    kind: action
    command: "<CR>*3d=da#<CR>"
    params: []

  - id: mode_3d_off
    label: 3D Mode Off
    kind: action
    command: "<CR>*3dmode=off#<CR>"
    params: []

  - id: sync_3d_iv
    label: 3D Inverter Enable
    kind: action
    command: "<CR>*3d=iv#<CR>"
    params: []

  - id: sync_3d_status
    label: 3D Sync Query
    kind: query
    command: "<CR>*3d=?#<CR>"
    params: []

  - id: mac_address
    label: MAC Address Query
    kind: query
    command: "<CR>*macaddr=?#<CR>"
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

  - id: high_altitude_status
    label: High Altitude Mode Query
    kind: query
    command: "<CR>*Highaltitude=?#<CR>"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    type: enum
    values: [on, off]

  - id: source_state
    label: Current Source
    type: enum
    values: [hdmi, hdmi2, usbreader]

  - id: picture_mode_state
    label: Picture Mode
    type: enum
    values: [bright, brightcine, filmmaker, cine, user, isfday, isfnight, threed, hdr, "hdr+", hlg]

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

  - id: fleshtone_value
    label: Flesh Tone Value
    type: integer

  - id: color_temperature
    label: Color Temperature
    type: enum
    values: [warm, normal, cool, native]

  - id: aspect_ratio
    label: Aspect Ratio
    type: enum
    values: ["4:3", "16:9", "2.35", AUTO]

  - id: vkeystone_value
    label: Vertical Keystone Value
    type: integer

  - id: hkeystone_value
    label: Horizontal Keystone Value
    type: integer

  - id: projector_position
    label: Projector Position
    type: enum
    values: [FT, RE, RC, FC]

  - id: menu_position_state
    label: Menu Position
    type: enum
    values: [center, tl, tr, br, bl]

  - id: direct_power_state
    label: Direct Power On State
    type: enum
    values: [on, off]

  - id: standby_net_state
    label: Standby Network State
    type: enum
    values: [on, off]

  - id: baud_rate
    label: Baud Rate
    type: enum
    values: [9600, 19200, 38400, 57600, 115200]

  - id: lamp_hours
    label: Lamp Hours
    type: integer

  - id: lamp_mode
    label: Lamp Mode
    type: enum
    values: [lnor, eco, custom]

  - id: lamp_custom_level
    label: Custom Light Level
    type: integer

  - id: blank_state
    label: Blank State
    type: enum
    values: [on, off]

  - id: menu_state
    label: Menu State
    type: enum
    values: [on, off]

  - id: source_menu_state
    label: Source Menu State
    type: enum
    values: [on, off]

  - id: sync_3d_state
    label: 3D Sync State
    type: enum
    values: [off, on, auto, tb, fs, fp, sbs, da, iv]

  - id: high_altitude_state
    label: High Altitude Mode State
    type: enum
    values: [on, off]

  - id: model_name
    label: Model Name
    type: string

  - id: sys_fw_version
    label: System Firmware Version
    type: string

  - id: scaler_fw_version
    label: Scaler Firmware Version
    type: string

  - id: lan_fw_version
    label: LAN Firmware Version
    type: string

  - id: mcu_fw_version
    label: MCU Firmware Version
    type: string

  - id: mac_address
    label: MAC Address
    type: string
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables beyond those represented as actions
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions standby power 0.5W requirement but no explicit safety interlocks
```

## Notes

Commands case-insensitive. Illegal format returns `Illegal format`; unsupported commands return `Unsupported item`; blocked commands return `Block item`. LAN control wraps commands in `<CR>` delimiters identical to serial. Baud rate must be checked from projector OSD before connecting — multiple rates supported (9600–115200).

<!-- UNRESOLVED: specific baud rate default not stated — must check OSD -->
<!-- UNRESOLVED: response format/structure not documented beyond error strings -->
<!-- UNRESOLVED: lamp `ltim` query — unit (hours?) not stated -->
<!-- UNRESOLVED: contrast/brightness/color/sharpness/fleshtone value ranges not stated -->

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/PROJECTOR%20FOR%20CONSUMER/Control%20Protocols/W5800/W5800_RS232%20Control%20Guide_1.0.1_Windows_250409141831.pdf"
retrieved_at: 2026-06-12T02:02:19.291Z
last_checked_at: 2026-06-12T19:12:22.075Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:12:22.075Z
matched_actions: 124
action_count: 124
confidence: medium
summary: "All 124 spec actions verified against source table with exact literal matches; transport parameters confirmed; full source command coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "multiple supported (9600/14400/19200/38400/57600/115200); check device OSD"
- "no settable continuous variables beyond those represented as actions"
- "source does not document unsolicited notifications"
- "no multi-step sequences in source"
- "source mentions standby power 0.5W requirement but no explicit safety interlocks"
- "specific baud rate default not stated — must check OSD"
- "response format/structure not documented beyond error strings"
- "lamp `ltim` query — unit (hours?) not stated"
- "contrast/brightness/color/sharpness/fleshtone value ranges not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
