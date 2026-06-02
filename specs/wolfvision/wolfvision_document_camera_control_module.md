---
spec_id: admin/wolfvision-vz-c12-c32-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "WolfVision VZ-C12 / VZ-C12² / VZ-C12³ / VZ-C32 / VZ-C32³ Control Spec"
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
retrieved_at: 2026-04-30T04:32:42.910Z
last_checked_at: 2026-06-02T07:06:57.213Z
generated_at: 2026-06-02T07:06:57.213Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no Ethernet/IP variant documented in this source. Source is strictly RS-232 (T-05/07)."
  - "- Minimum required firmware version for the base command set (not stated)."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:57.213Z
  matched_actions: 131
  action_count: 131
  confidence: medium
  summary: "All 131 authoritative spec actions matched literally in source; transport parameters fully verified; command fidelity confirmed. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# WolfVision VZ-C12 / VZ-C12² / VZ-C12³ / VZ-C32 / VZ-C32³ Control Spec

## Summary
RS-232 single-byte control protocol for the WolfVision VZ-C12 / C12² / C12³ / C32 / C32³ Visualizer (document camera) families. Two command pages (page 0 standard, page 1 extended) cover zoom, focus, iris, light, power, presets, image turn, video output, resolution, image store, and signal routing.

<!-- UNRESOLVED: no Ethernet/IP variant documented in this source. Source is strictly RS-232 (T-05/07). -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # default per source; 19200 on older units; user-changeable 9600/19200/38400/57600/115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source mentions no handshake lines; pins 2 (RxD), 3 (TxD), 5 (GND) only
  connector: DE-9 (Sub-D 9-pin)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from Power on/off, toggle, standby commands
- queryable       # inferred from many Get_* status queries
- levelable       # inferred from zoom/focus/iris position set/get
- routable        # inferred from Intern/Extern signal switching
```

## Actions
```yaml
# Page-0 commands may be sent directly. Page-1 commands require sending the
# page-select byte (0x31) first; the wire sequence is shown as "31 XX".
# Set-position commands expect a "?" prompt + 3 hex digits from controller.

# --- Page select ---
- id: select_page_0
  label: Select Page 0 (standard)
  kind: action
  command: "30"        # dec 048 - SER_Page0
  params: []
- id: select_page_1
  label: Select Page 1 (extended)
  kind: action
  command: "31"        # dec 049 - SER_Page1; auto-returns to page 0 after the next command
  params: []

# --- Zoom (page 0) ---
- id: zoom_wide
  label: Zoom Wide (step)
  kind: action
  command: "C3"        # dec 195 - send repetitively at min 10 Hz for continuous motion
  params: []
- id: zoom_tele
  label: Zoom Tele (step)
  kind: action
  command: "C7"        # dec 199
  params: []
- id: start_zoom_wide
  label: Start Zoom Wide (continuous)
  kind: action
  command: "81"        # dec 129
  params: []
- id: start_zoom_tele
  label: Start Zoom Tele (continuous)
  kind: action
  command: "82"        # dec 130
  params: []
- id: get_zoom_position
  label: Get Zoom Position
  kind: query
  command: "A1"        # dec 161 - returns 3-digit hex '000'..'FFF' + LF + CR
  params: []
- id: set_zoom_position
  label: Set Zoom Position
  kind: action
  command: "A2"        # dec 162 - echoes '?'; controller sends 3 hex digits within 3 s
  params:
    - name: position
      type: string
      description: 3-digit hex in range '000' (wide) to 'FFF' (tele)
- id: set_digital_zoom
  label: Set Digital Zoom
  kind: action
  command: "31 A3"     # dec 163 - page 1
  params:
    - name: position
      type: string
      description: 3-digit hex '000'..'FFF'
- id: get_digital_zoom
  label: Get Digital Zoom
  kind: query
  command: "31 A4"     # dec 164 - page 1
  params: []

