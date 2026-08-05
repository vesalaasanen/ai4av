---
spec_id: admin/wolfvision-eye-12-scb-12
schema_version: ai4av-public-spec-v1
revision: 1
title: "WolfVision EYE-12/SCB-12 Control Spec"
manufacturer: WolfVision
model_family: EYE-12
aliases: []
compatible_with:
  manufacturers:
    - WolfVision
  models:
    - EYE-12
    - SCB-12
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - wolfvision.com
  - res.cloudinary.com
  - manua.ls
source_urls:
  - http://www.wolfvision.com/wolf/protocoll_eye12_scb12.pdf
  - "https://wolfvision.com/media/1086/download/vz-wolfprot-doc.pdf?v=8"
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Documents/WolfVision/VZ_P18/vz_p18_doc_5.pdf"
  - https://wolfvision.com/wolf/commands_cynap_wolfvision/instructions/wolfprotprogguide.pdf
  - https://www.manua.ls/wolfvision
retrieved_at: 2026-07-17T05:18:48.866Z
last_checked_at: 2026-07-22T08:03:55.482Z
generated_at: 2026-07-22T08:03:55.482Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "USB control protocol details not documented beyond physical layer"
  - "TCP/HTTP control base URL not stated beyond port 50915"
  - "multicast port range 8800–9000 but exact default not stated"
  - "no unsolicited notification mechanism described in source."
  - "no safety interlock procedures in source."
  - "Block-inquiry byte maps only partially decoded in source (bitfield diagrams garbled in extraction)"
  - "Picture Transfer protocol (00 b8 / 00 b9) documented but block layout complex; only header shape captured"
verification:
  verdict: verified
  checked_at: 2026-07-22T08:03:55.482Z
  matched_actions: 220
  action_count: 220
  confidence: medium
  summary: "All 220 spec actions (107 Protocol-2 SET opcodes + 113 Protocol-1 legacy single-byte codes, incl. page-select) match source literally with correct shapes; Feedbacks/Variables cover essentially the full GET/Block-Inquiry/Picture-Transfer catalogue; transport values (port 50915, 115200 8N1) verbatim in source. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# WolfVision EYE-12/SCB-12 Control Spec

## Summary
Visualizer document camera controllable via RS-232, USB, and Ethernet. Supports power, zoom, focus, iris, preset, routing, and exposure controls. Ethernet commands sent to port 50915. Default serial: 115200 baud, 8N1. No login required. Two coexisting serial protocols: Protocol 2 (multi-byte hex, default on EYE-12/SCB-12) and Protocol 1 (single-byte legacy, upward compatible with VZ-9plus).

<!-- UNRESOLVED: USB control protocol details not documented beyond physical layer -->
<!-- UNRESOLVED: TCP/HTTP control base URL not stated beyond port 50915 -->
<!-- UNRESOLVED: multicast port range 8800–9000 but exact default not stated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 50915  # Ethernet room control port
serial:
  baud_rate: 115200  # default; configurable: 9600/19200/38400/57600/115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Evidence: power on/off, zoom/focus/iris/mirror, preset recall/store,
# light control, exposure settings, resolution output routing
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# ============================================================
# Protocol 2 - SET commands (multi-byte hex)
# Existing entries preserved; additions appended below.
# ============================================================

# --- Motor / Zoom / Focus / Iris (existing) ---
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: integer
      description: 00=Off, 01=On, 02=Toggle

- id: zoom
  label: Zoom
  kind: action
  params:
    - name: direction
      type: integer
      description: |
        01=Wide step, 02=Tele step, 11=Start Wide, 12=Start Tele
        Absolute: 01 20 02 yz wx - position 0x0000 to 0x0FFF

- id: focus
  label: Focus
  kind: action
  params:
    - name: direction
      type: integer
      description: |
        01=Far step, 02=Near step, 11=Start Far, 12=Start Near
        Absolute: 01 21 02 yz wx - position 0x0000 to 0x0FFF

- id: iris
  label: Iris
  kind: action
  params:
    - name: direction
      type: integer
      description: |
        01=Open step, 02=Close step, 11=Start Open, 12=Start Close
        Absolute: 01 22 02 yz wx

- id: auto_focus
  label: Auto Focus
  kind: action
  params:
    - name: state
      type: integer
      description: 00=AF Off, 01=AF On, 02=AF Toggle, 10=One-Push AF

- id: auto_iris
  label: Auto Iris
  kind: action
  params:
    - name: state
      type: integer
      description: 00=Off, 01=On, 02=Toggle

- id: mirror
  label: Mirror
  kind: action
  params:
    - name: direction
      type: integer
      description: |
        01=Up step, 02=Down step, 11=Start Up, 12=Start Down
        Absolute: 01 24 02 yz wx

- id: arm
  label: Arm
  kind: action
  params:
    - name: state
      type: integer
      description: 00=Up, 01=Down, 02=Toggle

# --- Preset / Light / Output / Exposure / Ethernet (existing) ---
- id: recall_preset
  label: Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: |
        00=Power On Preset, 01=Preset1, 02=Preset2, 03=Preset3
        Factory: 0xE5-0xEE (Max Wide, DIN A4-A8, Max Tele, Slide, X-Ray)

- id: store_preset
  label: Store Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: 00=Power On Preset, 01=Preset1, 02=Preset2, 03=Preset3

- id: preset_special_function
  label: Preset Special Function Key
  kind: action
  params:
    - name: preset
      type: integer
      description: 01=Preset1, 02=Preset2, 03=Preset3
    - name: function
      type: integer
      description: |
        00=PRESET, 01=POS_NEG, 02=BLUE, 03=BLACK_WHITE, 04=WB, 05=FREEZE,
        06=IMAGE, 07=ONEPUSH_AF, 08=LIGHT_ON_OFF, 09=SLIDE_ON_OFF,
        0A=TEXT, 0B=LIGHT

- id: light
  label: Light / Lightbox
  kind: action
  params:
    - name: state
      type: integer
      description: |
        00=Light Off/LB Off, 01=Light On/LB Off, 02=Light Off/LB On,
        03=Light Off/SlideBox On, 10=Toggle, 11=Light Off/LB Toggle, 80=Lamp change

- id: resolution_rgb
  label: Resolution RGB
  kind: action
  params:
    - name: mode
      type: integer
      description: |
        FF=Off, 00=Auto, 01=SVGA/60, 02=SVGA/75, 03=SVGA/85, 04=XGA/60,
        05=XGA/75, 06=XGA/85, 07=1152/75, 08=SXGA-/60, 09=SXGA-/85,
        0A=SXGA/60, 0B=SXGA/75, 0C=SXGA/85, 0D=UXGA/60, 0E=UXGA/70,
        0F=UXGA/75, 10=1792/60, 11=1856/60, 12=SXGA+/60, 13=SXGA+/75,
        14=VGA/60, 15=720p/50, 16=720p/60, 17=1080p/50, 18=1080p/60,
        19=XGA 16:9, 1A=WSXGA/60, 1B=WXGA/60

- id: resolution_dvi
  label: Resolution DVI
  kind: action
  params:
    - name: mode
      type: integer
      description: Same values as Resolution RGB

- id: freeze
  label: Freeze
  kind: action
  params:
    - name: state
      type: integer
      description: 00=Off, 01=On, 02=Toggle

- id: color_mode
  label: Color Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: 00=B/W, 01=Presentation, 02=Natural, 03=Video Conference, 04=Manual, 05=B/W Toggle

- id: white_balance
  label: White Balance
  kind: action
  params:
    - name: mode
      type: integer
      description: 00=Auto, 01=One-Push, 02=Manual, 10=Perform WB, 50=Perform WB for Manual

