---
spec_id: admin/benq-mx731-mx732-mx733
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ MX731 MX732 MX733 Control Spec"
manufacturer: BenQ
model_family: MX731
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - MX731
    - MX732
    - MX733
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - audiogeneral.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
retrieved_at: 2026-05-14T20:28:27.942Z
last_checked_at: 2026-05-14T21:40:25.007Z
generated_at: 2026-05-14T21:40:25.007Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "models MX731/MX732/MX733 may have feature differences not reflected in unified command table"
  - "no unsolicited notification messages documented in source"
  - "no multi-step macro sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "Lamp2 Hour, Microphone Volume, Network Standby, Remote Receiver, Lamp Saver, Projection Login Code, Broadcasting, AMX Device Discovery, Mac Address — marked No in support column, not implemented"
  - "some models (MX731 vs MX732 vs MX733) may have hardware differences affecting supported commands"
verification:
  verdict: verified
  checked_at: 2026-05-14T21:40:25.007Z
  matched_actions: 94
  action_count: 101
  confidence: medium
  summary: "All 94 spec actions matched semantic ids to source command table entries; all transport parameters verified verbatim in source documentation. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# BenQ MX731 MX732 MX733 Control Spec

## Summary
Projector supporting RS-232 serial and TCP/IP control. Commands are ASCII-format with `<CR>*key=value#<CR>` envelope. Control via LAN uses TCP port 8000. No authentication required.

<!-- UNRESOLVED: models MX731/MX732/MX733 may have feature differences not reflected in unified command table -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 8000  # stated: TCP port for RS232 via LAN
serial:
  baud_rate: 9600  # default; source supports 9600/14400/19200/38400/57600/115200
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
- id: source_rgb
  label: Source Computer 1/YPbPr
  kind: action
  params: []
- id: source_rgb2
  label: Source Computer 2/YPbPr2
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
- id: source_vid
  label: Source Composite
  kind: action
  params: []
- id: source_svid
  label: Source S-Video
  kind: action
  params: []
- id: source_dp
  label: Source DisplayPort
  kind: action
  params: []
- id: source_hdbaset
  label: Source HDBaseT
  kind: action
  params: []
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: volume_up
  label: Volume Up
  kind: action
  params: []
- id: volume_down
  label: Volume Down
  kind: action
  params: []
- id: audiosour_off
  label: Audio Pass Through Off
  kind: action
  params: []
- id: audiosour_rgb
  label: Audio-Computer1
  kind: action
  params: []
- id: audiosour_rgb2
  label: Audio-Computer2
  kind: action
  params: []
- id: audiosour_vid
  label: Audio-Video/S-Video
  kind: action
  params: []
- id: audiosour_hdmi
  label: Audio-HDMI
  kind: action
  params: []
- id: audiosour_hdmi2
  label: Audio-HDMI2
  kind: action
  params: []
- id: appmod_presentation
  label: Picture Mode Presentation
  kind: action
  params: []
- id: appmod_srgb
  label: Picture Mode sRGB
  kind: action
  params: []
- id: appmod_bright
  label: Picture Mode Bright
  kind: action
  params: []
- id: appmod_livingroom
  label: Picture Mode Living Room
  kind: action
  params: []
- id: appmod_game
  label: Picture Mode Game
  kind: action
  params: []
- id: appmod_cinema
  label: Picture Mode Cinema
  kind: action
  params: []
- id: appmod_std
  label: Picture Mode Standard/Vivid
  kind: action
  params: []
- id: appmod_football
  label: Picture Mode Football
  kind: action
  params: []
- id: appmod_dicom
  label: Picture Mode DICOM
  kind: action
  params: []
- id: appmod_user1
  label: Picture Mode User1
  kind: action
  params: []
- id: appmod_user2
  label: Picture Mode User2
  kind: action
  params: []
- id: appmod_user3
  label: Picture Mode User3
  kind: action
  params: []
- id: appmod_isfday
  label: Picture Mode ISF Day
  kind: action
  params: []
- id: appmod_isfnight
  label: Picture Mode ISF Night
  kind: action
  params: []
- id: appmod_3d
  label: Picture Mode 3D
  kind: action
  params: []