# --- Focus (page 0) ---
- id: focus_far
  label: Focus Far (step)
  kind: action
  command: "C2"        # dec 194
  params: []
- id: focus_near
  label: Focus Near (step)
  kind: action
  command: "C6"        # dec 198
  params: []
- id: start_focus_far
  label: Start Focus Far (continuous)
  kind: action
  command: "83"        # dec 131
  params: []
- id: start_focus_near
  label: Start Focus Near (continuous)
  kind: action
  command: "84"        # dec 132
  params: []
- id: stop_zoom_focus_iris
  label: Stop Zoom/Focus/Iris
  kind: action
  command: "80"        # dec 128
  params: []
- id: get_focus_position
  label: Get Focus Position
  kind: query
  command: "A3"        # dec 163 (page 0) - returns 3-digit hex '000'..'FFF' + LF + CR
  params: []
- id: set_focus_position
  label: Set Focus Position
  kind: action
  command: "A4"        # dec 164 (page 0) - echoes '?'; controller sends 3 hex digits
  params:
    - name: position
      type: string
      description: 3-digit hex '000' (near) to 'FFF' (far)
- id: one_push_auto_focus
  label: One-Push Auto Focus
  kind: action
  command: "F9"        # dec 249
  params: []

# --- Iris (page 0) ---
- id: iris_open
  label: Iris Open / Brightness Up (step)
  kind: action
  command: "C1"        # dec 193
  params: []
- id: iris_close
  label: Iris Close / Brightness Down (step)
  kind: action
  command: "C5"        # dec 197
  params: []
- id: start_iris_open
  label: Start Iris Open
  kind: action
  command: "85"        # dec 133
  params: []
- id: start_iris_close
  label: Start Iris Close
  kind: action
  command: "86"        # dec 134
  params: []
- id: auto_iris_on
  label: Auto Iris On
  kind: action
  command: "A7"        # dec 167
  params: []
- id: auto_iris_off
  label: Auto Iris Off
  kind: action
  command: "A8"        # dec 168
  params: []
- id: get_auto_iris
  label: Get Auto Iris
  kind: query
  command: "A6"        # dec 166 - returns '1'+LF+CR (on) or '0'+LF+CR (off)
  params: []
- id: get_iris_position
  label: Get Iris Position
  kind: query
  command: "A5"        # dec 165 - returns 3-digit hex '000' (close) .. 'FFF' (open) + LF + CR
  params: []
- id: set_iris_position
  label: Set Iris Position
  kind: action
  command: "A9"        # dec 169 - echoes '?'; controller sends 3 hex digits
  params:
    - name: position
      type: string
      description: 3-digit hex '000' (close) to 'FFF' (open)

# --- Light (page 0) ---
- id: light_off
  label: Light Off
  kind: action
  command: "CD"        # dec 205
  params: []
- id: light_on
  label: Light On
  kind: action
  command: "B2"        # dec 178
  params: []
- id: get_light
  label: Get Light On/Off
  kind: query
  command: "AC"        # dec 172 - returns '1'+LF+CR (on) or '0'+LF+CR (off)
  params: []
- id: lamp_change
  label: Lamp Change
  kind: action
  command: "B1"        # dec 177 - replies "Perform Lampchange...Changed to Lamp1" (or Lamp2)
  notes: "Available with firmware v1.30a and later."
  params: []

# --- Power & presets (page 0) ---
- id: power_on
  label: Power On (Factory Preset)
  kind: action
  command: "C8"        # dec 200
  params: []
- id: power_off
  label: Power Off (Standby)
  kind: action
  command: "C9"        # dec 201
  params: []
- id: get_power
  label: Get Power State
  kind: query
  command: "AB"        # dec 171 - returns '1'+LF+CR (on) or '0'+LF+CR (standby)
  params: []
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "BA"        # dec 186
  params: []
- id: recall_preset
  label: Recall Preset (indexed)
  kind: action
  command: "9A"        # dec 154 - echoes '?'; controller sends '1'..'9' within 3 s
  params:
    - name: index
      type: string
      description: Preset number '1'..'9'