- id: gain
  label: Gain
  kind: action
  params:
    - name: value
      type: integer
      description: 0x00-0x12=0-18dB, 0x40=Auto Low, 0x80=Auto Med, 0xC0=Auto High

- id: shutter
  label: Shutter
  kind: action
  params:
    - name: mode
      type: integer
      description: 00=Step, 01=Variable, 02=Auto, 03=Off

- id: brightness
  label: Image Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: 0xF6-0xFF=−10 to −1, 0x00=0, 0x01-0x0A=+1 to +10

- id: saturation
  label: Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: 0x00-0xC8 (0-172%)

- id: ethernet_dhcp
  label: DHCP
  kind: action
  params:
    - name: state
      type: integer
      description: 00=Off, 01=On, 02=Toggle

- id: ethernet_ip
  label: IP Address
  kind: action
  params:
    - name: octets
      type: string
      description: 4 hex octets (01 to FF each)

- id: subnet_mask
  label: Subnet Mask
  kind: action
  params:
    - name: octets
      type: string
      description: 4 hex octets (00 to FF each)

- id: gateway_ip
  label: Gateway IP
  kind: action
  params:
    - name: octets
      type: string
      description: 4 hex octets (00 to FF each)

- id: multicast
  label: Multicast
  kind: action
  params:
    - name: mode
      type: integer
      description: 00=Off, 01=Auto, 02=Cont
    - name: ip
      type: string
      description: 4 hex octets
    - name: port
      type: integer
      description: Hex 2260-2328 (port 8800-9000)
    - name: format
      type: integer
      description: 00=Native, 02=SVGA/75, 03=SVGA/85, 00=SXGA-, etc.
    - name: framerate
      type: integer
      description: 00=Low, 01=Medium, 02=High

- id: reply_mode
  label: Reply Mode (RS232)
  kind: action
  params:
    - name: mode
      type: integer
      description: 00=Off, 01=Reply Command

- id: baudrate
  label: Baudrate
  kind: action
  params:
    - name: rate
      type: integer
      description: 00=9600, 01=19200, 02=38400, 03=57600, 04=115200

- id: menu_on_off
  label: Menu On/Off
  kind: action
  params:
    - name: state
      type: integer
      description: 00=Off, 01=On, 02=Toggle

- id: memory_recall
  label: Memory Recall
  kind: action
  params:
    - name: slot
      type: integer
      description: 01-09=Memory 1-9

- id: memory_store
  label: Memory Store
  kind: action
  params:
    - name: slot
      type: integer
      description: 01-09=Memory 1-9, 10=Snapshot, 20=Erase Memory

# ============================================================
# Protocol 2 - ADDED SET commands (previously missing)
# ============================================================

# --- Motor Control ---
- id: stop_all_motors
  label: Stop All Motors
  kind: action
  command: "01 2F 01 00"
  params: []
  notes: Stops Iris, Focus, Zoom movement.

# --- Zoom Macro / Digital Zoom ---
- id: zoom_macro
  label: Zoom Macro
  kind: action
  command: "01 2B 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Off, 01=Macro 11x, 02=Macro 12x, 03=Macro Toggle"

- id: set_digital_zoom
  label: Set Digital Zoom Position
  kind: action
  command: "01 28 02 {yz} {wx}"
  params:
    - name: position
      type: integer
      description: "2-byte position 0x0000-0x0FFF"

- id: digital_zoom
  label: Digital Zoom Mode
  kind: action
  command: "01 29 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Off, 01=2x, 02=4x"

- id: digital_zoom_warning
  label: Digital Zoom Warning
  kind: action
  command: "01 2A 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Warning Stop, 02=Warning None"

# --- Iris Priority ---
- id: iris_priority
  label: Iris Priority
  kind: action
  command: "01 33 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Auto, 01=Manual, 02=Toggle"

# --- Height / Light Mirror / Light Focus ---
- id: height_adjustment
  label: Start Height Adjustment
  kind: action
  command: "01 2D 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Start Manual Adjustment, 01=Start Auto Adjustment"

- id: light_mirror_x
  label: Light Mirror X (Left/Right)
  kind: action
  command: "01 25 01 {state}"
  params:
    - name: state
      type: integer
      description: "01=Mirror Left, 02=Mirror Right, 11=Start Left, 12=Start Right. Absolute: 01 25 02 yz wx"
  notes: Also documented as "Light Mirror control" in source.

- id: light_mirror_y
  label: Light Mirror Y (Up/Down)
  kind: action
  command: "01 26 01 {state}"
  params:
    - name: state
      type: integer
      description: "01=Mirror Up, 02=Mirror Down, 11=Start Up, 12=Start Down. Absolute: 01 26 02 yz wx"

- id: light_focus
  label: Light Focus
  kind: action
  command: "01 27 01 {state}"
  params:
    - name: state
      type: integer
      description: "01=Far step, 02=Near step, 11=Start Far, 12=Start Near. Absolute: 01 27 02 yz wx"

- id: store_mirror_pos
  label: Store Mirror-Pos
  kind: action
  command: "01 4D 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Off, 01=On"

# --- Power Control (extended) ---
- id: poweron_preset
  label: PowerOn Preset
  kind: action
  command: "01 34 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Off, 01=On, 02=Toggle"

- id: display_logo
  label: Display Logo
  kind: action
  command: "01 35 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Off, 01=On, 02=Toggle"

- id: mains_on
  label: Mains-On
  kind: action
  command: "01 36 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Standby, 01=Power-On, 02=Toggle"

- id: auto_power_off_time
  label: Auto-Power-Off Time
  kind: action
  command: "01 37 01 {value}"
  params:
    - name: value
      type: integer
      description: "FF=Off, 1E=30min, 3C=1h, 78=2h, B4=3h, F0=4h"

# --- Light Control (extended) ---
- id: reset_lamp1_hours
  label: Reset Lamp1 Hours
  kind: action
  command: "01 A3 01 81"
  params: []

- id: reset_lamp2_hours
  label: Reset Lamp2 Hours
  kind: action
  command: "01 A4 01 81"
  params: []

- id: lamp_voltage
  label: Lamp Voltage
  kind: action
  command: "01 A1 01 {value}"
  params:
    - name: value
      type: integer
      description: "GET returns: 00=Longlife, 01=Economic, 02=Bright"

- id: laser
  label: Laser
  kind: action
  command: "01 A2 01 {value}"
  params:
    - name: value
      type: integer
      description: "Value yz (see source)"

# --- Image Turn ---
- id: image_turn
  label: Image Turn On/Off
  kind: action
  command: "01 83 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Off, 01=On, 02=Toggle. Orientation as selected in OSD."

- id: image_turn_rotation
  label: ImageTurn Rotation
  kind: action
  command: "01 84 01 {mode}"
  params:
    - name: mode
      type: integer
      description: "00=Cycle, 01=-90° (Rechts), 02=180°, 03=+90° (Links)"

# --- Miscellaneous (keylock, IR, mounting, OSD level, etc.) ---
- id: keylock
  label: Keylock On/Off
  kind: action
  command: "01 80 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Off, 01=On, 02=Toggle"

- id: ir_code
  label: IR Code
  kind: action
  command: "01 81 01 {code}"
  params:
    - name: code
      type: integer
      description: "1C=A, 1D=B, 1E=C, 1F=D, 97-9F=Code 1-9"

- id: number_of_ir_codes
  label: Number of IR Codes
  kind: action
  command: "01 18 01 {value}"
  params:
    - name: value
      type: integer
      description: "00=4 IR Codes, 01=9 IR Codes"
  notes: "Opcode 0x18 also reused by Description command in Ethernet section - source conflict."

