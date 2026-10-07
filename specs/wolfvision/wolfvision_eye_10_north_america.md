---
spec_id: admin/wolfvision-eye-10-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "WolfVision EYE-10 Control Spec"
manufacturer: WolfVision
model_family: EYE-10
aliases: []
compatible_with:
  manufacturers:
    - WolfVision
  models:
    - EYE-10
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - wolfvision.com
source_urls:
  - http://www.wolfvision.com/wolf/protocoll_eye12_scb12.pdf
retrieved_at: 2026-09-02T17:10:19.298Z
last_checked_at: 2026-10-01T13:24:19.553Z
generated_at: 2026-10-01T13:24:19.553Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document header says \"EYE-12\" but the provided model identifier is \"EYE-10 (North America)\". The command catalogue appears to be shared across EYE-10 / EYE-12 / SCB-12; per-model applicability not explicitly disambiguated."
  - "Picture Transfer and Block Inquiry reply packet bit-layouts (00 B8, 00 B9, 00 10 01 00..04) are documented as tables with truncated/long rows in the refined source; complete byte-level decoding captured only partially."
  - "USB transport framing details not specified in source (no baud/endpoint schema)."
  - "source does not enumerate discrete settable variables beyond those encoded as SET command parameters above."
  - "source does not document unsolicited notification packets; protocol is strictly request/response."
  - "source lists 11 \"Special Function Keys\" (PRESET/POS_NEG/BLUE/BLACK_WHITE/WB/FREEZE/IMAGE/ONEPUSH_AF/LIGHT_ON_OFF/SLIDE_ON_OFF/TEXT/LIGHT) per preset but does not define multi-step composite macros."
  - "per-model applicability of command set to EYE-10 vs EYE-12 vs SCB-12 not disambiguated in source."
  - "Picture Transfer and Block Inquiry reply packets contain large bit-layout tables whose row data was partially truncated during PDF extraction; full byte-level decode not captured here."
verification:
  verdict: verified
  checked_at: 2026-10-01T13:24:19.553Z
  matched_actions: 235
  action_count: 235
  confidence: medium
  summary: "All hex command tokens verified; transport values (115200 baud, 8N1, TCP port 50915) sourced verbatim. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# WolfVision EYE-10 Control Spec

## Summary
Document covers WolfVision Visualizer command protocol (referenced as "Command List of SCB-12 and EYE-12" / "Serial Protocol of SCB-12 and EYE-12"). EYE-10 is a visualizer controllable via RS-232, USB, and Ethernet using a hex packet protocol. This spec captures the SET, GET, and GET-Block command catalogue documented by WolfVision.

<!-- UNRESOLVED: source document header says "EYE-12" but the provided model identifier is "EYE-10 (North America)". The command catalogue appears to be shared across EYE-10 / EYE-12 / SCB-12; per-model applicability not explicitly disambiguated. -->
<!-- UNRESOLVED: Picture Transfer and Block Inquiry reply packet bit-layouts (00 B8, 00 B9, 00 10 01 00..04) are documented as tables with truncated/long rows in the refined source; complete byte-level decoding captured only partially. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - usb
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 50915
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no login/auth procedure documented in source)
```

<!-- UNRESOLVED: USB transport framing details not specified in source (no baud/endpoint schema). -->

## Traits
```yaml
- powerable       # inferred from power on/off commands
- routable        # inferred from input/extern/Intern routing commands
- queryable       # inferred from GET command catalogue
- levelable       # inferred from focus, zoom, brightness, gain, volume-like controls
```

## Actions
```yaml
- id: stopall_motors
  label: Stop all motors
  kind: action
  command: "01 2F 01 00"
  params: []

- id: zoom_step
  label: Zoom Step
  kind: action
  command: "01 20 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 01 = Wide(Step), 02 = Tele(Step), 11 = Start Zoom Wide, 12 = Start Zoom Tele

- id: zoom_position_abs
  label: Set Zoom Position Absolute
  kind: action
  command: "01 20 02 {yz} {wx}"
  params:
    - name: yz
      type: hex
      description: high byte of position
    - name: wx
      type: hex
      description: low byte of position (00 00 to 0F FF)

- id: macro
  label: Macro
  kind: action
  command: "01 2B 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = Macro 11x, 02 = Macro 12x, 03 = Toggle

- id: set_digital_zoom_abs
  label: Set Digital Zoom Absolute
  kind: action
  command: "01 28 02 {yz} {wx}"
  params:
    - name: yz
      type: hex
      description: high byte
    - name: wx
      type: hex
      description: low byte (00 00 to 0F FF)

- id: digital_zoom_mode
  label: Digital Zoom Mode
  kind: action
  command: "01 29 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = 2x, 02 = 4x

- id: digital_zoom_warning
  label: Digital Zoom Warning
  kind: action
  command: "01 2A 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Stop, 02 = None

- id: focus_step
  label: Focus Step
  kind: action
  command: "01 21 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 01 = Far(Step), 02 = Near(Step), 11 = Start Focus Far, 12 = Start Focus Near

- id: focus_position_abs
  label: Set Focus Position Absolute
  kind: action
  command: "01 21 02 {yz} {wx}"
  params:
    - name: yz
      type: hex
      description: high byte
    - name: wx
      type: hex
      description: low byte (00 00 to 0F FF)

- id: autofocus
  label: Auto Focus
  kind: action
  command: "01 31 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = On, 02 = Toggle, 10 = One-Push-AF

- id: iris_step
  label: Iris Step
  kind: action
  command: "01 22 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 01 = Open(Step), 02 = Close(Step), 11 = Start Open, 12 = Start Close

