---
spec_id: admin/wolfvision-vz-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "WolfVision VZ Series Control Spec"
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
last_checked_at: 2026-06-02T07:06:57.951Z
generated_at: 2026-06-02T07:06:57.951Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full-series firmware compatibility range not stated; per-command firmware requirements (v1.20a, v1.30a, v2.03a, v2.04a) listed in Notes."
  - "source does not expose continuous settable variables; all state"
  - "source does not describe unsolicited events. The device replies"
  - "source does not describe device-side macros. The Height"
  - "source contains no explicit safety warnings, interlocks, or"
  - "source does not state the full series-wide firmware"
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:57.951Z
  matched_actions: 131
  action_count: 131
  confidence: medium
  summary: "All 131 spec actions matched verbatim against source command tables; transport parameters verified; full bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# WolfVision VZ Series Control Spec

## Summary
The WolfVision VZ-C12, VZ-C12², VZ-C12³, VZ-C32 and VZ-C32³ are ceiling-mounted Visualizers (document cameras) controllable over RS-232 serial via a single-byte command protocol. The protocol is split across two command pages (page 0 standard, page 1 extended) and supports zoom, focus, iris, light, power, presets, image manipulation, output resolution, and reply-mode control.

<!-- UNRESOLVED: full-series firmware compatibility range not stated; per-command firmware requirements (v1.20a, v1.30a, v2.03a, v2.04a) listed in Notes. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: source states 3-wire connection (pins 2/3/5 only); no RTS/CTS
auth:
  type: none  # inferred: no auth procedure in source
```

Default baud 115200; older units default 19200. Selectable: 9600, 19200, 38400, 57600, 115200 (changed only via ExtraMenu → Serial Port; no RS-232 command changes baud). 9-pin Sub-D: pins 2 (RxD), 3 (TxD), 5 (GND) only.

## Traits
```yaml
- powerable       # power on/off/toggle commands present
- levelable       # zoom, focus, iris, brightness, light, lamp
- queryable       # many Get state queries
- routable        # intern/extern image switch, video format, resolution
```

## Actions
```yaml
# -------- Page commands --------
- id: select_page_0
  label: Select Command Page 0
  kind: action
  command: "30"
  params: []
  notes: "Page 0 is the default standard page; auto-selected on power on."

- id: select_page_1
  label: Select Command Page 1
  kind: action
  command: "31"
  params: []
  notes: "After the next control command is executed, device auto-returns to page 0."

# -------- Zoom Control (page 0) --------
- id: zoom_wide
  label: Zoom Wide
  kind: action
  command: "C3"
  params: []
  notes: "Repeat at min 10Hz for continuous zoom. Switches on Auto-Iris."

- id: zoom_tele
  label: Zoom Tele
  kind: action
  command: "C7"
  params: []
  notes: "Repeat at min 10Hz for continuous zoom. Switches on Auto-Iris."

- id: start_zoom_wide
  label: Start Zoom Wide
  kind: action
  command: "81"
  params: []
  notes: "Runs until Stop Zoom/Focus/Iris (80) or mechanical end-position."

- id: start_zoom_tele
  label: Start Zoom Tele
  kind: action
  command: "82"
  params: []
  notes: "Runs until Stop Zoom/Focus/Iris (80) or mechanical end-position."

- id: stop_zoom_focus_iris
  label: Stop Zoom/Focus/Iris
  kind: action
  command: "80"
  params: []
  notes: "Stops zoom, focus, iris, and mirror movement. (Page 1 byte 80 = Toggle Intern/Extern.)"

- id: get_zoom_position
  label: Get Zoom Position
  kind: query
  command: "A1"
  params: []
  notes: "Returns 3-digit hex '000' (wide) to 'FFF' (tele) + LF + CR."

- id: set_zoom_position
  label: Set Zoom Position
  kind: action
  command: "A2 {pos}"
  params:
    - name: pos
      type: string
      description: 3-digit hex position '000' (wide) to 'FFF' (tele), no CR/LF
  notes: "Device echoes '?' first; send 3-digit hex within 3 seconds. Not all 000-FFF positions are supported."

# -------- Focus Control (page 0) --------
- id: focus_far
  label: Focus Far
  kind: action
  command: "C2"
  params: []
  notes: "Repeat at min 10Hz for continuous focus."

- id: focus_near
  label: Focus Near
  kind: action
  command: "C6"
  params: []
  notes: "Repeat at min 10Hz for continuous focus."

- id: start_focus_far
  label: Start Focus Far
  kind: action
  command: "83"
  params: []
  notes: "Runs until Stop (80) or end-position."