- id: store_preset
  label: Store Preset (indexed)
  kind: action
  command: "9B"        # dec 155 - echoes '?'; controller sends '1'..'9' within 3 s
  params:
    - name: index
      type: string
      description: Preset number '1'..'9'
- id: preset_factory
  label: Preset 0 (Factory)
  kind: action
  command: "D5"        # dec 213
  params: []
- id: preset_1
  label: Preset 1
  kind: action
  command: "CA"        # dec 202
  params: []
- id: preset_2
  label: Preset 2
  kind: action
  command: "CB"        # dec 203
  params: []
- id: preset_3
  label: Preset 3
  kind: action
  command: "FD"        # dec 253
  params: []
- id: save_preset_1
  label: Save Preset 1
  kind: action
  command: "D8"        # dec 216
  params: []
- id: save_preset_2
  label: Save Preset 2
  kind: action
  command: "D9"        # dec 217
  params: []
- id: save_preset_3
  label: Save Preset 3
  kind: action
  command: "FE"        # dec 254
  params: []
- id: preset_max_wide
  label: Preset Max Wide
  kind: action
  command: "E5"        # dec 229
  params: []
- id: preset_din_a4
  label: Preset DIN A4
  kind: action
  command: "E6"        # dec 230
  params: []
- id: preset_din_a5
  label: Preset DIN A5
  kind: action
  command: "E7"        # dec 231
  params: []
- id: preset_din_a6
  label: Preset DIN A6
  kind: action
  command: "E8"        # dec 232
  params: []
- id: preset_din_a7
  label: Preset DIN A7
  kind: action
  command: "E9"        # dec 233
  params: []
- id: preset_din_a8
  label: Preset DIN A8
  kind: action
  command: "EA"        # dec 234
  params: []
- id: preset_max_tele
  label: Preset Max Tele
  kind: action
  command: "EB"        # dec 235
  params: []
- id: preset_slide
  label: Preset Slide (light off)
  kind: action
  command: "EC"        # dec 236
  params: []
- id: preset_xray_din_a4
  label: Preset X-ray DIN A4
  kind: action
  command: "ED"        # dec 237
  params: []
- id: preset_xray_din_a5
  label: Preset X-ray DIN A5
  kind: action
  command: "EE"        # dec 238
  params: []

# --- Visualizer menu / camera (page 0 unless noted) ---
- id: unlock_visualizer_menu
  label: Unlock Visualizer Menu
  kind: action
  command: "DA"        # dec 218
  params: []
- id: visualizer_menu_toggle
  label: Visualizer Menu On/Off
  kind: action
  command: "CE"        # dec 206
  params: []
- id: unlock_extra_menu_baud
  label: Unlock Extra Menu (Baud rate)
  kind: action
  command: "8B"        # dec 139
  params: []
- id: function_up
  label: Function Up (menu cursor)
  kind: action
  command: "D0"        # dec 208
  params: []
- id: function_down
  label: Function Down (menu cursor)
  kind: action
  command: "D1"        # dec 209
  params: []
- id: data_right_white_balance
  label: Data Right / White Balance
  kind: action
  command: "D2"        # dec 210
  params: []
- id: white_balance
  label: White Balance
  kind: action
  command: "97"        # dec 151
  params: []
- id: data_left_text_enhancer_toggle
  label: Data Left / Text Enhancer Toggle
  kind: action
  command: "D3"        # dec 211
  params: []
- id: text_enhancer_toggle
  label: Text Enhancer On/Off
  kind: action
  command: "96"        # dec 150
  params: []
- id: text_enhancer_on
  label: Text Enhancer On
  kind: action
  command: "31 9E"     # dec 158 - page 1
  params: []
- id: text_enhancer_off
  label: Text Enhancer Off
  kind: action
  command: "31 9F"     # dec 159 - page 1
  params: []