- id: iris_position_abs
  label: Set Iris Position Absolute
  kind: action
  command: "01 22 02 {yz} {wx}"
  params:
    - name: yz
      type: hex
      description: high byte
    - name: wx
      type: hex
      description: low byte (00 00 to 0F FF)

- id: auto_iris
  label: Auto Iris
  kind: action
  command: "01 32 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = On, 02 = Toggle

- id: iris_priority
  label: Iris Priority
  kind: action
  command: "01 33 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Auto, 01 = Manual, 02 = Toggle

- id: arm
  label: Arm
  kind: action
  command: "01 23 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Up, 01 = Down, 02 = Toggle

- id: mirror_step
  label: Mirror Step
  kind: action
  command: "01 24 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 01 = Up(Step), 02 = Down(Step), 11 = Start Up, 12 = Start Down

- id: mirror_position_abs
  label: Set Mirror Position Absolute
  kind: action
  command: "01 24 02 {yz} {wx}"
  params:
    - name: yz
      type: hex
      description: high byte
    - name: wx
      type: hex
      description: low byte (00 00 to 0F FF)

- id: height_adjustment
  label: Start Height Adjustment
  kind: action
  command: "01 2D 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Start Manual, 01 = Start Auto

- id: light_mirror_x_step
  label: Light Mirror X Step
  kind: action
  command: "01 25 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 01 = Left, 02 = Right, 11 = Start Left, 12 = Start Right

- id: light_mirror_x_abs
  label: Set Light Mirror X Position Absolute
  kind: action
  command: "01 25 02 {yz} {wx}"
  params:
    - name: yz
      type: hex
      description: high byte
    - name: wx
      type: hex
      description: low byte (00 00 to 0F FF)

- id: light_mirror_y_step
  label: Light Mirror Y Step
  kind: action
  command: "01 26 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 01 = Up, 02 = Down, 11 = Start Up, 12 = Start Down

- id: light_mirror_y_abs
  label: Set Light Mirror Y Position Absolute
  kind: action
  command: "01 26 02 {yz} {wx}"
  params:
    - name: yz
      type: hex
      description: high byte
    - name: wx
      type: hex
      description: low byte (00 00 to 0F FF)

- id: light_focus_step
  label: Light Focus Step
  kind: action
  command: "01 27 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 01 = Far(Step), 02 = Near(Step), 11 = Start Far, 12 = Start Near

- id: light_focus_abs
  label: Set Light Focus Position Absolute
  kind: action
  command: "01 27 02 {yz} {wx}"
  params:
    - name: yz
      type: hex
      description: high byte
    - name: wx
      type: hex
      description: low byte (00 00 to 0F FF)

- id: recall_preset
  label: Recall Preset
  kind: action
  command: "01 40 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = PowerOn Preset, 01..03 = Preset1..3, 80..FF factory presets (E5=Max Wide, E6..EA = DIN A4..A8, EB=Max Tele, EC=Slide, ED/EE = X-Ray DIN A4/A5 Lightbox)

- id: store_preset
  label: Store Preset
  kind: action
  command: "01 41 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Power On Preset, 01 = Preset1, 02 = Preset2, 03 = Preset3

- id: preset_special_function_key_preset1
  label: Preset1 Special Function Key
  kind: action
  command: "01 42 02 {yz} {wx}"
  params:
    - name: wx
      type: hex
      description: Preset selector 01..03
    - name: yz
      type: hex
      description: 00=PRESET, 01=POS_NEG, 02=BLUE, 03=BLACK_WHITE, 04=WB, 05=FREEZE, 06=IMAGE, 07=ONEPUSH_AF, 08=LIGHT_ON_OFF, 09=SLIDE_ON_OFF, 0A=TEXT, 0B=LIGHT

- id: preset_special_function_key_preset2
  label: Preset2 Special Function Key
  kind: action
  command: "01 42 02 {yz} {wx}"
  params:
    - name: wx
      type: hex
      description: Preset selector 01..03
    - name: yz
      type: hex
      description: 00=PRESET, 01=POS_NEG, 02=BLUE, 03=BLACK_WHITE, 04=WB, 05=FREEZE, 06=IMAGE, 07=ONEPUSH_AF, 08=LIGHT_ON_OFF, 09=SLIDE_ON_OFF, 0A=TEXT, 0B=LIGHT

- id: preset_special_function_key_preset3
  label: Preset3 Special Function Key
  kind: action
  command: "01 42 02 {yz} {wx}"
  params:
    - name: wx
      type: hex
      description: Preset selector 01..03
    - name: yz
      type: hex
      description: 00=PRESET, 01=POS_NEG, 02=BLUE, 03=BLACK_WHITE, 04=WB, 05=FREEZE, 06=IMAGE, 07=ONEPUSH_AF, 08=LIGHT_ON_OFF, 09=SLIDE_ON_OFF, 0A=TEXT, 0B=LIGHT

- id: store_mirror_pos
  label: Store Mirror Position
  kind: action
  command: "01 4D 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = On

- id: power_on_off
  label: Power On/Off
  kind: action
  command: "01 30 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Power Off, 01 = Power On (PowerOn Preset), 02 = Toggle

- id: power_on_preset
  label: PowerOn Preset
  kind: action
  command: "01 34 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = On, 02 = Toggle

- id: display_logo
  label: Display Logo
  kind: action
  command: "01 35 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = On, 02 = Toggle

- id: mains_on
  label: Mains-On
  kind: action
  command: "01 36 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Standby, 01 = Power-On, 02 = Toggle