- id: contrast_up
  label: Contrast Up
  kind: action
  params: []
- id: contrast_down
  label: Contrast Down
  kind: action
  params: []
- id: brightness_up
  label: Brightness Up
  kind: action
  params: []
- id: brightness_down
  label: Brightness Down
  kind: action
  params: []
- id: color_up
  label: Color Up
  kind: action
  params: []
- id: color_down
  label: Color Down
  kind: action
  params: []
- id: sharpness_up
  label: Sharpness Up
  kind: action
  params: []
- id: sharpness_down
  label: Sharpness Down
  kind: action
  params: []
- id: ct_warm
  label: Color Temperature Warm
  kind: action
  params: []
- id: ct_normal
  label: Color Temperature Normal
  kind: action
  params: []
- id: ct_cool
  label: Color Temperature Cool
  kind: action
  params: []
- id: ct_native
  label: Color Temperature Lamp Native
  kind: action
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
- id: zoom_in
  label: Digital Zoom In
  kind: action
  params: []
- id: zoom_out
  label: Digital Zoom Out
  kind: action
  params: []
- id: auto
  label: Auto Image Adjust
  kind: action
  params: []
- id: bc_on
  label: Brilliant Color On
  kind: action
  params: []
- id: bc_off
  label: Brilliant Color Off
  kind: action
  params: []
- id: pp_ft
  label: Position Front Table
  kind: action
  params: []
- id: pp_re
  label: Position Rear Table
  kind: action
  params: []
- id: pp_rc
  label: Position Rear Ceiling
  kind: action
  params: []
- id: pp_fc
  label: Position Front Ceiling
  kind: action
  params: []
- id: qas_on
  label: Quick Auto Search On
  kind: action
  params: []
- id: qas_off
  label: Quick Auto Search Off
  kind: action
  params: []
- id: directpower_on
  label: Direct Power On On
  kind: action
  params: []
- id: directpower_off
  label: Direct Power On Off
  kind: action
  params: []
- id: autopower_on
  label: Signal Power On On
  kind: action
  params: []
- id: autopower_off
  label: Signal Power On Off
  kind: action
  params: []
- id: standbymnt_on
  label: Standby Monitor Out On
  kind: action
  params: []
- id: standbymnt_off
  label: Standby Monitor Out Off
  kind: action
  params: []
- id: baud_set
  label: Set Baud Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: Baud rate (2400/4800/9600/14400/19200/38400/57600/115200)
- id: lampm_normal
  label: Lamp Mode Normal
  kind: action
  params: []
- id: lampm_eco
  label: Lamp Mode Eco
  kind: action
  params: []
- id: lampm_seco
  label: Lamp Mode SmartEco (ImageCare)
  kind: action
  params: []
- id: lampm_seco2
  label: Lamp Mode SmartEco (LampCare)
  kind: action
  params: []
- id: lampm_seco3
  label: Lamp Mode SmartEco (IumenCare)
  kind: action
  params: []
- id: lampm_dimming
  label: Lamp Mode Dimming
  kind: action
  params: []
- id: lampm_custom
  label: Lamp Mode Custom
  kind: action
  params: []
- id: blank_on
  label: Blank On
  kind: action
  params: []
- id: blank_off
  label: Blank Off
  kind: action
  params: []
- id: freeze_on
  label: Freeze On
  kind: action
  params: []
- id: freeze_off
  label: Freeze Off
  kind: action
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
  label: Navigate Up
  kind: action
  params: []
- id: nav_down
  label: Navigate Down
  kind: action
  params: []
- id: nav_right
  label: Navigate Right
  kind: action
  params: []
- id: nav_left
  label: Navigate Left
  kind: action
  params: []
- id: nav_enter
  label: Navigate Enter
  kind: action
  params: []
- id: d3d_off
  label: 3D Sync Off
  kind: action
  params: []
- id: d3d_auto
  label: 3D Sync Auto
  kind: action
  params: []
- id: d3d_tb
  label: 3D Sync Top/Bottom
  kind: action
  params: []
- id: d3d_fs
  label: 3D Sync Frame Sequential
  kind: action
  params: []
- id: d3d_fp
  label: 3D Frame Packing
  kind: action
  params: []