- id: get_text_enhancer
  label: Get Text Enhancer
  kind: query
  command: "31 A0"     # dec 160 - page 1; returns '1'+LF+CR or '0'+LF+CR
  params: []
- id: help
  label: Help (menu description)
  kind: action
  command: "D6"        # dec 214
  params: []
- id: data_left_right
  label: Data Left + Data Right (reset to default)
  kind: action
  command: "DC"        # dec 220
  params: []
- id: reset_menu
  label: Reset Menu (except output)
  kind: action
  command: "F6"        # dec 246
  params: []
- id: custom_serial_mode_on
  label: Custom Serial Mode On
  kind: action
  command: "F1"        # dec 241
  notes: "Available with firmware v1.30a and later. Deactivated by power-off."
  params: []
- id: custom_serial_mode_off
  label: Custom Serial Mode Off
  kind: action
  command: "F2"        # dec 242
  notes: "Available with firmware v1.30a and later."
  params: []

# --- Reply mode (page 0) ---
- id: reply_mode_off
  label: Reply Mode Off
  kind: action
  command: "9C"        # dec 156
  params: []
- id: reply_mode_one_byte
  label: Reply Mode - One Byte
  kind: action
  command: "9D"        # dec 157 - replies $06 (valid) or $0F (invalid)
  params: []
- id: reply_mode_two_bytes
  label: Reply Mode - Two Bytes
  kind: action
  command: "9E"        # dec 158 (page 0) - echoes received byte + $06/$0F
  params: []
- id: reply_mode_string
  label: Reply Mode - String
  kind: action
  command: "9F"        # dec 159 (page 0) - replies 'OKAY'+LF+CR or 'ERROR'+LF+CR
  params: []

# --- Miscellaneous (page 0 unless noted) ---
- id: blank_echo
  label: Blank Echo (ready probe)
  kind: query
  command: "20"        # dec 032 - echoes ASCII ' ' when unit is ready
  params: []
- id: get_version
  label: Get Visualizer Type & Firmware Version
  kind: query
  command: "76"        # dec 118 - returns e.g. "VZ-C32 V1.12b" + LF + CR
  params: []
- id: debug_mode_on
  label: Debug Mode On
  kind: action
  command: "FA"        # dec 250
  params: []
- id: camera_optic_status
  label: Camera & Optic Status (debug only)
  kind: query
  command: "3F"        # dec 063 - debug mode required; multi-line status string
  params: []
- id: ascii_entry
  label: ASCII Entry Mode ('_')
  kind: action
  command: "5F"        # dec 095 - responds '?'; controller sends 3-digit decimal code
  params: []
- id: key_lock_on
  label: Key Lock On
  kind: action
  command: "AF"        # dec 175
  params: []
- id: key_lock_off
  label: Key Lock Off
  kind: action
  command: "B0"        # dec 176
  params: []
- id: get_key_lock
  label: Get Key Lock
  kind: query
  command: "AE"        # dec 174 - returns '1'+LF+CR (active) or '0'+LF+CR (inactive)
  params: []
- id: get_status
  label: Get Status (all settings)
  kind: query
  command: "A0"        # dec 160 - returns key:value string, e.g. "Zoom:E4C DigitalZoom:000 Focus:802 ..."
  params: []
- id: switch_ir_mode
  label: Switch IR Mode (A/B/C/D)
  kind: action
  command: "DD"        # dec 221
  params: []
- id: demo_mode
  label: Demo Mode
  kind: action
  command: "F4"        # dec 244 - send any code/key to exit
  params: []
- id: toggle_intern_extern
  label: Toggle Intern/Extern
  kind: action
  command: "31 80"     # dec 128 - page 1
  params: []
- id: switch_extern_on
  label: Switch Extern Signal On
  kind: action
  command: "31 81"     # dec 129 - page 1
  params: []
- id: switch_intern_on
  label: Switch Intern Signal On
  kind: action
  command: "31 82"     # dec 130 - page 1
  params: []
