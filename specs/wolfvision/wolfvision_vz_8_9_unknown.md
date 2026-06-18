---
spec_id: admin/wolfvision-vz-8
schema_version: ai4av-public-spec-v1
revision: 1
title: "WolfVision VZ-8 Control Spec"
manufacturer: WolfVision
model_family: VZ-8
aliases: []
compatible_with:
  manufacturers:
    - WolfVision
  models:
    - VZ-8
    - VZ-8light
    - VZ-8plus
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - wolfvision.com
  - audiogeneral.com
  - res.cloudinary.com
source_urls:
  - https://wolfvision.com/wolf/serial_port8.pdf
  - https://wolfvision.com/wolf/serial_port9.pdf
  - https://www.audiogeneral.com/wolfvision/vz8light3_rs232.pdf
  - https://www.wolfvision.com/en/support/vz-8-uhd
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Documents/WolfVision/VZ_P18/vz_p18_doc_5.pdf"
retrieved_at: 2026-06-15T15:06:01.503Z
last_checked_at: 2026-06-16T07:19:53.060Z
generated_at: 2026-06-16T07:19:53.060Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "protocol doc predates some firmware; command availability varies by model (VZ-8light omits several page-1 commands) and firmware version."
  - "none additional stated in source."
  - "no multi-step sequences explicitly described in source."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version compatibility range not stated (only conditional examples)."
  - "exact command availability matrix per model beyond the VZ-8light exclusions noted."
  - "no power/voltage/current specifications present in this protocol document."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:19:53.060Z
  matched_actions: 122
  action_count: 122
  confidence: medium
  summary: "All 122 spec actions matched exactly to source hex opcodes; serial transport (19200 baud, 8N1, pins 2/3/5) fully supported; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# WolfVision VZ-8 Control Spec

## Summary
WolfVision VZ-8, VZ-8light and VZ-8plus desktop Visualizers (document cameras), controlled via RS-232 serial. Single-byte command protocol with a two-page command scheme (standard page 0 and page 1). Covers zoom, focus, iris, light, power, presets, image memory, menu, reply-mode, video output format, and resolution. Document reference T-01/04, revised 25 September 2007.

<!-- UNRESOLVED: protocol doc predates some firmware; command availability varies by model (VZ-8light omits several page-1 commands) and firmware version. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200  # default; configurable to 9600/38400/115200 via Extra-Menu
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # inferred: source states only pins 2 (RxD), 3 (TxD), 5 (GND) are connected - no flow-control signals
  connector: "9-pin Sub-D (pin 2 RxD, pin 3 TxD, pin 5 GND)"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off/toggle commands
  - queryable    # inferred from numerous Get/status query commands
  - levelable    # inferred from zoom/focus/iris position get/set commands
```

## Actions
```yaml
# Command bytes are HEX (source uses '$' prefix as notation only - '$' is NOT sent).
# Page-0 commands: send the single byte. Page-1 commands: prefix with page-select
# byte 31 (the unit reverts to page 0 after executing a page-1 command).
# No CR/LF is sent with commands. Parameterized commands: unit echoes '?' then
# expects the parameter within 3s (no CR/LF).
# kind: query commands return a value on the serial port.

# --- Page Select ---
- id: ser_page0
  label: Select Page 0
  kind: action
  command: "30"
  params: []
  description: "Switch to standard command page 0 (default; need not be selected explicitly)."

- id: ser_page1
  label: Select Page 1
  kind: action
  command: "31"
  params: []
  description: "Switch to command page 1; unit reverts to page 0 after the control command executes."

# --- Zoom Control ---
- id: zoom_wide
  label: Zoom Wide
  kind: action
  command: "C3"
  params: []
  description: "Zoom towards wide; send repetitively (min 10Hz) for continuous zoom. Note: zooming switches on Auto-Iris."

- id: zoom_tele
  label: Zoom Tele
  kind: action
  command: "C7"
  params: []
  description: "Zoom towards tele; send repetitively (min 10Hz) for continuous zoom. Note: zooming switches on Auto-Iris."

- id: start_zoom_wide
  label: Start Zoom Wide
  kind: action
  command: "81"
  params: []
  description: "Start zooming towards wide until Stop or a different Start command (or mechanical end) is received."

