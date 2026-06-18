---
spec_id: admin/lumens-dc192-pc192
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens DC192/PC192 Control Spec"
manufacturer: Lumens
model_family: DC192
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - DC192
    - PC192
  firmware: "\"DGA106\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS-232%20command%20set%202014-0225.pdf"
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
  - https://www.mylumens.com
  - https://www.mylumens.com/Download/DC192-Manual-English-2015-0922.pdf
  - https://www.mylumens.com/en/Downloads/4/technical-resources
retrieved_at: 2026-06-15T21:22:33.315Z
last_checked_at: 2026-06-16T07:08:35.093Z
generated_at: 2026-06-16T07:08:35.093Z
firmware_coverage: "\"DGA106\""
protocol_coverage: []
known_gaps:
  - "no voltage/current/power specs in source; no auth procedure described; command-set/firmware version is the only firmware info stated."
  - "source byte columns show P1 then 00h; source comment references \"P2=60/50Hz: 00~147\" brightness value whose byte position is ambiguous in the table"
  - "brightness value 00..147 (per 60/50Hz); source does not clearly map this to a packet byte\""
  - "source states the query exists but does not enumerate exact return byte values"
  - "no other named continuous variables described beyond the set/call pairs above."
  - "exact payload format of the detection message not specified in source."
  - "none documented."
  - "voltage/current/power specs not in source; Auto Erase command byte differs between command-packet (14h) and return-packet (13h) tables — used 14h as sent; brightness_control value byte position ambiguous in source; AC power state and keypad-detection exact return payloads not enumerated; flow_control inferred as none."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:08:35.093Z
  matched_actions: 69
  action_count: 69
  confidence: medium
  summary: "All 69 spec actions match source opcodes one-to-one with correct packet shapes and full transport parameter coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Lumens DC192/PC192 Control Spec

## Summary
RS-232 command set for the Lumens DC192 / PC192 document camera (visualizer). Asynchronous half-duplex serial control at 9600 bps using a fixed 6-byte binary packet (STX A0h … ETX AFh). Covers power, lamp, zoom/focus, capture, image settings, source select, OSD, and status queries.

<!-- UNRESOLVED: no voltage/current/power specs in source; no auth procedure described; command-set/firmware version is the only firmware info stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600          # Transmit Speed: 9600bps
  data_bits: 8             # Data Bit: 8Bit
  parity: none             # Parity Check: NA
  stop_bits: 1             # Stop Bit: 1Bit
  flow_control: none       # inferred: simple async half-duplex link, no handshake described in source
# Start bit: 1 bit (stated)
auth:
  type: none               # inferred: no auth/login procedure in source
```

## Packet Format
```yaml
# 6-byte command packet (Section 4.1 of source):
#   byte 1 (STX):       A0h  - start of command
#   byte 2 (Command):   00h..FFh
#   byte 3 (Param1):    00h..FFh
#   byte 4 (Param2):    00h..FFh
#   byte 5 (Status):    00h when sent; return packet carries status bits
#   byte 6 (ETX):       AFh  - end of command
#
# Return packet status byte (St):
#   0 = ACK   (action succeed / normal end)
#   1 = NAK   (error in command packet / parity / framing / overrun / out-of-range data)
#   2 = IGNORE (cannot execute now / unsupported command)
#   3 = Not used
#
# Status byte bit map (return packet, bit meanings):
#   bit 6 = Iris   moving status (1=moving / 0=stop)
#   bit 5 = Zoom   moving status (1=moving / 0=stop)
#   bit 4 = Focus  moving status (1=moving / 0=stop)
#   bit 1..0 = communication response (0=ACK / 1=NAK / 2=IGNORE / 3=not used)
#
# RS-232 wiring (DB9F, presenter <-> remote controller):
#   pin 2 -> pin 3
#   pin 3 -> pin 2
#   pin 5 -> pin 5
#   shell -> shell (drain)
```

## Traits
```yaml
traits:
  - powerable    # inferred: Power (B1h) and System ON/OFF (B0h) commands present
  - queryable    # inferred: many Call... status/version/position queries present
  - levelable    # inferred: audio mic/out volume, brightness, R/B gain controls present
  - routable     # inferred: Source live/PC (3Ah) selects Camera/PC/Source OFF output
