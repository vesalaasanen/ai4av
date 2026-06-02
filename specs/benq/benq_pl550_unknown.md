---
spec_id: admin/benq-pl550
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ PL550 Control Spec"
manufacturer: BenQ
model_family: PL550
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - PL550
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - audiogeneral.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - "https://esupportdownload.benq.com/esupport/PUBLIC%20DISPLAY%20PRODUCT/Control%20Protocols/PL4901/RS232&LAN%20Command%20List_v20200331_Others.pdf"
  - https://esupportdownload.benq.com/esupport/PDP/UserManual/PDP_um_User_Manual_20150624_081512_BenQ_PL550_EN.pdf
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
retrieved_at: 2026-05-14T20:25:52.600Z
last_checked_at: 2026-05-20T07:45:26.160Z
generated_at: 2026-05-20T07:45:26.160Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - micvol
  - standbynet
  - standbymic
  - ltim2
  - "HDBaseT transport details not fully specified in source"
  - "baud rate selectable at runtime; not fixed"
  - "no unsolicited notification messages described in source"
  - "no multi-step macro sequences described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "Lamp2Hour support=\"No\" in source — dual-lamp status not available on this model"
  - "Mic. volume commands all have Support=\"No\" — microphone audio not supported"
  - "Network standby, microphone standby, broadcast, AMX discovery, projection login code commands all have Support=\"No\""
  - "HDBaseT transport specifics beyond serial settings not detailed in source"
  - "voltage/current/power specifications not stated in source"
verification:
  verdict: verified
  checked_at: 2026-05-20T07:45:26.160Z
  matched_actions: 86
  action_count: 86
  confidence: medium
  summary: "All 86 spec actions match source commands verbatim; transport verified; unsupported features explicitly marked as No in source. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# BenQ PL550 Control Spec

## Summary
BenQ PL550 projector supports RS-232 serial, TCP/IP via LAN (port 8000), and HDBaseT control. Commands are ASCII-formatted with `<CR>` delimiters. No authentication required.

<!-- UNRESOLVED: HDBaseT transport details not fully specified in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 8000  # stated: RS232 via LAN TCP port
serial:
  baud_rate: null  # UNRESOLVED: baud rate selectable at runtime; not fixed
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # pow=on/off commands present
- routable        # source selection commands present
- queryable       # multiple ? queries returning state
- levelable       # volume, brightness, contrast, sharpness, color, zoom
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: power_status
  label: Power Status
  kind: query
  params: []
- id: select_source
  label: Select Source
  kind: action
  params:
    - name: source
      type: string
      description: One of RGB, RGB2, RGB3, ypbr, ypbr2, dviA, dvid, hdmi, hdmi2, vid, svid, network, usbdisplay, usbreader, wireless, hdbaset, dp
- id: current_source
  label: Current Source
  kind: query
  params: []
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: mute_status
  label: Mute Status
  kind: query
  params: []
- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "+" or "-"
- id: volume_status
  label: Volume Status
  kind: query
  params: []
- id: audio_pass_through_off
  label: Audio Pass Through Off
  kind: action
  params: []
- id: audio_select
  label: Audio Source Select
  kind: action
  params:
    - name: source
      type: string
      description: One of RGB, RGB2, ypbr, vid, hdmi, hdmi2, off
- id: audio_pass_status
  label: Audio Pass Status
  kind: query
  params: []
- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: One of preset, srgb, bright, livingroom, game, cine, std, football, dicom, user1, user2, user3, isfday, isfnight, threed
- id: picture_mode_status
  label: Picture Mode Status
  kind: query
  params: []
- id: contrast_adjust
  label: Contrast Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "+" or "-"
- id: contrast_status
  label: Contrast Status
  kind: query
  params: []
- id: brightness_adjust
  label: Brightness Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "+" or "-"
- id: brightness_status
  label: Brightness Status
  kind: query
  params: []
- id: color_adjust
  label: Color Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "+" or "-"
- id: color_status
  label: Color Status
  kind: query
  params: []
- id: sharpness_adjust
  label: Sharpness Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "+" or "-"
- id: sharpness_status
  label: Sharpness Status
  kind: query
  params: []
- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: value
      type: string
      description: One of warmer, warm, normal, cool, cooler, native
- id: color_temperature_status
  label: Color Temperature Status
  kind: query
  params: []
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: string
      description: One of 4:3, 16:6, 16:9, 16:10, AUTO, REAL, LBOX, WIDE, ANAM
- id: aspect_status
  label: Aspect Status
  kind: query
  params: []
- id: zoom_in
  label: Digital Zoom In
  kind: action
  params: []
- id: zoom_out
  label: Digital Zoom Out
  kind: action
  params: []
- id: auto_setup
  label: Auto Setup
  kind: action
  params: []
- id: brilliant_color
  label: Brilliant Color
  kind: action
  params:
    - name: state
      type: string
      description: "on" or "off"
- id: brilliant_color_status
  label: Brilliant Color Status
  kind: query
  params: []
- id: projector_position
  label: Projector Position
  kind: action
  params:
    - name: position
      type: string
      description: One of FT (Front Table), RE (Rear Table), RC (Rear Ceiling), FC (Front Ceiling)
