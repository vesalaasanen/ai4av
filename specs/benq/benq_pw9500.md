---
spec_id: admin/benq-pw9500
schema_version: ai4av-public-spec-v1
revision: 1
title: "BenQ PW9500 Control Spec"
manufacturer: BenQ
model_family: PW9500
aliases: []
compatible_with:
  manufacturers:
    - BenQ
  models:
    - PW9500
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - esupportdownload.benq.com
  - benq.eu
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/PW9500/RS232%20Control%20Guide_0_Windows7_Windows8_WinXP.pdf"
  - https://www.benq.eu/en-cee/support/downloads-faq/products/projector/pw9500/manual.html
retrieved_at: 2026-10-07T10:33:56.222Z
last_checked_at: 2026-10-07T10:33:56.222Z
generated_at: 2026-10-07T10:33:56.222Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "audio commands (volume, mic volume, audio source) listed as NO support — unclear if functional on this model or upstream support missing"
  - "configurable 9600/14400/19200/38400/57600/115200 bps — no default stated"
  - "commands with NO support flag omitted from Actions above"
  - "no unsolicited event notifications described in source"
  - "no multi-step macro sequences described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "audio control commands (volume, mic volume, audio source) all marked NO support in source"
  - "3D frame packing, 2D to 3D, NVIDIA modes marked NO support"
  - "filter timer, firmware version, tint, keystone set-value not documented"
  - "security/login code, AMX discovery, broadcasting not supported"
verification:
  verdict: verified
  checked_at: 2026-10-07T10:33:56.222Z
  matched_actions: 115
  action_count: 115
  confidence: medium
  summary: "All 115 action units match supported source commands with correct shapes; transport values are supported; the spec covers the supported catalogue (115 of 115). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# BenQ PW9500 Control Spec

## Summary
BenQ PW9500 DLP projector supporting RS-232 control via direct serial, LAN (TCP port 8000), and HDBaseT interfaces. The command examples use ASCII strings with `<CR>` delimiters; for LAN control, the source says commands work with or without those delimiters. Commands and behaviors are identical through serial. Supports power control, source routing, picture adjustment, lamp management, and OSD navigation.

<!-- UNRESOLVED: audio commands (volume, mic volume, audio source) listed as NO support — unclear if functional on this model or upstream support missing -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 8000  # TCP port for LAN control; serial uses direct RS-232
serial:
  baud_rate: null  # UNRESOLVED: configurable 9600/14400/19200/38400/57600/115200 bps — no default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
# Supported traits inferred from command table:
# - powerable       (pow=on/off/? commands present)
# - routable        (source selection commands present)
# - queryable       (status read commands present)
# - levelable       (contrast, brightness, color, sharpness, volume, zoom, focus, keystone, lens shift)
```

## Actions
```yaml
# Power
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: power_status_read
  label: Power Status Read
  kind: feedback
  params: []

# Source Selection
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
- id: source_dvid
  label: Source DVI-D
  kind: action
  params: []
- id: source_hdmi
  label: Source HDMI
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
- id: source_hdbaset
  label: Source HDBaseT
  kind: action
  params: []
- id: source_read
  label: Current Source Read
  kind: feedback
  params: []

# Picture Mode
- id: appmod_preset
  label: Picture Mode Presentation
  kind: action
  params: []
- id: appmod_bright
  label: Picture Mode Bright
  kind: action
  params: []
- id: appmod_cine
  label: Picture Mode Cinema
  kind: action
  params: []
- id: appmod_read
  label: Picture Mode Read
  kind: feedback
  params: []

# Picture Settings
- id: contrast_up
  label: Contrast +
  kind: action
  params: []
- id: contrast_down
  label: Contrast -
  kind: action
  params: []
- id: contrast_read
  label: Contrast Value Read
  kind: feedback
  params: []
- id: brightness_up
  label: Brightness +
  kind: action
  params: []
- id: brightness_down
  label: Brightness -
  kind: action
  params: []
- id: brightness_read
  label: Brightness Value Read
  kind: feedback
  params: []
- id: color_up
  label: Color +
  kind: action
  params: []
- id: color_down
  label: Color -
  kind: action
  params: []
- id: color_read
  label: Color Value Read
  kind: feedback
  params: []
- id: sharpness_up
  label: Sharpness +
  kind: action
  params: []
- id: sharpness_down
  label: Sharpness -
  kind: action
  params: []
- id: sharpness_read
  label: Sharpness Value Read
  kind: feedback
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
- id: ct_read
  label: Color Temperature Status Read
  kind: feedback
  params: []
- id: asp_4_3
  label: Aspect 4:3
  kind: action
  params: []