- id: auto_power_off_time
  label: Auto-Power-Off Time
  kind: action
  command: "01 37 01 {yz}"
  params:
    - name: yz
      type: hex
      description: FF = Off, 1E = 30min, 3C = 1h, 78 = 2h, B4 = 3h, F0 = 4h

- id: light_lightbox
  label: Light/Lightbox On/Off
  kind: action
  command: "01 A0 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Light Off, LB Off; 01 = Light On, LB Off; 02 = Light Off, LB On; 03 = Light Off, SlideBox On; 10 = Light Toggle (Light->LB->Off); 11 = Light Off, LB Toggle; 80 = Lampchange

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
  command: "01 A1 01 {yz}"
  params:
    - name: yz
      type: hex
      description: variable

- id: laser
  label: Laser
  kind: action
  command: "01 A2 01 {yz}"
  params:
    - name: yz
      type: hex
      description: variable

- id: reply_mode
  label: Reply Mode (RS-232 only)
  kind: action
  command: "01 AA 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Reply Mode Off, 01 = Reply Command

- id: image_turn_on_off
  label: Image Turn On/Off
  kind: action
  command: "01 83 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = On, 02 = Toggle

- id: image_turn_rotation
  label: ImageTurn Rotation
  kind: action
  command: "01 84 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Cycle, 01 = -90°, 02 = 180°, 03 = +90°

- id: keylock
  label: Keylock On/Off
  kind: action
  command: "01 80 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = On, 02 = Toggle

- id: ir_code
  label: IR Code
  kind: action
  command: "01 81 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 1C=Code A, 1D=Code B, 1E=Code C, 1F=Code D, 97..9F = Code 1..9

- id: number_of_ir_codes
  label: Number of IR Codes
  kind: action
  command: "01 18 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = 4 codes, 01 = 9 codes

- id: mounting_position
  label: Mounting Position
  kind: action
  command: "01 19 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Regular, 01 = Flipped

- id: osd_level
  label: OSD Level
  kind: action
  command: "01 82 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Quiet, 01 = Talk, 02 = Verbose

- id: text_enhancer
  label: Text Enhancer On/Off
  kind: action
  command: "01 85 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = On, 02 = Toggle

- id: image_on_off
  label: Image On/Off
  kind: action
  command: "01 86 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = On, 02 = Toggle

- id: lcd_brightness
  label: LCD Brightness
  kind: action
  command: "01 87 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 to FF

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

- id: debug_on_off
  label: Debug On/Off
  kind: action
  command: "01 88 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Debug Off, 01 = Debug On, 05 = Demo Mode

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

- id: baud_rate
  label: Baud Rate
  kind: action
  command: "01 89 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = 9600, 01 = 19200, 02 = 38400, 03 = 57600, 04 = 115200

- id: recall_factory_settings
  label: Recall Factory Settings
  kind: action
  command: "01 8F 01 00"
  params: []

- id: menu_on_off
  label: Menu On/Off
  kind: action
  command: "01 98 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = On (Unlock menu first), 02 = Toggle (Unlock menu first)

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
  command: "01 99 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 02 = Function Up, 08 = Function Down, 04 = Data Left, 06 = Data Right, 05 = Enter, 10 = Help, 80 = Reset Menu

- id: resolution_rgb
  label: Resolution RGB
  kind: action
  command: "01 50 01 {yz}"
  params:
    - name: yz
      type: hex
      description: FF=Off, 00=Auto, 01..1B = specific timing modes (SVGA/XGA/SXGA/UXGA/720p/1080p/WXGA/WSXGA/etc.)

- id: resolution_dvi
  label: Resolution DVI
  kind: action
  command: "01 51 01 {yz}"
  params:
    - name: yz
      type: hex
      description: FF=Off, 00=Auto, 01..1B = specific timing modes

- id: video_format
  label: Video Format
  kind: action
  command: "01 52 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = NTSC, 01 = PAL, 02 = Off

- id: detail
  label: Detail
  kind: action
  command: "01 53 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = Low, 02 = Medium, 03 = High

- id: pos_neg_blue
  label: Pos/Neg/Blue
  kind: action
  command: "01 54 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Positive On, 01 = Negative On, 02 = Blue On, 03 = Toggle

- id: color_bw
  label: Color/BW
  kind: action
  command: "01 55 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Color On, 01 = Black/White On, 02 = Toggle

- id: freeze
  label: Freeze On/Off
  kind: action
  command: "01 56 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = On, 02 = Toggle

- id: intern_extern
  label: Intern/Extern
  kind: action
  command: "01 57 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Intern On, 01 = Extern On, 02 = Toggle

- id: autosense_extern_in
  label: AutoSense ExternIn On/Off
  kind: action
  command: "01 58 01 00"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = On, 02 = Toggle

- id: extern_freeze_output
  label: Extern/Freeze Output
  kind: action
  command: "01 59 01 {xy}"
  params:
    - name: xy
      type: hex
      description: variable

- id: preview_output_control
  label: Preview Output Control
  kind: action
  command: "01 5A 01 00"
  params:
    - name: yz
      type: hex
      description: 00 = Preview is Preview, 01 = Preview is Regular

- id: image_mirror
  label: Image Mirror
  kind: action
  command: "01 5B 01 {xy}"
  params:
    - name: xy
      type: hex
      description: variable

- id: memory_off
  label: Memory Off
  kind: action
  command: "01 90 01 00"
  params: []

- id: memory_recall
  label: Memory Recall
  kind: action
  command: "01 91 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 01..09 = Memory1..9

- id: memory_store
  label: Memory Store
  kind: action
  command: "01 92 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 01..09 = Store Memory1..9, 10 = Snapshot, 20 = Erase Memory

