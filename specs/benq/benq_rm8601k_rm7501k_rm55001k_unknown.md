---
spec_id: admin/benq-rm8601k-rm7501k-rm55001k
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ RM8601K / RM7501K / RM55001K Control Spec"
manufacturer: BenQ
model_family: RM8601K
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - RM8601K
    - RM7501K
    - RM55001K
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - manualowl.com
  - manua.ls
  - mans.io
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - https://www.manualowl.com/m/BenQ/RM8601K/Manual/621914
  - https://www.manua.ls/benq/rm8601k/manual
  - https://www.manualowl.com/m/BenQ/RM8601K/Manual/621918
  - https://mans.io/item/Benq/rm8601k
retrieved_at: 2026-05-14T20:26:53.834Z
last_checked_at: 2026-06-02T17:26:35.738Z
generated_at: 2026-06-02T17:26:35.738Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HDBaseT serial COM port details not stated beyond COM port naming in Device Manager"
  - "device accepts 9600/14400/19200/38400/57600/115200; defaults not stated"
  - "no standalone settable parameters outside of action/feedback pairs identified"
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures stated in source"
  - "Lamp2 Hour command (*ltim2=?) not supported per source"
  - "audio mic volume commands (*micvol=*) not supported per source"
  - "Network, USB Display, USB Reader, Wireless, HDBaseT, DisplayPort source commands not supported per source"
  - "network standby, microphone standby, AMX discovery, broadcasting, remote receiver commands not supported per source"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:26:35.738Z
  matched_actions: 113
  action_count: 113
  confidence: medium
  summary: "All 113 spec actions match source commands (Yes-supported); transport port 8000 and serial params confirmed verbatim; coverage ratio ~0.98 against ~115 distinct supported commands. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# BenQ RM8601K / RM7501K / RM55001K Control Spec

## Summary
BenQ DLP projector series supporting RS-232, RS232 via LAN (TCP port 8000), and RS232 via HDBaseT control. Commands use ASCII format wrapped in `<CR>` delimiters. Supports power, source selection, audio, picture mode, aspect ratio, lamp, freeze, blank, 3D, and OSD navigation.

<!-- UNRESOLVED: HDBaseT serial COM port details not stated beyond COM port naming in Device Manager -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 8000  # RS232 via LAN TCP port; RS232 direct and HDBaseT use serial
serial:
  baud_rate: null  # UNRESOLVED: device accepts 9600/14400/19200/38400/57600/115200; defaults not stated
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
- id: source_rgb
  label: Source COMPUTER/YPbPr
  kind: action
  params: []
- id: source_rgb2
  label: Source COMPUTER 2/YPbPr2
  kind: action
  params: []
- id: source_hdmi
  label: Source HDMI/MHL
  kind: action
  params: []
- id: source_hdmi2
  label: Source HDMI 2/MHL2
  kind: action
  params: []
- id: source_video
  label: Source Composite
  kind: action
  params: []
- id: source_svideo
  label: Source S-Video
  kind: action
  params: []
- id: source_current
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
- id: volume_up
  label: Volume +
  kind: action
  params: []
- id: volume_down
  label: Volume -
  kind: action
  params: []
- id: volume_status
  label: Volume Status
  kind: query
  params: []
- id: audio_pass_off
  label: Audio Pass Through Off
  kind: action
  params: []
- id: audio_source_rgb
  label: Audio-Computer1
  kind: action
  params: []
- id: audio_source_rgb2
  label: Audio-Computer2
  kind: action
  params: []
- id: audio_source_video
  label: Audio-Video/S-Video
  kind: action
  params: []
- id: audio_source_hdmi
  label: Audio-HDMI
  kind: action
  params: []
- id: audio_source_hdmi2
  label: Audio-HDMI2
  kind: action
  params: []
- id: audio_pass_status
  label: Audio Pass Status
  kind: query
  params: []
