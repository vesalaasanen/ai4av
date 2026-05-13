---
spec_id: admin/wolfvision-vz_c12_control_spec
schema_version: ai4av-public-spec-v1
revision: 1
title: "WolfVision VZ-C12 Document Camera Control Spec"
manufacturer: WolfVision
model_family: VZ-C12
aliases: []
compatible_with:
  manufacturers:
    - WolfVision
  models:
    - VZ-C12
    - "VZ-C12²"
    - "VZ-C12³"
    - VZ-C32
    - "VZ-C32³"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - wolfvision.com
retrieved_at: 2026-04-30T04:32:42.910Z
last_checked_at: 2026-04-23T08:29:48.488Z
generated_at: 2026-04-23T08:29:48.488Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T08:29:48.488Z
  matched_actions: 124
  action_count: 124
  confidence: high
  summary: "All 124 spec actions match literal command tokens in source tables; all transport parameters verified with verbatim baud rate, data bits, parity, and stopbit values."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# WolfVision VZ-C12 Document Camera Control Spec

## Summary
RS-232 serial protocol for WolfVision document cameras (VZ-C12 series, VZ-C32 series). Controls zoom, focus, iris, light, presets, image mode, video output, resolution. No parity, 8 data bits, 1 stop bit. Default baud 115200 baud/s (19200 on older units).

<!-- UNRESOLVED: IP control not supported — serial only -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # default; also 9600, 19200, 38400, 57600
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
- id: zoom_wide
  label: Zoom Wide
  kind: action
  params: []
- id: zoom_tele
  label: Zoom Tele
  kind: action
  params: []
- id: start_zoom_wide
  label: Start Zoom Wide
  kind: action
  params: []
- id: start_zoom_tele
  label: Start Zoom Tele
  kind: action
  params: []
- id: stop_zoom_focus_iris
  label: Stop Zoom/Focus/Iris
  kind: action
  params: []
- id: set_zoom_position
  label: Set Zoom Position
  kind: action
  params:
    - name: position
      type: string
      description: 3-digit hex (000 wide to FFF tele)
- id: focus_far
  label: Focus Far
  kind: action
  params: []
- id: focus_near
  label: Focus Near
  kind: action
  params: []
- id: start_focus_far
  label: Start Focus Far
  kind: action
  params: []
- id: start_focus_near
  label: Start Focus Near
  kind: action
  params: []
- id: set_focus_position
  label: Set Focus Position
  kind: action
  params:
    - name: position
      type: string
      description: 3-digit hex (000 near to FFF far)
- id: one_push_auto_focus
  label: One-Push Auto Focus
  kind: action
  params: []
- id: iris_open
  label: Iris Open / Brightness Up
  kind: action
  params: []
- id: iris_close
  label: Iris Close / Brightness Down
  kind: action
  params: []
- id: start_iris_open
  label: Start Iris Open
  kind: action
  params: []
- id: start_iris_close
  label: Start Iris Close
  kind: action
  params: []
- id: set_iris_position
  label: Set Iris Position
  kind: action
  params:
    - name: position
      type: string
      description: 3-digit hex (000 close to FFF open)
- id: auto_iris_on
  label: Auto Iris On
  kind: action
  params: []
- id: auto_iris_off
  label: Auto Iris Off
  kind: action
  params: []
- id: light_off
  label: Light Off
  kind: action
  params: []
- id: light_on
  label: Light On
  kind: action
  params: []
- id: lamp_change
  label: Lamp Change
  kind: action
  params: []
- id: power_on_factory_preset
  label: Power On / Factory Preset
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: power_toggle
  label: Power Toggle
  kind: action
  params: []
- id: recall_preset
  label: Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-9
- id: store_preset
  label: Store Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-9
- id: preset_0_factory
  label: Preset 0 / Factory Preset
  kind: action
  params: []
- id: preset_1
  label: Preset 1
  kind: action
  params: []
- id: preset_2
  label: Preset 2
  kind: action
  params: []
- id: preset_3
  label: Preset 3
  kind: action
  params: []
- id: save_preset_1
  label: Save Preset 1
  kind: action
  params: []
- id: save_preset_2
  label: Save Preset 2
  kind: action
  params: []
- id: save_preset_3
  label: Save Preset 3
  kind: action
  params: []
- id: preset_max_wide
  label: Preset Max Wide
  kind: action
  params: []
- id: preset_din_a4
  label: Preset DIN A4
  kind: action
  params: []
- id: preset_din_a5
  label: Preset DIN A5
  kind: action
  params: []
- id: preset_din_a6
  label: Preset DIN A6
  kind: action
  params: []
- id: preset_din_a7
  label: Preset DIN A7
  kind: action
  params: []
- id: preset_din_a8
  label: Preset DIN A8
  kind: action
  params: []
- id: preset_max_tele
  label: Preset Max Tele
  kind: action
  params: []
- id: preset_slide
  label: Preset Slide
  kind: action
  params: []