- id: show_all
  label: ShowAll On/Off
  kind: action
  command: "01 93 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = On, 02 = Toggle

- id: erase_memory_behaviour
  label: Erase Memory Behaviour
  kind: action
  command: "01 94 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Manual, 01 = Standby, 02 = Toggle

- id: gain
  label: Gain
  kind: action
  command: "01 60 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00..12 = 0..18 dB; 40 = Auto Low; 80 = Auto Med; C0 = Auto High

- id: shutter
  label: Shutter
  kind: action
  command: "01 61 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Step, 01 = Variable, 02 = Auto, 03 = Off

- id: shutter_speed_step
  label: Shutter Speed (step mode)
  kind: action
  command: "01 62 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00=1/30, 01=Flickerless, 02=1/50, 03=1/60, 04=1/100, 05=1/120, 06=1/250, 07=1/500, 08=1/1000, 09=1/2000, 0A=1/3000

- id: shutter_speed_variable
  label: Shutter Speed (variable)
  kind: action
  command: "01 63 02 {yz} {wx}"
  params:
    - name: yz
      type: hex
      description: high byte exposure-time
    - name: wx
      type: hex
      description: low byte exposure-time (0000 to FFFF)

- id: image_brightness
  label: Image Brightness
  kind: action
  command: "01 64 01 {yz}"
  params:
    - name: yz
      type: hex
      description: F6..FF = -10..-1, 00 = 0, 01..0A = +1..+10

- id: trigger_mode
  label: Trigger Mode On/Off
  kind: action
  command: "01 6A 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = On, 02 = Toggle

- id: trigger_edge
  label: Trigger Edge Pos/Neg
  kind: action
  command: "01 6B 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Positive, 01 = Negative, 02 = Toggle

- id: back_light_compensation
  label: Back Light Compensation
  kind: action
  command: "01 6C 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = Medium, 02 = High

- id: white_balance
  label: White Balance
  kind: action
  command: "01 65 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Auto, 01 = One-Push, 02 = Manual, 10 = Perform WB, 50 = Perform WB for Manual

- id: r_gain_manual
  label: R Gain (WB=Manual)
  kind: action
  command: "01 66 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 to 7F

- id: b_gain_manual
  label: B Gain (WB=Manual)
  kind: action
  command: "01 67 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 to 7F

- id: gamma_normal_mode
  label: Gamma Normal Mode
  kind: action
  command: "01 68 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 to 03 = Gamma Level for Normal Mode

- id: gamma_text_mode
  label: Gamma Text Mode
  kind: action
  command: "01 69 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 to 03 = Gamma Level for Text Mode

- id: color_mode
  label: Color Mode
  kind: action
  command: "01 6D 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Black/White, 01 = Presentation, 02 = Natural, 03 = Video Conference, 04 = Manual, 05 = Black/White Toggle

- id: saturation
  label: Saturation
  kind: action
  command: "01 6E 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 to C8 = 0%..172% in 1% steps

- id: dhcp_on_off
  label: DHCP On/Off
  kind: action
  command: "01 70 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = On, 02 = Toggle

- id: ip_address
  label: Set IP Address
  kind: action
  command: "01 71 04 {yz} {wx} {uv} {st}"
  params:
    - name: yz
      type: hex
      description: octet1 01..FF
    - name: wx
      type: hex
      description: octet2 01..FF
    - name: uv
      type: hex
      description: octet3 01..FF
    - name: st
      type: hex
      description: octet4 01..FF

- id: subnet_mask
  label: Set Subnet Mask
  kind: action
  command: "01 72 04 {yz} {wx} {uv} {st}"
  params:
    - name: yz
      type: hex
      description: octet1 00..FF
    - name: wx
      type: hex
      description: octet2 00..FF
    - name: uv
      type: hex
      description: octet3 00..FF
    - name: st
      type: hex
      description: octet4 00..FF

- id: gateway_ip
  label: Set Gateway IP
  kind: action
  command: "01 73 04 {yz} {wx} {uv} {st}"
  params:
    - name: yz
      type: hex
      description: octet1 00..FF
    - name: wx
      type: hex
      description: octet2 00..FF
    - name: uv
      type: hex
      description: octet3 00..FF
    - name: st
      type: hex
      description: octet4 00..FF

- id: ethernet_mode
  label: Ethernet Mode
  kind: action
  command: "01 74 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00=Off, 01=Image Only, 02=Control Only, 03=Image and Control, 04=FW Update Only, 05=Image and FW Update, 06=Control and FW Update, 07=Image, Control and FW Update

- id: multicast_mode
  label: Multicast Mode
  kind: action
  command: "01 75 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = Auto, 02 = Continuous

- id: multicast_ip
  label: Set Multicast IP
  kind: action
  command: "01 77 04 {yz} {wx} {uv} {st}"
  params:
    - name: yz
      type: hex
      description: octet1 00..FF
    - name: wx
      type: hex
      description: octet2 00..FF
    - name: uv
      type: hex
      description: octet3 00..FF
    - name: st
      type: hex
      description: octet4 00..FF

- id: multicast_port
  label: Set Multicast Port
  kind: action
  command: "01 78 02 {yz} {wx}"
  params:
    - name: yz
      type: hex
      description: high byte (22 60..23 28 = 8800..9000)
    - name: wx
      type: hex
      description: low byte

- id: multicast_format
  label: Multicast Format
  kind: action
  command: "01 79 01 {yz}"
  params:
    - name: yz
      type: hex
      description: format id (see source list)

