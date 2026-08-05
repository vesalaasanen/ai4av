---
spec_id: admin/benq-w4000i
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ W4000i Control Spec"
manufacturer: BenQ
model_family: W4000i
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - W4000i
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - benq.eu
source_urls:
  - "https://esupportdownload.benq.com/esupport/PROJECTOR%20FOR%20CONSUMER/Control%20Protocols/W4000i/W4000i_RS232%20Control%20Guide_1.0.1_Windows_250409142447.pdf"
  - https://www.benq.eu/en-eu/support/downloads-faq/products/projector/w4000i/manual.html
retrieved_at: 2026-04-29T15:29:17.103Z
last_checked_at: 2026-07-21T21:36:51.351Z
generated_at: 2026-07-21T21:36:51.351Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "command response format not documented beyond error echoes"
  - "no settable continuous variables documented beyond command params above"
  - "response format for query commands not documented (field names, value ranges)"
  - "volume/brightness/contrast/sharpness/color/flesh tone numeric ranges not stated"
  - "power-off cooldown or lamp cooldown procedure not documented"
  - "command timing / inter-command delay not stated"
verification:
  verdict: verified
  checked_at: 2026-07-21T21:36:51.351Z
  matched_actions: 100
  action_count: 100
  confidence: medium
  summary: "All 100 spec actions matched source commands marked Yes; 36 feedbacks represent all source read queries; transport parameters (serial 115200 8N1, TCP port 8000) verified verbatim. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# BenQ W4000i Control Spec

## Summary
BenQ W4000i home cinema projector controllable via RS-232C serial or TCP (port 8000). Supports power, source selection (HDMI 1/2/3, USB Reader), audio, picture modes, picture adjustments, keystone, lamp control, 3D settings, and OSD navigation.

<!-- UNRESOLVED: command response format not documented beyond error echoes -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 8000
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
  - powerable     # power on/off commands
  - routable      # source selection commands
  - queryable     # query commands return state
  - levelable     # volume, brightness, contrast, sharpness, color, keystone