- id: start_focus_near
  label: Start Focus Near
  kind: action
  command: "84"
  params: []
  notes: "Runs until Stop (80) or end-position."

- id: get_focus_position
  label: Get Focus Position
  kind: query
  command: "A3"
  params: []
  notes: "Returns 3-digit hex '000' (near) to 'FFF' (far) + LF + CR. (Page 1 byte A3 = Set Digital Zoom.)"

- id: set_focus_position
  label: Set Focus Position
  kind: action
  command: "A4 {pos}"
  params:
    - name: pos
      type: string
      description: 3-digit hex focus position '000' (near) to 'FFF' (far), no CR/LF
  notes: "Device echoes '?' first; send 3-digit hex within 3 seconds. (Page 1 byte A4 = Get Digital Zoom.)"

- id: one_push_auto_focus
  label: One-Push Auto Focus
  kind: action
  command: "F9"
  params: []

# -------- Iris Control (page 0) --------
- id: iris_open
  label: Iris Open / Brightness Up
  kind: action
  command: "C1"
  params: []
  notes: "Repeat at min 10Hz. Switches off Auto Iris."

- id: iris_close
  label: Iris Close / Brightness Down
  kind: action
  command: "C5"
  params: []
  notes: "Repeat at min 10Hz. Switches off Auto Iris."

- id: start_iris_open
  label: Start Iris Open
  kind: action
  command: "85"
  params: []
  notes: "Runs until Stop (80)."

- id: start_iris_close
  label: Start Iris Close
  kind: action
  command: "86"
  params: []
  notes: "Runs until Stop (80)."

- id: auto_iris_on
  label: Auto Iris On
  kind: action
  command: "A7"
  params: []

- id: auto_iris_off
  label: Auto Iris Off
  kind: action
  command: "A8"
  params: []

- id: get_auto_iris
  label: Get Auto Iris
  kind: query
  command: "A6"
  params: []
  notes: "Returns '1' (on) or '0' (off) + LF + CR."

- id: get_iris_position
  label: Get Iris Position
  kind: query
  command: "A5"
  params: []
  notes: "Returns 3-digit hex '000' (close) to 'FFF' (open) + LF + CR."

- id: set_iris_position
  label: Set Iris Position
  kind: action
  command: "A9 {pos}"
  params:
    - name: pos
      type: string
      description: 3-digit hex iris position '000' (close) to 'FFF' (open), no CR/LF
  notes: "Device echoes '?' first; send 3-digit hex within 3 seconds."

# -------- Light On/Off (page 0) --------
- id: light_off
  label: Light Off
  kind: action
  command: "CD"
  params: []

- id: light_on
  label: Light On
  kind: action
  command: "B2"
  params: []

- id: get_light
  label: Get Light On or Off
  kind: query
  command: "AC"
  params: []
  notes: "Returns '1' (on) or '0' (off) + LF + CR."

- id: lamp_change
  label: Lamp Change
  kind: action
  command: "B1"
  params: []
  notes: "Replies 'Perform Lampchange... Changed to Lamp1 (or Lamp2)'. Requires firmware v1.30a+."

# -------- Power / Presets (page 0) --------
- id: power_on_factory_preset
  label: Power On / Recall Factory Preset
  kind: action
  command: "C8"
  params: []
  notes: "Powers on from standby; if already on, recalls factory preset (approx DIN A5, light on)."

- id: power_off
  label: Power Off (Standby)
  kind: action
  command: "C9"
  params: []

- id: get_power
  label: Get Power On or Off
  kind: query
  command: "AB"
  params: []
  notes: "Returns '1' (on) or '0' (standby) + LF + CR."

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "BA"
  params: []
  notes: "Toggles between on and off. Main power switch must be on."

- id: recall_preset
  label: Recall Preset
  kind: action
  command: "9A {slot}"
  params:
    - name: slot
      type: string
      description: Preset number 1-9 (single ASCII digit)
  notes: "Device echoes '?' first; send ASCII digit within 3 seconds. (Page 1 byte 9A = Get Positive/Negative.)"

- id: store_preset
  label: Store Preset
  kind: action
  command: "9B {slot}"
  params:
    - name: slot
      type: string
      description: Preset number 1-9 (single ASCII digit)
  notes: "Device echoes '?' first; send ASCII digit within 3 seconds. (Page 1 byte 9B = Switch Color On.)"

- id: preset_0_factory
  label: Preset 0 (Factory Preset)
  kind: action
  command: "D5"
  params: []
  notes: "Recalls the Factory Preset (approx DIN A5, light on)."

- id: preset_1
  label: Preset 1
  kind: action
  command: "CA"
  params: []