```

## Actions
```yaml
# All payloads are the full 6-byte packet, hex, verbatim from source.
# {p1}/{p2}/{p3} denote variable parameter bytes documented in the source row.

- id: preset_factory_reset
  label: Preset / Factory Reset
  kind: action
  command: "A0 03 {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: "0 = Preset; 1 = Factory Reset"
    - name: p2
      type: integer
      description: "when p1=0: 00 = Preset Load, 01 = Preset Save"

- id: slideshow_on_off
  label: Slide show On/Off
  kind: action
  command: "A0 04 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Off, 01 = On"

- id: slideshow_delay
  label: Slide show Delay
  kind: action
  command: "A0 06 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "0..5 = 0.5s / 1s / 3s / 5s / 10s / Manual"

- id: image_record_quality
  label: Image / Record Quality
  kind: action
  command: "A0 07 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = High, 01 = Medium, 02 = Low"

- id: copy_nand_to_sd
  label: Copy From Nand to SD
  kind: action
  command: "A0 08 00 00 00 AF"
  params: []

- id: zoom_stop
  label: Zoom Stop
  kind: action
  command: "A0 10 00 00 00 AF"
  params: []

- id: zoom_start_no_af
  label: Zoom Start (No AF)
  kind: action
  command: "A0 11 {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Tele, 01 = Wide"

- id: zoom_direct_no_af
  label: Zoom Direct (No AF)
  kind: action
  command: "A0 11 {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: "low byte of zoom value (0..855)"
    - name: p2
      type: integer
      description: "high byte of zoom value (0..855); optical max per mode XGA=805 SXGA=802 WXGA=802 1080P=795 NTSC=810 PAL=810"

- id: auto_erase
  label: Auto Erase
  kind: action
  command: "A0 14 {p1} 00 00 AF"   # NOTE: return-packet table lists 13h for this row; command-packet table (sent) lists 14h
  params:
    - name: p1
      type: integer
      description: "00 = Auto Erase Off, 01 = Auto Erase On"

- id: focus_stop
  label: Focus Stop
  kind: action
  command: "A0 19 00 00 00 AF"
  params: []

- id: focus_start
  label: Focus Start
  kind: action
  command: "A0 1A {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Near, 01 = Far"
    - name: p2
      type: integer
      description: "speed 00..06"

- id: focus_direct
  label: Focus Direct
  kind: action
  command: "A0 1B {p1} {p2} {p3} AF"
  params:
    - name: p1
      type: integer
      description: "low byte of focus position (0..160 decimal)"
    - name: p2
      type: integer
      description: "high byte of focus position (0..160 decimal)"
    - name: p3
      type: integer
      description: "speed 00..06"

- id: zoom_start_with_af
  label: Zoom Start (with AF)
  kind: action
  command: "A0 1D {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Tele, 01 = Wide"

- id: zoom_direct_with_af
  label: Zoom Direct (with AF)
  kind: action
  command: "A0 1D {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: "low byte of zoom value (0..855)"
    - name: p2
      type: integer
      description: "high byte of zoom value (0..855); optical max per mode XGA=805 SXGA=802 WXGA=802 1080P=795 NTSC=810 PAL=810"

- id: white_balance
  label: White Balance (AWB / Auto Tune)
  kind: action
  command: "A0 22 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Auto Tune, 01 = AWB"

- id: set_pan_mode
  label: Set Pan Mode
  kind: action
  command: "A0 26 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Off, 01 = On"

- id: mask_mode
  label: Mask Mode
  kind: action
  command: "A0 27 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "0 = Disable, 1 = Mask, 2 = Spotlight"