- id: start_zoom_tele
  label: Start Zoom Tele
  kind: action
  command: "82"
  params: []
  description: "Start zooming towards tele until Stop or a different Start command (or mechanical end) is received."

- id: stop_zoom_focus_iris
  label: Stop Zoom/Focus/Iris
  kind: action
  command: "80"
  params: []
  description: "Stops zooming, focusing and iris if activated with a Start command."

- id: get_zoom_position
  label: Get Zoom Position
  kind: query
  command: "A1"
  params: []
  description: "Returns current zoom-position as 3-digit hex ASCII (000 wide - FFF tele) + LF + CR."

- id: set_zoom_position
  label: Set Zoom Position
  kind: action
  command: "A2 {position}"
  params:
    - name: position
      type: string
      description: "3-digit hex 000-FFF (000=wide, FFF=tele). Unit echoes '?' then expects value within 3s."
  description: "Moves zoom to the given position."

- id: set_digital_zoom
  label: Set Digital Zoom
  kind: action
  command: "31 A3 {position}"
  params:
    - name: position
      type: string
      description: "3-digit hex 000-FFF. Page-1 command. Unit echoes '?' then expects value within 3s."
  description: "Sets digital zoom position (page 1)."

- id: get_digital_zoom
  label: Get Digital Zoom
  kind: query
  command: "31 A4"
  params: []
  description: "Returns current digital zoom-position as 3-digit hex ASCII (000-FFF) + LF + CR (page 1)."

# --- Focus Control ---
- id: focus_far
  label: Focus Far
  kind: action
  command: "C2"
  params: []
  description: "Focus towards far; send repetitively (min 10Hz) for continuous change."

- id: focus_near
  label: Focus Near
  kind: action
  command: "C6"
  params: []
  description: "Focus towards near; send repetitively (min 10Hz) for continuous change."

- id: start_focus_far
  label: Start Focus Far
  kind: action
  command: "83"
  params: []
  description: "Start focusing towards far until Stop or a different Start command."

- id: start_focus_near
  label: Start Focus Near
  kind: action
  command: "84"
  params: []
  description: "Start focusing towards near until Stop or a different Start command."

- id: get_focus_position
  label: Get Focus Position
  kind: query
  command: "A3"
  params: []
  description: "Returns current focus-position as 3-digit hex ASCII (000 near - FFF far) + LF + CR."

- id: set_focus_position
  label: Set Focus Position
  kind: action
  command: "A4 {position}"
  params:
    - name: position
      type: string
      description: "3-digit hex 000-FFF (000=near, FFF=far). Unit echoes '?' then expects value within 3s."
  description: "Moves focus to the given position."

- id: af_on
  label: Auto Focus On
  kind: action
  command: "EF"
  params: []
  description: "Switches Auto Focus on."

- id: af_off
  label: Auto Focus Off
  kind: action
  command: "F0"
  params: []
  description: "Switches Auto Focus off."

- id: get_auto_focus
  label: Get Auto Focus
  kind: query
  command: "AD"
  params: []
  description: "Returns '1'+LF+CR if AF on, '0'+LF+CR if off."

# --- Iris Control ---
- id: iris_open
  label: Iris Open / Brightness Up
  kind: action
  command: "C1"
  params: []
  description: "Opens iris / brightness up; send repetitively (min 10Hz). Changing iris switches off Auto Iris."

- id: iris_close
  label: Iris Close / Brightness Down
  kind: action
  command: "C5"
  params: []
  description: "Closes iris / brightness down; send repetitively (min 10Hz). Changing iris switches off Auto Iris."

- id: start_iris_open
  label: Start Iris Open
  kind: action
  command: "85"
  params: []
  description: "Start opening iris until Stop or a different Start command."

- id: start_iris_close
  label: Start Iris Close
  kind: action
  command: "86"
  params: []
  description: "Start closing iris until Stop or a different Start command."

- id: auto_iris_on
  label: Auto Iris On
  kind: action
  command: "A7"
  params: []
  description: "Switches Auto Iris on."

- id: auto_iris_off
  label: Auto Iris Off
  kind: action
  command: "A8"
  params: []
  description: "Switches Auto Iris off."