- id: preset_2
  label: Preset 2
  kind: action
  command: "CB"
  params: []

- id: preset_3
  label: Preset 3
  kind: action
  command: "FD"
  params: []

- id: save_preset_1
  label: Save Preset 1
  kind: action
  command: "D8"
  params: []

- id: save_preset_2
  label: Save Preset 2
  kind: action
  command: "D9"
  params: []

- id: save_preset_3
  label: Save Preset 3
  kind: action
  command: "FE"
  params: []

- id: preset_max_wide
  label: Preset Max Wide
  kind: action
  command: "E5"
  params: []
  notes: "Zooms to max wide, light on. Pre-defined, not modifiable."

- id: preset_din_a4
  label: Preset DIN A4
  kind: action
  command: "E6"
  params: []
  notes: "Zooms to approx DIN A4, light on. Pre-defined."

- id: preset_din_a5
  label: Preset DIN A5
  kind: action
  command: "E7"
  params: []
  notes: "Zooms to approx DIN A5, light on. Pre-defined."

- id: preset_din_a6
  label: Preset DIN A6
  kind: action
  command: "E8"
  params: []
  notes: "Zooms to approx DIN A6, light on. Pre-defined."

- id: preset_din_a7
  label: Preset DIN A7
  kind: action
  command: "E9"
  params: []
  notes: "Zooms to approx DIN A7, light on. Pre-defined."

- id: preset_din_a8
  label: Preset DIN A8
  kind: action
  command: "EA"
  params: []
  notes: "Zooms to approx DIN A8, light on. Pre-defined."

- id: preset_max_tele
  label: Preset Max Tele
  kind: action
  command: "EB"
  params: []
  notes: "Zooms to max tele, light on. Pre-defined."

- id: preset_slide
  label: Preset Slide
  kind: action
  command: "EC"
  params: []
  notes: "Zooms to approx slide-film size, light off. Pre-defined."

- id: preset_xray_din_a4
  label: Preset X-ray DIN A4
  kind: action
  command: "ED"
  params: []
  notes: "Zooms to approx DIN A4. Pre-defined."

- id: preset_xray_din_a5
  label: Preset X-ray DIN A5
  kind: action
  command: "EE"
  params: []
  notes: "Zooms to approx DIN A5. Pre-defined."

# -------- Visualizer Menu / Camera Control (page 0) --------
- id: unlock_visualizer_menu
  label: Unlock Visualizer Menu
  kind: action
  command: "DA"
  params: []
  notes: "After this, menu can be entered with command CE."

- id: visualizer_menu_toggle
  label: Visualizer Menu On/Off
  kind: action
  command: "CE"
  params: []
  notes: "If menu is locked, send at 10Hz for 1 second to unlock."

- id: unlock_extra_menu
  label: Unlock Extra Menu (Baud Rate)
  kind: action
  command: "8B"
  params: []
  notes: "After this, menu can be entered with command CE to access Serial Port sub-menu for baud change. (Page 1 byte 8B = Get Show All.)"

- id: function_up
  label: Function Up (Menu Cursor Up)
  kind: action
  command: "D0"
  params: []

- id: function_down
  label: Function Down (Menu Cursor Down)
  kind: action
  command: "D1"
  params: []

- id: data_right_white_balance
  label: Data Right / White Balance
  kind: action
  command: "D2"
  params: []
  notes: "In menu: increments current item. Outside menu: triggers white balance."

- id: white_balance
  label: White Balance
  kind: action
  command: "97"
  params: []
  notes: "Performs white balance. Also works when menu is on. (Page 1 byte 97 = Switch Positive On.)"

- id: data_left_text_enhancer_toggle
  label: Data Left / Text Enhancer Toggle
  kind: action
  command: "D3"
  params: []
  notes: "In menu: decrements current item. Outside menu: toggles Text Enhancer."

- id: text_enhancer_toggle
  label: Text Enhancer On/Off
  kind: action
  command: "96"
  params: []
  notes: "Toggles text enhancement. Also works when menu is on. (Page 1 byte 96 = Get Video.)"

- id: help
  label: Help (Menu Description)
  kind: action
  command: "D6"
  params: []
  notes: "Outputs description of current menu setting via RS-232."

- id: data_left_right_default
  label: Data Left + Data Right (Default Value)
  kind: action
  command: "DC"
  params: []
  notes: "Resets current menu item to its default value."

- id: reset_menu
  label: Reset Menu
  kind: action
  command: "F6"
  params: []
  notes: "Resets all Visualizer settings except output settings."