- id: asp_16_9
  label: Aspect 16:9
  kind: action
  params: []
- id: asp_16_10
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
- id: asp_5_4
  label: Aspect 5:4
  kind: action
  params: []
- id: asp_1_88
  label: Aspect 1.88:1
  kind: action
  params: []
- id: asp_2_35
  label: Aspect 2.35:1
  kind: action
  params: []
- id: asp_read
  label: Aspect Status Read
  kind: feedback
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
- id: pp_read
  label: Projector Position Status Read
  kind: feedback
  params: []

# Settings
- id: qas_on
  label: Quick Auto Search On
  kind: action
  params: []
- id: qas_off
  label: Quick Auto Search Off
  kind: action
  params: []
- id: qas_read
  label: Quick Auto Search Status Read
  kind: feedback
  params: []
- id: directpower_on
  label: Direct Power On On
  kind: action
  params: []
- id: directpower_off
  label: Direct Power On Off
  kind: action
  params: []
- id: directpower_read
  label: Direct Power On Status Read
  kind: feedback
  params: []
- id: standbynet_standard
  label: Standby Settings Standard
  kind: action
  params: []
- id: standbynet_eco
  label: Standby Settings Eco
  kind: action
  params: []
- id: standbynet_network
  label: Standby Settings Network
  kind: action
  params: []
- id: standbynet_read
  label: Standby Settings Network Status Read
  kind: feedback
  params: []
- id: baud_set
  label: Baud Rate Set
  kind: action
  params:
    - name: baud
      type: integer
      description: Baud rate (9600/14400/19200/38400/57600/115200)
- id: baud_read
  label: Current Baud Rate Read
  kind: feedback
  params: []

# Lamp Control
- id: ltim_reset
  label: Lamp Hour Reset
  kind: action
  params: []
- id: ltim2_reset
  label: Lamp2 Hour Reset
  kind: action
  params: []
- id: lampm_lnor
  label: Lamp Mode Normal
  kind: action
  params: []
- id: lampm_eco
  label: Lamp Mode Eco
  kind: action
  params: []
- id: lammd_dual
  label: Dual Lamp
  kind: action
  params: []
- id: lammd_num1l
  label: Number 1 Lamp
  kind: action
  params: []
- id: lammd_num2
  label: Number 2 Lamp
  kind: action
  params: []
- id: lammd_single
  label: Single Lamp Minimum
  kind: action
  params: []
- id: lammd_read
  label: Current Lamp Status Read
  kind: feedback
  params: []
- id: lampm_read
  label: Lamp Mode Status Read
  kind: feedback
  params: []
- id: ltim_read
  label: Lamp Hour Read
  kind: feedback
  params: []
- id: ltim2_read
  label: Lamp2 Hour Read
  kind: feedback
  params: []

# Blank / Freeze / Menu
- id: blank_on
  label: Blank On
  kind: action
  params: []
- id: blank_off
  label: Blank Off
  kind: action
  params: []
- id: blank_read
  label: Blank Status Read
  kind: feedback
  params: []
- id: freeze_on
  label: Freeze On
  kind: action
  params: []
- id: freeze_off
  label: Freeze Off
  kind: action
  params: []
- id: freeze_read
  label: Freeze Status Read
  kind: feedback
  params: []
- id: menu_on
  label: Menu On
  kind: action
  params: []
- id: menu_off
  label: Menu Off
  kind: action
  params: []
- id: menu_read
  label: Menu Status Read
  kind: feedback
  params: []

# OSD Navigation
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

# 3D Control
- id: d3_off
  label: 3D Sync Off
  kind: action
  params: []
- id: d3_auto
  label: 3D Auto
  kind: action
  params: []
- id: d3_tb
  label: 3D Sync Top Bottom
  kind: action
  params: []
- id: d3_fs
  label: 3D Sync Frame Sequential
  kind: action
  params: []
- id: d3_sbs
  label: 3D Sync Side by Side
  kind: action
  params: []
- id: d3_da
  label: 3D Inverter Disable
  kind: action
  params: []
- id: d3_iv
  label: 3D Inverter Enable
  kind: action
  params: []
- id: d3_read
  label: 3D Sync Status Read
  kind: feedback
  params: []

# Miscellaneous
- id: trigger_on
  label: Trigger On
  kind: action
  params: []
- id: trigger_off
  label: Trigger Off
  kind: action
  params: []
- id: trigger_read
  label: Trigger Status Read
  kind: feedback
  params: []
- id: highaltitude_on
  label: High Altitude Mode On
  kind: action
  params: []