- id: mounting_position
  label: Mounting Position
  kind: action
  command: "01 19 01 {value}"
  params:
    - name: value
      type: integer
      description: "00=Regular, 01=Flipped"

- id: osd_level
  label: OSD Level
  kind: action
  command: "01 82 01 {value}"
  params:
    - name: value
      type: integer
      description: "00=Quiet, 01=Talk, 02=Verbose"

- id: text_enhancer
  label: Text Enhancer On/Off
  kind: action
  command: "01 85 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Off, 01=On, 02=Toggle"

- id: image_on_off
  label: Image On/Off
  kind: action
  command: "01 86 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Off, 01=On, 02=Toggle"

- id: lcd_brightness
  label: LCD Brightness
  kind: action
  command: "01 87 01 {value}"
  params:
    - name: value
      type: integer
      description: "0x00-0xFF"

- id: zoom_wheel_calibration
  label: Zoom Wheel Calibration
  kind: action
  command: "01 8B 01 00"
  params: []

- id: pixel_calibration
  label: Pixel Calibration
  kind: action
  command: "01 8C 01 00"
  params: []

- id: debug
  label: Debug On/Off
  kind: action
  command: "01 88 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Debug Off, 01=Debug On, 05=Demo Mode"

- id: adjustment_menu
  label: Adjustment Menu
  kind: action
  command: "01 8D 01 00"
  params: []

- id: service_menu
  label: Service Menu
  kind: action
  command: "01 8E 01 00"
  params: []

- id: recall_factory_settings
  label: Recall Factory Settings
  kind: action
  command: "01 8F 01 00"
  params: []

# --- Visualizer Menu Control (extended) ---
- id: unlock_menu
  label: Unlock Menu
  kind: action
  command: "01 9A 01 00"
  params: []

- id: unlock_extra_menu
  label: Unlock Extra Menu
  kind: action
  command: "01 9B 01 00"
  params: []

- id: menu_control
  label: Menu Control
  kind: action
  command: "01 99 01 {key}"
  params:
    - name: key
      type: integer
      description: "02=Function Up, 08=Function Down, 04=Data Left, 06=Data Right, 05=Enter, 10=Help, 80=Reset Menu"

# --- Output Control (extended) ---
- id: video_format
  label: Video Format
  kind: action
  command: "01 52 01 {mode}"
  params:
    - name: mode
      type: integer
      description: "00=NTSC, 01=PAL, 02=Off"

- id: detail
  label: Detail
  kind: action
  command: "01 53 01 {mode}"
  params:
    - name: mode
      type: integer
      description: "00=Off, 01=Low, 02=Medium, 03=High"

- id: pos_neg_blue
  label: Pos/Neg/Blue
  kind: action
  command: "01 54 01 {mode}"
  params:
    - name: mode
      type: integer
      description: "00=Positive, 01=Negative, 02=Blue, 03=Toggle"

- id: color_bw
  label: Color/BW
  kind: action
  command: "01 55 01 {mode}"
  params:
    - name: mode
      type: integer
      description: "00=Color, 01=Black/White, 02=Toggle"

- id: intern_extern
  label: Intern/Extern
  kind: action
  command: "01 57 01 {mode}"
  params:
    - name: mode
      type: integer
      description: "00=Intern, 01=Extern, 02=Toggle"

- id: autosense_externin
  label: AutoSense ExternIn On/Off
  kind: action
  command: "01 58 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Off, 01=On, 02=Toggle"

- id: extern_freeze_output
  label: Extern/Freeze Output
  kind: action
  command: "01 59 01 {xy}"
  params:
    - name: xy
      type: integer
      description: "Output routing value (see source)"

- id: preview_output
  label: Preview Output Control
  kind: action
  command: "01 5A 01 {mode}"
  params:
    - name: mode
      type: integer
      description: "00=Preview, 01=Regular"

- id: image_mirror
  label: Image Mirror
  kind: action
  command: "01 5B 01 {xy}"
  params:
    - name: xy
      type: integer
      description: "GET returns: 00=Off, 01=Horizontal, 02=Vertical, 03=H+V"

# --- Image Storing (extended) ---
- id: memory_off
  label: Memory Off
  kind: action
  command: "01 90 01 00"
  params: []
  notes: Switches to Live image.

- id: showall
  label: ShowAll On/Off
  kind: action
  command: "01 93 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Off, 01=On, 02=Toggle"

- id: erase_memory_behaviour
  label: Erase Memory Behaviour
  kind: action
  command: "01 94 01 {mode}"
  params:
    - name: mode
      type: integer
      description: "00=Manual, 01=Standby, 02=Toggle"

# --- Exposure (extended) ---
- id: shutter_speed_step
  label: Speed (Shutter=step)
  kind: action
  command: "01 62 01 {value}"
  params:
    - name: value
      type: integer
      description: "00=1/30s, 01=Flickerless, 02=1/50s, 03=1/60s, 04=1/100s, 05=1/120s, 06=1/250s, 07=1/500s, 08=1/1000s, 09=1/2000s, 0A=1/3000s"

- id: trigger_mode
  label: Trigger Mode On/Off
  kind: action
  command: "01 6A 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Off, 01=On, 02=Toggle"

- id: trigger_edge
  label: Trigger Edge Pos/Neg
  kind: action
  command: "01 6B 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Positive, 01=Negative, 02=Toggle"

- id: back_light_compensation
  label: Back Light Compensation
  kind: action
  command: "01 6C 01 {mode}"
  params:
    - name: mode
      type: integer
      description: "00=Off, 01=Medium, 02=High"

# --- Color (extended) ---
- id: gamma_normal_mode
  label: Gamma Normal Mode
  kind: action
  command: "01 68 01 {value}"
  params:
    - name: value
      type: integer
      description: "0x00-0x03 - Gamma Level for Normal Mode"

- id: gamma_text_mode
  label: Gamma Text Mode
  kind: action
  command: "01 69 01 {value}"
  params:
    - name: value
      type: integer
      description: "0x00-0x03 - Gamma Level for Text Mode"

# --- Ethernet (extended) ---
- id: ethernet_mode
  label: Ethernet Mode
  kind: action
  command: "01 74 01 {mode}"
  params:
    - name: mode
      type: integer
      description: "00=Off, 01=Image Only, 02=Control Only, 03=Image+Control, 04=FW Update Only, 05=Image+FW, 06=Control+FW, 07=Image+Control+FW"

- id: multicast_mode
  label: Multicast Mode
  kind: action
  command: "01 75 01 {mode}"
  params:
    - name: mode
      type: integer
      description: "00=Off, 01=Auto, 02=Cont"

- id: multicast_format
  label: Multicast Format
  kind: action
  command: "01 79 01 {mode}"
  params:
    - name: mode
      type: integer
      description: "00=Native, 02=SVGA/75, 03=SVGA/85, 00=SXGA-, 01=XGA, 06=XGA/85, 07=1152/75, 02=768x576, 03=VGA, 04=QVGA, 05=N/A, 0C=SXGA/85, 0D=UXGA/60, 0E=UXGA/70, 0F=UXGA/75, 10=1792/60, 11=1856/60, 06=SXGA, 13=SXGA+/75, 07=UXGA, 08=720p, 09=576p, 0A=432p, 0B=288p, 19=XGA 16:9, 0C=144p"
  notes: "Source table has duplicated index values (data entry errors in source)."

- id: multicast_framerate
  label: Multicast Framerate
  kind: action
  command: "01 7A 01 {mode}"
  params:
    - name: mode
      type: integer
      description: "00=Low, 01=Medium, 02=High"