- id: custom_serial_mode_on
  label: Custom Serial Mode On
  kind: action
  command: "F1"
  params: []
  notes: "On-screen menu can be navigated via D0/D1/D2/D3; current line is echoed via RS-232 (+ LF + CR). Powering off deactivates. Requires firmware v1.30a+."

- id: custom_serial_mode_off
  label: Custom Serial Mode Off
  kind: action
  command: "F2"
  params: []
  notes: "Requires firmware v1.30a+."

# -------- Reply Mode Control (page 0) --------
- id: reply_mode_off
  label: Reply Mode Off
  kind: action
  command: "9C"
  params: []
  notes: "Default after mains power on. No reply sent for commands. (Page 1 byte 9C = Switch B/W On.)"

- id: reply_mode_one_byte
  label: Reply Mode One Byte
  kind: action
  command: "9D"
  params: []
  notes: "Replies $06 for valid command, $0F for invalid. (Page 1 byte 9D = Get B/W.)"

- id: reply_mode_two_bytes
  label: Reply Mode Two Bytes
  kind: action
  command: "9E"
  params: []
  notes: "Replies received byte + $06 (valid) or received byte + $0F (invalid). (Page 1 byte 9E = Text Enhancer On.)"

- id: reply_mode_string
  label: Reply Mode String
  kind: action
  command: "9F"
  params: []
  notes: "Replies 'OKAY' + LF + CR (valid) or 'ERROR' + LF + CR (invalid). (Page 1 byte 9F = Text Enhancer Off.)"

# -------- Miscellaneous (page 0 unless noted) --------
- id: blank_echo
  label: Blank Echo (Ready Check)
  kind: query
  command: "20"
  params: []
  notes: "ASCII space. Echoes a blank (' ') if device is ready to receive next command; no echo if busy. Use between long-running commands."

- id: get_version
  label: Get Visualizer Type and Software Version
  kind: query
  command: "76"
  params: []
  notes: "ASCII 'v'. Returns e.g. 'VZ-C32 V1.12b' + LF + CR."

- id: debug_mode_on
  label: Debug Mode On
  kind: action
  command: "FA"
  params: []
  notes: "Required for command 3F (Camera Status)."

- id: get_camera_status
  label: Get Camera and Optic Status
  kind: query
  command: "3F"
  params: []
  notes: "ASCII '?'. Debug only. Returns multi-line camera/optics state. Format depends on model/firmware."

- id: ascii_text_input
  label: ASCII Text Input Mode
  kind: action
  command: "5F"
  params: []
  notes: "ASCII '_'. Device echoes '?'; send 3-digit decimal command within 3 seconds. Useful for terminal testing."

- id: key_lock_on
  label: Key Lock On
  kind: action
  command: "AF"
  params: []
  notes: "IR remote and front-panel keys disabled; RS-232 still active. (Page 1 byte AF = DVI Resolution AUTO.)"

- id: key_lock_off
  label: Key Lock Off
  kind: action
  command: "B0"
  params: []

- id: get_key_lock
  label: Get Key Lock
  kind: query
  command: "AE"
  params: []
  notes: "Returns '1' (active) or '0' (inactive) + LF + CR. (Page 1 byte AE = DVI Resolution Down.)"

- id: get_status
  label: Get Status
  kind: query
  command: "A0"
  params: []
  notes: "Returns single-line status string with all settings. Format depends on model/firmware. (Page 1 byte A0 = Get Text Enhancer.)"

- id: switch_ir_mode
  label: Switch IR Mode
  kind: action
  command: "DD"
  params: []
  notes: "Cycles through IR modes A, B, C, D for use with multiple co-located units."

- id: demo_mode
  label: Demo Mode
  kind: action
  command: "F4"
  params: []
  notes: "Device runs demo sequence. Exit by sending any code or pressing any key."

# -------- Intern/Extern Switch (page 1) --------
- id: toggle_intern_extern
  label: Toggle Switch Intern/Extern
  kind: action
  command: "80"
  params: []
  notes: "Page 1. Toggles between Visualizer image and Extern input. (Page 0 byte 80 = Stop Zoom/Focus/Iris.)"

- id: extern_signal_on
  label: Switch Extern Signal On
  kind: action
  command: "81"
  params: []
  notes: "Page 1. (Page 0 byte 81 = Start Zoom Wide.)"

- id: intern_signal_on
  label: Switch Intern Signal On
  kind: action
  command: "82"
  params: []
  notes: "Page 1. (Page 0 byte 82 = Start Zoom Tele.)"

- id: get_extern
  label: Get Extern Signal
  kind: query
  command: "83"
  params: []
  notes: "Page 1. Returns '1' (active) or '0' (inactive) + LF + CR. (Page 0 byte 83 = Start Focus Far.)"