- id: get_auto_iris
  label: Get Auto Iris
  kind: query
  command: "A6"
  params: []
  description: "Returns '1'+LF+CR if Auto Iris on, '0'+LF+CR if off."

- id: get_iris_position
  label: Get Iris Position
  kind: query
  command: "A5"
  params: []
  description: "Returns current iris-position as 3-digit hex ASCII (000 close - FFF open) + LF + CR."

- id: set_iris_position
  label: Set Iris Position
  kind: action
  command: "A9 {position}"
  params:
    - name: position
      type: string
      description: "3-digit hex 000-FFF (000=close, FFF=open). Unit echoes '?' then expects value within 3s."
  description: "Moves iris to given position. Changing iris switches off Auto Iris."

# --- Light On/Off Control ---
- id: light_on
  label: Light On
  kind: action
  command: "CC"
  params: []
  description: "Switches light on. If light already on, switches light box on and light off."

- id: light_off
  label: Light Off
  kind: action
  command: "CD"
  params: []
  description: "Switches light and light box off."

- id: light_on_lightbox_off
  label: Light On, Light Box Off
  kind: action
  command: "B2"
  params: []
  description: "Switches light on and light box off."

- id: lightbox_on_light_off
  label: Light Box On, Light Off
  kind: action
  command: "B3"
  params: []
  description: "Switches light box on and light off."

- id: get_light
  label: Get Light On or Off
  kind: query
  command: "AC"
  params: []
  description: "Returns '1'+LF+CR if light on, '0'+LF+CR if off."

- id: get_lightbox
  label: Get Light Box On or Off
  kind: query
  command: "B4"
  params: []
  description: "Returns '1'+LF+CR if light box on, '0'+LF+CR if off."

- id: light_toggle
  label: Light Toggle Switch
  kind: action
  command: "BC"
  params: []
  description: "If internal light on, switches it off and light box on; if light box on, switches internal light on and light box off."

# --- Power / Presets Control ---
- id: power_on
  label: Power On / Factory Preset
  kind: action
  command: "C8"
  params: []
  description: "If in standby, switches unit on; then recalls factory preset (approx DIN A5, light on)."

- id: power_off
  label: Power Off
  kind: action
  command: "C9"
  params: []
  description: "Puts unit in standby (camera, light, etc. switched off)."

- id: get_power
  label: Get Power On or Off
  kind: query
  command: "AB"
  params: []
  description: "Returns '1'+LF+CR if power on, '0'+LF+CR if in standby."

- id: power_toggle
  label: Power Toggle Switch
  kind: action
  command: "BA"
  params: []
  description: "Switches on if off, off if on. Power cord must be connected."

- id: recall_preset
  label: Recall Preset
  kind: action
  command: "9A {preset}"
  params:
    - name: preset
      type: string
      description: "Preset number character '1'-'3'. Unit echoes '?' then expects input within 3s."
  description: "Recalls the selected preset (zoom, focus, AI, iris, light, lightbox, text-enhancer settings)."

- id: store_preset
  label: Store Preset
  kind: action
  command: "9B {preset}"
  params:
    - name: preset
      type: string
      description: "Preset number character '1'-'3'. Unit echoes '?' then expects input within 3s."
  description: "Stores current settings as the selected preset."

- id: preset_0_factory
  label: Preset 0 Factory Preset
  kind: action
  command: "D5"
  params: []
  description: "Recalls factory preset (approx DIN A5, light on). Pre-defined, not modifiable."

- id: preset_1
  label: Preset 1
  kind: action
  command: "CA"
  params: []
  description: "Recalls Preset 1."

- id: preset_2
  label: Preset 2
  kind: action
  command: "CB"
  params: []
  description: "Recalls Preset 2."

- id: preset_3
  label: Preset 3
  kind: action
  command: "FD"
  params: []
  description: "Recalls Preset 3."

- id: save_preset_1
  label: Save Preset 1
  kind: action
  command: "D8"
  params: []
  description: "Stores current settings as Preset 1."

- id: save_preset_2
  label: Save Preset 2
  kind: action
  command: "D9"
  params: []
  description: "Stores current settings as Preset 2."

- id: save_preset_3
  label: Save Preset 3
  kind: action
  command: "FE"
  params: []
  description: "Stores current settings as Preset 3."