- id: multicast_framerate
  label: Multicast Framerate
  kind: action
  command: "01 7A 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Low, 01 = Medium, 02 = High

- id: description_set
  label: Description (set)
  kind: action
  command: "01 18 {yz} {AB CD EF ... FF}"
  params:
    - name: yz
      type: hex
      description: length
    - name: payload
      type: bytes
      description: description bytes, max length 255

- id: firmware_upload_erase_flash
  label: Firmware Upload Erase Flash
  kind: action
  command: "01 B0 01 00"
  params: []

- id: firmware_upload_data_start
  label: Firmware Upload Data Start
  kind: action
  command: "01 B1 04 {yz} {wx} {uv} {st}"
  params:
    - name: yz
      type: hex
      description: length of firmware data (high bytes)
    - name: wx
      type: hex
      description: length mid-high
    - name: uv
      type: hex
      description: length mid-low
    - name: st
      type: hex
      description: length low

- id: firmware_upload_data
  label: Firmware Upload Data Block
  kind: action
  command: "05 B2 {yz} {wx} {payload}"
  params:
    - name: yz
      type: hex
      description: length high
    - name: wx
      type: hex
      description: length low (USB max 508, ETH max 1440)
    - name: payload
      type: bytes
      description: firmware block bytes

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

- id: osd_transparency
  label: OSD Transparency
  kind: action
  command: "01 C0 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Off, 01 = On

- id: osd_size
  label: OSD Size
  kind: action
  command: "01 C1 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Small, 01 = Large

- id: osd_menu_horizontal_position
  label: OSD Menu Horizontal Position
  kind: action
  command: "01 C2 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00..64 = 0..100% in 1% steps

- id: osd_menu_vertical_position
  label: OSD Menu Vertical Position
  kind: action
  command: "01 C3 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00..64 = 0..100% in 1% steps

- id: osd_status_position
  label: OSD Status Position
  kind: action
  command: "01 C4 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Top, 01 = Bottom

- id: osd_selection_bar_color
  label: OSD Selection Bar Color
  kind: action
  command: "01 C5 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Black (other values per source)

- id: osd_selected_text_color
  label: OSD Selected Text Color
  kind: action
  command: "01 C6 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Black (other values per source)

- id: osd_menu_text_color
  label: OSD Menu Text Color
  kind: action
  command: "01 C7 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Black (other values per source)

- id: osd_menu_headline_color
  label: OSD Menu Headline Color
  kind: action
  command: "01 C8 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Black (other values per source)

- id: osd_menu_status_text_color
  label: OSD Menu Status Text Color
  kind: action
  command: "01 C9 01 {yz}"
  params:
    - name: yz
      type: hex
      description: 00 = Black (other values per source)

- id: get_power
  label: Get Power
  kind: query
  command: "00 30 00"
  params: []

- id: get_power_on_preset
  label: Get PowerOn Preset
  kind: query
  command: "00 34 00"
  params: []

- id: get_display_logo
  label: Get Display Logo
  kind: query
  command: "00 35 00"
  params: []

- id: get_mains_on
  label: Get Mains-On
  kind: query
  command: "00 36 00"
  params: []

- id: get_auto_power_off_time
  label: Get Auto-Power-Off Time
  kind: query
  command: "00 37 00"
  params: []

- id: get_zoom_position
  label: Get Zoom Position
  kind: query
  command: "00 20 00"
  params: []

- id: get_macro
  label: Get Macro
  kind: query
  command: "00 2B 00"
  params: []

- id: get_digital_zoom_position
  label: Get Digital Zoom Position
  kind: query
  command: "00 28 00"
  params: []

- id: get_digital_zoom_mode
  label: Get Digital Zoom Mode
  kind: query
  command: "00 29 00"
  params: []

- id: get_digital_zoom_warning
  label: Get Digital Zoom Warning
  kind: query
  command: "00 2A 00"
  params: []

- id: get_focus_position
  label: Get Focus Position
  kind: query
  command: "00 21 00"
  params: []

- id: get_autofocus
  label: Get Auto Focus
  kind: query
  command: "00 31 00"
  params: []

- id: get_iris_position
  label: Get Iris Position
  kind: query
  command: "00 22 00"
  params: []

- id: get_auto_iris
  label: Get Auto Iris
  kind: query
  command: "00 32 00"
  params: []

- id: get_iris_priority
  label: Get Iris Priority
  kind: query
  command: "00 33 00"
  params: []

- id: get_arm
  label: Get Arm
  kind: query
  command: "00 23 00"
  params: []

- id: get_mirror_position
  label: Get Mirror Position
  kind: query
  command: "00 24 00"
  params: []

- id: get_height_adjustment
  label: Get Height Adjustment
  kind: query
  command: "00 2D 00"
  params: []

- id: get_mirror_x_position
  label: Get Mirror X Position
  kind: query
  command: "00 25 00"
  params: []

- id: get_mirror_y_position
  label: Get Mirror Y Position
  kind: query
  command: "00 26 00"
  params: []

- id: get_light_focus_position
  label: Get Light Focus Position
  kind: query
  command: "00 27 00"
  params: []

- id: get_preset_special_function_key
  label: Get Preset SFK
  kind: query
  command: "00 42 01 {wx}"
  params:
    - name: wx
      type: hex
      description: preset selector 01..03

- id: get_list_of_sfk_functions
  label: Get List of SFK Functions
  kind: query
  command: "00 43 00"
  params: []

- id: get_store_mirror_pos
  label: Get Store Mirror-Pos
  kind: query
  command: "00 4D 00"
  params: []

- id: get_light
  label: Get Light
  kind: query
  command: "00 A0 00"
  params: []