```

## Actions
```yaml
actions:
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

  # Source Selection
  - id: select_hdmi1
    label: Select HDMI 1 (MHL)
    kind: action
    command: "<CR>*sour=hdmi#<CR>"
    params: []

  - id: select_hdmi2
    label: Select HDMI 2 (MHL2)
    kind: action
    command: "<CR>*sour=hdmi2#<CR>"
    params: []

  - id: select_hdmi3
    label: Select HDMI 3 (ATV)
    kind: action
    command: "<CR>*sour=hdmi3#<CR>"
    params: []

  - id: select_usb_reader
    label: Select USB Reader
    kind: action
    command: "<CR>*sour=usbreader#<CR>"
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

  - id: volume_set
    label: Set Volume Level
    kind: action
    command: "<CR>*vol={value}#<CR>"
    params:
      - name: value
        type: integer
        description: Volume level

  # Picture Mode
  - id: picture_mode_bright
    label: Picture Mode Bright
    kind: action
    command: "<CR>*appmod=bright#<CR>"
    params: []

  - id: picture_mode_bright_cinema
    label: Picture Mode Bright Cinema
    kind: action
    command: "<CR>*appmod=brightcine#<CR>"
    params: []

  - id: picture_mode_filmmaker
    label: Picture Mode FILMMAKER MODE
    kind: action
    command: "<CR>*appmod=filmmaker#<CR>"
    params: []

  - id: picture_mode_cinema
    label: Picture Mode Cinema (Rec.709)
    kind: action
    command: "<CR>*appmod=cine#<CR>"
    params: []

  - id: picture_mode_user1
    label: Picture Mode User 1
    kind: action
    command: "<CR>*appmod=user1#<CR>"
    params: []

  - id: picture_mode_isf_day
    label: Picture Mode ISF Day
    kind: action
    command: "<CR>*appmod=isfday#<CR>"
    params: []

  - id: picture_mode_isf_night
    label: Picture Mode ISF Night
    kind: action
    command: "<CR>*appmod=isfnight#<CR>"
    params: []

  - id: picture_mode_3d
    label: Picture Mode 3D
    kind: action
    command: "<CR>*appmod=threed#<CR>"
    params: []

  - id: picture_mode_hdr10
    label: Picture Mode HDR10
    kind: action
    command: "<CR>*appmod=hdr#<CR>"
    params: []

  - id: picture_mode_hlg
    label: Picture Mode HLG
    kind: action
    command: "<CR>*appmod=hlg#<CR>"
    params: []

  # Picture Settings - Contrast
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

  - id: contrast_set
    label: Set Contrast
    kind: action
    command: "<CR>*con={value}#<CR>"
    params:
      - name: value
        type: integer
        description: Contrast value

  # Picture Settings - Brightness
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

  - id: brightness_set
    label: Set Brightness
    kind: action
    command: "<CR>*bri={value}#<CR>"
    params:
      - name: value
        type: integer
        description: Brightness value

  # Picture Settings - Color
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

  - id: color_set
    label: Set Color
    kind: action
    command: "<CR>*color={value}#<CR>"
    params:
      - name: value
        type: integer
        description: Color value

  # Picture Settings - Sharpness
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

  - id: sharpness_set
    label: Set Sharpness
    kind: action
    command: "<CR>*sharp={value}#<CR>"
    params:
      - name: value
        type: integer
        description: Sharpness value

  # Picture Settings - Flesh Tone
  - id: flesh_tone_up
    label: Flesh Tone Up
    kind: action
    command: "<CR>*fleshtone=+#<CR>"
    params: []

  - id: flesh_tone_down
    label: Flesh Tone Down
    kind: action
    command: "<CR>*fleshtone=-#<CR>"
    params: []

  - id: flesh_tone_set
    label: Set Flesh Tone
    kind: action
    command: "<CR>*fleshtone={value}#<CR>"
    params:
      - name: value
        type: integer
        description: Flesh Tone value

  # Color Temperature
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

  # Aspect Ratio
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

  - id: aspect_2_4_1
    label: Aspect 2.4:1
    kind: action
    command: "<CR>*asp=2.4#<CR>"
    params: []

  - id: aspect_auto
    label: Aspect Auto
    kind: action
    command: "<CR>*asp=AUTO#<CR>"
    params: []

  # Keystone
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

  # Picture Reset
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

  # Projector Position
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

  # Quick Auto Search
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

  # Menu Position
  - id: menu_position_center
    label: Menu Position Center
    kind: action
    command: "<CR>*menuposition=center#<CR>"
    params: []

  - id: menu_position_top_left
    label: Menu Position Top-Left
    kind: action
    command: "<CR>*menuposition=tl#<CR>"
    params: []

  - id: menu_position_top_right
    label: Menu Position Top-Right
    kind: action
    command: "<CR>*menuposition=tr#<CR>"
    params: []

  - id: menu_position_bottom_right
    label: Menu Position Bottom-Right
    kind: action
    command: "<CR>*menuposition=br#<CR>"
    params: []

  - id: menu_position_bottom_left
    label: Menu Position Bottom-Left
    kind: action
    command: "<CR>*menuposition=bl#<CR>"
    params: []

  # Direct Power On
  - id: direct_power_on_enable
    label: Direct Power On Enable
    kind: action
    command: "<CR>*directpower=on#<CR>"
    params: []

  - id: direct_power_on_disable
    label: Direct Power On Disable
    kind: action
    command: "<CR>*directpower=off#<CR>"
    params: []

  # Standby Network
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

  # Baud Rate
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

  # Lamp Mode
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

  - id: lamp_mode_smarteco
    label: Lamp Mode SmartEco
    kind: action
    command: "<CR>*lampm=seco#<CR>"
    params: []

  - id: lamp_mode_custom
    label: Lamp Mode Custom
    kind: action
    command: "<CR>*lampm=custom#<CR>"
    params: []

  - id: lamp_custom_level
    label: Set Custom Lamp Light Level
    kind: action
    command: "<CR>*lampcustom={value}#<CR>"
    params:
      - name: value
        type: integer
        description: Custom light level value

  # Blank
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

  # OSD Navigation
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

  - id: nav_back
    label: Navigate Back
    kind: action
    command: "<CR>*back#<CR>"
    params: []

  # Source Menu
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

  # 3D Settings
  - id: set_3d_off
    label: 3D Sync Off
    kind: action
    command: "<CR>*3d=off#<CR>"
    params: []

  - id: set_3d_auto
    label: 3D Auto
    kind: action
    command: "<CR>*3d=auto#<CR>"
    params: []

  - id: set_3d_top_bottom
    label: 3D Sync Top Bottom
    kind: action
    command: "<CR>*3d=tb#<CR>"
    params: []

  - id: set_3d_frame_sequential
    label: 3D Sync Frame Sequential
    kind: action
    command: "<CR>*3d=fs#<CR>"
    params: []

  - id: set_3d_frame_packing
    label: 3D Frame Packing
    kind: action
    command: "<CR>*3d=fp#<CR>"
    params: []

  - id: set_3d_side_by_side
    label: 3D Side by Side
    kind: action
    command: "<CR>*3d=sbs#<CR>"
    params: []

  - id: set_3d_inverter_disable
    label: 3D Inverter Disable
    kind: action
    command: "<CR>*3d=da#<CR>"
    params: []

  - id: set_3d_inverter_enable
    label: 3D Inverter Enable
    kind: action
    command: "<CR>*3d=iv#<CR>"
    params: []

  # AMX Device Discovery
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

  # High Altitude Mode
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
    values: [on, off]
    query: "<CR>*pow=?#<CR>"

  - id: current_source
    label: Current Source
    type: enum
    values: [hdmi, hdmi2, hdmi3, usbreader]
    query: "<CR>*sour=?#<CR>"

  - id: mute_state
    label: Mute Status
    type: enum
    values: [on, off]
    query: "<CR>*mute=?#<CR>"

  - id: volume_level
    label: Volume Status
    type: integer
    query: "<CR>*vol=?#<CR>"

  - id: picture_mode
    label: Picture Mode
    type: enum
    values: [bright, brightcine, filmmaker, cine, user1, isfday, isfnight, threed, hdr, hlg]
    query: "<CR>*appmod=?#<CR>"

  - id: contrast_value
    label: Contrast Value
    type: integer
    query: "<CR>*con=?#<CR>"

  - id: brightness_value
    label: Brightness Value
    type: integer
    query: "<CR>*bri=?#<CR>"

  - id: color_value
    label: Color Value
    type: integer
    query: "<CR>*color=?#<CR>"

  - id: sharpness_value
    label: Sharpness Value
    type: integer
    query: "<CR>*sharp=?#<CR>"

  - id: flesh_tone_value
    label: Flesh Tone Value
    type: integer
    query: "<CR>*fleshtone=?#<CR>"

  - id: color_temperature
    label: Color Temperature Status
    type: enum
    values: [warm, normal, cool, native]
    query: "<CR>*ct=?#<CR>"

  - id: aspect_ratio
    label: Aspect Ratio Status
    type: enum
    values: ["4:3", "16:9", "2.4", AUTO]
    query: "<CR>*asp=?#<CR>"

  - id: vkeystone_value
    label: Vertical Keystone Value
    type: integer
    query: "<CR>*vkeystone=?#<CR>"

  - id: hkeystone_value
    label: Horizontal Keystone Value
    type: integer
    query: "<CR>*hkeystone=?#<CR>"

  - id: projector_position
    label: Projector Position Status
    type: enum
    values: [FT, RE, RC, FC]
    query: "<CR>*pp=?#<CR>"

  - id: quick_auto_search
    label: Quick Auto Search Status
    type: enum
    values: [on, off]
    query: "<CR>*QAS=?#<CR>"

  - id: menu_position
    label: Menu Position Status
    type: enum
    values: [center, tl, tr, br, bl]
    query: "<CR>*menuposition=?#<CR>"

  - id: direct_power_on
    label: Direct Power On Status
    type: enum
    values: [on, off]
    query: "<CR>*directpower=?#<CR>"

  - id: standby_network
    label: Standby Network Status
    type: enum
    values: [on, off]
    query: "<CR>*standbynet=?#<CR>"

  - id: baud_rate
    label: Current Baud Rate
    type: enum
    values: ["9600", "14400", "19200", "38400", "57600", "115200"]
    query: "<CR>*baud=?#<CR>"

  - id: lamp_hours
    label: Lamp Hours
    type: integer
    query: "<CR>*ltim=?#<CR>"

  - id: lamp_mode
    label: Lamp Mode Status
    type: enum
    values: [lnor, eco, seco, custom]
    query: "<CR>*lampm=?#<CR>"

  - id: lamp_custom_level
    label: Custom Lamp Light Level
    type: integer
    query: "<CR>*lampcustom=?#<CR>"

  - id: model_name
    label: Model Name
    type: string
    query: "<CR>*modelname=?#<CR>"

  - id: system_fw_version
    label: System Firmware Version
    type: string
    query: "<CR>*sysfwversion=?#<CR>"

  - id: scaler_fw_version
    label: Scaler Firmware Version
    type: string
    query: "<CR>*scalerfwversion=?#<CR>"

  - id: format_fw_version
    label: Format Firmware Version
    type: string
    query: "<CR>*formatfwversion=?#<CR>"

  - id: lan_fw_version
    label: LAN Firmware Version
    type: string
    query: "<CR>*lanfwversion=?#<CR>"

  - id: mcu_fw_version
    label: MCU Firmware Version
    type: string
    query: "<CR>*mcufwversion=?#<CR>"

  - id: blank_state
    label: Blank Status
    type: enum
    values: [on, off]
    query: "<CR>*blank=?#<CR>"

  - id: menu_state
    label: Menu Status
    type: enum
    values: [on, off]
    query: "<CR>*menu=?#<CR>"

  - id: source_menu_state
    label: Source Menu Status
    type: enum
    values: [on, off]
    query: "<CR>*sourmenu=?#<CR>"

  - id: sync_3d_state
    label: 3D Sync Status
    type: enum
    values: [off, auto, tb, fs, fp, sbs, da, iv]
    query: "<CR>*3d=?#<CR>"

  - id: amx_discovery_state
    label: AMX Device Discovery Status
    type: enum
    values: [on, off]
    query: "<CR>*amxdd=?#<CR>"

  - id: mac_address
    label: MAC Address
    type: string
    query: "<CR>*macaddr=?#<CR>"

  - id: high_altitude_state
    label: High Altitude Mode Status
    type: enum
    values: [on, off]
    query: "<CR>*Highaltitude=?#<CR>"
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables documented beyond command params above
```

## Events
```yaml
# Source does not document unsolicited notifications from the projector.
```

## Macros
```yaml
# No multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes: commands work if standby power is 0.5W or supported baud rate is set.
# Incorrect command format echoes "Illegal format"; invalid-for-model echoes "Unsupported item".
# Condition-blocked commands echo "Block item".
```

## Notes
- Command format: `<CR>*<parameter>=<value>#<CR>`. Uppercase, lowercase, and mixed case accepted.
- Over TCP (LAN), `<CR>` delimiters optional — projector accepts commands with or without them.
- Error responses: `Illegal format`, `Unsupported item`, `Block item`.
- Only commands marked "Yes" in source Support column are included. Many additional commands exist for other BenQ models.
- RS232 via HDBaseT uses same serial settings as direct RS-232.
<!-- UNRESOLVED: response format for query commands not documented (field names, value ranges) -->
<!-- UNRESOLVED: volume/brightness/contrast/sharpness/color/flesh tone numeric ranges not stated -->
<!-- UNRESOLVED: power-off cooldown or lamp cooldown procedure not documented -->
<!-- UNRESOLVED: command timing / inter-command delay not stated -->
````

Spec already complete. 100 "Yes" actions present, 36 read queries in Feedbacks, transport covers serial+tcp. Nothing to add — all source-supported commands accounted for.

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - benq.eu
source_urls:
  - "https://esupportdownload.benq.com/esupport/PROJECTOR%20FOR%20CONSUMER/Control%20Protocols/W4000i/W4000i_RS232%20Control%20Guide_1.0.1_Windows_250409142447.pdf"
  - https://www.benq.eu/en-eu/support/downloads-faq/products/projector/w4000i/manual.html
retrieved_at: 2026-04-29T15:29:17.103Z
last_checked_at: 2026-07-21T21:36:51.351Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T21:36:51.351Z
matched_actions: 100
action_count: 100
confidence: medium
summary: "All 100 spec actions matched source commands marked Yes; 36 feedbacks represent all source read queries; transport parameters (serial 115200 8N1, TCP port 8000) verified verbatim. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "command response format not documented beyond error echoes"
- "no settable continuous variables documented beyond command params above"
- "response format for query commands not documented (field names, value ranges)"
- "volume/brightness/contrast/sharpness/color/flesh tone numeric ranges not stated"
- "power-off cooldown or lamp cooldown procedure not documented"
- "command timing / inter-command delay not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