- id: preset_xray_din_a4
  label: Preset X-ray DIN A4
  kind: action
  params: []
- id: preset_xray_din_a5
  label: Preset X-ray DIN A5
  kind: action
  params: []
- id: unlock_visualizer_menu
  label: Unlock Visualizer Menu
  kind: action
  params: []
- id: visualizer_menu_on_off
  label: Visualizer Menu On/Off
  kind: action
  params: []
- id: unlock_extra_menu
  label: Unlock Extra Menu (Baud Rate)
  kind: action
  params: []
- id: function_up
  label: Function Up
  kind: action
  params: []
- id: function_down
  label: Function Down
  kind: action
  params: []
- id: data_right
  label: Data Right / White Balance
  kind: action
  params: []
- id: data_left
  label: Data Left / Text Enhancer On/Off
  kind: action
  params: []
- id: white_balance
  label: White Balance
  kind: action
  params: []
- id: text_enhancer_on_off
  label: Text Enhancer On/Off
  kind: action
  params: []
- id: text_enhancer_on
  label: Text Enhancer On
  kind: action
  params: []
- id: text_enhancer_off
  label: Text Enhancer Off
  kind: action
  params: []
- id: help
  label: Help
  kind: action
  params: []
- id: data_left_right
  label: Data Left + Data Right
  kind: action
  params: []
- id: reset_menu
  label: Reset Menu
  kind: action
  params: []
- id: custom_serial_mode_on
  label: Custom Serial Mode On
  kind: action
  params: []
- id: custom_serial_mode_off
  label: Custom Serial Mode Off
  kind: action
  params: []
- id: reply_mode_off
  label: Reply Mode Off
  kind: action
  params: []
- id: reply_one_byte
  label: Reply One Byte
  kind: action
  params: []
- id: reply_two_bytes
  label: Reply Two Bytes
  kind: action
  params: []
- id: reply_string
  label: Reply String
  kind: action
  params: []
- id: blank_echo
  label: Blank Echo
  kind: action
  params: []
- id: key_lock_on
  label: Key Lock On
  kind: action
  params: []
- id: key_lock_off
  label: Key Lock Off
  kind: action
  params: []
- id: switch_ir_mode
  label: Switch IR Mode
  kind: action
  params: []
- id: demo_mode
  label: Demo Mode
  kind: action
  params: []
- id: toggle_switch_intern_extern
  label: Toggle Switch Intern/Extern
  kind: action
  params: []
- id: switch_extern_signal_on
  label: Switch Extern Signal On
  kind: action
  params: []
- id: switch_intern_signal_on
  label: Switch Intern Signal On
  kind: action
  params: []
- id: switch_portrait_on_off
  label: Switch Portrait On/Off
  kind: action
  params: []
- id: portrait_on
  label: Portrait On
  kind: action
  params: []
- id: portrait_off
  label: Portrait Off
  kind: action
  params: []
- id: video_pal
  label: Video PAL
  kind: action
  params: []
- id: video_ntsc
  label: Video NTSC
  kind: action
  params: []
- id: resolution_up
  label: Resolution Up
  kind: action
  params: []
- id: resolution_down
  label: Resolution Down
  kind: action
  params: []
- id: resolution_xga_75
  label: Resolution XGA/75
  kind: action
  params: []
- id: vga_resolution_up
  label: VGA Resolution Up
  kind: action
  params: []
- id: vga_resolution_down
  label: VGA Resolution Down
  kind: action
  params: []
- id: vga_resolution_auto
  label: VGA Resolution Auto
  kind: action
  params: []
- id: dvi_resolution_up
  label: DVI Resolution Up
  kind: action
  params: []
- id: dvi_resolution_down
  label: DVI Resolution Down
  kind: action
  params: []
- id: dvi_resolution_auto
  label: DVI Resolution Auto
  kind: action
  params: []
- id: switch_positive_on
  label: Switch Positive On
  kind: action
  params: []
- id: switch_negative_on
  label: Switch Negative On
  kind: action
  params: []
- id: switch_negative_blue_on
  label: Switch Negative Blue On
  kind: action
  params: []
- id: switch_color_on
  label: Switch Color On
  kind: action
  params: []
- id: switch_black_white_mode_on
  label: Switch Black/White Mode On
  kind: action
  params: []
- id: memory_store
  label: Memory Store
  kind: action
  params:
    - name: slot
      type: integer
      description: Memory slot 1-9
- id: memory_recall
  label: Memory Recall
  kind: action
  params:
    - name: slot
      type: integer
      description: Memory slot 1-9
- id: memory_off
  label: Memory Off
  kind: action
  params: []
- id: snapshot
  label: Snapshot
  kind: action
  params: []
- id: show_all_on_off
  label: Show All On/Off
  kind: action
  params: []
- id: show_all_on
  label: Show All On
  kind: action
  params: []