- id: freeze
  label: Freeze
  kind: action
  command: "A0 2C {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Off, 01 = On"

- id: brightness_control
  label: Brightness Control
  kind: action
  command: "A0 30 {p1} 00 00 AF"   # UNRESOLVED: source byte columns show P1 then 00h; source comment references "P2=60/50Hz: 00~147" brightness value whose byte position is ambiguous in the table
  params:
    - name: p1
      type: integer
      description: "00 = Auto, 01 = Manual"
    - name: brightness
      type: integer
      description: "UNRESOLVED: brightness value 00..147 (per 60/50Hz); source does not clearly map this to a packet byte"

- id: logo_delay
  label: Logo Delay
  kind: action
  command: "A0 34 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "logo delay in seconds (4..30)"

- id: language_select
  label: Language Select
  kind: action
  command: "A0 38 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "0..20 = English / Traditional Chinese / Simplified Chinese / German / French / Spanish / Russian / Dutch / Finnish / Polish / Italian / Portuguese / Swedish / Danish / Czech / Arabic / Japanese / Korean / Greek / Reserved / Latvia"

- id: brightness_step
  label: Brightness Step
  kind: action
  command: "A0 39 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = -1, 01 = +1"

- id: source_select
  label: Source live/PC
  kind: action
  command: "A0 3A {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Camera, 01 = PC, 02 = Source OFF"

- id: disable_digital_zoom_after_optical
  label: Disable Digital Zoom After Optical Zoom
  kind: action
  command: "A0 40 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Disable, 01 = Enable"

- id: call_master_version
  label: Call Master Version
  kind: query
  command: "A0 45 00 00 00 AF"
  params: []

- id: call_ae_status
  label: Call AE Status
  kind: query
  command: "A0 46 00 00 00 AF"
  params: []

- id: enable_disable_logo_image
  label: Enable/Disable LOGO Image
  kind: action
  command: "A0 47 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = default logo, 01 = user logo"

- id: playback_index_change_page
  label: Playback Image Index Change Page
  kind: action
  command: "A0 4A {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Page Up, 01 = Page Down"

- id: all_osd_on_off
  label: All OSD On/Off
  kind: action
  command: "A0 4B {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Off, 01 = On"

- id: call_slave_version
  label: Call Slave Version
  kind: query
  command: "A0 4D 00 00 00 AF"
  params: []

- id: frame_average
  label: Frame Average
  kind: action
  command: "A0 4E {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = LCD, 01 = DLP"

- id: call_lamp_status
  label: Call Lamp Status
  kind: query
  command: "A0 50 00 00 00 AF"
  params: []

- id: call_text_photo_status
  label: Call Text/Photo Status
  kind: query
  command: "A0 51 00 00 00 AF"
  params: []

- id: reg1
  label: Register 1 (reg1)
  kind: action
  command: "A0 52 {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Read, 01 = Write"
    - name: p2
      type: integer
      description: "register value 0x00..0xFF"

- id: reg2
  label: Register 2 (reg2)
  kind: action
  command: "A0 53 {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: "register access (see reg1 convention)"
    - name: p2
      type: integer
      description: "register value 0x00..0xFF"

- id: reg3
  label: Register 3 (reg3)
  kind: action
  command: "A0 54 {p1} {p2} 00 AF"
  params:
    - name: p1
      type: integer
      description: "register access (see reg1 convention)"
    - name: p2
      type: integer
      description: "register value 0x00..0xFF"

- id: error_code
  label: Error Code
  kind: action
  command: "A0 55 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Show Error Code, 01 = Clear Error Code"

- id: awb_correction
  label: AWB Correction
  kind: action
  command: "A0 56 00 00 00 AF"
  params: []

- id: call_ac_power_state
  label: Call AC 50/60Hz Power State
  kind: query
  command: "A0 58 00 00 00 AF"
  params: []