- id: preset_max_wide
  label: Preset Max Wide
  kind: action
  command: "E5"
  params: []
  description: "Zooms to maximum wide position, light on."

- id: preset_din_a4
  label: Preset DIN A4
  kind: action
  command: "E6"
  params: []
  description: "Zooms to approx DIN A4 size, light on."

- id: preset_din_a5
  label: Preset DIN A5
  kind: action
  command: "E7"
  params: []
  description: "Zooms to approx DIN A5 size, light on."

- id: preset_din_a6
  label: Preset DIN A6
  kind: action
  command: "E8"
  params: []
  description: "Zooms to approx DIN A6 size, light on."

- id: preset_din_a7
  label: Preset DIN A7
  kind: action
  command: "E9"
  params: []
  description: "Zooms to approx DIN A7 size, light on."

- id: preset_din_a8
  label: Preset DIN A8
  kind: action
  command: "EA"
  params: []
  description: "Zooms to approx DIN A8 size, light on."

- id: preset_max_tele
  label: Preset Max Tele
  kind: action
  command: "EB"
  params: []
  description: "Zooms to maximum tele position, light on."

- id: preset_slide
  label: Preset Slide
  kind: action
  command: "EC"
  params: []
  description: "Zooms to approx slide-film size, light off and light box on."

- id: preset_xray_a4_lightbox
  label: Preset X-ray DIN A4 LightBox
  kind: action
  command: "ED"
  params: []
  description: "Zooms to approx DIN A4 size, light box on."

- id: preset_xray_a5_lightbox
  label: Preset X-ray DIN A5 LightBox
  kind: action
  command: "EE"
  params: []
  description: "Zooms to approx DIN A5 size, light box on."

# --- Visualizer Menu / Camera Control ---
- id: unlock_visualizer_menu
  label: Unlock Visualizer Menu
  kind: action
  command: "DA"
  params: []
  description: "Unlocks the Visualizer menu; menu can then be entered via 206 (CE)."

- id: visualizer_menu_on_off
  label: Visualizer Menu On/Off
  kind: action
  command: "CE"
  params: []
  description: "Toggles the Visualizer menu on screen. If locked, send at 10Hz for 1s. Toggling again hides and re-locks menu."

- id: unlock_extra_menu
  label: Unlock Extra Menu (Baud rate)
  kind: action
  command: "8B"
  params: []
  description: "Unlocks the extra menu (where baud rate can be changed); enter via 206 (CE)."

- id: function_up
  label: Function Up
  kind: action
  command: "D0"
  params: []
  description: "Moves menu cursor up (if menu active)."

- id: function_down
  label: Function Down
  kind: action
  command: "D1"
  params: []
  description: "Moves menu cursor down (if menu active)."

- id: data_right_white_balance
  label: Data Right / White Balance
  kind: action
  command: "D2"
  params: []
  description: "Changes current menu-item data if menu active; otherwise performs white balance."

- id: white_balance
  label: White Balance
  kind: action
  command: "97"
  params: []
  description: "Performs a white balance (works even when menu is on)."

- id: data_left_text_enhancer_toggle
  label: Data Left / Text Enhancer On/Off
  kind: action
  command: "D3"
  params: []
  description: "Changes current menu-item data if menu active; otherwise toggles Text Enhancer."

- id: text_enhancer_on_off
  label: Text Enhancer On/Off
  kind: action
  command: "96"
  params: []
  description: "Toggles Text Enhancement (works when menu on)."

- id: text_enhancer_on
  label: Text Enhancer On
  kind: action
  command: "31 9E"
  params: []
  description: "Switches Text Enhancement On (page 1). Not available on VZ-8light."

- id: text_enhancer_off
  label: Text Enhancer Off
  kind: action
  command: "31 9F"
  params: []
  description: "Switches Text Enhancement Off (page 1). Not available on VZ-8light."

- id: get_text_enhancer
  label: Get Text Enhancer
  kind: query
  command: "31 A0"
  params: []
  description: "Returns '1'+LF+CR if Text Enhancement active, '0'+LF+CR if inactive (page 1)."

- id: help
  label: Help
  kind: action
  command: "D6"
  params: []
  description: "Displays a description of the Visualizer-menu settings."