- id: show_all_off
  label: Show All Off
  kind: action
  params: []
- id: erase_memory
  label: Erase Memory
  kind: action
  params: []
- id: freeze_on_off
  label: Freeze On/Off
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
- id: image_toggle
  label: Image Toggle
  kind: action
  params: []
- id: image_on
  label: Image On
  kind: action
  params: []
- id: image_off
  label: Image Off
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: zoom_position
  label: Zoom Position
  type: string
  description: 3-digit hex (000 wide to FFF tele) + LF + CR
- id: focus_position
  label: Focus Position
  type: string
  description: 3-digit hex (000 near to FFF far) + LF + CR
- id: iris_position
  label: Iris Position
  type: string
  description: 3-digit hex (000 close to FFF open) + LF + CR
- id: auto_iris
  label: Auto Iris
  type: enum
  values: ['1', '0']
  description: '1'+LF+CR if on, '0'+LF+CR if off
- id: light_on_off
  label: Light On/Off
  type: enum
  values: ['1', '0']
  description: '1'+LF+CR if on, '0'+LF+CR if off
- id: power_on_off
  label: Power On/Off
  type: enum
  values: ['1', '0']
  description: '1'+LF+CR if on, '0'+LF+CR if standby
- id: key_lock
  label: Key Lock
  type: enum
  values: ['1', '0']
  description: '1'+LF+CR if active, '0'+LF+CR if inactive
- id: text_enhancer
  label: Text Enhancer
  type: enum
  values: ['1', '0']
  description: '1'+LF+CR if on, '0'+LF+CR if off
- id: portrait
  label: Portrait
  type: enum
  values: ['0', '1', '2', '3']
  description: '0'=0deg, '1'=-90deg, '2'=180deg, '3'=+90deg + LF + CR
- id: video_format
  label: Video Format
  type: enum
  values: ['PAL', 'NTSC']
  description: 'PAL'+LF+CR or 'NTSC'+LF+CR
- id: resolution_vga
  label: Resolution VGA
  type: string
  description: e.g. "XGA at 75Hz"
- id: resolution_dvi
  label: Resolution DVI
  type: string
  description: e.g. "XGA/75Hz"
- id: positive_negative
  label: Positive/Negative
  type: enum
  values: ['0', '1', '2']
  description: '0'=positive, '1'=negative, '2'=negative blue
- id: black_white
  label: Black/White
  type: enum
  values: ['0', '1']
  description: '0'=color, '1'=B/W
- id: show_all
  label: Show All
  type: enum
  values: ['1', '0']
  description: '1'+LF+CR if active, '0'+LF+CR if inactive
- id: freeze
  label: Freeze
  type: enum
  values: ['1', '0']
  description: '1'+LF+CR if frozen, '0'+LF+CR if live
- id: extern_signal
  label: Extern Signal
  type: enum
  values: ['1', '0']
  description: '1'+LF+CR if active, '0'+LF+CR if inactive
- id: visualizer_type_version
  label: Visualizer Type and Software Version
  type: string
  description: e.g. 'VZ-C32 V1.12b'+LF+CR
- id: status
  label: Get Status
  type: string
  description: Returns all settings as ASCII string e.g. 'Zoom:E4C DigitalZoom:000 Focus:802 Iris:000 Power:1...'+LF+CR
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters outside action commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
- id: custom_serial_mode_height_adjustment
  label: Custom Serial Mode Height Adjustment
  description: |
    Step 1: Center Lightfield (coarse) - Data Right/Left, Function Up/Down, confirm with Help
    Step 2: Adjust Camera Focus - Focus Far/Near or Start Focus Far/Near + Stop Focus, confirm with Help
    Step 3: Adjust Light Focus - same as Step 2
    Step 4: Center Lightfield (fine) - same as Step 1
    Completion outputs "Height Adjustment Done" via RS-232.
    Abort with command _206 (Visualizer Menu on/off).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Serial-only device. No IP, Telnet, HTTP, or网络 control. Default baud 115200; older units 19200. Command page system: page 0 (standard) and page 1 selected via SER_Page0/SER_Page1 commands. Commands are 1-byte binary codes. No CR/LF needed. Optional reply modes: off (default), one byte ($06 valid/$0F invalid), two bytes (echo + status), string (OKAY/ERROR). Blank echo ($20) polls ready state. ASCII input mode via underscore '_' + 3-digit decimal. Lampchange requires firmware v1.30a+. Custom Serial Mode height adjustment available since firmware v1.30a.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: TCP/IP control not supported by this device -->

## Provenance

```yaml
source_domains:
  - wolfvision.com
retrieved_at: 2026-04-30T04:32:42.910Z
last_checked_at: 2026-04-23T08:29:48.488Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:29:48.488Z
matched_actions: 124
action_count: 124
confidence: high
summary: "All 124 spec actions match literal command tokens in source tables; all transport parameters verified with verbatim baud rate, data bits, parity, and stopbit values."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
