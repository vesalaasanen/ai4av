---
spec_id: admin/benq-e_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ E-Series Control Spec"
manufacturer: BenQ
model_family: E-Series
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - E-Series
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - benqimage.blob.core.windows.net
  - benq.eu
source_urls:
  - "https://esupportdownload.benq.com/esupport/PROJECTOR/Control%20Protocols/LK935/LK935_RS232%20Control%20Guide_0_Windows.pdf"
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - https://www.benq.eu/content/dam/bb/en/product/projector/professional-installation/pu9730/quick-start-guide/pu9730-rs232-control-guide-0-windows7-windows8-winxp.pdf
  - "https://esupportdownload.benq.com/esupport/PROJECTOR%20FOR%20CONSUMER/Control%20Protocols/W4000i/W4000i_RS232%20Control%20Guide_1.0.1_Windows_250409142447.pdf"
retrieved_at: 2026-04-29T15:29:17.103Z
last_checked_at: 2026-04-30T09:32:20.929Z
generated_at: 2026-04-30T09:32:20.929Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:32:20.929Z
  matched_actions: 173
  action_count: 173
  confidence: high
  summary: "All 173 spec actions matched with source commands; all transport parameters verified; semantic-id convention correctly applied throughout."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# BenQ E-Series Control Spec

## Summary
BenQ E-Series projector family. RS-232C control protocol. ASCII command format: `*key=value#<CR>`. Echo of sent text returned (except query commands). Supports power, source routing, audio, picture, and operational settings. Query commands return status. No authentication required.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # default; configurable: 2400/4800/9600/14400/19200/38400/57600/115200
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
- id: source_ypbr
  label: Source Component
  kind: action
  params: []
- id: source_ypbr2
  label: Source Component2
  kind: action
  params: []
- id: source_dviA
  label: Source DVI-A
  kind: action
  params: []
- id: source_dvid
  label: Source DVI-D
  kind: action
  params: []
- id: source_hdmi
  label: Source HDMI
  kind: action
  params: []
- id: source_hdmi2
  label: Source HDMI 2
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
- id: source_network
  label: Source Network
  kind: action
  params: []
- id: source_usbdisplay
  label: Source USB Display
  kind: action
  params: []
- id: source_usbreader
  label: Source USB Reader
  kind: action
  params: []
- id: source_status
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
- id: micvol_up
  label: Mic Volume +
  kind: action
  params: []
- id: micvol_down
  label: Mic Volume -
  kind: action
  params: []
- id: micvol_status
  label: Mic Volume Status
  kind: query
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
- id: audiosour_ypbr
  label: Audio-Component
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
- id: audiosour_status
  label: Audio Pass Status
  kind: query
  params: []
- id: appmod_dynamic
  label: Picture Mode Dynamic
  kind: action
  params: []
- id: appmod_preset
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
  label: Picture Mode LivingRoom
  kind: action
  params: []
- id: appmod_game
  label: Picture Mode Game
  kind: action
  params: []
- id: appmod_cine
  label: Picture Mode Cinema
  kind: action
  params: []
- id: appmod_std
  label: Picture Mode Standard
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
- id: appmod_threed
  label: Picture Mode 3D
  kind: action
  params: []
- id: appmod_status
  label: Picture Mode
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
- id: contrast_status
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
- id: brightness_status
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
- id: color_status
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
- id: sharpness_status
  label: Sharpness Value
  kind: query
  params: []
- id: ct_warmer
  label: Color Temperature Warmer
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
- id: ct_cooler
  label: Color Temperature Cooler
  kind: action
  params: []
- id: ct_native
  label: Color Temperature Lamp Native
  kind: action
  params: []
- id: ct_status
  label: Color Temperature Status
  kind: query
  params: []
- id: asp_4x3
  label: Aspect 4:3
  kind: action
  params: []
- id: asp_16x9
  label: Aspect 16:9
  kind: action
  params: []