- id: projector_position_status
  label: Projector Position Status
  kind: query
  params: []
- id: quick_auto_search
  label: Quick Auto Search
  kind: action
  params:
    - name: state
      type: string
      description: "on" or "off"
- id: quick_auto_search_status
  label: Quick Auto Search Status
  kind: query
  params: []
- id: direct_power_on
  label: Direct Power On
  kind: action
  params:
    - name: state
      type: string
      description: "on" or "off"
- id: direct_power_on_status
  label: Direct Power On Status
  kind: query
  params: []
- id: signal_power_on
  label: Signal Power On
  kind: action
  params:
    - name: state
      type: string
      description: "on" or "off"
- id: signal_power_on_status
  label: Signal Power On Status
  kind: query
  params: []
- id: standby_monitor_out
  label: Standby Monitor Out
  kind: action
  params:
    - name: state
      type: string
      description: "on" or "off"
- id: standby_monitor_out_status
  label: Standby Monitor Out Status
  kind: query
  params: []
- id: baud_rate
  label: Baud Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: 2400, 4800, 9600, 14400, 19200, 38400, 57600, or 115200
- id: baud_rate_status
  label: Baud Rate Status
  kind: query
  params: []
- id: lamp_hours
  label: Lamp Hours
  kind: query
  params: []
- id: lamp_mode
  label: Lamp Mode
  kind: action
  params:
    - name: mode
      type: string
      description: One of lnor (Normal), eco, seco (Smart Eco ImageCare), seco2, seco3, dimming, custom, dualbr, dualre, single, singleeco
- id: lamp_mode_status
  label: Lamp Mode Status
  kind: query
  params: []
- id: model_name
  label: Model Name
  kind: query
  params: []
- id: blank_screen
  label: Blank Screen
  kind: action
  params:
    - name: state
      type: string
      description: "on" or "off"
- id: blank_status
  label: Blank Status
  kind: query
  params: []
- id: freeze
  label: Freeze
  kind: action
  params:
    - name: state
      type: string
      description: "on" or "off"
- id: freeze_status
  label: Freeze Status
  kind: query
  params: []
- id: menu_toggle
  label: Menu Toggle
  kind: action
  params:
    - name: state
      type: string
      description: "on" or "off"
- id: menu_up
  label: Menu Up
  kind: action
  params: []
- id: menu_down
  label: Menu Down
  kind: action
  params: []
- id: menu_right
  label: Menu Right
  kind: action
  params: []
- id: menu_left
  label: Menu Left
  kind: action
  params: []
- id: menu_enter
  label: Menu Enter
  kind: action
  params: []
- id: sync_3d_off
  label: 3D Sync Off
  kind: action
  params: []
- id: sync_3d_auto
  label: 3D Auto
  kind: action
  params: []
- id: sync_3d_topbottom
  label: 3D Sync Top Bottom
  kind: action
  params: []
- id: sync_3d_framesequential
  label: 3D Sync Frame Sequential
  kind: action
  params: []
- id: sync_3d_framepacking
  label: 3D Frame Packing
  kind: action
  params: []
- id: sync_3d_sidebyside
  label: 3D Side by Side
  kind: action
  params: []
- id: sync_3d_inverter_disable
  label: 3D Inverter Disable
  kind: action
  params: []
- id: sync_3d_inverter
  label: 3D Inverter
  kind: action
  params: []
- id: sync_3d_status
  label: 3D Sync Status
  kind: query
  params: []
- id: instant_on
  label: Instant On
  kind: action
  params:
    - name: state
      type: string
      description: "on" or "off"
- id: instant_on_status
  label: Instant On Status
  kind: query
  params: []
- id: high_altitude_mode
  label: High Altitude Mode
  kind: action
  params:
    - name: state
      type: string
      description: "on" or "off"
- id: high_altitude_mode_status
  label: High Altitude Mode Status
  kind: query
  params: []
- id: remote_receiver_front_rear
  label: Remote Receiver Front+Rear
  kind: action
  params: []

- id: remote_receiver_front
  label: Remote Receiver Front
  kind: action
  params: []

- id: remote_receiver_rear
  label: Remote Receiver Rear
  kind: action
  params: []

- id: remote_receiver_top
  label: Remote Receiver Top
  kind: action
  params: []

- id: remote_receiver_top_front
  label: Remote Receiver Top+Front
  kind: action
  params: []

- id: remote_receiver_top_rear
  label: Remote Receiver Top+Rear
  kind: action
  params: []

- id: remote_receiver_status
  label: Remote Receiver Status
  kind: query
  params: []

- id: lamp_saver_on
  label: Lamp Saver Mode On
  kind: action
  params: []

- id: lamp_saver_off
  label: Lamp Saver Mode Off
  kind: action
  params: []

- id: lamp_saver_status
  label: Lamp Saver Mode Status
  kind: query
  params: []

- id: projection_login_code_on
  label: Projection Login Code On
  kind: action
  params: []

- id: projection_login_code_off
  label: Projection Login Code Off
  kind: action
  params: []