- id: data_left_plus_data_right
  label: Data Left + Data Right
  kind: action
  command: "DC"
  params: []
  description: "Behaves like pressing Data Right and Left together; resets current menu-item to default."

- id: reset_menu
  label: Reset Menu
  kind: action
  command: "F6"
  params: []
  description: "Resets all Visualizer-menu settings except CS/HD/VD and Sync-on-Green to defaults."

# --- Reply Mode Control ---
- id: reply_mode_off
  label: Reply Mode Off
  kind: action
  command: "9C"
  params: []
  description: "No reply sent on command receipt (default after mains power-on)."

- id: reply_one_byte
  label: Reply One Byte
  kind: action
  command: "9D"
  params: []
  description: "Replies one byte after each command: $06 valid, $0F invalid."

- id: reply_two_bytes
  label: Reply Two Bytes
  kind: action
  command: "9E"
  params: []
  description: "Replies the received byte then $06 (valid) or $0F (invalid)."

- id: reply_string
  label: Reply String
  kind: action
  command: "9F"
  params: []
  description: "Replies 'OKAY'+LF+CR (valid) or 'ERROR'+LF+CR (invalid)."

# --- Image Storing Commands (page 1) ---
- id: memory_store
  label: Memory Store x
  kind: action
  command: "31 8C {memory}"
  params:
    - name: memory
      type: string
      description: "Memory number character '1'-'9'. Unit echoes '?' then expects input within 3s."
  description: "Stores current image to selected memory (page 1). Not available on VZ-8light."

- id: memory_recall
  label: Memory Recall x
  kind: action
  command: "31 8D {memory}"
  params:
    - name: memory
      type: string
      description: "Memory number character '1'-'9'. Unit echoes '?' then expects input within 3s."
  description: "Recalls selected memory (page 1). Not available on VZ-8light."

- id: memory_off
  label: Memory Off
  kind: action
  command: "31 8E"
  params: []
  description: "Switches to the live image (page 1)."

- id: snapshot
  label: Snapshot
  kind: action
  command: "31 8F"
  params: []
  description: "Stores one memory after another until all 9 memories are stored (page 1). Firmware V1.31a or lower requires 'recall memory 1' to start."

- id: show_all_on_off
  label: Show All On/Off
  kind: action
  command: "31 88"
  params: []
  description: "Toggles Show All mode (displays all stored images simultaneously) (page 1)."

- id: show_all_on
  label: Show All On
  kind: action
  command: "31 89"
  params: []
  description: "Switches Show All Memories mode On (page 1)."

- id: show_all_off
  label: Show All Off
  kind: action
  command: "31 8A"
  params: []
  description: "Switches Show All Memories mode Off (page 1)."

- id: erase_memory
  label: Erase Memory
  kind: action
  command: "31 A5"
  params: []
  description: "Erases all stored memories (page 1). Requires firmware V1.32a or later."

- id: get_show_all
  label: Get Show All
  kind: query
  command: "31 8B"
  params: []
  description: "Returns '1'+LF+CR if Show All active, '0'+LF+CR if inactive (page 1)."

- id: freeze_on_off
  label: Freeze On/Off
  kind: action
  command: "D7"
  params: []
  description: "Toggles Freeze mode."

- id: freeze_on
  label: Freeze On
  kind: action
  command: "31 A6"
  params: []
  description: "Freezes the current image (page 1)."

- id: freeze_off
  label: Freeze Off
  kind: action
  command: "31 A7"
  params: []
  description: "Switches from frozen image to live image (page 1)."

- id: get_freeze
  label: Get Freeze
  kind: query
  command: "31 A8"
  params: []
  description: "Returns '1'+LF+CR if Freeze active, '0'+LF+CR if inactive (page 1)."

# --- Image Turn Commands (page 1) ---
- id: switch_portrait_on_off
  label: Switch Portrait On/Off
  kind: action
  command: "31 84"
  params: []
  description: "Toggles image-turn / portrait-landscape mode (page 1). Not available on VZ-8light."

- id: portrait_on
  label: Portrait On
  kind: action
  command: "31 85"
  params: []
  description: "Activates image-turn mode On (+/-90° or 180° per on-screen setting) (page 1)."