# -------- Image Turn (page 1) --------
- id: switch_portrait_toggle
  label: Switch Portrait On/Off
  kind: action
  command: "84"
  params: []
  notes: "Page 1. Toggles image turn mode (portrait/landscape). (Page 0 byte 84 = Start Focus Near.)"

- id: portrait_on
  label: Portrait On
  kind: action
  command: "85"
  params: []
  notes: "Page 1. Activates image turn (+/-90° or 180° per menu setting). (Page 0 byte 85 = Start Iris Open.)"

- id: portrait_off
  label: Portrait Off
  kind: action
  command: "86"
  params: []
  notes: "Page 1. (Page 0 byte 86 = Start Iris Close.)"

- id: get_portrait
  label: Get Portrait
  kind: query
  command: "87"
  params: []
  notes: "Page 1. Returns '0' (0°), '1' (-90°), '2' (180°), '3' (+90°), + LF + CR. Pre-firmware v2.03a: '1' (on) or '0' (off)."

# -------- Video Output (page 1) --------
- id: video_pal
  label: Video PAL
  kind: action
  command: "94"
  params: []
  notes: "Page 1. Not available on VZ-C12²."

- id: video_ntsc
  label: Video NTSC
  kind: action
  command: "95"
  params: []
  notes: "Page 1. Not available on VZ-C12²."

- id: get_video
  label: Get Video Format
  kind: query
  command: "96"
  params: []
  notes: "Page 1. Returns 'PAL' or 'NTSC' + LF + CR. Not available on VZ-C12². (Page 0 byte 96 = Text Enhancer On/Off.)"

# -------- Output Resolution (page 1) --------
- id: resolution_up
  label: Resolution Up (Both Outputs)
  kind: action
  command: "90"
  params: []

- id: resolution_down
  label: Resolution Down (Both Outputs)
  kind: action
  command: "91"
  params: []

- id: resolution_xga_75
  label: Resolution XGA/75 (Both Outputs)
  kind: action
  command: "92"
  params: []
  notes: "Per source description, sets both outputs to AUTO-detect."

- id: get_resolution_vga
  label: Get VGA Resolution
  kind: query
  command: "93"
  params: []
  notes: "Returns e.g. 'XGA at 75Hz' + LF + CR."

- id: vga_resolution_up
  label: VGA Resolution Up
  kind: action
  command: "AA"
  params: []

- id: vga_resolution_down
  label: VGA Resolution Down
  kind: action
  command: "AB"
  params: []
  notes: "(Page 0 byte AB = Get Power.)"

- id: vga_resolution_auto
  label: VGA Resolution Auto
  kind: action
  command: "AC"
  params: []
  notes: "(Page 0 byte AC = Get Light.)"

- id: get_resolution_dvi
  label: Get DVI Resolution
  kind: query
  command: "A9"
  params: []
  notes: "Returns e.g. 'XGA/75Hz' + LF + CR."

- id: dvi_resolution_up
  label: DVI Resolution Up
  kind: action
  command: "AD"
  params: []

- id: dvi_resolution_down
  label: DVI Resolution Down
  kind: action
  command: "AE"
  params: []
  notes: "(Page 0 byte AE = Get Key Lock.)"

- id: dvi_resolution_auto
  label: DVI Resolution Auto
  kind: action
  command: "AF"
  params: []
  notes: "(Page 0 byte AF = Key Lock On.)"

# -------- Output Signal Setting (page 1) --------
- id: switch_positive_on
  label: Switch Positive On
  kind: action
  command: "97"
  params: []
  notes: "Page 1. (Page 0 byte 97 = White Balance.)"

- id: switch_negative_on
  label: Switch Negative On
  kind: action
  command: "98"
  params: []
  notes: "Page 1."

- id: switch_negative_blue_on
  label: Switch Negative Blue On
  kind: action
  command: "99"
  params: []
  notes: "Page 1."

- id: get_positive_negative
  label: Get Positive/Negative
  kind: query
  command: "9A"
  params: []
  notes: "Page 1. Returns '0' (positive), '1' (negative), '2' (negative/blue) + LF + CR. (Page 0 byte 9A = Recall Preset.)"

- id: switch_color_on
  label: Switch Color On
  kind: action
  command: "9B"
  params: []
  notes: "Page 1. (Page 0 byte 9B = Store Preset.)"

- id: switch_black_white_on
  label: Switch Black/White On
  kind: action
  command: "9C"
  params: []
  notes: "Page 1. (Page 0 byte 9C = Reply Mode Off.)"

