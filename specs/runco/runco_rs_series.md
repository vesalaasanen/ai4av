---
spec_id: admin/runco-rs-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Runco RS Series Control Spec"
manufacturer: Runco
model_family: RS-900
aliases: []
compatible_with:
  manufacturers:
    - Runco
  models:
    - RS-900
    - RS1100
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - purelandsupply.com
source_urls:
  - "https://www.purelandsupply.com/Images/OwnersManuals/Runco/RUNCO%20RS-1100.pdf"
retrieved_at: 2026-04-29T22:04:46.886Z
last_checked_at: 2026-06-02T22:13:43.350Z
generated_at: 2026-06-02T22:13:43.350Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no TCP/IP, HTTP, or REST control documented"
  - "no queryable variables documented - X011X shows info but no discrete get commands"
  - "no unsolicited event notifications documented"
  - "no multi-step macro sequences documented"
  - "no voltage, current, or power specifications - only lamp wattage modes stated"
  - "TCP/IP, HTTP, REST, or network control not documented"
  - "firmware version compatibility not stated in source"
  - "fault behavior and error recovery not documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:13:43.350Z
  matched_actions: 69
  action_count: 69
  confidence: medium
  summary: "All 69 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Runco RS Series Control Spec

## Summary
Runco RS-900/RS1100 projectors support RS-232 serial control at 19200 baud, 8N1, no flow control. Commands are ASCII strings framed with X prefix/suffix (e.g., X001X). No authentication required. 20-second command lockout after power on/off.

<!-- UNRESOLVED: no TCP/IP, HTTP, or REST control documented -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
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

- id: menu
  label: Menu
  kind: action
  params: []

- id: enter
  label: Enter
  kind: action
  params: []

- id: exit
  label: Exit
  kind: action
  params: []

- id: up
  label: Up
  kind: action
  params: []

- id: down
  label: Down
  kind: action
  params: []

- id: left
  label: Left
  kind: action
  params: []

- id: right
  label: Right
  kind: action
  params: []

- id: show_info
  label: Show active source and aspect ratio
  kind: action
  params: []

- id: keypad_1
  label: Keypad 1
  kind: action
  params: []

- id: keypad_2
  label: Keypad 2
  kind: action
  params: []

- id: keypad_3
  label: Keypad 3
  kind: action
  params: []

- id: keypad_4
  label: Keypad 4
  kind: action
  params: []

- id: keypad_5
  label: Keypad 5
  kind: action
  params: []

- id: keypad_6
  label: Keypad 6
  kind: action
  params: []

- id: keypad_7
  label: Keypad 7
  kind: action
  params: []

- id: keypad_8
  label: Keypad 8
  kind: action
  params: []

- id: keypad_9
  label: Keypad 9
  kind: action
  params: []

- id: keypad_0
  label: Keypad 0
  kind: action
  params: []

- id: restore_custom_1
  label: Restore image settings from Custom 1
  kind: action
  params: []

- id: restore_custom_2
  label: Restore image settings from Custom 2
  kind: action
  params: []

- id: restore_isf_day
  label: Restore image settings from ISF Day
  kind: action
  params: []

- id: restore_isf_night
  label: Restore image settings from ISF Night
  kind: action
  params: []

- id: factory_reset_picture
  label: Restore all Picture Adjust Menu options to factory-default
  kind: action
  params: []

- id: factory_reset_setup
  label: Restore all Setup Menu options to factory-default
  kind: action
  params: []

- id: set_gamma_2_2
  label: Set Gamma to 2.2
  kind: action
  params: []

- id: pip_size_increase
  label: Increase PIP sub-window size
  kind: action
  params: []

- id: pip_size_decrease
  label: Decrease PIP sub-window size
  kind: action
  params: []

- id: pip_swap
  label: Swap main and PIP windows
  kind: action
  params: []

- id: pip_on
  label: Set PIP on
  kind: action
  params: []

- id: pip_off
  label: Set PIP off
  kind: action
  params: []

- id: aspect_16_9
  label: 16:9 aspect ratio
  kind: action
  params: []

- id: aspect_4_3
  label: 4:3 aspect ratio
  kind: action
  params: []

- id: aspect_letterbox
  label: Letterbox aspect ratio
  kind: action
  params: []

- id: aspect_virtualwide
  label: VirtualWide aspect ratio
  kind: action
  params: []

- id: aspect_cinema
  label: Cinema aspect ratio
  kind: action
  params: []

- id: aspect_virtual_cinema
  label: Virtual Cinema aspect ratio
  kind: action
  params: []

- id: orientation_floor_front
  label: Image orientation = floor front
  kind: action
  params: []