- id: get_extern
  label: Get Extern Signal
  kind: query
  command: "31 83"     # dec 131 - page 1; returns '1'+LF+CR or '0'+LF+CR
  params: []

# --- Image turn (page 1) ---
- id: portrait_toggle
  label: Portrait / Image Turn Toggle
  kind: action
  command: "31 84"     # dec 132 - page 1
  params: []
- id: portrait_on
  label: Portrait On
  kind: action
  command: "31 85"     # dec 133 - page 1
  params: []
- id: portrait_off
  label: Portrait Off
  kind: action
  command: "31 86"     # dec 134 - page 1
  params: []
- id: get_portrait
  label: Get Portrait State
  kind: query
  command: "31 87"     # dec 135 - page 1; returns 0/1/2/3 + LF + CR
  params: []

# --- Video output (page 1) ---
- id: video_pal
  label: Video Output PAL
  kind: action
  command: "31 94"     # dec 148 - page 1; not available on VZ-C12²
  params: []
- id: video_ntsc
  label: Video Output NTSC
  kind: action
  command: "31 95"     # dec 149 - page 1; not available on VZ-C12²
  params: []
- id: get_video
  label: Get Video Mode
  kind: query
  command: "31 96"     # dec 150 - page 1; returns "PAL" or "NTSC" + LF + CR
  params: []

# --- Output resolution (page 1) ---
- id: resolution_up
  label: Resolution Up (both outputs)
  kind: action
  command: "31 90"     # dec 144 - page 1
  params: []
- id: resolution_down
  label: Resolution Down (both outputs)
  kind: action
  command: "31 91"     # dec 145 - page 1
  params: []
- id: resolution_xga_75
  label: Resolution XGA/75 (both, AUTO-detect)
  kind: action
  command: "31 92"     # dec 146 - page 1
  params: []
- id: get_resolution_vga
  label: Get Resolution (VGA output)
  kind: query
  command: "31 93"     # dec 147 - page 1; e.g. "XGA at 75Hz" + LF + CR
  params: []
- id: vga_resolution_up
  label: VGA Resolution Up
  kind: action
  command: "31 AA"     # dec 170 - page 1
  params: []
- id: vga_resolution_down
  label: VGA Resolution Down
  kind: action
  command: "31 AB"     # dec 171 - page 1
  params: []
- id: vga_resolution_auto
  label: VGA Resolution AUTO
  kind: action
  command: "31 AC"     # dec 172 - page 1
  params: []
- id: get_resolution_dvi
  label: Get Resolution (DVI output)
  kind: query
  command: "31 A9"     # dec 169 - page 1
  params: []
- id: dvi_resolution_up
  label: DVI Resolution Up
  kind: action
  command: "31 AD"     # dec 173 - page 1
  params: []
- id: dvi_resolution_down
  label: DVI Resolution Down
  kind: action
  command: "31 AE"     # dec 174 - page 1
  params: []
- id: dvi_resolution_auto
  label: DVI Resolution AUTO
  kind: action
  command: "31 AF"     # dec 175 - page 1
  params: []

# --- Output signal (page 1) ---
- id: switch_positive_on
  label: Positive Image On
  kind: action
  command: "31 97"     # dec 151 - page 1
  params: []
- id: switch_negative_on
  label: Negative Image On
  kind: action
  command: "31 98"     # dec 152 - page 1
  params: []
- id: switch_negative_blue_on
  label: Negative Blue Image On
  kind: action
  command: "31 99"     # dec 153 - page 1
  params: []
- id: get_positive_negative
  label: Get Positive/Negative
  kind: query
  command: "31 9A"     # dec 154 - page 1; returns 0/1/2 + LF + CR
  params: []
- id: switch_color_on
  label: Color Image On
  kind: action
  command: "31 9B"     # dec 155 - page 1
  params: []
- id: switch_black_white_on
  label: Black/White Image On
  kind: action
  command: "31 9C"     # dec 156 - page 1
  params: []