- id: get_black_white
  label: Get Black/White
  kind: query
  command: "9D"
  params: []
  notes: "Page 1. Returns '0' (color) or '1' (B/W) + LF + CR. (Page 0 byte 9D = Reply One Byte.)"

# -------- Text Enhancer (page 1) --------
- id: text_enhancer_on
  label: Text Enhancer On
  kind: action
  command: "9E"
  params: []
  notes: "Page 1. (Page 0 byte 9E = Reply Two Bytes.)"

- id: text_enhancer_off
  label: Text Enhancer Off
  kind: action
  command: "9F"
  params: []
  notes: "Page 1. (Page 0 byte 9F = Reply String.)"

- id: get_text_enhancer
  label: Get Text Enhancer
  kind: query
  command: "A0"
  params: []
  notes: "Page 1. Returns '1' (active) or '0' (inactive) + LF + CR. (Page 0 byte A0 = Get Status.)"

# -------- Digital Zoom (page 1) --------
- id: set_digital_zoom
  label: Set Digital Zoom
  kind: action
  command: "A3 {pos}"
  params:
    - name: pos
      type: string
      description: 3-digit hex digital zoom position '000' (wide) to 'FFF' (tele), no CR/LF
  notes: "Page 1. Device echoes '?' first; send 3-digit hex within 3 seconds. (Page 0 byte A3 = Get Focus Position.)"

- id: get_digital_zoom
  label: Get Digital Zoom
  kind: query
  command: "A4"
  params: []
  notes: "Page 1. Returns 3-digit hex '000' to 'FFF' + LF + CR. (Page 0 byte A4 = Set Focus Position.)"

# -------- Image Storing (page 1 except Freeze toggle) --------
- id: memory_store
  label: Memory Store
  kind: action
  command: "8C {slot}"
  params:
    - name: slot
      type: string
      description: Memory number 1-9 (single ASCII digit)
  notes: "Page 1. Device echoes '?' first; send ASCII digit within 3 seconds."

- id: memory_recall
  label: Memory Recall
  kind: action
  command: "8D {slot}"
  params:
    - name: slot
      type: string
      description: Memory number 1-9 (single ASCII digit)
  notes: "Page 1. Device echoes '?' first; send ASCII digit within 3 seconds."

- id: memory_off
  label: Memory Off (Live Image)
  kind: action
  command: "8E"
  params: []
  notes: "Page 1. Switches to live image."

- id: snapshot
  label: Snapshot (Store All Memories Sequentially)
  kind: action
  command: "8F"
  params: []
  notes: "Page 1. Stores one memory after another until all 9 are stored."

- id: show_all_toggle
  label: Show All On/Off
  kind: action
  command: "88"
  params: []
  notes: "Page 1. Toggles showing all stored images simultaneously."

- id: show_all_on
  label: Show All On
  kind: action
  command: "89"
  params: []
  notes: "Page 1."

- id: show_all_off
  label: Show All Off
  kind: action
  command: "8A"
  params: []
  notes: "Page 1."

- id: get_show_all
  label: Get Show All
  kind: query
  command: "8B"
  params: []
  notes: "Page 1. Returns '1' (active) or '0' (inactive) + LF + CR. (Page 0 byte 8B = Unlock Extra Menu.)"

- id: erase_memory
  label: Erase All Memories
  kind: action
  command: "A5"
  params: []
  notes: "Page 1."

- id: freeze_toggle
  label: Freeze On/Off
  kind: action
  command: "D7"
  params: []
  notes: "Page 0. Toggles freeze mode."

- id: freeze_on
  label: Freeze On
  kind: action
  command: "A6"
  params: []
  notes: "Page 1."

- id: freeze_off
  label: Freeze Off
  kind: action
  command: "A7"
  params: []
  notes: "Page 1."

- id: get_freeze
  label: Get Freeze
  kind: query
  command: "A8"
  params: []
  notes: "Page 1. Returns '1' (frozen) or '0' (live) + LF + CR."

# -------- Image On/Off (page 0) --------
- id: image_toggle
  label: Image Toggle On/Off
  kind: action
  command: "B9"
  params: []

- id: image_on
  label: Image On
  kind: action
  command: "C0"
  params: []

- id: image_off
  label: Image Off
  kind: action
  command: "C4"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  notes: "From command AB (page 0)."

- id: light_state
  type: enum
  values: [on, off]
  notes: "From command AC (page 0)."

- id: zoom_position
  type: string
  notes: "3-digit hex '000' (wide) to 'FFF' (tele) from command A1."