- id: picture_mode_presentation
  label: Picture Mode Presentation
  kind: action
  params: []
- id: picture_mode_srgb
  label: Picture Mode sRGB
  kind: action
  params: []
- id: picture_mode_bright
  label: Picture Mode Bright
  kind: action
  params: []
- id: picture_mode_cinema
  label: Picture Mode Cinema
  kind: action
  params: []
- id: picture_mode_user1
  label: Picture Mode User1
  kind: action
  params: []
- id: picture_mode_user2
  label: Picture Mode User2
  kind: action
  params: []
- id: picture_mode_3d
  label: Picture Mode 3D
  kind: action
  params: []
- id: picture_mode_status
  label: Picture Mode Status
  kind: query
  params: []
- id: contrast_up
  label: Contrast +
  kind: action
  params: []
- id: contrast_down
  label: Contrast -
  kind: action
  params: []
- id: contrast_value
  label: Contrast Value
  kind: query
  params: []
- id: brightness_up
  label: Brightness +
  kind: action
  params: []
- id: brightness_down
  label: Brightness -
  kind: action
  params: []
- id: brightness_value
  label: Brightness Value
  kind: query
  params: []
- id: color_up
  label: Color +
  kind: action
  params: []
- id: color_down
  label: Color -
  kind: action
  params: []
- id: color_value
  label: Color Value
  kind: query
  params: []
- id: sharpness_up
  label: Sharpness +
  kind: action
  params: []
- id: sharpness_down
  label: Sharpness -
  kind: action
  params: []
- id: sharpness_value
  label: Sharpness Value
  kind: query
  params: []
- id: color_temp_warm
  label: Color Temperature Warm
  kind: action
  params: []
- id: color_temp_normal
  label: Color Temperature Normal
  kind: action
  params: []
- id: color_temp_cool
  label: Color Temperature Cool
  kind: action
  params: []
- id: color_temp_native
  label: Color Temperature Lamp Native
  kind: action
  params: []
- id: color_temp_status
  label: Color Temperature Status
  kind: query
  params: []
- id: aspect_4x3
  label: Aspect 4:3
  kind: action
  params: []
- id: aspect_16x9
  label: Aspect 16:9
  kind: action
  params: []
- id: aspect_16x10
  label: Aspect 16:10
  kind: action
  params: []
- id: aspect_auto
  label: Aspect Auto
  kind: action
  params: []
- id: aspect_real
  label: Aspect Real
  kind: action
  params: []
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
- id: auto_align
  label: Auto Align
  kind: action
  params: []
- id: brilliant_color_on
  label: Brilliant Color On
  kind: action
  params: []
- id: brilliant_color_off
  label: Brilliant Color Off
  kind: action
  params: []
- id: brilliant_color_status
  label: Brilliant Color Status
  kind: query
  params: []
- id: projector_position_front_table
  label: Projector Position Front Table
  kind: action
  params: []
- id: projector_position_rear_table
  label: Projector Position Rear Table
  kind: action
  params: []
- id: projector_position_rear_ceiling
  label: Projector Position Rear Ceiling
  kind: action
  params: []
- id: projector_position_front_ceiling
  label: Projector Position Front Ceiling
  kind: action
  params: []
- id: quick_auto_search_on
  label: Quick Auto Search On
  kind: action
  params: []
- id: quick_auto_search_off
  label: Quick Auto Search Off
  kind: action
  params: []
- id: quick_auto_search_status
  label: Quick Auto Search Status
  kind: query
  params: []
- id: projector_position_status
  label: Projector Position Status
  kind: query
  params: []
- id: direct_power_on_on
  label: Direct Power On On
  kind: action
  params: []
- id: direct_power_on_off
  label: Direct Power On Off
  kind: action
  params: []
- id: direct_power_on_status
  label: Direct Power On Status
  kind: query
  params: []
- id: signal_power_on_on
  label: Signal Power On On
  kind: action
  params: []