- id: description
  label: Description (string)
  kind: action
  command: "01 18 {yz} AB CD EF ... FF"
  params:
    - name: text
      type: string
      description: "ASCII description string, max length 255 bytes"
  notes: "Opcode 0x18 conflicts with Number of IR Codes command - source conflict."

# --- Firmware Update ---
- id: firmware_erase_flash
  label: Firmware Upload Erase Flash
  kind: action
  command: "01 B0 01 00"
  params: []

- id: firmware_upload_data_start
  label: Firmware Upload Data Start
  kind: action
  command: "01 B1 04 {yz} {wx} {uv} {st}"
  params:
    - name: length
      type: integer
      description: "Length of firmware data (4-byte)"

- id: firmware_upload_data
  label: Firmware Upload Data
  kind: action
  command: "05 B2 {yz} {wx} AB CD EF ... FF"
  params:
    - name: block
      type: string
      description: "Data block; yz wx = length in hex. USB max=508 (512-4), ETH max=1440."

- id: firmware_upload_data_stop
  label: Firmware Upload Data Stop
  kind: action
  command: "01 B3 01 00"
  params: []

- id: firmware_downgrade
  label: Firmware Downgrade
  kind: action
  command: "01 B4 01 00"
  params: []
  notes: "Execute before uploading old firmware."

# --- OSD ---
- id: osd_transparency
  label: OSD Transparency
  kind: action
  command: "01 C0 01 {state}"
  params:
    - name: state
      type: integer
      description: "00=Off, 01=On"

- id: osd_size
  label: OSD Size
  kind: action
  command: "01 C1 01 {mode}"
  params:
    - name: mode
      type: integer
      description: "00=Small, 01=Large"

- id: osd_horizontal_position
  label: Menu Horizontal Position
  kind: action
  command: "01 C2 01 {value}"
  params:
    - name: value
      type: integer
      description: "0x00-0x64 (0-100%)"

- id: osd_vertical_position
  label: Menu Vertical Position
  kind: action
  command: "01 C3 01 {value}"
  params:
    - name: value
      type: integer
      description: "0x00-0x64 (0-100%)"

- id: osd_status_position
  label: Status Position
  kind: action
  command: "01 C4 01 {mode}"
  params:
    - name: mode
      type: integer
      description: "00=Top, 01=Bottom"

- id: osd_selection_bar_color
  label: Selection Bar Color
  kind: action
  command: "01 C5 01 {value}"
  params:
    - name: value
      type: integer
      description: "00=Black (color index)"

- id: osd_selected_text_color
  label: Selected Text Color
  kind: action
  command: "01 C6 01 {value}"
  params:
    - name: value
      type: integer
      description: "00=Black (color index)"

- id: osd_menu_text_color
  label: Menu Text Color
  kind: action
  command: "01 C7 01 {value}"
  params:
    - name: value
      type: integer
      description: "00=Black (color index)"

- id: osd_menu_headline_color
  label: Menu Headline Color
  kind: action
  command: "01 C8 01 {value}"
  params:
    - name: value
      type: integer
      description: "00=Black (color index)"

- id: osd_menu_status_text_color
  label: Menu Status Text Color
  kind: action
  command: "01 C9 01 {value}"
  params:
    - name: value
      type: integer
      description: "00=Black (color index)"

# ============================================================
# Protocol 1 - legacy single-byte serial commands
# (distinct documented entries; coexist via page select)
# Page select: $30=Page0 (standard), $31=Page1 (auto-revert)
# ============================================================

- id: p1_select_page0
  label: "[P1] Select Page 0"
  kind: action
  command: "30"
  params: []
  notes: "Standard page. Optional - page 0 is default."

- id: p1_select_page1
  label: "[P1] Select Page 1"
  kind: action
  command: "31"
  params: []
  notes: "After page-1 command executes, auto-reverts to page 0."

# --- Zoom (P1) ---
- id: p1_zoom_wide
  label: "[P1] Zoom Wide"
  kind: action
  command: "C3"
  params: []
  notes: "Repetitive send (min 10Hz) for continuous zoom."

- id: p1_zoom_tele
  label: "[P1] Zoom Tele"
  kind: action
  command: "C7"
  params: []

- id: p1_start_zoom_wide
  label: "[P1] Start Zoom Wide"
  kind: action
  command: "81"
  params: []

- id: p1_start_zoom_tele
  label: "[P1] Start Zoom Tele"
  kind: action
  command: "82"
  params: []

- id: p1_get_zoom_position
  label: "[P1] Get Zoom Position"
  kind: query
  command: "A1"
  params: []
  notes: "Returns 3-digit hex '000'-'FFF' + LF + CR."

- id: p1_set_zoom_position
  label: "[P1] Set Zoom Position"
  kind: action
  command: "A2 {pos}"
  params:
    - name: pos
      type: string
      description: "3-digit hex '000'(wide)-'FFF'(tele), within 3s after '?' echo"

- id: p1_set_digital_zoom
  label: "[P1] Set Digital Zoom"
  kind: action
  command: "31 A3 {pos}"
  params:
    - name: pos
      type: string
      description: "3-digit hex '000'-'FFF' (page 1)"

- id: p1_get_digital_zoom
  label: "[P1] Get Digital Zoom"
  kind: query
  command: "31 A4"
  params: []
  notes: "Page 1. Returns 3-digit hex + LF + CR."

# --- Focus (P1) ---
- id: p1_focus_far
  label: "[P1] Focus Far"
  kind: action
  command: "C2"
  params: []

- id: p1_focus_near
  label: "[P1] Focus Near"
  kind: action
  command: "C6"
  params: []

- id: p1_start_focus_far
  label: "[P1] Start Focus Far"
  kind: action
  command: "83"
  params: []

- id: p1_start_focus_near
  label: "[P1] Start Focus Near"
  kind: action
  command: "84"
  params: []

- id: p1_get_focus_position
  label: "[P1] Get Focus Position"
  kind: query
  command: "A3"
  params: []

- id: p1_set_focus_position
  label: "[P1] Set Focus Position"
  kind: action
  command: "A4 {pos}"
  params:
    - name: pos
      type: string
      description: "3-digit hex '000'(near)-'FFF'(far)"

- id: p1_af_on
  label: "[P1] AF On"
  kind: action
  command: "EF"
  params: []

- id: p1_af_off
  label: "[P1] AF Off"
  kind: action
  command: "F0"
  params: []

- id: p1_get_auto_focus
  label: "[P1] Get Auto Focus"
  kind: query
  command: "AD"
  params: []
  notes: "Returns '1'+LF+CR (on) or '0' (off)."

# --- Iris (P1) ---
- id: p1_iris_open
  label: "[P1] Iris Open / Brightness Up"
  kind: action
  command: "C1"
  params: []

- id: p1_iris_close
  label: "[P1] Iris Close / Brightness Down"
  kind: action
  command: "C5"
  params: []

- id: p1_start_iris_open
  label: "[P1] Start Iris Open"
  kind: action
  command: "85"
  params: []

- id: p1_start_iris_close
  label: "[P1] Start Iris Close"
  kind: action
  command: "86"
  params: []

- id: p1_auto_iris_on
  label: "[P1] Auto Iris On"
  kind: action
  command: "A7"
  params: []

- id: p1_auto_iris_off
  label: "[P1] Auto Iris Off"
  kind: action
  command: "A8"
  params: []

- id: p1_get_auto_iris
  label: "[P1] Get Auto Iris"
  kind: query
  command: "A6"
  params: []

- id: p1_get_iris_position
  label: "[P1] Get Iris Position"
  kind: query
  command: "A5"
  params: []

- id: p1_set_iris_position
  label: "[P1] Set Iris Position"
  kind: action
  command: "A9 {pos}"
  params:
    - name: pos
      type: string
      description: "3-digit hex '000'(close)-'FFF'(open)"