- id: focus_position
  type: string
  notes: "3-digit hex '000' (near) to 'FFF' (far) from command A3 (page 0)."

- id: digital_zoom_position
  type: string
  notes: "3-digit hex '000' to 'FFF' from command A4 (page 1)."

- id: iris_position
  type: string
  notes: "3-digit hex '000' (close) to 'FFF' (open) from command A5."

- id: auto_iris_state
  type: enum
  values: [on, off]
  notes: "From command A6."

- id: text_enhancer_state
  type: enum
  values: [on, off]
  notes: "From command A0 (page 1)."

- id: extern_state
  type: enum
  values: [active, inactive]
  notes: "From command 83 (page 1)."

- id: portrait_state
  type: enum
  values: ["0_deg", "minus_90_deg", "180_deg", "plus_90_deg"]
  notes: "From command 87. Pre firmware v2.03a: binary on/off."

- id: video_format
  type: enum
  values: [PAL, NTSC]
  notes: "From command 96 (page 1). Not on VZ-C12²."

- id: vga_resolution
  type: string
  notes: "Free-form resolution string from command 93 (page 1)."

- id: dvi_resolution
  type: string
  notes: "Free-form resolution string from command A9 (page 1)."

- id: positive_negative_mode
  type: enum
  values: [positive, negative, negative_blue]
  notes: "From command 9A (page 1)."

- id: black_white_mode
  type: enum
  values: [color, black_white]
  notes: "From command 9D (page 1)."

- id: show_all_state
  type: enum
  values: [on, off]
  notes: "From command 8B (page 1)."

- id: freeze_state
  type: enum
  values: [frozen, live]
  notes: "From command A8 (page 1)."

- id: key_lock_state
  type: enum
  values: [locked, unlocked]
  notes: "From command AE (page 0)."

- id: status_dump
  type: string
  notes: "Single-line all-settings string from command A0 (page 0). Format depends on model/firmware."

- id: version_info
  type: string
  notes: "From command 76: e.g. 'VZ-C32 V1.12b'."

- id: camera_status
  type: string
  notes: "Multi-line debug status from command 3F (requires debug mode FA)."