- id: asp_16x10
  label: Aspect 16:10
  kind: action
  params: []
- id: asp_auto
  label: Aspect Auto
  kind: action
  params: []
- id: asp_real
  label: Aspect Real
  kind: action
  params: []
- id: asp_lbox
  label: Aspect Letterbox
  kind: action
  params: []
- id: asp_wide
  label: Aspect Wide
  kind: action
  params: []
- id: asp_anam
  label: Aspect Anamorphic
  kind: action
  params: []
- id: asp_status
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
- id: auto
  label: Auto Adjust
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
- id: bc_status
  label: Brilliant Color Status
  kind: query
  params: []
- id: pp_ft
  label: Projector Position Front Table
  kind: action
  params: []
- id: pp_re
  label: Projector Position Rear Table
  kind: action
  params: []
- id: pp_rc
  label: Projector Position Rear Ceiling
  kind: action
  params: []
- id: pp_fc
  label: Projector Position Front Ceiling
  kind: action
  params: []
- id: pp_status
  label: Projector Position Status
  kind: query
  params: []
- id: qas_on
  label: Quick Auto Search On
  kind: action
  params: []
- id: qas_off
  label: Quick Auto Search Off
  kind: action
  params: []
- id: qas_status
  label: Quick Auto Search Status
  kind: query
  params: []
- id: directpower_on
  label: Direct Power On On
  kind: action
  params: []
- id: directpower_off
  label: Direct Power On Off
  kind: action
  params: []
- id: directpower_status
  label: Direct Power On Status
  kind: query
  params: []
- id: autopower_on
  label: Signal Power On On
  kind: action
  params: []
- id: autopower_off
  label: Signal Power On Off
  kind: action
  params: []
- id: autopower_status
  label: Signal Power On Status
  kind: query
  params: []
- id: standbynet_on
  label: Standby Network On
  kind: action
  params: []
- id: standbynet_off
  label: Standby Network Off
  kind: action
  params: []
- id: standbynet_status
  label: Standby Network Status
  kind: query
  params: []
- id: standbymic_on
  label: Standby Microphone On
  kind: action
  params: []
- id: standbymic_off
  label: Standby Microphone Off
  kind: action
  params: []
- id: standbymic_status
  label: Standby Microphone Status
  kind: query
  params: []
- id: standbymnt_on
  label: Standby Monitor Out On
  kind: action
  params: []
- id: standbymnt_off
  label: Standby Monitor Out Off
  kind: action
  params: []
- id: standbymnt_status
  label: Standby Monitor Out Status
  kind: query
  params: []
- id: baud_2400
  label: Baud Rate 2400
  kind: action
  params: []
- id: baud_4800
  label: Baud Rate 4800
  kind: action
  params: []
- id: baud_9600
  label: Baud Rate 9600
  kind: action
  params: []
- id: baud_14400
  label: Baud Rate 14400
  kind: action
  params: []
- id: baud_19200
  label: Baud Rate 19200
  kind: action
  params: []
- id: baud_38400
  label: Baud Rate 38400
  kind: action
  params: []
- id: baud_57600
  label: Baud Rate 57600
  kind: action
  params: []
- id: baud_115200
  label: Baud Rate 115200
  kind: action
  params: []
- id: baud_status
  label: Current Baud Rate
  kind: query
  params: []
- id: ltim_status
  label: Lamp Hour
  kind: query
  params: []
- id: ltim2_status
  label: Lamp2 Hour
  kind: query
  params: []
- id: lampm_lnor
  label: Lamp Mode Normal
  kind: action
  params: []
- id: lampm_eco
  label: Lamp Mode Eco
  kind: action
  params: []
- id: lampm_seco
  label: Lamp Mode Smart Eco
  kind: action
  params: []
- id: lampm_dualbr
  label: Lamp Mode Dual Brightest
  kind: action
  params: []
- id: lampm_dualre
  label: Lamp Mode Dual Reliable
  kind: action
  params: []