- id: get_black_white
  label: Get Black/White
  kind: query
  command: "31 9D"     # dec 157 - page 1; returns 0/1 + LF + CR
  params: []

# --- Image storing (page 1 unless noted) ---
- id: memory_store
  label: Memory Store (indexed)
  kind: action
  command: "31 8C"     # dec 140 - page 1; echoes '?'; controller sends '1'..'9' within 3 s
  params:
    - name: index
      type: string
      description: Memory number '1'..'9'
- id: memory_recall
  label: Memory Recall (indexed)
  kind: action
  command: "31 8D"     # dec 141 - page 1; echoes '?'; controller sends '1'..'9' within 3 s
  params:
    - name: index
      type: string
      description: Memory number '1'..'9'
- id: memory_off
  label: Memory Off (live image)
  kind: action
  command: "31 8E"     # dec 142 - page 1
  params: []
- id: snapshot
  label: Snapshot (fill all 9 memories)
  kind: action
  command: "31 8F"     # dec 143 - page 1
  params: []
- id: show_all_toggle
  label: Show All Memories Toggle
  kind: action
  command: "31 88"     # dec 136 - page 1
  params: []
- id: show_all_on
  label: Show All Memories On
  kind: action
  command: "31 89"     # dec 137 - page 1
  params: []
- id: show_all_off
  label: Show All Memories Off
  kind: action
  command: "31 8A"     # dec 138 - page 1
  params: []
- id: get_show_all
  label: Get Show All
  kind: query
  command: "31 8B"     # dec 139 - page 1; returns 1/0 + LF + CR
  params: []
- id: erase_memory
  label: Erase All Memories
  kind: action
  command: "31 A5"     # dec 165 - page 1
  params: []
- id: freeze_toggle
  label: Freeze Toggle
  kind: action
  command: "D7"        # dec 215 - page 0
  params: []
- id: freeze_on
  label: Freeze On
  kind: action
  command: "31 A6"     # dec 166 - page 1
  params: []
- id: freeze_off
  label: Freeze Off
  kind: action
  command: "31 A7"     # dec 167 - page 1
  params: []
- id: get_freeze
  label: Get Freeze
  kind: query
  command: "31 A8"     # dec 168 - page 1; returns 1/0 + LF + CR
  params: []

# --- Image on/off (page 0) ---
- id: image_toggle
  label: Image On/Off Toggle
  kind: action
  command: "B9"        # dec 185
  params: []
- id: image_on
  label: Image On
  kind: action
  command: "C0"        # dec 192
  params: []
- id: image_off
  label: Image Off
  kind: action
  command: "C4"        # dec 196
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  source: get_power (0xAB)
- id: light_state
  type: enum
  values: [on, off]
  source: get_light (0xAC)
- id: zoom_position
  type: string
  description: 3-digit hex '000' (wide) .. 'FFF' (tele)
  source: get_zoom_position (0xA1)
- id: focus_position
  type: string
  description: 3-digit hex '000' (near) .. 'FFF' (far)
  source: get_focus_position (0xA3)
- id: iris_position
  type: string
  description: 3-digit hex '000' (close) .. 'FFF' (open)
  source: get_iris_position (0xA5)
- id: auto_iris
  type: enum
  values: [on, off]
  source: get_auto_iris (0xA6)
- id: text_enhancer
  type: enum
  values: [on, off]
  source: get_text_enhancer (0x31 0xA0)
- id: key_lock
  type: enum
  values: [active, inactive]
  source: get_key_lock (0xAE)
- id: extern_signal
  type: enum
  values: [active, inactive]
  source: get_extern (0x31 0x83)
- id: portrait_state
  type: enum
  values: ["0_deg", "-90_deg", "180_deg", "+90_deg"]
  description: "Pre-v2.04a firmware returns simple 0/1 active/inactive."
  source: get_portrait (0x31 0x87)
- id: video_mode
  type: enum
  values: [PAL, NTSC]
  source: get_video (0x31 0x96)