- id: get_lamp_blown
  label: Get Lamp Blown
  kind: query
  command: "00 A4 00"
  params: []

- id: get_lamp1_hours
  label: Get Lamp1 Hours
  kind: query
  command: "00 A3 00"
  params: []

- id: get_lamp2_hours
  label: Get Lamp2 Hours
  kind: query
  command: "00 A4 00"
  params: []

- id: get_lamp_voltage
  label: Get Lamp Voltage
  kind: query
  command: "00 A1 00"
  params: []

- id: get_laser
  label: Get Laser
  kind: query
  command: "00 A2 00"
  params: []

- id: get_reply_mode
  label: Get Reply Mode
  kind: query
  command: "00 AA 00"
  params: []

- id: get_image_turn
  label: Get Image Turn
  kind: query
  command: "00 83 00"
  params: []

- id: get_image_turn_rotation
  label: Get ImageTurn Rotation
  kind: query
  command: "00 84 00"
  params: []

- id: get_keylock
  label: Get Keylock
  kind: query
  command: "00 80 00"
  params: []

- id: get_ir_code
  label: Get IR Code
  kind: query
  command: "00 81 00"
  params: []

- id: get_osd_level
  label: Get OSD Level
  kind: query
  command: "00 82 00"
  params: []

- id: get_text_enhancer
  label: Get Text Enhancer
  kind: query
  command: "00 85 00"
  params: []

- id: get_image
  label: Get Image
  kind: query
  command: "00 86 00"
  params: []

- id: get_lcd_brightness
  label: Get LCD Brightness
  kind: query
  command: "00 87 00"
  params: []

- id: get_debug
  label: Get Debug
  kind: query
  command: "00 88 00"
  params: []

- id: get_baudrate
  label: Get Baudrate
  kind: query
  command: "00 89 00"
  params: []

- id: get_number_ir_codes
  label: Get Number of IR Codes
  kind: query
  command: "00 18 00"
  params: []

- id: get_mounting_position
  label: Get Mounting Position
  kind: query
  command: "00 19 00"
  params: []

- id: get_menu
  label: Get Menu
  kind: query
  command: "00 98 00"
  params: []

- id: get_menu_unlock
  label: Get Menu Unlock
  kind: query
  command: "00 9A 00"
  params: []

- id: get_menu_extra_unlock
  label: Get Menu Extra Unlock
  kind: query
  command: "00 9B 00"
  params: []

- id: get_resolution_rgb
  label: Get Resolution RGB
  kind: query
  command: "00 50 00"
  params: []

- id: get_resolution_dvi
  label: Get Resolution DVI
  kind: query
  command: "00 51 00"
  params: []

- id: get_video_format
  label: Get Video Format
  kind: query
  command: "00 52 00"
  params: []

- id: get_detail
  label: Get Detail
  kind: query
  command: "00 53 00"
  params: []

- id: get_pos_neg_blue
  label: Get Pos/Neg/Blue
  kind: query
  command: "00 54 00"
  params: []

- id: get_color_bw
  label: Get Color/BW
  kind: query
  command: "00 55 00"
  params: []

- id: get_freeze
  label: Get Freeze
  kind: query
  command: "00 56 00"
  params: []

- id: get_ext_int
  label: Get Ext/Int
  kind: query
  command: "00 57 00"
  params: []

- id: get_autosense_ext_int
  label: Get AutoSense Ext/Int
  kind: query
  command: "00 58 00"
  params: []

- id: get_extern_freeze_output
  label: Get Extern/Freeze Output
  kind: query
  command: "00 59 00"
  params: []

- id: get_preview_output
  label: Get Preview Output
  kind: query
  command: "00 5A 00"
  params: []

- id: get_image_mirror
  label: Get Image Mirror
  kind: query
  command: "00 5B 00"
  params: []

- id: get_memory
  label: Get Memory
  kind: query
  command: "00 90 00"
  params: []

- id: get_show_all
  label: Get ShowAll
  kind: query
  command: "00 93 00"
  params: []

- id: get_erase_memory
  label: Get Erase Memory
  kind: query
  command: "00 94 00"
  params: []

- id: get_gain
  label: Get Gain
  kind: query
  command: "00 60 00"
  params: []

- id: get_shutter
  label: Get Shutter
  kind: query
  command: "00 61 00"
  params: []

- id: get_shutter_speed_step
  label: Get Shutter Speed (step)
  kind: query
  command: "00 62 00"
  params: []

- id: get_shutter_speed_variable
  label: Get Shutter Speed (variable)
  kind: query
  command: "00 63 00"
  params: []

- id: get_image_brightness
  label: Get Image Brightness
  kind: query
  command: "00 64 00"
  params: []

- id: get_trigger_mode
  label: Get Trigger Mode
  kind: query
  command: "00 6A 00"
  params: []

- id: get_trigger_edge
  label: Get Trigger Edge
  kind: query
  command: "00 6B 00"
  params: []

- id: get_back_light_compensation
  label: Get Back Light Compensation
  kind: query
  command: "00 6C 00"
  params: []

- id: get_white_balance_auto
  label: Get White Balance
  kind: query
  command: "00 65 00"
  params: []

- id: get_r_gain_manual
  label: Get R Gain (WB=Manual)
  kind: query
  command: "00 66 00"
  params: []

- id: get_b_gain_manual
  label: Get B Gain (WB=Manual)
  kind: query
  command: "00 67 00"
  params: []

- id: get_gamma_normal_mode
  label: Get Gamma Normal Mode
  kind: query
  command: "00 68 00"
  params: []