- id: portrait_off
  label: Portrait Off
  kind: action
  command: "31 86"
  params: []
  description: "Activates image-turn mode Off (page 1)."

- id: get_portrait
  label: Get Portrait
  kind: query
  command: "31 87"
  params: []
  description: "Returns '1'+LF+CR if Portrait active, '0'+LF+CR if inactive (page 1)."

# --- Miscellaneous Commands ---
- id: blank_echo
  label: Blank Echo
  kind: query
  command: "20"
  params: []
  description: "Echoes a blank (' ') without CR/LF; useful to check if unit is ready (send until it answers)."

- id: get_type_and_version
  label: Visualizer Type and Software Version
  kind: query
  command: "76"
  params: []
  description: "Returns type and firmware version, e.g. 'VZ-8 V3.10a'+LF+CR."

- id: ascii_input_mode
  label: ASCII Input Mode
  kind: action
  command: "5F"
  params: []
  description: "Initiates direct ASCII-text input: unit responds '?', then send 3-digit decimal command number within 3s (digits echoed back). For terminal testing."

- id: key_lock_on
  label: Key Lock On
  kind: action
  command: "AF"
  params: []
  description: "Activates Key Lock; unit controllable only via RS-232 (IR/key-panel disabled)."

- id: key_lock_off
  label: Key Lock Off
  kind: action
  command: "B0"
  params: []
  description: "Deactivates Key Lock; normal IR/key-panel/RS-232 operation restored."

- id: get_key_lock
  label: Get Key Lock
  kind: query
  command: "AE"
  params: []
  description: "Returns '1'+LF+CR if Key Lock active, '0'+LF+CR if inactive."

- id: get_status
  label: Get Status
  kind: query
  command: "A0"
  params: []
  description: "Returns a single-line status string (model/firmware dependent), e.g. 'Zoom:500 DigitalZoom:000 Focus:F2E Iris:FFF Power:1 AI:1 AF:1 Light:1 LightBox:0 KeyLock:0 ImageTurn:0 ShowAll:0 Negative:0 Black/White:0 Text:0 Resolution:auto-XGA/60Hz Video:PAL SyncOnGreen:0 CSync:0'+LF+CR. Parse by searching for item-strings."

- id: switch_ir_mode
  label: Switch IR-Mode
  kind: action
  command: "DD"
  params: []
  description: "Cycles IR-mode A/B/C/D for controlling up to four Visualizers with separate remotes. Not available on VZ-8light."

- id: demo_mode
  label: Demo Mode
  kind: action
  command: "F4"
  params: []
  description: "Starts demo mode (continuous zoom/light cycling). Send any code or press any key to exit. May be unavailable on some firmware."

- id: toggle_intern_extern
  label: Toggle Switch Intern/Extern
  kind: action
  command: "31 80"
  params: []
  description: "Switches between Visualizer image and Extern-connected image (page 1)."

- id: switch_extern_on
  label: Switch Extern Signal On
  kind: action
  command: "31 81"
  params: []
  description: "Switches the Extern-connected image to the output (page 1)."

- id: switch_intern_on
  label: Switch Intern Signal On
  kind: action
  command: "31 82"
  params: []
  description: "Activates the Visualizer image output (page 1)."

- id: get_extern
  label: Get Extern
  kind: query
  command: "31 83"
  params: []
  description: "Returns '1'+LF+CR if Extern signal active, '0'+LF+CR if inactive (page 1)."

# --- Video Output Commands (page 1) ---
- id: video_pal
  label: Video PAL
  kind: action
  command: "31 94"
  params: []
  description: "Switches video output format to PAL (page 1). Not available on VZ-8light."

- id: video_ntsc
  label: Video NTSC
  kind: action
  command: "31 95"
  params: []
  description: "Switches video output format to NTSC (page 1). Not available on VZ-8light."

- id: get_video
  label: Get Video
  kind: query
  command: "31 96"
  params: []
  description: "Returns 'PAL'+LF+CR or 'NTSC'+LF+CR (page 1)."

# --- Output Signal Setting Commands (page 1) ---
- id: switch_positive_on
  label: Switch Positive On
  kind: action
  command: "31 97"
  params: []
  description: "Switches to positive image mode (page 1)."