- id: keypad_detect
  label: Keypad Detect
  kind: action
  command: "A0 59 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Stop, 01 = Start (enables debug detection messages sent via RS232)"

- id: call_zoom_position
  label: Call Zoom Position
  kind: query
  command: "A0 60 00 00 00 AF"
  params: []

- id: call_digital_zoom_position
  label: Call Digital Zoom Position
  kind: query
  command: "A0 62 00 00 00 AF"
  params: []

- id: call_focus_position
  label: Call Focus Position
  kind: query
  command: "A0 64 00 00 00 AF"
  params: []

- id: call_freeze_status
  label: Call Freeze Status
  kind: query
  command: "A0 78 00 00 00 AF"
  params: []

- id: call_brightness_position
  label: Call Brightness Position
  kind: query
  command: "A0 89 00 00 00 AF"
  params: []

- id: call_mix_zoom_position
  label: Call Mix Zoom Position
  kind: query
  command: "A0 8A 00 00 00 AF"
  params: []

- id: call_menu_status
  label: Call Menu Status
  kind: query
  command: "A0 8B 00 00 00 AF"
  params: []

- id: capture_action
  label: Capture Action
  kind: action
  command: "A0 96 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Single Capture, 01 = Time Lapse, 02 = Record, 03 = Disabled"

- id: capture_time
  label: Capture Time
  kind: action
  command: "A0 97 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00..06 = 1hr / 2hr / 4hr / 8hr / 24hr / 48hr / 72hr"

- id: capture_interval
  label: Capture Interval
  kind: action
  command: "A0 98 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00..06 = 3s / 5s / 10s / 30s / 1min / 2min / 5min"

- id: key_function
  label: Key Function
  kind: action
  command: "A0 A0 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "01..06 = Enter / Up / Down / Left / Right / Menu"

- id: set_rb_gain
  label: Set R/B Gain
  kind: action
  command: "A0 A1 {p1} {p2} {p3} AF"
  params:
    - name: p1
      type: integer
      description: "01 = Red Gain, 02 = Blue Gain"
    - name: p2
      type: integer
      description: "low byte of gain (0x100..0xFFF)"
    - name: p3
      type: integer
      description: "high byte of gain (0x100..0xFFF)"

- id: call_rb_gain
  label: Call R/B Gain
  kind: query
  command: "A0 A2 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "01 = Red Gain, 02 = Blue Gain"

- id: af_one_push_trigger
  label: AF One Push Trigger
  kind: action
  command: "A0 A3 01 00 00 AF"
  params: []

- id: set_gamma_mode
  label: Set Gamma Mode
  kind: action
  command: "A0 A7 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Photo, 01 = Text, 02 = Gray"

- id: set_image_mode
  label: Set Image Mode
  kind: action
  command: "A0 A9 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Normal, 01 = Slide, 02 = Film, 03 = Microscope"

- id: system_on_off
  label: System ON/OFF
  kind: action
  command: "A0 B0 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Off, 01 = On"

- id: power
  label: Power
  kind: action
  command: "A0 B1 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Off, 01 = On"

- id: capture
  label: Capture
  kind: action
  command: "A0 B2 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Capture, 01 = Record"

- id: playback_thumbnail
  label: Playback Thumbnail
  kind: action
  command: "A0 B3 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Thumbnail"

- id: preview_rotation
  label: Preview Rotation
  kind: action
  command: "A0 B4 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Rotate 0, 01 = 180, 02 = Flip, 03 = Mirror"

- id: delete
  label: Delete
  kind: action
  command: "A0 B6 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Delete one, 01 = Delete all, 02 = Format"

- id: call_system_status
  label: Call System Status
  kind: query
  command: "A0 B7 00 00 00 AF"
  params: []

- id: lamp_on_off
  label: Lamp On/Off
  kind: action
  command: "A0 C1 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = Lamp + Head Led OFF, 01 = Lamp + Head Led ON, 02 = Lamp ON, 03 = Head Led ON"