- id: highaltitude_off
  label: High Altitude Mode Off
  kind: action
  params: []
- id: highaltitude_read
  label: High Altitude Mode Status Read
  kind: feedback
  params: []
- id: error_report
  label: Error Code Read
  kind: feedback
  params: []
- id: lst_up
  label: Lens Shift Up
  kind: action
  params: []
- id: lst_down
  label: Lens Shift Down
  kind: action
  params: []
- id: lst_left
  label: Lens Shift Left
  kind: action
  params: []
- id: lst_right
  label: Lens Shift Right
  kind: action
  params: []
- id: focus_plus
  label: Focus Plus
  kind: action
  params: []
- id: focus_minus
  label: Focus Minus
  kind: action
  params: []
- id: zoom_plus
  label: Zoom Plus
  kind: action
  params: []
- id: zoom_minus
  label: Zoom Minus
  kind: action
  params: []
- id: keyst_decrease
  label: Keystone Vertical Decrease
  kind: action
  params: []
- id: keyst_increase
  label: Keystone Vertical Increase
  kind: action
  params: []
- id: keyst_read
  label: Keystone Vertical Status Read
  kind: feedback
  params: []
- id: modelname_read
  label: Model Name Read
  kind: feedback
  params: []

# UNRESOLVED: commands with NO support flag omitted from Actions above
# (mute, volume, mic volume, audio source, audio pass through, many 3D modes,
#  instant on, lamp saver, AMX discovery, broadcasting, remote receiver, etc.)
```

## Feedbacks
```yaml
# Feedback entries are co-located with their parent actions above.
# Key status queries:
- id: power_state
  label: Power State
  kind: feedback
  params: []
- id: source_state
  label: Source State
  kind: feedback
  params: []
- id: blank_state
  label: Blank State
  kind: feedback
  params: []
- id: freeze_state
  label: Freeze State
  kind: feedback
  params: []
- id: menu_state
  label: Menu State
  kind: feedback
  params: []
- id: error_state
  label: Error Code
  kind: feedback
  params: []
```

## Variables
```yaml
# Settable parameters with + / - increment style commands (co-located with actions above).
# Contrast, Brightness, Color, Sharpness, Focus, Zoom, Keystone, Lens Shift each use
# paired increment/decrement actions rather than discrete set-value variables.
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
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements described in source
```

## Notes
- Commands are ASCII strings. For LAN control, the source says commands work whether or not they start and end with `<CR>`; commands and behaviors are identical through serial.
- Error responses: `Illegal format` (malformed command), `Unsupported item` (invalid for model), `Block item` (cannot execute under current condition).
- Baud rate is configurable via command (`*baud=XXXX#`) and readable (`*baud=?#`); defaults must be checked on OSD menu.
- Lamp hour counters and lamp mode are queryable.
- High altitude mode toggle available.
- Lens shift and focus/zoom adjustments available.
<!-- UNRESOLVED: audio control commands (volume, mic volume, audio source) all marked NO support in source -->
<!-- UNRESOLVED: 3D frame packing, 2D to 3D, NVIDIA modes marked NO support -->
<!-- UNRESOLVED: filter timer, firmware version, tint, keystone set-value not documented -->
<!-- UNRESOLVED: security/login code, AMX discovery, broadcasting not supported -->

## Provenance

```yaml
source_domains:
  - esupportdownload.benq.com
  - benq.eu
source_urls:
  - "https://esupportdownload.benq.com/esupport/Projector/Control%20Protocols/PW9500/RS232%20Control%20Guide_0_Windows7_Windows8_WinXP.pdf"
  - https://www.benq.eu/en-cee/support/downloads-faq/products/projector/pw9500/manual.html
retrieved_at: 2026-10-07T10:33:56.222Z
last_checked_at: 2026-10-07T10:33:56.222Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T10:33:56.222Z
matched_actions: 115
action_count: 115
confidence: medium
summary: "All 115 action units match supported source commands with correct shapes; transport values are supported; the spec covers the supported catalogue (115 of 115). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "audio commands (volume, mic volume, audio source) listed as NO support — unclear if functional on this model or upstream support missing"
- "configurable 9600/14400/19200/38400/57600/115200 bps — no default stated"
- "commands with NO support flag omitted from Actions above"
- "no unsolicited event notifications described in source"
- "no multi-step macro sequences described in source"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "audio control commands (volume, mic volume, audio source) all marked NO support in source"
- "3D frame packing, 2D to 3D, NVIDIA modes marked NO support"
- "filter timer, firmware version, tint, keystone set-value not documented"
- "security/login code, AMX discovery, broadcasting not supported"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