- id: lampm_single
  label: Lamp Mode Single Alternative
  kind: action
  params: []
- id: lampm_singleeco
  label: Lamp Mode Single Alternative Eco
  kind: action
  params: []
- id: lampm_status
  label: Lamp Mode Status
  kind: query
  params: []
- id: modelname_status
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
- id: threed_off
  label: 3D Sync Off
  kind: action
  params: []
- id: threed_auto
  label: 3D Sync Auto
  kind: action
  params: []
- id: threed_tb
  label: 3D Sync Top/Bottom
  kind: action
  params: []
- id: threed_fs
  label: 3D Sync Frame Sequential
  kind: action
  params: []
- id: threed_fp
  label: 3D Frame Packing
  kind: action
  params: []
- id: threed_sbs
  label: 3D Side by Side
  kind: action
  params: []
- id: threed_da
  label: 3D Inverter Disable
  kind: action
  params: []
- id: threed_iv
  label: 3D Inverter
  kind: action
  params: []
- id: threed_2d3d
  label: 2D to 3D
  kind: action
  params: []
- id: threed_nvidia
  label: 3D nVIDIA
  kind: action
  params: []
- id: threed_status
  label: 3D Sync Status
  kind: query
  params: []
- id: rr_fr
  label: Remote Receiver Front+Rear
  kind: action
  params: []
- id: rr_f
  label: Remote Receiver Front
  kind: action
  params: []
- id: rr_r
  label: Remote Receiver Rear
  kind: action
  params: []
- id: rr_status
  label: Remote Receiver Status
  kind: query
  params: []
- id: ins_on
  label: Instant On On
  kind: action
  params: []
- id: ins_off
  label: Instant On Off
  kind: action
  params: []
- id: ins_status
  label: Instant On Status
  kind: query
  params: []
- id: lpsaver_on
  label: LampSaver Mode On
  kind: action
  params: []
- id: lpsaver_off
  label: LampSaver Mode Off
  kind: action
  params: []
- id: lpsaver_status
  label: LampSaver Mode Status
  kind: query
  params: []
- id: prjlogincode_on
  label: Projection Log In Code On
  kind: action
  params: []
- id: prjlogincode_off
  label: Projection Log In Code Off
  kind: action
  params: []
- id: prjlogincode_status
  label: Projection Log In Code Status
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
- id: amxdd_on
  label: AMX Device Discovery On
  kind: action
  params: []
- id: amxdd_off
  label: AMX Device Discovery Off
  kind: action
  params: []
- id: amxdd_status
  label: AMX Device Discovery Status
  kind: query
  params: []
- id: macaddr_status
  label: MAC Address
  kind: query
  params: []
- id: highaltitude_on
  label: High Altitude Mode On
  kind: action
  params: []
- id: highaltitude_off
  label: High Altitude Mode Off
  kind: action
  params: []
- id: highaltitude_status
  label: High Altitude Mode Status
  kind: query
  params: []
```

## Feedbacks
```yaml
# Source doc defines echo strings per command:
# Echo of command echoed back (uppercased): e.g. > *pow=on# → *POW=ON#
# If illegal format: "Illegal format"
# If unsupported item: "Unsupported item"
# If blocked: "Block item"
# Query responses return uppercase value: e.g. *pow=?# → ON / OFF
# 5-second timeout echo when idle: 0D 0A 00
# Ready-to-receive echo: 3E 00 after <CR>
- id: command_echo
  type: string
- id: illegal_format
  type: string
- id: unsupported_item
  type: string
- id: block_item
  type: string
- id: ready_prompt
  type: string
- id: idle_timeout
  type: string
```

## Variables
```yaml
# All settable via *key=value# commands already listed in Actions.
# Query-only values:
- id: power_state
  type: enum
  values: [on, off]
- id: source_current
  type: string
- id: mute_state
  type: enum
  values: [on, off]
- id: volume_level
  type: integer