- id: firmware_upgrade
  label: Firmware Upgrade
  kind: action
  command: "A0 CB {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "00 = with OSD, 01 = no OSD"

- id: set_audio_mic_volume
  label: Set Audio Microphone Volume
  kind: action
  command: "A0 D4 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "volume 0..16 (decimal)"

- id: call_audio_mic_volume
  label: Call Audio Microphone Volume
  kind: query
  command: "A0 D5 00 00 00 AF"
  params: []

- id: set_audio_out_volume
  label: Set Audio Out Volume
  kind: action
  command: "A0 D6 {p1} 00 00 AF"
  params:
    - name: p1
      type: integer
      description: "volume 0..31 (decimal)"

- id: call_audio_out_volume
  label: Call Audio Out Volume
  kind: query
  command: "A0 D7 00 00 00 AF"
  params: []
```

## Feedbacks
```yaml
# Every command returns a packet echoing the command bytes with byte 5 = status (St).

- id: command_status
  type: enum
  description: "Return-packet status byte (St) for any command"
  values: [ack, nak, ignore]

- id: iris_moving_status
  type: boolean
  description: "Status byte bit 6: 1 = iris moving, 0 = stopped"

- id: zoom_moving_status
  type: boolean
  description: "Status byte bit 5: 1 = zoom moving, 0 = stopped"

- id: focus_moving_status
  type: boolean
  description: "Status byte bit 4: 1 = focus moving, 0 = stopped"

- id: master_version
  type: string
  description: "Call Master Version (45h) response: P1 P2 P3 ASCII version code"

- id: slave_version
  type: string
  description: "Call Slave Version (4Dh) response: P1 P2 P3 ASCII version code"

- id: ae_status
  type: enum
  description: "Call AE Status (46h) response"
  values: [off, on]

- id: lamp_status
  type: enum
  description: "Call Lamp Status (50h) response"
  values: [all_off, all_on, lamp_on, head_led_on]

- id: text_photo_status
  type: enum
  description: "Call Text/Photo Status (51h) response"
  values: [photo, text, gray]

- id: ac_power_state
  type: enum
  description: "Call AC 50/60Hz Power State (58h) response"
  values: [50hz, 60hz]   # UNRESOLVED: source states the query exists but does not enumerate exact return byte values

- id: zoom_position
  type: integer
  description: "Call Zoom Position (60h) response: P1 low / P2 high (0..855)"

- id: digital_zoom_position
  type: integer
  description: "Call Digital Zoom Position (62h) response: P1 low / P2 high"

- id: focus_position
  type: integer
  description: "Call Focus Position (64h) response: P1 low / P2 high (0..160)"

- id: freeze_status
  type: enum
  description: "Call Freeze Status (78h) response"
  values: [off, on]

- id: brightness_position
  type: integer
  description: "Call Brightness Position (89h) response: 00..147 (per 60/50Hz)"

- id: mix_zoom_position
  type: integer
  description: "Call Mix Zoom Position (8Ah) response: P1 low / P2 high (0..855)"

- id: menu_status
  type: enum
  description: "Call Menu Status (8Bh) response"
  values: [off, on]

- id: system_status
  type: object
  description: "Call System Status (B7h) response: P1 = ready (00 not ready / 01 ready), P2 = power (00 off / 01 on)"

- id: rb_gain
  type: integer
  description: "Call R/B Gain (A2h) response: P1 low / P2 high (0x100..0xFFF)"
```

## Variables
```yaml
# Continuous settable parameters (set/call action pairs also exist above).
- id: audio_microphone_volume
  type: integer
  min: 0
  max: 16
  description: "Set/Call Audio Microphone Volume (D4h/D5h)"

- id: audio_out_volume
  type: integer
  min: 0
  max: 31
  description: "Set/Call Audio Out Volume (D6h/D7h)"