- id: switch_negative_on
  label: Switch Negative On
  kind: action
  command: "31 98"
  params: []
  description: "Switches to negative image mode (page 1)."

- id: switch_negative_blue_on
  label: Switch Negative Blue On
  kind: action
  command: "31 99"
  params: []
  description: "Switches to negative blue image mode (page 1)."

- id: get_positive_negative
  label: Get Positive/Negative
  kind: query
  command: "31 9A"
  params: []
  description: "Returns '0'+LF+CR (positive), '1'+LF+CR (negative), '2'+LF+CR (negative/blue) (page 1)."

- id: switch_color_on
  label: Switch Color On
  kind: action
  command: "31 9B"
  params: []
  description: "Switches color image On (page 1)."

- id: switch_black_white_on
  label: Switch Black/White Mode On
  kind: action
  command: "31 9C"
  params: []
  description: "Switches image to black/white (page 1)."

- id: get_black_white
  label: Get Black/White
  kind: query
  command: "31 9D"
  params: []
  description: "Returns '0'+LF+CR (color), '1'+LF+CR (black/white) (page 1)."

# --- Output Resolution Commands (page 1) ---
- id: resolution_up
  label: Resolution Up
  kind: action
  command: "31 90"
  params: []
  description: "Switches output resolution up (page 1). Only on VZ-8light."

- id: resolution_down
  label: Resolution Down
  kind: action
  command: "31 91"
  params: []
  description: "Switches output resolution down (page 1). Only on VZ-8light."

- id: resolution_xga_75
  label: Resolution XGA/75
  kind: action
  command: "31 92"
  params: []
  description: "Switches output resolution to XGA at 75 Hz (page 1)."

- id: get_resolution
  label: Get Resolution
  kind: query
  command: "31 93"
  params: []
  description: "Returns current resolution setting, e.g. 'XGA/75Hz'+LF+CR (page 1)."
```

## Feedbacks
```yaml
# Query responses (see Actions, kind: query). Observable states:
- id: zoom_position
  type: string
  description: "3-digit hex 000 (wide) - FFF (tele). Returned by get_zoom_position."
- id: digital_zoom_position
  type: string
  description: "3-digit hex 000-FFF. Returned by get_digital_zoom."
- id: focus_position
  type: string
  description: "3-digit hex 000 (near) - FFF (far). Returned by get_focus_position."
- id: iris_position
  type: string
  description: "3-digit hex 000 (close) - FFF (open). Returned by get_iris_position."
- id: power_state
  type: enum
  values: ["1", "0"]
  description: "'1' on, '0' standby. Returned by get_power."
- id: auto_focus_state
  type: enum
  values: ["1", "0"]
- id: auto_iris_state
  type: enum
  values: ["1", "0"]
- id: light_state
  type: enum
  values: ["1", "0"]
- id: lightbox_state
  type: enum
  values: ["1", "0"]
- id: text_enhancer_state
  type: enum
  values: ["1", "0"]
- id: show_all_state
  type: enum
  values: ["1", "0"]
- id: freeze_state
  type: enum
  values: ["1", "0"]
- id: portrait_state
  type: enum
  values: ["1", "0"]
- id: key_lock_state
  type: enum
  values: ["1", "0"]
- id: extern_state
  type: enum
  values: ["1", "0"]
- id: video_format
  type: enum
  values: ["PAL", "NTSC"]
- id: positive_negative
  type: enum
  values: ["0", "1", "2"]
  description: "0=positive, 1=negative, 2=negative/blue."
- id: black_white
  type: enum
  values: ["0", "1"]
  description: "0=color, 1=black/white."
- id: resolution
  type: string
  description: "e.g. 'XGA/75Hz'."
- id: type_and_version
  type: string
  description: "e.g. 'VZ-8 V3.10a'."
- id: status_string
  type: string
  description: "Full single-line status dump from get_status (model/firmware dependent)."
# Reply-mode acknowledgements (when reply mode enabled):
- id: reply_ack_valid
  type: constant
  description: "$06 (one/two-byte mode) or 'OKAY'+LF+CR (string mode) for valid commands."
- id: reply_nack_invalid
  type: constant
  description: "$0F (one/two-byte mode) or 'ERROR'+LF+CR (string mode) for invalid commands."