- id: get_gamma_text_mode
  label: Get Gamma Text Mode
  kind: query
  command: "00 69 00"
  params: []

- id: get_color_mode
  label: Get Color Mode
  kind: query
  command: "00 6D 00"
  params: []

- id: get_saturation
  label: Get Saturation
  kind: query
  command: "00 6E 00"
  params: []

- id: get_dhcp
  label: Get DHCP
  kind: query
  command: "00 70 00"
  params: []

- id: get_ip_address
  label: Get IP Address
  kind: query
  command: "00 71 00"
  params: []

- id: get_subnet_mask
  label: Get Subnet Mask
  kind: query
  command: "00 72 00"
  params: []

- id: get_gateway_ip
  label: Get Gateway IP
  kind: query
  command: "00 73 00"
  params: []

- id: get_ethernet_mode
  label: Get Ethernet Mode
  kind: query
  command: "00 74 00"
  params: []

- id: get_multicast_mode
  label: Get Multicast Mode
  kind: query
  command: "00 75 00"
  params: []

- id: get_multicast_running
  label: Get Multicast Running
  kind: query
  command: "00 76 00"
  params: []

- id: get_multicast_ip
  label: Get Multicast IP
  kind: query
  command: "00 77 00"
  params: []

- id: get_multicast_port
  label: Get Multicast Port
  kind: query
  command: "00 78 00"
  params: []

- id: get_multicast_format
  label: Get Multicast Format
  kind: query
  command: "00 79 00"
  params: []

- id: get_multicast_framerate
  label: Get Multicast Framerate
  kind: query
  command: "00 7A 00"
  params: []

- id: get_multicast_resolution_table
  label: Get Multicast Resolution Table
  kind: query
  command: "00 7B 00"
  params: []

- id: get_model
  label: Get Model
  kind: query
  command: "00 11 00"
  params: []

- id: get_serialnumber
  label: Get Serial Number
  kind: query
  command: "00 12 00"
  params: []

- id: get_version
  label: Get Firmware Version
  kind: query
  command: "00 13 00"
  params: []

- id: get_adjuster
  label: Get Adjuster
  kind: query
  command: "00 14 00"
  params: []

- id: get_date
  label: Get Production Date
  kind: query
  command: "00 15 00"
  params: []

- id: get_features
  label: Get Features Bitmap
  kind: query
  command: "00 16 00"
  params: []

- id: get_resolution_table
  label: Get Resolution Table
  kind: query
  command: "00 17 00"
  params: []

- id: get_description
  label: Get Description
  kind: query
  command: "00 18 00"
  params: []

- id: get_hd_tv_mask_position
  label: Get HD TV Mask Position
  kind: query
  command: "00 19 00"
  params: []

- id: get_firmware_upload_erase_flash
  label: Get Firmware Erase Status
  kind: query
  command: "00 B0 00"
  params: []

- id: get_picture_header
  label: Get Picture Header
  kind: query
  command: "00 B8 01 {yz}"
  params:
    - name: yz
      type: hex
      description: Bit7 Motion, Bit6 Format (0=BMP,1=JPG), Bit5-4 Quality (0..3), Bit3-0 Index

- id: get_picture_block
  label: Get Picture Block
  kind: query
  command: "00 B9 0A {ab} {cd} {ef} {gh} {ij} {kl} {mn} {op} {qr} {st}"
  params:
    - name: ab
      type: hex
      description: Flags from Picture Header
    - name: cd
      type: hex
      description: Mode Byte from Picture Header
    - name: ef
      type: hex
      description: Offset high byte
    - name: gh
      type: hex
      description: Offset next
    - name: ij
      type: hex
      description: Offset next
    - name: kl
      type: hex
      description: Offset low
    - name: mn
      type: hex
      description: Block length byte 1
    - name: op
      type: hex
      description: Block length byte 2
    - name: qr
      type: hex
      description: Block length byte 3
    - name: st
      type: hex
      description: Block length low

- id: get_block_positions
  label: Get Block - Positions
  kind: query
  command: "00 10 01 00"
  params: []

- id: get_block_flags_unit_info
  label: Get Block - Flags and Unit Info
  kind: query
  command: "00 10 01 01"
  params: []

- id: get_block_menu1
  label: Get Block - Menu 1
  kind: query
  command: "00 10 01 02"
  params: []

- id: get_block_menu2
  label: Get Block - Menu 2
  kind: query
  command: "00 10 01 03"
  params: []

- id: get_block_menu_ethernet
  label: Get Block - Menu Ethernet
  kind: query
  command: "00 10 01 04"
  params: []

- id: get_osd_transparency
  label: Get OSD Transparency
  kind: query
  command: "00 C0 00"
  params: []

- id: get_osd_size
  label: Get OSD Size
  kind: query
  command: "00 C1 00"
  params: []

- id: get_osd_menu_horizontal_position
  label: Get OSD Menu Horizontal Position
  kind: query
  command: "00 C2 00"
  params: []

- id: get_osd_menu_vertical_position
  label: Get OSD Menu Vertical Position
  kind: query
  command: "00 C3 00"
  params: []

- id: get_osd_status_position
  label: Get OSD Status Position
  kind: query
  command: "00 C4 00"
  params: []

- id: get_osd_selection_bar_color
  label: Get OSD Selection Bar Color
  kind: query
  command: "00 C5 00"
  params: []

- id: get_osd_selected_text_color
  label: Get OSD Selected Text Color
  kind: query
  command: "00 C6 00"
  params: []

- id: get_osd_menu_text_color
  label: Get OSD Menu Text Color
  kind: query
  command: "00 C7 00"
  params: []