```

## Variables
```yaml
# UNRESOLVED: source does not expose continuous settable variables; all state
# is driven by action commands and observed via query commands. No section to populate.
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited events. The device replies
# to commands in the enabled reply mode but does not spontaneously push state
# changes. Custom Serial Mode echoes the currently-marked on-screen menu line
# on Data commands; treat that as command-driven, not event-driven.
```

## Macros
```yaml
# UNRESOLVED: source does not describe device-side macros. The Height
# Adjustment procedure (firmware v1.30a+, Custom Serial Mode) is a
# 4-step sequence the controller drives; it is a controller-side macro,
# not a device feature, so it is not enumerated here.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or
# power-on sequencing requirements. Relevant procedural notes from the source:
#   - The main power switch on the unit must be on before power_toggle (BA)
#     can take effect.
#   - Presets D5/E5-EE zoom to mechanical end-positions; physical clearances
#     around the working surface are the installer's responsibility.
#   - Lamp Change (B1) is a service operation; the source does not state
#     cooldown or replacement procedure details.
```

## Notes

**Two-page command protocol — the most important quirk.** Many opcode
bytes are reused with different meanings on page 0 vs page 1. Page 0 is
the default after power on; page 1 must be explicitly selected (command
31) and the device auto-returns to page 0 after the next control command.
An implementation MUST track the current page or behavior is undefined.

Reused opcodes (page 0 → page 1):
- `80`: Stop Zoom/Focus/Iris → Toggle Intern/Extern
- `81`: Start Zoom Wide → Extern On
- `82`: Start Zoom Tele → Intern On
- `83`: Start Focus Far → Get Extern
- `84`: Start Focus Near → Portrait Toggle
- `85`: Start Iris Open → Portrait On
- `86`: Start Iris Close → Portrait Off
- `8B`: Unlock Extra Menu → Get Show All
- `96`: Text Enhancer Toggle → Get Video
- `97`: White Balance → Switch Positive On
- `9A`: Recall Preset → Get Positive/Negative
- `9B`: Store Preset → Switch Color On
- `9C`: Reply Mode Off → Switch B/W On
- `9D`: Reply One Byte → Get B/W
- `9E`: Reply Two Bytes → Text Enhancer On
- `9F`: Reply String → Text Enhancer Off
- `A0`: Get Status → Get Text Enhancer
- `A3`: Get Focus Position → Set Digital Zoom
- `A4`: Set Focus Position → Get Digital Zoom
- `AB`: Get Power → VGA Resolution Down
- `AC`: Get Light → VGA Resolution Auto
- `AE`: Get Key Lock → DVI Resolution Down
- `AF`: Key Lock On → DVI Resolution AUTO

**Reply modes.** Default after mains power on is "no reply" (command `9C`).
Use `9D` / `9E` / `9F` to enable byte / two-byte / string reply modes.
The selected reply mode also applies to the command that selected it, so
`9E` itself receives a two-byte reply, and `9C` receives no reply.

**Baud rate.** Default 115200; older units default 19200. Selectable:
9600, 19200, 38400, 57600, 115200. Changed only via ExtraMenu → Serial
Port (requires Unlock Extra Menu `8B` on page 0, then Visualizer Menu
`CE`). There is no RS-232 command to change baud rate.

**Set / Recall commands with parameters.** Commands that take a 3-digit
hex value (set zoom / focus / iris / digital zoom position) or an ASCII
digit 1–9 (recall/store preset, memory store/recall) first echo a single
`?` byte and then expect the parameter within 3 seconds. No CR or LF
terminator is sent or expected.

**Position ranges are not contiguous.** Not all 000–FFF codes are
mechanically supported (source calls these "missing codes"). Reading a
position returns the exact code; setting moves to the nearest supported
position.

**Timing.** Several commands have long execution time (zoom, focus moves,
height adjustment, demo mode). Send Blank Echo (`20`, ASCII space)
between commands; the device echoes a blank when ready to accept the
next command.

**Custom Serial Mode** (firmware v1.30a+, commands `F1`/`F2`) is a
meta-mode where each Data up/down/left/right command echoes the currently
marked on-screen menu line back over RS-232. Used for the Height
Adjustment install procedure. Powering the unit off deactivates it.

**Firmware dependencies stated in source:**
- v1.20a: new resolutions added (XGA 16:9, WXGA/60, WSXGA/60, 720p/50, 720p/60, 1080p/50, 1080p/60).
- v1.30a: Custom Serial Mode (F1/F2) and Lamp Change command (B1).
- v2.03a: Get Portrait (87) returns 4-state angle code; SXGA+ resolution changes from 1360×1024 to 1400×1050.
- v2.04a: extended debug camera status output format (command `3F`).

**Connection.** 9-pin Sub-D; pins 2 (RxD), 3 (TxD), 5 (GND) only.
No hardware flow control, no XON/XOFF mentioned.

**Compatibility caveat from source.** This protocol is "upward compatible
to the one of the VZ-27plus/57plus except arm functions." The source does
NOT enumerate which commands fail on the older VZ-27plus/57plus vs succeed
on the VZ-C12/C12²/C32 — implementations targeting multiple series may
need to test-and-skip.

**Extended command set.** VZ-C12² (s/n 1009412+) and VZ-C32 (s/n 1011797+)
support an extended WolfVision command list at
`http://www.wolfvision.com/wolf/protocol_command_wolfvision/protocol_command.htm`,
which is NOT included in this document.

**Preset behaviour.** Pre-defined presets (D5, E5–EE) are not modifiable
and always set focus to the working plate, Auto Iris on, image on, Text
Enhancer off, with light on (except Slide preset EC which has light off).
User presets (recall 1–3 / save 1–3) store and recall: Zoom-Position,
Focus-Position, Auto Iris on/off, Iris-Position (if AI off), Image on/off,
Light on/off, Text Enhancer on/off.

<!-- UNRESOLVED: source does not state the full series-wide firmware
compatibility range; per-command firmware requirements are listed above
but the lower bound for this whole protocol version is not pinned. Source
also does not enumerate which VZ-27plus/57plus commands are NOT supported
on the VZ-C12/C12²/C32 series, and does not include the extended command
set for VZ-C12² (s/n 1009412+) or VZ-C32 (s/n 1011797+). -->

## Provenance

```yaml
source_domains:
  - wolfvision.com
source_urls:
  - https://wolfvision.com/wolf/serial_ceiling32.pdf
retrieved_at: 2026-04-30T04:32:44.618Z
last_checked_at: 2026-06-02T07:06:57.951Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:57.951Z
matched_actions: 131
action_count: 131
confidence: medium
summary: "All 131 spec actions matched verbatim against source command tables; transport parameters verified; full bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full-series firmware compatibility range not stated; per-command firmware requirements (v1.20a, v1.30a, v2.03a, v2.04a) listed in Notes."
- "source does not expose continuous settable variables; all state"
- "source does not describe unsolicited events. The device replies"
- "source does not describe device-side macros. The Height"
- "source contains no explicit safety warnings, interlocks, or"
- "source does not state the full series-wide firmware"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
