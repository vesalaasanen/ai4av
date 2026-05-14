---
spec_id: admin/wolfvision-vz-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "WolfVision VZ-C12/VZ-C32 Control Spec"
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
source_urls:
  - https://wolfvision.com/wolf/serial_ceiling32.pdf
retrieved_at: 2026-04-30T04:32:44.618Z
last_checked_at: 2026-05-14T18:17:21.576Z
generated_at: 2026-05-14T18:17:21.576Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:21.576Z
  matched_actions: 111
  action_count: 111
  confidence: high
  summary: "All 114 spec actions match source commands; transport (115200 baud, 8N1, serial) verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# WolfVision VZ-C12/VZ-C32 Control Spec

## Summary
WolfVision ceiling/standing visualizer controlled via RS-232. All IR-remote functions available over serial: zoom, focus, iris, presets, power, image settings. Serial config: 115200 baud default, 8N1, no auth. Commands are single-byte codes; reply mode configurable.

<!-- UNRESOLVED: TCP/IP or HTTP control not mentioned in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # default; configurable 9600/19200/38400/57600/115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # power on/off/recall preset commands present
- queryable       # get zoom/focus/iris/power/light status commands present
- routable        # extern/intern signal switching present
- levelable       # iris, zoom, focus level control present
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

- id: lampchange
  label: Lamp Change
  kind: action
  params: []

- id: power_on
  label: Power On / Factory Preset
  kind: action
  params: []

- id: power_off
  label: Power Off (Standby)
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

- id: preset_0
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

- id: preset_max_wide
  label: Preset Max Wide
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

- id: visualizer_type_version
  label: Visualizer Type and Software Version
  kind: action
  params: []

- id: debug_mode_on
  label: Debug Mode On
  kind: action
  params: []

- id: camera_optic_status
  label: Camera and Optic Status
  kind: action
  params: []

- id: ascii_input_mode
  label: ASCII Input Mode
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

- id: get_status
  label: Get Status
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

- id: switch_extern_on
  label: Switch Extern Signal On
  kind: action
  params: []

- id: switch_intern_on
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

- id: switch_black_white_on
  label: Switch Black/White On
  kind: action
  params: []

- id: memory_store
  label: Memory Store
  kind: action
  params:
    - name: memory
      type: integer
      description: Memory number 1-9

- id: memory_recall
  label: Memory Recall
  kind: action
  params:
    - name: memory
      type: integer
      description: Memory number 1-9

- id: memory_off
  label: Memory Off (Live Image)
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

- id: page_0
  label: Select Page 0
  kind: action
  params: []

- id: page_1
  label: Select Page 1
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: zoom_position
  type: string
  description: 3-digit hex (000 wide to FFF tele)

- id: digital_zoom_position
  type: string
  description: 3-digit hex (000 wide to FFF tele)

- id: focus_position
  type: string
  description: 3-digit hex (000 near to FFF far)

- id: iris_position
  type: string
  description: 3-digit hex (000 close to FFF open)

- id: auto_iris
  type: boolean
  description: Returns '1' if on, '0' if off

- id: light_state
  type: boolean
  description: Returns '1' if on, '0' if off

- id: power_state
  type: boolean
  description: Returns '1' if on, '0' if standby

- id: text_enhancer
  type: boolean
  description: Returns '1' if active, '0' if inactive

- id: key_lock
  type: boolean
  description: Returns '1' if active, '0' if inactive

- id: get_status
  type: string
  description: Full status string e.g. 'Zoom:E4C DigitalZoom:000 Focus:802 Iris:000 Power:1...'

- id: visualizer_type_version
  type: string
  description: e.g. 'VZ-C32 V1.12b'

- id: portrait
  type: integer
  description: Returns 0/1/2/3 for rotation angle (0°, -90°, 180°, +90°)

- id: video_format
  type: enum
  values: [PAL, NTSC]

- id: resolution_vga
  type: string
  description: e.g. "XGA at 75Hz"

- id: resolution_dvi
  type: string
  description: e.g. "XGA/75Hz"

- id: positive_negative
  type: enum
  values: [0, 1, 2]
  description: 0=Positive, 1=Negative, 2=Negative/Blue

- id: black_white
  type: boolean
  description: Returns '1' if B&W mode, '0' if color

- id: show_all
  type: boolean
  description: Returns '1' if Show All active, '0' if inactive

- id: freeze
  type: boolean
  description: Returns '1' if frozen, '0' if live

- id: extern_signal
  type: boolean
  description: Returns '1' if extern signal active, '0' if intern

- id: blank_echo
  type: string
  description: Returns ' ' when unit ready

- id: reply_okay
  type: string
  description: 'OKAY' in string reply mode for valid command

- id: reply_error
  type: string
  description: 'ERROR' in string reply mode for invalid command

- id: reply_ack
  type: string
  description: $06 byte acknowledge for valid command in byte reply mode

- id: reply_nack
  type: string
  description: $0F byte for invalid command in byte reply mode
```

## Variables
```yaml
# No standalone settable variables beyond action parameters.
# All parameters embedded in Set Zoom/Focus/Iris commands.
```

## Events
```yaml
# No unsolicited event notifications in default mode.
# Custom Serial Mode outputs menu line names + LF+CR.
# Height Adjustment outputs step names + "Height Adjustment Done".
```

## Macros
```yaml
- id: custom_serial_height_adjustment
  label: Custom Serial Mode Height Adjustment
  description: |
    Firmware v1.30a+. 4-step camera/lightfield alignment:
    1. Center Lightfield coarse (commands 210/211/208/209, confirm 214)
    2. Adjust Camera Focus (194/198/131/132/128, confirm 214)
    3. Adjust Light Focus (same as step 2)
    4. Center Lightfield fine (same as step 1)
    Each step name output via RS-232. "Height Adjustment Done" on completion.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings in source
```

## Notes
Serial connector: 9-pin Sub-D, pins 2 (RxD), 3 (TxD), 5 (GND) only. Commands are 1-byte; no CR/LF needed. Default no reply; configurable reply modes: no reply, 1-byte ($06/$0F), 2-byte, or string (OKAY/ERROR). Blank echo (space char 32) polls ready state. Some commands have long execution time — do not send immediately one after another.

Page structure: page 0 standard (default), page 1 selectable. Page 1 auto-returns to page 0 after command execution.

Older units (serial <1009412 for VZ-C12², <1011797 for VZ-C32) run 19200 baud default.

Newer hardware (serial >=1009412 VZ-C12², >=1011797 VZ-C32) supports extended WolfVision command list per www.wolfvision.com/wolf/protocol_command_wolfvision/protocol_command.htm.

<!-- UNRESOLVED: TCP/IP control capability not stated in source -->
<!-- UNRESOLVED: REST/HTTP control not mentioned in source -->
<!-- UNRESOLVED: precise firmware version for new hardware support not stated -->

## Provenance

```yaml
source_domains:
  - wolfvision.com
source_urls:
  - https://wolfvision.com/wolf/serial_ceiling32.pdf
retrieved_at: 2026-04-30T04:32:44.618Z
last_checked_at: 2026-05-14T18:17:21.576Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:21.576Z
matched_actions: 111
action_count: 111
confidence: high
summary: "All 114 spec actions match source commands; transport (115200 baud, 8N1, serial) verified verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