- id: positive_negative
  type: enum
  values: [positive, negative, negative_blue]
  source: get_positive_negative (0x31 0x9A)
- id: color_mode
  type: enum
  values: [color, black_white]
  source: get_black_white (0x31 0x9D)
- id: show_all
  type: enum
  values: [active, inactive]
  source: get_show_all (0x31 0x8B)
- id: freeze
  type: enum
  values: [active, inactive]
  source: get_freeze (0x31 0xA8)
- id: version_string
  type: string
  description: "e.g. 'VZ-C32 V1.12b'"
  source: get_version (0x76)
- id: status_string
  type: string
  description: "Key:value list of all current settings (single line)."
  source: get_status (0xA0)
- id: vga_resolution
  type: string
  description: "Free-form, e.g. 'XGA at 75Hz'."
  source: get_resolution_vga (0x31 0x93)
- id: dvi_resolution
  type: string
  description: "Free-form, e.g. 'XGA/75Hz'."
  source: get_resolution_dvi (0x31 0xA9)
```

## Variables
```yaml
# Position-setting variables (controller sends 3 hex digits after '?' prompt within 3 s)
- id: zoom_position
  type: string
  range: "000..FFF"
  description: Hex zoom position. 000 = wide, FFF = tele.
  set_action: set_zoom_position
- id: focus_position
  type: string
  range: "000..FFF"
  description: Hex focus position. 000 = near, FFF = far.
  set_action: set_focus_position
- id: iris_position
  type: string
  range: "000..FFF"
  description: Hex iris position. 000 = close, FFF = open.
  set_action: set_iris_position
- id: digital_zoom
  type: string
  range: "000..FFF"
  description: Hex digital zoom position.
  set_action: set_digital_zoom
```

## Events
```yaml
# Reply-mode dependent. With reply mode off (default), no unsolicited events.
# Other reply modes echo after each command.
- id: ready_echo
  description: "Blank Echo (0x20) returns ASCII space when unit is ready to receive the next command; no reply when busy."
  trigger: poll
- id: lamp_change_status
  description: "Lamp change command (0xB1) replies with the string 'Perform Lampchange...Changed to Lamp1' (or Lamp2)."
  trigger: command_completion
- id: custom_mode_menu_line
  description: "When Custom Serial Mode is on, the current on-screen menu line is output via RS-232 + LF + CR on each cursor change (e.g. '> Color Settings <')."
  trigger: state_change
```

## Macros
```yaml
# Custom Serial Mode Height Adjustment (firmware v1.30a+, page 0 commands)
# Each step name is output to the controller as it begins.
- id: height_adjustment_step1_center_lightfield_coarse
  description: "Center lightfield (coarse). Sends 0xD2 (Data Right), 0xD3 (Data Left), 0xD0 (Function Up), 0xD1 (Function Down) as needed; confirm with 0xD6 (Help)."
  steps:
    - "Send 0xD6 to confirm"
  notes: "Step 1 of 4 in height-adjustment procedure."
- id: height_adjustment_step2_adjust_camera_focus
  description: "Adjust camera focus. 0xC2/0xC6 step, or 0x83/0x84 continuous with 0x80 to stop; confirm with 0xD6."
  steps:
    - "Send 0xD6 to confirm"
  notes: "Step 2 of 4."
- id: height_adjustment_step3_adjust_light_focus
  description: "Adjust light focus. Same commands as step 2; confirm with 0xD6."
  steps:
    - "Send 0xD6 to confirm"
  notes: "Step 3 of 4."
- id: height_adjustment_step4_center_lightfield_fine
  description: "Center lightfield (fine). Same commands as step 1; confirm with 0xD6."
  steps:
    - "Send 0xD6 to confirm"
  notes: "Step 4 of 4. After all four steps, unit sends 'Height Adjustment Done' + LF + CR."