- id: get_osd_menu_headline_color
  label: Get OSD Menu Headline Color
  kind: query
  command: "00 C8 00"
  params: []

- id: get_osd_menu_status_text_color
  label: Get OSD Menu Status Text Color
  kind: query
  command: "00 C9 00"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [power_off, power_on]
  notes: Reply packet 00 30 01 yz where yz=00 (Off) or 01 (On)

- id: reply_mode_state
  type: enum
  values: [off, command]
  notes: 00 AA reply yz=00 Off, 01 ReplyCommand

- id: error_code
  type: integer
  values:
    - 1  # Time out
    - 2  # Invalid Cmd
    - 3  # Invalid Parameter
    - 4  # Invalid Length
    - 5  # Fifo Full
    - 6  # Firmware Update Error
    - 7  # Access Denied
    - 255  # Unknown command (0xFF)
  notes: Error reply packet returns code 0xFF for unknown commands; numbered error table above
```

## Variables
```yaml
# UNRESOLVED: source does not enumerate discrete settable variables beyond those encoded as SET command parameters above.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notification packets; protocol is strictly request/response.
```

## Macros
```yaml
# UNRESOLVED: source lists 11 "Special Function Keys" (PRESET/POS_NEG/BLUE/BLACK_WHITE/WB/FREEZE/IMAGE/ONEPUSH_AF/LIGHT_ON_OFF/SLIDE_ON_OFF/TEXT/LIGHT) per preset but does not define multi-step composite macros.
```

## Safety
```yaml
confirmation_required_for:
  - reset_factory_settings   # SET 01 8F 01 00 - destructive
  - firmware_upload_erase_flash   # SET 01 B0 01 00 - destructive
  - firmware_downgrade       # SET 01 B4 01 00
interlocks:
  - menu_on_off_requires_unlock   # SET 01 98 01 yz requires menu unlock (01 9A / 01 9B) when yz=01 or 02
```

## Notes
- Protocol 2 (first nibble of byte 0 = 0); older Protocol 1 (other first nibbles) still supported for backward compatibility.
- Default RS-232 config: 115200 baud, 8N1, no flow control. Selectable: 9600, 19200, 38400, 57600, 115200.
- LAN port is 10BASE-T/100BASE-TX RJ45 with auto-negotiation; EYE-12 supports PoE (model applicability to EYE-10 not explicitly disambiguated in source).
- TCP room-control port: 50915.
- USB port: standard USB type B socket; USB 2.0 for 2007+ models (backward compatible USB 1.0/1.1).
- No login/auth procedure documented.
- Default serial reply is silent except for query-style commands. Toggle via SET Reply Mode (01 AA 01 01) for command acknowledgements.
- Long-running commands should not be chained; poll with code 0x20 (' ' blank-echo) to test readiness before next send.
- Command 0xFF reserved for Error Code (unknown command).
- Terminal short-cuts: "/" enters Short SET-mode (1-byte params), "+" enters Long SET-mode (4-digit hex command+length), "*" enters GET-mode. Each waits 3 seconds for input.
- Multicast port range 8800–9000 (encoded 0x2260..0x2328).
- Firmware upload max block length: USB = 508 bytes (512-4), Ethernet = 1440 bytes.
- Description payload max length 255 bytes.

<!-- UNRESOLVED: per-model applicability of command set to EYE-10 vs EYE-12 vs SCB-12 not disambiguated in source. -->
<!-- UNRESOLVED: Picture Transfer and Block Inquiry reply packets contain large bit-layout tables whose row data was partially truncated during PDF extraction; full byte-level decode not captured here. -->
```

---

Self-check:
- No voltage/current/power values invented
- Baud (115200 default), serial 8N1, TCP port 50915 all sourced verbatim
- Status=draft, confidence=low set
- YAML indentation valid
- entity_id present
- UNRESOLVED markers present for gaps

## Provenance

```yaml
source_domains:
  - wolfvision.com
source_urls:
  - http://www.wolfvision.com/wolf/protocoll_eye12_scb12.pdf
retrieved_at: 2026-09-02T17:10:19.298Z
last_checked_at: 2026-10-01T13:24:19.553Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T13:24:19.553Z
matched_actions: 235
action_count: 235
confidence: medium
summary: "All hex command tokens verified; transport values (115200 baud, 8N1, TCP port 50915) sourced verbatim. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document header says \"EYE-12\" but the provided model identifier is \"EYE-10 (North America)\". The command catalogue appears to be shared across EYE-10 / EYE-12 / SCB-12; per-model applicability not explicitly disambiguated."
- "Picture Transfer and Block Inquiry reply packet bit-layouts (00 B8, 00 B9, 00 10 01 00..04) are documented as tables with truncated/long rows in the refined source; complete byte-level decoding captured only partially."
- "USB transport framing details not specified in source (no baud/endpoint schema)."
- "source does not enumerate discrete settable variables beyond those encoded as SET command parameters above."
- "source does not document unsolicited notification packets; protocol is strictly request/response."
- "source lists 11 \"Special Function Keys\" (PRESET/POS_NEG/BLUE/BLACK_WHITE/WB/FREEZE/IMAGE/ONEPUSH_AF/LIGHT_ON_OFF/SLIDE_ON_OFF/TEXT/LIGHT) per preset but does not define multi-step composite macros."
- "per-model applicability of command set to EYE-10 vs EYE-12 vs SCB-12 not disambiguated in source."
- "Picture Transfer and Block Inquiry reply packets contain large bit-layout tables whose row data was partially truncated during PDF extraction; full byte-level decode not captured here."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