# --- Power / Presets (P1) ---
- id: p1_power_on
  label: "[P1] Power On / PowerOn-Preset"
  kind: action
  command: "C8"
  params: []

- id: p1_power_off
  label: "[P1] Power Off"
  kind: action
  command: "C9"
  params: []

- id: p1_get_power
  label: "[P1] Get Power"
  kind: query
  command: "AB"
  params: []

- id: p1_power_toggle
  label: "[P1] Power Toggle"
  kind: action
  command: "BA"
  params: []

- id: p1_recall_preset
  label: "[P1] Recall Preset"
  kind: action
  command: "9A {n}"
  params:
    - name: n
      type: string
      description: "'1'-'3' within 3s after '?' echo"

- id: p1_store_preset
  label: "[P1] Store Preset"
  kind: action
  command: "9B {n}"
  params:
    - name: n
      type: string
      description: "'1'-'3' within 3s after '?' echo"

- id: p1_preset_poweron
  label: "[P1] Preset 0 PowerOn-Preset"
  kind: action
  command: "D5"
  params: []

- id: p1_preset_1
  label: "[P1] Preset 1"
  kind: action
  command: "CA"
  params: []

- id: p1_preset_2
  label: "[P1] Preset 2"
  kind: action
  command: "CB"
  params: []

- id: p1_preset_3
  label: "[P1] Preset 3"
  kind: action
  command: "FD"
  params: []

- id: p1_save_preset_1
  label: "[P1] Save Preset 1"
  kind: action
  command: "D8"
  params: []

- id: p1_save_preset_2
  label: "[P1] Save Preset 2"
  kind: action
  command: "D9"
  params: []

- id: p1_save_preset_3
  label: "[P1] Save Preset 3"
  kind: action
  command: "FE"
  params: []

- id: p1_preset_max_wide
  label: "[P1] Preset Max Wide"
  kind: action
  command: "E5"
  params: []

- id: p1_preset_din_a4
  label: "[P1] Preset DIN A4"
  kind: action
  command: "E6"
  params: []

- id: p1_preset_din_a5
  label: "[P1] Preset DIN A5"
  kind: action
  command: "E7"
  params: []

- id: p1_preset_din_a6
  label: "[P1] Preset DIN A6"
  kind: action
  command: "E8"
  params: []

- id: p1_preset_din_a7
  label: "[P1] Preset DIN A7"
  kind: action
  command: "E9"
  params: []

- id: p1_preset_din_a8
  label: "[P1] Preset DIN A8"
  kind: action
  command: "EA"
  params: []

- id: p1_preset_max_tele
  label: "[P1] Preset Max Tele (no digZoom)"
  kind: action
  command: "EB"
  params: []

# --- Menu / Camera (P1) ---
- id: p1_unlock_menu
  label: "[P1] Unlock Visualizer Menu"
  kind: action
  command: "DA"
  params: []

- id: p1_menu_on_off
  label: "[P1] Visualizer Menu On/Off"
  kind: action
  command: "CE"
  params: []

- id: p1_unlock_extra_menu
  label: "[P1] Unlock Extra Menu"
  kind: action
  command: "8B"
  params: []

- id: p1_function_up
  label: "[P1] Function Up"
  kind: action
  command: "D0"
  params: []

- id: p1_function_down
  label: "[P1] Function Down"
  kind: action
  command: "D1"
  params: []

- id: p1_data_right_wb
  label: "[P1] Data Right / White Balance"
  kind: action
  command: "D2"
  params: []

- id: p1_white_balance
  label: "[P1] White Balance"
  kind: action
  command: "97"
  params: []

- id: p1_data_left
  label: "[P1] Data Left"
  kind: action
  command: "D3"
  params: []

- id: p1_help
  label: "[P1] Help"
  kind: action
  command: "D6"
  params: []

- id: p1_data_left_right
  label: "[P1] Data Left + Data Right"
  kind: action
  command: "DC"
  params: []
  notes: "Preset menu-item to default value."

- id: p1_reset_menu
  label: "[P1] Reset Menu"
  kind: action
  command: "F6"
  params: []

# --- Image On/Off (P1) ---
- id: p1_image_toggle
  label: "[P1] Image Toggle"
  kind: action
  command: "B9"
  params: []

- id: p1_image_on
  label: "[P1] Image On"
  kind: action
  command: "C0"
  params: []

- id: p1_image_off
  label: "[P1] Image Off"
  kind: action
  command: "C4"
  params: []

# --- Reply Mode (P1) ---
- id: p1_reply_mode_off
  label: "[P1] Reply Mode Off"
  kind: action
  command: "9C"
  params: []

- id: p1_reply_one_byte
  label: "[P1] Reply One Byte"
  kind: action
  command: "9D"
  params: []
  notes: "Replies $06 (valid) or $0F (invalid) per command."

- id: p1_reply_two_bytes
  label: "[P1] Reply Two Bytes"
  kind: action
  command: "9E"
  params: []
  notes: "Repeats received byte + $06/$0F."

- id: p1_reply_string
  label: "[P1] Reply String"
  kind: action
  command: "9F"
  params: []
  notes: "Replies 'OKAY'+LF+CR or 'ERROR'+LF+CR."

# --- Image Storing (P1, page 1) ---
- id: p1_memory_store
  label: "[P1] Memory Store x"
  kind: action
  command: "31 8C {n}"
  params:
    - name: n
      type: string
      description: "'1'-'9' within 3s after '?' echo"

- id: p1_memory_recall
  label: "[P1] Memory Recall x"
  kind: action
  command: "31 8D {n}"
  params:
    - name: n
      type: string
      description: "'1'-'9' within 3s after '?' echo"

- id: p1_memory_off
  label: "[P1] Memory Off"
  kind: action
  command: "31 8E"
  params: []

- id: p1_snapshot
  label: "[P1] Snapshot"
  kind: action
  command: "31 8F"
  params: []
  notes: "Stores one memory after another until all 9 stored."

- id: p1_showall_toggle
  label: "[P1] Show All On/Off"
  kind: action
  command: "31 88"
  params: []

- id: p1_showall_on
  label: "[P1] Show All On"
  kind: action
  command: "31 89"
  params: []

- id: p1_showall_off
  label: "[P1] Show All Off"
  kind: action
  command: "31 8A"
  params: []

- id: p1_erase_memory
  label: "[P1] Erase Memory"
  kind: action
  command: "31 A5"
  params: []

- id: p1_get_showall
  label: "[P1] Get Show All"
  kind: query
  command: "31 8B"
  params: []

- id: p1_freeze_toggle
  label: "[P1] Freeze On/Off"
  kind: action
  command: "D7"
  params: []

- id: p1_freeze_on
  label: "[P1] Freeze On"
  kind: action
  command: "31 A6"
  params: []

- id: p1_freeze_off
  label: "[P1] Freeze Off"
  kind: action
  command: "31 A7"
  params: []

- id: p1_get_freeze
  label: "[P1] Get Freeze"
  kind: query
  command: "31 A8"
  params: []

# --- Image Turn (P1, page 1) ---
- id: p1_image_turn
  label: "[P1] Image Turn"
  kind: action
  command: "31 84"
  params: []

- id: p1_portrait_on
  label: "[P1] Portrait On"
  kind: action
  command: "31 85"
  params: []
  notes: "Image turn -90°."

- id: p1_image_turn_off
  label: "[P1] Image Turn Off"
  kind: action
  command: "31 86"
  params: []

- id: p1_get_image_turn
  label: "[P1] Get Image Turn"
  kind: query
  command: "31 87"
  params: []
  notes: "Returns '0'(0°), '1'(-90°), '2'(180°), '3'(+90°) + LF + CR."