- id: micvol_level
  type: integer
- id: audiosour_current
  type: string
- id: appmod_current
  type: string
- id: contrast_level
  type: integer
- id: brightness_level
  type: integer
- id: color_level
  type: integer
- id: sharpness_level
  type: integer
- id: ct_current
  type: string
- id: asp_current
  type: string
- id: bc_state
  type: enum
  values: [on, off]
- id: pp_current
  type: string
- id: qas_state
  type: enum
  values: [on, off]
- id: directpower_state
  type: enum
  values: [on, off]
- id: autopower_state
  type: enum
  values: [on, off]
- id: standbynet_state
  type: enum
  values: [on, off]
- id: standbymic_state
  type: enum
  values: [on, off]
- id: standbymnt_state
  type: enum
  values: [on, off]
- id: baud_current
  type: integer
- id: lamp1_hours
  type: integer
- id: lamp2_hours
  type: integer
- id: lampm_current
  type: string
- id: modelname_value
  type: string
- id: blank_state
  type: enum
  values: [on, off]
- id: freeze_state
  type: enum
  values: [on, off]
- id: threed_current
  type: string
- id: rr_current
  type: string
- id: ins_state
  type: enum
  values: [on, off]
- id: lpsaver_state
  type: enum
  values: [on, off]
- id: prjlogincode_state
  type: enum
  values: [on, off]
- id: broadcasting_state
  type: enum
  values: [on, off]
- id: amxdd_state
  type: enum
  values: [on, off]
- id: macaddr_value
  type: string
- id: highaltitude_state
  type: enum
  values: [on, off]
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - source doc notes commands for items 5/6 (Unsupported item / Block item) are not supported in power saving mode (standby power < 1W)
  - source doc notes all status commands and power on command should be action when low power mode (<0.5W)
```

## Notes
Command format: `*key=value#<CR>` — `<CR>` is ASCII 13. Commands are case-insensitive (both upper and lower case accepted). Each input character is echoed back. Query commands use `*key=?#` format. Responses are uppercase.

Timeout behavior: projector echoes `0D,0A,00` after 5 seconds of no command. After sending `<CR>` alone, projector echoes `3E,00` indicating ready for command.

Error responses: "Illegal format" (bad syntax), "Unsupported item" (valid command but not for this model), "Block item" (cannot execute in current condition).

Note from source: functions vary by model — source, audio settings, aspect ratio and other features differ across E-Series models.
<!-- UNRESOLVED: specific E-Series model numbers (e.g. E585, E560) not stated in source; only "E-Series" generic -->
<!-- UNRESOLVED: dual-lamp commands (dualbr/dualre/single/singleeco) may require dual-lamp hardware -->
<!-- UNRESOLVED: LAN over RS232 function mentioned but not documented in command table -->

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - benqimage.blob.core.windows.net
  - benq.eu
source_urls:
  - "https://esupportdownload.benq.com/esupport/PROJECTOR/Control%20Protocols/LK935/LK935_RS232%20Control%20Guide_0_Windows.pdf"
  - "https://benqimage.blob.core.windows.net/driver-us-file/RS232-commands_all%20Product%20Lines.pdf"
  - https://www.benq.eu/content/dam/bb/en/product/projector/professional-installation/pu9730/quick-start-guide/pu9730-rs232-control-guide-0-windows7-windows8-winxp.pdf
  - "https://esupportdownload.benq.com/esupport/PROJECTOR%20FOR%20CONSUMER/Control%20Protocols/W4000i/W4000i_RS232%20Control%20Guide_1.0.1_Windows_250409142447.pdf"
retrieved_at: 2026-04-29T15:29:17.103Z
last_checked_at: 2026-04-30T09:32:20.929Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:32:20.929Z
matched_actions: 173
action_count: 173
confidence: high
summary: "All 173 spec actions matched with source commands; all transport parameters verified; semantic-id convention correctly applied throughout."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