- id: orientation_ceiling_front
  label: Image orientation = ceiling front
  kind: action
  params: []

- id: orientation_floor_rear
  label: Image orientation = floor rear
  kind: action
  params: []

- id: orientation_ceiling_rear
  label: Image orientation = ceiling rear
  kind: action
  params: []

- id: lamp_power_170w
  label: Lamp Power = 170W
  kind: action
  params: []

- id: lamp_power_200w
  label: Lamp Power = 200W
  kind: action
  params: []

- id: black_threshold_0_ire
  label: Black Threshold = 0 IRE
  kind: action
  params: []

- id: black_threshold_7_5_ire
  label: Black Threshold = 7.5 IRE
  kind: action
  params: []

- id: color_temp_5400k
  label: Color Temperature = 5400K
  kind: action
  params: []

- id: color_temp_6500k
  label: Color Temperature = 6500K
  kind: action
  params: []

- id: color_temp_9300k
  label: Color Temperature = 9300K
  kind: action
  params: []

- id: color_temp_custom_1
  label: Color Temperature = Custom 1
  kind: action
  params: []

- id: color_temp_custom_2
  label: Color Temperature = Custom 2
  kind: action
  params: []

- id: osd_english
  label: OSD Language = English
  kind: action
  params: []

- id: osd_french
  label: OSD Language = French
  kind: action
  params: []

- id: osd_spanish
  label: OSD Language = Spanish
  kind: action
  params: []

- id: osd_german
  label: OSD Language = German
  kind: action
  params: []

- id: osd_italian
  label: OSD Language = Italian
  kind: action
  params: []

- id: input_composite
  label: Switch to Composite input
  kind: action
  params: []

- id: input_svideo
  label: Switch to S-Video input
  kind: action
  params: []

- id: input_component_1
  label: Switch to Component 1 input
  kind: action
  params: []

- id: input_component_2
  label: Switch to Component 2 input
  kind: action
  params: []

- id: input_hdmi_1
  label: Switch to HDMI 1 input
  kind: action
  params: []

- id: input_hdmi_2
  label: Switch to HDMI 2 input
  kind: action
  params: []

- id: input_rgbhv
  label: Switch to RGBHV input
  kind: action
  params: []

- id: reset_lamp_timer
  label: Reset Lamp Timer
  kind: action
  params: []

- id: background_black
  label: Background Color = Black
  kind: action
  params: []

- id: background_blue
  label: Background Color = Blue
  kind: action
  params: []

- id: background_gray
  label: Background Color = Gray
  kind: action
  params: []

- id: blue_image_on
  label: Blue Image ON
  kind: action
  params: []

- id: blue_image_off
  label: Blue Image OFF
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: command_echo
  type: string
  description: Device echoes the sent command back

- id: command_confirmation
  type: string
  description: Confirmation message X0[command]X<CR> (e.g., X003X sends X003XX0_3X<CR>)

- id: invalid_command_echo
  type: string
  description: Invalid commands are echoed with no further response

- id: power_lockout
  type: boolean
  description: Device rejects serial commands for 20 seconds after power on or off
```

## Variables
```yaml
# UNRESOLVED: no queryable variables documented - X011X shows info but no discrete get commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Device rejects serial commands for 20 seconds after power on or power off
    code: X001X (Power On) or X002X (Power Off)
# UNRESOLVED: no voltage, current, or power specifications - only lamp wattage modes stated
```

## Notes
Commands must be UPPERCASE ASCII strings framed with X prefix/suffix (e.g., X001X). No carriage return after command. Echo behavior: valid commands echo back then execute; invalid commands echo with no action. Power on (X001X) does not echo. Confirmation format: X0[command number without leading zeros]X<CR>.
<!-- UNRESOLVED: TCP/IP, HTTP, REST, or network control not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: fault behavior and error recovery not documented -->

## Provenance

```yaml
source_domains:
  - purelandsupply.com
source_urls:
  - "https://www.purelandsupply.com/Images/OwnersManuals/Runco/RUNCO%20RS-1100.pdf"
retrieved_at: 2026-04-29T22:04:46.886Z
last_checked_at: 2026-06-02T22:13:43.350Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:13:43.350Z
matched_actions: 69
action_count: 69
confidence: medium
summary: "All 69 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no TCP/IP, HTTP, or REST control documented"
- "no queryable variables documented - X011X shows info but no discrete get commands"
- "no unsolicited event notifications documented"
- "no multi-step macro sequences documented"
- "no voltage, current, or power specifications - only lamp wattage modes stated"
- "TCP/IP, HTTP, REST, or network control not documented"
- "firmware version compatibility not stated in source"
- "fault behavior and error recovery not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