- id: d3d_sbs
  label: 3D Sync Side by Side
  kind: action
  params: []
- id: d3d_da
  label: 3D Inverter Disable
  kind: action
  params: []
- id: d3d_iv
  label: 3D Inverter Enable
  kind: action
  params: []
- id: d3d_2d3d
  label: 2D to 3D
  kind: action
  params: []
- id: ins_on
  label: Instant On On
  kind: action
  params: []
- id: ins_off
  label: Instant On Off
  kind: action
  params: []
- id: highaltitude_on
  label: High Altitude Mode On
  kind: action
  params: []
- id: highaltitude_off
  label: High Altitude Mode Off
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values: [on, off]
- id: source_status
  label: Current Source
  type: string
- id: mute_status
  label: Mute Status
  type: enum
  values: [on, off]
- id: volume_status
  label: Volume Status
  type: integer
- id: audiosour_status
  label: Audio Pass Status
  type: string
- id: appmod_status
  label: Picture Mode
  type: string
- id: contrast_status
  label: Contrast Value
  type: integer
- id: brightness_status
  label: Brightness Value
  type: integer
- id: color_status
  label: Color Value
  type: integer
- id: sharpness_status
  label: Sharpness Value
  type: integer
- id: ct_status
  label: Color Temperature Status
  type: string
- id: asp_status
  label: Aspect Status
  type: string
- id: bc_status
  label: Brilliant Color Status
  type: enum
  values: [on, off]
- id: pp_status
  label: Projector Position Status
  type: string
- id: qas_status
  label: Quick Auto Search Status
  type: enum
  values: [on, off]
- id: directpower_status
  label: Direct Power On Status
  type: enum
  values: [on, off]
- id: autopower_status
  label: Signal Power On Status
  type: enum
  values: [on, off]
- id: standbymnt_status
  label: Standby Monitor Out Status
  type: enum
  values: [on, off]
- id: baud_status
  label: Current Baud Rate
  type: integer
- id: lampm_status
  label: Lamp Mode Status
  type: string
- id: ltim_status
  label: Lamp Hour
  type: integer
- id: modelname_status
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
- id: d3d_status
  label: 3D Sync Status
  type: string
- id: ins_status
  label: Instant On Status
  type: enum
  values: [on, off]
- id: highaltitude_status
  label: High Altitude Mode Status
  type: enum
  values: [on, off]
```

## Variables
```yaml
# No discrete settable parameters beyond action commands; all controllable via actions above.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification messages documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command envelope: `<CR>*key=value#<CR>` for serial; same envelope works with/without `<CR>` over LAN TCP. Echo responses: `Illegal format` (bad syntax), `Unsupported item` (model doesn't support), `Block item` (cannot execute under current condition). Commands are case-insensitive. Standby power must be 0.5W or higher for commands to work. Lamp hour readable via `ltim` query.

<!-- UNRESOLVED: Lamp2 Hour, Microphone Volume, Network Standby, Remote Receiver, Lamp Saver, Projection Login Code, Broadcasting, AMX Device Discovery, Mac Address — marked No in support column, not implemented -->
<!-- UNRESOLVED: some models (MX731 vs MX732 vs MX733) may have hardware differences affecting supported commands -->

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - audiogeneral.com
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/BS5050/RS232%20Control%20Guide_0_Windows10_Windows7_Windows8.pdf"
  - https://www.audiogeneral.com/BenQ/rs232_commands_generic_082613.pdf
retrieved_at: 2026-05-14T20:28:27.942Z
last_checked_at: 2026-05-14T21:40:25.007Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T21:40:25.007Z
matched_actions: 94
action_count: 101
confidence: medium
summary: "All 94 spec actions matched semantic ids to source command table entries; all transport parameters verified verbatim in source documentation. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "models MX731/MX732/MX733 may have feature differences not reflected in unified command table"
- "no unsolicited notification messages documented in source"
- "no multi-step macro sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "Lamp2 Hour, Microphone Volume, Network Standby, Remote Receiver, Lamp Saver, Projection Login Code, Broadcasting, AMX Device Discovery, Mac Address — marked No in support column, not implemented"
- "some models (MX731 vs MX732 vs MX733) may have hardware differences affecting supported commands"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