# --- Miscellaneous (P1) ---
- id: p1_blank_echo
  label: "[P1] Blank Echo"
  kind: action
  command: "20"
  params: []
  notes: "Echoes blank; readiness poll."

- id: p1_version
  label: "[P1] Visualizer Type + Software Version"
  kind: query
  command: "76"
  params: []
  notes: "Returns e.g. 'EYE-12 V1.10a '+LF+CR."

- id: p1_debug_on
  label: "[P1] Debug Mode On"
  kind: action
  command: "FA"
  params: []

- id: p1_status
  label: "[P1] Status"
  kind: query
  command: "3F"
  params: []
  notes: "Debug mode only."

- id: p1_debug_off
  label: "[P1] Debug Mode Off"
  kind: action
  command: "FB"
  params: []

- id: p1_ascii_input
  label: "[P1] ASCII Text Input Mode"
  kind: action
  command: "5F"
  params: []
  notes: "Initiates 3-digit decimal ASCII command input."

- id: p1_stop_all
  label: "[P1] Stop All"
  kind: action
  command: "80"
  params: []
  notes: "Stops zoom/focus/iris movement."

- id: p1_key_lock_on
  label: "[P1] Key Lock On"
  kind: action
  command: "AF"
  params: []

- id: p1_key_lock_off
  label: "[P1] Key Lock Off"
  kind: action
  command: "B0"
  params: []

- id: p1_get_key_lock
  label: "[P1] Get Key Lock"
  kind: query
  command: "AE"
  params: []

- id: p1_get_status
  label: "[P1] Get Status"
  kind: query
  command: "A0"
  params: []
  notes: "Returns all settings as single-line ASCII string."

- id: p1_switch_ir_code
  label: "[P1] Switch IR Code"
  kind: action
  command: "DD"
  params: []
  notes: "Cycles A→B→C→D."

# --- Output Signal (P1, page 1) ---
- id: p1_positive_on
  label: "[P1] Switch Positive On"
  kind: action
  command: "31 97"
  params: []

- id: p1_negative_on
  label: "[P1] Switch Negative On"
  kind: action
  command: "31 98"
  params: []

- id: p1_negative_blue_on
  label: "[P1] Switch Negative Blue On"
  kind: action
  command: "31 99"
  params: []

- id: p1_get_pos_neg
  label: "[P1] Get Positive/Negative"
  kind: query
  command: "31 9A"
  params: []
  notes: "Returns '0'(Pos), '1'(Neg), '2'(Neg/Blue)."

- id: p1_color_on
  label: "[P1] Switch Color On"
  kind: action
  command: "31 9B"
  params: []

- id: p1_bw_on
  label: "[P1] Switch Black/White On"
  kind: action
  command: "31 9C"
  params: []

- id: p1_get_bw
  label: "[P1] Get Black/White"
  kind: query
  command: "31 9D"
  params: []

- id: p1_detail_off
  label: "[P1] Detail Off"
  kind: action
  command: "E1"
  params: []

- id: p1_detail_medium
  label: "[P1] Detail Medium"
  kind: action
  command: "E2"
  params: []

- id: p1_detail_high
  label: "[P1] Detail High"
  kind: action
  command: "E3"
  params: []

# --- Output Resolution (P1, page 1) ---
- id: p1_resolution_up
  label: "[P1] Resolution Up"
  kind: action
  command: "31 90"
  params: []
  notes: "Both outputs (RGB+DVI)."

- id: p1_resolution_down
  label: "[P1] Resolution Down"
  kind: action
  command: "31 91"
  params: []

- id: p1_resolution_auto
  label: "[P1] Resolution Auto"
  kind: action
  command: "31 92"
  params: []

- id: p1_get_resolution
  label: "[P1] Get Resolution"
  kind: query
  command: "31 A9"
  params: []

# --- Trigger (P1) ---
- id: p1_trigger_on
  label: "[P1] Trigger On"
  kind: action
  command: "91"
  params: []

- id: p1_trigger_off
  label: "[P1] Trigger Off"
  kind: action
  command: "92"
  params: []

- id: p1_trigger_edge_negative
  label: "[P1] Trigger Edge Negative"
  kind: action
  command: "93"
  params: []

- id: p1_trigger_edge_positive
  label: "[P1] Trigger Edge Positive"
  kind: action
  command: "94"
  params: []
```

## Feedbacks
```yaml
# Existing GET-based feedbacks preserved; additions appended.

- id: power_state
  type: enum
  values: [off, on]
  description: GET 00 30 00 - returns 00 30 01 yz

- id: zoom_position
  type: integer
  description: GET 00 20 00 - 2-byte position 0x0000-0xFFFF

- id: focus_position
  type: integer
  description: GET 00 21 00 - 2-byte position

- id: digital_zoom_position
  type: integer
  description: GET 00 28 00 - 2-byte position

- id: digital_zoom_mode
  type: enum
  values: [off, "2x", "4x"]

- id: auto_focus_state
  type: enum
  values: [off, on, one_push_af_running]

- id: auto_iris_state
  type: enum
  values: [off, on]

- id: iris_priority
  type: enum
  values: [auto, manual]

- id: arm_state
  type: enum
  values: [down, up, macro_11x, macro_12x, undefined]

- id: mirror_position
  type: object
  description: X and Y positions (GET 00 24 00, 00 25 00, 00 26 00)

- id: preset_recall
  type: integer
  description: Returns preset number 00-0xEF

- id: light_state
  type: enum
  values: [off, light_on_lb_off, lb_on_light_off, slidebox_on]

- id: lamp_blown
  type: enum
  values: [no_lamp_blown, lamp1_blown, lamp2_blown]

- id: lamp1_hours
  type: integer
  description: Hours in hex

- id: lamp2_hours
  type: integer
  description: Hours in hex

- id: resolution_rgb_state
  type: integer
  description: Current RGB resolution index

- id: resolution_dvi_state
  type: integer
  description: Current DVI resolution index

- id: freeze_state
  type: enum
  values: [off, on]

- id: color_mode_state
  type: enum
  values: [black_white, presentation, natural, video_conference, manual]

- id: white_balance_state
  type: enum
  values: [auto, one_push, manual]

- id: gain_state
  type: integer
  description: dB value or auto code

- id: shutter_state
  type: integer
  description: Step index or variable

- id: brightness_state
  type: integer
  description: Offset value −10 to +10

- id: saturation_state
  type: integer
  description: 0-172%

- id: ethernet_dhcp_state
  type: enum
  values: [off, on]

- id: ethernet_ip_state
  type: string
  description: 4 hex octets

- id: subnet_mask_state
  type: string
  description: 4 hex octets

- id: gateway_ip_state
  type: string
  description: 4 hex octets

- id: multicast_running
  type: enum
  values: [no, yes]

- id: model_info
  type: string
  description: GET 00 11 - model string

- id: serial_number
  type: string
  description: GET 00 12 - serial number

- id: firmware_version
  type: string
  description: GET 00 13 - e.g. "V1.10a"

- id: features
  type: string
  description: GET 00 16 - 8-byte feature bitmask

- id: reply_mode_state
  type: enum
  values: [off, command]

# ============================================================
# ADDED feedbacks (previously missing GET targets)
# ============================================================

- id: zoom_macro_state
  type: enum
  values: [off, "11x", "12x"]
  description: GET 00 2b 00 - returns 00 2b 01 yz

- id: digital_zoom_warning_state
  type: enum
  values: [stop, message, none]
  description: GET 00 2a 00 - returns 00 2a 01 yz

- id: height_adjustment_state
  type: enum
  values: [stop, running]
  description: GET 00 2d 00 - returns 00 2d 01 yz