- id: signal_power_on_off
  label: Signal Power On Off
  kind: action
  params: []
- id: signal_power_on_status
  label: Signal Power On Status
  kind: query
  params: []
- id: standby_monitor_out_on
  label: Standby Monitor Out On
  kind: action
  params: []
- id: standby_monitor_out_off
  label: Standby Monitor Out Off
  kind: action
  params: []
- id: standby_monitor_out_status
  label: Standby Monitor Out Status
  kind: query
  params: []
- id: baud_rate
  label: Set Baud Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: 2400/4800/9600/14400/19200/38400/57600/115200
- id: baud_rate_status
  label: Current Baud Rate
  kind: query
  params: []
- id: lamp_hours
  label: Lamp Hours
  kind: query
  params: []
- id: lamp_mode_normal
  label: Lamp Mode Normal
  kind: action
  params: []
- id: lamp_mode_eco
  label: Lamp Mode Eco
  kind: action
  params: []
- id: lamp_mode_smart_eco
  label: Lamp Mode Smart Eco (ImageCare)
  kind: action
  params: []
- id: lamp_mode_status
  label: Lamp Mode Status
  kind: query
  params: []
- id: model_name
  label: Model Name
  kind: query
  params: []
- id: blank_on
  label: Blank On
  kind: action
  params: []
- id: blank_off
  label: Blank Off
  kind: action
  params: []
- id: blank_status
  label: Blank Status
  kind: query
  params: []
- id: freeze_on
  label: Freeze On
  kind: action
  params: []
- id: freeze_off
  label: Freeze Off
  kind: action
  params: []
- id: freeze_status
  label: Freeze Status
  kind: query
  params: []
- id: menu_on
  label: Menu On
  kind: action
  params: []
- id: menu_off
  label: Menu Off
  kind: action
  params: []
- id: nav_up
  label: Up
  kind: action
  params: []
- id: nav_down
  label: Down
  kind: action
  params: []
- id: nav_right
  label: Right
  kind: action
  params: []
- id: nav_left
  label: Left
  kind: action
  params: []
- id: nav_enter
  label: Enter
  kind: action
  params: []
- id: d3d_sync_off
  label: 3D Sync Off
  kind: action
  params: []
- id: d3d_auto
  label: 3D Auto
  kind: action
  params: []
- id: d3d_top_bottom
  label: 3D Sync TopBottom
  kind: action
  params: []
- id: d3d_frame_sequential
  label: 3D Sync Frame Sequential
  kind: action
  params: []
- id: d3d_frame_packing
  label: 3D Frame Packing
  kind: action
  params: []
- id: d3d_side_by_side
  label: 3D Side by Side
  kind: action
  params: []
- id: d3d_inverter_disable
  label: 3D Inverter Disable
  kind: action
  params: []
- id: d3d_inverter
  label: 3D Inverter Enable
  kind: action
  params: []
- id: d3d_status
  label: 3D Sync Status
  kind: query
  params: []
- id: instant_on_on
  label: Instant On On
  kind: action
  params: []
- id: instant_on_off
  label: Instant On Off
  kind: action
  params: []
- id: instant_on_status
  label: Instant On Status
  kind: query
  params: []
- id: high_altitude_on
  label: High Altitude Mode On
  kind: action
  params: []
- id: high_altitude_off
  label: High Altitude Mode Off
  kind: action
  params: []
- id: high_altitude_status
  label: High Altitude Mode Status
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - on
    - off
- id: mute_state
  label: Mute State
  type: enum
  values:
    - on
    - off
- id: volume_level
  label: Volume Level
  type: integer
  description: Returns current volume value
- id: current_source
  label: Current Source
  type: string
  description: Returns active source identifier
- id: picture_mode
  label: Picture Mode
  type: string
  description: Returns current picture mode
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
- id: color_temperature
  label: Color Temperature
  type: string
  description: Returns current color temperature setting