- id: brightness
  type: integer
  min: 0
  max: 147
  description: "Brightness value (60/50Hz); see brightness_control action - byte mapping UNRESOLVED"

- id: red_blue_gain
  type: integer
  min: 256      # 0x100
  max: 4095     # 0xFFF
  description: "R/B Gain (A1h set / A2h call), per Red or Blue channel"

# UNRESOLVED: no other named continuous variables described beyond the set/call pairs above.
```

## Events
```yaml
# Unsolicited notifications the device sends.
- id: keypad_detection_message
  description: "When Keypad Detect (59h p1=01) is started, the device sends keypad detection/debug messages via RS232."
  trigger: "keypad_detect started"
# UNRESOLVED: exact payload format of the detection message not specified in source.
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
# UNRESOLVED: none documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No safety warnings, interlock procedures, or power-on sequencing requirements
# are stated in the source. Source describes only the command/response protocol.
```

## Notes
- All commands use a fixed 6-byte binary packet framed by STX (A0h) and ETX (AFh); byte 5 is sent as 00h and carries the status (St) in the return packet.
- Return status: 0 = ACK (succeed), 1 = NAK (command error / parity / framing / overrun / out-of-range), 2 = IGNORE (busy or unsupported).
- Zoom/Focus/Iris moving status is reported in the status byte bits (see Packet Format).
- Optical zoom maxima differ by output resolution: XGA 805, SXGA 802, WXGA 802, 1080P 795, NTSC 810, PAL 810.
- Zoom Start (No AF) and Zoom Direct (No AF) share command byte 11h but are distinct functions (Tele/Wide enum vs absolute position); likewise Zoom Start/Direct (with AF) share 1Dh.
- `reg1`/`reg2`/`reg3` (52h/53h/54h) are raw register read/write commands; only reg1 documents the Read/Write + value convention explicitly.
- Command set version history: v1.0 (2013-07-02) first version; v1.1 (2014-01-06) added Set/Call Audio Microphone Volume and revised Audio Out Volume comments — v1.1 applies to firmware DGA106.

<!-- UNRESOLVED: voltage/current/power specs not in source; Auto Erase command byte differs between command-packet (14h) and return-packet (13h) tables — used 14h as sent; brightness_control value byte position ambiguous in source; AC power state and keypad-detection exact return payloads not enumerated; flow_control inferred as none. -->
````

Spec done. 69 actions, full payloads verbatim. Serial RS-232 9600/8/N/1. Brightness byte mapping + AC-power/keypad return payloads left UNRESOLVED (source ambiguous).

## Provenance

```yaml
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/RS-232%20command%20set%202014-0225.pdf"
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
  - https://www.mylumens.com
  - https://www.mylumens.com/Download/DC192-Manual-English-2015-0922.pdf
  - https://www.mylumens.com/en/Downloads/4/technical-resources
retrieved_at: 2026-06-15T21:22:33.315Z
last_checked_at: 2026-06-16T07:08:35.093Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:08:35.093Z
matched_actions: 69
action_count: 69
confidence: medium
summary: "All 69 spec actions match source opcodes one-to-one with correct packet shapes and full transport parameter coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no voltage/current/power specs in source; no auth procedure described; command-set/firmware version is the only firmware info stated."
- "source byte columns show P1 then 00h; source comment references \"P2=60/50Hz: 00~147\" brightness value whose byte position is ambiguous in the table"
- "brightness value 00..147 (per 60/50Hz); source does not clearly map this to a packet byte\""
- "source states the query exists but does not enumerate exact return byte values"
- "no other named continuous variables described beyond the set/call pairs above."
- "exact payload format of the detection message not specified in source."
- "none documented."
- "voltage/current/power specs not in source; Auto Erase command byte differs between command-packet (14h) and return-packet (13h) tables — used 14h as sent; brightness_control value byte position ambiguous in source; AC power state and keypad-detection exact return payloads not enumerated; flow_control inferred as none."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