```

## Safety
```yaml
confirmation_required_for:
  - erase_memory        # 0x31 0xA5 - destroys all 9 stored images
  - lamp_change         # 0xB1 - physically swaps the lamp
  - reset_menu          # 0xF6 - resets all Visualizer settings (except output)
  - power_on_factory    # 0xC8 - also recalls factory preset
  - preset_factory      # 0xD5 - recalls factory preset
interlocks: []
# No additional safety warnings stated in source. Stop Zoom/Focus/Iris (0x80) acts
# as a generic motion-stop for any in-progress Start command.
```

## Notes
- Source document: WolfVision "Serial Protocol of VZ-C12, VZ-C12², VZ-C12³, VZ-C32 and VZ-C32" T-05/07, revised 5 March 2010.
- Protocol is upward compatible with VZ-27plus / VZ-57plus, except arm functions.
- Two command pages: page 0 (standard, no prefix needed) and page 1 (preceded by 0x31 page-select; unit auto-returns to page 0 after one page-1 command). Several opcodes are reused across pages with different meanings — always track page state.
- Some bytes (e.g. 0x9E, 0x9F, 0x80, 0x81, 0x82, 0x83) appear on both pages with different meanings. The page-1 form is the wire sequence "31 XX" as shown in the Actions block.
- Default reply mode is "off" (no reply) after mains power-on. Reply modes: off (0x9C), one byte (0x9D, $06/$0F), two bytes (0x9E, echo+status), string (0x9F, "OKAY"/"ERROR" + LF + CR).
- Reply mode change takes effect for the reply-mode command itself: 0x9C never replies; 0x9F always replies.
- Continuous-motion commands (zoom/focus/iris step or start) require min 10 Hz repetition. Use Blank Echo (0x20) as a ready probe between bursts.
- "Set X-Position" commands (zoom, focus, iris, digital zoom) echo '?' and require controller to send 3 hex digits within 3 seconds, no CR/LF.
- "Recall/Store Preset" and "Memory Store/Recall" also use the '?' + 3-second-ASCII-input handshake for indexed variants.
- Newer hardware (VZ-C12² SN ≥ 1009412, VZ-C32 SN ≥ 1011797) supports an extended command list referenced at www.wolfvision.com/wolf/protocol_command_wolfvision/protocol_command.htm — not covered here.
- VZ-C12² has no video output (commands 0x31 0x94/0x95/0x96 unsupported).
- Lamp-change, custom serial mode require firmware v1.30a or later.
- Some new resolutions (1080p, 720p, WXGA, WSXGA, XGA 16:9) require firmware v1.20a or later. SXGA+ changed from 1360x1024 to 1400x1050 in firmware v2.03a.
- Height adjustment procedure requires firmware v1.30a or later. Can be aborted at any time with 0xCE (Visualizer Menu on/off).
- Source deliberately notes future protocols may add commands at higher firmware versions.

<!-- UNRESOLVED:
- Minimum required firmware version for the base command set (not stated).
- Flow control (RTS/CTS, XON/XOFF) — source describes 3-wire connection but does not name flow control; left as 'none' per absence.
- Exact numeric value ranges for zoom/focus/iris are stated as 000..FFF, but source note 2 warns "not all positions in the range are supported" — controller should treat nearest-supported as success.
- Authentication, encryption, or device-identifier handshake — not present in this source.
- Ethernet/IP or USB control variants — not documented in this source.
-->

## Provenance

```yaml
source_domains:
  - wolfvision.com
source_urls:
  - https://wolfvision.com/wolf/serial_ceiling32.pdf
retrieved_at: 2026-04-30T04:32:42.910Z
last_checked_at: 2026-06-02T07:06:57.213Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:57.213Z
matched_actions: 131
action_count: 131
confidence: medium
summary: "All 131 authoritative spec actions matched literally in source; transport parameters fully verified; command fidelity confirmed. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no Ethernet/IP variant documented in this source. Source is strictly RS-232 (T-05/07)."
- "- Minimum required firmware version for the base command set (not stated)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