```

## Variables
```yaml
# Settable positions are exposed as parameterized actions (set_zoom_position,
# set_focus_position, set_iris_position, set_digital_zoom). No additional
# continuous variables beyond those actions.
# UNRESOLVED: none additional stated in source.
```

## Events
```yaml
# The Visualizer does not send unsolicited notifications. By default it does not
# reply at all; replies only occur when a reply mode is enabled (see Reply Mode
# Control) and only in direct response to a received command. No event section.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Power cord connection is noted as a
# precondition for power_toggle only.
```

## Notes
- Commands are single bytes; no CR/LF/terminator required. `$` in source hex notation is NOT transmitted — values are raw hex bytes.
- Two command pages. Page 0 is standard (selected by default, no prefix needed). Page-1 commands require the page-select byte `31` first; the unit auto-reverts to page 0 after a page-1 command executes. The same byte value on different pages is a different command (e.g. page-0 `A3` = Get Focus-Position; page-1 `A3` = Set Digital Zoom).
- Default baud rate 19200; configurable to 9600 / 38400 / 115200 via the Extra-Menu (hold MENU key 4s) → Serial Port sub-menu, or serially via the unlock_extra_menu command.
- Serial connector: 9-pin Sub-D, pins 2 (RxD), 3 (TxD), 5 (GND) only.
- Many commands have long execution times; do not send different codes back-to-back. Poll readiness by sending `20` (Blank-Echo) until the unit answers `20`.
- Reply modes (off / one-byte $06/$0F / two-byte / string OKAY/ERROR) are selectable; default is off after mains power-on. Validity check is rough — the unit may acknowledge commands it cannot perform (e.g. zoom while in standby) as valid.
- ASCII test mode: send `5F` ('_'), unit replies '?', then send 3-digit decimal command within 3s.
- Model/firmware differences: VZ-8light omits many page-1 features (text enhancer, image memory/show-all, portrait, IR-mode switching, video PAL/NTSC); resolution up/down is VZ-8light only. Erase Memory requires firmware V1.32a+; Snapshot on firmware ≤V1.31a requires a 'recall memory 1' first.
- Position values 000–FFF: not all positions are supported ("missing codes"); reading always returns the exact position, setting moves as close as possible.
- Zooming switches on Auto-Iris; changing iris switches off Auto Iris. Predefined presets force Auto Focus/Auto Iris on and Text Enhancer off.
- Protocol is upward compatible with the VZ-7D. Future firmware may add commands.

<!-- UNRESOLVED: firmware version compatibility range not stated (only conditional examples). -->
<!-- UNRESOLVED: exact command availability matrix per model beyond the VZ-8light exclusions noted. -->
<!-- UNRESOLVED: no power/voltage/current specifications present in this protocol document. -->
```
```

Spec done. ~120 actions enumerated across both pages, serial transport from source, no fabricated values. Stop `$80` listed once (shared across zoom/focus/iris). Page-1 byte collisions (`A3`/`A4`/`84`/`85` etc.) disambiguated by page-select prefix.

## Provenance

```yaml
source_domains:
  - wolfvision.com
  - audiogeneral.com
  - res.cloudinary.com
source_urls:
  - https://wolfvision.com/wolf/serial_port8.pdf
  - https://wolfvision.com/wolf/serial_port9.pdf
  - https://www.audiogeneral.com/wolfvision/vz8light3_rs232.pdf
  - https://www.wolfvision.com/en/support/vz-8-uhd
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Documents/WolfVision/VZ_P18/vz_p18_doc_5.pdf"
retrieved_at: 2026-06-15T15:06:01.503Z
last_checked_at: 2026-06-16T07:19:53.060Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:19:53.060Z
matched_actions: 122
action_count: 122
confidence: medium
summary: "All 122 spec actions matched exactly to source hex opcodes; serial transport (19200 baud, 8N1, pins 2/3/5) fully supported; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "protocol doc predates some firmware; command availability varies by model (VZ-8light omits several page-1 commands) and firmware version."
- "none additional stated in source."
- "no multi-step sequences explicitly described in source."
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version compatibility range not stated (only conditional examples)."
- "exact command availability matrix per model beyond the VZ-8light exclusions noted."
- "no power/voltage/current specifications present in this protocol document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