- id: preset_special_function_key
  type: object
  description: GET 00 42 01 {preset} - returns 00 42 02 {preset} {function}

- id: list_of_sfk_functions
  type: string
  description: GET 00 43 00 - variable list of supported SFK functions (0xFF-terminated)

- id: store_mirror_pos_state
  type: enum
  values: [off, on]
  description: GET 00 4d 00 - returns 00 4d 01 yz

- id: power_on_preset_state
  type: enum
  values: [off, on]
  description: GET 00 34 00

- id: display_logo_state
  type: enum
  values: [off, on]
  description: GET 00 35 00

- id: mains_on_state
  type: enum
  values: [standby, power_on]
  description: GET 00 36 00

- id: auto_power_off_time_state
  type: integer
  description: "GET 00 37 00 - FF=Off, 1E=30min, 3C=1h, 78=2h, B4=3h, F0=4h"

- id: lamp_voltage_state
  type: enum
  values: [longlife, economic, bright]
  description: GET 00 a1 00

- id: laser_state
  type: integer
  description: GET 00 a2 00 - returns 00 a2 01 yz

- id: image_turn_state
  type: enum
  values: ["0deg", "-90deg", "180deg", "+90deg"]
  description: GET 00 83 00

- id: image_turn_rotation_state
  type: enum
  values: [cycle, "-90deg", "180deg", "+90deg"]
  description: GET 00 84 00

- id: keylock_state
  type: enum
  values: [off, on]
  description: GET 00 80 00

- id: ir_code_state
  type: integer
  description: GET 00 81 00 - yz see SET

- id: osd_level_state
  type: enum
  values: [quiet, talk, verbose]
  description: GET 00 82 00

- id: text_enhancer_state
  type: enum
  values: [off, on]
  description: GET 00 85 00

- id: image_state
  type: enum
  values: [off, on]
  description: GET 00 86 00

- id: lcd_brightness_state
  type: integer
  description: GET 00 87 00 - 0x00-0xFF

- id: debug_state
  type: enum
  values: [off, on]
  description: GET 00 88 00

- id: baudrate_state
  type: integer
  description: GET 00 89 00 - yz see SET

- id: number_ir_codes_state
  type: integer
  description: GET 00 18 00

- id: mounting_position_state
  type: enum
  values: [regular, flipped]
  description: GET 00 19 00

- id: menu_state
  type: enum
  values: [off, on]
  description: GET 00 98 00

- id: menu_unlock_state
  type: enum
  values: [off, on]
  description: GET 00 9a 00

- id: menu_extra_unlock_state
  type: enum
  values: [off, on]
  description: GET 00 9b 00

- id: video_format_state
  type: enum
  values: [ntsc, pal, off]
  description: GET 00 52 00

- id: detail_state
  type: enum
  values: [off, low, medium, high]
  description: GET 00 53 00

- id: pos_neg_blue_state
  type: enum
  values: [positive, negative, blue]
  description: GET 00 54 00

- id: color_bw_state
  type: enum
  values: [color, black_white]
  description: GET 00 55 00

- id: ext_int_state
  type: enum
  values: [intern, extern]
  description: GET 00 57 00

- id: autosense_state
  type: enum
  values: [off, on]
  description: GET 00 58 00

- id: extern_freeze_output_state
  type: integer
  description: GET 00 59 00 - returns 00 59 01 xy

- id: preview_output_state
  type: enum
  values: [preview, regular]
  description: GET 00 5a 00

- id: image_mirror_state
  type: enum
  values: [off, horizontal, vertical, h_plus_v]
  description: GET 00 5b 00

- id: memory_state
  type: enum
  values: [off, on]
  description: GET 00 90 00

- id: showall_state
  type: enum
  values: [off, on]
  description: GET 00 93 00

- id: erase_memory_state
  type: enum
  values: [manually, standby]
  description: GET 00 94 00

- id: trigger_mode_state
  type: enum
  values: [off, on]
  description: GET 00 6a 00

- id: trigger_edge_state
  type: enum
  values: [positive_edge, negative_edge]
  description: GET 00 6b 00

- id: back_light_compensation_state
  type: enum
  values: [off, medium, high]
  description: GET 00 6c 00

- id: gamma_normal_mode_state
  type: integer
  description: GET 00 68 00 - 0x00-0x03

- id: gamma_text_mode_state
  type: integer
  description: GET 00 69 00 - 0x00-0x03

- id: ethernet_mode_state
  type: enum
  values: [off, image_only, control_only, image_and_control, fw_update_only, image_and_fw, control_and_fw, image_control_and_fw]
  description: GET 00 74 00

- id: multicast_mode_state
  type: enum
  values: [off, auto, continuous]
  description: GET 00 75 00

- id: multicast_format_state
  type: integer
  description: GET 00 79 00 - yz see SET

- id: multicast_framerate_state
  type: enum
  values: [low, medium, high]
  description: GET 00 7A 00

- id: multicast_resolution_table
  type: string
  description: GET 00 7B 00 - returns 00 7B XY ab cd ef .. (max 255)

- id: adjuster
  type: string
  description: GET 00 14 00 - returns 00 14 0X ab cd ef .. (max 255)

- id: production_date
  type: string
  description: GET 00 15 00 - returns 00 15 02 wxyz (week, year). e.g. "36,07"

- id: resolution_table
  type: string
  description: GET 00 17 00 - returns 00 17 yz ab cd ef .. (max 224 bytes, 16*14 byte entries)

- id: description_string
  type: string
  description: GET 00 18 00 - returns 00 18 yz ab cd ef .. (max 255)

- id: hd_tv_mask_position
  type: integer
  description: GET 00 19 00 - returns 00 19 01 ab (-50 to 50)

- id: firmware_erase_flash_state
  type: integer
  description: GET 00 b0 00 - 0x00-0x64 = 0%-100% firmware erased

- id: osd_transparency_state
  type: enum
  values: [off, on]
  description: GET 00 c0 00

- id: osd_size_state
  type: enum
  values: [small, large]
  description: GET 00 c1 00

- id: osd_horizontal_position_state
  type: integer
  description: GET 00 c2 00 - 0-100%

- id: osd_vertical_position_state
  type: integer
  description: GET 00 c3 00 - 0-100%

- id: osd_status_position_state
  type: enum
  values: [top, bottom]
  description: GET 00 c4 00

- id: osd_selection_bar_color_state
  type: integer
  description: GET 00 c5 00

- id: osd_selected_text_color_state
  type: integer
  description: GET 00 c6 00

- id: osd_menu_text_color_state
  type: integer
  description: GET 00 c7 00

- id: osd_menu_headline_color_state
  type: integer
  description: GET 00 c8 00

- id: osd_menu_status_text_color_state
  type: integer
  description: GET 00 c9 00

# --- Block Inquiry (single command returns packed multi-value block) ---
- id: block_positions
  type: object
  description: "GET 00 10 01 00 - returns packed zoom/digital-zoom/focus/iris/mirror positions (see source byte map)"

- id: block_flags_unit_info
  type: object
  description: "GET 00 10 01 01 - returns flags + serial + version + model (see source byte map)"

- id: block_menu1
  type: object
  description: "GET 00 10 01 02 - returns packed menu-1 settings (see source byte map)"

- id: block_menu2
  type: object
  description: "GET 00 10 01 03 - returns packed menu-2 settings (see source byte map)"

- id: block_menu_ethernet
  type: object
  description: "GET 00 10 01 04 - returns packed ethernet menu settings (see source byte map)"

# --- Picture Transfer ---
- id: picture_header
  type: object
  description: "GET 00 b8 01 {yz} - returns 00 18 12 ... 20-byte header (width/height/flags/DMA size)"