- id: projection_login_code_status
  label: Projection Login Code Status
  kind: query
  params: []

- id: broadcasting_on
  label: Broadcasting On
  kind: action
  params: []

- id: broadcasting_off
  label: Broadcasting Off
  kind: action
  params: []

- id: broadcasting_status
  label: Broadcasting Status
  kind: query
  params: []

- id: amx_device_discovery_on
  label: AMX Device Discovery On
  kind: action
  params: []

- id: amx_device_discovery_off
  label: AMX Device Discovery Off
  kind: action
  params: []

- id: amx_device_discovery_status
  label: AMX Device Discovery Status
  kind: query
  params: []

- id: mac_address
  label: MAC Address
  kind: query
  params: []

- id: sync_3d_2d_to_3d
  label: 3D 2D to 3D
  kind: action
  params: []

- id: sync_3d_nvidia
  label: 3D nVIDIA
  kind: action
  params: []
```

## Feedbacks
```yaml
# All query commands (ending with ? or explicitly Read type) return observable state.
# Supported enum values derived from command table entries where applicable.
- id: power_state
  type: enum
  values: [on, off]
- id: source_state
  type: string
  description: Current active source identifier
- id: mute_state
  type: enum
  values: [on, off]
- id: volume_state
  type: integer
  description: Current volume level
- id: audio_pass_state
  type: string
  description: Current audio pass through source
- id: picture_mode_state
  type: string
  description: Current picture mode
- id: contrast_state
  type: integer
  description: Current contrast value
- id: brightness_state
  type: integer
  description: Current brightness value
- id: color_state
  type: integer
  description: Current color value
- id: sharpness_state
  type: integer
  description: Current sharpness value
- id: color_temperature_state
  type: string
  description: Current color temperature
- id: aspect_ratio_state
  type: string
  description: Current aspect ratio
- id: brilliant_color_state
  type: enum
  values: [on, off]
- id: projector_position_state
  type: string
  description: Current projector position
- id: quick_auto_search_state
  type: enum
  values: [on, off]
- id: direct_power_on_state
  type: enum
  values: [on, off]
- id: signal_power_on_state
  type: enum
  values: [on, off]
- id: standby_monitor_out_state
  type: enum
  values: [on, off]
- id: baud_rate_state
  type: integer
  description: Current baud rate setting
- id: lamp_hours_state
  type: integer
  description: Lamp operating hours
- id: lamp_mode_state
  type: string
  description: Current lamp mode
- id: blank_state
  type: enum
  values: [on, off]
- id: freeze_state
  type: enum
  values: [on, off]
- id: sync_3d_state
  type: string
  description: Current 3D sync setting
- id: instant_on_state
  type: enum
  values: [on, off]
- id: high_altitude_mode_state
  type: enum
  values: [on, off]
```

## Variables
```yaml
# No standalone settable parameters beyond discrete actions - all are Actions entries.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification messages described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements found in source.
```

## Notes
Command format: `<CR>*key=value#<CR>` for serial; `<CR>` optional for LAN. Illegal format returns `Illegal format`, unsupported model returns `Unsupported item`, blocked by condition returns `Block item`. Commands work in standby if power is 0.5W or supported baud rate is set. Uppercase/lowercase/mixed accepted.

<!-- UNRESOLVED: Lamp2Hour support="No" in source — dual-lamp status not available on this model -->
<!-- UNRESOLVED: Mic. volume commands all have Support="No" — microphone audio not supported -->
<!-- UNRESOLVED: Network standby, microphone standby, broadcast, AMX discovery, projection login code commands all have Support="No" -->
<!-- UNRESOLVED: HDBaseT transport specifics beyond serial settings not detailed in source -->
<!-- UNRESOLVED: voltage/current/power specifications not stated in source -->

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - audiogeneral.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - "https://esupportdownload.benq.com/esupport/PUBLIC%20DISPLAY%20PRODUCT/Control%20Protocols/PL4901/RS232&LAN%20Command%20List_v20200331_Others.pdf"
  - https://esupportdownload.benq.com/esupport/PDP/UserManual/PDP_um_User_Manual_20150624_081512_BenQ_PL550_EN.pdf
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
retrieved_at: 2026-05-14T20:25:52.600Z
last_checked_at: 2026-05-20T07:45:26.160Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T07:45:26.160Z
matched_actions: 86
action_count: 86
confidence: medium
summary: "All 86 spec actions match source commands verbatim; transport verified; unsupported features explicitly marked as No in source. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- micvol
- standbynet
- standbymic
- ltim2
- "HDBaseT transport details not fully specified in source"
- "baud rate selectable at runtime; not fixed"
- "no unsolicited notification messages described in source"
- "no multi-step macro sequences described in source"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "Lamp2Hour support=\"No\" in source — dual-lamp status not available on this model"
- "Mic. volume commands all have Support=\"No\" — microphone audio not supported"
- "Network standby, microphone standby, broadcast, AMX discovery, projection login code commands all have Support=\"No\""
- "HDBaseT transport specifics beyond serial settings not detailed in source"
- "voltage/current/power specifications not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