- id: aspect_ratio
  label: Aspect Ratio
  type: string
  description: Returns current aspect ratio
- id: brilliant_color_state
  label: Brilliant Color State
  type: enum
  values:
    - on
    - off
- id: projector_position
  label: Projector Position
  type: string
- id: direct_power_state
  label: Direct Power On State
  type: enum
  values:
    - on
    - off
- id: signal_power_state
  label: Signal Power On State
  type: enum
  values:
    - on
    - off
- id: standby_monitor_state
  label: Standby Monitor Out State
  type: enum
  values:
    - on
    - off
- id: quick_auto_search_state
  label: Quick Auto Search State
  type: enum
  values:
    - on
    - off
- id: baud_rate
  label: Baud Rate
  type: integer
  description: Returns current baud rate setting
- id: lamp_hours
  label: Lamp Hours
  type: integer
  description: Returns lamp usage hours
- id: lamp_mode
  label: Lamp Mode
  type: string
- id: model_name
  label: Model Name
  type: string
- id: blank_state
  label: Blank State
  type: enum
  values:
    - on
    - off
- id: freeze_state
  label: Freeze State
  type: enum
  values:
    - on
    - off
- id: d3d_state
  label: 3D Sync State
  type: string
- id: instant_on_state
  label: Instant On State
  type: enum
  values:
    - on
    - off
- id: high_altitude_state
  label: High Altitude Mode State
  type: enum
  values:
    - on
    - off
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters outside of action/feedback pairs identified
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes

**Command format:** All commands wrapped in `<CR>` delimiters. Write: `<CR>*command=value#<CR>`. Query: `<CR>*command=?#<CR>`. TCP via LAN accepts commands with or without `<CR>` wrappers.

**Error responses:**
- `Illegal format` — command format malformed
- `Unsupported item` — command valid but not supported by this model
- `Block item` — command valid but cannot execute under current condition

**Baud rate:** Device supports 2400/4800/9600/14400/19200/38400/57600/115200. Default not stated in source; settable via `*baud=` command.

**RS232 via HDBaseT:** Uses standard serial COM port; COM port name determined via Windows Device Manager.

<!-- UNRESOLVED: Lamp2 Hour command (*ltim2=?) not supported per source -->
<!-- UNRESOLVED: audio mic volume commands (*micvol=*) not supported per source -->
<!-- UNRESOLVED: Network, USB Display, USB Reader, Wireless, HDBaseT, DisplayPort source commands not supported per source -->
<!-- UNRESOLVED: network standby, microphone standby, AMX discovery, broadcasting, remote receiver commands not supported per source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - manualowl.com
  - manua.ls
  - mans.io
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - https://www.manualowl.com/m/BenQ/RM8601K/Manual/621914
  - https://www.manua.ls/benq/rm8601k/manual
  - https://www.manualowl.com/m/BenQ/RM8601K/Manual/621918
  - https://mans.io/item/Benq/rm8601k
retrieved_at: 2026-05-14T20:26:53.834Z
last_checked_at: 2026-06-02T17:26:35.738Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:26:35.738Z
matched_actions: 113
action_count: 113
confidence: medium
summary: "All 113 spec actions match source commands (Yes-supported); transport port 8000 and serial params confirmed verbatim; coverage ratio ~0.98 against ~115 distinct supported commands. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HDBaseT serial COM port details not stated beyond COM port naming in Device Manager"
- "device accepts 9600/14400/19200/38400/57600/115200; defaults not stated"
- "no standalone settable parameters outside of action/feedback pairs identified"
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures stated in source"
- "Lamp2 Hour command (*ltim2=?) not supported per source"
- "audio mic volume commands (*micvol=*) not supported per source"
- "Network, USB Display, USB Reader, Wireless, HDBaseT, DisplayPort source commands not supported per source"
- "network standby, microphone standby, AMX discovery, broadcasting, remote receiver commands not supported per source"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