- id: picture_block
  type: object
  description: "GET 00 b9 0a {ab cd ef gh ij kl mn op qr st} - returns 00 b9 01 yz (0x00=OK, 0x01=Failed)"
```

## Variables
```yaml
# Existing variables preserved.

- id: zoom_position
  type: integer
  get: "00 20 00"
  set: "01 20 02 yz wx"
  range: [0, 65535]

- id: focus_position
  type: integer
  get: "00 21 00"
  set: "01 21 02 yz wx"
  range: [0, 65535]

- id: digital_zoom_position
  type: integer
  get: "00 28 00"
  set: "01 28 02 yz wx"
  range: [0, 65535]

- id: mirror_x_position
  type: integer
  get: "00 25 00"
  set: "01 25 02 yz wx"
  range: [0, 65535]

- id: mirror_y_position
  type: integer
  get: "00 26 00"
  set: "01 26 02 yz wx"
  range: [0, 65535]

- id: light_focus_position
  type: integer
  get: "00 27 00"
  set: "01 27 02 yz wx"
  range: [0, 65535]

- id: r_gain
  type: integer
  get: "00 66 00"
  set: "01 66 01 yz"
  range: [0, 127]
  description: Manual WB R Gain, offset representation −64 to +63

- id: b_gain
  type: integer
  get: "00 67 00"
  set: "01 67 01 yz"
  range: [0, 127]
  description: Manual WB B Gain, offset representation −64 to +63

- id: shutter_speed_variable
  type: integer
  get: "00 63 00"
  set: "01 63 02 yz wx"
  range: [0, 65535]
  description: Exposure time in lines

- id: ethernet_ip
  type: string
  get: "00 71 00"
  set: "01 71 04 yz wx uv st"

- id: subnet_mask
  type: string
  get: "00 72 00"
  set: "01 72 04 yz wx uv st"

- id: gateway_ip
  type: string
  get: "00 73 00"
  set: "01 73 04 yz wx uv st"

- id: multicast_ip
  type: string
  get: "00 77 00"
  set: "01 77 04 yz wx uv st"

- id: multicast_port
  type: integer
  get: "00 78 00"
  set: "01 78 02 yz wx"
  description: Port 8800-9000 encoded as hex 2260-2328

# ADDED variables
- id: iris_position
  type: integer
  get: "00 22 00"
  set: "01 22 02 yz wx"
  range: [0, 65535]
  notes: "Protocol-1 compat note: GET 00 22 only allows length-0x00 commands (Prot1 compat)."

- id: mirror_arm_position
  type: integer
  get: "00 24 00"
  set: "01 24 02 yz wx"
  range: [0, 65535]
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism described in source.
# Device does not send spontaneous messages on serial by default;
# Reply Mode (01 AA 01 01) must be enabled to get responses.
```

## Macros
```yaml
# Blank echo polling: send 32 (0x20) until unit replies 32 - use to
# confirm unit is ready before sending next command.
# Example provided in source: "While the unit is not ready, there is no answer."
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety interlock procedures in source.
# Long-execution commands exist - poll Blank Echo before next command.
# Firmware update commands (01 B0-B4) are destructive; source documents no
# confirmation sequence beyond erase-flash → data-start → data → data-stop.
```

## Notes
- Ethernet control uses port **50915** (stated explicitly for room control systems).
- PoE supported on EYE-12 (see respective user manual — not included in this source).
- Backward compatible with Protocol 1 (first nibble of first byte = 0 → Protocol 2; otherwise Protocol 1).
- Error code 0xFF = unknown command. Error numbers: 1=Timeout, 2=Invalid Cmd, 3=Invalid Parameter, 4=Invalid Length, 5=Fifo Full, 6=Firmware Update Error, 7=Access Denied.
- Shortcut modes for terminal: "/" = Short SET, "+" = Long SET, "*" = GET. 3-second input timeout. Protocol 1 also supports "_" ASCII decimal input mode.
- USB 2.0 backward compatible with 1.0/1.1 at lower speed.
- No parity on serial; configurable baud rates: 9600/19200/38400/57600/115200 (default 115200).
- Firmware version readable via GET 00 13 (Protocol 1: command 0x76 returns "EYE-12 V1.10a").
- Reply modes (Protocol 1): $9C=off, $9D=one-byte ($06/$0F), $9E=two-byte, $9F=string ("OKAY"/"ERROR"). Reply mode change takes effect immediately on the command that changed it.
- Protocol 1 commands split into page 0 (standard) and page 1 (select via $31, auto-reverts to page 0 after execution).
- Source contains data-entry conflicts: opcode 0x18 reused for both "Number of IR Codes" (01 18 01 yz) and "Description" (01 18 yz AB CD...); Multicast Format table has duplicated index values. Recorded verbatim, not reconciled.
<!-- UNRESOLVED: TCP/HTTP control base URL not stated beyond port 50915 -->
<!-- UNRESOLVED: multicast port range 8800–9000 but exact default not stated -->
<!-- UNRESOLVED: Block-inquiry byte maps only partially decoded in source (bitfield diagrams garbled in extraction) -->
<!-- UNRESOLVED: Picture Transfer protocol (00 b8 / 00 b9) documented but block layout complex; only header shape captured -->

Upgrade pass complete. Added ~70 Protocol 2 SET actions (motor stop, macro, digital zoom, iris priority, height/light-mirror/light-focus, extended power/light/misc/menu/output/image-storing/exposure/color/ethernet/OSD, firmware update), full Protocol 1 legacy command set (~90 single-byte entries incl. page select, zoom/focus/iris/power/preset/menu/image/reply/image-storing/image-turn/misc/output-signal/resolution/trigger), ~50 missing GET feedbacks (block inquiry 00 10 01 00-04, picture transfer, all extended-state queries), iris_position + mirror_arm_position variables. Existing IDs/shapes preserved verbatim. Source conflicts (opcode 0x18 double-use, multicast format dup indices) recorded not reconciled.

## Provenance

```yaml
source_domains:
  - wolfvision.com
  - res.cloudinary.com
  - manua.ls
source_urls:
  - http://www.wolfvision.com/wolf/protocoll_eye12_scb12.pdf
  - "https://wolfvision.com/media/1086/download/vz-wolfprot-doc.pdf?v=8"
  - "https://res.cloudinary.com/iwh/image/upload/q_auto,g_center/assets/1/26/Documents/WolfVision/VZ_P18/vz_p18_doc_5.pdf"
  - https://wolfvision.com/wolf/commands_cynap_wolfvision/instructions/wolfprotprogguide.pdf
  - https://www.manua.ls/wolfvision
retrieved_at: 2026-07-17T05:18:48.866Z
last_checked_at: 2026-07-22T08:03:55.482Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T08:03:55.482Z
matched_actions: 220
action_count: 220
confidence: medium
summary: "All 220 spec actions (107 Protocol-2 SET opcodes + 113 Protocol-1 legacy single-byte codes, incl. page-select) match source literally with correct shapes; Feedbacks/Variables cover essentially the full GET/Block-Inquiry/Picture-Transfer catalogue; transport values (port 50915, 115200 8N1) verbatim in source. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "USB control protocol details not documented beyond physical layer"
- "TCP/HTTP control base URL not stated beyond port 50915"
- "multicast port range 8800–9000 but exact default not stated"
- "no unsolicited notification mechanism described in source."
- "no safety interlock procedures in source."
- "Block-inquiry byte maps only partially decoded in source (bitfield diagrams garbled in extraction)"
- "Picture Transfer protocol (00 b8 / 00 b9) documented but block layout complex; only header shape captured"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
